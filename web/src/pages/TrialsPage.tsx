import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { displayConditions, formatSourceDate } from "../data/trials";
import { useTrialData } from "../state/TrialData";

export function TrialsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { error, retry, snapshot, status, trials } = useTrialData();
  const query = searchParams.get("q") ?? "";
  const [draftQuery, setDraftQuery] = useState(query);
  useEffect(() => setDraftQuery(query), [query]);
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1;
  const pageSize = 12;
  const filteredTrials = useMemo(() => {
    const term = draftQuery.trim().toLocaleLowerCase();
    if (!term) return trials;
    return trials.filter((trial) => [
      trial.id,
      trial.briefTitle,
      trial.conditions.join(" "),
      trial.interventions.join(" "),
      trial.indiaLocations.map((location) => `${location.city} ${location.state}`).join(" "),
    ].join(" ").toLocaleLowerCase().includes(term));
  }, [draftQuery, trials]);
  const pageCount = Math.max(1, Math.ceil(filteredTrials.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleTrials = filteredTrials.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (status === "loading") {
    return <div className="page"><PageHeader eyebrow="Public registry discovery" title="Trial Library" description="Loading the dated ClinicalTrials.gov snapshot…" /><div className="surface"><EmptyState icon="source" title="Loading public trial records">The library will remain empty until the source file is available.</EmptyState></div></div>;
  }

  if (status === "error" || !snapshot) {
    return <div className="page"><PageHeader eyebrow="Public registry discovery" title="Trial Library" description="The public source could not be loaded." /><div className="surface"><EmptyState icon="warning" title="Registry source unavailable">{error ?? "The snapshot is unavailable."}<span className="empty-action"><button className="button primary" type="button" onClick={retry}>Retry source</button></span></EmptyState></div></div>;
  }

  return (
    <div className="page">
      <PageHeader
        eyebrow="Public registry discovery"
        title="Trial Library"
        description="Search India-located oncology records. Registry recruitment and independently confirmed site availability remain separate facts."
      />
      <SafetyNote><p><strong>General discovery only.</strong> No patient facts, eligibility score, patient ranking, or treatment recommendation influences this list.</p></SafetyNote>
      <section className="surface library-surface" aria-labelledby="library-results-heading">
        <div className="library-toolbar">
          <form className="search-field" onSubmit={(event) => {
            event.preventDefault();
            const next = new URLSearchParams(searchParams);
            next.delete("page");
            if (draftQuery.trim()) next.set("q", draftQuery.trim()); else next.delete("q");
            setSearchParams(next);
          }}>
            <label htmlFor="trial-search">Search public trial records</label>
            <span className="input-with-icon"><Icon name="search" /><input id="trial-search" value={draftQuery} onChange={(event) => setDraftQuery(event.target.value)} type="search" placeholder="Condition, trial ID, intervention, or city" /><button className="search-submit" type="submit">Search</button></span>
          </form>
          <div className="result-count"><strong id="library-results-heading">{filteredTrials.length} trials</strong><span>of {snapshot.retainedCount} retained · snapshot {formatSourceDate(snapshot.source.dataTimestamp)}</span></div>
        </div>
        <div className="trial-list">
          {visibleTrials.map((trial) => (
            <article className="trial-row" key={trial.id}>
              <div className="trial-row-main">
                <div className="trial-row-meta"><code>{trial.id}</code><StatusChip tone="source">{trial.statusLabel}</StatusChip><span>{trial.phases.join(", ") || "Phase not reported"}</span></div>
                <h2><Link to={`/trials/${trial.id}${searchParams.toString() ? `?from=${encodeURIComponent(searchParams.toString())}` : ""}`}>{trial.briefTitle}</Link></h2>
                <p>{displayConditions(trial).slice(0, 3).join(" · ")}</p>
              </div>
              <div className="trial-row-side"><span>{trial.indiaLocations.length} India {trial.indiaLocations.length === 1 ? "site" : "sites"}</span><strong>Site confirmation unknown</strong><Link aria-label={`Open ${trial.id}`} to={`/trials/${trial.id}`}><Icon name="arrow" /></Link></div>
            </article>
          ))}
        </div>
        <nav className="pagination" aria-label="Trial result pages">
          <button type="button" disabled={currentPage === 1} onClick={() => {
            const next = new URLSearchParams(searchParams);
            next.set("page", String(currentPage - 1));
            setSearchParams(next);
          }}>Previous</button>
          <span>Page {currentPage} of {pageCount} · showing {visibleTrials.length} of {filteredTrials.length} matching records</span>
          <button type="button" disabled={currentPage === pageCount} onClick={() => {
            const next = new URLSearchParams(searchParams);
            next.set("page", String(currentPage + 1));
            setSearchParams(next);
          }}>Next</button>
        </nav>
      </section>
    </div>
  );
}
