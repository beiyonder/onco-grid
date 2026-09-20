import { type FormEvent, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { PilotTrialChannel } from "../components/PilotTrialChannel";
import { TrialSourceAssistant } from "../components/TrialSourceAssistant";
import { useAppState } from "../state/AppState";
import { usePilotService } from "../state/PilotService";
import { useTrialData } from "../state/TrialData";

export function TrialRoomPage() {
  const { trialId } = useParams();
  const [searchParams] = useSearchParams();
  const { findTrial, status } = useTrialData();
  const trial = findTrial(trialId);
  const {
    corrections,
    createCorrection,
    postRoomMessage,
    resolveRoomMessage,
    role,
    roomMessages,
  } = useAppState();
  const { accessToken, configured: pilotConfigured, session: pilotSession } = usePilotService();
  const [message, setMessage] = useState("");
  const [includeSource, setIncludeSource] = useState(true);
  const [replyToId, setReplyToId] = useState<string | undefined>();
  const [correctionTitle, setCorrectionTitle] = useState("");
  const [correctionId, setCorrectionId] = useState<string | null>(null);

  const requestedMessageId = searchParams.get("message");
  useEffect(() => {
    if (!requestedMessageId || status !== "ready") return;
    const timeout = window.setTimeout(() => document.getElementById(requestedMessageId)?.focus({ preventScroll: false }), 0);
    return () => window.clearTimeout(timeout);
  }, [requestedMessageId, status]);

  if (status === "loading") {
    return <div className="page"><EmptyState icon="source" title="Loading Trial Room context">Retrieving the public trial record.</EmptyState></div>;
  }

  if (!trial) {
    return <div className="page"><EmptyState icon="warning" title="Trial Room unavailable">The trial is not present in the dated registry snapshot.</EmptyState></div>;
  }

  const messages = roomMessages.filter((candidate) => candidate.trialId === trial.id);
  const trialCorrections = corrections.filter((candidate) => candidate.trialId === trial.id);
  const replyTarget = messages.find((candidate) => candidate.id === replyToId);
  const livePilotRoom = pilotConfigured && Boolean(pilotSession);

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = message.trim();
    if (!body) return;
    postRoomMessage(trial.id, body, includeSource ? trial.sourceUrl : undefined, replyToId);
    setMessage("");
    setReplyToId(undefined);
  };

  const submitCorrection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = correctionTitle.trim();
    if (!title) return;
    setCorrectionId(createCorrection(trial.id, title, `ClinicalTrials.gov record ${trial.id}`, trial.sourceUrl));
    setCorrectionTitle("");
  };

  return (
    <div className="page room-page">
      <Link className="back-link" to={`/trials/${trial.id}`}>← Back to Trial Detail</Link>
      <PageHeader eyebrow={`Trial Room · ${trial.id}`} title="Clarify the operational question" description={trial.briefTitle} />
      <SafetyNote><p>{livePilotRoom ? <><strong>Authenticated no-PHI pilot room.</strong> Messages use verified Supabase staff identity, membership, RLS, realtime delivery, and source links. Patient facts and attachments are prohibited.</> : <><strong>Conversation is synthetic and stays in this browser.</strong> Configure and sign in to the Supabase pilot to enable real staff communication.</>} Silence and unresolved questions never become a negative answer.</p></SafetyNote>

      <div className="room-layout">
        {livePilotRoom ? <PilotTrialChannel trial={trial} /> : <section className="surface channel" aria-labelledby="channel-heading">
          <div className="section-heading"><div><p className="eyebrow">Chronological channel</p><h2 id="channel-heading">Discussion</h2></div><StatusChip tone="human">{messages.length} messages</StatusChip></div>
          <ol className="message-timeline">
            {messages.map((entry) => {
              const parent = messages.find((candidate) => candidate.id === entry.replyToId);
              return <li className={`message ${entry.authority === "Authorised site response" ? "official" : ""}`} id={entry.id} tabIndex={-1} key={entry.id}>
                <div className="message-avatar" aria-hidden="true">{entry.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                <div className="message-body">
                  <div className="message-meta"><strong>{entry.author}</strong><span>{entry.role}</span><time dateTime={entry.sentAt}>{new Date(entry.sentAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time></div>
                  {entry.authority === "Authorised site response" ? <StatusChip tone="good">Authorised site response</StatusChip> : null}
                  {parent ? <p className="reply-context">Reply to {parent.author}: “{parent.body.slice(0, 110)}{parent.body.length > 110 ? "…" : ""}”</p> : null}
                  <p>{entry.body}</p>
                  {entry.sourceUrl ? <a href={entry.sourceUrl} target="_blank" rel="noreferrer">Linked source <Icon name="external" /></a> : null}
                  <div className="message-actions"><button type="button" onClick={() => { setReplyToId(entry.id); document.getElementById("room-composer")?.focus(); }}>Reply</button>{entry.resolved ? <StatusChip tone="good">Resolved by a person</StatusChip> : <button type="button" onClick={() => resolveRoomMessage(entry.id)}>Mark resolved</button>}</div>
                </div>
              </li>;
            })}
          </ol>

          <form className="composer" onSubmit={submitMessage}>
            {replyTarget ? <div className="reply-banner"><span>Replying to <strong>{replyTarget.author}</strong> · {replyTarget.body.slice(0, 90)}{replyTarget.body.length > 90 ? "…" : ""}</span><button type="button" onClick={() => setReplyToId(undefined)} aria-label="Cancel reply"><Icon name="close" /></button></div> : null}
            <label><span>Message as {role.name} · {role.title}</span><textarea id="room-composer" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask an operational question or record a human clarification…" rows={4} /></label>
            <div className="composer-foot"><label className="check-control"><input type="checkbox" checked={includeSource} onChange={(event) => setIncludeSource(event.target.checked)} /> Link the public registry source</label><button className="button primary" type="submit" disabled={!message.trim()}><Icon name="message" /> Add synthetic message</button></div>
          </form>
        </section>}

        <aside className="room-context">
          <section className="surface pinned-context" aria-labelledby="pinned-heading"><p className="eyebrow">Pinned context</p><h2 id="pinned-heading">Authority boundary</h2><dl><div><dt>Registry status</dt><dd>{trial.statusLabel}</dd></div><div><dt>India site confirmation</dt><dd>Unknown</dd></div><div><dt>Conversation authority</dt><dd>{livePilotRoom ? "Verified pilot membership; official responses require separate site authority grant" : messages.some((entry) => entry.authority === "Authorised site response") ? "Synthetic authorised-role example" : "General synthetic discussion only"}</dd></div></dl><Link className="text-action" to={`/trials/${trial.id}`}>Open source-first detail <Icon name="arrow" /></Link></section>

          <section className="surface correction-panel" aria-labelledby="correction-heading">
            <p className="eyebrow">Evidence-linked work</p><h2 id="correction-heading">Raise a correction</h2><p>A correction records a contradiction against a named source. It does not rewrite registry or site status.</p>
            <form onSubmit={submitCorrection}><label htmlFor="correction-title">Describe the source contradiction</label><textarea id="correction-title" rows={3} value={correctionTitle} onChange={(event) => setCorrectionTitle(event.target.value)} placeholder="Example: displayed condition differs from the current registry wording" /><span className="linked-evidence"><Icon name="source" /> ClinicalTrials.gov · {trial.id}</span><button className="button secondary full" type="submit" disabled={!correctionTitle.trim()}>Create correction ticket</button></form>
            {correctionId ? <p className="success-note" role="status"><Icon name="check" /> {correctionId} created with source evidence.</p> : null}
            {trialCorrections.map((ticket) => <article className="correction-row" key={ticket.id}><span><code>{ticket.id}</code><strong>{ticket.title}</strong><small>{ticket.createdBy} · source linked</small></span><StatusChip tone="attention">{ticket.status}</StatusChip></article>)}
          </section>

          <TrialSourceAssistant accessToken={accessToken} trial={trial} messages={livePilotRoom ? [] : messages} />
        </aside>
      </div>
    </div>
  );
}
