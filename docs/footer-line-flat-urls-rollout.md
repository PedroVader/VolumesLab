# Rollout: footer as one line, flat service URLs, smaller everything (client list of 14/09/2026)

What the client asked for on WhatsApp on 14/09/2026, what changed, and the
order to deploy it in. Website commit on `master` (Vercel auto-deploys), CMS
commit on `main` in `cms/` plus one migration that Pedro runs against
production.

## What changed on the website

| Client request | Where | How it behaves now |
| --- | --- | --- |
| "todo algo más pequeño, que se vean más elementos" | `src/styles.css` | The root font size is 87.5 % (14 px base). Type, paddings and gaps are rem-based so they all shrink together; the 1280 px content column is pinned in px so cards keep their width and only get shorter. Homepage sections lost some vertical padding too. |
| Title on one line, editable size | Home page → **Headline size** (small / medium / large) | Default `medium`. `large` is the old size. |
| Map from the centre to the right margin line, top to bottom | `src/routes/index.tsx` ContactBlock | The map is the whole right half of the contact block, no padding, height of the text column. On phones it stacks under the text at a fixed height. |
| Flat URLs: `/tests/x` → `/x` | `src/routes/$slug.tsx` | Every service lives at `volumeslab.com/<slug>`. The old `/tests/…`, `/assessments/…`, `/medical/…`, `/training/…`, `/memberships/…` addresses answer **301** to the flat one, so links, bookmarks and Google keep working. Canonical tags and breadcrumbs point at the flat URL. |
| Footer columns gone, one line at the bottom | `src/components/site/SiteFooter.tsx` | Logo + one line: `FAQ // Blog // Team // Legal & Privacy // email // phone // Instagram: @handle // Volumes Vision S.L. - CIF // Nº Registro … // Churruca 5, 28004`. Address links to Google Maps. Items with no value are skipped. Wraps on narrow screens. |
| FAQ, Blog, Team in the header too | `src/components/site/SiteHeader.tsx` | After the sections and The Lab, when each page is on. |
| LinkedIn out | site + CMS | Gone from the footer and from the panel (column dropped). |
| Instagram `@volumes.lab` with link | Contact, Address & Hours → Instagram | URL or handle, both work. Empty = no Instagram. |
| Phone "eventually" | Contact, Address & Hours → Phone | Empty = no phone. The bundled placeholder number is gone; type the real one when the line exists. |
| Medical licence number | Contact, Address & Hours → Company → **Registration number** | Shown as `Nº Registro <value>`. Empty = not shown. |
| Team page back when ready | Pages on / off → **Team** (off by default) | `/about/team` reads the Team collection (name, role, credentials, bio, photo). Switch it on when the people exist; it then appears in the header and the footer line. |

### Slug rule that now matters

With flat URLs, a slug has to be unique across the five service collections
and must not collide with a page (`about`, `faq`, `blog`, `contact`, `legal`,
`book`, `cart`). Two SKUs with the same slug would share one address (the
first in catalogue order wins); a slug equal to a page name would be
unreachable. The CMS does not enforce this yet.

## Deploy order

1. **CMS first** (`cms/`, branch `main`): push, let Vercel deploy. The site
   tolerates the old CMS meanwhile: fields it does not find keep their bundled
   defaults (Team off, medium headline, no phone, Instagram `@volumes.lab`).
2. **Migration** `20260916_184520_footer_line_team_headline_size` against
   production (Pedro, from `cms/`):

   ```bash
   export $(grep ^DATABASE_URL= .env | sed "s/'//g")
   pnpm payload migrate:status   # the new one shows as not run
   pnpm payload migrate          # answer N if it offers "dev mode"
   ```

   It adds `site_settings.company_registration_number`,
   `home_page.headline_size` (default `medium`), `page_visibility.team`
   (default `false`) and drops `site_settings.contact_linkedin`. Verified from
   scratch on a local Postgres (`volumes_cms_local`).
3. **Website** (`master`): push, Vercel deploys. Then check in a browser with
   `?preview=volumes2026`:
   - `/tests/vo2max` answers 301 → `/vo2max`, which renders the SKU page;
   - the footer is one line with the address linking to Google Maps;
   - the homepage title fits on one line next to the map.

## For the client (panel)

- **Home page → Headline size**: pick the largest that still fits on one line.
- **Contact, Address & Hours → Instagram**: paste the profile URL or type `@volumes.lab`.
- **Contact, Address & Hours → Phone**: leave empty until the dedicated line exists.
- **Contact, Address & Hours → Company → Registration number**: type it when the licence arrives.
- **Pages on / off → Team**: tick it once the Team collection has people.

## Logo

The logo is not in the CMS. Three PNGs in `public/` do the job: `volumes-mark.png`
(homepage and footer), `volumes-icon.png` (header) and `volumes-triangle.png`
(Opening Soon placeholder), plus `favicon.png` and `og-image.png`. Replacing a
file with the same name and proportions and redeploying is all it takes.

## Verified locally (16/09/2026)

`npx tsc --noEmit`, `npm run build`, the node test suite (13 tests), CMS
`tsc --noEmit --incremental false`, the migration applied from an empty local
database, and the pages above in Chrome against the dev server reading the
production CMS.
