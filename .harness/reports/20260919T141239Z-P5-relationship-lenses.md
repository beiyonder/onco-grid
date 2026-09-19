# Work report — P5 C2 Relationship lenses

## Problem

The accepted screens used source planes, status regions, Trial room, patient review, and handoffs, but users still had to infer how those contexts related. Adding a generic graph would create visual noise and risk inventing relationships. The visual-language blueprint instead requires restrained anchoring and only real connectors.

## Decision

Deliver Phase 5 slice 2 on `feat/relationship-lenses`. Add one contextual path inside the dominant trial profile. Render a node only when its relationship exists. Label every connector with its actual meaning: Registry source describes Trial entity; Trial entity lists India sites; sites/trial are discussed in Trial room; the clinician-selected trial participates in the synthetic patient review; Trial room or trial actions create named handoff work. Preserve source identifier/date, retained-site count/site state, room-thread count, synthetic-patient identity, and linked-handoff count. Make actionable nodes open the existing exact context rather than adding a new graph/navigation system.

## Evidence

- Initial real relationships — the selected profile rendered five nodes and four labelled connectors: ClinicalTrials.gov/NCT/date → `describes` → current Trial entity → `lists` → 8 retained India sites with independent-site state → `discussed in` → Trial room with zero threads ↔ `human review` ↔ synthetic patient SYN-2047.
- Source authority — Registry source remained an exact external link with NCT identifier and update date; Trial entity remained the current selected context; site node retained `Not independently site-verified` rather than implying availability.
- Sites navigation — activating India sites changed the existing profile tab to Sites & status, focused that tab, and displayed all 8 retained site rows.
- Room navigation — activating Trial room changed the existing profile tab to Room, focused that tab, and displayed `Questions around NCT06764875`.
- Patient navigation — activating Synthetic patient opened Patient workspace with the exact selected `NCT06764875`, clinician-selected label, phase, city, and unchanged site-confirmation state.
- Dynamic handoff relationship — after a human-created general site inquiry for the current trial, the profile re-rendered a Handoffs node with `1 linked` and an actual `creates work` connector. Activating it opened the Referral and inquiry handoffs workspace.
- No decorative edges — each connector mapped to source description, listed site data, contextual discussion, human review, or a real task record; no generic graph engine or inferred clinical edge was introduced.
- Desktop at `1440×1000` — profile path remained anchored between authority status and actions. Narrow mobile at `390×844` — DOM order remained source → trial → sites → room → patient, connector labels remained semantic, the path used bounded internal horizontal scrolling (924 px inside a 336 px track), and page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean profile reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

The desktop path may require horizontal scroll when every optional patient and handoff node is present; semantic order remains accessible, but the next responsive slice will flatten that path on narrow screens and refine print/reduced-transparency behavior. The visual path has not been validated with oncology users. It does not claim causal, clinical, or eligibility relationships. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 5 slice 3: mobile relationship flattening, reduced motion and transparency, opaque print output, and source/date preservation when spatial positioning is removed.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any new inferred relationship, cross-patient graph, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
