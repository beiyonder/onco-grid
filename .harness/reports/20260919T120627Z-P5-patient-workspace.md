# Work report — P5 C2 Patient workspace

## Problem

The existing Patients view contained useful synthetic EMR records and a criterion review, but it read as two equal panel stacks rather than one dominant patient workspace. Identity, encounter, treating team, source availability, active reviews/referrals, and information authority were not visible together. Original source artifacts, clinician-confirmed facts, missing/unknown information, and conflicts lacked one explicit visual and textual grammar. Recent patient work was not summarized.

## Decision

Deliver Phase 3 slice 1 on `feat/patient-workspace`. Reframe the existing synthetic case as one patient entity with encounter/access context, treating team, source availability, active review and handoff counts, and three named sections: Summary and records, Trials under review, and Activity and next steps. Add an explicit authority key for source artifacts, clinician confirmation, missing/unknown state, and conflicting assertions. Keep four clinician-confirmed facts separate from four original EMR references. Make the source timeline progressively disclosed and add dynamic recent work for selected trial, criterion progress, source access, referral/packet state, and board state.

## Evidence

- Identity and context — Patient workspace displayed `Synthetic case SYN-2047`, encounter `ENC-DEMO-8821`, Western Oncology Unit, session-expiring authorised read-through, treating team Dr M. Shah, four of four synthetic source references, one clinician-selected trial, and zero initial open handoffs.
- Section model — the view named Summary and records, Trials under review, and Activity and next steps in both orientation navigation and section headings.
- Authority separation — four text-labelled layers identified Original EMR reference, Human-reviewed workspace fact, Missing/clarification work, and Conflicting assertions that remain separate until human resolution; colour was supplementary.
- Confirmed facts — exactly four workspace facts were labelled clinician-confirmed and retained their source references: diagnosis, recorded disease state, biomarker, and performance status. Copy explicitly stated no system inference or recalculation.
- Original sources — exactly four rows were labelled Source artifact and exposed pathology, molecular report, treatment administration, and laboratory references with resource type/date plus Open source action.
- Source inspection — opening Pathology report showed the synthetic EMR source, final/available status, source-date range, deliberately non-realistic preview, and explicit no-interpretation boundary. Recent work updated to `Source artifact opened · Pathology report · synthetic EMR read-through`.
- Initial recent work — selected real registry trial, zero-of-four human criterion progress, four source references, and no open referral handoff appeared as separate human/source/task traces.
- Desktop at `1440×1000` — dominant patient context and asymmetric summary/review layout with no horizontal overflow. Narrow mobile at `390×844` — workspace collapsed to one column, context grid to two columns, authority key to one column, artifact state/actions retained, and only the internal section navigator scrolled horizontally; page `scrollWidth = clientWidth = 390`.
- Reduced-motion emulation set transition duration to `0.00001s` and document scroll behavior to `auto`.
- Final patient render produced zero console warnings, console errors, or page errors.
- `node --check web/app.js`, `git diff --check`, `python3 research/validate_ledger.py` (70 records), and `python3 scripts/fetch_india_oncology_trials.py --validate-only` (285 records) passed.

## Risks and gaps

Every patient, encounter, record, fact, team, and activity remains synthetic. Source previews deliberately omit realistic clinical prose; this validates authority and navigation, not clinical-data rendering. The single workspace does not implement patient creation or access control. Manual trial selection and per-criterion review still use the prior interaction model and are the next slice. P5 validation and product lock remain open.

## Next

Merge this slice under the owner's autonomous-merge authority after privacy and publication checks. Then implement Phase 3 slice 2: explicit clinician-driven trial selection, per-criterion `Criterion → Source record → Human review state → Next action`, linked evidence, unknowns, and no aggregate score or eligibility conclusion.

## Sign-off needed

No separate owner review is required to merge this implementation slice under the owner decision dated 2026-09-19. Owner sign-off remains required for P5 product lock and for any real patient data, patient creation/access model, automated extraction or clinical inference, backend, persistence, production identity/authorization, new data source, deployment-topology, privacy/security-boundary, or clinical-capability change.
