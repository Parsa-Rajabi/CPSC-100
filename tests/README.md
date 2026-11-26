# Site tests

Tests for the Card Demos page (`docs/demos/`), the parts of the course site around it, and
the site's light and dark themes: links must look like links, the Dark mode switch must
work, and every note must have a working Hide button. Nothing in this folder is published: GitHub Pages serves `docs/` only.

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

Run `npm test` before merging any change to `docs/demos/`. After a change to
`docs/index.html`, `docs/assets/css/` or `docs/assets/js/`, run at least the unit tests and
`npx playwright test browser/site.spec.js browser/theme.spec.js browser/notes.spec.js`.

## On GitHub

`.github/workflows/card-demos.yml` runs every test on pull requests and pushes to `main`,
but only when one of these changes: `docs/demos/`, `tests/`, the workflow itself, or the
Card Demos line in `docs/_sidebar.md` and the lines around it. Edits to other course pages
and the rest of the sidebar do not run it. To run it anyway, for example after updating
docsify, start it by hand from the Actions tab.

A pull request that changes `docs/index.html`, `docs/assets/css/` or `docs/assets/js/` (and
nothing above) runs one smaller job instead: the unit tests, then `site.spec.js`,
`theme.spec.js` and `notes.spec.js` in Chromium.
It never runs on a push to `main`.

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
- `theme.test.js`: links in `custom.css` are underlined in both themes, blue (not navy, black
  or grey) and at least 4.5:1 against the page. No CSS rule reads the device setting
  directly, so the switch can override it. It also runs the theme script from `index.html`
  against a stand-in browser: it follows the device until a student picks a theme, a pick is
  saved and outlasts device changes, picking the device's own theme again clears it, and it
  still works with storage blocked or a pick made in another tab.
- `notes.test.js`: runs `docs/assets/js/notes.js`, which adds Hide and Show to the Note, Tip,
  Warning and Attention boxes. A box is known by its text, so rewrapping keeps it hidden and
  editing it opens it again. Hidden boxes are saved per page, shown ones and stale ones are
  forgotten, two tabs do not undo each other, a damaged saved value is replaced, and blocked
  storage still works for the visit.

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
- `theme.spec.js`: on every sidebar page, in light and in dark, every link in the text is
  underlined, blue (links in notes and tips take the box's colour instead) and at least 4.5:1
  against what is actually behind it. Sidebar and top menu links are 4.5:1 too. The Dark mode
  switch sits under the search box, changes the theme at once, is remembered after a reload,
  works with Space and Enter, shows keyboard focus, appears once, works with storage blocked,
  and redraws the Communication flowchart. These read computed styles, so they also catch a
  change to the docsify theme on its CDN. Like `site.spec.js`, they need the network.
- `notes.spec.js`: every box on every sidebar page has a Hide button and starts open. Hiding
  shrinks a box to one line with the start of its text, and it stays hidden after a reload and
  a page change until Show. A box we edited opens again. The whole title line, at least 44px
  tall, takes the click; Enter, Space and visible focus work; every kind of box reads at 4.5:1
  open and hidden in both themes; titles never wrap on a phone; printing shows every box; and
  it works with storage blocked. These need the network too.
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
