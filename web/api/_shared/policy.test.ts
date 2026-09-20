import assert from "node:assert/strict";
import test from "node:test";
import { ASSISTANT_MODEL, validateAssistantRequest, validateTrialId } from "./policy.js";

test("pins the owner-required cheapest model snapshot", () => {
  assert.equal(ASSISTANT_MODEL, "gpt-5-nano-2025-08-07");
});

test("accepts a bounded source-only operational question", () => {
  assert.deepEqual(validateAssistantRequest({
    trialId: "NCT06345729",
    question: "When was the registry record last updated?",
    roomContext: [{
      authorRole: "Research coordinator",
      body: "Which source controls the current operational answer?",
      sourceUrl: "https://clinicaltrials.gov/study/NCT06345729",
    }],
  }), {
    trialId: "NCT06345729",
    question: "When was the registry record last updated?",
    roomContext: [{
      authorRole: "Research coordinator",
      body: "Which source controls the current operational answer?",
      sourceUrl: "https://clinicaltrials.gov/study/NCT06345729",
    }],
  });
});

test("rejects patient matching and identifier content", () => {
  for (const question of [
    "Is this patient eligible?",
    "Does this match the case?",
    ["Contact person", "example.org"].join("@"),
    "Call +91 9876543210",
  ]) {
    assert.throws(() => validateAssistantRequest({
      trialId: "NCT06345729",
      question,
      roomContext: [],
    }), /not accepted/);
  }
});

test("rejects unsupported fields and non-official citations", () => {
  assert.throws(() => validateAssistantRequest({
    trialId: "NCT06345729",
    question: "What is the registry status?",
    roomContext: [],
    patientFacts: [],
  }), /unsupported field/);
  assert.throws(() => validateAssistantRequest({
    trialId: "NCT06345729",
    question: "What is the registry status?",
    roomContext: [{ authorRole: "Coordinator", body: "Check the source", sourceUrl: "https://example.org" }],
  }), /ClinicalTrials.gov/);
});

test("accepts only exact NCT identifiers", () => {
  assert.equal(validateTrialId("NCT06345729"), "NCT06345729");
  assert.throws(() => validateTrialId("NCT123"), /valid NCT/);
});
