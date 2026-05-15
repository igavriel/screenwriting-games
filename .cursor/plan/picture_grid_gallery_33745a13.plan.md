---
name: Picture grid gallery
overview: Extend the game catalog with an optional per-book image list, a themed gallery page (grid + lightbox with prev/next), and shelf entry via a stacked-photo button under each cover—with valid HTML in grid tiles (no nested links).
todos:
  - id: catalog-schema
    content: "Optional gallery [{ label, src }] in games.js + JSDoc; seed all shelf books from repo assets"
    status: completed
  - id: gallery-page
    content: utils/gallery.html + css/gallery.css + js/gallery.js (?game=N, lightbox navigation)
    status: completed
  - id: shelf-button
    content: galleryPageHref + createGalleryButton + book-card cover column
    status: completed
  - id: grid-refactor
    content: Split grid tile cover vs text links; main.css hover/focus/reduced-motion
    status: completed
isProject: true
repo: screenwriting-games
---

# Picture grid viewer for catalog games

Implementation status: **done** — see repo paths below.

## Data model (`js/games.js`)

- Optional **`gallery`**: array of **`{ label, src }`** (write **`label`** first, then **`src`** in the object literal).
  - **`src`** (required for a visible slide): image path, same rules as **`cover`** (site root–relative; often `./Ink/assets/foo.jpeg`).
  - **`label`**: caption for grid tile, `<img>` `alt`, and lightbox heading; omit or empty still shows placeholders where needed.
- Omit **`gallery`** or use **`[]`** when there are no images — no shelf button.
- Seed data: **`Twine/assets/*`** maps to the Twine catalog row; **`Ink/assets/*`** maps to the Ugly Duckling / Ink catalog row.

## Gallery page (`utils/gallery.html`, `js/gallery.js`, `css/gallery.css`)

- **Shell**: Mirrors `utils/viewer.html` (fonts, `../css/main.css`, `../css/gallery.css`, back link → `../index.html`, `#gallery-root`, footer).
- **Routing**: **`utils/gallery.html?game=N`** where **`N`** is the numeric index into `window.GAME_CATALOG`.
- **Errors**: Missing / invalid **`game`**, empty gallery, or no valid **`src`** → short themed message plus back link.
- **Grid**: Responsive CSS grid; thumbnails use **`object-fit: cover`**; captions from **`label`**.
- **Lightbox** (`<dialog>`, **`role="dialog"`**, **`aria-modal="true"`**):
  - Full-size **`src`**, caption, Close (×), backdrop click, **Escape** to dismiss; focus restored to trigger.
  - **Prev / Next**: Side controls (modern carousel pattern), **keyboard ← / →**, **touch swipe** on the image; **`disabled`** on first/last slide; counter **`k / n`** under caption when **n > 1** (nav hidden when **n === 1**).
  - **Motion**: Brief image enter animation unless **`prefers-reduced-motion: reduce`**.
- **Important CSS**: Lightbox **`display`** (flex / layout) scoped to **`.gallery-lightbox[open]`** only — a closed dialog must stay **`display: none`** so it does not block page links (“Back to shelf”).
- **`assetUrl()`**: Paths in catalog are rewritten with **`../`** when opened from **`utils/`**.

## Shelf (`js/shelf.js`)

- **`galleryPageHref(index)`** → **`utils/gallery.html?game=<index>`** (relative to site root from `index.html`).
- **`createGalleryButton`**: Renders **`a.book-card__gallery-btn`** with stacked-frame SVG plus **`aria-label`**, only if **`gallery.length`**.
- **`hasGallery`** / **`applyPrimaryHref`** used consistently with cover links.

### List cards

- **`book-card__cover-column`**: column wrapper for **`book-card__cover-link`** + optional gallery **`a`** (no nested anchors).

### Grid tiles

- **`article.book-grid-item`**: **`div.book-grid-item__stack`** (`cover-only` **`a`** + optional gallery **`a`**) plus sibling **`a.book-grid-item__text-link`** for titles (**`aria-labelledby`** on heading).
- Hover affordance: **`.book-grid-item:hover`** lifts cover + title block; **`focus-visible`** on each link preserves keyboard outlines.

### Theme (`css/main.css`)

- Gallery button + column styles; grid selectors updated away from **`book-grid-item__link`**; **`prefers-reduced-motion`** tuned for shelf + gallery.

## Files (summary)

| Area | Paths |
|------|--------|
| Data | `js/games.js` |
| Shelf UI | `js/shelf.js` |
| Shelf / grid styling | `css/main.css` |
| Gallery standalone | `utils/gallery.html`, `css/gallery.css`, `js/gallery.js` |

`index.html` unchanged beyond loading existing scripts.

## Global plan twin

Matches **`~/.cursor/plans/picture_grid_gallery_33745a13.plan.md`** in Cursor’s plan store (same title / id). **This repo file is the canonical copy under git**; refresh the global file when syncing from git if you rely on Cursor’s Plans UI.
