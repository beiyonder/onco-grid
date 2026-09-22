import type { ApiRequest, ApiResponse } from "./_shared/http.js";
import { fetchPublicationMetadata } from "./_shared/evidenceSources.js";
import { validatePublicationTrialIds, validateQueryKeys } from "./_shared/policy.js";

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "method_not_allowed" });
    return;
  }

  try {
    validateQueryKeys(request.query, ["ids"]);
    const trialIds = validatePublicationTrialIds(request.query.ids);
    const result = await fetchPublicationMetadata(trialIds);
    response.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=86400");
    response.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Publication metadata could not be loaded.";
    const status = /unsupported query|ids|valid NCT/i.test(message) ? 400 : 502;
    response.status(status).json({ error: "publication_source_error", message });
  }
}
