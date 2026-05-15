---
name: Shelf main page
overview: >-
  Static retro “bookstore shelf” hub at repo root listing games from `GAME_CATALOG`; list + grid views,
  bilingual cards (EN/HE), 3D-ish covers, meta + version/source links, optional illustration gallery button,
  aged-paper theme in `main.css`, no build step.
todos:
  - id: scaffold-folders
    content: css/, js/, main.css + games.js + shelf.js wired from index.html
    status: completed
  - id: catalog-and-render
    content: GAME_CATALOG in games.js; shelf.js builds list/grid DOM with semantic roles and links
    status: completed
  - id: shelf-styles
    content: main.css design tokens, book-card + grid tiles, wood rail shelf, hover/focus + reduced-motion
    status: completed
  - id: wire-index
    content: Semantic header/main/footer, Google fonts, defer games.js → shelf.js, #shelf-mount
    status: completed
  - id: list-grid-toolbar
    content: List vs grid toggle; preference in localStorage (shelf-view)
    status: completed
  - id: bilingual-metadata
    content: titleEn/titleHe, summaries, meta rows, Hebrew block with dir=ltr wrapping
    status: completed
  - id: secondary-links
    content: External links + older versions lists; viewer routing for .md/.ink/.twee via utils/viewer.html
    status: completed
  - id: gallery-entry
    content: Optional per-game gallery in games.js → utils/gallery.html?game=N + stacked-photo button under cover
    status: completed
isProject: true
repo: screenwriting-games
---

# Shelf main page — implementation reference

Implementation status: **done**. See **`index.html`**, **`css/main.css`**, **`js/games.js`**, **`js/shelf.js`**.

## `index.html` (repo root)

- Fonts: Crimson Text + Old Standard TT (Google Fonts).
- **Header**: `.site-title`, `.site-subtitle` (author line, `aria-hidden`), `.store-sign` (“Visual Novels”, subtle CSS animation).
- **Main**: `<section id="store">` → empty `<div id="shelf-mount">` filled by `shelf.js`.
- **Footer**: copyright line.
- Scripts: `js/games.js` then `js/shelf.js`, both `defer`.
- No build step; no noscript duplicate list in HTML (optional only).

## Catalog — `js/games.js`

- **`window.GAME_CATALOG`**: game objects with **`titleEn`**, optional **`titleHe`**, **`href`**, **`cover`**, **`accent`**, summaries, **`language`** / **`technology`** / **`date`**, **`externalLinks`**, **`versions`**, optional **`gallery`** (`[{ label, src }]` for `utils/gallery.html`).
- Cover paths commonly live under **`Twine/assets/`** or **`Ink/assets/`** (there is no required top-level **`assets/covers/`** folder).

## Renderer — `js/shelf.js`

- Toolbar: **List** vs **Grid**; persisted as **`localStorage['shelf-view']`**.
- **List**: `article.book-card` — **`book-card__cover-column`** (cover link + optional gallery link) + **`book-card__info`** (linked title `h2 > a`, copy, meta, external + versions lists).
- **Grid**: `article.book-grid-item` — **`book-grid-item__stack`** (cover `a` + gallery) + **`book-grid-item__text-link`** (titles only); avoids nested anchors.
- **`viewerHref`**: wraps `.md` / `.ink` / `.twee` paths to **`utils/viewer.html?file=…`**.

## Styling — `css/main.css`

- Aged paper + ink tokens, wood shelf rail on list cards, 3D list covers with **`perspective`**, responsive column layout for narrow viewports.
- Grid hover lifts cover + titles together; **`book-card__gallery-btn`** styling.
- **`prefers-reduced-motion`** support.

## Related

- Illustration grid UX: [.cursor/plan/picture_grid_gallery_33745a13.plan.md](picture_grid_gallery_33745a13.plan.md)

## Global plan twin

Matches **`~/.cursor/plans/shelf_main_page_220edd44.plan.md`**. **This repo file is the canonical copy under git.**
