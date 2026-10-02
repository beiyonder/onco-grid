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
test("referral precedes PI disposition and preserves a two-way, role-owned conversation", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const assessment = assessPair(patient, model, "2026-09-20", "complete");
  let state: WorkflowState = { ...initialWorkflow, patients: [patient], models: [model], runs: [completedRun([assessment])] };
  assert.throws(() => apply(state, { type: "create-referral", assessmentId: assessment.id }, "oncologist"));
  state = apply(state, { type: "bulk-accept", assessmentId: assessment.id, criterionIds: assessment.findings.map((f) => f.criterionId) }, "oncologist");
  state = apply(state, { type: "create-referral", assessmentId: assessment.id }, "oncologist");
  const referral = state.referrals[0]!;
  assert.equal(referral.state, "Draft");
  assert.equal(state.dispositions.length, 0);
  assert.equal(state.shortlist.length, 0);
  assert.throws(() => apply(state, { type: "create-referral", assessmentId: assessment.id }, "oncologist"));
  assert.throws(() => apply(state, { type: "referral-action", id: referral.id, action: "queue", body: "Please review the supplied synthetic packet." }, "oncologist"));
  state = apply(state, { type: "referral-action", id: referral.id, action: "queue", body: "Please review the supplied synthetic packet.", confirmed: true }, "oncologist");
  assert.equal(state.referrals[0]!.state, "Awaiting team");
  assert.throws(() => apply(state, { type: "referral-action", id: referral.id, action: "acknowledge", body: "Received." }, "oncologist"));
  state = apply(state, { type: "referral-action", id: referral.id, action: "acknowledge", body: "Study team received the packet." });
  state = apply(state, { type: "referral-action", id: referral.id, action: "assign", owner: "Principal investigator", body: "PI owns the next review." });
  assert.equal(state.referrals[0]!.teamOwner, "Principal investigator");
  state = apply(state, { type: "referral-action", id: referral.id, action: "request-information", body: "Please clarify the supplied source date." });
  assert.equal(state.referrals[0]!.state, "Needs information");
  state = apply(state, { type: "referral-message", id: referral.id, side: "referrer", body: "The supplied source date is 2026-09-18." }, "coordinator");
  state = apply(state, { type: "referral-action", id: referral.id, action: "queue", body: "Clarification attached in the conversation.", confirmed: true }, "oncologist");
  state = apply(state, { type: "referral-action", id: referral.id, action: "acknowledge", body: "Review resumed." });
  state = apply(state, { type: "referral-action", id: referral.id, action: "ready", body: "Operational screening review recorded; not eligibility." });
  assert.equal(state.referrals[0]!.state, "Ready for site screening");
  assert.deepEqual(state.referrals[0]!.events.filter((event) => event.kind === "Message").map((event) => [event.side, event.body]), [["referrer", "The supplied source date is 2026-09-18."]]);
  assert.equal(referral.state, "Draft");
  assert.equal(referral.events.length, 0);
  state = apply(state, { type: "referral-action", id: referral.id, action: "close", body: "Operational discussion completed." });
  assert.throws(() => apply(state, { type: "referral-message", id: referral.id, side: "team", body: "Cannot append after closure." }));
});

test("stale referral packets block release but preserve clarification and withdrawal", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const assessment = assessPair(patient, model, "2026-09-20", "complete");
  let state: WorkflowState = { ...initialWorkflow, patients: [patient], models: [model], runs: [completedRun([assessment])] };
  state = apply(state, { type: "bulk-accept", assessmentId: assessment.id, criterionIds: assessment.findings.map((f) => f.criterionId) });
  state = apply(state, { type: "create-referral", assessmentId: assessment.id });
  const id = state.referrals[0]!.id;
  state = apply(state, { type: "referral-action", id, action: "queue", body: "Request review.", confirmed: true });
  state = apply(state, { type: "referral-action", id, action: "acknowledge", body: "Received." });
  const rows = model.criteria.map((criterion) => ({ id: criterion.id, predicate: criterion.predicate }));
  rows[0]!.predicate = { op: "unsupported", reason: "Revised interpretation needs human review" };
  state = apply(state, { type: "publish", model: reviseModel(model, JSON.stringify(rows)), reason: "Protocol interpretation changed" });
  assert.equal(isAssessmentCurrent(state, assessment), false);
  assert.equal(assessment.modelSnapshot.criteria[0]!.predicate.op, "and");
  assert.throws(() => apply(state, { type: "referral-action", id, action: "ready", body: "Stale packet must not pass." }));
  state = apply(state, { type: "referral-action", id, action: "request-information", body: "A new reviewed assessment is needed." });
  assert.throws(() => apply(state, { type: "referral-action", id, action: "queue", body: "Still stale.", confirmed: true }));
  state = apply(state, { type: "referral-message", id, side: "referrer", body: "We are reviewing the changed source." }, "oncologist");
  state = apply(state, { type: "referral-action", id, action: "withdraw", body: "Withdraw pending renewed source review." }, "oncologist");
  assert.equal(state.referrals[0]!.state, "Withdrawn");
  assert.equal(state.referrals[0]!.reviews.length, assessment.findings.length);
});
test("replacement referral packets require the same patient and study and a fresh complete review", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const original = assessPair(patient, model, "2026-09-20", "original");
  let state: WorkflowState = { ...initialWorkflow, patients: [patient], models: [model], runs: [completedRun([original])] };
  state = apply(state, { type: "bulk-accept", assessmentId: original.id, criterionIds: original.findings.map((f) => f.criterionId) });
  state = apply(state, { type: "create-referral", assessmentId: original.id });
  const draft = state.referrals[0]!;
  const revised = { ...patient, version: patient.version + 1 };
  const replacement = assessPair(revised, model, "2026-09-20", "replacement");
  const foreign = createDemoPatient(2, 0);
  const foreignAssessment = assessPair(foreign, model, "2026-09-20", "foreign");
  state = { ...state, patients: [revised, foreign], runs: [...state.runs, completedRun([replacement, foreignAssessment], "new-run")] };
  assert.throws(() => apply(state, { type: "refresh-referral", id: draft.id, assessmentId: foreignAssessment.id }));
  assert.throws(() => apply(state, { type: "refresh-referral", id: draft.id, assessmentId: replacement.id }));
  state = apply(state, { type: "bulk-accept", assessmentId: replacement.id, criterionIds: replacement.findings.map((f) => f.criterionId) });
  state = apply(state, { type: "refresh-referral", id: draft.id, assessmentId: replacement.id });
  assert.equal(state.referrals[0]!.assessmentId, replacement.id);
  assert.ok(state.referrals[0]!.reviews.every((review) => review.assessmentId === replacement.id));
  assert.equal(draft.assessmentId, original.id);
  state = apply(state, { type: "referral-action", id: draft.id, action: "queue", body: "Updated reviewed packet.", confirmed: true });
  assert.equal(state.referrals[0]!.state, "Awaiting team");
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
