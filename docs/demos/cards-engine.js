/*
 * Card Demos engine: step generators for the five W5A card algorithms.
 *
 * No DOM code lives here, so the same file runs in the browser (window.CardEngine)
 * and in Node (module.exports) for testing.
 *
 * Every generator returns an array of full snapshots. Step 0 is the starting row, and
 * each later step is the whole table after one move, so the page can jump to any step
 * (Back, Reset) by rendering that snapshot. A step with an `ask` is a decision point:
 * `ask.answer` is what the algorithm does in the very next step(s).
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  if (root) {
    root.CardEngine = api;
  }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // Cards ------------------------------------------------------------------

  var SUIT_SYMBOL = { hearts: '♥', clubs: '♣' };

  function rankLabel(rank) {
    return rank === 1 ? 'A' : String(rank);
  }

  function cardName(card) {
    return (card.rank === 1 ? 'ace' : String(card.rank)) + ' of ' + card.suit;
  }

  function makeCard(rank, suit) {
    return { id: suit.charAt(0) + rank, rank: rank, suit: suit };
  }

  // '5 A 8 3' -> cards of one suit, in that order.
  function parseDeal(text, suit) {
    return text.trim().split(/\s+/).map(function (token) {
      return makeCard(token === 'A' ? 1 : parseInt(token, 10), suit);
    });
  }

  function shuffle(list, random) {
    var copy = list.slice();
    random = random || Math.random;
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(random() * (i + 1));
      var t = copy[i];
      copy[i] = copy[j];
      copy[j] = t;
    }
    return copy;
  }

  function isSorted(cards) {
    for (var i = 1; i < cards.length; i++) {
      if (cards[i - 1].rank > cards[i].rank) return false;
    }
    return true;
  }

  function sortedCopy(cards) {
    return cards.slice().sort(function (a, b) { return a.rank - b.rank; });
  }

  // Text helpers -----------------------------------------------------------

  function plural(n, word) {
    return n + ' ' + word + (n === 1 ? '' : 's');
  }

  function ordinal(n) {
    var tens = n % 100;
    if (tens >= 11 && tens <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  }

  // Recorder: the live table state, plus push() to save a snapshot of it -----

  function Recorder(deal, countKeys) {
    var self = this;
    this.cards = {};
    deal.forEach(function (card) { self.cards[card.id] = card; });
    this.order = deal.map(function (card) { return card.id; });
    this.faceUp = [];
    this.focus = [];
    this.sorted = [];
    this.ruledOut = [];
    this.marked = [];
    this.counts = {};
    countKeys.forEach(function (key) { self.counts[key] = 0; });
    this.steps = [];
  }

  Recorder.prototype.push = function (line, say, ask) {
    this.steps.push({
      order: this.order.slice(),
      faceUp: this.faceUp.slice(),
      focus: this.focus.slice(),
      sorted: this.sorted.slice(),
      ruledOut: this.ruledOut.slice(),
      marked: this.marked.slice(), // selection sort: the smallest card so far
      line: line, // null when no pseudocode line applies
      say: say,
      counts: Object.assign({}, this.counts),
      ask: ask || null
    });
  };

  Recorder.prototype.rank = function (id) { return this.cards[id].rank; };
  Recorder.prototype.label = function (id) { return rankLabel(this.cards[id].rank); };

  Recorder.prototype.swap = function (i, j) {
    var t = this.order[i];
    this.order[i] = this.order[j];
    this.order[j] = t;
  };

  function checkTarget(r, target) {
    if (!r.cards[target]) throw new Error('Target ' + target + ' is not in the deal');
  }

  function sortTotals(r) {
    return 'Sorted in ' + plural(r.counts.comparisons, 'comparison') + ' and ' +
      plural(r.counts.swaps, 'swap') + '.';
  }

  // Linear search ----------------------------------------------------------

  function linearSearch(deal, options) {
    var r = new Recorder(deal, ['flips']);
    var target = options.target;
    checkTarget(r, target);
    var t = r.label(target);

    function pickAsk(i) {
      return {
        kind: 'pick',
        answer: r.order[i],
        question: 'Which card does linear search flip next? Click it.',
        hint: 'Linear search flips the cards in order, left to right, without skipping any. ' +
          'Flip the leftmost face-down card.'
      };
    }

    r.push(0, 'Find the ' + cardName(r.cards[target]) + '. The cards are face down and ' +
      'in no particular order, so check them one at a time, left to right.', pickAsk(0));

    for (var i = 0; i < r.order.length; i++) {
      var id = r.order[i];
      r.faceUp.push(id);
      r.focus = [id];
      r.counts.flips++;
      if (id === target) {
        r.push(2, 'Flip card ' + (i + 1) + ': it is the ' + t + '. Stop, found it! That took ' +
          plural(r.counts.flips, 'flip') + '.');
        return r.steps;
      }
      r.push(1, 'Flip card ' + (i + 1) + ': it is the ' + r.label(id) + ', not the ' + t +
        '. Keep going.', pickAsk(i + 1));
    }
    throw new Error('Target ' + target + ' is not in the deal');
  }

  // Binary search ----------------------------------------------------------

  function binarySearch(deal, options) {
    var r = new Recorder(deal, ['flips']);
    var target = options.target;
    checkTarget(r, target);
    if (!isSorted(deal)) throw new Error('Binary search needs the cards sorted');
    var t = r.label(target);
    var low = 0;
    var high = r.order.length - 1;

    // Snap appendix: middle = floor((low + high) / 2), so with two middles, the left one.
    function pickAsk() {
      var mid = Math.floor((low + high) / 2);
      var left = high - low + 1;
      var where;
      if (left === 1) {
        where = 'Only one card is left, so flip it.';
      } else if (left % 2 === 0) {
        where = 'There are ' + left + ' cards left, so ' + (left === 2 ? 'both' : 'two') +
          ' are in the middle. Take the left one.';
      } else {
        where = 'There are ' + left + ' cards left, so the middle one is the ' +
          ordinal(mid - low + 1) + ' of them.';
      }
      return {
        kind: 'pick',
        answer: r.order[mid],
        question: 'Which card does binary search flip next? Click it.',
        hint: 'Binary search flips the middle card of the cards that are left. ' + where
      };
    }

    r.push(null, 'Find the ' + cardName(r.cards[target]) + '. The cards are face down, ' +
      'sorted from A (smallest) on the left to 9 (largest) on the right.', pickAsk());

    var first = true;
    while (low <= high) {
      var mid = Math.floor((low + high) / 2);
      var id = r.order[mid];
      var left = high - low + 1;
      r.faceUp.push(id);
      r.focus = [id];
      r.counts.flips++;
      var flip;
      if (first) {
        flip = 'Flip the middle card';
      } else if (left === 1) {
        flip = 'Flip the only card that is left';
      } else {
        flip = 'Flip the middle of the ' + left + ' cards that are left' + (left % 2 === 0
          ? ' (' + (left === 2 ? 'both' : 'two') + ' are in the middle, so take the left one)'
          : '');
      }
      r.push(first ? 0 : 4, flip + ': it is the ' + r.label(id) + '.');
      first = false;

      if (id === target) {
        r.push(1, 'That is the ' + t + ', so stop repeating. Found it in ' +
          plural(r.counts.flips, 'flip') + '!');
        return r.steps;
      }

      var line;
      var say;
      if (r.rank(id) < r.rank(target)) {
        for (var a = low; a <= mid; a++) r.ruledOut.push(r.order[a]);
        low = mid + 1;
        line = 2;
        say = r.label(id) + ' is too small, so ignore it and everything to its left.';
      } else {
        for (var b = mid; b <= high; b++) r.ruledOut.push(r.order[b]);
        high = mid - 1;
        line = 3;
        say = r.label(id) + ' is too big, so ignore it and everything to its right.';
      }
      r.focus = [];
      var remaining = high - low + 1;
      r.push(line, say + ' ' + (remaining === 1 ? 'One card is' : remaining + ' cards are') +
        ' left.', pickAsk());
    }
    throw new Error('Target ' + target + ' is not in the deal');
  }

  // Selection sort ---------------------------------------------------------

  function selectionSort(deal) {
    var r = new Recorder(deal, ['comparisons', 'swaps']);
    var n = r.order.length;
    r.faceUp = r.order.slice();

    r.push(null, 'Ready to sort ' + plural(n, 'card') + ' from smallest to largest.');

    for (var i = 0; i < n - 1; i++) {
      var minIdx = i;
      for (var k = i + 1; k < n; k++) {
        if (r.rank(r.order[k]) < r.rank(r.order[minIdx])) minIdx = k;
      }
      var minLabel = r.label(r.order[minIdx]);

      r.focus = [];
      r.marked = [];
      r.push(0, 'Pass ' + (i + 1) + ': ' + plural(n - i, 'card') + ' are still unsorted. ' +
        'Find the smallest of them.', {
        kind: 'pick',
        answer: r.order[minIdx],
        question: 'Click the smallest card in the unsorted part.',
        hint: 'Selection sort checks every unsorted card and remembers the smallest so far. ' +
          'Which unsorted card has the lowest rank? A is the lowest of all.',
        explain: minLabel + ' is the smallest. Watch the comparisons the algorithm needs to be sure.'
      });

      var small = i;
      r.focus = [r.order[i]];
      r.marked = [r.order[i]];
      r.push(1, 'Start with ' + r.label(r.order[i]) + ': it is the smallest so far.');

      var before = r.counts.comparisons;
      for (var j = i + 1; j < n; j++) {
        var card = r.order[j];
        var best = r.order[small];
        var c = r.label(card);
        var s = r.label(best);
        r.counts.comparisons++;
        r.focus = [card, best];
        if (r.rank(card) < r.rank(best)) {
          small = j;
          r.marked = [card];
          r.push(2, 'Compare ' + c + ' with ' + s + ', the smallest so far: ' + c +
            ' is smaller, so remember ' + c + ' instead.');
        } else {
          r.push(2, 'Compare ' + c + ' with ' + s + ', the smallest so far: ' + c +
            ' is bigger, so keep ' + s + '.');
        }
      }

      var used = plural(r.counts.comparisons - before, 'comparison');
      var m = r.order[small];
      var firstUnsorted = r.order[i];
      r.marked = [];
      r.sorted.push(m);
      if (small !== i) {
        r.swap(i, small);
        r.counts.swaps++;
        r.focus = [m, firstUnsorted];
        r.push(3, minLabel + ' is the smallest (' + used + ' to be sure). Move it to the end of ' +
          'the sorted row: swap it with ' + r.label(firstUnsorted) + '.');
      } else {
        r.focus = [m];
        r.push(3, minLabel + ' is the smallest (' + used + ' to be sure). It is already at the ' +
          'end of the sorted row, so it stays.');
      }
    }

    r.focus = [];
    r.sorted = r.order.slice();
    r.push(0, (n > 0 ? 'Only ' + r.label(r.order[n - 1]) + ' is left, so it is in place too. ' : '') +
      sortTotals(r));
    return r.steps;
  }

  // Insertion sort ---------------------------------------------------------

  function insertionSort(deal) {
    var r = new Recorder(deal, ['comparisons', 'swaps']);
    var n = r.order.length;
    r.faceUp = r.order.slice();

    r.push(null, 'Ready to sort ' + plural(n, 'card') + ' from smallest to largest.' +
      (n > 1 ? ' The first card, ' + r.label(r.order[0]) + ', starts on its own.' : ''));

    for (var i = 1; i < n; i++) {
      var id = r.order[i];
      var c = r.label(id);
      r.focus = [id];
      r.push(0, 'Take the ' + ordinal(i + 1) + ' card, ' + c + '.');

      var j = i;
      for (;;) {
        if (j === 0) {
          r.focus = [id];
          r.push(1, c + ' has reached the left end, so it stays there.');
          break;
        }
        var left = r.order[j - 1];
        var l = r.label(left);
        var swap = r.rank(left) > r.rank(id);
        r.counts.comparisons++;
        r.focus = [id, left];
        r.push(1, swap
          ? 'Compare ' + c + ' with ' + l + ' on its left: ' + l + ' is bigger, so swap.'
          : 'Compare ' + c + ' with ' + l + ' on its left: ' + l + ' is smaller, so ' + c +
            ' stays here.', {
          kind: 'swap',
          answer: swap,
          question: c + ' has ' + l + ' on its left. Should ' + c + ' swap with ' + l + '?',
          hint: 'Insertion sort only compares the card with the one on its left. Is ' + c +
            ' smaller than ' + l + '?',
          explain: swap
            ? l + ' is bigger than ' + c + ', so they swap.'
            : l + ' is smaller than ' + c + ', so ' + c + ' stays.'
        });
        if (!swap) break;
        r.swap(j - 1, j);
        r.counts.swaps++;
        j--;
        r.push(2, 'Swap ' + c + ' one spot to the left.');
      }
    }

    r.focus = [];
    r.sorted = r.order.slice();
    r.push(null, 'Every card is in place. ' + sortTotals(r));
    return r.steps;
  }

  // Bubble sort ------------------------------------------------------------

  function bubbleSort(deal) {
    var r = new Recorder(deal, ['comparisons', 'swaps']);
    var n = r.order.length;
    r.faceUp = r.order.slice();

    r.push(null, 'Ready to sort ' + plural(n, 'card') + ' from smallest to largest.');

    var end = n - 1; // index of the last unsorted card
    var pass = 0;
    while (end >= 1) {
      pass++;
      var swaps = 0;
      r.focus = [];
      r.push(1, 'Pass ' + pass + ': check each pair of neighbours in the ' +
        plural(end + 1, 'unsorted card') + ', from the left.');

      for (var k = 0; k < end; k++) {
        var a = r.order[k];
        var b = r.order[k + 1];
        var la = r.label(a);
        var lb = r.label(b);
        var swap = r.rank(a) > r.rank(b);
        r.counts.comparisons++;
        r.focus = [a, b];
        r.push(2, 'Compare ' + la + ' and ' + lb + ': ' + (swap
          ? 'the left card is bigger, so swap them.'
          : 'the left card is smaller, so leave them.'), {
          kind: 'swap',
          answer: swap,
          question: 'Compare ' + la + ' and ' + lb + '. Should they swap?',
          hint: 'Bubble sort swaps two neighbours only when the left card is bigger. Is ' + la +
            ' bigger than ' + lb + '?',
          explain: swap
            ? la + ' is bigger than ' + lb + ', so they swap.'
            : la + ' is smaller than ' + lb + ', so they stay.'
        });
        if (swap) {
          r.swap(k, k + 1);
          r.counts.swaps++;
          swaps++;
          r.push(2, 'Swap ' + la + ' and ' + lb + '.');
        }
      }

      r.focus = [];
      if (swaps === 0) {
        r.sorted = r.order.slice();
        r.push(0, 'This pass made no swaps, so the cards are in order. Stop. ' + sortTotals(r));
        return r.steps;
      }
      var last = r.order[end];
      r.sorted.push(last);
      r.push(0, r.label(last) + ' is the biggest unsorted card, so it is locked in at the end. ' +
        'This pass made ' + plural(swaps, 'swap') + ', so do another pass.');
      end--;
    }

    r.sorted = r.order.slice();
    r.push(0, (n > 0 ? 'Only ' + r.label(r.order[0]) + ' is left unsorted, so it is in place too. ' : '') +
      sortTotals(r));
    return r.steps;
  }

  // Algorithms -------------------------------------------------------------

  // Pseudocode from the W5A slides. **bold** marks the gold keywords.
  var ALGORITHMS = {
    linear: {
      key: 'linear',
      name: 'Linear search',
      kind: 'search',
      run: linearSearch,
      pills: ['Iteration', 'Selection'],
      idea: 'Check the cards one at a time, left to right, until you find the target.',
      goal: 'Click the card linear search flips next.',
      code: [
        { indent: 0, text: '**For each** card, left to right:' },
        { indent: 1, text: 'Flip it' },
        { indent: 1, text: '**If** it\'s the one you want → stop, found it!' }
      ]
    },
    binary: {
      key: 'binary',
      name: 'Binary search',
      kind: 'search',
      run: binarySearch,
      pills: ['Iteration', 'Selection', 'Sequencing'],
      idea: 'On sorted cards, flip the middle one and drop the half that cannot hold the target.',
      goal: 'Click the card binary search flips next.',
      code: [
        { indent: 0, text: 'Flip the middle card' },
        { indent: 0, text: '**Repeat until** you find it:' },
        { indent: 1, text: '**If** too small → ignore it and everything to its left' },
        { indent: 1, text: '**If** too big → ignore it and everything to its right' },
        { indent: 1, text: 'Flip the middle of the cards that are left' }
      ]
    },
    selection: {
      key: 'selection',
      name: 'Selection sort',
      kind: 'sort',
      run: selectionSort,
      pills: ['Iteration', 'Selection'],
      idea: 'Find the smallest unsorted card and move it to the end of the sorted row.',
      goal: 'Each pass, click the smallest card in the unsorted part.',
      code: [
        { indent: 0, text: '**Repeat until** no unsorted cards are left:' },
        { indent: 1, text: '**For each** unsorted card:' },
        { indent: 2, text: '**If** it\'s the smallest so far → remember it' },
        { indent: 1, text: 'Move the smallest to the end of the sorted row' }
      ]
    },
    insertion: {
      key: 'insertion',
      name: 'Insertion sort',
      kind: 'sort',
      run: insertionSort,
      pills: ['Iteration', 'Selection'],
      idea: 'Slide each new card left until the card on its left is smaller.',
      goal: 'At each comparison, choose Swap or Don\'t swap.',
      code: [
        { indent: 0, text: '**For each** card, starting with the 2nd:' },
        { indent: 1, text: '**Repeat until** the card on its left is smaller:' },
        { indent: 2, text: 'Swap it one spot to the left' }
      ]
    },
    bubble: {
      key: 'bubble',
      name: 'Bubble sort',
      kind: 'sort',
      run: bubbleSort,
      pills: ['Iteration', 'Selection'],
      idea: 'Swap neighbours that are out of order. Each pass carries the biggest unsorted card to the end.',
      goal: 'At each comparison, choose Swap or Don\'t swap.',
      code: [
        { indent: 0, text: '**Repeat until** a pass makes no swaps:' },
        { indent: 1, text: '**For each** pair of neighbours in the unsorted part:' },
        { indent: 2, text: '**If** the left card is bigger → swap them' }
      ]
    }
  };

  var ORDER = ['linear', 'binary', 'selection', 'insertion', 'bubble'];

  var DEALS = {
    sortLecture: '5 A 8 3 6 2 7 4',
    sortNearly: 'A 2 3 4 5 7 6 8',
    linearLecture: '8 3 6 A 9 5 2 7 4',
    linearTarget: 5,
    binaryLecture: 'A 2 3 4 5 6 7 8 9',
    binaryTarget: 7
  };

  function run(key, deal, options) {
    return ALGORITHMS[key].run(deal, options || {});
  }

  function finalCounts(key, deal, options) {
    var steps = run(key, deal, options);
    return steps[steps.length - 1].counts;
  }

  // Comparisons for every sort on the same deal, for the finish screen.
  function compareSorts(deal) {
    return {
      selection: finalCounts('selection', deal).comparisons,
      insertion: finalCounts('insertion', deal).comparisons,
      bubble: finalCounts('bubble', deal).comparisons
    };
  }

  // Flips for both searches. Binary search only works on sorted cards, so it runs on a
  // sorted copy of the row; `sorted` says whether the row itself was already sorted.
  function compareSearches(deal, target) {
    return {
      linear: finalCounts('linear', deal, { target: target }).flips,
      binary: finalCounts('binary', sortedCopy(deal), { target: target }).flips,
      sorted: isSorted(deal)
    };
  }

  // Why a try-it move breaks the rule. `choice` is a card id (pick) or a boolean (swap).
  function explainWrong(key, step, choice, cards) {
    var ask = step.ask;
    if (ask.kind === 'swap') {
      return 'Not quite. ' + ask.hint;
    }
    if (key === 'selection') {
      if (step.sorted.indexOf(choice) >= 0) {
        return 'That card is already sorted. Selection sort only looks at the unsorted part. ' +
          ask.hint;
      }
      return 'Not quite: there is a smaller card than ' + rankLabel(cards[choice].rank) +
        ' in the unsorted part. ' + ask.hint;
    }
    if (step.faceUp.indexOf(choice) >= 0) {
      return 'That card is already face up. ' + ask.hint;
    }
    if (step.ruledOut.indexOf(choice) >= 0) {
      return 'That card is ruled out: the target cannot be there. ' + ask.hint;
    }
    if (key === 'linear') {
      return 'Not quite: linear search never skips ahead. ' + ask.hint;
    }
    return 'Not quite: that is not the middle card. ' + ask.hint;
  }

  return {
    SUIT_SYMBOL: SUIT_SYMBOL,
    ALGORITHMS: ALGORITHMS,
    ORDER: ORDER,
    DEALS: DEALS,
    rankLabel: rankLabel,
    cardName: cardName,
    makeCard: makeCard,
    parseDeal: parseDeal,
    shuffle: shuffle,
    isSorted: isSorted,
    sortedCopy: sortedCopy,
    plural: plural,
    run: run,
    compareSorts: compareSorts,
    compareSearches: compareSearches,
    explainWrong: explainWrong
  };
});
