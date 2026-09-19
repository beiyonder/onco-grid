# Work report — P5 C2 Trial-team outcome

## Problem

The referral lifecycle could reach Trial-team screening and close operationally, but it had no source-authorised screening outcome, no distinction between a trial-team decision and a Trial Relay judgement, and no treating-team review task. Closing directly from Screening could bypass the receiving team's source role/date and leave no human-owned next step.

## Decision

Deliver Phase 4 slice 4 on `feat/trial-team-outcome`. Add a verified-site-role-only outcome form with five neutral source states: Eligible — trial-team decision, Ineligible — trial-team decision, More information required, Screening deferred, and Unable to contact. Preserve packet/version, source role, date, source-authored note, and recorder. Add Trial-team outcome as the seventh lifecycle stage before Closed. Reclassify the canonical handoff Message instead of adding a duplicate. Create one Treating oncology unit review task. Require the synthetic treating-oncologist role to complete that task before Close handoff appears. Never calculate, reinterpret, or recommend.

## Evidence

- Screening gate — `REF-2201 v1.0` advanced through Human approved, Sent, Acknowledged, and Trial-team screening. At Screening, Close handoff was absent and Record trial-team outcome was present.
- Authority failure — A. Rao could not open the outcome form; the UI required the verified site coordinator role and created zero outcomes.
- Source form — after switching to Site steward, the dialog named `REF-2201 · v1.0`, retained the selected site and synthetic case, defaulted safely to More information required, named Site trial coordinator and 19 Sept 2026, and required confirmation of authorised trial-team provenance.
- Outcome vocabulary — the form exposed Eligible and Ineligible only with the suffix `— trial-team decision`, plus More information required, Screening deferred, and Unable to contact.
- Authorised outcome — `OUT-001` recorded `More information required`, Site trial coordinator, source date, exact note that the original molecular report was required, Site steward recorder, packet ID/version, and no Trial Relay interpretation.
- Canonical workflow — packet and inquiry moved to Trial-team outcome; the existing acknowledgement Message became one `Trial-team outcome returned` Message rather than adding a duplicate. Message source named Site trial coordinator and date.
- Lifecycle/history — stage 6 Trial-team outcome became current, packet/inquiry history added `Authorised trial-team outcome OUT-001`, and the inspector showed the source-authored outcome separately from registry, site confirmation, and packet state.
- Treating-team task — `OUT-TASK-001` was assigned to Treating oncology unit for 20 Sept 2026. Inbox Tasks added exactly one review task whose copy stated that Trial Relay does not recommend an action.
- Role boundary — Site steward could not complete the treating-team review. Dr M. Shah completed it; the task left active Tasks, retained outcome/source, and stated Trial Relay did not choose the clinical action.
- Closure guard — Close handoff was absent while `OUT-TASK-001` was open. After treating-oncologist review, Close handoff appeared; closure appended a human event and marked stage 7 Closed.
- Patient continuity — Recent work displayed `OUT-001 · More information required · Site trial coordinator · 19 Sept 2026` and changed from Treating-team review due to Reviewed. Packet recent state became Closed.
- Desktop at `1440×1000` — one canonical outcome Message and seven-stage source-linked lifecycle; no horizontal overflow. Narrow mobile at `390×844` — lifecycle wrapped to three columns, outcome and task states fit a 364 px inspector, and page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean reload restored expected counts Updates 2, Messages 2, Tasks 286 and produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Outcome authority and treating-team review are synthetic role demonstrations, not production authorization. No actual trial team is contacted and no formal screening occurs. Eligible/Ineligible labels are allowed only because the synthetic authorised trial team supplies them; Trial Relay does not derive them. All patient and outcome data remain synthetic browser-memory state. Phase 4 is functionally complete for the validation surface; P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then begin Phase 5 slice 1: List/Map continuity over the same registry dataset, using only source-provided city/state locations, labelling coordinates as approximate, preserving selection, and never implying site availability or travel feasibility.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any real trial-team integration, formal screening, actual outcome data, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
