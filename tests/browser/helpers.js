// Shared helpers for the browser tests. They drive the page the way a student does
// (clicks and keys) and read only what is on the page.
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('@playwright/test');

const ALGOS = ['linear', 'binary', 'selection', 'insertion', 'bubble'];
const NAMES = {
  linear: 'Linear search', binary: 'Binary search', selection: 'Selection sort',
  insertion: 'Insertion sort', bubble: 'Bubble sort'
};

// Answer the page's Google Fonts requests with the saved copies in fixtures/fonts, so a
// slow or missing network cannot change a result or a screenshot.
const FONTS = path.join(__dirname, '..', 'fixtures', 'fonts');
async function useLocalFonts(page) {
  await page.route('https://fonts.googleapis.com/**', (route) =>
    route.fulfill({ path: path.join(FONTS, 'source-sans-pro.css'), contentType: 'text/css' }));
  await page.route('https://fonts.gstatic.com/**', (route) => {
    const file = path.join(FONTS, path.basename(new URL(route.request().url()).pathname));
    if (fs.existsSync(file)) return route.fulfill({ path: file, contentType: 'font/woff2' });
    return route.fulfill({ status: 404, body: 'not in fixtures/fonts' });
  });
}

// Open the page with seeded random deals and a paused clock, and collect any errors.
async function openDemo(page, options = {}) {
  const { width = 1280, height = 720, seed = 1, reducedMotion = 'no-preference', url = '/demos/cards.html', intro = false } = options;
  const errors = [];
  page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') errors.push(msg.type() + ': ' + msg.text());
  });
  await useLocalFonts(page);
  await page.setViewportSize({ width, height });
  await page.emulateMedia({ reducedMotion });
  await page.addInitScript((s) => {
    // mulberry32, so "New shuffle" gives the same deals on every run
    let seed = s;
    Math.random = function () {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }, seed);
  if (!intro) {
    // As for a returning visitor: no "New here?" banner, unless a test asks for it.
    await page.addInitScript(() => {
      try { window.localStorage.setItem('cards.tourSeen', '1'); } catch (err) { /* blocked */ }
    });
  }
  await page.clock.install();
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('700 16px "Source Sans Pro"')), 'font loaded').toBe(true);
  const now = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(now + 1000); // a little ahead, so it is never in the past
  return errors;
}

// Wait for running slides, flips and lifts to end (they run in real time, not on the
// fake clock), so positions can be measured.
async function settleAnimations(page) {
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished.catch(() => null))));
}

// After a resize: wait until the cards have been fitted to the table's new width (the page
// records it in data-fit). The resize observer runs on a real frame, then asks for an
// animation frame on the fake clock, so let both happen, a little at a time, for up to 5
// seconds on a slow machine.
async function relayout(page) {
  for (let i = 0; i < 100; i++) {
    await page.waitForTimeout(50);
    await tick(page, 20);
    const fitted = await page.evaluate(() => {
      const table = document.getElementById('table');
      const style = getComputedStyle(table);
      const inner = table.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      return table.dataset.fit === String(Math.round(inner));
    });
    if (fitted) return;
  }
  throw new Error('the cards did not re-fit after the resize');
}

// The key a keyboard user presses to move to the next control. WebKit on macOS follows
// Safari's default, where Tab skips buttons and Option+Tab reaches every control.
function tabKey(browserName) {
  return browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab';
}

// Let timers and animation frames run, as if `ms` had passed.
async function tick(page, ms) {
  await page.clock.runFor(ms);
}

async function chooseAlgo(page, key) {
  await page.locator('#tabs .tab', { hasText: NAMES[key] }).click();
}

async function chooseMode(page, mode) {
  await page.locator(mode === 'try' ? '#mode-try' : '#mode-watch').click();
}

async function chooseDeal(page, label) {
  await page.locator('#deals .btn', { hasText: label }).click();
}

const SPEED_STEPS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3];
const BASE_MS = 1200;

// Set the speed slider to a multiplier such as 0.5 or 2.
async function chooseSpeed(page, multiplier) {
  const index = SPEED_STEPS.indexOf(multiplier);
  if (index < 0) throw new Error('no speed x' + multiplier);
  const slider = page.locator('.speed-input:visible');
  await slider.fill(String(index));
  await slider.blur(); // as after a drag, which lets go of focus
}

// Everything a student can see, as plain data.
async function readTable(page) {
  return page.evaluate(() => {
    const cards = [...document.querySelectorAll('#row .slot')].map((slot) => {
      const card = slot.querySelector('.card');
      return {
        id: slot.dataset.id,
        down: card.classList.contains('is-down'),
        focus: card.classList.contains('is-focus'),
        sorted: card.classList.contains('is-sorted'),
        out: card.classList.contains('is-out'),
        marked: slot.classList.contains('is-marked'),
        label: card.getAttribute('aria-label'),
        tabIndex: card.tabIndex,
        disabled: card.getAttribute('aria-disabled')
      };
    });
    const lines = [...document.querySelectorAll('#code .code-line')];
    const active = lines.findIndex((l) => l.classList.contains('is-active'));
    const target = document.getElementById('target');
    const scrub = document.getElementById('scrub');
    const watch = !document.getElementById('watch-controls').hidden;
    const step = scrub.value + ' of ' + scrub.max;
    const mistakes = document.getElementById('num-c').textContent;
    return {
      cards,
      order: cards.map((c) => c.id),
      line: active === -1 ? null : active,
      narration: document.getElementById('narration').textContent,
      prompt: (document.querySelector('#narration .prompt') || {}).textContent || null,
      feedback: document.getElementById('narration').classList.contains('is-feedback'),
      a: document.getElementById('num-a').textContent,
      b: document.getElementById('num-b').textContent,
      // `c` is the third thing counted: the step in Watch mode, mistakes in Try it.
      c: watch ? step : mistakes,
      step,
      mistakes,
      state: document.getElementById('state-pill').dataset.state,
      stateText: document.getElementById('state-text').textContent,
      phase: document.getElementById('phase').textContent,
      progressText: document.getElementById('progress-text').textContent,
      target: target.hidden ? null : document.getElementById('target-card').getAttribute('aria-label'),
      finish: document.getElementById('finish').hidden ? null
        : document.getElementById('finish-main').textContent + ' | ' + document.getElementById('finish-compare').textContent,
      waiting: document.getElementById('btn-show').getAttribute('aria-disabled') === 'false'
    };
  });
}

// The engine's steps for whatever deal is on the table now.
async function engineSteps(page, key) {
  return page.evaluate((k) => {
    const E = window.CardEngine;
    const ids = [...document.querySelectorAll('#row .slot')].map((s) => s.dataset.id);
    const deal = ids.map((id) => E.makeCard(Number(id.slice(1)), id[0] === 'h' ? 'hearts' : 'clubs'));
    let target;
    const label = (document.getElementById('target-card').getAttribute('aria-label') || '').match(/Target: (\w+) of clubs/);
    if (label && E.ALGORITHMS[k].kind === 'search') target = 'c' + (label[1] === 'ace' ? 1 : label[1]);
    return { steps: E.run(k, deal, { target }), deal: ids, target };
  }, key);
}

// The table must show exactly what the engine's snapshot says.
function expectTableMatches(table, s, where) {
  expect(table.order, where + ' order').toEqual(s.order);
  for (const c of table.cards) {
    const w = where + ' ' + c.id;
    expect(c.down, w + ' face down').toBe(!s.faceUp.includes(c.id));
    expect(c.focus, w + ' focus').toBe(s.focus.includes(c.id));
    expect(c.sorted, w + ' sorted').toBe(s.sorted.includes(c.id));
    expect(c.out, w + ' ruled out').toBe(s.ruledOut.includes(c.id));
    expect(c.marked, w + ' smallest so far').toBe(s.marked.includes(c.id));
  }
  expect(table.line, where + ' pseudocode line').toBe(s.line);
  expect(table.phase, where + ' status phase').toBe(s.phase);
  if ('comparisons' in s.counts) {
    expect(table.a, where + ' comparisons').toBe(String(s.counts.comparisons));
    expect(table.b, where + ' swaps').toBe(String(s.counts.swaps));
  } else {
    expect(table.a, where + ' flips').toBe(String(s.counts.flips));
  }
}

// Wait (on the fake clock) until the page asks the student something, or finishes.
async function untilWaiting(page, limitMs = 120000) {
  for (let waited = 0; waited < limitMs; waited += 250) {
    const t = await readTable(page);
    if (t.waiting || t.finish) return t;
    await tick(page, 250);
  }
  throw new Error('the page never asked a question');
}

async function answerWith(page, ask) {
  if (ask.kind === 'swap') await page.locator(ask.answer ? '#btn-swap' : '#btn-noswap').click();
  else await page.locator('#row .card[data-id="' + ask.answer + '"]').click();
}

async function answerWrong(page, ask, deal) {
  if (ask.kind === 'swap') await page.locator(ask.answer ? '#btn-noswap' : '#btn-swap').click();
  else await page.locator('#row .card[data-id="' + deal.find((id) => id !== ask.answer) + '"]').click();
}

// Play a whole try-it round. `mistakes` lists question numbers to get wrong first;
// `showMe` lists question numbers to answer with Show me.
async function playTry(page, key, options = {}) {
  const { mistakes = [], showMe = [] } = options;
  const { steps, deal } = await engineSteps(page, key);
  const asks = steps.filter((s) => s.ask).map((s) => s.ask);
  for (let i = 0; i < asks.length; i++) {
    const t = await untilWaiting(page);
    expect(t.finish, 'finished before question ' + i).toBeNull();
    await tick(page, 300); // past the settle time after each move
    if (mistakes.includes(i)) {
      await answerWrong(page, asks[i], deal);
      await tick(page, 300);
    }
    if (showMe.includes(i)) await page.locator('#btn-show').click();
    else await answerWith(page, asks[i]);
  }
  const end = await untilWaiting(page);
  return { steps, deal, asks, end };
}

// Visible text below WCAG AA contrast (4.5:1, or 3:1 for large text), as a list of problems.
// Backgrounds are blended up the tree; disabled controls and dimmed cards are exempt.
async function lowContrast(page) {
  return page.evaluate(() => {
    const parse = (c) => {
      const m = c.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return { r, g, b, a };
    };
    const lum = ({ r, g, b }) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const over = (top, bottom) => ({
      r: top.r * top.a + bottom.r * (1 - top.a),
      g: top.g * top.a + bottom.g * (1 - top.a),
      b: top.b * top.a + bottom.b * (1 - top.a),
      a: 1
    });
    // Background behind an element: blend each layer up the tree onto the page colour.
    const background = (el) => {
      const layers = [];
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
        const bg = parse(getComputedStyle(n).backgroundColor);
        if (bg && bg.a > 0) {
          layers.push(bg);
          if (bg.a === 1) break;
        }
      }
      let color = { r: 255, g: 255, b: 255, a: 1 };
      for (let i = layers.length - 1; i >= 0; i--) color = over(layers[i], color);
      return color;
    };
    const dimmed = (el) => {
      for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
        if (parseFloat(getComputedStyle(n).opacity) < 1 || n.getAttribute('aria-disabled') === 'true' || n.disabled) return true;
      }
      return false;
    };
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      if (!node.textContent.trim() || !el.getClientRects().length) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || el.closest('[hidden], script, style, noscript, .back')) continue;
      if (dimmed(el)) continue; // disabled controls and ruled-out cards are exempt
      const fg = over(parse(cs.color), background(el));
      const bg = background(el);
      const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a);
      const ratio = (l1 + 0.05) / (l2 + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) out.push(node.textContent.trim().slice(0, 30) + ' ' + ratio.toFixed(2));
    }
    return out;
  });
}

module.exports = {
  lowContrast,
  ALGOS, NAMES, SPEED_STEPS, BASE_MS, useLocalFonts, openDemo, tick, tabKey, relayout, settleAnimations, chooseAlgo, chooseMode, chooseDeal, chooseSpeed, readTable,
  engineSteps, expectTableMatches, untilWaiting, answerWith, answerWrong, playTry
};
