import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useWorkflow } from "../state/WorkflowState";
import { useTrialData } from "../state/TrialData";
import { useAppState } from "../state/AppState";
import { usePiAccess } from "../state/usePiAccess";
import { isAssessmentCurrent } from "../domain/workflow";
import { matchOutcome, outcomeLabels, type MatchOutcome } from "../domain/liveMatching";
import { SCENARIO_DATE, type Assessment, type MatchRun } from "../domain/model";

export function AssessmentVector({ assessment: a }: { assessment: Assessment }) {
  const outcome = matchOutcome(a);
  return <div className={`assessment-vector outcome-${outcome}`}>
    <strong>{outcomeLabels[outcome]}</strong>
    {a.score !== null && <><span>{a.supported}/{a.denominator} supported</span>
      {a.violated > 0 && <span>{a.violated} criterion conflicts</span>}
      {a.unresolved > 0 && <span>{a.unresolved} unresolved</span>}</>}
    {a.limitation && <p>{a.limitation}</p>}
  </div>;
}

function RegistryStatus({ assessment: a }: { assessment: Assessment }) {
  const check = a.registryCheck;
  if (!check) return <span className="match-source-status">Reference snapshot</span>;
  if (check.state !== "verified") return <span className="match-source-status attention">{check.state === "changed" ? "Eligibility text changed" : "Registry unavailable"}</span>;
  return <span className={`match-source-status${check.overallStatus === "RECRUITING" ? " recruiting" : ""}`}>
    Registry: {check.overallStatus?.replaceAll("_", " ").toLowerCase() ?? "unknown"}
  </span>;
}

export function MatchingResults({ direction, id }: { direction: MatchRun["direction"]; id: string }) {
  const { state, runMatching, command, error } = useWorkflow();
  const { trials, status } = useTrialData();
  const { roleId } = useAppState();
  const pi = usePiAccess();
  const [params, setParams] = useSearchParams();
  const [, tick] = useState(0);
  // Keep expiry visible while a result is left open. Commands independently recheck freshness.
  useEffect(() => { const timer = window.setInterval(() => tick((n) => n + 1), 60_000); return () => window.clearInterval(timer); }, []);
  const scope = params.get("scope") ?? "modeled";
  const selectedTrial = params.get("trial");
  const filter = params.get("matchFilter") ?? "all";
  const runs = state.runs.filter((r) => r.direction === direction && r.scope.startsWith(`${id} ·`));
  const run = runs.find((r) => r.id === params.get("run")) ?? runs.at(-1);
  const running = runs.find((r) => r.status === "running");
  const results = run?.assessments.filter((a) => filter === "all" || matchOutcome(a) === filter) ?? [];
  const setChoice = (key: string, value: string) => {
    const next = new URLSearchParams(params); next.set(key, value); setParams(next, { replace: true });
  };
  const start = (basis: "registry" | "benchmark") => {
    setChoice("run", "");
    void runMatching(direction, id,
      scope === "selected" && selectedTrial ? [selectedTrial] : scope === "modeled" ? state.models.map((m) => m.trialId) : undefined,
      basis);
  };
  const disabled = !!running || roleId === "auditor" || status !== "ready" || !state.models.length;
  const counts = Object.fromEntries(Object.keys(outcomeLabels).map((key) => [key, run?.assessments.filter((a) => matchOutcome(a) === key).length ?? 0]));
  if (direction === "trial-first" && !pi.canAccess(id)) return null;
  return <section className="matching-workbench" aria-label="Matching outcomes">
    <header className="match-heading">
      <div><h2>{direction === "patient-first" ? "Trial matches" : "Candidate queue"}</h2>
        <p>{direction === "patient-first" ? `${state.models.length} source-linked models · ${trials.length} library studies` : `${state.patients.length} synthetic patients · one shared evaluation engine`}</p></div>
      <span className="match-boundary">Synthetic patients · human review required</span>
    </header>
    <details className="match-setup" open={!run || !!running}>
      <summary>{run ? "Change scope or rerun" : "Choose a run"}</summary>
    <div className="matching-controls">
      {direction === "patient-first" && <label>Study scope<select value={scope} onChange={(e) => setChoice("scope", e.target.value)}>
        <option value="modeled">{state.models.length} source-linked models</option>
        <option value="library">Full library · show model coverage</option>
        {selectedTrial && <option value="selected">Selected study · {selectedTrial}</option>}
      </select></label>}
      <button className="button primary" disabled={disabled} onClick={() => start("registry")}>{running ? "Evaluating…" : "Check live registry & match"}</button>
      <button className="button secondary" disabled={disabled} onClick={() => start("benchmark")}>Run reference case</button>
      {running && <button className="button secondary" onClick={() => command({ type: "cancel-run", id: running.id })}>Cancel</button>}
    </div>
    </details>
    {error && <p className="form-error" role="alert">{error}</p>}
    {run ? <>
      <p className="match-run-status" role="status">
        {run.status === "running" ? "Checking source versions and evaluating criteria…" : run.status === "cancelled" ? "Run cancelled. No new decisions available." : `${run.assessments.length} ${run.assessments.length === 1 ? "pair" : "pairs"} evaluated · ${run.basis === "registry" ? "live registry checked" : "reference snapshot"}`}
        {run.unmodeled.length > 0 && ` · ${run.unmodeled.length} studies without a model`}
      </p>
      {run.status === "complete" && <nav className="match-outcome-filters" aria-label="Filter matching outcomes">
        <button aria-pressed={filter === "all"} onClick={() => setChoice("matchFilter", "all")}>All <strong>{run.assessments.length}</strong></button>
        {(Object.entries(outcomeLabels) as [MatchOutcome, string][]).map(([key, label]) => <button key={key} className={`outcome-${key}`} aria-pressed={filter === key} onClick={() => setChoice("matchFilter", key)}>{label} <strong>{counts[key]}</strong></button>)}
      </nav>}
      <div className="matching-results">
        {results.map((a) => {
          const trial = trials.find((t) => t.id === a.trialId);
          const patient = state.patients.find((p) => p.id === a.patientId);
          const outcome = matchOutcome(a);
          const current = isAssessmentCurrent(state, a);
          const review = `/patients/${a.patientId}/reviews/${a.trialId}?assessment=${encodeURIComponent(a.id)}&run=${run.id}&matchFilter=${encodeURIComponent(filter)}&scope=${encodeURIComponent(scope)}${selectedTrial ? `&trial=${encodeURIComponent(selectedTrial)}` : ""}&from=${direction === "trial-first" ? "studies" : "patient"}`;
          const studyIdentity = trial?.interventions.length
            ? trial.interventions.map((label) => label.replace(/^[^:]+:\s*/, "")).join(" / ")
            : trial?.briefTitle ?? a.trialId;
          const exceptions = a.findings.filter((f) => f.state === "violated" || f.state === "unresolved");
          return <article className={`match-card outcome-${outcome}`} key={a.id}>
            <div className="match-identity"><small>{direction === "patient-first" ? `${a.trialId} · Registry interventions` : patient?.condition}</small>
              <h3>{direction === "patient-first" ? studyIdentity : patient?.label ?? a.patientId}</h3>
              {direction === "trial-first" && <p>{patient?.scenario}</p>}
              <RegistryStatus assessment={a} />
            </div>
            <div className="match-outcome"><strong>{!current && !a.limitation ? "Rerun required" : outcomeLabels[outcome]}</strong>
              <span>{a.score === null ? "No current support score" : `${a.supported} of ${a.denominator} encoded requirements supported`}</span>
              {a.score !== null && <div className="criterion-coverage" role="img" aria-label={`${a.supported} supported, ${a.violated} conflicts, ${a.unresolved} unresolved`}>
                <i className="supported" style={{ flexGrow: a.supported }} /><i className="conflict" style={{ flexGrow: a.violated }} /><i className="gaps" style={{ flexGrow: a.unresolved }} />
              </div>}
              {a.score !== null && a.violated > 0 && <span>{a.violated} conflict{a.violated !== 1 ? "s" : ""}{a.unresolved ? ` · ${a.unresolved} unresolved` : ""}</span>}
              {a.score !== null && !a.violated && a.unresolved > 0 && <span>{a.unresolved} unresolved</span>}
            </div>
            <Link className="button secondary match-review" to={review}>{outcome === "gaps" ? "Review gaps" : outcome === "conflict" ? "Review conflicts" : "Review evidence"}</Link>
            <details className="match-reasons"><summary>Why this outcome</summary>
              {direction === "patient-first" && <p><strong>{trial?.briefTitle ?? a.trialId}</strong></p>}
              {a.limitation ? <p>{a.limitation}</p> : <>
                {exceptions.length ? <ul>{exceptions.slice(0, 3).map((finding) => <li key={finding.criterionId}>
                  <strong>{finding.state === "violated" ? "Conflict" : "Unresolved"}: </strong>
                  {a.modelSnapshot.criteria.find((c) => c.id === finding.criterionId)?.wording}
                  <span>{finding.trace.explanation}</span>
                </li>)}</ul> : <p>All {a.supported} encoded requirements are supported by the supplied evidence. This does not establish final eligibility.</p>}
                {exceptions.length > 3 && <Link to={review}>Review all {exceptions.length} exceptions</Link>}
              </>}
              <dl className="match-provenance">
                <div><dt>Case evaluated as of</dt><dd>{a.evaluatedAt}</dd></div>
                <div><dt>Record / model</dt><dd>v{a.patientVersion} / v{a.modelVersion} · {a.modelSnapshot.status}</dd></div>
                <div><dt>Registry fetched</dt><dd>{a.registryCheck?.fetchedAt ? new Date(a.registryCheck.fetchedAt).toLocaleString() : a.registryCheck ? "Unavailable; no reference fallback" : "Reference snapshot; not a live check"}</dd></div>
                <div><dt>Source version</dt><dd>{a.sourceVersion}</dd></div>
              </dl>
              {a.registryCheck?.locations && <p>{a.registryCheck.locations.filter((l) => l.status === "RECRUITING").length} registry-listed recruiting locations. Capacity and slots are not verified.</p>}
              <Link to={`/trials/${a.trialId}`}>Trial source</Link>{" · "}<a href={a.modelSnapshot.sourceUrl} target="_blank" rel="noreferrer">Official registry</a>
            </details>
          </article>;
        })}
      </div>
      {run.status === "complete" && !results.length && <p>No results in this view. Select All or another study scope.</p>}
      <details className="match-run-details"><summary>Run history and coverage</summary>
        <label>Run<select value={run.id} onChange={(e) => setChoice("run", e.target.value)}>{runs.map((r) => <option key={r.id} value={r.id}>{r.startedAt} · {r.basis === "registry" ? "live" : "reference"} · {r.status}</option>)}</select></label>
        <p>{run.scope}. {run.excluded} studies outside selected scope. Synthetic case date: {SCENARIO_DATE}. Registry checks expire after 15 minutes.</p>
        <p>Models are supplied research interpretations, not clinically validated. Unmodeled studies are not ruled out.</p>
        {run.unmodeled.length > 0 && <details><summary>{run.unmodeled.length} studies need criterion models</summary><div className="unmodeled-studies">{run.unmodeled.map((trialId) => <Link key={trialId} to={`/trials/${trialId}`}>{trialId}</Link>)}</div></details>}
      </details>
    </> : <div className="match-start"><h3>{direction === "patient-first" ? "Use this patient’s source-linked record" : "Evaluate the cohort against this study"}</h3><p>Check current registry evidence, or run the dated reference case. Both compute findings from the record; neither sends patient facts.</p></div>}
  </section>;
}
