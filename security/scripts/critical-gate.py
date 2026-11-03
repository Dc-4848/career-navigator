import json, sys
from pathlib import Path

report = Path("Vulnerability Test Results/trivy.json")
if not report.exists():
    print("Trivy report missing; cannot evaluate Critical findings.")
    sys.exit(0)
try:
    data = json.loads(report.read_text())
except Exception as error:
    print(f"Unable to parse Trivy report: {error}")
    sys.exit(0)

critical = []
for result in data.get("Results", []) or []:
    for item in result.get("Vulnerabilities", []) or []:
        if str(item.get("Severity", "")).upper() == "CRITICAL":
            critical.append((result.get("Target", ""), item.get("VulnerabilityID", "unknown"), item.get("PkgName", "unknown")))
print(f"Critical Trivy dependency findings: {len(critical)}")
for target, cve, package in critical:
    print(f"CRITICAL {target} {cve} {package}")
if critical:
    sys.exit(1)