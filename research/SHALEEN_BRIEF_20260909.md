# For Shaleen — where we are and what we're locking (simple language)

Date: 2026-09-09. Status: proposal only. Needs owner sign-off before it becomes official.

## 1. Problem context

Doctors who treat cancer sometimes ask: "Is there any clinical trial near us for this kind of cancer?"

Right now that question stalls:
- India's trial list (CTRI) is messy — old entries, missing contacts, different status on different sites.
- Trials are very uneven — Delhi/Mumbai have many, many states have almost zero.
- So a doctor or junior spends a long time searching, calling dead numbers, repeating work.

Shaleen's point is right: delays between departments are real. Rakshita's point is also right: we can't solve all delays at once. We need ONE deep problem.

## 2. Facts we have (no jargon)

- The PDF shared earlier (ner-2.0) is the NCG cancer EMR rulebook from 2023. It lists what a hospital EMR should do. It is not a product we should rebuild.
- NCG already has tumour-board templates, virtual boards, and 6 approved EMR vendors. A broad "portal for all inter-department problems" would compete with all of that and has no single number to improve.
- For trials: a big India study of 1,988 trials (2007-2021) shows huge state gaps and dirty registry fields. Another study of 181 open trials shows less than 10% of new patients have a same-state trial slot. Even the best state covers only ~30%.
- Registry quality study shows missing names, wrong cities, mismatched entries between Indian and US registries.
- Hackathon rules ban one thing completely: telling which trial fits a specific patient. That's treatment advice. We will never do that.

## 3. Reasoning — why not the big portal, why trials

- Big portal = many users, many triggers, no single owner, no 60-day number, hard demo, looks like another EMR. Judges will say "NCG already does this."
- Trials narrow = one user (oncologist/junior), one trigger (general trial question), one output (verified list + contact + task), one number (time to verified contact). Demos in 5 minutes on fake data. No hallucination risk if we only show what the registry says.
- Team reason: Rakshita will go deep only on this. A split team loses even with a better idea on paper. Depth wins hackathons.

## 4. Gaps we still have to close

- We don't yet know: who asks about trials every week, how many questions per week, how long it takes today, what happens after.
- We need from Neha/clinician: one hospital with many trials, one cancer type (example: breast), one role name, weekly count, current workaround (Excel/WhatsApp/phone?).
- If we don't get that by tomorrow evening, we fall back to Plan B: same tracker but for daily lab/pathology reports (same code, different content, daily frequency).

## 5. Final vision (what we will build for Round 1)

One line: a trial finder + referral task tracker for doctors. General search only. No patient data.

Flow:
1. Doctor types: "phase-2 breast trials listing Mumbai as recruiting."
2. System shows list with proof: CTRI ID, title, phase, sites, status, last-checked date, site contact, distance, and a flag if registries disagree.
3. System drafts next step: "Call site X." Human must approve.
4. System creates a task: owner, due date, status pending/contacted/referred/closed, full history.

Safety: if anyone types patient details or asks "does my patient fit?", system refuses and says "here are general matches, ask your doctor." It never invents a phone number. Unknown = unknown.

Integration: read-only from public registries + a contact sheet. No hospital system rewrite. Works with paper/Excel/WhatsApp today.

## 6. Impact and potential results

- For doctors: from 1-2 hours of messy search + dead calls to ~10 minutes to a verified contact with an owner.
- For pilot (60-90 days at one busy site): median inquiry-to-contact time drops; % inquiries with an owned next step in 48 hours rises. Both are numbers judges already like (handoff lag, completion rate).
- For submission: fits use-case 05 (Doctor Productivity & Knowledge Assistant). Complements NCG/KCDO, doesn't compete. Synthetic data only, human override + audit visible.
- If pilot works: same pattern extends to other cancer types, then to report-ack tracking (Shaleen's area) without rebuilding.

## 7. What we need from you, Shaleen

- Agree to kill the broad portal for Round 1 and keep its best part (ack + owner + overdue list) inside this trial tracker.
- Help define the task pattern: who owns, what statuses, when to escalate.
- Vote tomorrow: Plan A (trials deep) vs Plan B (report-ack). One pick, then we go deep.

## 8. Quick glossary

- Trial: an experiment testing a treatment, like a job listing with rules and a contact.
- CTRI: India's official trial list. Must-register, but often stale/messy.
- ClinicalTrials.gov: US/global list. We cross-check it against CTRI.
- Sponsor: who runs/pays — pharma (industry) or hospital (academic).
- Site: which hospital is enrolling. One trial can have many sites.
- PI: the doctor owning that site's part. Like a repo maintainer.
- Phase: stage of experiment — 1 small/safety, 2 medium/signal, 3 large/compare, 4 after-approval. Just a filter for us.
- Status: recruiting / not recruiting / completed / suspended. We show what registry says + when we checked + confidence.
- Eligibility: the "must-have" list. We show it, we never judge it.
- Referral task: after finding a trial, someone must call, send letter, track reply. Owner + due + status + history.
- Freshness flag: green (verified this week), yellow (old), red (registries disagree). Never guess a phone number.
