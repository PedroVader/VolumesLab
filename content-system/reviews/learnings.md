# Editorial learnings

## 2026-09-07: CMS rich text is flattened

- Evidence: `src/lib/cms.ts` converts every top-level Lexical node to plain text, and `src/routes/blog.$slug.tsx` renders the resulting values as paragraphs.
- Effect: headings, lists, tables, and linked source structure are not preserved on article pages.
- Rule: do not publish long-form drafts until the renderer supports and visually verifies the required structure.

## 2026-09-07: Service naming needs reconciliation

- Evidence: the approved editorial list uses DEXA body composition terminology, while `src/data/catalog.ts` currently lists `3D Body Composition` and a separate `Bone Mineral Density` test.
- Effect: a draft must not claim that Volumes Lab offers a DEXA body composition scan until the client confirms the service and product-page destination.
- Rule: keep service-specific calls to action out of DEXA drafts until the catalogue and client confirmation agree.
