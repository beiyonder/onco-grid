# Work report — P5 C2 Referral packet

## Problem

The existing packet dialog collected purpose, recipient, owner, expiry, and source checkboxes, but represented completion with one boolean and a generic inquiry. It did not retain packet version, selected trial site, exact manifest, clinician-review progress, approval state, actor/history, or approval binding. A new draft could not be distinguished from an approved version, and the Inbox could not show whether a packet was actually approved or released.

## Decision

Deliver Phase 4 slice 1 on `feat/referral-packet`. Create a browser-session referral-packet model with stable ID and version, selected real-registry trial plus retained India site, synthetic patient ID, purpose, authorised recipient, owner, expiry, exact selected EMR references, clinician-review count, Draft state, null approval, creator/date, and history. Validate at least one source and a non-past expiry. Make the form and confirmation state explicitly Draft/not approved/not released. Create one linked Inbox handoff task. Reopening after a draft creates the next major version as a separate unapproved packet. Synchronize any later existing human handoff transition with the packet and bind approval to the exact version before sending.

## Evidence

- Initial form — selected `NCT06764875`, synthetic case `SYN-2047`, version `v1.0`, `0 of 4 criteria reviewed by clinician`, `Draft · not approved · not released`, eight retained India-site choices, 27 Sept 2026 expiry, and three selected source references.
- Site context — the selected site named facility, city/state, and registry-declared site state; no independent site availability was inferred.
- Empty-manifest failure — unchecking all source references and submitting retained the dialog, created zero packets, and displayed `Select at least one explicit source reference.`
- Versioned draft — selecting Pathology report and Latest laboratory report created `REF-2201 v1.0` with two explicit source references, exact selected site, formal-screening purpose, verified-site-trial-office recipient, A. Rao owner, expiry, clinician-review count, Draft state, null approval, creator/date, and one Draft history event.
- No-release boundary — the confirmation stated `Separate human approval is required before release.` Packet status remained Draft, approval remained null, and no external action occurred.
- Continuity — Patient Recent work displayed `REF-2201 · v1.0 · 2 source references · owner A. Rao · Draft`. Inbox Tasks increased from 286 to 287 and rendered one linked `REF-2201` task.
- Inbox packet inspection — the contextual inspector displayed Handoff state Draft plus `REF-2201 · v1.0 · Draft`, two explicit source references, 27 Sept expiry, and `not approved · not released`. The only forward lifecycle action was a separate human `Approve draft` control.
- Version boundary — reopening the builder after `v1.0` displayed `v2.0` with `Draft · not approved · not released`; `v1.0` remained unchanged. Approval cannot silently carry to the new version.
- Desktop at `1440×1000` — version/review/approval context, trial/site, manifest, expiry, and human confirmation were visible in one reviewable dialog. Narrow mobile at `390×844` — dialog and page had equal scroll/client widths at 390 and the three context fields flattened to one column.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Packets, source references, approvals, and history are browser-memory demonstrations. The source manifest references synthetic EMR artifacts; no file is copied or transmitted. The generic handoff lifecycle can now synchronize a packet safely, but richer actor/timestamp/permissible-transition presentation and correction paths belong to the next slice. All patient data remain synthetic. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 4 slice 2: the full packet lifecycle `Draft → Approved → Sent → Acknowledged → Screening → Closed`, with actor/timestamp/source history, version-bound approval, unable-to-contact, and correction paths.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any actual packet release, external transmission, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
