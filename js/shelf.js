(function () {
  'use strict';

  var BOXES_PER_SHELF = 6;

  function chunk(items, size) {
    var rows = [];
    for (var i = 0; i < items.length; i += size) {
      rows.push(items.slice(i, i + size));
    }
    return rows;
  }

  function createGameBox(game, index) {
    var link = document.createElement('a');
    link.className = 'game-box';
    link.href = game.href;
    link.setAttribute('role', 'listitem');
    link.setAttribute('aria-label', 'Open ' + game.title);
    link.dataset.stagger = String(index % BOXES_PER_SHELF);

    if (game.accent) {
      link.style.setProperty('--game-accent', game.accent);
    }

    var inner = document.createElement('div');
    inner.className = 'game-box__inner';

    var spine = document.createElement('div');
    spine.className = 'game-box__spine';
    spine.setAttribute('aria-hidden', 'true');

    var face = document.createElement('div');
    face.className = 'game-box__face';

    var cover = game.cover && String(game.cover).trim();
    if (cover) {
      var img = document.createElement('img');
      img.className = 'game-box__cover-img';
      img.src = cover;
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'lazy';
      face.appendChild(img);
    }

    var titleEl = document.createElement('span');
    titleEl.className = 'game-box__title';
    titleEl.textContent = game.title;

    face.appendChild(titleEl);
    inner.appendChild(spine);
    inner.appendChild(face);
    link.appendChild(inner);

    return link;
  }

  function render() {
    var mount = document.getElementById('shelf-mount');
    var catalog = window.GAME_CATALOG;

    if (!mount || !catalog || !catalog.length) {
      return;
    }

    mount.textContent = '';
    var globalIndex = 0;
    var rows = chunk(catalog, BOXES_PER_SHELF);

    rows.forEach(function (rowGames) {
      var shelf = document.createElement('div');
      shelf.className = 'shelf';
      shelf.setAttribute('role', 'list');

      rowGames.forEach(function (game) {
        shelf.appendChild(createGameBox(game, globalIndex));
        globalIndex += 1;
      });

      mount.appendChild(shelf);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
