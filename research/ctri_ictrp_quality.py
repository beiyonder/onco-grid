#!/usr/bin/env python3
"""Extract CTRI oncology candidates from a WHO ICTRP XML export and profile quality.

The WHO export is a permitted research fallback, not a complete or current CTRI
mirror. Raw and derived record-level files can contain public professional
contact details and therefore must remain under the repository's ignored
.private directory. The JSON report contains aggregate measurements only.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from datetime import date, datetime
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import urlparse

XML_FIELDS = [
    "Export_date",
    "Internal_Number",
    "TrialID",
    "Last_Refreshed_on",
    "Public_title",
    "Scientific_title",
    "Acronym",
    "Primary_sponsor",
    "Prospective_registration",
    "Date_registration3",
    "Date_registration",
    "Source_Register",
    "web_address",
    "Recruitment_Status",
    "other_records",
    "Inclusion_agemin",
    "Inclusion_agemax",
    "Inclusion_gender",
    "Date_enrollement",
    "Target_size",
    "Study_type",
    "Study_design",
    "Phase",
    "Countries",
    "Contact_Firstname",
    "Contact_Lastname",
    "Contact_Address",
    "Contact_Email",
    "Contact_Tel",
    "Contact_Affiliation",
    "Inclusion_Criteria",
    "Exclusion_Criteria",
    "Condition",
    "Intervention",
    "Primary_outcome",
    "Secondary_outcome",
    "Secondary_ID",
    "Source_Support",
    "Secondary_Sponsor",
    "Ethics_review_status",
    "Ethics_review_approval_date",
    "Ethics_review_contact_name",
    "Ethics_review_contact_address",
    "Ethics_review_contact_phone",
    "Ethics_review_contact_email",
    "results_yes_no",
    "results_date_posted",
    "results_url_link",
    "results_url_protocol",
    "results_date_completed",
    "results_date_first_publication",
    "results_summary",
    "results_baseline_char",
    "results_adverse_events",
    "results_outcome_measures",
    "results_ipd_plan",
    "results_ipd_description",
]

SEARCH_FIELDS = ["Public_title", "Scientific_title", "Condition", "Inclusion_Criteria"]

# Gao et al. listed 38 entries and repeated "ependymoma"; this is the
# 37-term unique set used for the reproducible literature-core flag.
CORE_PARTIAL_TERMS = [
    "cancer",
    "neoplasm",
    "neoplasia",
    "tumor",
    "oncology",
    "leukemia",
    "lymphoma",
    "myeloma",
    "carcinoma",
    "sarcoma",
    "melanoma",
    "mesothelioma",
    "glioma",
    "glioblastoma",
    "medulloblastoma",
    "ependymoma",
    "esthesioneuroblastoma",
    "retinoblastoma",
    "neuroblastoma",
    "papillomatosis",
    "paraganglioma",
    "pheochromocytoma",
    "blastoma",
    "metastatic",
    "astrocytoma",
    "craniopharyngioma",
    "cholangiocarcinoma",
    "chordoma",
    "histiocytosis",
    "myelodysplastic",
    "rhabdomyosarcoma",
    "oligodendroglioma",
    "schwannoma",
    "ganglioglioma",
]
CORE_EXACT_PHRASES = [
    "gestational trophoblastic disease",
    "mycosis fungoides",
    "sezary syndrome",
]

# Additional variants and stems omitted by the published American-English list.
# They broaden recall and are reported separately for manual review.
EXPANDED_PARTIAL_TERMS = [
    "tumour",
    "leukaemia",
    "oncologic",
    "neoplastic",
    "malignan",
    "metastasis",
    "metastases",
    "lymphoproliferative",
    "hepatocellular",
]
EXPANDED_ACRONYM_RE = re.compile(
    r"\b(?:AML|CML|CLL|NSCLC|SCLC|DLBCL|GBM|GIST|HCC|RCC)\b"
)

EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
AGE_RE = re.compile(r"^(\d+(?:\.\d+)?)\s*(hours?|days?|weeks?|months?|years?)$", re.IGNORECASE)
MOJIBAKE_MARKERS = ("\ufffd", "â€", "â??", "Ã", "Â")
MISSING_EQUIVALENT_KEYS = {
    "",
    "na",
    "nil",
    "none",
    "notapplicable",
    "notavailable",
    "notprovided",
    "notreported",
    "notspecified",
    "unknown",
}

DATE_FORMATS = [
    "%d %B %Y",
    "%d %b %Y",
    "%d/%m/%Y",
    "%Y-%m-%d",
    "%Y%m%d",
    "%m/%d/%Y %H:%M:%S",
    "%m/%d/%Y",
    "%d-%m-%Y",
]

CRITICAL_FIELDS = [
    "Public_title",
    "Scientific_title",
    "Primary_sponsor",
    "Date_registration",
    "Source_Register",
    "web_address",
    "Recruitment_Status",
    "Date_enrollement",
    "Target_size",
    "Study_type",
    "Study_design",
    "Phase",
    "Countries",
    "Contact_Email",
    "Contact_Tel",
    "Inclusion_Criteria",
    "Exclusion_Criteria",
    "Condition",
    "Intervention",
    "Primary_outcome",
    "Secondary_ID",
    "Ethics_review_status",
    "results_yes_no",
]


def normalized_text(value: str | None) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def is_meaningful(value: str | None) -> bool:
    cleaned = normalized_text(value).casefold()
    key = re.sub(r"[\s._/()-]+", "", cleaned)
    return key not in MISSING_EQUIVALENT_KEYS


def ethics_status_category(value: str | None) -> str:
    if not is_meaningful(value):
        return "<missing_or_placeholder>"
    cleaned = normalized_text(value).casefold()
    if "not approved" in cleaned or "disapproved" in cleaned or "rejected" in cleaned:
        return "not_approved_or_rejected"
    if "approved" in cleaned:
        return "approved"
    if any(term in cleaned for term in ("pending", "await", "submitted", "under review")):
        return "pending_or_under_review"
    return "other_free_text"


def id_shape(identifier: str) -> str:
    return "/".join(f"D{len(part)}" if part.isdigit() else part for part in identifier.split("/"))


def strip_namespace(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def parse_date(value: str | None) -> date | None:
    cleaned = normalized_text(value)
    if not cleaned:
        return None
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(cleaned, fmt).date()
        except ValueError:
            continue
    return None


def parse_age_days(value: str | None) -> float | None:
    cleaned = normalized_text(value)
    match = AGE_RE.fullmatch(cleaned)
    if match is None:
        return None
    number = float(match.group(1))
    unit = match.group(2).casefold()
    factors = {
        "hour": 1 / 24,
        "hours": 1 / 24,
        "day": 1,
        "days": 1,
        "week": 7,
        "weeks": 7,
        "month": 365.25 / 12,
        "months": 365.25 / 12,
        "year": 365.25,
        "years": 365.25,
    }
    return number * factors[unit]


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def percentage(numerator: int, denominator: int) -> float:
    return round(100.0 * numerator / denominator, 3) if denominator else 0.0


def quantiles(values: list[int]) -> dict[str, int | None]:
    if not values:
        return {"min": None, "p25": None, "median": None, "p75": None, "p90": None, "max": None}
    ordered = sorted(values)

    def pick(fraction: float) -> int:
        return ordered[round((len(ordered) - 1) * fraction)]

    return {
        "min": ordered[0],
        "p25": pick(0.25),
        "median": pick(0.50),
        "p75": pick(0.75),
        "p90": pick(0.90),
        "max": ordered[-1],
    }


def classify_oncology(record: dict[str, str]) -> tuple[str | None, list[str], list[str]]:
    normalized = {field: normalized_text(record.get(field)).casefold() for field in SEARCH_FIELDS}
    original = {field: normalized_text(record.get(field)) for field in SEARCH_FIELDS}
    core_matches: set[str] = set()
    expanded_matches: set[str] = set()
    matched_fields: set[str] = set()

    for field, text in normalized.items():
        for term in CORE_PARTIAL_TERMS:
            if term in text:
                core_matches.add(term)
                matched_fields.add(field)
        for phrase in CORE_EXACT_PHRASES:
            if re.search(rf"(?<!\w){re.escape(phrase)}(?!\w)", text):
                core_matches.add(phrase)
                matched_fields.add(field)
        for term in EXPANDED_PARTIAL_TERMS:
            if term in text:
                expanded_matches.add(term)
                matched_fields.add(field)
        for match in EXPANDED_ACRONYM_RE.findall(original[field]):
            expanded_matches.add(match)
            matched_fields.add(field)

    if core_matches:
        classification = "literature_core"
        matches = sorted(core_matches | expanded_matches)
    elif expanded_matches:
        classification = (
            "expanded_acronym_review"
            if all(EXPANDED_ACRONYM_RE.fullmatch(term) for term in expanded_matches)
            else "expanded_lexical_review"
        )
        matches = sorted(expanded_matches)
    else:
        return None, [], []
    return classification, matches, sorted(matched_fields)


def is_private_path(path: Path) -> bool:
    return ".private" in path.resolve().parts


def read_trial(element: ET.Element) -> tuple[dict[str, str], list[str]]:
    record = {field: "" for field in XML_FIELDS}
    unknown: list[str] = []
    for child in element:
        field = strip_namespace(child.tag)
        value = normalized_text("".join(child.itertext()))
        if field in record:
            record[field] = value
        else:
            unknown.append(field)
    return record, unknown


def year_from_registration(record: dict[str, str]) -> int | None:
    parsed = parse_date(record.get("Date_registration3")) or parse_date(record.get("Date_registration"))
    return parsed.year if parsed else None


def eligible_historical_study_type(value: str) -> bool:
    normalized = normalized_text(value).casefold()
    return (
        normalized.startswith("interventional")
        or "bioavailability" in normalized
        or "bioequivalence" in normalized
        or normalized in {"ba/be", "pms", "post marketing surveillance", "post-marketing surveillance"}
    )


def profile_csv(path: Path, expected_width: int = 58) -> dict[str, Any]:
    widths: Counter[int] = Counter()
    logical_rows = 0
    primary_ids: set[str] = set()
    primary_rows = 0
    nonprimary_rows = 0
    malformed_primary_rows = 0
    malformed_by_id_year: Counter[str] = Counter()
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.reader(handle)
        header = next(reader)
        for row in reader:
            logical_rows += 1
            widths[len(row)] += 1
            malformed_width = len(row) != len(header)
            identifier = normalized_text(row[0]) if row else ""
            if identifier.startswith("CTRI/"):
                primary_rows += 1
                primary_ids.add(identifier)
                if malformed_width:
                    malformed_primary_rows += 1
                    id_match = re.fullmatch(r"CTRI/(\d{4})/\d{2}/\d+", identifier)
                    malformed_by_id_year[id_match.group(1) if id_match else "<invalid>"] += 1
            else:
                nonprimary_rows += 1
    malformed = sum(count for width, count in widths.items() if width != len(header))
    return {
        "path": str(path),
        "size_bytes": path.stat().st_size,
        "sha256": sha256_file(path),
        "header_columns": len(header),
        "expected_columns": expected_width,
        "parser_dialect": {
            "delimiter": ",",
            "quotechar": "\"",
            "doublequote": True,
        },
        "logical_rows": logical_rows,
        "row_width_distribution": {str(width): count for width, count in sorted(widths.items())},
        "malformed_width_rows": malformed,
        "malformed_width_pct": percentage(malformed, logical_rows),
        "primary_ctri_rows": primary_rows,
        "unique_primary_ctri_ids": len(primary_ids),
        "duplicate_primary_ctri_rows": primary_rows - len(primary_ids),
        "malformed_primary_ctri_rows": malformed_primary_rows,
        "malformed_primary_ctri_pct": percentage(malformed_primary_rows, primary_rows),
        "malformed_primary_rows_by_id_year": dict(sorted(malformed_by_id_year.items())),
        "nonprimary_rows": nonprimary_rows,
    }


def add_age_thresholds(counter: Counter[str], prefix: str, age_days: int) -> None:
    for days in (90, 180, 365, 730, 1825, 3650):
        if age_days > days:
            counter[f"{prefix}_over_{days}_days"] += 1


def analyze_xml(
    xml_path: Path,
    output_csv: Path,
    as_of: date,
    homepage_total: int,
    portal_record_count: int,
    portal_trial_count: int,
    expected_primary_count: int,
) -> dict[str, Any]:
    trial_count = 0
    ctri_count = 0
    non_ctri_count = 0
    ids: set[str] = set()
    duplicate_ids = 0
    invalid_ids = 0
    unknown_tags: Counter[str] = Counter()
    all_nonblank: Counter[str] = Counter()
    candidate_nonblank: Counter[str] = Counter()
    all_meaningful: Counter[str] = Counter()
    candidate_meaningful: Counter[str] = Counter()
    classifications: Counter[str] = Counter()
    matched_terms: Counter[str] = Counter()
    matched_fields: Counter[str] = Counter()
    statuses: Counter[str] = Counter()
    candidate_statuses: Counter[str] = Counter()
    study_types: Counter[str] = Counter()
    phases: Counter[str] = Counter()
    source_registers: Counter[str] = Counter()
    prospective_values: Counter[str] = Counter()
    ethics_statuses: Counter[str] = Counter()
    result_flag_values: Counter[str] = Counter()
    primary_id_shapes: Counter[str] = Counter()
    registration_years: Counter[int] = Counter()
    candidate_years: Counter[int] = Counter()
    result_presence = 0
    linked_record_presence = 0
    contact_email_presence = 0
    contact_tel_presence = 0
    invalid_web_urls = 0
    invalid_registration_dates = 0
    invalid_refresh_dates = 0
    invalid_enrolment_dates = 0
    future_registration_dates = 0
    future_refresh_dates = 0
    negative_target_sizes = 0
    nonnumeric_target_sizes = 0
    prospective_timing_conflicts = 0
    zero_target_sizes = 0
    questionable_contact_emails = 0
    unparseable_min_ages = 0
    unparseable_max_ages = 0
    reversed_age_ranges = 0
    id_registration_date_mismatches = 0
    refresh_before_registration = 0
    unexpected_record_url_domains = 0
    missing_both_titles = 0
    identical_public_scientific_titles = 0
    mojibake_records = 0
    refresh_ages: list[int] = []
    candidate_refresh_ages: list[int] = []
    registration_ages: list[int] = []
    candidate_registration_ages: list[int] = []
    staleness: Counter[str] = Counter()
    newest_registration: tuple[date, str] | None = None
    oldest_registration: tuple[date, str] | None = None
    newest_refresh: tuple[date, str] | None = None
    oldest_refresh: tuple[date, str] | None = None
    candidate_count = 0
    literature_core_count = 0
    historical_core_count = 0
    historical_union_count = 0
    export_dates: Counter[str] = Counter()
    public_titles: Counter[str] = Counter()
    scientific_titles: Counter[str] = Counter()

    output_csv.parent.mkdir(parents=True, exist_ok=True)
    with output_csv.open("w", encoding="utf-8", newline="") as output_handle:
        output_fields = ["oncology_class", "matched_terms", "matched_fields", *XML_FIELDS]
        writer = csv.DictWriter(output_handle, fieldnames=output_fields, lineterminator="\n")
        writer.writeheader()

        try:
            iterator = ET.iterparse(xml_path, events=("end",))
            for _event, element in iterator:
                if strip_namespace(element.tag) != "Trial":
                    continue
                trial_count += 1
                record, extras = read_trial(element)
                unknown_tags.update(extras)
                element.clear()

                trial_id = record["TrialID"]
                if not trial_id.startswith("CTRI/"):
                    non_ctri_count += 1
                    continue
                ctri_count += 1
                if trial_id in ids:
                    duplicate_ids += 1
                ids.add(trial_id)
                primary_id_shapes[id_shape(trial_id)] += 1
                if not re.fullmatch(r"CTRI/\d{4}/(?:\d{2}|\d{3})/\d+", trial_id):
                    invalid_ids += 1

                for field, value in record.items():
                    if value:
                        all_nonblank[field] += 1
                    if is_meaningful(value):
                        all_meaningful[field] += 1
                export_dates[record["Export_date"] or "<blank>"] += 1
                status = record["Recruitment_Status"] or "<blank>"
                statuses[status] += 1
                study_types[record["Study_type"] or "<blank>"] += 1
                phases[record["Phase"] or "<blank>"] += 1
                source_registers[record["Source_Register"] or "<blank>"] += 1
                prospective_values[record["Prospective_registration"] or "<blank>"] += 1
                ethics_statuses[ethics_status_category(record["Ethics_review_status"])] += 1
                result_flag_values[record["results_yes_no"] or "<blank>"] += 1
                result_presence += int(any(record[field] for field in (
                    "results_date_posted", "results_date_completed", "results_date_first_publication"
                )))
                linked_record_presence += int(bool(record["other_records"] or record["Secondary_ID"]))
                contact_email_presence += int(bool(record["Contact_Email"]))
                contact_tel_presence += int(bool(record["Contact_Tel"]))

                public_title = record["Public_title"].casefold()
                scientific_title = record["Scientific_title"].casefold()
                if public_title:
                    public_titles[public_title] += 1
                if scientific_title:
                    scientific_titles[scientific_title] += 1
                if not public_title and not scientific_title:
                    missing_both_titles += 1
                if public_title and public_title == scientific_title:
                    identical_public_scientific_titles += 1
                if any(marker in value for value in record.values() for marker in MOJIBAKE_MARKERS):
                    mojibake_records += 1
                if record["Contact_Email"] and EMAIL_RE.search(record["Contact_Email"]) is None:
                    questionable_contact_emails += 1

                min_age = parse_age_days(record["Inclusion_agemin"])
                max_age = parse_age_days(record["Inclusion_agemax"])
                if record["Inclusion_agemin"] and min_age is None:
                    unparseable_min_ages += 1
                if record["Inclusion_agemax"] and max_age is None:
                    unparseable_max_ages += 1
                if min_age is not None and max_age is not None and min_age > max_age:
                    reversed_age_ranges += 1

                web = record["web_address"]
                if web:
                    parsed_web = urlparse(web)
                    if parsed_web.scheme not in {"http", "https"} or not parsed_web.netloc:
                        invalid_web_urls += 1
                    if parsed_web.hostname not in {"ctri.nic.in", "www.ctri.nic.in"}:
                        unexpected_record_url_domains += 1

                registration = parse_date(record["Date_registration3"]) or parse_date(record["Date_registration"])
                if (record["Date_registration3"] or record["Date_registration"]) and registration is None:
                    invalid_registration_dates += 1
                if registration:
                    registration_years[registration.year] += 1
                    age = (as_of - registration).days
                    registration_ages.append(age)
                    if registration > as_of:
                        future_registration_dates += 1
                    if newest_registration is None or registration > newest_registration[0]:
                        newest_registration = (registration, trial_id)
                    if oldest_registration is None or registration < oldest_registration[0]:
                        oldest_registration = (registration, trial_id)
                    id_match = re.fullmatch(r"CTRI/(\d{4})/(\d{2})/\d+", trial_id)
                    if id_match and (registration.year != int(id_match.group(1)) or registration.month != int(id_match.group(2))):
                        id_registration_date_mismatches += 1

                refreshed = parse_date(record["Last_Refreshed_on"])
                if record["Last_Refreshed_on"] and refreshed is None:
                    invalid_refresh_dates += 1
                if refreshed:
                    age = (as_of - refreshed).days
                    refresh_ages.append(age)
                    add_age_thresholds(staleness, "all_refresh", age)
                    if refreshed > as_of:
                        future_refresh_dates += 1
                    if newest_refresh is None or refreshed > newest_refresh[0]:
                        newest_refresh = (refreshed, trial_id)
                    if oldest_refresh is None or refreshed < oldest_refresh[0]:
                        oldest_refresh = (refreshed, trial_id)
                    if registration and refreshed < registration:
                        refresh_before_registration += 1

                enrolment = parse_date(record["Date_enrollement"])
                if record["Date_enrollement"] and enrolment is None:
                    invalid_enrolment_dates += 1
                if registration and enrolment and record["Prospective_registration"].casefold() == "yes":
                    if enrolment < registration:
                        prospective_timing_conflicts += 1

                target_size = record["Target_size"]
                if target_size:
                    if re.fullmatch(r"-?\d+", target_size):
                        parsed_target_size = int(target_size)
                        if parsed_target_size < 0:
                            negative_target_sizes += 1
                        elif parsed_target_size == 0:
                            zero_target_sizes += 1
                    else:
                        nonnumeric_target_sizes += 1

                classification, terms, fields = classify_oncology(record)
                if classification is None:
                    continue
                candidate_count += 1
                classifications[classification] += 1
                matched_terms.update(terms)
                matched_fields.update(fields)
                if classification == "literature_core":
                    literature_core_count += 1
                for field, value in record.items():
                    if value:
                        candidate_nonblank[field] += 1
                    if is_meaningful(value):
                        candidate_meaningful[field] += 1
                candidate_statuses[status] += 1
                if registration:
                    candidate_years[registration.year] += 1
                    candidate_registration_ages.append((as_of - registration).days)
                if refreshed:
                    age = (as_of - refreshed).days
                    candidate_refresh_ages.append(age)
                    add_age_thresholds(staleness, "candidate_refresh", age)
                    if status.casefold() == "recruiting":
                        add_age_thresholds(staleness, "candidate_recruiting_refresh", age)
                if registration and status.casefold() == "recruiting":
                    add_age_thresholds(staleness, "candidate_recruiting_registration", (as_of - registration).days)
                year = year_from_registration(record)
                if year is not None and 2007 <= year <= 2021 and eligible_historical_study_type(record["Study_type"]):
                    historical_union_count += 1
                    if classification == "literature_core":
                        historical_core_count += 1

                writer.writerow({
                    "oncology_class": classification,
                    "matched_terms": "|".join(terms),
                    "matched_fields": "|".join(fields),
                    **record,
                })
        except ET.ParseError as exc:
            raise ValueError(f"XML is incomplete or malformed: {exc}") from exc

    if portal_trial_count and trial_count != portal_trial_count:
        portal_count_check = "mismatch"
    else:
        portal_count_check = "match"

    critical_all = {
        field: {
            "nonblank": all_nonblank[field],
            "meaningful": all_meaningful[field],
            "missing_or_placeholder": ctri_count - all_meaningful[field],
            "meaningful_pct": percentage(all_meaningful[field], ctri_count),
        }
        for field in CRITICAL_FIELDS
    }
    critical_candidates = {
        field: {
            "nonblank": candidate_nonblank[field],
            "meaningful": candidate_meaningful[field],
            "missing_or_placeholder": candidate_count - candidate_meaningful[field],
            "meaningful_pct": percentage(candidate_meaningful[field], candidate_count),
        }
        for field in CRITICAL_FIELDS
    }

    def dated(value: tuple[date, str] | None) -> dict[str, str] | None:
        return {"date": value[0].isoformat(), "trial_id": value[1]} if value else None

    homepage_gap = homepage_total - ctri_count if homepage_total else None
    candidate_recruiting_count = candidate_statuses["Recruiting"]
    staleness_rates: dict[str, float] = {}
    for metric, count in staleness.items():
        if metric.startswith("all_"):
            denominator = ctri_count
        elif metric.startswith("candidate_recruiting_"):
            denominator = candidate_recruiting_count
        else:
            denominator = candidate_count
        staleness_rates[metric] = percentage(count, denominator)
    return {
        "source": {
            "xml_path": str(xml_path),
            "xml_size_bytes": xml_path.stat().st_size,
            "xml_sha256": sha256_file(xml_path),
            "xml_field_count": len(XML_FIELDS),
            "portal_query": "CTRI",
            "portal_reported_record_count": portal_record_count,
            "portal_reported_bridged_trial_count": portal_trial_count,
            "export_dates": dict(export_dates),
            "as_of": as_of.isoformat(),
            "ctri_homepage_total": homepage_total,
        },
        "coverage": {
            "xml_trial_elements": trial_count,
            "portal_trial_count_check": portal_count_check,
            "primary_ctri_records": ctri_count,
            "expected_primary_ctri_records": expected_primary_count,
            "primary_ctri_count_check": "match" if ctri_count == expected_primary_count else "mismatch",
            "non_ctri_query_hits": non_ctri_count,
            "unique_primary_ctri_ids": len(ids),
            "duplicate_primary_ctri_rows": duplicate_ids,
            "mirror_gap_vs_ctri_homepage": homepage_gap,
            "mirror_count_gap_pct_of_ctri_homepage": (
                percentage(homepage_gap, homepage_total) if homepage_total and homepage_gap is not None else None
            ),
            "newest_registration_lag_days_at_as_of": (
                (as_of - newest_registration[0]).days if newest_registration else None
            ),
            "mirror_coverage_vs_ctri_homepage_pct": (
                percentage(ctri_count, homepage_total) if homepage_total else None
            ),
            "newest_registration": dated(newest_registration),
            "oldest_registration": dated(oldest_registration),
            "newest_refresh": dated(newest_refresh),
            "oldest_refresh": dated(oldest_refresh),
        },
        "oncology_classification": {
            "candidate_records": candidate_count,
            "candidate_pct_of_primary_ctri": percentage(candidate_count, ctri_count),
            "literature_core_records": literature_core_count,
            "method_source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11096683/",
            "published_term_entries": 38,
            "unique_literature_core_terms": len(CORE_PARTIAL_TERMS) + len(CORE_EXACT_PHRASES),
            "expanded_partial_terms": EXPANDED_PARTIAL_TERMS,
            "expanded_acronym_pattern": EXPANDED_ACRONYM_RE.pattern,
            "classification_counts": dict(classifications),
            "matched_term_counts": dict(matched_terms.most_common()),
            "matched_field_counts": dict(matched_fields),
            "historical_2007_2021_core_interventional_babe_pms": historical_core_count,
            "historical_2007_2021_union_interventional_babe_pms": historical_union_count,
            "historical_core_minus_published_benchmark": historical_core_count - 1988,
            "historical_core_difference_pct": round(100 * (historical_core_count - 1988) / 1988, 3),
            "historical_union_minus_published_benchmark": historical_union_count - 1988,
            "published_historical_benchmark": 1988,
            "published_benchmark_method_note": (
                "The publication manually confirmed candidates and used direct CTRI fields; "
                "the automated WHO-mirror result is a sanity check, not a replication."
            ),
        },
        "completeness": {
            "all_primary_ctri_critical_fields": critical_all,
            "oncology_candidates_critical_fields": critical_candidates,
            "all_xml_field_presence": {
                field: {
                    "nonblank": all_nonblank[field],
                    "meaningful": all_meaningful[field],
                    "meaningful_pct": percentage(all_meaningful[field], ctri_count),
                }
                for field in XML_FIELDS
            },
            "candidate_xml_field_presence": {
                field: {
                    "nonblank": candidate_nonblank[field],
                    "meaningful": candidate_meaningful[field],
                    "meaningful_pct": percentage(candidate_meaningful[field], candidate_count),
                }
                for field in XML_FIELDS
            },
            "contact_email_presence": contact_email_presence,
            "contact_email_presence_pct": percentage(contact_email_presence, ctri_count),
            "contact_tel_presence": contact_tel_presence,
            "contact_tel_presence_pct": percentage(contact_tel_presence, ctri_count),
            "linked_record_presence": linked_record_presence,
            "linked_record_presence_pct": percentage(linked_record_presence, ctri_count),
            "result_date_presence": result_presence,
            "result_date_presence_pct": percentage(result_presence, ctri_count),
        },
        "validity_and_consistency": {
            "unexpected_primary_id_format": invalid_ids,
            "primary_id_shape_counts": dict(primary_id_shapes),
            "unknown_xml_tags": dict(unknown_tags),
            "invalid_web_urls": invalid_web_urls,
            "invalid_registration_dates": invalid_registration_dates,
            "invalid_refresh_dates": invalid_refresh_dates,
            "invalid_enrolment_dates": invalid_enrolment_dates,
            "future_registration_dates": future_registration_dates,
            "future_refresh_dates": future_refresh_dates,
            "negative_target_sizes": negative_target_sizes,
            "nonnumeric_target_sizes": nonnumeric_target_sizes,
            "prospective_registration_timing_conflicts": prospective_timing_conflicts,
            "zero_target_sizes": zero_target_sizes,
            "questionable_contact_emails": questionable_contact_emails,
            "unparseable_min_ages": unparseable_min_ages,
            "unparseable_max_ages": unparseable_max_ages,
            "reversed_age_ranges": reversed_age_ranges,
            "id_registration_date_mismatches": id_registration_date_mismatches,
            "refresh_before_registration": refresh_before_registration,
            "unexpected_record_url_domains": unexpected_record_url_domains,
            "missing_both_titles": missing_both_titles,
            "identical_public_scientific_titles": identical_public_scientific_titles,
            "duplicate_public_title_groups": sum(count > 1 for count in public_titles.values()),
            "duplicate_public_title_extra_rows": sum(count - 1 for count in public_titles.values() if count > 1),
            "duplicate_scientific_title_groups": sum(count > 1 for count in scientific_titles.values()),
            "duplicate_scientific_title_extra_rows": sum(
                count - 1 for count in scientific_titles.values() if count > 1
            ),
            "records_with_mojibake_markers": mojibake_records,
            "source_register_counts": dict(source_registers),
            "prospective_registration_values": dict(prospective_values),
            "ethics_review_status_counts": dict(ethics_statuses),
            "results_yes_no_counts": dict(result_flag_values),
            "recruitment_status_counts": dict(statuses),
            "candidate_recruitment_status_counts": dict(candidate_statuses),
            "study_type_counts": dict(study_types),
            "phase_counts": dict(phases),
        },
        "freshness_and_liveness": {
            "all_refresh_age_days": quantiles(refresh_ages),
            "candidate_refresh_age_days": quantiles(candidate_refresh_ages),
            "all_registration_age_days": quantiles(registration_ages),
            "candidate_registration_age_days": quantiles(candidate_registration_ages),
            "staleness_threshold_counts": dict(staleness),
            "staleness_denominators": {
                "all_primary_ctri": ctri_count,
                "oncology_candidates": candidate_count,
                "recruiting_oncology_candidates": candidate_recruiting_count,
            },
            "staleness_threshold_pct": staleness_rates,
            "site_recruitment_liveness": "not measurable from registry records",
            "contact_channel_liveness": "not tested; no calls or messages were made",
            "record_url_network_liveness": "not mass-tested to avoid burdening CTRI and because HTTP reachability does not prove recruitment",
        },
        "distributions": {
            "registration_years": {str(year): count for year, count in sorted(registration_years.items())},
            "candidate_registration_years": {str(year): count for year, count in sorted(candidate_years.items())},
        },
        "outputs": {
            "oncology_candidates_csv": str(output_csv),
            "oncology_candidates_size_bytes": output_csv.stat().st_size,
            "oncology_candidates_sha256": sha256_file(output_csv),
            "contains_public_professional_contact_fields": True,
            "publication_allowed": False,
        },
        "limitations": [
            "WHO ICTRP is a lagging, reduced-field mirror and is not the full current CTRI database.",
            "The CTRI search endpoints require CAPTCHA/CSRF and expose no documented bulk API or open reuse licence.",
            "Cancer classification is automated; the source publication required manual confirmation and states its term list may miss trials.",
            "The expanded lexical and acronym candidates prioritize recall and require human review before substantive use.",
            "Registry-declared recruitment status and contact presence do not establish current site-level liveness or capacity.",
            "WHO XML has 57 fields but omits CSV-only bridging metadata; neither export contains full CTRI audit or site-history fields.",
            "WHO terms prohibit marketing, promotional, and commercial use and remain in force while the data are retained.",
        ],
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--xml", type=Path, required=True, help="Completed WHO ICTRP XML export")
    parser.add_argument("--csv", type=Path, help="Optional WHO ICTRP CSV export to profile")
    parser.add_argument("--output-dir", type=Path, required=True, help="Ignored .private output directory")
    parser.add_argument("--as-of", type=date.fromisoformat, required=True, help="Measurement date (YYYY-MM-DD)")
    parser.add_argument("--ctri-homepage-total", type=int, required=True)
    parser.add_argument("--portal-record-count", type=int, required=True)
    parser.add_argument("--portal-trial-count", type=int, required=True)
    parser.add_argument("--expected-primary-count", type=int, required=True)
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    if not args.xml.is_file():
        print(f"ERROR: XML export not found: {args.xml}", file=sys.stderr)
        return 2
    if args.xml.suffix == ".crdownload":
        print("ERROR: XML export is still downloading", file=sys.stderr)
        return 2
    if args.csv and not args.csv.is_file():
        print(f"ERROR: CSV export not found: {args.csv}", file=sys.stderr)
        return 2
    if not is_private_path(args.output_dir):
        print("ERROR: record-level outputs must remain under .private", file=sys.stderr)
        return 2

    args.output_dir.mkdir(parents=True, exist_ok=True)
    candidate_csv = args.output_dir / "ctri_oncology_candidates_full.csv"
    report_path = args.output_dir / "ctri_quality_report.json"
    manifest_path = args.output_dir / "manifest.json"

    try:
        report = analyze_xml(
            args.xml,
            candidate_csv,
            args.as_of,
            args.ctri_homepage_total,
            args.portal_record_count,
            args.portal_trial_count,
            args.expected_primary_count,
        )
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    if args.csv:
        report["csv_structure"] = profile_csv(args.csv)
    report_path.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    manifest = {
        "source": "WHO ICTRP Search Portal",
        "source_query": "CTRI",
        "retrieved_date": args.as_of.isoformat(),
        "terms_url": "https://www.who.int/tools/clinical-trials-registry-platform/network/who-data-set/downloading-records-from-the-ictrp-database",
        "permitted_use": "local non-commercial research and data-quality analysis",
        "raw_xml": {"path": str(args.xml), "sha256": report["source"]["xml_sha256"]},
        "raw_csv": (
            {"path": str(args.csv), "sha256": report["csv_structure"]["sha256"]}
            if args.csv else None
        ),
        "derived_candidates": {
            "path": str(candidate_csv),
            "sha256": report["outputs"]["oncology_candidates_sha256"],
        },
        "quality_report": {"path": str(report_path), "sha256": sha256_file(report_path)},
        "analysis_code": {"path": str(Path(__file__)), "sha256": sha256_file(Path(__file__))},
        "retention_condition": "WHO ICTRP terms remain in force while downloaded data are retained.",
        "commercial_use": "prohibited",
        "publication": "not authorized",
    }
    manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")

    print(
        "PASS: "
        f"{report['coverage']['primary_ctri_records']} primary CTRI records; "
        f"{report['oncology_classification']['candidate_records']} oncology candidates; "
        f"report {report_path}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
