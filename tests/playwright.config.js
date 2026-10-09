// Browser tests for the Card Demos page. Run: npm run test:browser
'use strict';

const fs = require('node:fs');
const { defineConfig, devices } = require('@playwright/test');
const { chromium, firefox, webkit } = require('playwright-core');

const PORT = 4173;

// Firefox and WebKit (Safari) run the behaviour tests too, once installed with
// `npx playwright install firefox webkit`. Screenshots are compared in Chromium only.
const installed = (browser) => {
  try {
    return fs.existsSync(browser.executablePath());
  } catch (err) {
    return false;
  }
};
const others = [
  ['firefox', firefox, devices['Desktop Firefox']],
  ['webkit', webkit, devices['Desktop Safari']]
].filter(([, browser]) => installed(browser)).map(([name, , device]) => ({
  name,
  use: { ...device },
  testIgnore: /visual\.spec/
}));

module.exports = defineConfig({
  testDir: 'browser',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: true,
  reporter: [['list']],
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixels: 10 }
  },
  use: {
    baseURL: 'http://127.0.0.1:' + PORT,
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'node serve.js ' + PORT,
    url: 'http://127.0.0.1:' + PORT + '/demos/cards.html',
    reuseExistingServer: false
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...others
  ]
});
