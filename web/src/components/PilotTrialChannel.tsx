import type { RealtimeChannel } from "@supabase/supabase-js";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import type { PilotRoomMessage } from "../lib/database.types";
import { usePilotService } from "../state/PilotService";
import type { TrialRecord } from "../types";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

export function PilotTrialChannel({ trial }: { trial: TrialRecord }) {
  const { profile, session, staffDirectory } = usePilotService();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<PilotRoomMessage[]>([]);
  const [canAuthorOfficial, setCanAuthorOfficial] = useState(false);
  const [body, setBody] = useState("");
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [official, setOfficial] = useState(false);
  const [inviteUser, setInviteUser] = useState("");
  const [inviteRole, setInviteRole] = useState("coordinator");
  const [connectionState, setConnectionState] = useState("Connecting");
  const [error, setError] = useState<string | null>(null);

  const displayNameById = useMemo(() => new Map(staffDirectory.map((staff) => [staff.user_id, staff.display_name])), [staffDirectory]);

  const loadMessages = useCallback(async (targetRoomId: string) => {
    if (!supabase) return;
    const { data, error: loadError } = await supabase
      .from("trial_room_messages")
      .select("*")
      .eq("room_id", targetRoomId)
      .order("created_at", { ascending: true });
    if (loadError) setError(loadError.message); else setMessages(data ?? []);
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client || !session?.user.id) return;
    let active = true;
    let channel: RealtimeChannel | null = null;
    client.rpc("ensure_trial_room", { requested_trial_id: trial.id }).then(async ({ data: ensuredRoom, error: roomError }) => {
      if (!active) return;
      if (roomError || !ensuredRoom) {
        setError(roomError?.message ?? "Trial Room could not be created.");
        setConnectionState("Unavailable");
        return;
      }
      setRoomId(ensuredRoom);
      const [membershipResult] = await Promise.all([
        client.from("trial_room_members").select("*").eq("room_id", ensuredRoom).eq("user_id", session.user.id).single(),
        loadMessages(ensuredRoom),
      ]);
      if (!active) return;
      setCanAuthorOfficial(Boolean(membershipResult.data?.can_author_official_response));
      if (membershipResult.error) setError(membershipResult.error.message);
      channel = client.channel(`trial-room:${ensuredRoom}`)
        .on("postgres_changes", { event: "*", schema: "public", table: "trial_room_messages", filter: `room_id=eq.${ensuredRoom}` }, () => { void loadMessages(ensuredRoom); })
        .subscribe((nextStatus) => setConnectionState(nextStatus === "SUBSCRIBED" ? "Live" : nextStatus));
    });

    return () => {
      active = false;
      if (channel) void client.removeChannel(channel);
    };
  }, [loadMessages, session?.user.id, trial.id]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanBody = body.trim();
    if (!supabase || !roomId || !session?.user.id || !cleanBody) return;
    setError(null);
    const { error: insertError } = await supabase.from("trial_room_messages").insert({
      room_id: roomId,
      author_id: session.user.id,
      body: cleanBody,
      authority: official && canAuthorOfficial ? "authorized_site_response" : "general",
      source_url: trial.sourceUrl,
      reply_to_id: replyToId,
    });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setBody("");
    setReplyToId(null);
    setOfficial(false);
    await loadMessages(roomId);
  };

  const resolveMessage = async (messageId: string) => {
    if (!supabase || !roomId) return;
    const { error: resolveError } = await supabase.rpc("resolve_trial_room_message", { message: messageId });
    if (resolveError) setError(resolveError.message); else await loadMessages(roomId);
  };

  const inviteMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !roomId || !inviteUser) return;
    const { error: inviteError } = await supabase.rpc("add_trial_room_member", {
      room: roomId,
      new_member: inviteUser,
      requested_role: inviteRole,
    });
    setError(inviteError?.message ?? null);
    if (!inviteError) setInviteUser("");
  };

  return <section className="surface channel pilot-channel" aria-labelledby="pilot-channel-heading">
    <div className="section-heading"><div><p className="eyebrow">Authenticated no-PHI pilot</p><h2 id="pilot-channel-heading">Live Trial Room</h2><p>Supabase membership, RLS, realtime events, and immutable staff identity. Never post patient facts or identifiers.</p></div><StatusChip tone={connectionState === "Live" ? "good" : "attention"}>{connectionState}</StatusChip></div>
    <div className="pilot-channel-identity"><Icon name="shield" /><span><strong>{profile?.display_name ?? "Authenticated staff"}</strong>{profile?.role ?? "pilot role"} · {profile?.organization ?? "pilot organization"}</span></div>
    <ol className="message-timeline">
      {messages.map((message) => {
        const reply = messages.find((candidate) => candidate.id === message.reply_to_id);
        return <li className={`message ${message.authority === "authorized_site_response" ? "official" : ""}`} key={message.id}>
          <div className="message-avatar" aria-hidden="true">{(displayNameById.get(message.author_id) ?? "PS").split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
          <div className="message-body"><div className="message-meta"><strong>{displayNameById.get(message.author_id) ?? "Pilot staff"}</strong><span>Verified Supabase identity</span><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time></div>{message.authority === "authorized_site_response" ? <StatusChip tone="good">Authorised site response</StatusChip> : null}{reply ? <p className="reply-context">Reply to {displayNameById.get(reply.author_id) ?? "pilot staff"}: “{reply.body.slice(0, 110)}{reply.body.length > 110 ? "…" : ""}”</p> : null}<p>{message.body}</p>{message.source_url ? <a href={message.source_url} target="_blank" rel="noreferrer">Linked official source <Icon name="external" /></a> : null}<div className="message-actions"><button type="button" onClick={() => setReplyToId(message.id)}>Reply</button>{message.resolved_at ? <StatusChip tone="good">Resolved by verified staff</StatusChip> : <button type="button" onClick={() => resolveMessage(message.id)}>Mark resolved</button>}</div></div>
        </li>;
      })}
    </ol>
    {messages.length === 0 ? <div className="empty-state compact"><span className="empty-icon"><Icon name="message" /></span><h3>No live messages yet</h3><p>Post a general operational question without patient or participant data.</p></div> : null}
    <form className="composer" onSubmit={submitMessage}>
      {replyToId ? <div className="reply-banner"><span>Replying to a verified room message</span><button type="button" onClick={() => setReplyToId(null)} aria-label="Cancel reply"><Icon name="close" /></button></div> : null}
      <label><span>General operational message · no PHI</span><textarea rows={4} maxLength={1200} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Ask about source status, trial operations, or ownership. Never include patient information." /></label>
      {canAuthorOfficial ? <label className="check-control"><input type="checkbox" checked={official} onChange={(event) => setOfficial(event.target.checked)} /> Record as an authorised site response</label> : null}
      <div className="composer-foot"><span>{body.length}/1200 · source link attached</span><button className="button primary" type="submit" disabled={!body.trim()}>Post to live room</button></div>
    </form>
    <details className="room-members"><summary>Invite authenticated staff</summary><form onSubmit={inviteMember}><label><span>Staff directory</span><select value={inviteUser} onChange={(event) => setInviteUser(event.target.value)}><option value="">Select staff member</option>{staffDirectory.filter((staff) => staff.user_id !== session?.user.id).map((staff) => <option key={staff.user_id} value={staff.user_id}>{staff.display_name} · {staff.organization}</option>)}</select></label><label><span>Room role</span><select value={inviteRole} onChange={(event) => setInviteRole(event.target.value)}><option value="coordinator">Coordinator</option><option value="oncologist">Oncologist</option><option value="site">Site role (official authority still requires admin grant)</option><option value="auditor">Auditor</option></select></label><button className="button secondary" type="submit" disabled={!inviteUser}>Add member</button></form></details>
    {error ? <p className="form-error" role="alert"><Icon name="warning" />{error}</p> : null}
  </section>;
}
