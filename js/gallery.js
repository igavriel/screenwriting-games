(function () {
  'use strict';

  var root = document.getElementById('gallery-root');
  var lightboxEl = document.getElementById('gallery-lightbox');
  /** @type HTMLElement | null */
  var restoreFocusEl = null;

  function trimText(value) {
    return value != null && String(value).trim() !== '' ? String(value).trim() : '';
  }

  function applyHebrewLtr(el) {
    el.setAttribute('lang', 'he');
    el.setAttribute('dir', 'ltr');
  }

  /**
   * Catalog image paths are site-root-relative (e.g. ./Ink/foo.jpg). This page lives under utils/.
   */
  function assetUrl(src) {
    var s = trimText(src);
    if (!s) return '';
    if (s.indexOf('/') === 0 || /^https?:\/\//i.test(s)) return s;
    return '../' + s.replace(/^\.\//, '');
  }

  function catalogIndexFromQuery(catalog) {
    var raw = '';
    try {
      raw = new URLSearchParams(window.location.search).get('game');
    } catch (e) {
      return null;
    }
    raw = trimText(raw);
    if (raw === '' || !/^-?\d+$/.test(raw)) {
      return null;
    }
    var n = parseInt(raw, 10);
    if (n < 0 || n >= catalog.length) return null;
    return n;
  }

  /** @returns {HTMLElement} */
  function el(tag, className, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] != null) node.setAttribute(k, attrs[k]);
      });
    }
    return node;
  }

  /** @returns {string} */
  function buildAriaLabel(item) {
    var caption = trimText(item.label);
    return caption ? 'View image: ' + caption : 'View image';
  }

  /** @type {null | Function} */
  var activeLightboxKeyHandler = null;

  function backdropClose(e) {
    if (!lightboxEl) return;
    if (e.target === lightboxEl) {
      closeLightbox();
    }
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.removeEventListener('click', backdropClose);
    if (activeLightboxKeyHandler) {
      document.removeEventListener('keydown', activeLightboxKeyHandler);
      activeLightboxKeyHandler = null;
    }
    lightboxEl.textContent = '';
    if (typeof lightboxEl.close === 'function') lightboxEl.close();
    else lightboxEl.removeAttribute('open');
    if (restoreFocusEl && restoreFocusEl.focus) {
      restoreFocusEl.focus();
    }
    restoreFocusEl = null;
  }

  /**
   * @param {Array<{ src: string, label: string }>} allItems
   * @param {number} slideIndex
   * @param {HTMLElement} triggerBtn
   */
  function openLightbox(allItems, slideIndex, triggerBtn) {
    if (!lightboxEl) return;

    /** @type {Array<{ src: string, label: string }>} */
    var slides = allItems.filter(function (it) {
      return !!(it && trimText(it.src));
    });
    if (!slides.length) return;

    var idx = slideIndex | 0;
    if (idx < 0) idx = 0;
    if (idx >= slides.length) idx = slides.length - 1;

    restoreFocusEl = triggerBtn;
    lightboxEl.textContent = '';

    function syncSlide() {
      var slide = slides[idx];
      img.src = assetUrl(slide.src);
      img.alt = trimText(slide.label) || '';
      img.classList.remove('gallery-lightbox__img--enter');
      void img.offsetWidth;
      img.classList.add('gallery-lightbox__img--enter');
      capMain.textContent = trimText(slide.label) || '(Untitled)';
      if (slides.length > 1) {
        counter.textContent = idx + 1 + ' / ' + slides.length;
        counter.hidden = false;
      } else {
        counter.textContent = '';
        counter.hidden = true;
      }
      prevNav.disabled = idx <= 0;
      prevNav.hidden = slides.length <= 1;
      nextNav.disabled = idx >= slides.length - 1;
      nextNav.hidden = slides.length <= 1;
      prevNav.setAttribute('aria-label', 'Previous image' + (idx > 0 ? '' : ' (first)'));
      nextNav.setAttribute('aria-label', 'Next image' + (idx < slides.length - 1 ? '' : ' (last)'));
    }

    var prevNav = el('button', 'gallery-lightbox__nav gallery-lightbox__nav--prev');
    prevNav.type = 'button';
    prevNav.setAttribute('aria-controls', 'gallery-lightbox-slide');
    prevNav.innerHTML =
      '<svg class="gallery-lightbox__nav-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14.5 18.5 8 12l6.5-6.5 1.5 1.4L10.8 12l5.2 5.1-1.5 1.4Z"/></svg>';

    var nextNav = el('button', 'gallery-lightbox__nav gallery-lightbox__nav--next');
    nextNav.type = 'button';
    nextNav.setAttribute('aria-controls', 'gallery-lightbox-slide');
    nextNav.innerHTML =
      '<svg class="gallery-lightbox__nav-icon" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="m9.5 18.5-1.5-1.4 5.2-5.1L8 7l1.5-1.5L16 12 9.5 18.5Z"/></svg>';

    prevNav.addEventListener('click', function (e) {
      e.stopPropagation();
      if (idx > 0) {
        idx -= 1;
        syncSlide();
      }
    });
    nextNav.addEventListener('click', function (e) {
      e.stopPropagation();
      if (idx < slides.length - 1) {
        idx += 1;
        syncSlide();
      }
    });

    var inner = el('div', 'gallery-lightbox__inner');

    var closeBtn = el('button', 'gallery-lightbox__close');
    closeBtn.type = 'button';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', function () {
      closeLightbox();
    });
    inner.appendChild(closeBtn);

    inner.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    var figure = el('figure', 'gallery-lightbox__figure');
    figure.id = 'gallery-lightbox-slide';

    var img = document.createElement('img');
    img.decoding = 'async';
    img.className = 'gallery-lightbox__img';
    img.draggable = false;
    figure.appendChild(img);

    var swipeStartX = 0;

    figure.addEventListener(
      'touchstart',
      function (e) {
        swipeStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    figure.addEventListener(
      'touchend',
      function (e) {
        if (slides.length <= 1) return;
        var dx = e.changedTouches[0].screenX - swipeStartX;
        if (dx > 50 && idx > 0) {
          idx -= 1;
          syncSlide();
        } else if (dx < -50 && idx < slides.length - 1) {
          idx += 1;
          syncSlide();
        }
      },
      { passive: true }
    );

    var cap = el('figcaption', 'gallery-lightbox__caption');
    cap.id = 'gallery-lightbox-caption';

    var counter = el('span', 'gallery-lightbox__counter');
    counter.setAttribute('aria-live', 'polite');
    counter.hidden = true;

    var capMain = el('div', 'gallery-lightbox__caption-main');
    cap.appendChild(capMain);
    cap.appendChild(counter);

    figure.appendChild(cap);
    inner.appendChild(figure);
    lightboxEl.appendChild(prevNav);
    lightboxEl.appendChild(inner);
    lightboxEl.appendChild(nextNav);
    lightboxEl.addEventListener('click', backdropClose);

    activeLightboxKeyHandler = function (e) {
      if (e.key === 'Escape') {
        closeLightbox();
        e.preventDefault();
        return;
      }
      if (slides.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        if (idx > 0) {
          idx -= 1;
          syncSlide();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'ArrowRight') {
        if (idx < slides.length - 1) {
          idx += 1;
          syncSlide();
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', activeLightboxKeyHandler);

    syncSlide();
    closeBtn.focus();

    if (typeof lightboxEl.showModal === 'function') {
      lightboxEl.showModal();
    } else {
      lightboxEl.setAttribute('open', '');
    }
  }

  function renderGallery(game, index, galleryItems) {
    if (!root) return;

    var header = el('header', 'gallery-page__header');
    var h2 = el('h2', 'gallery-page__title');
    h2.textContent = trimText(game.titleEn) || 'Untitled';
    header.appendChild(h2);

    var titleHe = trimText(game.titleHe);
    if (titleHe) {
      var h3 = el('p', 'gallery-page__title-he');
      applyHebrewLtr(h3);
      h3.textContent = titleHe;
      header.appendChild(h3);
    }

    root.appendChild(header);

    var grid = el('ul', 'gallery-grid');
    grid.id = 'gallery-grid';

    /** @type {number} */
    var nextSlideIx = 0;

    galleryItems.forEach(function (item) {
      if (!item || !trimText(item.src)) return;

      var slideIx = nextSlideIx;
      nextSlideIx += 1;

      var li = el('li', 'gallery-grid__tile');

      var btn = el(
        'button',
        'gallery-grid__btn',
        { type: 'button', 'aria-label': buildAriaLabel(item) }
      );

      var wrap = el('div', 'gallery-grid__thumb-wrap');
      var thumb = document.createElement('img');
      thumb.alt = '';
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.src = assetUrl(item.src);

      wrap.appendChild(thumb);
      btn.appendChild(wrap);

      var capWrap = el('div', 'gallery-grid__caption');
      var capText = el('span', 'gallery-grid__caption-text');
      capText.textContent = trimText(item.label) || '—';
      capWrap.appendChild(capText);

      btn.appendChild(capWrap);

      btn.addEventListener('click', function () {
        openLightbox(galleryItems, slideIx, btn);
      });

      li.appendChild(btn);
      grid.appendChild(li);
    });

    root.appendChild(grid);
    document.title = trimText(game.titleEn) ? trimText(game.titleEn) + ' — Illustrations' : 'Illustrations';
    if (!grid.children.length && root.children.length <= 2) {
      root.appendChild(renderError('There are no valid images listed for this book.'));
    }
  }

  function renderError(msg) {
    var box = el('div', 'gallery-page__error');
    var p = document.createElement('p');
    p.textContent = msg || 'Something went wrong.';
    box.appendChild(p);
    return box;
  }

  function boot() {
    if (!root) return;

    root.textContent = '';
    document.title = 'Illustrations';

    var catalog = window.GAME_CATALOG || [];
    var idx = catalogIndexFromQuery(catalog);

    if (idx == null) {
      root.appendChild(
        renderError('Missing or invalid ?game parameter. Pick a story on the shelf and open its illustration gallery.')
      );
      return;
    }

    var game = catalog[idx];
    var rawGallery = Array.isArray(game.gallery) ? game.gallery : [];

    /** @type Array<{ src: string, label: string }> */
    var items = [];

    rawGallery.forEach(function (g) {
      if (!g) return;
      var srcItem = trimText(g.src);
      if (!srcItem) return;

      items.push({
        src: srcItem,
        label: trimText(g.label),
      });
    });

    if (!items.length) {
      root.appendChild(renderError('This book has no illustrations in the catalog yet.'));
      return;
    }

    renderGallery(game, idx, items);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
