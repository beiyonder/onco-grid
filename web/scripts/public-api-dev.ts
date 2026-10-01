import type { Plugin } from "vite";
import globalTrials from "../api/global-trials.ts";
import trialEvidence from "../api/trial-evidence.ts";
import publications from "../api/publications.ts";
import type { ApiResponse } from "../api/_shared/http.ts";
// Serve the same public-only handlers locally. Authenticated pilot endpoints remain separate.
export function publicApiDevelopment(): Plugin {
  const handlers: Record<string, typeof globalTrials> = {
    "/api/global-trials": globalTrials,
    "/api/trial-evidence": trialEvidence,
    "/api/publications": publications,
  };
  return {
    name: "public-registry-api-development",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? "/", "http://localhost");
        const handler = handlers[url.pathname];
        if (!handler) return next();
        const query: Record<string, string | string[]> = {};
        for (const key of new Set(url.searchParams.keys())) {
          const values = url.searchParams.getAll(key);
          query[key] = values.length === 1 ? values[0]! : values;
        }
        const result: ApiResponse = {
          setHeader(name, value) {
            response.setHeader(name, value);
          },
          status(code) {
            response.statusCode = code;
            return result;
          },
          json(payload) {
            response.end(JSON.stringify(payload));
          },
        };
        void handler(
          { method: request.method, query, headers: {} },
          result,
        ).catch(() => {
          response.statusCode = 500;
          response.end(JSON.stringify({ error: "public_source_unavailable" }));
        });
      });
    },
  };
}
