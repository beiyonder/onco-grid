import { useState } from "react";
import { compareEvidence, fetchLiveTrialEvidence, type LiveTrialEvidence } from "../data/officialEvidence";
import { formatDate } from "../data/trials";
import type { TrialRecord } from "../types";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

function displayRegistryStatus(value: string): string {
  return value.toLocaleLowerCase().replaceAll("_", " ").replace(/^./, (character) => character.toLocaleUpperCase());
}

export function TrialEvidenceFeed({ trial }: { trial: TrialRecord }) {
  const [live, setLive] = useState<LiveTrialEvidence | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      setLive(await fetchLiveTrialEvidence(trial.id));
    } catch (reason) {
      setLive(null);
      setError(reason instanceof Error ? reason.message : "Official evidence could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  const comparison = live ? compareEvidence(trial, live) : null;
  return (
    <section className="surface evidence-feed" aria-labelledby="evidence-feed-heading">
      <div className="section-heading">
        <div><p className="eyebrow">Official-source evidence</p><h2 id="evidence-feed-heading">Registry evidence feed</h2><p>Compare the bundled dated snapshot with the current ClinicalTrials.gov record. Contact details are never copied.</p></div>
        <button className="button secondary" type="button" onClick={refresh} disabled={loading}><Icon name="update" />{loading ? "Checking source…" : live ? "Refresh official source" : "Check official source"}</button>
      </div>
      {!live && !error ? <div className="evidence-feed-idle"><Icon name="source" /><p><strong>No live request yet.</strong>The dated snapshot remains visible and authoritative for this validation session until you explicitly check the official source.</p></div> : null}
      {error ? <div className="source-error" role="alert"><Icon name="warning" /><span><strong>Official source unavailable</strong><small>{error}</small></span><button className="button secondary" type="button" onClick={refresh}>Retry</button></div> : null}
      {live && comparison ? <div className="evidence-feed-body" aria-live="polite">
        <div className="evidence-comparison-grid">
          <article><span>Registry study status</span><strong>{displayRegistryStatus(live.overallStatus)}</strong><small>Snapshot: {trial.statusLabel}</small><StatusChip tone={comparison.statusChanged ? "attention" : "good"}>{comparison.statusChanged ? "Changed since snapshot" : "Same as snapshot"}</StatusChip></article>
          <article><span>Last posted update</span><strong>{live.lastUpdatePostedDate ? formatDate(live.lastUpdatePostedDate) : "Not reported"}</strong><small>Snapshot: {trial.lastUpdatePostedDate ? formatDate(trial.lastUpdatePostedDate) : "Not reported"}</small><StatusChip tone="source">Official registry date</StatusChip></article>
          <article><span>India locations</span><strong>{live.indiaLocations.length} currently listed</strong><small>Snapshot: {trial.indiaLocations.length} listed</small><StatusChip tone={comparison.indiaLocationCountChanged ? "attention" : "good"}>{comparison.indiaLocationCountChanged ? "Count changed" : "Same count"}</StatusChip></article>
        </div>
        <ol className="evidence-events">
          <li><Icon name="source" /><span><strong>Current official record checked</strong><small>{new Date(live.checkedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} · API version date {live.versionDate || "not reported"}</small></span></li>
          <li><Icon name={comparison.titleChanged ? "warning" : "check"} /><span><strong>{comparison.titleChanged ? "Study title differs from snapshot" : "Study title matches snapshot"}</strong><small>{live.briefTitle}</small></span></li>
          <li><Icon name="shield" /><span><strong>Site availability remains unconfirmed</strong><small>Registry location status is a source assertion, not proof that an India site can enrol today.</small></span></li>
        </ol>
        <a className="button secondary" href={live.sourceUrl} target="_blank" rel="noreferrer">Open cited ClinicalTrials.gov record <Icon name="external" /></a>
      </div> : null}
    </section>
  );
}
