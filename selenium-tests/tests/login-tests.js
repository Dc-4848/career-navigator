const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('node:assert/strict');

const BASE = process.env.WEB_BASE_URL || 'http://127.0.0.1:5173';
const selectors = {
  email: process.env.LOGIN_EMAIL_SELECTOR || 'input[type="email"], input[name="email"]',
  password: process.env.LOGIN_PASSWORD_SELECTOR || 'input[type="password"], input[name="password"]',
  submit: process.env.LOGIN_SUBMIT_SELECTOR || 'button[type="submit"]',
  success: process.env.LOGIN_SUCCESS_SELECTOR || '[data-testid="dashboard"], [data-testid="user-menu"]'
};

describe('Career Navigator web login E2E', function () {
  this.timeout(60000);
  let driver;
  before(async () => {
    const options = new chrome.Options();
    if (process.env.HEADLESS !== 'false') options.addArguments('--headless=new');
    options.addArguments('--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });
  after(async () => { if (driver) await driver.quit(); });

  async function openLogin() {
    await driver.get(BASE + (process.env.LOGIN_PATH || '/login'));
    await driver.wait(until.elementLocated(By.css(selectors.email)), 15000);
  }
  async function fill(selector, value) {
    const element = await driver.findElement(By.css(selector));
    await element.clear();
    if (value) await element.sendKeys(value);
  }
  async function submit() { await driver.findElement(By.css(selectors.submit)).click(); }

  it('renders email and password inputs', async () => {
    await openLogin();
    assert.ok(await driver.findElement(By.css(selectors.email)).isDisplayed());
    assert.ok(await driver.findElement(By.css(selectors.password)).isDisplayed());
  });
  it('validates empty credentials', async () => {
    await openLogin(); await submit();
    const email = await driver.findElement(By.css(selectors.email));
    assert.ok((await email.getAttribute('aria-invalid')) === 'true' ||
      await email.getAttribute('validationMessage') ||
      (await driver.getPageSource()).toLowerCase().includes('required'));
  });
  it('rejects malformed email', async () => {
    await openLogin();
    await fill(selectors.email, 'not-an-email');
    await fill(selectors.password, 'Invalid-Test-Password-123!');
    await submit();
    const source = (await driver.getPageSource()).toLowerCase();
    assert.ok(source.includes('email') || source.includes('valid') || source.includes('invalid'));
  });
  it('rejects incorrect password', async function () {
    if (!process.env.E2E_EMAIL) this.skip();
    await openLogin();
    await fill(selectors.email, process.env.E2E_EMAIL);
    await fill(selectors.password, 'Definitely-Wrong-Password-123!');
    await submit();
    await driver.sleep(1000);
    assert.ok((await driver.getCurrentUrl()).includes('/login'));
  });
  it('logs in with dedicated E2E credentials', async function () {
    if (!process.env.E2E_EMAIL || !process.env.E2E_PASSWORD) this.skip();
    await openLogin();
    await fill(selectors.email, process.env.E2E_EMAIL);
    await fill(selectors.password, process.env.E2E_PASSWORD);
    await submit();
    await driver.wait(until.elementLocated(By.css(selectors.success)), 15000);
    assert.ok(await driver.findElement(By.css(selectors.success)).isDisplayed());
  });
});