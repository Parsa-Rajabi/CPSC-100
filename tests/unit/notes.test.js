// Hide and Show on the Note, Tip, Warning and Attention boxes. These run docs/assets/js/notes.js
// without a browser and check how a hidden box is remembered: per page, by its text, and still
// for the visit when storage is blocked. browser/notes.spec.js checks the buttons on real pages.
// Run: npm run test:unit
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const DOCS = path.join(__dirname, '..', '..', 'docs');
const source = fs.readFileSync(path.join(DOCS, 'assets', 'js', 'notes.js'), 'utf8');
const index = fs.readFileSync(path.join(DOCS, 'index.html'), 'utf8');
const custom = fs.readFileSync(path.join(DOCS, 'assets', 'css', 'custom.css'), 'utf8');

// Storage shared by every "tab" made from it, which can be blocked or hold any text.
function fakeStorage({ blocked = false, value } = {}) {
  const map = new Map(value === undefined ? [] : [['cpsc100.hiddenNotes', value]]);
  const guard = (fn) => (...args) => {
    if (storage.blocked) throw new Error('SecurityError');
    return fn(...args);
  };
  const storage = {
    blocked,
    getItem: guard((k) => (map.has(k) ? map.get(k) : null)),
    setItem: guard((k, v) => map.set(k, String(v))),
    removeItem: guard((k) => map.delete(k)),
    get saved() { return map.has('cpsc100.hiddenNotes') ? JSON.parse(map.get('cpsc100.hiddenNotes')) : null; }
  };
  return storage;
}

// Load notes.js the way the page does, and return window.siteNotes.
function load(storage = fakeStorage()) {
  const window = { localStorage: storage };
  vm.runInContext(source, vm.createContext({ window }), { filename: 'notes.js' });
  return window.siteNotes;
}

const notes = load();
const tab = (storage) => notes.createStore(() => storage);

// ---- Which box is which --------------------------------------------------------------------

test('a box keeps its id however its text is wrapped or indented', () => {
  const id = notes.noteId('Warning You must attend at least 7 of the 9 graded labs.');
  assert.match(id, /^[0-9a-z]+$/);
  assert.equal(notes.noteId('  Warning\n  You must attend at least 7\n of the 9 graded labs. '), id);
});

test('editing a box gives it a new id, so it opens again for students who hid it', () => {
  const before = notes.noteId('Warning Project 2B is due Fri Nov 27 at 11:59 pm.');
  const after = notes.noteId('Warning Project 2B is due Mon Nov 30 at 11:59 pm.');
  assert.notEqual(before, after);
  assert.notEqual(notes.noteId('Note Bring your laptop.'), notes.noteId('Tip Bring your laptop.'));
});

// ---- Remembering hidden boxes ----------------------------------------------------------------

test('a hidden box is saved under its page, and showing it again removes it', () => {
  const storage = fakeStorage();
  const store = tab(storage);
  assert.equal(store.isHidden('/labs', 'abc'), false);

  store.setHidden('/labs', 'abc', true);
  store.setHidden('/labs', 'def', true);
  assert.equal(store.isHidden('/labs', 'abc'), true);
  assert.equal(store.isHidden('/quizzes', 'abc'), false, 'another page keeps its own list');
  assert.deepEqual(storage.saved, { '/labs': ['abc', 'def'] });

  store.setHidden('/labs', 'abc', true);
  assert.deepEqual(storage.saved, { '/labs': ['abc', 'def'] }, 'hiding twice saves it once');

  store.setHidden('/labs', 'abc', false);
  store.setHidden('/labs', 'def', false);
  assert.equal(storage.saved, null, 'nothing hidden leaves nothing saved');
});

test('a hidden box stays hidden on the next visit', () => {
  const storage = fakeStorage();
  tab(storage).setHidden('/final', 'abc', true);
  const nextVisit = load(storage);
  assert.equal(nextVisit.createStore(() => storage).isHidden('/final', 'abc'), true);
});

test('boxes that were edited or removed are forgotten when their page is drawn', () => {
  const storage = fakeStorage({ value: JSON.stringify({ '/labs': ['old', 'kept'], '/final': ['x'] }) });
  const store = tab(storage);
  store.keepOnly('/labs', ['kept', 'new']);
  assert.deepEqual(storage.saved, { '/labs': ['kept'], '/final': ['x'] });
  store.keepOnly('/final', []);
  assert.deepEqual(storage.saved, { '/labs': ['kept'] });
});

test('two open tabs do not undo each other', () => {
  const storage = fakeStorage();
  const first = tab(storage);
  const second = tab(storage);
  first.setHidden('/labs', 'abc', true);
  second.setHidden('/labs', 'def', true);
  assert.deepEqual(storage.saved, { '/labs': ['abc', 'def'] });
});

test('a damaged saved value is ignored and then replaced', () => {
  for (const value of ['not json', '[1,2]', 'null', '{"/labs":"abc"}']) {
    const storage = fakeStorage({ value });
    const store = tab(storage);
    assert.equal(store.isHidden('/labs', 'abc'), false, value);
    store.setHidden('/labs', 'abc', true);
    assert.deepEqual(storage.saved, { '/labs': ['abc'] }, value);
  }
});

test('with storage blocked, hiding still works for the visit', () => {
  const storage = fakeStorage({ blocked: true });
  const store = tab(storage);
  assert.doesNotThrow(() => store.setHidden('/labs', 'abc', true));
  assert.equal(store.isHidden('/labs', 'abc'), true);
  store.keepOnly('/labs', ['abc']);
  assert.equal(store.isHidden('/labs', 'abc'), true);
  storage.blocked = false;
  assert.equal(storage.saved, null, 'nothing was written');
});

test('notes.js loads even where reading localStorage itself throws', () => {
  const window = {};
  Object.defineProperty(window, 'localStorage', { get() { throw new Error('SecurityError'); } });
  vm.runInContext(source, vm.createContext({ window }), { filename: 'notes.js' });
  const store = window.siteNotes.createStore(() => window.localStorage);
  store.setHidden('/labs', 'abc', true);
  assert.equal(store.isHidden('/labs', 'abc'), true);
});

// ---- Wiring ----------------------------------------------------------------------------------

test('index.html loads notes.js before docsify and adds the buttons on every page', () => {
  const at = index.indexOf('<script src="assets/js/notes.js"></script>');
  assert.ok(at > 0, 'notes.js is not loaded');
  assert.ok(at < index.indexOf('lib/docsify.min.js'), 'notes.js must load before docsify draws a page');
  const doneEach = index.slice(index.indexOf('hook.doneEach('), index.indexOf('renderMermaid();', index.indexOf('hook.doneEach(')));
  assert.match(doneEach, /siteNotes\.enhance\(document\.querySelector\('\.markdown-section'\), vm\.route\.path\)/);
});

test('a printed page shows every box in full', () => {
  const print = custom.slice(custom.lastIndexOf('@media print'));
  assert.match(print, /\.note-body\[hidden\]\s*\{\s*display:\s*block\s*!important;/);
});
