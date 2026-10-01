import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/Primitives";
import { MatchingResults } from "../components/MatchingResults";
import { useWorkflow } from "../state/WorkflowState";
import { useTrialData } from "../state/TrialData";
import { CriterionWorkbench } from "../components/CriterionWorkbench";
import { CandidateDisposition } from "../components/CandidateDisposition";
export function StudiesPage() {
  const { state, error } = useWorkflow();
  const { trials } = useTrialData();
  const [params, setParams] = useSearchParams();
  const trialId = params.get("trial") ?? state.models[0]?.trialId;
  const model = state.models.find((m) => m.trialId === trialId);
  const trial = trials.find((t) => t.id === trialId);
  const assessment = state.runs
    .flatMap((r) => r.assessments)
    .find((a) => a.id === params.get("assessment"));
  return (
    <div className="page">
      <PageHeader
        eyebrow="Principal investigator · synthetic workflow"
        title="My studies"
        description="Registry population, criterion interpretation, candidate queue and separate human screening decisions. Persona selection is a demo, not authentication."
      />
      <p>
        <Link to="/trials">Open trial library</Link> ·{" "}
        <Link to="/trials/evidence">Global drugs and topics</Link>
      </p>
      {error && <p role="alert">{error}</p>}
      <label>
        Demonstration study
        <select
          value={trialId ?? ""}
          onChange={(e) => setParams({ trial: e.target.value })}
        >
          {!model&&trialId&&<option value={trialId}>{trialId} · No demonstration model</option>}
          {state.models.map((m) => (
            <option key={m.id} value={m.trialId}>
              {m.trialId} · {trials.find((t) => t.id === m.trialId)?.briefTitle}
            </option>
          ))}
        </select>
      </label>
      {!model&&trialId&&<div className="surface reading-surface"><h2>No published interpretation for this study</h2><p>No candidate score or eligibility label can be produced. Choose one of the six source-linked demonstration studies above, or inspect the public source manually.</p><Link to={`/trials/${trialId}`}>Return to selected trial source</Link></div>}
      {model && trial && (
        <>
          <section className="surface reading-surface">
            <h2>{trial.briefTitle}</h2>
            <p>
              {model.cohort} · model v{model.version} · {model.status} ·{" "}
              {model.complete
                ? "All declared source spans present"
                : "Source interpretation incomplete"}
            </p>
            <p>
              Registry study status: {trial.statusLabel}. Site confirmation and
              slots: unknown.
            </p>
            <strong>{model.qualification}</strong>
            <CriterionWorkbench
              key={`${model.id}:${model.version}`}
              model={model}
            />
          </section>
          <MatchingResults direction="trial-first" id={trial.id} />
          <CandidateDisposition
            key={`${trial.id}:${assessment?.id ?? ""}`}
            trial={trial}
            assessment={assessment}
          />
        </>
      )}
    </div>
  );
}
