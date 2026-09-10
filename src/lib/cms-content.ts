// Full-site content from the CMS, and the apply step that makes it count.
//
// The root route fetches ONE bundle per request and `applyCmsContent` pours it
// over the bundled data modules in place. ESM live bindings propagate the
// update to every importer, so the whole site is editable from a single seam.
//
// The contract with the client:
//   · The CMS owns editorial content and, since 10/09/2026, which services and
//     pages exist: a service is on the site only while its Live checkbox is
//     ticked, and a page only while it is ticked in "Pages on / off".
//   · Prices and durations stay Momence's. The CMS has no such fields, and a
//     service the CMS knows but the bundle does not shows "Price on booking".
//   · No CMS field is mandatory. A field the editor clears is cleared on the
//     site too, except for the handful that must never be empty for the site
//     to work (contact email, the Momence home link, SEO titles), which fall
//     back to the bundled value.
//   · If the CMS is down: whatever was last applied in this instance, or the
//     bundled snapshot on a cold one. The site never empties because of an
//     outage.

import {
  memberships,
  assessments,
  tests,
  medical,
  training,
  trainingPacks,
  allProducts,
  TRAINING_PACK_SLUGS,
  type Product,
  type ProductCategory,
} from "@/data/catalog";
import { productContent, type ProductContent } from "@/data/productContent";
import { homePage, productLabels, aboutPage, labPage, legalPage, faqPage, blogPage } from "@/data/pages";
import { pageMeta, type PageMeta, type PageMetaKey } from "@/data/meta";
import { ADDRESS, CONTACT, HOURS, COMPANY, PAGES, setMapLink, type PageKey } from "@/data/site";
import { LINKS, setBookingHome } from "@/lib/momence";

const CMS_URL = "https://volumes-cms.vercel.app";
const TIMEOUT_MS = 3_500;

/* ────────────────────────── fetch one bundle ────────────────────────── */

type CmsDoc = Record<string, unknown>;

async function get(path: string): Promise<CmsDoc | null> {
  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as CmsDoc;
  } catch {
    return null;
  }
}

export type CmsBundle = {
  /** Docs from the five service collections, each tagged with its category. */
  products: CmsDoc[];
  /**
   * Categories whose collection loaded. Only these are authoritative: an empty
   * collection that loaded removes every service in that category, while a
   * category that failed to load keeps whatever the site currently shows.
   */
  categories?: string[];
  site: CmsDoc | null;
  home: CmsDoc | null;
  labels: CmsDoc | null;
  about: CmsDoc | null;
  legal: CmsDoc | null;
  meta: CmsDoc | null;
  pages?: CmsDoc | null;
  faq?: CmsDoc | null;
  blog?: CmsDoc | null;
};

// Last successful read of each collection, per instance, so a blip after the
// first request serves the previous list instead of nothing.
const collectionCache = new Map<string, CmsDoc[]>();

async function getCollection(collection: string): Promise<CmsDoc[] | null> {
  const docs: CmsDoc[] = [];
  let page = 1;
  while (true) {
    const result = await get(`/api/${collection}?limit=100&depth=1&page=${page}`);
    if (!result || !Array.isArray(result.docs)) return collectionCache.get(collection) ?? null;
    docs.push(...(result.docs as CmsDoc[]));
    if (!result.hasNextPage) break;
    page++;
  }
  collectionCache.set(collection, docs);
  return docs;
}

/**
 * Fetches everything the site renders, in parallel. Null on total failure —
 * the caller then skips the apply step and the current content keeps serving.
 */
export async function cmsSiteContent(): Promise<CmsBundle | null> {
  // One collection per category since the 25/08 restructure; each doc carries
  // its category so the apply step can find the bundled counterpart.
  const categoryOf: Record<string, string> = {
    tests: "test",
    assessments: "assessment",
    medical: "medical",
    training: "training",
    memberships: "membership",
  };
  const serviceCollections = Object.keys(categoryOf);
  const [svcResults, site, home, labels, about, legal, meta, pages, faq, blog] = await Promise.all([
    Promise.all(serviceCollections.map(getCollection)),
    get("/api/globals/site-settings"),
    get("/api/globals/home-page"),
    get("/api/globals/product-labels"),
    get("/api/globals/about-page"),
    get("/api/globals/legal-page"),
    get("/api/globals/page-meta"),
    get("/api/globals/page-visibility"),
    get("/api/globals/faq-page"),
    get("/api/globals/blog-page"),
  ]);

  const products: CmsDoc[] = [];
  const categories: string[] = [];
  svcResults.forEach((res, i) => {
    if (!res) return;
    const cat = categoryOf[serviceCollections[i]];
    categories.push(cat);
    for (const d of res) products.push({ ...d, category: cat });
  });
  if (
    !categories.length && !site && !home && !labels && !about && !legal && !meta && !pages && !faq && !blog
  )
    return null;

  // The phone was removed from every page (30/08); strip it from the bundle
  // too so the number does not ship inside the serialized payload either.
  if (site && typeof site.contact === "object" && site.contact) {
    delete (site.contact as CmsDoc).phone;
  }

  return { products, categories, site, home, labels, about, legal, meta, pages, faq, blog };
}

/* ────────────────────────── apply over modules ────────────────────────── */

const str = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v : undefined);

/**
 * Editable copy: a field the CMS carries wins even when empty, because an
 * editor cleared it on purpose. A field the CMS does not carry (older CMS
 * deploy, never saved) keeps the current value.
 */
const own = (doc: CmsDoc, key: string, current: string): string =>
  key in doc ? (str(doc[key]) ?? "") : current;

const texts = (v: unknown): string[] | undefined =>
  Array.isArray(v)
    ? v.map((x) => str((x as CmsDoc)?.text)).filter((x): x is string => !!x)
    : undefined;

/** Relationship value → slug, whether depth resolved it to a doc or left an id. */
const relSlug = (v: unknown): string | undefined =>
  typeof v === "object" && v !== null ? str((v as CmsDoc).slug) : undefined;

function applyProduct(target: Product, doc: CmsDoc) {
  // A service with no name would be unreachable in the panel and unreadable
  // on a card, so the name is the one product field that never goes empty.
  target.name = str(doc.name) ?? target.name;
  target.categoryLabel = own(doc, "categoryLabel", target.categoryLabel);
  target.shortDescription = own(doc, "shortDescription", target.shortDescription ?? "");
  const badges = texts(doc.badges);
  if (badges) target.badges = badges;
  const included = texts(doc.included);
  if (included) target.measures = included;

  // Empty = the general booking page (bookingHref falls back to it).
  if ("momenceUrl" in doc) {
    const momenceUrl = str(doc.momenceUrl) ?? "";
    target.bookingUrl = momenceUrl;
    LINKS[target.slug] = momenceUrl;
  }

  if (Array.isArray(doc.includedTests)) {
    target.includedTests = doc.includedTests.map(relSlug).filter((s): s is string => !!s);
  }
  if ("includedInMembership" in doc)
    target.includedInMembership = relSlug(doc.includedInMembership);

  if (typeof doc.membership === "object" && doc.membership && target.membership) {
    const m = doc.membership as CmsDoc;
    const t = target.membership;
    t.goal = own(m, "goal", t.goal);
    t.trainingFrequency = own(m, "trainingFrequency", t.trainingFrequency ?? "");
    t.doctorInvolvement = own(m, "doctorInvolvement", t.doctorInvolvement ?? "");
    t.retesting = own(m, "retesting", t.retesting ?? "");
    t.commitment = own(m, "commitment", t.commitment ?? "");
    t.medicationNote = own(m, "medicationNote", t.medicationNote ?? "");
    t.bloodworkNote = own(m, "bloodworkNote", t.bloodworkNote ?? "");
  }
}

function applyContent(target: ProductContent, doc: CmsDoc) {
  const outcomes = texts(doc.outcomes);
  if (outcomes) target.outcomes = outcomes;
  if (Array.isArray(doc.experience)) {
    target.experience = (doc.experience as CmsDoc[])
      .map((e) => ({ title: str(e.title) ?? "", body: str(e.body) ?? "" }))
      .filter((e) => e.title);
  }
  const prep = texts(doc.prep);
  if (prep) target.prep = prep;
  if (Array.isArray(doc.faqs)) {
    target.faqs = (doc.faqs as CmsDoc[])
      .map((f) => ({ q: str(f.q) ?? "", a: str(f.a) ?? "" }))
      .filter((f) => f.q && f.a);
  }
}

// Immutable baselines: a service hidden and later restored gets its commercial
// data back, and a field removed in the CMS cannot leak from an earlier request.
const baselineProducts = structuredClone(allProducts);
const baselineContent = structuredClone(productContent);
const baselineLinks = { ...LINKS };
const collections: Partial<Record<ProductCategory, Product[]>> = {
  membership: memberships,
  assessment: assessments,
  test: tests,
  medical,
  training,
};

function newProduct(slug: string, category: ProductCategory, doc: CmsDoc): Product {
  return {
    slug,
    category,
    name: str(doc.name) ?? slug,
    categoryLabel: "",
    tagline: "",
    price: 0,
    priceTbd: true,
    durationTbd: true,
    measures: [],
    protocol: [],
    goodFor: [],
    status: "available",
    ...(category === "membership" ? { membership: { goal: "" } } : {}),
  };
}

function applyCatalogue(bundle: CmsBundle) {
  const fetched = new Set(bundle.categories ?? bundle.products.map((d) => String(d.category)));

  // Categories that did not load keep exactly what the site shows now.
  const kept = allProducts.filter((p) => !fetched.has(p.category));
  const keptSlugs = new Set(kept.map((p) => p.slug));
  for (const key of Object.keys(productContent))
    if (!keptSlugs.has(key)) delete productContent[key];
  for (const [slug, content] of Object.entries(baselineContent)) {
    if (!keptSlugs.has(slug)) productContent[slug] = structuredClone(content);
  }
  for (const key of Object.keys(LINKS)) if (!keptSlugs.has(key)) delete LINKS[key];
  for (const [slug, url] of Object.entries(baselineLinks))
    if (!keptSlugs.has(slug)) LINKS[slug] = url;

  const next: Product[] = [...kept];
  for (const doc of bundle.products) {
    const slug = str(doc.slug);
    const category = doc.category as ProductCategory;
    if (!slug || !collections[category] || doc.live === false) continue;
    const baseline = baselineProducts.find((p) => p.slug === slug && p.category === category);
    const product = baseline ? structuredClone(baseline) : newProduct(slug, category, doc);
    applyProduct(product, doc);
    // The CMS short description is the only description the editor can see,
    // so it is also what the page's meta description reads.
    if (product.shortDescription) product.tagline = product.shortDescription;
    if (category === "training" && doc.training && typeof doc.training === "object") {
      product.training = { ...product.training, ...(doc.training as object) };
    }
    next.push(product);
    const content = productContent[slug] ?? {
      outcomes: [],
      experience: [],
      prep: [],
      goodFor: [],
      faqs: [],
    };
    applyContent(content, doc);
    productContent[slug] = content;
  }

  for (const [category, target] of Object.entries(collections)) {
    if (fetched.has(category))
      target.splice(0, target.length, ...next.filter((p) => p.category === category));
  }
  allProducts.splice(0, allProducts.length, ...Object.values(collections).flatMap((c) => c ?? []));
  trainingPacks.splice(
    0,
    trainingPacks.length,
    ...TRAINING_PACK_SLUGS.map((s) => training.find((t) => t.slug === s)).filter(
      (t): t is Product => !!t,
    ),
  );
}

/** Array of {key: text} rows → strings; undefined when the CMS has no such field. */
const rows = (v: unknown, key: string): string[] | undefined =>
  Array.isArray(v)
    ? (v as CmsDoc[]).map((x) => str(x[key])).filter((x): x is string => !!x)
    : undefined;

let appliedStamp = "";

/**
 * Applies a bundle over the data modules. Safe to call repeatedly (server per
 * request, client on hydration and navigation): the same bundle is a no-op.
 */
export function applyCmsContent(bundle: CmsBundle | null) {
  if (!bundle) return;

  // Cheap idempotence: skip if this exact bundle was already applied.
  const stamp = JSON.stringify(bundle);
  if (stamp === appliedStamp) return;
  appliedStamp = stamp;

  applyCatalogue(bundle);

  // ---- site settings ----
  if (bundle.site) {
    const s = bundle.site;
    const contact = s.contact as CmsDoc | undefined;
    if (contact) {
      // Every "write to us" link needs an address, so the email never empties.
      CONTACT.email = str(contact.email) ?? CONTACT.email;
      const phone = str(contact.phone);
      if (phone) {
        CONTACT.phone = phone;
        CONTACT.phoneHref = `tel:${phone.replace(/[^+0-9]/g, "")}`;
      }
    }
    const address = s.address as CmsDoc | undefined;
    if (address) {
      ADDRESS.street = own(address, "street", ADDRESS.street);
      ADDRESS.district = own(address, "district", ADDRESS.district);
      ADDRESS.postalCode = own(address, "postalCode", ADDRESS.postalCode);
      ADDRESS.city = own(address, "city", ADDRESS.city);
      ADDRESS.short = own(address, "short", ADDRESS.short);
      ADDRESS.full = own(address, "full", ADDRESS.full);
      // Every "Open in Maps" link needs somewhere to go: empty keeps the current one.
      setMapLink(str(address.mapsUrl) ?? "");
    }
    const hours = s.hours as CmsDoc | undefined;
    if (hours) {
      HOURS.weekdays.label = own(hours, "weekdaysLabel", HOURS.weekdays.label);
      HOURS.weekdays.value = own(hours, "weekdaysValue", HOURS.weekdays.value);
      HOURS.weekend.label = own(hours, "weekendLabel", HOURS.weekend.label);
      HOURS.weekend.value = own(hours, "weekendValue", HOURS.weekend.value);
      HOURS.short = own(hours, "short", HOURS.short);
      HOURS.walkIns = own(hours, "walkIns", HOURS.walkIns);
    }
    const company = s.company as CmsDoc | undefined;
    if (company) {
      COMPANY.legalName = own(company, "legalName", COMPANY.legalName);
      COMPANY.tradingName = own(company, "tradingName", COMPANY.tradingName);
      COMPANY.taxId = str(company.taxId) ?? null;
      COMPANY.registeredAddress = str(company.registeredAddress) ?? null;
    }
    const momence = s.momence as CmsDoc | undefined;
    // Every Book CTA needs somewhere to go: an empty link keeps the bundled one.
    if (momence) setBookingHome(str(momence.bookingHome) ?? "");
  }

  // ---- home page copy ----
  if (bundle.home) {
    const h = bundle.home;
    homePage.headline = own(h, "headline", homePage.headline);
    homePage.intro = own(h, "intro", homePage.intro);
    for (const key of ["tests", "assessments", "medical", "train", "memberships"] as const) {
      const sec = h[key] as CmsDoc | undefined;
      if (sec) {
        homePage.sections[key].title = own(sec, "title", homePage.sections[key].title);
        homePage.sections[key].description = own(
          sec,
          "description",
          homePage.sections[key].description,
        );
      }
    }
  }

  // ---- product page labels (drive all 19 SKU pages) ----
  if (bundle.labels) {
    const l = bundle.labels;
    productLabels.whatItIs = own(l, "whatItIs", productLabels.whatItIs);
    productLabels.howItWorks = own(l, "howItWorks", productLabels.howItWorks);
    productLabels.questions = own(l, "questions", productLabels.questions);
    productLabels.prepPrefix = own(l, "prepPrefix", productLabels.prepPrefix);
    productLabels.priceTbdNote = own(l, "priceTbdNote", productLabels.priceTbdNote);
    const m = l.modules as CmsDoc | undefined;
    if (m) {
      const mods = productLabels.modules;
      mods.testIncludedIn = own(m, "testIncludedIn", mods.testIncludedIn);
      mods.testNote = own(m, "testNote", mods.testNote);
      mods.assessmentIncludes = own(m, "assessmentIncludes", mods.assessmentIncludes);
      mods.trainingOtherOptions = own(m, "trainingOtherOptions", mods.trainingOtherOptions);
      mods.trainingNote = own(m, "trainingNote", mods.trainingNote);
      mods.membershipIncluded = own(m, "membershipIncluded", mods.membershipIncluded);
      mods.membershipHowToJoin = own(m, "membershipHowToJoin", mods.membershipHowToJoin);
      mods.medicalTitle = own(m, "medicalTitle", mods.medicalTitle);
      mods.medicalIntro = own(m, "medicalIntro", mods.medicalIntro);
      mods.medicalNote = own(m, "medicalNote", mods.medicalNote);
      const msteps = rows(m.membershipSteps, "step");
      if (msteps) (mods as { membershipSteps: string[] }).membershipSteps = msteps;
      const dsteps = rows(m.medicalSteps, "step");
      if (dsteps) (mods as { medicalSteps: string[] }).medicalSteps = dsteps;
    }
    const cta = l.finalCta as CmsDoc | undefined;
    if (cta) {
      productLabels.finalCta.membership = own(cta, "membership", productLabels.finalCta.membership);
      productLabels.finalCta.training = own(cta, "training", productLabels.finalCta.training);
      productLabels.finalCta.medical = own(cta, "medical", productLabels.finalCta.medical);
      productLabels.finalCta.default = own(cta, "default", productLabels.finalCta.default);
    }
  }

  // ---- about + lab ----
  if (bundle.about) {
    const a = bundle.about;
    if (Array.isArray(a.steps)) {
      (aboutPage as { steps: { title: string; body: string }[] }).steps = (a.steps as CmsDoc[])
        .map((x) => ({ title: str(x.title) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.title);
    }
    if (Array.isArray(a.labAreas)) {
      (labPage as { areas: { title: string; body: string }[] }).areas = (a.labAreas as CmsDoc[])
        .map((x) => ({ title: str(x.title) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.title);
    }
  }

  // ---- legal ----
  if (bundle.legal) {
    const l = bundle.legal;
    legalPage.title = own(l, "title", legalPage.title);
    legalPage.companyHeading = own(l, "companyHeading", legalPage.companyHeading);
    legalPage.privacyHeading = own(l, "privacyHeading", legalPage.privacyHeading);
    legalPage.backLink = own(l, "backLink", legalPage.backLink);
    if (Array.isArray(l.privacy)) {
      (legalPage as { privacy: { lead: string; body: string }[] }).privacy = (l.privacy as CmsDoc[])
        .map((x) => ({ lead: str(x.lead) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.lead || x.body);
    }
  }

  // ---- page meta / SEO: never empty, a blank tab title helps nobody ----
  if (bundle.meta) {
    for (const key of Object.keys(pageMeta) as PageMetaKey[]) {
      const m = bundle.meta[key] as CmsDoc | undefined;
      if (!m) continue;
      const target: PageMeta = pageMeta[key];
      target.title = str(m.title) ?? target.title;
      target.description = str(m.description) ?? target.description;
      target.shareTitle = str(m.shareTitle) ?? target.shareTitle;
      target.shareDescription = str(m.shareDescription) ?? target.shareDescription;
    }
  }

  // ---- FAQ page framing (the questions are the Faqs collection) ----
  if (bundle.faq) {
    const f = bundle.faq;
    faqPage.eyebrow = own(f, "eyebrow", faqPage.eyebrow);
    faqPage.headline = own(f, "headline", faqPage.headline);
    faqPage.intro = own(f, "intro", faqPage.intro);
    faqPage.band = own(f, "band", faqPage.band);
  }

  // ---- Blog index framing (the posts are the Posts collection) ----
  if (bundle.blog) {
    const b = bundle.blog;
    blogPage.eyebrow = own(b, "eyebrow", blogPage.eyebrow);
    blogPage.headline = own(b, "headline", blogPage.headline);
    blogPage.intro = own(b, "intro", blogPage.intro);
    const cta = b.cta as CmsDoc | undefined;
    if (cta) {
      blogPage.cta.eyebrow = own(cta, "eyebrow", blogPage.cta.eyebrow);
      blogPage.cta.headline = own(cta, "headline", blogPage.cta.headline);
      blogPage.cta.button = own(cta, "button", blogPage.cta.button);
    }
  }

  // ---- pages on / off ----
  if (bundle.pages) {
    for (const key of Object.keys(PAGES) as PageKey[]) {
      const v = bundle.pages[key];
      PAGES[key] = typeof v === "boolean" ? v : true;
    }
  }
}
