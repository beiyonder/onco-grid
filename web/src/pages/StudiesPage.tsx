import { Link, useSearchParams } from "react-router-dom";
import { EmptyState, PageHeader } from "../components/Primitives";
import { MatchingResults } from "../components/MatchingResults";
import { useWorkflow } from "../state/WorkflowState";
import { useTrialData } from "../state/TrialData";
import { CriterionWorkbench } from "../components/CriterionWorkbench";
import { CandidateDisposition } from "../components/CandidateDisposition";
import { usePiAccess } from "../state/usePiAccess";
import { usePilotService } from "../state/PilotService";
import { ReferralList } from "./ReferralPage";

export function StudiesPage() {
  const { state, error } = useWorkflow();
  const { trials } = useTrialData();
  const [params, setParams] = useSearchParams();
  const pi = usePiAccess();
  const { configured, loading } = usePilotService();
  const trialId = params.get("trial") ?? pi.trialIds[0];
  const model = state.models.find((m) => m.trialId === trialId);
  const trial = trials.find((t) => t.id === trialId);
  const assessment = state.runs.flatMap((r) => r.assessments).find((a) => a.id === params.get("assessment") && a.trialId === trialId);
  if (!pi.canAccess()) return <div className="page">
    <EmptyState icon="lock" title={loading ? "Checking study access" : "PI sign-in required"} action={<Link className="button secondary" to="/patients">Open patients</Link>}>
      {configured ? "Sign in with an approved PI account using Staff sign in. Study access is assigned by an administrator." : "Authenticated staff services are not configured. PI workflows remain locked; patient-first matching is available."}
    </EmptyState>
  </div>;
  if (!trialId || !pi.canAccess(trialId)) return <div className="page">
    <EmptyState icon="lock" title="Study access not granted"><Link to="/studies">Return to my studies</Link></EmptyState>
  </div>;
  return <div className="page studies-page">
    <PageHeader eyebrow="Principal investigator" title="My studies" description="Review your study’s candidate queue. Patient records and dispositions remain synthetic." />
    <label>Study<select value={trialId} onChange={(e) => setParams({ trial: e.target.value })}>
      {pi.trialIds.map((id) => <option key={id} value={id}>{id} · {trials.find((t) => t.id === id)?.briefTitle ?? "Public registry study"}</option>)}
    </select></label>
    {error && <p role="alert">{error}</p>}
    <ReferralList trialId={trialId} team />
    {trial && model ? <>
      <details className="study-title">
        <summary><span className="study-queue-title">{trial.briefTitle}</span><small>Study details</small></summary>
        <p>{trial.briefSummary}</p>
        <Link to={`/trials/${trial.id}`}>Open complete study source</Link>
      </details>
      <MatchingResults direction="trial-first" id={trial.id} />
      <details className="surface reading-surface study-model-details">
        <summary>Study source and criterion model</summary>
        <p>{model.cohort} · model v{model.version} · {model.status}</p>
        <p>{model.qualification}</p>
        <Link to={`/trials/${trial.id}`}>Open trial source</Link>
        <CriterionWorkbench key={`${model.id}:${model.version}`} model={model} />
      </details>
      {assessment && <CandidateDisposition key={`${trial.id}:${assessment.id}`} trial={trial} assessment={assessment} />}
    </> : <EmptyState icon="source" title="No source-linked criterion model for this study" action={<Link to={`/trials/global/${trialId}`}>Inspect complete public source</Link>}>
      This study cannot be scored. Its registry requirements need an explicit interpretation.
    </EmptyState>}
  </div>;
}
