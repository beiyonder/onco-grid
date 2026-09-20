# Work report — P5 C2 evidence-led trial workflow

## Problem

The evidence-led review observed that Trial Library rows exposed too much information, only 60 of 285 records appeared without a clear limit model, raw condition/state variants reduced credibility, the full profile competed with a very long list, and Trial Room resembled cards and forms rather than a familiar conversation. Users could not cleanly move from scan to preview to full understanding or connect a source contradiction to owned correction work.

## Decision

Make Trial Library a compact, patient-neutral scan surface with URL-preserved search, normalized display-only taxonomy, explicit page size and page count, and a keyboard-accessible preview. Keep raw taxonomy visible in the dedicated Trial Detail provenance panel. Preserve the stable detail route, complete retained criteria, every India site, and registry-versus-independent-site authority. Rebuild Trial Room around a chronological channel with reply context, exact-message return focus, authorised-site-response styling, human resolution, linked registry sources, and evidence-bound correction tickets. Unknown stays unknown; no patient context changes the list.

## Evidence

- Library density — each result row now contains identifier, registry study status, phase, title, at most two displayed conditions, India-site count, independent-site state, and Preview. Long summary, full provenance, complete sites, criteria, room, and activity moved out of the row.
- Display taxonomy — condition and state labels are normalized for casing and a bounded synonym/spelling map while every raw source value remains visible in Trial Detail. The exercised filter contained 323 case-insensitively unique display options and no duplicate all-caps `BREAST CANCER` label.
- Result disclosure — the library states matching count, retained total, snapshot date, selectable 12/24/48 row limit, current page, page total, current page count, and filtered total. Empty results remain explicit and do not broaden the search automatically.
- Preview — filtering to `NCT06345729` produced one concise row. Keyboard activation opened a non-hover preview with `Recruiting` registry status, `Unknown` independent-site state, source, site count, summary, and full-detail/source actions. Focus moved to `trial-preview-heading`.
- Stable detail and return — preview opened `#/trials/NCT06345729?from=q%3DNCT06345729`. Trial Detail showed four retained India sites, separate `Recruiting` and `Not confirmed` authority states, normalized and raw taxonomy, complete retained eligibility criteria, source provenance, and activity. Returning restored `q=NCT06345729`, the one-row result, and focus to `trial-NCT06345729`.
- Trial Room — direct navigation to `?message=ROOM-2` focused the exact chronological message. The exercised channel contained one visually and textually labelled authorised site response. A synthetic reply retained parent context and the public source; a person could resolve a message without changing site state.
- Evidence-linked correction — entering `Registry wording requires human comparison with the displayed label` created `COR-001`, linked `ClinicalTrials.gov · NCT06345729`, and added owned work without rewriting registry or independent-site state.
- Desktop — preview, Trial Detail, return, exact-message Room, reply, and correction paths had zero page-level horizontal overflow at 1440×1000.
- Mobile — Trial Library with preview, Trial Detail, and Trial Room each reported `scrollWidth === innerWidth === 390` at 390×844. Preview and exact-message focus remained correct; every visible leaf text node measured at least 13px.
- Browser health — the preview → detail and exact-message Room → correction sequence produced zero console warnings, console errors, or page errors.
- Build — `npm run build` passed strict TypeScript validation and Vite production output; 40 modules transformed, application JavaScript 378.22 kB before gzip and 114.99 kB after gzip.

## Risks and gaps

**OPEN:** normalized labels are presentation aliases, not clinician-validated terminology, and the raw registry strings remain authoritative. The condition filter still exposes 323 source-derived display values and needs direct findability evidence. Trial Room remains a synthetic browser-only model: it has no identity verification, moderation, retention, external delivery, site participation, or durable audit. An authorised-site-response style is driven only by the selected prototype role. The correction path proves linkage and ownership, not source adjudication. No direct oncology-user evidence establishes that Trial Room improves on email, phone, WhatsApp, or site portals.

## Next

Merge this slice, update `main`, and implement the patient workflow: coherent synthetic workspaces, controlled synthetic-only creation, per-fact source badges, sectioned Patient Workspace, dedicated Patient–Trial Review against `NCT06345729`, complete retained criterion excerpts, prominent completeness, reviewer/date/evidence, and human-created missing-information tasks.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the autonomous implementation-merge decision. Owner sign-off remains required for clinician terminology acceptance, real Trial Room communication, identity/authorization, external delivery, retention, assisted discovery, patient ranking/matching, Phase 6 evidence interpretation, `P5` closure, product lock, and any clinical capability.
