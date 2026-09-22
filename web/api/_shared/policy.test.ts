import assert from "node:assert/strict";
import test from "node:test";
import {
  ASSISTANT_MODEL,
  validateAssistantRequest,
  validateGlobalEvidenceQuery,
  validatePublicationTrialIds,
  validateTrialId,
} from "./policy.js";

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

test("accepts bounded public evidence queries", () => {
  assert.deepEqual(validateGlobalEvidenceQuery("intervention", " pembrolizumab (KEYTRUDA®) ", undefined), {
    mode: "intervention",
    term: "pembrolizumab (KEYTRUDA®)",
  });
  assert.deepEqual(validateGlobalEvidenceQuery("condition", "non-small cell lung cancer", "page-token_1"), {
    mode: "condition",
    term: "non-small cell lung cancer",
    pageToken: "page-token_1",
  });
  assert.deepEqual(validatePublicationTrialIds("NCT06345729,NCT03625323,NCT06345729"), [
    "NCT06345729",
    "NCT03625323",
  ]);
});

test("rejects unbounded or clinical evidence queries", () => {
  assert.throws(() => validateGlobalEvidenceQuery("term", "lung cancer", undefined), /mode/);
  assert.throws(() => validateGlobalEvidenceQuery("condition", "Is this patient eligible?", undefined), /not accepted/);
  assert.throws(() => validateGlobalEvidenceQuery("intervention", "a", undefined), /2–120/);
  assert.throws(() => validateGlobalEvidenceQuery("intervention", "pembrolizumab", "<token>"), /pageToken/);
  assert.throws(() => validatePublicationTrialIds("NCT123"), /valid NCT/);
  assert.throws(
    () => validatePublicationTrialIds(Array.from({ length: 11 }, (_, index) => `NCT${String(index).padStart(8, "0")}`)),
    /1–10/,
  );
});
