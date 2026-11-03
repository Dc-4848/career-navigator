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
  it('launches and renders a screen', async function () {
    if (!driver) this.skip();
    await driver.pause(2500);
    const source = await driver.getPageSource();
    assert.ok(source && source.length > 100);
  });
  it('does not display a fatal startup error', async function () {
    if (!driver) this.skip();
    const source = (await driver.getPageSource()).toLowerCase();
    assert.ok(!source.includes('fatal exception') && !source.includes('keeps stopping'));
  });
  it('finds configured smoke control', async function () {
    if (!driver || !process.env.APP_SMOKE_SELECTOR) this.skip();
    const element = await driver.$(process.env.APP_SMOKE_SELECTOR);
    await element.waitForDisplayed({ timeout: 15000 });
    assert.ok(await element.isDisplayed());
  });
});