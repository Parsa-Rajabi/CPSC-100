// Try it mode: decisions, wrong moves, Show me, and the finish screen.
'use strict';

const { test, expect } = require('@playwright/test');
const {
  ALGOS, openDemo, tick, chooseAlgo, chooseMode, chooseDeal, chooseSpeed, readTable, engineSteps,
  expectTableMatches, untilWaiting, answerWith, playTry
} = require('./helpers');

let errors;
test.beforeEach(async ({ page }) => {
  errors = await openDemo(page);
});
test.afterEach(() => {
  expect(errors, 'console errors or page errors').toEqual([]);
});

async function startTry(page, key, deal) {
  await chooseAlgo(page, key);
  await chooseMode(page, 'try');
  if (deal) await chooseDeal(page, deal);
}

const LECTURE_FINISH = {
  linear: 'Found in 6 flips, 0 mistakes. | Binary search only works on sorted cards. With these cards sorted, it would need 1 flip.',
  binary: 'Found in 2 flips, 0 mistakes. | Linear search needed 7 on this row.',
  selection: 'Sorted in 28 comparisons, 0 mistakes. | On this deal: selection 28 · insertion 19 · bubble 25',
  insertion: 'Sorted in 19 comparisons, 0 mistakes. | On this deal: selection 28 · insertion 19 · bubble 25',
  bubble: 'Sorted in 25 comparisons, 0 mistakes. | On this deal: selection 28 · insertion 19 · bubble 25'
};

for (const key of ALGOS) {
  test(key + ': a perfect round on the lecture deal ends with the slide numbers', async ({ page }) => {
    await startTry(page, key, 'Lecture deal');
    const { steps, end } = await playTry(page, key);
    expect(end.finish).toBe(LECTURE_FINISH[key]);
    expectTableMatches(end, steps[steps.length - 1], 'finish');
    await expect(page.locator('#try-controls')).toBeHidden();
    await expect(page.locator('#finish')).toBeVisible();
  });

  test(key + ': random deals, with mistakes and Show me, count every mistake once', async ({ page }) => {
    test.slow(); // three whole rounds: allow three times as long on a slow machine
    await startTry(page, key);
    await chooseSpeed(page, 3); // fewer clock ticks between decisions
    for (let round = 0; round < 3; round++) {
      if (round) await page.locator('#btn-again').click();
      const mistakes = [0, 2];
      const showMe = [1];
      const { steps, end } = await playTry(page, key, { mistakes, showMe });
      const questions = steps.filter((s) => s.ask).length;
      const expected = mistakes.filter((i) => i < questions).length + showMe.filter((i) => i < questions).length;
      const last = steps[steps.length - 1].counts;
      const total = 'comparisons' in last ? 'Sorted in ' + last.comparisons : 'Found in ' + last.flips;
      expect(end.finish.startsWith(total), end.finish).toBe(true);
      expect(end.finish).toContain(expected + (expected === 1 ? ' mistake.' : ' mistakes.'));
      expect(end.c).toBe(String(expected));
    }
  });
}

test('Try it starts on a fresh shuffle, different each time', async ({ page }) => {
  await chooseAlgo(page, 'insertion');
  const lecture = (await readTable(page)).order;
  const seen = new Set();
  for (let i = 0; i < 6; i++) {
    await chooseMode(page, 'try');
    const deal = (await readTable(page)).order;
    expect(deal).not.toEqual(lecture);
    seen.add(deal.join());
    await chooseMode(page, 'watch');
  }
  expect(seen.size).toBe(6);
  // The lecture deal is one click away.
  await chooseMode(page, 'try');
  await chooseDeal(page, 'Lecture deal');
  expect((await readTable(page)).order).toEqual(lecture);
});

test('the question shows, but the answer does not', async ({ page }) => {
  await startTry(page, 'insertion', 'Lecture deal');
  const t = await untilWaiting(page);
  expect(t.prompt).toBe('A has 5 on its left. Should A swap with 5?');
  expect(t.narration).not.toMatch(/bigger|smaller|so swap/);
  await startTry(page, 'bubble', 'Lecture deal');
  const b = await untilWaiting(page);
  expect(b.prompt).toBe('Compare 5 and A. Should they swap?');
  expect(b.narration).not.toMatch(/bigger|smaller/);
});

test('a right answer says why, then moves on', async ({ page }) => {
  await startTry(page, 'insertion', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-swap').click();
  const t = await readTable(page);
  expect(t.narration).toBe('Right. 5 is bigger than A, so they swap.');
  expect(t.order.slice(0, 2)).toEqual(['h1', 'h5']);
  expect(t.c).toBe('0');
});

test('a wrong swap answer: hint, a mistake, no move', async ({ page }) => {
  await startTry(page, 'bubble', 'Lecture deal');
  const before = await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-noswap').click();
  const t = await readTable(page);
  expect(t.feedback).toBe(true);
  expect(t.narration).toBe('Not quite. Bubble sort swaps two neighbours only when the left card is bigger. Is 5 bigger than A?');
  expect(t.narration).not.toMatch(/^Wrong/);
  expect(t.c).toBe('1');
  expect(t.order).toEqual(before.order);
  expect(t.a).toBe(before.a);
  expect(t.waiting).toBe(true);
  // Then the right answer still works.
  await tick(page, 300);
  await page.locator('#btn-swap').click();
  expect((await readTable(page)).narration).toMatch(/^Right\./);
});

test('wrong picks explain what went wrong', async ({ page }) => {
  // Linear search: skipping ahead, then a card already face up.
  await startTry(page, 'linear', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c5"]').click(); // the target, but skipping ahead
  expect((await readTable(page)).narration).toMatch(/^Not quite: linear search never skips ahead\./);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c8"]').click(); // right: the first card
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c8"]').click(); // already face up
  expect((await readTable(page)).narration).toMatch(/^That card is already face up\./);
  expect((await readTable(page)).c).toBe('2');

  // Binary search: a ruled-out card and a card that is not the middle.
  await startTry(page, 'binary', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c4"]').click();
  expect((await readTable(page)).narration).toMatch(/^Not quite: that is not the middle card\..*the 5th of them\.$/);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c5"]').click();
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c2"]').click(); // ruled out after the 5
  expect((await readTable(page)).narration).toMatch(/^That card is ruled out: the target cannot be there\./);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c9"]').click(); // not the middle of 6 7 8 9
  expect((await readTable(page)).narration).toMatch(/two are in the middle\. Take the left one\.$/);

  // Selection sort: a card that is not the smallest, then a card already sorted.
  await startTry(page, 'selection', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h3"]').click();
  expect((await readTable(page)).narration).toMatch(/^Not quite: there is a smaller card than 3 in the unsorted part\./);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h1"]').click();
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h1"]').click(); // A is sorted now
  expect((await readTable(page)).narration).toMatch(/^That card is already sorted\./);
});

test('a wrong card shakes', async ({ page }) => {
  await startTry(page, 'linear', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c9"]').click();
  const shaking = await page.evaluate(() =>
    document.querySelector('#row .slot[data-id="c9"]').getAnimations().length);
  expect(shaking).toBe(1);
});

test('Show me makes the right move and counts it as a mistake', async ({ page }) => {
  await startTry(page, 'insertion', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-show').click();
  const t = await readTable(page);
  expect(t.narration).toBe('Here is the right move. 5 is bigger than A, so they swap.');
  expect(t.order.slice(0, 2)).toEqual(['h1', 'h5']);
  expect(t.c).toBe('1');
});

test('Selection sort: after the pick, the comparisons play out and are counted', async ({ page }) => {
  await startTry(page, 'selection', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h1"]').click();
  expect((await readTable(page)).narration).toBe('Right. A is the smallest. Watch the comparisons the algorithm needs to be sure.');
  const t = await untilWaiting(page); // pass 2 question
  expect(t.a).toBe('7');
  expect(t.order.slice(0, 2)).toEqual(['h1', 'h5']);
  expect(t.cards.find((c) => c.id === 'h1').sorted).toBe(true);
});

test('double clicks and double taps cannot answer the next question too', async ({ page }) => {
  // Bubble sort, lecture deal: after 5 and A swap, "5 and 8" is Don't swap and the next
  // question, "8 and 3", appears at once.
  await startTry(page, 'bubble', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-swap').click(); // 5 > A, swap
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-noswap').dblclick(); // 5 < 8: the second click must not answer 8 vs 3
  let t = await readTable(page);
  expect(t.c).toBe('0');
  expect(t.prompt).toBe('Compare 8 and 3. Should they swap?');
  // A fast second tap (detail 1) inside the settle time is ignored too.
  await page.locator('#btn-noswap').click();
  t = await readTable(page);
  expect(t.c).toBe('0');
  expect(t.prompt).toBe('Compare 8 and 3. Should they swap?');
  // Once settled, answers count again.
  await tick(page, 300);
  await page.locator('#btn-noswap').click();
  expect((await readTable(page)).c).toBe('1');

  // Double click on the right card in linear search: one flip, no mistake.
  await startTry(page, 'linear', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c8"]').dblclick();
  t = await readTable(page);
  expect(t.a).toBe('1');
  expect(t.c).toBe('0');
});

test('a slow double click, slower than the settle time, still counts once', async ({ page }) => {
  // Some systems allow half a second between the two clicks of a double click.
  const secondClick = (el) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 2 }));
  await startTry(page, 'bubble', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-swap').click(); // 5 > A, swap
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-noswap').click(); // 5 < 8; "8 and 3" appears at once
  await tick(page, 300);
  await page.locator('#btn-noswap').evaluate(secondClick);
  let t = await readTable(page);
  expect(t.c).toBe('0');
  expect(t.prompt).toBe('Compare 8 and 3. Should they swap?');

  await startTry(page, 'linear', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="c8"]').click();
  await tick(page, 300);
  await page.locator('#row .card[data-id="c8"]').evaluate(secondClick); // would be "already face up"
  t = await readTable(page);
  expect(t.c).toBe('0');
  expect(t.feedback).toBe(false);
});

test('clicks while the cards are moving do nothing', async ({ page }) => {
  await startTry(page, 'selection', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h1"]').click();
  // Now the comparisons play on their own; clicking cards or Show me must not count.
  await page.locator('#row .card[data-id="h8"]').click({ force: true });
  await page.locator('#btn-show').click({ force: true });
  const t = await readTable(page);
  expect(t.c).toBe('0');
  expect(t.waiting).toBe(false);
});

test('a whole round with the keyboard only', async ({ page }) => {
  await startTry(page, 'linear', 'Lecture deal');
  const { steps } = await engineSteps(page, 'linear');
  const asks = steps.filter((s) => s.ask).map((s) => s.ask);
  for (const ask of asks) {
    await untilWaiting(page);
    await tick(page, 300);
    await page.locator('#row .card[data-id="' + ask.answer + '"]').focus();
    await page.keyboard.press('Enter');
  }
  const end = await untilWaiting(page);
  expect(end.finish).toBe(LECTURE_FINISH.linear);
  // Focus moves to Try again, since the card buttons are no longer in use.
  await expect(page.locator('#btn-again')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#row .card').first()).toBeFocused();
  expect((await readTable(page)).finish).toBeNull();
});

test('Swap and Don\'t swap work from the keyboard', async ({ page }) => {
  await startTry(page, 'insertion', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#btn-swap').focus();
  await page.keyboard.press('Space');
  expect((await readTable(page)).narration).toMatch(/^Right\./);
});

test('Try again deals a new shuffle; Watch it replays the same deal', async ({ page }) => {
  await startTry(page, 'insertion');
  const { deal } = await playTry(page, 'insertion');
  await page.locator('#btn-watch-it').click();
  await expect(page.locator('#mode-watch')).toHaveAttribute('aria-pressed', 'true');
  let t = await readTable(page);
  expect(t.order).toEqual(deal);
  expect(t.c).toMatch(/^0 of/);
  await expect(page.locator('#btn-play')).toBeFocused();
  await chooseMode(page, 'try');
  const second = await playTry(page, 'insertion');
  await page.locator('#btn-again').click();
  t = await readTable(page);
  expect(t.order).not.toEqual(second.deal);
  expect(t.finish).toBeNull();
  await expect(page.locator('#try-controls')).toBeVisible();
  await expect(page.locator('#btn-swap')).toBeFocused();
});

test('every step on the way matches the engine', async ({ page }) => {
  await startTry(page, 'bubble', 'Lecture deal');
  const { steps } = await engineSteps(page, 'bubble');
  // Walk the run: at each question compare the table, then answer.
  let idx = 0;
  for (;;) {
    const t = await untilWaiting(page);
    if (t.finish) break;
    while (!steps[idx].ask || steps[idx].order.join() !== t.order.join() ||
      String(steps[idx].counts.comparisons) !== t.a) idx++;
    expectTableMatches(t, steps[idx], 'question at step ' + idx);
    await tick(page, 300);
    await answerWith(page, steps[idx].ask);
    idx++;
  }
});

test('switching away in the middle of a round stops it cleanly', async ({ page }) => {
  await startTry(page, 'selection', 'Lecture deal');
  await untilWaiting(page);
  await tick(page, 300);
  await page.locator('#row .card[data-id="h1"]').click(); // comparisons start playing
  await tick(page, 500);
  await chooseAlgo(page, 'insertion');
  const fresh = await readTable(page);
  await tick(page, 10000);
  const later = await readTable(page);
  // Only the new round's own autoplay may have run: it waits at its first question.
  expect(later.c).toBe('0');
  expect(later.order).toEqual(fresh.order);
  expect(later.waiting).toBe(true);
});
