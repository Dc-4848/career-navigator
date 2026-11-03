import os, sys
from urllib.parse import urljoin
import requests

base=os.getenv("API_BASE_URL","").strip()
if not base:
    print("API_BASE_URL is not configured; DAST skipped.")
    sys.exit(0)
if os.getenv("DAST_AUTHORIZED","").lower() != "true":
    print("Set DAST_AUTHORIZED=true only for an owned/authorized staging target; DAST skipped.")
    sys.exit(0)
for endpoint in ["/","/health","/healthz","/api/health","/openapi.json","/swagger.json"]:
    try:
        response=requests.get(urljoin(base.rstrip("/")+"/",endpoint.lstrip("/")),timeout=8,allow_redirects=False)
        headers={k:v for k,v in response.headers.items() if k.lower() in {"content-security-policy","x-content-type-options","x-frame-options","strict-transport-security","access-control-allow-origin"}}
        print(response.status_code,endpoint,headers)
    except requests.RequestException as error:
        print("REQUEST ERROR",endpoint,str(error))
