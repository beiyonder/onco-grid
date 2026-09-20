import type { PatientWorkspace } from "../types";

export const approvedResearchContexts = [
  "NSCLC · source coverage review",
  "Breast cancer · source coverage review",
  "Colorectal cancer · source coverage review",
  "General oncology · source coverage review",
] as const;

export const approvedResearchFactLabels = [
  "Diagnosis context",
  "Stage context",
  "PD-L1 TPS",
  "KRAS G12C",
  "ECOG performance status",
  "Age band",
  "Sex",
  "Prior treatment context",
  "Molecular result context",
] as const;

type ApprovedResearchContext = (typeof approvedResearchContexts)[number];
type ApprovedResearchFactLabel = (typeof approvedResearchFactLabels)[number];

export interface ApprovedResearchRecord {
  schemaVersion: 1;
  approvalReference: string;
  context: ApprovedResearchContext;
  owner: "A. Rao" | "Dr M. Shah";
  facts: Array<{
    label: ApprovedResearchFactLabel;
    value: string;
  }>;
}

const topLevelKeys = ["schemaVersion", "approvalReference", "context", "owner", "facts"];
const factKeys = ["label", "value"];
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phonePattern = /(?:\+?\d[\d\s()-]{7,}\d)/;
const fullDatePattern = /\b(?:19|20)\d{2}-\d{2}-\d{2}\b/;
const longIdentifierPattern = /\b\d{8,}\b/;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: string[]): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function safeFactValue(value: unknown): value is string {
  return typeof value === "string"
    && value.trim().length > 0
    && value.trim().length <= 120
    && !emailPattern.test(value)
    && !phonePattern.test(value)
    && !fullDatePattern.test(value)
    && !longIdentifierPattern.test(value);
}

export function parseApprovedResearchRecord(text: string): ApprovedResearchRecord {
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }

  if (!isPlainObject(payload) || !hasOnlyKeys(payload, topLevelKeys)) {
    throw new Error("Use only the approved schema. Identity or extra fields are not accepted.");
  }
  if (payload.schemaVersion !== 1) throw new Error("schemaVersion must be 1.");
  if (
    typeof payload.approvalReference !== "string"
    || !/^[A-Za-z0-9._/-]{3,64}$/.test(payload.approvalReference)
  ) {
    throw new Error("approvalReference must be a 3–64 character institutional reference.");
  }
  if (!approvedResearchContexts.includes(payload.context as ApprovedResearchContext)) {
    throw new Error("context must use one of the approved non-identifying values.");
  }
  if (payload.owner !== "A. Rao" && payload.owner !== "Dr M. Shah") {
    throw new Error("owner must be A. Rao or Dr M. Shah.");
  }
  if (!Array.isArray(payload.facts) || payload.facts.length < 1 || payload.facts.length > 20) {
    throw new Error("facts must contain between 1 and 20 approved fact entries.");
  }

  const facts = payload.facts.map((fact, index) => {
    if (!isPlainObject(fact) || !hasOnlyKeys(fact, factKeys)) {
      throw new Error(`Fact ${index + 1} contains an unapproved field.`);
    }
    if (!approvedResearchFactLabels.includes(fact.label as ApprovedResearchFactLabel)) {
      throw new Error(`Fact ${index + 1} uses an unsupported label.`);
    }
    if (!safeFactValue(fact.value)) {
      throw new Error(`Fact ${index + 1} is empty, too long, or resembles identifying data.`);
    }
    return {
      label: fact.label as ApprovedResearchFactLabel,
      value: fact.value.trim(),
    };
  });

  return {
    schemaVersion: 1,
    approvalReference: payload.approvalReference,
    context: payload.context as ApprovedResearchContext,
    owner: payload.owner,
    facts,
  };
}

export function createApprovedResearchWorkspace(
  record: ApprovedResearchRecord,
  sequence: number,
): PatientWorkspace {
  const createdAt = new Date().toISOString();
  return {
    id: `RID-${String(sequence).padStart(3, "0")}`,
    label: `Approved research workspace ${sequence}`,
    context: record.context,
    owner: record.owner,
    institution: "Approved de-identified research cohort",
    dataBoundary: "Approved de-identified research",
    approvalReference: record.approvalReference,
    lastActivity: createdAt,
    reviewTrialIds: [],
    facts: record.facts.map((fact, index) => ({
      id: `research-fact-${index + 1}`,
      label: fact.label,
      value: fact.value,
      sourceType: "Approved de-identified research data",
      sourceLabel: `Approved dataset · ${record.approvalReference}`,
      recordedAt: createdAt.slice(0, 10),
    })),
  };
}
