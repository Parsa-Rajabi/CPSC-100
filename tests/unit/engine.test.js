// Engine tests: the five algorithms against the W5A slides, independent reference
// implementations, and every possible deal of 8 cards. Run: npm run test:unit
'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {
  E, ENGINE_PATH, SORTS, SEARCHES, rankOf, hearts, clubs, fromRanks, labels, last,
  eachPermutation, mulberry32, reference, validateSteps
} = require('./helpers');

const LECTURE = '5 A 8 3 6 2 7 4';
const NEARLY = 'A 2 3 4 5 7 6 8';

describe('numbers from the W5A slides', () => {
  test('lecture deal: selection 28, insertion 19, bubble 25', () => {
    assert.deepEqual(E.compareSorts(hearts(LECTURE)), { selection: 28, insertion: 19, bubble: 25 });
  });

  test('nearly sorted deal: selection 28, insertion 8, bubble 13', () => {
    assert.deepEqual(E.compareSorts(hearts(NEARLY)), { selection: 28, insertion: 8, bubble: 13 });
  });

  test('bubble sort passes on the lecture deal', () => {
    const steps = E.run('bubble', hearts(LECTURE));
    const passEnds = steps.filter((s) => s.line === 0).map((s) => [labels(s.order), s.counts.comparisons]);
    assert.deepEqual(passEnds, [
      ['A 5 3 6 2 7 4 8', 7],
      ['A 3 5 2 6 4 7 8', 13],
      ['A 3 2 5 4 6 7 8', 18],
      ['A 2 3 4 5 6 7 8', 22],
      ['A 2 3 4 5 6 7 8', 25]
    ]);
    assert.match(last(steps).say, /no swaps/);
  });

  test('insertion sort after placing each card of the lecture deal', () => {
    const steps = E.run('insertion', hearts(LECTURE));
    const placed = steps
      .filter((s) => s.line === 1 && (!s.ask || s.ask.answer === false))
      .map((s) => [labels(s.order), s.counts.comparisons]);
    assert.deepEqual(placed, [
      ['A 5 8 3 6 2 7 4', 1],
      ['A 5 8 3 6 2 7 4', 2],
      ['A 3 5 8 6 2 7 4', 5],
      ['A 3 5 6 8 2 7 4', 7],
      ['A 2 3 5 6 8 7 4', 12],
      ['A 2 3 5 6 7 8 4', 14],
      ['A 2 3 4 5 6 7 8', 19]
    ]);
  });

  test('selection sort on the lecture deal: 28 comparisons, 5 swaps', () => {
    assert.deepEqual(last(E.run('selection', hearts(LECTURE))).counts, { comparisons: 28, swaps: 5 });
  });

  test('binary search for 7 on A-9 flips the 5, then the 7', () => {
    const steps = E.run('binary', clubs('A 2 3 4 5 6 7 8 9'), { target: 'c7' });
    const flips = steps.filter((s, i) => i > 0 && s.faceUp.length > steps[i - 1].faceUp.length)
      .map((s) => last(s.faceUp));
    assert.deepEqual(flips, ['c5', 'c7']);
    assert.equal(last(steps).counts.flips, 2);
  });

  test('binary search on 9 sorted cards never needs more than 4 flips', () => {
    const row = clubs('A 2 3 4 5 6 7 8 9');
    const flips = row.map((c) => last(E.run('binary', row, { target: c.id })).counts.flips);
    assert.equal(Math.max(...flips), 4);
    assert.deepEqual(flips, [3, 2, 3, 4, 1, 3, 2, 3, 4]);
  });

  test('linear search for 5 on 8 3 6 A 9 5 2 7 4 takes 6 flips', () => {
    assert.equal(last(E.run('linear', clubs('8 3 6 A 9 5 2 7 4'), { target: 'c5' })).counts.flips, 6);
  });

  test('finish-screen comparisons for the search rows', () => {
    assert.deepEqual(E.compareSearches(clubs('A 2 3 4 5 6 7 8 9'), 'c7'), { linear: 7, binary: 2, sorted: true });
    assert.deepEqual(E.compareSearches(clubs('8 3 6 A 9 5 2 7 4'), 'c5'), { linear: 6, binary: 1, sorted: false });
  });

  test('the lecture deals in DEALS', () => {
    assert.equal(E.DEALS.sortLecture, LECTURE);
    assert.equal(E.DEALS.sortNearly, NEARLY);
    assert.equal(E.DEALS.linearLecture, '8 3 6 A 9 5 2 7 4');
    assert.equal(E.DEALS.linearTarget, 5);
    assert.equal(E.DEALS.binaryLecture, 'A 2 3 4 5 6 7 8 9');
    assert.equal(E.DEALS.binaryTarget, 7);
  });
});

describe('every deal follows the rules', () => {
  test('the lecture deals pass the step validator', () => {
    for (const key of SORTS) {
      validateSteps(key, hearts(LECTURE), E.run(key, hearts(LECTURE)));
      validateSteps(key, hearts(NEARLY), E.run(key, hearts(NEARLY)));
    }
    validateSteps('linear', clubs('8 3 6 A 9 5 2 7 4'), E.run('linear', clubs('8 3 6 A 9 5 2 7 4'), { target: 'c5' }), 'c5');
    validateSteps('binary', clubs('A 2 3 4 5 6 7 8 9'), E.run('binary', clubs('A 2 3 4 5 6 7 8 9'), { target: 'c7' }), 'c7');
  });

  test('all 40,320 deals of 8 cards: counts match the reference sorts', () => {
    eachPermutation(8, (ranks) => {
      const deal = fromRanks(ranks);
      for (const key of SORTS) {
        const got = last(E.run(key, deal)).counts;
        assert.deepEqual(got, reference[key](ranks), key + ' on ' + ranks.join(' '));
      }
    });
  });

  test('all 40,320 deals of 8 cards: every step passes the validator', () => {
    eachPermutation(8, (ranks) => {
      const deal = fromRanks(ranks);
      for (const key of SORTS) validateSteps(key, deal, E.run(key, deal));
    });
  });

  test('every deal of 1 to 7 cards passes the validator', () => {
    for (let n = 1; n <= 7; n++) {
      eachPermutation(n, (ranks) => {
        const deal = fromRanks(ranks);
        for (const key of SORTS) {
          validateSteps(key, deal, E.run(key, deal));
          assert.deepEqual(last(E.run(key, deal)).counts, reference[key](ranks));
        }
      });
    }
  });

  test('an empty deal does not crash', () => {
    for (const key of SORTS) {
      const steps = E.run(key, []);
      assert.ok(steps.length >= 1);
      assert.deepEqual(last(steps).counts, { comparisons: 0, swaps: 0 });
    }
  });

  test('selection sort always makes n(n-1)/2 comparisons', () => {
    for (let n = 1; n <= 9; n++) {
      const deal = fromRanks(Array.from({ length: n }, (_, i) => n - i));
      assert.equal(last(E.run('selection', deal)).counts.comparisons, (n * (n - 1)) / 2);
    }
  });

  test('best and worst cases', () => {
    const sorted = fromRanks([1, 2, 3, 4, 5, 6, 7, 8]);
    const reversed = fromRanks([8, 7, 6, 5, 4, 3, 2, 1]);
    assert.deepEqual(E.compareSorts(sorted), { selection: 28, insertion: 7, bubble: 7 });
    assert.deepEqual(E.compareSorts(reversed), { selection: 28, insertion: 28, bubble: 28 });
    assert.equal(last(E.run('bubble', reversed)).counts.swaps, 28);
    assert.equal(last(E.run('selection', reversed)).counts.swaps, 4);
  });

  test('linear search: every target in every deal of 6 cards, and 9-card deals', () => {
    eachPermutation(6, (ranks) => {
      const row = fromRanks(ranks, 'clubs');
      for (const card of row) {
        const steps = validateSteps('linear', row, E.run('linear', row, { target: card.id }), card.id);
        assert.deepEqual(last(steps).counts, reference.linear(ranks, card.rank));
      }
    });
    const rand = mulberry32(2026);
    for (let t = 0; t < 2000; t++) {
      const row = E.shuffle(fromRanks([1, 2, 3, 4, 5, 6, 7, 8, 9], 'clubs'), rand);
      const target = row[Math.floor(rand() * 9)];
      validateSteps('linear', row, E.run('linear', row, { target: target.id }), target.id);
    }
  });

  test('binary search: every target on sorted rows of 1 to 9 cards', () => {
    for (let n = 1; n <= 9; n++) {
      const ranks = Array.from({ length: n }, (_, i) => i + 1);
      const row = fromRanks(ranks, 'clubs');
      for (const card of row) {
        const steps = validateSteps('binary', row, E.run('binary', row, { target: card.id }), card.id);
        assert.deepEqual(last(steps).counts, reference.binary(ranks, card.rank));
      }
    }
  });

  test('binary search on rows with gaps in the ranks', () => {
    const row = clubs('A 3 4 7 9');
    for (const card of row) {
      validateSteps('binary', row, E.run('binary', row, { target: card.id }), card.id);
    }
  });

  test('a target that is not in the row throws instead of looping', () => {
    assert.throws(() => E.run('linear', clubs('A 2 3'), { target: 'c9' }), /not in the deal/);
    assert.throws(() => E.run('binary', clubs('A 2 3'), { target: 'c9' }), /not in the deal/);
    assert.throws(() => E.run('binary', clubs('A 2 3'), {}), /not in the deal/);
  });

  test('binary search refuses cards that are not sorted', () => {
    assert.throws(() => E.run('binary', clubs('3 A 2'), { target: 'c2' }), /needs the cards sorted/);
  });

  test('2,000 random deals with clubs and hearts', () => {
    const rand = mulberry32(7);
    for (let t = 0; t < 2000; t++) {
      const suit = t % 2 ? 'clubs' : 'hearts';
      const deal = E.shuffle(fromRanks([1, 2, 3, 4, 5, 6, 7, 8], suit), rand);
      for (const key of SORTS) validateSteps(key, deal, E.run(key, deal));
    }
  });
});

describe('snapshots are independent', () => {
  test('changing one step does not change another', () => {
    for (const key of [...SORTS, ...SEARCHES]) {
      const deal = key === 'binary' ? clubs('A 2 3 4 5 6 7 8 9') : key === 'linear' ? clubs('8 3 6 A 9 5 2 7 4') : hearts(LECTURE);
      const steps = E.run(key, deal, { target: key === 'binary' ? 'c7' : 'c5' });
      const copy = JSON.parse(JSON.stringify(steps));
      for (const s of steps) {
        for (const f of ['order', 'faceUp', 'focus', 'sorted', 'ruledOut', 'marked']) s[f].push('x');
        s.counts.extra = 1;
      }
      steps.forEach((s, i) => {
        for (const f of ['order', 'faceUp', 'focus', 'sorted', 'ruledOut', 'marked']) {
          assert.deepEqual(s[f], copy[i][f].concat('x'), key + ' step ' + i + ' ' + f + ' is shared');
        }
      });
    }
  });

  test('running an algorithm does not change the deal', () => {
    const deal = hearts(LECTURE);
    const before = JSON.stringify(deal);
    for (const key of SORTS) E.run(key, deal);
    assert.equal(JSON.stringify(deal), before);
  });
});

describe('cards and helpers', () => {
  test('cards: ids, labels and names', () => {
    assert.deepEqual(E.makeCard(1, 'hearts'), { id: 'h1', rank: 1, suit: 'hearts' });
    assert.deepEqual(E.makeCard(9, 'clubs'), { id: 'c9', rank: 9, suit: 'clubs' });
    assert.equal(E.rankLabel(1), 'A');
    assert.equal(E.rankLabel(7), '7');
    assert.equal(E.cardName(E.makeCard(1, 'hearts')), 'ace of hearts');
    assert.equal(E.cardName(E.makeCard(5, 'clubs')), '5 of clubs');
    assert.deepEqual(hearts('5 A 8').map((c) => c.id), ['h5', 'h1', 'h8']);
    assert.deepEqual(clubs('  A   9 ').map((c) => c.rank), [1, 9]);
  });

  test('shuffle returns a new permutation and leaves the input alone', () => {
    const deal = hearts(LECTURE);
    const before = JSON.stringify(deal);
    const rand = mulberry32(1);
    const seen = new Set();
    for (let i = 0; i < 200; i++) {
      const s = E.shuffle(deal, rand);
      assert.deepEqual(s.map((c) => c.id).sort(), deal.map((c) => c.id).sort());
      seen.add(labels(s.map((c) => c.id)));
    }
    assert.equal(JSON.stringify(deal), before);
    assert.ok(seen.size > 150, 'shuffle repeats too often: ' + seen.size);
    assert.equal(E.shuffle(deal).length, 8); // default Math.random
  });

  test('shuffle is fair: each card lands in each spot about equally often', () => {
    const rand = mulberry32(99);
    const n = 8;
    const trials = 40000;
    const counts = Array.from({ length: n }, () => new Array(n).fill(0));
    const deal = fromRanks([1, 2, 3, 4, 5, 6, 7, 8]);
    for (let t = 0; t < trials; t++) {
      E.shuffle(deal, rand).forEach((c, pos) => counts[c.rank - 1][pos]++);
    }
    const expected = trials / n;
    for (const row of counts) for (const c of row) assert.ok(Math.abs(c - expected) < expected * 0.08, 'biased: ' + c);
  });

  test('isSorted and sortedCopy', () => {
    assert.equal(E.isSorted(hearts('A 2 3')), true);
    assert.equal(E.isSorted(hearts('A 3 2')), false);
    assert.equal(E.isSorted([]), true);
    const deal = hearts('3 A 2');
    assert.deepEqual(E.sortedCopy(deal).map((c) => c.rank), [1, 2, 3]);
    assert.deepEqual(deal.map((c) => c.rank), [3, 1, 2], 'sortedCopy changed its input');
  });

  test('plural', () => {
    assert.equal(E.plural(0, 'flip'), '0 flips');
    assert.equal(E.plural(1, 'flip'), '1 flip');
    assert.equal(E.plural(2, 'mistake'), '2 mistakes');
  });
});

describe('wrong-move messages', () => {
  function cardsOf(deal) {
    return Object.fromEntries(deal.map((c) => [c.id, c]));
  }

  test('every wrong choice at every question gets a reason and the hint', () => {
    const cases = [
      ['insertion', hearts(LECTURE)], ['bubble', hearts(LECTURE)], ['selection', hearts(LECTURE)],
      ['insertion', hearts(NEARLY)], ['bubble', hearts(NEARLY)], ['selection', hearts(NEARLY)],
      ['linear', clubs('8 3 6 A 9 5 2 7 4'), 'c5'], ['binary', clubs('A 2 3 4 5 6 7 8 9'), 'c9'],
      ['binary', clubs('A 2 3 4 5 6 7 8 9'), 'c1']
    ];
    for (const [key, deal, target] of cases) {
      for (const s of E.run(key, deal, { target }).filter((x) => x.ask)) {
        const wrongs = s.ask.kind === 'swap' ? [!s.ask.answer] : s.order.filter((id) => id !== s.ask.answer);
        for (const choice of wrongs) {
          const msg = E.explainWrong(key, s, choice, cardsOf(deal));
          assert.ok(msg.endsWith(s.ask.hint), key + ': hint missing from ' + msg);
          assert.doesNotMatch(msg, /^wrong/i);
          assert.ok(msg.length > s.ask.hint.length, key + ': no reason before the hint');
        }
      }
    }
  });

  test('the reason names what went wrong', () => {
    const deal = clubs('A 2 3 4 5 6 7 8 9');
    const cards = cardsOf(deal);
    const steps = E.run('binary', deal, { target: 'c9' });
    const afterFirst = steps.find((s) => s.ask && s.ruledOut.length);
    assert.match(E.explainWrong('binary', afterFirst, 'c1', cards), /ruled out/);
    assert.match(E.explainWrong('binary', afterFirst, 'c5', cards), /already face up/);
    assert.match(E.explainWrong('binary', afterFirst, 'c9', cards), /not the middle card/);

    const row = clubs('8 3 6 A 9 5 2 7 4');
    const lin = E.run('linear', row, { target: 'c5' });
    assert.match(E.explainWrong('linear', lin[0], 'c6', cardsOf(row)), /never skips ahead/);
    assert.match(E.explainWrong('linear', lin[2], 'c8', cardsOf(row)), /already face up/);

    const sel = E.run('selection', hearts(LECTURE)).filter((s) => s.ask);
    assert.match(E.explainWrong('selection', sel[0], 'h5', cardsOf(hearts(LECTURE))), /smaller card than 5/);
    assert.match(E.explainWrong('selection', sel[1], 'h1', cardsOf(hearts(LECTURE))), /already sorted/);
  });
});

describe('content', () => {
  // Pseudocode from the W5A slides (bubble sort wording from the handover).
  const SLIDES = {
    linear: ['[0] **For each** card, left to right:', '[1] Flip it',
      '[1] **If** it\'s the one you want → stop, found it!'],
    binary: ['[0] Flip the middle card', '[0] **Repeat until** you find it:',
      '[1] **If** too small → ignore it and everything to its left',
      '[1] **If** too big → ignore it and everything to its right',
      '[1] Flip the middle of the cards that are left'],
    selection: ['[0] **Repeat until** no unsorted cards are left:', '[1] **For each** unsorted card:',
      '[2] **If** it\'s the smallest so far → remember it',
      '[1] Move the smallest to the end of the sorted row'],
    insertion: ['[0] **For each** card, starting with the 2nd:',
      '[1] **Repeat until** the card on its left is smaller:', '[2] Swap it one spot to the left'],
    bubble: ['[0] **Repeat until** a pass makes no swaps:',
      '[1] **For each** pair of neighbours in the unsorted part:',
      '[2] **If** the left card is bigger → swap them']
  };
  const PILLS = {
    linear: ['Iteration', 'Selection'], binary: ['Iteration', 'Selection', 'Sequencing'],
    selection: ['Iteration', 'Selection'], insertion: ['Iteration', 'Selection'], bubble: ['Iteration', 'Selection']
  };

  test('pseudocode and pills match the slides', () => {
    for (const key of E.ORDER) {
      const a = E.ALGORITHMS[key];
      assert.deepEqual(a.code.map((l) => '[' + l.indent + '] ' + l.text), SLIDES[key], key);
      assert.deepEqual(a.pills, PILLS[key], key);
    }
  });

  test('the five algorithms, in lecture order', () => {
    assert.deepEqual(E.ORDER, ['linear', 'binary', 'selection', 'insertion', 'bubble']);
    assert.deepEqual(Object.keys(E.ALGORITHMS).sort(), E.ORDER.slice().sort());
    for (const key of E.ORDER) {
      const a = E.ALGORITHMS[key];
      assert.equal(a.key, key);
      assert.equal(a.kind, SEARCHES.includes(key) ? 'search' : 'sort');
      assert.ok(a.name && a.idea && a.goal);
      assert.doesNotMatch(a.idea, /'/, key + ' idea has a contraction');
    }
  });

  test('every line highlights a line that exists, and every line gets used', () => {
    for (const key of E.ORDER) {
      const deal = key === 'binary' ? clubs('A 2 3 4 5 6 7 8 9') : key === 'linear' ? clubs('8 3 6 A 9 5 2 7 4') : hearts(LECTURE);
      const lines = new Set();
      // Use several targets so every branch runs.
      for (const target of ['c1', 'c5', 'c9', 'c2']) {
        for (const s of E.run(key, deal, { target })) if (s.line !== null) lines.add(s.line);
      }
      assert.deepEqual([...lines].sort(), E.ALGORITHMS[key].code.map((_, i) => i), key + ' leaves a line unused');
    }
  });
});

describe('module formats', () => {
  const source = fs.readFileSync(ENGINE_PATH, 'utf8');

  test('loads as a browser global without module', () => {
    const sandbox = {};
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox);
    assert.equal(typeof sandbox.CardEngine.run, 'function');
    const steps = sandbox.CardEngine.run('insertion', sandbox.CardEngine.parseDeal(LECTURE, 'hearts'));
    assert.equal(steps[steps.length - 1].counts.comparisons, 19);
  });

  test('loads as CommonJS without a window', () => {
    const sandbox = { module: { exports: {} } };
    vm.createContext(sandbox);
    vm.runInContext(source, sandbox);
    assert.equal(typeof sandbox.module.exports.compareSorts, 'function');
    assert.equal(sandbox.window, undefined);
  });

  test('has no DOM code', () => {
    const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    assert.doesNotMatch(code, /\bdocument\b|\bnavigator\b|localStorage|addEventListener|querySelector|innerHTML/);
    assert.equal((code.match(/\bwindow\b/g) || []).length, 2, 'window is only used to export the global');
  });
});
