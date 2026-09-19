# Work report — P5 live oncologist validation deployment

## Problem

Oncologists need to test whether a source-linked India oncology trial finder, explicit registry/site status separation, alerts, and closed-loop referral workflow improve the current search-and-call process. The earlier prototype used synthetic trials and could not validate registry-data usefulness or real search behaviour.

## Decision

Use a dated real ClinicalTrials.gov API v2 snapshot for the private-project validation build while keeping every patient, EMR, tumour-board, referral, and eligibility example synthetic. Deploy the isolated static `web/` app to Vercel with noindex and restrictive browser headers. Keep CTRI scraping, WHO ICTRP product ingestion, automated patient matching, eligibility recommendations, and treatment recommendations out of scope.

## Evidence

- GitHub repository `beiyonder/onco-grid` → visibility changed from public to private on 2026-09-17.
- Remote workflow → existing branch `research/foundation-and-p5` and pull request `#1`; no direct push to `main`.
- First checkpoint commit → `a7e6061` (`Add trial validation research and prototype`) pushed to pull request `#1`.
- Real-data checkpoint commit → `7f0278f` (`Add real India trial snapshot validation app`) pushed to pull request `#1`.
- ClinicalTrials.gov API v2 source timestamp → `2026-09-16T09:00:06`.
- Source query → India location plus active recruitment-state filter and broad oncology condition query.
- API candidates → 338; retained interventional records with at least one India location → 285.
- Privacy minimisation → contact names, email addresses, and phone numbers omitted; source record links retained.
- `python3 scripts/fetch_india_oncology_trials.py --validate-only` → `PASS: 285 normalized India oncology trials valid`.
- `python3 research/validate_ledger.py` → `PASS: 70 records valid; 70 retained; IDs and contradiction references consistent`.
- Browser QA → 285 real records loaded, 60-card display cap with full filtering, dynamic condition/state filters, source links, India site list, registry-declared/site-unverified separation, and real-trial/synthetic-case workflow all observed.
- Browser console after final local reload → zero errors and warnings.
- Local desktop viewport → 1440×1000; mobile viewport → 390×844 with no page-level horizontal overflow.
- Vercel deployment → `https://onco-grid-trial-relay-validation.vercel.app`.
- Remote QA → 285 real records loaded on desktop and mobile; source link present; browser console zero errors.
- Remote headers → CSP, `X-Robots-Tag: noindex, nofollow, noarchive`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, restrictive Permissions Policy, and strict referrer policy observed.

## Risks and gaps

- The Vercel production alias is accessible to anyone with the URL. It is unindexed and contains no real patient data, but it is not password-protected.
- Vercel Authentication for all deployments would require permitted Vercel users; password protection is not available on the current Hobby plan.
- GitHub branch-protection API returned HTTP 403 for the private repository on the current plan. PR-only changes are therefore governed procedurally rather than technically enforced.
- ClinicalTrials.gov coverage is not complete for India and remains registry-declared, not proof that an India site can enrol today.
- Site contacts are deliberately not republished; users must open the source record and verify through an authorised route.
- The broad oncology query can include false-positive or low-relevance conditions; oncologist validation should identify filters that need tightening.
- The static snapshot changes only when the fetcher is rerun and a new deployment is reviewed.
- No direct local workflow baseline, buyer, verification staffing model, or willingness-to-pay evidence exists yet.

## Next

Run structured oncologist sessions using the Vercel URL. Measure time to find a plausible trial, fields trusted or distrusted, missing site details, source-link use, alert usefulness, and whether site verification/referral tracking changes the workflow. Record only de-identified aggregate findings. Refresh and redeploy the snapshot through pull request review when a new validation round requires it.

## Sign-off needed

The owner should decide whether the unindexed public validation URL is acceptable for invited oncologists or whether to require Vercel-user authentication before sessions. Product scope remains unlocked until the live sessions establish a repeated user, trigger, burden, and operational KPI.
