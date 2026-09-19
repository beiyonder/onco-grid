# Work report — P5 C2 Responsive and reduced presentation

## Problem

The relationship path retained semantic DOM order on narrow screens but required 924 px of horizontal scrolling inside a 336 px track. Reduced motion existed, but reduced-transparency behavior was unspecified. Print output could preserve the active profile only incidentally: Map remained the active mode, source disclosures stayed collapsed, translucent surfaces/shadows persisted, and a Close profile control appeared in print.

## Decision

Deliver Phase 5 slice 3 on `feat/responsive-presentation-modes`. At 720 px and below, flatten the relationship path into one vertical semantic sequence and rotate the existing directional arrows rather than reproducing desktop coordinates. Retain the already-flat Map/context composition. Keep the global reduced-motion rule. Add `prefers-reduced-transparency` with opaque surfaces, no blur/shadows, and removed decorative geometry. Replace print styling with an opaque source-first document: hide navigation, filters, Map, list rail, actions, dialogs, and controls; force the selected List/profile visible even when Map mode is active; expose full-height detail content; print the relationship path vertically; retain source IDs/dates/authority labels; and force disclosure bodies visible.

## Evidence

- Mobile relationship flattening at `390×844` — track `scrollWidth` and `clientWidth` both equalled 336; five nodes each measured 332 px; all four connectors measured 332 px and their arrows rotated to vertical direction. Page `scrollWidth = clientWidth = 390`.
- Semantic mobile order remained Registry source → Trial entity → India sites → Trial room → Synthetic patient with connector labels describes, lists, discussed in, and human review.
- Mobile Map remained a one-column, 420 px coordinate lens with one visible selected marker label and a static context region; no desktop overlay was reproduced.
- Reduced motion — emulation produced `0.00001s` transition duration and `scroll-behavior: auto` while preserving full interaction and semantic context.
- Reduced transparency — raw Chromium media emulation matched the preference; topbar and authority surfaces became opaque `rgb(251, 252, 251)`, backdrop filter became none, profile/detail/marker shadows became none, and both journey background geometry and geographic coordinate watermark disappeared. Dialog backdrop became opaque.
- Print fallback from active Map — Map, navigation, filters, actions, tabs, dialogs, and result rail were hidden; the hidden List/profile was forced visible; detail max-height became none and overflow visible; ClinicalTrials.gov snapshot date remained visible; source plane became white/opaque; relationship path became a vertical grid.
- Print completeness — Close profile disappeared; registry eligibility and source provenance disclosure bodies became visible even when closed on screen. Source name, NCT identifier, registry date, snapshot date, separate registry/site status, trial entity, exact relationship labels, sponsor, conditions, interventions, and authority copy remained printable.
- Printed profile screenshot showed opaque white surfaces, black text, source/status borders, vertical relationships, complete Overview facts, and no navigational chrome or spatial dependency.
- Final clean narrow reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

`prefers-reduced-transparency` is not yet supported by Puppeteer's high-level media-feature validator; verification used Chromium's raw CDP emulation and confirmed the CSS media query. Print is browser-rendered HTML rather than a server-generated PDF and remains subject to browser pagination. The Map remains an approximate coordinate lens. Phase 5 is functionally complete for the validation surface; P5 usability evidence and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then begin Phase 6 validation readiness: reconcile the implementation plan's completed slices, add a de-identified observation protocol for the smallest end-to-end scenario, and distinguish implementation completion from still-open oncology-user evidence and product lock.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock, validation interpretation, any production PDF/export path, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
