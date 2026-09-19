# Work report — P5 C2 Notification rules

## Problem

The existing alert-rule dialog presented hard-coded synthetic trial IDs and visually selectable EMR/email channels even though no external delivery boundary was approved or implemented. Saved rules were represented only by a counter and a synthetic Inbox event, so users could not inspect named recipients, repeat behavior, stop condition, or active state, prevent exact duplicates, or stop a rule.

## Decision

Deliver Phase 2 slice 3 on `feat/notification-rules`. Populate the builder only from real followed trials. Model each browser-session rule with a stable rule ID, factual trigger, named recipients, approved channels, repeat control, stop condition, active state, and creation context. Permit only in-app delivery; show EMR inbox, EMR Task, and email as disabled/unconfigured boundaries. Render active and stopped rules in Inbox, prevent exact active duplicates, support stop/resume with focus retention, automatically stop follow-end rules when the trial is unfollowed, and refuse resume until the trial is followed again. Record audit events without creating a noisy Inbox update for configuration itself.

## Evidence

- Seeded state after loading 285 registry records — two active rules tied to the two real followed trials: `NCT07216703 · Visakhapatnam` and `NCT06966700 · Hyderabad`; each displayed trigger, recipients, `In app`, repeat control, stop condition, and active state.
- Builder trial boundary — the selector contained only those two followed real-trial IDs; no legacy `DEMO-*` IDs remained.
- Delivery boundary — In app was the only enabled channel and the safe default. EMR inbox, EMR Task, and email were disabled and labelled not configured/not approved. Unchecking In app and submitting was blocked with `Only in-app delivery is approved in this validation build.`
- Rule creation — `RULE-003` recorded the official Trial room response trigger for `NCT07216703`, treating oncologist and research coordinator recipients, daily in-app repeat, follow-end stop condition, and browser-session creation context. Active count moved from 2 to 3, Updates remained 2, and the confirmation stated that no external message was sent.
- Duplicate prevention — submitting the exact same trial, trigger, recipients, repeat, and stop condition retained three rules, kept the dialog open, and identified `RULE-003` as already covering the configuration.
- Manual stop/resume — Stop changed `RULE-003` to inactive and active count to 2; Resume restored active count to 3. Both actions retained button focus, wrote audit events, and stated that no external message was sent.
- Stop condition — unfollowing `NCT07216703` reduced followed trials from 2 to 1 and automatically stopped both active follow-end rules for that trial, leaving only `RULE-002` active. The builder then offered only `NCT06966700`. Resume of `RULE-003` was refused until its trial is followed again.
- Desktop at `1440×1000` — rules formed a compact factual context rail; no horizontal overflow. Narrow mobile at `390×844` — rule cards were 334 px inside a 366 px context rail; the full-width dialog had equal scroll/client width at 390 and every external channel remained disabled.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final seeded-rule render produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Rules are browser-memory configuration and do not schedule or deliver notifications. Role selection is synthetic; recipient authorization is not production enforcement. Follow-end and manual stop are demonstrated, while task-close evaluation is displayed but not backed by a persisted event processor. No EMR or email channel is enabled. Phase 2 is functionally complete for the validation surface; P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then begin Phase 3 slice 1: consolidate the synthetic patient workspace around identity/source authority, original EMR references, recent work, and a clear boundary between clinician-confirmed facts and source artifacts.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any backend, scheduler, persisted rule model, external delivery, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
