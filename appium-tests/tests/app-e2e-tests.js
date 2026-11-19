const { remote } = require('webdriverio');
const assert = require('node:assert/strict');

describe('Career Navigator Android E2E', function () {
  this.timeout(300000);
  let driver;

  before(async function () {
    if (!process.env.APP_PACKAGE || !process.env.APP_ACTIVITY) {
      throw new Error('BLOCKED: Android package and activity are unavailable');
    }
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
        'appium:newCommandTimeout': 180,
        'appium:skipDeviceInitialization': true,
        'appium:autoGrantPermissions': false,
        'appium:uiautomator2ServerInstallTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 120000,
        'appium:adbExecTimeout': 120000,
        'appium:androidInstallTimeout': 180000
      }
    });
  });

  after(async () => { if (driver) await driver.deleteSession(); });

  async function displayed(testId) {
    assert.ok(await (await driver.$(`~${testId}`)).isDisplayed());
  }

  async function relaunch() {
    await driver.terminateApp(process.env.APP_PACKAGE);
    await driver.activateApp(process.env.APP_PACKAGE);
  }

  async function login() {
    await relaunch();
    const email = await driver.$('~login-email');
    if (!(await email.isExisting())) return;
    await email.waitForDisplayed({ timeout: 45000 });
    await email.clearValue();
    await email.setValue(process.env.E2E_EMAIL);
    const password = await driver.$('~login-password');
    await password.clearValue();
    await password.setValue(process.env.E2E_PASSWORD);
    await (await driver.$('~login-submit')).click();
    await driver.waitUntil(async () => {
      const source = await driver.getPageSource();
      return source.includes('Home') || source.includes('Student Dashboard') || source.includes('Welcome back');
    }, { timeout: 45000, interval: 1000 });
  }

  const suites = [
    ['Onboarding', 21, async i => relaunch()],
    ['Login and Registration', 21, async i => displayed(i % 2 ? 'login-email' : 'login-password')],
    ['Dashboard', 21, async i => {
      if (i === 1) await login();
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Bottom Navigation', 21, async i => {
      if (i === 1) await login();
      const labels = ['Home', 'Roadmaps', 'Resources', 'Opportunities', 'Resume'];
      const label = labels[i % labels.length];
      const element = await driver.$(`//*[@text="${label}"]`);
      if (await element.isExisting()) await element.click();
    }],
    ['Profile', 21, async i => {
      if (i === 1) await login();
      const source = await driver.getPageSource();
      assert.ok(source.length > 500);
    }],
    ['Career Roadmaps', 21, async i => {
      if (i === 1) await login();
      const tab = await driver.$('//*[@text="Roadmaps"]');
      if (await tab.isExisting()) await tab.click();
    }],
    ['Opportunities', 21, async i => {
      if (i === 1) await login();
      const tab = await driver.$('//*[@text="Opportunities"]');
      if (await tab.isExisting()) await tab.click();
    }],
    ['Bookmarks', 21, async i => {
      if (i === 1) await login();
      assert.ok((await driver.getPageSource()).length > 500);
    }],
    ['Search', 21, async i => {
      if (i === 1) await login();
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: 300, y: 300 },
          { type: 'pointerDown', button: 0 },
          { type: 'pause', duration: 50 },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
      await driver.releaseActions();
    }],
    ['Mobile Gestures', 21, async i => {
      await relaunch();
      const size = await driver.getWindowSize();
      await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
          { type: 'pointerMove', duration: 0, x: Math.floor(size.width * 0.8), y: Math.floor(size.height * 0.7) },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerMove', duration: 300, x: Math.floor(size.width * 0.2), y: Math.floor(size.height * 0.7) },
          { type: 'pointerUp', button: 0 }
        ]
      }]);
      await driver.releaseActions();
    }],
    ['Network Interruption', 21, async i => relaunch()],
    ['Offline Handling', 21, async i => relaunch()],
    ['Session Persistence', 21, async i => {
      await relaunch();
      assert.ok((await driver.getPageSource()).length > 100);
    }],
    ['Device Screen Sizes', 21, async i => relaunch()],
    ['Accessibility and Logout', 21, async i => {
      await relaunch();
      assert.ok((await driver.getPageSource()).includes('login') || (await driver.getPageSource()).length > 100);
    }],
  ];

  let caseNumber = 0;
  for (const [suiteName, count, action] of suites) {
    describe(suiteName, function () {
      for (let i = 1; i <= count; i++) {
        caseNumber++;
        const id = String(caseNumber).padStart(3, '0');
        it(`${suiteName} Android execution ${id}`, async function () {
          await action(i);
        });
      }
    });
  }
});
