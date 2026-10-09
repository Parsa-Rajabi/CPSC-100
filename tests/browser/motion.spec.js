// Motion: slides, flips and the finish wave, and none of them with reduced motion.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  openDemo, chooseAlgo, chooseSpeed, readTable, engineSteps, expectTableMatches, settleAnimations
} = require('./helpers');

async function running(page) {
  return page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
}

// After everything settles, cards sit in a row, in order, with no leftover offsets.
async function expectRestingRow(page) {
  await settleAnimations(page);
  const rest = await page.evaluate(() => {
    const slots = [...document.querySelectorAll('#row .slot')];
    const r = slots.map((s) => s.getBoundingClientRect());
    return {
      transforms: slots.map((s) => getComputedStyle(s).transform),
      zIndex: slots.map((s) => s.style.zIndex),
      ordered: r.every((x, i) => i === 0 || x.left >= r[i - 1].right - 0.5),
      sameTop: r.every((x) => Math.abs(x.top - r[0].top) < 0.5)
    };
  });
  expect(rest.transforms.every((t) => t === 'none')).toBe(true);
  expect(rest.zIndex.every((z) => z === '')).toBe(true);
  expect(rest.ordered).toBe(true);
  expect(rest.sameTop).toBe(true);
}

test.describe('with reduced motion', () => {
  test('nothing animates: deal, swaps, flips, counters or the finish wave', async ({ page }) => {
    const errors = await openDemo(page, { reducedMotion: 'reduce' });
    expect(await running(page)).toBe(0); // no deal-in
    const durations = await page.evaluate(() => {
      const c = document.querySelector('#row .card');
      return [c, c.querySelector('.card-inner'), c.querySelector('.face')]
        .map((el) => getComputedStyle(el).transitionDuration.split(', ').every((d) => d === '0s'));
    });
    expect(durations).toEqual([true, true, true]);
    await page.keyboard.press('ArrowRight'); // a flip
    expect(await running(page)).toBe(0);
    await chooseAlgo(page, 'insertion');
    expect(await running(page)).toBe(0);
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight'); // a swap
    expect(await running(page)).toBe(0);
    expect(await page.evaluate(() => document.querySelector('#num-a').classList.contains('bump'))).toBe(false);
    for (let i = 0; i < 60; i++) await page.keyboard.press('ArrowRight'); // the end
    expect(await running(page)).toBe(0);
    expect(errors).toEqual([]);
  });

  test('a wrong move does not shake', async ({ page }) => {
    await openDemo(page, { reducedMotion: 'reduce' });
    await page.locator('#mode-try').click();
    await page.locator('#deals .btn', { hasText: 'Lecture deal' }).click();
    await page.clock.runFor(300);
    await page.locator('#row .card[data-id="c9"]').click();
    expect((await readTable(page)).c).toBe('1');
    expect(await running(page)).toBe(0);
  });
});

test.describe('with motion', () => {
  let errors;
  test.beforeEach(async ({ page }) => {
    errors = await openDemo(page);
  });
  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('the cards are dealt in, then settle', async ({ page }) => {
    await chooseAlgo(page, 'bubble');
    expect(await running(page)).toBeGreaterThanOrEqual(1); // staggered, so some may be done
    await expectRestingRow(page);
  });

  test('a swap slides exactly the two cards, which pass each other and settle', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    await settleAnimations(page);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await settleAnimations(page);
    await page.keyboard.press('ArrowRight'); // swap A and 5
    const moving = await page.evaluate(() => [...document.querySelectorAll('#row .slot')]
      .filter((s) => s.getAnimations().length).map((s) => [s.dataset.id, s.style.zIndex]));
    expect(moving.map((m) => m[0]).sort()).toEqual(['h1', 'h5']);
    // The card moving left (A) passes over the top of the other.
    expect(Number(moving.find((m) => m[0] === 'h1')[1])).toBeGreaterThan(Number(moving.find((m) => m[0] === 'h5')[1]));
    await expectRestingRow(page);
  });

  test('a flip turns the card over in 3D', async ({ page }) => {
    const inner = page.locator('#row .card').first().locator('.card-inner');
    expect(await inner.evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration))).toBeGreaterThan(0.2);
    expect(await inner.evaluate((el) => getComputedStyle(el).transformStyle)).toBe('preserve-3d');
    await page.keyboard.press('ArrowRight');
    await settleAnimations(page);
    expect(await inner.evaluate((el) => getComputedStyle(el).transform)).toBe('none');
    const faces = await page.locator('#row .card').first().evaluate((c) => ({
      front: getComputedStyle(c.querySelector('.front')).visibility,
      back: getComputedStyle(c.querySelector('.back')).visibility,
      backface: getComputedStyle(c.querySelector('.front')).backfaceVisibility
    }));
    expect(faces).toEqual({ front: 'visible', back: 'hidden', backface: 'hidden' });
  });

  test('the finish waves across the row once, going forward only', async ({ page }) => {
    await chooseAlgo(page, 'binary');
    await settleAnimations(page);
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight');
    await settleAnimations(page);
    await page.keyboard.press('ArrowRight'); // last step
    const waving = await page.evaluate(() => [...document.querySelectorAll('#row .slot')].filter((s) => s.getAnimations().length).length);
    expect(waving).toBe(9);
    await expectRestingRow(page);
    await page.keyboard.press('ArrowLeft');
    await settleAnimations(page);
    expect(await page.evaluate(() => [...document.querySelectorAll('#row .slot')].filter((s) => s.getAnimations().length).length)).toBe(0);
  });

  test('speed sets how long the motion takes', async ({ page }) => {
    for (const [speed, ms] of [['slow', 760], ['normal', 456], ['fast', 228]]) {
      await chooseSpeed(page, speed);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--anim').trim())).toBe(ms + 'ms');
    }
  });

  test('pressing Next very fast never leaves a card stuck mid-slide', async ({ page }) => {
    for (const key of ['insertion', 'bubble', 'selection']) {
      await chooseAlgo(page, key);
      await chooseSpeed(page, 'slow'); // the longest slides, so they overlap most
      const { steps } = await engineSteps(page, key);
      for (let i = 0; i < 23; i++) await page.keyboard.press('ArrowRight');
      expectTableMatches(await readTable(page), steps[23], key + ' after 23 fast presses');
      await expectRestingRow(page);
      // Back and forth, mid-animation: 5 forward and 10 back, so 23 - 5 = step 18.
      for (let i = 0; i < 15; i++) await page.keyboard.press(i % 3 ? 'ArrowLeft' : 'ArrowRight');
      expectTableMatches(await readTable(page), steps[18], key + ' after back and forth');
      await expectRestingRow(page);
    }
  });

  test('Back reverses a swap', async ({ page }) => {
    await chooseAlgo(page, 'bubble');
    await settleAnimations(page);
    const start = (await readTable(page)).order;
    for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight'); // swap 5 and A
    await settleAnimations(page);
    expect((await readTable(page)).order).not.toEqual(start);
    await page.keyboard.press('ArrowLeft');
    expect(await running(page)).toBeGreaterThanOrEqual(2); // it slides back
    await expectRestingRow(page);
    expect((await readTable(page)).order).toEqual(start);
  });
});
