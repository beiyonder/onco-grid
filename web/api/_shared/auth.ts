export class ServiceConfigurationError extends Error {}
export class AuthenticationError extends Error {}

export interface AuthenticatedStaff {
  id: string;
}

export async function authenticateSupabaseBearer(authorization: string | undefined): Promise<AuthenticatedStaff> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !publishableKey) {
    throw new ServiceConfigurationError("Authenticated pilot service is not configured.");
  }
  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthenticationError("Sign in through the approved pilot identity before using the assistant.");
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) throw new AuthenticationError("Pilot access token is missing.");
  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
    headers: {
      apikey: publishableKey,
      authorization: `Bearer ${token}`,
    },
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new AuthenticationError("Pilot identity could not be verified.");
  const user = await response.json() as { id?: unknown };
  if (typeof user.id !== "string" || !user.id) throw new AuthenticationError("Pilot identity response was invalid.");
  return { id: user.id };
}
