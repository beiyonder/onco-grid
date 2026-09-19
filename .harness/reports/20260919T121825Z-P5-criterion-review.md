# Work report — P5 C2 Criterion review

## Problem

The accepted patient workspace still used four generic review dimensions with preassigned source labels. It did not show exact registry criterion wording, let the clinician explicitly choose the source used for each criterion, name reviewer/date, or present the required `Criterion → Source record → Human review state → Next action` sequence. Any prototype role could change review state. The entry actions also used “Choose trial manually” and “Review with synthetic EMR case” rather than the blueprint's safer product language.

## Decision

Deliver Phase 3 slice 2 on `feat/criterion-review`. Change the patient action to `Find trials to review` and the trial action to `Review this trial for the patient`. Keep the general Trial library unfiltered and unranked by patient context. Deterministically segment the first four numbered criteria from the retained registry text without semantic interpretation, preserving exact wording with its Inclusion/Exclusion section label. For every excerpt, require an explicit clinician-linked synthetic EMR source, one permitted human state, reviewer/date, and state-specific next action. Permit source and state changes only under the synthetic treating-oncologist role. Continue showing count progress only—never a percentage, score, match, qualification, or eligibility conclusion.

## Evidence

- General discovery boundary — Find trials to review opened the unfiltered 285-record library with blank search and no patient filter. Selecting the second visible trial and choosing Review this trial for the patient returned to Patients with the exact selected NCT identifier and `clinician selected` metadata.
- Exact review set — for the initial selected trial, deterministic enumeration produced four complete registry excerpts: inclusion criteria 1 through 4. The parser preserved `PD-L1 combined positive score (CPS) ≥ 1.` rather than incorrectly treating its numeric threshold as a new list item.
- Sequence contract — every criterion row used DOM and mobile reading order: criterion copy, clinician-linked source control, human review control/reviewer metadata, and next action. Desktop labels also showed the four-step sequence.
- Coordinator authority failure — attempting to mark Confirmed reverted to Not reviewed and stated that only the treating oncologist may record criterion state. Attempting to replace Pathology report with Molecular report also reverted and stated that only the treating oncologist may link the review source.
- Clinician workflow — after switching to Dr M. Shah, criterion 1 linked Molecular report and became Confirmed; criterion 2 linked Laboratory report and became Needs clarification. Both recorded `Dr M. Shah · 19 Sept 2026`. Their next actions became `No missing-information action recorded` and `Resolve the missing source or unanswered question before handoff`.
- Progress and non-score boundary — progress became `2 of 4`; Recent work repeated `2 of 4 criterion states recorded by Dr M. Shah`; the footer explicitly stated that no aggregate eligibility status is generated.
- Source evidence — Open source on criterion 1 opened Molecular report with the existing synthetic EMR and no-interpretation boundary; Recent work recorded the source access.
- Desktop at `1440×1000` — two-column criterion composition remained readable with exact text and contextual controls, no horizontal overflow. Narrow mobile at `390×844` — each row flattened to the exact four-step order, sequence header hid because each control retained its own visible label, criterion text did not overflow, and page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final four-criterion render produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

The first four excerpts are deterministic presentation of registry text, not clinical normalization, semantic parsing, completeness, or eligibility logic. Some trial records may retain unnumbered criteria and therefore yield fewer review excerpts. All patient facts, sources, roles, and decisions remain synthetic browser-memory data. Needs clarification identifies work but does not yet create an owned missing-information task; that is the next slice. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 3 slice 3: create named missing-information tasks from a Needs clarification criterion for source retrieval, method acceptance, human clarification, or tumour-board routing, with due state, provenance, and no guessed answer.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any automated clinical parsing or matching, real patient data, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
