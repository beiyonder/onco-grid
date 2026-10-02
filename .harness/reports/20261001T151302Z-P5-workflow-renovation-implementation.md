# P5 / C5 — synthetic workflow renovation implementation

## Authority and outcome

- **FACT:** The owner authorised the browser-only synthetic renovation on 2026-10-01, then explicitly replaced parallel orchestration with direct implementation. Work was implemented directly on `feat/trial-relay-e2e-renovation`.
- **OBSERVED:** The reachable synthetic application journeys pass the scenarios below. This report records local source and built-artifact evidence, not production deployment, clinical qualification, real-patient matching, or product lock.
- **OPEN:** `P5`, independent clinical review of every demonstration interpretation, any close-match policy, direct workflow observation, and live Supabase/OpenAI qualification remain open. Close-match labels remain disabled. No external patient handoff was performed.
- **FACT:** Serena/LSP were unavailable in this session (`GAP-SERENA`); repository memory files were read directly. TypeScript compilation and executable/browser evidence supplied code verification instead of claiming language-server coverage.

## Implemented surface

- **FACT:** `web/src/domain/` defines typed synthetic sources/assertions, predicates, source-preserving model revisions, information-need identity, immutable assessment snapshots, human overlays, owned gaps, PI dispositions, packets, and audit transitions.
- **FACT:** Twelve numbered cases cover complete records, missing molecular evidence, conflict, assay nuance, incomplete treatment sequence, known exclusion, stale laboratory data, interval boundaries, branch review, unsupported model coverage, thin intake, and source revision. Controlled intake creates subsequent numbered records. No free-form patient file ingestion was added.
- **FACT:** Six registry-population demonstration models retain exact source spans. Publication/revision requires an authorised demo reviewer and reason. Unsupported logic abstains. Other studies remain visibly unmodeled; six models do not imply coverage of the 285-record library.
- **FACT:** Patient-first and PI-first runs share one deterministic evaluator and pair identity. Scores describe supported applicable roots, never eligibility probability. Among assessable pairs, any known blocker sorts behind zero-blocker pairs before support fraction is considered. Uncertainty stays in the denominator; no-applicable-root and unpublished/incomplete models abstain.
- **FACT:** Source originals, highlighted locators, run/source/model versions, progressive review, guarded bulk acceptance, protected unsaved edits, accepted evidence tasks, targeted reruns, shortlist, site/owner-scoped human disposition, and simulated handoff are connected routes.
- **FACT:** Approved research imports retain a separate manual, unscored review route. Existing authenticated no-PHI handoff remains separate and fail-closed. Obsolete local patient/handoff state was removed rather than maintained as a compatibility path.
- **FACT:** Complete global registry detail uses the existing contact-field-stripped public API. Global pagination retains upstream count, loaded evidence survives partial failure, and detail return retains the public query/result set. A lazily loaded country map exposes loaded/placed/unplaced scope, keyboard country selection, list parity, and an India-lens switch. Antimeridian clipping prevents false world-spanning country edges.

## Observable acceptance

| Scenario | Exact execution and observed result | Status / boundary |
|---|---|---|
| R01 — patient depth | Browser showed Patients 1–12; search `Patient 11` returned the thin-intake record. Creating that scenario produced Patient 13 with three explicitly unreviewed assertions and missing fields, rather than filled-in assumptions. | **OBSERVED — pass** |
| R02 — originals | Review → View original highlighted `line:4`, focused `source-line-4`, and displayed exact synthetic source text. Return restored the criterion review. Source origin and confirmation authority were separately visible. | **OBSERVED — pass** |
| R03 — gap resolution | Patient 11 sex task progressed accepted → evidence-received → reviewed → reassessed after supplied evidence, oncologist confirmation and affected-study rerun. Remaining age uncertainty persisted. An age task was closed unable-to-obtain with a reason and without changing facts. | **OBSERVED — pass** |
| R04 — context | Trial Detail → Review with patient → selected Patient 1 retained the explicit NCT scope. Run reported one included study, one evaluated pair and 284 explicitly excluded studies. Patient/result/source return routes retained context. | **OBSERVED — pass** |
| R05 — directional parity | Built app: Patient 1 × NCT06348199 in both directions produced 6/6 supported, zero violations/unresolved, 100% assessability. All six displayed predicate-and-evidence trace objects were collected through the criterion inspector and compared: exact equality `true`. | **OBSERVED — pass** |
| R06 — score policy | Permanent tests verify unknown exclusions, known exclusion violation, denominator retention, draft abstention, zero applicable roots, and blocker precedence over a higher support fraction. | **OBSERVED — pass** |
| R07 — predicate boundaries | Tests exercise AND/OR/NOT unknown propagation, applicability, inclusive/exclusive numeric bounds, incompatible units, exact interval boundary, strict event sequence, partial/future dates, stale evidence and conflicting assertions. | **OBSERVED — pass**; not clinical validation |
| R08 — progressive review | Single criterion inspector, exact source links and keyboard Enter selection worked. Unsaved navigation displayed Discard/Keep editing; Keep editing preserved the form. Explicitly selecting supported checkboxes recorded 6/6 human reviews; reducer rejects unresolved bulk acceptance. | **OBSERVED — pass** |
| R09 — PI authority | Demo PI selected a registry-listed Bangalore site and assigned owner, then recorded a reason/evidence-linked human disposition. Auditor controls were read-only. Publishing a changed interpretation made prior assessments and the packet stale; release control was disabled. Cohort is explicitly the registry population, not an invented arm. | **OBSERVED — pass** |
| R10 — gap identity | Lifecycle regression accepts age needs from two distinct trial criteria into one shared information task with two explicit assessment links. Identity includes patient, information concept and time window; criterion decisions remain separate. | **OBSERVED — pass** |
| R11 — UI defects | Native dialog opened with body overflow hidden, visible Close, 810px internal height versus 1429px scroll content at 390px viewport. Escape closed it and restored `preview-NCT05732805` focus. Patient tabs/content: mobile 570.98/596.58px; tablet 480.44/506.03px, no overlap or horizontal overflow. All five mobile destinations fit after correcting the navigation grid. Trial heading was 21.6px at tablet width. CSS 200% scaling retained no horizontal overflow and separated tabs/content (1126.05/1177.23px). | **OBSERVED — pass**; scaling check is CSS zoom, not a native browser-zoom claim |
| R12 — global continuity | Public `pembrolizumab` query loaded 20 then 40 records while retaining 2,964 upstream matches. At 40: 37 placed/3 unplaced; country dropdown and list agreed. Complete NCT07788664 detail displayed full eligibility and three Spain locations without contact fields; back retained query and all 40 records. Deliberate next-page HTTP 503 displayed source error while retaining 40 records. | **OBSERVED — pass**; live public counts are dated, not stable fixtures |
| R13 — version/race boundaries | Tests reject completion after cancellation and after input revision; old assessment snapshots remain unchanged. Browser protocol revision invalidated prior decisions/packet release. | **OBSERVED — pass** |
| R14 — safety and failure | Request log was cleared immediately before selected-study synthetic matching and remained `[]`. Offline global detail displayed `Failed to fetch` plus Retry, not fabricated data. Forced WebGL failure left 69 accessible India cluster buttons. Print/reduced-motion/reduced-transparency media were explicitly emulated and matched; print hid navigation while retaining evidence. No configured live handoff showed the explicit unavailable state. | **OBSERVED — pass** within local scope |
| R15 — complete lifecycle | Browser: shortlist → six explicit human criterion reviews → PI site/owner disposition → Draft packet → Ready for simulation → Simulated acknowledgement. No transmission occurred. Built-app reload restored model v1/draft and zero run cards. | **OBSERVED — pass** |

## Executable and independent checks

- **OBSERVED:** `cd web && npm run build` passed strict frontend/API TypeScript and Vite production generation. Main JS 659.47 kB; world geometry is a separate 430.79 kB deferred chunk. No oversized-main-chunk warning remained.
- **OBSERVED:** `cd web && npm test` — 28 tests, 28 passed, zero failed.
- **OBSERVED:** `cd web && npm audit` — zero vulnerabilities.
- **OBSERVED:** `python3 research/validate_ledger.py` — 79 retained records valid; IDs and contradiction references consistent.
- **OBSERVED:** `python3 scripts/fetch_india_oncology_trials.py --validate-only` — 285 normalized India oncology trials valid.
- **OBSERVED:** Built app at local port 4173 rendered all twelve records, published a model, produced twelve candidate results, and reported no browser runtime errors. Detailed trace parity was also exercised against this built artifact.
- **OBSERVED:** Independent OMP-native security scan `secscan_01a0f7f8da5c75bd9c64ebe2f90b8a24` completed with zero findings. Pinned scope: domain/state and public registry/dev API bridge files at scan start. This is a scoped automated review, not a whole-product penetration test or clinical review.
- **OBSERVED:** `git check-ignore` confirmed both sensitive raw source filenames remain ignored. `git ls-files` returned neither. `git diff --check` passed after removing one trailing blank line. No raw participant material was used in the new code or visual evidence.
- **OBSERVED:** Orca listed only the main checkout and this OMP terminal; no renovation worker checkout or worker terminal remained active.

## Retained visual evidence

All images contain only supplied synthetic fixtures or public registry geography:

- [Mobile patient and five-destination navigation](../evidence/20261001-renovation/mobile-patient.jpg)
- [Built criterion-review workbench](../evidence/20261001-renovation/criterion-review.jpg)
- [World geography after antimeridian correction](../evidence/20261001-renovation/world-lens.jpg)

**OBSERVED:** An earlier browser process timed out on screenshots; a fresh managed browser restored screenshot capture. Final visual evidence above was captured successfully. Earlier DOM-only evidence is not represented as a screenshot.

## Remaining gates and release state

- **OPEN:** Independent human clinical interpretation/benchmark qualification. Demonstration publication cannot satisfy it.
- **OPEN:** Owner-approved close-match thresholds, real-data handling, any production clinical use, direct workflow effectiveness evidence, and product lock.
- **OPEN:** Approved Supabase configuration and rotated server-side OpenAI credential; live authentication/RLS/realtime/two-user handoff/assistant qualification remain unavailable.
- **FACT:** No new production dependency or service was introduced. No public push, merge, production deployment, external contact, or patient transmission is claimed by this report. The existing remote deployment is unchanged by local verification.

## 2026-10-02 outcome-first live-registry refinement

### Authority and implementation

- **FACT:** The owner selected “Working engine, live registry, synthetic patients.” This iteration does not implement clinical prioritisation, real-patient evaluation or a Trial Opportunity Index.
- **FACT:** The engine remains deterministic, not an AI matcher. Six supplied reference models are immediately executable. Each applicable root produces supported, violated or unresolved; missing, conflicting, unreviewed, stale and unsupported evidence remains unresolved. Support is `supported / (supported + violated + unresolved)`, not eligibility probability. Known violations take precedence over support-fraction ordering. Other library studies remain visibly unmodeled.
- **FACT:** Live runs fetch full public registry detail through the existing endpoint and compare the entire eligibility text with the model source, including added requirements. Only whitespace is normalized because the retained snapshot already collapses it. Changed, incomplete, unavailable, future-dated or stale responses fail closed. Successful source checks expire after 15 minutes. Synthetic evidence is evaluated locally at its disclosed fixture date, 2026-09-20.
- **FACT:** The queue leads with study/patient identity, one outcome, criterion coverage and a review action. Reasons, full study title, provenance and exact traces are progressively disclosed. Long trial titles no longer dominate compact result rows; source-backed intervention names identify the row alongside its registry ID. Run controls collapse after completion.
- **FACT:** My studies navigation, direct routes, model mutation, trial-first runs and trial-side disposition require a qualifying authenticated profile and an explicit study grant. The prototype persona does not establish PI authority. Migration: `web/supabase/migrations/20261002090000_trial_relay_pi_grants.sql`.
- **DECISION:** No composite Trial Opportunity Index was invented. Education, biomarker testing, referral and site activation are different targets; the proposed clinical prioritisation claim has no approved label definition, weighting, independent benchmark or real-data authority here.

### Observed acceptance

| Scenario | Observed result | Scope / limitation |
|---|---|---|
| Patient 1 / NCT06348199 | Requirements supported; 6/6 encoded requirements | Live registry separately reported active-not recruiting; support is not recruitment availability or final eligibility |
| Patient 4 / NCT02161900 | Requirements supported; 6/6 | Supplied reference benchmark |
| Patient 6 / NCT02161900 | Criterion conflict; 5/6 supported, one conflict | Supplied reference benchmark |
| Patient 11 / NCT06348199 | Evidence needed; 0/6 supported, six unresolved | Thin-intake benchmark |
| Patient 3 / NCT03390686 | Evidence needed; 3/9 supported, six unresolved | Conflicting molecular evidence remains unresolved |
| Live source change and outage | Changed eligibility and injected HTTP 503 both produced Not evaluated / no current score; subsequent real-source retry recovered | Failure responses injected in the local browser, not upstream |
| Bidirectional evaluation | Identical six-criterion findings and exact predicate traces for Patient 1 / NCT06348199 in patient-first and PI-first live runs | PI identity/grants supplied by isolated synthetic-auth responses |
| Anonymous PI access | No My studies navigation; `/studies` displayed PI sign-in required | Actual unconfigured local application |
| Scoped PI access | Granted queue accessible; foreign study rejected; logout removed navigation and closed direct route | UI fixture only, not genuine Supabase login or RLS evidence |
| Responsive layout | At 390px, document width remained 390px; outcome and review action visible in compact card; section tabs ended before content began | Desktop and narrow screenshots retained below |
| Progressive disclosure | Completed run controls and reasons initially collapsed; Enter expanded the focused reasons summary | Native keyboard-accessible details |
| Production artifact | Built preview computed the Patient 1 reference outcome as 6/6, with compact identity and no browser errors | Static preview does not provide live Vercel Functions |

### Checks and evidence

- **OBSERVED:** Final `npm run build` passed frontend/API TypeScript and production generation.
- **OBSERVED:** Final `npm test`: 32 passed, zero failed. Added boundary regressions cover source freshness/change/formatting, no-score refusal and trial-scoped PI permission.
- **OBSERVED:** Final `npm audit`: zero reported vulnerabilities.
- **OBSERVED:** Live registry checks were exercised through the development API bridge. Browser request inspection showed public trial-ID requests, not synthetic patient assertions.
- **OBSERVED:** [Desktop live outcome](../evidence/20261002-matching/desktop-outcome.jpg), [390px live outcome](../evidence/20261002-matching/mobile-outcome.jpg), and [PI queue with synthetic authentication](../evidence/20261002-matching/pi-queue-synthetic-auth.jpg).
- **OPEN:** The PI migration has not been applied to an approved live service in this session. Genuine authentication, RLS isolation/self-grant rejection and two-user qualification remain blocked by the existing service-configuration gap. Synthetic-auth browser checks do not close it.
- **OPEN:** Independent clinical model qualification, real-data handling, close-match policy, clinical prioritisation and P5 workflow validation remain unchanged.
- **FACT:** Local implementation only. No public push, merge, production deployment, external communication or patient transmission occurred in this refinement.
- **FACT:** `GAP-SERENA` was recorded for this session; repository memories were read directly because Serena tools were unavailable.
- **OBSERVED:** Service-log inspection caught nested paragraph markup in the new PI denial state. The caller now uses `EmptyState.action`; the final rebuilt browser journey opened the denied route, followed Open patients, ran the first worked case to 6/6 support, and reported zero browser errors. The isolated synthetic-auth service and managed verification tabs were closed afterward; the normal local development surface remains available.
