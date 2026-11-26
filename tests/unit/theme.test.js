// Links on the course site must look like links, in light and in dark, and the Dark mode
// switch must work. These checks read the CSS and run the theme script from index.html,
// without a browser. browser/theme.spec.js checks the same things on the real pages.
// Run: npm run test:unit
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const DOCS = path.join(__dirname, '..', '..', 'docs');
const index = fs.readFileSync(path.join(DOCS, 'index.html'), 'utf8');
const custom = fs.readFileSync(path.join(DOCS, 'assets', 'css', 'custom.css'), 'utf8');
const theme = fs.readFileSync(path.join(DOCS, 'assets', 'css', 'theme.css'), 'utf8');

// The page backgrounds of docsify-themeable's Simple theme (--base-background-color), which
// index.html loads from a CDN. browser/theme.spec.js measures the live ones.
const PAGE = { light: '#FFFFFF', dark: 'hsl(201, 18%, 19%)' };

// ---- Colour arithmetic (WCAG 2.2 relative luminance and contrast ratio) -------------------

function parseColour(text) {
  const value = text.trim();
  let m = /^#([0-9a-f]{6})$/i.exec(value);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = /^hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i.exec(value);
  if (m) return hslToRgb(Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100);
  throw new Error('Cannot read the colour ' + value);
}

function hslToRgb(h, s, l) {
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255));
}

function rgbToHsl([r, g, b]) {
  const [rr, gg, bb] = [r, g, b].map((v) => v / 255);
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === rr) h = ((gg - bb) / d) % 6;
  else if (max === gg) h = (bb - rr) / d + 2;
  else h = (rr - gg) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(parseColour(a)), luminance(parseColour(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

test('the colour arithmetic matches known WCAG values', () => {
  assert.equal(contrast('#000000', '#FFFFFF').toFixed(1), '21.0');
  assert.equal(contrast('#777777', '#FFFFFF').toFixed(2), '4.48');
  assert.deepEqual(parseColour('hsl(0, 0%, 30%)'), [77, 77, 77]);
});

// ---- The link colours in custom.css ---------------------------------------------------------

// The declarations in one top-level rule, found by its exact selector.
function block(css, selector) {
  const start = css.indexOf('\n' + selector + ' {');
  assert.ok(start >= 0, 'no "' + selector + '" rule');
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  const decls = {};
  for (const m of css.slice(open + 1, close).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    decls[m[1]] = m[2].replace(/\s*!important\s*$/, '').trim();
  }
  return decls;
}

// custom.css loads last and marks every value !important, so its values are the ones used.
const SELECTOR = { light: ':root', dark: ':root[data-theme="dark"]' };
const links = (mode) => block(custom, SELECTOR[mode]);

for (const mode of ['light', 'dark']) {
  test(mode + ' theme: links are underlined, so colour is not the only cue', () => {
    assert.equal(links(mode)['--link-text-decoration'], 'underline');
    assert.equal(links(mode)['--link-text-decoration--hover'], 'underline');
  });

  test(mode + ' theme: link colour has at least 4.5:1 contrast with the page', () => {
    const colour = links(mode)['--link-color'];
    const ratio = contrast(colour, PAGE[mode]);
    assert.ok(ratio >= 4.5, colour + ' on ' + PAGE[mode] + ' is ' + ratio.toFixed(2) + ':1');
  });

  test(mode + ' theme: link colour reads as blue, not navy, black or grey', () => {
    const { h, s, l } = rgbToHsl(parseColour(links(mode)['--link-color']));
    assert.ok(h >= 195 && h <= 235, 'hue ' + h.toFixed(0) + ' is not blue');
    assert.ok(s >= 0.5, 'saturation ' + (s * 100).toFixed(0) + '% is too grey');
    assert.ok(l >= 0.25 && l <= 0.75, 'lightness ' + (l * 100).toFixed(0) + '% is too close to black or white');
  });
}

test('the old light link colour would fail these checks', () => {
  // UBC navy with no underline: what students saw before Nov 25.
  const { l } = rgbToHsl(parseColour('#002145'));
  assert.ok(l < 0.25, 'navy should count as too dark to read as a link');
});

test('links inside notes and tips stay underlined', () => {
  const rule = custom.match(/\.markdown-section blockquote a \{([^}]*)\}/);
  assert.ok(rule, 'the alert link rule is missing');
  assert.match(rule[1], /text-decoration: underline !important;/);
});

// ---- Dark rules follow the switch, not only the device ----------------------------------------

test('no CSS rule reads the device setting directly, so the switch can override it', () => {
  for (const [name, css] of [['custom.css', custom], ['theme.css', theme]]) {
    assert.doesNotMatch(css, /prefers-color-scheme/, name);
  }
  assert.match(custom, /:root\[data-theme="dark"\] \.markdown-section \.changelog-badge \{/);
  assert.match(custom, /:root\[data-theme="dark"\] \.markdown-section \.role-instructor \{/);
  assert.match(custom, /:root\[data-theme="dark"\] \.markdown-section \.team-lab \{/);
  assert.match(theme, /:root\[data-theme="dark"\] \{\n  --code-theme-comment/);
});

test('Mermaid diagrams take their theme from the switch', () => {
  assert.match(index, /var dark = siteTheme\.current\(\) === 'dark';/);
  assert.match(index, /siteTheme\.onChange\(function \(\) \{ renderMermaid\(\); \}\);/);
});

// ---- The theme script in <head> -------------------------------------------------------------

const head = index.slice(0, index.indexOf('</head>'));
const scripts = [...head.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const themeScript = scripts.find((m) => /var siteTheme = /.test(m[1]));

test('the theme script runs in <head>, after the theme stylesheets and before the site CSS', () => {
  assert.ok(themeScript, 'no siteTheme script in <head>');
  const at = themeScript.index;
  assert.ok(head.indexOf('id="theme-light"') < at, 'theme-light must come first');
  assert.ok(head.indexOf('id="theme-dark"') < at, 'theme-dark must come first');
  assert.ok(head.indexOf('assets/css/theme.css') > at, 'theme.css must come after');
  assert.doesNotThrow(() => new vm.Script(themeScript[1], { filename: 'index.html' }));
});

// A small fake browser: a device setting, storage that can be blocked, and the two <link>s.
function boot({ device = 'light', stored, blocked = false } = {}) {
  const store = new Map(stored ? [['cpsc100.theme', stored]] : []);
  const deviceListeners = [];
  const windowListeners = {};
  const query = {
    matches: device === 'dark',
    addEventListener: (type, fn) => deviceListeners.push(fn)
  };
  const links = { 'theme-light': { media: '(prefers-color-scheme: light)' }, 'theme-dark': { media: '(prefers-color-scheme: dark)' } };
  const attrs = {};
  const guard = (fn) => (...args) => {
    if (blocked) throw new Error('SecurityError');
    return fn(...args);
  };
  const window = {
    matchMedia: (q) => {
      assert.equal(q, '(prefers-color-scheme: dark)');
      return query;
    },
    addEventListener: (type, fn) => { windowListeners[type] = fn; },
    localStorage: {
      getItem: guard((k) => (store.has(k) ? store.get(k) : null)),
      setItem: guard((k, v) => store.set(k, String(v))),
      removeItem: guard((k) => store.delete(k))
    }
  };
  const document = {
    documentElement: { style: {}, setAttribute: (k, v) => { attrs[k] = v; } },
    getElementById: (id) => links[id] || null
  };
  const context = vm.createContext({ window, document });
  vm.runInContext(themeScript[1], context);
  const siteTheme = vm.runInContext('siteTheme', context);
  return {
    siteTheme,
    get theme() { return attrs['data-theme']; },
    get stored() { return store.has('cpsc100.theme') ? store.get('cpsc100.theme') : null; },
    get media() { return [links['theme-light'].media, links['theme-dark'].media]; },
    get colorScheme() { return document.documentElement.style.colorScheme; },
    setDevice(mode) {
      query.matches = mode === 'dark';
      deviceListeners.forEach((fn) => fn());
    },
    otherTab(value) {
      if (value) store.set('cpsc100.theme', value);
      else store.delete('cpsc100.theme');
      windowListeners.storage({ key: 'cpsc100.theme' });
    }
  };
}

test('with no choice, the site follows the device', () => {
  const light = boot({ device: 'light' });
  assert.equal(light.theme, 'light');
  assert.deepEqual(light.media, ['all', 'not all']);
  assert.equal(light.colorScheme, 'light');

  const dark = boot({ device: 'dark' });
  assert.equal(dark.theme, 'dark');
  assert.deepEqual(dark.media, ['not all', 'all']);
  assert.equal(dark.colorScheme, 'dark');
});

test('with no choice, the site changes when the device changes', () => {
  const site = boot({ device: 'light' });
  site.setDevice('dark');
  assert.equal(site.theme, 'dark');
  assert.deepEqual(site.media, ['not all', 'all']);
  site.setDevice('light');
  assert.equal(site.theme, 'light');
});

test('a saved choice wins over the device, and stays when the device changes', () => {
  const site = boot({ device: 'light', stored: 'dark' });
  assert.equal(site.theme, 'dark');
  site.setDevice('dark');
  site.setDevice('light');
  assert.equal(site.theme, 'dark');
});

test('a saved value that is not light or dark is ignored', () => {
  assert.equal(boot({ device: 'light', stored: 'purple' }).theme, 'light');
});

test('choosing the other theme saves it; choosing the device theme again clears it', () => {
  const site = boot({ device: 'light' });
  site.siteTheme.choose('dark');
  assert.equal(site.theme, 'dark');
  assert.equal(site.stored, 'dark');
  site.siteTheme.choose('light');
  assert.equal(site.theme, 'light');
  assert.equal(site.stored, null, 'back to following the device');
  site.setDevice('dark');
  assert.equal(site.theme, 'dark');
});

test('on a dark device, choosing light is saved', () => {
  const site = boot({ device: 'dark' });
  site.siteTheme.choose('light');
  assert.equal(site.theme, 'light');
  assert.equal(site.stored, 'light');
});

test('blocked storage: the page still opens, and the switch still works until a reload', () => {
  const site = boot({ device: 'light', blocked: true });
  assert.equal(site.theme, 'light');
  site.siteTheme.choose('dark');
  assert.equal(site.theme, 'dark');
  assert.equal(site.siteTheme.current(), 'dark');
});

test('a choice made in another tab applies here', () => {
  const site = boot({ device: 'light' });
  site.otherTab('dark');
  assert.equal(site.theme, 'dark');
  site.otherTab(null);
  assert.equal(site.theme, 'light');
});

test('listeners hear every change, with the new theme', () => {
  const site = boot({ device: 'light' });
  const heard = [];
  site.siteTheme.onChange((t) => heard.push(t));
  site.siteTheme.choose('dark');
  site.siteTheme.choose('light');
  site.setDevice('dark');
  assert.deepEqual(heard, ['dark', 'light', 'dark']);
});

// ---- The switch -----------------------------------------------------------------------------

test('the switch is a real button with role="switch", labelled Dark mode', () => {
  const fn = index.match(/function addThemeSwitch\(\) \{([\s\S]*?)\n {4}\}\n/);
  assert.ok(fn, 'addThemeSwitch is missing');
  assert.match(fn[1], /createElement\('button'\)/);
  assert.match(fn[1], /button\.type = 'button';/);
  assert.match(fn[1], /setAttribute\('role', 'switch'\)/);
  assert.match(fn[1], /<span class="theme-switch-label">Dark mode<\/span>/);
  assert.match(fn[1], /aria-checked/);
  assert.match(fn[1], /if \(!sidebar \|\| sidebar\.querySelector\('\.theme-switch'\)\) return;/, 'added once');
  assert.match(index, /hook\.doneEach\(function \(\) \{\n\s+addThemeSwitch\(\);/);
});

test('the switch has a visible focus ring and a 44px target', () => {
  assert.match(custom, /\.sidebar \.theme-switch:focus-visible \{\s*outline: 2px solid/);
  assert.match(custom, /\.sidebar \.theme-switch \{[^}]*min-height: 44px;/);
});
