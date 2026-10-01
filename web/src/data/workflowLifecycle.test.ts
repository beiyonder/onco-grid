/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createCriterionModels } from "../domain/criteria";
import { createDemoPatient } from "../domain/patients";
import { assessPair, evaluatePredicate } from "../domain/evaluate";
import {
  initialWorkflow,
  isAssessmentCurrent,
  transitionWorkflow,
  type WorkflowState,
  type WorkflowCommand,
} from "../domain/workflow";
import { informationNeeds } from "../domain/informationNeeds";
import type { Assessment, MatchRun } from "../domain/model";
import { reviseModel } from "../domain/modelRevision";
const models = createCriterionModels(
  JSON.parse(
    readFileSync(
      new URL("../../data/india-oncology-trials.json", import.meta.url),
      "utf8",
    ),
  ).trials,
);
function apply(
  state: WorkflowState,
  command: WorkflowCommand,
  role: "site" | "oncologist" | "coordinator" = "site",
) {
  return transitionWorkflow(
    state,
    command,
    role,
    `Demo ${role}`,
    "2026-09-20",
    `event-${state.audit.length}`,
  );
}
function completedRun(assessments: Assessment[], id = "run"): MatchRun {
  return {
    id,
    direction: "patient-first",
    scope: "Explicit demo models",
    startedAt: "2026-09-20",
    status: "complete",
    assessments,
    retrieved: assessments.length,
    excluded: 0,
    unmodeled: [],
  };
}
test("shared information need links distinct trial criteria and acquisition never confirms itself", () => {
  const patient = createDemoPatient(11, 10);
  const published = models
    .slice(0, 2)
    .map((m) => ({ ...m, status: "published" as const }));
  const assessments = published.map((m) =>
    assessPair(patient, m, "2026-09-20", m.id),
  );
  let state: WorkflowState = {
    ...initialWorkflow,
    patients: [patient],
    models: published,
    runs: [completedRun(assessments)],
  };
  for (const assessment of assessments) {
    const criterion = assessment.modelSnapshot.criteria.find((c) =>
      informationNeeds(c.predicate, patient, assessment.evaluatedAt).some(
        (n) => n.concept === "age",
      ),
    )!;
    const need = informationNeeds(
      criterion.predicate,
      patient,
      assessment.evaluatedAt,
    ).find((n) => n.concept === "age")!;
    state = apply(state, {
      type: "accept-gap",
      assessmentId: assessment.id,
      criterionId: criterion.id,
      ...need,
      owner: "Demo coordinator",
    });
  }
  assert.equal(state.gaps.length, 1);
  assert.equal(state.gaps[0]!.links.length, 2);
  const gap = state.gaps[0]!;
  state = apply(
    state,
    {
      type: "provide",
      patientId: patient.id,
      concept: "age",
      value: 56,
      gapId: gap.id,
    },
    "coordinator",
  );
  assert.equal(state.gaps[0]!.state, "evidence-received");
  assert.equal(state.patients[0]!.assertions.at(-1)!.authority, "unreviewed");
  const age = {
    op: "range" as const,
    concept: "age",
    min: 18,
    minInclusive: true,
    maxInclusive: true,
    unit: "years",
  };
  assert.equal(
    evaluatePredicate(age, state.patients[0]!, "2026-09-20").truth,
    "unknown",
  );
  state = apply(
    state,
    {
      type: "confirm",
      patientId: patient.id,
      assertionId: state.patients[0]!.assertions.at(-1)!.id,
      reason: "Exact original source inspected",
    },
    "oncologist",
  );
  assert.equal(state.gaps[0]!.state, "reviewed");
  const run = completedRun(
    published.map((m) =>
      assessPair(state.patients[0]!, m, "2026-09-20", `updated-${m.id}`),
    ),
    "rerun",
  );
  state = apply(state, {
    type: "start-run",
    run: { ...run, status: "running", assessments: [] },
  });
  state = apply(state, { type: "complete-run", run });
  assert.equal(state.gaps[0]!.state, "reassessed");
  assert.equal(
    evaluatePredicate(age, state.patients[0]!, "2026-09-20").truth,
    "true",
  );
});
test("unable-to-obtain cannot manufacture satisfaction or permit bulk acceptance", () => {
  const patient = createDemoPatient(11, 10);
  const model = { ...models[0]!, status: "published" as const };
  const a = assessPair(patient, model, "2026-09-20", "thin");
  let state: WorkflowState = {
    ...initialWorkflow,
    patients: [patient],
    models: [model],
    runs: [completedRun([a])],
  };
  const c = model.criteria[0]!;
  const need = informationNeeds(c.predicate, patient, a.evaluatedAt)[0]!;
  state = apply(state, {
    type: "accept-gap",
    assessmentId: a.id,
    criterionId: c.id,
    ...need,
    owner: "Demo coordinator",
  });
  state = apply(state, {
    type: "close-gap",
    id: state.gaps[0]!.id,
    state: "unable-to-obtain",
    reason: "Synthetic source unavailable",
  });
  assert.equal(state.gaps[0]!.state, "unable-to-obtain");
  assert.deepEqual(
    assessPair(state.patients[0]!, model, a.evaluatedAt, "after").findings,
    a.findings,
  );
  assert.throws(
    () =>
      apply(state, {
        type: "bulk-accept",
        assessmentId: a.id,
        criterionIds: [c.id],
      }),
    /supported/,
  );
});
test("reviewed shortlist and PI disposition gate simulation; protocol revision invalidates release", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const a = assessPair(patient, model, "2026-09-20", "complete");
  let state: WorkflowState = {
    ...initialWorkflow,
    patients: [patient],
    models: [model],
    runs: [completedRun([a])],
  };
  assert.throws(
    () => apply(state, { type: "packet", assessmentId: a.id }),
    /Shortlist/,
  );
  state = apply(state, { type: "shortlist", assessmentId: a.id });
  assert.throws(
    () => apply(state, { type: "packet", assessmentId: a.id }),
    /every criterion/,
  );
  state = apply(state, {
    type: "bulk-accept",
    assessmentId: a.id,
    criterionIds: a.findings.map((f) => f.criterionId),
  });
  assert.throws(
    () => apply(state, { type: "packet", assessmentId: a.id }),
    /trial-side/,
  );
  state = apply(state, {
    type: "disposition",
    value: {
      assessmentId: a.id,
      site: "Synthetic listed site",
      assignedTo: "Demo PI",
      state: "Ready for site screening",
      reason: "Manual demo review",
      evidence: "Source-linked criteria",
    },
  });
  state = apply(state, { type: "packet", assessmentId: a.id });
  const id = state.packets[0]!.id;
  state = apply(state, { type: "advance-packet", id });
  state = apply(state, { type: "advance-packet", id });
  assert.equal(state.packets[0]!.state, "Simulated acknowledgement");
  const rows = model.criteria.map((c) => ({
    id: c.id,
    predicate: c.predicate,
  }));
  rows[0]!.predicate = {
    op: "unsupported",
    reason: "Revised interpretation needs human review",
  };
  state = apply(state, {
    type: "publish",
    model: reviseModel(model, JSON.stringify(rows)),
    reason: "Protocol interpretation changed",
  });
  assert.equal(isAssessmentCurrent(state, a), false);
  assert.equal(a.modelSnapshot.criteria[0]!.predicate.op, "and");
  assert.throws(() => apply(state, { type: "advance-packet", id }), /stale/);
});
test("cancelled and stale asynchronous completions cannot replace current results", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const a = assessPair(patient, model, "2026-09-20", "frozen");
  const run = completedRun([a]);
  let state: WorkflowState = {
    ...initialWorkflow,
    patients: [patient],
    models: [model],
  };
  state = apply(state, {
    type: "start-run",
    run: { ...run, status: "running", assessments: [] },
  });
  state = apply(state, { type: "cancel-run", id: run.id });
  state = apply(state, { type: "complete-run", run });
  assert.equal(state.runs[0]!.status, "cancelled");
  assert.deepEqual(state.runs[0]!.assessments, []);
  const second = { ...run, id: "second" };
  state = apply(state, {
    type: "start-run",
    run: { ...second, status: "running", assessments: [] },
  });
  state = apply(
    state,
    { type: "provide", patientId: patient.id, concept: "ecog", value: 3 },
    "coordinator",
  );
  state = apply(state, { type: "complete-run", run: second });
  assert.equal(state.runs[1]!.status, "cancelled");
  assert.deepEqual(state.runs[1]!.assessments, []);
});
test("applicability excludes known false branches; unknown branches stay in denominator", () => {
  const p = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const branch = {
    ...model,
    criteria: [
      {
        ...model.criteria[0]!,
        applicability: {
          op: "eq" as const,
          concept: "sex",
          values: ["Female"],
        },
      },
    ],
  };
  const no = assessPair(p, branch, "2026-09-20", "na");
  assert.equal(no.notApplicable, 1);
  assert.equal(no.denominator, 0);
  assert.equal(no.score, null);
  const missing = assessPair(
    { ...p, assertions: p.assertions.filter((a) => a.concept !== "sex") },
    branch,
    "2026-09-20",
    "unknown",
  );
  assert.equal(missing.unresolved, 1);
  assert.equal(missing.denominator, 1);
  assert.throws(() => reviseModel(model, "[]"), /Every source/);
});
