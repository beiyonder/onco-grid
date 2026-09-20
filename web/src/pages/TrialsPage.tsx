import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { displayConditions, displayStates, formatSourceDate, normalizeState } from "../data/trials";
import { useTrialData } from "../state/TrialData";
import type { TrialRecord } from "../types";

const pageSizes = [12, 24, 48];

export function TrialsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, retry, snapshot, status, trials } = useTrialData();
  const query = searchParams.get("q") ?? "";
  const [draftQuery, setDraftQuery] = useState(query);
  const condition = searchParams.get("condition") ?? "all";
  const state = searchParams.get("state") ?? "all";
  const previewId = searchParams.get("preview");
  const requestedPage = Number(searchParams.get("page") ?? "1");
  const requestedPageSize = Number(searchParams.get("limit") ?? "12");
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1;
  const pageSize = pageSizes.includes(requestedPageSize) ? requestedPageSize : 12;

  useEffect(() => setDraftQuery(query), [query]);

  useEffect(() => {
    const navigationState = location.state as { libraryScrollY?: number; libraryFocusId?: string } | null;
    if (navigationState?.libraryScrollY === undefined || status !== "ready") return;
    const timeout = window.setTimeout(() => {
      window.scrollTo({ top: navigationState.libraryScrollY, behavior: "auto" });
      document.getElementById(`trial-${navigationState.libraryFocusId}`)?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [location.state, status]);

  useEffect(() => {
    if (!previewId || status !== "ready") return;
    const timeout = window.setTimeout(() => document.getElementById("trial-preview-heading")?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(timeout);
  }, [previewId, status]);

  const conditionOptions = useMemo(() => {
    const values = trials.flatMap(displayConditions);
    return Array.from(new Map(values.map((value) => [value.toLocaleLowerCase(), value])).values()).sort((left, right) => left.localeCompare(right));
  }, [trials]);
  const stateOptions = useMemo(() => {
    const values = trials.flatMap(displayStates);
    return Array.from(new Map(values.map((value) => [value.toLocaleLowerCase(), value])).values()).sort((left, right) => left.localeCompare(right));
  }, [trials]);

  const filteredTrials = useMemo(() => {
    const term = draftQuery.trim().toLocaleLowerCase();
    return trials.filter((trial) => {
      if (condition !== "all" && !displayConditions(trial).includes(condition)) return false;
      if (state !== "all" && !trial.indiaLocations.some((site) => normalizeState(site.state) === state)) return false;
      if (!term) return true;
      return [
        trial.id,
        trial.briefTitle,
        trial.conditions.join(" "),
        trial.interventions.join(" "),
        trial.indiaLocations.map((site) => `${site.city} ${site.state}`).join(" "),
      ].join(" ").toLocaleLowerCase().includes(term);
    });
  }, [condition, draftQuery, state, trials]);

  const pageCount = Math.max(1, Math.ceil(filteredTrials.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleTrials = filteredTrials.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const previewTrial = trials.find((trial) => trial.id === previewId);

  const setParam = (name: string, value: string, defaultValue = "all") => {
    const next = new URLSearchParams(searchParams);
    next.delete("page");
    if (value === defaultValue || value === "") next.delete(name); else next.set(name, value);
    setSearchParams(next);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParam("q", draftQuery.trim(), "");
  };

  const openTrial = (trial: TrialRecord) => {
    const returnParams = new URLSearchParams(searchParams);
    returnParams.delete("preview");
    if (draftQuery.trim()) returnParams.set("q", draftQuery.trim()); else returnParams.delete("q");
    navigate(`/trials/${trial.id}${returnParams.toString() ? `?from=${encodeURIComponent(returnParams.toString())}` : ""}`, {
      state: { libraryScrollY: window.scrollY, libraryFocusId: trial.id },
    });
  };

  const openPreview = (trialId: string) => {
    const next = new URLSearchParams(searchParams);
    if (draftQuery.trim()) next.set("q", draftQuery.trim()); else next.delete("q");
    next.set("preview", trialId);
    setSearchParams(next, { replace: true });
  };

  const closePreview = () => {
    const closingId = previewId;
    const next = new URLSearchParams(searchParams);
    next.delete("preview");
    setSearchParams(next, { replace: true });
    requestAnimationFrame(() => document.getElementById(`preview-${closingId}`)?.focus());
  };

  if (status === "loading") {
    return <div className="page"><PageHeader eyebrow="Public registry discovery" title="Trial Library" description="Loading the dated ClinicalTrials.gov snapshot…" /><div className="surface"><EmptyState icon="source" title="Loading public trial records">The library remains empty until its source artifact is available.</EmptyState></div></div>;
  }

  if (status === "error" || !snapshot) {
    return <div className="page"><PageHeader eyebrow="Public registry discovery" title="Trial Library" description="The public source could not be loaded." /><div className="surface"><EmptyState icon="warning" title="Registry source unavailable" action={<button className="button primary" type="button" onClick={retry}>Retry source</button>}>{error ?? "The snapshot is unavailable."}</EmptyState></div></div>;
  }

  return (
    <div className="page">
      <PageHeader eyebrow="Public registry discovery" title="Trial Library" description="Scan concise rows, inspect an accessible preview, then move to a stable source-first Trial Detail. Registry and independent site status remain separate." />
      <SafetyNote><p><strong>General discovery only.</strong> No patient facts, eligibility score, patient ranking, or treatment recommendation influences this list.</p></SafetyNote>

      <section className="surface library-surface" aria-labelledby="library-results-heading">
        <form className="filter-grid" onSubmit={submitSearch}>
          <div className="search-field"><label htmlFor="trial-search">Search public trial records</label><span className="input-with-icon"><Icon name="search" /><input id="trial-search" value={draftQuery} onChange={(event) => setDraftQuery(event.target.value)} type="search" placeholder="Condition, trial ID, intervention, or city" /><button className="search-submit" type="submit">Search</button></span></div>
          <label><span>Displayed condition</span><select value={condition} onChange={(event) => setParam("condition", event.target.value)}><option value="all">All conditions</option>{conditionOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label><span>Displayed state</span><select value={state} onChange={(event) => setParam("state", event.target.value)}><option value="all">All states</option>{stateOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <button className="button quiet" type="button" onClick={() => { setDraftQuery(""); setSearchParams({}); }}><Icon name="close" /> Reset</button>
        </form>

        <div className="library-toolbar compact">
          <div className="result-count"><strong id="library-results-heading">{filteredTrials.length} matching trials</strong><span>of {snapshot.retainedCount} retained · snapshot {formatSourceDate(snapshot.source.dataTimestamp)}</span></div>
          <label className="result-limit"><span>Rows per page</span><select value={pageSize} onChange={(event) => setParam("limit", event.target.value, "12")}>{pageSizes.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
        </div>

        <div className={`library-workspace${previewTrial ? " has-preview" : ""}`}>
          <div className="trial-list" aria-live="polite">
            {visibleTrials.map((trial) => (
              <article className={`trial-row${previewId === trial.id ? " selected" : ""}`} key={trial.id}>
                <div className="trial-row-main">
                  <div className="trial-row-meta"><code>{trial.id}</code><StatusChip tone="source">{trial.statusLabel}</StatusChip><span>{trial.phases.join(", ") || "Phase not reported"}</span></div>
                  <h2><button className="title-button" id={`trial-${trial.id}`} type="button" onClick={() => openTrial(trial)}>{trial.briefTitle}</button></h2>
                  <p>{displayConditions(trial).slice(0, 2).join(" · ")}</p>
                </div>
                <div className="trial-row-side"><span>{trial.indiaLocations.length} India {trial.indiaLocations.length === 1 ? "site" : "sites"}</span><strong>Site confirmation unknown</strong><button className="preview-button" id={`preview-${trial.id}`} type="button" onClick={() => openPreview(trial.id)} aria-expanded={previewId === trial.id} aria-controls="trial-preview">Preview</button></div>
              </article>
            ))}
            {visibleTrials.length === 0 ? <EmptyState icon="search" title="No trials match these filters">Reset one or more filters. No broader or patient-specific search is performed automatically.</EmptyState> : null}
          </div>

          {previewTrial ? <aside className="trial-preview" id="trial-preview" aria-labelledby="trial-preview-heading">
            <button className="preview-close" type="button" onClick={closePreview} aria-label="Close trial preview"><Icon name="close" /></button>
            <p className="eyebrow">Accessible preview</p>
            <h2 id="trial-preview-heading" tabIndex={-1}>{previewTrial.briefTitle}</h2>
            <code>{previewTrial.id}</code>
            <div className="preview-status"><span><small>Registry study status</small><StatusChip tone="source">{previewTrial.statusLabel}</StatusChip></span><span><small>Independent site confirmation</small><StatusChip tone="attention">Unknown</StatusChip></span></div>
            <p>{previewTrial.briefSummary}</p>
            <dl><div><dt>Displayed condition</dt><dd>{displayConditions(previewTrial).slice(0, 3).join(", ")}</dd></div><div><dt>India sites</dt><dd>{previewTrial.indiaLocations.length} registry-listed</dd></div><div><dt>Source</dt><dd>{previewTrial.source} · updated {previewTrial.lastUpdatePostedDate}</dd></div></dl>
            <div className="preview-actions"><button className="button primary" type="button" onClick={() => openTrial(previewTrial)}>Open full Trial Detail</button><a className="button secondary" href={previewTrial.sourceUrl} target="_blank" rel="noreferrer">Open source <Icon name="external" /></a></div>
          </aside> : null}
        </div>

        <nav className="pagination" aria-label="Trial result pages">
          <button type="button" disabled={currentPage === 1} onClick={() => setParam("page", String(currentPage - 1), "1")}>Previous</button>
          <span>Page {currentPage} of {pageCount} · showing {visibleTrials.length} of {filteredTrials.length} matching records · limit {pageSize}</span>
          <button type="button" disabled={currentPage === pageCount} onClick={() => setParam("page", String(currentPage + 1), "1")}>Next</button>
        </nav>
      </section>
    </div>
  );
}
