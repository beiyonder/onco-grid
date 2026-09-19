# Work report — P5 C2 Inbox contextual resolution

## Problem

The unified Inbox named every item's context and could navigate to the attached workspace, but users still had to leave Inbox to understand workflow state or perform the immediate operational action. Opening and closing an item did not have an in-place focus-return contract. Sent handoffs, acknowledgement, unable-to-contact, and verification work therefore remained less direct than the Phase 2 blueprint.

## Decision

Deliver Phase 2 slice 2 on `feat/inbox-context-resolution`. Add one inline inspector beneath the selected row, preserving the canonical Inbox classification while exposing the item's full context, owner, due state, source authority, and linked workflow state. Opening moves focus to the inspector; Close returns focus to the exact originating row. Let human users advance handoff states, explicitly record unable-to-contact, or open the existing authority-gated verification form from the inspector. When state changes reclassify or remove an item, move to its canonical Message inspector or the Inbox heading rather than leaving stale focus. Keep `Go to full context` for deeper trial, thread, verification, or handoff work.

## Evidence

- Update inspection — Inspect opened `Registry status snapshot loaded` in place, repeated the exact context/owner/due/source facts, displayed the no-implicit-state-change boundary, set `aria-expanded=true`, and focused `inbox-inspector-heading`. Close removed the inspector, restored focus to `alert:ALT-301`, and reset `aria-expanded=false`.
- Handoff lifecycle — inspecting `INQ-1042` showed state `Sent` and action `Record acknowledgement`. The human action changed it to `Acknowledged`, reclassified the canonical item from Tasks to Messages, opened the `Referral acknowledged` inspector, and retained focus. `Close handoff` then changed the linked state to `Closed`, removed the advance action, and retained inspector focus.
- Unable-to-contact — the explicit action changed `INQ-1042` to `unable`, removed `inquiry:INQ-1042` from active Tasks, reduced Tasks from 286 to 285, and focused the Inbox stream heading. No negative clinical or site conclusion was created.
- Verification cancellation — opening a verification task's existing modal and cancelling returned to the same inline inspector with focus and the task unchanged.
- Verification completion — the user entered a human-authored evidence note, confirmed source authority, and saved `Verified recruiting`; the completed task disappeared, Tasks reduced from 286 to 285, selection cleared, and focus moved to the Inbox stream heading. Registry state remained a separate assertion.
- Full-context actions remained available for trial, Trial room thread, verification, and handoff destinations.
- Desktop at `1440×1000` — contextual inspector remained attached beneath the origin row with a source/accountability grid and bounded actions; no horizontal overflow. Narrow mobile at `390×844` — inspector facts and actions flattened to one column with 14 px padding; `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final inspector render produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

All state remains browser-memory validation behavior. The inspector exposes only existing bounded transitions; it does not add bulk mutation, automation, or a persisted event model. The verification action still relies on the synthetic authority checkbox and role demonstration rather than production authorization. Notification-rule design and stop/repeat semantics remain the next slice. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 2 slice 3: configure factual operational alerts with named recipients, approved delivery channels, repeat control, stop condition, and an in-app-only safe default while preserving one canonical Inbox item per event.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any backend, persisted event model, external messaging, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
