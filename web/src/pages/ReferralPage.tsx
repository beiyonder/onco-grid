import { useEffect, useState } from "react";
import { Link, useBlocker, useParams, useSearchParams } from "react-router-dom";
import { EmptyState, StatusChip } from "../components/Primitives";
import { useWorkflow } from "../state/WorkflowState";
import { useAppState } from "../state/AppState";
import { usePiAccess } from "../state/usePiAccess";
import { isAssessmentCurrent } from "../domain/workflow";
import type { SyntheticReferral } from "../domain/model";

export function ReferralList({ patientId, trialId, team = false }: { patientId?: string; trialId?: string; team?: boolean }) {
  const { state } = useWorkflow();
  const pi = usePiAccess();
  const referrals = state.referrals.filter((r) => (!patientId || r.patientId === patientId) && (!trialId || r.trialId === trialId) && (!team || (pi.canAccess(r.trialId) && r.state !== "Draft"))).reverse();
  return <section className="referral-list"><header><h2>{team ? "Referrals from oncologists" : "Patient referrals"}</h2><p>Reviewed packet, named owner and one shared conversation. Browser-only synthetic workflow.</p></header>{referrals.length ? referrals.map((referral) => <Link className="referral-list-row" key={referral.id} to={`/patients/${referral.patientId}/referrals/${referral.trialId}?referral=${referral.id}${team ? "&from=studies" : ""}`}><div><strong>{state.patients.find((p) => p.id === referral.patientId)?.label} / {referral.trialId}</strong><small>{referral.teamOwner} · {referral.events.at(-1)?.kind ?? "Draft packet"}</small></div><StatusChip tone={referral.state === "Needs information" ? "attention" : "neutral"}>{referral.state}</StatusChip><span>Open conversation</span></Link>) : <p className="referral-list-empty">{team ? "No referrals have been queued for this study." : "Start from a patient's trial matches, record the evidence review, then prepare a referral."}</p>}</section>;
}

export function ReferralPage() {
  const { patientId, trialId } = useParams();
  const [params] = useSearchParams();
  const { state, command, error } = useWorkflow();
  const { roleId } = useAppState();
  const pi = usePiAccess();
  const team = params.get("from") === "studies";
  const referrals = state.referrals.filter((r) => r.patientId === patientId && r.trialId === trialId);
  const referral = params.has("referral") ? referrals.find((r) => r.id === params.get("referral")) : referrals.at(-1);
  const patient = state.patients.find((p) => p.id === patientId);
  const assessment = state.runs.flatMap((r) => r.assessments).find((a) => a.id === referral?.assessmentId);
  const [body, setBody] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [owner, setOwner] = useState<SyntheticReferral["teamOwner"]>("Study coordinator");
  const [replacement, setReplacement] = useState("");
  const blocker = useBlocker(body.trim().length > 0);
  useEffect(() => {
    if (!body.trim()) return;
    const guard = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [body]);
  if (team && !pi.canAccess(trialId)) return <div className="page"><EmptyState icon="lock" title="Study-team access required" action={<Link to={`/patients/${patientId}?section=handoffs`}>Return to patient referrals</Link>}>Sign in with an explicit grant for this study. The prototype role does not grant access.</EmptyState></div>;
  if (!referral || !patient || !assessment || (team && referral.state === "Draft")) return <div className="page"><EmptyState icon="handoff" title="Referral not available" action={<Link to={`/patients/${patientId}?section=matches`}>Open patient matches</Link>}>Prepare a reviewed referral first. Local records reset on reload; a draft is not yet visible in the study-team queue.</EmptyState></div>;
  const current = isAssessmentCurrent(state, assessment);
  const closed = ["Closed", "Withdrawn"].includes(referral.state);
  const editable = !closed && (team ? pi.canAccess(referral.trialId) : roleId !== "auditor");
  const composing = !team && ["Draft", "Needs information"].includes(referral.state);
  const action = (value: "queue" | "acknowledge" | "request-information" | "ready" | "close" | "withdraw" | "assign") => {
    if (command({ type: "referral-action", id: referral.id, action: value, body, owner, confirmed })) { setBody(""); setConfirmed(false); }
  };
  const reviewRun = state.runs.find((run) => run.assessments.some((a) => a.id === assessment.id));
  const reviewUrl = `/patients/${patient.id}/reviews/${referral.trialId}?assessment=${encodeURIComponent(assessment.id)}&scope=selected&trial=${referral.trialId}&run=${reviewRun?.id ?? ""}${team ? "&from=studies" : ""}`;
  const alternatives = state.runs.flatMap((run) => run.assessments).filter((a) => a.patientId === patient.id && a.trialId === referral.trialId && a.id !== assessment.id && isAssessmentCurrent(state, a) && a.findings.every((finding) => state.reviews.some((review) => review.assessmentId === a.id && review.criterionId === finding.criterionId)));
  return <div className={`page referral-page${referral.state === "Draft" ? " referral-draft" : ""}`}>
    <Link className="back-link" to={team ? `/studies?trial=${referral.trialId}` : `/patients/${patient.id}?section=handoffs`}>Back to {team ? "study referrals" : `${patient.label} referrals`}</Link>
    <header className="review-heading"><div><p>{patient.label} / {referral.trialId}</p><h1>{referral.state === "Draft" ? "Prepare referral" : "Referral conversation"}</h1><p>Synthetic patient · Local demo only · No external delivery</p></div><StatusChip tone={referral.state === "Needs information" ? "attention" : "human"}>{referral.state}</StatusChip></header>
    <ol className="referral-steps" aria-label="Referral workflow"><li>Evidence reviewed</li><li aria-current={referral.state === "Draft" ? "step" : undefined}>Prepare referral</li><li aria-current={referral.state !== "Draft" ? "step" : undefined}>Team conversation</li></ol>
    {error && <p className="form-error" role="alert">{error}</p>}
    {blocker.state === "blocked" && <div className="surface reading-surface" role="alertdialog" aria-label="Unsent referral message"><p>Leave and discard the unsent message?</p><button className="button secondary" onClick={() => { setBody(""); blocker.proceed(); }}>Discard and leave</button><button className="button primary" onClick={() => blocker.reset()}>Keep writing</button></div>}
    {!current && <p className="stale-label">The attached assessment is no longer current. Conversation and withdrawal remain available; queueing and screening readiness are blocked. <Link to={`/patients/${patient.id}?section=matches&scope=selected&trial=${referral.trialId}`}>Rerun patient matching</Link>, review the new findings and attach the updated assessment below.</p>}
    <div className="referral-layout"><aside className="referral-packet">
      <h2>Referral packet</h2><dl><dt>Referring oncologist</dt><dd>{referral.author} · demo</dd><dt>Destination</dt><dd>Study team for {referral.trialId}<small>Demonstration destination, not a verified site contact</small></dd><dt>Team owner</dt><dd>{referral.teamOwner}</dd><dt>Patient context</dt><dd>{patient.condition}</dd><dt>Record / model</dt><dd>v{assessment.patientVersion} / v{assessment.modelVersion} · {assessment.evaluatedAt}</dd><dt>Registry status</dt><dd>{assessment.registryCheck?.overallStatus?.replaceAll("_", " ").toLowerCase() ?? "Reference snapshot — not a live availability check"}</dd></dl>
      {assessment.registryCheck?.overallStatus && assessment.registryCheck.overallStatus !== "RECRUITING" && <p className="source-notes">The registry does not report this study as recruiting. This packet does not confirm recruitment or slots.</p>}
      <div className="referral-coverage"><strong>{assessment.score === null ? "Not evaluated — no support score" : `${assessment.supported}/${assessment.denominator} requirements supported`}</strong><span>{assessment.violated} conflicts · {assessment.unresolved} unresolved</span><span>{referral.reviews.length} human reviews attached</span></div>
      <details><summary>Attached findings & decisions</summary>{assessment.findings.map((finding) => { const review = referral.reviews.find((r) => r.criterionId === finding.criterionId); return <div className="packet-finding" key={finding.criterionId}><strong>{assessment.modelSnapshot.criteria.find((c) => c.id === finding.criterionId)?.wording}</strong><p>{finding.state} · Human decision: {review?.decision}</p>{review?.reason && <p>{review.reason}</p>}{review?.evidence && <p>Evidence: {review.evidence}</p>}</div>; })}</details>
      <Link className="button secondary" to={reviewUrl}>Open evidence review</Link>
      {composing && alternatives.length > 0 && <form className="referral-refresh" onSubmit={(event) => { event.preventDefault(); if (command({ type: "refresh-referral", id: referral.id, assessmentId: replacement })) setReplacement(""); }}><label>Updated reviewed assessment<select required value={replacement} onChange={(event) => setReplacement(event.target.value)}><option value="">Select reviewed run</option>{alternatives.map((a) => <option key={a.id} value={a.id}>Record v{a.patientVersion} / model v{a.modelVersion} · {state.runs.find((r) => r.assessments.some((item) => item.id === a.id))?.startedAt}</option>)}</select></label><button className="button secondary" disabled={!editable || !replacement}>Attach updated packet</button></form>}
      <small>Source assertions, automated findings and human decisions remain distinct. Readiness is not eligibility.</small>
    </aside><section className="referral-conversation">
      <header><h2>{referral.state === "Draft" ? "Introduce the referral" : "Oncologist & study team"}</h2><p>{team ? `Study-team view · ${pi.actor}` : "Referring-team view"}</p></header>
      <div className="referral-next-owner" role="status"><strong>{referral.state === "Draft" ? "Next: referring oncologist" : referral.state === "Needs information" ? "Next: referring team" : closed ? "Conversation closed" : `Next: ${referral.teamOwner}`}</strong><span>{referral.state === "Draft" ? "Review the packet and write the request." : referral.state === "Needs information" ? "Answer the team's request; attach reviewed evidence if it changed, then return the referral." : referral.state === "Awaiting team" ? "Waiting for the study team to acknowledge this local referral." : referral.state === "Ready for site screening" ? "The team recorded operational readiness, not final eligibility or an appointment." : closed ? "The recorded history remains available." : "The team owns the next response."}</span></div>
      <ol className="referral-timeline">{referral.events.map((event) => <li className={event.side} key={event.id}><header><strong>{event.author}</strong><span>{event.side === "team" ? "Study team" : "Referring team"} · {new Date(event.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></header><small>{event.kind}</small><p>{event.body}</p></li>)}</ol>
      {editable && <form className="referral-compose" onSubmit={(event) => { event.preventDefault(); if (composing) action("queue"); else if (command({ type: "referral-message", id: referral.id, side: team ? "team" : "referrer", body })) setBody(""); }}>
        <label>{composing ? referral.state === "Draft" ? "Request to the study team" : "Response to the information request" : "Shared message"}<textarea required rows={3} maxLength={1000} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Use synthetic details only. Everyone in this local referral can read the conversation." /></label>
        {composing && <label className="check-control"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />I reviewed the packet, including gaps and registry status. Queue this referral only in the local demo.</label>}
        <button className="button primary" disabled={!body.trim() || (composing && (!confirmed || !current))}>{composing ? referral.state === "Draft" ? "Queue demo referral" : "Return information to team" : "Add shared message"}</button>
        {team && <div className="referral-team-actions"><p>Use the message above as the recorded reason for a team action.</p>{referral.state === "Awaiting team" && <button type="button" className="button secondary" disabled={!body.trim()} onClick={() => action("acknowledge")}>Acknowledge & take review</button>}{["In review", "Ready for site screening"].includes(referral.state) && <button type="button" className="button secondary" disabled={!body.trim()} onClick={() => action("request-information")}>Request information</button>}{referral.state === "In review" && <button type="button" className="button secondary" disabled={!body.trim() || !current} onClick={() => action("ready")}>Record ready for site screening</button>}<label>Team owner<select value={owner} onChange={(event) => setOwner(event.target.value as SyntheticReferral["teamOwner"])}><option>Study coordinator</option><option>Principal investigator</option></select></label><button type="button" className="button secondary" disabled={!body.trim()} onClick={() => action("assign")}>Assign owner</button><button type="button" className="button quiet" disabled={!body.trim()} onClick={() => action("close")}>Close with reason</button></div>}
        {!team && <button type="button" className="button quiet" disabled={!body.trim()} onClick={() => action("withdraw")}>Withdraw with reason</button>}
      </form>}
      {!team && !closed && <p className="referral-access-note">PI-team actions are available only to signed-in staff with a grant for this study. No automatic or simulated team response is generated.</p>}
      {closed && <Link to={`/patients/${patient.id}?section=matches&scope=selected&trial=${referral.trialId}`}>Return to patient matching</Link>}
    </section></div>
  </div>;
}
