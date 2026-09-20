import assert from "node:assert/strict";
import test from "node:test";
import { authenticateSupabaseBearer, ServiceConfigurationError } from "./auth.js";

test("fails closed when Supabase pilot configuration is absent", async () => {
  const priorUrl = process.env.SUPABASE_URL;
  const priorPublishable = process.env.SUPABASE_PUBLISHABLE_KEY;
  const priorAnon = process.env.SUPABASE_ANON_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_PUBLISHABLE_KEY;
  delete process.env.SUPABASE_ANON_KEY;
  try {
    await assert.rejects(
      () => authenticateSupabaseBearer(undefined),
      (error: unknown) => error instanceof ServiceConfigurationError,
    );
  } finally {
    if (priorUrl === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = priorUrl;
    if (priorPublishable === undefined) delete process.env.SUPABASE_PUBLISHABLE_KEY; else process.env.SUPABASE_PUBLISHABLE_KEY = priorPublishable;
    if (priorAnon === undefined) delete process.env.SUPABASE_ANON_KEY; else process.env.SUPABASE_ANON_KEY = priorAnon;
  }
});
