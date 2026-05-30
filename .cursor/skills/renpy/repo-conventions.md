# Ren'Py projects in screenwriting-games

## Directory layout

Each game is a standard Ren'Py project:

```
renpy/<project>/
├── game/
│   ├── script.rpy      # Story, characters, images, labels
│   ├── options.rpy     # config.name, build.name, config.rtl, audio flags
│   ├── screens.rpy     # Screen language UI
│   ├── gui.rpy         # GUI size/colors (template)
│   ├── gui/            # Button/frame assets
│   ├── images/         # Backgrounds and character art
│   └── tl/             # Translations (if used)
└── (optional) *-dists/ # Built web/desktop outputs—avoid editing for story work
```

Open **`renpy/<project>/`** in the Ren'Py Launcher (the folder that contains `game/`).

## Projects

| Folder | `build.name` (typical) | Notes |
| ------ | -------------------- | ----- |
| `renpy/one_more_moment/` | `one_more_moment` | Hebrew VN; `config.rtl = True`; primary shelf + gallery entry |

Always confirm `define build.name = "..."` in the target game’s `game/options.rpy` before assuming the folder name.

## Characters and images (`one_more_moment` pattern)

- **Nameless script voice**: `define script = Character(None, ...)` — dialogue with `script "..."`.
- **Named roles**: `define narrator = Character("המספר", ...)`, `define girl = Character("מיקה", ...)`.
- **Sprites**: Files under `game/images/` often use spaces, e.g. `character default_fake_smile.png`. In script:

  ```renpy
  show character default_fake_smile at character_large
  ```

  Ren'Py resolves file names from the image tag + attribute (spaces allowed in filenames).

- **Scaled backgrounds**: e.g. `image bg_vn_room_normal = im.Scale("images/bg_vn_room_normal.jpeg", 1920, 1080)`.

- **Custom transforms**: e.g. `transform character_large:` with `xalign`, `yalign`, `zoom`.

- **HUD screens**: e.g. `screen lives_hud()` shown with `show screen lives_hud`.

## RTL and Hebrew

`one_more_moment` sets:

```renpy
define config.rtl = True
```

Keep RTL when editing Hebrew dialogue or UI in projects that define it. Character `who` strings may be Hebrew; preserve encoding (UTF-8) in `.rpy` files.

## Web shelf and gallery

The static shelf reads [js/games.js](../../js/games.js). Ren'Py game **One More Moment...** is catalogued with:

- `href` — external itch.io URL (playable build), not a local `renpy/` path
- `cover` / `gallery[].src` — site-root-relative paths

### Gallery path rules

1. Prefix: `./renpy/` (lowercase, not `Renpy/`).
2. Include full path under the project: `game/images/<filename>`.
3. Match the real file under `renpy/<build.name>/game/images/`.
4. `gallery` entries: `{ label, src }` — `label` optional caption; `src` required.
5. Filenames with spaces are valid; [js/gallery.js](../../js/gallery.js) encodes path segments for URLs.

Example:

```javascript
{ label: 'Default Fake Smile', src: './renpy/one_more_moment/game/images/character default_fake_smile.png' }
```

Only add or change `js/games.js` when the task includes exposing new art on the shelf gallery.

## Git hygiene

Avoid staging unless the user asks:

- `game/saves/`
- `game/cache/`
- `*.rpyc`
- `log.txt`
- `renpy/*-dists/` and `*.zip` build artifacts

## Related site files (out of `renpy/`)

| File | Role |
| ---- | ---- |
| [js/games.js](../../js/games.js) | Catalog, optional `gallery` |
| [js/gallery.js](../../js/gallery.js) | Picture grid + lightbox (`?game=N`) |
| [utils/gallery.html](../../utils/gallery.html) | Gallery page shell |

Do not modify these when the task is Ren'Py script/GUI only.
