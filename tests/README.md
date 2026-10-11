# Site tests

Tests for the Card Demos page (`docs/demos/`) and the parts of the course site around it.
Nothing in this folder is published: GitHub Pages serves `docs/` only.

## Running them

```bash
cd tests
npm install          # once: Playwright, as a dev-only dependency
npm test             # everything: unit tests, then browser tests
npm run test:unit    # engine and page checks only, no browser (about 30 seconds)
npm run test:browser # the page in Chromium (about 2 minutes)
npm run test:browsers # Chromium, Firefox and WebKit (about 8 minutes)
```

The first browser run may ask for `npx playwright install chromium`.

Run `npm test` before merging any change to `docs/demos/`.

## On GitHub

`.github/workflows/card-demos.yml` runs every test on pull requests and pushes to `main`,
but only when one of these changes: `docs/demos/`, `docs/_sidebar.md`, `docs/index.html`,
`tests/`, or the workflow itself. Edits to other course pages do not run it.

It runs inside Playwright's own Linux image, the same version as `package.json`, with one
job each for Chromium, Firefox and WebKit (the engine behind Safari on iPhones).
When a run fails, its screenshots, traces and error details are attached to the run as
`test-results`.

## What is covered

**Unit tests** (`unit/`, Node's built-in test runner, no dependencies)

- `engine.test.js`: the five algorithms against the W5A slides (19, 28 and 25 comparisons on
  the lecture deal; 8, 28 and 13 when nearly sorted; the bubble passes and insertion
  placements; binary and linear search flips). They are also checked against separate
  reference implementations, for **every possible deal of 8 cards** (all 40,320) and every
  deal of 1 to 7 cards.
- Every step of every run must pass a validator (`unit/helpers.js`). It checks that:
  - each step makes at most one swap, of neighbours where the algorithm requires it;
  - locked-in cards never move, and sit in their final place;
  - counts only ever rise by one;
  - every question's answer matches what happens next, and every comparison asks one;
  - every pseudocode line gets used;
  - narration is in full words, with correct plurals, and never repeats between two steps
    (the narration is a live region, so a repeated sentence would not be read out).
- `page.test.js`: the handover's rules for the page. No libraries, the lecture colours,
  reduced motion, real buttons, the sidebar line, and no mention of AI tools.

**Browser tests** (`browser/`, Playwright)

- `watch.spec.js`: at every step, forward and back, the table matches the engine. Also Play,
  Pause and speeds; the clicker keys; clean resets with no stray timers; the deal buttons.
- `try.spec.js`: perfect rounds end with the slide numbers. Wrong moves explain the rule and
  count once, and Show me works. A double click or double tap cannot answer two questions.
  A whole round can be played with the keyboard. Try again and Watch it.
- `layout.spec.js`: eight screen sizes from 320px to 1920px. No sideways scroll, cards that
  fit and stay readable, 34px cards on a 375px phone, and the projector view at 1280x720.
- `a11y.spec.js`: labels, aria-pressed, the live narration, visible focus, highlights that
  do not rely on colour alone, and WCAG AA text contrast in every state.
- `hci.spec.js`: the status line (Ready, Playing at the chosen speed, Your turn, Try again,
  Finished, and where the run is), the timeline you can drag, the countdown before each
  automatic step, the speed slider from x0.25 to x3 and its keys, the shortcuts, the
  tooltips, and the tour (every stop is spotlit, the note stays on screen, keys and Tab
  stay inside it, and it pauses what is playing).
- `first-visit.spec.js`: the "New here?" banner and remembering it, blocked storage, and
  a missing or stale engine file.
- `motion.spec.js`: reduced motion makes everything instant. Slides, flips and the finish
  wave run and settle. Pressing Next very fast never leaves a card stuck mid-slide.
- `site.spec.js`: docsify still renders every sidebar page. The link opens the demo in the
  same tab, and Back to course site returns. This one needs the network, because docsify
  loads from public CDNs.
- `visual.spec.js`: screenshots of 20 key states, including the tour, a tooltip and the
  first-visit banner, compared with the saved images in `browser/visual.spec.js-snapshots/`.

The browser tests run with a fake clock and seeded "random" deals, so they are fast and give
the same result every time. Google Fonts requests are answered from `fixtures/fonts/`, so the
network cannot change a result or a screenshot.

## When a screenshot test fails

If the change was deliberate, update the saved images and **look at every changed image**
before committing it:

```bash
npm run test:update-screenshots
```

Font rendering differs between operating systems, so there are two sets of saved images:
`-darwin` for running the tests on a Mac, and `-linux` for GitHub. To update the Linux set
after a deliberate change, either run the update inside the same image as GitHub (from
`tests/`; the extra volume keeps the Linux packages away from your own `node_modules`):

```bash
docker run --rm -v "$PWD/..":/work -v /work/tests/node_modules -w /work/tests mcr.microsoft.com/playwright:v1.61.1-noble sh -c "npm ci && npm run test:update-screenshots"
```

or push the change: the failed run attaches the new images under `test-results`, to look
at and then commit.

## Firefox and Safari

On a Mac, `npm run test:browsers` also runs the behaviour tests (everything except
screenshots) in Firefox and WebKit, once those browsers are installed. WebKit on macOS follows Safari's default, where
Tab skips buttons, so those tests press Option+Tab as a Safari keyboard user would.

```bash
npx playwright install firefox webkit
```
