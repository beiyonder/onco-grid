# Work report — P5 C2 Tumour-board context

## Problem

The prior tumour-board view was a static demonstration disconnected from the versioned packet. Add to board did not require or route a bounded manifest. Packet purpose, version, exact sources, access/expiry, and route history were not dynamic. The board form recorded a disposition but did not bind it to a packet version or retain a structured signed-reference/owner/recipient/due record. The write-back preview was generic.

## Decision

Deliver Phase 4 slice 3 on `feat/tumour-board-context`. Require a Tumour-board discussion packet before routing. If absent, open the packet builder preconfigured for Internal tumour board. Route the exact packet ID/version and source references under a named actor/date. Render dynamic agenda, packet manifest, source/access context, and a five-stage board-to-task lifecycle. Record only a human-authored signed EMR decision reference plus the authorised operational disposition, recipient, owner, and due date. Preserve packet/audit history. Generate a dry-run synthetic EMR Task and DocumentReference payload containing references—not clinical decision content—and record the task/write-back event without contacting an external system.

## Evidence

- Missing-packet boundary — Add to board with no suitable packet opened the versioned packet builder preselected to `Tumour-board discussion` and `Internal tumour board`, and stated that a bounded packet must be created first.
- Routed packet — creating and routing `REF-2201 v1.0` displayed its board banner, A. Rao/date route, Tumour-board discussion purpose, selected real-registry trial, three explicit synthetic EMR references, internal-board access, expiry/site, and packet-ready agenda. Packet history added `board_routed · A. Rao · Human route to tumour board`.
- Pre-decision state — Record signed decision reference was enabled only after routing. The lifecycle marked Packet routed and Sources reviewed complete, Human discussion current, and later stages not started.
- Signed reference form — the dialog named `REF-2201 · v1.0 · 3 source references · synthetic case SYN-2047`, generated reference `MDT-DEMO-20260919-2201`, set a 21 Sept 2026 due date, and required confirmation that human board participants authored and signed the clinical decision.
- Board record — submission retained only signed reference, operational disposition `Authorise site contact for formal screening`, owner A. Rao, Treating oncology unit recipient, due date, Board recorder/date, packet ID/version. It did not store or generate clinical decision prose.
- Lifecycle/history — stages 1–4 became complete; stage 5 became Ready for synthetic write-back. Packet history added `board_decision · Board recorder · Signed EMR reference MDT-DEMO-20260919-2201`; audit history named packet/version, disposition, and owner.
- Write-back preview — Task card contained synthetic subject, owner, recipient, due date, and draft/acknowledgement state. DocumentReference card contained signed decision reference, packet ID/version, source-reference count, and `Clinical decision copied: No`. The dialog stated no external system is contacted.
- Synthetic write-back — created `TASK-2058`, appended packet history `board_task_written · EMR adapter · Synthetic Task TASK-2058`, marked stage 5 done with acknowledgement pending, disabled repeated write-back, added one factual Inbox event, and updated Patient Recent work to Task written.
- Desktop at `1440×1000` — one packet-centred board composition with agenda, manifest, lifecycle, participants, and signed disposition; no horizontal overflow. Narrow mobile at `390×844` — board columns collapsed to one, context banner wrapped, all five stages remained readable, and page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final clean board reload produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

The board, participants, packet, signed reference, and EMR payload are synthetic browser-memory demonstrations. Trial Relay does not verify signatures, meeting attendance, institutional authority, or EMR authorization. The synthetic write-back contacts no external system. Trial-team screening outcomes remain separate and are the next slice. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 4 slice 4: record an authorised trial-team screening outcome neutrally with source role/date, preserve More information required, Screening deferred, and Unable to contact, and return the next task to the treating team without making a Trial Relay eligibility judgement.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any real board or EMR integration, signature verification, meeting content, actual write-back, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
