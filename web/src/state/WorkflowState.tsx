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
import { createCriterionModels } from "../domain/criteria";
import { assessPair, compareAssessments } from "../domain/evaluate";
import { SCENARIO_DATE, type MatchRun } from "../domain/model";
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
  ) => Promise<string>;
}
const WorkflowContext = createContext<WorkflowContextValue | null>(null);
export function WorkflowProvider({ children }: { children: ReactNode }) {
  const { roleId, role } = useAppState();
  const { trials } = useTrialData();
  const [state, setState] = useState(initialWorkflow);
  const current = useRef(state);
  const [error, setError] = useState("");
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  function command(action: WorkflowCommand): boolean {
    try {
      const next = transitionWorkflow(
        current.current,
        action,
        roleId,
        role.name,
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
        models: createCriterionModels(trials),
      };
      current.current = next;
      setState(next);
    }
  }, [trials]);
  async function runMatching(
    direction: MatchRun["direction"],
    id: string,
    trialIds?: string[],
  ): Promise<string> {
    const frozen = current.current;
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
    const assessments = [];
    for (const patient of patients) {
      for (const model of models) {
        await new Promise<void>((resolve) => window.setTimeout(resolve, 0));
        if (
          !mounted.current ||
          current.current.runs.find((r) => r.id === runId)?.status !== "running"
        )
          return runId;
        assessments.push(
          assessPair(
            patient,
            model,
            SCENARIO_DATE,
            `${runId}:${patient.id}:${model.id}`,
          ),
        );
      }
    }
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
