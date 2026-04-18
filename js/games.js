/**
 * Game catalog for the store shelf hub.
 *
 * Paths in `href` and `cover` are relative to the site root (index.html folder).
 *
 * cover — Optional image URL (e.g. assets/covers/my-game.webp). Empty string = gradient.
 * accent — Optional #hex tint for the cover and accents.
 * summary — Short story / premise blurb (plain text).
 * technology — Tooling (e.g. "Twine 2", "HTML").
 * date — Release or version date (any string).
 * sources — Optional [{ label, href }]. Use full URLs for external sites; relative paths work for repo files.
 */
window.GAME_CATALOG = [
  {
    title: 'Task 1',
    href: 'Twine/Task1.html',
    cover: '',
    accent: '#8b6239',
    summary:
      'A compact branching exercise: follow prompts, note how choices reshape the scene, and return to the hub when you are done.',
    technology: 'Twine 2 (exported HTML)',
    date: '2026',
    sources: [
      { label: 'Twine', href: 'https://twinery.org/' },
    ],
  },
  {
    title: 'Task 2',
    href: 'Twine/Task1.html',
    cover: '',
    accent: '#5a6e8b',
    summary:
      'Placeholder entry for a second story slot — swap the href and copy when the build is ready.',
    technology: 'Twine 2 (exported HTML)',
    date: '—',
    sources: [],
  },
];
