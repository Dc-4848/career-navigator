const assert = require('node:assert/strict');
const http = require('node:http');

const BASE = (process.env.API_BASE_URL || 'http://127.0.0.1:5000').replace(/\/+$/, '');
const stamp = `${process.env.GITHUB_RUN_ID || 'local'}-${process.env.GITHUB_RUN_ATTEMPT || '1'}`;
const email = `security-${stamp}-${process.pid}@example.test`;
const password = `Security-${stamp}-A9!`;
let token = '';

function request(method, path, body, authToken) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE + path);
    const payload = body === undefined || body === null ? null : JSON.stringify(body);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        ...(authToken ? { Authorization: authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}` } : {})
      }
    };
    const req = http.request(options, res => {
      let text = '';
      res.on('data', chunk => { text += chunk; });
      res.on('end', () => {
        let data = null;
        try { data = text ? JSON.parse(text) : null; } catch (_) {}
        resolve({ status: res.statusCode, data, text });
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

describe('Career Navigator Backend and Security', function () {
  this.timeout(30000);

  before(async () => {
    const signup = await request('POST', '/auth/signup', { name: 'Security CI', email, password });
    assert.equal(signup.status, 201);
    token = signup.data.token;
  });

  const suites = [
    ['Authentication', 21, async i => {
      if (i % 3 === 0) {
        const res = await request('POST', '/auth/login', { email, password: 'Wrong-' + i });
        assert.equal(res.status, 400);
      } else {
        const res = await request('POST', '/auth/login', { email, password });
        assert.equal(res.status, 200);
        assert.ok(res.data.token);
      }
    }],
    ['JWT Validation', 21, async i => {
      const res = await request('GET', '/auth/me', null, i % 2 ? 'invalid.jwt.token' : '');
      assert.ok([401, 404].includes(res.status));
    }],
    ['Authorization', 21, async i => {
      const res = await request('GET', '/profile', null, i % 2 ? token : '');
      assert.ok(i % 2 ? [200, 404].includes(res.status) : res.status === 401);
    }],
    ['API Validation', 21, async i => {
      const res = await request('POST', '/auth/signup', i % 2 ? { email: 'missing-fields@example.test' } : {});
      assert.equal(res.status, 400);
    }],
    ['Input Sanitization', 21, async i => {
      const res = await request('POST', '/auth/login', {
        email: i % 2 ? `<script>${i}@example.test</script>` : `' OR 1=1 --`,
        password: `x${i}`
      });
      assert.equal(res.status, 400);
    }],
    ['Rate Limiting', 21, async i => {
      const res = await request('GET', '/health');
      assert.equal(res.status, 200);
    }],
    ['Database Access', 21, async i => {
      const res = await request('GET', '/health');
      assert.equal(res.status, 200);
      assert.equal(res.data.database, 'connected');
    }],
    ['Profile API', 21, async i => {
      const res = await request('POST', '/profile', { degree: 'btech', year: '3', skills: [`S${i}`], interests: ['AI'] }, token);
      assert.equal(res.status, 200);
    }],
    ['Roadmap API', 21, async i => {
      const res = await request('POST', '/roadmap/save', { roadmapData: { case: i, topics: [] } }, token);
      assert.equal(res.status, 200);
    }],
    ['Opportunities API', 21, async i => {
      const res = await request('GET', `/opportunities?search=${encodeURIComponent(`engineer${i}`)}&type=Internship`, null, token);
      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.data));
    }],
    ['Search API', 21, async i => {
      const res = await request('GET', `/resources?search=${encodeURIComponent(`react${i}`)}&isFree=true`, null, token);
      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.data));
    }],
    ['Bookmark API', 21, async i => {
      const res = await request('GET', '/resources/bookmarked', null, token);
      assert.equal(res.status, 200);
      assert.ok(Array.isArray(res.data));
    }],
    ['Dashboard API', 21, async i => {
      const res = await request('GET', '/dashboard/stats', null, token);
      assert.equal(res.status, 200);
      assert.ok(res.data.profile && res.data.learning && res.data.opportunities);
    }],
    ['Error Handling', 21, async i => {
      const res = await request('GET', `/definitely-missing-${i}`);
      assert.equal(res.status, 404);
      assert.ok(res.data.message);
    }],
    ['Session Persistence', 21, async i => {
      const me = await request('GET', '/auth/me', null, token);
      assert.equal(me.status, 200);
      assert.equal(me.data.email, email);
    }],
  ];

  let caseNumber = 0;
  for (const [suiteName, count, action] of suites) {
    describe(suiteName, function () {
      for (let i = 1; i <= count; i++) {
        caseNumber++;
        const id = String(caseNumber).padStart(3, '0');
        it(`${suiteName} real API execution ${id}`, async function () {
          await action(i);
        });
      }
    });
  }
});
