import type { RealtimeChannel } from "@supabase/supabase-js";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { PilotHandoff, PilotHandoffEvent } from "../lib/database.types";
import { supabase } from "../lib/supabase";
import { usePilotService } from "../state/PilotService";
import { Icon } from "./Icon";
import { EmptyState, StatusChip } from "./Primitives";

const purposeLabel: Record<PilotHandoff["purpose"], string> = {
  operational_screening_request: "Operational screening request",
  source_clarification: "Source clarification",
  site_contact_coordination: "Site-contact coordination",
};

const nextState: Partial<Record<PilotHandoff["state"], PilotHandoff["state"]>> = {
  draft: "ready",
  ready: "acknowledged",
  acknowledged: "closed",
};

export function PilotHandoffPanel({ trialIds }: { trialIds: string[] }) {
  const { configured, profile, session, staffDirectory } = usePilotService();
  const [handoffs, setHandoffs] = useState<PilotHandoff[]>([]);
  const [events, setEvents] = useState<PilotHandoffEvent[]>([]);
  const [trialId, setTrialId] = useState(trialIds[0] ?? "");
  const [recipientUser, setRecipientUser] = useState("");
  const [purpose, setPurpose] = useState<PilotHandoff["purpose"]>("operational_screening_request");
  const [error, setError] = useState<string | null>(null);

  const directoryById = useMemo(() => new Map(staffDirectory.map((staff) => [staff.user_id, staff])), [staffDirectory]);

  const loadHandoffs = useCallback(async () => {
    if (!supabase || !session?.user.id) return;
    const { data, error: handoffError } = await supabase.from("referral_handoffs").select("*").order("updated_at", { ascending: false });
    if (handoffError) {
      setError(handoffError.message);
      return;
    }
    const nextHandoffs = data ?? [];
    setHandoffs(nextHandoffs);
    if (nextHandoffs.length === 0) {
      setEvents([]);
      return;
    }
    const { data: eventData, error: eventError } = await supabase.from("referral_handoff_events").select("*").in("handoff_id", nextHandoffs.map((handoff) => handoff.id)).order("created_at", { ascending: true });
    if (eventError) setError(eventError.message); else setEvents(eventData ?? []);
  }, [session?.user.id]);

  useEffect(() => {
    if (!supabase || !session?.user.id) return;
    let handoffChannel: RealtimeChannel | null = null;
    let eventChannel: RealtimeChannel | null = null;
    void loadHandoffs();
    handoffChannel = supabase.channel(`pilot-handoffs:${session.user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "referral_handoffs" }, () => { void loadHandoffs(); })
      .subscribe();
    eventChannel = supabase.channel(`pilot-handoff-events:${session.user.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "referral_handoff_events" }, () => { void loadHandoffs(); })
      .subscribe();
    return () => {
      if (handoffChannel && supabase) void supabase.removeChannel(handoffChannel);
      if (eventChannel && supabase) void supabase.removeChannel(eventChannel);
    };
  }, [loadHandoffs, session?.user.id]);

  const createHandoff = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !trialId || !recipientUser) return;
    const recipient = directoryById.get(recipientUser);
    if (!recipient) {
      setError("Select an authenticated pilot recipient.");
      return;
    }
    setError(null);
    const { error: createError } = await supabase.rpc("create_no_phi_handoff", {
      requested_trial_id: trialId,
      recipient_user: recipient.user_id,
      recipient_org: recipient.organization,
      requested_purpose: purpose,
    });
    if (createError) setError(createError.message); else {
      setRecipientUser("");
      await loadHandoffs();
    }
  };

  const advance = async (handoff: PilotHandoff) => {
    const target = nextState[handoff.state];
    if (!supabase || !target) return;
    const { error: transitionError } = await supabase.rpc("advance_no_phi_handoff", {
      handoff: handoff.id,
      requested_state: target,
    });
    if (transitionError) setError(transitionError.message); else await loadHandoffs();
  };

  if (!configured) {
    return <div className="pilot-handoff-unavailable"><Icon name="lock" /><p><strong>Authenticated handoff is not configured.</strong>Set the approved Supabase project variables to enable the no-PHI pilot. The browser simulation below remains separate.</p></div>;
  }
  if (!session) {
    return <div className="pilot-handoff-unavailable"><Icon name="lock" /><p><strong>Staff sign-in required.</strong>Use the top-bar Supabase magic-link control. No handoff data is available anonymously.</p></div>;
  }

  const recipients = staffDirectory.filter((staff) => staff.user_id !== session.user.id);
  return <section className="pilot-handoffs" aria-labelledby="pilot-handoff-heading">
    <div className="section-heading"><div><p className="eyebrow">Authenticated no-PHI pilot</p><h2 id="pilot-handoff-heading">Secure handoff state</h2><p>Only trial ID, purpose, staff ownership, recipient organization, state, and audit events enter Supabase. This patient workspace and its facts are not linked or transmitted.</p></div><StatusChip tone="good">RLS + audit</StatusChip></div>
    {trialIds.length === 0 ? <EmptyState icon="handoff" title="Select a trial first">A clinician must explicitly add a trial review before a no-PHI operational handoff can be created.</EmptyState> : <form className="pilot-handoff-form" onSubmit={createHandoff}>
      <label><span>Reviewed trial</span><select value={trialId} onChange={(event) => setTrialId(event.target.value)}>{trialIds.map((id) => <option key={id}>{id}</option>)}</select></label>
      <label><span>Authenticated recipient</span><select value={recipientUser} onChange={(event) => setRecipientUser(event.target.value)}><option value="">Select staff member</option>{recipients.map((staff) => <option key={staff.user_id} value={staff.user_id}>{staff.display_name} · {staff.organization}</option>)}</select></label>
      <label><span>Operational purpose</span><select value={purpose} onChange={(event) => setPurpose(event.target.value as PilotHandoff["purpose"])}>{Object.entries(purposeLabel).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <button className="button primary" type="submit" disabled={!trialId || !recipientUser}>Create no-PHI handoff</button>
    </form>}
    <div className="pilot-handoff-list">
      {handoffs.map((handoff) => {
        const handoffEvents = events.filter((event) => event.handoff_id === handoff.id);
        const target = nextState[handoff.state];
        return <article key={handoff.id}><header><span><code>{handoff.relay_reference}</code><strong>{handoff.trial_id} · {purposeLabel[handoff.purpose]}</strong><small>Recipient organization: {handoff.recipient_organization}</small></span><StatusChip tone={handoff.state === "closed" ? "good" : "human"}>{handoff.state}</StatusChip></header><ol>{handoffEvents.map((event) => <li key={event.id}><span>{event.event_type}</span><time dateTime={event.created_at}>{new Date(event.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time></li>)}</ol>{target ? <button className="button secondary" type="button" onClick={() => advance(handoff)}>Request transition to {target}</button> : null}</article>;
      })}
    </div>
    {handoffs.length === 0 ? <EmptyState icon="handoff" title="No authenticated handoffs">Create a no-PHI handoff after choosing a reviewed trial and authenticated recipient.</EmptyState> : null}
    {error ? <p className="form-error" role="alert"><Icon name="warning" />{error}</p> : null}
    <p className="pilot-handoff-foot"><Icon name="shield" /><span><strong>No patient payload.</strong>The random relay reference has no patient identifier and cannot be used to infer trial fit or eligibility.</span></p>
  </section>;
}
