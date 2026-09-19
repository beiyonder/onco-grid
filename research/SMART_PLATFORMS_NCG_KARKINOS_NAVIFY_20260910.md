# Smart oncology platforms in-depth — NCG, Karkinos (not Karnikos), navify open-source check

## 0. Name correction

- `FACT`: It is **Karkinos Healthcare** (Mumbai/Bangalore, now Reliance step-down subsidiary), not "Karnikos". Use correct spelling in submission or lose credibility with Indian judges.

## 1. NCG ecosystem — what actually exists and runs

### 1a. Virtual Tumor Board (VTB) — NCG + ECHO India
- Form: host-and-spoke video boards. Hosts: Tata Memorial Mumbai Sat 9:30 + 11am, Max Saket Wed 3:30pm. 25-30 experts join. Cases are submitted through the official NCG/ECHO email channel by Mon/Fri noon + a 6-slide PPT template (presenter, history, investigations, imaging, fitness, questions). Runs on Zoom + iECHO for content review (assign presenter, upload, Under Review, approve/reject, PII check, notify, share).
- Helps: presenting peripheral centres get multidisciplinary input; experts teach. Helps access, not workflow automation.
- Really helps? No controlled time/enrollment evidence found. It is a service running since years, not a product claiming efficiency. Limitation for us: submission is manual email+PPT; no ack/owner/status after decision; no trial-contact verification.
- Tech: Zoom + email + PPT + iECHO (proprietary ECHO Institute tele-mentoring DB). No open API, no NLP matching.

### 1b. NCG-KCDO Oncology EMR (NER v2.0 + 6 vendors + LEAP)
- Form: requirements (Parts A-D, Silver/Gold/Platinum) → 17 bids → 6 enlisted vendors building ABDM/FHIR-compatible modules (med/surg/rad/MDT/palliative), chronological views, KPI dashboards. Procurement help + partial funding for public/trust hospitals (LEAP, ~30 MoUs). SLA: <3s OPD, <5s complex, 99-99.9% uptime. New RFE Apr 2026.
- Helps: hospitals without EMR get a cancer-capable EMR cheaply + standard data for research.
- Really helps? Implementation report (PMC12057217, WHO Bulletin Apr 2025): 20+ centres supported, 6 products live. No published consultation-time or outcome lift yet. Adoption only 15% at baseline survey (2022). So: real rollout, unproven workflow dividend.
- Tech: vendor EMRs (proprietary) + ABDM FHIR R4 draft v7 + DICOM/LOINC/ICD-O/SNOMED/CPT/TNM coding. Interop blueprint pilot-stage. Not open source.

### 1c. Onco-Insight (Tata Memorial registry accelerator)
- Form: EMR-integrated registry app pulling PABR (demographics), CIS (diagnosis), OT/MOIS/ROIS (treatment) with validation checks + manual entry for gaps + auto reports. For HBCR + POCSS abstractors, not bedside doctors.
- Really helps? Yes for registry task, with limits. Frontiers 2026 (n=2021 cases, intra-observer): HBCR 27.17→15.07 min; paired mean 29.14→16.72 (Δ12.42, p<0.001). ESMO RW 2025: HBCR 8→4, POCSS 32→16 min, staffing -40%. BUT: demographics 98% auto, diagnostics 52%, treatment 78%; outside/cross-centre + follow-up fully manual. Single centre (TMC), registry staff only. Cannot transfer to consultation or trial search.
- Tech: EMR-module connectors + deterministic mapping + validation rules + human review. No LLM matching. Proprietary to TMC.

### 1d. Navya — NCG's Online Expert Opinion partner (since 2011)
- Form: ExpertApp point-of-care: uploads records → 2-3 page Structured Case Summary → Evidence Engine (structured index of trials/guidelines/papers) + Experience Engine (thousands of past decisions/outcomes in Navya ontology) → ranked Structured Treatment Options → async virtual tumor board (5-10 min/expert, 4-6 cases/hr/week) → patient-friendly letter. B2C (navya.care, 120k+ patients, 24h opinion) + B2B Cancer Data Model. Partners: TMC, MSK, NCG (104 centres in 2017 PR). 200+ staff, 2 patents.
- Helps: remote patients + local oncologists lacking subspecialists; reduces travel + time-to-plan.
- Really helps? Vendor claim 90% time-to-plan cut. Only quasi-independent signal: JCO 2025 Earthshot abstract (1787 decentralized decisions, 27% referred to hub, of rest 85% concordant with NCG guidelines and adopted). Concordance ≠ outcome lift; no RCT, no enrollment or survival delta published. Treat as deployed + plausible, not proven superior.
- Tech: patented Cancer Data Model (ontology + ML ranking by trial quality/endpoints/sample/effect/demographic match + Case-Based Search + async chat + letter generator). Proprietary, not open source. **This is patient-specific treatment advice — exactly what our hackathon bans.** We complement with general info + tasks, never recommendations.

### 1e. Other NCG rails
- NCG Guidelines (2021 manual), Vishwam Connect, EQAS, CReDO, Clinical Trial Network (BIRAC), Digital Health Solution Library (vendor showcase), CATCH AI grants (290 apps, 10 winners). All enable, none is a trial-contact verifier.

## 2. Karkinos — distributed care + trial engine

- Who: Reliance-owned, tech-led oncology network. 85+ DCCN hospital sites, advanced labs (5 NovaSeq 6000/X+, 120k sq ft, 30% private seq capacity, 30k diagnostics, 23k HPV, 500 WGS planned), hub-spoke-further-spoke model.
- Trial form (karkinos.in/clinicaltrials): end-to-end CRO-lite — protocol help, site selection/mgmt (85+), IRB/regulatory, KOLs, **dynamic patient DB + lab-report-driven eligible identification**, in-house oncologists + PIs + tumor boards for recruitment, decentralized trials (EHR integration, at-home HPV/blood sampling, tele-consult/tele-radio, EDC + diary + biostats), Command Center navigation in 20+ languages, Insights Platform dashboards, Appsuite e-clinical cloud.
- Care-tech form (karkinos.in/technology): Community Risk Suite, Kare360 clinician web app, VTB module, LIMS, teleradiology, registry suite, LMS, digital pathology + slide digitization, **OncoKEEN NLP extraction**, bespoke AI/ML, FHIR + openEHR + ABDM M1-M3 enablement. Certs: NABH, NABL, DSIR, SOC2, HIMSS, FHIR logo.
- Helps: sponsors (faster recruitment + monitoring), sites (patients + data), patients (near-home care, navigation, discounted radio in testimonials, 70k+ navigated claims, 1 lakh HPV DNA tests).
- Really helps? Counts + testimonials only. No peer-reviewed recruitment-lift, time, or outcome study found. Lab-driven matching is powerful but opaque (no precision/recall published). Treat as scaled operator, not validated effect.
- Tech: proprietary backbone + open APIs (claimed) + FHIR/openEHR adapters + NLP + cloud apps. Not open source. No public code, no API docs, no model cards.

## 3. navify + MolecularMatch — open source?

- Short: **No. Both proprietary.**
- navify Clinical Hub/Tumor Board: Roche cloud product, license per institution, CDS apps. No source, no self-host, no pricing public. Docs are brochures + help centre.
- MolecularMatch: private SaaS (MD Anderson license lineage). GitHub org exists but is **SDKs + demos only**: mm-power-sdk-java/python, mm-api-java-client, mm-public-scripts (needs API key), docker-mongo/redis/nginx helpers, passport-saml, node-corenlp wrappers. Core matcher + knowledgebase closed, key-gated, commercial terms. Do not plan to fork it.
- Open alternatives for our safe build: ClinicalTrials.gov API v2 (open, FHIR/JSON/CSV), WHO ICTRP search, CTRI pages (no open API — scrape sparingly or use frozen synthetic slice for hackathon), NIH TrialGPT code+data (open, research-use), AACT mirror (open). Our value is not the matcher — it is CTRI-dirt reconciliation + freshness + contact verification + referral task, none of which navify/Match sell for India.

## 4. What this means for O6-safe

- Do not pitch "another VTB/EMR/matcher". Pitch: the missing verification + task layer between dirty registries and the doctor's next call.
- Cite NCG/Navya/Karkinos as ecosystem to plug into (VTB template in, referral task out, FHIR-compatible IDs), not competitors.
- If judges ask "why not navify/Karkinos?", answer: patient-specific CDS is banned here; they don't verify CTRI contacts or track general-inquiry tasks; they are heavyweight/proprietary while ours is light, auditable, synthetic-ready in 60-90 days.
