// Shared helpers for the engine tests: deals, reference algorithms, and a step validator.
'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');

const ENGINE_PATH = path.join(__dirname, '..', '..', 'docs', 'demos', 'cards-engine.js');
const E = require(ENGINE_PATH);

const rankOf = (id) => Number(id.slice(1));
const hearts = (text) => E.parseDeal(text, 'hearts');
const clubs = (text) => E.parseDeal(text, 'clubs');
const fromRanks = (ranks, suit) => ranks.map((r) => E.makeCard(r, suit || 'hearts'));
const labels = (order) => order.map((id) => E.rankLabel(rankOf(id))).join(' ');
const last = (steps) => steps[steps.length - 1];

// Every ordering of 1..n, in place (Heap's algorithm), calling fn with a fresh copy.
function eachPermutation(n, fn) {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  const c = new Array(n).fill(0);
  fn(a.slice());
  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      const j = i % 2 === 0 ? 0 : c[i];
      [a[j], a[i]] = [a[i], a[j]];
      fn(a.slice());
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
}

// Seeded random numbers, so a failing random deal can be replayed.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Reference implementations, written independently of the engine, straight from the
// rules in the W5A slides. They return the counts the engine must match.
const reference = {
  selection(ranks) {
    const a = ranks.slice();
    let comparisons = 0;
    let swaps = 0;
    for (let i = 0; i < a.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < a.length; j++) {
        comparisons++;
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) {
        [a[i], a[min]] = [a[min], a[i]];
        swaps++;
      }
    }
    return { comparisons, swaps };
  },
  insertion(ranks) {
    const a = ranks.slice();
    let comparisons = 0;
    let swaps = 0;
    for (let i = 1; i < a.length; i++) {
      for (let j = i; j > 0; j--) {
        comparisons++; // no comparison once the card reaches the left end
        if (a[j - 1] < a[j]) break;
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        swaps++;
      }
    }
    return { comparisons, swaps };
  },
  bubble(ranks) {
    const a = ranks.slice();
    let comparisons = 0;
    let swaps = 0;
    for (let end = a.length - 1; end >= 1; end--) {
      let passSwaps = 0;
      for (let k = 0; k < end; k++) {
        comparisons++;
        if (a[k] > a[k + 1]) {
          [a[k], a[k + 1]] = [a[k + 1], a[k]];
          passSwaps++;
        }
      }
      swaps += passSwaps;
      if (passSwaps === 0) break;
    }
    return { comparisons, swaps };
  },
  linear(ranks, target) {
    return { flips: ranks.indexOf(target) + 1 };
  },
  binary(ranks, target) {
    let low = 0;
    let high = ranks.length - 1;
    let flips = 0;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      flips++;
      if (ranks[mid] === target) return { flips };
      if (ranks[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    throw new Error('target not found');
  }
};

// Text shown to students: clean, full words, correct plurals. Sentences repeat across
// deals, so each one is checked once.
const checkedText = new Set();
function assertCleanText(text, where) {
  if (checkedText.has(text)) return;
  assert.equal(typeof text, 'string', where + ': not a string');
  assert.ok(text.length > 0, where + ': empty');
  assert.equal(text, text.trim(), where + ': leading or trailing space');
  assert.doesNotMatch(text, /undefined|NaN|null|\[object/, where + ': ' + text);
  assert.doesNotMatch(text, / {2}/, where + ': double space in ' + JSON.stringify(text));
  assert.doesNotMatch(text, /—/, where + ': em dash in ' + text);
  // Full words, no contractions (site writing style). Pseudocode is checked elsewhere.
  assert.doesNotMatch(text, /'/, where + ': apostrophe in ' + text);
  assert.doesNotMatch(text, /\b1 (unsorted )?(cards|comparisons|swaps|flips)\b/, where + ': ' + text);
  // "Should 7 swap with 5?" is the verb, not a count.
  assert.doesNotMatch(text, /\b([02-9]|\d{2,}) (unsorted )?(card|comparison|flip)\b|\b([02-9]|\d{2,}) swap\b(?! with)/,
    where + ': ' + text);
  assert.match(text, /[.!?]$/, where + ': no end punctuation in ' + text);
  checkedText.add(text);
}

const STEP_KEYS = 'ask,counts,faceUp,focus,line,marked,order,phase,ruledOut,say,sorted';
const checkedPhase = new Set();

function sameSet(a, b) {
  if (a.length !== b.length) return false;
  for (const x of a) if (!b.includes(x)) return false;
  return true;
}

const SORTS = ['selection', 'insertion', 'bubble'];
const SEARCHES = ['linear', 'binary'];
const ARRAY_FIELDS = ['order', 'faceUp', 'focus', 'sorted', 'ruledOut', 'marked'];
const MONOTONIC_FIELDS = ['faceUp', 'sorted', 'ruledOut']; // cards only ever join these

function changedPositions(a, b) {
  const out = [];
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) out.push(i);
  return out;
}

// Checks every rule a run of steps must follow. `target` is the card id for searches.
function validateSteps(key, deal, steps, target) {
  const algo = E.ALGORITHMS[key];
  const ids = deal.map((c) => c.id);
  const idSet = new Set(ids);
  const sort = algo.kind === 'sort';
  const finalOrder = ids.slice().sort((a, b) => rankOf(a) - rankOf(b));
  const where = (i) => key + ' [' + labels(ids) + '] step ' + i;

  assert.ok(Array.isArray(steps) && steps.length >= 1, key + ': no steps');

  steps.forEach((s, i) => {
    try {
      checkStep(s, i);
    } catch (err) {
      // Name the deal and step only on failure; building it for every step is slow.
      err.message = where(i) + ': ' + err.message;
      throw err;
    }
  });

  function checkStep(s, i) {
    const w = '';
    // Shape
    assert.equal(Object.keys(s).sort().join(), STEP_KEYS, w + ': step fields');
    // Hot loops build their messages only when a check fails.
    for (const f of ARRAY_FIELDS) {
      const arr = s[f];
      if (!Array.isArray(arr)) assert.fail(f + ' is not an array');
      for (let k = 0; k < arr.length; k++) {
        if (!idSet.has(arr[k])) assert.fail('unknown card ' + arr[k] + ' in ' + f);
        if (arr.indexOf(arr[k]) !== k) assert.fail('duplicate ' + arr[k] + ' in ' + f);
      }
    }
    assert.equal(s.order.length, ids.length, w + ': order is not a permutation');
    assert.ok(s.line === null || (Number.isInteger(s.line) && s.line >= 0 && s.line < algo.code.length),
      w + ': bad line ' + s.line);
    assertCleanText(s.say, w + ' say');
    // The status line: short, no sentence punctuation, full words.
    if (!checkedPhase.has(s.phase)) {
      assert.equal(typeof s.phase, 'string', w + ': phase');
      assert.match(s.phase, /^[A-Z0-9][\w \u00B7]{2,40}$/, w + ': phase ' + JSON.stringify(s.phase));
      assert.doesNotMatch(s.phase, /undefined|NaN|'|\b1 (cards|unsorted cards)\b/, w + ': phase ' + s.phase);
      checkedPhase.add(s.phase);
    }
    assert.equal(Object.keys(s.counts).sort().join(), sort ? 'comparisons,swaps' : 'flips', w + ': count names');
    for (const v of Object.values(s.counts)) assert.ok(Number.isInteger(v) && v >= 0, w + ': count ' + v);

    // What each kind of algorithm may use
    if (sort) {
      assert.ok(sameSet(s.faceUp, ids), w + ': sorts keep every card face up');
      assert.equal(s.ruledOut.length, 0, w + ': only binary search rules cards out');
    } else {
      assert.equal(s.sorted.length, 0, w + ': searches do not sort');
      assert.equal(s.order.join(), ids.join(), w + ': searches never move cards');
      assert.ok(!s.ruledOut.includes(target), w + ': the target was ruled out');
    }
    if (key !== 'binary') assert.equal(s.ruledOut.length, 0, w + ': ruled out');
    if (key !== 'selection') assert.equal(s.marked.length, 0, w + ': marked');
    assert.ok(s.marked.length <= 1, w + ': more than one smallest so far');
    for (const m of s.marked) if (s.sorted.includes(m)) assert.fail('marked card is already sorted');

    // Locked-in cards are in their final place.
    for (const id of s.sorted) {
      if (s.order.indexOf(id) !== finalOrder.indexOf(id)) assert.fail(id + ' locked in the wrong place');
    }

    // The ask, if any
    if (s.ask) {
      assert.ok(i < steps.length - 1, w + ': ask on the last step');
      for (const k of Object.keys(s.ask)) {
        assert.ok(['kind', 'answer', 'hint', 'question', 'explain'].includes(k), w + ': unknown ask field ' + k);
      }
      assertCleanText(s.ask.hint, w + ' hint');
      assertCleanText(s.ask.question, w + ' question');
      assert.match(s.ask.question, /\?$|Click it\.$|unsorted part\.$/, w + ': ' + s.ask.question);
      if (s.ask.explain !== undefined) assertCleanText(s.ask.explain, w + ' explain');
      if (s.ask.kind === 'swap') {
        assert.ok(key === 'insertion' || key === 'bubble', w + ': swap ask in ' + key);
        assert.equal(typeof s.ask.answer, 'boolean', w);
        assert.equal(s.focus.length, 2, w + ': a swap question compares two cards');
        const [a, b] = s.focus.map(rankOf);
        // insertion focus is [card, left]; bubble focus is [left, right]
        const expected = key === 'insertion' ? b > a : a > b;
        assert.equal(s.ask.answer, expected, w + ': swap answer contradicts the ranks');
      } else {
        assert.equal(s.ask.kind, 'pick', w);
        assert.ok(idSet.has(s.ask.answer), w + ': pick answer is not a card');
        if (key === 'linear') {
          assert.equal(s.ask.answer, s.order.find((id) => !s.faceUp.includes(id)), w + ': not the leftmost face-down card');
        } else if (key === 'binary') {
          const open = s.order.map((id, k) => (s.ruledOut.includes(id) ? -1 : k)).filter((k) => k >= 0);
          const mid = Math.floor((open[0] + open[open.length - 1]) / 2);
          assert.equal(open.length, open[open.length - 1] - open[0] + 1, w + ': cards left are not one block');
          assert.equal(s.ask.answer, s.order[mid], w + ': not the left-middle card');
        } else if (key === 'selection') {
          const unsorted = s.order.filter((id) => !s.sorted.includes(id));
          const min = unsorted.reduce((m, id) => (rankOf(id) < rankOf(m) ? id : m));
          assert.equal(s.ask.answer, min, w + ': not the smallest unsorted card');
        } else {
          assert.fail(w + ': pick ask in ' + key);
        }
      }
    }

    if (i === 0) {
      assert.match(s.phase, /^Ready to (sort|search)/, w + ': step 0 phase');
      assert.deepEqual(s.order, ids, w + ': step 0 is the deal');
      assert.deepEqual(s.focus, [], w);
      assert.deepEqual(s.sorted, [], w);
      for (const v of Object.values(s.counts)) assert.equal(v, 0, w + ': counts start at 0');
      if (!sort) assert.equal(s.faceUp.length, 0, w + ': search cards start face down');
      return;
    }

    // Change from the previous step
    const p = steps[i - 1];
    // The narration is a live region: a repeated sentence would not be read out.
    if (s.say === p.say) assert.fail('same narration as the step before: ' + s.say);
    for (const k in s.counts) {
      const d = s.counts[k] - p.counts[k];
      if (d !== 0 && d !== 1) assert.fail(k + ' jumped by ' + d);
    }
    for (const f of MONOTONIC_FIELDS) {
      for (const id of p[f]) if (!s[f].includes(id)) assert.fail(id + ' left ' + f);
    }
    for (const id of p.sorted) {
      if (s.order.indexOf(id) !== p.order.indexOf(id)) assert.fail('a locked-in card moved');
    }
    const moved = changedPositions(p.order, s.order);
    if (sort) {
      assert.ok(moved.length === 0 || moved.length === 2, w + ': more than one swap in a step');
      if (moved.length === 2) {
        assert.equal(p.order[moved[0]], s.order[moved[1]], w + ': not a swap');
        if (key !== 'selection') assert.equal(moved[1] - moved[0], 1, w + ': swap of cards that are not neighbours');
        // The swapped cards are the ones in focus.
        assert.ok(sameSet(s.focus, [p.order[moved[0]], p.order[moved[1]]]), w + ': swapped cards are not in focus');
      }
      assert.equal(s.counts.swaps - p.counts.swaps, moved.length ? 1 : 0, w + ': swap count does not match the move');
      if (s.counts.comparisons > p.counts.comparisons) {
        assert.equal(s.focus.length, 2, w + ': a comparison needs two cards in focus');
        assert.equal(moved.length, 0, w + ': compare and swap in one step');
      }
      if (key !== 'selection' && s.counts.comparisons > p.counts.comparisons) {
        assert.ok(s.ask && s.ask.kind === 'swap', w + ': every comparison asks Swap or Do not swap');
      }
    } else {
      const flipped = s.faceUp.filter((id) => !p.faceUp.includes(id));
      assert.equal(flipped.length, s.counts.flips - p.counts.flips, w + ': flips do not match cards turned over');
      if (flipped.length) assert.deepEqual(s.focus, flipped, w + ': the flipped card is in focus');
    }

    // An ask must match what happens next.
    if (p.ask) {
      if (p.ask.kind === 'swap') {
        assert.equal(moved.length === 2, p.ask.answer, w + ': next step does not follow the swap answer');
      } else if (key === 'selection') {
        let j = i;
        while (steps[j].sorted.length === p.sorted.length) j++;
        assert.equal(last(steps[j].sorted), p.ask.answer, w + ': next card sorted is not the answer');
        for (let k = i; k < j; k++) {
          assert.equal(steps[k].ask, null, where(k) + ': a new question before the pick finished');
        }
      } else {
        assert.deepEqual(s.faceUp.filter((id) => !p.faceUp.includes(id)), [p.ask.answer],
          w + ': next flip is not the answer');
      }
    }
  }

  const end = last(steps);
  assert.equal(end.ask, null);
  assert.equal(end.phase, sort ? 'Sorted' : 'Found it', key + ': final phase');
  if (sort) {
    assert.deepEqual(end.order, finalOrder, key + ': did not sort ' + labels(ids));
    assert.deepEqual(end.sorted.slice().sort(), ids.slice().sort(), key + ': not every card locked in');
    const n = ids.length;
    assert.ok(end.counts.comparisons <= (n * (n - 1)) / 2, key + ': more than n(n-1)/2 comparisons');
    assert.match(end.say, new RegExp('Sorted in ' + end.counts.comparisons + ' comparisons? and ' +
      end.counts.swaps + ' swaps?\\.$'), key + ': final line does not give the totals');
  } else {
    assert.ok(end.faceUp.includes(target), key + ': ended without the target face up');
    assert.deepEqual(end.focus, [target], key + ': ended without the target in focus');
    assert.ok(end.counts.flips <= ids.length);
    assert.match(end.say, /[Ff]ound it/, key + ': final line does not say found');
  }

  // Questions: one per comparison for insertion and bubble, one per pass for selection,
  // one per flip for the searches.
  const asks = steps.filter((s) => s.ask).length;
  if (key === 'selection') assert.equal(asks, Math.max(0, ids.length - 1));
  else if (sort) assert.equal(asks, end.counts.comparisons);
  else assert.equal(asks, end.counts.flips);
  return steps;
}

module.exports = {
  E, ENGINE_PATH, SORTS, SEARCHES, rankOf, hearts, clubs, fromRanks, labels, last,
  eachPermutation, mulberry32, reference, assertCleanText, validateSteps
};
