# Trial solutions — who built what, does it really help, how it works (2026-09-10)

## Scope

Question: for O6-safe (general trial knowledge + site-verified contact + referral task, NO patient matching), who already built something similar?

## 1. Registries (foundation, not companions)

### CTRI — ICMR-NIMS, India
- Form: free web registry + keyword/advanced search (title, condition, PI, intervention, site, sponsor, CTRI number, phase, recruitment status). 116,567 total trials (Sep 2026). Mandatory since 15 Jun 2009, prospective-only since Apr 2018. WHO ICTRP primary registry.
- Helps: sponsors (compliance), journals (publication gate), researchers (landscape). For doctors: bare list, no freshness flag, no contact verification, captcha + alphanumeric-only search, free-text dirt.
- Really helps? As a record: yes. As a workflow: no — Pillamarapu 2019 + CTRI landscape 2023 document missing PI/sponsor/state, city errors ~5% rising, cross-registry mismatch.
- Tech: classic server-rendered search, no public REST API comparable to ClinicalTrials.gov; downloads via PDF/fielded pages.

### ClinicalTrials.gov — US NLM/NCBI
- Form: 591,616 studies, 50 states + 226 countries; faceted search (condition, intervention, location+radius, status, sponsor, NCT ID); daily refresh Mon-Fri ~9am ET; modern REST API v2 (OpenAPI YAML, JSON/CSV/FHIR, paginated 10-1000, search-areas + AREA() query syntax); AACT relational mirror via CTTI.
- Helps: global sponsors, sites, patients, and every downstream matcher (navify, TrialX, TrialGPT all query it).
- Really helps? As infrastructure: yes. India coverage partial; status/contact staleness still possible. Not India-verified.
- Tech: documented above; example record exposes centralContacts + locations[].status + geoPoint lat/lon.

### WHO ICTRP
- Form: meta-search across primary registries. Helps with deduplication, not workflow.

## 2. Tumor-board + trial-match suites (closest form, banned content for us)

### Roche navify Clinical Hub / Tumor Board + Clinical Trial Match (powered by MolecularMatch)
- Orgs: Roche Diagnostics + GE Healthcare (guidelines app) + MolecularMatch Inc (Houston, MD Anderson 2014 spinout, 11-50 staff, NLP precision-oncology knowledgebase).
- Form: cloud dashboard aggregating EMR/lab/PACS/path into longitudinal patient view; meeting mgmt, templates, notes; CDS apps: Trial Match, Publication Search (858k PubMed/ASCO/ESMO/AACR), Guidelines (NCCN digitized).
- Trial matching: patient-specific inputs (age, sex, condition, genomic alterations/VCF, postal code) → queries 11-21 registries (CT.gov, DRKS, EUCTR, JPMA) → ranked list with inclusion/exclusion display + rationale + save-to-board. MolecularMatch NLP parses trial text + variant significance.
- Who helps: tumor-board oncologists, pathologists, coordinators at equipped centres. Helps preparation + awareness, not the site-contact freshness or referral ownership explicitly.
- Really helps or says? Mixed. Vendor claim: Ellis Fischel (Missouri) 30% overall prep-time reduction, 50% labor-cost reduction — first-of-its-kind prospective study, but vendor-collaborated, single US centre, breast/GI/ENT boards. Independent pilot (Spain, 1 breast board, 8 clinicians, fixed order, Roche-funded): reduced some role/task time but NOT pathology/radiology review time or task count (retained EV-0021/0031). No India, no CTRI evidence. Discrepancy study (PMC7513637, NAVIFY vs QCI vs CureMatch): same patients → majorly different trial lists; matching is brittle.
- Tech: cloud multi-source aggregation, VCF ingestion, NLP registry index, CDS rules. Heavy integration — opposite of hackathon light-boundary.

### Flatiron OncoEMR (US)
- Form: oncology EHR with scheduling/billing + molecular order/result + staging + CDS + trial matching claims.
- Helps US practices. No India fit evidenced. Category novelty closed for us.

## 3. Recruitment platforms (sponsor/site-facing, not doctor workflow)

### TrialX (NY, since 2008, first trials app on Google Health)
- Form: enterprise platform — Global Trial Finder (configurable, AI-simplified listings, multilingual), study websites + digital prescreeners, volunteer registry, referral-management portal (site + sponsor visibility), real-time analytics, mobile/remote data, space-health branch. Customers: sponsors/CROs, AMCs/sites, patient orgs (ALK+, ALS Network, Michael J. Fox).
- Early tech: HealthOnt ontology + semantic PHR-to-trial matching (2010 paper, thousands matched via MHV/Google Health). Now: AI matching on EHR via smartEHR import + structured prescreening.
- Helps: sponsors (visibility across portfolio), sites (central listings + referral queue), patients (plain-language finder). Does NOT solve a doctor's "is this CTRI contact live?" in clinic.
- Really helps? Vendor testimonials ("visibility, predictability, acceleration") + 2008-2026 track record. No controlled enrollment-lift publication found; 80% trials-miss-timelines stat is industry context, not TrialX effect. Treat as capable vendor, not proven effect.

### Jeeva (Manassas VA + India distributed, $2.4M, 6 rounds)
- Form: unified eClinical cloud — CTMS, eConsent, eCOA/ePRO, eVisits, engagement portal, TrialMagnet enrollment (QR/URL → prescreen DB), analytics. Therapeutic: oncology, rare, derm, etc.
- Claims: 30-70% time savings, 2-4 week study start, 60-70% burden cut, ~zero data errors. Case studies: derm enterprise license, cancer-prevention Phase II suppository, rare-disease diaspora connect, 2500-person cohort migration.
- Helps sponsors/CROs/sites/coordinators. Not a doctor's in-clinic knowledge task.
- Really helps? Vendor case studies + investigator quotes only. No peer-reviewed effectiveness. Useful as ops pattern reference, not evidence.

## 4. Research matchers (pattern proof, not products)

### NIH TrialGPT (NLM + NCI, Nature Commun 2024, open code)
- Form: 3-stage LLM — Retrieval (filter 75k → 6%) → Matching (criterion-level eligibility + sentence grounding) → Ranking (trial scores).
- Results: 87.3% criterion accuracy (experts 88.7-90%), >90% recall, ranking +43.8% over baselines, NCI pilot (6x6 pairs, 2 clinicians): 42.6% screening-time cut, same accuracy.
- Limits: 183 synthetic patients, US ClinicalTrials.gov, criterion confusion on exclusions ("not excluded" vs "no info" vs "N/A"), needs human oversight, no CTRI dirt test, no production audit/GxP. Proves conversational pattern works; does not prove India deployment.
- Tech: GPT-4 pipelines, open GitHub, demo site. Closest technical template for our retrieval+grounding, minus patient ingestion (we deliberately omit).

### Multimodal LLM pipeline (PMC12749220), biomarker-LLM structuring (PMC12053753)
- Show integration-free matching from raw notes/scans is feasible but needs calibration. Same caveat: eligibility judgment = banned for our hackathon.

## 5. Nuance: what NOBODY does (our wedge)

1. No product reconciles CTRI vs ClinicalTrials.gov status/contact disagreement with a freshness/confidence flag for Indian doctors.
2. No product verifies Indian site phone/email liveness and shows distance/state + last-checked.
3. No doctor-facing tool stops at general search + creates a human-approved referral task with owner/due/status/audit — without ingesting patient features.
4. navify/TrialX/Jeeva/TrialGPT all do patient-specific matching (banned for us) and assume clean registry data (false for CTRI).

## 6. Implication for O6-safe build

- Complement, don't clone: cite registries, add verification + task layer NER never specifies.
- Tech: frozen synthetic CTRI slice (CTRI ID, titles, phase, sites, status, contact, last-verified, discrepancy flag) + read-only API-style search (condition/phase/state) + extractive answers with citations + refusal on patient input + task store (owner/due/status/audit). No VCF, no EHR, no eligibility scoring.
- Evidence to still get: weekly inquiry volume + time-to-contact at one high-trial site; otherwise fallback to O2 report-ack reusing same task pattern.
