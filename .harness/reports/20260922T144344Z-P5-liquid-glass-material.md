# Work report — P5 C2 Liquid-glass material refinement

## Problem

**OBSERVED:** The owner found the existing liquid-glass treatment too weak. Raising the wrapped-lens strength alone made navigation, source, and tab labels visibly refract and lose readability because the library's in-place mode bends owned content. The interface needed materially stronger depth without turning text or controls into the refracted layer.

## Decision

Use one shared optical material in `web/src/design/glass.ts`, with stronger depth, curvature, edge bend, dispersion, frost, sheen, glow, and specular response than the previous per-component values. Render navigation, source context, patient tabs, and the Trial Library view switch in the library's background-copy `refract` mode so the custom ambient field bends beneath a separate crisp content layer. Reinforce the material with translucent tints, bright inner rims, ambient gradients, saturation, and deeper elevation shadows. Clamp the narrow-screen bottom lens to a 64px control surface, and preserve the existing opaque reduced-transparency fallback.

This is a presentation-only change. Trial data, source authority, clinical boundaries, patient/trial review behavior, authentication, persistence, and fail-closed pilot configuration are unchanged.

## Evidence

- **OBSERVED:** Desktop visual QA at 1467×929 showed a clearly brighter rim, stronger translucent depth, refracted ambient colour, and deeper separation on the primary navigation, source badge, Trial Library view switch, and patient section tabs while every label remained crisp.
- **OBSERVED:** Trial Library loaded `Trial Library`, retained both `List` and `Spatial lens` controls, and had no page-level horizontal overflow. The spatial control remained clickable and set `view=map` with the active state on `Spatial lens`.
- **OBSERVED:** Patient workspace loaded `Synthetic Cedar workspace`; all five section controls remained visible. Activating `Sources` changed the selected section, and the glass navigation still reached Trial Library.
- **OBSERVED:** Narrow QA at 390×844 kept the bottom lens at exactly 64px (`x=7.1875`, `y=777`, `width=375.625`) with `scrollWidth = clientWidth = 390`; navigation icons and labels remained crisp and reachable.
- **OBSERVED:** Reduced-transparency CDP emulation produced an opaque `rgb(251, 252, 251)` navigation surface with `backdrop-filter: none`, no box shadow, and no specular pseudo-layer.
- **OBSERVED:** Final Home, Trial Library, and Patient Workspace route reloads at 1467px produced zero console warnings, zero console errors, zero page errors, and no horizontal overflow.
- **OBSERVED:** `cd web && npm run build` passed TypeScript checks and the Vite production build across 105 modules.
- **OBSERVED:** `cd web && npm run test:api` passed 8/8 server policy tests; `npm audit --omit=dev` found 0 vulnerabilities.
- **OBSERVED:** `python3 research/validate_ledger.py` passed 70 records, and `python3 scripts/fetch_india_oncology_trials.py --validate-only` passed 285 normalized trials.

## Risks and gaps

The material uses SVG displacement and a custom copied ambient field; this exact refinement was exercised in Chromium at desktop and narrow widths, not independently in Safari or Firefox. Reduced-transparency users intentionally receive an opaque, non-refracted surface. The visual change remains validation evidence only and does not close `P5`, establish user value, or qualify the unconfigured Supabase/OpenAI pilot services.

## Next

Merge through a review pull request, allow the configured Vercel main-branch deployment to complete, and repeat live desktop/mobile checks on the production alias. Continue direct visual review with oncology users; reduce optical strength only if the stronger material competes with task comprehension.

## Sign-off needed

No separate owner review is required under the autonomous implementation-merge and production-deployment decisions. Owner sign-off remains required for any clinical, privacy, live-service, real-data, or product-lock change.
