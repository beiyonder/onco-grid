import { hasPiAccess } from "../domain/piAccess";
import { usePilotService } from "./PilotService";

export function usePiAccess() {
  const { session, profile, piTrialIds, loading } = usePilotService();
  const canAccess = (trialId?: string) => !loading && hasPiAccess(
    session?.user.id, session?.expires_at, profile, piTrialIds, trialId,
  );
  return { canAccess, trialIds: canAccess() ? piTrialIds : [], actor: profile?.display_name ?? "PI" };
}
