// The course site around the demo: docsify still works, the sidebar link opens the page
// in the same tab, and the page links back. Docsify loads from public CDNs, so these
// tests need the network.
'use strict';

const { test, expect } = require('@playwright/test');
const { useLocalFonts } = require('./helpers');

test.describe.configure({ retries: 1 }); // a slow CDN should not fail the run

async function openSite(page, hash) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  await useLocalFonts(page);
  await page.goto('/' + (hash || '#/'));
  await expect(page.locator('.markdown-section h1').first()).toBeVisible({ timeout: 20000 });
  return errors;
}

test('the course site still opens on the syllabus, with the demo link after Schedule', async ({ page }) => {
  const errors = await openSite(page);
  await expect(page.locator('.markdown-section h1').first()).toHaveText('CPSC 100 - Course Syllabus');
  // docsify wraps the top-level sidebar links in <p> (the list has blank lines between groups)
  const items = await page.locator('.sidebar-nav > ul > li > p > a, .sidebar-nav > ul > li > a').allTextContents();
  expect(items.slice(0, 4)).toEqual(['Syllabus', 'Schedule', 'Card Demos', 'AI Policy']);
  const link = page.locator('.sidebar-nav a', { hasText: 'Card Demos' });
  await expect(link).toHaveAttribute('href', 'demos/cards.html'); // not rewritten to #/...
  await expect(link).toHaveAttribute('target', '_self');
  await expect(page.locator('input[type="search"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('the sidebar link opens the demo in the same tab, and Back to course site returns', async ({ page, context }) => {
  await openSite(page);
  const pages = context.pages().length;
  await page.locator('.sidebar-nav a', { hasText: 'Card Demos' }).click();
  await expect(page).toHaveURL(/\/demos\/cards\.html$/);
  await expect(page.locator('h1')).toHaveText('Card Demos');
  expect(context.pages().length).toBe(pages);
  await page.getByRole('link', { name: 'Back to course site' }).click();
  await expect(page).toHaveURL(/\/(#\/)?$/);
  await expect(page.locator('.markdown-section h1').first()).toHaveText('CPSC 100 - Course Syllabus', { timeout: 20000 });
});

test('Course schedule opens the Schedule page in the same tab', async ({ page, context }) => {
  await useLocalFonts(page);
  await page.goto('/demos/cards.html');
  const pages = context.pages().length;
  await page.getByRole('link', { name: 'Course schedule' }).click();
  await expect(page).toHaveURL(/\/#\/schedule$/);
  await expect(page.locator('.markdown-section h1').first()).toHaveText(/Schedule/, { timeout: 20000 });
  expect(context.pages().length).toBe(pages);
});

test('every page in the sidebar still renders', async ({ page }) => {
  const errors = await openSite(page);
  const routes = await page.locator('.sidebar-nav a[href^="#/"]').evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute('href').split('?')[0]))]);
  expect(routes.length).toBeGreaterThan(10);
  for (const route of routes) {
    await page.goto('/' + route);
    const section = page.locator('.markdown-section');
    await expect(section.locator('h1').first(), route).toBeVisible({ timeout: 20000 });
    await expect(section, route).not.toContainText('404 - Not found');
  }
  expect(errors).toEqual([]);
});

test('the Schedule page\'s NEXT link leads to the demo', async ({ page }) => {
  await openSite(page, '#/schedule');
  const next = page.locator('.docsify-pagination-container .pagination-item--next a');
  await expect(next).toContainText('Card Demos');
  await next.click();
  await expect(page).toHaveURL(/\/demos\/cards\.html$/);
  await expect(page.locator('h1')).toHaveText('Card Demos');
});
