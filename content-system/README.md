# Volumes Lab editorial system

This directory is the shared, versioned source for research, briefs, drafts, review notes, and editorial rules. It is intentionally stored in the product repository so content decisions remain next to the routes, product catalogue, metadata, and CMS adapter they affect.

## Source-of-truth model

- GitHub: evidence, briefs, drafts, rules, and review history.
- Google Drive: collaborative review and comments for non-technical stakeholders.
- Payload CMS: authorized publication only.
- Momence: prices, durations, and availability. Do not duplicate those facts in editorial drafts without confirming them at publication time.

## Pilot scope

The first batch covers three approved explanatory articles:

1. Estimated vs Laboratory-Measured VO2max: What Is the Difference?
2. DEXA vs Bioelectrical Impedance: Which Measures Body Composition More Accurately?
3. Resting Energy Expenditure: What It Is and How It Is Measured

Each article has a dated research ledger, a brief, and an English draft. None is approved for publication yet.

## Workflow

`research -> ledger -> brief -> draft -> client review -> medical/editorial review -> CMS implementation -> QA -> explicit publication approval -> live verification`

## Current technical constraint

`src/lib/cms.ts` converts the CMS rich-text tree into a flat `string[]`, and `src/routes/blog.$slug.tsx` renders every item as a paragraph. Headings, lists, tables, and source-link structure would therefore be flattened on the live article page. Resolve and visually verify the article renderer before publishing these drafts.

## Review states

- `researched`: evidence ledger complete enough to brief.
- `briefed`: scope and claims defined.
- `drafted`: reviewable copy exists.
- `approved`: client and required subject-matter review complete.
- `implemented`: entered in the CMS or site source, but not necessarily published.
- `published`: explicitly authorized and live.

See `content-state.json` for the current state of every approved topic.
