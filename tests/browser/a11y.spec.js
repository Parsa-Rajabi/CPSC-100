// Accessibility: real buttons with names, labelled cards, a live narration, visible focus,
// highlights that do not rely on colour alone, and readable contrast.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  ALGOS, openDemo, tick, tabKey, settleAnimations, lowContrast, chooseAlgo, chooseMode, chooseDeal, readTable, untilWaiting
} = require('./helpers');

let errors;
test.beforeEach(async ({ page }) => {
  errors = await openDemo(page);
});
test.afterEach(() => {
  expect(errors, 'console errors or page errors').toEqual([]);
});

test('document structure', async ({ page }) => {
  await expect(page).toHaveTitle('Card Demos | CPSC 100');
  expect(await page.getAttribute('html', 'lang')).toBe('en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Card Demos');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('header')).toHaveCount(1);
  const site = page.getByRole('navigation', { name: 'Course site' });
  await expect(site.getByRole('link', { name: 'Course schedule' })).toHaveAttribute('href', '../#/schedule');
  await expect(site.getByRole('link', { name: 'Back to course site' })).toHaveAttribute('href', '../');
  await expect(page.getByRole('region', { name: 'Card table' })).toBeVisible();
});

test('every control is a button or link with a name', async ({ page }) => {
  for (const mode of ['watch', 'try']) {
    await chooseMode(page, mode);
    for (const key of ALGOS) {
      await chooseAlgo(page, key);
      const unnamed = await page.evaluate(() => [...document.querySelectorAll('button, a, [tabindex]')]
        .filter((el) => el.offsetParent)
        .filter((el) => !(el.getAttribute('aria-label') || el.textContent).trim())
        .map((el) => el.outerHTML.slice(0, 80)));
      expect(unnamed, mode + ' ' + key).toEqual([]);
      const fake = await page.evaluate(() => [...document.querySelectorAll('[onclick], div[tabindex], span[tabindex]')].length);
      expect(fake).toBe(0);
    }
  }
});

test('selected tab, mode, speed and deal are announced with aria-pressed', async ({ page }) => {
  await chooseAlgo(page, 'bubble');
  await expect(page.getByRole('button', { name: 'Bubble sort', pressed: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Insertion sort', pressed: false })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Watch', pressed: true })).toBeVisible();
  // The speed slider says its value in words.
  await page.locator('.speed-input:visible').fill('1');
  await expect(page.locator('.speed-input:visible')).toHaveAttribute('aria-valuetext', 'half speed');
  await chooseDeal(page, 'Nearly sorted');
  await expect(page.getByRole('button', { name: 'Nearly sorted', pressed: true })).toBeVisible();
});

test('cards are labelled: "5 of hearts", "face-down card 3", and their state', async ({ page }) => {
  // Linear search, watch mode: face down, not in the tab order.
  let t = await readTable(page);
  expect(t.cards.map((c) => c.label)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => 'face-down card ' + n));
  expect(t.cards.every((c) => c.tabIndex === -1)).toBe(true);
  await expect(page.getByRole('img', { name: 'Target: 5 of clubs' })).toBeVisible();
  await page.keyboard.press('ArrowRight');
  t = await readTable(page);
  expect(t.cards[0].label).toBe('8 of clubs, being checked');
  expect(t.cards[1].label).toBe('face-down card 2');

  await chooseAlgo(page, 'binary');
  for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowRight');
  t = await readTable(page);
  expect(t.cards[0].label).toBe('face-down card 1, ruled out');
  expect(t.cards[4].label).toBe('5 of clubs, ruled out');

  await chooseAlgo(page, 'selection');
  for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');
  t = await readTable(page);
  expect(t.cards.map((c) => c.label)).toContain('ace of hearts, being checked, smallest so far');
  for (let i = 0; i < 9; i++) await page.keyboard.press('ArrowRight');
  t = await readTable(page);
  expect(t.cards[0].label).toMatch(/^ace of hearts, .*sorted$/);
});

test('in Try it, pickable cards are tab stops in left-to-right order', async ({ page, browserName }) => {
  await chooseMode(page, 'try');
  await chooseDeal(page, 'Lecture deal');
  await untilWaiting(page);
  const t = await readTable(page);
  expect(t.cards.every((c) => c.tabIndex === 0 && c.disabled === null)).toBe(true);
  await page.locator('#row .card').first().focus();
  const visited = [];
  for (let i = 0; i < 9; i++) {
    visited.push(await page.evaluate(() => document.activeElement.dataset.id));
    await page.keyboard.press(tabKey(browserName));
  }
  expect(visited).toEqual(t.order);
  // While the algorithm plays on its own, cards say they are not available.
  await page.locator('#row .card[data-id="c8"]').focus();
  await tick(page, 300);
  await page.keyboard.press('Enter');
  const moving = await readTable(page);
  expect(moving.cards.every((c) => c.disabled === 'true') || moving.waiting).toBe(true);

  // Insertion and bubble use the Swap buttons, so their cards are not tab stops.
  await chooseAlgo(page, 'insertion');
  expect((await readTable(page)).cards.every((c) => c.tabIndex === -1)).toBe(true);
});

test('the narration is a polite live region that changes on every step', async ({ page }) => {
  await expect(page.locator('#narration')).toHaveAttribute('aria-live', 'polite');
  for (const key of ALGOS) {
    await chooseAlgo(page, key);
    let prev = (await readTable(page)).narration;
    for (let i = 0; i < 60; i++) {
      const before = (await readTable(page)).c;
      await page.keyboard.press('ArrowRight');
      const t = await readTable(page);
      if (t.c === before) break; // the end
      expect(t.narration, key + ' step ' + t.c).not.toBe(prev);
      prev = t.narration;
    }
  }
});

test('focus is always visible', async ({ page, browserName }) => {
  for (const mode of ['watch', 'try']) {
    await chooseMode(page, mode);
    await page.locator('body').click({ position: { x: 2, y: 300 } });
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    const seen = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press(tabKey(browserName));
      const f = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        return { name: (el.getAttribute('aria-label') || el.textContent).trim().slice(0, 30), style: cs.outlineStyle, width: parseFloat(cs.outlineWidth) };
      });
      if (!f) break;
      seen.push(f.name);
      expect(f.style, mode + ': no focus ring on ' + f.name).not.toBe('none');
      expect(f.width, mode + ': thin focus ring on ' + f.name).toBeGreaterThanOrEqual(2);
    }
    expect(seen.length, mode).toBeGreaterThan(12);
  }
});

test('highlights do not rely on colour alone', async ({ page }) => {
  // Compared cards lift.
  await chooseAlgo(page, 'insertion');
  for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowRight');
  await settleAnimations(page);
  const lift = await page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('#row .card.is-focus')).transform).m42);
  expect(lift).toBeLessThan(-5);
  // Sorted cards get a bar along the bottom edge.
  for (let i = 0; i < 60; i++) await page.keyboard.press('ArrowRight');
  const bar = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector('#row .card.is-sorted .front'), '::after');
    return { content: cs.content, height: parseFloat(cs.height) };
  });
  expect(bar.content).not.toBe('none');
  expect(bar.height).toBeGreaterThanOrEqual(4);
  // Ruled-out cards shrink and fade.
  await chooseAlgo(page, 'binary');
  for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowRight');
  await settleAnimations(page);
  const out = await page.evaluate(() => {
    const cs = getComputedStyle(document.querySelector('#row .card.is-out'));
    return { opacity: parseFloat(cs.opacity), scale: new DOMMatrix(cs.transform).a };
  });
  expect(out.opacity).toBeLessThan(0.5);
  expect(out.scale).toBeLessThan(1);
  // The smallest card so far carries a text tag.
  await chooseAlgo(page, 'selection');
  for (let i = 0; i < 2; i++) await page.keyboard.press('ArrowRight');
  await settleAnimations(page);
  const tag = page.locator('#row .slot.is-marked .tag .long');
  await expect(tag).toHaveText('smallest so far');
  expect(await tag.evaluate((el) => getComputedStyle(el.parentElement).opacity)).toBe('1');
  // The current pseudocode line has an arrow and aria-current.
  const line = page.locator('#code .code-line.is-active');
  await expect(line).toHaveAttribute('aria-current', 'step');
  expect(await line.locator('.arrow').evaluate((el) => getComputedStyle(el).visibility)).toBe('visible');
  // A wrong answer is marked with words, not just colour.
  await chooseMode(page, 'try');
  await chooseAlgo(page, 'bubble');
  await untilWaiting(page);
  await tick(page, 300);
  const { answer } = await page.evaluate(() => {
    const E = window.CardEngine;
    const ids = [...document.querySelectorAll('#row .slot')].map((s) => s.dataset.id);
    return E.run('bubble', ids.map((id) => E.makeCard(Number(id.slice(1)), 'hearts'))).find((s) => s.ask).ask;
  });
  await page.locator(answer ? '#btn-noswap' : '#btn-swap').click();
  expect((await readTable(page)).narration).toMatch(/^Not quite/);
});

test('text contrast meets WCAG AA in every state', async ({ page }) => {
  for (const mode of ['watch', 'try']) {
    await chooseMode(page, mode);
    for (const key of ALGOS) {
      await chooseAlgo(page, key);
      for (let i = 0; i < 3; i++) {
        await settleAnimations(page);
        expect(await lowContrast(page), mode + ' ' + key).toEqual([]);
        if (mode === 'watch') for (let k = 0; k < 3; k++) await page.keyboard.press('ArrowRight');
        else await tick(page, 2500);
      }
    }
  }
  // The wrong-move message and the finish panel too.
  await chooseAlgo(page, 'insertion');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-show').click();
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-swap').click();
  await page.locator('#btn-noswap').click({ force: true });
  expect(await lowContrast(page), 'feedback').toEqual([]);
});
