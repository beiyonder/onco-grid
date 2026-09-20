import { Link, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, SourceBadge, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";

const sections = ["overview", "sources", "reviews", "tasks", "handoffs"] as const;
type PatientSection = (typeof sections)[number];

export function PatientWorkspacePage() {
  const { patientId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { advanceSimulatedHandoff, handoffs, patients, workItems } = useAppState();
  const { findTrial, status: trialDataStatus } = useTrialData();
  const patient = patients.find((candidate) => candidate.id === patientId);
  const requestedSection = searchParams.get("section") as PatientSection | null;
  const section: PatientSection = requestedSection && sections.includes(requestedSection) ? requestedSection : "overview";

  if (!patient) {
    return <div className="page"><EmptyState icon="warning" title="Synthetic workspace not found">This browser session does not contain the requested workspace.</EmptyState></div>;
  }

  const patientTasks = workItems.filter((item) => item.route.includes(patient.id) && item.kind === "task");
  const patientHandoffs = handoffs.filter((handoff) => handoff.patientId === patient.id);

  return (
    <div className="page patient-page">
      <Link className="back-link" to="/patients">← Back to Patient Workspaces</Link>
      <PageHeader
        eyebrow={`${patient.id} · Synthetic demo data`}
        title={patient.label}
        description={`${patient.context} · owned by ${patient.owner} at ${patient.institution}`}
        actions={<Link className="button secondary" to={`/trials?reviewFor=${patient.id}`}>Find trials to review manually</Link>}
      />
      <SafetyNote><p><strong>EMR remains the clinical system of record.</strong> These are source-labelled synthetic facts and browser-memory workflow states. Trial Relay does not infer diagnosis, stage, biomarkers, response, risk, fit, or eligibility.</p></SafetyNote>
      <nav className="section-tabs" aria-label="Patient workspace sections">
        {sections.map((candidate) => <button className={section === candidate ? "active" : ""} type="button" key={candidate} onClick={() => {
          const next = new URLSearchParams(searchParams);
          if (candidate === "overview") next.delete("section"); else next.set("section", candidate);
          setSearchParams(next);
        }}>{candidate.charAt(0).toUpperCase() + candidate.slice(1)}</button>)}
      </nav>

      {section === "overview" ? <section className="workspace-section" aria-labelledby="overview-heading">
        <div className="section-heading"><div><p className="eyebrow">At a glance</p><h2 id="overview-heading">Workspace overview</h2></div><StatusChip tone="human">Synthetic only</StatusChip></div>
        <div className="fact-grid">{patient.facts.slice(0, 4).map((fact) => <article className="fact-card" key={fact.id}><span>{fact.label}</span><strong>{fact.value}</strong><SourceBadge source={fact.sourceType} /><small>{fact.sourceLabel}</small></article>)}</div>
      </section> : null}

      {section === "sources" ? <section className="workspace-section" aria-labelledby="sources-heading">
        <div className="section-heading"><div><p className="eyebrow">Fact-level provenance</p><h2 id="sources-heading">Sources</h2></div><StatusChip tone="source">{patient.facts.length} facts</StatusChip></div>
        <div className="source-fact-list">{patient.facts.map((fact) => <article key={fact.id}><div><span>{fact.label}</span><strong>{fact.value}</strong></div><div><SourceBadge source={fact.sourceType} /><span>{fact.sourceLabel}</span><time>{fact.recordedAt}</time></div></article>)}</div>
      </section> : null}

      {section === "reviews" ? <section className="workspace-section" aria-labelledby="reviews-heading">
        <div className="section-heading"><div><p className="eyebrow">Clinician-selected only</p><h2 id="reviews-heading">Patient–Trial Reviews</h2></div><Link className="button secondary" to={`/trials?reviewFor=${patient.id}`}>Select from general library</Link></div>
        {trialDataStatus === "loading" ? <EmptyState icon="source" title="Loading public trial source">Review links appear after the dated registry snapshot loads.</EmptyState> : patient.reviewTrialIds.length ? <div className="review-card-list">{patient.reviewTrialIds.map((trialId) => { const trial = findTrial(trialId); return trial ? <Link className="review-card" key={trialId} to={`/patients/${patient.id}/reviews/${trial.id}`}><span><code>{trial.id}</code><strong>{trial.briefTitle}</strong><small>Selected manually by the treating team · no recommendation</small></span><Icon name="arrow" /></Link> : null; })}</div> : <EmptyState icon="trials" title="No trial selected for review">Open the general Trial Library and choose a record manually. The product does not rank or recommend trials for this workspace.</EmptyState>}
      </section> : null}

      {section === "tasks" ? <section className="workspace-section" aria-labelledby="tasks-heading">
        <div className="section-heading"><div><p className="eyebrow">Human-created work</p><h2 id="tasks-heading">Tasks</h2></div><StatusChip tone="attention">{patientTasks.filter((item) => item.status !== "resolved").length} open</StatusChip></div>
        {patientTasks.length ? <div className="work-list">{patientTasks.map((item) => <article key={item.id}><Icon name="task" /><span><strong>{item.title}</strong><small>{item.summary}</small><span>{item.owner} · {item.id}</span></span><StatusChip tone={item.status === "resolved" ? "good" : "attention"}>{item.status}</StatusChip></article>)}</div> : <EmptyState icon="task" title="No owned tasks">Unknown source states remain unknown until a person explicitly creates or accepts work.</EmptyState>}
      </section> : null}

      {section === "handoffs" ? <section className="workspace-section" aria-labelledby="handoffs-heading">
        <div className="section-heading"><div><p className="eyebrow">Demonstration state only</p><h2 id="handoffs-heading">Simulated handoffs</h2></div></div>
        <div className="handoff-warning"><Icon name="warning" /><p><strong>Nothing is sent from this prototype.</strong> These controls only simulate owner, approval, and acknowledgement states in browser memory. They do not contact a site, transmit records, or persist after reload.</p></div>
        {patientHandoffs.map((handoff) => <article className="handoff-card" key={handoff.id}><span><code>{handoff.id}</code><strong>Simulation state: {handoff.state}</strong><small>Owner: {handoff.owner} · trial {handoff.trialId} · nothing transmitted</small></span><div className="handoff-actions"><StatusChip tone="human">Not sent · simulated</StatusChip>{handoff.state !== "Simulated acknowledgement" ? <button className="button secondary" type="button" onClick={() => advanceSimulatedHandoff(handoff.id)}>{handoff.state === "Draft" ? "Simulate ready state" : "Simulate acknowledgement"}</button> : null}</div></article>)}
      </section> : null}
    </div>
  );
}
