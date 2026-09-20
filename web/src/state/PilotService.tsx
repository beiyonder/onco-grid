import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { pilotServiceConfigured, supabase } from "../lib/supabase";
import type { PilotProfile } from "../lib/database.types";

interface PilotServiceValue {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  profile: PilotProfile | null;
  staffDirectory: PilotProfile[];
  accessToken?: string;
  error: string | null;
  notice: string | null;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const PilotServiceContext = createContext<PilotServiceValue | null>(null);

export function PilotServiceProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(pilotServiceConfigured);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<PilotProfile | null>(null);
  const [staffDirectory, setStaffDirectory] = useState<PilotProfile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      setSession(data.session);
      setError(sessionError?.message ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !session?.user.id) {
      setProfile(null);
      setStaffDirectory([]);
      return;
    }
    let active = true;
    Promise.all([
      supabase.from("pilot_profiles").select("*").eq("user_id", session.user.id).single(),
      supabase.from("pilot_profiles").select("*").order("display_name"),
    ]).then(([profileResult, directoryResult]) => {
      if (!active) return;
      setProfile(profileResult.data ?? null);
      setStaffDirectory(directoryResult.data ?? []);
      setError(profileResult.error?.message ?? directoryResult.error?.message ?? null);
    });
    return () => { active = false; };
  }, [session?.user.id]);

  const value = useMemo<PilotServiceValue>(() => ({
    configured: pilotServiceConfigured,
    loading,
    session,
    profile,
    staffDirectory,
    accessToken: session?.access_token,
    error,
    notice,
    async signInWithEmail(email) {
      if (!supabase) {
        setError("Supabase pilot services are not configured.");
        return;
      }
      const cleanEmail = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        setError("Enter a valid approved staff email address.");
        return;
      }
      setError(null);
      setNotice(null);
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}#/` },
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      setNotice("Check the approved staff inbox for the Supabase sign-in link.");
    },
    async signOut() {
      if (!supabase) return;
      const { error: signOutError } = await supabase.auth.signOut();
      setError(signOutError?.message ?? null);
      setNotice(null);
    },
  }), [error, loading, notice, profile, session, staffDirectory]);

  return <PilotServiceContext.Provider value={value}>{children}</PilotServiceContext.Provider>;
}

export function usePilotService(): PilotServiceValue {
  const context = useContext(PilotServiceContext);
  if (!context) throw new Error("usePilotService must be used within PilotServiceProvider");
  return context;
}
