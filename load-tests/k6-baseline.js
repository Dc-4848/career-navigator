import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    baseline_100_users: {
      executor: 'constant-vus',
      vus: 100,
      duration: '1m'
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000']
  }
};

export default function () {
  const base = __ENV.API_BASE_URL || 'http://127.0.0.1:3000';
  const path = __ENV.HEALTH_PATH || '/health';
  const response = http.get(`${base}${path}`, { timeout: '10s' });
  check(response, { 'health endpoint returns 2xx': r => r.status >= 200 && r.status < 300 });
  sleep(0.1);
}