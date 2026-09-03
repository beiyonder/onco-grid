#!/usr/bin/env python3
"""Validate Onco Grid's atomic JSONL evidence ledger without dependencies."""

from __future__ import annotations

import json
import re
import sys
from datetime import date
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
SCHEMA_PATH = ROOT / "evidence.schema.json"
LEDGER_PATH = ROOT / "evidence.jsonl"

EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.IGNORECASE)
PHONE_RE = re.compile(r"(?<!\w)(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}(?!\w)")
SENSITIVE_FIELDS = {
    "claim",
    "supporting_extract",
    "method_sample",
    "limitations",
    "frequency_evidence",
    "burden_evidence",
    "current_workaround",
    "existing_solution",
    "contradiction",
    "implication",
    "unknowns",
    "provenance_notes",
}


def fail(errors: list[str], location: str, message: str) -> None:
    errors.append(f"{location}: {message}")


def validate_scalar(value: Any, spec: dict[str, Any], location: str, errors: list[str]) -> None:
    expected = spec.get("type")
    if expected == "string" and not isinstance(value, str):
        fail(errors, location, "must be a string")
        return
    if expected == "array" and not isinstance(value, list):
        fail(errors, location, "must be an array")
        return

    if "enum" in spec and value not in spec["enum"]:
        fail(errors, location, f"must be one of {spec['enum']!r}")
        return

    if isinstance(value, str):
        if len(value) < spec.get("minLength", 0):
            fail(errors, location, "is shorter than minLength")
        if len(value) > spec.get("maxLength", sys.maxsize):
            fail(errors, location, "is longer than maxLength")
        pattern = spec.get("pattern")
        if pattern and re.match(pattern, value) is None:
            fail(errors, location, f"does not match {pattern!r}")

    if isinstance(value, list):
        if len(value) < spec.get("minItems", 0):
            fail(errors, location, "has too few items")
        if spec.get("uniqueItems") and len({json.dumps(item, sort_keys=True) for item in value}) != len(value):
            fail(errors, location, "contains duplicate items")
        item_spec = spec.get("items", {})
        for index, item in enumerate(value):
            validate_scalar(item, item_spec, f"{location}[{index}]", errors)


def validate_record(record: Any, schema: dict[str, Any], line_number: int, errors: list[str]) -> None:
    location = f"line {line_number}"
    if not isinstance(record, dict):
        fail(errors, location, "record must be an object")
        return

    required = set(schema["required"])
    properties = schema["properties"]
    missing = sorted(required - record.keys())
    extra = sorted(record.keys() - properties.keys())
    if missing:
        fail(errors, location, f"missing required fields: {', '.join(missing)}")
    if schema.get("additionalProperties") is False and extra:
        fail(errors, location, f"unexpected fields: {', '.join(extra)}")

    record_id = record.get("id", "unknown")
    for field, value in record.items():
        spec = properties.get(field)
        if spec is not None:
            validate_scalar(value, spec, f"{location} {record_id}.{field}", errors)

    locator = record.get("source_locator")
    if isinstance(locator, str) and locator.startswith("repo:") and "#L" not in locator:
        fail(errors, location, "repository source_locator must include a #L line anchor")

    accessed = record.get("accessed_date")
    if isinstance(accessed, str):
        try:
            if date.fromisoformat(accessed) > date.today():
                fail(errors, location, "accessed_date cannot be in the future")
        except ValueError:
            pass

    for field in SENSITIVE_FIELDS:
        value = record.get(field)
        if not isinstance(value, str):
            continue
        if EMAIL_RE.search(value):
            fail(errors, f"{location} {record_id}.{field}", "possible email address leakage")
        if PHONE_RE.search(value):
            fail(errors, f"{location} {record_id}.{field}", "possible phone number leakage")


def load_records(path: Path, errors: list[str]) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    if not path.exists():
        fail(errors, str(path), "ledger file does not exist")
        return records

    for line_number, raw_line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not raw_line.strip():
            fail(errors, f"line {line_number}", "blank lines are not allowed in JSONL")
            continue
        try:
            record = json.loads(raw_line)
        except json.JSONDecodeError as exc:
            fail(errors, f"line {line_number}", f"invalid JSON: {exc.msg}")
            continue
        records.append(record)
    return records


def main() -> int:
    errors: list[str] = []
    schema = json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))
    records = load_records(LEDGER_PATH, errors)

    for line_number, record in enumerate(records, 1):
        validate_record(record, schema, line_number, errors)

    ids = [record.get("id") for record in records if isinstance(record, dict)]
    duplicate_ids = sorted({record_id for record_id in ids if ids.count(record_id) > 1})
    if duplicate_ids:
        fail(errors, "ledger", f"duplicate IDs: {', '.join(duplicate_ids)}")

    known_ids = set(ids)
    for line_number, record in enumerate(records, 1):
        if not isinstance(record, dict):
            continue
        for contradicted_id in record.get("contradicts_ids", []):
            if contradicted_id not in known_ids:
                fail(errors, f"line {line_number}", f"unknown contradicts_ids reference {contradicted_id}")

    seen_claims: dict[tuple[str, str], str] = {}
    for line_number, record in enumerate(records, 1):
        if not isinstance(record, dict):
            continue
        group = str(record.get("independent_source_group", "")).strip().lower()
        claim = re.sub(r"\s+", " ", str(record.get("claim", "")).strip().lower())
        key = (group, claim)
        if key in seen_claims:
            fail(errors, f"line {line_number}", f"duplicates the same claim in independent source group {seen_claims[key]}")
        else:
            seen_claims[key] = str(record.get("id", "unknown"))

    if errors:
        print(f"FAIL: {len(errors)} ledger validation error(s)")
        for error in errors:
            print(f"- {error}")
        return 1

    retained = sum(record.get("status") == "retained" for record in records)
    print(f"PASS: {len(records)} records valid; {retained} retained; IDs and contradiction references consistent")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
