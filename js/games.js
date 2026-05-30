/**
 * Game catalog for the store shelf hub.
 *
 * Paths in `href` and `cover` are relative to the site root (index.html folder).
 *
 * titleEn — English heading on the left side of the card.
 * titleHe — Optional Hebrew name on the book cover; falls back to `titleEn` if omitted.
 *
 * cover — Optional image URL (e.g. assets/covers/my-game.webp). Empty string = gradient.
 * accent — Optional #hex tint for the cover and accents.
 * summaryEn — English synopsis (plain text).
 * summaryHe — Optional Hebrew synopsis (below English block, LTR).
 * language — Language(s) of the playable build or text (e.g. "English", "Hebrew", "English, Hebrew").
 * technology — Tooling (e.g. "Twine 2", "HTML").
 * date — Release or version date (any string).
 * externalLinks — Optional [{ label, href }] off-site URLs (https://).
 * versions — Optional [{ label, href }] older playable or source builds in the repo.
 * gallery — Optional [{ label, src }] illustration grid for utils/gallery.html; `src` is required (same path rules as cover). `label` is optional caption. Omit gallery or empty = no gallery button on the shelf.
 */
window.GAME_CATALOG = [
  {
    titleEn: 'Not in the brief',
    titleHe: 'זה לא היה בתדריך',
    href: 'Twine/Task-3-Not in the brief [Hebrew].html',
    cover: './Twine/assets/task-1-cover.png',
    accent: '#8b6239',
    summaryEn:
      'A routine survey mission. An unmapped star. An unidentified signal. Everything documented. Everything analyzed. Everything supposed to be under control.',
    summaryHe:
      'משימת חקר שגרתית. כוכב לא ממופה. אות לא מזוהה. הכול תועד. הכול נותח. הכול אמור להיות תחת שליטה.',
    language: 'Hebrew, English (the first draft)',
    technology: 'Twine 2 (Chapbook format)',
    date: '04/2026',
    externalLinks: [
      { label: 'Twine', href: 'https://twinery.org/' },
      { label: 'Chapbook', href: 'https://klembot.github.io/chapbook/guide/' },
    ],
    versions: [
      { label: 'V1 First Version (English)', href: 'Twine/Task-1-Planetfall Protocol [English].html' },
      { label: 'V2 Second Version (Hebrew)', href: 'Twine/Task-2-Not in the brief [Hebrew].html' },
      { label: 'V1 Twine format', href: 'Twine/Task-1-Planetfall Protocol [English].twee' },
      { label: 'V2 Twine format', href: 'Twine/Task-2-Not in the brief [Hebrew].twee' },
      { label: 'V3 Twine format', href: 'Twine/Task-3-Not in the brief [Hebrew].twee' },
    ],
    gallery: [
      { label: 'Cover', src: './Twine/assets/task-1-cover.png' },
      { label: 'The crew', src: './Twine/assets/task-1-crew.png' },
      { label: 'The dilemma', src: './Twine/assets/task-1-dilema.png' },
      { label: 'Cave — lose', src: './Twine/assets/task-1-cave-lose.png' },
      { label: 'Cave — win', src: './Twine/assets/task-1-cave-win.jpeg' },
      { label: 'Village — win', src: './Twine/assets/task-1-villege-win.jpeg' },
    ],
  },
  {
    titleEn: 'The Ugly Duckling and the Fairy-Tale Mess',
    titleHe: 'הברווזון המכוער ובלגן האגדות',
    href: 'Ink/royal-makeover-v2/web/index.html',
    cover: './Ink/assets/Ugly_duckling_in_fairy_tale-cover.jpeg',
    accent: '#8b6239',
    summaryEn:
      'You are a small, muddy duckling with big dreams and questionable hygiene. One morning, you are invited to a royal ball only to discover you are not "fairy-tale appropriate".',
    summaryHe:
      'אתה ברווזון קטן, קצת אפור, קצת בוצי, וקצת נראה כאילו מישהו התחיל לצייר ברווז ואז נזכר שיש לו דברים חשובים אחרים לעשות. יום אחד, אתה מוזמן לבועת מלכותית רק לגלות שאתה לא "מתאים לאגדה".',
    language: 'Hebrew, English (the first draft)',
    technology: 'Ink',
    date: '05/2026',
    externalLinks: [
      { label: 'Ink', href: 'https://www.inklestudios.com/ink/' },
      { label: 'Basics tutorial', href: 'https://www.inklestudios.com/ink/web-tutorial/' },
      { label: 'Full tutorial', href: 'https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md' },
    ],
    versions: [
      { label: 'V1 Web version (English)', href: 'Ink/royal-makeover-v1/web/index.html' },
      { label: 'V1 Ink format (English)', href: 'Ink/royal-makeover-v1/royal-makeover.ink' },
      { label: 'V1 Flow Chart', href: 'Ink/royal-makeover-v1/README.md' },
      { label: 'V2 Ink format (Hebrew)', href: 'Ink/royal-makeover-v2/ugly_duckling_fairy_tale_mess.ink' },
      { label: 'V2 Flow Chart', href: 'Ink/royal-makeover-v2/README.md' },
    ],
    gallery: [
      { label: 'Ugly Duckling fairytale — Second version cover', src: './Ink/assets/Ugly_duckling_in_fairy_tale-cover.jpeg' },
      { label: 'Royal makeover — First version cover', src: './Ink/assets/royal-makeover-cover.jpeg' },
      { label: 'Ugly Duckling — character sheet', src: './Ink/assets/Charactersheet-Ugly-duckling.jpeg' },
      { label: 'Snow White — character sheet', src: './Ink/assets/Charactersheet-snow-white.jpeg' },
      { label: 'Little Mermaid — character sheet', src: './Ink/assets/Charactersheet-little-mermaid.jpeg' },
      { label: 'Dramatic princess — character sheet', src: './Ink/assets/Charactersheet-dramatic-princess.jpeg' },
      { label: 'Elegant flamingo — character sheet', src: './Ink/assets/Charactersheet-elegant-flamingo.jpeg' },
      { label: 'Fairy-tale crossroads', src: './Ink/assets/fairy-tale-crossroads.jpeg' },
      { label: 'Little Mermaid — hairbrush', src: './Ink/assets/little-mermaid-hairbrush.jpeg' },
      { label: 'Snow White — shoe', src: './Ink/assets/snow-white-shoe.jpeg' },
      { label: 'Dramatic princess & the pea', src: './Ink/assets/dramatic-princess-pea.jpeg' },
      { label: 'Ballroom entrance — closed', src: './Ink/assets/ballroom-entrance-closed.jpeg' },
      { label: 'Elegant flamingo stylist', src: './Ink/assets/elegant-flamingo-stylist.jpeg' },
      { label: 'Swamp party', src: './Ink/assets/swamp-party.jpeg' },
    ],
  },
  {
    titleEn: 'The Game That Refused to End',
    titleHe: 'המשחק שלא רוצה להסתיים',
    href: 'https://igavriel.itch.io/the-game-that-refused-to-end',
    cover: './renpy/the_game_that_refused_to_end/game/images/bg_vn_room_normal.jpeg',
    accent: '#8b6239',
    summaryEn:
      'A game that refuses to end. A game that keeps going. A game that won\'t stop.',
    summaryHe:
      'משחק שלא רוצה להסתיים. משחק שממשיך. משחק שלא מסתיים.',
    language: 'Hebrew',
    technology: 'Renpy',
    date: '06/2026',
    externalLinks: [
      { label: 'Renpy', href: 'https://www.renpy.org/' },
      {  label: 'Documentation', href: 'https://www.renpy.org/doc/html/index.html' },
    ],
    versions: [
      { label: 'V1 Web version (Hebrew)', href: 'https://igavriel.itch.io/the-game-that-refused-to-end' },
    ],
    gallery: [
      { label: 'Blank Dark Screen background', src: './renpy/the_game_that_refused_to_end/game/images/bg_blank_dark_screen.jpeg' },
      { label: 'Fake Epic Storm Castle background', src: './renpy/the_game_that_refused_to_end/game/images/bg_fake_epic_storm_castle.jpeg' },
      { label: 'Project Folder Memory background', src: './renpy/the_game_that_refused_to_end/game/images/bg_project_folder_memory.jpeg' },
      { label: 'Room Normal background', src: './renpy/the_game_that_refused_to_end/game/images/bg_vn_room_normal.jpeg' },
      { label: 'Room Glitch background', src: './renpy/the_game_that_refused_to_end/game/images/bg_vn_room_glitch.jpeg' },
      { label: 'Anxious Fake OK', src: './renpy/the_game_that_refused_to_end/game/images/character anxious_fake_ok.png' },
      { label: 'Blank Screen Honest', src: './renpy/the_game_that_refused_to_end/game/images/character blank_screen_honest.png' },
      { label: 'Default Fake Smile', src: './renpy/the_game_that_refused_to_end/game/images/character default_fake_smile.png' },
      { label: 'Fake Dramatic Heroine', src: './renpy/the_game_that_refused_to_end/game/images/character fake_dramatic_heroine.png' },
      { label: 'Final Real', src: './renpy/the_game_that_refused_to_end/game/images/character final_real.png' },
      { label: 'Sarcastic Really', src: './renpy/the_game_that_refused_to_end/game/images/character sarcastic_really.png' },
      { label: 'Stop Narrator', src: './renpy/the_game_that_refused_to_end/game/images/character stop_narrator.png' },
      { label: 'Vulnerable Honest', src: './renpy/the_game_that_refused_to_end/game/images/character vulnerable_honest.png' },
      { label: 'With Shadow Truth', src: './renpy/the_game_that_refused_to_end/game/images/character with_shadow_truth.png' },
    ],
  },
];
