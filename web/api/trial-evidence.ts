import type { ApiRequest, ApiResponse } from "./_shared/http.js";
import { fetchOfficialTrialEvidence } from "./_shared/clinicalTrials.js";
import { validateQueryKeys } from "./_shared/policy.js";

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    validateQueryKeys(request.query, ["id"]);
    const trialId = Array.isArray(request.query.id) ? request.query.id[0] : request.query.id;
    const evidence = await fetchOfficialTrialEvidence(trialId);
    response.setHeader("Cache-Control", "public, s-maxage=60, must-revalidate");
    response.status(200).json({ evidence });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Official evidence could not be loaded.";
    const status = /valid NCT|Unsupported query/.test(message) ? 400 : message.includes("not found") ? 404 : 502;
    response.status(status).json({ error: "official_source_error", message });
  }
}
