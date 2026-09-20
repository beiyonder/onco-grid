import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { trialSnapshotUrl } from "../data/trials";
import type { TrialRecord, TrialSnapshot } from "../types";

type TrialDataStatus = "loading" | "ready" | "error";

interface TrialDataValue {
  status: TrialDataStatus;
  snapshot: TrialSnapshot | null;
  trials: TrialRecord[];
  error: string | null;
  retry: () => void;
  findTrial: (trialId: string | undefined) => TrialRecord | undefined;
}

const TrialDataContext = createContext<TrialDataValue | null>(null);

export function TrialDataProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<TrialDataStatus>("loading");
  const [snapshot, setSnapshot] = useState<TrialSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const retry = useCallback(() => setRequestVersion((current) => current + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fetch(trialSnapshotUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Registry snapshot request failed with ${response.status}`);
        const payload = await response.json() as TrialSnapshot;
        if (!Array.isArray(payload.trials) || typeof payload.retainedCount !== "number" || !payload.source?.dataTimestamp) {
          throw new Error("Registry snapshot did not match the expected schema");
        }
        setSnapshot(payload);
        setStatus("ready");
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setSnapshot(null);
        setError(reason instanceof Error ? reason.message : "Registry snapshot could not be loaded");
        setStatus("error");
      });

    return () => controller.abort();
  }, [requestVersion]);

  const value = useMemo<TrialDataValue>(() => ({
    status,
    snapshot,
    trials: snapshot?.trials ?? [],
    error,
    retry,
    findTrial(trialId) {
      return snapshot?.trials.find((trial) => trial.id === trialId);
    },
  }), [error, retry, snapshot, status]);

  return <TrialDataContext.Provider value={value}>{children}</TrialDataContext.Provider>;
}

export function useTrialData(): TrialDataValue {
  const context = useContext(TrialDataContext);
  if (!context) throw new Error("useTrialData must be used within TrialDataProvider");
  return context;
}
