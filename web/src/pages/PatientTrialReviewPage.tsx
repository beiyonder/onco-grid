import { type FormEvent, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, SourceBadge, StatusChip } from "../components/Primitives";
import { criterionExcerpts } from "../data/trials";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import type { CriterionReviewState, PatientWorkspace, ReviewState, TrialRecord } from "../types";

const reviewStates: ReviewState[] = [
  "Not reviewed",
  "Confirmed from source",
  "Needs clarification",
  "Does not appear met",
];

function reviewTone(state: ReviewState | undefined): "neutral" | "good" | "attention" | "danger" {
  if (state === "Confirmed from source") return "good";
  if (state === "Needs clarification") return "attention";
  if (state === "Does not appear met") return "danger";
  return "neutral";
}

function CriterionRow({
  criterion,
  current,
  patient,
  trial,
}: {
  criterion: { id: string; section: string; text: string };
  current: CriterionReviewState | undefined;
  patient: PatientWorkspace;
  trial: TrialRecord;
}) {
  const { addMissingInformationTask, updateCriterion } = useAppState();
  const [state, setState] = useState<ReviewState>(current?.state ?? "Not reviewed");
  const [evidence, setEvidence] = useState(current?.evidence ?? "");
  const [note, setNote] = useState(current?.note ?? "");
  const [dirty, setDirty] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const evidenceRequired = state !== "Not reviewed";

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (evidenceRequired && !evidence) return;
    updateCriterion({ patientId: patient.id, trialId: trial.id, criterionId: criterion.id, state, evidence, note });
    setDirty(false);
  };

  return (
    <article className="criterion-card" id={criterion.id} tabIndex={-1}>
      <header>
        <span className="criterion-number">{criterion.id.replace("criterion-", "")}</span>
        <span><small>{criterion.section} criterion · exact registry excerpt</small><p>{criterion.text}</p></span>
        <StatusChip tone={reviewTone(current?.state)}>{current?.state ?? "Not reviewed"}</StatusChip>
      </header>
      <form onSubmit={save}>
        <label><span>Human review state</span><select value={state} onChange={(event) => { setState(event.target.value as ReviewState); setDirty(true); }}>{reviewStates.map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label>
        <label><span>Evidence used {evidenceRequired ? "(required)" : ""}</span><select value={evidence} required={evidenceRequired} onChange={(event) => { setEvidence(event.target.value); setDirty(true); }}><option value="">No evidence selected</option><option value="No source available in current synthetic workspace">No source available in current synthetic workspace</option>{patient.facts.map((fact) => <option key={fact.id} value={`${fact.sourceLabel}: ${fact.value}`}>{fact.label} · {fact.sourceType}</option>)}</select></label>
        <label className="wide"><span>Reviewer note</span><input value={note} onChange={(event) => { setNote(event.target.value); setDirty(true); }} placeholder="Record what the human reviewer checked; do not infer missing values" /></label>
        <div className="criterion-actions"><button className="button primary" type="submit" disabled={(evidenceRequired && !evidence) || !dirty}>Save human review</button>{state === "Needs clarification" && !dirty ? <button className="button secondary" type="button" onClick={() => setTaskId(addMissingInformationTask(patient.id, trial.id, criterion.id))}>Create missing-information task</button> : null}</div>
      </form>
      <footer>
        {dirty ? <span><strong>Unsaved change</strong> · reviewer/date/evidence unchanged</span> : current ? <><span><strong>{current.reviewer}</strong> · {current.reviewedAt}</span><span>Evidence: {current.evidence ?? "None recorded"}</span></> : <span><strong>Not reviewed</strong> · no reviewer, date, or evidence</span>}
        {taskId ? <StatusChip tone="attention">Task {taskId} created explicitly by a person</StatusChip> : null}
      </footer>
    </article>
  );
}

export function PatientTrialReviewPage() {
  const { patientId, trialId } = useParams();
  const [searchParams] = useSearchParams();
  const { patients, reviews } = useAppState();
  const { findTrial, status } = useTrialData();
  const patient = patients.find((candidate) => candidate.id === patientId);
  const trial = findTrial(trialId);
  const requestedCriterion = searchParams.get("criterion");

  useEffect(() => {
    if (!requestedCriterion || status !== "ready") return;
    const timeout = window.setTimeout(() => document.getElementById(requestedCriterion)?.focus({ preventScroll: false }), 0);
    return () => window.clearTimeout(timeout);
  }, [requestedCriterion, status]);

  if (status === "loading") {
    return <div className="page"><EmptyState icon="source" title="Loading review source">Retrieving the complete registry criteria.</EmptyState></div>;
  }

  if (!patient || !trial) {
    return <div className="page"><EmptyState icon="warning" title="Review context not found">Both a browser-only patient workspace and a public trial record are required.</EmptyState></div>;
  }

  const criteria = criterionExcerpts(trial);
  const review = reviews.find((candidate) => candidate.patientId === patient.id && candidate.trialId === trial.id);
  const reviewedCount = criteria.filter((criterion) => review?.criteria[criterion.id]?.state && review.criteria[criterion.id]?.state !== "Not reviewed").length;
  const notReviewedCount = criteria.length - reviewedCount;
  const approvedResearch = patient.dataBoundary === "Approved de-identified research";

  return (
    <div className="page review-page">
      <Link className="back-link" to={`/patients/${patient.id}?section=reviews`}>← Back to {patient.label}</Link>
      <PageHeader eyebrow={`${patient.id} × ${trial.id}`} title="Patient–Trial Review" description="A clinician records criterion-level observations from named source-labelled facts. Trial Relay provides no aggregate score, fit label, ranking, recommendation, or eligibility conclusion." actions={<a className="button secondary" href={trial.sourceUrl} target="_blank" rel="noreferrer">Open complete source <Icon name="external" /></a>} />
      <SafetyNote><p><strong>Clinician-led review, not matching.</strong> This trial was selected explicitly. {approvedResearch ? <>The workspace contains institutionally approved de-identified research facts held only in this browser and excluded from the AI assistant.</> : <>The workspace contains synthetic demonstration facts.</>} Every unknown remains unknown until a human reviewer records a sourced state; no criterion or overall conclusion is inferred.</p></SafetyNote>

      <section className="review-completeness" aria-labelledby="completeness-heading">
        <div><p className="eyebrow">Completeness</p><h2 id="completeness-heading">{reviewedCount} of {criteria.length} retained registry criteria reviewed</h2><p><strong>{notReviewedCount} remain Not reviewed.</strong> A partial review is never presented as a complete protocol assessment.</p></div>
        <div className="completion-meter" aria-label={`${reviewedCount} of ${criteria.length} criteria reviewed`}><span style={{ width: `${criteria.length ? (reviewedCount / criteria.length) * 100 : 0}%` }} /></div>
        <StatusChip tone={notReviewedCount === 0 ? "good" : "attention"}>{notReviewedCount === 0 ? "All displayed excerpts reviewed" : "Incomplete review"}</StatusChip>
      </section>

      <div className="review-layout">
        <section className="criteria-column" aria-labelledby="criteria-heading">
          <div className="section-heading"><div><p className="eyebrow">Complete retained registry criteria</p><h2 id="criteria-heading">Exact source excerpts</h2><p>Text is segmented at registry bullets for review but is not rewritten or interpreted.</p></div><StatusChip tone="source">{criteria.length} source excerpts</StatusChip></div>
          {criteria.map((criterion) => <CriterionRow key={criterion.id} criterion={criterion} current={review?.criteria[criterion.id]} patient={patient} trial={trial} />)}
        </section>
        <aside className="review-source-panel" aria-labelledby="patient-evidence-heading"><p className="eyebrow">Synthetic patient evidence</p><h2 id="patient-evidence-heading">Available facts</h2>{patient.facts.map((fact) => <article key={fact.id}><span>{fact.label}</span><strong>{fact.value}</strong><SourceBadge source={fact.sourceType} /><small>{fact.sourceLabel}</small></article>)}</aside>
      </div>
    </div>
  );
}
