export function pairKey(
  patientId: string,
  trialId: string,
  cohort: string,
): string {
  return JSON.stringify([patientId, trialId, cohort]);
}
export function informationNeedKey(
  patientId: string,
  concept: string,
  timeWindow: string,
): string {
  return JSON.stringify([patientId, concept, timeWindow]);
}
export function contentVersion(text: string): string {
  // Deterministic change detector, not a cryptographic authenticity claim.
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++)
    hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
  return `content-${(hash >>> 0).toString(16)}-${text.length}`;
}
