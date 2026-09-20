export const ASSISTANT_MODEL = "gpt-5-nano-2025-08-07";

export interface AssistantRoomContext {
  authorRole: string;
  body: string;
  sourceUrl?: string;
}

export interface AssistantRequest {
  trialId: string;
  question: string;
  roomContext: AssistantRoomContext[];
}

const trialIdPattern = /^NCT\d{8}$/;
const forbiddenClinicalPattern = /\b(?:patient|mrn|medical record|date of birth|dob|eligible|eligibility|qualif(?:y|ies|ied)|match(?:es|ing)?|recommend(?:ation|ed)?|treatment advice)\b/i;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(?:\+?\d[\d\s()-]{7,}\d)/;
const longIdentifierPattern = /\b\d{8,}\b/;
const allowedRequestKeys = ["trialId", "question", "roomContext"];
const allowedContextKeys = ["authorRole", "body", "sourceUrl"];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function rejectSensitiveText(value: string): void {
  if (
    forbiddenClinicalPattern.test(value)
    || emailPattern.test(value)
    || phonePattern.test(value)
    || longIdentifierPattern.test(value)
  ) {
    throw new Error("Patient, matching, recommendation, contact, or identifier content is not accepted.");
  }
}

export function validateTrialId(value: unknown): string {
  if (typeof value !== "string" || !trialIdPattern.test(value)) {
    throw new Error("trialId must be a valid NCT identifier.");
  }
  return value;
}

export function validateAssistantRequest(payload: unknown): AssistantRequest {
  if (!isPlainObject(payload) || !hasOnlyKeys(payload, allowedRequestKeys)) {
    throw new Error("Request contains an unsupported field.");
  }

  const trialId = validateTrialId(payload.trialId);
  if (typeof payload.question !== "string") throw new Error("question is required.");
  const question = payload.question.trim();
  if (question.length < 3 || question.length > 500) {
    throw new Error("question must contain 3–500 characters.");
  }
  rejectSensitiveText(question);

  if (!Array.isArray(payload.roomContext) || payload.roomContext.length > 20) {
    throw new Error("roomContext must contain at most 20 messages.");
  }

  const roomContext = payload.roomContext.map((entry, index) => {
    if (!isPlainObject(entry) || !hasOnlyKeys(entry, allowedContextKeys)) {
      throw new Error(`Room message ${index + 1} contains an unsupported field.`);
    }
    if (typeof entry.authorRole !== "string" || entry.authorRole.trim().length > 80) {
      throw new Error(`Room message ${index + 1} has an invalid role.`);
    }
    if (typeof entry.body !== "string" || entry.body.trim().length < 1 || entry.body.trim().length > 1_200) {
      throw new Error(`Room message ${index + 1} has an invalid body.`);
    }
    rejectSensitiveText(entry.body);

    let sourceUrl: string | undefined;
    if (entry.sourceUrl !== undefined) {
      if (typeof entry.sourceUrl !== "string") throw new Error(`Room message ${index + 1} has an invalid source URL.`);
      const parsed = new URL(entry.sourceUrl);
      if (parsed.protocol !== "https:" || parsed.hostname !== "clinicaltrials.gov") {
        throw new Error(`Room message ${index + 1} source must be ClinicalTrials.gov.`);
      }
      sourceUrl = parsed.toString();
    }

    return {
      authorRole: entry.authorRole.trim(),
      body: entry.body.trim(),
      sourceUrl,
    };
  });

  return { trialId, question, roomContext };
}
