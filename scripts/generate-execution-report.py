#!/usr/bin/env python3
"""Turn a Mocha JSON result into an evidence-based Excel and Markdown report."""

import argparse
import json
import os
import re
from collections import Counter, defaultdict
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--suite", required=True)
    parser.add_argument("--results", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument("--exit-code-file", type=Path)
    return parser.parse_args()


def load_results(path):
    if not path.exists():
        return None, f"Runner output was not created: {path}"
    try:
        return json.loads(path.read_text(encoding="utf-8")), ""
    except (OSError, json.JSONDecodeError) as error:
        return None, f"Runner output could not be parsed: {error}"


def exit_code(path):
    if not path or not path.exists():
        return None
    try:
        return int(path.read_text(encoding="utf-8").strip())
    except (OSError, ValueError):
        return None


def category(title):
    lowered = title.lower()
    if any(word in lowered for word in ("login", "credential", "password", "email", "auth")):
        return "Authentication"
    if any(word in lowered for word in ("profile", "account")):
        return "Profile"
    if any(word in lowered for word in ("roadmap", "progress")):
        return "Roadmap"
    if any(word in lowered for word in ("job", "internship", "opportun")):
        return "Opportunities"
    if any(word in lowered for word in ("navigate", "screen", "launch", "dashboard")):
        return "Navigation"
    return "Other"


def tests_from_results(results):
    tests = []
    for suite in (results or {}).get("suites", []):
        tests.extend(suite.get("tests", []))
    if tests:
        return tests
    return (results or {}).get("tests", [])


def normalize_tests(results):
    normalized = []
    for item in results.get("passes", []) or []:
        status = "Passed"
        title = item.get("fullTitle") or item.get("title") or "Unnamed test"
        normalized.append({
            "category": category(title),
            "title": title,
            "status": status,
            "duration_ms": item.get("duration") or "",
            "details": "",
        })
    for item in results.get("failures", []) or []:
        status = "Failed"
        title = item.get("fullTitle") or item.get("title") or "Unnamed test"
        error = item.get("err") or {}
        normalized.append(
            {
                "category": category(title),
                "title": title,
                "status": status,
                "duration_ms": item.get("duration") or "",
                "details": error.get("message") or error.get("stack") or "",
            }
        )
    for item in results.get("pending", []) or []:
        status = "Skipped"
        title = item.get("fullTitle") or item.get("title") or "Unnamed test"
        normalized.append({
            "category": category(title),
            "title": title,
            "status": status,
            "duration_ms": item.get("duration") or "",
            "details": "",
        })
    if normalized:
        return normalized
    for item in tests_from_results(results):
        state = item.get("state")
        if state == "passed":
            status = "Passed"
        elif state == "failed" or item.get("err"):
            status = "Failed"
        elif item.get("pending") or state in (None, "pending"):
            status = "Skipped"
        else:
            status = "Blocked"
        title = item.get("fullTitle") or item.get("title") or "Unnamed test"
        error = item.get("err") or {}
        normalized.append({
            "category": category(title),
            "title": title,
            "status": status,
            "duration_ms": item.get("duration") or "",
            "details": error.get("message") or error.get("stack") or "",
        })
    return normalized


def style_sheet(sheet):
    sheet.freeze_panes = "A2"
    sheet.auto_filter.ref = sheet.dimensions
    for cell in sheet[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="17365D")
        cell.alignment = Alignment(wrap_text=True, vertical="top")
    for column in range(1, sheet.max_column + 1):
        values = [len(str(sheet.cell(row, column).value or "")) for row in range(1, min(sheet.max_row, 100) + 1)]
        sheet.column_dimensions[get_column_letter(column)].width = min(max(values + [12]) + 2, 60)
    for row in sheet.iter_rows(min_row=2):
        for cell in row:
            cell.alignment = Alignment(wrap_text=True, vertical="top")


def write_report(args, tests, blocked_reason, runner_exit):
    args.output_dir.mkdir(parents=True, exist_ok=True)
    counts = Counter(test["status"] for test in tests)
    by_category = defaultdict(Counter)
    for test in tests:
        by_category[test["category"]][test["status"]] += 1

    planned = len(tests)
    executed = counts["Passed"] + counts["Failed"]
    blocked = counts["Blocked"] + (1 if blocked_reason else 0)
    overall = "BLOCKED" if blocked_reason and not tests else (
        "FAILED" if counts["Failed"] or (runner_exit not in (None, 0) and not blocked_reason) else "PASSED"
    )
    slug = re.sub(r"[^a-z0-9]+", "-", args.suite.lower()).strip("-")

    workbook = Workbook()
    summary = workbook.active
    summary.title = "Execution Summary"
    summary.append(["Metric", "Value"])
    for row in [
        ("Suite", args.suite),
        ("Overall status", overall),
        ("Planned by runner", planned),
        ("Executed", executed),
        ("Passed", counts["Passed"]),
        ("Failed", counts["Failed"]),
        ("Skipped", counts["Skipped"]),
        ("Blocked", blocked),
        ("Runner exit code", runner_exit if runner_exit is not None else "Unavailable"),
        ("Blocker", blocked_reason or "None reported"),
    ]:
        summary.append(list(row))

    breakdown = workbook.create_sheet("Category Results")
    breakdown.append(["Category", "Planned", "Executed", "Passed", "Failed", "Skipped", "Blocked"])
    for name in sorted(by_category):
        values = by_category[name]
        breakdown.append([
            name,
            sum(values.values()),
            values["Passed"] + values["Failed"],
            values["Passed"],
            values["Failed"],
            values["Skipped"],
            values["Blocked"],
        ])
    if blocked_reason:
        breakdown.append(["Runner setup", 0, 0, 0, 0, 0, 1])

    details = workbook.create_sheet("Executed Tests")
    details.append(["Category", "Test", "Status", "Duration (ms)", "Failure details"])
    for test in tests:
        details.append([
            test["category"],
            test["title"],
            test["status"],
            test["duration_ms"],
            test["details"],
        ])
    if blocked_reason:
        details.append(["Runner setup", "Test runner setup", "Blocked", "", blocked_reason])

    for sheet in workbook.worksheets:
        style_sheet(sheet)
    workbook.save(args.output_dir / f"{slug}-execution-report.xlsx")

    summary_path = args.output_dir / f"{slug}-execution-summary.md"
    lines = [
        f"## {args.suite} execution results",
        "",
        f"**Overall status: {overall}**",
        "",
        "| Category | Planned | Executed | Passed | Failed | Skipped | Blocked |",
        "|---|---:|---:|---:|---:|---:|---:|",
    ]
    for name in sorted(by_category):
        values = by_category[name]
        lines.append(
            f"| {name} | {sum(values.values())} | {values['Passed'] + values['Failed']} | "
            f"{values['Passed']} | {values['Failed']} | {values['Skipped']} | {values['Blocked']} |"
        )
    if blocked_reason:
        lines.append(f"| Runner setup | 0 | 0 | 0 | 0 | 0 | 1 |")
    lines.extend([
        "",
        f"- Planned by runner: **{planned}**",
        f"- Executed: **{executed}**",
        f"- Passed: **{counts['Passed']}**",
        f"- Failed: **{counts['Failed']}**",
        f"- Skipped: **{counts['Skipped']}**",
        f"- Blocked: **{blocked}**",
        f"- Runner exit code: **{runner_exit if runner_exit is not None else 'unavailable'}**",
        f"- Blocker: **{blocked_reason or 'None reported'}**",
        "",
        f"Downloadable workbook: `{args.output_dir / f'{slug}-execution-report.xlsx'}`",
        "",
    ])
    summary_path.write_text("\n".join(lines), encoding="utf-8")
    github_summary = os.getenv("GITHUB_STEP_SUMMARY")
    if github_summary:
        with open(github_summary, "a", encoding="utf-8") as output:
            output.write("\n".join(lines))
    (args.output_dir / "summary.json").write_text(
        json.dumps(
            {
                "suite": args.suite,
                "status": overall,
                "planned": planned,
                "executed": executed,
                "passed": counts["Passed"],
                "failed": counts["Failed"],
                "skipped": counts["Skipped"],
                "blocked": blocked,
                "runner_exit_code": runner_exit,
                "blocker": blocked_reason,
                "categories": {
                    name: {
                        "planned": sum(values.values()),
                        "executed": values["Passed"] + values["Failed"],
                        "passed": values["Passed"],
                        "failed": values["Failed"],
                        "skipped": values["Skipped"],
                        "blocked": values["Blocked"],
                    }
                    for name, values in by_category.items()
                },
            },
            indent=2,
        ),
        encoding="utf-8",
    )


def main():
    args = parse_args()
    results, parse_error = load_results(args.results)
    tests = normalize_tests(results)
    runner_exit = exit_code(args.exit_code_file)
    blocked_reason = parse_error
    if not blocked_reason and not tests:
        failures = (results or {}).get("failures", [])
        if failures:
            error = failures[0].get("err", {})
            blocked_reason = error.get("message") or failures[0].get("title") or (
                "The test runner produced no test cases; setup or discovery did not complete."
            )
        else:
            blocked_reason = "The test runner produced no test cases; setup or discovery did not complete."
    write_report(args, tests, blocked_reason, runner_exit)
    print(f"Generated {args.suite} execution report with {len(tests)} runner-discovered tests.")


if __name__ == "__main__":
    main()
