import type { TrialRecord } from "../types";
import type { Criterion, CriterionModel, Predicate } from "./model";
import { contentVersion } from "./identity";

const eq = (concept: string, value: string | number | boolean): Predicate => ({
  op: "eq",
  concept,
  values: [value],
});
const range = (
  concept: string,
  min: number,
  max?: number,
  unit?: string,
): Predicate => ({
  op: "range",
  concept,
  min,
  max,
  unit,
  minInclusive: true,
  maxInclusive: true,
});
const and = (...children: Predicate[]): Predicate => ({ op: "and", children });
const or = (...children: Predicate[]): Predicate => ({ op: "or", children });
const unsupported = (reason: string): Predicate => ({
  op: "unsupported",
  reason,
});
interface ModelDefinition {
  trialId: string;
  condition: string;
  roots: Array<[Criterion["section"], string, Predicate]>;
}
export const modelDefinitions: ModelDefinition[] = [
  {
    trialId: "NCT06348199",
    condition: "NSCLC",
    roots: [
      [
        "inclusion",
        "Male or female ≥ 18 years of age",
        and(
          { op: "in", concept: "sex", values: ["Male", "Female"] },
          range("age", 18, undefined, "years"),
        ),
      ],
      [
        "inclusion",
        "Have been diagnosed with stage IV non-squamous NSCLC",
        and(
          eq("condition", "NSCLC"),
          eq("stage", "IV"),
          eq("histology", "Non-squamous"),
        ),
      ],
      [
        "inclusion",
        "Have not received any prior systemic anti-cancer therapy for metastatic NSCLC",
        eq("metastaticTherapy", false),
      ],
      [
        "inclusion",
        "Agree to use adequate methods of contraception",
        eq("contraceptionAgreement", true),
      ],
      [
        "exclusion",
        "Unable or unwilling to take folic acid and vitamin B12 supplementation",
        eq("supplementationUnable", true),
      ],
      [
        "exclusion",
        "Severe hypersensitivity to treatment with another monoclonal antibody, any ingredient contained in SB27 or Keytruda, or any component of platinum-containing compounds or pemetrexed.",
        eq("hypersensitivity", true),
      ],
    ],
  },
  {
    trialId: "NCT02161900",
    condition: "Breast cancer",
    roots: [
      [
        "inclusion",
        "Women with unilateral breast cancer",
        and(
          eq("sex", "Female"),
          eq("condition", "Breast cancer"),
          eq("unilateral", true),
        ),
      ],
      ["inclusion", "Age 18-65 years", range("age", 18, 65, "years")],
      [
        "exclusion",
        "Metastatic breast cancer",
        and(eq("condition", "Breast cancer"), eq("stage", "IV")),
      ],
      ["exclusion", "Pregnant Women", eq("pregnant", true)],
      [
        "exclusion",
        "Women with physical limitations to perform exercises",
        eq("exerciseLimitation", true),
      ],
      ["exclusion", "Previous history of cancer", eq("previousCancer", true)],
    ],
  },
  {
    trialId: "NCT07585929",
    condition: "Cervical cancer",
    roots: [
      [
        "inclusion",
        "Patients with stage IIIC cervical cancer",
        and(eq("condition", "Cervical cancer"), eq("stage", "IIIC")),
      ],
      [
        "inclusion",
        "No previous pelvic radiation therapy or surgery",
        eq("pelvicTreatment", false),
      ],
      [
        "inclusion",
        "Eastern Cooperative Oncology Group (ECOG) performance status of 0-2",
        range("ecog", 0, 2),
      ],
      [
        "exclusion",
        "Patients with stage I or stage II or stage IV disease.",
        { op: "in", concept: "stage", values: ["I", "II", "IV"] },
      ],
      [
        "exclusion",
        "Patients with prior malignancies or active autoimmune diseases",
        or(eq("previousCancer", true), eq("autoimmune", true)),
      ],
      [
        "exclusion",
        "Uncontrolled medical comorbidity",
        eq("uncontrolledComorbidity", true),
      ],
    ],
  },
  {
    trialId: "NCT06058572",
    condition: "Acute leukemia",
    roots: [
      [
        "inclusion",
        "Adults with acute leukemia undergoing allogeneic stem cell transplant.",
        and(
          range("age", 18, undefined, "years"),
          eq("condition", "Acute leukemia"),
          eq("transplant", true),
        ),
      ],
      [
        "inclusion",
        "ECOG performance status 0, 1 or 2.",
        { op: "in", concept: "ecog", values: [0, 1, 2] },
      ],
      [
        "inclusion",
        "Adequate Liver function",
        unsupported(
          "Adequacy is unspecified in the registry. Trial-team interpretation is required; laboratory values cannot establish it.",
        ),
      ],
      [
        "exclusion",
        "Known hypersensitivity to rifaximin or other rifampicin antimicrobial agents",
        eq("rifaximinAllergy", true),
      ],
      [
        "exclusion",
        "Current or past history of inflammatory bowel disease",
        eq("bowelDisease", true),
      ],
      [
        "exclusion",
        "History of major bowel resection or presence of colostomy.",
        eq("bowelResection", true),
      ],
      [
        "exclusion",
        "Ongoing Verapamil, ketoconazole or itraconazole.",
        eq("listedMedication", true),
      ],
    ],
  },
  {
    trialId: "NCT03390686",
    condition: "NSCLC",
    roots: [
      ["inclusion", "Aged ≥ 18 years", range("age", 18, undefined, "years")],
      ["inclusion", "ECOG performance status of 0-1", range("ecog", 0, 1)],
      [
        "inclusion",
        "Histologically-confirmed metastatic or recurrent non-squamous non-small cell lung cancer",
        and(
          eq("condition", "NSCLC"),
          eq("histology", "Non-squamous"),
          unsupported(
            "Metastatic or recurrent histological confirmation requires explicit protocol interpretation.",
          ),
        ),
      ],
      [
        "inclusion",
        "At least one measurable lesion according to RECIST v1.1.",
        unsupported(
          "RECIST assessment must be an explicitly recorded authorised interpretation.",
        ),
      ],
      [
        "inclusion",
        "Able to receive bevacizumab, carboplatin and paclitaxel based on adequate laboratory and clinical parameters",
        unsupported(
          "Suitability and adequate parameters are not defined by this registry text.",
        ),
      ],
      [
        "exclusion",
        "Diagnosis of small cell carcinoma of the lung or squamous cell carcinoma",
        { op: "in", concept: "histology", values: ["Small cell", "Squamous"] },
      ],
      [
        "exclusion",
        "Sensitizing EGFR mutations or ALK rearrangements",
        or(eq("egfr", "Detected"), eq("alk", "Detected")),
      ],
      [
        "exclusion",
        "Increased risk of bleeding determined by investigator based on radiographic / clinical findings",
        unsupported(
          "Investigator determination is required; no risk inference is performed.",
        ),
      ],
      [
        "exclusion",
        "History of systemic chemotherapy administered in the first-line setting for metastatic or recurrent disease of NSCLC.",
        unsupported(
          "Recorded systemic-therapy boolean does not establish chemotherapy type and line.",
        ),
      ],
    ],
  },
  {
    trialId: "NCT05144997",
    condition: "NSCLC",
    roots: [
      [
        "inclusion",
        "Any participant who is receiving study treatment and deriving clinical benefit (as determined by the Principal Investigator) in a Pfizer-sponsored Lorlatinib Parent Study.",
        unsupported(
          "Named parent-study participation and PI-confirmed benefit are required.",
        ),
      ],
      [
        "inclusion",
        "Participants must agree to follow the reproductive criteria.",
        unsupported(
          "Reproductive criteria are not supplied in the registry excerpt.",
        ),
      ],
      [
        "inclusion",
        "Adequate Bone Marrow, Liver, Renal, Pancreatic Function",
        unsupported("Organ-function thresholds are not supplied."),
      ],
      [
        "exclusion",
        "Female participants who are pregnant or breastfeeding.",
        and(
          eq("sex", "Female"),
          or(eq("pregnant", true), eq("breastfeeding", true)),
        ),
      ],
      [
        "exclusion",
        "Any medical reason that, in the opinion of the Investigator or Sponsor, precludes the participant from inclusion in the study.",
        unsupported("Investigator or sponsor opinion cannot be inferred."),
      ],
    ],
  },
];
export function createCriterionModels(trials: TrialRecord[]): CriterionModel[] {
  return modelDefinitions.flatMap((definition) => {
    const trial = trials.find((t) => t.id === definition.trialId);
    if (!trial) return [];
    const criteria = definition.roots.map(
      ([section, wording, predicate], index): Criterion => {
        const sourceStart = trial.eligibilityCriteria.indexOf(wording);
        return {
          id: `${section}-${index + 1}`,
          section,
          wording,
          sourceStart,
          sourceEnd: sourceStart < 0 ? -1 : sourceStart + wording.length,
          predicate:
            sourceStart < 0
              ? unsupported(
                  "The source span changed; interpretation must be reconciled.",
                )
              : predicate,
        };
      },
    );
    return [
      {
        id: `model-${trial.id}`,
        trialId: trial.id,
        cohort: "Registry population",
        version: 1,
        sourceVersion: contentVersion(trial.eligibilityCriteria),
        sourceText: trial.eligibilityCriteria,
        sourceUrl: trial.sourceUrl,
        criteria,
        complete:
          !trial.eligibilityCriteriaTruncated &&
          criteria.every((c) => c.sourceStart >= 0),
        status: "draft" as const,
        qualification:
          "Synthetic demonstration interpretation — not clinically validated" as const,
      },
    ];
  });
}
