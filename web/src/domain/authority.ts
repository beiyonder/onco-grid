import type { RoleId } from "../types";
export type DemoAction =
  | "attach-evidence"
  | "confirm-assertion"
  | "publish-model"
  | "review-criterion"
  | "screening-disposition"
  | "assign"
  | "simulate-handoff";
const permissions: Record<DemoAction, readonly RoleId[]> = {
  "attach-evidence": ["coordinator", "oncologist", "site"],
  "confirm-assertion": ["oncologist"],
  "publish-model": ["oncologist", "site"],
  "review-criterion": ["oncologist", "site"],
  "screening-disposition": ["site"],
  assign: ["coordinator", "oncologist", "site"],
  "simulate-handoff": ["coordinator", "oncologist", "site"],
};
// Persona guards protect demonstration transitions; they are not authentication.
export function requireDemoAuthority(role: RoleId, action: DemoAction): void {
  if (!permissions[action].includes(role))
    throw new Error(
      `The ${role} demo persona cannot ${action.replaceAll("-", " ")}.`,
    );
}
export function canDemoAct(role: RoleId, action: DemoAction): boolean {
  return permissions[action].includes(role);
}
