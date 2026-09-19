# Work report — P5

## Problem

- **FACT:** The requested target was the full, current cancer-trial corpus behind CTRI's public search surface, followed by quality, liveness, staleness, completeness, validity, uniqueness, and consistency checks.
- **CONTRADICTION:** A full direct CTRI extraction was not available through a documented bulk interface. Current keyword and structured searches require a per-session CSRF token and six-character CAPTCHA; no official public API, bulk file, open-data licence, developer terms, or commercial-reuse permission was found.
- **OPEN:** CTRI's homepage displayed 117,469 registered trials on 2026-09-13, but the only supported bulk research route found—the WHO ICTRP mirror—did not contain all of them and did not expose CTRI's complete site/audit history.

## Decision

- **FACT:** No CAPTCHA was solved automatically, no legacy unlinked endpoint was posted to, and no access control was bypassed.
- **FACT:** After explicit interactive approval of WHO's terms, the WHO ICTRP `CTRI` result was downloaded for local, non-commercial research. Raw and derived record-level files remain under ignored `.private/ctri-ictrp/2026-09-13/`; they are not authorised for publication or commercial use.
- **FACT:** The direct WHO CSV was retained as the row-count authority. Because large WHO XML responses terminated after complete `<Trial>` elements but before a closing root, two approved year partitions were combined, de-duplicated, and supplemented with 409 structurally valid CSV rows absent from the XML responses.
- **INFERENCE:** The result is the complete 114,052-trial WHO search result for `CTRI` at the extraction time, including 112,858 primary CTRI IDs. It is the strongest supported bulk approximation found, not the full or current CTRI database.
- **INFERENCE:** Cancer records are an 8,133-row candidate set, not a manually adjudicated ground truth. The output preserves a literature-core flag and separate recall-expansion review flags.

## Evidence

### Access and source coverage

- **OBSERVED:** WHO reported 115,437 registry records bridged into 114,052 trials for query `CTRI`; the raw CSV contains exactly 114,052 logical rows.
- **OBSERVED:** The recovered XML contains exactly 114,052 unique trial IDs: 112,858 primary CTRI IDs and 1,194 non-CTRI main IDs returned because a linked field matched `CTRI`. There are zero duplicate primary CTRI IDs after reconstruction.
- **OBSERVED:** Against CTRI's 117,469 homepage total, the mirror is short by 4,611 primary records: 96.075% count coverage and a 3.925% gap. Counts are not perfectly like-for-like because WHO bridges records, but the primary-ID filter makes the missing-current-record conclusion conservative.
- **OBSERVED:** The newest primary CTRI registration in the mirror is 2026-07-16, 59 days before the 2026-09-13 extraction date. The newest `Last Refreshed on` value is 2026-08-03.
- **OBSERVED:** The initial all-results XML stopped at 59,050 trials. The 2007–2022 partition stopped at 49,070 despite 49,458 trials shown by the UI. Both omitted the root closing tag. The 2023 partition was well formed with 12,895 trials. Merge inputs contained 121,015 trial elements; 7,372 duplicate IDs were skipped and 409 missing unique IDs were recovered from clean 58-column CSV rows.

### Extracted artifacts

| Classification | Path | Size | SHA-256 prefix |
|---|---|---:|---|
| **OBSERVED** raw WHO CSV | `.private/ctri-ictrp/2026-09-13/IctrpResults.csv` | 445,456,366 bytes | `04aca67f1738…` |
| **OBSERVED** recovered valid XML | `.private/ctri-ictrp/2026-09-13/ICTRP-Results-combined.xml` | 807,206,573 bytes | `e3a0bcdc118e…` |
| **OBSERVED** oncology candidates, all 57 XML fields plus flags | `.private/ctri-ictrp/2026-09-13/ctri_oncology_candidates_full.csv` | 28,613,585 bytes | `77ea95298677…` |
| **OBSERVED** aggregate quality results | `.private/ctri-ictrp/2026-09-13/ctri_quality_report.json` | private aggregate artifact | full hash in `manifest.json` |
| **OBSERVED** acquisition/reconstruction provenance | `.private/ctri-ictrp/2026-09-13/merge_report.json`, `manifest.json` | private aggregate artifacts | input/output hashes embedded |

- **FACT:** `research/merge_ictrp_xml.py` performs strict XML reconstruction, accepts only the observed missing-root-after-complete-trial defect, de-duplicates IDs, and uses CSV fallback only for missing rows whose width is structurally valid.
- **FACT:** `research/ctri_ictrp_quality.py` performs streaming extraction and aggregate checks without third-party dependencies. It refuses to write record-level output outside `.private`.

### Oncology identification quality

- **FACT:** The literature-core method searches public title, scientific title, condition, and inclusion criteria using the 38 entries printed by Gao et al.; one entry, `ependymoma`, is duplicated, leaving 37 unique terms. Multi-word terms use boundary-exact matching. Additional spelling/stem variants and high-risk acronyms are flagged separately for review.
- **OBSERVED:** 8,133 primary CTRI records are candidates: 7,831 literature-core; 296 expanded lexical review; 6 acronym-only review. Candidate status is 1,454 `Recruiting`, 6,668 `Not Recruiting`, and 11 blank.
- **CONTRADICTION:** Restricting the literature-core candidates to 2007–2021 interventional/BA-BE/PMS records yields 2,136, which is 148 (7.445%) above the publication's manually confirmed 1,988. The expanded union yields 2,236. This proves automated keyword output must not be presented as fully adjudicated cancer trials; source updates, WHO field differences, and false positives can all contribute.

### Structural, completeness, validity, and consistency checks

- **OBSERVED:** Under standard RFC-style CSV parsing (comma delimiter, double-quoted fields, doubled quote escaping), 2,276 of 114,052 rows (1.996%) do not have the advertised 58 columns. All 2,276 are primary CTRI rows, representing 2.017% of that cohort. The valid XML reconstruction was therefore used for record extraction rather than silently trusting shifted CSV columns.
- **OBSERVED:** The XML schema has 57 fields. It lacks CSV-only bridging fields and still lacks direct CTRI site-level history and audit details.
- **OBSERVED:** Meaningful—not merely nonblank—completeness among all 112,858 primary CTRI records is: `Phase` 43.217%; `Secondary_ID` 13.584%; `Condition` 80.462%; `Intervention` 79.049%; `Primary_sponsor` 96.019%; `Contact_Tel` 95.697%; `Recruitment_Status` 99.732%. The oncology candidate values are respectively 37.858%, 20.546%, 94.983%, 84.421%, 94.012%, 94.578%, and 99.865%.
- **OBSERVED:** `results_yes_no` is empty in all 112,858 primary CTRI XML records, although 15,626 records (13.846%) contain at least one result-date field. This is an export-field inconsistency, not evidence that no results exist.
- **OBSERVED:** Other flags: 303 blank recruitment statuses; 64,084 `N/A` phases (56.783%); 104 zero target sizes; 48 syntactically questionable nonblank contact-email fields; four prospective-registration timing conflicts; one ID-date mismatch; 18,349 records (16.258%) containing a common mojibake marker; 963 extra rows sharing a normalized public title across 574 duplicate-title groups.
- **FACT:** All primary IDs fit either the current `CTRI/YYYY/MM/sequence` shape or the observed legacy three-digit middle component. Dates parsed with no invalid registration, refresh, or enrolment values; no future registration/refresh dates, negative target sizes, reversed age ranges, malformed web-URL syntax, or non-CTRI link domains were found.

### Freshness and liveness

- **OBSERVED:** Median `Last Refreshed on` age is 923 days across primary CTRI records and 1,091 days across oncology candidates. Of all primary records, 96.675% are older than 90 days, 77.254% older than one year, and 58.606% older than two years on that field.
- **OBSERVED:** Among 1,454 oncology candidates labelled `Recruiting`, 1,154 (79.367%) have a `Last Refreshed on` age over one year and 1,001 (68.845%) over two years. Also, 731 (50.275%) were registered more than five years ago and 226 (15.543%) more than ten years ago. Age does not prove closure, but it makes a real-time recruiting claim unsafe without site confirmation.
- **OBSERVED:** A deterministic three-link sample of WHO-supplied `http://www.ctri.nic.in/Clinicaltrials/pmaindet2.php?...` record URLs timed out through the reader. An HTTPS retry of one sample redirected to `https://www.ctri.nic.in/Clinicaltrials/login.php?id=` rather than the requested record.
- **OPEN:** Site recruitment liveness and capacity cannot be measured from registry declarations. Contact-channel liveness was not tested because no calls or messages were authorised. Mass URL probing was not performed because it would burden CTRI and HTTP reachability would still not prove recruitment.

### Reproduction and observed commands

- **OBSERVED:** `python3 research/merge_ictrp_xml.py --input <2007-2022.xml> --input <2023.xml> --input <truncated-all.xml> --csv-fallback <IctrpResults.csv> --output <combined.xml> --report <merge_report.json> --expected-unique 114052` → `PASS: 114052 unique trials; 7372 duplicates skipped; 112858 primary CTRI trials`.
- **OBSERVED:** `python3 research/ctri_ictrp_quality.py --xml <combined.xml> --csv <IctrpResults.csv> --output-dir <private-dir> --as-of 2026-09-13 --ctri-homepage-total 117469 --portal-record-count 115437 --portal-trial-count 114052 --expected-primary-count 112858` → `PASS: 112858 primary CTRI records; 8133 oncology candidates`.
- **OBSERVED:** `wc -l .private/ctri-ictrp/2026-09-13/ctri_oncology_candidates_full.csv` → 8,134 lines: one header plus 8,133 candidates.

## Risks and gaps

- **OPEN:** The requested full/current direct CTRI corpus was not obtained. The WHO mirror is missing at least 4,611 primary records relative to the homepage count and lags 59 days at its newest registration.
- **OPEN:** Automated oncology recall and precision are not ground-truthed. The 302 expanded-review rows and the literature-core set require human adjudication before prevalence, availability, or product claims.
- **OPEN:** Registry status is not site status. No evidence here establishes that a listed site is accepting referrals, has capacity, or has a live contact.
- **FACT:** WHO terms require attribution/currentness/processing-date handling, prohibit proprietary claims and marketing/promotional/commercial use, and remain in effect while the data are retained. These files cannot be assumed usable for a hackathon demo or production product without separate written permission.
- **FACT:** The record-level outputs contain public professional and ethics-contact fields. They remain ignored/private and must not be committed or published.
- **CONTRADICTION:** A registry wrapper cannot honestly promise complete, live CTRI coverage from this source. The observed mirror lag, stale refresh fields, broken record links, malformed CSV rows, and truncated XML responses require visible provenance and uncertainty.

## Next

- **FACT:** Use `.private/ctri-ictrp/2026-09-13/ctri_oncology_candidates_full.csv` only as the dated, non-commercial research candidate set, with `oncology_class` and match evidence preserved.
- **OPEN:** Obtain written CTRI access, reuse, field-definition, refresh, and commercial/demo terms before selecting CTRI as a product data source. Request a supported bulk/API path rather than scraping CAPTCHA-protected forms.
- **OPEN:** For any operational trial finder, manually adjudicate the candidate set, preserve exact registry provenance, separate registry status from time-stamped site verification, and define a human-owned verification cadence.
- **OPEN:** If currentness is required, repeat the count/export comparison under permitted terms and retain the source processing date; do not silently append old and new snapshots.

## Sign-off needed

- **FACT:** No sign-off is needed to retain the files for the explicitly approved local, non-commercial analysis under the accepted WHO terms.
- **FACT:** Owner sign-off plus written source permission is required before publishing record-level data, using it in a hackathon/demo or commercial product, changing the project lane, or claiming full/current/live CTRI coverage.
