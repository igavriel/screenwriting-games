VAR item = "none"
VAR mermaid_angry = false
VAR dwarfs_angry = false
VAR queen_suspicious = false

-> start

=== start ===

You are a small, muddy duckling with big dreams and questionable hygiene.

One morning, a royal messenger pigeon lands beside the pond.

"Congratulations!" he says. "You have been invited to the Royal Bird Ball."

You puff up proudly.

Then he adds, "But there is one tiny problem. You are not currently... fairy-tale appropriate."

The other ducks gasp.

One whispers, "That means ugly."

The pigeon coughs politely. "The palace recommends an emergency makeover."

* "Fine. I shall become fabulous." -> quest_start
* "I was already fabulous, but continue." -> quest_start
* "Can I just stay muddy?" -> refuse_early


=== refuse_early ===

You look at the royal invitation.

You look at the mud.

The mud has never judged you.

Still... the ball has cake.

You sigh dramatically and begin your quest.

-> quest_start


=== quest_start ===

To enter the Royal Bird Ball, you need one magical makeover item.

The Royal Stylist has given you three options:

- The Little Mermaid's magical hairbrush.
- Snow White's suspiciously shiny shoe.
- The Princess's legendary pea.

Unfortunately, all of them belong to people who are very annoying about it.

Where do you go?

+ [Visit the Little Mermaid] -> mermaid_route
+ [Visit Snow White] -> snow_white_route
+ [Visit the Princess] -> princess_route
+ [Forget the makeover and return to the pond] -> swamp_king_ending


=== mermaid_route ===

You waddle to the edge of the sea.

The Little Mermaid sits on a rock, brushing her hair and looking extremely dramatic.

You point at the golden brush.

"Can I borrow that?"

She narrows her eyes.

"This brush survived saltwater, sea witches, and one prince with terrible communication skills. Why should I give it to you?"

* [Compliment her hair]
    "Your hair looks like a sunset had a baby with a shampoo commercial."

    The mermaid pauses.

    "That is the most ridiculous compliment I have ever received."

    She hands you the brush.

    ~ item = "hairbrush"

    -> makeover_room

* [Steal the brush]
    You grab the brush and run.

    Unfortunately, running as a duckling is mostly fast waddling.

    "Thief!" the mermaid shouts. "I hope your feathers frizz!"

    ~ item = "hairbrush"
    ~ mermaid_angry = true

    -> makeover_room


=== snow_white_route ===

You waddle into a cheerful forest cottage.

Inside, Snow White is surrounded by seven tiny chairs, seven tiny beds, and seven tiny unpaid cleaning complaints.

She is polishing a single shiny shoe.

"I need that shoe," you say.

Snow White blinks.

"This shoe survived poison apples, dramatic singing, and seven men who cannot wash dishes. Why should I give it to you?"

* [Offer to help clean the cottage]
    You grab a tiny broom.

    Unfortunately, you are a duckling, so mostly you spread dust in new directions.

    Snow White watches for a moment.

    "Honestly, that is still better than the dwarfs."

    She gives you the shiny shoe.

    ~ item = "shoe"

    -> makeover_room

* [Blame the dwarfs and take the shoe]
    You point dramatically toward the mine.

    "The dwarfs said this shoe clashes with the curtains."

    Snow White gasps.

    "Those tiny fashion criminals!"

    While she storms outside, you take the shoe.

    Somewhere in the distance, seven angry voices shout at once.

    ~ item = "shoe"
    ~ dwarfs_angry = true

    -> makeover_room


=== princess_route ===

You sneak into the royal bedroom.

The Princess is lying on top of twenty mattresses, complaining loudly.

"There is something under my bed!" she says. "Something round! Something cruel! Something emotionally unsupportive!"

You peek under the bottom mattress.

There it is.

The legendary pea.

* [Ask politely]
    "Excuse me," you say. "May I borrow your painful vegetable?"

    The Princess sits up.

    "Finally. Someone understands the seriousness of furniture-based suffering."

    She gives you the pea.

    ~ item = "pea"

    -> makeover_room

* [Eat the royal soup]
    You panic and pretend to be a normal palace guest.

    Unfortunately, the soup contains the pea.

    You swallow it.

    The Queen watches you carefully.

    "That duckling just ate a national treasure."

    ~ item = "pea"
    ~ queen_suspicious = true

    -> makeover_room


=== makeover_room ===

You arrive at the Royal Makeover Room.

The Royal Stylist is a flamingo wearing tiny glasses.

"Darling," she says, "you are damp, uneven, and emotionally under-plucked."

You place your item on the table.

{item == "hairbrush":
    The flamingo lifts the mermaid's hairbrush.

    "Ah. Ocean glamour. Risky. Moist. Iconic."
}

{item == "shoe":
    The flamingo lifts Snow White's shiny shoe.

    "Forest princess glamour. Slightly stolen. Very cottage-core."
}

{item == "pea":
    The flamingo lifts the pea.

    "Interesting. Usually I do not style clients with vegetables."
}

"What final look are we going for?"

* {item == "hairbrush"} [Use the magical hairbrush] -> swan_ending
* {item == "shoe"} [Use Snow White's shiny shoe] -> shoe_ending
* {item == "pea"} [Use the legendary pea] -> goose_ending
* [Refuse the makeover at the last second] -> swamp_king_ending


=== swan_ending ===

The stylist brushes your feathers once.

A magical wind fills the room.

Your muddy feathers become smooth, white, and sparkling.

Everyone gasps.

"You are a swan!" cries the royal pigeon.

You look in the mirror.

You are beautiful.

You are elegant.

You are also still very interested in pond snacks.

{mermaid_angry:
    Outside, the Little Mermaid shouts, "That better not be my brush!"
}

At the Royal Bird Ball, everyone bows.

You whisper, "Do swans eat cake?"

The answer is yes.

-> END


=== shoe_ending ===

The stylist places Snow White's shiny shoe on your head.

Everyone goes silent.

The flamingo adjusts her glasses.

"Darling... it is not a hat."

You look in the mirror.

It is absolutely a hat.

A magical sparkle bursts from the shoe. Suddenly, you look like the newest trend in royal forest fashion.

{dwarfs_angry:
    Outside, seven dwarfs arrive carrying tiny pickaxes.

    "That duck stole our princess's shoe!"

    You honk confidently.

    The crowd assumes this is part of the performance.
}

At the Royal Bird Ball, every bird wants a shoe-hat.

By midnight, the kingdom declares you the founder of Footwear Fashion.

You still cannot dance, but nobody notices because your head is too shiny.

-> END


=== goose_ending ===

The stylist holds up the pea.

"Well," she says, "fashion is about risk."

The pea glows.

You glow.

Your neck stretches.

Your beak sharpens.

Your opinions become much louder.

You have transformed into a judgmental goose.

At the Royal Bird Ball, you walk between the guests.

"Bad hat."

"Too many feathers."

"That cape is trying too hard."

{queen_suspicious:
    The Queen points at you. "That is the duckling who ate the royal pea!"

    You honk with authority.

    Nobody argues.
}

By midnight, everyone fears you.

By morning, everyone asks for your fashion advice.

-> END


=== swamp_king_ending ===

You look at the palace.

You look at your muddy feathers.

Then you look back at the pond.

"Actually," you say, "I am not ugly. I am swamp deluxe."

You return home and throw your own party.

The frogs provide music.

The ducks bring snacks.

A confused royal pigeon arrives and says, "The palace ball is starting."

You point to the mud party.

"This is the ball now."

By sunset, half the kingdom has joined you.

You are crowned King of the Swamp Birds.

Your first law: cake for everyone.

-> END
