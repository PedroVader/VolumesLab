# CMS rollout: Live per service, no mandatory fields, pages on / off

The website and `cms/` are separate Git repositories. Release both.

## What changes for the editor

- **Live checkbox on every service** (sidebar). A service is on the website only while Live is ticked. Existing services stay live after the migration; new ones start hidden.
- **No field is mandatory any more.** The slug fills itself from the name (or the post title) when left empty. What the editor clears in the CMS disappears from the site, with three exceptions that fall back to the bundled value because the site cannot work without them: the contact email, the general Momence booking link, and the SEO titles and descriptions.
- **Pages on / off** (Pages group). Untick About, The Lab, Location, Contact, FAQ, Blog or Legal & Privacy to take that page off: it leaves the menus and the footer and its URL returns 404. The homepage is always on; services are switched one by one with Live.

## Release order

1. Deploy the website update first. It accepts CMS records without a `live` field and a CMS without the `page-visibility` global.
2. Against the CMS production database, apply the pending Payload migrations from `cms/`:

   ```
   npm run payload -- migrate
   ```

   Two migrations are pending: `20260910_120000_service_live` (adds `live`, existing rows stay live, new rows default to hidden) and `20260910_143741_optional_fields_and_page_visibility` (drops the NOT NULL constraints, creates the `page_visibility` table and adds the Google Maps link to Contact, Address & Hours).
   If `payload migrate` asks *"It looks like you've run Payload in dev mode … data loss will occur. Would you like to proceed?"*, answer **N**. It means a `dev` row is sitting in `payload_migrations` (left by a dev-mode push) and Payload is offering to drop the whole schema. Clear that one row and run migrate again:

   ```
   node scripts/migrations-state.mjs            # read-only: shows the table and row counts
   node scripts/migrations-state.mjs clear-dev  # deletes only the "dev" row
   ```

   Note that `cms/.env.local` (pulled by the Vercel CLI) sets `DATABASE_URL=""` and wins over `.env`, so export the value first: `export $(grep ^DATABASE_URL= .env | sed "s/'//g")`.

3. Deploy the CMS update after the migrations have completed.
4. Check in the CMS: create a test with only a name, save, confirm the slug filled itself and the test is absent from the website. Tick Live, save, reload the homepage and open the detail URL. Untick Live and confirm the card disappears and the URL returns not found. Open Pages on / off, untick Legal & Privacy, confirm the footer link is gone and `/legal` returns not found, then tick it again.

## Behaviour to know about

- New services with no bundled counterpart display "Price on booking" until Momence data exists. Existing commercial values are untouched.
- Collection reads are paginated. A collection that loads empty removes every service in its category. A collection that fails to load changes nothing: the site keeps the last list that instance fetched, or the bundled snapshot on a cold instance. The site never empties because of a CMS outage.
- Open browser pages pick up changes on the next navigation or reload.

## Validation

From the website repository: `npx tsc --noEmit`, `npm run build`, and

```
cms/node_modules/.bin/tsx --tsconfig tsconfig.json --test tests/cms-content.test.ts
```

From `cms/`: `npx tsc --noEmit --incremental false`.
