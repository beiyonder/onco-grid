# Work report — P5 C2 Clinician portal feedback

## Problem

**SOURCE CLAIM:** One de-identified oncologist reviewed the deployed Trial Relay validation portal and supplied free-text feedback relayed by the repository owner. The reviewer rejected interface sound, judged the visible set of 285 India-located records too small, perceived missing cancer coverage, requested global trial breadth and connections with specialist Indian cancer centres, predicted that low coverage would reduce clinician interest, wanted clearer trial abstracts and drug-centred navigation, requested linked peer-reviewed publications, and described a desired cross-trial drug report spanning populations and time.

This is one unstructured clinician account, not prevalence evidence. No observed search task, failed query, missing cancer list, workflow timing, institution, specialty, geography, target coverage threshold, publication source, or report interpretation method was supplied. The original personal identifier and raw private message are intentionally not retained.

## Decision

Remove interface sound completely rather than merely defaulting it off: delete the player component, its global interaction and scroll listeners, its UI control, its styling, persisted preference, and the `uisfx` dependency.

Record each feedback point as one atomic source claim (`EV-0071` through `EV-0078`) while assigning all eight to one independent source group. Retain them at weak strength because they are valuable direct preferences but come from one unstructured review.

Do not silently broaden production data or generate a clinical comparison report. The safe product response separates two layers:

1. **Global evidence breadth:** source-labelled registry and publication discovery, drug/intervention indexing, and deterministic trial abstracts.
2. **India actionability:** independently authorised hospital/site verification, local availability state, referral ownership, and audit.

A multi-trial drug output is promotable only as a descriptive, citation-backed evidence map of study facts, populations, interventions, and dates. It must not pool efficacy or safety, rank treatments, infer comparability, match a patient, determine eligibility, or recommend care.

## Evidence

- `EV-0071` records the perceived insufficiency of 285 records and missing cancer-type coverage.
- `EV-0072` records the request for broader global trial coverage.
- `EV-0073` records the request to connect with specialist Indian cancer centres for authoritative trial/site workflows.
- `EV-0074` records the predicted early-interest risk from a small visible result count.
- `EV-0075` records the request for a concise, source-grounded trial abstract.
- `EV-0076` records the request for drug/intervention-centred discovery.
- `EV-0077` records the request for linked peer-reviewed publications.
- `EV-0078` records the desired multi-trial, same-drug, population-and-time evidence report and its clinical-interpretation boundary.
- All eight records use independent source group `clinician-portal-review-2026-09-22-01`; they count as one clinician source, not eight independent confirmations.
- Complete sound cutover removed `ExperienceSound`, all interaction/scroll audio listeners, the toggle control and styles, the persisted-preference implementation, and the pinned `uisfx` dependency. A repository search found no remaining sound component, class, dependency, preference key, `AudioContext`, `Audio`, or `.play()` reference in `web/`.
- Desktop browser QA at 1467×929 found zero sound controls, zero audio elements, zero horizontal overflow, zero console warnings/errors, and zero page errors; the source, pilot-state, and role controls reflowed without a gap.
- Mobile browser QA at 390×844 found zero sound controls, `scrollWidth = clientWidth = 390`, a 60.7969px topbar, and the unchanged 64px liquid-glass bottom navigation.
- `cd web && npm run build` passed TypeScript and Vite across 103 modules; the main client asset fell to 574.72 kB before gzip after sound removal.
- `cd web && npm run test:api` passed 8/8 policy tests; `npm audit --omit=dev` found 0 vulnerabilities.
- `python3 research/validate_ledger.py` passed 78 retained records, and `python3 scripts/fetch_india_oncology_trials.py --validate-only` passed the unchanged 285-record snapshot.
- Serena re-indexed 48 source files (`python=4`, `typescript=44`); project health and memory-reference checks passed. `git diff --check` passed.
- The intended change set contained no secret-shaped values or email addresses; the raw private notes, expanded DOCX, and `.private/` remained ignored. Only de-identified aggregate themes were retained.

## Risks and gaps

The feedback identifies a credible product-fit problem but does not establish the correct coverage target or data architecture. Increasing record count without deduplication, provenance, geography, freshness, and site-actionability controls can reduce signal. Specialist-centre integration requires institutional authority and cannot be inferred from registry listings. Publication ingestion introduces linkage quality, licensing, correction/retraction, access, and publication-bias constraints. A cross-trial report can become comparative clinical interpretation unless its fields and allowed transformations are explicitly bounded.

`P5` remains open. This review is direct clinician product feedback, but it is not an observed post-board workflow, attributable burden baseline, or product-lock decision.

## Next

1. Merge and deploy the verified sound removal and de-identified evidence update.
2. Run a structured follow-up using concrete failed searches: expected cancer, drug, geography, source, and what would count as a useful result.
3. Prototype a coverage matrix, exact intervention index, and deterministic trial abstract over the existing source before adding data.
4. Present a separate source/permission decision for global registry coverage and bibliographic metadata.
5. Seek exact owner authorisation before contacting any named institution; capture role, authority, update ownership, and referral/site-verification workflow rather than requesting generic partnership.
6. Test one source-bounded drug evidence map with a clinician and verify that it improves retrieval without inviting treatment comparison or recommendation.

## Sign-off needed

No owner sign-off is required to remove sound or retain de-identified source claims. Owner sign-off is required before adding a new publication data source, materially changing geographic/product scope, contacting external institutions, accepting new data/reuse terms, or promoting a cross-trial output that could cross into clinical interpretation.
