import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { formatSourceDate } from "../data/trials";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";
import type { RoleId } from "../types";

const roleHomeCopy: Record<RoleId, { title: string; description: string }> = {
  coordinator: {
    title: "Keep source work and handoffs moving",
    description: "Review owned source retrieval, room questions, registry updates, and simulated handoff states without turning every unknown into a task.",
  },
  oncologist: {
    title: "Review evidence and human responses",
    description: "Open source-linked criterion work and authorised trial-side replies. Trial Relay records your review but never determines fit or eligibility.",
  },
  site: {
    title: "Answer within the trial-side authority boundary",
    description: "Separate general discussion from an authorised operational response. No site availability is inferred from registry recruitment.",
  },
  auditor: {
    title: "Inspect provenance and human ownership",
    description: "Trace public source assertions, synthetic workflow state, named reviewers, and explicit unresolved work without changing it.",
  },
};

export function HomePage() {
  const { patients, role, roleId, workItems } = useAppState();
  const { error, retry, snapshot, status } = useTrialData();
  const sourceDate = snapshot ? formatSourceDate(snapshot.source.dataTimestamp) : null;
  const ownedAttention = workItems.filter((item) => item.status !== "resolved" && item.roleIds.includes(roleId));
  const roleCopy = roleHomeCopy[roleId];

  return (
    <div className="page home-page">
      <PageHeader
        eyebrow={`${role.title} view`}
        title={roleCopy.title}
        description={roleCopy.description}
      />
      {status === "error" ? <div className="source-error" role="alert"><Icon name="warning" /><span><strong>Public trial records could not be loaded.</strong><small>{error}</small></span><button className="button secondary" type="button" onClick={retry}>Retry source</button></div> : null}

      <section className="journey-grid" aria-label="Primary Trial Relay journeys">
        <Link className="journey-card source-layer" to="/trials">
          <span className="journey-icon"><Icon name="trials" /></span>
          <span className="eyebrow">Trial-first</span>
          <h2>Find or follow a trial</h2>
          <p>Scan {snapshot ? snapshot.retainedCount : "the dated"} India-located registry records, inspect source and site uncertainty, then ask an operational question.</p>
          <span className="journey-foot"><span>{sourceDate ? `Snapshot ${sourceDate}` : "Registry source loading"}</span><strong>Open Trials <Icon name="arrow" /></strong></span>
        </Link>
        <Link className="journey-card human-layer" to="/patients">
          <span className="journey-icon"><Icon name="patients" /></span>
          <span className="eyebrow">Patient-first</span>
          <h2>Work with a synthetic patient</h2>
          <p>Open one of {patients.length} source-labelled workspaces, choose a trial manually, and record a criterion-level human review.</p>
          <span className="journey-foot"><span>Browser-memory only</span><strong>Open Patients <Icon name="arrow" /></strong></span>
        </Link>
      </section>

      <div className="home-grid">
        <section className="surface activity-preview" aria-labelledby="attention-heading">
          <div className="section-heading">
            <div><p className="eyebrow">Current role</p><h2 id="attention-heading">Attention for {role.name}</h2></div>
            <StatusChip tone={ownedAttention.length > 0 ? "attention" : "good"}>{ownedAttention.length} open</StatusChip>
          </div>
          {ownedAttention.length === 0 ? <p className="no-role-attention"><strong>No accepted work for this role.</strong> Unknown source states remain source states until a person creates or accepts a task.</p> : null}
          {ownedAttention.slice(0, 3).map((item) => (
            <Link className="activity-row" to={item.route} key={item.id}>
              <Icon name={item.kind} />
              <span><strong>{item.title}</strong><small>{item.sourceLabel} · {item.owner}</small></span>
              <Icon name="arrow" />
            </Link>
          ))}
          <Link className="text-action" to="/inbox">Open the attention queue <Icon name="arrow" /></Link>
        </section>

        <aside className="surface source-summary" aria-labelledby="source-summary-heading">
          <p className="eyebrow">Source boundary</p>
          <h2 id="source-summary-heading">What is real here?</h2>
          <dl>
            <div><dt>Trial records</dt><dd>Public ClinicalTrials.gov snapshot</dd></div>
            <div><dt>Source date</dt><dd>{sourceDate ?? "Loading source metadata"}</dd></div>
            <div><dt>Patient and workflow data</dt><dd>Synthetic demonstration only</dd></div>
            <div><dt>Persistence</dt><dd>None; state resets on reload</dd></div>
          </dl>
        </aside>
      </div>

      <SafetyNote><p><strong>General discovery and synthetic workflow validation only.</strong> Registry status is not proof that a site can enrol today. Trial Relay does not determine eligibility, rank patients, recommend treatment, or transmit a referral.</p></SafetyNote>
    </div>
  );
}
