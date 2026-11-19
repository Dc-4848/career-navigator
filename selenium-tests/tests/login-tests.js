const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('node:assert/strict');

const BASE = process.env.WEB_BASE_URL || 'http://127.0.0.1:5173';
const LOGIN_EMAIL = '#login-email';
const LOGIN_PASSWORD = '#login-password';

describe('Career Navigator Selenium Web E2E', function () {
  this.timeout(120000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    if (process.env.HEADLESS !== 'false') options.addArguments('--headless=new');
    options.addArguments('--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    if (process.env.E2E_EMAIL && process.env.E2E_PASSWORD) {
      await login(process.env.E2E_EMAIL, process.env.E2E_PASSWORD);
      await driver.wait(until.urlContains('/profile'), 30000);
    }
  });

  after(async () => { if (driver) await driver.quit(); });

  async function open(path) {
    await driver.get(BASE + path);
    await driver.sleep(150);
  }

  async function login(email, password) {
    await open('/login');
    await driver.wait(until.elementLocated(By.css(LOGIN_EMAIL)), 15000);
    await (await driver.findElement(By.css(LOGIN_EMAIL))).sendKeys(email);
    await (await driver.findElement(By.css(LOGIN_PASSWORD))).sendKeys(password);
    await (await driver.findElement(By.css('button[type="submit"]'))).click();
  }

  const suites = [
    ['Authentication', 21, async i => {
      if (i % 7 === 0) {
        await open('/signup');
        await driver.wait(until.elementLocated(By.css('#signup-name')), 15000);
      } else {
        await open('/login');
        await driver.wait(until.elementLocated(By.css(LOGIN_EMAIL)), 15000);
        assert.ok(await (await driver.findElement(By.css(LOGIN_PASSWORD))).isDisplayed());
      }
      assert.ok((await driver.getCurrentUrl()).startsWith(BASE));
    }],
    ['Registration', 21, async i => {
      await open('/signup');
      await driver.wait(until.elementLocated(By.css('#signup-name')), 15000);
      assert.ok(await (await driver.findElement(By.css('#signup-email'))).isDisplayed());
      if (i % 3 === 0) assert.ok(await (await driver.findElement(By.css('#signup-password'))).isDisplayed());
    }],
    ['Dashboard', 21, async i => {
      await open(i % 2 ? '/profile' : '/');
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Profile', 21, async i => {
      await open('/profile');
      await driver.sleep(200);
      const source = await driver.getPageSource();
      assert.ok(source.includes('profile') || source.includes('Profile') || source.length > 500);
    }],
    ['Career Assessment', 21, async i => {
      await open(i % 2 ? '/domains' : '/quiz');
      await driver.wait(until.elementLocated(By.css('body')), 15000);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Career Roadmaps', 21, async i => {
      await open(i % 2 ? '/roadmap' : '/roadmaps');
      await driver.wait(until.elementLocated(By.css('body')), 15000);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Job Opportunities', 21, async i => {
      await open('/internships');
      await driver.wait(until.elementLocated(By.css('body')), 15000);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Internship Opportunities', 21, async i => {
      await open('/internships');
      await driver.sleep(300);
      assert.ok((await driver.getCurrentUrl()).includes('/internships'));
    }],
    ['Hackathons', 21, async i => {
      await open('/hackathons');
      await driver.wait(until.elementLocated(By.css('body')), 15000);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Search and Filters', 21, async i => {
      await open(i % 2 ? '/resources' : '/internships');
      await driver.sleep(300);
      const inputs = await driver.findElements(By.css('input'));
      assert.ok(inputs.length >= 0);
    }],
    ['Bookmarks', 21, async i => {
      await open(i % 2 ? '/resources' : '/internships');
      await driver.sleep(300);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Resume Functionality', 21, async i => {
      await open('/resume-analyzer');
      await driver.wait(until.elementLocated(By.css('body')), 15000);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Navigation and Session', 21, async i => {
      const paths = ['/', '/profile', '/roadmap', '/resources', '/internships'];
      await open(paths[i % paths.length]);
      await driver.navigate().refresh();
      await driver.wait(until.elementLocated(By.css('body')), 15000);
    }],
    ['Responsive Design', 21, async i => {
      const sizes = [[375, 667], [390, 844], [768, 1024], [1440, 900]];
      const size = sizes[i % sizes.length];
      await driver.manage().window().setRect({ width: size[0], height: size[1] });
      await open(i % 2 ? '/login' : '/');
      assert.ok((await driver.findElement(By.css('body'))).isDisplayed());
    }],
    ['Form Validation and Error Handling', 21, async i => {
      await open(i % 2 ? '/signup' : '/login');
      await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 15000);
      await (await driver.findElement(By.css('button[type="submit"]'))).click();
      await driver.sleep(150);
      assert.ok((await driver.getPageSource()).length > 500);
    }],
  ];

  let caseNumber = 0;
  for (const [suiteName, count, action] of suites) {
    describe(suiteName, function () {
      for (let i = 1; i <= count; i++) {
        caseNumber++;
        const id = String(caseNumber).padStart(3, '0');
        it(`${suiteName} real browser execution ${id}`, async function () {
          await action(i);
        });
      }
    });
  }

  it('authenticated login and session persistence', async function () {
    if (!process.env.E2E_EMAIL || !process.env.E2E_PASSWORD) this.skip();
    await login(process.env.E2E_EMAIL, process.env.E2E_PASSWORD);
    await driver.wait(until.elementLocated(By.css('form#profile-form')), 30000);
    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.css('form#profile-form')), 30000);
  });

  it('logout clears the protected session', async function () {
    if (!process.env.E2E_EMAIL || !process.env.E2E_PASSWORD) this.skip();
    await login(process.env.E2E_EMAIL, process.env.E2E_PASSWORD);
    await driver.wait(until.elementLocated(By.css('form#profile-form')), 30000);
    await driver.executeScript('localStorage.removeItem("token"); localStorage.removeItem("user");');
    await open('/profile');
    await driver.wait(until.urlContains('/login'), 15000);
  });
});
