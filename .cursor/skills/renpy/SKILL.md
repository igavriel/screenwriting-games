---
name: renpy
description: >-
  Edits Ren'Py visual novel projects under renpy/ (.rpy, script.rpy,
  screens.rpy, gui.rpy, options.rpy). Covers characters, dialogue, images,
  screens, labels, menus, audio, RTL, and build.name layout. Use when the
  user works in renpy/, mentions Ren'Py, or asks about .rpy scripts in this
  repository.
---

# Ren'Py (screenwriting-games)

Authoritative API behavior: [Ren'Py documentation](https://www.renpy.org/doc/html/index.html). Use [reference.md](reference.md) for chapter links. Use [repo-conventions.md](repo-conventions.md) for this monorepo’s folders, shelf gallery paths, and image naming.

## Scope

- Apply when editing paths under `renpy/**` or when the user asks about Ren'Py in this repository.
- Do **not** change Twine, Ink, or shelf JS unless the task includes catalog or gallery wiring (`config/games.js`, `js/gallery.js`).

## Workflow

1. Identify the game: project root is `renpy/<build.name>/` (see `define build.name` in that game’s `game/options.rpy`; usually matches the folder name).
2. Read that game’s `game/script.rpy`, `game/options.rpy`, and `game/screens.rpy` before editing.
3. If API behavior is unclear, follow the link in [reference.md](reference.md)—do not invent Ren'Py APIs.
4. Make minimal diffs; match existing `Character` definitions, transforms, and comment style.
5. If assets should appear on the web shelf gallery, update `gallery` in [config/games.js](../../config/games.js) per [repo-conventions.md](repo-conventions.md).
6. Suggest verifying in the Ren'Py Launcher (Launch Project; Shift+R to reload scripts). See [Developer tools](https://www.renpy.org/doc/html/developer_tools.html).

## Core rules

| Topic | Rule |
| ----- | ---- |
| **Characters** | `define x = Character(...)`; lines via `x "text"`. Nameless voice: `Character(None, ...)`. Optional `image=` for automatic side images. |
| **Sprites vs Character names** | `show character stop_narrator` shows the **image tag** `character` with attribute `stop_narrator`—not the `narrator` **Character**. Prefer `Character(..., image="character stop_narrator")` on the narrator if only that sprite should appear on narrator lines. |
| **Window** | Avoid `window hide` / manual `show` / `window show` between dialogue unless intentional; it can flash sprites or empty the text box. |
| **Images** | `image tag attr = "path"`; paths relative to `game/`. Quoted paths support spaces in filenames. |
| **Show / scene** | `scene bg` clears; `show character expr at transform` layers sprites. |
| **Flow** | `label`, `jump`, `call`, `return`; branching via `menu:`. |
| **Screens** | HUD and UI in `screen` blocks; `show screen name` / `hide screen name`. |
| **RTL** | Games with Hebrew UI often set `define config.rtl = True` in `options.rpy`—preserve when editing those projects. |
| **Config** | `config.name` (display title), `build.name` (ASCII, no spaces, distribution id). |
| **State** | Use `default var = value` for game state; remember rollback on load/skip. |

## Repo pitfalls

- **Narrator flash** (`one_more_moment`): A block like `window hide` → `show character stop_narrator` → `window show` between `script` and `girl` lines shows the stop-narrator sprite and an empty dialogue window. Fix by removing that block, or attach the sprite via `define narrator = Character(..., image="character stop_narrator")` so only `narrator "..."` lines show it.
- **Web gallery 404s**: Catalog paths must be `./renpy/<build.name>/game/images/...` (lowercase `renpy`, include `images/`). Spaces in filenames are fine; the site encodes URLs in `js/gallery.js`.
- **Image tag vs file**: `show character default_fake_smile` maps to `game/images/character default_fake_smile.png` (spaces in filename, not underscores in the `show` statement).
- **Do not commit** unless asked: `game/saves/`, `game/cache/`, `*.rpyc`, build `*-dists/` folders.

Details: [repo-conventions.md](repo-conventions.md).

## How to use this skill (humans)

1. **Automatic** — In Agent chat, ask to edit files under `renpy/` (e.g. “fix `script.rpy` in one_more_moment”). Cursor matches the skill `description` and loads this file.
2. **Explicit** — Type **`@renpy`** or pick **renpy** from the Skills menu, then your request (e.g. `@renpy add a menu choice that lowers lives`).
3. **Teammates** — Skill lives in `.cursor/skills/renpy/` in the repo; no personal install required.
4. **Verify in engine** — Ren'Py Launcher → open `renpy/<project>/` → Launch Project; after script edits use Shift+R reload.

To use this skill in **all** your projects, copy `.cursor/skills/renpy/` to `~/.cursor/skills/renpy/`. Do not put custom skills in `~/.cursor/skills-cursor/` (Cursor-internal).

For manual-only loading (never auto), add `disable-model-invocation: true` to the frontmatter above.

## Further reading

- [reference.md](reference.md) — Index of official doc chapters
- [repo-conventions.md](repo-conventions.md) — Projects table, shelf `gallery`, RTL, assets
