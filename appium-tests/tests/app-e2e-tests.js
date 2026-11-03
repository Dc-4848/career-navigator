const { remote } = require('webdriverio');
const assert = require('node:assert/strict');

describe('Career Navigator Android E2E', function () {
  this.timeout(120000);
  let driver;

  before(async function () {
    if (!process.env.APP_PACKAGE || !process.env.APP_ACTIVITY) this.skip();
    driver = await remote({
      hostname: process.env.APPIUM_HOST || '127.0.0.1',
      port: Number(process.env.APPIUM_PORT || 4723),
      path: '/',
      logLevel: 'warn',
      capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:appPackage': process.env.APP_PACKAGE,
        'appium:appActivity': process.env.APP_ACTIVITY,
        'appium:noReset': false,
        'appium:newCommandTimeout': 120
      }
    });
  });

  after(async () => { if (driver) await driver.deleteSession(); });

  it('launches and displays the login screen', async function () {
    if (!driver) this.skip();
    const email = await driver.$('~login-email');
    await email.waitForDisplayed({ timeout: 30000 });
    assert.ok(await email.isDisplayed());
    assert.ok(await (await driver.$('~login-password')).isDisplayed());
    assert.ok(await (await driver.$('~login-submit')).isDisplayed());
  });

  it('rejects an incorrect password', async function () {
    if (!driver || !process.env.E2E_EMAIL) this.skip();
    await (await driver.$('~login-email')).setValue(process.env.E2E_EMAIL);
    await (await driver.$('~login-password')).setValue('Definitely-Wrong-CI-Password-123!');
    await (await driver.$('~login-submit')).click();
    await driver.waitUntil(async () => {
      const source = await driver.getPageSource();
      return source.includes('Invalid credentials') || source.includes('Login failed');
    }, { timeout: 20000, interval: 500, timeoutMsg: 'Expected invalid-credentials message was not displayed' });
    const source = await driver.getPageSource();
    assert.ok(source.includes('Invalid credentials') || source.includes('Login failed'));
  });

  it('logs in and opens the authenticated dashboard', async function () {
    if (!driver || !process.env.E2E_EMAIL || !process.env.E2E_PASSWORD) this.skip();
    await (await driver.$('~login-email')).setValue(process.env.E2E_EMAIL);
    await (await driver.$('~login-password')).setValue(process.env.E2E_PASSWORD);
    await (await driver.$('~login-submit')).click();
    await driver.waitUntil(async () => {
      const source = await driver.getPageSource();
      return source.includes('Student Dashboard') || source.includes('Welcome back');
    }, { timeout: 45000, interval: 1000, timeoutMsg: 'Authenticated dashboard did not appear after login' });
    const source = await driver.getPageSource();
    assert.ok(source.includes('Student Dashboard') || source.includes('Welcome back'));
  });
});
