
# Volumes Lab — website build plan

Full English marketing site for Volumes, Madrid's boutique Human Health & Performance Lab, built in TanStack Start with the selected Surgical Red / editorial direction (Inter Tight display + JetBrains Mono, off-white background, surgical red accent, off-black foreground).

## Design system

Port the chosen prototype's tokens into `src/styles.css` verbatim:
- `--background` off-white, `--foreground` near-black, `--primary` surgical red (hsl 0 75% 45%), `--muted` mid-grey, `--border` translucent black.
- Fonts loaded via `<link>` in `__root.tsx` head: Inter Tight (display, 700/800), Inter (sans, 400–600), JetBrains Mono (mono).
- Reusable primitives: `SiteHeader` (sticky nav with mega-dropdowns), `Footer`, `BookBand` (recurring red CTA band), `ProductPage` layout, `PageHero`.

## Route structure

```text
/                          Home (hero, services ticker, hero image, about+map, CTA band, footer)
/about                     (About redirects to home about section — user said "About → no", so nav skips it)
/memberships/health-performance
/memberships/glp-1
/assessments/foundations
/assessments/longevity
/assessments/performance
/tests/3d-body-composition
/tests/bone-mineral-density
/tests/gait-analysis
/tests/grip-strength
/tests/metabolic-assessment
/tests/mobility-assessment
/tests/strength-assessment
/tests/vo2max
/faq
/contact
/book                      Shop-style menu (Memberships / Complete Assessments / Individual Tests / Buy Packages)
/book/checkout             Cart + checkout summary
```

Each product landing page shares the same template: hero (name, one-line summary, price, duration), what it measures, protocol, who it's for, focused "Book this test" CTA that deep-links to `/book?add=<slug>`.

Header dropdowns: Memberships / Complete Assessments / Individual Tests each open a mega-menu listing their subcategories. FAQ, Contact, and Book Appointment sit at the right; Book is the filled red-hover button from the prototype.

## Home page composition (matches selected direction exactly)

1. Sticky nav with dropdowns
2. Hero: "[ EST. 2024 / MADRID ]" eyebrow → "Human performance testing and training in Madrid" headline → short supporting copy → services list (VO2max, Strength, Mobility, Body Composition, Peptides, Personal Training) and "Calle Churruca 5" location line.
3. Black services ticker strip
4. Wide clinical image
5. Two-column About block: "Madrid's first boutique Human Health & Performance Lab" headline + the three paragraphs of copy provided, next to an embedded Google Map iframe pinned at Calle Churruca 5, Madrid (with the floating "VOLUMES MADRID" pin card overlay from the prototype).
6. Red "Book Appointment" CTA band
7. Footer (Instagram/LinkedIn, contact, book now, FAQ, Privacy/Terms, address).

Additional Book Appointment CTA bands are inserted between sections on the longer product/assessment pages, matching the prototype's red band styling.

## Booking flow (frontend-only for now)

`/book` renders four sections (Memberships, Complete Assessments, Individual Tests, Buy Packages) with product cards. Each card has two actions: **Add to cart** and **Purchase as gift card**. Cart state lives in a Zustand store persisted to `localStorage`. A cart drawer opens from the header; `/book/checkout` shows line items, totals, and a "Continue to payment" button that is disabled with a note that payment will be wired in a follow-up (see below).

FAQ page: accordion of the sample questions the user listed (prep, cancellations, gift cards, booking for someone else, etc.) with placeholder answers ready to be edited.

Contact page: location card with the embedded map, email, phone, hours, and a simple contact form (submits to a placeholder — no backend wired in this pass).

## SEO / metadata

Every route sets its own `head()` with unique title, description, og:title, og:description. Root sets sitewide defaults (Volumes — Human Performance Testing & Training in Madrid). Leaf test/assessment pages get `og:image` derived from their hero image once generated.

## Images

Generate a small hero-image set with the prototype's clinical aesthetic (sensor close-up, lab environment, and one Madrid-map abstraction). All product/test pages reuse a shared hero treatment; no stock photos.

## Technical notes

- TanStack Router file-based routes as listed above; each product page uses `createFileRoute`.
- Nav uses `<Link to>` with `activeProps` for active states.
- No backend, auth, database, or payments in this pass — pure frontend site. Content lives in typed data files (`src/data/tests.ts`, `memberships.ts`, `assessments.ts`, `packages.ts`, `faq.ts`) so real prices and copy are easy to edit later.

## Follow-ups to decide after this pass

1. **Real checkout / payments.** The booking flow needs a real backend to actually sell packages, memberships, and gift cards. Two natural options: Shopify (best if you want inventory, gift cards, and checkout out of the box) or Lovable Payments + Cloud (lighter, custom flow). Recommend deciding this next.
2. **Google Maps API key.** The embedded map uses the free `google.com/maps?output=embed` iframe by default — no key required. Switch to the JS API only if you want custom styling.
3. **Real FAQ answers, prices, phone number, socials, legal copy** — placeholders will ship until you provide them.
