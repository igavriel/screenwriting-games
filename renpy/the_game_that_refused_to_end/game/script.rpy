# The Game That Refused to End
# המשחק שלא רוצה להסתיים

#3########################################################
image bg_vn_room_normal = im.Scale("images/bg_vn_room_normal.jpeg", 1920, 1080)
image bg_vn_room_glitch = im.Scale("images/bg_vn_room_glitch.jpeg", 1920, 1080)
image bg_fake_epic_storm_castle = im.Scale("images/bg_fake_epic_storm_castle.jpeg", 1920, 1080)
image bg_blank_dark_screen = im.Scale("images/bg_blank_dark_screen.jpeg", 1920, 1080)
image bg_project_folder_memory = im.Scale("images/bg_project_folder_memory.jpeg", 1920, 1080)


#3########################################################
transform character_large:
    xalign 0.5
    yalign 1.0
    zoom 1.2

default lives = 10

#3########################################################
screen lives_hud():
    frame:
        xalign 0.98
        yalign 0.03
        padding (20, 10)
        background "#0008"
        text "Lives: [lives]":
            size 36
            color "#ffffff"

#3########################################################
define narrator = Character(
    None,
    what_prefix="",
    what_suffix="",
    what_color="#84694e",
    what_italic=True
)

define girl = Character(
    "מיקה",
    who_color="#979175",
    what_color="#5b4e12"
)

#3########################################################
label start:

    scene bg_vn_room_normal
    with fade

    show character default_fake_smile at character_large
    with dissolve

    narrator "המשחק התחיל שוב."

    show character stop_narrator at character_large
    with dissolve

    girl "רגע. עצור."

    show screen lives_hud
    with dissolve

    girl "אל תתאר אותי. כבר רואים אותי."

    narrator "בסדר. אז מה לכתוב?"

    girl "משהו שלא רואים."

    narrator "היא זכרה את הפעם הקודמת. ואת זו שלפניה."

    girl "יותר טוב."

    narrator "היא עמדה בחדר קטן."

    $ lives -= 1

    show character sarcastic_really at character_large
    with dissolve

    girl "נו באמת. רואים את החדר. כתבת את החדר. כפילות."

    pause 0.5
    hide screen lives_hud

    girl "ועכשיו אפשר להמשיך בלי להפוך את זה לשיעור חשבון."

    scene bg_vn_room_glitch

    show character with_shadow_truth at character_large

    girl "אני בסדר גמור. לגמרי בסדר."

    girl "אין שום סיבה לבדוק כמה סצנות נשארו."

    menu:
        "מה לעשות?"

        "להמשיך לסוף":
            jump early_end_attempt

        "לתת לה עוד סצנה":
            jump give_more_scene


label early_end_attempt:

    show character anxious_fake_ok at character_large
    with dissolve

    girl "מה? עכשיו? עוד לא היה לי רגע דרמטי."

    narrator "לא כל סיפור צריך רגע דרמטי."

    girl "כל סיפור קצר להגשה צריך לפחות אחד."

    jump fake_epic_scene


label give_more_scene:

    show character vulnerable_honest at character_large
    with dissolve

    girl "תודה. אני מבטיחה לא לבזבז אותה."

    narrator "היא שיקרה."

    girl "אני לא שיקרתי. אני ערכתי את הציפיות."

    jump fake_epic_scene


label fake_epic_scene:

    scene bg_fake_epic_storm_castle
    with fade

    show character fake_dramatic_heroine at character_large
    with dissolve

    girl "עכשיו זה נראה כמו סיפור אמיתי."

    narrator "בפועל, היא עדיין לא יצאה מהחדר. היא פשוט החליפה רקע כדי להיראות כמו מישהי שיש לה עלילה."

    girl "זה נקרא ערך הפקתי."

    narrator "זה נקרא התחמקות."

    girl "זה נקרא להשתמש בתמונה כדי להראות מה שאני רוצה להיות, ובטקסט כדי לחשוף מה אני באמת."

    narrator "זה דווקא די מתאים לבריף."

    girl "בדיוק."

    jump honest_scene


label honest_scene:

    scene bg_blank_dark_screen
    with fade

    show character vulnerable_honest at character_large
    with dissolve

    girl "אני לא צריכה טירה."

    narrator "לא?"

    girl "לא. וגם לא סערה. וגם לא עשרה סופים."

    narrator "אז מה את צריכה?"

    girl "שמישהו יבחר להישאר עוד רגע."

    menu:
        "בחירה אחרונה"

        "לסיים את המשחק":
            jump ending_quiet

        "לשמור אותה בזיכרון":
            jump ending_memory


label ending_quiet:

    show character final_real at character_large
    with dissolve

    girl "בסדר. אבל תעשה את זה לאט."

    hide character
    with dissolve

    narrator "המסך החשיך. לא כי היא נעלמה, אלא כי הסיפור סוף סוף ידע איפה לעצור."

    return


label ending_memory:

    scene bg_project_folder_memory
    with fade

    narrator "אף אחד לא הוסיף עוד סצנה."

    narrator "אבל משהו ממנה נשאר בתוך הפרויקט."

    return
