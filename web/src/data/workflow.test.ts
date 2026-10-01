/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createCriterionModels } from "../domain/criteria";
import { createDemoPatient } from "../domain/patients";
import { assessPair, compareAssessments, evaluatePredicate } from "../domain/evaluate";
import {
  initialWorkflow,
  isAssessmentCurrent,
  transitionWorkflow,
} from "../domain/workflow";
import type { Predicate } from "../domain/model";
const trials = JSON.parse(
  readFileSync(
    new URL("../../data/india-oncology-trials.json", import.meta.url),
    "utf8",
  ),
).trials;
const models = createCriterionModels(trials);
test("unknown exclusions remain unresolved and supported roots cannot compensate for a violation", () => {
  const patient = createDemoPatient(6, 5);
  const model = { ...models[1]!, status: "published" as const };
  const assessment = assessPair(patient, model, "2026-09-20", "test");
  assert.equal(assessment.violated, 1);
  assert.equal(assessment.supported, 5);
  assert.equal(assessment.denominator, 6);
  const missing = {
    ...patient,
    assertions: patient.assertions.filter(
      (a) => a.concept !== "previousCancer",
    ),
  };
  const unknown = assessPair(missing, model, "2026-09-20", "missing");
  assert.equal(unknown.violated, 0);
  assert.equal(unknown.unresolved, 1);
  assert.equal(unknown.denominator, 6);
});
test("draft, zero applicable roots, stale dates, unit mismatch and conflicts abstain", () => {
  const patient = createDemoPatient(1, 0);
  assert.equal(
    assessPair(patient, models[0]!, "2026-09-20", "draft").score,
    null,
  );
  assert.equal(
    assessPair(
      patient,
      { ...models[0]!, status: "published", criteria: [] },
      "2026-09-20",
      "empty",
    ).score,
    null,
  );
  assert.deepEqual(
    evaluatePredicate(
      {
        op: "range",
        concept: "hemoglobin",
        min: 10,
        minInclusive: true,
        maxInclusive: true,
        unit: "g/dL",
        maxAgeDays: 30,
      },
      createDemoPatient(7, 6),
      "2026-09-20",
    ).reasons,
    ["stale"],
  );
  assert.deepEqual(
    evaluatePredicate(
      {
        op: "range",
        concept: "hemoglobin",
        min: 10,
        minInclusive: true,
        maxInclusive: true,
        unit: "g/L",
      },
      patient,
      "2026-09-20",
    ).reasons,
    ["unsupported"],
  );
  assert.deepEqual(
    evaluatePredicate(
      { op: "eq", concept: "egfr", values: ["Detected"] },
      createDemoPatient(3, 2),
      "2026-09-20",
    ).reasons,
    ["conflict"],
  );
});
test("three-valued logical algebra and inclusive interval boundary preserve uncertainty", () => {
  const patient = createDemoPatient(8, 7);
  const yes: Predicate = { op: "eq", concept: "ecog", values: [1] };
  const no: Predicate = { op: "eq", concept: "ecog", values: [3] };
  const missing: Predicate = { op: "eq", concept: "missing", values: [true] };
  assert.equal(
    evaluatePredicate(
      { op: "and", children: [no, missing] },
      patient,
      "2026-09-20",
    ).truth,
    "false",
  );
  assert.equal(
    evaluatePredicate(
      { op: "or", children: [yes, missing] },
      patient,
      "2026-09-20",
    ).truth,
    "true",
  );
  assert.equal(
    evaluatePredicate({ op: "not", child: missing }, patient, "2026-09-20")
      .truth,
    "unknown",
  );
  assert.equal(
    evaluatePredicate(
      {
        op: "interval",
        concept: "therapyEnd",
        anchor: "evaluation-date",
        minDays: 28,
        maxDays: 28,
      },
      patient,
      "2026-09-20",
    ).truth,
    "true",
  );
  assert.equal(
    evaluatePredicate(
      {
        op: "interval",
        concept: "therapyEnd",
        anchor: "evaluation-date",
        minDays: 29,
      },
      patient,
      "2026-09-20",
    ).truth,
    "false",
  );
});
test("record edits invalidate old assessments without mutating historical input snapshots", () => {
  const patient = createDemoPatient(1, 0);
  const model = { ...models[0]!, status: "published" as const };
  const assessment = assessPair(patient, model, "2026-09-20", "old");
  const state = { ...initialWorkflow, patients: [patient], models: [model] };
  const next = transitionWorkflow(
    state,
    { type: "provide", patientId: patient.id, concept: "ecog", value: 3 },
    "coordinator",
    "Demo coordinator",
    "2026-09-20",
    "edit",
  );
  assert.equal(isAssessmentCurrent(next, assessment), false);
  assert.equal(
    assessment.assertionSnapshot.find((a) => a.concept === "ecog")?.value,
    1,
  );
  assert.throws(
    () =>
      transitionWorkflow(
        state,
        { type: "provide", patientId: patient.id, concept: "ecog", value: 3 },
        "auditor",
        "Auditor",
        "2026-09-20",
        "denied",
      ),
    /read-only/,
  );
  assert.throws(
    () =>
      transitionWorkflow(
        next,
        {
          type: "confirm",
          patientId: patient.id,
          assertionId: next.patients[0]!.assertions.at(-1)!.id,
          reason: "review",
        },
        "coordinator",
        "Coordinator",
        "2026-09-20",
        "denied",
      ),
    /cannot/,
  );
});

test("inclusive numeric bounds, strict sequence, future and partial dates remain explicit", () => {
  const patient = createDemoPatient(1, 0);
  const range: Predicate = {op:"range",concept:"age",min:56,max:56,minInclusive:true,maxInclusive:true,unit:"years"};
  assert.equal(evaluatePredicate(range,patient,"2026-09-20").truth,"true");
  assert.equal(evaluatePredicate({...range,minInclusive:false},patient,"2026-09-20").truth,"false");
  const sequence: Predicate = {op:"sequence",concepts:["therapyStart","therapyEnd"]};
  assert.equal(evaluatePredicate(sequence,patient,"2026-09-20").truth,"true");
  assert.equal(evaluatePredicate({op:"sequence",concepts:["therapyEnd","therapyStart"]},patient,"2026-09-20").truth,"false");
  const future={...patient,assertions:patient.assertions.map(a=>a.concept==="therapyStart"?{...a,observedAt:"2026-10-01"}:a)};
  assert.deepEqual(evaluatePredicate(sequence,future,"2026-09-20").reasons,["ambiguous"]);
  const partial={...patient,assertions:patient.assertions.map(a=>a.concept==="therapyEnd"?{...a,value:"2026-08"}:a)};
  assert.deepEqual(evaluatePredicate(sequence,partial,"2026-09-20").reasons,["ambiguous"]);
});

test("known blockers cannot be outranked by a higher support fraction", () => {
  const model={...models[0]!,status:"published" as const};
  const uncertain=assessPair(createDemoPatient(11,10),model,"2026-09-20","uncertain");
  const blocked=assessPair(createDemoPatient(6,5),model,"2026-09-20","blocked");
  assert.ok(blocked.score!>uncertain.score!);
  assert.ok(compareAssessments(uncertain,blocked)<0);
});
