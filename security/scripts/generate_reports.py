import json
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

out=Path("Vulnerability Test Results");out.mkdir(exist_ok=True)
def load(name):
    try: return json.loads((out/name).read_text())
    except Exception: return {}
inventory=load("backend-inventory.json")
semgrep=load("semgrep.json")
trivy=load("trivy.json")
gitleaks=load("gitleaks.json")
findings=[]
for item in semgrep.get("results",[]):
    extra=item.get("extra",{})
    findings.append({"Severity":str(extra.get("severity","INFO")).upper(),"Vulnerability Type":item.get("check_id","Semgrep"),"File Path":item.get("path",""),"Endpoint":"","Description":extra.get("message",""),"Exploitation Scenario":"Requires manual validation.","Impact":"Depends on reachability and exploitability.","Recommended Fix":"Review Semgrep rule guidance and apply framework-specific remediation."})
for result in trivy.get("Results",[]) or []:
    for item in result.get("Vulnerabilities",[]) or []:
        severity=str(item.get("Severity","UNKNOWN")).upper()
        findings.append({
    "Severity":severity,
    "Vulnerability Type":item.get("VulnerabilityID","Trivy vulnerability"),
    "File Path":result.get("Target",""),
    "Endpoint":"",
    "Description":item.get("Title") or item.get("Description",""),
    "Exploitation Scenario":"Dependency or filesystem exposure requires reachability and runtime validation.",
    "Impact":item.get("PkgName","Unknown package"),
    "Recommended Fix":item.get("FixedVersion") and f"Upgrade to {item['FixedVersion']}." or "Review the package advisory and apply the vendor remediation.",
        })
gitleaks_items = gitleaks if isinstance(gitleaks, list) else gitleaks.get("Leaks", [])
for item in gitleaks_items or []:
    findings.append({
        "Severity":"HIGH",
        "Vulnerability Type":item.get("RuleID","Gitleaks secret"),
        "File Path":item.get("File",""),
        "Endpoint":"",
        "Description":item.get("Description","Potential secret detected."),
        "Exploitation Scenario":"A committed credential may be usable by an unauthorized party.",
        "Impact":"Potential credential or token disclosure.",
        "Recommended Fix":"Revoke and rotate the exposed value, then remove it from repository history according to incident procedure.",
    })
counts={level:sum(f["Severity"]==level for f in findings) for level in ["CRITICAL","HIGH","MEDIUM","LOW"]}
score=max(0,100-counts["CRITICAL"]*25-counts["HIGH"]*10-counts["MEDIUM"]*4-counts["LOW"])
lines=["# Security Review","","> Automated starter report. No finding is not proof of security.","",f"- Parsed findings: {len(findings)}"]
for level,count in counts.items(): lines.append(f"- {level.title()}: {count}")
lines += ["","## Findings"]
for index,f in enumerate(findings,1):
    lines += [f"### {index}. {f['Vulnerability Type']} ({f['Severity']})",f"- File: {f['File Path']}",f"- Endpoint: {f['Endpoint'] or 'Not mapped'}",f"- Description: {f['Description']}",f"- Scenario: {f['Exploitation Scenario']}",f"- Impact: {f['Impact']}",f"- Recommended fix: {f['Recommended Fix']}",""]
if not findings: lines.append("No Semgrep findings parsed. This does not establish that the code is secure.")
lines += ["## Backend inventory",f"- Framework candidates: {', '.join(inventory.get('framework_candidates',[]))}",f"- Files inventoried: {inventory.get('file_count',0)}",f"- Endpoint candidates: {len(inventory.get('api_endpoint_candidates',[]))}","## Limitations","- Route discovery is heuristic; verify all routes, resolvers, middleware and roles.","- DAST helper sends safe GET requests only; it does not test IDOR, brute force or mutation-based injection.","- Scanner output requires human triage."]
(out/"security-review.md").write_text("\n".join(lines))
(out/"executive-summary.md").write_text("# Executive Summary\n\n"+f"- Total parsed findings: {len(findings)}\n"+"".join(f"- {level.title()}: {count}\n" for level,count in counts.items())+f"\nIndicative heuristic score: {score}/100. Not a certification or complete security rating.\n")
dependency_findings = [
    finding for finding in findings if finding["Vulnerability Type"].startswith(("CVE-", "GHSA-"))
]
(out/"dependency-report.md").write_text(
    "# Dependency Report\n\n"
    f"Parsed dependency findings: {len(dependency_findings)}.\n\n"
    "See Trivy JSON in this artifact for raw scanner evidence. Missing scanner output does not mean zero vulnerable dependencies.\n"
)

def make_book(path,sheets):
    wb=Workbook();wb.remove(wb.active)
    for title,headers,rows in sheets:
        ws=wb.create_sheet(title);ws.append(headers)
        for row in rows: ws.append([row.get(h,"") for h in headers])
        ws.freeze_panes="A2";ws.auto_filter.ref=ws.dimensions
        for cell in ws[1]:
            cell.font=Font(bold=True,color="FFFFFF");cell.fill=PatternFill("solid",fgColor="1F4E78")
        for col in range(1,ws.max_column+1):
            widths=[len(str(ws.cell(r,col).value or "")) for r in range(1,min(ws.max_row,100)+1)]
            ws.column_dimensions[get_column_letter(col)].width=min(max(widths+[14])+2,55)
        for row in ws.iter_rows():
            for cell in row: cell.alignment=Alignment(wrap_text=True,vertical="top")
    wb.save(path)

finding_headers=["Severity","Vulnerability Type","File Path","Endpoint","Description","Exploitation Scenario","Impact","Recommended Fix"]
endpoint_headers=["Endpoint","HTTP Method","Authentication Required","Expected Roles","Controller/File Path"]
dependency_headers=["Package","Installed Version","Fixed Version","CVE","Severity","Scanner","Evidence"]
summary=[{"Metric":"Total Findings","Value":len(findings)}]+[{"Metric":level.title(),"Value":count} for level,count in counts.items()]+[{"Metric":"Indicative score","Value":f"{score}/100"}]
dependency_rows = []
for result in trivy.get("Results", []) or []:
    for item in result.get("Vulnerabilities", []) or []:
        dependency_rows.append({
            "Package": item.get("PkgName", ""),
            "Installed Version": item.get("InstalledVersion", ""),
            "Fixed Version": item.get("FixedVersion", ""),
            "CVE": item.get("VulnerabilityID", ""),
            "Severity": item.get("Severity", ""),
            "Scanner": "Trivy",
            "Evidence": result.get("Target", ""),
        })
make_book(out/"findings.xlsx",[("Security Findings",finding_headers,findings),("Endpoint Inventory",endpoint_headers,inventory.get("api_endpoint_candidates",[])),("Dependency Vulnerabilities",dependency_headers,dependency_rows),("Risk Summary",["Metric","Value"],summary)])
make_book(out/"endpoint-inventory.xlsx",[("Endpoint Inventory",endpoint_headers,inventory.get("api_endpoint_candidates",[]))])
security_status = "FAILED" if counts["CRITICAL"] or counts["HIGH"] else "PASSED"
api_execution = {}
try:
    api_execution = json.loads(Path("security-results/mocha.json").read_text())
except Exception:
    api_execution = {}
api_stats = api_execution.get("stats", {}) if api_execution else {}
api_executed = api_stats.get("passes", 0) + api_stats.get("failures", 0)
api_passed = api_stats.get("passes", 0)
api_failed = api_stats.get("failures", 0)
if api_failed:
    security_status = "FAILED"
elif not api_execution:
    security_status = "BLOCKED"
(out/"security-summary.json").write_text(json.dumps({
    "status": security_status,
    "planned": api_executed or len(findings),
    "executed": api_executed,
    "passed": api_passed,
    "failed": api_failed,
    "skipped": 0,
    "blocked": 0 if api_execution else 1,
    "finding_counts": counts,
    "blocker": "" if semgrep or trivy or gitleaks else "No scanner output was available.",
}, indent=2))
print("Generated security markdown and Excel reports.")
