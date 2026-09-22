import assert from "node:assert/strict";
import test from "node:test";
import { fetchGlobalTrialEvidence, fetchPublicationMetadata } from "./evidenceSources.js";

test("returns bounded global registry evidence without contacts or outcomes", async () => {
  const originalFetch = globalThis.fetch;
  const hiddenEmail = ["hidden", "example.org"].join("@");
  let requestedUrl = "";
  globalThis.fetch = async (input) => {
    requestedUrl = String(input);
    return new Response(JSON.stringify({
      totalCount: 42,
      nextPageToken: "NEXT_TOKEN",
      studies: [{
        protocolSection: {
          identificationModule: {
            nctId: "NCT03625323",
            briefTitle: "Global source title",
            officialTitle: "Official source title",
          },
          statusModule: {
            overallStatus: "ACTIVE_NOT_RECRUITING",
            statusVerifiedDate: "2026-03",
            startDateStruct: { date: "2019-02-21" },
            completionDateStruct: { date: "2024-11-25" },
            lastUpdatePostDateStruct: { date: "2026-04-22" },
          },
          sponsorCollaboratorsModule: { leadSponsor: { name: "Public sponsor" } },
          descriptionModule: { briefSummary: "Official brief summary." },
          conditionsModule: { conditions: ["NSCLC"] },
          designModule: {
            phases: ["PHASE2"],
            enrollmentInfo: { count: 187, type: "ACTUAL" },
          },
          armsInterventionsModule: {
            interventions: [{ type: "DRUG", name: "pembrolizumab" }],
          },
          eligibilityModule: { sex: "ALL", minimumAge: "18 Years", healthyVolunteers: false },
          contactsLocationsModule: {
            centralContacts: [{ email: hiddenEmail }],
            locations: [{ country: "India", facility: "Do not expose", contacts: [{ phone: "+91 9999999999" }] }],
          },
          outcomesModule: { primaryOutcomes: [{ measure: "Do not expose" }] },
        },
      }],
    }), { status: 200, headers: { "content-type": "application/json" } });
  };

  try {
    const result = await fetchGlobalTrialEvidence({ mode: "intervention", term: "pembrolizumab" });
    assert.equal(result.totalCount, 42);
    assert.equal(result.nextPageToken, "NEXT_TOKEN");
    assert.equal(result.trials[0]?.id, "NCT03625323");
    assert.deepEqual(result.trials[0]?.countries, ["India"]);
    assert.equal(result.trials[0]?.statusLabel, "Active Not Recruiting");
    assert.equal(result.trials[0]?.briefSummaryTruncated, false);
    assert.match(requestedUrl, /query\.intr=pembrolizumab/);
    assert.match(requestedUrl, /fields=/);
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes(hiddenEmail), false);
    assert.equal(serialized.includes("9999999999"), false);
    assert.equal(serialized.includes("Do not expose"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("returns PubMed metadata with an explicit combined-query basis", async () => {
  const originalFetch = globalThis.fetch;
  const requestedUrls: string[] = [];
  globalThis.fetch = async (input) => {
    const url = String(input);
    requestedUrls.push(url);
    if (url.includes("esearch.fcgi")) {
      return new Response(JSON.stringify({
        esearchresult: {
          count: "1",
          idlist: ["39403626"],
          querytranslation: "NCT03625323[All Fields]",
        },
      }), { status: 200 });
    }
    return new Response(JSON.stringify({
      result: {
        uids: ["39403626"],
        "39403626": {
          uid: "39403626",
          pubdate: "2024 Nov",
          source: "JTO Clin Res Rep",
          authors: [{ name: "Krebs MG" }, { name: "Forster M" }],
          title: "A source-linked publication.",
          pubtype: ["Journal Article"],
          recordstatus: "PubMed",
          articleids: [{ idtype: "doi", value: "10.1000/example" }],
          fulljournalname: "JTO clinical and research reports",
        },
      },
    }), { status: 200 });
  };

  try {
    const result = await fetchPublicationMetadata(["NCT03625323"]);
    assert.equal(result.totalCount, 1);
    assert.equal(result.publications[0]?.pmid, "39403626");
    assert.equal(result.publications[0]?.doi, "10.1000/example");
    assert.equal(result.publications[0]?.matchBasis, "PubMed record matched the combined selected-NCT query");
    assert.equal(requestedUrls.length, 2);
    assert.match(requestedUrls[0] ?? "", /NCT03625323/);
    assert.match(requestedUrls[1] ?? "", /39403626/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
