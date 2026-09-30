// Launch switch. True = every route serves the "Opening Soon" placeholder
// and the full site stays built but unreachable (?preview=volumes2026 unlocks
// it in one browser). Went live on 30/08/2026; put back up on 09/09/2026 at
// the client's request; relaunched on 30/09/2026. Flip to true to hide it again.
export const COMING_SOON = false;

// Analytics switch. False = no consent notice and Google Analytics never
// loads (without consent it cannot). The client wants to open without the
// notice (12/09/2026) and switch it on "when the moment comes": flip to true.
export const ANALYTICS_ENABLED = false;

// Booking switch. True = every Book CTA (each SKU's Book, the header's Book
// Services, the booking bands) opens an email to CONTACT.email instead of
// Momence or the catalogue (client, 23/09/2026: "Book now -> por ahora todo
// mailto: hello@volumeslab.com"). Flip to false to send SKUs to Momence again.
export const BOOK_BY_EMAIL = true;

// Pages the client can switch off from the CMS ("Pages on / off"). A page
// that is off leaves the menus and the footer and its URL returns 404. The
// homepage and the service pages are not here: services have their own Live
// checkbox, one by one.
//
// Team is off by default: the client is still writing it (14/09/2026) and
// switches it on from the CMS when it is ready. While on, it sits in the top
// menu and the footer next to FAQ and Blog.
export const DEFAULT_PAGES = {
  about: true,
  lab: true,
  location: true,
  contact: true,
  faq: true,
  blog: true,
  legal: true,
  team: false,
};
export const PAGES = { ...DEFAULT_PAGES };
export type PageKey = keyof typeof PAGES;

// Size of everything (client, 17/09/2026). The 14/09 request made the whole
// site 14px-based; the client then found it "muy pequeño" and asked for a
// middle point, so the root font size is now a CMS choice: small is the 14px
// version, large the original 16px, medium the 15px in between (default).
// Type, paddings and gaps are rem-based, so this one value scales them all;
// the 1280px content column and the mono labels stay fixed.
export type TextSize = "small" | "medium" | "large";
export const TEXT_SIZES: TextSize[] = ["small", "medium", "large"];
export const TEXT_SIZE_CSS: Record<TextSize, string> = {
  small: "87.5%",
  medium: "93.75%",
  large: "100%",
};
export const TEXT = { size: "medium" as TextSize };

// Letter case and background colour (client, 29/09/2026: "poder escoger caps
// vs minúsculas en todos los sitios" and "cambiar el color general del
// background"). Every uppercase on the site is either a title (condensed
// display type) or a label, button or menu entry (mono type), so the CMS
// picks the case per family and styles.css reads it from --case-titles /
// --case-labels. Uppercase is the design as built.
export type LetterCase = "uppercase" | "asTyped" | "lowercase";
export const LETTER_CASES: LetterCase[] = ["uppercase", "asTyped", "lowercase"];
export const LETTER_CASE_CSS: Record<LetterCase, string> = {
  uppercase: "uppercase",
  asTyped: "none",
  lowercase: "lowercase",
};

// The logos, editable from the CMS since 17/09/2026 (Contact, Address & Hours
// → Logo). `logo` is the small mark next to the name in the top menu; `mark`
// is the logo with the wordmark on the homepage and in the footer. The
// bundled files are the fallback: a cleared upload means "the default logo",
// never a broken image.
export const DEFAULT_BRANDING = {
  logo: "/volumes-icon.png",
  mark: "/volumes-mark.png",
};
export const BRANDING = { ...DEFAULT_BRANDING };

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
};

// Legal identity, shown in the footer line of every page to satisfy the LSSI
// (Ley 34/2002, art. 10). The values come from the CMS (Contact, Address &
// Hours → Company); null here means "not shown until the client types it".
// registrationNumber is the health-centre registration the client is
// applying for (14/09/2026), shown as "Nº Registro …" once it exists.
export const COMPANY: {
  legalName: string;
  tradingName: string;
  taxId: string | null;
  registeredAddress: string | null;
  registrationNumber: string | null;
} = {
  legalName: "Volumes Vision S.L.",
  tradingName: "Volumes Lab",
  taxId: null,
  registeredAddress: null,
  registrationNumber: null,
};

export const CONTACT = {
  email: "hello@volumeslab.com",
  /**
   * Display form. Empty until the client has the dedicated line (14/09/2026):
   * the footer shows a phone only when the CMS has one.
   */
  phone: "",
  /** tel: href form. */
  phoneHref: "",
  /** Full profile URL; the footer shows the handle taken from it. */
  instagram: "https://www.instagram.com/volumes.lab/",
};

/**
 * "@volumes.lab" for the footer, whether the CMS holds the profile URL or just
 * the handle. Empty = no Instagram in the footer.
 */
export function instagramHandle(value = CONTACT.instagram): string {
  const v = value.trim();
  if (!v) return "";
  const m = v.match(/instagram\.com\/([^/?#]+)/i);
  const handle = (m ? m[1] : v).replace(/^@/, "");
  return handle ? `@${handle}` : "";
}

/** The profile URL to open, built from the handle when only that was typed. */
export function instagramUrl(value = CONTACT.instagram): string {
  const handle = instagramHandle(value).slice(1);
  return handle ? `https://www.instagram.com/${handle}/` : "";
}

export const HOURS = {
  weekdays: { label: "Monday to Friday", value: "9h00 to 20h00" },
  weekend: { label: "Saturday & Sunday", value: "9h00 to 15h00" },
  /** Compact one-line form. */
  short: "Mon–Fri 9h00–20h00 · Sat–Sun 9h00–15h00",
  walkIns: "Walk-ins welcome",
};

/** Opening hours in schema.org format, for JSON-LD. */
export const OPENING_HOURS_SPEC = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
  { days: ["Saturday", "Sunday"], opens: "09:00", closes: "15:00" },
] as const;

/** Google Maps query for the embedded iframe: the business pin, not just the street. */
export const MAP_QUERY = `${ADDRESS.name}, ${ADDRESS.full}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

// Share link of the Volumes Lab place on Google Maps, supplied by the client
// (10/09/2026). Editable in the CMS: Contact, Address & Hours → Address → Google Maps link.
// `let` so the CMS-applied value can replace it; ESM live bindings propagate.
export let MAP_LINK = "https://maps.app.goo.gl/tqEVDEmC5sPg9y1W8";

/** Used by the CMS apply step. An empty value keeps the current link. */
export function setMapLink(url: string) {
  if (url) MAP_LINK = url;
}
