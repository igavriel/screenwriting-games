(function () {
  'use strict';

  function trimText(value) {
    return value != null && String(value).trim() !== '' ? String(value).trim() : '';
  }

  function isExternalHref(href) {
    return /^https?:\/\//i.test(href);
  }

  function viewerHref(href) {
    if (isExternalHref(href)) {
      return href;
    }
    if (/\.(md|markdown|ink|twee)$/i.test(href)) {
      return 'utils/viewer.html?file=' + encodeURIComponent(href);
    }
    return href;
  }

  function createMetaRow(label, value) {
    if (!trimText(value)) {
      return null;
    }
    var row = document.createElement('div');
    row.className = 'book-card__meta-row';

    var dt = document.createElement('span');
    dt.className = 'book-card__meta-label';
    dt.textContent = label;

    var dd = document.createElement('span');
    dd.className = 'book-card__meta-value';
    dd.textContent = value;

    row.appendChild(dt);
    row.appendChild(dd);
    return row;
  }

  function createSourcesSection(sources) {
    if (!sources || !sources.length) {
      return null;
    }

    var section = document.createElement('div');
    section.className = 'book-card__sources';

    var heading = document.createElement('h3');
    heading.className = 'book-card__sources-heading';
    heading.textContent = 'Sources';
    section.appendChild(heading);

    var list = document.createElement('ul');
    list.className = 'book-card__sources-list';

    sources.forEach(function (item) {
      var href = item && trimText(item.href);
      if (!href) {
        return;
      }
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = viewerHref(href);
      a.textContent = trimText(item.label) || href;
      if (isExternalHref(href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      li.appendChild(a);
      list.appendChild(li);
    });

    if (!list.children.length) {
      return null;
    }

    section.appendChild(list);
    return section;
  }

  function createBookCard(game, index) {
    var article = document.createElement('article');
    article.className = 'book-card';
    article.setAttribute('role', 'listitem');

    if (game.accent) {
      article.style.setProperty('--game-accent', game.accent);
    }

    var info = document.createElement('div');
    info.className = 'book-card__info';

    var cardTitle = trimText(game.title) || 'Untitled';
    var coverLabel = trimText(game.bookTitle) || trimText(game.title) || '';

    var title = document.createElement('h2');
    title.className = 'book-card__title';
    title.id = 'book-title-' + index;
    title.textContent = cardTitle;
    article.setAttribute('aria-labelledby', title.id);

    info.appendChild(title);

    var summaryText = trimText(game.summary);
    if (summaryText) {
      var story = document.createElement('p');
      story.className = 'book-card__story';
      story.textContent = summaryText;
      info.appendChild(story);
    }

    var meta = document.createElement('div');
    meta.className = 'book-card__meta';

    var langRow = createMetaRow('Language', trimText(game.language));
    if (langRow) {
      meta.appendChild(langRow);
    }
    var techRow = createMetaRow('Technology', trimText(game.technology));
    if (techRow) {
      meta.appendChild(techRow);
    }
    var dateRow = createMetaRow('Date', trimText(game.date));
    if (dateRow) {
      meta.appendChild(dateRow);
    }
    if (meta.children.length) {
      info.appendChild(meta);
    }

    var sourcesBlock = createSourcesSection(game.sources);
    if (sourcesBlock) {
      info.appendChild(sourcesBlock);
    }

    var coverLink = document.createElement('a');
    coverLink.className = 'book-card__cover-link';
    coverLink.href = game.href;
    coverLink.setAttribute('aria-label', 'Open ' + (coverLabel || 'story'));

    var cover = document.createElement('div');
    cover.className = 'book-card__cover';

    var coverSrc = game.cover && trimText(game.cover);
    if (coverSrc) {
      var img = document.createElement('img');
      img.className = 'book-card__cover-img';
      img.src = coverSrc;
      img.alt = '';
      img.decoding = 'async';
      img.loading = 'lazy';
      cover.appendChild(img);
    }

    var coverTitle = document.createElement('span');
    coverTitle.className = 'book-card__cover-title';
    coverTitle.textContent = coverLabel;
    cover.appendChild(coverTitle);

    coverLink.appendChild(cover);

    article.appendChild(coverLink);
    article.appendChild(info);

    return article;
  }

  function render() {
    var mount = document.getElementById('shelf-mount');
    var catalog = window.GAME_CATALOG;

    if (!mount || !catalog || !catalog.length) {
      return;
    }

    mount.textContent = '';
    mount.className = 'book-list';
    mount.setAttribute('role', 'list');

    catalog.forEach(function (game, index) {
      mount.appendChild(createBookCard(game, index));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
