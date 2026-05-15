(function () {
  'use strict';

  var VIEW_STORAGE_KEY = 'shelf-view';
  var currentView = 'list';
  var viewToolbarEl = null;
  var listViewBtn = null;
  var gridViewBtn = null;

  function trimText(value) {
    return value != null && String(value).trim() !== '' ? String(value).trim() : '';
  }

  function isExternalHref(href) {
    return /^https?:\/\//i.test(href);
  }

  /** Primary playable link — same semantics as `.book-card__cover-link`. */
  function applyPrimaryHref(el, href) {
    var h = trimText(href);
    if (!h) {
      return;
    }
    el.href = h;
    if (isExternalHref(h)) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
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

  function getCatalog() {
    return window.GAME_CATALOG || [];
  }

  function bookLabel(game) {
    return trimText(game.titleEn) || 'Untitled';
  }

  function coverLabel(game) {
    return trimText(game.titleHe) || trimText(game.titleEn) || '';
  }

  function hasGallery(game) {
    return !!(game && Array.isArray(game.gallery) && game.gallery.length);
  }

  function galleryPageHref(index) {
    return 'utils/gallery.html?game=' + index;
  }

  /**
   * @returns {HTMLAnchorElement|null}
   */
  function createGalleryButton(game, index) {
    if (!hasGallery(game)) {
      return null;
    }
    var a = document.createElement('a');
    a.className = 'book-card__gallery-btn';
    a.href = galleryPageHref(index);
    a.setAttribute('aria-label', 'View illustrations: ' + bookLabel(game));
    a.innerHTML =
      '<svg class="book-card__gallery-btn-icon" width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<rect class="book-card__gallery-btn-frame book-card__gallery-btn-frame--back" x="1" y="4" width="12" height="12" rx="1" />' +
      '<rect class="book-card__gallery-btn-frame book-card__gallery-btn-frame--mid" x="5" y="2" width="12" height="12" rx="1" />' +
      '<rect class="book-card__gallery-btn-frame book-card__gallery-btn-frame--front" x="9" y="0" width="12" height="12" rx="1" />' +
      '</svg>';
    return a;
  }

  function loadStoredView() {
    try {
      var stored = localStorage.getItem(VIEW_STORAGE_KEY);
      if (stored === 'list' || stored === 'grid') {
        return stored;
      }
    } catch (err) {
      /* ignore */
    }
    return 'list';
  }

  function saveView(view) {
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch (err) {
      /* ignore */
    }
  }

  function applyHebrewLtr(el) {
    el.setAttribute('lang', 'he');
    el.setAttribute('dir', 'ltr');
  }

  function createCover(game, coverClass, titleClass) {
    var cover = document.createElement('div');
    cover.className = coverClass;

    if (game.accent) {
      cover.style.setProperty('--game-accent', game.accent);
    }

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

    var spineTitle = document.createElement('span');
    spineTitle.className = titleClass;
    spineTitle.textContent = coverLabel(game);
    if (trimText(game.titleHe)) {
      applyHebrewLtr(spineTitle);
    }
    cover.appendChild(spineTitle);

    return cover;
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

  function createLinkSection(heading, items) {
    if (!items || !items.length) {
      return null;
    }

    var section = document.createElement('div');
    section.className = 'book-card__link-section';

    var headingEl = document.createElement('h3');
    headingEl.className = 'book-card__link-heading';
    headingEl.textContent = heading;
    section.appendChild(headingEl);

    var list = document.createElement('ul');
    list.className = 'book-card__link-list';

    items.forEach(function (item) {
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

  function appendSummaryParagraph(parent, text, options) {
    var summaryText = trimText(text);
    if (!summaryText) {
      return;
    }
    var story = document.createElement('p');
    story.className = 'book-card__story';
    if (options && options.hebrew) {
      story.classList.add('book-card__story--he');
      applyHebrewLtr(story);
    }
    story.textContent = summaryText;
    parent.appendChild(story);
  }

  function appendHebrewBlock(parent, game) {
    var titleHe = trimText(game.titleHe);
    var summaryHe = trimText(game.summaryHe);
    if (!titleHe && !summaryHe) {
      return;
    }

    var block = document.createElement('div');
    block.className = 'book-card__he-block';

    if (titleHe) {
      var heading = document.createElement('p');
      heading.className = 'book-card__title-he';
      applyHebrewLtr(heading);
      var heLink = document.createElement('a');
      heLink.className = 'book-card__title-link book-card__title-link--he';
      heLink.textContent = titleHe;
      applyPrimaryHref(heLink, game.href);
      heLink.setAttribute('aria-label', 'Open ' + titleHe);
      heading.appendChild(heLink);
      block.appendChild(heading);
    }

    if (summaryHe) {
      appendSummaryParagraph(block, summaryHe, { hebrew: true });
    }

    parent.appendChild(block);
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

    var cardTitle = bookLabel(game);
    var label = coverLabel(game);

    var title = document.createElement('h2');
    title.className = 'book-card__title';
    title.id = 'book-title-' + index;

    var titleLink = document.createElement('a');
    titleLink.className = 'book-card__title-link';
    titleLink.textContent = cardTitle;
    applyPrimaryHref(titleLink, game.href);
    titleLink.setAttribute('aria-label', 'Open ' + (cardTitle || 'story'));

    title.appendChild(titleLink);
    article.setAttribute('aria-labelledby', title.id);

    info.appendChild(title);

    appendSummaryParagraph(info, game.summaryEn);
    appendHebrewBlock(info, game);

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

    var externalBlock = createLinkSection('External links', game.externalLinks);
    if (externalBlock) {
      info.appendChild(externalBlock);
    }

    var versionsBlock = createLinkSection('Older versions', game.versions);
    if (versionsBlock) {
      info.appendChild(versionsBlock);
    }

    var coverLink = document.createElement('a');
    coverLink.className = 'book-card__cover-link';
    applyPrimaryHref(coverLink, game.href);
    coverLink.setAttribute('aria-label', 'Open ' + (label || 'story'));
    coverLink.appendChild(
      createCover(game, 'book-card__cover', 'book-card__cover-title')
    );

    var coverColumn = document.createElement('div');
    coverColumn.className = 'book-card__cover-column';
    coverColumn.appendChild(coverLink);
    var listGallery = createGalleryButton(game, index);
    if (listGallery) {
      coverColumn.appendChild(listGallery);
    }

    article.appendChild(coverColumn);
    article.appendChild(info);

    return article;
  }

  function createGridTile(game, index) {
    var article = document.createElement('article');
    article.className = 'book-grid-item';
    article.setAttribute('role', 'listitem');

    if (game.accent) {
      article.style.setProperty('--game-accent', game.accent);
    }

    var stack = document.createElement('div');
    stack.className = 'book-grid-item__stack';

    var coverLink = document.createElement('a');
    coverLink.className = 'book-grid-item__cover-link';
    applyPrimaryHref(coverLink, game.href);
    coverLink.setAttribute(
      'aria-label',
      'Open ' + (coverLabel(game) || bookLabel(game) || 'story')
    );
    coverLink.appendChild(createCover(game, 'book-grid-item__cover', 'book-grid-item__cover-title'));

    stack.appendChild(coverLink);

    var gridGallery = createGalleryButton(game, index);
    if (gridGallery) {
      gridGallery.classList.add('book-grid-item__gallery-btn');
      stack.appendChild(gridGallery);
    }

    var textLink = document.createElement('a');
    textLink.className = 'book-grid-item__text-link';
    applyPrimaryHref(textLink, game.href);
    textLink.setAttribute('aria-labelledby', 'book-grid-title-' + index);

    var title = document.createElement('h2');
    title.className = 'book-grid-item__title';
    title.id = 'book-grid-title-' + index;
    title.textContent = bookLabel(game);
    textLink.appendChild(title);

    var titleHe = trimText(game.titleHe);
    if (titleHe && titleHe !== trimText(game.titleEn)) {
      var subtitle = document.createElement('p');
      subtitle.className = 'book-grid-item__subtitle';
      applyHebrewLtr(subtitle);
      subtitle.textContent = titleHe;
      textLink.appendChild(subtitle);
    }

    article.appendChild(stack);
    article.appendChild(textLink);
    return article;
  }

  function updateViewToolbar() {
    if (!listViewBtn || !gridViewBtn) {
      return;
    }

    var isList = currentView === 'list';
    listViewBtn.setAttribute('aria-pressed', isList ? 'true' : 'false');
    gridViewBtn.setAttribute('aria-pressed', isList ? 'false' : 'true');
    listViewBtn.classList.toggle('shelf-view-toolbar__btn--active', isList);
    gridViewBtn.classList.toggle('shelf-view-toolbar__btn--active', !isList);
  }

  function setView(view) {
    if (view !== 'list' && view !== 'grid') {
      return;
    }
    currentView = view;
    saveView(view);
    renderBooks();
    updateViewToolbar();
  }

  function createViewToolbar(storeSection, mount) {
    var toolbar = document.createElement('div');
    toolbar.className = 'shelf-view-toolbar';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Shelf layout');

    var label = document.createElement('span');
    label.className = 'shelf-view-toolbar__label';
    label.textContent = 'View';
    toolbar.appendChild(label);

    var group = document.createElement('div');
    group.className = 'shelf-view-toolbar__group';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Display mode');

    listViewBtn = document.createElement('button');
    listViewBtn.type = 'button';
    listViewBtn.className = 'shelf-view-toolbar__btn shelf-view-toolbar__btn--active';
    listViewBtn.dataset.view = 'list';
    listViewBtn.textContent = 'List';
    listViewBtn.setAttribute('aria-pressed', 'true');

    gridViewBtn = document.createElement('button');
    gridViewBtn.type = 'button';
    gridViewBtn.className = 'shelf-view-toolbar__btn';
    gridViewBtn.dataset.view = 'grid';
    gridViewBtn.textContent = 'Grid';
    gridViewBtn.setAttribute('aria-pressed', 'false');

    group.appendChild(listViewBtn);
    group.appendChild(gridViewBtn);
    toolbar.appendChild(group);

    toolbar.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-view]');
      if (!btn) {
        return;
      }
      setView(btn.dataset.view);
    });

    storeSection.insertBefore(toolbar, mount);
    viewToolbarEl = toolbar;
  }

  function renderBooks() {
    var mount = document.getElementById('shelf-mount');
    var catalog = getCatalog();

    if (!mount || !catalog.length) {
      return;
    }

    mount.textContent = '';
    mount.setAttribute('role', 'list');

    if (currentView === 'grid') {
      mount.className = 'book-list book-list--grid';
      catalog.forEach(function (game, index) {
        mount.appendChild(createGridTile(game, index));
      });
    } else {
      mount.className = 'book-list book-list--list';
      catalog.forEach(function (game, index) {
        mount.appendChild(createBookCard(game, index));
      });
    }
  }

  function render() {
    var mount = document.getElementById('shelf-mount');
    var storeSection = document.getElementById('store');
    var catalog = getCatalog();

    if (!mount || !catalog.length) {
      return;
    }

    currentView = loadStoredView();

    if (!viewToolbarEl && storeSection) {
      createViewToolbar(storeSection, mount);
    }

    renderBooks();
    updateViewToolbar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
