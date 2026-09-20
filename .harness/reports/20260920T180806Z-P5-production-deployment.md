# Work report — P5 C3 Trial Relay production deployment

## Problem

The existing Vercel alias still served the legacy browser-native interface. After the React/Vite migration, the Vercel GitHub project remained rooted at the repository root with Framework `Other`, so an automatic main deployment completed without the `web/` Vite output and temporarily returned 404. Production needed an explicit Vite build/output contract, a correct Git root, a verified production deployment, live workflow checks, and durable instructions for the still-unconfigured Supabase/OpenAI pilot services.

## Decision

Merge `PILOT_ACTIVATION_RUNBOOK.md` and version-controlled Vercel Vite settings first. Link the exact existing project `sids-projects-d248cdf7/onco-grid-trial-relay-validation`; build through Vercel locally; deploy the prebuilt output to production; then set the Vercel project Root Directory to `web`, Framework to Vite, install to `npm ci`, build to `npm run build`, and output to `dist` so future Git deployments use the correct application. Keep production Supabase/AI features fail closed because no approved environment variables are configured.

## Evidence

- Target — Vercel project ID `prj_YZYBtRg1SOakegShWXs8hE8RBjIu`, team `sids-projects-d248cdf7`, project `onco-grid-trial-relay-validation`, public alias <https://onco-grid-trial-relay-validation.vercel.app>.
- Runbook — `PILOT_ACTIVATION_RUNBOOK.md` records deploy commands, exposed-key revocation, Supabase migration/Auth/env setup, official-role grant, live auth/realtime/AI/handoff qualification, open governance items, and rollback/emergency disablement. It contains no secret values.
- Vercel contract — `web/vercel.json` specifies Framework Vite, `npm ci`, `npm run build`, `dist`, and bounded evidence/assistant function durations.
- Vercel local production build — `vercel build --target production` passed browser/API TypeScript checks, Vite build, and Vercel Function transpilation; output was generated at `.vercel/output`.
- Production deployment — prebuilt production deployment `dpl_4hNh6qcJyarCzx8roVA2nW2EqaDy` reached `READY`, deployment URL `https://onco-grid-trial-relay-validation-6zlx72dyi.vercel.app`, and was aliased to the public production URL.
- Automatic Git deployment — after Root Directory correction, merged pull request `#35` produced production deployment `dpl_GaryB2hJHg2CvHAauca96KUPRKbQ`, reached `READY` in 20 seconds, built both serverless functions (`trial-assistant` 710.87kB and `trial-evidence` 9.96kB), retained the production alias, and served the 69-cluster spatial lens. This confirms future GitHub main deployments now use the `web` Vite project rather than an empty repository-root build.
- Project settings — Vercel now reports Root Directory `web`, Framework `vite`, Build Command `npm run build`, Install Command `npm ci`, Output Directory `dist`, Node 24.x.
- Production HTTP — the public alias returned HTTP 200 and the Vite document. Headers included noindex/nofollow/noarchive, strict transport security, CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, restricted camera/microphone/geolocation, and strict-origin referrer policy.
- Home — live title `Trial Relay — OncoGrid validation`, role Home heading, 285 public records, fail-closed pilot-services label, and zero desktop overflow.
- Spatial lens — live Three.js canvas rendered 69 clusters, 1,715 placed sites, 102 unplaced sites, 56 trials with unplaced sites, and all 69 accessible cluster rows.
- Trial Detail — live `NCT06345729` showed 23 formatted criteria, patient/cohort review actions, current official evidence cards for Recruiting / 8 Sept 2026 / four India locations, and zero overflow.
- Evidence API — live `/api/trial-evidence?id=NCT06345729` returned HTTP 200, correct NCT ID, four India locations, and no contact/email/phone content.
- Assistant API — live unauthenticated `/api/trial-assistant` returned HTTP 503 `configuration_missing` before any model request because Supabase production variables are absent.
- Trial Room and handoff — live production retained the synthetic room/simulation separately and showed explicit authenticated-pilot configuration blockers; no anonymous live control appeared.
- Browser health — integrated live desktop flow produced zero console warnings, console errors, or page errors.
- Mobile — Home, List, Spatial lens, Trial Detail, Trial Room, and Patient Handoff each had zero horizontal overflow and 13px minimum visible text at 390×844; the patient-review dialog measured 390px and focused its heading.
- Environment state — Vercel reports no production environment variables. Supabase and OpenAI remain disabled by design.
- Open work — live-service activation and every remaining governance gate are documented in `PILOT_ACTIVATION_RUNBOOK.md` and `IMPLEMENTATION_PLAN.md`.

## Risks and gaps

Live Supabase/Auth/RLS/realtime/two-user communication, recipient handoff acknowledgement, administrative official-response grant, and live OpenAI output remain unverified because no approved service configuration exists. The exposed OpenAI key must be revoked and was not used. Direct deployment URLs may require Vercel authentication under deployment protection; the public production alias is accessible. `P5`, direct oncology-user evidence, and product lock remain open.

## Next

Follow `PILOT_ACTIVATION_RUNBOOK.md`: revoke the exposed key, configure an approved Supabase project and rotated server-only OpenAI key outside chat, apply the migration, create multiple test staff identities, grant one approved site member official authority, and execute the live qualification matrix.

## Sign-off needed

The owner explicitly authorised this production deployment. Separate owner/institutional sign-off remains required for all environment secrets, Supabase activation, migration application, staff invitations/roles, retention/backups/monitoring, live OpenAI use, any real dataset, PHI, external clinical handoff, participant recruitment/contact, `P5` closure, and product lock.
