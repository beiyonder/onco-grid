# Oncology workflow theme briefs

## Executive evidence map

| Theme | Direct India evidence | Attributable measurement | Existing-solution pressure | Safety fit | Current judgment |
|---|---:|---:|---:|---:|---|
| Find | Mixed | Weak for search time; strong for trial inventory/geography | High | General retrieval fits; patient-specific ranking does not | Supporting capability, not a primary wedge |
| Contextualise | Mixed | Weak | High standards/modelling coverage | High ambiguity | Use only as record organisation |
| Synthesise | Strong | Strong for registry abstraction; missing for consultation preparation | High for generic EMR/summary | Fits only with literal provenance and human review | Serious fallback; exact job remains unvalidated |
| Act | Clinician-derived need plus existing India requirements | No safe product measure | Very high | Mostly prohibited | Reject patient-specific Act lane |
| Connect | Strong for Indian board documentation/follow-up variation; one single-centre coordinator/Excel workflow | Weak locally; no current target-site acknowledgement or person-time baseline | High; NCG MDT/VTB, iECHO, draft NABH requirements, and local spreadsheets already cover substantial workflow | Fits only for human-decision handoff operations | Owner selected post-board acknowledgement and operational disposition for P5 validation |
| Outside: continuity | Strong | Strong barrier measures; limited staff-workflow measures | Medium | Operational coordination can fit | Serious candidate if narrowed beyond reminders |
| Outside: documentation/re-entry | Moderate India; strong transfer evidence | Strong internationally | High EMR/ambient-tool activity | Operational if workflow-specific | Cross-cutting burden, not yet a bounded job |
| Outside: navigation/referral | Strong patient/caregiver evidence | Mostly qualitative | Medium | Care-team coordination can fit | Serious problem; Doctor/Care Team wedge still unclear |
| Outside: registry/reporting | Strong | Strong Indian time measure | High; Onco-Insight already exists | Strong | Valuable proof pattern, weak novelty as a product |

The number of citations is not a score. Directness, method, setting, contradiction, and safe product fit matter more.

## Find

### What is supported

- Supplied clinician-derived notes request faster access to guidelines, trials, staging, toxicity, drug information, and India-specific sources (`EV-0003`).
- A German survey of 495 cancer-care professionals found oncologists preferred journals and internet sources; both oncologists and general practitioners wanted rapid, transparent information. Lack of time was reported by 60% of all participants and lack of data by more than 50% (`EV-0022`).
- The CTRI analysis identified 1,988 Indian cancer trials and substantial cancer-type and geographic disparity; it also documented missing, inconsistent, and non-standard registry fields (`EV-0024`).
- The Indian molecular-report survey indicates interest in accreditation, references, specialist discussion, and report-change communication, but its 74-person self-selected sample is weak (`EV-0023`).

### What is not supported

- No retained Indian time-and-motion or audit-log study measures how long oncologists spend finding guidelines, staging references, toxicity criteria, or drug monographs.
- No source shows that categorising existing tools alone changes a meaningful operational KPI.
- No evidence establishes that another general oncology search assistant is preferred to established guideline, literature, and point-of-care sources.
- The trial evidence establishes geographic and registry-data gaps, not the frequency of oncologist search or the usefulness of a new interface.

### Existing alternatives

- NCG guidance and institutional protocols;
- ASCO, ESMO, NCCN and other professional sources;
- PubMed and medical knowledge products;
- CTRI and international trial registries;
- oncology EHR clinical content;
- navify guideline, publication, and trial tools.

### Safety boundary

General source discovery and provenance can be safe. Applying patient data to rank guidelines, calculate stage, grade toxicity, assess interactions, or match trials is clinical interpretation or CDS.

### Judgment

**Do not select Find as the primary wedge on current evidence.** It is broad, crowded, weakly measured in India, and easily leaks into CDS. Authentic-source search may support a later validated workflow.

## Contextualise

### What is supported

- The supplied notes repeatedly identify disease, stage, biomarker, prior treatment, line, comorbidity, and specialty as context (`EV-0004`).
- NCG medical, surgical, radiation, and MDT requirements prove that specialty workflows and artifacts differ materially (`EV-0011`–`EV-0014`).
- The Indian molecular-report survey shows that accreditation, specialist discussion, report changes, and follow-up context matter for one specialised workflow (`EV-0023`).
- ABDM, NCG requirements, and mCODE provide substantial data-model and exchange context (`EV-0010`, `EV-0032`).

### What is not supported

- No retained study measures an independent “contextualisation” job or burden.
- No evidence supports one universal context model for every oncology specialty.
- No evidence shows that automatically applying clinical context is safe or desired.

### Safe split

- **Record contextualisation:** organise explicit assertions by source, date, encounter, institution, specialty, and review state.
- **Clinical contextualisation:** use medical knowledge and patient data to decide significance or action.

Only the first is clearly promotable.

### Judgment

**Contextualise is a design constraint, not a standalone product direction.** Use purpose-bounded views and provenance; never present system-derived clinical meaning.

## Synthesise

### What is supported

- The official hackathon consultation-readiness use case directly names fragmented structured and unstructured inputs and limited clinic time (`EV-0002`).
- The supplied oncologist synthesis and informal notes independently raise fragmented history, report formats, patient-carried material, and repeated reconstruction, though neither quantifies the job (`EV-0005`, `EV-0008`).
- NCG/KCDO field research reports dual paper/online work, fragmented information across computers, referral-history upload/access gaps, redundant records, manual entry, slow systems, and off-system workarounds (`EV-0016`).
- The NCG implementation report identifies workflow, incomplete-data, retrieval, documentation, and interoperability issues across a large national network (`EV-0015`).
- The Tata Memorial Onco-Insight study demonstrates that structured integration and manual validation can reduce registry abstraction from 29.14 to 16.72 minutes per case (`EV-0017`).
- The same study shows the limit: diagnostic linkage 43.22%, complete TMC treatment linkage 52%, outside/cross-centre work requiring manual review, and follow-up fully manual (`EV-0018`).

### What is not supported

- The measured Indian task is registry abstraction, not consultation preparation.
- No retained Indian study reports consultation-preparation person-minutes, frequency, primary preparer, source-location time, or verification loops.
- No evidence shows that a generative summary is faster to verify than direct source review.
- No evidence shows that a separate tool is preferable to improving the existing EMR, structured fields, or interoperability.

### Contradictions and caution

- NCG already has more than 200 oncology EMR requirements, specialty modules, vendor products, adoption support, dashboards, and interoperability work (`EV-0009`, `EV-0015`).
- Onco-Insight achieved measurable value through structured deterministic retrieval, not NLP-generated clinical interpretation (`EV-0017`, `EV-0018`).
- The KCDO UX evidence implies that a second tool may worsen duplicate entry if it does not remove an existing transition (`EV-0016`).
- In a non-Indian head-and-neck time-motion study, information entry—not chart review—was the largest EHR task during initial consultation (`EV-0029`).

### Safe wedge

A candidate may ingest a finite synthetic or fully anonymised artifact set, preserve originals, extract literal source assertions, expose evidence spans, display date uncertainty, identify unreadable or literally inconsistent metadata, support clinician review, and produce a bounded packet.

It must not infer diagnosis, stage, response, progression, toxicity, prognosis, urgency, or treatment.

### Judgment

**Synthesise remains the strongest match to the supplied problem and hackathon use case, but the exact consultation-readiness job is still an evidence gap.** The strongest evidence currently supports the mechanism—fragmentation plus structured retrieval—not the final user, trigger, or product form.

## Act

### What is supported

The supplied notes contain explicit requests for dose changes, toxicity grading, interactions, staging, indications, and trial availability (`EV-0006`). The NCG medical-oncology module already specifies patient-specific protocol, dose, interaction, toxicity, alert, modification, administration, and summary features (`EV-0034`). Flatiron markets similar integrated staging, templates, molecular, and decision-support capabilities (`EV-0035`).

### Why it is rejected

- The official programme excludes medical-data interpretation, CDS, risk scoring, and treatment recommendations (`EV-0001`).
- The main Act requests are clinically consequential rather than operational.
- Existing national requirements and commercial oncology products already cover the category.
- General-source retrieval can be evaluated separately under Find; clinician-entered documentation can be evaluated under a specific workflow.

### Judgment

**Reject patient-specific Act as a product lane.** Retain the evidence only to understand unmet clinical work and to prevent accidental scope leakage.

## Connect

### What is supported

- The supplied notes report interest in human knowledge sharing, doubt clearing, case discussion, and academic work (`EV-0007`).
- NCG/KCDO defines a structured MDT case packet with a clinical question, history, prior treatment, pathology, imaging, specialty comments, human decision, and follow-up (`EV-0014`).
- In the 2026 NCRP survey, 79.7% of 172 responding hospitals reported a tumour board. Among the 137 boards, 63.5% used physical documentation, 48.2% lacked recommendation follow-up, only 16.8% communicated via EMR notes, and 5.1% always held cross-hospital discussions (`EV-0019`).
- NCG already runs a recurring Virtual Tumor Board with an expert network, template, submission process, and videoconferencing (`EV-0020`).
- A small Spanish vendor-funded pilot demonstrates how to measure task and role time; it found lower preparation time for several roles but unchanged pathology/radiology review and unchanged task count (`EV-0021`).
- Public P5 review shows the NCG presentation template and iECHO already cover substantial pre-board structure, presenter assignment, content review, correction, notification, and sharing (`EV-0036`–`EV-0040`).
- The NCG/KCDO MDT model already includes a human final decision and later review of whether it was followed (`EV-0014`).
- A draft NABH oncology HIS/EMR annexure already expects electronic board selection, IDs, scheduling, review, attendance, recommendations, and follow-up documentation (`EV-0042`).
- One Eastern India audit used preformed Excel lists, entered the board decision after weekly meetings, and assigned later treatment/follow-up data collection and patient tracing to a patient care coordinator (`EV-0043`).
- One recent Chennai post-MDT workflow split ownership between treating oncologists and a downstream palliative-care team; an SOP, education, and a shared paper form raised target-cohort documentation from 0% to 92% (`EV-0044`).

### What is not supported

- No retained Indian study measures person-minutes spent preparing a board case or handing off the final decision.
- Public evidence names a patient care coordinator in one historical site and treating/downstream teams in one recent sensitive clinical workflow, but not the current target-site owner of a general non-clinical decision handoff.
- No public source proves that the intermediate handoff is absent locally; NCG/local systems may already solve it.
- No evidence supports building a new general expert network, pre-board upload workflow, or clinical recommendation system.

### Existing alternatives

- local institutional boards;
- NCG VTB;
- NCG/KCDO MDT module;
- email/template/video workflows;
- navify and other commercial tumour-board products.
- draft NABH oncology HIS/EMR requirements;
- preformed Excel/master-chart workflows plus patient care coordinators.
- role-specific SOP and shared-form workflows that may remove the need for new software.

### Narrow opportunity

The owner-selected P5 job is:

> Reference the existing clinician-authored decision, make it available to the authorised treating unit, record acknowledgement, and track explicitly human-assigned non-clinical operational disposition.

The primary-user hypothesis is now a locally named operational or downstream-service owner. Indian examples vary between a patient care coordinator and a split treating-oncologist/downstream-team handoff; survey evidence also reports designated secretariats. The current target role may be a secretariat, nodal operations person, programme team, registry/quality operator, patient care coordinator, treating unit, or downstream service.

The product must not create the clinical decision, determine whether treatment was correctly followed, or duplicate the existing NCG/iECHO pre-board workflow.

### Judgment

**Continue P5 validation; do not lock the product.** Public evidence narrows the gap but cannot establish the current target actor, acknowledgement path, person-time baseline, or whether the remaining problem needs software rather than role clarity, an SOP, one shared artifact, staffing, governance, or follow-up access.

## Outside theme — follow-up and continuity

### What is supported

- The AIIMS Rishikesh study describes 172 people who defaulted during evaluation, treatment, or follow-up. Reported reasons included social support 26.2%, financial constraints 20.3%, commuting difficulty 16.3%, and illness 13.4%; mean travel was 143 km (`EV-0025`).
- The study cannot estimate prevalence because it sampled defaulters only.
- In a Tata Memorial oral-cancer feasibility study, 73.68% of 228 SMS prompts received replies, yet 20.18% lacked a corresponding clinician follow-up examination (`EV-0026`).
- The Tata Medical Center qualitative study of 100 patients and 48 caregivers reports multi-provider journeys, referral confusion, communication gaps, travel, cost, and disruption (`EV-0027`).
- The Indian tumour-board survey reports that 48.2% of boards lacked recommendation follow-up (`EV-0019`).

### Central contradiction

Missed continuity is not one reminder problem. Finance, transport, social support, illness, counselling, specialist distribution, and institutional workflow interact. Message delivery or response is a weak proxy for completed follow-up.

### Safe wedge

A care-team tool could maintain authorised worklists, record staff-entered barriers, assign ownership, support approved communication, and track operational completion. It must not infer urgency or advise care.

### Judgment

**This is the strongest outside-theme candidate.** It has direct India evidence and measurable operational endpoints. The main uncertainty is which barrier-aware action a named care-team role can realistically complete.

## Outside theme — referral and navigation

### What is supported

The 148-participant Tata Medical Center qualitative study describes multi-provider pathways, communication and referral gaps, travel, finance, and uneven access (`EV-0027`). The default study reports that 59.3% of its 172 participants were from outside the state and mean travel was 143 km (`EV-0025`). KCDO UX research reports that previous referral details may not be viewable or uploadable in audited systems (`EV-0016`).

### Evidence limit

Most retained evidence is from patients and caregivers. The Doctor/Care Team Facing actor, operational job, baseline, and controllable output are not established.

### Judgment

**Serious problem, incomplete product contract.** Investigate referral readiness or cross-centre record intake only if a care-team owner and measurable completion state can be established.

## Outside theme — documentation and repeated entry

### What is supported

- KCDO field research reports offline/online duplication, redundant input, fragmented information, and poor workflow fit in India (`EV-0016`).
- The NCG implementation paper reports clinician resistance where documentation consumes time (`EV-0015`).
- A US Epic metadata study measured more than 3.5 hours of mean weekly EHR work outside scheduled work across oncology physicians in 2022, with medical oncology/haematology highest (`EV-0028`).
- A Netherlands head-and-neck time-motion study measured EHR work at 44.0% of initial and 30.7% of follow-up consultation time; only 23% of respondents felt there was enough documentation time (`EV-0029`).

### Contradictions

- International billing, portal, vendor, and staffing conditions differ materially from India.
- The US burden includes inbox, orders, documentation, and chart review; it is not a record-fragmentation measure.
- Early AI reply drafting discussed in the US study had not substantially reduced physician inbox time (`EV-0033`).
- Improving an existing system or staffing workflow may outperform adding a new product.

### Judgment

**Documentation burden is real but too broad.** Use it as a measurable component after selecting one workflow, not as a product statement.

## Outside theme — registry and reporting

### What is supported

Onco-Insight provides the strongest direct Indian operational experiment: a 12.42-minute mean abstraction reduction with structured EMR retrieval and human validation (`EV-0017`). Its incomplete diagnostic, outside-treatment, and follow-up retrieval shows remaining work (`EV-0018`).

### Contradiction

Tata Memorial already built the solution for its architecture, and NCG publishes KPI/dashboard requirements. A generic registry or dashboard lacks novelty.

### Judgment

**Use as proof that source integration and deterministic validation can save time. Do not select generic registry abstraction unless a distinct underserved setting and adoption gap are established.**

## Outside themes with insufficient evidence in this pass

### Clinic and treatment-day flow

Official programme fit is high, but retained sources do not provide an India-specific oncology flow baseline or named bottleneck. Keep open.

### Patient/caregiver education and language

India access studies show literacy, counselling, caregiver, and language relevance. The selected stream and safe boundary require a clinician-approved operational communication job; no specific candidate is yet defined.

### Financial and administrative navigation

Financial barriers are strongly supported, but a Doctor/Care Team Facing workflow and feasible hackathon intervention remain unclear.

### Research and presentation preparation

One supplied doctor account supports it, but frequency, burden, current alternatives, and differentiation from general tools are unmeasured.

## Attributable measurements retained

| Source / ledger | Setting | Exact measure | Safe use |
|---|---|---|---|
| Onco-Insight (`EV-0017`) | Tata Memorial registry | 29.14 vs 16.72 mean minutes per case; 12.42-minute paired reduction | Registry abstraction benchmark only |
| Onco-Insight (`EV-0018`) | Tata Memorial registry | 97.59% demographic retrieval; 43.22% diagnostic retrieval; 52% complete TMC treatment linked | Shows structured-data limits |
| NCRP board survey (`EV-0019`) | 172 Indian hospitals | 137 boards; 63.5% physical documentation; 48.2% no follow-up; 5.1% always cross-hospital | Board operations prevalence, not time |
| AIIMS default study (`EV-0025`) | 172 Indian defaulters | 26.2% social support; 20.3% finance; 16.3% commute; 13.4% illness; 143 km mean travel | Barrier mix among defaulters, not prevalence |
| TMC SMS study (`EV-0026`) | 206 oral-cancer patients | 73.68% replies; 20.18% prompts without clinical follow-up | Reply is not completion |
| US Epic study (`EV-0028`) | 15,653 oncology physicians | 465.2 EHR minutes/week; 211.8 outside scheduled hours in 2022 | Transferable burden framing only |
| Netherlands time-motion (`EV-0029`) | 97 head-and-neck consultations | 44.0% initial and 30.7% follow-up time on EHR | Task-measurement design only |
| German information survey (`EV-0022`) | 495 cancer-care professionals | 60% lack time; >50% lack data; 26% oncologists lack knowledge | Transferable preference/burden signal |
| Indian molecular survey (`EV-0023`) | 74 online respondents | 68.9% no molecular board; 82.4% pathologist discussion; 58.1% no follow-up/change information | Weak specialised signal |
| CTRI landscape (`EV-0024`) | 1,988 cancer trials | 28% open, 29% not yet recruiting, 26% complete in historical aggregate | Historical registry landscape only |

## Cross-theme conclusion

Current evidence does not justify the original all-in-one workspace. Three bounded directions survive:

1. owner-selected P5: post-board human-decision acknowledgement and operational disposition;
2. fallback: source-linked outside-record intake for a specific consultation or referral;
3. fallback: barrier-aware care-team follow-up coordination.

Candidate B remains contingent on a named local actor, current-system gap, and aggregate baseline. If those fail, return to Candidate A rather than building from public-document absence.
