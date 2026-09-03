# Existing oncology solution landscape

## Purpose

This is a category and capability map, not a procurement recommendation. Official specifications establish intended capability; vendor pages establish product claims; neither proves adoption or effectiveness in the target setting.

## Indian public and ecosystem layer

### NCG/KCDO oncology EMR initiative

Evidence: `EV-0009`, `EV-0015`; [official page](https://www.kcdo.in/oncologyemr); [peer-reviewed implementation report](https://pmc.ncbi.nlm.nih.gov/articles/PMC12057217/).

Existing capabilities/direction:

- more than 200 general and oncology-specific requirements;
- medical, surgical, radiation, multidisciplinary, palliative, pain, and related modules;
- chronological record presentation and workflow-specific templates;
- clinical and operational KPI/dashboard requirements;
- six vendor products developed against the requirements;
- procurement/adoption support, with more than 20 centres supported in the 2025 report;
- FHIR/ABDM interoperability blueprint under pilot testing;
- user feedback and AI digitisation work.

Implication:

A generic “oncology EMR,” “cancer dashboard,” “single patient record,” or “first standard oncology workflow” is not credible differentiation.

Open gap:

Actual adoption, usability, outside-record handling, and last-mile workflow performance vary and are not measured comprehensively in the public evidence.

### NCG/KCDO specialty modules

Evidence: `EV-0011`–`EV-0014`, `EV-0034`.

Existing capabilities/direction:

- medical-oncology protocol, doctor, nurse, administration, toxicity, and summary workflow;
- surgical booking, checklist, procedure, anaesthesia, postoperative, and report workflow;
- radiation planning, delivery, interruption, completion, and follow-up workflow;
- MDT case preparation, attachments, question, comments, decision, and follow-up;
- patient-specific Act functions such as protocol, dose, interaction, and toxicity support.

Implication:

Do not rebuild specialty treatment management or clinical tools. Investigate transitions between institutions, systems, roles, and existing modules.

### NCG Virtual Tumor Board

Evidence: `EV-0020`, `EV-0036`–`EV-0040`; [official NCG page](https://www.ncgindia.org/key-initiatives/virtual-tumor-board), [blank presentation template](https://www.ncgindia.org/assets/ncg-key-initiatives/virtual-tumor-board/vtb-template.pptx), and [iECHO case-submission help](https://help.iecho.org/submitcase).

Existing capabilities/direction:

- recurring cross-centre expert sessions;
- a host-and-centre model;
- deadline-based case submission and an established six-slide presentation template;
- programme coordination and disease-management-group review;
- iECHO presenter assignment, case-content upload, review status, PII/PHI check, approval/rejection, notifications, re-upload, and controlled sharing;
- videoconferencing and an existing NCG expert network.

The current NCG page still describes email and Zoom, while an NCG 2022 account says the programme moved to iECHO. The exact current NCG configuration must be verified.

Implication:

“Connect oncologists,” generic board scheduling, presentation templates, and pre-board file review are already served. Validate only a post-board handoff from an existing clinician-authored decision to authorised treating-unit acknowledgement and operational disposition. Public omission is not proof of a local gap.

### ABDM and NRCeS FHIR guide

Evidence: `EV-0010`; [FHIR Implementation Guide for ABDM v7 draft](https://www.nrces.in/preview/ndhm/fhir/r4/index.html).

Existing capabilities/direction:

- consent-oriented Health Information Provider and Health Information User model;
- exchange artifacts including diagnostic report, discharge summary, health document, outpatient consultation, prescription, appointment, encounter, observation, medication, procedure, and service request;
- FHIR R4 profiles and document bundles.

Implication:

Do not invent a proprietary national exchange model. Use a narrow phase-one adapter and treat the July 2026 guide as a draft, not a frozen production contract.

### Clinical Trials Registry–India

Evidence: `EV-0024`; [CTRI](https://ctri.nic.in/).

Existing capabilities/direction:

- national trial registration and public search;
- trial type, phase, sponsor, site, recruitment, condition, and intervention metadata.

Known gaps from the 2007–2021 landscape study:

- geographic disparity;
- missing, inconsistent, ambiguous, and non-standard fields;
- registry status does not necessarily prove live site availability.

Implication:

A trial finder that only re-displays CTRI has weak differentiation. Freshness, cross-registry reconciliation, referral, or general non-patient-specific workflow would need evidence. Patient-specific eligibility matching is out of scope.

## Standards layer

### mCODE

Evidence: `EV-0032`; [HL7 mCODE 4.0](https://hl7.org/fhir/us/mcode/).

Existing capability:

Oncology-specific FHIR profiles for patient information, disease characterisation, assessment, genomics, treatment, and outcomes.

Limit:

US Realm Standard for Trial Use with US Core dependencies. It is a modelling reference, not an India implementation contract.

### NCG plus ABDM versus mCODE

The safe long-term direction is compatibility with Indian public infrastructure while borrowing useful oncology concepts. The hackathon direction remains light integration and a bounded synthetic dataset, not standards completion.

## Commercial category layer

### Flatiron OncoEMR

Evidence: `EV-0030`, `EV-0035`; [product page](https://flatiron.com/oncology/oncology-ehr).

Vendor-claimed scope:

- specialty documentation and ordering;
- scheduling, operations, billing, and reporting;
- mobile and patient access;
- molecular test order/result workflow;
- oncology templates, staging, and clinical decision support.

Implication:

Comprehensive oncology practice software already exists. Its US context and uncertain India availability leave local fit open, but category novelty is closed.

### Roche navify Clinical Hub for Tumor Boards

Evidence: `EV-0021`, `EV-0031`; [product page](https://navify.roche.com/marketplace/products/navify-clinical-hub-for-tumor-boards); [pilot study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6106126/).

Vendor-claimed scope:

- meeting and patient-list management;
- case summaries and presentations;
- uploaded reports and images;
- meeting notes and follow-up;
- guidelines and publication search;
- search across multiple trial registries and patient-specific matching;
- analytics and custom reports.

Evidence limit:

The retained pilot was one Spanish hospital, one breast board, eight clinicians, fixed method order, and Roche funded. It reduced some role/task time but not pathology/radiology review or task count.

Implication:

A broad case-summary/tumour-board/search/trial bundle already exists and includes functions outside the hackathon boundary. India-specific light-integration last-mile workflow would be the only plausible wedge.

## Local and informal solution layer

Published Indian sources report or imply:

- paper records and written summaries;
- hybrid paper/electronic documentation;
- broad free-text notes;
- offline registers and spreadsheets;
- WhatsApp and phone communication;
- email and presentation templates for board submission;
- direct discussion with pathologists or referring physicians;
- one-way SMS reminders;
- manual registry abstraction and verification;
- patients carrying records between providers.

These are not merely bad habits. They may solve access, speed, flexibility, or missing-system problems. A replacement must preserve the useful property and remove measurable work.

## Capability comparison

| Capability | NCG/KCDO | ABDM/FHIR | NCG VTB | Onco-Insight | Flatiron | navify | Local workaround |
|---|---:|---:|---:|---:|---:|---:|---:|
| Oncology-specific structured records | Strong requirements | General exchange | Case template | TMC registry subset | Vendor claim | Patient summary claim | Variable |
| Medical/surgical/radiation workflow | Strong requirements | Artifact exchange | Discussion only | Registry view | Vendor claim | Discussion context | Department specific |
| Outside/cross-centre exchange | Pilot direction | Core direction | Manual case submission | Manual review remains | Integration claim | Integration claim | Patient/file/message |
| Consultation-ready source packet | Partial/unclear | Exchange only | Template | Registry task, not consultation | Chart functionality | Case presentation | Manual |
| Tumour-board case preparation | MDT module | Exchange support | Existing programme | Not primary purpose | Possible | Core product | Email/slides/paper |
| Decision documentation/follow-up | MDT requirement | Exchange support | Public detail limited | Not primary purpose | Vendor claim | Core product claim | Paper/direct contact |
| General source search | Not primary | No | Human discussion | No | Clinical content | Guidelines/publications | Web/manual |
| Trial discovery | Not primary | No | Human discussion | No | Possible | Multi-registry claim | CTRI/manual |
| Patient-specific CDS | Requirements include some functions | Can carry data | Human board | Deterministic checks for registry | Core claim | Core claim | Human judgement |
| Follow-up operations | Requirements direction | Appointment/care artifacts | Recommendation follow-up unclear | Fully manual in study | Vendor claim | Board follow-up claim | Calls/SMS/registers |
| India-specific fit | Highest | Highest | Highest | One TMC architecture | Unknown/low | Unknown | Highest local adaptation |

## Remaining defensible gaps

### 1. Outside-record intake into an existing workflow

Possible gap:

A patient or referring institution supplies heterogeneous material that must be classified, source-linked, reviewed, and incorporated without replacing the EMR.

Why still open:

KCDO reports referral-history upload/access gaps, and Onco-Insight still needs manual outside-care review. ABDM and NCG interoperability are moving toward the same problem, so the candidate must prove a specific pre-consultation step and light adapter.

### 2. Tumour-board case readiness and follow-through

Possible gap:

A coordinator or presenting team needs a complete, permissioned packet, explicit missing items, documented human decision, and owned follow-through.

Why still open:

Indian boards often use physical records and nearly half report no follow-up system. But NCG already has an MDT module and VTB; the candidate should complement them rather than become another board.

### 3. Barrier-aware follow-up operations

Possible gap:

A care-team role needs an actionable worklist, barrier recording, ownership, two-way communication, and completion tracking.

Why still open:

Direct India evidence shows diverse barriers and that SMS response does not ensure follow-up. Many barriers require services, money, or transport rather than software, so the candidate needs a controllable subset and named operator.

### 4. Documentation/re-entry reduction inside one job

Possible gap:

A specific role re-enters or reconciles the same source data in multiple systems.

Why still open:

India UX evidence supports duplication, and international oncology measurements show burden. The exact Indian oncology task and alternative—fixing the source system versus adding a companion—are unknown.

## Differentiation bar

A candidate is not differentiated merely because it uses AI, a timeline, FHIR, a dashboard, or a chatbot. It must show:

1. one existing workflow transition that is not adequately served;
2. one named actor who performs the work;
3. one finite input set;
4. one safe output and human review state;
5. one integration boundary lighter than an EMR replacement;
6. one measurable operational baseline;
7. why NCG/KCDO, ABDM, VTB, CTRI, commercial products, and local workarounds do not already solve it;
8. why verification work does not erase the claimed saving.
