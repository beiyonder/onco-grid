# Work report — P5 C2 Trial Detail site spacing

## Problem

Owner design review at 1305×929 identified that Trial Detail's India sites surface had computed `padding: 0`, placing its heading, facility names, location metadata, and long authority labels too close to the rounded boundary. The section inherited only the generic surface border because its previous padding depended on a fragile `:last-child` selector that no longer matched after later detail sections were added.

## Decision

Give the India sites surface an explicit `site-section` contract. Add responsive internal padding, a two-column row grid with a bounded authority column, deliberate row spacing, and vertically stacked status chips. On narrow screens, collapse each row to one column and left-align the status stack. Remove the obsolete `detail-main > .surface:last-child` dependency so spacing follows component purpose rather than DOM position.

## Evidence

- Desktop reproduction — `NCT05732805` retained all 12 registry-listed India sites at 1305×929.
- Desktop spacing — the 674.72px surface computed 22.4px padding; each row computed `348.922px 251.016px` columns, 20px column gap, 16px vertical row padding, and 27.39px effective left and right content insets.
- Desktop authority layout — registry and independently-confirmed-site labels rendered as a right-aligned vertical grid with a 6.4px gap rather than crowding the facility text or boundary.
- Narrow layout — at 390×844, the surface computed 16px padding; each row collapsed to one 325.625px column with 10.4px gap and left-aligned authority labels.
- Responsive safety — desktop and narrow states retained all 12 site rows, zero page-level horizontal overflow, and a 13px minimum visible text size.
- Visual check — the captured full site surface showed consistent inner whitespace, row separators, wrapped facility names, and aligned authority chips throughout the 12-site list.
- Browser health — both checked viewports produced zero console warnings, console errors, or page errors.
- Build — `npm run build && npm run typecheck` passed; Vite transformed 40 modules and emitted 36.67kB CSS plus 386.13kB application JavaScript before gzip.

## Risks and gaps

Long registry-provided facility names and repeated unknown-site authority labels still create a tall source-complete list; that height is intentional and avoids truncating or hiding source records. The change improves spacing only and does not alter registry data, site-confirmation authority, filtering, workflow state, or clinical boundaries.

## Next

Merge the focused spacing fix through a review pull request. Continue direct design review against real long-title and high-site-count records; use explicit component classes for future surface spacing rather than structural selectors.

## Sign-off needed

No separate owner review is required under the autonomous implementation-merge decision. Owner sign-off remains required for any change to source semantics, clinical behavior, real data, production deployment, or the open Phase 6/product-lock gates.
