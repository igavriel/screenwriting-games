---
name: Shelf book card fields
overview: >-
  Bilingual catalog fields (English card title + optional Hebrew cover/name, dual summaries, split link lists)
  implemented as titleEn/titleHe, summaryEn/summaryHe, externalLinks, versions; renderer uses createLinkSection,
  Hebrew blocks with LTR paragraph flow, and neutral book-card__link-* CSS. Optional gallery and meta rows added later.
todos:
  - id: schema-games-js
    content: games.js — titleEn/titleHe, summaryEn/summaryHe, externalLinks, versions; docs; no sources
    status: completed
  - id: shelf-renderer
    content: shelf.js — bookLabel/coverLabel, dual summaries, appendHebrewBlock, createLinkSection, viewerHref
    status: completed
  - id: css-link-sections
    content: main.css — book-card__link-section, __link-heading, __link-list; story--he spacing
    status: completed
  - id: shelf-extensions
    content: Follow-on — list/grid, gallery, linked titles (shelf_main_page + picture_grid plans)
    status: completed
  - id: manual-verify
    content: Smoke-test cards — headings, Hebrew block, link groups, viewer vs external URLs
    status: completed
isProject: true
repo: screenwriting-games
---

# Shelf book card: bilingual fields and split links (implemented)

**Note:** The original design referred to `title` / `bookTitle` / `summary`. **Implemented** names are **`titleEn`**, **`titleHe`**, **`summaryEn`**, **`summaryHe`**.

## `js/games.js` — catalog fields

| Field | Purpose |
| ----- | ------- |
| `titleEn` | English heading (`h2` + anchor to `href`). |
| `titleHe` | Hebrew on cover spine; optional Hebrew title line in card body when combined with block layout. |
| `href`, `cover`, `accent` | Primary play link and presentation. |
| `summaryEn` | English synopsis. |
| `summaryHe` | Optional Hebrew synopsis. |
| `language`, `technology`, `date` | Optional meta rows. |
| `externalLinks`, `versions` | Separate `{ label, href }[]` lists; no unified `sources`. |
| `gallery` | Optional; see [picture_grid_gallery_33745a13.plan.md](picture_grid_gallery_33745a13.plan.md). |

## `js/shelf.js` — rendering

- **`createLinkSection(heading, items)`** → **External links** / **Older versions**.
- **`appendHebrewBlock`**: Hebrew title link + `summaryHe` with **`applyHebrewLtr`** (`lang="he"`, **`dir="ltr"`** on element).
- **`viewerHref`** for `.md` / `.ink` / `.twee`.

## `css/main.css`

- **`book-card__link-section`**, **`book-card__link-heading`**, **`book-card__link-list`**.

## Related plans

- [shelf_main_page_220edd44.plan.md](shelf_main_page_220edd44.plan.md) — full shelf UX (grid, gallery entry, toolbar).
- [picture_grid_gallery_33745a13.plan.md](picture_grid_gallery_33745a13.plan.md) — **`gallery`** field.

## Global plan twin

Matches **`~/.cursor/plans/shelf_book_card_fields_3759db90.plan.md`**. **This repo file is the canonical copy under git.**
