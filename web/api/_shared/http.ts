export interface ApiRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  headers: {
    authorization?: string;
  };
  body?: unknown;
}

export interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(payload: unknown): void;
}
