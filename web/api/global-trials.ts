import type { ApiRequest, ApiResponse } from "./_shared/http.js";
import { fetchGlobalTrialEvidence } from "./_shared/evidenceSources.js";
import { validateGlobalEvidenceQuery } from "./_shared/policy.js";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    const query = validateGlobalEvidenceQuery(
      first(request.query.mode),
      first(request.query.q),
      first(request.query.pageToken),
    );
    const result = await fetchGlobalTrialEvidence(query);
    response.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=86400");
    response.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Global trial evidence could not be loaded.";
    const status = /mode|q must|q is|required|pageToken|not accepted/i.test(message) ? 400 : 502;
    response.status(status).json({ error: "global_evidence_error", message });
  }
}
