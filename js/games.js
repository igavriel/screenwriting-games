/**
 * Game catalog for the store shelf hub.
 *
 * Add one object per visual novel. Paths in `href` and `cover` are relative to
 * the site root (the folder that contains index.html).
 *
 * cover — Optional image URL (e.g. assets/covers/my-game.webp). Omit the
 *         property, or use an empty string, to use the built-in gradient cover.
 * accent — Optional highlight color (#hex) for the box; otherwise a default is used.
 */
window.GAME_CATALOG = [
  {
    title: 'Task 1',
    href: 'Twine/Task1.html',
    cover: '',
    accent: '#5a7a96',
  },
];
