import assert from "node:assert/strict";
import test from "node:test";
import { fetchOfficialTrialEvidence } from "./clinicalTrials.js";

test("returns only the bounded official-source evidence contract", async () => {
  const originalFetch = globalThis.fetch;
  const hiddenEmail = ["hidden", "example.org"].join("@");
  globalThis.fetch = async () => new Response(JSON.stringify({
    protocolSection: {
      identificationModule: { nctId: "NCT06345729", briefTitle: "Public trial title" },
      statusModule: {
        overallStatus: "RECRUITING",
        statusVerifiedDate: "2026-09",
        lastUpdatePostDateStruct: { date: "2026-09-08" },
      },
      contactsLocationsModule: {
        centralContacts: [{ name: "Do not expose", email: hiddenEmail }],
        locations: [{
          facility: "Synthetic India site",
          status: "RECRUITING",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          contacts: [{ phone: "+91 9999999999" }],
        }],
      },
    },
    derivedSection: { miscInfoModule: { versionHolder: "2026-09-18" } },
  }), { status: 200, headers: { "content-type": "application/json" } });

  try {
    const evidence = await fetchOfficialTrialEvidence("NCT06345729");
    assert.equal(evidence.trialId, "NCT06345729");
    assert.deepEqual(evidence.indiaLocations, [{
      facility: "Synthetic India site",
      status: "RECRUITING",
      city: "Mumbai",
      state: "Maharashtra",
    }]);
    assert.equal(JSON.stringify(evidence).includes(hiddenEmail), false);
    assert.equal(JSON.stringify(evidence).includes("9999999999"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects malformed trial identifiers before fetching", async () => {
  await assert.rejects(() => fetchOfficialTrialEvidence("NCT123"), /valid NCT/);
});
