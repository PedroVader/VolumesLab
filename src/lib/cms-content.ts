// Full-site content from the CMS, and the apply step that makes it count.
//
// Eleven files read the catalogue and page copy as plain module imports. Rather
// than rewire every one of them through loaders, the root route fetches ONE
// bundle per request and `applyCmsContent` pours it over the bundled data
// modules in place. ESM live bindings propagate the update to every importer,
// so the whole site becomes editable from a single seam.
//
// The contract stays the one agreed with the client:
//   · Editorial content only. Prices, durations and availability are Momence's;
//     the CMS collections do not carry those fields, and this module never
//     touches them — CMS fields are merged onto the bundled product, keeping
//     its commercial values intact.
//   · If the CMS is down: last good copy, then the bundled snapshot. The apply
//     step simply doesn't run and the site renders exactly as deployed.

import {
  memberships,
  assessments,
  tests,
  medical,
  training,
  trainingPacks,
  allProducts,
  type Product,
} from "@/data/catalog";
import { productContent, type ProductContent } from "@/data/productContent";
import { homePage, productLabels, aboutPage, labPage, legalPage } from "@/data/pages";
import { pageMeta, type PageMeta, type PageMetaKey } from "@/data/meta";
import { ADDRESS, CONTACT, HOURS, COMPANY } from "@/data/site";
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
  products: CmsDoc[];
  content: CmsDoc[];
  site: CmsDoc | null;
  home: CmsDoc | null;
  labels: CmsDoc | null;
  about: CmsDoc | null;
  legal: CmsDoc | null;
  meta: CmsDoc | null;
};

let lastGood: CmsBundle | null = null;

/**
 * Fetches everything the site renders, in parallel. Null on total failure —
 * the caller then skips the apply step and the bundled snapshot serves.
 */
export async function cmsSiteContent(): Promise<CmsBundle | null> {
  const [products, content, site, home, labels, about, legal, meta] = await Promise.all([
    get("/api/products?limit=100&depth=1"),
    get("/api/product-content?limit=100&depth=1"),
    get("/api/globals/site-settings"),
    get("/api/globals/home-page"),
    get("/api/globals/product-labels"),
    get("/api/globals/about-page"),
    get("/api/globals/legal-page"),
    get("/api/globals/page-meta"),
  ]);

  if (!products?.docs) return lastGood;

  const bundle: CmsBundle = {
    products: (products.docs as CmsDoc[]) ?? [],
    content: (content?.docs as CmsDoc[]) ?? [],
    site,
    home,
    labels,
    about,
    legal,
    meta,
  };
  lastGood = bundle;
  return bundle;
}

/* ────────────────────────── apply over modules ────────────────────────── */

const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() ? v : undefined;

const texts = (v: unknown): string[] | undefined =>
  Array.isArray(v) ? v.map((x) => str((x as CmsDoc)?.text)).filter((x): x is string => !!x) : undefined;

/** Relationship value → slug, whether depth resolved it to a doc or left an id. */
const relSlug = (v: unknown): string | undefined =>
  typeof v === "object" && v !== null ? str((v as CmsDoc).slug) : undefined;

function applyProduct(target: Product, doc: CmsDoc) {
  target.name = str(doc.name) ?? target.name;
  target.categoryLabel = str(doc.categoryLabel) ?? target.categoryLabel;
  target.shortDescription = str(doc.shortDescription) ?? target.shortDescription;
  const badges = texts(doc.badges);
  if (badges) target.badges = badges;
  const included = texts(doc.included);
  if (included) target.measures = included;

  const momenceUrl = str(doc.momenceUrl);
  if (momenceUrl) {
    target.bookingUrl = momenceUrl;
    LINKS[target.slug] = momenceUrl;
  }

  if (Array.isArray(doc.includedTests)) {
    const slugs = doc.includedTests.map(relSlug).filter((s): s is string => !!s);
    if (slugs.length) target.includedTests = slugs;
  }
  const membershipSlug = relSlug(doc.includedInMembership);
  if (membershipSlug) target.includedInMembership = membershipSlug;

  if (typeof doc.membership === "object" && doc.membership && target.membership) {
    const m = doc.membership as CmsDoc;
    const t = target.membership;
    t.goal = str(m.goal) ?? t.goal;
    t.trainingFrequency = str(m.trainingFrequency) ?? t.trainingFrequency;
    t.doctorInvolvement = str(m.doctorInvolvement) ?? t.doctorInvolvement;
    t.retesting = str(m.retesting) ?? t.retesting;
    t.commitment = str(m.commitment) ?? t.commitment;
    t.medicationNote = str(m.medicationNote) ?? t.medicationNote;
    t.bloodworkNote = str(m.bloodworkNote) ?? t.bloodworkNote;
  }
}

function applyContent(target: ProductContent, doc: CmsDoc) {
  const outcomes = texts(doc.outcomes);
  if (outcomes) target.outcomes = outcomes;
  if (Array.isArray(doc.experience)) {
    const steps = (doc.experience as CmsDoc[])
      .map((e) => ({ title: str(e.title) ?? "", body: str(e.body) ?? "" }))
      .filter((e) => e.title);
    if (steps.length) target.experience = steps;
  }
  const prep = texts(doc.prep);
  if (prep) target.prep = prep;
  if (Array.isArray(doc.faqs)) {
    const faqs = (doc.faqs as CmsDoc[])
      .map((f) => ({ q: str(f.q) ?? "", a: str(f.a) ?? "" }))
      .filter((f) => f.q && f.a);
    if (faqs.length) target.faqs = faqs;
  }
}

let appliedStamp = "";

/**
 * Pours the bundle over the data modules. Idempotent, synchronous, and cheap:
 * runs at the top of the root render on both server and client with the same
 * serialized bundle, so SSR and hydration agree.
 */
export function applyCmsContent(bundle: CmsBundle | null) {
  if (!bundle) return;

  // Cheap idempotence: skip if this exact bundle was already applied.
  const stamp = `${bundle.products.length}:${JSON.stringify(bundle.home)}:${JSON.stringify(bundle.site)}`;
  if (stamp === appliedStamp) return;
  appliedStamp = stamp;

  // ---- products: merge editorial fields onto bundled products by slug ----
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  for (const doc of bundle.products) {
    const slug = str(doc.slug);
    const target = slug ? bySlug.get(slug) : undefined;
    if (target) applyProduct(target, doc);
    // Products created in the CMS with no bundled counterpart are skipped:
    // they have no commercial data until the Momence wiring provides it.
  }

  // ---- product page copy ----
  for (const doc of bundle.content) {
    const slug = relSlug(doc.product) ?? str(doc.title);
    const target = slug ? productContent[slug] : undefined;
    if (target) applyContent(target, doc);
  }

  // ---- site settings ----
  if (bundle.site) {
    const s = bundle.site;
    const contact = s.contact as CmsDoc | undefined;
    if (contact) {
      CONTACT.email = str(contact.email) ?? CONTACT.email;
      const phone = str(contact.phone);
      if (phone) {
        CONTACT.phone = phone;
        CONTACT.phoneHref = `tel:${phone.replace(/[^+0-9]/g, "")}`;
      }
    }
    const address = s.address as CmsDoc | undefined;
    if (address) {
      ADDRESS.street = str(address.street) ?? ADDRESS.street;
      ADDRESS.district = str(address.district) ?? ADDRESS.district;
      ADDRESS.postalCode = str(address.postalCode) ?? ADDRESS.postalCode;
      ADDRESS.city = str(address.city) ?? ADDRESS.city;
      ADDRESS.short = str(address.short) ?? ADDRESS.short;
      ADDRESS.full = str(address.full) ?? ADDRESS.full;
    }
    const hours = s.hours as CmsDoc | undefined;
    if (hours) {
      HOURS.weekdays.label = str(hours.weekdaysLabel) ?? HOURS.weekdays.label;
      HOURS.weekdays.value = str(hours.weekdaysValue) ?? HOURS.weekdays.value;
      HOURS.weekend.label = str(hours.weekendLabel) ?? HOURS.weekend.label;
      HOURS.weekend.value = str(hours.weekendValue) ?? HOURS.weekend.value;
      HOURS.short = str(hours.short) ?? HOURS.short;
      HOURS.walkIns = str(hours.walkIns) ?? HOURS.walkIns;
    }
    const company = s.company as CmsDoc | undefined;
    if (company) {
      COMPANY.legalName = str(company.legalName) ?? COMPANY.legalName;
      COMPANY.tradingName = str(company.tradingName) ?? COMPANY.tradingName;
      COMPANY.taxId = str(company.taxId) ?? COMPANY.taxId;
      COMPANY.registeredAddress = str(company.registeredAddress) ?? COMPANY.registeredAddress;
    }
    const momence = s.momence as CmsDoc | undefined;
    if (momence) setBookingHome(str(momence.bookingHome) ?? "");
  }

  // ---- home page copy ----
  if (bundle.home) {
    const h = bundle.home;
    homePage.headline = str(h.headline) ?? homePage.headline;
    homePage.intro = str(h.intro) ?? homePage.intro;
    for (const key of ["tests", "assessments", "medical", "train", "memberships"] as const) {
      const sec = h[key] as CmsDoc | undefined;
      if (sec) {
        homePage.sections[key].title = str(sec.title) ?? homePage.sections[key].title;
        homePage.sections[key].description = str(sec.description) ?? homePage.sections[key].description;
      }
    }
  }

  // ---- product page labels (drive all 19 SKU pages) ----
  if (bundle.labels) {
    const l = bundle.labels;
    productLabels.whatItIs = str(l.whatItIs) ?? productLabels.whatItIs;
    productLabels.howItWorks = str(l.howItWorks) ?? productLabels.howItWorks;
    productLabels.questions = str(l.questions) ?? productLabels.questions;
    productLabels.prepPrefix = str(l.prepPrefix) ?? productLabels.prepPrefix;
    productLabels.priceTbdNote = str(l.priceTbdNote) ?? productLabels.priceTbdNote;
    const m = l.modules as CmsDoc | undefined;
    if (m) {
      const mods = productLabels.modules;
      mods.testIncludedIn = str(m.testIncludedIn) ?? mods.testIncludedIn;
      mods.testNote = str(m.testNote) ?? mods.testNote;
      mods.assessmentIncludes = str(m.assessmentIncludes) ?? mods.assessmentIncludes;
      mods.trainingOtherOptions = str(m.trainingOtherOptions) ?? mods.trainingOtherOptions;
      mods.trainingNote = str(m.trainingNote) ?? mods.trainingNote;
      mods.membershipIncluded = str(m.membershipIncluded) ?? mods.membershipIncluded;
      mods.membershipHowToJoin = str(m.membershipHowToJoin) ?? mods.membershipHowToJoin;
      mods.medicalTitle = str(m.medicalTitle) ?? mods.medicalTitle;
      mods.medicalIntro = str(m.medicalIntro) ?? mods.medicalIntro;
      mods.medicalNote = str(m.medicalNote) ?? mods.medicalNote;
      const msteps = Array.isArray(m.membershipSteps)
        ? (m.membershipSteps as CmsDoc[]).map((x) => str(x.step)).filter((x): x is string => !!x)
        : [];
      if (msteps.length) (mods as { membershipSteps: string[] }).membershipSteps = msteps;
      const dsteps = Array.isArray(m.medicalSteps)
        ? (m.medicalSteps as CmsDoc[]).map((x) => str(x.step)).filter((x): x is string => !!x)
        : [];
      if (dsteps.length) (mods as { medicalSteps: string[] }).medicalSteps = dsteps;
    }
    const cta = l.finalCta as CmsDoc | undefined;
    if (cta) {
      productLabels.finalCta.membership = str(cta.membership) ?? productLabels.finalCta.membership;
      productLabels.finalCta.training = str(cta.training) ?? productLabels.finalCta.training;
      productLabels.finalCta.medical = str(cta.medical) ?? productLabels.finalCta.medical;
      productLabels.finalCta.default = str(cta.default) ?? productLabels.finalCta.default;
    }
  }

  // ---- about + lab ----
  if (bundle.about) {
    const a = bundle.about;
    if (Array.isArray(a.steps)) {
      const steps = (a.steps as CmsDoc[])
        .map((x) => ({ title: str(x.title) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.title);
      if (steps.length) (aboutPage as { steps: typeof steps }).steps = steps;
    }
    if (Array.isArray(a.labAreas)) {
      const areas = (a.labAreas as CmsDoc[])
        .map((x) => ({ title: str(x.title) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.title);
      if (areas.length) (labPage as { areas: typeof areas }).areas = areas;
    }
  }

  // ---- legal ----
  if (bundle.legal) {
    const l = bundle.legal;
    legalPage.title = str(l.title) ?? legalPage.title;
    legalPage.companyHeading = str(l.companyHeading) ?? legalPage.companyHeading;
    legalPage.privacyHeading = str(l.privacyHeading) ?? legalPage.privacyHeading;
    legalPage.backLink = str(l.backLink) ?? legalPage.backLink;
    if (Array.isArray(l.privacy)) {
      const paras = (l.privacy as CmsDoc[])
        .map((x) => ({ lead: str(x.lead) ?? "", body: str(x.body) ?? "" }))
        .filter((x) => x.lead && x.body);
      if (paras.length) (legalPage as { privacy: typeof paras }).privacy = paras;
    }
  }

  // ---- page meta / SEO ----
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

  // keep exports that no component reads but tooling may: nothing else derived
  void memberships; void assessments; void tests; void medical; void training; void trainingPacks;
}
