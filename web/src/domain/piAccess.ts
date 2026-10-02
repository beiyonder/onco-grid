export function hasPiAccess(
  userId: string | undefined,
  expiresAt: number | undefined,
  profile: { user_id: string; role: string } | null,
  trialIds: readonly string[],
  trialId?: string,
  now = Date.now(),
): boolean {
  return !!userId && !!expiresAt && expiresAt * 1000 > now &&
    profile?.user_id === userId &&
    (profile.role === "oncologist" || profile.role === "site") &&
    (trialId ? trialIds.includes(trialId) : trialIds.length > 0);
}
