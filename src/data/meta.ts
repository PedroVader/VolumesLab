// Page titles and descriptions, in one place.
//
// These were written by hand inside each of the site's static routes, which
// meant the one thing a client most often wants to tune, how a page reads in
// Google, was the one thing they could not reach. This becomes the "SEO" group
// on each page in the CMS.
//
// Dynamic pages (a test, an assessment, a post) build their meta from the item
// itself and are not listed here; editing the product edits its meta.

import { COMING_SOON } from "@/data/site";

export type PageMeta = {
  /** Browser tab and search result title. */
  title: string;
  /** Search result snippet. */
  description: string;
  /** Title when shared on social. Falls back to `title`. */
  shareTitle?: string;
  /** Description when shared on social. Falls back to `description`. */
  shareDescription?: string;
  /** Keep the page out of search results. */
  noindex?: boolean;
};

export const pageMeta = {
  home: {
    title: "Volumes Lab, Madrid Health & Performance Lab",
    description:
      "Volumes Lab combines advanced testing, a medical team, personal training and peptide therapies in one space in central Madrid. Membership options available.",
    shareDescription:
      "Advanced testing, a medical team, personal training and peptide therapies in one space.",
  },
  about: {
    title: "About, Volumes Lab Madrid",
    description:
      "One team, one location and one clear plan: test, understand, treat or train, retest.",
  },
  team: {
    title: "The Team, Volumes Lab Madrid",
    description: "The medical and performance team behind Volumes Lab.",
  },
  lab: {
    title: "The Lab, Volumes Lab Madrid",
    description:
      "Testing, medical expertise and training in one location. The integrated Volumes Lab model.",
  },
  location: {
    title: "Location, Volumes Lab Madrid",
    description:
      "Volumes Lab, Churruca 5, Justicia, Madrid. Map, access, transport and opening hours.",
  },
  contact: {
    title: "Contact, Volumes Lab Madrid",
    // The old copy said Chamberí. The lab is in Justicia.
    description:
      "Visit Volumes Lab at Calle Churruca 5, Justicia, Madrid. Email, phone, WhatsApp, metro and parking.",
    shareDescription: "Calle Churruca 5, Madrid. Reach the team.",
  },
  faq: {
    title: "FAQ, Volumes Lab Madrid",
    description:
      "Answers to common questions about testing, preparation, results, memberships and gift cards at Volumes Lab, Madrid.",
    shareDescription: "Preparation, cancellations, gift cards and more.",
  },
  blog: {
    title: "Journal, Volumes Lab Madrid",
    description:
      "Field notes on performance testing and longevity training, written by the team that runs the tests.",
    shareDescription: "Field notes on performance testing and longevity training.",
  },
  legal: {
    title: "Legal & Privacy, Volumes Lab",
    description: "Company information and privacy notice for volumeslab.com.",
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof pageMeta;

/** Build the meta tags for a page from its entry above. */
export function metaTags(key: PageMetaKey) {
  // While the pre-launch gate is up, every page shows the placeholder, so
  // every page should also read as the placeholder in tabs and shares.
  if (COMING_SOON) {
    return [
      { title: "Volumes Lab, Madrid · Opening Soon" },
      { name: "description", content: "Volumes Lab. Churruca 5, 28004 Madrid. Opening soon." },
    ];
  }
  // `satisfies` keeps the keys literal but narrows each entry to its own
  // shape, so widen it back to PageMeta before reading optional fields.
  const m: PageMeta = pageMeta[key];
  const tags: Record<string, string>[] = [
    { title: m.title },
    { name: "description", content: m.description },
    { property: "og:title", content: m.shareTitle ?? m.title },
    { property: "og:description", content: m.shareDescription ?? m.description },
  ];
  if (m.noindex) tags.splice(1, 0, { name: "robots", content: "noindex, follow" });
  return tags;
}
