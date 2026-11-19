import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const authLatency = new Trend('auth_latency');
const profileLatency = new Trend('profile_latency');
const roadmapLatency = new Trend('roadmap_latency');
const opportunityLatency = new Trend('opportunity_latency');
const searchLatency = new Trend('search_latency');
const bookmarkLatency = new Trend('bookmark_latency');

export const options = {
  scenarios: {
    career_navigator_300_iterations: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 300,
      maxDuration: '3m',
      gracefulStop: '30s'
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<5000']
  }
};

const base = (__ENV.API_BASE_URL || 'http://127.0.0.1:5000').replace(/\/+$/, '');

export function setup() {
  const stamp = `${__VU}-${Date.now()}`;
  const email = `k6-${stamp}@example.test`;
  const password = `K6-${stamp}-A9!`;
  const signup = http.post(`${base}/auth/signup`, JSON.stringify({
    name: 'k6 Career Navigator Load',
    email,
    password
  }), { headers: { 'Content-Type': 'application/json' }, timeout: '15s' });
  if (signup.status !== 201) {
    throw new Error(`k6 setup signup failed: ${signup.status} ${signup.body}`);
  }
  const login = http.post(`${base}/auth/login`, JSON.stringify({ email, password }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '15s'
  });
  if (login.status !== 200) throw new Error(`k6 setup login failed: ${login.status}`);
  return { token: login.json('token'), email, password };
}

function request(method, path, token, body) {
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
  const params = { headers, timeout: '10s' };
  if (method === 'GET') return http.get(`${base}${path}`, params);
  return http.post(`${base}${path}`, body ? JSON.stringify(body) : null, params);
}

export default function (data) {
  const iteration = __ITER + 1;
  const token = data.token;

  const loginPayload = { email: data.email, password: data.password };
  const auth = http.post(`${base}/auth/login`, JSON.stringify(loginPayload), {
    headers: { 'Content-Type': 'application/json' }, timeout: '10s'
  });
  authLatency.add(auth.timings.duration);
  check(auth, {
    '300-iteration authentication login returns 200': r => r.status === 200,
    'authentication response includes a JWT': r => Boolean(r.json('token'))
  });

  const profile = request('GET', '/profile', token);
  profileLatency.add(profile.timings.duration);
  check(profile, { 'profile endpoint responds': r => r.status === 200 || r.status === 404 });

  const roadmap = request('GET', '/roadmap', token);
  roadmapLatency.add(roadmap.timings.duration);
  check(roadmap, { 'roadmap endpoint responds': r => r.status === 200 || r.status === 404 });

  const opportunities = request('GET', `/opportunities?search=${encodeURIComponent(`engineering${iteration % 20}`)}`, token);
  opportunityLatency.add(opportunities.timings.duration);
  check(opportunities, { 'opportunities search returns 200': r => r.status === 200 });

  const resources = request('GET', `/resources?search=${encodeURIComponent(`react${iteration % 10}`)}&isFree=true`, token);
  searchLatency.add(resources.timings.duration);
  check(resources, { 'resource search returns 200': r => r.status === 200 });

  const dashboard = request('GET', '/dashboard/stats', token);
  check(dashboard, { 'dashboard stats responds': r => r.status === 200 });

  const bookmarks = request('GET', '/resources/bookmarked', token);
  bookmarkLatency.add(bookmarks.timings.duration);
  check(bookmarks, { 'bookmarks endpoint responds': r => r.status === 200 });

  sleep(0.25);
}
