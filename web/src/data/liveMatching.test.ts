/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createReferenceModels } from "../domain/criteria";
import { createDemoPatient } from "../domain/patients";
import { checkRegistryModel, assessWithRegistry } from "../domain/liveMatching";
import { projectSnapshotTrial } from "../domain/registry";
import { hasPiAccess } from "../domain/piAccess";
import { initialWorkflow, isAssessmentCurrent, transitionWorkflow } from "../domain/workflow";
import type { TrialRecord } from "../types";

const trials: TrialRecord[] = JSON.parse(readFileSync(new URL("../../data/india-oncology-trials.json", import.meta.url), "utf8")).trials;
const model = createReferenceModels(trials)[0]!;
const trial = trials.find((entry) => entry.id === model.trialId)!;
const patient = createDemoPatient(1, 0);
const at = "2026-10-02T09:00:00.000Z";

test("an added registry requirement invalidates the whole model even when all encoded excerpts remain", () => {
  const study = projectSnapshotTrial({ ...trial, eligibilityCriteria: `${trial.eligibilityCriteria}\nAdditional inclusion requirement` }, at);
  const check = checkRegistryModel(model, study, at);
  assert.equal(check.state, "changed");
  const result = assessWithRegistry(patient, model, check, "2026-09-20", "changed");
  assert.equal(result.score, null);
  assert.equal(result.assessability, null);
});

test("freshness, missing full text and wrong identity fail closed at the source boundary", () => {
  const study = projectSnapshotTrial(trial, at);
  assert.equal(checkRegistryModel(model, study, at).state, "verified");
  const formatted = { ...study, eligibilityCriteria: study.eligibilityCriteria.replaceAll(" * ", "\n\n* ") };
  const formattedCheck = checkRegistryModel(model, formatted, at);
  assert.equal(formattedCheck.state, "verified");
  assert.equal(assessWithRegistry(patient, model, formattedCheck, "2026-09-20", "formatting").score, 1);
  assert.equal(checkRegistryModel(model, { ...study, fetchedAt: "2026-10-02T08:44:59Z" }, at).state, "unavailable");
  assert.equal(checkRegistryModel(model, { ...study, fetchedAt: "invalid" }, at).state, "unavailable");
  assert.equal(checkRegistryModel(model, { ...study, detailState: "summary" }, at).state, "unavailable");
  assert.equal(checkRegistryModel(model, { ...study, id: "NCT00000001" }, at).state, "unavailable");
});

test("a registry-status revision or source failure invalidates earlier live decisions without changing historical findings", (t) => {
  t.mock.method(Date, "now", () => Date.parse(at));
  const study = projectSnapshotTrial(trial, at);
  const check = checkRegistryModel(model, study, at);
  const assessment = assessWithRegistry(patient, model, check, "2026-09-20", "live");
  const state = { ...initialWorkflow, patients: [patient], models: [model], registryChecks: { [trial.id]: check } };
  assert.equal(isAssessmentCurrent(state, assessment), true);
  const revised = checkRegistryModel(model, projectSnapshotTrial({ ...trial, overallStatus: "TERMINATED" }, at), at);
  const next = transitionWorkflow(state, { type: "registry-checks", checks: [revised] }, "oncologist", "Synthetic reviewer", at, "source-change");
  assert.equal(isAssessmentCurrent(next, assessment), false);
  assert.equal(assessment.registryCheck?.overallStatus, trial.overallStatus);
  const unavailable = { ...check, state: "unavailable" as const };
  assert.equal(isAssessmentCurrent({ ...state, registryChecks: { [trial.id]: unavailable } }, assessment), false);
  t.mock.method(Date, "now", () => Date.parse(at) + 15 * 60_000 + 1);
  assert.equal(isAssessmentCurrent(state, assessment), false);
});

test("PI access requires the same authenticated profile, an unexpired session and an explicit study grant", () => {
  const now = Date.parse(at);
  const expiry = now / 1000 + 60;
  const profile = { user_id: "synthetic-pi", role: "site" };
  const grants = [trial.id];
  assert.equal(hasPiAccess(undefined, expiry, profile, grants, trial.id, now), false);
  assert.equal(hasPiAccess("different-user", expiry, profile, grants, trial.id, now), false);
  assert.equal(hasPiAccess(profile.user_id, now / 1000, profile, grants, trial.id, now), false);
  assert.equal(hasPiAccess(profile.user_id, expiry, profile, [], trial.id, now), false);
  assert.equal(hasPiAccess(profile.user_id, expiry, { ...profile, role: "auditor" }, grants, trial.id, now), false);
  assert.equal(hasPiAccess(profile.user_id, expiry, profile, grants, "NCT00000001", now), false);
  assert.equal(hasPiAccess(profile.user_id, expiry, profile, grants, trial.id, now), true);
});
