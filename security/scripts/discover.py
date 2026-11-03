import json, re
from pathlib import Path

SKIP = {".git","node_modules","vendor",".venv","venv","dist","build","android","ios"}
files = [p for p in Path(".").rglob("*") if p.is_file() and not any(part in SKIP for part in p.parts)]
def read(path):
    try: return path.read_text(errors="ignore")
    except Exception: return ""

frameworks = []
for manifest in [Path("backend/package.json"), Path("package.json")]:
    if manifest.exists():
        try:
            data=json.loads(read(manifest))
            deps={**data.get("dependencies",{}),**data.get("devDependencies",{})}
            frameworks += [name for name in ["express","@nestjs/core","koa","fastify"] if name in deps]
        except Exception: pass
for label, needle in [("Django","django"),("Flask","flask"),("FastAPI","fastapi"),("Spring Boot","spring-boot"),("Laravel","laravel/framework")]:
    if any(needle in p.name.lower() for p in files): frameworks.append(label)

patterns = [
    re.compile(r"(?:app|router)\.(get|post|put|patch|delete|options|head)\s*\(\s*['\"\x60]([^'\"\x60]+)", re.I),
    re.compile(r"@(Get|Post|Put|Patch|Delete)\s*\(\s*['\"\x60]?([^'\"\x60)]*)", re.I)
]
endpoints=[]
for path in files:
    if path.suffix.lower() not in {".js",".jsx",".ts",".tsx",".py",".java",".php",".go",".cs"}: continue
    content=read(path)
    for pattern in patterns:
        for match in pattern.finditer(content):
            endpoints.append({"Endpoint":match.group(2),"HTTP Method":match.group(1).upper(),"Authentication Required":"Review middleware/decorator","Expected Roles":"Review authorization policy","Controller/File Path":str(path)})
out=Path("Vulnerability Test Results");out.mkdir(exist_ok=True)
report={"framework_candidates":sorted(set(frameworks)) or ["Not confidently detected"],"languages":sorted({p.suffix for p in files if p.suffix}),"file_count":len(files),"api_endpoint_candidates":endpoints,"limitations":["Route discovery is heuristic and may miss dynamic routes, GraphQL and framework-specific routing.","Authentication and role requirements require manual verification."]}
(out/"backend-inventory.json").write_text(json.dumps(report,indent=2))
print(f"Inventoried {len(files)} files and {len(endpoints)} endpoint candidates.")
