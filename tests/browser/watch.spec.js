// Watch mode: stepping, playing, keys, deals, and clean resets.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  ALGOS, openDemo, tick, chooseAlgo, chooseMode, chooseDeal, chooseSpeed, readTable,
  engineSteps, expectTableMatches
} = require('./helpers');

let errors;
test.beforeEach(async ({ page }) => {
  errors = await openDemo(page);
});
test.afterEach(() => {
  expect(errors, 'console errors or page errors').toEqual([]);
});

test('opens on linear search, Watch mode, lecture deal', async ({ page }) => {
  const t = await readTable(page);
  await expect(page.locator('#tabs .tab[aria-pressed="true"]')).toHaveText(/Linear search/);
  await expect(page.locator('#mode-watch')).toHaveAttribute('aria-pressed', 'true');
  expect(t.order).toEqual(['c8', 'c3', 'c6', 'c1', 'c9', 'c5', 'c2', 'c7', 'c4']);
  expect(t.target).toBe('Target: 5 of clubs');
  expect(t.narration).toMatch(/Press Play or Next to start\.$/);
  expect(t.c).toBe('0 of 6');
});

for (const key of ALGOS) {
  test(key + ': every step matches the engine, forward to the end and back to step 0', async ({ page }) => {
    await chooseAlgo(page, key);
    const { steps } = await engineSteps(page, key);
    const last = steps.length - 1;
    for (let i = 0; i <= last; i++) {
      const t = await readTable(page);
      expectTableMatches(t, steps[i], 'forward step ' + i);
      expect(t.narration).toBe(steps[i].say + (i === 0 ? ' Press Play or Next to start.' : ''));
      expect(t.c).toBe(i + ' of ' + last);
      if (i < last) await page.locator('#btn-next').click();
    }
    await expect(page.locator('#btn-next')).toHaveAttribute('aria-disabled', 'true');
    await page.locator('#btn-next').click({ force: true }); // aria-disabled: does nothing at the end
    expect((await readTable(page)).c).toBe(last + ' of ' + last);
    for (let i = last; i >= 0; i--) {
      expectTableMatches(await readTable(page), steps[i], 'back step ' + i);
      if (i > 0) await page.locator('#btn-back').click();
    }
    await expect(page.locator('#btn-back')).toHaveAttribute('aria-disabled', 'true');
    await expect(page.locator('#btn-reset')).toHaveAttribute('aria-disabled', 'true');
  });
}

test('lecture-deal totals match the slides', async ({ page }) => {
  const expected = {
    linear: ['6', ''], binary: ['2', ''], selection: ['28', '5'], insertion: ['19', '13'], bubble: ['25', '13']
  };
  for (const key of ALGOS) {
    await chooseAlgo(page, key);
    for (let i = 0; i < 80; i++) await page.keyboard.press('ArrowRight');
    const t = await readTable(page);
    expect([t.a, key === 'linear' || key === 'binary' ? '' : t.b], key).toEqual(expected[key]);
  }
});

test('Reset goes back to step 0 from the middle', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  for (let i = 0; i < 7; i++) await page.locator('#btn-next').click();
  await page.locator('#btn-reset').click();
  const { steps } = await engineSteps(page, 'insertion');
  expectTableMatches(await readTable(page), steps[0], 'after reset');
});

test('Play steps on its own, Pause stops it, and it stops at the end', async ({ page }) => {
  await chooseAlgo(page, 'binary'); // 4 steps
  await chooseSpeed(page, 'fast'); // 600 ms a step
  await page.locator('#btn-play').click();
  await expect(page.locator('#btn-play')).toHaveText(/Pause/);
  expect((await readTable(page)).c).toBe('1 of 4'); // Play moves at once
  await tick(page, 600);
  expect((await readTable(page)).c).toBe('2 of 4');
  await page.locator('#btn-play').click(); // pause
  await expect(page.locator('#btn-play')).toHaveText(/Play/);
  await tick(page, 3000);
  expect((await readTable(page)).c).toBe('2 of 4');
  await page.locator('#btn-play').click();
  await tick(page, 5000);
  expect((await readTable(page)).c).toBe('4 of 4');
  await expect(page.locator('#btn-play')).toHaveText(/Play/);
  // Play at the end starts again from the beginning.
  await page.locator('#btn-play').click();
  expect((await readTable(page)).c).toBe('0 of 4');
  await tick(page, 600);
  expect((await readTable(page)).c).toBe('1 of 4');
});

test('each speed sets the time per step', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  for (const [speed, ms] of [['slow', 2000], ['normal', 1200], ['fast', 600]]) {
    await page.locator('#btn-reset').click({ force: true }); // aria-disabled at step 0
    await chooseSpeed(page, speed);
    await expect(page.locator('[data-speed="' + speed + '"]').first()).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#btn-play').click(); // to step 1
    await tick(page, ms - 50);
    expect((await readTable(page)).c, speed).toMatch(/^1 of/);
    await tick(page, 100);
    expect((await readTable(page)).c, speed).toMatch(/^2 of/);
    await page.locator('#btn-play').click();
  }
});

test('keys: Right and Page Down go next, Left and Page Up go back, Space plays and pauses', async ({ page }) => {
  await chooseAlgo(page, 'bubble');
  await page.locator('body').click({ position: { x: 5, y: 5 } }); // focus off the tab button
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('PageDown');
  expect((await readTable(page)).c).toMatch(/^2 of/);
  await page.keyboard.press('ArrowLeft');
  expect((await readTable(page)).c).toMatch(/^1 of/);
  await page.keyboard.press('PageUp');
  expect((await readTable(page)).c).toMatch(/^0 of/);
  await page.keyboard.press('PageUp'); // stays at 0
  expect((await readTable(page)).c).toMatch(/^0 of/);
  await page.keyboard.press('Space');
  await expect(page.locator('#btn-play')).toHaveText(/Pause/);
  await page.keyboard.press('Space');
  await expect(page.locator('#btn-play')).toHaveText(/Play/);
  // Page Down must not scroll the page.
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('Space after a mouse click on a deal button plays, instead of dealing again', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  await chooseDeal(page, 'New shuffle');
  const before = (await readTable(page)).order;
  await page.keyboard.press('Space');
  await expect(page.locator('#btn-play')).toHaveText(/Pause/);
  expect((await readTable(page)).order.length).toBe(8);
  await page.keyboard.press('Space');
  const t = await readTable(page);
  expect(t.c).toMatch(/^1 of/);
  // Same deal: the cards are the shuffle, one step in.
  const { steps } = await page.evaluate((ids) => {
    const E = window.CardEngine;
    return { steps: E.run('insertion', ids.map((id) => E.makeCard(Number(id.slice(1)), 'hearts'))) };
  }, before);
  expect(t.order).toEqual(steps[1].order);
});

test('Space on a button reached with Tab presses that button', async ({ page }) => {
  await chooseAlgo(page, 'selection');
  await page.locator('#btn-play').focus();
  await page.keyboard.press('Tab'); // to Next, as a keyboard user would
  await expect(page.locator('#btn-next')).toBeFocused();
  await page.keyboard.press('Space');
  expect((await readTable(page)).c).toMatch(/^1 of/);
  await expect(page.locator('#btn-play')).toHaveText(/Play/);
  await page.keyboard.press('Enter');
  expect((await readTable(page)).c).toMatch(/^2 of/);
});

test('keys do nothing in Try it mode', async ({ page }) => {
  await chooseMode(page, 'try');
  await chooseAlgo(page, 'insertion');
  const before = await readTable(page);
  await page.locator('body').click({ position: { x: 5, y: 5 } });
  for (const key of ['ArrowRight', 'PageDown', 'ArrowLeft', 'PageUp', 'Space']) await page.keyboard.press(key);
  const after = await readTable(page);
  expect(after.order).toEqual(before.order);
  expect(after.a).toBe(before.a);
  expect(after.c).toBe('0'); // no mistakes
});

test('switching algorithm, deal or mode while playing leaves no stray timers', async ({ page }) => {
  await chooseSpeed(page, 'fast');
  for (const change of [
    () => chooseAlgo(page, 'bubble'),
    () => chooseDeal(page, 'Nearly sorted'),
    () => chooseDeal(page, 'New shuffle'),
    () => chooseAlgo(page, 'binary')
  ]) {
    await page.locator('#btn-play').click();
    await tick(page, 700);
    await change();
    await tick(page, 5000);
    const t = await readTable(page);
    expect(t.c, 'the new run moved on its own').toMatch(/^0 of/);
    await expect(page.locator('#btn-play')).toHaveText(/Play/);
  }
  await page.locator('#btn-play').click();
  await chooseMode(page, 'try');
  await chooseMode(page, 'watch');
  await tick(page, 5000);
  expect((await readTable(page)).c).toMatch(/^0 of/);
});

test('deal buttons: lecture deal, nearly sorted, and new shuffles', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  const ids = (t) => t.order.map((id) => id.slice(1).replace(/^1$/, 'A')).join(' ');
  expect(ids(await readTable(page))).toBe('5 A 8 3 6 2 7 4');
  await expect(page.locator('#deals .btn', { hasText: 'Lecture deal' })).toHaveAttribute('aria-pressed', 'true');
  await chooseDeal(page, 'Nearly sorted');
  expect(ids(await readTable(page))).toBe('A 2 3 4 5 7 6 8');
  await expect(page.locator('#deals .btn', { hasText: 'Nearly sorted' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#deals .btn', { hasText: 'Lecture deal' })).toHaveAttribute('aria-pressed', 'false');
  const seen = new Set();
  let prev = '';
  for (let i = 0; i < 25; i++) {
    await chooseDeal(page, 'New shuffle');
    const deal = ids(await readTable(page));
    expect(deal).not.toBe(prev);
    expect(deal).not.toBe('A 2 3 4 5 6 7 8');
    expect(deal.split(' ').sort().join(' ')).toBe('2 3 4 5 6 7 8 A');
    seen.add(deal);
    prev = deal;
  }
  expect(seen.size).toBeGreaterThan(20);
  await expect(page.locator('#deals .btn[aria-pressed="true"]')).toHaveCount(0);
});

test('sorting tabs share one deal; each search keeps its own row', async ({ page }) => {
  await chooseAlgo(page, 'selection');
  await chooseDeal(page, 'New shuffle');
  const deal = (await readTable(page)).order;
  await chooseAlgo(page, 'bubble');
  expect((await readTable(page)).order).toEqual(deal);
  await chooseAlgo(page, 'binary');
  expect((await readTable(page)).order).toEqual(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']);
  expect((await readTable(page)).target).toBe('Target: 7 of clubs');
  await chooseAlgo(page, 'insertion');
  expect((await readTable(page)).order).toEqual(deal);
});

test('binary search: New target keeps the row sorted and changes the target', async ({ page }) => {
  await chooseAlgo(page, 'binary');
  await expect(page.locator('#deals .btn', { hasText: 'New target' })).toBeVisible();
  let prev = 'Target: 7 of clubs';
  for (let i = 0; i < 15; i++) {
    await chooseDeal(page, 'New target');
    const t = await readTable(page);
    expect(t.order).toEqual(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']);
    expect(t.target).not.toBe(prev);
    prev = t.target;
  }
});

test('linear search: New shuffle changes the row and the target is always on it', async ({ page }) => {
  for (let i = 0; i < 15; i++) {
    await chooseDeal(page, 'New shuffle');
    const t = await readTable(page);
    const target = 'c' + t.target.match(/Target: (\w+)/)[1].replace('ace', '1');
    expect(t.order).toContain(target);
    expect(t.order.slice().sort()).toEqual(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']);
    for (let k = 0; k < 20; k++) await page.keyboard.press('ArrowRight');
    const end = await readTable(page);
    expect(end.cards.find((c) => c.id === target).down).toBe(false);
    expect(end.narration).toMatch(/Stop, found it!/);
  }
});

test('a deal button keeps keyboard focus after dealing', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  const shuffle = page.locator('#deals .btn', { hasText: 'New shuffle' });
  await shuffle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#deals .btn', { hasText: 'New shuffle' })).toBeFocused();
});
