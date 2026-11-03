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
findings=[]
for item in semgrep.get("results",[]):
    extra=item.get("extra",{})
    findings.append({"Severity":str(extra.get("severity","INFO")).upper(),"Vulnerability Type":item.get("check_id","Semgrep"),"File Path":item.get("path",""),"Endpoint":"","Description":extra.get("message",""),"Exploitation Scenario":"Requires manual validation.","Impact":"Depends on reachability and exploitability.","Recommended Fix":"Review Semgrep rule guidance and apply framework-specific remediation."})
counts={level:sum(f["Severity"]==level for f in findings) for level in ["CRITICAL","HIGH","MEDIUM","LOW"]}
score=max(0,100-counts["CRITICAL"]*25-counts["HIGH"]*10-counts["MEDIUM"]*4-counts["LOW"])
lines=["# Security Review","","> Automated starter report. No finding is not proof of security.","",f"- Parsed Semgrep findings: {len(findings)}"]
for level,count in counts.items(): lines.append(f"- {level.title()}: {count}")
lines += ["","## Findings"]
for index,f in enumerate(findings,1):
    lines += [f"### {index}. {f['Vulnerability Type']} ({f['Severity']})",f"- File: {f['File Path']}",f"- Endpoint: {f['Endpoint'] or 'Not mapped'}",f"- Description: {f['Description']}",f"- Scenario: {f['Exploitation Scenario']}",f"- Impact: {f['Impact']}",f"- Recommended fix: {f['Recommended Fix']}",""]
if not findings: lines.append("No Semgrep findings parsed. This does not establish that the code is secure.")
lines += ["## Backend inventory",f"- Framework candidates: {', '.join(inventory.get('framework_candidates',[]))}",f"- Files inventoried: {inventory.get('file_count',0)}",f"- Endpoint candidates: {len(inventory.get('api_endpoint_candidates',[]))}","## Limitations","- Route discovery is heuristic; verify all routes, resolvers, middleware and roles.","- DAST helper sends safe GET requests only; it does not test IDOR, brute force or mutation-based injection.","- Scanner output requires human triage."]
(out/"security-review.md").write_text("\n".join(lines))
(out/"executive-summary.md").write_text("# Executive Summary\n\n"+f"- Total parsed findings: {len(findings)}\n"+"".join(f"- {level.title()}: {count}\n" for level,count in counts.items())+f"\nIndicative heuristic score: {score}/100. Not a certification or complete security rating.\n")
(out/"dependency-report.md").write_text("# Dependency Report\n\nSee Trivy JSON in this artifact for dependency and filesystem findings. Missing scanner output does not mean zero vulnerable dependencies.\n")

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
make_book(out/"findings.xlsx",[("Security Findings",finding_headers,findings),("Endpoint Inventory",endpoint_headers,inventory.get("api_endpoint_candidates",[])),("Dependency Vulnerabilities",dependency_headers,[]),("Risk Summary",["Metric","Value"],summary)])
make_book(out/"endpoint-inventory.xlsx",[("Endpoint Inventory",endpoint_headers,inventory.get("api_endpoint_candidates",[]))])
print("Generated security markdown and Excel reports.")
