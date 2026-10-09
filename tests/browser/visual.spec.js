// Screenshots of key states, compared with saved baselines (Chromium only; the baselines
// carry the operating system in their names because font rendering differs).
// After a deliberate visual change: npm run test:update-screenshots, then look at every
// changed image before committing it.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  openDemo, tick, chooseAlgo, chooseMode, chooseDeal, untilWaiting, answerWrong, engineSteps, playTry
} = require('./helpers');

async function next(page, n) {
  for (let i = 0; i < n; i++) await page.keyboard.press('ArrowRight');
}

async function tryRound(page, key) {
  await chooseAlgo(page, key);
  await chooseMode(page, 'try');
  await chooseDeal(page, 'Lecture deal');
}

const STATES = {
  'linear-watch-step-3': async (page) => next(page, 3),
  'binary-watch-ruled-out': async (page) => { await chooseAlgo(page, 'binary'); await next(page, 2); },
  'selection-watch-smallest-so-far': async (page) => { await chooseAlgo(page, 'selection'); await next(page, 4); },
  'insertion-watch-swap': async (page) => { await chooseAlgo(page, 'insertion'); await next(page, 3); },
  'bubble-watch-pass-locks-in': async (page) => { await chooseAlgo(page, 'bubble'); await next(page, 15); },
  'insertion-watch-sorted': async (page) => { await chooseAlgo(page, 'insertion'); await next(page, 60); },
  'insertion-try-question': async (page) => { await tryRound(page, 'insertion'); await untilWaiting(page); },
  'bubble-try-wrong-move': async (page) => {
    await tryRound(page, 'bubble');
    await untilWaiting(page);
    await tick(page, 300);
    const { steps, deal } = await engineSteps(page, 'bubble');
    await answerWrong(page, steps.find((s) => s.ask).ask, deal);
  },
  'selection-try-finish': async (page) => { await tryRound(page, 'selection'); await playTry(page, 'selection'); },
  'binary-try-finish': async (page) => { await tryRound(page, 'binary'); await playTry(page, 'binary'); }
};

async function shoot(page, name, setup, options) {
  await setup(page);
  await page.mouse.move(0, 0); // no hover styles
  await page.evaluate(() => window.scrollTo(0, 0)); // clicks near the bottom scroll the page
  await expect(page).toHaveScreenshot(name + '.png', options);
}

test.describe('projector, 1280x720', () => {
  for (const [name, setup] of Object.entries(STATES)) {
    test(name, async ({ page }) => {
      await openDemo(page, { width: 1280, height: 720, reducedMotion: 'reduce' });
      await shoot(page, name, setup);
    });
  }
});

test.describe('phone, 375px wide', () => {
  test.use({ isMobile: true, hasTouch: true });
  for (const name of ['linear-watch-step-3', 'insertion-try-question', 'selection-try-finish', 'bubble-watch-pass-locks-in']) {
    test(name, async ({ page }) => {
      // A viewport tall enough for the whole page: a full-page capture would resize the
      // window mid-shot, and the 3D card layers then re-render with slightly different edges.
      await openDemo(page, { width: 375, height: 1200, reducedMotion: 'reduce' });
      await shoot(page, 'phone-' + name, STATES[name]);
    });
  }
});

test('wide laptop, 1440x900: bubble sort mid-pass', async ({ page }) => {
  await openDemo(page, { width: 1440, height: 900, reducedMotion: 'reduce' });
  await shoot(page, 'wide-bubble-mid-pass', async (p) => { await chooseAlgo(p, 'bubble'); await next(p, 9); });
});
