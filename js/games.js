/**
 * Game catalog for the store shelf hub.
 *
 * Paths in `href` and `cover` are relative to the site root (index.html folder).
 *
 * title — Heading on the left side of the card (catalog / syllabus style).
 * bookTitle — Text on the book cover art (usually the story’s title on the “spine” area).
 *   If omitted, the cover falls back to `title`.
 *
 * cover — Optional image URL (e.g. assets/covers/my-game.webp). Empty string = gradient.
 * accent — Optional #hex tint for the cover and accents.
 * summary — Short story / premise blurb (plain text).
 * language — Language(s) of the playable build or text (e.g. "English", "Hebrew", "English, Hebrew").
 * technology — Tooling (e.g. "Twine 2", "HTML").
 * date — Release or version date (any string).
 * sources — Optional [{ label, href }]. Use full URLs for external sites; relative paths work for repo files.
 */
window.GAME_CATALOG = [
  {
    title: 'זה לא היה בתדריך',
    bookTitle: 'Not in the brief',
    href: 'Twine/Task-3-Not in the brief [Hebrew].html',
    cover: './Twine/assets/task-1-cover.png',
    accent: '#8b6239',
    summary:
      'משימת חקר שגרתית. כוכב לא ממופה. אות לא מזוהה. הכול תועד. הכול נותח. הכול אמור להיות תחת שליטה.',
    language: 'Hebrew, English (the first draft)',
    technology: 'Twine 2 (Chapbook format)',
    date: '04/2026',
    sources: [
      { label: 'Twine', href: 'https://twinery.org/' },
      { label: 'Chapbook', href: 'https://klembot.github.io/chapbook/guide/' },
      { label: 'Task 1 First Version (English)', href: 'Twine/Task-1-Planetfall Protocol [English].html' },
      { label: 'Task 2 Second Version (Hebrew)', href: 'Twine/Task-2-Not in the brief [Hebrew].html' },
      { label: 'Task 1 Twine format', href: 'Twine/Task-1-Planetfall Protocol [English].twee' },
      { label: 'Task 2 Twine format', href: 'Twine/Task-2-Not in the brief [Hebrew].twee' },
      { label: 'Task 3 Twine format', href: 'Twine/Task-3-Not in the brief [Hebrew].twee' },

    ],
  },
  {
    title: 'The Ugly Duckling and the Royal Makeover',
    bookTitle: 'The Ugly Duckling and the Royal Makeover',
    href: 'Ink/royal-makeover/web/index.html',
    cover: './Ink/assets/royal-makeover-cover.jpeg',
    accent: '#8b6239',
    summary: 'You are a small, muddy duckling with big dreams and questionable hygiene. One morning, you are invited to a royal ball only to discover you are not "fairy-tale appropriate".',
    language: 'English',
    technology: 'Ink',
    date: '05/2026',
    sources: [
      { label: 'Ink', href: 'https://www.inklestudios.com/ink/' },
      { label: 'Basics tutorial', href: 'https://www.inklestudios.com/ink/web-tutorial/' },
      { label: 'Full tutorial', href: 'https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md' },
      { label: 'Story (Ink format)', href: 'Ink/royal-makeover/royal-makeover.ink' },
      { label: 'Story Flow Chart', href: 'Ink/royal-makeover/README.md' },
    ],
  },
];
