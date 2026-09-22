import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { SourceAbstract } from "../components/SourceAbstract";
import { TrialEvidenceFeed } from "../components/TrialEvidenceFeed";
import { TrialCoverageTools } from "../components/TrialCoverageTools";
import { deterministicTrialAbstract } from "../data/evidence";
import { displayConditions, displayStates, formatDate, registryCriteriaSections } from "../data/trials";
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
  const criteriaSections = registryCriteriaSections(trial);
  const totalCriteria = criteriaSections.reduce((total, section) => total + section.items.length, 0);

  return (
    <div className="page detail-page">
      <button className="back-link button quiet" type="button" onClick={() => navigate(libraryRoute, { state: location.state })}>← Back to Trial Library</button>
      <PageHeader
        eyebrow={`${trial.id} · ${trial.phases.join(", ") || "Phase not reported"}`}
        title={trial.briefTitle}
        description={displayConditions(trial).join(" · ")}
        actions={<><TrialCoverageTools trial={trial} /><button className="button quiet" type="button" onClick={() => toggleFollowTrial(trial.id)}>{isFollowed ? "Following" : "Follow trial"}</button><Link className="button secondary" to={`/trials/${trial.id}/room`}>Open Trial Room</Link></>}
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

          <TrialEvidenceFeed trial={trial} />

          <section className="reading-surface" aria-labelledby="summary-heading">
            <p className="eyebrow">Registry abstract</p><h2 id="summary-heading">Source-grounded study overview</h2><SourceAbstract value={deterministicTrialAbstract(trial)} />
          </section>

          <section className="surface site-section" aria-labelledby="sites-heading">
            <div className="section-heading"><div><p className="eyebrow">Registry-listed locations</p><h2 id="sites-heading">India sites</h2></div><StatusChip tone="neutral">{trial.indiaLocations.length} listed</StatusChip></div>
            <div className="site-list">
              {trial.indiaLocations.map((location, index) => <div className="site-row" key={`${location.facility}-${index}`}><span><strong>{location.facility || "Facility not reported"}</strong><small>{[location.city, location.state].filter(Boolean).join(", ")}</small></span><span><StatusChip tone="source">Registry: {location.status || "Unknown"}</StatusChip><StatusChip tone="attention">Site: not independently confirmed</StatusChip></span></div>)}
            </div>
          </section>

          <section className="surface protocol-source" aria-labelledby="criteria-source-heading">
            <div className="section-heading"><div><p className="eyebrow">Complete retained source</p><h2 id="criteria-source-heading">Eligibility criteria</h2><p>Original registry text for human review; not interpreted by Trial Relay.</p></div><StatusChip tone="source">{trial.eligibilityCriteriaTruncated ? "Source excerpt" : "Complete retained text"}</StatusChip></div>
            <details className="criteria-disclosure">
              <summary>
                <span><strong>Read registry criteria</strong><small>Exact source text, structured for careful reading</small></span>
                <span className="criteria-summary-count">{totalCriteria} criteria</span>
              </summary>
              <div className="criteria-document">
                <div className="criteria-document-note" role="note"><Icon name="source" /><p><strong>Source text, not interpretation.</strong> Trial Relay separates the registry wording into sections and numbered rows without deciding whether any person meets a criterion.</p></div>
                {criteriaSections.map((section) => (
                  <section className={`criteria-group ${section.title.toLocaleLowerCase()}`} aria-labelledby={`criteria-${section.title.toLocaleLowerCase()}`} key={section.title}>
                    <header><div><p className="eyebrow">{section.title === "Protocol" ? "Registry wording" : `${section.title} criteria`}</p><h3 id={`criteria-${section.title.toLocaleLowerCase()}`}>{section.title === "Protocol" ? "Protocol criteria" : section.title}</h3></div><span>{section.items.length} {section.items.length === 1 ? "item" : "items"}</span></header>
                    <ol className="criteria-list">
                      {section.items.map((item, index) => (
                        <li key={`${section.title}-${item.sourceNumber}-${index}`}>
                          <span className="criteria-marker" aria-hidden="true">{item.sourceNumber}</span>
                          <div><p>{item.text}</p>{item.subitems.length > 0 ? <ul>{item.subitems.map((subitem, subindex) => <li key={`${item.sourceNumber}-${subindex}`}>{subitem}</li>)}</ul> : null}</div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </details>
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
