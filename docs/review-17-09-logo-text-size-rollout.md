# Rollout: client review of 17/09/2026 (breadcrumb, map, mobile, logo, footer, text size)

What the client reviewed on 17/09/2026, what changed, and the order to deploy
it in. Website commit on `master` (Vercel auto-deploys), CMS commit on `main`
in `cms/` plus one migration and one Vercel Blob store that Pedro sets up.

## What changed on the website

| Client request | Where | How it behaves now |
| --- | --- | --- |
| "HOME / MORE / FORCE PLATES" path above every SKU title → remove | `src/components/site/ProductDetail.tsx` | Gone, with its JSON-LD. `Breadcrumbs.tsx` deleted. The title now sits at the top of the hero. |
| Homepage map runs past the right margin line to the edge of the window → stop at the line | `src/routes/index.tsx` ContactBlock | The map's right side sits 24px from the viewport edge, on the vertical rule `SiteChrome` draws. On phones it stacks under the text inside the content padding, framed. |
| Mobile view breaks | `src/components/site/SiteFooter.tsx` | Cause: the footer line was one `<p>` of adjacent `nowrap` spans with nothing breakable between them, so every page was ~1030px wide on a phone and the browser zoomed out to fit it. The line is now a wrapping flex row; every page measures exactly the viewport at 390 and 768px. |
| Logo editable from the CMS | Contact, Address & Hours → **Logo** (Menu icon, Logo with wordmark) | Two uploads. Empty = the bundled default logo. Needs the Blob store below. |
| Footer "Legal & Privacy" underlined → like the others | `SiteFooter.tsx` | Plain link like FAQ, Blog, Team. |
| "General size: is there a middle point?" | Contact, Address & Hours → **Text size** (small / medium / large) | Root font size 14 / 15 / 16px. Default `medium` (15px) = the middle point. `large` is the original site, `small` the 14/09 version. Written as an inline `<style>` from the CMS bundle so server and client agree. |

## Deploy order

1. **Vercel Blob store** (Pedro, Vercel dashboard, once). Uploads in the
   panel (logos, team photos, post covers) have never worked in production:
   the serverless filesystem is read-only, Payload warns about it at build
   time. On the `volumes-cms` project: Storage → Create Database → **Blob**
   → connect it to the project. Vercel injects `BLOB_READ_WRITE_TOKEN`; the
   config enables `@payloadcms/storage-vercel-blob` only when that variable
   exists, so local dev keeps writing to `media/`. Redeploy the CMS after
   connecting the store (env vars apply to new deployments).
2. **CMS** (`cms/`, branch `main`): push, let Vercel deploy. The site
   tolerates the old CMS meanwhile: no `textSize` = medium, no `branding` =
   bundled logos.
3. **Migration** `20260917_113844_logo_and_text_size` against production
   (Pedro, from `cms/`):

   ```bash
   export $(grep ^DATABASE_URL= .env | sed "s/'//g")
   pnpm payload migrate:status   # the new one shows as not run
   pnpm payload migrate          # answer N if it offers "dev mode"
   ```

   It adds `site_settings.branding_logo_id`, `site_settings.branding_mark_id`
   (FKs to `media`) and `site_settings.text_size` (default `medium`).
   Verified from the current schema on the local Postgres (`volumes_cms_local`).
4. **Website** (`master`): push, Vercel deploys. Then check in a browser with
   `?preview=volumes2026`:
   - a SKU page (`/vo2max`) has no path above the title;
   - the homepage map ends on the right vertical line;
   - on a phone (or DevTools at 390px) the page is not zoomed out and the
     footer line wraps;
   - the page source has `<style>html{font-size:93.75%}</style>` in `<head>`.

## For the client (panel)

- **Contact, Address & Hours → Text size**: medium is the new default. Large
  brings the original size back, small the 14/09 one.
- **Contact, Address & Hours → Logo**: upload a PNG/SVG for the menu icon
  (square, shown 32px high) and for the logo with wordmark (homepage top and
  footer). Clear the field to go back to the default.
