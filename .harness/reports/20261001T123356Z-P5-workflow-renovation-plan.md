# Work report — P5 C5 Workflow renovation plan

## Problem

**OBSERVED — owner review, 2026-10-01:** The patient demo is thin; Overview and Sources duplicate information; original files are not inspectable; gaps lack a useful completion workflow; patient discovery drops users into manual library review; criterion review requires excessive scrolling; patient section navigation overlaps content; trial headings are oversized; preview scrolling/close behavior is unclear; PI workflows and global drug/topic/spatial discovery need product-level treatment.

**FACT:** The owner requested a full audit and implementation plan, including automated patient-to-trial and trial-to-patient matching, scores/ranking, close-match labels and eligibility workflow. This turn implements documentation only.

## Decision

Produce a self-contained, offline-readable planning artifact at [`architecture/trial-relay-renovation-plan.html`](../../architecture/trial-relay-renovation-plan.html), linked from the existing implementation plan. Its 17 sections include the current-state audit, patient/PI journeys, richer synthetic fixtures, source artifacts, gap closure, deterministic matching semantics, progressive review, global discovery, visual direction, architecture/data contracts, eleven implementation slices, fifteen acceptance scenarios and release decisions.

**INFERENCE — proposed target:** One versioned patient–trial–cohort assessment powers both directions. Preserve original evidence, machine findings, human review and trial-team eligibility decisions as separate records. Use Patient 1–12 and actual bundled synthetic source documents. Keep the general library and existing frontend topology; add contextual matching rather than relabelling manual selection.

**CONTRADICTION / OPEN:** The requested matching target exceeds the current non-clinical implementation boundary. Plan it explicitly; do not silently enable it, treat disclaimers as clinical validation, or equate criteria support with the best treatment or probability of eligibility. S0 requires an owner-recorded revised intended-use contract and clinical review. The proposal does not amend governance, authorise identifiable data, or close P5.

## Evidence

**FACT — repository inspection:**

- `PatientWorkspacePage.tsx` displays the first four facts in Overview and the same fact array in Sources. `demo.ts` supplies three patients with 4, 2 and 2 facts. `AppState.tsx` creates a new workspace with one context fact.
- `TrialsPage.tsx` preserves `reviewFor` for manual selection, but patient facts do not affect the trial result set.
- `PatientTrialReviewPage.tsx` renders a complete form for every criterion; no machine assessment entity exists in that path.
- `AppState.tsx` task identity omits trial ID, creating a source-backed collision risk across same-number criteria. Generic Inbox resolution does not require evidence. These consequences are recorded as inferences; no passing runtime regression test is claimed.
- `TrialsPage.tsx` already provides an icon-only Close control. The plan replaces it with a labelled modal-sheet interaction rather than claiming the control is absent.
- Global evidence search already exists. Its current projection lacks full criteria and detailed global site locations; the plan includes detail hydration and an honest country-level spatial lens.

**OBSERVED — deployed workflow:** Using an agent-created Orca browser tab, opened the synthetic `SYN-2047` workspace, inspected Overview, selected Sources, then activated Find trials to review manually. The resulting route was `/#/trials?reviewFor=SYN-2047`; the accessibility snapshot exposed 285 results. No patient values, reviews, tasks, messages or handoffs were changed. The owner's reported visual defects were accepted without making their validity depend on a rerun.

**OBSERVED — planning-artifact verification:**

- Opened the actual local HTML in managed Chromium at 1451×929 and 390×844; inspected screenshots of the document and architecture diagram.
- Confirmed 17 content sections, 11 delivery rows and 15 acceptance rows.
- All internal section anchors resolve; all relative repository source links point to existing files.
- Navigation filtering preserves all content; clearing via keyboard restores all 17 navigation links. One empty-string fill helper did not emit the expected filter update; this tool behavior was reported through `xd://report_issue` and the actual keyboard interaction passed.
- Keyboard Enter opens the review disclosure; source-section navigation and native disclosure work with JavaScript disabled.
- Desktop and narrow viewport have no page-level horizontal overflow. Wide tables and the architecture SVG have contained horizontal scrollers; the diagram accepts keyboard horizontal scrolling.
- Inspected actual print-media rendering: navigation is hidden, all five disclosure bodies are visible, and no page-level horizontal overflow was detected. Fixed closed-details print visibility during artifact review.
- Browser error collection was empty at the observed check.
- `python3 research/validate_ledger.py` returned `PASS: 79 records valid; 79 retained; IDs and contradiction references consistent`.

No application implementation, dependency, data fixture, runtime configuration or deployment was changed. App build/tests and new clinical/matching acceptance scenarios were not run because those behaviors are proposed, not implemented.

## Risks and gaps

- `GAP-SERENA`: no Serena activation/MCP tool was exposed. Read `.serena/memories/core.md` and `.serena/memories/project_context.md` directly, along with the current P5 contract and latest indexed complete report. No successful activation is claimed.
- Clinical matching, ranking semantics, close-match policy, criterion interpretation and eligibility authority need explicit resolution before implementation. The plan proposes human final eligibility, not autonomous clinical conclusions.
- The proposed six-model/12-patient validation corpus is a starting evaluation set, not evidence of full-library or real-world clinical validity. All unassessable records must remain visible with coverage counts.
- Competitor references are limited vendor search excerpts. Direct Tempus reader fetches returned HTTP 429; publication dates/methods were not established. They support US positioning claims only, not comparative effectiveness or India-specific evidence.
- No clinician task observation, timing baseline, accuracy benchmark or live Supabase/OpenAI requalification occurred. Historical service gaps remain unverified in this session.
- Effort ranges and quantitative targets in the artifact are explicitly proposed planning assumptions.

## Next

Owner and clinical reviewer resolve S0's intended-use and authority contract. Implement S1's interaction repairs under existing visual authority, then the patient/source and criterion-model foundations before adding scores. Deliver dependent slices through the existing review-branch and observable-evidence process. Use the fifteen proposed acceptance scenarios as implementation evidence, not as already-passed results.

## Sign-off needed

No sign-off is needed to read this local planning deliverable. Owner sign-off is needed for the revised clinical scope, clinical reviewer and validation thresholds, scoring/close-match policy, any autonomous eligibility claim, and any future real-data/integration or publication boundary. P5 and product lock remain open.
