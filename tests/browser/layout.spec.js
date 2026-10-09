// Layout: no sideways scroll, cards that fit and stay readable, and a projector view
// that shows the important parts without scrolling.
'use strict';

const { test, expect } = require('@playwright/test');
const { ALGOS, openDemo, tick, relayout, settleAnimations, chooseAlgo, chooseMode, readTable } = require('./helpers');

const VIEWPORTS = [
  [320, 640], [375, 812], [414, 896], [768, 1024], [1024, 768], [1280, 720], [1440, 900], [1920, 1080]
];

// Everything that would make the page scroll sideways or clip, as a list of problems.
async function layoutProblems(page) {
  return page.evaluate(() => {
    const problems = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw) {
      problems.push('page scrolls sideways: ' + document.documentElement.scrollWidth + ' > ' + vw);
    }
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') continue;
      if (el.closest('.tag')) continue; // the "smallest so far" tag may overhang its card
      if (r.right > vw + 0.5 || r.left < -0.5) problems.push('off screen: ' + el.tagName + '.' + el.className + ' ' + Math.round(r.left) + '..' + Math.round(r.right));
    }
    const table = document.getElementById('table').getBoundingClientRect();
    for (const card of document.querySelectorAll('#row .card')) {
      const r = card.getBoundingClientRect();
      if (r.left < table.left || r.right > table.right) problems.push('card outside the table: ' + card.dataset.id);
    }
    for (const b of document.querySelectorAll('button')) {
      if (!b.offsetParent) continue;
      if (b.scrollWidth > b.clientWidth + 1) problems.push('text clipped in button: ' + b.textContent.trim());
    }
    return problems;
  });
}

async function cardMetrics(page) {
  return page.evaluate(() => {
    // Slots, not cards: cards are lifted or shrunk on purpose (compared, ruled out).
    const cards = [...document.querySelectorAll('#row .card')];
    const r = [...document.querySelectorAll('#row .slot')].map((c) => c.getBoundingClientRect());
    const rank = getComputedStyle(cards[0].querySelector('.corner .r')).fontSize;
    return {
      width: r[0].width,
      height: cards[0].offsetHeight,
      rankPx: parseFloat(rank),
      inOrder: r.every((x, i) => i === 0 || x.left > r[i - 1].right - 0.5),
      n: cards.length
    };
  });
}

for (const [width, height] of VIEWPORTS) {
  test(width + 'x' + height + ': every algorithm in both modes fits, with readable cards', async ({ page }) => {
    const errors = await openDemo(page, { width, height });
    for (const mode of ['watch', 'try']) {
      await chooseMode(page, mode);
      for (const key of ALGOS) {
        await chooseAlgo(page, key);
        await tick(page, 50);
        // Check at the start and a few steps in (lifted cards, flips, tags).
        for (let k = 0; k < 2; k++) {
          await settleAnimations(page);
          expect(await layoutProblems(page), mode + ' ' + key).toEqual([]);
          const m = await cardMetrics(page);
          expect(m.width, key + ' card width').toBeLessThanOrEqual(96);
          expect(m.width, key + ' card width').toBeGreaterThanOrEqual(24);
          expect(m.height / m.width, key + ' 5:7 card').toBeCloseTo(1.4, 1);
          expect(m.rankPx, key + ' rank size').toBeGreaterThanOrEqual(11.5);
          expect(m.inOrder, key + ' cards overlap').toBe(true);
          if (mode === 'watch') for (let s = 0; s < 4; s++) await page.keyboard.press('ArrowRight');
          else await tick(page, 3000);
        }
      }
    }
    expect(errors).toEqual([]);
  });
}

test.describe('on a phone', () => {
  // A real phone: touch, and scrollbars that take no space.
  test.use({ isMobile: async ({ browserName }, use) => use(browserName !== 'firefox'), hasTouch: true });

  test('375px: nine cards about 34px wide, eight a little wider', async ({ page }) => {
    await openDemo(page, { width: 375, height: 812 });
    const nine = await cardMetrics(page);
    expect(nine.n).toBe(9);
    expect(nine.width).toBeGreaterThanOrEqual(33);
    expect(nine.width).toBeLessThanOrEqual(35);
    await chooseAlgo(page, 'insertion');
    const eight = await cardMetrics(page);
    expect(eight.width).toBeGreaterThan(nine.width);
  });

  test('the four watch buttons share one row; Swap and Don\'t swap fill the width', async ({ page }) => {
    await openDemo(page, { width: 375, height: 812 });
    const tops = await page.evaluate(() =>
      ['btn-reset', 'btn-back', 'btn-play', 'btn-next'].map((id) => Math.round(document.getElementById(id).getBoundingClientRect().top)));
    expect(new Set(tops).size).toBe(1);
    await chooseAlgo(page, 'insertion');
    await chooseMode(page, 'try');
    const big = await page.evaluate(() => {
      const s = document.getElementById('btn-swap').getBoundingClientRect();
      const n = document.getElementById('btn-noswap').getBoundingClientRect();
      const content = document.querySelector('main').clientWidth - 32;
      return { same: Math.round(s.top) === Math.round(n.top), height: s.height, total: n.right - s.left, content };
    });
    expect(big.same).toBe(true);
    expect(big.height).toBeGreaterThanOrEqual(56);
    expect(big.total).toBeGreaterThanOrEqual(big.content - 1);
  });

  test('touch targets: at least 24px everywhere (WCAG 2.5.8), 38px for the main controls', async ({ page }) => {
    await openDemo(page, { width: 375, height: 812 });
    for (const mode of ['watch', 'try']) {
      await chooseMode(page, mode);
      const sizes = await page.evaluate(() => [...document.querySelectorAll('button, a')]
        .filter((el) => el.offsetParent && !el.closest('#row'))
        .map((el) => ({ name: el.textContent.trim(), h: el.getBoundingClientRect().height, w: el.getBoundingClientRect().width, main: !!el.closest('.controls > .btn, .decide, .tabs, .seg:not(.small)') })));
      for (const s of sizes) {
        expect(Math.min(s.h, s.w), mode + ': ' + s.name).toBeGreaterThanOrEqual(24);
        if (s.main) expect(s.h, mode + ': ' + s.name).toBeGreaterThanOrEqual(38);
      }
    }
  });
});

test('laptop and projector widths use full-size 96px cards', async ({ page }) => {
  await openDemo(page, { width: 1280, height: 720 });
  for (const key of ALGOS) {
    await chooseAlgo(page, key);
    const w = (await cardMetrics(page)).width;
    // Searches share the row with the target card, so they get a little less.
    if (key === 'linear' || key === 'binary') expect(w, key).toBeGreaterThanOrEqual(90);
    else expect(w, key).toBe(96);
  }
});

test('the cards re-fit when the window changes size', async ({ page }) => {
  await openDemo(page, { width: 1280, height: 720 });
  await chooseAlgo(page, 'bubble');
  expect((await cardMetrics(page)).width).toBe(96);
  for (const [w, h] of [[600, 800], [375, 812], [1024, 768]]) {
    await page.setViewportSize({ width: w, height: h });
    await relayout(page);
    const m = await cardMetrics(page);
    expect(await layoutProblems(page), w + 'px').toEqual([]);
    expect(m.width, w + 'px').toBeLessThanOrEqual(96);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await relayout(page);
  const small = (await cardMetrics(page)).width;
  await page.setViewportSize({ width: 1280, height: 720 });
  await relayout(page);
  expect((await cardMetrics(page)).width).toBe(96);
  expect(small).toBeLessThan(60);
});

test('projector, 1280x720: cards, narration, controls and pseudocode show without scrolling', async ({ page }) => {
  await openDemo(page, { width: 1280, height: 720 });
  for (const key of ALGOS) {
    await chooseAlgo(page, key);
    const box = await page.evaluate(() => {
      const bottom = (sel) => document.querySelector(sel).getBoundingClientRect().bottom;
      return {
        table: bottom('#table'),
        narration: bottom('#narration'),
        controls: bottom('#watch-controls .controls'),
        code: Math.max(...[...document.querySelectorAll('#code .code-line')].map((l) => l.getBoundingClientRect().bottom))
      };
    });
    for (const [part, bottom] of Object.entries(box)) expect(bottom, key + ' ' + part).toBeLessThanOrEqual(720);
  }
});

test('the target card sits beside the row on wide screens and above it on phones', async ({ page }) => {
  await openDemo(page, { width: 1280, height: 720 });
  const side = await page.evaluate(() => {
    const t = document.getElementById('target').getBoundingClientRect();
    const r = document.getElementById('row').getBoundingClientRect();
    return t.right <= r.left && Math.abs(t.top - r.top) < 40;
  });
  expect(side).toBe(true);
  await page.setViewportSize({ width: 375, height: 812 });
  await relayout(page);
  const top = await page.evaluate(() => {
    const t = document.getElementById('target').getBoundingClientRect();
    const r = document.getElementById('row').getBoundingClientRect();
    return t.bottom <= r.top + 1;
  });
  expect(top).toBe(true);
  expect((await readTable(page)).target).toBe('Target: 5 of clubs');
});
