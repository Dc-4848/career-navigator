#!/usr/bin/env python3
"""Consolidate suite summaries into one CI workbook and Actions summary."""

import argparse
import json
import os
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill


def load(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)

    suites = []
    for path in sorted(args.input_dir.rglob("summary.json")):
        if path.parent.name != "report":
            continue
        data = load(path)
        if data.get("suite") or data.get("metrics"):
            suites.append((data.get("suite", "k6"), data))
    security = load(args.input_dir / "security" / "security-summary.json")
    if security:
        suites.append(("Security", security))

    workbook = Workbook()
    summary = workbook.active
    summary.title = "Master Summary"
    summary.append(["Suite", "Status", "Planned", "Executed", "Passed", "Failed", "Skipped", "Blocked"])
    totals = {key: 0 for key in ("planned", "executed", "passed", "failed", "skipped", "blocked")}
    for name, data in suites:
        row = [
            name,
            data.get("status", "BLOCKED"),
            data.get("planned", ""),
            data.get("executed", ""),
            data.get("passed", ""),
            data.get("failed", ""),
            data.get("skipped", ""),
            data.get("blocked", ""),
        ]
        summary.append(row)
        for key in totals:
            if isinstance(data.get(key), (int, float)):
                totals[key] += data[key]
    summary.append(["TOTAL", "SEE SUITE STATUS", *[totals[key] for key in totals]])

    details = workbook.create_sheet("Suite Details")
    details.append(["Suite", "Metric", "Value"])
    for name, data in suites:
        if "metrics" in data:
            for key, value in data["metrics"].items():
                details.append([name, key, value])
        else:
            for key in ("status", "blocker"):
                details.append([name, key, data.get(key, "")])
    for sheet in workbook.worksheets:
        sheet.freeze_panes = "A2"
        sheet.auto_filter.ref = sheet.dimensions
        for cell in sheet[1]:
            cell.font = Font(bold=True, color="FFFFFF")
            cell.fill = PatternFill("solid", fgColor="17365D")
            cell.alignment = Alignment(wrap_text=True)
        for column in sheet.columns:
            sheet.column_dimensions[column[0].column_letter].width = 24
    workbook.save(args.output_dir / "career-navigator-master-report.xlsx")

    overall = "FAILED" if any(data.get("status") in ("FAILED", "BLOCKED") for _, data in suites) else "PASSED"
    lines = [
        "# Career Navigator CI master report",
        "",
        f"**Overall workflow evidence status: {overall}**",
        "",
        "| Suite | Status | Planned | Executed | Passed | Failed | Skipped | Blocked |",
        "|---|---|---:|---:|---:|---:|---:|---:|",
    ]
    for name, data in suites:
        lines.append(
            f"| {name} | {data.get('status', 'BLOCKED')} | {data.get('planned', 'N/A')} | "
            f"{data.get('executed', 'N/A')} | {data.get('passed', 'N/A')} | "
            f"{data.get('failed', 'N/A')} | {data.get('skipped', 'N/A')} | {data.get('blocked', 'N/A')} |"
        )
    lines.extend([
        "",
        f"- Total planned: **{totals['planned']}**",
        f"- Total executed: **{totals['executed']}**",
        f"- Total passed: **{totals['passed']}**",
        f"- Total failed: **{totals['failed']}**",
        f"- Total skipped: **{totals['skipped']}**",
        f"- Total blocked: **{totals['blocked']}**",
        "",
        "A missing runner result is represented as BLOCKED; planned test cases are never counted as passed.",
        "",
        "Downloadable workbook: `career-navigator-master-report.xlsx`",
        "",
    ])
    (args.output_dir / "career-navigator-master-summary.md").write_text("\n".join(lines), encoding="utf-8")
    github_summary = os.getenv("GITHUB_STEP_SUMMARY")
    if github_summary:
        with open(github_summary, "a", encoding="utf-8") as output:
            output.write("\n".join(lines))
    print(f"Generated master report: {overall}")


if __name__ == "__main__":
    main()
