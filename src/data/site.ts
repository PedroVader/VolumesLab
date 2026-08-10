// Contact and opening hours — single source of truth.
//
// These values were drifting across the footer, the location page, the contact
// page and the FAQ. They are confirmed against the client's homepage
// architecture (07/08/2026), so every surface now reads them from here.

export const ADDRESS = {
  name: "Volumes Lab",
  street: "Calle Churruca 5",
  district: "Justicia",
  postalCode: "28004",
  city: "Madrid",
  country: "ES",
  /** Short form used in headers and footers. */
  short: "Churruca 5 (Justicia), 28004",
  /** Full form used in address blocks and structured data. */
  full: "Calle Churruca 5, 28004 Madrid, Spain",
} as const;

export const CONTACT = {
  email: "hello@volumeslab.com",
  /** Display form. */
  phone: "+34 600 000 123",
  /** tel: href form. */
  phoneHref: "tel:+34600000123",
} as const;

export const HOURS = {
  weekdays: { label: "Monday to Friday", value: "9h00 to 20h00" },
  weekend: { label: "Saturday & Sunday", value: "9h00 to 15h00" },
  /** Compact one-line form. */
  short: "Mon–Fri 9h00–20h00 · Sat–Sun 9h00–15h00",
  walkIns: "Walk-ins welcome",
} as const;

/** Opening hours in schema.org format, for JSON-LD. */
export const OPENING_HOURS_SPEC = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
  { days: ["Saturday", "Sunday"], opens: "09:00", closes: "15:00" },
] as const;

/** Google Maps query string shared by the map link and the embedded iframe. */
export const MAP_QUERY = ADDRESS.full;
export const MAP_LINK = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
