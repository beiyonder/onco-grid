# Work report — P5 C2 registry criteria formatting

## Problem

The Trial Detail `Read registry criteria` disclosure rendered the entire retained eligibility string as one serif paragraph. Long records such as `NCT05732805` combined inclusion criteria, exclusion criteria, numbered requirements, and nested exception lists into an unreadable text dump despite preserving the source accurately.

## Decision

Preserve the exact registry wording while adding a display-only structure parser. Separate named Inclusion, Exclusion, and Protocol sections; split numbered or registry-bulleted top-level criteria; retain nested `*` items under their parent criterion; remove source-escape slashes before comparison symbols; and present the result as semantic section headings, numbered rows, nested lists, counts, and a visible source-not-interpretation boundary. Do not summarize, infer, score, rank, or rewrite clinical meaning.

## Evidence

- `NCT05732805` — the disclosure now reports 38 criteria: 10 Inclusion and 28 Exclusion rows, with 12 nested source bullets retained under their parent rows.
- `NCT06345729` — the alternative registry-bullet format produced 23 criteria: 7 Inclusion and 16 Exclusion rows.
- Patient-review compatibility — the independent criterion-review path remained at 23 retained excerpts and `3 of 23 retained registry criteria reviewed` for `SYN-2047 × NCT06345729`.
- Source fidelity — the UI explicitly states `Source text, not interpretation`; original ordering, wording, section authority, source numbers, and nested bullets remain visible. No aggregate assessment is created.
- Desktop visual check at 1305×929 — the disclosure showed a concise two-line summary, total count, blue source boundary, distinct Inclusion/Exclusion section treatment, readable numbered rows, separators, and nested bullets with zero horizontal overflow.
- Narrow check at 390×844 — disclosure opened by keyboard, rows collapsed to a 28.8px marker plus 247.8px text column, minimum visible text remained 13px, and page-level horizontal overflow remained zero.
- Accessibility — native `details`/`summary`, section headings, ordered and unordered lists, and keyboard activation remain intact; print mode still expands a closed disclosure.
- Browser health — desktop and narrow interactions produced zero console warnings, console errors, or page errors.
- Build — `npm run build && npm run typecheck` passed; Vite transformed 40 modules and emitted 39.32kB CSS plus 388.62kB application JavaScript before gzip.

## Risks and gaps

ClinicalTrials.gov eligibility text is heterogeneous. The display parser safely recognizes explicit section labels, numbered items, and `*` bullets, but some records may contain narrative-only criteria or unusual numbering and therefore remain a single Protocol row. The original source link and raw repository snapshot remain authoritative. Formatting evidence is not clinical validation of criterion grouping.

## Next

Merge the formatting fix through a focused review pull request. Test additional high-length and non-numbered registry records during direct usability sessions; adjust only display segmentation and preserve exact source wording.

## Sign-off needed

No separate owner review is required for this display-only fix under the autonomous implementation-merge decision. Owner and clinical-governance sign-off remain required for interpreting criteria against patient data, eligibility conclusions, patient-specific ranking, cohort matching, real-data upload, or any clinical decision-support behavior.
