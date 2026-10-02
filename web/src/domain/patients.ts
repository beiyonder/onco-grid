import {
  SCENARIO_DATE,
  type Assertion,
  type SourceArtifact,
  type SyntheticPatient,
  type Value,
} from "./model";

export interface DemoField {
  concept: string;
  label: string;
  group: string;
  values: Value[];
  unit?: string;
}
export const demoFields: DemoField[] = [
  {
    concept: "age",
    label: "Age",
    group: "Clinic",
    values: [18, 35, 48, 56, 64, 75],
    unit: "years",
  },
  {
    concept: "sex",
    label: "Recorded sex",
    group: "Clinic",
    values: ["Female", "Male"],
  },
  {
    concept: "condition",
    label: "Recorded diagnosis",
    group: "Pathology",
    values: [
      "NSCLC",
      "Breast cancer",
      "Colorectal cancer",
      "Acute leukemia",
      "Cervical cancer",
      "Melanoma",
    ],
  },
  {
    concept: "stage",
    label: "Recorded stage",
    group: "Pathology",
    values: ["II", "IIIC", "IV"],
  },
  {
    concept: "histology",
    label: "Recorded histology",
    group: "Pathology",
    values: [
      "Non-squamous",
      "Ductal",
      "Adenocarcinoma",
      "Squamous",
      "Melanoma",
      "Acute myeloid leukemia",
      "Not documented",
    ],
  },
  {
    concept: "ecog",
    label: "Recorded ECOG",
    group: "Clinic",
    values: [0, 1, 2, 3],
  },
  {
    concept: "egfr",
    label: "EGFR assay result",
    group: "Molecular",
    values: ["Detected", "Not detected"],
  },
  {
    concept: "alk",
    label: "ALK assay result",
    group: "Molecular",
    values: ["Detected", "Not detected"],
  },
  {
    concept: "her2",
    label: "HER2 IHC result",
    group: "Molecular",
    values: ["0", "1+", "2+", "3+"],
  },
  {
    concept: "er",
    label: "ER assay result",
    group: "Molecular",
    values: ["Positive", "Negative"],
  },
  {
    concept: "assay",
    label: "Recorded assay",
    group: "Molecular",
    values: ["Tissue panel", "Immunohistochemistry"],
  },
  {
    concept: "specimen",
    label: "Specimen",
    group: "Molecular",
    values: ["Primary tissue", "Metastatic tissue"],
  },
  {
    concept: "hemoglobin",
    label: "Hemoglobin",
    group: "Laboratory",
    values: [8.5, 10, 12.4],
    unit: "g/dL",
  },
  {
    concept: "platelets",
    label: "Platelets",
    group: "Laboratory",
    values: [75000, 80000, 150000],
    unit: "/mm3",
  },
  {
    concept: "creatinine",
    label: "Creatinine",
    group: "Laboratory",
    values: [0.9, 1.5, 2.1],
    unit: "mg/dL",
  },
  {
    concept: "metastaticTherapy",
    label: "Prior systemic therapy for metastatic disease",
    group: "Treatment",
    values: [false, true],
  },
  {
    concept: "therapyStart",
    label: "Recorded treatment start",
    group: "Treatment",
    values: ["2026-06-01", "2026-08-01"],
  },
  {
    concept: "therapyEnd",
    label: "Recorded treatment end",
    group: "Treatment",
    values: ["2026-08-23", "2026-09-10"],
  },
  {
    concept: "contraceptionAgreement",
    label: "Recorded contraception agreement",
    group: "Clinic",
    values: [true, false],
  },
  {
    concept: "supplementationUnable",
    label: "Unable or unwilling to take folate/B12",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "hypersensitivity",
    label: "Protocol-listed severe hypersensitivity documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "pregnant",
    label: "Pregnancy documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "breastfeeding",
    label: "Breastfeeding documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "unilateral",
    label: "Unilateral breast cancer documented",
    group: "Pathology",
    values: [true, false],
  },
  {
    concept: "exerciseLimitation",
    label: "Physical limitation to exercise documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "previousCancer",
    label: "Previous cancer documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "pelvicTreatment",
    label: "Prior pelvic radiation or surgery",
    group: "Treatment",
    values: [false, true],
  },
  {
    concept: "autoimmune",
    label: "Active autoimmune disease documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "uncontrolledComorbidity",
    label: "Uncontrolled comorbidity documented",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "transplant",
    label: "Allogeneic stem-cell transplant documented",
    group: "Treatment",
    values: [true, false],
  },
  {
    concept: "liverAdequacy",
    label: "Source statement of adequate liver function",
    group: "Laboratory",
    values: [true, false],
  },
  {
    concept: "rifaximinAllergy",
    label: "Rifaximin/rifampicin hypersensitivity",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "bowelDisease",
    label: "Inflammatory bowel disease history",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "bowelResection",
    label: "Major bowel resection or colostomy",
    group: "Treatment",
    values: [false, true],
  },
  {
    concept: "listedMedication",
    label: "Verapamil, ketoconazole or itraconazole recorded",
    group: "Clinic",
    values: [false, true],
  },
  {
    concept: "travel",
    label: "Recorded travel preference",
    group: "Clinic",
    values: ["Within state", "Across India", "Not recorded"],
  },
];
const scenarios = [
  ["NSCLC", "Complete source-linked lung record"],
  ["NSCLC", "Molecular report missing"],
  ["NSCLC", "Conflicting molecular reports"],
  ["Breast cancer", "Receptor and assay nuance"],
  ["Breast cancer", "Treatment sequence incomplete"],
  ["Breast cancer", "Known exclusion documented"],
  ["Colorectal cancer", "Stale laboratory record"],
  ["Acute leukemia", "Treatment interval boundary"],
  ["Cervical cancer", "Logical exception and branch review"],
  ["Melanoma", "No supported model in scope"],
  ["NSCLC", "Thin manual intake"],
  ["NSCLC", "Source revision after review"],
];
export function createDemoPatient(
  sequence: number,
  scenarioIndex: number,
): SyntheticPatient {
  const scenario = scenarios[scenarioIndex % scenarios.length]!;
  const id = `SYN-${String(sequence).padStart(3, "0")}`;
  const condition = scenario[0]!;
  const patient: SyntheticPatient = {
    id,
    label: `Patient ${sequence}`,
    condition,
    context: `${condition} · synthetic record`,
    owner: "Dr M. Shah",
    version: 1,
    assertions: [],
    artifacts: [],
    scenario: scenario[1]!,
    synthetic: true,
  };
  const values: Record<string, Value> = {
    age: 56,
    sex:
      condition === "Breast cancer" || condition === "Cervical cancer"
        ? "Female"
        : "Male",
    condition,
    stage:
      condition === "Cervical cancer"
        ? "IIIC"
        : condition === "Breast cancer"
          ? "II"
          : "IV",
    histology: condition === "NSCLC" ? "Non-squamous" : "Adenocarcinoma",
    ecog: 1,
    egfr: "Not detected",
    alk: "Not detected",
    her2: "2+",
    er: "Positive",
    assay: "Tissue panel",
    specimen: "Primary tissue",
    hemoglobin: 12.4,
    platelets: 150000,
    creatinine: 0.9,
    metastaticTherapy: false,
    therapyStart: "2026-06-01",
    therapyEnd: "2026-08-23",
    contraceptionAgreement: true,
    supplementationUnable: false,
    hypersensitivity: false,
    pregnant: false,
    breastfeeding: false,
    unilateral: true,
    exerciseLimitation: false,
    previousCancer: scenarioIndex === 5,
    pelvicTreatment: false,
    autoimmune: false,
    uncontrolledComorbidity: false,
    transplant: condition === "Acute leukemia",
    liverAdequacy: true,
    rifaximinAllergy: false,
    bowelDisease: false,
    bowelResection: false,
    listedMedication: false,
    travel: "Within state",
  };
  values.age = [56, 64, 48, 35, 56, 64, 75, 48, 56, 35, 64, 56][
    scenarioIndex % scenarios.length
  ]!;
  if (condition === "Breast cancer") {
    values.histology = "Ductal";
    values.assay = "Immunohistochemistry";
  }
  if (condition === "Cervical cancer") values.histology = "Squamous";
  if (condition === "Melanoma") values.histology = "Melanoma";
  if (condition === "Acute leukemia") {
    values.histology = "Acute myeloid leukemia";
    delete values.stage;
  }
  if (condition !== "Breast cancer") {
    delete values.her2;
    delete values.er;
    delete values.unilateral;
  }
  if (condition !== "NSCLC") {
    delete values.egfr;
    delete values.alk;
  }
  const groups = [
    "Clinic",
    "Pathology",
    "Molecular",
    "Laboratory",
    "Treatment",
  ];
  for (const group of groups) {
    const fields = demoFields.filter(
      (f) =>
        f.group === group &&
        f.concept in values &&
        !(scenarioIndex === 1 && group === "Molecular") &&
        !(scenarioIndex === 4 && f.concept === "therapyEnd") &&
        !(
          scenarioIndex === 10 &&
          !["age", "condition", "travel"].includes(f.concept)
        ),
    );
    if (!fields.length) continue;
    const sourceId = `${id}-${group.toLowerCase()}-1`;
    const observedAt =
      scenarioIndex === 6 && group === "Laboratory"
        ? "2026-06-01"
        : "2026-09-18";
    const lines = [
      "SYNTHETIC DEMONSTRATION — NOT A REAL PATIENT RECORD",
      `${patient.label} | ${group} record | ${observedAt}`,
      ...fields.map(
        (f) =>
          `${f.label}: ${String(values[f.concept])}${f.unit ? ` ${f.unit}` : ""}`,
      ),
    ];
    const artifact: SourceArtifact = {
      id: sourceId,
      patientId: id,
      title: `${group} record`,
      kind: group,
      origin: scenarioIndex === 10 ? "Manual synthetic entry" : "Simulated EMR",
      authoredAt: observedAt,
      importedAt: SCENARIO_DATE,
      version: 1,
      content: lines.join("\n"),
      mediaType: "text/plain",
    };
    patient.artifacts.push(artifact);
    fields.forEach((field, index) =>
      patient.assertions.push({
        id: `${sourceId}-${field.concept}`,
        concept: field.concept,
        value: values[field.concept]!,
        unit: field.unit,
        observedAt,
        artifactId: sourceId,
        locator: `line:${index + 3}`,
        raw: lines[index + 2]!,
        authority: scenarioIndex === 10 ? "unreviewed" : "confirmed",
        reviewer: scenarioIndex === 10 ? undefined : "Demo oncologist fixture",
      }),
    );
  }
  if (scenarioIndex === 2) {
    const original = patient.assertions.find((a) => a.concept === "egfr")!;
    const artifactId = `${id}-molecular-conflict`;
    patient.artifacts.push({
      id: artifactId,
      patientId: id,
      title: "Second molecular report",
      kind: "Molecular",
      origin: "Synthetic document",
      authoredAt: "2026-09-19",
      importedAt: SCENARIO_DATE,
      version: 1,
      content: "SYNTHETIC DEMONSTRATION\nEGFR assay result: Detected",
      mediaType: "text/plain",
    });
    patient.assertions.push({
      ...original,
      id: `${artifactId}-egfr`,
      artifactId,
      value: "Detected",
      raw: "EGFR assay result: Detected",
      locator: "line:2",
      observedAt: "2026-09-19",
    });
  }
  return patient;
}
export const initialSyntheticPatients = scenarios.map((_, index) =>
  createDemoPatient(index + 1, index),
);
export function syntheticEvidence(
  patient: SyntheticPatient,
  concept: string,
  value: Value,
  sequence: number,
): { artifact: SourceArtifact; assertion: Assertion } {
  const field = demoFields.find((f) => f.concept === concept);
  if (!field || !field.values.includes(value))
    throw new Error("Choose a supplied synthetic value.");
  const id = `${patient.id}-manual-${sequence}`;
  const raw = `${field.label}: ${String(value)}${field.unit ? ` ${field.unit}` : ""}`;
  return {
    artifact: {
      id,
      patientId: patient.id,
      title: `${field.label} — supplied synthetic entry`,
      kind: field.group,
      origin: "Manual synthetic entry",
      authoredAt: SCENARIO_DATE,
      importedAt: SCENARIO_DATE,
      version: 1,
      content: `SYNTHETIC DEMONSTRATION — NOT A REAL PATIENT RECORD\n${raw}`,
      mediaType: "text/plain",
    },
    assertion: {
      id: `${id}-assertion`,
      concept,
      value,
      unit: field.unit,
      observedAt: SCENARIO_DATE,
      artifactId: id,
      locator: "line:2",
      raw,
      authority: "unreviewed",
    },
  };
}
