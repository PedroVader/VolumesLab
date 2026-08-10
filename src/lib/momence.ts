// ─────────────────────────────────────────────────────────────────────────────
// MOMENCE LINKS — SINGLE SOURCE OF TRUTH
// ─────────────────────────────────────────────────────────────────────────────
// Architecture decision (client, 07/08/2026):
//
//   "Every Book / Purchase / Enquire CTA goes into Momence.
//    Every More info CTA stays inside the Volumes CMS.
//    No hay transaccional en el CMS."
//
// So this site never takes money and never holds a cart. Its only job is to
// explain the offer and hand the visitor to Momence at the moment of intent.
//
// EVERYTHING you need to change when the Momence catalogue is built lives in
// this file. No component needs editing.
//
// ── HOW TO FILL THIS IN ──────────────────────────────────────────────────────
// Order matters: the offerings must exist in Momence before they have links.
//
// 0. Build the catalogue in Momence first:
//      · Tests / Assessments / Doctor meeting → Appointments (services)
//      · Training packs                       → Packages
//      · Memberships                          → Memberships
//
// 1. BOOKING_HOME: click the account menu at the TOP RIGHT of the Momence
//    dashboard (the host name, not Settings) → "Your page". That opens the
//    public booking page. Copy its URL and paste it below. It is what the
//    header "Book Services" button opens and the fallback for every SKU.
//
// 2. Per-SKU links: open each offering and copy its share link. Momence issues
//    short links shaped like https://momence.com/s/<id>, one per offering.
//    Paste each into LINKS below, next to the matching catalogue slug.
//
// 3. Anything left as "" simply falls back to BOOKING_HOME, so the site is
//    never broken while the Momence catalogue is still being built.
// ─────────────────────────────────────────────────────────────────────────────

import type { Product } from "@/data/catalog";

/** Momence host ID for the Volumes Lab account (from the dashboard URL). */
export const MOMENCE_HOST_ID = "319187";

/**
 * Public Momence booking page for Volumes Lab, supplied by the client from the
 * Momence dashboard (10/08/2026). Note the slug is the business handle, not the
 * host ID — momence.com serves its SPA with a 200 for any path, so a wrong URL
 * here fails silently in the browser rather than 404ing. Change it only against
 * a link copied from the dashboard.
 */
export const BOOKING_HOME = "https://momence.com/u/volumes-lab-ClkWKG";

/** Whether BOOKING_HOME came from the real Momence account rather than a guess. */
export const BOOKING_HOME_VERIFIED = true;

/**
 * Per-SKU Momence deep links, keyed by catalogue slug.
 * Empty string = not wired yet = falls back to BOOKING_HOME.
 */
export const LINKS: Record<string, string> = {
  // ── Memberships (Enquire) ──────────────────────────────────────────────────
  "health-performance": "",
  "glp-1": "",

  // ── Assessments (Book) ─────────────────────────────────────────────────────
  foundational: "",
  longevity: "",
  performance: "",

  // ── Individual tests (Book) ────────────────────────────────────────────────
  vo2max: "",
  "3d-body-composition": "",
  "bone-mineral-density": "",
  "metabolic-assessment": "",
  "grip-strength": "",
  "strength-assessment": "",
  "mobility-assessment": "",
  "gait-analysis": "",

  // ── Medical appointment (Book) ─────────────────────────────────────────────
  "doctor-meeting": "",

  // ── Training sessions and packs (Purchase) ─────────────────────────────────
  "training-session": "",
  "pt-pack-3": "",
  "pt-pack-5": "",
  "pt-pack-10": "",
  "cardio-pack-4": "",
};

/** Resolve the Momence URL a product's Book / Purchase / Enquire CTA opens. */
export function momenceUrl(product: Pick<Product, "slug">): string {
  return LINKS[product.slug] || BOOKING_HOME;
}

/** True when this product has its own Momence deep link (not just the fallback). */
export function hasDeepLink(product: Pick<Product, "slug">): boolean {
  return Boolean(LINKS[product.slug]);
}

/** Slugs still waiting on a Momence link — surfaced by the /momence-status check. */
export function unwiredSlugs(): string[] {
  return Object.keys(LINKS).filter((slug) => !LINKS[slug]);
}
