// Light and dark on the course site. Every link on every page must look like a link: blue,
// underlined, and 4.5:1 against what is behind it, in both themes. The Dark mode switch must
// change the theme at once, remember the choice, and otherwise follow the device. These read
// the computed styles, so a change to custom.css, theme.css or the docsify theme on its CDN
// that hides links fails here. Docsify loads from public CDNs, so these need the network.
'use strict';

const { test, expect } = require('@playwright/test');
const { openSite, goTo } = require('./helpers');

test.describe.configure({ retries: 1 }); // a slow CDN should not fail the run

const LINK = { light: 'rgb(0, 85, 183)', dark: 'rgb(111, 177, 231)' }; // #0055B7, #6FB1E7

const theme = (page) => page.evaluate(() => document.documentElement.getAttribute('data-theme'));
const stored = (page) => page.evaluate(() => localStorage.getItem('cpsc100.theme'));
const dark = (page) => page.getByRole('switch', { name: 'Dark mode' });

// Runs in the page. For each link the selector finds, report what is wrong with it: no
// underline (when required), not blue (when required), or under 4.5:1 against the colour
// actually behind it, with see-through layers blended the way the browser draws them.
function auditLinks({ selector, underline, blue }) {
  function parse(text) {
    let m = /^rgba?\(([^)]+)\)$/.exec(text);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    m = /^color\(srgb ([^)]+)\)$/.exec(text);
    if (m) {
      const p = m[1].split(/[\s/]+/).filter(Boolean).map(Number);
      return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 };
    }
    return null;
  }
  const over = (top, under) => ({
    r: top.a * top.r + (1 - top.a) * under.r,
    g: top.a * top.g + (1 - top.a) * under.g,
    b: top.a * top.b + (1 - top.a) * under.b,
    a: 1
  });
  function behind(el) {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) {
        layers.push(c);
        if (c.a >= 1) break;
      }
    }
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    let colour = dark ? { r: 18, g: 18, b: 18, a: 1 } : { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) colour = over(layers[i], colour);
    return colour;
  }
  function luminance({ r, g, b }) {
    const lin = (v) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }
  function hsl({ r, g, b }) {
    const [rr, gg, bb] = [r / 255, g / 255, b / 255];
    const max = Math.max(rr, gg, bb);
    const min = Math.min(rr, gg, bb);
    const l = (max + min) / 2;
    const d = max - min;
    if (d === 0) return { h: 0, s: 0, l };
    const s = d / (1 - Math.abs(2 * l - 1));
    let h = max === rr ? ((gg - bb) / d) % 6 : max === gg ? (bb - rr) / d + 2 : (rr - gg) / d + 4;
    return { h: (h * 60 + 360) % 360, s, l };
  }

  const problems = [];
  let checked = 0;
  for (const a of document.querySelectorAll(selector)) {
    const text = a.textContent.replace(/\s+/g, ' ').trim();
    if (!text) continue; // an image link
    // Heading anchors, PREV and NEXT, and buttons are controls, not links in the text.
    if (a.closest('h1, h2, h3, h4, h5, h6, .docsify-pagination-container, .badge') || a.matches('.button, .navpill')) continue;
    checked++;
    const style = getComputedStyle(a);
    const name = '"' + text.slice(0, 40) + '"';
    if (underline && !style.textDecorationLine.includes('underline')) {
      problems.push(name + ' is not underlined');
    }
    const bg = behind(a);
    let fg = parse(style.color);
    if (!fg) {
      problems.push(name + ' has a colour this test cannot read: ' + style.color);
      continue;
    }
    if (fg.a < 1) fg = over(fg, bg);
    const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
    const ratio = (hi + 0.05) / (lo + 0.05);
    if (ratio < 4.5) {
      problems.push(name + ' is ' + ratio.toFixed(2) + ':1 (' + style.color + ' on rgb(' +
        [bg.r, bg.g, bg.b].map(Math.round).join(', ') + '))');
    }
    // Links in notes, tips and quotes take the box's own colour, on purpose (custom.css).
    if (blue && !a.closest('.alert, .callout, .markdown-alert, blockquote')) {
      const { h, s, l } = hsl(fg);
      if (!(h >= 195 && h <= 235 && s >= 0.5 && l >= 0.25 && l <= 0.75)) {
        problems.push(name + ' is not blue: ' + style.color);
      }
    }
  }
  return { checked, problems };
}

for (const device of ['light', 'dark']) {
  test(device + ' theme: every link on every page is blue, underlined and 4.5:1', async ({ page }) => {
    test.setTimeout(180_000);
    const errors = await openSite(page, { device });
    expect(await theme(page)).toBe(device);
    const routes = await page.locator('.sidebar-nav a[href^="#/"]').evaluateAll((as) =>
      [...new Set(as.map((a) => a.getAttribute('href').split('?')[0]))]);
    expect(routes.length).toBeGreaterThan(10);

    let checked = 0;
    const problems = [];
    for (const route of routes) {
      await goTo(page, route);
      const report = await page.evaluate(auditLinks, { selector: '.markdown-section a', underline: true, blue: true });
      checked += report.checked;
      problems.push(...report.problems.map((p) => route + ': ' + p));
    }
    expect(problems).toEqual([]);
    expect(checked, 'links checked').toBeGreaterThan(300);
    expect(errors).toEqual([]);
  });

  test(device + ' theme: sidebar and top menu links are 4.5:1', async ({ page }) => {
    await openSite(page, { device, hash: '#/project-2' });
    const report = await page.evaluate(auditLinks, { selector: '.sidebar-nav a, .app-nav a', underline: false, blue: false });
    expect(report.problems).toEqual([]);
    expect(report.checked).toBeGreaterThan(20);
  });
}

test('the body link colour is the one custom.css sets, in both themes', async ({ page }) => {
  await openSite(page, { hash: '#/project-2' });
  const first = page.locator('.markdown-section > ul a').first();
  await expect(first).toHaveCSS('color', LINK.light);
  await expect(first).toHaveCSS('text-decoration-line', 'underline');
  await dark(page).click();
  await expect(first).toHaveCSS('color', LINK.dark);
  await expect(first).toHaveCSS('text-decoration-line', 'underline');
});

test('the Dark mode switch sits under the search box and changes the theme at once', async ({ page }) => {
  const errors = await openSite(page, { hash: '#/project-2' });
  const toggle = dark(page);
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  const search = await page.locator('.sidebar .search').boundingBox();
  const box = await toggle.boundingBox();
  const nav = await page.locator('.sidebar-nav a').first().boundingBox();
  expect(box.y).toBeGreaterThanOrEqual(search.y + search.height - 1);
  expect(box.y + box.height).toBeLessThanOrEqual(nav.y);
  expect(box.height).toBeGreaterThanOrEqual(44);

  const htmlBg = () => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  const lightBg = await htmlBg();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  expect(await theme(page)).toBe('dark');
  expect(await htmlBg()).not.toBe(lightBg);
  expect(await page.evaluate(() => document.getElementById('theme-dark').media)).toBe('all');
  expect(await stored(page)).toBe('dark');

  // Remembered after a reload, with no flash of light: the theme is set before docsify draws.
  await page.reload();
  await expect(page.locator('.markdown-section h1').first()).toBeVisible({ timeout: 20000 });
  expect(await theme(page)).toBe('dark');
  await expect(dark(page)).toHaveAttribute('aria-checked', 'true');

  // Back to light, which is this device's setting, so the site follows the device again.
  await dark(page).click();
  expect(await theme(page)).toBe('light');
  expect(await stored(page)).toBe(null);
  expect(errors).toEqual([]);
});

test('Space and Enter flip the switch, and keyboard focus is visible', async ({ page }) => {
  await openSite(page);
  const toggle = dark(page);
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  // Playwright's focus() does not always count as keyboard focus, so press Tab back onto it.
  await page.locator('.sidebar .search input').focus();
  for (let i = 0; i < 4 && !(await toggle.evaluate((el) => el === document.activeElement)); i++) {
    await page.keyboard.press(test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
  }
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveCSS('outline-style', 'solid');
});

test('with no saved choice, the site follows the device setting as it changes', async ({ page }) => {
  await openSite(page, { device: 'dark' });
  expect(await theme(page)).toBe('dark');
  await expect(dark(page)).toHaveAttribute('aria-checked', 'true');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect.poll(() => theme(page)).toBe('light');
  await expect(dark(page)).toHaveAttribute('aria-checked', 'false');
});

test('a saved choice outlasts a change in the device setting', async ({ page }) => {
  await openSite(page);
  await dark(page).click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  expect(await theme(page)).toBe('dark');
  await expect(dark(page)).toHaveAttribute('aria-checked', 'true');
});

test('the switch is added once, and stays as students move between pages', async ({ page }) => {
  await openSite(page);
  for (const route of ['#/schedule', '#/project-2', '#/communication', '#/syllabus']) {
    await goTo(page, route);
  }
  await expect(page.locator('.theme-switch')).toHaveCount(1);
  await dark(page).click();
  await goTo(page, '#/schedule');
  expect(await theme(page)).toBe('dark');
});

test('without storage (a private window that blocks it) the site opens and the switch works', async ({ page }) => {
  const errors = await openSite(page, {
    init: () => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } })
  });
  await dark(page).click();
  expect(await theme(page)).toBe('dark');
  await expect(dark(page)).toHaveAttribute('aria-checked', 'true');
  expect(errors).toEqual([]);
});

test('the Communication flowchart redraws in the new theme', async ({ page }) => {
  await openSite(page, { hash: '#/communication' });
  const edge = page.locator('.mermaid svg .flowchart-link').first();
  await expect(edge).toHaveCSS('stroke', 'rgb(94, 106, 113)', { timeout: 20000 }); // #5E6A71
  await dark(page).click();
  await expect(edge).toHaveCSS('stroke', 'rgb(178, 180, 180)', { timeout: 20000 }); // #B2B4B4
});
