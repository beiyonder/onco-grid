import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, InfoTip, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { SourceAbstract } from "../components/SourceAbstract";
import {
  buildConditionCoverage,
  buildCrossTrialEvidenceRows,
  buildInterventionIndex,
  deterministicGlobalTrialAbstract,
  deterministicTrialAbstract,
  type GlobalTrialSearchResult,
  type InterventionIndexEntry,
  type PublicationSearchResult,
} from "../data/evidence";
import { formatSourceDate } from "../data/trials";
import { useTrialData } from "../state/TrialData";

const institutionProxies = [
  {
    name: "Tata Memorial Hospital",
    shortName: "TMH",
    intendedServices: [
      "Authorised trial owner",
      "Current site verification",
      "Referral acknowledgement",
      "Freshness and correction audit",
    ],
  },
  {
    name: "Advanced Centre for Treatment, Research and Education in Cancer",
    shortName: "ACTREC",
    intendedServices: [
      "Authorised research owner",
      "Study and source verification",
      "Operational query routing",
      "Freshness and correction audit",
    ],
  },
  {
    name: "Cytecare Cancer Hospitals",
    shortName: "Cytecare",
    intendedServices: [
      "Authorised trial owner",
      "Current site verification",
      "Referral acknowledgement",
      "Freshness and correction audit",
    ],
  },
] as const;

interface ApiErrorPayload {
  message?: string;
}


function responseError(payload: unknown, fallback: string): string {
  return typeof payload === "object" && payload !== null && "message" in payload
    ? String((payload as ApiErrorPayload).message ?? fallback)
    : fallback;
}

export function EvidenceCoveragePage() {
  const { error, retry, snapshot, status, trials } = useTrialData();
  const [conditionQuery, setConditionQuery] = useState("");
  const [conditionLimit, setConditionLimit] = useState(20);
  const [interventionQuery, setInterventionQuery] = useState("");
  const [interventionLimit, setInterventionLimit] = useState(24);
  const [selectedTrialId, setSelectedTrialId] = useState("");
  const [globalMode, setGlobalMode] = useState<"condition" | "intervention">("intervention");
  const [globalQuery, setGlobalQuery] = useState("");
  const [globalResult, setGlobalResult] = useState<GlobalTrialSearchResult | null>(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [publicationResult, setPublicationResult] = useState<PublicationSearchResult | null>(null);
  const [publicationLoading, setPublicationLoading] = useState(false);
  const [publicationError, setPublicationError] = useState("");

  useEffect(() => {
    if (!selectedTrialId && trials[0]) setSelectedTrialId(trials[0].id);
  }, [selectedTrialId, trials]);

  const coverage = useMemo(() => buildConditionCoverage(trials), [trials]);
  const interventionIndex = useMemo(() => buildInterventionIndex(trials), [trials]);
  const rawConditionCount = useMemo(() => new Set(trials.flatMap((trial) => trial.conditions)).size, [trials]);
  const rawInterventionCount = useMemo(() => new Set(trials.flatMap((trial) => trial.interventions)).size, [trials]);
  const selectedTrial = trials.find((trial) => trial.id === selectedTrialId) ?? trials[0];
  const selectedAbstract = selectedTrial ? deterministicTrialAbstract(selectedTrial) : null;
  const filteredCoverage = useMemo(() => {
    const term = conditionQuery.trim().toLocaleLowerCase();
    return coverage.filter((row) => !term || row.condition.toLocaleLowerCase().includes(term));
  }, [conditionQuery, coverage]);
  const filteredInterventions = useMemo(() => {
    const term = interventionQuery.trim().toLocaleLowerCase();
    return interventionIndex.filter((entry) => !term || entry.exactLabel.toLocaleLowerCase().includes(term));
  }, [interventionIndex, interventionQuery]);
  const globalRows = useMemo(
    () => buildCrossTrialEvidenceRows(globalResult?.trials ?? []),
    [globalResult],
  );

  const loadGlobalEvidence = async (pageToken?: string) => {
    const term = globalQuery.trim();
    if (!term || globalLoading) return;
    const append = Boolean(pageToken);
    setGlobalLoading(true);
    setGlobalError("");
    if (!append) {
      setGlobalResult(null);
      setPublicationResult(null);
      setPublicationError("");
    }
    try {
      const params = new URLSearchParams({ mode: globalMode, q: term });
      if (pageToken) params.set("pageToken", pageToken);
      const response = await fetch(`/api/global-trials?${params.toString()}`, { headers: { accept: "application/json" } });
      const payload = await response.json() as GlobalTrialSearchResult | ApiErrorPayload;
      if (!response.ok) throw new Error(responseError(payload, "Global evidence could not be loaded."));
      const result = payload as GlobalTrialSearchResult;
      setGlobalResult((current) => {
        if (!append || !current) return result;
        const trialsById = new Map([...current.trials, ...result.trials].map((trial) => [trial.id, trial]));
        return { ...result, trials: Array.from(trialsById.values()) };
      });
    } catch (requestError) {
      setGlobalError(requestError instanceof Error ? requestError.message : "Global evidence could not be loaded.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const submitGlobalSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void loadGlobalEvidence();
  };

  const useIntervention = (entry: InterventionIndexEntry) => {
    setGlobalMode("intervention");
    setGlobalQuery(entry.name);
    setGlobalResult(null);
    setPublicationResult(null);
    requestAnimationFrame(() => document.getElementById("global-evidence-search")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const loadPublications = async () => {
    const trialIds = (globalResult?.trials ?? []).slice(0, 10).map((trial) => trial.id);
    if (!trialIds.length || publicationLoading) return;
    setPublicationLoading(true);
    setPublicationError("");
    try {
      const response = await fetch(`/api/publications?${new URLSearchParams({ ids: trialIds.join(",") }).toString()}`, { headers: { accept: "application/json" } });
      const payload = await response.json() as PublicationSearchResult | ApiErrorPayload;
      if (!response.ok) throw new Error(responseError(payload, "Publication metadata could not be loaded."));
      setPublicationResult(payload as PublicationSearchResult);
    } catch (requestError) {
      setPublicationError(requestError instanceof Error ? requestError.message : "Publication metadata could not be loaded.");
    } finally {
      setPublicationLoading(false);
    }
  };

  const exportEvidence = () => {
    if (!snapshot) return;
    const payload = {
      generatedAt: new Date().toISOString(),
      boundary: "Descriptive public-source evidence only; no outcomes synthesis, matching, eligibility, ranking, or recommendation.",
      indiaSnapshot: {
        source: snapshot.source,
        scope: snapshot.scope,
        retainedCount: snapshot.retainedCount,
      },
      indiaConditionCoverage: coverage,
      exactDrugAndBiologicalIndex: interventionIndex,
      selectedGlobalEvidence: globalResult,
      pubMedMetadata: publicationResult,
      institutionProxies: institutionProxies.map((institution) => ({
        ...institution,
        status: "WIP proxy — not connected",
      })),
    };
    const blobUrl = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = `trial-relay-evidence-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  };

  if (status === "loading") {
    return <div className="page"><PageHeader eyebrow="Evidence coverage" title="Trial evidence workspace" description="Loading the dated India snapshot…" /><div className="surface"><EmptyState icon="source" title="Loading source coverage">Evidence tools remain empty until the source artifact is available.</EmptyState></div></div>;
  }
  if (status === "error" || !snapshot) {
    return <div className="page"><PageHeader eyebrow="Evidence coverage" title="Trial evidence workspace" description="The India snapshot could not be loaded." /><div className="surface"><EmptyState icon="warning" title="Evidence source unavailable" action={<button className="button primary" type="button" onClick={retry}>Retry source</button>}>{error ?? "The snapshot is unavailable."}</EmptyState></div></div>;
  }

  return (
    <div className="page evidence-page">
      <Link className="back-link" to="/trials">← Back to Trial Library</Link>
      <PageHeader
        eyebrow="Evidence workspace"
        title="Trial evidence workspace"
        description="India coverage, global trials, publications, and drug-centred evidence."
        actions={<><button className="button secondary" type="button" onClick={exportEvidence}><Icon name="source" /> Export JSON</button><button className="button quiet" type="button" onClick={() => window.print()}>Print report</button></>}
      />
      <SafetyNote><div className="evidence-boundary-line"><span><strong>Public-source evidence only.</strong> No patient matching or treatment recommendations.</span><InfoTip label="Evidence boundary"><p>Global records do not establish India access. PubMed indexing does not prove peer review or primary-trial linkage. No outcomes are pooled or treatments compared.</p></InfoTip></div></SafetyNote>

      <section className="evidence-stat-grid" aria-label="India snapshot coverage summary">
        <article><span>India source layer</span><strong>{snapshot.retainedCount}</strong><small>India-located · active statuses</small></article>
        <article><span>Cancer labels</span><strong>{coverage.length}</strong><small>{rawConditionCount} raw source terms</small></article>
        <article><span>Drug / biological terms</span><strong>{interventionIndex.length}</strong><small>{rawInterventionCount} raw interventions</small></article>
        <article><span>Snapshot date</span><strong>{formatSourceDate(snapshot.source.dataTimestamp)}</strong><small>Dated registry source</small></article>
      </section>

      <section className="surface evidence-section" aria-labelledby="coverage-heading">
        <div className="section-heading"><div><p className="eyebrow">India source inventory</p><h2 id="coverage-heading">Cancer coverage matrix</h2></div><div className="section-heading-actions"><InfoTip label="How coverage is counted"><p>Counts use the bounded 285-record India snapshot. Display labels group known spelling variants while every raw source term remains visible. An absent label does not prove there is no India research.</p></InfoTip><StatusChip tone="source">{coverage.length} labels</StatusChip></div></div>
        <label className="evidence-filter"><span>Filter displayed cancer labels</span><input type="search" value={conditionQuery} onChange={(event) => { setConditionQuery(event.target.value); setConditionLimit(20); }} placeholder="e.g. breast, lung, lymphoma" /></label>
        <div className="table-scroll">
          <table className="evidence-table">
            <thead><tr><th scope="col">Displayed cancer</th><th scope="col">Raw source variants</th><th scope="col">Trials</th><th scope="col">Share</th><th scope="col">India site listings</th><th scope="col">Exact interventions</th><th scope="col">Inspect</th></tr></thead>
            <tbody>{filteredCoverage.slice(0, conditionLimit).map((row) => <tr key={row.condition}><th scope="row">{row.condition}</th><td>{row.rawTerms.join(" · ")}</td><td>{row.trialCount}</td><td>{(row.share * 100).toFixed(1)}%</td><td>{row.indiaSiteCount}</td><td>{row.exactInterventionCount}</td><td><button className="text-action" type="button" onClick={() => { setSelectedTrialId(row.trialIds[0] ?? ""); document.getElementById("local-abstract-heading")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>View abstract</button></td></tr>)}</tbody>
          </table>
        </div>
        {filteredCoverage.length === 0 ? <EmptyState icon="search" title="No displayed cancer matches">Try another source label. No synonym or semantic expansion runs automatically.</EmptyState> : null}
        {conditionLimit < filteredCoverage.length ? <button className="button quiet evidence-more" type="button" onClick={() => setConditionLimit((limit) => limit + 20)}>Show 20 more · {filteredCoverage.length - conditionLimit} remaining</button> : null}
      </section>

      <section className="surface evidence-section" aria-labelledby="intervention-heading">
        <div className="section-heading"><div><p className="eyebrow">Exact source terms</p><h2 id="intervention-heading">Drug and biological index</h2></div><div className="section-heading-actions"><InfoTip label="How interventions are grouped"><p>Only exact registry terms typed Drug or Biological are grouped. Codes, brands, combinations, and spellings remain separate; no aliases or equivalence are inferred.</p></InfoTip><StatusChip tone="source">{interventionIndex.length} terms</StatusChip></div></div>
        <label className="evidence-filter"><span>Filter exact intervention terms</span><input type="search" value={interventionQuery} onChange={(event) => { setInterventionQuery(event.target.value); setInterventionLimit(24); }} placeholder="e.g. pembrolizumab" /></label>
        <div className="intervention-index">
          {filteredInterventions.slice(0, interventionLimit).map((entry) => <article key={entry.exactLabel}><header><StatusChip tone={entry.kind === "Drug" ? "source" : "human"}>{entry.kind}</StatusChip><strong>{entry.name}</strong></header><p>{entry.trialCount} India-snapshot {entry.trialCount === 1 ? "trial" : "trials"} · {entry.conditions.slice(0, 3).join(", ") || "Condition not reported"}</p><small>{entry.phases.join(", ") || "Phase not reported"} · {entry.statuses.join(", ")}</small><button className="button secondary" type="button" onClick={() => useIntervention(entry)}>Use source term in global search <Icon name="arrow" /></button></article>)}
        </div>
        {filteredInterventions.length === 0 ? <EmptyState icon="search" title="No exact intervention matches">Try another registry term. No drug alias is inferred.</EmptyState> : null}
        {interventionLimit < filteredInterventions.length ? <button className="button quiet evidence-more" type="button" onClick={() => setInterventionLimit((limit) => limit + 24)}>Show 24 more · {filteredInterventions.length - interventionLimit} remaining</button> : null}
      </section>

      <section className="reading-surface evidence-section" aria-labelledby="local-abstract-heading">
        <div className="section-heading"><div><p className="eyebrow">Current India snapshot</p><h2 id="local-abstract-heading">Trial abstract</h2></div><div className="section-heading-actions"><InfoTip label="About this abstract"><p>One registry record is placed in a fixed reading order. Missing or truncated source fields stay visible; the original source remains authoritative.</p></InfoTip>{selectedTrial ? <Link className="button secondary" to={`/trials/${selectedTrial.id}`}>Open Trial Detail</Link> : null}</div></div>
        <label className="evidence-filter"><span>Select an India-snapshot trial</span><select value={selectedTrial?.id ?? ""} onChange={(event) => setSelectedTrialId(event.target.value)}>{trials.map((trial) => <option value={trial.id} key={trial.id}>{trial.id} · {trial.briefTitle}</option>)}</select></label>
        {selectedTrial && selectedAbstract ? <><div className="abstract-title"><code>{selectedTrial.id}</code><h3>{selectedTrial.briefTitle}</h3></div><SourceAbstract value={selectedAbstract} /></> : null}
      </section>

      <section className="surface evidence-section global-evidence" id="global-evidence-search" aria-labelledby="global-heading">
        <div className="section-heading"><div><p className="eyebrow">Global source</p><h2 id="global-heading">ClinicalTrials.gov search</h2></div><div className="section-heading-actions"><InfoTip label="Global search boundary"><p>Results follow the explicit upstream query and registry order. They are not patient-ranked and do not establish India site access or current capacity.</p></InfoTip><StatusChip tone="attention">Not India availability</StatusChip></div></div>
        <form className="global-search-form" onSubmit={submitGlobalSearch}>
          <label><span>Search field</span><select value={globalMode} onChange={(event) => { setGlobalMode(event.target.value as "condition" | "intervention"); setGlobalResult(null); setPublicationResult(null); }}><option value="intervention">Intervention field</option><option value="condition">Condition field</option></select></label>
          <label className="global-query"><span>Public registry query</span><input type="search" value={globalQuery} onChange={(event) => setGlobalQuery(event.target.value)} placeholder={globalMode === "intervention" ? "e.g. pembrolizumab" : "e.g. non-small cell lung cancer"} minLength={2} maxLength={120} required /></label>
          <button className="button primary" type="submit" disabled={globalLoading}>{globalLoading ? "Searching official source…" : "Search global source"}</button>
        </form>
        <div className="discovery-input-trace"><strong>Query</strong><span>ClinicalTrials.gov API v2</span><span>{globalMode}</span><span>{globalQuery.trim() || "Not submitted"}</span></div>
        {globalError ? <div className="source-error" role="alert"><Icon name="warning" /><span><strong>Global source unavailable</strong><small>{globalError}</small></span><button className="button secondary" type="button" onClick={() => void loadGlobalEvidence()}>Retry</button></div> : null}
        {globalResult ? <>
          <div className="global-result-summary"><span><strong>{globalResult.trials.length.toLocaleString("en-IN")} loaded</strong><small>{globalResult.totalCount === null ? "Upstream total not reported" : `${globalResult.totalCount.toLocaleString("en-IN")} upstream matches`} · fetched {new Date(globalResult.source.fetchedAt).toLocaleString("en-IN")}</small></span><a className="text-action" href={globalResult.source.queryUrl} target="_blank" rel="noreferrer">Open exact API query <Icon name="external" /></a></div>
          <div className="global-trial-list">{globalResult.trials.map((trial) => <article key={trial.id}><header><code>{trial.id}</code><StatusChip tone="source">{trial.statusLabel}</StatusChip><span>{trial.phases.join(", ") || "Phase not reported"}</span></header><h3>{trial.briefTitle}</h3><p className="global-condition-line">{trial.conditions.join(" · ") || "Conditions not reported"}</p><p className="global-summary-excerpt">{trial.briefSummary}</p><details className="global-abstract-disclosure"><summary>Read source abstract</summary><SourceAbstract value={deterministicGlobalTrialAbstract(trial)} /></details><a className="button secondary" href={trial.sourceUrl} target="_blank" rel="noreferrer">Open ClinicalTrials.gov <Icon name="external" /></a></article>)}</div>
          {globalResult.nextPageToken ? <button className="button secondary evidence-more" type="button" disabled={globalLoading} onClick={() => void loadGlobalEvidence(globalResult.nextPageToken)}>{globalLoading ? "Loading…" : `Load next ${globalResult.query.pageSize} registry records`}</button> : null}
        </> : <EmptyState icon="search" title="Search global trials">Choose a field and enter a registry term.</EmptyState>}
      </section>

      <section className="surface evidence-section cross-trial-map" aria-labelledby="cross-trial-heading">
        <div className="section-heading"><div><p className="eyebrow">Descriptive map</p><h2 id="cross-trial-heading">Population and time</h2></div><div className="section-heading-actions"><InfoTip label="What this map compares"><p>Loaded registry facts are aligned by population, study dates, phase/status, and geography. Endpoints and outcomes are not harmonised, pooled, ranked, or interpreted.</p></InfoTip><StatusChip tone={globalMode === "intervention" && globalRows.length ? "good" : "neutral"}>{globalRows.length} rows</StatusChip></div></div>
        {globalMode === "intervention" && globalRows.length ? <div className="table-scroll"><table className="evidence-table cross-trial-table"><thead><tr><th scope="col">Trial</th><th scope="col">Registry population</th><th scope="col">Study period</th><th scope="col">Phase / status</th><th scope="col">Countries</th></tr></thead><tbody>{globalRows.map((row) => <tr key={row.trialId}><th scope="row"><a href={row.sourceUrl} target="_blank" rel="noreferrer"><code>{row.trialId}</code><span>{row.title}</span></a></th><td>{row.population}</td><td>{row.studyPeriod}</td><td>{row.phaseAndStatus}</td><td>{row.geography}</td></tr>)}</tbody></table></div> : <EmptyState icon="source" title="Search by intervention">Use an intervention search to compare loaded study facts.</EmptyState>}
      </section>

      <section className="surface evidence-section publications-section" aria-labelledby="publications-heading">
        <div className="section-heading"><div><p className="eyebrow">Bibliographic metadata</p><h2 id="publications-heading">PubMed records</h2></div><div className="section-heading-actions"><InfoTip label="How publication matches work"><p>The first ten loaded NCT IDs form one combined PubMed query. Results may be primary reports, secondary analyses, or reviews; each trial-publication relationship needs human verification.</p></InfoTip><button className="button secondary" type="button" disabled={!globalResult?.trials.length || publicationLoading} onClick={() => void loadPublications()}>{publicationLoading ? "Checking PubMed…" : "Find PubMed records"}</button></div></div>
        {publicationError ? <div className="source-error" role="alert"><Icon name="warning" /><span><strong>Publication source unavailable</strong><small>{publicationError}</small></span><button className="button secondary" type="button" onClick={() => void loadPublications()}>Retry</button></div> : null}
        {publicationResult ? <><div className="global-result-summary"><span><strong>{publicationResult.loadedCount} metadata records</strong><small>{publicationResult.totalCount} upstream matches · {publicationResult.queryTrialIds.length} selected NCT IDs</small></span><a className="text-action" href={publicationResult.source.searchUrl} target="_blank" rel="noreferrer">Open PubMed query <Icon name="external" /></a></div><div className="publication-list">{publicationResult.publications.map((publication) => <article key={publication.pmid}><header><code>PMID {publication.pmid}</code><StatusChip tone="source">PubMed</StatusChip></header><h3>{publication.title}</h3><p>{publication.authors.join(", ") || "Authors not reported"}</p><small>{publication.journal} · {publication.publicationDate} · {publication.publicationTypes.join(", ") || "Type not reported"}</small><a className="button secondary" href={publication.sourceUrl} target="_blank" rel="noreferrer">Open PubMed <Icon name="external" /></a></article>)}</div>{publicationResult.publications.length === 0 ? <EmptyState icon="source" title="No PubMed metadata matched">No records matched the selected NCT query.</EmptyState> : null}</> : <EmptyState icon="source" title="Publication lookup ready">Load global trials, then query up to ten visible NCT IDs.</EmptyState>}
      </section>

      <section className="surface evidence-section institution-proxies" aria-labelledby="institution-heading">
        <div className="section-heading"><div><p className="eyebrow">Institution proxies</p><h2 id="institution-heading">Suggested specialist centres</h2></div><div className="section-heading-actions"><InfoTip label="What these proxies are for"><p>These placeholders define the future job: name an authorised owner, verify current site state, acknowledge referrals, and maintain freshness and correction history. No centre has been contacted or connected.</p></InfoTip><StatusChip tone="attention">WIP · not connected</StatusChip></div></div>
        <div className="institution-grid">{institutionProxies.map((institution) => <article key={institution.shortName}><header><span className="institution-mark" aria-hidden="true">{institution.shortName.slice(0, 3)}</span><span><strong>{institution.shortName}</strong><small>{institution.name}</small></span></header><StatusChip tone="attention">WIP proxy</StatusChip><ul>{institution.intendedServices.map((service) => <li key={service}><Icon name="check" />{service}</li>)}</ul></article>)}</div>
      </section>
    </div>
  );
}
