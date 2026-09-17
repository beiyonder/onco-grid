# Clinical-trial discovery and tumour-board workflow clarification

## Status and evidence boundary

- Research date: 2026-09-13.
- `FACT`: The repository's `CURRENT` coordinate remains `P5` tumour-board workflow validation. Clinical-trial discovery is a proposal-only lane; this note does not select a product or change project scope.
- `SOURCE CLAIM`: Interview notes say tumour NGS is expensive and often not insured, and that oncologists primarily want a current trial repository rather than automated matching. These are useful discovery signals, not India-wide prevalence or purchasing evidence.
- `OPEN`: No current India-wide tumour-NGS price distribution, insurance-denial rate, doctor trial-search frequency, off-site referral rate, or hospital revenue impact was found.
- No identifiable patient or participant information is used here.

## Executive answer

`INFERENCE`: Do not start with patient-note ingestion or patient-to-trial ranking. That requires interpreting diagnosis, pathology, biomarkers, treatment history, and protocol criteria; under the current programme and repository boundaries it is patient-specific clinical decision support.

The defensible 60–90-day concept, if the owner later selects the trials lane, is narrower:

> A doctor/care-team-facing India trial knowledge and referral-workflow layer that preserves registry provenance, distinguishes registry-declared status from separately time-stamped site verification, exposes conflicts and staleness, and records a human-owned contact/referral task—without patient data, eligibility conclusions, ranking, or treatment recommendations.

`CONTRADICTION`: A generic “all trials dashboard” already overlaps CTRI, ClinicalTrials.gov, WHO ICTRP, institutional trial pages, and commercial products. The differentiated problem must be demonstrated as site/contact freshness and referral follow-through, not mere aggregation.

## Canonical terms

| Term | Use in this project |
|---|---|
| Trial discovery | Finding trials by general attributes such as cancer type, phase, geography, sponsor, and registry-declared status. No patient record is required. |
| Preliminary screening | Comparing a person's clinical facts with selected protocol criteria to judge likely eligibility. This is patient-specific and requires clinical oversight. |
| Formal eligibility determination | The trial site's complete protocol-based assessment, source-record review, screening tests, and final investigator decision. A dashboard cannot make this decision. |
| Biomarker test | A test for a gene, protein, or other tumour characteristic. It may be a single-marker assay, IHC/ISH, focused PCR assay, multigene NGS panel, or another validated method. |
| Tumour NGS | Sequencing many tumour-related genes or alterations from tissue or a liquid-biopsy sample. “tNGS” is ambiguous; specify “tumour NGS” or “targeted NGS panel.” |
| Registry-declared status | The recruitment status submitted by the responsible trial party and displayed by a registry. It is not proof that a particular site can enrol today. |
| Site-verified status | A separate operational assertion, with source, verifier, method, and timestamp, that a named site confirmed its current state. |

## Solution horizon

| Horizon | Decision | Safe output | Evidence gate |
|---|---|---|---|
| Now: discovery validation | Keep trials as a proposal while `P5` remains current. Test whether site/contact verification and referral follow-through are frequent and burdensome at one target setting. | Interview guide, process map, aggregate baseline, and falsifiers. | Name the user and buyer; observe current systems; measure inquiry volume, failed/stale contacts, time to authoritative answer, and handoff completion. |
| Conditional 60–90-day pilot | If the owner selects the lane, trial a bounded registry-plus-verification workflow for one centre or a small indication set. | General search, exact registry citations, declared-versus-verified state, discrepancy/freshness flag, verified contact route, and human-owned task status. | Demonstrate a lower median time to an authoritative site answer or a higher proportion of inquiries acknowledged within a locally agreed interval. |
| Later, separately governed | Consider source-system integration only after the non-patient workflow proves value. | Structured export/link to approved institutional systems. | Privacy, security, clinical governance, data retention, and integration approval. |
| Not on the current horizon | Do not ingest notes, interpret reports, infer biomarkers/stage/response, score eligibility, rank trials, or recommend treatment. | None. | Would require an explicit scope change and clinical-safety programme; current constraints prohibit it. |

## Actors, responsibilities, and beneficiaries

| Actor | Current responsibility | Direct beneficiary? | Product hypothesis—not established fact |
|---|---|---:|---|
| Treating oncologist | Frames the clinical question, discusses options, and may initiate a trial inquiry. | Yes | Primary user if finding an authoritative trial contact/status is a repeated point-of-care job. |
| Clinical research coordinator / trial coordinator | Handles trial queries, preliminary screening, source-record collection, and site workflow. | Yes | Strong candidate for verification and referral-task ownership. |
| Site principal investigator | Clinical and research authority at the site; participates in formal eligibility and trial conduct. | Yes | Approver/escalation role rather than daily dashboard operator. |
| Sponsor / sponsor trial operations | Owns the study and may maintain registry, site, and recruitment information directly or through authorised staff/CROs. | Yes | Potential buyer/data partner for on-site portfolio operations; incentives differ from a referring hospital. |
| CTRI registrant | PI or primary sponsor by agreement; updates the CTRI record. Primary sponsor remains ultimately accountable. | Indirect | Source owner for registry-declared fields, not verifier of day-to-day site capacity. |
| ClinicalTrials.gov Responsible Party / PRS administrator | Verifies accuracy and releases records or updates for PRS review. | Indirect | Source owner for the international registry record. |
| CTRI and ClinicalTrials.gov registry teams | Operate the registry and perform registration/quality checks. | Indirect | Authoritative provenance layer, not a substitute for site confirmation. |
| Pathologist / molecular pathologist | Establishes and reports pathology; performs or interprets validated ancillary molecular assays. | Yes | Information source for clinicians; not a default owner of trial referral. |
| Tumour board | Multidisciplinary human review of selected cases. | Yes | May surface a trial question, but is not required for every referral and should not be automated. |
| Hospital research office / administrator | Contracts, budgets, ethics/governance coordination, staffing, and portfolio oversight. | Yes | Likely buyer or gatekeeper; must validate business incentives and conflicts. |
| Ethics committee and regulator | Protect participants and govern the authorised study. | Indirect | Governance boundary, not a recruitment lead generator. |
| Patient and authorised caregiver | Decide whether to explore and, if eligible, consent to trial participation. | Yes | End beneficiary; no autonomous advice or unapproved disclosure. |
| Referring clinician / hospital | Maintains continuity when a trial is off-site. | Yes | May need acknowledgement and return-of-care visibility; revenue assumptions require local validation. |

## State model: never collapse these into one “live” status

### Registry layer

`FACT`: The registry displays the status supplied by the responsible trial party. CTRI sends six-monthly reminders and keeps the status field unlocked, but this mechanism does not establish real-time site availability.

Suggested display states:

- `registry_not_yet_recruiting`
- `registry_open`
- `registry_closed_to_recruitment`
- `registry_completed`
- `registry_suspended_or_terminated`
- `registry_unknown`

Every state must show registry, record identifier, source URL, record verification/update date where available, and retrieval timestamp.

### Independent site-verification layer

These are operational assertions owned by a named human or approved site source:

- `not_checked`
- `verification_attempted`
- `verified_recruiting`
- `verified_not_recruiting`
- `temporarily_paused`
- `no_authoritative_response`
- `registry_site_discrepancy`
- `verification_expired`

Each assertion needs site, verifier, source/method, timestamp, expiry rule, and note. “No response” is not “not recruiting.”

### Contact/referral-task layer

Safe non-clinical states:

- `draft`
- `human_approved`
- `sent_to_trial_team`
- `acknowledged`
- `site_screening_reported_in_progress`
- `closed_by_human`
- `unable_to_contact`

The product may record a human-reported state. It must not produce `eligible`, `ineligible`, `best match`, or a clinical reason.

## 1. Pathology and biopsy

`FACT`: A biopsy or surgical procedure obtains cells or tissue. The pathologist examines the specimen and produces the pathology report. That report commonly supplies the definitive diagnosis, histologic/cell type and grade; surgical specimens may also report margins and lymph-node findings. Selected molecular or protein tests may appear in the pathology report or in linked reports.

`FACT`: The useful workflow is not “biopsy, then PCR, then NGS” for everyone. It branches:

```text
clinical/radiologic suspicion
        |
biopsy, surgery, cytology, marrow, or liquid sample as appropriate
        |
pathology: specimen adequacy -> morphology/histology -> diagnosis/grade
        |
selected ancillary tests based on cancer, stage, clinical question, protocol, and specimen
        +-- IHC / ISH or other protein/chromosome assays
        +-- focused molecular assay such as PCR
        +-- targeted tumour NGS or broader profiling
        |
clinician review; tumour board where locally indicated
        |
general trial discovery -> site confirmation -> trial-team screening -> formal eligibility
```

`OPEN`: Turnaround time, re-biopsy rate, tissue exhaustion, and report-to-oncologist handoff at the target site remain unmeasured.

## 2. PCR

`FACT`: PCR is an amplification method. In oncology, a PCR-based assay is usually designed to detect a known, limited alteration or set of alterations. It is useful when the question is narrow and the assay is validated for that tumour/specimen.

- Advantage: focused, commonly faster and less analytically broad than a large sequencing panel.
- Limitation: it generally cannot find relevant alterations outside its designed targets.
- Decision owner: pathologist/molecular laboratory and treating team under the applicable diagnostic or trial protocol—not a trial dashboard.

`CONTRADICTION`: PCR and NGS are not interchangeable steps in a universal sequence. A focused assay may be sufficient; a multigene panel may be preferable when several alterations must be assessed; some biomarkers use IHC, ISH/FISH, MSI assays, or other methods instead.

## 3. Tumour NGS and cost

`FACT`: Tumour NGS can assess many genes or alteration types together. It may use tumour tissue or, in some circumstances, circulating tumour material. It can identify biomarkers relevant to treatment or biomarker-selected trials, but it may also return findings with no actionable use.

`FACT`: It is not necessary for every person with cancer. ESMO's 2024 recommendations support tumour NGS in specified advanced cancers, research centres/specific circumstances, and metastatic cancers for tumour-agnostic alterations when matched therapies are accessible. The recommendation explicitly considers clinical utility, cost-effectiveness, and access.

`SOURCE CLAIM`: Interview notes describe tumour NGS as high expenditure and often uninsured.

`OPEN`: Quantify this locally before using it in a pitch: exact panel, laboratory/accreditation, tissue versus liquid test, quoted patient price, payer, approval/denial outcome, turnaround time, and whether the result changed an available option. United States coverage statements cannot be transferred to India.

## 4. Tumour boards: who goes and what happens

`FACT`: Tumour boards are not only for rare cancers. NCI defines them as regularly convened multidisciplinary reviews of new and complex cancer cases. Actual case-selection rules vary: some centres review broad disease cohorts; others prioritise diagnostic uncertainty, complex or uncommon disease, multimodality decisions, recurrence, molecular findings, or requested second review.

`FACT`: In the 2026 Indian NCRP survey, 137 of 172 responding hospitals reported a functional tumour board; 47.4% of those boards met weekly and 19% met as needed. This is a hospital-registry sample, not all Indian hospitals.

A typical board workflow is:

1. A clinician or local process selects the case and frames a question.
2. A presenter assembles history, pathology/investigations, imaging, treatment history, fitness, and the board question.
3. Relevant specialists review the evidence and discuss it.
4. A clinician authors the final human decision; the board may request more tests or a later review.
5. The decision returns to the treating team through the local record/communication process.
6. A local owner handles any authorised follow-through.

`OPEN`: Current local evidence still does not identify one universal post-board owner. Existing Indian examples allocate work differently among a presenter, coordinator, treating oncologist, downstream team, or secretariat.

## 5. Which tests affect trial eligibility?

`FACT`: The exact tests come from the protocol and depend on cancer, disease state, intervention, and accepted assay. Common categories—not a universal checklist—are:

| Category | Examples of information a protocol may require | Why it matters |
|---|---|---|
| Pathology | primary site, histology/cell type, grade, pathology confirmation | Defines the disease cohort. |
| Extent/state | stage, measurable disease, recurrence/metastatic state, current imaging | Defines disease setting and baseline. |
| Protein/cell markers | receptor IHC, PD-L1, MMR proteins, flow cytometry | Some protocols select or exclude by expressed marker. |
| Chromosome/gene assays | ISH/FISH, focused PCR/RT-PCR, validated single-gene tests | Some protocols require a named alteration or fusion. |
| Multigene profiling | tumour DNA/RNA NGS panel, sometimes MSI/TMB or liquid-biopsy assays | Needed only when the protocol requires or accepts the relevant result. |
| Germline testing | validated inherited-variant result with counselling/consent where applicable | Required only for some hereditary or gene-selected studies. |
| Safety/organ function | blood counts, liver/renal function, cardiac tests, infection status, pregnancy testing where applicable | Formal screening and treatment safety. |
| Prior-treatment timing | last dose, washout, recovery from toxicity, prior exposure/resistance | Defines line and treatment eligibility. |

`FACT`: A biomarker is necessary only when the protocol requires it. The protocol may also specify the accepted method, specimen, laboratory standard, threshold, and testing window. A biomarker found by an unaccepted assay may need confirmation.

## 6. What statistics are defensible now?

| Finding | Scope and date | Interpretation |
|---|---|---|
| CTRI displayed 117,469 registered studies | Official homepage accessed 2026-09-13; all study types and diseases | Not a cancer-trial or actively recruiting count. |
| 112,858 primary CTRI IDs; 8,133 automated oncology candidates; 1,454 labelled `Recruiting` | WHO ICTRP export processed 2026-09-13; 4,611-record gap versus CTRI homepage; candidate set not manually adjudicated | Current dated registry-mirror measurement, not a full CTRI count or verified recruiting-site count (`EV-0070`). |
| 1,988 cancer trials were registered during 2007–2021 | Peer-reviewed analysis; CTRI data downloaded April 2022 | Historical oncology landscape, not current site availability. |
| Among 1,251 treatment-intent cancer trials, 28% were open, 29% not yet recruiting, and 26% completed | Same April 2022 analysis | Registry-declared historical statuses. |
| 181 open cancer studies, including 132 interventional studies | CTRI search performed 15–17 July 2020 | Historical snapshot. The study reported 13 state/UT entries with no open study. |
| Trial-slot estimates ranged from 0 to 296.81 per 1,000 incident cancer cases by state | Same 2020 analysis | Strong geographic disparity signal; the article reports a median of 1.55 in the abstract and 1.02 in the results, so do not quote one without noting the inconsistency. |
| 137 of 172 responding NCRP hospitals reported functional boards | October 2024 survey, published 2026 | Direct recent India evidence for the surveyed hospital segment. |
| 48.2% of those boards reported no recommendation follow-up system | Same survey | Supports follow-through research; does not prove software is the answer. |

`OBSERVED`: The dated WHO mirror contains 1,454 automated oncology candidates labelled `Recruiting`, but the mirror is 4,611 primary IDs below CTRI's homepage total, the candidate set is not manually adjudicated, and 79.367% of those records have `Last Refreshed on` older than one year (`EV-0070`).

`OPEN`: A current count of genuinely recruiting Indian sites still requires direct-source completeness, oncology adjudication, site extraction, cross-registry deduplication, and authorised site confirmation. Registry declaration alone does not establish capacity or contact liveness.

## 7. How bad is CTRI data?

The accurate answer is: useful official registry, known standardisation and completeness limitations, and insufficient by itself for a “live site availability” promise.

`FACT`: A 2019 audit of 12,673 CTRI records identified unclear classifications, internal inconsistencies, incomplete/non-standard fields, missing values, name variation, and ethics-committee detail problems. Most quantified error rates were in single digits; some were higher. Examples included free-text city errors, non-standard sponsor/PI names, and missing fields.

`CONTRADICTION`: CTRI authors responded that some automated classifications misread audit-trail changes, terminated sites, and dynamic site/ethics states; legacy records pre-dated newer mandatory fields; the PI field was not compulsory; and CTRI staff could request but not themselves make a registrant's correction. They accepted that logic rules and more controlled fields would improve quality.

Therefore:

- Do not call CTRI “bad” or unusable.
- Do not treat every blank optional field as an error.
- Do preserve modifications and audit-trail context.
- Do not infer current site recruitment or contact liveness from a registry label alone.
- Do measure field completeness, age, cross-registry conflict, and site-confirmation rate in the exact pilot sample.

## Who updates CTRI and ClinicalTrials.gov?

| Registry | Accountable party | Who may enter/edit | Who releases or makes it public | Registry role |
|---|---|---|---|---|
| CTRI | Primary sponsor is ultimately accountable. The registrant is the PI or primary sponsor by agreement; lead PI or lead sponsor for multicentre/multi-sponsor studies. | Authorised registrant/user. Status is permanently unlocked; some site, contact, criteria, outcome, and other changes require supporting EC/DCGI material where applicable and an unlock request. | The registrant submits; CTRI reviews/validates the registration or requested change. | Hosts and reviews the record, sends six-month reminders, exposes modifications. CTRI stated it cannot itself edit registrant fields and lacks enforcement authority. |
| ClinicalTrials.gov | The Responsible Party: sponsor, sponsor-investigator, or a qualified PI designated under applicable rules. | Record owner and authorised PRS users can edit. | Responsible Party or PRS administrator approves/releases the record for PRS review. | NLM/PRS checks apparent validity, meaningfulness, logic, internal consistency, and format. It does not verify day-to-day site recruitment or scientific truth. |

`FACT`: ClinicalTrials.gov requires notice of recruitment-status changes as soon as possible and no later than 30 days for covered records; other submitted information must be reviewed and updated as needed at least every 12 months. It recommends more frequent verification for active studies. These duties still do not make the registry real-time.

## 8. Absolutely required information for matching

There is no single minimum dataset because “matching” hides three different jobs.

### A. General discovery—safe current scope

Required:

- cancer/condition term;
- country/state/city or travel boundary;
- trial phase/type if relevant;
- registry-declared recruitment state;
- source registry and identifier.

Optional general filters include intervention class, sponsor, age-band stated by the protocol, and biomarker named by the user. No patient record is required.

### B. Preliminary patient-specific screening—outside current scope

Usually requires:

- confirmed cancer type, primary site, histology/cell type;
- stage and present disease setting/state;
- age and performance status;
- prior/current treatment classes, lines, dates, and key outcomes;
- protocol-required biomarker result and accepted assay details;
- major medical history, current health, medication, and obvious exclusions.

This can only determine “possibly worth trial-team review,” not eligibility.

### C. Formal eligibility—trial site owns it

Requires every inclusion/exclusion criterion and source evidence, often including current examination, pathology, imaging, laboratory and organ function, washout/recovery, concurrent medicines, infections, reproductive criteria, other malignancies, and protocol-specific screening. The trial coordinator assesses likely fit; the trial investigator/team makes the final decision.

## 9. How much treatment history is required?

`FACT`: There is no defensible fixed number of months or number of prior lines. Required depth is protocol-specific.

For preliminary screening, the useful rule is **complete decision-relevant history**, including:

- all prior anticancer systemic regimens and component drugs;
- line/setting and start/stop dates;
- surgery type/date and relevant radiation site/date;
- prior exposure to any class or target named by the protocol;
- last dose for washout calculations;
- reason for stopping and whether required toxicity recovery is documented;
- present treatment and disease state;
- relevant prior malignancy when the protocol asks for it.

`CONTRADICTION`: “Latest prescription plus biomarker report” is often insufficient. Equally, a complete lifetime chart is unnecessary for general discovery and creates avoidable privacy and review burden.

## 10. Should the solution ingest notes and tests, then match to CTRI?

Decision: **No, not in the current scope.**

Reasons:

1. Notes and reports contain identifiable and sensitive medical data.
2. Extracting diagnosis, stage, progression, treatment response, biomarkers, organ function, and exclusions derives clinical meaning.
3. Comparing those facts to protocol criteria produces a patient-specific eligibility judgement.
4. Ranking candidates implies recommendation, even if the interface says “not medical advice.”
5. Registry criteria can be incomplete, stale, ambiguous, or method-specific; false positives and false negatives have clinical and access consequences.
6. The trial team must still verify source records and formal eligibility.

A future clinically governed system would need consent/authority, access controls, retention and audit policy, validated extraction, criterion-level provenance, error analysis, human review, security review, and prospective evaluation. It is not a harmless extension of a dashboard.

## 11. What should a “live trials dashboard” mean?

Never promise “live” based only on CTRI or ClinicalTrials.gov. Use this articulation:

> A current, provenance-first trial operations view: registry-declared study and site status alongside a separately sourced, time-stamped site verification and a human-owned inquiry/referral task.

Minimal differentiating capability:

1. Search and filter official registry records without patient features.
2. Link duplicate CTRI and ClinicalTrials.gov records using declared secondary identifiers; never silently merge uncertain matches.
3. Show exact source, retrieval date, record update/verification date, and field-level discrepancy.
4. Keep registry status and site verification as separate columns.
5. Record verification method and expiry; do not turn “no response” into “closed.”
6. Provide the approved general contact route and last confirmation timestamp.
7. Create a human-approved task with owner, due date, sent/acknowledged status, and audit events.
8. Refuse patient-specific trial ranking, report interpretation, or eligibility conclusions.

Suggested pilot KPIs:

- percentage of scoped records with authoritative site verification within the expiry window;
- percentage with a registry/site discrepancy;
- median time from inquiry to authoritative response;
- percentage of inquiries acknowledged within the locally agreed interval;
- failed or stale contact rate;
- coordinator/doctor person-minutes per resolved inquiry.

`OPEN`: Doctors' stated preference for a repository still needs behavioural validation: current tools opened, searches per week, time spent, failure examples, and whether the missing action is contact, screening, referral, or follow-up.

## 12. Doctor and hospital incentives

Do not frame this as simply “why would a doctor give away revenue?” Separate on-site trial participation from off-site referral.

### On-site trial

Potential institutional incentives:

- sponsor-funded reimbursement for legitimate research work, procedures, coordinator time, infrastructure, and overhead under approved agreements;
- access to research, training, technology, and collaboration;
- investigator publications, reputation, and portfolio development;
- a treatment/research option for eligible patients;
- patient retention at the same institution for protocol and associated care.

`FACT`: A 2013 India oncology review described investigator fees, study grants, infrastructure support, research experience, and access to new technologies as incentives, while also reporting that some academic institutions prohibited oncologist remuneration. Treat this as historical context, not a current price model.

### Off-site referral

Possible disincentives:

- lost consultation, procedure, infusion, or downstream treatment revenue;
- uncompensated search, documentation, and handoff work;
- fragmented care and uncertain return-of-care;
- weak contact information and no visibility after referral;
- concern about continuity, responsibility, and patient experience.

Possible incentives:

- the clinician's duty and reputation for presenting credible options;
- trust and long-term relationship with the patient/family;
- reciprocal referral and research-network relationships;
- retention of local diagnostics, supportive care, or follow-up where appropriate and agreed;
- a closed-loop handoff that returns authoritative information to the treating team.

`FACT`—transfer evidence only: A 693-response US survey reported “best treatment options for patients” as the most common incentive for offering trials (67.7%), manual chart review for screening (81.9%), and infrequent off-site referral. It does not quantify Indian hospital economics.

`FACT`: A 73-investigator India survey found protocol complexity, patient awareness, and sociocultural concerns as common recruitment barriers. Respondents supported dedicated research coordinators, advance recruitment plans, local medical-community interaction, and patient education. This supports a funded coordination/network model more than a pure referral-bonus model.

`OPEN`: There is no evidence here that off-site referral causes net revenue loss in the target hospital, how large it is, or whether patients return for other care. Validate separately with hospital administration/research finance and clinicians.

### Business questions that decide viability

Ask for aggregate process and economics, not patient records:

1. How many oncology trial inquiries were made in the last four weeks: on-site and off-site?
2. Who spent time on search, contact, screening, records, authorisation, and follow-up? How many minutes per inquiry?
3. For on-site trials, which costs are sponsor-funded and which remain institutional?
4. For off-site referrals, which services and relationship return locally, and which are lost?
5. Does the referring clinician receive acknowledgement and a return-of-care plan?
6. Which incentive is permitted: institutional service reimbursement, protected staff time, network recognition, or another model? What conflicts must the ethics committee review?
7. Would faster authoritative rejection still create value by preventing repeated calls and false hope?
8. Who owns the purchasing decision and budget: hospital operations, research office, sponsor, network, or department?

## Falsifiers for the proposed trials wedge

Stop or reframe if any is observed:

- target users already obtain authoritative site status/contact quickly enough;
- trial inquiries are too rare to create material burden;
- stale contacts are not a meaningful source of failed referrals;
- the dominant problem is trial scarcity, affordability, travel, or protocol eligibility rather than information/workflow;
- CTRI, ClinicalTrials.gov, sponsor portals, or an institutional CTMS already solve the scoped job;
- site verification cannot be maintained within an affordable operating model;
- users will not act without patient-specific matching, which remains outside scope;
- a role/SOP/shared contact list solves the problem more safely and cheaply than software.

## Immediate interview plan

### Treating oncologist

- Show the last de-identified trial-search workflow, not a patient story: sources opened, filters used, calls/messages made, elapsed time, and stopping point.
- Which field was missing or untrusted: status, site, contact, biomarker criterion, prior-treatment criterion, or availability?
- Would a general verified shortlist be actionable without a patient match? If not, why?
- What happens after an off-site inquiry? Who owns acknowledgement and return-of-care?

### Research coordinator / trial site

- Who updates CTRI and ClinicalTrials.gov in practice, and how quickly after a site-status change?
- Which record is authoritative when registry, sponsor, and local site disagree?
- How many inquiries arrive, through which channels, and how many lack enough information for preliminary screening?
- What can be disclosed publicly versus only after an authorised referral?

### Pathologist / molecular pathologist

- For the target cancers, which biomarkers are routine, reflex, clinician-ordered, or trial-only?
- Which methods are accepted: IHC, ISH/FISH, PCR, DNA/RNA NGS, liquid biopsy, or germline confirmation?
- How often are tissue adequacy, unaccepted assay, turnaround, or cost the actual blocker?

### Hospital administrator / research office

- Distinguish on-site trial economics from off-site referral economics.
- Identify sponsor-funded work, institutional overhead, uncompensated work, and retained/returned care.
- Define permitted incentive and conflict-of-interest review; avoid informal per-patient referral commissions.

## Question-to-answer index

| Original note | Clear answer |
|---|---|
| Solution horizon | Validate verification/referral burden now; pilot only after owner selection; no patient matching. |
| State, actors, beneficiaries | Use separate registry, site-verification, and task states; actor map above. |
| Who updates registries | CTRI registrant with sponsor accountability; ClinicalTrials.gov Responsible Party/PRS administrator releases updates. |
| 1–3: pathology, PCR, tumour NGS | Branching diagnostic workflow; tests are selected, not universally sequential; NGS is not universal. |
| 4: tumour boards | Regular multidisciplinary review of new and complex cases; not rare-only; selection and ownership vary. |
| 5: exact tests | Protocol- and cancer-specific; biomarker method and accepted assay matter. |
| 6: statistics | Use dated scoped counts; current CTRI total is not a live oncology count. |
| 7: CTRI quality | Valuable registry with known data-quality/freshness limits; not uniformly bad and not site-live. |
| 8: required matching data | None for general discovery; structured clinical facts for preliminary screening; full protocol evidence for eligibility. |
| 9: treatment history | Complete protocol-relevant history, not a fixed time window. |
| 10: notes/results matcher | Patient-specific CDS/interpretation; outside current scope. |
| 11: live dashboard | Provenance + declared/verified split + human task, not aggregation or ranking. |
| 12: incentives | On-site and off-site economics differ; ethical/patient benefit matters; local revenue effect is unmeasured. |

## 13. Can CTRI data be accessed programmatically?

Short answer:

- `OBSERVED`: CTRI exposes public HTML search and individual record pages, but no documented public API, OpenAPI specification, machine-readable bulk export, data licence, or developer terms were found on the official pages reviewed.
- `OBSERVED`: The current advanced-search form posts to a server-rendered PHP endpoint and requires both a CSRF token and a CAPTCHA/security code. Search by CTRI number also requires human verification. These are interactive access paths, not a supported API.
- `FACT`: A 2019 academic audit programmatically downloaded CTRI HTML records and parsed them into SQLite. This proves historical technical feasibility, not current permission, stability, or suitability for a production dependency.
- `FACT`: CTRI says its records are sent to WHO ICTRP monthly. WHO ICTRP supports CSV/XML downloads and a credentialed XML web service.
- `CONTRADICTION`: WHO ICTRP is not a straightforward commercial substitute. Its download terms prohibit marketing, promotional, or commercial use. Its web-service terms limit use to research/public bodies, prohibit local storage of web-service data, prohibit charging third parties for access, require credentials, and may involve cost recovery.
- `FACT`: ClinicalTrials.gov offers a documented REST API v2 and bulk download. It can supply NCT records with Indian locations, but it does not contain every CTRI record or every India-specific CTRI field.

### Access-path decision table

| Path | Technically available? | Rights/operational position | Product suitability |
|---|---:|---|---|
| CTRI public web search | Yes, interactively | CAPTCHA + CSRF; no automation permission or open licence found | Suitable for human research and record verification; not a production ingest contract. |
| Parse public CTRI HTML records | Technically possible for known pages | No current supported API/SLA/licence found; do not bypass CAPTCHA or access controls | Only after written permission defining scope, rate, storage, redistribution, attribution, and commercial use. |
| Official CTRI extract/API by agreement | `OPEN` | Requires a written request and terms from CTRI/ICMR-NIRDH | Preferred source for a CTRI-backed production product. |
| WHO ICTRP CSV/XML download | Yes | Free public download, attribution/freshness duties, but commercial/marketing use prohibited | Research analysis only unless WHO grants different written terms. |
| WHO ICTRP web service | By agreement/credentials | Research/public-body scope; no local storage; no third-party fee; service terms and potential cost | Poor fit for a commercial cached product without a separate agreement. |
| ClinicalTrials.gov API v2 | Yes | Documented API and bulk data; its own terms/disclaimers apply | Useful for NCT records and cross-registry checking, not a replacement for CTRI coverage. |
| Small manually curated pilot dataset | Yes | Use only public minimum fields with exact citations; confirm intended reuse and avoid bulk copying | Lowest-risk discovery experiment while data rights are resolved; not scalable as production ingestion. |

### Recommended access sequence

1. Define the exact fields, record count, refresh frequency, storage period, redistribution, and commercial/non-commercial purpose.
2. Request written CTRI guidance or permission for machine-readable access; do not send the request without owner approval.
3. In parallel, test the user job with a small manually curated, source-linked dataset rather than building a scraper.
4. Use ClinicalTrials.gov API v2 for records that genuinely exist there and preserve source identity.
5. Use WHO ICTRP only within its explicit terms; do not treat public download as an open commercial licence.
6. Never bypass CAPTCHA, CSRF, authentication, or other technical controls.

`OPEN`: Whether CTRI will provide an authorised extract, API, commercial-reuse permission, refresh SLA, or correction channel.

## 14. Is a doctor-facing wrapper prohibited?

`OBSERVED`: No reviewed Indian rule or CTRI page states that doctors are categorically prohibited from using a wrapper that displays public, general trial information. The risk depends on the wrapper's data rights, intended use, inputs, outputs, claims, and recruitment behaviour.

### Boundary matrix

| Capability | Regulatory/policy posture | Required control |
|---|---|---|
| Display exact public trial fields with source link, retrieval date, and disclaimer | Lower clinical-product risk; data-reuse permission remains unresolved | Written data rights, attribution, no endorsement claim, source fidelity, correction path. |
| Normalise terms, deduplicate declared secondary IDs, and flag stale/conflicting fields | Operational/data-quality assistance | Keep original values; explain deterministic rules; never silently merge; human review. |
| Add separately time-stamped site verification | Operational assistance if it reports a human/site assertion | Named source, verifier, method, expiry, audit history, and no inference from non-response. |
| Create a doctor-approved inquiry/referral task | Operational assistance | Role-based access, no patient details in the initial concept, human approval, audit, authorised contact route. |
| Publish or send trial-specific patient recruitment material | Research recruitment activity | Sponsor/site authority and relevant Ethics Committee-approved wording/process; avoid inducement or benefit claims. |
| Ingest patient notes, pathology, biomarkers, or treatment history | Sensitive health-data processing and clinical interpretation | Outside current scope; privacy, consent/authority, security, clinical governance, and regulatory review required. |
| Score eligibility, rank trials, or recommend a trial | Patient-specific clinical decision support; possible Software as a Medical Device depending intended use | Prohibited by current project constraints; obtain formal CDSCO classification/regulatory advice before any future product claim. |

Relevant controls:

- `FACT`: CTRI states that registry inclusion is not endorsement or approval; data are uploaded by sponsors/investigators, and CTRI does not accept responsibility for their legal, ethical, or scientific validity.
- `FACT`: CDSCO's 2024 FAQ states that standalone software attracting the medical-device definition under S.O. 648(E) is regulated under the Medical Devices Rules, 2017. Classification depends on intended use; the Central Licensing Authority is the competent classifier.
- `FACT`: ICMR's ethics guidelines list recruitment advertisements/notices and recruitment procedures among materials for Ethics Committee review and require protection against undue inducement.
- `INFERENCE`: A provenance-first general information and operations tool has a materially safer posture than a patient-specific matcher, but only CTRI/rights-holder permission and qualified Indian legal/regulatory review can close the reuse and classification questions.
- `OPEN`: Applicable hospital policy, professional conflict-of-interest rules, commercial data rights, privacy obligations for republished investigator/contact details, and whether the intended claims trigger CDSCO classification.

This is a research risk assessment, not legal advice.

## 15. How to improve on CTRI rather than merely wrap it

### Options

| Option | User value | Cost/risk | Decision |
|---|---|---|---|
| Search reskin | Cleaner UX over the same data | Low differentiation; inherits freshness and access risks | Reject unless used only as a disposable interview prototype. |
| Cross-registry index | Easier discovery, declared-ID deduplication, change history, conflict display | Requires source rights and careful entity resolution; still does not prove site availability | Useful foundation, not the product wedge. |
| Site-verified operations layer | Separates registry status from human-confirmed site status; tracks expiry, discrepancies, and authoritative contact | Verification operations are costly and must be owned | Recommended hypothesis to test. |
| Patient-specific trial matcher | Potentially high convenience | Sensitive data, false-match harm, CDS/SaMD risk, formal eligibility remains at site, current scope prohibits it | Reject for the current project. |

### Recommended differentiated job

> When an oncologist or coordinator identifies a potentially relevant trial, they need an authoritative, recent answer from the actual Indian site and a visible handoff owner, because registry-declared status and contact details may not resolve whether that site can screen a referral now.

Capabilities that directly serve that job:

1. Preserve raw source snapshots and field-level provenance.
2. Map declared secondary IDs; queue uncertain duplicates for human review.
3. Show registry status, record age, and site verification as distinct facts.
4. Diff source changes and expire verification after an explicit policy interval.
5. Let an authorised site steward confirm, correct, pause, or decline public operational assertions.
6. Record discrepancy without overwriting the source registry.
7. Search by general disease, phase, geography, and verified-state attributes only.
8. Create a human-approved inquiry/referral task with owner, acknowledgement, and closure state.
9. Provide a correction/escalation path and immutable audit events.
10. Measure time to authoritative answer, stale-contact rate, discrepancy rate, acknowledgement, and person-minutes.

`OPEN`: The verification service—not the user interface—is the likely cost centre and moat. The idea fails if verification cannot be maintained accurately and affordably.

## 16. Questions and gates before product or architecture lock

### Gate A — problem evidence

1. Which exact role has the problem: treating oncologist, research coordinator, tumour-board coordinator, site PI, or hospital research office?
2. What event triggers the search, and how many times did it occur in the last four weeks?
3. Show the last five de-identified searches: sources, calls, elapsed time, failure, workaround, and outcome.
4. Is the dominant failure discovery, stale status/contact, preliminary screening, formal eligibility, travel/affordability, or referral follow-through?
5. What measurable baseline and falsifier justify software rather than an SOP/shared directory?

### Gate B — data authority and rights

6. Which source is the system of record for each field: CTRI, ClinicalTrials.gov, sponsor, or local site?
7. Is written permission available for automated access, caching, derivative fields, redistribution, and commercial use?
8. Which fields are essential? Can names, personal emails, phone numbers, documents, and other personal data be omitted?
9. What are the source refresh cadence, expected lag, outage behaviour, schema-change process, and correction route?
10. How are duplicate registrations linked? Which identifiers are authoritative, and who reviews uncertain matches?

### Gate C — safe intended use

11. What exact claim appears in the product label, pitch, interface, and instructions: “search,” “verified contact,” “likely eligible,” or “recommended trial”?
12. Does any output depend on a person's diagnosis, stage, biomarker, treatment history, laboratory result, or performance status?
13. Could a reasonable user interpret ordering, badges, or alerts as an eligibility or treatment recommendation?
14. Will the product publish or send recruitment material? Who supplies and approves the exact wording?
15. What written regulatory classification and legal review are required before pilot or commercial use?

### Gate D — operating model and incentives

16. Who performs site verification, how, how often, and with what authority?
17. What happens when the registry, sponsor, and site disagree or nobody responds?
18. Who pays: hospital, network, sponsor, site, research programme, or another party?
19. Why will sites keep their status current? Is the benefit fewer unsuitable inquiries, better referrals, portfolio visibility, or something measured?
20. What is the fully loaded verification cost per active site/trial and the support burden per month?

### Gate E — lifecycle, reliability, and governance

21. What are the allowed states and transitions for source records, verification assertions, and referral tasks?
22. When does an assertion expire? Can old assertions remain visible as history without appearing current?
23. What must happen when ingestion fails, a source schema changes, a record disappears, or a conflict is unresolved?
24. Which actions require human approval, role-based access, immutable audit, and institutional review?
25. What data are retained, for how long, in which geography, and how are correction and deletion handled?

### Gate F — pilot decision

26. What bounded indication, geography, site set, and users make a valid 60–90-day test?
27. What are the primary KPI, guardrails, and explicit stop thresholds?
28. What comparison is credible: current workflow baseline, role/SOP intervention, shared spreadsheet, or the proposed tool?
29. What result would prove that aggregation is insufficient but site verification plus handoff is valuable?
30. Who has authority to accept the evidence and lock product scope?

Do not select deployment topology, database, framework, or integration architecture until Gates A–D have named answers. The architecture-changing answers are: permitted data source, patient-data boundary, intended-use claim, verification owner, buyer, record volume, refresh cadence, and required audit/availability.

## 17. Proposed information flow and lifecycle—not an approved architecture

```text
official source or authorised extract
        |
        v
rights + schema check ---- failure ----> quarantine / human review
        |
        v
immutable source snapshot + retrieval metadata
        |
        v
deterministic normalisation + declared-ID linking
        |
        +---- uncertain duplicate/conflict ----> human review
        |
        v
general searchable trial/site index
        |
        +---- source change ----> diff + freshness recalculation
        |
        v
site-verification queue -> authorised contact -> verified / no response / discrepancy
        |                                           |
        +---------------- expiry -------------------+
        |
        v
doctor/coordinator general search
        |
        v
human-approved inquiry/referral task -> sent -> acknowledged -> human-closed
```

Critical invariants:

- source value, normalised value, and site-verified assertion remain separate;
- no patient data are required for search or verification;
- no response never becomes “not recruiting”;
- only a named human/site source can create a site-verification assertion;
- all assertions expire under an explicit policy;
- the wrapper never asserts eligibility, treatment suitability, or CTRI/ICMR endorsement;
- source outages degrade to visibly stale data, not silent “current” data.

The navigable architecture-readiness and lifecycle view is maintained in `architecture/ctri-wrapper-decision-explorer.html`.

## Sources

### Official and professional guidance

- [CTRI homepage and current registered-study count](https://ctri.nic.in/Clinicaltrials/login.php) — accessed 2026-09-13.
- [CTRI FAQ: registrant responsibility, captured fields, and change process](https://ctri.nic.in/Clinicaltrials/faq.php) — accessed 2026-09-13.
- [CTRI notice: six-month reminders, status updates, modifications, and field unlocking](https://ctri.nic.in/Clinicaltrials/alert.php) — accessed 2026-09-13.
- [ClinicalTrials.gov PRS User's Guide](https://clinicaltrials.gov/submit-studies/prs-help/user-guide) — accessed 2026-09-13.
- [ClinicalTrials.gov protocol-registration quality-control criteria](https://clinicaltrials.gov/submit-studies/prs-help/protocol-registration-quality-control-review-criteria) — accessed 2026-09-13.
- [ClinicalTrials.gov API v2 version endpoint](https://clinicaltrials.gov/api/v2/version) and [API documentation](https://clinicaltrials.gov/data-api/about-api) — accessed 2026-09-13.
- [CTRI advanced search](https://ctri.nic.in/Clinicaltrials/advancesearchmain.php) and [search by CTRI number](https://ctri.nic.in/Clinicaltrials/searchbyctri.php) — current forms use CAPTCHA/human verification; accessed 2026-09-13.
- [CTRI disclaimer](https://ctri.nic.in/Clinicaltrials/disclaimer.php) — registrant-supplied data and no endorsement; accessed 2026-09-13.
- [WHO ICTRP download formats and terms](https://www.who.int/tools/clinical-trials-registry-platform/network/who-data-set/downloading-records-from-the-ictrp-database) — accessed 2026-09-13.
- [WHO ICTRP web-service conditions](https://www.who.int/publications/m/item/who-ictrp-web-service---conditions-of-use) — published 2014-03-18; accessed 2026-09-13.
- [CDSCO Medical Devices Rules, 2017](https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/m_device/mdr%2C%202017%20%281%29.pdf) and [2024 Medical Devices FAQ](https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/MDFA13feb.pdf) — accessed 2026-09-13.
- [ICMR National Ethical Guidelines for Biomedical and Health Research Involving Human Participants](https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/ICMR_Ethical_Guidelines_2017.pdf) — published 2017; accessed 2026-09-13.
- [NCI: Surgical Pathology Reports](https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/pathology-reports-fact-sheet) — issued 2023-01-09; accessed 2026-09-13.
- [NCI: Biomarker Testing for Cancer Treatment](https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment) — issued 2017-10-05; accessed 2026-09-13.
- [NCI: Definition of PCR](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/pcr) — accessed 2026-09-13.
- [NCI: Definition of tumor board review](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/tumor-board-review) — issued 2011-02-02; accessed 2026-09-13.
- [NCI: Steps to Find a Clinical Trial](https://www.cancer.gov/research/participate/clinical-trials-search/steps) and [Cancer Details Checklist](https://www.cancer.gov/research/participate/clinical-trials-search/steps/detailschecklist.pdf) — issued 2014-05-30; accessed 2026-09-13.
- [ESMO Precision Medicine Working Group: tumour NGS recommendations for advanced cancer in 2024](https://pubmed.ncbi.nlm.nih.gov/38834388/) — *Annals of Oncology*, 2024; corrigendum published 2025.

### India evidence and relevant transfer evidence

- [Landscape of cancer clinical trials in India](https://pmc.ncbi.nlm.nih.gov/articles/PMC11096683/) — *The Lancet Regional Health – Southeast Asia*, 2024; CTRI records through 2021 downloaded April 2022.
- [Geographic disparities in access to cancer clinical trials in India](https://pmc.ncbi.nlm.nih.gov/articles/PMC7929777/) — *ecancermedicalscience*, 2021; CTRI search July 2020.
- [Analysis of deficiencies in CTRI interventional-drug trial data](https://pmc.ncbi.nlm.nih.gov/articles/PMC6712861/) — *Trials*, 2019.
- [CTRI authors' response to the data-quality analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC6947893/) — *Trials*, 2020.
- [Indian NCRP tumour-board survey](https://pmc.ncbi.nlm.nih.gov/articles/PMC13161587/) — *ecancermedicalscience*, 2026; survey October 2024.
- [Challenges in recruitment and retention of clinical-trial subjects](https://pmc.ncbi.nlm.nih.gov/articles/PMC4936073/) — 73 Indian investigators; *Perspectives in Clinical Research*, 2016.
- [Challenges in launching multinational oncology clinical trials in India](https://pmc.ncbi.nlm.nih.gov/articles/PMC3876625/) — *South Asian Journal of Cancer*, 2013; historical context only.
- [Provider motivations and barriers to cancer trial screening, referral, and operations](https://pubmed.ncbi.nlm.nih.gov/37851511/) — 693 primarily US respondents; *Cancer*, 2024; transfer evidence only.
