# Oncologist Conversation Self-Study and Interview Field Guide

## Purpose

Use this document to prepare for, conduct, and analyse conversations with oncologists and oncology care-team members.

The goal is not to become a clinician or debate cancer treatment. The goal is to understand how cancer-care work actually happens:

- what people are trying to get done;
- which records, systems, and people are involved;
- where time, information, or trust is lost;
- which workarounds already exist;
- which problem is frequent and painful enough to solve;
- what a safe, useful, measurable tool could do without making clinical decisions.

The current project direction is only a hypothesis: preparing a reliable, source-linked patient journey from fragmented records before a consultation or human case discussion. The interview must be allowed to disprove this hypothesis.

This is product-research material, not medical or legal advice.

---

# Part I — The ten-minute briefing

Read this section immediately before a conversation if time is short.

## 1. What space are we working in?

We are working in **oncology**, meaning cancer care.

Cancer care is not one simple workflow. It can involve:

- medical oncology;
- surgical oncology;
- radiation oncology;
- pathology;
- radiology and nuclear medicine;
- laboratory and molecular testing;
- nursing and pharmacy;
- pain, palliative, nutrition, psychological, and rehabilitation support;
- care coordinators, patient navigators, records staff, and administrators;
- multidisciplinary or tumour-board discussion.

Different cancers, stages, hospitals, specialties, and treatment phases can create very different workflows.

## 2. What problem are we investigating?

Our current hypothesis is that doctors and care teams lose time because a patient's history is spread across many places:

- EMRs or hospital systems;
- laboratory and imaging systems;
- scanned reports and PDFs;
- prescriptions and discharge summaries;
- records from other hospitals;
- paper, spreadsheets, messages, and patient-carried files.

Someone may need to rebuild the timeline before a consultation, referral, second opinion, or tumour-board discussion. We want to learn who does this, how often, how long it takes, what goes wrong, and what is trusted.

Do not present this as a proven problem. Ask the oncologist what is actually most painful first.

## 3. What could the tool safely do?

A possible tool could:

1. collect available records;
2. preserve each original document;
3. extract only what the document explicitly says;
4. organise dated material into a timeline;
5. link every extracted statement back to its exact source;
6. show missing, unreadable, duplicate, or literally conflicting material;
7. let an authorised clinician confirm, correct, reject, or defer it;
8. prepare a reviewed packet for a consultation or human discussion;
9. record access, corrections, and important operational actions.

## 4. What must it not do?

The hackathon excludes:

- diagnosis;
- treatment recommendations;
- clinical decision support;
- clinical risk scoring;
- interpretation of medical data;
- autonomous clinical advice.

Do not promise that the product will identify the correct diagnosis, stage, response, progression, treatment, dose, urgency, interaction, or trial for a patient.

The safe distinction is:

> The system may show what a source document says. It must not decide what that information means clinically.

## 5. What should you say at the start?

Use natural language like this:

> Thanks for making time. I am not a clinician, so I have done enough homework to follow the workflow, but I do not want to pretend I understand your day better than you do.
>
> I am not here to pitch a fixed solution. I would first like you to dump information on me—even rant a little—about the repetitive, frustrating, or risky parts of your daily work, and anything you wish worked differently.
>
> Concrete recent examples are more useful than an ideal process. Please do not share any patient name, identifier, exact date, image, or record. A generalised example is enough.
>
> Later, I would like to check a few themes that came from earlier conversations with oncologists—finding information, understanding context, rebuilding scattered records, practical point-of-work needs, and connecting with peers. Those are only hypotheses. If something else is more pressing, I would rather follow that.

Then stop talking and let them answer.

## 6. The most important interviewing rule

First ask for a **recent real episode**. Only later ask whether your existing ideas are correct.

Bad:

> Would a dashboard that summarises patient history save you time?

Better:

> Think of the last consultation where understanding the earlier history took more work than it should have. What triggered the work, who did it, and what happened step by step?

## 7. What must you leave the interview knowing?

Try to leave with answers to these questions:

1. What exact job is difficult?
2. Who experiences the problem most directly?
3. What triggers the work?
4. How is it done today, step by step?
5. Which artifacts and systems are used?
6. How often does it happen?
7. How much time or rework does it create?
8. What happens when it goes wrong?
9. What is the current workaround?
10. Why has the workaround or existing software not solved it?
11. What must a clinician personally verify?
12. What useful change could be measured in 60–90 days?

---

# Part II — Oncology in plain English

## 8. Cancer care is a collection of different journeys

Do not talk about “the cancer workflow” as if there is one universal sequence.

Important sources of variation include:

- **Disease family:** solid tumours versus blood cancers; adult versus paediatric disease.
- **Primary site:** where a solid cancer started, such as breast, lung, head and neck, or colorectal.
- **Subtype and pathology:** the microscopic and biological characteristics recorded by pathology.
- **Stage:** the recorded extent of disease.
- **Biomarkers or molecular findings:** features that may matter to clinical decisions.
- **Specialty:** medical, surgical, radiation, or another oncology service.
- **Care phase:** investigation, treatment planning, active treatment, follow-up, recurrence, survivorship, supportive care, or palliative care.
- **Institution:** systems, staffing, policies, and available services differ.
- **Patient circumstances:** geography, affordability, language, caregivers, travel, and ability to return for care.

Your task is not to learn every cancer pathway before interviewing. Your task is to notice which variation changes the workflow being described.

## 9. Main oncology specialties

### Medical oncology

Medical oncologists manage cancer treatment using medicines. Broad treatment categories include chemotherapy, immunotherapy, targeted therapy, and hormone therapy. Exact treatment choices are clinical matters and outside this project's scope.

The NCG/KCDO Medical Oncology requirements show workflow records such as:

- treatment protocol documentation;
- doctor assessment and notes;
- nursing administration records;
- monitoring during treatment;
- toxicity documentation;
- on-treatment and completion summaries.

Useful workflow questions:

- Who assembles earlier treatment history before the doctor reviews the patient?
- Where are protocol, administration, laboratory, and prior-treatment records stored?
- How are outside-hospital treatment records handled?
- Which parts are copied again into a new note or tracker?

### Surgical oncology

Surgical oncologists perform operations related to cancer care. Their workflow connects clinic assessment, pre-operative preparation, operating-theatre scheduling, surgery, anaesthesia, postoperative care, pathology, discharge, and follow-up.

The NCG/KCDO Surgical Oncology requirements include:

- operation-theatre booking and worklists;
- pre-operative and safety checklists;
- surgery and anaesthesia documentation;
- postoperative events and complications;
- operative logs and reports.

Useful workflow questions:

- What information must be complete before a patient reaches the operating list?
- Which handoffs happen between clinic, anaesthesia, theatre, ward, pathology, and follow-up?
- Where do missing outside imaging or pathology records cause rework?
- Who tracks whether required documents and clearances are available?

### Radiation oncology

Radiation oncologists use radiation therapy. The workflow can include consultation, review of records and imaging, simulation, treatment planning, quality checks, delivery over multiple sessions, monitoring, completion, and follow-up.

The NCG/KCDO Radiation Oncology requirements include:

- common clinical inputs;
- external-beam and brachytherapy planning and delivery;
- treatment interruptions;
- monitoring and toxicity records;
- completion and follow-up summaries.

Useful workflow questions:

- Which prior imaging, pathology, surgery, and treatment details are needed before planning begins?
- Which systems contain the consultation record, images, plan, delivery record, and completion summary?
- What happens when a patient arrives with incomplete outside records?
- How are interruptions and cross-department follow-ups coordinated?

### Haemato-oncology and paediatric oncology

Blood cancers and childhood cancers can have different disease classifications, treatment paths, teams, and documentation needs. Do not assume a solid-tumour timeline will fit them.

Ask whether they should be treated as separate initial segments rather than edge cases in one universal product.

## 10. The wider care team

An oncologist rarely works alone. Depending on the setting, the care team may include:

- oncology nurses;
- pharmacists;
- pathologists;
- radiologists and nuclear-medicine physicians;
- anaesthetists;
- surgeons from other specialties;
- radiation physicists, dosimetrists, and technologists;
- laboratory and molecular-diagnostics staff;
- pain and palliative-care clinicians;
- dietitians, psychologists, social workers, and rehabilitation staff;
- patient navigators and care coordinators;
- tumour-registry and medical-records staff;
- front-desk, scheduling, billing, and insurance staff;
- patients and caregivers.

A doctor may feel a problem, while a nurse, coordinator, or records worker performs most of the underlying work. Always ask:

> Who actually does this before the information reaches you?

That person may be the primary user even if the oncologist is the final reviewer.

## 11. A simplified cancer-care journey

This is a learning map, not a universal clinical protocol.

### A. Suspicion, referral, and first assessment

A patient may arrive after a symptom, screening result, incidental finding, or referral. Available material may include a referral letter, earlier consultation notes, imaging, laboratory results, or patient-carried documents.

Workflow questions:

- What must be available at the first oncology consultation?
- How are outside records received and checked?
- Who decides that the record is complete enough for the consultation?

### B. Diagnostic work-up

Cancer diagnosis commonly combines history, examination, laboratory testing, imaging, and usually tissue examination through biopsy or surgery. Pathology is often central, but the exact pathway differs by cancer.

Workflow questions:

- Where do pathology, imaging, and laboratory reports arrive?
- Are reports and original images/slides handled separately?
- What must be repeated or reviewed inside the institution?

Do not ask the product to determine whether the evidence proves cancer.

### C. Characterisation and staging

The team may document the cancer type, subtype, grade, extent, and biomarkers. These are clinical interpretations and decisions, even if source documents contain relevant observations.

Workflow questions:

- Which source reports feed the documented diagnosis and stage?
- Where is the final clinician-confirmed statement recorded?
- How are later corrections or addenda handled?

The tool may display an explicitly recorded stage with its source. It must not calculate or infer stage.

### D. Treatment planning

One or more specialties may review the case. Some cases go through a multidisciplinary tumour board. Patient condition, previous treatment, pathology, imaging, biomarkers, preferences, and practical circumstances may all matter.

Workflow questions:

- Who prepares the case before the decision discussion?
- What question is the team trying to answer?
- Which records must be attached or reviewed?
- Where is the human decision documented and communicated?

Do not ask the product to recommend the decision.

### E. Active treatment

Treatment may involve surgery, medicines, radiation, or combinations over time. Repeated visits create new orders, administration records, laboratory results, imaging, notes, adverse-event records, and summaries.

Workflow questions:

- Which records are created at every visit or cycle?
- What is manually copied between systems?
- What must be checked before the next visit?
- Who notices that a planned operational step has not occurred?

### F. Completion, follow-up, and surveillance

After a phase of treatment, the team may produce a completion or discharge summary and schedule follow-up. New consultations build on earlier decisions and treatment history.

Workflow questions:

- Is there one reliable treatment summary?
- Who prepares the next consultation?
- How are records from other departments or institutions added?
- How are pending operational tasks tracked?

### G. Recurrence, progression, supportive care, and palliative care

A patient's journey may include further treatment, symptom support, pain care, rehabilitation, survivorship, or palliative care. These terms are clinical and personal; use the clinician's language and do not make assumptions.

Workflow questions should remain operational:

- Which teams and records now become involved?
- What history must be reconstructed again?
- Where do handoffs or access problems appear?

## 12. Multidisciplinary tumour boards

A tumour board or multidisciplinary team meeting brings different specialists together to discuss a case. It is not simply a chat forum.

The NCG/KCDO Multidisciplinary Tumor Board requirements include:

- case presentation;
- relevant history and prior treatment;
- attached pathology and imaging material;
- a stated question for the board;
- comments from participating specialties;
- a final human decision;
- follow-up information.

A possible product may prepare and route a reviewed case packet. It must not replace the board or generate its clinical decision.

Questions to ask:

- Which cases are selected and by whom?
- Who prepares the packet?
- What must be available before the meeting?
- What is usually missing?
- How much preparation happens outside formal systems?
- How is the decision recorded, approved, and communicated?
- Who tracks follow-up actions?

## 13. Essential vocabulary

Use these definitions to follow the conversation. Do not use them to pretend clinical authority.

| Term | Simple meaning | Product-research caution |
|---|---|---|
| **Primary site** | The body site where a solid cancer began. | Do not infer it from a report. |
| **Histology** | How the tissue or cells are described under a microscope. | Preserve the pathologist's wording and source. |
| **Biopsy** | Removal of tissue or cells for examination. | The procedure record and pathology report are separate artifacts. |
| **Pathology report** | The pathologist's documented findings from tissue or cells. | Later addenda or outside review may change the recorded information. |
| **Grade** | A description of how abnormal tumour cells look; systems vary by cancer. | Grade is not the same as stage. Never calculate it. |
| **Stage** | The recorded extent of cancer. | Systems differ by cancer. Never infer stage. |
| **TNM** | A common staging framework: tumour, regional lymph nodes, and distant metastasis. | Not all cancers use TNM; exact meanings vary. |
| **Biomarker** | A measurable biological feature, such as a gene change or protein, that may inform clinical work. | Do not interpret whether a result changes treatment. |
| **Somatic testing** | Testing changes found in the tumour. | Different from inherited testing. |
| **Germline testing** | Testing for inherited changes that may be present throughout the body. | Results can affect family privacy; do not collect them in research. |
| **Molecular profiling** | Testing one or more molecular features of a tumour. | Treat the report as a sensitive source artifact. |
| **Modality** | A broad treatment method, such as surgery, medicines, or radiation. | Do not recommend a modality. |
| **Regimen or protocol** | A clinically defined plan for treatment. | Do not recommend or alter it. |
| **Cycle** | A repeated treatment period used for some systemic therapies. | Ask how cycle records are documented, not what dose is correct. |
| **Line of therapy** | A sequence category such as first-line or later-line treatment. | Do not derive it from scattered events without clinician confirmation. |
| **Neoadjuvant** | Treatment given before a main local treatment, often surgery. | Learn the term; do not classify a plan yourself. |
| **Adjuvant** | Treatment given after a main local treatment to address recurrence risk. | Clinical meaning remains with the care team. |
| **Radiotherapy fraction** | One delivered session or portion of a radiation course. | Planning and delivery data may live in specialised systems. |
| **Performance status** | A clinician-used measure of how well a person can carry out daily activities. | Do not calculate or score it. |
| **Toxicity or adverse event** | An unwanted effect recorded during care. | Do not grade, assess severity, or advise action. |
| **Response** | A clinical assessment of how disease has changed after treatment. | Do not infer it by comparing scans or values. |
| **Progression** | Clinically determined worsening or spread. | Never infer it from records. |
| **Recurrence** | Cancer returning after a period in which it was not detected or was controlled. | Use only when explicitly documented and cite the source. |
| **Remission** | A clinical description of reduced or absent signs of cancer. | Do not infer it. |
| **Supportive care** | Care that helps manage symptoms, side effects, function, and wellbeing. | It can occur alongside cancer treatment. |
| **Palliative care** | Care focused on quality of life and relief of suffering; it can occur at different stages. | Do not equate it automatically with the final days of life. |
| **Survivorship** | Ongoing care and life after or beyond a phase of cancer treatment. | Needs vary widely. |
| **MDT / tumour board** | A structured human case discussion across specialties. | The system may support preparation, not make the decision. |

If a term has a local meaning, ask:

> What does that term mean in this workflow at your institution?

---

# Part III — Records, systems, and handoffs

## 14. Common record types

Not every workflow uses all of these.

| Record or artifact | Usually tells the team | Questions to ask |
|---|---|---|
| Referral letter | Why the patient was referred and what is being requested. | Is it structured? Is the clinical question clear? |
| Consultation note | What was discussed, assessed, and planned at a visit. | Who writes it? Where? Is it available to the next team? |
| Pathology report and addenda | Findings from tissue or cells. | Are outside reports re-reviewed? How are addenda linked? |
| Imaging report | The radiologist's written interpretation. | Is the report enough, or are original images also needed? |
| Imaging study | The original scan images, often in DICOM format. | Can outside images be imported and viewed? |
| Laboratory results | Recorded test results. | Are results split across institutional and outside labs? |
| Molecular or biomarker report | Recorded molecular findings. | Where is the original report kept? Who confirms its use? |
| Prescription or medication order | What was ordered. | Is this separate from what was actually administered? |
| Administration record | What medicine or treatment was documented as given. | Can the team reconstruct actual treatment across institutions? |
| Treatment protocol or flow sheet | Planned and delivered systemic-treatment workflow. | Which parts are manual or repeated? |
| Operative and anaesthesia notes | What happened during surgery and anaesthesia. | Which team needs this later, and can they find it? |
| Postoperative and discharge summary | Hospital course, documented procedures, and discharge information. | Is the summary complete and timely? |
| Radiation plan and delivery record | Planned and delivered radiation workflow. | Which specialised system contains it? What summary leaves the department? |
| Treatment completion summary | A concise record of a completed treatment phase. | Does one exist consistently? Is it trusted outside the institution? |
| MDT note | Question, discussion, human decision, and follow-up. | Who signs it and how does it reach the treating team? |
| Consent and authorisation | Recorded permission for care or information use. | Where is access and sharing permission recorded? |
| Patient-carried file | Documents the patient or caregiver brings. | Who scans, sorts, verifies, and returns it? |

Important distinction:

> An order, a result, an administration record, and a later summary are not the same thing.

Ask which one the clinician actually needs for the job being described.

## 15. Common systems

Do not assume every hospital has these systems or that they are connected.

| System | Simple meaning |
|---|---|
| **HIS** | Hospital Information System: broad administrative and clinical hospital functions. |
| **EMR/EHR** | Electronic medical or health record used to document care. Local usage of the terms varies. |
| **LIS** | Laboratory Information System. |
| **RIS** | Radiology Information System for radiology workflow. |
| **PACS** | Picture Archiving and Communication System for viewing and storing medical images. |
| **DICOM** | A standard format and communication model for medical images and related information. |
| **Pharmacy system** | Medicines, inventory, dispensing, and sometimes order workflow. |
| **Chemotherapy/day-care system** | May support treatment scheduling, orders, administration, and monitoring. |
| **TPS/OIS** | Radiation treatment-planning and oncology information systems. |
| **Tumour registry** | Structured population-level cancer information, often for reporting or research. |
| **ABDM-connected software** | Software participating in India's digital-health ecosystem and consent-based data exchange. |
| **Paper, spreadsheets, and messaging** | Common local workflow tools and workarounds, not merely “bad behaviour.” |

The key question is not “Do you have an EMR?” Ask:

- Which system is the source for this step?
- Which system do people actually use?
- What is copied elsewhere and why?
- Which people cannot access the source system?
- What arrives as paper, PDF, image, or message?
- What must be re-entered?
- Where does the handoff fail?

## 16. Trust has several possible meanings

The note “doctors do not trust reports” is too vague to treat as a finding.

“Trust” might refer to:

- uncertainty about the issuing laboratory or institution;
- concern about specimen quality or testing method;
- a report being old or superseded;
- mismatch between report and original image or slide;
- incomplete context;
- patient-carried or altered documents;
- verbal recollection;
- incorrect transcription;
- AI-generated summaries;
- a system that hides its source;
- a disagreement that requires clinical judgement.

Ask:

> You mentioned that you recheck or do not trust some information. What exactly creates that doubt? What do you do next? Which source finally becomes acceptable, and who decides?

Do not ask software to resolve a clinically meaningful disagreement. It may preserve both source statements and route them for human review.

## 17. A useful workflow map

For every difficult episode, capture this chain:

> Trigger → actor → input → system/tool → action → output → next actor → verification → completion

Example structure, not a claimed workflow:

| Step | Actor | Input | Tool | Action | Output | Time/rework | What can fail? |
|---|---|---|---|---|---|---|---|
| 1 | Coordinator | Outside PDFs | Email + EMR | Collects and uploads | Uploaded files | Estimate | Missing or duplicate files |
| 2 | Doctor | Uploaded files | EMR viewer | Reviews history | Consultation note | Estimate | Source hard to locate |

Let the participant supply the real steps. Do not fill gaps from your assumptions.

---

# Part IV — What we think we know, and what remains uncertain

## 18. Current evidence hierarchy

Treat statements differently based on their source:

1. **Official programme or standards fact** — a rule or published specification.
2. **Observed workflow evidence** — a participant's recent concrete episode.
3. **Repeated research pattern** — similar evidence across multiple participants and settings.
4. **Source claim** — something reported by one participant or existing note.
5. **Inference** — our interpretation of several facts or claims.
6. **Open question** — not yet established.

One confident quote is not prevalence evidence.

## 19. Existing themes from earlier oncology conversations

These are the five filtered themes in the supplied notes.

### Find

Possible problem:

> Finding exact, trusted information across guidelines, publications, drug references, trials, staging material, and other sources takes too long.

What to validate:

- Which information is searched most often?
- Is the search general knowledge work or patient-specific decision support?
- Which sources are considered authentic?
- How often does this create material delay?

### Contextualise

Possible problem:

> Generic information is not enough because oncology varies by cancer, stage, biomarker, prior treatment, specialty, and patient situation.

What to validate:

- Does “context” mean organising records by case and time, or applying medical knowledge to a treatment decision?
- The first can be operational. The second may be prohibited clinical decision support.

### Synthesise

Possible problem:

> Patient information is spread across reports and systems, so the care team repeatedly rebuilds a coherent history.

What to validate:

- Which exact consultation or handoff requires this?
- Who does the reconstruction?
- How often and how long does it take?
- Which artifacts are difficult to obtain or reconcile?
- Would source-linked extraction reduce work, or add another review burden?

This is the strongest current hypothesis, but it is not yet proven.

### Act

Possible problem:

> Clinicians want faster access to dosing, modifications, toxicity grading, drug interactions, staging, indications, and trial availability.

Important boundary:

Many patient-specific uses under this theme are clinical decision support or medical interpretation and are outside the hackathon scope. Learn the unmet need, but do not promise to build it in this project.

### Connect

Possible problem:

> Clinicians sometimes need peer discussion, multidisciplinary review, knowledge sharing, or help preparing academic work.

What to validate:

- Is this frequent enough to be the primary job?
- Is the need case preparation, finding a person, scheduling, discussion, documentation, or follow-up?
- What consent, identity, confidentiality, and institutional rules apply?
- Do existing tumour-board workflows already cover it?

## 20. Informal claims that need careful testing

The existing chat suggests that:

- patients carry records and repeat their history;
- hospital systems differ, even inside larger networks;
- changing oncologists may be uncommon;
- oncologists can be scarce outside major cities;
- specialists may disagree;
- peer review may improve discussion.

These are useful interview prompts, not established facts. Do not repeat them to a participant as conclusions.

## 21. What could disprove the current direction?

Take these answers seriously:

- The record-preparation problem is rare.
- A coordinator already solves it efficiently.
- Existing EMR features are sufficient when used correctly.
- Outside records are intentionally rechecked and cannot be safely summarised.
- Reviewing extracted text takes longer than reading originals.
- The main burden is elsewhere, such as scheduling, authorisation, staffing, follow-up, or documentation.
- The primary need requires clinical interpretation, making it unsuitable for this hackathon.
- Institutions cannot permit the necessary data access or workflow change.
- No host can measure an operational improvement within 60–90 days.

A useful interview can invalidate the idea. That is progress, not failure.

---

# Part V — Interview approach

## 22. Research objective

The primary objective is:

> Identify one frequent, important, non-clinical oncology workflow problem with a named user, trigger, current process, measurable burden, safe output, and realistic 60–90-day pilot path.

Secondary objectives:

- understand specialty and institution differences;
- map records, systems, and handoffs;
- learn what information is trusted and why;
- test the current consultation-readiness hypothesis;
- find disconfirming evidence;
- identify people who perform hidden preparation work;
- understand adoption and integration limits.

## 23. Who to interview

Do not interview only senior medical oncologists.

Aim for purposeful variation:

- medical, surgical, and radiation oncologists;
- academic cancer centres, multispecialty hospitals, and smaller practices;
- metro and non-metro pathways;
- higher and lower digital maturity;
- oncology nurses and care coordinators;
- records staff or tumour-board coordinators where relevant.

Start with a manageable round, for example six to ten conversations covering several cells above. Continue until new interviews stop materially changing the workflow map. This is qualitative discovery, not a statistical survey.

Prefer one participant at a time. In a group, hierarchy can hide disagreement and people may describe the official process instead of their own behaviour.

## 24. Before the interview

Prepare:

- participant role, specialty, institution type, and broad setting;
- a 30- or 60-minute discussion guide;
- a note-taker if available;
- a participant code instead of a name in working notes;
- a consent statement;
- clear recording, storage, access, retention, and deletion rules;
- a timer;
- the hypothesis-validation questions, kept for the second half;
- no product demo unless this is explicitly a later concept-testing interview.

Do not request or accept:

- patient names or identifiers;
- exact dates connected to a case;
- phone numbers, addresses, IDs, or hospital numbers;
- patient images, screenshots, files, reports, or screen sharing;
- identifiable recordings of clinical work;
- copied chat messages containing patient details.

Ask for a generalised walkthrough. Relative wording such as “a recent follow-up” is enough.

## 25. Consent and privacy opening

Before taking notes or recording, explain:

- who is conducting the research;
- the purpose;
- session length and format;
- what data will be collected;
- who will see it;
- whether quotations will be used;
- how long notes or recordings will be retained;
- that participation is voluntary;
- that the participant may skip, pause, or stop;
- how withdrawal and deletion will work.

Use only the parts that match your actual research process:

> Before we start, I want to confirm that this is product research about oncology workflows, not a clinical consultation. I will take notes about the process, not patient details. [Name the note-taker or observers, if any.] The notes will be seen by [exact people] and used for [exact purpose]. We plan to retain them for [exact period]. You can skip any question, pause, or stop at any time.
>
> Please describe cases without names, identifiers, exact dates, images, or records. If either of us notices identifying information, we will stop and generalise it.
>
> [If recording:] With your permission, I would like to audio-record the conversation for note accuracy. It will be stored [where], accessed by [who], and deleted [when]. Is that acceptable?
>
> Do you consent to take part? [And, separately: Do you consent to recording?]

Do not begin recording before explicit consent.

If identifiable patient information appears:

1. stop the detail;
2. ask the participant to generalise;
3. do not copy it into notes;
4. mark any accidental capture for secure deletion under the agreed process;
5. continue only when the conversation is safe.

## 26. Interviewer posture

Say less than the participant.

Use short probes:

- “Tell me more.”
- “What happened next?”
- “Who did that?”
- “Where did that information come from?”
- “What do you mean by difficult?”
- “Can you give a recent generalised example?”
- “How did you handle it?”
- “How often does that happen?”
- “What made you recheck it?”
- “What am I assuming incorrectly?”

Allow silence. People often add the most useful detail after a pause.

Do not rigidly complete every question. Follow the most important real episode while protecting time for quantification and closing.

---

# Part VI — Full 60-minute interview script

## 27. Recommended flow

| Time | Section | Purpose |
|---:|---|---|
| 0–5 min | Consent and context | Establish safety and research purpose. |
| 5–12 min | Open rant and day scan | Discover what matters before introducing hypotheses. |
| 12–30 min | Recent episode reconstruction | Capture the real workflow. |
| 30–40 min | Artifacts, systems, trust, and handoffs | Understand information movement and verification. |
| 40–48 min | Frequency, burden, and current alternatives | Test importance and feasibility. |
| 48–55 min | Revalidate existing themes | Check earlier clinician-derived themes without leading early answers. |
| 55–60 min | Wishes, disconfirmation, and close | Learn desired outcome and next contact. |

## 28. Section A — Natural introduction

> Thanks for making time. I am working with a team looking at workflow problems in oncology. I am not a clinician. I have done enough homework to follow the broad process, but I do not want to arrive with a solution and force your experience into it.
>
> I would first like you to dump information on me—even rant a little—about the repetitive, frustrating, slow, or risky parts of your daily work. I am more interested in what really happens than what the ideal process says should happen.
>
> A recent generalised example is especially useful. Please leave out patient names, identifiers, exact dates, images, and records.
>
> In the second half, I will check a few patterns from earlier conversations with oncologists. Those patterns may be wrong or less important than something else you raise.

Then ask:

> Before I narrow the conversation, what parts of your day make you think, “This should not require this much effort”?

Let them speak. Do not rescue the silence.

## 29. Section B — Broad work scan

Choose a few:

1. What kind of oncology work and patient journey do you personally handle?
2. Walk me through a typical clinic or treatment day at a high level.
3. Where does work pile up before or after you see the patient?
4. What do you repeatedly wait for, search for, copy, or verify?
5. Which task depends too much on one experienced person knowing how things work?
6. Which part frustrates your nurses, coordinators, or records staff more than it frustrates you?
7. If you unexpectedly lost one team member for a week, which workflow would break first?
8. What important task happens outside the formal hospital system?

Do not introduce “patient summary,” “dashboard,” or “AI” yet.

## 30. Section C — Reconstruct one recent episode

Transition:

> I would like to make one of those examples concrete. Please choose a recent case without any identifying details. Start from the moment the work became necessary.

Ask in order, but follow the story naturally:

1. What triggered the work?
2. What were you trying to accomplish?
3. Who first knew the work was needed?
4. What happened next?
5. Who performed each step?
6. Which records or information were needed?
7. Where did each item come from?
8. Which system, paper file, spreadsheet, message, or person was used?
9. What was unavailable, unclear, duplicated, or inconsistent?
10. What did you or the team do about it?
11. What had to be checked by a clinician?
12. What was the final output—a note, decision, packet, appointment, order, discussion, or something else?
13. How did the next person know the work was complete?
14. What happened after that?

Useful probes:

- “You said ‘we’. Which role actually did it?”
- “Was that the official process or the workaround used that day?”
- “Did anyone enter the same information again?”
- “Could the next person see the original source?”
- “How did you know which version was current?”
- “What would have happened if nobody noticed?”

Draw the workflow while they speak.

## 31. Section D — Artifacts and source trust

> I want to understand the information itself, without seeing any real record.

Ask:

1. Which document types mattered in that episode?
2. Did you need the written report, the original image or slide, or both?
3. Which records came from outside the institution?
4. What information was supplied verbally by the patient or caregiver?
5. Which source was considered authoritative for each step?
6. Were any sources rechecked or repeated? Why?
7. What does “trust” mean here: source institution, test quality, age, completeness, transcription, authenticity, or something else?
8. How are corrected reports or later addenda linked to the earlier version?
9. If two sources differ literally, who resolves it and where is the resolution recorded?
10. What should software show but never try to resolve?

## 32. Section E — Systems and handoffs

Ask:

1. Which systems were used in this episode?
2. Which system is supposed to be the source of truth?
3. Which system do people actually look at first?
4. What is copied between systems, paper, spreadsheets, or messages?
5. Why is it copied?
6. Who lacks access to the source system?
7. What arrives as scans, photographs, or PDFs?
8. Where does information stop moving automatically?
9. Which handoff creates the most calls, messages, or repeated questions?
10. Who owns fixing the problem today?

Avoid judging workarounds. A spreadsheet or message may exist because the formal system does not support the real job.

## 33. Section F — Frequency and burden

Ask for estimates, not false precision:

1. How often does this happen: several times a day, weekly, monthly, or rarely?
2. In a typical instance, how much staff time is involved?
3. Whose time is consumed?
4. How many clarification loops are common?
5. What is the longest waiting step?
6. How often must work be repeated?
7. What is the operational consequence: delay, extra visit, longer consultation, overtime, missed discussion, or something else?
8. Is the burden different for new patients, follow-ups, outside referrals, or tumour-board cases?
9. Which simple measure would show that the workflow improved?

Do not ask the participant to estimate clinical harm unless that is part of properly governed clinical research. Keep the product pilot focused on operational outcomes.

## 34. Section G — Existing alternatives and failed attempts

Ask:

1. How do you solve this today?
2. What is good about the current process?
3. What product or feature comes closest?
4. Why is it insufficient?
5. Has the institution tried to improve this before?
6. What happened?
7. What would make staff reject a new tool?
8. What integration or training burden is unacceptable?
9. What part cannot safely be automated?
10. Who would need to approve a pilot?

This section prevents us from proposing a second, unused dashboard.

## 35. Section H — Revalidate the earlier themes

Only now say:

> I would like to check five themes that came from earlier oncology conversations. I am not asking you to agree with them. Please tell me which are real in your setting, which are overstated, and what is missing.

For each theme, ask for evidence:

### Find

> How often do you struggle to find a trusted guideline, paper, trial, staging reference, drug reference, or other professional information? Tell me about the last time.

### Contextualise

> When generic information is not enough, what context do you need? Which part is simple record organisation, and which part requires your clinical judgement?

### Synthesise

> How often must someone reconstruct a patient journey from scattered records? Who does it, for which type of visit, and what makes it difficult?

### Act

> Earlier conversations mentioned practical needs such as dose modification, toxicity grading, interactions, staging, and trial availability. Which of these creates real work for you? We understand that patient-specific decision support is outside this hackathon, so I am trying to learn the need rather than promise a feature.

### Connect

> When do you need another specialist or tumour-board discussion? Is the difficult part finding the right person, preparing the case, scheduling, sharing records, conducting the discussion, recording the decision, or following up?

Then ask:

> If you had to rank these five by frequency and by pain, how would you rank them? What more important problem is not on this list?

## 36. Section I — Desired outcome, not feature shopping

Ask the participant to describe the changed world before asking about product form:

1. If this workflow worked well, what would be different tomorrow morning?
2. Which step would disappear, shorten, or become more reliable?
3. What would remain a human responsibility?
4. What evidence would make you trust the output?
5. How quickly must the result be available?
6. Where would it need to appear in your current workflow?
7. Who would review or approve it?
8. What correction process would be necessary?
9. What would make the tool unsafe or unusable?

Then, and only then:

> Do you already have a clear picture of what form would help—a reviewed packet, timeline, search view, task list, handoff, or something else? Please describe it. I am interested in why that form fits the work, not just the feature name.

If they request a prohibited clinical feature, learn from it without committing:

> That is useful context. This hackathon does not allow diagnosis, treatment recommendation, or patient-specific clinical decision support, so I cannot treat that exact feature as our build direction. Is there an operational step around preparing, locating, verifying, or communicating the information that is still painful?

## 37. Section J — Disconfirmation and close

Ask:

1. What have I misunderstood?
2. Which assumption in my current direction is most likely wrong?
3. Is fragmented record preparation actually important, or have we overestimated it?
4. Who should I speak with because they perform the work I am asking about?
5. May I contact you with a one-page workflow summary to check whether I represented it correctly?
6. Is there anything important I failed to ask?

Close:

> Thank you. I will treat what you described as research evidence, not as a general claim about every oncologist. I will remove identifying details and separate your observed workflow from my interpretation. If we send a summary back, it will contain no patient information.

---

# Part VII — Short 30-minute script

## 38. Compressed flow

### 0–3 minutes: consent and framing

Use the privacy and natural introduction scripts above.

### 3–8 minutes: open scan

> What repetitive, frustrating, slow, or risky part of your daily work most needs fixing?

> Is there something more pressing than scattered patient information or consultation preparation?

### 8–20 minutes: one recent episode

1. What triggered it?
2. Who did what, step by step?
3. Which records and systems were involved?
4. What was missing or difficult to trust?
5. What workaround was used?
6. How often does it happen and whose time does it consume?
7. What was the operational consequence?

### 20–25 minutes: hypothesis check

Briefly test Find, Contextualise, Synthesise, Act, and Connect. Ask which one is most frequent and what is missing.

### 25–28 minutes: desired outcome

> If one part of this workflow improved, what exactly would change, and how would you measure it?

> What must remain under human review?

### 28–30 minutes: disconfirm and close

> What am I misunderstanding? Who actually performs this work? Who should I interview next?

---

# Part VIII — Specialty and role-specific probes

## 39. Medical oncology probes

- How is prior systemic-treatment history reconstructed?
- What is the difference between what was planned, ordered, and documented as administered?
- Who prepares information before a follow-up or treatment visit?
- Which laboratory, treatment, and outside records are difficult to find together?
- What is included in an on-treatment or completion summary?
- Which information must you verify personally?

Do not ask the system to recommend a regimen, dose, modification, or toxicity response.

## 40. Surgical oncology probes

- What information must be complete before booking or performing surgery?
- How do clinic, anaesthesia, operating theatre, ward, pathology, and follow-up exchange information?
- What happens when outside imaging or pathology is unavailable?
- Where are operative findings, postoperative events, and pathology connected?
- Who tracks missing clearances, reports, or follow-up artifacts?

## 41. Radiation oncology probes

- What records are needed before consultation, simulation, and planning?
- How are outside images and prior treatment summaries handled?
- Which systems hold consultation, planning, delivery, interruption, and completion records?
- What gets manually re-entered?
- What information must move back to medical or surgical oncology?
- Who notices and manages an operational interruption?

Do not ask the system to design, compare, or interpret a radiation plan.

## 42. Tumour-board or MDT probes

- How are cases selected?
- What is the exact question being brought to the board?
- Who prepares the history and attachments?
- Which source records are mandatory?
- What commonly causes postponement or incomplete discussion?
- How are specialty comments and the final human decision captured?
- Who communicates and follows up after the meeting?

## 43. Nurse or care-coordinator probes

- What do you prepare before the doctor sees the patient?
- Which missing information do you chase?
- Which lists, spreadsheets, or messages do you maintain?
- What must you copy into more than one system?
- Which task depends on memory?
- What questions repeatedly come back from doctors, patients, or departments?
- Which change would save the most time without creating extra documentation?

## 44. Records or administrative staff probes

- How are outside records received, indexed, scanned, and matched?
- What makes a file difficult to classify?
- How are duplicate, corrected, or unreadable documents handled?
- Who may view or correct metadata?
- Which queues or pending items are invisible?
- What causes repeated calls or patient visits?

---

# Part IX — Interviewing mistakes to avoid

## 45. Leading versus neutral questions

| Leading question | Neutral replacement |
|---|---|
| Would an AI summary save you time? | Walk me through the last time you prepared or reviewed a complex history. |
| Don't scattered reports make consultation difficult? | Which information was difficult to obtain in that consultation, if any? |
| Would you use a dashboard? | Where do you currently look, and what output fits that step? |
| Is peer discussion a big problem? | Tell me about the last case that needed another specialist's input. |
| How much time would our product save? | How much time does the current process take, and where is it spent? |
| Would source citations make you trust AI? | What makes information acceptable or unacceptable for this task? |
| Do you agree with these five pain points? | Which themes fit your work, which do not, and what is missing? |
| What features do you want? | What outcome should improve, and what prevents it today? |

## 46. Other common mistakes

### Pitching too early

Once the participant hears your proposed solution, later answers become reactions to your framing.

### Asking about the ideal process only

The official process may differ from actual behaviour. Ask for the last concrete episode.

### Treating seniority as complete workflow knowledge

A senior doctor may not see the preparation work performed by nurses, coordinators, residents, or records staff.

### Turning every complaint into a feature

A complaint can be caused by policy, staffing, incentives, access, training, or integration—not missing software.

### Ignoring the current workaround

The workaround contains the real requirements and switching costs.

### Confusing a source assertion with a fact

A report may contain a statement. The product must preserve the source and review status rather than silently asserting clinical truth.

### Collecting patient data to make research “real”

Do not do this. Use generalised walkthroughs and researcher-created synthetic artifacts later.

### Asking only confirming questions

Always ask what would disprove the direction and what problem is more important.

### Overusing oncology terminology

Use the participant's language. Ask what local terms mean instead of showing off vocabulary.

---

# Part X — Note-taking template

## 47. Interview header

```text
Interview ID:
Research round:
Date of interview:
Interviewer:
Note-taker:
Recording consent: yes / no / not requested
Quotation consent and limits:
Participant role:
Oncology specialty:
Institution type:
Metro / non-metro pathway:
Broad digital maturity:
Years in role, if volunteered:
No patient-identifying data confirmed: yes / no
```

Do not put the participant's name in the analysis document unless necessary and covered by consent.

## 48. Unfiltered problems

```text
First problem mentioned without prompting:
Other daily frustrations:
What seemed emotionally strong:
What participant said is most frequent:
What participant said is most serious:
Problem affecting another role more than participant:
```

## 49. Recent episode map

```text
Job to be done:
Trigger:
Desired operational outcome:
Completion signal:
Frequency estimate:
Total time estimate:
Roles involved:
Systems/tools involved:
Artifacts involved:
Current workaround:
What went wrong or required rework:
What required clinician verification:
Operational consequence:
Strongest direct quote, de-identified:
```

| Step | Actor | Input/source | Tool/system | Action | Output/handoff | Time | Failure/rework |
|---|---|---|---|---|---|---:|---|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

## 50. Trust and provenance

```text
Which information was rechecked:
Why it was rechecked:
What became the accepted source:
Who decided:
How corrections/addenda were handled:
What software may safely organise:
What requires medical judgement:
```

## 51. Existing-theme check

| Theme | Confirmed by recent episode | Contradicted | Nuanced | Not discussed | Evidence |
|---|---:|---:|---:|---:|---|
| Find | | | | | |
| Contextualise | | | | | |
| Synthesise | | | | | |
| Act | | | | | |
| Connect | | | | | |

## 52. Scope classification

Classify each requested capability:

| Capability | Operational assistance | Clinical interpretation | Treatment recommendation | Unclear / review needed |
|---|---:|---:|---:|---:|
| | | | | |

Remove clinical interpretation and treatment recommendation from the hackathon product scope. Do not hide them; retain them as research context with the boundary clearly marked.

## 53. Interpretation discipline

Use explicit labels:

```text
[OBSERVED EPISODE] What the participant described doing.
[SOURCE CLAIM] What the participant believes or reports generally.
[INFERENCE] Our interpretation.
[OPEN] What remains unknown.
[CONTRADICTION] Evidence that conflicts with an earlier hypothesis.
```

End every interview note with:

```text
Strongest evidence for current direction:
Strongest evidence against current direction:
What changed in our understanding:
Next question to investigate:
Best next participant role:
```

---

# Part XI — Synthesis after interviews

## 54. Debrief immediately

Within 15–30 minutes of the interview:

1. remove or flag any accidental identifying information;
2. complete the workflow map while memory is fresh;
3. separate direct evidence from interpretation;
4. write the strongest confirming evidence;
5. write the strongest disconfirming evidence;
6. list follow-up questions;
7. do not redesign the product yet.

## 55. Build a cross-interview matrix

One row per episode, not only one row per participant:

| Episode | Role | Setting | Job | Trigger | Frequency | Burden | Workaround | Main failure | Safe opportunity | Disconfirming evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | |

Look for repeated jobs, not repeated feature requests.

## 56. Turn evidence into a problem statement

Use this form:

> When **[named actor]** encounters **[trigger]**, they need to **[job]** using **[inputs]** across **[current steps/systems]**. Today, **[specific failure]** causes **[measured operational burden]**. Existing alternatives fail because **[evidence]**. A safe improvement would produce **[non-clinical output]**, remain under **[named human review]**, and move **[operational KPI]** within 60–90 days.

Do not write “oncologists need an AI platform.” That names neither the job nor the evidence.

## 57. Simple opportunity rubric

Score only after several interviews. Use 0 = weak, 1 = mixed, 2 = strong.

| Criterion | 0 | 1 | 2 |
|---|---|---|---|
| Frequency | Rare | Periodic | Daily or several times weekly |
| Burden | Minor | Noticeable | Material time/rework/handoff burden |
| Repeated evidence | One vague claim | Some concrete episodes | Repeated concrete episodes across relevant roles |
| Clear primary user | Unknown | Several candidates | Named actor owns the job |
| Safe boundary | Requires clinical judgement | Boundary uncertain | Clearly operational and human-reviewed |
| Pilot measurement | No baseline | Possible proxy | Clear operational KPI and host |
| Light integration | Major system rewrite | Several dependencies | Narrow file/export/interface boundary |
| Existing alternatives | Already sufficient | Partial gap | Clear unmet workflow despite alternatives |
| Adoption fit | Adds major work | Trade-off unclear | Fits current step and removes work |
| Differentiation | Generic category | Some local value | Specific unmet last-mile job |

A high total does not override a hard failure.

Stop or return to discovery when:

- the core output is diagnosis, medical interpretation, or treatment advice;
- the workflow cannot be studied or tested without real patient data;
- no actor owns the job;
- the burden is not frequent or material;
- the proposed tool adds a second source of truth without removing work;
- no meaningful operational measure can move in 60–90 days;
- existing systems already solve the job adequately.

## 58. Decision gates after the first research round

Before repository and product lock, answer:

### Gate 1 — Workflow

What is the one frequent job, named actor, trigger, input, process, output, and baseline burden?

### Gate 2 — Safety

Can the complete product remain operational and assistive without clinical interpretation or treatment recommendation?

### Gate 3 — Segment and data

Which oncology segment and finite set of synthetic artifacts will be supported first?

### Gate 4 — Measurement

Which operational KPI and baseline can change within 60–90 days?

### Gate 5 — Differentiation

Why do NCG-aligned EMRs, current hospital systems, and existing products not solve this exact job in the target setting?

Only then initialise the full product architecture, evaluation corpus, plans, memories, and agent harness.

---

# Part XII — Personal preparation plan

## 59. One hour before the first interview

1. Read Parts I–III.
2. Learn the specialty of the participant.
3. Read that specialty's probes in Part VIII.
4. Practise the natural introduction aloud.
5. Prepare consent and note-taking.
6. Write the current hypothesis on paper, then write: “This may be wrong.”
7. Keep the five earlier themes hidden until the second half.

## 60. Five minutes before the interview

Remember:

- Be curious, not impressive.
- Ask for the last real episode.
- Follow actors, artifacts, systems, handoffs, time, and failure.
- Ask “what happened next?”
- Do not collect patient data.
- Do not pitch AI.
- Do not defend the current idea.
- Ask what you misunderstood.

## 61. After the interview

1. Secure or delete research data according to consent.
2. Debrief using Part XI.
3. Send no clinical or identifiable details in team chats.
4. Return a de-identified workflow summary for participant correction if permission was granted.
5. Update hypotheses only when the evidence justifies it.

---

# Primary references

## Project sources

- `hackathon_constraints_general_info.md`
- `Oncologist Pain Points.md`
- `chatroom_notes.md`
- `HEALTHATHON_OFFICIAL.md`
- `CONTEXT.md`
- `FOUNDATION.md`

## Indian oncology workflow and digital-health sources

- [NCG/KCDO Oncology EMR initiative](https://www.kcdo.in/oncologyemr)
- [NCG/KCDO Medical Oncology Module v2.0](https://www.kcdo.in/src/docx/ner-medical-oncology-module-2.0.pdf)
- [NCG/KCDO Surgical Oncology Module v2.0](https://www.kcdo.in/src/docx/ner-surgical-oncology-module-2.0.pdf)
- [NCG/KCDO Radiation Oncology Module v2.0](https://www.kcdo.in/src/docx/ner-radiation-oncology-module-2.0.pdf)
- [NCG/KCDO Multidisciplinary Tumor Board Module v2.0](https://www.kcdo.in/src/docx/ner-multi-disciplinary-tumor-board-module-2.0.pdf)
- [FHIR Implementation Guide for ABDM v7.0.0 draft](https://www.nrces.in/preview/ndhm/fhir/r4/index.html)

## Plain-English oncology references

- [NCI: Tests and Procedures Used to Diagnose Cancer](https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis)
- [NCI: Cancer Staging](https://www.cancer.gov/about-cancer/diagnosis-staging/staging)
- [NCI: Tumor Grade](https://www.cancer.gov/about-cancer/diagnosis-staging/diagnosis/tumor-grade)
- [NCI: Biomarker Testing for Cancer Treatment](https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment)
- [NCI: Types of Cancer Treatment](https://www.cancer.gov/about-cancer/treatment/types)
- [NCI: Types of Health Care Providers](https://www.cancer.gov/about-cancer/managing-care/finding-cancer-care/providers)

## Interview and research-data guidance

- [GOV.UK: Using in-depth interviews](https://www.gov.uk/service-manual/user-research/using-in-depth-interviews)
- [GOV.UK: Getting informed consent for user research](https://www.gov.uk/service-manual/user-research/getting-users-consent-for-research)
- [GOV.UK: Taking notes and recording user research sessions](https://www.gov.uk/service-manual/user-research/taking-notes-and-recording-user-research-sessions)

Recheck official programme rules, institutional policy, consent requirements, and source versions before conducting formal research or building a prototype.
