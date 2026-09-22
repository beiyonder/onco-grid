# Work report — P5 C2 Home journey alignment

## Problem

Owner design review at 1467×929 found the two primary Home journey cards visually misaligned. The Registry card used `translateY(0.85rem)` with a negative Y rotation while the Workspace card used `translateY(-0.55rem)` with the opposite rotation. Equal grid tracks therefore appeared at different vertical positions, and their tops, bottoms, icons, headings, and calls to action did not share a baseline.

## Decision

Keep the current dark relay field, porcelain cards, liquid-glass navigation, Thinking Orbs, and optional interface sound, but remove asymmetric idle transforms from both journey cards. Stretch both grid tracks, give both cards the same full-height contract, and use one shared vertical hover lift. Preserve the mirrored corner/shadow treatment as visual differentiation without changing geometry. Remove mobile card rotation and raise new interface labels to the established 13px minimum.

## Evidence

- Exact reviewed viewport — at 1467×929, both cards began at `y = 408.8125`, measured `466.4844 × 391.6094`, and ended at `y = 800.4219`; top, height, and bottom deltas were exactly zero.
- Internal alignment — both journey icons began at `y = 441.8125`, headings at `y = 560.3281`, and footers ended at `y = 767.4219`.
- Intermediate desktop — at 1024px, both cards began at `y = 355.0625`, measured 442.7188px high, and had zero top/height/bottom delta; the subpixel width delta was 0.0156px from grid rounding.
- Tablet stack — at 768px, both cards used the same 696.0313px width, 320.9531px height, and no transform.
- Narrow mobile — at 390×844, both cards shared `x = 35.9844` and width `318.0313`; natural heights differ only because the second heading/body wraps more in one column. Page overflow remained zero.
- Readability — plane labels, source metadata, sound label, role selector, and mobile navigation now respect a 13px minimum visible text size.
- Visual check — the captured 1467px layout showed equal card tops/bottoms, aligned icons/headings/footers, balanced internal whitespace, and mirrored shadows without staggered geometry.
- Interaction — both cards use the same `translateY(-0.2rem)` hover lift; keyboard/link semantics and focus remain unchanged.
- Broader current design — Home, Trial List/Spatial lens, Trial Room, Patient Workspace sections, and Inbox retained zero horizontal overflow. Optional sound toggled through an explicit button and does not autoplay before trusted interaction.
- Browser health — desktop route matrix and Home reload produced zero console warnings, console errors, or page errors.
- Build — browser/API typechecks and Vite production build passed across 104 modules; API tests passed 8/8; `npm audit` found 0 vulnerabilities. New visual/audio dependencies are pinned exactly.

## Risks and gaps

At very narrow widths the cards intentionally use natural height because text wrapping differs; forcing equal mobile height would add empty space and reduce readability. Thinking Orb canvases and optional sound increase client bundle size and should be retained only if direct validation shows they improve orientation rather than distract. The change is visual and does not affect data, source authority, patient review, matching boundaries, or clinical behavior.

## Next

Merge and deploy the aligned current design. Continue visual review at desktop, tablet, and 390px mobile. If future copy changes alter internal baselines, preserve equal desktop grid tracks and footer auto-alignment rather than reintroducing per-card transforms.

## Sign-off needed

No separate owner review is required under the autonomous implementation-merge and production-deployment decisions. Owner sign-off remains required for any clinical, privacy, live-service, real-data, or product-lock change.
