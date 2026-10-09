// Static checks on the Card Demos page and its site link: the handover's constraints,
// without a browser. Run: npm run test:unit
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const DOCS = path.join(__dirname, '..', '..', 'docs');
const html = fs.readFileSync(path.join(DOCS, 'demos', 'cards.html'), 'utf8');
const engine = fs.readFileSync(path.join(DOCS, 'demos', 'cards-engine.js'), 'utf8');
const sidebar = fs.readFileSync(path.join(DOCS, '_sidebar.md'), 'utf8');

const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const style = (html.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';

test('the inline script and the engine are valid JavaScript', () => {
  assert.equal(inlineScripts.length, 1);
  assert.doesNotThrow(() => new vm.Script(inlineScripts[0], { filename: 'cards.html' }));
  assert.doesNotThrow(() => new vm.Script(engine, { filename: 'cards-engine.js' }));
});

test('no libraries: the only script is the engine, the only stylesheet is the font', () => {
  const srcs = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(srcs, ['cards-engine.js']);
  const sheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0]);
  assert.equal(sheets.length, 1);
  assert.match(sheets[0], /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Source\+Sans\+Pro/);
  assert.doesNotMatch(html, /\bimport\s*\(|\bhttp:\/\//);
});

test('page basics', () => {
  assert.match(html, /^<!DOCTYPE html>/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
  assert.match(html, /<title>Card Demos \| CPSC 100<\/title>/);
  assert.match(html, /<h1>Card Demos<\/h1>/);
  assert.match(html, /<a class="site-link" href="\.\.\/#\/schedule">Course schedule<\/a>/);
  assert.match(html, /<a class="site-link" href="\.\.\/">Back to course site<\/a>/);
  assert.match(html, /<p class="narration" id="narration" aria-live="polite">/);
});

test('lecture colours, light theme only', () => {
  for (const [name, hex] of [['navy', '#092042'], ['gold', '#E0AB3A'], ['indigo', '#140480'],
    ['iteration', '#B34A22'], ['selection', '#723289'], ['sequencing', '#35746E']]) {
    assert.match(style, new RegExp('--' + name + ': ' + hex + ';'), name);
  }
  assert.match(html, /<meta name="color-scheme" content="light">/);
  assert.doesNotMatch(style, /prefers-color-scheme: dark/);
});

test('reduced motion makes every transition and animation instant', () => {
  const block = style.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n {4}\}/);
  assert.ok(block, 'no reduced-motion block');
  for (const rule of ['transition-duration: 0s !important', 'transition-delay: 0s !important',
    'animation-duration: 0s !important', 'animation-delay: 0s !important']) {
    assert.ok(block[1].includes(rule), rule);
  }
  // Web Animations from the script also check the setting.
  assert.match(inlineScripts[0], /prefers-reduced-motion: reduce/);
});

test('every control is a real button, with a type', () => {
  const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map((m) => m[0]);
  assert.ok(buttons.length >= 12);
  for (const b of buttons) assert.match(b, /type="button"/, b);
  assert.doesNotMatch(html, /onclick=|role="button"|<div[^>]*tabindex/);
  assert.match(inlineScripts[0], /createElement\('button'\)/);
});

test('visible page text uses full words', () => {
  const text = html
    .replace(/<style>[\s\S]*?<\/style>|<script>[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ');
  const found = (text.match(/\b\w+'\w+\b/g) || []).filter((w) => w !== 'Don\'t'); // label from the handover
  assert.deepEqual(found, []);
});

test('nothing in the published files mentions AI tools or the handover', () => {
  for (const [name, src] of [['cards.html', html], ['cards-engine.js', engine]]) {
    assert.doesNotMatch(src, /claude|anthropic|chatgpt|openai|\bllm\b|handover/i, name);
  }
});

test('no leftover debugging', () => {
  for (const src of [inlineScripts[0], engine]) {
    assert.doesNotMatch(src, /console\.(log|debug)|debugger/);
  }
});

test('the sidebar links the page right after Schedule, outside the docsify router', () => {
  const lines = sidebar.split('\n');
  const i = lines.indexOf('- [Schedule](schedule.md)');
  assert.ok(i >= 0, 'Schedule line moved');
  assert.equal(lines[i + 1], '- [Card Demos](demos/cards.html \':ignore :target=_self\')');
  assert.equal(lines.filter((l) => l.includes('demos/cards.html')).length, 1);
});
