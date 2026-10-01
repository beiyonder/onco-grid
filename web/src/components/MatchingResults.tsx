import { Link, useSearchParams } from "react-router-dom";
import { useWorkflow } from "../state/WorkflowState";
import { useTrialData } from "../state/TrialData";
import { useAppState } from "../state/AppState";
import { isAssessmentCurrent } from "../domain/workflow";
import type { Assessment, MatchRun } from "../domain/model";
export function AssessmentVector({ assessment }: { assessment: Assessment }) {
  return (
    <div className="assessment-vector">
      <strong>
        {assessment.score === null
          ? "Not assessable"
          : `${assessment.supported}/${assessment.denominator} supported · ${Math.round(assessment.score * 100)}%`}
      </strong>
      <span>{assessment.violated} blocking violations</span>
      <span>{assessment.unresolved} unresolved</span>
      <span>{assessment.notApplicable} not applicable</span>
      {assessment.assessability !== null && (
        <span>{Math.round(assessment.assessability * 100)}% assessable</span>
      )}
      {assessment.limitation && <p>{assessment.limitation}</p>}
    </div>
  );
}
export function MatchingResults({
  direction,
  id,
}: {
  direction: MatchRun["direction"];
  id: string;
}) {
  const { state, runMatching, command, error } = useWorkflow();
  const { trials, status } = useTrialData();
  const { roleId } = useAppState();
  const [params,setParams] = useSearchParams();
  const scope=params.get("scope")??"library";
  const selectedTrial=params.get("trial");
  const selected=params.get("run")??"";
  const filter=params.get("matchFilter")??"all";
  const setChoice=(key:string,value:string)=>{const next=new URLSearchParams(params);next.set(key,value);setParams(next,{replace:true});};
  const runs=state.runs.filter(r=>r.direction===direction&&r.scope.startsWith(`${id} ·`));
  const run = runs.find((r) => r.id === selected) ?? runs.at(-1);
  const running = runs.find((r) => r.status === "running");
  const results =
    run?.assessments.filter(
      (a) =>
        filter === "all" ||
        (filter === "blockers" && a.violated > 0) ||
        (filter === "unresolved" && a.unresolved > 0) ||
        (filter === "unassessable" && a.score === null),
    ) ?? [];
  return (
    <section className="matching-workbench">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Deterministic synthetic pre-screening</p>
          <h2>
            {direction === "patient-first"
              ? "Find matching trials"
              : "Screen synthetic cohort"}
          </h2>
          <p>
            Frozen record, model, source and evaluation-date versions. Unknowns
            never silently remove a candidate.
          </p>
        </div>
        <Link className="button secondary" to="/studies">
          Review demo criterion models
        </Link>
      </div>
      <div className="matching-controls">
        {direction === "patient-first" && (
          <label>
            Declared candidate scope
            <select value={scope} onChange={(e) => setChoice("scope",e.target.value)}>
              <option value="library">
                All {trials.length} library studies
              </option>
              <option value="modeled">
                Six source-linked demonstration studies
              </option>
              {selectedTrial&&<option value="selected">Explicitly selected study: {selectedTrial}</option>}
            </select>
          </label>
        )}
        <button
          className="button primary"
          disabled={!!running || roleId === "auditor" || status !== "ready"}
          onClick={() => {
            setChoice("run","");
            void runMatching(direction,id,scope==="selected"&&selectedTrial?[selectedTrial]:scope==="modeled"?state.models.map(m=>m.trialId):undefined);
          }}
        >
          {running ? "Evaluating frozen inputs…" : "Run pre-screening"}
        </button>
        {running && (
          <button
            className="button secondary"
            onClick={() => command({ type: "cancel-run", id: running.id })}
          >
            Cancel run
          </button>
        )}
      </div>
      <details>
        <summary>Review order, score and limitations</summary>
        <p>
          Published complete models only. Applicable top-level roots form the
          denominator; unknown, conflict and unsupported rules remain in it. No
          known violations precede blocking violations, then descending support
          fraction, fewer unresolved requirements, stable identity. This is
          demonstration review order—not eligibility probability, treatment
          benefit or clinical superiority. Close-match labels require a
          separately approved policy and remain disabled.
        </p>
        <p>
          Models start as drafts. The demo oncologist or trial-side persona must
          inspect and publish them. Publication is a simulated workflow, not
          clinical qualification.
        </p>
      </details>
      {error && <p role="alert">{error}</p>}
      {run ? (
        <>
          <label>
            Run history
            <select
              value={run.id}
              onChange={(e) => setChoice("run",e.target.value)}
            >
              {runs.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.startedAt} · {r.status}
                </option>
              ))}
            </select>
          </label>
          <p role="status">
            {run.status} · {run.scope} · {run.assessments.length} evaluated
            pairs · {run.unmodeled.length} studies require interpretation ·{" "}
            {run.excluded} excluded by explicit scope.
          </p>
          <label>
            Show
            <select value={filter} onChange={(e) => setChoice("matchFilter",e.target.value)}>
              <option value="all">All results</option>
              <option value="blockers">Known violations</option>
              <option value="unresolved">Unresolved requirements</option>
              <option value="unassessable">Not assessable</option>
            </select>
          </label>
          <div className="matching-results">
            {results.map((a) => {
              const trial = trials.find((t) => t.id === a.trialId);
              const patient = state.patients.find((p) => p.id === a.patientId);
              const prior = runs
                .filter((r) => r.id !== run.id && r.startedAt < run.startedAt)
                .flatMap((r) => r.assessments)
                .filter((p) => p.pairKey === a.pairKey)
                .at(-1);
              return (
                <article className="match-card" key={a.id}>
                  <div>
                    <small>
                      {a.trialId} · {a.cohort} · record v{a.patientVersion} /
                      model v{a.modelVersion}
                    </small>
                    <h3>
                      {direction === "patient-first"
                        ? trial?.briefTitle
                        : patient?.label}
                    </h3>
                    {!isAssessmentCurrent(state, a) && (
                      <strong className="stale-label">
                        Stale — rerun before decisions
                      </strong>
                    )}
                  </div>
                  <AssessmentVector assessment={a} />
                  {prior && (
                    <p>
                      Since prior run:{" "}
                      {a.supported - prior.supported >= 0 ? "+" : ""}
                      {a.supported - prior.supported} supported;{" "}
                      {a.violated - prior.violated >= 0 ? "+" : ""}
                      {a.violated - prior.violated} violations.
                    </p>
                  )}
                  <Link
                    className="button secondary"
                    to={`/patients/${a.patientId}/reviews/${a.trialId}?assessment=${encodeURIComponent(a.id)}&run=${run.id}&matchFilter=${encodeURIComponent(filter)}&scope=${encodeURIComponent(scope)}${selectedTrial?`&trial=${encodeURIComponent(selectedTrial)}`:""}&from=${direction === "trial-first" ? "studies" : "patient"}`}
                  >
                    Inspect criteria and gaps
                  </Link>
                </article>
              );
            })}
          </div>
          {run.status === "complete" && !results.length && (
            <p>
              No assessable results under this filter. Broaden the filter or
              review criterion-model coverage; no clinical conclusion is
              implied.
            </p>
          )}
          <details>
            <summary>
              {run.unmodeled.length} retrieved studies without models
            </summary>
            {run.unmodeled.map((trialId) => (
              <p key={trialId}>
                <Link to={`/trials/${trialId}`}>
                  {trialId} — requires criterion interpretation
                </Link>
              </p>
            ))}
          </details>
        </>
      ) : (
        <p>
          No run yet. Patient context remains local; registry requests never
          contain patient facts.
        </p>
      )}
    </section>
  );
}
