// Booking seam. Today every "Book" action adds the item to the on-site cart.
// When a product gets a Momence booking URL (catalog `bookingUrl`, wired in the
// Momence integration phase), the same action deep-links straight into that
// item's Momence booking flow instead — no other code needs to change.

import type { Product } from "@/data/catalog";

export type BookingTarget =
  | { kind: "momence"; href: string } // external Momence booking (Phase 5)
  | { kind: "cart" }; // interim on-site add-to-cart

export function bookingTarget(product: Product): BookingTarget {
  if (product.bookingUrl) return { kind: "momence", href: product.bookingUrl };
  return { kind: "cart" };
}

// Deep-link that opens Book Now with a specific item highlighted (brief 9.5).
export function bookNowHref(slug: string): string {
  return `/book?add=${slug}`;
}
