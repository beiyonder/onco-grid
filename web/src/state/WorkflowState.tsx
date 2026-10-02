import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppState } from "./AppState";
import { useTrialData } from "./TrialData";
import { createReferenceModels } from "../domain/criteria";
import { assessPair, compareAssessments } from "../domain/evaluate";
import { SCENARIO_DATE, type MatchRun } from "../domain/model";
import { assessWithRegistry, refreshMatchingSource } from "../domain/liveMatching";
import { usePiAccess } from "./usePiAccess";
import {
  initialWorkflow,
  transitionWorkflow,
  type WorkflowCommand,
  type WorkflowState,
} from "../domain/workflow";
interface WorkflowContextValue {
  state: WorkflowState;
  error: string;
  command: (command: WorkflowCommand) => boolean;
  runMatching: (
    direction: MatchRun["direction"],
    id: string,
    trialIds?: string[],
    basis?: "registry" | "benchmark",
  ) => Promise<string>;
}
const WorkflowContext = createContext<WorkflowContextValue | null>(null);
export function WorkflowProvider({ children }: { children: ReactNode }) {
  const { roleId, role } = useAppState();
  const { trials } = useTrialData();
  const pi = usePiAccess();
  const authority = useRef({ roleId, role, pi });
  authority.current = { roleId, role, pi };
  const requests = useRef(new Map<string, AbortController>());
  const [state, setState] = useState(initialWorkflow);
  const current = useRef(state);
  const [error, setError] = useState("");
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      for (const request of requests.current.values()) request.abort();
    };
  }, []);
  function command(action: WorkflowCommand): boolean {
    try {
      const access = authority.current;
      const referralTeamAction = (action.type === "referral-message" && action.side === "team") ||
        (action.type === "referral-action" && !["queue", "withdraw"].includes(action.action));
      const piTrial = referralTeamAction && "id" in action
        ? current.current.referrals.find((r) => r.id === action.id)?.trialId
        : action.type === "publish" ? action.model.trialId
        : action.type === "disposition"
          ? current.current.runs.flatMap((run) => run.assessments).find((a) => a.id === action.value.assessmentId)?.trialId
          : action.type === "start-run" && action.run.direction === "trial-first"
            ? action.run.scope.split(" ·")[0] : undefined;
      const piAction = referralTeamAction || action.type === "publish" || action.type === "disposition" ||
        (action.type === "start-run" && action.run.direction === "trial-first");
      if (piAction && (!piTrial || !access.pi.canAccess(piTrial))) {
        throw new Error("An authenticated PI grant for this study is required.");
      }
      if (action.type === "cancel-run") requests.current.get(action.id)?.abort();
      const next = transitionWorkflow(
        current.current,
        action,
        piAction ? "site" : access.roleId,
        piAction ? access.pi.actor : access.role.name,
        new Date().toISOString(),
        crypto.randomUUID(),
      );
      current.current = next;
      setState(next);
      setError("");
      return true;
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "The transition could not be completed.",
      );
      return false;
    }
  }
  useEffect(() => {
    if (trials.length && !current.current.models.length) {
      const next = {
        ...current.current,
        models: createReferenceModels(trials),
      };
      current.current = next;
      setState(next);
    }
  }, [trials]);
  async function runMatching(
    direction: MatchRun["direction"],
    id: string,
    trialIds?: string[],
    basis: "registry" | "benchmark" = "registry",
  ): Promise<string> {
    const frozen = current.current;
    if (frozen.runs.some((r) => r.status === "running" && r.direction === direction && r.scope.startsWith(`${id} ·`))) return "";
    const patients =
      direction === "patient-first"
        ? frozen.patients.filter((p) => p.id === id)
        : frozen.patients;
    const scopeTrials =
      direction === "trial-first"
        ? trials.filter((t) => t.id === id)
        : trialIds
          ? trials.filter((t) => trialIds.includes(t.id))
          : trials;
    const scopeIds = new Set(scopeTrials.map((t) => t.id));
    const models = frozen.models.filter((m) => scopeIds.has(m.trialId));
    const runId = crypto.randomUUID();
    const run: MatchRun = {
      id: runId,
      direction,
      scope:
        direction === "patient-first"
          ? `${id} · ${scopeTrials.length} explicitly included registry studies; no biomarker exclusions`
          : `${id} · ${patients.length} synthetic patients; registry population`,
      startedAt: new Date().toISOString(),
      status: "running",
      basis,
      assessments: [],
      retrieved:
        direction === "patient-first" ? scopeTrials.length : patients.length,
      excluded:
        direction === "patient-first" ? trials.length - scopeTrials.length : 0,
      unmodeled: scopeTrials
        .filter((t) => !models.some((m) => m.trialId === t.id))
        .map((t) => t.id),
    };
    if (!command({ type: "start-run", run })) return "";
    const controller = new AbortController();
    requests.current.set(runId, controller);
    const active = () => mounted.current && !controller.signal.aborted &&
      current.current.runs.find((r) => r.id === runId)?.status === "running" &&
      (direction !== "trial-first" || authority.current.pi.canAccess(id));
    const checks = basis === "registry"
      ? await Promise.all(models.map((model) => refreshMatchingSource(model, controller.signal)))
      : [];
    if (!active()) {
      requests.current.delete(runId);
      if (mounted.current) command({ type: "cancel-run", id: runId });
      return runId;
    }
    if (checks.length) command({ type: "registry-checks", checks });
    const assessments = [];
    for (const patient of patients) {
      for (const model of models) {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        if (!active()) {
          requests.current.delete(runId);
          if (mounted.current) command({ type: "cancel-run", id: runId });
          return runId;
        }
        const assessmentId = `${runId}:${patient.id}:${model.id}`;
        const check = checks.find((entry) => entry.trialId === model.trialId);
        assessments.push(check
          ? assessWithRegistry(patient, model, check, SCENARIO_DATE, assessmentId)
          : assessPair(patient, model, SCENARIO_DATE, assessmentId));
      }
    }
    requests.current.delete(runId);
    command({
      type: "complete-run",
      run: {
        ...run,
        status: "complete",
        assessments: assessments.sort(compareAssessments),
      },
    });
    return runId;
  }
  return (
    <WorkflowContext.Provider value={{ state, error, command, runMatching }}>
      {children}
    </WorkflowContext.Provider>
  );
}
export function useWorkflow(): WorkflowContextValue {
  const context = useContext(WorkflowContext);
  if (!context) throw new Error("WorkflowProvider is required.");
  return context;
}
