# Letter case and background colour (client, 29/09/2026)

> "me gustaría poder escoger caps vs minúsculas en todos los sitios y poder
> cambiar el color general del background de la web"

Three new fields on **Contact, Address & Hours**, under Text size:

- **Titles: letter case** — UPPERCASE (default, as designed) / As typed / lowercase.
  Every `font-display uppercase` element: hero, section titles, SKU titles, cards, blog, FAQ.
- **Labels, buttons & menu: letter case** — same options. Every `font-mono uppercase`
  element: top menu, Book / More info, price + duration row, eyebrows, footer line.
- **Background colour** — hex (`#FFFFFF`, `fff`, with or without `#`). Empty = the
  original `#EBE9E5`. Cards / popovers are mixed 33% towards white, secondary /
  accent fills 5% towards black, so the tonal steps survive a new colour. Text
  stays dark: a dark background needs a follow-up (foreground inversion).

Mechanism: `cmsLookCss()` in `src/lib/cms-content.ts` writes the root `<style>`
(text size + `--case-titles` / `--case-labels` + background tokens);
`src/styles.css` maps `.font-display.uppercase` / `.font-mono.uppercase` to those
variables. Anything that is not a 3/6-digit hex is ignored, so nothing else
reaches the `<style>`.

Caveat: the logos currently uploaded in the CMS are JPGs (`OG VOLUMES.jpg`,
`OG VOLUMES-1.jpg`), so they carry the grey ground with them and show as a grey
box on any other background. Upload a PNG with transparency or an SVG.

## Rollout (order matters, see the 19/09 500)

1. Run the migration against prod **before** pushing the CMS:
   ```sh
   cd cms && export $(grep ^DATABASE_URL= .env | sed "s/'//g") && pnpm payload migrate
   ```
   `20260929_121327_letter_case_background` only adds three columns (defaults
   = today's site), so the currently deployed CMS keeps working.
2. Push the CMS (`main`), then the site (`master`).

## Checks run

- `npx tsc --noEmit`, `npm run build`, 15 node tests (new: letter case + background).
- CMS `npx tsc --noEmit --incremental false`; migration applied to `volumes_cms_local`.
- Playwright at 1440: default computes `uppercase` / `rgb(235, 233, 229)`; with the
  CSS for As typed / lowercase / `#ffffff` computes `none` / `lowercase` / white.
