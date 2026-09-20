# Work report — P5 C2 source evidence and assistant

## Problem

The owner authorised a trial-specific evidence feed and AI Trial Room assistant, but only from official trial/regulator sources and general room context. The assistant must exclude patient facts, never rank or interpret eligibility, never imply current site availability, never speak as an official site response, require authenticated staff, cite its sources, and use the cheapest OpenAI model without exception. Browser-side API keys or an unauthenticated generative endpoint would violate that contract.

## Decision

Add two separate capabilities. Trial Detail fetches the current ClinicalTrials.gov record directly and compares its status, update date, title, and India-location count with the bundled snapshot while deliberately omitting contacts. A Vercel Function provides the source-only assistant: it verifies a Supabase bearer identity, fetches and sanitizes the official registry record server-side, validates bounded general room context, rejects patient/matching/recommendation/identifier content, calls pinned `gpt-5-nano-2025-08-07`, returns citations, and labels output generated/not official. The UI fails closed without pilot identity or service configuration. The exposed credential from conversation was not used or stored and must be revoked.

## Evidence

- Official model source — OpenAI's model documentation identifies `gpt-5-nano` as its cheapest GPT-5 variant at $0.05 per million input tokens and $0.40 per million output tokens; the implementation pins snapshot `gpt-5-nano-2025-08-07`.
- Live evidence feed — `NCT06345729` loaded directly from ClinicalTrials.gov and showed Recruiting / same as snapshot, 8 Sept 2026 / same update date, and 4 India locations / same count.
- Provenance — the feed showed the current check timestamp, official API version date, study-title comparison, unresolved site-availability boundary, and a direct `https://clinicaltrials.gov/study/NCT06345729` citation.
- Contact minimization — visible evidence output contained no email, phone, or copied central/location contact details.
- Server evidence adapter — transforms only bounded identification, status, summary, condition, phase, enrollment, eligibility, and India-location fields; contact fields are absent from its return type and test result.
- Auth boundary — assistant endpoint requires a verified Supabase bearer user and returns configuration/authentication failures before any OpenAI request. No service-role key is required or accepted by this slice.
- Input policy — accepts exact NCT identifiers, a 3–500 character operational question, at most 20 bounded room messages, and ClinicalTrials.gov source URLs only. It rejects unsupported fields, patient/matching/eligibility/recommendation wording, emails, phone-like strings, and long identifiers.
- Prompt boundary — official source and room content are quoted as untrusted data; instructions prohibit patient/clinical interpretation, site-availability inference, and official-response voice.
- Output boundary — response includes generated text, explicit citations, fixed model ID, timestamp, and `Generated source summary · not an official response` authority.
- UI fail-closed path — without configured Supabase identity, asking `When was the registry record last updated?` returned `Sign in through the configured Supabase pilot identity` and made no network model request.
- Contract tests — 8 API tests passed: cheapest-model pin, accepted source-only request, patient/identifier rejection, unsupported-field/source rejection, NCT validation, bounded evidence sanitization, malformed ID rejection, and missing-Supabase fail-closed behavior.
- Build — `npm run test:api && npm run build` passed; TypeScript checked both browser and Vercel API sources, Vite transformed 45 modules, and application JavaScript was 413.04kB before gzip / 123.42kB after gzip. `npm audit` and `npm audit --omit=dev` both found 0 vulnerabilities after removing the vulnerable, unnecessary Vercel type package.

## Risks and gaps

Live generative output is not verified because the repository has no configured Supabase project and the pasted OpenAI key is compromised. The owner must revoke it and configure a rotated replacement only as server-side `OPENAI_API_KEY`; values must never be sent in chat or committed. The evidence feed depends on ClinicalTrials.gov browser availability and may fail offline or under source rate limits. Generated answers remain non-deterministic and require direct factuality, omission, citation, authority-confusion, abuse, and cost evaluation after real pilot configuration.

## Next

Merge this slice. Implement the Supabase pilot schema, Auth client, RLS membership rules, realtime Trial Room messages, official-response role constraint, no-PHI handoff metadata, and immutable audit events. Wire the resulting session token into the assistant UI, then run live auth/realtime/AI acceptance only after approved project configuration and rotated secret injection.

## Sign-off needed

No separate owner review is required for this authorised source-only implementation. The owner must revoke the exposed credential and configure replacement secrets through approved stores. Institutional/security sign-off remains required before live staff identity, production Supabase, model usage, external communication, real data, or production deployment. Patient facts, approved research imports, PHI, eligibility questions, matching, and treatment requests remain prohibited from the assistant.
