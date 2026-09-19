# Work report — P5 C2 Trial Relay Home

## Problem

The merged validation app exposed thirteen equal-weight global destinations. That structure obscured the two proposed starting journeys, made contextual operations look like separate products, and did not implement the four-destination information architecture in the owner-directed Trial Relay experience and visual-language blueprints.

## Decision

Merge the reviewed research foundation through pull request `#1`, fast-forward local `main`, and begin implementation on `feat/trial-relay-home`. Keep `P5` current and treat the redesign as a reversible validation instrument rather than product lock. Add a phased delivery and pull-request plan, introduce a calm Home view with two dominant journey entities, reduce global navigation to Home, Trials, Patients, and Inbox, and keep the existing validation tools reachable through contextual links. Do not add a dependency, backend, persistence layer, authentication system, data source, patient logic, or deployment change.

## Evidence

- Pull request `#1` (`research/foundation-and-p5` → `main`) → merged on 2026-09-19; local `main` fast-forwarded to merge commit `cfee4f7`.
- `IMPLEMENTATION_PLAN.md` → phased delivery, safety boundary, per-PR checks, and a one-merge-candidate-per-one-to-two-working-days review cadence with one active UI PR while `web/index.html` remains monolithic.
- `web/index.html` → Home view, two primary journey actions, quiet recent-work rail, four global destinations, contextual validation-tool access, exact primary-nav state for nested views, and focus transfer when an in-view action changes workspace.
- Browser smoke at `http://127.0.0.1:4173/` → Home loaded `285 registry records` and source date `16 Sept 2026`; Home → Trial library, Home → Patient workspace, Inbox → Messages, Inbox → Verification tasks, and Home → Source health all reached the intended view with the correct primary navigation state.
- Desktop browser QA at `1440×1000` → Home fit within one viewport, four global destinations visible, no page-level horizontal overflow (`scrollWidth = clientWidth = 1440`), and the dominant actions plus recent-work rail remained readable.
- Mobile browser QA at `390×844` → journey entities flattened to one column, all four global destinations remained reachable, Home, Trials, Patients, and Inbox each had no page-level horizontal overflow (`scrollWidth = clientWidth = 390`).
- Keyboard QA → global controls, both journey actions, and work items entered the tab order with the existing 3 px visible focus outline; activating a journey moved focus to the destination heading.
- Reduced-motion QA → transition and animation durations reduced to `0.00001s`; scroll behavior became `auto`.
- Browser interaction run after final reload → 285 real registry records loaded; zero browser-console warnings, zero console errors, and zero page errors.
- Trial discovery smoke → filtering to `Mumbai` returned 161 records with the 60-card display cap; Reset restored 285 records.
- `python3 research/validate_ledger.py` → `PASS: 70 records valid; 70 retained; IDs and contradiction references consistent`.
- `python3 scripts/fetch_india_oncology_trials.py --validate-only` → `PASS: 285 normalized India oncology trials valid`.
- `serena project health-check .` → health check passed; project activation and Python language tools worked.
- `serena memories check .` → no referential-integrity issues.
- `git diff --check` → passed with no patch hygiene errors.
- Changed-file secret-pattern and email-pattern scans → no matches.

## Risks and gaps

- This slice establishes the shell and Home journey only. Inbox groups still open the existing separate message and verification views; the unified flowing Inbox is scheduled for Phase 2.
- `web/index.html` remains a monolithic static file. A behavior-preserving source split is the next Phase 0 slice after this interface is reviewed.
- The current registry snapshot puts every unverified site into the verification queue, producing 285 pending source gaps. User validation must determine whether this should be an assigned subset, saved view, or institution-specific queue.
- The synthetic EMR context bar remains visible on Home because the current validation session represents an in-context launch. User sessions must determine when that context should appear.
- No direct oncology-user evidence has yet established that the Home hierarchy, treating-oncologist emphasis, recent-work ordering, or four-destination terminology matches routine work.
- `P5` remains open. This implementation does not establish buyer, burden, product value, safe production architecture, or product lock.

## Next

Review and merge the Home/navigation slice through its pull request. If accepted, branch the next review slice from updated `main`: extract stable CSS and JavaScript without changing behavior, then implement the Trial library and trial-profile source/status hierarchy. Continue live validation with de-identified aggregate findings and simplify any spatial treatment that makes source, authority, unknown state, owner, or return path less clear.

## Sign-off needed

The owner should review the implementation pull request and decide whether the Home hierarchy, four-destination navigation, and Soft Spatial Systems direction are suitable for the next slice. Merge approval does not close `P5`, select a production stack, authorise new dependencies or data sources, or approve any clinical decision capability.
