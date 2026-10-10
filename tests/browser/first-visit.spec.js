// The first visit, blocked storage, and a stale engine. Separate from hci.spec.js, whose
// setup plays a returning visitor (init scripts add up across a page's loads).
'use strict';

const { test, expect } = require('@playwright/test');
const { openDemo } = require('./helpers');

test.describe('first visit', () => {
  test('a first visit offers the tour; No thanks is remembered', async ({ page }) => {
    await openDemo(page, { intro: true });
    await expect(page.locator('#intro')).toBeVisible();
    await page.locator('#btn-intro-dismiss').click();
    await expect(page.locator('#intro')).toBeHidden();
    await expect(page.locator('#btn-tour')).toBeFocused();
    await page.reload();
    await expect(page.locator('#intro')).toBeHidden();
  });

  test('Take the tour starts it, and finishing it is remembered too', async ({ page }) => {
    await openDemo(page, { intro: true });
    await page.locator('#btn-intro-tour').click();
    await expect(page.locator('#tour')).toBeVisible();
    await expect(page.locator('#intro')).toBeHidden();
    await page.keyboard.press('Escape');
    await page.reload();
    await expect(page.locator('#intro')).toBeHidden();
  });

  test('without storage (a private window that blocks it) the page still works', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
    });
    await openDemo(page, { intro: true });
    await expect(page.locator('#intro')).toBeVisible();
    await page.keyboard.press('+');
    await expect(page.locator('.speed-out:visible')).toHaveText('×1.5');
    await page.locator('#btn-intro-dismiss').click();
    await expect(page.locator('#intro')).toBeHidden();
  });
});

test.describe('a stale or missing engine', () => {
  test('a cached older engine is refused, with a message instead of a broken page', async ({ page }) => {
    const fs = require('node:fs');
    const path = require('node:path');
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'docs', 'demos', 'cards-engine.js'), 'utf8')
      .replace(/VERSION: \d+/, 'VERSION: 1');
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    await page.route('**/cards-engine.js*', (route) => route.fulfill({ body: src, contentType: 'text/javascript' }));
    await page.goto('/demos/cards.html');
    await expect(page.locator('#narration')).toHaveText(/could not load/);
    expect(pageErrors).toEqual([]);
  });

  test('a missing engine gives the same message', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    await page.route('**/cards-engine.js*', (route) => route.fulfill({ status: 404, body: '' }));
    await page.goto('/demos/cards.html');
    await expect(page.locator('#narration')).toHaveText(/could not load/);
    expect(pageErrors).toEqual([]);
  });
});
