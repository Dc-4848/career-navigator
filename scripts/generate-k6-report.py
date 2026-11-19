#!/usr/bin/env python3
"""Create a readable k6 performance report from --summary-export JSON."""

import argparse
import json
import os
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill


def metric(summary, name, key, default="Unavailable"):
    return summary.get("metrics", {}).get(name, {}).get("values", {}).get(key, default)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--summary", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    blocker = ""
    try:
        summary = json.loads(args.summary.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        summary = {}
        blocker = f"k6 summary unavailable: {error}"

    metrics = [
        ("Virtual users (max)", metric(summary, "vus_max", "max")),
        ("Iteration duration max (ms)", metric(summary, "iteration_duration", "max", "Unavailable")),
        ("Requests", metric(summary, "http_reqs", "count")),
        ("Throughput (requests/sec)", metric(summary, "http_reqs", "rate")),
        ("Error rate", metric(summary, "http_req_failed", "rate")),
        ("Latency p90 (ms)", metric(summary, "http_req_duration", "p(90)")),
        ("Latency p95 (ms)", metric(summary, "http_req_duration", "p(95)")),
        ("Latency average (ms)", metric(summary, "http_req_duration", "avg")),
        ("Latency max (ms)", metric(summary, "http_req_duration", "max")),
        ("Checks passed", metric(summary, "checks", "passes")),
        ("Checks failed", metric(summary, "checks", "fails")),
    ]
    error_rate = metric(summary, "http_req_failed", "rate", None)
    p95 = metric(summary, "http_req_duration", "p(95)", None)
    thresholds_pass = isinstance(error_rate, (int, float)) and error_rate < 0.05 and isinstance(p95, (int, float)) and p95 < 5000
    status = "BLOCKED" if blocker else ("PASSED" if thresholds_pass else "FAILED")
    if not blocker and not summary:
        status = "BLOCKED"
        blocker = "No k6 metrics were produced."

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Performance Summary"
    sheet.append(["Metric", "Measured value"])
    sheet.append(["Overall status", status])
    sheet.append(["Threshold: http_req_failed < 5%", "PASSED" if isinstance(error_rate, (int, float)) and error_rate < 0.05 else "FAILED"])
    sheet.append(["Threshold: http_req_duration p95 < 5000 ms", "PASSED" if isinstance(p95, (int, float)) and p95 < 5000 else "FAILED"])
    for row in metrics:
        sheet.append(list(row))
    sheet.append(["Blocker", blocker or "None reported"])
    sheet.freeze_panes = "A2"
    for cell in sheet[1]:
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor="17365D")
        cell.alignment = Alignment(wrap_text=True)
    sheet.column_dimensions["A"].width = 45
    sheet.column_dimensions["B"].width = 24
    workbook.save(args.output_dir / "k6-performance-report.xlsx")

    lines = [
        "## k6 load-test results",
        "",
        f"**Overall status: {status}**",
        "",
        "| Metric | Measured value |",
        "|---|---:|",
    ]
    lines.extend(f"| {name} | {value} |" for name, value in metrics)
    lines.extend([
        "",
        f"- Error-rate threshold (<5%): **{'PASSED' if isinstance(error_rate, (int, float)) and error_rate < 0.05 else 'FAILED'}**",
        f"- p95 latency threshold (<5000 ms): **{'PASSED' if isinstance(p95, (int, float)) and p95 < 5000 else 'FAILED'}**",
        f"- Blocker: **{blocker or 'None reported'}**",
        "",
        "Downloadable workbook: `k6-performance-report.xlsx`",
        "",
    ])
    (args.output_dir / "k6-performance-summary.md").write_text("\n".join(lines), encoding="utf-8")
    (args.output_dir / "summary.json").write_text(
        json.dumps({"status": status, "metrics": dict(metrics), "blocker": blocker}, indent=2),
        encoding="utf-8",
    )
    github_summary = os.getenv("GITHUB_STEP_SUMMARY")
    if github_summary:
        with open(github_summary, "a", encoding="utf-8") as output:
            output.write("\n".join(lines))
    print(f"Generated k6 performance report: {status}")


if __name__ == "__main__":
    main()
