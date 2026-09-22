import { ThinkingOrb } from "thinking-orbs";
import { type FormEvent, useState } from "react";
import type { RoomMessage, TrialRecord } from "../types";
import { Icon } from "./Icon";
import { StatusChip } from "./Primitives";

interface AssistantResponse {
  answer: string;
  citations: string[];
  model: string;
  generatedAt: string;
  authority: string;
}

export function TrialSourceAssistant({
  accessToken,
  messages,
  trial,
}: {
  accessToken?: string;
  messages: RoomMessage[];
  trial: TrialRecord;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;
    setAnswer(null);
    setError(null);
    if (!accessToken) {
      setError("Sign in through the configured Supabase pilot identity before using the source-only assistant.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/trial-assistant", {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          trialId: trial.id,
          question: cleanQuestion,
          roomContext: messages.slice(-20).map((message) => ({
            authorRole: message.role,
            body: message.body,
            sourceUrl: message.sourceUrl,
          })),
        }),
      });
      const payload = await response.json() as Partial<AssistantResponse> & { message?: string };
      if (!response.ok || !payload.answer || !Array.isArray(payload.citations)) {
        throw new Error(payload.message ?? "The source-only assistant is unavailable.");
      }
      setAnswer(payload as AssistantResponse);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The source-only assistant is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return <section className="surface source-assistant" aria-labelledby="source-assistant-heading">
    <div className="section-heading"><div><p className="eyebrow">Generated source summary</p><h2 id="source-assistant-heading">Trial Room source assistant</h2><p>Official trial sources and general room context only. Patient facts are excluded by contract.</p></div><StatusChip tone="human">Never an official response</StatusChip></div>
    <div className="assistant-boundary" role="note"><Icon name="shield" /><p><strong>No patient questions, matching, eligibility, treatment advice, or site-availability inference.</strong>The server rejects those requests and requires a verified pilot identity. Generated text can be wrong; open every citation.</p></div>
    <form onSubmit={ask}>
      <label htmlFor="assistant-question">Ask about the public trial source or operational room context</label>
      <textarea id="assistant-question" rows={3} maxLength={500} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Example: When was the registry record last updated, and what remains unresolved in this room?" />
      <div className="assistant-actions"><span>{question.length}/500 · model fixed to lowest-cost approved snapshot</span><button className="button primary" type="submit" disabled={!question.trim() || loading}>{loading ? "Checking cited sources…" : "Ask source assistant"}</button></div>
    </form>
    {loading ? <div className="assistant-thinking" role="status"><ThinkingOrb state="searching" size={64} theme="light" aria-hidden="true" /><span><strong>Tracing the source layer</strong><small>Checking cited public-trial material and permitted room context.</small></span></div> : null}
    {error ? <p className="form-error" role="alert"><Icon name="warning" />{error}</p> : null}
    {answer ? <article className="assistant-answer" aria-live="polite"><header><StatusChip tone="human">Generated · not official</StatusChip><time dateTime={answer.generatedAt}>{new Date(answer.generatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</time></header><p>{answer.answer}</p><div><strong>Citations</strong>{answer.citations.map((citation) => <a href={citation} target="_blank" rel="noreferrer" key={citation}>{citation}<Icon name="external" /></a>)}</div><small>Model: {answer.model} · {answer.authority}</small></article> : null}
  </section>;
}
