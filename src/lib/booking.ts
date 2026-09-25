// Booking seam. Every transactional intent leaves the site: for now as an
// email to the lab (BOOK_BY_EMAIL, client 23/09/2026), otherwise into
// Momence. The site itself is not transactional, so there is no cart branch
// here any more; see src/lib/momence.ts for the link table.

import type { Product } from "@/data/catalog";
import { BOOK_BY_EMAIL, CONTACT } from "@/data/site";
import { momenceUrl } from "@/lib/momence";
import { catalogueAnchor } from "@/lib/sections";
import { track } from "@/lib/analytics";

/** Contact email, with the bundled address when the CMS field is cleared. */
function bookingEmail(): string {
  return CONTACT.email || "hello@volumeslab.com";
}

function mailto(subject: string): string {
  return `mailto:${bookingEmail()}?subject=${encodeURIComponent(subject)}`;
}

/** The URL a product's primary CTA opens. */
export function bookingHref(product: Product): string {
  return BOOK_BY_EMAIL ? mailto(`Booking: ${product.name}`) : momenceUrl(product);
}

/** Whether a Book link leaves in a new tab (Momence) or opens the mail app. */
export function bookingOpensTab(): boolean {
  return !BOOK_BY_EMAIL;
}

/**
 * Where a generic "Book Services" CTA (header, booking bands) goes: an email
 * while BOOK_BY_EMAIL is on, otherwise the top of the catalogue on the
 * homepage, never Momence's generic landing (client, 12/09/2026).
 */
export function bookServicesHref(): string {
  return BOOK_BY_EMAIL ? mailto("Booking") : `/#${catalogueAnchor()}`;
}

/**
 * Verb shown on the primary CTA. "Book" on every service, memberships and
 * packs included (client, 12/09/2026: "CTA Book en todos, nunca Book Test").
 */
export function bookingLabel(_product: Product): string {
  return "Book";
}

/**
 * Analytics for a transactional click. Call from the CTA's onClick; the link
 * itself is a plain anchor so middle-click and open-in-new-tab keep working.
 */
export function trackBooking(product: Product, sourcePage: string) {
  track("book_cta_click", {
    product: product.slug,
    product_category: product.category,
    destination: BOOK_BY_EMAIL ? "email" : "momence",
    source_page: sourcePage,
  });
  if (product.slug === "glp-1" || product.slug === "doctor-meeting") {
    track("glp1_consultation_click", { source_page: sourcePage });
  }
}
