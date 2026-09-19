#!/usr/bin/env python3
"""Fetch and validate a public India-oncology trial snapshot from ClinicalTrials.gov API v2.

The output deliberately omits contact names, email addresses, and phone numbers. It is a
registry-declared research snapshot for workflow validation, not proof of live site capacity
or patient eligibility.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

API_BASE = "https://clinicaltrials.gov/api/v2"
QUERY_CONDITION = (
    "cancer OR neoplasm OR carcinoma OR lymphoma OR leukemia OR leukaemia "
    "OR myeloma OR sarcoma OR tumor OR tumour"
)
ACTIVE_STATUSES = [
    "RECRUITING",
    "NOT_YET_RECRUITING",
    "ACTIVE_NOT_RECRUITING",
    "ENROLLING_BY_INVITATION",
]
STATUS_LABELS = {
    "RECRUITING": "Recruiting",
    "NOT_YET_RECRUITING": "Not yet recruiting",
    "ACTIVE_NOT_RECRUITING": "Active, not recruiting",
    "ENROLLING_BY_INVITATION": "Enrolling by invitation",
}
NCT_ID_RE = re.compile(r"^NCT\d{8}$")
MAX_SUMMARY_CHARS = 4_000
MAX_ELIGIBILITY_CHARS = 12_000


def text(value: Any, default: str = "") -> str:
    if value is None:
        return default
    return " ".join(str(value).split())


def text_list(value: Any, limit: int | None = None) -> list[str]:
    if not isinstance(value, list):
        return []
    result = [text(item) for item in value if text(item)]
    return result[:limit] if limit is not None else result


def truncate(value: Any, limit: int) -> tuple[str, bool]:
    cleaned = text(value)
    if len(cleaned) <= limit:
        return cleaned, False
    return cleaned[: limit - 1].rstrip() + "…", True


def api_json(path: str, params: dict[str, str] | None = None) -> dict[str, Any]:
    url = f"{API_BASE}{path}"
    if params:
        url = f"{url}?{urlencode(params)}"
    request = Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": "onco-grid-validation/1.0 (public registry research snapshot)",
        },
    )
    with urlopen(request, timeout=60) as response:
        if response.status != 200:
            raise RuntimeError(f"ClinicalTrials.gov returned HTTP {response.status}")
        payload = json.load(response)
    if not isinstance(payload, dict):
        raise ValueError("ClinicalTrials.gov returned a non-object JSON payload")
    return payload


def india_locations(module: dict[str, Any]) -> list[dict[str, Any]]:
    locations = module.get("locations")
    if not isinstance(locations, list):
        return []
    normalized: list[dict[str, Any]] = []
    for location in locations:
        if not isinstance(location, dict) or text(location.get("country")).casefold() != "india":
            continue
        contacts = location.get("contacts")
        normalized.append(
            {
                "facility": text(location.get("facility"), "Facility not reported"),
                "city": text(location.get("city"), "City not reported"),
                "state": text(location.get("state"), "State not reported"),
                "postalCode": text(location.get("zip")),
                "status": text(location.get("status"), "UNKNOWN"),
                "contactAvailable": isinstance(contacts, list) and bool(contacts),
            }
        )
    return normalized


def secondary_ids(module: dict[str, Any]) -> list[dict[str, str]]:
    values = module.get("secondaryIdInfos")
    if not isinstance(values, list):
        return []
    result: list[dict[str, str]] = []
    for value in values:
        if not isinstance(value, dict):
            continue
        identifier = text(value.get("id"))
        if not identifier:
            continue
        result.append(
            {
                "id": identifier,
                "type": text(value.get("type")),
                "domain": text(value.get("domain")),
            }
        )
    return result[:20]


def intervention_names(module: dict[str, Any]) -> list[str]:
    values = module.get("interventions")
    if not isinstance(values, list):
        return []
    result: list[str] = []
    for value in values:
        if not isinstance(value, dict):
            continue
        kind = text(value.get("type"))
        name = text(value.get("name"))
        if not name:
            continue
        result.append(f"{kind.title()}: {name}" if kind else name)
    return result[:30]


def normalize_trial(study: dict[str, Any]) -> dict[str, Any] | None:
    protocol = study.get("protocolSection")
    if not isinstance(protocol, dict):
        return None

    identification = protocol.get("identificationModule") or {}
    status = protocol.get("statusModule") or {}
    design = protocol.get("designModule") or {}
    contacts = protocol.get("contactsLocationsModule") or {}
    conditions = protocol.get("conditionsModule") or {}
    sponsor_module = protocol.get("sponsorCollaboratorsModule") or {}
    description = protocol.get("descriptionModule") or {}
    eligibility = protocol.get("eligibilityModule") or {}
    arms = protocol.get("armsInterventionsModule") or {}

    if text(design.get("studyType")) != "INTERVENTIONAL":
        return None

    locations = india_locations(contacts)
    if not locations:
        return None

    nct_id = text(identification.get("nctId"))
    if not NCT_ID_RE.fullmatch(nct_id):
        return None

    summary, summary_truncated = truncate(description.get("briefSummary"), MAX_SUMMARY_CHARS)
    criteria, criteria_truncated = truncate(
        eligibility.get("eligibilityCriteria"), MAX_ELIGIBILITY_CHARS
    )
    status_code = text(status.get("overallStatus"), "UNKNOWN")
    lead_sponsor = sponsor_module.get("leadSponsor") or {}
    design_info = design.get("designInfo") or {}
    enrollment = design.get("enrollmentInfo") or {}
    central_contacts = contacts.get("centralContacts")

    recruiting_sites = sum(1 for location in locations if location["status"] == "RECRUITING")
    return {
        "id": nct_id,
        "source": "ClinicalTrials.gov",
        "sourceUrl": f"https://clinicaltrials.gov/study/{nct_id}",
        "briefTitle": text(identification.get("briefTitle"), "Title not reported"),
        "officialTitle": text(identification.get("officialTitle")),
        "secondaryIds": secondary_ids(identification),
        "conditions": text_list(conditions.get("conditions"), 30),
        "keywords": text_list(conditions.get("keywords"), 30),
        "overallStatus": status_code,
        "statusLabel": STATUS_LABELS.get(status_code, status_code.replace("_", " ").title()),
        "statusVerifiedDate": text(status.get("statusVerifiedDate")),
        "lastUpdatePostedDate": text((status.get("lastUpdatePostDateStruct") or {}).get("date")),
        "studyType": "Interventional",
        "phases": [phase.replace("PHASE", "Phase ").replace("EARLY_", "Early ").title() for phase in text_list(design.get("phases"), 5)],
        "primaryPurpose": text(design_info.get("primaryPurpose")).replace("_", " ").title(),
        "enrollment": enrollment.get("count") if isinstance(enrollment.get("count"), int) else None,
        "enrollmentType": text(enrollment.get("type")),
        "leadSponsor": text(lead_sponsor.get("name"), "Sponsor not reported"),
        "sponsorClass": text(lead_sponsor.get("class")),
        "briefSummary": summary,
        "briefSummaryTruncated": summary_truncated,
        "eligibilityCriteria": criteria,
        "eligibilityCriteriaTruncated": criteria_truncated,
        "minimumAge": text(eligibility.get("minimumAge")),
        "maximumAge": text(eligibility.get("maximumAge")),
        "sex": text(eligibility.get("sex")),
        "healthyVolunteers": bool(eligibility.get("healthyVolunteers")),
        "interventions": intervention_names(arms),
        "indiaLocations": locations,
        "indiaSiteCount": len(locations),
        "indiaRecruitingSiteCount": recruiting_sites,
        "centralContactAvailable": isinstance(central_contacts, list) and bool(central_contacts),
    }


def build_snapshot() -> dict[str, Any]:
    version = api_json("/version")
    params = {
        "format": "json",
        "query.cond": QUERY_CONDITION,
        "query.locn": "India",
        "filter.overallStatus": "|".join(ACTIVE_STATUSES),
        "pageSize": "1000",
        "countTotal": "true",
    }
    response = api_json("/studies", params)
    studies = response.get("studies")
    if not isinstance(studies, list):
        raise ValueError("ClinicalTrials.gov response omitted the studies array")

    normalized = [trial for study in studies if isinstance(study, dict) if (trial := normalize_trial(study))]
    normalized.sort(key=lambda trial: (trial["briefTitle"].casefold(), trial["id"]))

    snapshot = {
        "schemaVersion": 1,
        "retrievedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source": {
            "name": "ClinicalTrials.gov",
            "apiVersion": text(version.get("apiVersion")),
            "dataTimestamp": text(version.get("dataTimestamp")),
            "documentationUrl": "https://clinicaltrials.gov/data-api/about-api",
            "queryUrl": f"{API_BASE}/studies?{urlencode(params)}",
        },
        "scope": {
            "location": "India",
            "conditionQuery": QUERY_CONDITION,
            "overallStatuses": ACTIVE_STATUSES,
            "studyType": "INTERVENTIONAL",
            "importantNotice": (
                "Registry-declared research snapshot. It is not proof that a site can enrol "
                "today and must not be used to determine patient eligibility."
            ),
            "privacy": (
                "Contact names, email addresses, and phone numbers are deliberately omitted. "
                "Use the source record for current authorised contact information."
            ),
        },
        "apiTotalCount": response.get("totalCount"),
        "retainedCount": len(normalized),
        "trials": normalized,
    }
    validate_snapshot(snapshot)
    return snapshot


def contact_field_keys(value: Any) -> list[str]:
    found: list[str] = []
    if isinstance(value, dict):
        for key, child in value.items():
            normalized = str(key).casefold()
            if "email" in normalized or "phone" in normalized:
                found.append(str(key))
            found.extend(contact_field_keys(child))
    elif isinstance(value, list):
        for child in value:
            found.extend(contact_field_keys(child))
    return found


def validate_snapshot(snapshot: dict[str, Any]) -> None:
    if snapshot.get("schemaVersion") != 1:
        raise ValueError("Unsupported trial snapshot schemaVersion")
    trials = snapshot.get("trials")
    if not isinstance(trials, list) or not trials:
        raise ValueError("Trial snapshot contains no trials")
    if snapshot.get("retainedCount") != len(trials):
        raise ValueError("retainedCount does not match trials length")

    seen: set[str] = set()
    for index, trial in enumerate(trials):
        if not isinstance(trial, dict):
            raise ValueError(f"Trial at index {index} is not an object")
        identifier = trial.get("id")
        if not isinstance(identifier, str) or not NCT_ID_RE.fullmatch(identifier):
            raise ValueError(f"Invalid NCT identifier at index {index}: {identifier!r}")
        if identifier in seen:
            raise ValueError(f"Duplicate NCT identifier: {identifier}")
        seen.add(identifier)
        if trial.get("sourceUrl") != f"https://clinicaltrials.gov/study/{identifier}":
            raise ValueError(f"Invalid source URL for {identifier}")
        locations = trial.get("indiaLocations")
        if not isinstance(locations, list) or not locations:
            raise ValueError(f"Trial {identifier} has no retained India location")
        forbidden_keys = contact_field_keys(trial)
        if forbidden_keys:
            raise ValueError(f"Trial {identifier} contains forbidden contact fields: {forbidden_keys}")


def write_snapshot(path: Path, snapshot: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    content = json.dumps(snapshot, ensure_ascii=False, indent=2, sort_keys=False) + "\n"
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as handle:
        handle.write(content)
        temporary = Path(handle.name)
    temporary.replace(path)


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument(
        "--output",
        type=Path,
        default=Path("web/data/india-oncology-trials.json"),
        help="Output snapshot path (default: web/data/india-oncology-trials.json)",
    )
    result.add_argument(
        "--validate-only",
        action="store_true",
        help="Validate an existing snapshot instead of fetching a new one",
    )
    return result


def main() -> int:
    args = parser().parse_args()
    try:
        if args.validate_only:
            with args.output.open(encoding="utf-8") as handle:
                snapshot = json.load(handle)
            validate_snapshot(snapshot)
            print(f"PASS: {snapshot['retainedCount']} normalized India oncology trials valid")
            return 0

        snapshot = build_snapshot()
        write_snapshot(args.output, snapshot)
        print(
            "PASS: wrote "
            f"{snapshot['retainedCount']} interventional India oncology records "
            f"from {snapshot['apiTotalCount']} API candidates to {args.output}"
        )
        return 0
    except Exception as error:  # concise CLI failure boundary
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
