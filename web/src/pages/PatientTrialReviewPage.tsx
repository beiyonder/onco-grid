import { useEffect, useState } from "react";
import { Link, useBlocker, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/Primitives";
import { AssessmentVector } from "../components/MatchingResults";
import { SupportedReview } from "../components/SupportedReview";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import { usePiAccess } from "../state/usePiAccess";
import { isAssessmentCurrent } from "../domain/workflow";
import { criterionInformationNeeds } from "../domain/informationNeeds";
import { demoFields } from "../domain/patients";
import type { HumanReview } from "../domain/model";

export function PatientTrialReviewPage() {
  const { patientId, trialId } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { state, command, error } = useWorkflow();
  const { roleId, setRoleId } = useAppState();
  const { findTrial } = useTrialData();
  const pi = usePiAccess();
  const patient = state.patients.find((p) => p.id === patientId);
  const trial = findTrial(trialId);
  const assessment = state.runs.flatMap((r) => r.assessments).find((a) => a.id === params.get("assessment"));
  const model = assessment?.modelSnapshot;
  const [filter, setFilter] = useState("auto");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");
  const [decision, setDecision] = useState<HumanReview["decision"]>("accept");
  const [dirty, setDirty] = useState(false);
  const blocker = useBlocker(dirty);
  const attention = assessment?.findings.filter((f) => f.state !== "supported").length ?? 0;
  const activeFilter = filter === "auto" ? attention ? "attention" : "all" : filter;
  const findings = assessment?.findings.filter((f) => activeFilter === "all" || (activeFilter === "attention" && f.state !== "supported") || (activeFilter === "supported" && f.state === "supported")) ?? [];
  const selected = findings.find((f) => f.criterionId === params.get("criterion")) ?? findings[0];
  const criterion = model?.criteria.find((c) => c.id === selected?.criterionId);
  useEffect(() => {
    if (!dirty) return;
    const guard = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);
  useEffect(() => {
    setReason(""); setEvidence(""); setDecision("accept");
    document.getElementById("selected-criterion-heading")?.focus({ preventScroll: true });
  }, [selected?.criterionId, assessment?.id]);
  if (!patient || !trial || !assessment || assessment.patientId !== patient.id || assessment.trialId !== trial.id || !model)
    return <div className="page"><EmptyState icon="warning" title="Assessment not available" action={<Link to={`/patients/${patientId}?section=matches`}>Return to patient matching</Link>}>Run patient matching first. Browser-only assessments reset on reload.</EmptyState></div>;
  const current = isAssessmentCurrent(state, assessment);
  const editable = current && (roleId === "oncologist" || roleId === "site");
  const reviewed = new Set(state.reviews.filter((r) => r.assessmentId === assessment.id).map((r) => r.criterionId));
  const remaining = assessment.findings.filter((f) => !reviewed.has(f.criterionId)).length;
  const returnParams = new URLSearchParams();
  for (const key of ["run", "matchFilter", "scope", "trial"]) if (params.has(key)) returnParams.set(key, params.get(key)!);
  const returnQuery = returnParams.toString();
  const teamView = params.get("from") === "studies" && pi.canAccess(trial.id);
  const existingReferral = state.referrals.find((r) => r.patientId === patient.id && r.trialId === trial.id && !["Closed", "Withdrawn"].includes(r.state));
  const selectCriterion = (id: string) => { const next = new URLSearchParams(params); next.set("criterion", id); setParams(next, { replace: true }); };
  const reviewHistory = state.reviews.filter((r) => r.assessmentId === assessment.id && r.criterionId === criterion?.id);
  const openReferral = () => {
    if (existingReferral || command({ type: "create-referral", assessmentId: assessment.id })) {
      const target = new URLSearchParams(params);
      if (existingReferral) target.set("referral", existingReferral.id); else target.delete("from");
      navigate(`/patients/${patient.id}/referrals/${trial.id}?${target.toString()}`);
    }
  };
  return <div className="page review-page review-desk">
    <Link className="back-link" to={teamView ? `/studies?trial=${trial.id}&${returnQuery}` : `/patients/${patient.id}?section=matches&${returnQuery}`}>Back to {teamView ? "PI candidates" : `${patient.label} matches`}</Link>
    <header className="review-heading"><div><p>{patient.label} / {trial.id} · {patient.condition}</p><h1>Review for referral</h1></div><div><AssessmentVector assessment={assessment} /><small>Synthetic evidence · Nothing transmitted</small></div></header>
    <ol className="referral-steps" aria-label="Referral workflow"><li aria-current="step">Review evidence</li><li>Prepare referral</li><li>Team conversation</li></ol>
    <div className="review-progress"><div><strong>{reviewed.size} of {assessment.findings.length} reviewed</strong><span>{remaining ? `${remaining} decisions left before referral preparation` : "Review complete. The study team reviews your referral next."}</span></div><button className="button primary" disabled={dirty || (!existingReferral && (!editable || remaining > 0))} onClick={openReferral}>{existingReferral ? "Open referral conversation" : "Prepare referral"}</button></div>
    {!current && <p className="stale-label" role="status">This assessment is historical or its source check expired. <Link to={`/patients/${patient.id}?section=matches&scope=selected&trial=${trial.id}`}>Rerun matching</Link> before recording decisions or preparing a referral.</p>}
    {current && !editable && <div className="review-role-notice"><p>You are viewing as {roleId === "auditor" ? "an auditor" : "a coordinator"}. An oncologist records the clinical review.</p>{roleId !== "auditor" && <button className="button secondary" onClick={() => setRoleId("oncologist")}>Use oncologist demo role</button>}<small>Demo role only; this does not grant PI access.</small></div>}
    {error && <p className="form-error" role="alert">{error}</p>}
    {blocker.state === "blocked" && <div className="surface reading-surface" role="alertdialog" aria-label="Unsaved review"><p>Discard the unsaved decision and leave?</p><button className="button secondary" onClick={() => { setDirty(false); blocker.proceed(); }}>Discard and leave</button><button className="button primary" onClick={() => blocker.reset()}>Keep editing</button></div>}
    <div className="review-tools"><div className="segmented-control" aria-label="Criterion filter">{([["all", "All criteria"], ["attention", `Needs attention (${attention})`], ["supported", "Supported"]] as const).map(([value, label]) => <button key={value} aria-pressed={activeFilter === value} className={activeFilter === value ? "active" : ""} disabled={dirty} onClick={() => setFilter(value)}>{label}</button>)}</div><span role="status">{dirty ? "Unsaved decision" : "Decisions saved in this session"}</span></div>
    <SupportedReview key={assessment.id} assessment={assessment} disabled={!editable || dirty} />
    <div className="criterion-workbench">
      <nav aria-label="Assessment criteria">{findings.map((finding, index) => <button key={finding.criterionId} className={selected?.criterionId === finding.criterionId ? "active" : ""} aria-current={selected?.criterionId === finding.criterionId ? "true" : undefined} disabled={dirty} onClick={() => selectCriterion(finding.criterionId)}><span className="criterion-number">{index + 1}</span><span><strong>{model.criteria.find((c) => c.id === finding.criterionId)?.wording}</strong><small>{finding.state} · {reviewed.has(finding.criterionId) ? "Reviewed" : "Review needed"}</small></span></button>)}</nav>
      {selected && criterion ? <article className="criterion-inspector">
        <header><span className={`finding-state ${selected.state}`}>{selected.state === "supported" ? "Evidence supports this requirement" : selected.state === "violated" ? "Conflict to review" : selected.state === "unresolved" ? "Evidence needs clarification" : "Not applicable"}</span><h2 id="selected-criterion-heading" tabIndex={-1}>{criterion.wording}</h2></header>
        <section className="review-evidence"><h3>Patient evidence</h3>{selected.trace.assertionIds.length ? selected.trace.assertionIds.map((id) => { const assertion = assessment.assertionSnapshot.find((a) => a.id === id); return assertion ? <div className="review-evidence-row" key={id}><div><strong>{assertion.raw}</strong><small>{assertion.authority} at evaluation · {assertion.observedAt}</small></div><Link to={`/patients/${patient.id}?section=sources&source=${encodeURIComponent(assertion.artifactId)}&locator=${encodeURIComponent(assertion.locator)}&returnAssessment=${encodeURIComponent(assessment.id)}&returnCriterion=${encodeURIComponent(criterion.id)}&from=${params.get("from") ?? "patient"}&${returnQuery}`}>View original</Link></div> : <p key={id}>Historical assertion unavailable.</p>; }) : <p>No patient evidence supports this finding. Review the source and request the missing information.</p>}</section>
        {selected.state === "unresolved" && <details className="review-information"><summary>Request missing information</summary>{criterionInformationNeeds(criterion, patient, assessment.evaluatedAt).filter((need) => demoFields.some((field) => field.concept === need.concept)).map(({ concept, timeWindow }, index) => <button className="button secondary" key={`${concept}:${index}`} disabled={!current || roleId === "auditor"} onClick={() => command({ type: "accept-gap", assessmentId: assessment.id, criterionId: criterion.id, concept, timeWindow, owner: "A. Rao" })}>Clarify {demoFields.find((field) => field.concept === concept)?.label}</button>)}<Link to={`/patients/${patient.id}?section=tasks`}>Open patient tasks</Link></details>}
        <form className="review-decision" onSubmit={(event) => { event.preventDefault(); if (command({ type: "review", review: { assessmentId: assessment.id, criterionId: criterion.id, decision, reason, evidence } })) { setDirty(false); setReason(""); setEvidence(""); const next = findings.find((f) => f.criterionId !== criterion.id && !reviewed.has(f.criterionId)); if (next) selectCriterion(next.criterionId); } }}>
          <h3>{reviewed.has(criterion.id) ? "Update your review" : "Your review"}</h3>
          <label>Decision<select disabled={!editable} value={decision} onChange={(event) => { setDecision(event.target.value as HumanReview["decision"]); setDirty(true); }}><option value="accept">Acknowledge finding</option><option value="override">Record a differing view</option><option value="defer">Request clarification</option></select></label>
          <details className="review-notes" open={decision === "override"}><summary>Add a review note or evidence reference</summary>
          <div className="review-reason-fields"><label>{decision === "override" ? "Reason (required)" : "Review note (optional)"}<textarea rows={2} disabled={!editable} required={decision === "override"} value={reason} maxLength={500} onChange={(event) => { setReason(event.target.value); setDirty(true); }} /></label><label>Evidence reference{decision !== "override" && " (optional)"}<input disabled={!editable} required={decision === "override"} value={evidence} maxLength={240} onChange={(event) => { setEvidence(event.target.value); setDirty(true); }} /></label></div>
          </details>
          <div className="review-decision-actions"><button className="button primary" disabled={!editable}>Save review & continue</button>{dirty && <button className="button quiet" type="button" onClick={() => { setDirty(false); setReason(""); setEvidence(""); setDecision("accept"); }}>Discard changes</button>}{reviewHistory.length > 0 && <small>Last decision: {reviewHistory.at(-1)?.decision}</small>}</div>
        </form>
        <details className="review-technical"><summary>Registry source, logic & review history</summary><a href={model.sourceUrl} target="_blank" rel="noreferrer">Open official registry source</a><p>Record v{assessment.patientVersion} · model v{assessment.modelVersion} · evaluated {assessment.evaluatedAt}. Source characters {criterion.sourceStart}–{criterion.sourceEnd} · {assessment.sourceVersion}.</p><p>{selected.trace.explanation}</p><pre>{JSON.stringify({ predicate: criterion.predicate, trace: selected.trace }, null, 2)}</pre>{reviewHistory.map((review, index) => <p key={index}>{review.decision} · {review.author} · {review.recordedAt} · {review.reason} · {review.evidence}</p>)}</details>
      </article> : <div className="review-filter-empty"><h2>No criteria need attention in this view</h2><p>Review supported findings before preparing a referral.</p><button className="button secondary" onClick={() => setFilter("all")}>Show all criteria</button></div>}
    </div>
    <footer className="review-next">
      <div><strong>{existingReferral ? "A referral is already in progress" : remaining ? "Finish the evidence review" : "Ready to prepare your referral"}</strong><p>{existingReferral ? `${existingReferral.state} · ${existingReferral.teamOwner}` : remaining ? "Each finding needs a recorded human decision. Supported findings can be reviewed together." : "The PI team reviews the referral after you queue it—not before."}</p></div>
      <button className="button quiet" disabled={!editable || dirty} onClick={() => command({ type: "shortlist", assessmentId: assessment.id })}>{state.shortlist.includes(assessment.id) ? "Remove from shortlist" : "Save to shortlist"}</button>
    </footer>
  </div>;
}
