# CMS rollout: sections, order, price and duration, Legal as plain text

Follow-up to `cms-live-rollout.md` and `cms-faq-blog-copy-rollout.md`. The client's list of 11–12/09/2026:

- section titles editable, sections on/off, section order
- SKU order inside a section, and moving a SKU from one section to another
- CTA "Book" everywhere, never "Book Test"
- price and duration editable per SKU
- Legal page without the structured company rows; the Legal link only next to the tax ID at the bottom

## Why a new SKU said "Price on booking" and an old slug showed a price

The website never read prices or durations from Momence. It carried a snapshot of the catalogue in its own code (`src/data/catalog.ts`) and used it as the baseline for every CMS document with the same slug. Creating `strength-assessment` in the CMS matched that snapshot, so €160 / 60 minutes / "Book Test" appeared out of nowhere; `vo3max` had no match and said "Price on booking". Now the price and the duration are fields on every SKU, and what the CMS says is what the site shows. The migration copies the values the site was already showing into the existing SKUs, so nothing changes until an editor changes it.

## What changes for the editor

Per SKU (every service collection), in the sidebar and under the description:

- **Price (€)** and **Duration**: free values. Empty price = "Price on booking"; empty duration = nothing shown.
- **Order**: 1 is first inside its section. Empty goes after the numbered ones, oldest first (so a new SKU no longer jumps to the top). The panel lists SKUs in this order too.
- **Section on the website**: Tests, Assessments, Medical Appointment, Train or Memberships. Changing it moves the SKU to that section (card, URL and breadcrumbs follow) without re-creating it. The document keeps living in the list it was created in.

Home page → **Sections**: one list of the five sections. Drag to reorder. Each row has "Show on the website", a title and a description. The title is also the name in the top menu, the footer and the breadcrumbs. A section switched off (or removed from the list) leaves the homepage, the menu and the footer, and its SKU pages answer "not found" (like Pages on / off). A section with no live SKU is not shown either. An empty list changes nothing.

Legal page: title, heading, paragraphs and back link only. The "Company information" rows are gone. The registered name and the tax ID (Contact, Address & Hours → Company) now show in the footer of every page as `VOLUMES VISION S.L. B26934380 · LEGAL & PRIVACY`; that is the only Legal link.

Every Book button reads "Book", memberships and packs included.

## Release order

1. Deploy the website first. It understands both the old CMS shape (one group per section, no price fields) and the new one.
2. From `cms/`, against the production database (see `cms-live-rollout.md` for the `DATABASE_URL` export and the "dev mode" prompt), apply `20260912_144002_sections_order_price_legal`:

   ```
   npm run payload -- migrate
   ```

   It adds `section`, `order`, `price`, `duration` to the five service tables, creates `home_page_sections`, copies the current section titles into it, seeds the price/duration/order the site was showing for the 19 existing slugs, then drops the old `home_page` section columns and `legal_page.company_heading`. It was generated with `migrate:create` against a local Postgres at the current schema and run there against sample rows.

3. Deploy the CMS.
4. Check: open a test, confirm the price and duration are filled, change the duration, reload the test page. Set Order 1 on another test, reload the homepage. Open Home page → Sections, untick Train, reload: no Train in the menu, footer or homepage, `/training/pt-pack-3` is not found. Tick it back. Open `/legal`: title and paragraphs only; footer shows name, tax ID and the link.

## Validation

From the website repository: `npx tsc --noEmit`, `npm run build`, and

```
cms/node_modules/.bin/tsx --tsconfig tsconfig.json --test tests/cms-content.test.ts
```

From `cms/`: `npx tsc --noEmit --incremental false`. To regenerate a migration locally: `createdb volumes_cms_local`, then `DATABASE_URL=postgres://localhost/volumes_cms_local PAYLOAD_SECRET=x pnpm payload migrate` and `... migrate:create <name> --force-accept-warning`.
