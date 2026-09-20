import { type FormEvent, useState } from "react";
import { usePilotService } from "../state/PilotService";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

export function PilotIdentity() {
  const {
    configured,
    error,
    loading,
    notice,
    profile,
    session,
    signInWithEmail,
    signOut,
  } = usePilotService();
  const [email, setEmail] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await signInWithEmail(email);
    setEmail("");
  };

  if (!configured) {
    return <span className="pilot-service-state" title="Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to enable authenticated pilot services"><Icon name="lock" /><span><strong>Pilot services off</strong><small>Fail-closed configuration</small></span></span>;
  }

  return <details className="pilot-identity">
    <summary><Icon name={session ? "shield" : "lock"} /><span><strong>{loading ? "Checking pilot identity" : session ? profile?.display_name ?? "Authenticated staff" : "Staff sign in"}</strong><small>{session ? `${profile?.role ?? "pilot role"} · no-PHI services` : "Supabase magic link"}</small></span></summary>
    <div className="pilot-identity-panel">
      {session ? <><StatusChip tone="good">Authenticated pilot</StatusChip><p><strong>{profile?.display_name ?? "Pilot staff"}</strong>{profile?.organization ?? "Pilot organization"}</p><button className="button secondary full" type="button" onClick={signOut}>Sign out</button></> : <form onSubmit={submit}><p><strong>Approved staff identity only.</strong>A magic-link email is sent by Supabase. Do not use a patient or participant email.</p><label htmlFor="pilot-staff-email">Staff email</label><input id="pilot-staff-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><button className="button primary full" type="submit">Send sign-in link</button></form>}
      {notice ? <p className="success-note" role="status"><Icon name="check" />{notice}</p> : null}
      {error ? <p className="form-error" role="alert"><Icon name="warning" />{error}</p> : null}
    </div>
  </details>;
}
