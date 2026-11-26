// Hide and Show buttons for the Note, Tip, Warning and Attention boxes on the course site.
// A student who has read a box can minimize it to its title line, and it stays minimized on
// later visits in that browser. The title line becomes a button with aria-expanded, so screen
// readers announce it as "Warning, collapsed, button", and Enter and Space work.
(function (root) {
  'use strict';

  var KEY = 'cpsc100.hiddenNotes';

  // Each box is remembered by a short hash of its text (FNV-1a, whitespace collapsed). When we
  // edit a box, its hash changes, so it opens again for everyone who had hidden it: a changed
  // deadline or requirement is never left hidden.
  function noteId(text) {
    var s = String(text).replace(/\s+/g, ' ').trim();
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(36);
  }

  // Saved as {"/labs": ["1x2y3z"]}: the hidden boxes on each page. Storage is read again before
  // every change, so two open tabs do not undo each other. When storage is blocked (some private
  // windows, the Canvas iframe in some browsers) the list lives in memory for the visit.
  function createStore(getStorage) {
    var memory = {};

    function load() {
      try {
        var parsed = JSON.parse(getStorage().getItem(KEY) || '{}');
        memory = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
      } catch (err) { /* blocked or unreadable: keep what this visit has */ }
      return memory;
    }

    function hiddenOn(pages, page) {
      return Array.isArray(pages[page]) ? pages[page] : [];
    }

    function save(pages, page, ids) {
      if (ids.length) pages[page] = ids;
      else delete pages[page];
      try {
        if (Object.keys(pages).length) getStorage().setItem(KEY, JSON.stringify(pages));
        else getStorage().removeItem(KEY);
      } catch (err) { /* blocked: memory only */ }
    }

    return {
      isHidden: function (page, id) {
        return hiddenOn(load(), page).indexOf(id) !== -1;
      },
      setHidden: function (page, id, hidden) {
        var pages = load();
        var ids = hiddenOn(pages, page);
        if ((ids.indexOf(id) !== -1) === hidden) return;
        save(pages, page, hidden ? ids.concat(id) : ids.filter(function (x) { return x !== id; }));
      },
      // Forget boxes that are no longer on the page (edited or removed), so the list stays short.
      keepOnly: function (page, current) {
        var pages = load();
        var before = hiddenOn(pages, page);
        var ids = before.filter(function (x) { return current.indexOf(x) !== -1; });
        if (ids.length !== before.length) save(pages, page, ids);
      }
    };
  }

  var defaultStore = createStore(function () { return root.localStorage; });

  // Add a Hide button to every box in the page's content. Docsify draws each page fresh, so the
  // doneEach hook calls this after every page change.
  function enhance(section, page, store) {
    store = store || defaultStore;
    if (!section) return;
    var doc = section.ownerDocument;
    var seen = {};
    var ids = [];

    Array.prototype.forEach.call(section.querySelectorAll('.alert'), function (box, n) {
      var title = box.querySelector('.title');
      if (!title || title.parentNode !== box || title.querySelector('.note-toggle')) return;

      // Two boxes with the same text on one page get their own ids.
      var id = noteId(box.textContent);
      seen[id] = (seen[id] || 0) + 1;
      if (seen[id] > 1) id += '-' + seen[id];
      ids.push(id);

      var body = doc.createElement('div');
      body.className = 'note-body';
      body.id = 'note-' + (n + 1);
      Array.prototype.slice.call(box.childNodes).forEach(function (node) {
        if (node !== title) body.appendChild(node);
      });
      box.appendChild(body);

      var button = doc.createElement('button');
      button.type = 'button';
      button.className = 'note-toggle';
      button.setAttribute('aria-controls', body.id);
      var label = doc.createElement('span');
      label.className = 'note-label';
      while (title.firstChild) {
        var part = title.firstChild;
        // The icon stays as it is; the words ("Warning") go in a label that never wraps.
        (part.nodeType === 1 && part.classList.contains('icon') ? button : label).appendChild(part);
      }
      button.appendChild(label);

      // While minimized, the first line of the text shows after the title, so a student can
      // still tell the boxes apart.
      var preview = doc.createElement('span');
      preview.className = 'note-preview';
      preview.textContent = body.textContent.replace(/\s+/g, ' ').trim();
      var action = doc.createElement('span');
      action.className = 'note-action';
      action.setAttribute('aria-hidden', 'true');
      button.appendChild(preview);
      button.appendChild(action);
      title.appendChild(button);

      function draw(hidden) {
        box.classList.toggle('is-minimized', hidden);
        body.hidden = hidden;
        button.setAttribute('aria-expanded', String(!hidden));
        action.textContent = hidden ? 'Show' : 'Hide';
      }

      draw(store.isHidden(page, id));
      button.addEventListener('click', function () {
        var hidden = button.getAttribute('aria-expanded') === 'true';
        draw(hidden);
        store.setHidden(page, id, hidden);
      });
    });

    store.keepOnly(page, ids);
  }

  root.siteNotes = { KEY: KEY, noteId: noteId, createStore: createStore, enhance: enhance };
})(window);
