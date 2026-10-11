// Visibility of status, flexibility (speed, shortcuts, timeline), tooltips and the tour.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  ALGOS, SPEED_STEPS, BASE_MS, openDemo, tick, tabKey, chooseAlgo, chooseMode, chooseDeal,
  chooseSpeed, readTable, engineSteps, expectTableMatches, untilWaiting, lowContrast, settleAnimations
} = require('./helpers');

let errors;
test.beforeEach(async ({ page }) => {
  errors = await openDemo(page);
});
test.afterEach(() => {
  expect(errors, 'console errors or page errors').toEqual([]);
});

const countdown = (page) => page.evaluate(() => {
  const box = document.getElementById('countdown');
  const fill = document.getElementById('countdown-fill');
  return { shown: !box.hidden, transition: fill.style.transition, transform: fill.style.transform };
});

test.describe('status', () => {
  test('Watch: ready, paused, playing at the chosen speed, finished', async ({ page }) => {
    await chooseAlgo(page, 'binary');
    let t = await readTable(page);
    expect([t.state, t.stateText, t.phase, t.progressText]).toEqual(['ready', 'Ready', 'Ready to search 9 sorted cards', 'Step 0 of 4']);
    await page.keyboard.press('ArrowRight');
    t = await readTable(page);
    expect([t.state, t.stateText, t.phase, t.progressText]).toEqual(['paused', 'Paused', 'Middle of 9 cards', 'Step 1 of 4']);
    await page.locator('#btn-play').click();
    t = await readTable(page);
    expect([t.state, t.stateText]).toEqual(['playing', 'Playing ×1']);
    await page.keyboard.press('+');
    expect((await readTable(page)).stateText).toBe('Playing ×1.5');
    await tick(page, 5000);
    t = await readTable(page);
    expect([t.state, t.stateText, t.phase, t.progressText]).toEqual(['done', 'Finished', 'Found it', 'Step 4 of 4']);
  });

  test('Try it: your turn, try again, algorithm moving, finished, with decisions counted', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    await chooseMode(page, 'try');
    await chooseDeal(page, 'Lecture deal');
    let t = await untilWaiting(page);
    expect([t.state, t.stateText, t.progressText]).toEqual(['turn', 'Your turn', 'Decision 1 of 19']);
    await expect(page.locator('#progress')).toHaveAttribute('aria-valuenow', '0');
    await tick(page, 300);
    await page.locator('#btn-noswap').click(); // wrong: 5 is bigger than A
    t = await readTable(page);
    expect([t.state, t.stateText]).toEqual(['retry', 'Try again']);
    await tick(page, 300);
    await page.locator('#btn-swap').click();
    t = await readTable(page);
    expect([t.state, t.stateText, t.progressText]).toEqual(['moving', 'Algorithm moving', '1 of 19 decisions made']);
    await expect(page.locator('#progress')).toHaveAttribute('aria-valuenow', '1');
    await expect(page.locator('#scrub')).toBeHidden();
    await expect(page.locator('#progress')).toBeVisible();
    const { asks } = await engineSteps(page, 'insertion').then(({ steps }) => ({ asks: steps.filter((s) => s.ask) }));
    for (let i = 1; i < asks.length; i++) {
      await untilWaiting(page);
      await tick(page, 300);
      await page.locator('#btn-show').click();
    }
    t = await untilWaiting(page);
    expect([t.state, t.stateText, t.progressText]).toEqual(['done', 'Finished', 'All 19 decisions made']);
    await expect(page.locator('#progress-fill')).toHaveAttribute('style', /width: 100%/);
  });

  test('a countdown fills before each automatic step, and only then', async ({ page }) => {
    await chooseAlgo(page, 'bubble');
    expect((await countdown(page)).shown).toBe(false);
    await page.locator('#btn-play').click();
    let c = await countdown(page);
    expect(c.shown).toBe(true);
    expect(c.transition).toBe('transform ' + BASE_MS + 'ms linear');
    expect(c.transform).toBe('scaleX(1)');
    await chooseSpeed(page, 3);
    expect((await countdown(page)).transition).toBe('transform 400ms linear');
    await page.locator('#btn-play').click(); // pause
    expect((await countdown(page)).shown).toBe(false);
    await page.keyboard.press('ArrowRight');
    expect((await countdown(page)).shown).toBe(false);
    // Try it: while the algorithm moves on its own, but not while it waits for you.
    await chooseMode(page, 'try');
    await chooseDeal(page, 'Lecture deal');
    expect((await countdown(page)).shown).toBe(true);
    await untilWaiting(page);
    expect((await countdown(page)).shown).toBe(false);
  });
});

test('the countdown stays off with reduced motion', async ({ page }) => {
  await openDemo(page, { reducedMotion: 'reduce' });
  await page.locator('#btn-play').click();
  expect((await countdown(page)).shown).toBe(false);
});

test.describe('timeline', () => {
  test('dragging the timeline jumps to any step, and pauses playing', async ({ page }) => {
    await chooseAlgo(page, 'selection');
    const { steps } = await engineSteps(page, 'selection');
    await page.locator('#btn-play').click();
    await page.locator('#scrub').fill('30');
    let t = await readTable(page);
    expectTableMatches(t, steps[30], 'after jumping to 30');
    expect(t.state).toBe('paused');
    await expect(page.locator('#scrub')).toHaveAttribute('aria-valuetext', 'Step 30 of ' + (steps.length - 1));
    expect(await page.locator('#scrub').evaluate((el) => el.style.getPropertyValue('--pct'))).toBe((30 / (steps.length - 1)) * 100 + '%');
    await page.locator('#scrub').fill('0');
    expectTableMatches(await readTable(page), steps[0], 'back to 0');
    await page.locator('#scrub').fill(String(steps.length - 1));
    t = await readTable(page);
    expectTableMatches(t, steps[steps.length - 1], 'to the end');
    expect(t.state).toBe('done');
  });

  test('with the keyboard, the timeline moves a step at a time', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    await page.locator('#scrub').focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    expect((await readTable(page)).step).toMatch(/^2 of/);
    await page.keyboard.press('End');
    const t = await readTable(page);
    expect(t.step).toBe(t.step.split(' of ')[1] + ' of ' + t.step.split(' of ')[1]);
  });

  test('after a drag with the mouse, the arrow keys step again', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    const box = await page.locator('#scrub').boundingBox();
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await tick(page, 10); // the slider lets go of focus
    const mid = Number((await readTable(page)).step.split(' of ')[0]);
    expect(mid).toBeGreaterThan(10);
    await expect(page.locator('#scrub')).not.toBeFocused();
    await page.keyboard.press('ArrowRight');
    expect((await readTable(page)).step).toMatch(new RegExp('^' + (mid + 1) + ' of'));
  });
});

test.describe('speed', () => {
  test('the slider goes from x0.25 to x3, said in words, with both modes in step', async ({ page }) => {
    const names = ['quarter speed', 'half speed', 'three-quarter speed', 'normal speed', '1.5 times speed', 'double speed', 'triple speed'];
    for (let i = 0; i < SPEED_STEPS.length; i++) {
      await chooseSpeed(page, SPEED_STEPS[i]);
      await expect(page.locator('.speed-out:visible')).toHaveText('×' + SPEED_STEPS[i]);
      await expect(page.locator('.speed-input:visible')).toHaveAttribute('aria-valuetext', names[i]);
    }
    await chooseSpeed(page, 0.5);
    await chooseMode(page, 'try');
    await expect(page.locator('.speed-out:visible')).toHaveText('×0.5');
    await expect(page.locator('.speed-input:visible')).toHaveValue('1');
  });

  test('minus and plus change the speed, and stop at the ends', async ({ page }) => {
    for (let i = 0; i < 10; i++) await page.keyboard.press('+');
    await expect(page.locator('.speed-out:visible')).toHaveText('×3');
    for (let i = 0; i < 10; i++) await page.keyboard.press('-');
    await expect(page.locator('.speed-out:visible')).toHaveText('×0.25');
    await page.keyboard.press('=');
    await expect(page.locator('.speed-out:visible')).toHaveText('×0.5');
  });

  test('the browser remembers the speed', async ({ page }) => {
    await chooseSpeed(page, 2);
    await page.reload();
    await expect(page.locator('.speed-out:visible')).toHaveText('×2');
  });

  test('a broken saved speed falls back to x1', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('cards.speed', 'fast'));
    await page.reload();
    await expect(page.locator('.speed-out:visible')).toHaveText('×1');
  });

  test('a clicker still steps while the slider has focus; the arrows adjust the slider', async ({ page }) => {
    await chooseAlgo(page, 'bubble');
    await page.locator('.speed-input:visible').focus();
    await page.keyboard.press('PageDown');
    expect((await readTable(page)).step).toMatch(/^1 of/);
    await page.keyboard.press('PageUp');
    expect((await readTable(page)).step).toMatch(/^0 of/);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.speed-out:visible')).toHaveText('×1.5');
    expect((await readTable(page)).step).toMatch(/^0 of/);
  });
});

test.describe('shortcuts', () => {
  test('Home and End go to the first and last step', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    await page.locator('body').click({ position: { x: 5, y: 300 } });
    await page.keyboard.press('End');
    expect((await readTable(page)).stateText).toBe('Finished');
    await page.keyboard.press('Home');
    expect((await readTable(page)).step).toMatch(/^0 of/);
  });

  test('number keys 1 to 5 pick the algorithm, in both modes', async ({ page }) => {
    for (const [i, key] of ALGOS.entries()) {
      await page.keyboard.press(String(i + 1));
      await expect(page.locator('#tabs .tab[aria-pressed="true"]')).toHaveAttribute('data-algo', key);
    }
    await chooseMode(page, 'try');
    await page.keyboard.press('2');
    await expect(page.locator('#tabs .tab[aria-pressed="true"]')).toHaveAttribute('data-algo', 'binary');
  });
});

test.describe('tooltips', () => {
  async function tip(page) {
    return page.evaluate(() => {
      const el = document.getElementById('tip');
      return el.hidden ? null : el.textContent;
    });
  }

  test('hover shows a hint after a short pause, with the key; leaving hides it', async ({ page }) => {
    await page.locator('#btn-next').hover();
    expect(await tip(page)).toBeNull();
    await tick(page, 500);
    expect(await tip(page)).toBe('One step forward Key: →');
    await expect(page.locator('#btn-next')).toHaveAttribute('aria-describedby', 'tip');
    await page.mouse.move(5, 300);
    expect(await tip(page)).toBeNull();
    await expect(page.locator('#btn-next')).not.toHaveAttribute('aria-describedby', 'tip');
  });

  test('keyboard focus shows the hint at once; Escape hides it', async ({ page, browserName }) => {
    await page.locator('#btn-back').focus();
    await page.keyboard.press(tabKey(browserName));
    await expect(page.locator('#btn-play')).toBeFocused();
    expect(await tip(page)).toBe('Play the steps on their own Key: Space');
    await page.keyboard.press('Escape');
    expect(await tip(page)).toBeNull();
    await page.keyboard.press(tabKey(browserName));
    expect(await tip(page)).toBe('One step forward Key: →');
  });

  test('a click hides a hint, and a mouse click never opens one', async ({ page }) => {
    await page.locator('#btn-next').hover();
    await tick(page, 500);
    await page.locator('#btn-next').click();
    expect(await tip(page)).toBeNull();
  });

  test('tabs explain their algorithm', async ({ page }) => {
    await page.locator('#tabs .tab', { hasText: 'Bubble sort' }).hover();
    await tick(page, 500);
    expect(await tip(page)).toBe('Swap neighbours that are out of order. Each pass carries the biggest unsorted card to the end. Key: 5');
  });

  test('pills and counter names define themselves when clicked or tapped', async ({ page }) => {
    await page.locator('#pills .pill', { hasText: 'Iteration' }).click();
    expect(await tip(page)).toBe('Iteration: repeating steps, as in For each and Repeat until.');
    await page.locator('#pills .pill', { hasText: 'Iteration' }).click();
    expect(await tip(page)).toBeNull();
    await page.locator('#label-a .term').click();
    expect(await tip(page)).toBe('Each card turned over. Fewer flips means a faster search.');
    await page.mouse.click(5, 300); // anywhere else closes it
    expect(await tip(page)).toBeNull();
    await chooseAlgo(page, 'selection');
    await page.locator('#pills .pill', { hasText: 'Selection' }).click();
    expect(await tip(page)).toMatch(/not selection sort/);
  });

  test('a hint never runs off the screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const sel of ['#btn-tour', '#tabs .tab >> nth=0', '#btn-next', '#pills .pill >> nth=0']) {
      await page.locator(sel).focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      const box = await page.evaluate(() => {
        const el = document.getElementById('tip');
        if (el.hidden) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, vw: document.documentElement.clientWidth, vh: innerHeight };
      });
      if (!box) continue;
      expect(box.left, sel).toBeGreaterThanOrEqual(0);
      expect(box.right, sel).toBeLessThanOrEqual(box.vw);
      expect(box.top, sel).toBeGreaterThanOrEqual(0);
    }
  });

  test('a tapped definition stays with its pill when the page scrolls', async ({ page }) => {
    await chooseAlgo(page, 'binary'); // its pills sit below the fold at 1280x720
    await page.locator('#pills .pill', { hasText: 'Sequencing' }).click();
    const gap = () => page.evaluate(() => {
      const t = document.getElementById('tip').getBoundingClientRect();
      const p = [...document.querySelectorAll('#pills .pill')].find((x) => x.textContent === 'Sequencing').getBoundingClientRect();
      return Math.round(p.top - t.bottom);
    });
    expect(await gap()).toBe(8);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100); // scroll events arrive with the next frame
    expect(await page.locator('#tip').isVisible()).toBe(true);
    expect(await gap()).toBe(8);
  });

  test('hint text is readable', async ({ page }) => {
    await page.locator('#pills .pill').first().click();
    expect(await lowContrast(page)).toEqual([]);
  });
});

test.describe('tour', () => {
  const STOPS = {
    'Pick an algorithm': '#tabs',
    'Watch, then try': '.mode-bar .seg',
    'The cards': '#table',
    'What is happening now': '.status-head',
    'Each step, explained': '#narration',
    'Where you are': '.timeline',
    'Step through it': '#watch-controls .controls',
    'Make your move': '#try-controls',
    'Set the pace': '.speed:visible',
    'The algorithm': '.code-box',
    'Keep count': '.stats',
    'Try another deal': '#deals',
    'That is the tour': '#btn-tour'
  };

  async function tourState(page) {
    return page.evaluate(() => {
      const tour = document.getElementById('tour');
      if (tour.hidden) return null;
      const r = (el) => { const b = el.getBoundingClientRect(); return { left: b.left, top: b.top, right: b.right, bottom: b.bottom }; };
      return {
        count: document.getElementById('tour-count').textContent,
        title: document.getElementById('tour-title').textContent,
        text: document.getElementById('tour-text').textContent,
        spot: r(document.getElementById('tour-spot')),
        card: r(document.getElementById('tour-card')),
        vw: document.documentElement.clientWidth,
        vh: innerHeight,
        back: !document.getElementById('tour-back').hidden,
        next: document.getElementById('tour-next').textContent,
        focus: document.activeElement.id
      };
    });
  }

  async function walk(page) {
    const seen = [];
    for (let i = 0; i < 20; i++) {
      await settleAnimations(page); // the spotlight glides from one part to the next
      const s = await tourState(page);
      if (!s) break;
      seen.push(s);
      const target = await page.locator(STOPS[s.title]).first().boundingBox();
      expect(target, s.title).not.toBeNull();
      // The spotlight surrounds its part of the page, and the note is on screen.
      expect(s.spot.left, s.title).toBeLessThanOrEqual(target.x + 0.5);
      expect(s.spot.top, s.title).toBeLessThanOrEqual(target.y + 0.5);
      expect(s.spot.right, s.title).toBeGreaterThanOrEqual(target.x + target.width - 0.5);
      expect(s.spot.bottom, s.title).toBeGreaterThanOrEqual(target.y + target.height - 0.5);
      expect(s.card.left, s.title).toBeGreaterThanOrEqual(0);
      expect(s.card.right, s.title).toBeLessThanOrEqual(s.vw);
      expect(s.card.top, s.title).toBeGreaterThanOrEqual(0);
      expect(s.card.bottom, s.title).toBeLessThanOrEqual(s.vh);
      expect(s.focus, s.title).toBe('tour-title');
      expect(s.text.length, s.title).toBeGreaterThan(30);
      await page.locator('#tour-next').click();
    }
    return seen;
  }

  test('the Tour button walks through every part of the page, then hands focus back', async ({ page }) => {
    await page.locator('#btn-tour').click();
    await expect(page.getByRole('dialog', { name: 'Pick an algorithm' })).toBeVisible();
    await expect(page.locator('#tour-card')).toHaveAttribute('aria-modal', 'true');
    const seen = await walk(page);
    expect(seen.map((s) => s.title)).toEqual(['Pick an algorithm', 'Watch, then try', 'The cards', 'What is happening now',
      'Each step, explained', 'Where you are', 'Step through it', 'Set the pace', 'The algorithm', 'Keep count',
      'Try another deal', 'That is the tour']);
    expect(seen[0].count).toBe('1 of 12');
    expect(seen[0].back).toBe(false);
    expect(seen[1].back).toBe(true);
    expect(seen[11].next).toBe('Done');
    await expect(page.locator('#tour')).toBeHidden();
    await expect(page.locator('#btn-tour')).toBeFocused();
  });

  test('in Try it, the tour talks about your moves', async ({ page }) => {
    await chooseMode(page, 'try');
    await chooseAlgo(page, 'linear');
    await page.keyboard.press('?');
    const seen = await walk(page);
    const move = seen.find((s) => s.title === 'Make your move');
    expect(move.text).toMatch(/^Click the card the algorithm would choose next/);
    await chooseAlgo(page, 'bubble');
    await page.locator('#btn-tour').click();
    for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowRight');
    expect((await tourState(page)).text).toMatch(/choose Swap or Don't swap/);
  });

  test('keys belong to the tour while it is open, and Escape ends it', async ({ page }) => {
    await chooseAlgo(page, 'insertion');
    await page.locator('#btn-tour').click();
    await page.keyboard.press('ArrowRight');
    expect((await tourState(page)).count).toBe('2 of 12');
    await page.keyboard.press('ArrowLeft');
    expect((await tourState(page)).count).toBe('1 of 12');
    await page.keyboard.press('Space');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    expect((await readTable(page)).step).toMatch(/^0 of/); // nothing behind the tour moved
    await expect(page.locator('.speed-out:visible')).toHaveText('×1');
    await expect(page.locator('#tabs .tab[aria-pressed="true"]')).toHaveAttribute('data-algo', 'insertion');
    await page.keyboard.press('Escape');
    await expect(page.locator('#tour')).toBeHidden();
  });

  test('Tab stays inside the tour note', async ({ page, browserName }) => {
    await page.locator('#btn-tour').click();
    await page.keyboard.press('ArrowRight');
    const visited = new Set();
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press(tabKey(browserName));
      visited.add(await page.evaluate(() => document.activeElement.id));
    }
    expect([...visited].sort()).toEqual(['tour-back', 'tour-close', 'tour-next']);
  });

  test('the tour pauses playing, and Try it carries on after it', async ({ page }) => {
    await page.locator('#btn-play').click();
    await page.locator('#btn-tour').click();
    expect((await readTable(page)).state).toBe('paused');
    await tick(page, 5000);
    expect((await readTable(page)).step).toMatch(/^1 of/);
    await page.locator('#tour-close').click();

    await chooseAlgo(page, 'selection');
    await chooseMode(page, 'try');
    await chooseDeal(page, 'Lecture deal');
    await untilWaiting(page);
    await tick(page, 300);
    await page.locator('#row .card[data-id="h1"]').click(); // the comparisons start playing
    await page.locator('#btn-tour').click();
    const before = (await readTable(page)).a;
    await tick(page, 5000);
    expect((await readTable(page)).a).toBe(before);
    await page.keyboard.press('Escape');
    await tick(page, 5000);
    expect(Number((await readTable(page)).a)).toBeGreaterThan(Number(before));
  });

  test('the whole window dims during the tour, scrollbar gutter included', async ({ page }) => {
    const root = () => page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
    const before = await root();
    await page.locator('#btn-tour').click();
    // The overlay's colour over the page: navy at 62% over the page background.
    expect(await root()).toMatch(/^(rgb\(98, 113, 136\)|color\(srgb 0\.38\d* 0\.44\d* 0\.53\d*\))$/);
    await page.keyboard.press('Escape');
    expect(await root()).toBe(before);
  });

  test('the tour note is readable', async ({ page }) => {
    await page.locator('#btn-tour').click();
    expect(await lowContrast(page)).toEqual([]);
  });
});
