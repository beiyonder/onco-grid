# Work report — P5 C2 Referral lifecycle

## Problem

The versioned packet slice created a safe Draft and linked handoff, but the visible workflow still ended after acknowledgement and did not present the blueprint's trial-team-screening stage, permissible next state, version-bound approval, complete actor/timestamp/source history, or correction path. A correction after approval could otherwise leave stale approval attached to changed work.

## Decision

Deliver Phase 4 slice 2 on `feat/referral-lifecycle`. Extend the human-controlled state machine to `Draft → Human approved → Sent → Acknowledged → Trial-team screening → Closed`. Keep exactly one permissible forward action. Bind approval actor/date to the exact packet version and reject Sent without approval. Synchronize packet and handoff state/history on every action. Render six lifecycle stages and expandable actor/timestamp/source history in the Inbox inspector. Keep acknowledged/screening work canonical in Messages. Add Request correction for approved/sent/acknowledged/screening packets; it sets Correction required, invalidates approval, stops forward transitions, and requires a newly drafted version. Retain Unable to contact as an explicit non-clinical outcome.

## Evidence

- Draft inspection — `REF-2201 v1.0` displayed Handoff state Draft, packet Draft, first of six stages current, one Draft history event, and one permissible action: Approve draft.
- Version-bound approval — Approve draft moved packet and inquiry to Human approved, recorded A. Rao, 19 Sept 2026, and version `v1.0` in approval, appended packet/inquiry history, retained inspector focus, and changed the sole next action to Mark sent.
- Send guard/state — Mark sent succeeded only after approval, retained the `v1.0` approval object, appended the third history event, and changed next action to Record acknowledgement.
- Acknowledgement/reclassification — Record acknowledgement moved packet to Acknowledged, appended history, moved the canonical item from Tasks to Messages, retained one row for `REF-2201`, and changed next action to Begin trial-team screening.
- Screening — Begin trial-team screening marked stage 5 current, appended history, retained one canonical Message row, and exposed Close handoff.
- Closure — Close handoff marked all six stages reached, stage 6 current, retained exact approval, produced six ordered history events, removed forward actions, and kept focus on the inspector.
- Provenance history — each event named state, actor A. Rao, date 19 Sept 2026, and source (`Explicit packet manifest` or `Human handoff action`). Inquiry history mirrored the same transitions.
- Correction path — approving then choosing Request correction set packet/inquiry to Correction required, set approval to null, added `Human correction request · prior approval invalidated`, stopped forward transition, and instructed creation of a new version. Reopening Patients showed `v2.0` with Draft/not approved/not released while `v1.0` remained Correction required.
- Unable-to-contact synchronization remained available in Draft/Approved/Sent and updates packet plus inquiry history without a clinical or site conclusion.
- Desktop at `1440×1000` — dense lifecycle and history remained attached to the Inbox item. Narrow mobile at `390×844` — six stages wrapped into a three-column grid inside a 364 px inspector with no page-level horizontal overflow.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Lifecycle actions are browser-memory human events; no packet is transmitted and no external acknowledgement exists. The synthetic role switch is not production authorization. Closed currently means the operational handoff was closed; it does not contain a trial-team eligibility conclusion. Tumour-board packet routing is the next slice, and authorised trial-team outcomes follow after that. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 4 slice 3: route a bounded packet into tumour-board context, record only a signed human decision reference, assign the next operational step, and preserve packet/task/audit history without generating clinical content.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any actual packet transmission, external acknowledgement, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
