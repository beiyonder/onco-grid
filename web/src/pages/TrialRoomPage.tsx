import { type FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { EmptyState, PageHeader, SafetyNote, StatusChip } from "../components/Primitives";
import { useAppState } from "../state/AppState";
import { useTrialData } from "../state/TrialData";

export function TrialRoomPage() {
  const { trialId } = useParams();
  const { findTrial, status } = useTrialData();
  const trial = findTrial(trialId);
  const { postRoomMessage, role, roomMessages } = useAppState();
  const [message, setMessage] = useState("");
  const [includeSource, setIncludeSource] = useState(true);

  if (status === "loading") {
    return <div className="page"><EmptyState icon="source" title="Loading Trial Room context">Retrieving the public trial record.</EmptyState></div>;
  }
  if (!trial) {
    return <div className="page"><EmptyState icon="warning" title="Trial Room unavailable">The trial is not present in the dated registry snapshot.</EmptyState></div>;
  }

  const messages = roomMessages.filter((candidate) => candidate.trialId === trial.id);
  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = message.trim();
    if (!body) return;
    postRoomMessage(trial.id, body, includeSource ? trial.sourceUrl : undefined);
    setMessage("");
  };

  return (
    <div className="page room-page">
      <Link className="back-link" to={`/trials/${trial.id}`}>← Back to Trial Detail</Link>
      <PageHeader eyebrow={`Trial Room · ${trial.id}`} title="Clarify the operational question" description={trial.briefTitle} />
      <SafetyNote><p><strong>Conversation is synthetic and stays in this browser.</strong> Only a message from the selected authorised trial-side role is styled as an official response. Silence and unresolved questions never become a negative answer.</p></SafetyNote>
      <div className="room-layout">
        <section className="surface channel" aria-labelledby="channel-heading">
          <div className="section-heading"><div><p className="eyebrow">Chronological channel</p><h2 id="channel-heading">Discussion</h2></div><StatusChip tone="human">{messages.length} messages</StatusChip></div>
          <ol className="message-timeline">
            {messages.map((entry) => (
              <li className={`message ${entry.authority === "Authorised site response" ? "official" : ""}`} key={entry.id}>
                <div className="message-avatar" aria-hidden="true">{entry.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
                <div className="message-body">
                  <div className="message-meta"><strong>{entry.author}</strong><span>{entry.role}</span><time dateTime={entry.sentAt}>{new Date(entry.sentAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time></div>
                  {entry.authority === "Authorised site response" ? <StatusChip tone="good">Authorised site response</StatusChip> : null}
                  <p>{entry.body}</p>
                  {entry.sourceUrl ? <a href={entry.sourceUrl} target="_blank" rel="noreferrer">Linked source <Icon name="external" /></a> : null}
                </div>
              </li>
            ))}
          </ol>
          <form className="composer" onSubmit={submitMessage}>
            <label><span>Message as {role.name} · {role.title}</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask an operational question or record a human clarification…" rows={4} /></label>
            <div className="composer-foot"><label className="check-control"><input type="checkbox" checked={includeSource} onChange={(event) => setIncludeSource(event.target.checked)} /> Link the public registry source</label><button className="button primary" type="submit" disabled={!message.trim()}><Icon name="message" /> Add synthetic message</button></div>
          </form>
        </section>
        <aside className="surface pinned-context" aria-labelledby="pinned-heading"><p className="eyebrow">Pinned context</p><h2 id="pinned-heading">Authority boundary</h2><dl><div><dt>Registry status</dt><dd>{trial.statusLabel}</dd></div><div><dt>India site confirmation</dt><dd>Unknown</dd></div><div><dt>Conversation state</dt><dd>{messages.some((entry) => entry.authority === "Authorised site response") ? "Contains authorised role response" : "General discussion only"}</dd></div></dl><Link className="text-action" to={`/trials/${trial.id}`}>Open source-first detail <Icon name="arrow" /></Link></aside>
      </div>
    </div>
  );
}
