#!/usr/bin/env python3
"""Merge WHO ICTRP XML exports into one valid, de-duplicated private file.

WHO's all-results XML response can terminate after complete Trial elements but
before the root closing tag. This tool accepts that one recoverable defect,
combines smaller query partitions, and rejects every other XML parse failure.
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
from pathlib import Path
from typing import Iterable

ROOT_OPEN = b"<Trials_downloaded_from_ICTRP>\n"
ROOT_CLOSE = b"</Trials_downloaded_from_ICTRP>\n"
TRIAL_CLOSE = b"</Trial>"

CSV_EXCLUDED_FIELDS = {"Bridging flag truefalse", "Bridged type"}
CSV_TAG_OVERRIDES = {
    "Source Name": "Source_Support",
    "Secondary Sponsor": "Secondary_Sponsor",
    "Ethics Status": "Ethics_review_status",
    "Ethics Approval Date": "Ethics_review_approval_date",
    "Ethics Contact Name": "Ethics_review_contact_name",
    "Ethics Contact Address": "Ethics_review_contact_address",
    "Ethics Contact Phone": "Ethics_review_contact_phone",
    "Ethics Contact Email": "Ethics_review_contact_email",
}


def strip_namespace(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def normalized_text(value: str | None) -> str:
    return " ".join((value or "").split())


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def is_private_path(path: Path) -> bool:
    return ".private" in path.resolve().parts


def has_recoverable_missing_root(path: Path, error: ET.ParseError) -> bool:
    if "no element found" not in str(error):
        return False
    with path.open("rb") as handle:
        handle.seek(max(0, path.stat().st_size - 4096))
        return handle.read().rstrip().endswith(TRIAL_CLOSE)


def trial_id(element: ET.Element) -> str:
    for child in element:
        if strip_namespace(child.tag) == "TrialID":
            return normalized_text("".join(child.itertext()))
    return ""


def csv_xml_tag(field: str) -> str:
    return CSV_TAG_OVERRIDES.get(field, field.replace(" ", "_"))


def identifier_prefix(identifier: str) -> str:
    match = re.match(r"[A-Za-z]+", identifier)
    return match.group(0).upper() if match else "<blank_or_nonalpha>"


def merge(
    inputs: list[Path],
    output: Path,
    expected_unique: int | None,
    csv_fallback: Path | None,
) -> dict[str, object]:
    seen: set[str] = set()
    duplicate_ids = 0
    missing_ids = 0
    input_elements = 0
    written = 0
    primary_ctri = 0
    prefixes: Counter[str] = Counter()
    parse_status: dict[str, str] = {}
    input_trial_counts: Counter[str] = Counter()
    csv_fallback_rows = 0
    csv_fallback_malformed = 0

    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open("wb") as destination:
        destination.write(b"<?xml version='1.0' encoding='UTF-8' ?>\n")
        destination.write(ROOT_OPEN)
        for source_index, source in enumerate(inputs):
            try:
                iterator = ET.iterparse(source, events=("end",))
                for _event, element in iterator:
                    if strip_namespace(element.tag) != "Trial":
                        continue
                    input_elements += 1
                    input_trial_counts[str(source)] += 1
                    identifier = trial_id(element)
                    if identifier:
                        key = identifier
                    else:
                        missing_ids += 1
                        key = f"__missing__:{source_index}:{input_elements}"
                    if key in seen:
                        duplicate_ids += 1
                        element.clear()
                        continue
                    seen.add(key)
                    written += 1
                    if identifier.startswith("CTRI/"):
                        primary_ctri += 1
                    prefixes[identifier_prefix(identifier)] += 1
                    destination.write(ET.tostring(element, encoding="utf-8"))
                    destination.write(b"\n")
                    element.clear()
                parse_status[str(source)] = "well_formed"
            except ET.ParseError as exc:
                if not has_recoverable_missing_root(source, exc):
                    raise ValueError(f"unrecoverable XML error in {source}: {exc}") from exc
                parse_status[str(source)] = "missing_root_close_after_complete_trial"
        if csv_fallback:
            with csv_fallback.open("r", encoding="utf-8-sig", newline="") as handle:
                reader = csv.DictReader(handle)
                if reader.fieldnames is None:
                    raise ValueError(f"CSV fallback has no header: {csv_fallback}")
                for row_number, row in enumerate(reader, 2):
                    identifier = normalized_text(row.get("TrialID"))
                    if identifier in seen:
                        continue
                    if None in row or any(value is None for value in row.values()):
                        csv_fallback_malformed += 1
                        continue
                    element = ET.Element("Trial")
                    ET.SubElement(element, "Internal_Number")
                    for field in reader.fieldnames:
                        if field in CSV_EXCLUDED_FIELDS:
                            continue
                        child = ET.SubElement(element, csv_xml_tag(field))
                        value = row.get(field, "").strip()
                        if value:
                            child.text = value
                    seen.add(identifier or f"__csv_missing__:{row_number}")
                    written += 1
                    csv_fallback_rows += 1
                    if identifier.startswith("CTRI/"):
                        primary_ctri += 1
                    if not identifier:
                        missing_ids += 1
                    prefixes[identifier_prefix(identifier)] += 1
                    destination.write(ET.tostring(element, encoding="utf-8"))
                    destination.write(b"\n")
            if csv_fallback_malformed:
                raise ValueError(
                    f"{csv_fallback_malformed} missing XML record(s) had malformed CSV fallback rows"
                )
        destination.write(ROOT_CLOSE)

    if expected_unique is not None and written != expected_unique:
        raise ValueError(f"merged {written} unique trials; expected {expected_unique}")
    return {
        "analysis_code": {"path": str(Path(__file__)), "sha256": sha256_file(Path(__file__))},
        "inputs": [
            {"path": str(path), "size_bytes": path.stat().st_size, "sha256": sha256_file(path)}
            for path in inputs
        ],
        "csv_fallback": (
            {
                "path": str(csv_fallback),
                "size_bytes": csv_fallback.stat().st_size,
                "sha256": sha256_file(csv_fallback),
                "rows_written": csv_fallback_rows,
                "malformed_missing_rows": csv_fallback_malformed,
            }
            if csv_fallback
            else None
        ),
        "parse_status": parse_status,
        "input_trial_counts": dict(input_trial_counts),
        "input_trial_elements": input_elements,
        "duplicate_trial_ids_skipped": duplicate_ids,
        "missing_trial_ids": missing_ids,
        "unique_trials_written": written,
        "primary_ctri_trials_written": primary_ctri,
        "trial_id_prefix_counts": dict(prefixes.most_common()),
        "expected_unique_trials": expected_unique,
        "output": {
            "path": str(output),
            "size_bytes": output.stat().st_size,
            "sha256": sha256_file(output),
        },
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, action="append", required=True, dest="inputs")
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--expected-unique", type=int)
    parser.add_argument("--csv-fallback", type=Path)
    return parser


def main(argv: Iterable[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    missing = [path for path in args.inputs if not path.is_file()]
    if missing:
        print(f"ERROR: missing input(s): {', '.join(map(str, missing))}", file=sys.stderr)
        return 2
    if any(path.suffix == ".crdownload" for path in args.inputs):
        print("ERROR: an input is still downloading", file=sys.stderr)
        return 2
    if args.csv_fallback and not args.csv_fallback.is_file():
        print(f"ERROR: CSV fallback not found: {args.csv_fallback}", file=sys.stderr)
        return 2
    if not is_private_path(args.output) or not is_private_path(args.report):
        print("ERROR: merged record data and report must remain under .private", file=sys.stderr)
        return 2

    try:
        report = merge(args.inputs, args.output, args.expected_unique, args.csv_fallback)
    except ValueError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(
        "PASS: "
        f"{report['unique_trials_written']} unique trials; "
        f"{report['duplicate_trial_ids_skipped']} duplicates skipped; "
        f"{report['primary_ctri_trials_written']} primary CTRI trials"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
