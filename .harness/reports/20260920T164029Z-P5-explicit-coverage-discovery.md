# Work report — P5 C2 explicit coverage and discovery

## Problem

The owner requested a trial-level patient action, cohort review, manual record import, and assisted discovery. Literal “match” or “closely match” scores would cross the repository's no-ranking/no-eligibility boundary and could function as clinical decision support. Free-form upload could also admit identifiers or PHI. The implementation needed to provide useful review flow without hidden inference, patient-conditioned trial ordering, or data leaving the browser.

## Decision

Implement the owner-selected explicit-coverage model. Trial Detail now offers `Review with patient` and `Review cohort coverage`. Existing or approved de-identified browser workspaces can enter the existing human criterion review, but the system computes no criterion result or overall conclusion. Cohort counts use only visible clinician-selected exact fact filters and remain unranked. Trial Library assisted discovery adds deterministic public-registry phase/status/city filters and a complete input trace. Approved research import accepts only a strict, allow-listed JSON schema, rejects identity-like fields and values, remains browser-memory only, and is explicitly excluded from AI, Supabase communication, analytics, and maps.

## Evidence

- Trial action — `NCT06345729` exposed both patient and cohort review actions alongside Follow and Trial Room.
- Patient launcher — opened with heading focus, three existing workspaces, a manual-review-only boundary, no score/ranking/eligibility language, and keyboard/Escape close behavior.
- Existing workspace path — each row names the local ID, context, data boundary, fact count, and owner before opening the existing criterion-by-criterion human review.
- Strict research schema — only `schemaVersion`, institutional `approvalReference`, one of four non-identifying contexts, one of two owners, and 1–20 allow-listed fact label/value pairs are accepted. Extra keys, emails, phone-like strings, full dates, long identifiers, oversized files, and unsupported fields are rejected.
- Rejection path — a JSON record containing `patientName` was rejected with `Use only the approved schema. Identity or extra fields are not accepted`; the dialog remained open and no workspace was created.
- Approved import path — approved test JSON created `RID-001`, opened `#/patients/RID-001/reviews/NCT06345729`, showed three facts with `Approved de-identified research data` badges, and displayed the approved research/no-AI boundary.
- Ephemeral boundary — reloading the imported-workspace route removed `RID-001` and its approval reference; nothing persisted or appeared in storage, logs, AI, or communication state.
- Cohort coverage — with no filters, 3 of 3 browser workspaces were visible. Adding explicit `Diagnosis context · contains · lung` produced 1 of 3 and only Synthetic Cedar. The result stayed unranked and explicitly disclaimed trial fit, eligibility, and clinical similarity.
- Assisted discovery — `Phase: Phase 3` was shown in the input trace and deterministically reduced the dated public snapshot from 285 to 187 records; visible rows retained Phase 3 and patient-neutral ordering.
- Mobile — at 390×844, the review dialog measured 390px wide, retained 13px minimum visible text, focused its heading, and had zero page-level overflow. Assisted filters collapsed to one column with zero overflow.
- Browser health — assisted discovery, cohort filtering, approved import, and review navigation produced zero console warnings, console errors, or page errors.
- Build — `npm run build && npm run typecheck` passed; Vite transformed 42 modules and emitted 45.21kB CSS plus 404.22kB application JavaScript before gzip.

## Risks and gaps

The import validator reduces obvious identifier risk but cannot prove that an institution properly de-identified or approved a dataset. Institutional governance remains the source of that assurance. Browser-memory import is unsuitable for production clinical records. Explicit string filters can miss synonyms and spelling variants; this is transparent and preferable to hidden semantic ranking at the current evidence level. Counts indicate only filter satisfaction, never trial suitability or eligibility.

Supabase and OpenAI live configuration are still absent. No patient or approved research facts may be sent to either service when those later slices are enabled.

## Next

Merge this slice, then implement official ClinicalTrials.gov evidence retrieval and the source-only Trial Room assistant through authenticated server-side functions. Use pinned `gpt-5-nano-2025-08-07`; require citations; reject patient context and identifier-like input; fail closed when Supabase or the rotated server secret is not configured.

## Sign-off needed

No separate owner review is required for this owner-authorized, no-ranking slice. Institutional approval remains required for every imported de-identified dataset. Owner sign-off remains required for any identifiable data, persistence, semantic patient ranking, clinical interpretation, eligibility conclusion, or production clinical use.
