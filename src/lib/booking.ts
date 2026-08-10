// Booking seam. Every transactional intent — Book, Purchase, Enquire — leaves
// the CMS and lands in Momence. The site itself is not transactional, so there
// is no cart branch here any more; see src/lib/momence.ts for the link table.

import type { Product } from "@/data/catalog";
import { momenceUrl } from "@/lib/momence";
import { track } from "@/lib/analytics";

/** The external URL a product's primary CTA opens. */
export function bookingHref(product: Product): string {
  return momenceUrl(product);
}

/** Verb shown on the primary CTA. Memberships enquire; everything else books. */
export function bookingLabel(product: Product): string {
  if (product.ctaLabel) return product.ctaLabel;
  return product.category === "membership" ? "Enquire" : "Book";
}

/**
 * Analytics for a transactional click. Call from the CTA's onClick; the link
 * itself is a plain anchor so middle-click and open-in-new-tab keep working.
 */
export function trackBooking(product: Product, sourcePage: string) {
  track("book_cta_click", {
    product: product.slug,
    product_category: product.category,
    destination: "momence",
    source_page: sourcePage,
  });
  if (product.slug === "glp-1" || product.slug === "doctor-meeting") {
    track("glp1_consultation_click", { source_page: sourcePage });
  }
}
