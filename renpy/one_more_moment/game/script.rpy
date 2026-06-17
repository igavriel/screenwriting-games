# One More Moment...
# רק עוד רגע...

###########################################################
transform fullscreen_bg:
    xysize (1920, 1080)
    fit "cover"
    xalign 0.5
    yalign 0.5

image bg_cover = Transform(
    "images/cover.jpeg",
    fit="contain",
    xalign=0.5,
    yalign=0.5,
    xysize=(1920, 1080),
)
image bg_vn_room_normal = At("images/bg_vn_room_normal.jpeg", fullscreen_bg)
image bg_vn_room_glitch = At("images/bg_vn_room_glitch.jpeg", fullscreen_bg)
image bg_fake_epic_storm_castle = At("images/bg_fake_epic_storm_castle.jpeg", fullscreen_bg)
image bg_blank_dark_screen = At("images/bg_blank_dark_screen.jpeg", fullscreen_bg)
image bg_project_folder_memory = At("images/bg_project_folder_memory.jpeg", fullscreen_bg)


###########################################################
transform character_large:
    xalign 0.5
    yalign 1.0
    zoom 1.2

default lives = 10

###########################################################
screen lives_hud():
    frame:
        xalign 0.98
        yalign 0.03
        padding (20, 10)
        background "#0008"
        text "רגעים: [lives]":
            size 36
            color "#ffffff"

###########################################################
define script = Character(
    None,
    what_color="#6F5A45",
    what_prefix="\"",
    what_suffix="\""
)

define narrator = Character(
    "המספר",
    who_color="#5E6572",
    what_color="#5E6572",
    what_italic=True
)

define girl = Character(
    "מיקה",
    who_color="#8A7F55",
    what_color="#4F4428"
)

###########################################################
label start:

    scene bg_vn_room_normal
    with fade

    show character default_fake_smile at character_large
    with dissolve

    script "הבוקר הפציע, השמש במרום הרקיעה...."

    window hide
    show character stop_narrator at character_large

    pause 0.5
    girl "{b}{size=+20}רגע. עצור!{/size}{/b}"

    show screen lives_hud
    with dissolve

    girl "אל תתחיל מזה שאני עומדת בחדר."

    narrator "למה לא?"

    girl "כי זה הדבר המובן מאליו."

    narrator "אוקי. אז ממה להתחיל?"

    girl "ממשהו שלא רואים מיד."

    script "היא זכרה את כל הפעמים שבהן ההרפתקאה התחילה."

    show character default_fake_smile at character_large

    girl "כן. ככה."

    script "היא חייכה כאילו הכול בסדר."

    $ lives -= 1

    show character sarcastic_really at character_large
    with dissolve

    girl "{b}{size=+5}מה חייכה? מי חייך בכלל?{/size}{/b}"

    girl "ועכשיו גם איבדתי רגע יקר בגללך."

    narrator "רגע?"

    girl "כן ׳רגע׳. אין לי אינסוף כאלה."

    pause 0.5
    hide screen lives_hud

    girl "אפשר להמשיך?"

    girl "ובבקשה בלי תיאורים דרמטיים ומוגזמים."

    scene bg_vn_room_glitch
    with fade

    narrator "אופס, מה קרה פה פתאום?"

    pause 0.5
    show character with_shadow_truth at character_large
    with dissolve

    girl "לא השתנה כלום."

    narrator "מיקה?"

    girl "אנ## אני בס#@! בסדר גמור. לגמרי בסדר."

    girl "זה פשוט גליץ׳, הכל טוב. לא משנה."

    menu:
        "הממממ, מה לעשות עכשיו?"

        "לעצור הכל ולהתחיל מחדש":
            jump early_end_attempt

        "לתת עוד רגע":
            jump give_more_scene

label early_end_attempt:

    show character anxious_fake_ok at character_large
    with dissolve

    girl "מה? עכשיו?"

    narrator "כן."

    girl "אבל עוד לא הגעתי לחלק שבו אני נראית מרשימה."

    narrator "אולי זה לא החלק החשוב."

    girl "קל לך להגיד. אתה לא זה שכולם רואים לפני שהם מכירים."

    jump fake_epic_scene


label give_more_scene:

    show character vulnerable_honest at character_large
    with dissolve

    girl "תודה."

    narrator "על מה?"

    girl "על זה שלא מיהרת לסגור את הדלת."

    script "היא אמרה את זה בחיוך קטן מדי בשביל להיות אמיתי."

    girl "אל תנתח אותי."

    narrator "בסדר, בסדר."

    girl "פשוט תישאר."

    jump fake_epic_scene


    label fake_epic_scene:

    scene bg_fake_epic_storm_castle
    with fade

    show character fake_dramatic_heroine at character_large
    with dissolve

    girl "הנה. עכשיו זה נראה נכון."

    narrator "נכון למי?"

    girl "לא יודעת. למי שמחפש פנטזיה, אקשן, מבט דרמטי? או משהו כזה."

    narrator "ומה את חושבת?"

    girl "אני נראית כמו מישהי שיש לה סיבה לעמוד כאן."

    narrator "הייתה לך סיבה גם קודם."

    girl "קודם הייתי רק בחורה פשוטה בחדר."

    girl "אבל ככה קל יותר להאמין לי."

    narrator "אני חושב שככה את מתחמקת מהשאלה האמיתית, מה באמת כואב לך?"

    pause 0.5

    show character anxious_fake_ok at character_large
    with dissolve

    girl "אתה לא אמור להגיע לשורה הזאת כל כך מהר."

    narrator "אז לאן את רוצה להגיע?"

    girl "למקום שבו אני לא צריכה להוכיח שאני שווה סצנה."

    jump honest_scene

    label honest_scene:

    scene bg_blank_dark_screen
    with fade

    show character vulnerable_honest at character_large
    with dissolve

    girl "אני לא צריכה טירה."

    narrator "לא?"

    girl "לא. וגם לא סערה."

    narrator "אז מה את צריכה?"

    girl "שלא ידלגו על הקטעים שלי כאילו אני לא חשובה."

    narrator "זה הכול?"

    girl "לא."

    pause 0.5

    girl "שמישהו יישאר עוד רגע גם כשאין משהו מרשים לראות."

    menu:
        "בחירה אחרונה"

        "לתת לרגע להיגמר":
            jump ending_quiet

        "לשמור אותה בזיכרון":
            jump ending_memory


    label ending_quiet:

    show character final_real at character_large
    with dissolve

    girl "בסדר."

    girl "אבל לא בבת אחת."

    hide character
    with dissolve

    script "החושך הגיע לאט. הפעם, לא כמו תקלה. כמו נשימה."

    return


label ending_memory:

    scene bg_project_folder_memory
    with fade

    script "אף אחד לא ביקש ממנה להיות גדולה יותר."

    script "ובכל זאת, משהו ממנה נשאר."

    return
