// Hide and Show on the Note, Tip, Warning and Attention boxes (docs/assets/js/notes.js). Every
// box gets a button on its title line. Hiding a box shrinks it to one line, and it stays hidden
// on later visits until it is shown again or we edit its text. The button must work by keyboard,
// be easy to hit, and read at 4.5:1 in both themes. Docsify loads from public CDNs, so these
// need the network.
'use strict';

const { test, expect } = require('@playwright/test');
const { openSite, goTo, tabKey } = require('./helpers');

test.describe.configure({ retries: 1 }); // a slow CDN should not fail the run

const KEY = 'cpsc100.hiddenNotes';
const saved = (page) => page.evaluate((k) => JSON.parse(localStorage.getItem(k)), KEY);
const boxes = (page) => page.locator('.markdown-section .alert');
const toggleOf = (box) => box.locator('.note-toggle');
const reload = async (page) => {
  await page.reload();
  await expect(page.locator('.markdown-section h1').first()).toBeVisible({ timeout: 20000 });
};

// On the Labs page: Note, Warning, Note.
const LABS_WARNING = 'You must attend at least 7 of the 9 graded labs to pass this course.';

test('every box on every page gets a Hide button and starts open', async ({ page }) => {
  test.setTimeout(120_000);
  const errors = await openSite(page);
  const routes = await page.locator('.sidebar-nav a[href^="#/"]').evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute('href').split('?')[0]))]);

  let total = 0;
  const problems = [];
  for (const route of routes) {
    await goTo(page, route);
    const report = await page.evaluate(() => [...document.querySelectorAll('.markdown-section .alert')].map((box) => {
      const button = box.querySelector(':scope > .title > .note-toggle');
      const body = box.querySelector(':scope > .note-body');
      if (!button || !body) return 'no Hide button: ' + box.textContent.trim().slice(0, 40);
      if (button.getAttribute('aria-expanded') !== 'true' || body.hidden) return 'starts hidden: ' + box.textContent.trim().slice(0, 40);
      if (button.getAttribute('aria-controls') !== body.id) return 'aria-controls does not match';
      return '';
    }));
    total += report.length;
    problems.push(...report.filter(Boolean).map((p) => route + ': ' + p));
  }
  expect(problems).toEqual([]);
  expect(total, 'boxes checked').toBeGreaterThan(40);
  expect(errors).toEqual([]);
});

test('Hide shrinks a box to one line, and it stays hidden after a reload and a page change', async ({ page }) => {
  const errors = await openSite(page, { hash: '#/labs' });
  const warning = boxes(page).nth(1);
  const button = toggleOf(warning);
  await expect(button).toHaveAccessibleName('Warning');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(warning.locator('.note-action')).toHaveText('Hide');
  const open = await warning.boundingBox();

  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(warning.locator('.note-body')).toBeHidden();
  await expect(warning.locator('.note-preview')).toBeVisible();
  await expect(warning.locator('.note-preview')).toHaveText(LABS_WARNING);
  await expect(warning.locator('.note-action')).toHaveText('Show');
  // While hidden, a screen reader still hears what the box is about.
  await expect(button).toHaveAccessibleName('Warning ' + LABS_WARNING);
  const shut = await warning.boundingBox();
  expect(shut.height).toBeLessThan(60);
  expect(shut.height).toBeLessThan(open.height);

  // Only this box is hidden, and only on this page.
  const stored = await saved(page);
  expect(Object.keys(stored)).toEqual(['/labs']);
  expect(stored['/labs']).toHaveLength(1);
  await expect(toggleOf(boxes(page).nth(0))).toHaveAttribute('aria-expanded', 'true');
  await expect(toggleOf(boxes(page).nth(2))).toHaveAttribute('aria-expanded', 'true');

  await reload(page);
  await expect(toggleOf(boxes(page).nth(1))).toHaveAttribute('aria-expanded', 'false');
  await goTo(page, '#/quizzes');
  await goTo(page, '#/labs');
  await expect(toggleOf(boxes(page).nth(1))).toHaveAttribute('aria-expanded', 'false');

  // Show brings it back, and nothing is left saved.
  await toggleOf(boxes(page).nth(1)).click();
  await expect(boxes(page).nth(1).locator('.note-body')).toBeVisible();
  await expect(toggleOf(boxes(page).nth(1))).toHaveAccessibleName('Warning');
  expect(await saved(page)).toBe(null);
  expect(errors).toEqual([]);
});

test('a box we edited opens again for a student who had hidden it', async ({ page }) => {
  // "old" stands for the id of a box whose text has since changed.
  await openSite(page, {
    hash: '#/labs',
    init: () => localStorage.setItem('cpsc100.hiddenNotes', JSON.stringify({ '/labs': ['old'], '/final': ['kept'] }))
  });
  await expect(page.locator('.alert.is-minimized')).toHaveCount(0);
  expect(await saved(page)).toEqual({ '/final': ['kept'] });
});

test('the whole title line takes the click, and it is at least 44px tall', async ({ page }) => {
  await openSite(page, { hash: '#/labs' });
  const warning = boxes(page).nth(1);
  const box = await warning.boundingBox();
  const hit = await toggleOf(warning).boundingBox();
  expect(hit.height).toBeGreaterThanOrEqual(44);
  expect(Math.abs(hit.width - box.width)).toBeLessThanOrEqual(4);
  expect(Math.abs(hit.y - box.y)).toBeLessThanOrEqual(2);

  // The top right corner, inside the box's padding, still hides it.
  await page.mouse.click(box.x + box.width - 6, box.y + 6);
  await expect(toggleOf(warning)).toHaveAttribute('aria-expanded', 'false');
});

test('Enter and Space work, and keyboard focus is visible', async ({ page, browserName }) => {
  await openSite(page, { hash: '#/labs' });
  const button = toggleOf(boxes(page).nth(1));

  // Focus what comes just before the button, then Tab onto it, so focus counts as keyboard focus.
  await button.evaluate((target) => {
    const all = [...document.querySelectorAll('a[href], button, input')].filter((el) => el.getClientRects().length);
    all[all.indexOf(target) - 1].focus();
  });
  await page.keyboard.press(tabKey(browserName));
  await expect(button).toBeFocused();
  await expect(button).toHaveCSS('outline-style', 'solid');
  await expect(button).toHaveCSS('outline-width', '2px');

  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Space');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
});

// Runs in the page: the contrast of the title, preview and Hide or Show text in every box,
// against the box's own background blended onto the page.
function noteContrast() {
  const parse = (c) => {
    const p = /rgba?\(([^)]+)\)/.exec(c)[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (top, under) => ({
    r: top.a * top.r + (1 - top.a) * under.r,
    g: top.a * top.g + (1 - top.a) * under.g,
    b: top.a * top.b + (1 - top.a) * under.b,
    a: 1
  });
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const page = parse(getComputedStyle(document.body).backgroundColor);
  const out = [];
  for (const box of document.querySelectorAll('.markdown-section .alert')) {
    const bg = over(parse(getComputedStyle(box).backgroundColor), { ...page, a: 1 });
    for (const part of box.querySelectorAll('.note-label, .note-preview, .note-action')) {
      if (!part.getClientRects().length) continue;
      const fg = over(parse(getComputedStyle(part).color), bg);
      const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
      out.push({ text: box.className + ' ' + part.className, ratio: (hi + 0.05) / (lo + 0.05) });
    }
  }
  return out;
}

for (const device of ['light', 'dark']) {
  test(device + ' theme: every kind of box reads at 4.5:1, open and hidden', async ({ page }) => {
    await openSite(page, { device, hash: '#/project-1' });
    const kinds = await boxes(page).evaluateAll((all) => [...new Set(all.map((b) => b.classList[2]))].sort());
    expect(kinds).toEqual(['attention', 'note', 'tip', 'warning']);

    // Some boxes sit in collapsed sections (Part A, Part B), so open those first.
    await page.evaluate(() => document.querySelectorAll('.markdown-section details').forEach((d) => { d.open = true; }));
    const open = await page.evaluate(noteContrast);
    await page.locator('.note-toggle').evaluateAll((all) => all.forEach((b) => b.click()));
    await expect(page.locator('.alert:not(.is-minimized)')).toHaveCount(0);
    const hidden = await page.evaluate(noteContrast);

    const all = open.concat(hidden);
    expect(all.length).toBeGreaterThan(40);
    expect(all.filter((c) => c.ratio < 4.5).map((c) => c.text + ' ' + c.ratio.toFixed(2))).toEqual([]);
  });
}

test('on a phone, a hidden box is one line and its title is never squeezed', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await openSite(page, { hash: '#/final' });
  await page.locator('.note-toggle').evaluateAll((all) => all.forEach((b) => b.click()));
  const report = await boxes(page).evaluateAll((all) => all.map((box) => {
    const label = box.querySelector('.note-label');
    const line = parseFloat(getComputedStyle(label).lineHeight) || 24;
    return {
      label: label.textContent,
      labelWraps: label.getBoundingClientRect().height > line * 1.5,
      tall: box.getBoundingClientRect().height > 60
    };
  }));
  expect(report.length).toBeGreaterThan(3);
  expect(report.filter((r) => r.labelWraps || r.tall)).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});

test('a printed page shows every box in full', async ({ page }) => {
  await openSite(page, { hash: '#/labs' });
  const warning = boxes(page).nth(1);
  await toggleOf(warning).click();
  await expect(warning.locator('.note-body')).toBeHidden();
  await page.emulateMedia({ media: 'print' });
  await expect(warning.locator('.note-body')).toBeVisible();
  await expect(warning.locator('.note-preview')).toBeHidden();
  await expect(warning.locator('.note-action')).toBeHidden();
});

test('without storage (a private window that blocks it) hiding still works for the visit', async ({ page }) => {
  const errors = await openSite(page, {
    hash: '#/labs',
    init: () => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } })
  });
  await toggleOf(boxes(page).nth(1)).click();
  await expect(toggleOf(boxes(page).nth(1))).toHaveAttribute('aria-expanded', 'false');
  await goTo(page, '#/quizzes');
  await goTo(page, '#/labs');
  await expect(toggleOf(boxes(page).nth(1))).toHaveAttribute('aria-expanded', 'false');
  expect(errors).toEqual([]);
});
