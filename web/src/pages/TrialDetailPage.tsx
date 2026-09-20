import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { displayConditions, displayStates, formatDate } from "../data/trials";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";

export function TrialDetailPage() {
  const { trialId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { findTrial, status } = useTrialData();
  const trial = findTrial(trialId);
  const { corrections, followedTrialIds, roomMessages, toggleFollowTrial } = useAppState();

  if (status === "loading") {
    return <div className="page"><EmptyState icon="source" title="Loading trial source">Retrieving the dated registry record.</EmptyState></div>;
  }
  if (!trial) {
    return <div className="page"><EmptyState icon="warning" title="Trial record not found">The requested identifier is not present in the dated India oncology snapshot.</EmptyState></div>;
  }

  const from = searchParams.get("from");
  const libraryRoute = from ? `/trials?${from}` : "/trials";
  const isFollowed = followedTrialIds.includes(trial.id);
  const trialMessages = roomMessages.filter((message) => message.trialId === trial.id);
  const trialCorrections = corrections.filter((correction) => correction.trialId === trial.id);

  return (
    <div className="page detail-page">
      <button className="back-link button quiet" type="button" onClick={() => navigate(libraryRoute, { state: location.state })}>← Back to Trial Library</button>
      <PageHeader
        eyebrow={`${trial.id} · ${trial.phases.join(", ") || "Phase not reported"}`}
        title={trial.briefTitle}
        description={displayConditions(trial).join(" · ")}
        actions={<><button className="button secondary" type="button" onClick={() => toggleFollowTrial(trial.id)}>{isFollowed ? "Following" : "Follow trial"}</button><Link className="button primary" to={`/trials/${trial.id}/room`}>Open Trial Room</Link></>}
      />
      <SafetyNote><p><strong>Registry status and site availability are different authorities.</strong> The public record can say recruiting while every India site remains independently unconfirmed.</p></SafetyNote>

      <div className="detail-layout">
        <div className="detail-main">
          <section className="surface status-hierarchy" aria-labelledby="status-heading">
            <div className="section-heading"><div><p className="eyebrow">Authority layers</p><h2 id="status-heading">Current status</h2></div></div>
            <div className="status-grid">
              <div className="source-status"><span>Registry-declared study status</span><strong>{trial.statusLabel}</strong><small>ClinicalTrials.gov verified {trial.statusVerifiedDate || "date not reported"}</small><StatusChip tone="source">Public source assertion</StatusChip></div>
              <div className="site-status"><span>Independent India site confirmation</span><strong>Not confirmed</strong><small>No authorised site response is stored in this browser-only validation workspace.</small><StatusChip tone="attention">Unknown is not unavailable</StatusChip></div>
            </div>
          </section>

          <section className="reading-surface" aria-labelledby="summary-heading">
            <p className="eyebrow">Registry summary</p><h2 id="summary-heading">Study overview</h2><p>{trial.briefSummary}</p>
          </section>

          <section className="surface" aria-labelledby="sites-heading">
            <div className="section-heading"><div><p className="eyebrow">Registry-listed locations</p><h2 id="sites-heading">India sites</h2></div><StatusChip tone="neutral">{trial.indiaLocations.length} listed</StatusChip></div>
            <div className="site-list">
              {trial.indiaLocations.map((location, index) => <div className="site-row" key={`${location.facility}-${index}`}><span><strong>{location.facility || "Facility not reported"}</strong><small>{[location.city, location.state].filter(Boolean).join(", ")}</small></span><span><StatusChip tone="source">Registry: {location.status || "Unknown"}</StatusChip><StatusChip tone="attention">Site: not independently confirmed</StatusChip></span></div>)}
            </div>
          </section>

          <section className="surface protocol-source" aria-labelledby="criteria-source-heading">
            <div className="section-heading"><div><p className="eyebrow">Complete retained source</p><h2 id="criteria-source-heading">Eligibility criteria</h2><p>Original registry text for human review; not interpreted by Trial Relay.</p></div><StatusChip tone="source">{trial.eligibilityCriteriaTruncated ? "Source excerpt" : "Complete retained text"}</StatusChip></div>
            <details><summary>Read registry criteria</summary><p>{trial.eligibilityCriteria}</p></details>
          </section>

          <section className="surface trial-activity" aria-labelledby="trial-activity-heading">
            <div className="section-heading"><div><p className="eyebrow">Human and source events</p><h2 id="trial-activity-heading">Activity</h2></div><Link className="button secondary" to={`/trials/${trial.id}/room`}>Open Trial Room</Link></div>
            <ol>
              <li><Icon name="update" /><span><strong>Registry source updated</strong><small>{formatDate(trial.lastUpdatePostedDate)} · {trial.source}</small></span></li>
              {trialMessages.slice().reverse().slice(0, 3).map((message) => <li key={message.id}><Icon name="message" /><span><strong>{message.author} · {message.authority}</strong><small>{message.body}</small></span></li>)}
              {trialCorrections.map((correction) => <li key={correction.id}><Icon name="task" /><span><strong>{correction.id} · {correction.title}</strong><small>Evidence linked by {correction.createdBy}</small></span></li>)}
            </ol>
          </section>
        </div>

        <aside className="detail-aside">
          <section className="surface source-panel" aria-labelledby="source-heading"><p className="eyebrow">Provenance</p><h2 id="source-heading">Source record</h2><dl><div><dt>Registry</dt><dd>{trial.source}</dd></div><div><dt>Last posted update</dt><dd>{formatDate(trial.lastUpdatePostedDate)}</dd></div><div><dt>Sponsor</dt><dd>{trial.leadSponsor}</dd></div><div><dt>Displayed conditions</dt><dd>{displayConditions(trial).join(", ")}</dd></div><div><dt>Raw source values</dt><dd>{trial.conditions.join(" · ")}</dd></div><div><dt>Displayed states</dt><dd>{displayStates(trial).join(", ")}</dd></div></dl><a className="button secondary full" href={trial.sourceUrl} target="_blank" rel="noreferrer">Open ClinicalTrials.gov <Icon name="external" /></a></section>
        </aside>
      </div>
    </div>
  );
}
