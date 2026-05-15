# The Ugly Duckling and the Fairy-Tale Mess

A short, funny, quest-style interactive story written in **Ink**, inspired by mixed fairy tales and parody fantasy humor.

The player controls an ugly duckling who is invited to the **Royal Bird Ball**, but there is one problem: according to the royal pigeon, he is not yet “fairy-tale appropriate.”

To enter the ball, the duckling may visit fairy-tale characters and collect magical makeover items. Each visit costs time. The player can go to the palace early, keep searching, return to the swamp, or risk missing the ball entirely.

## Inspirations

This story is loosely inspired by classic fairy-tale motifs:

- [The Ugly Duckling](https://en.wikipedia.org/wiki/The_Ugly_Duckling)
- [The Little Mermaid](https://en.wikipedia.org/wiki/The_Little_Mermaid)
- [Snow White](https://en.wikipedia.org/wiki/Snow_White)
- [The Princess and the Pea](https://en.wikipedia.org/wiki/The_Princess_and_the_Pea)

The tone is intended to be humorous, playful, and slightly absurd, similar to fairy-tale parody films such as *Shrek*, while using original characters and situations.

## Core Game Mechanic

The story combines branching narrative with a light procedural structure:

1. The player can visit up to three fairy-tale locations.
2. Each visit increases `visits` and `item_count`.
3. Visiting one or two locations keeps the player in time for the ball.
4. Visiting all three locations causes the player to miss the ball.
5. Each route gives the player a choice:
   - A polite approach with a luck check.
   - A rude approach that always gets the item but creates a comic consequence.
6. Endings react to both the chosen item and the way it was obtained.

## Variables

| Variable | Purpose |
|---|---|
| `visits` | Counts how many fairy-tale locations the player has visited. |
| `item_count` | Counts how many makeover items the player collected. |
| `has_hairbrush` | Tracks whether the player collected the Little Mermaid’s magical hairbrush. |
| `has_shoe` | Tracks whether the player collected Snow White’s shiny shoe. |
| `has_pea` | Tracks whether the player collected the legendary pea. |
| `mermaid_angry` | Tracks whether the Little Mermaid is angry because the player took the hairbrush rudely. |
| `dwarfs_angry` | Tracks whether the dwarfs are angry because the player blamed them. |
| `queen_suspicious` | Tracks whether the Queen suspects the player ate the royal pea. |
| `luck_roll` | Stores the result of a random luck check from 1 to 6. |

## Diagram Color Legend

| Color | Meaning |
|---|---|
| Blue | Sub-diagram module or route structure. |
| Green | Good or polite outcome. |
| Red | Bad, rude, chaotic, or not-so-good outcome. |

---

# Story Flow Diagram

```mermaid
flowchart TD
    A["START<br/>Variables initialized:<br/>visits = 0<br/>item_count = 0<br/>has_hairbrush = false<br/>has_shoe = false<br/>has_pea = false<br/>mermaid_angry = false<br/>dwarfs_angry = false<br/>queen_suspicious = false<br/>luck_roll = 0"] --> B["Opening<br/>The muddy duckling receives a royal invitation"]

    B --> C["Inciting Incident<br/>Royal pigeon says:<br/>You are invited, but not fairy-tale appropriate"]

    C --> D{"Initial Choice<br/>Accept the makeover quest?"}

    D -->|No| END1["END1<br/>Swamp King Ending<br/>No items collected"]
    D -->|Yes| X["Fairy-Tale Crossroads"]

    X --> V{"Current State Check<br/>How many visits?"}

    V -->|visits = 0| X0["First Visit Available"]
    V -->|visits = 1| X1["One Item Collected<br/>Palace, another visit, or swamp"]
    V -->|visits = 2| X2["Two Items Collected<br/>Palace, risky third visit, or swamp"]
    V -->|visits >= 3| END2["END2<br/>Missed-the-Ball Ending<br/>Too late to be fabulous"]

    X0 --> DEST{"Choose Destination"}
    X1 --> CH1{"After One Visit<br/>What now?"}
    X2 --> CH2{"After Two Visits<br/>What now?"}

    CH1 -->|Go to palace| P["Palace Check"]
    CH1 -->|Visit another destination| DEST
    CH1 -->|Return to swamp| END3["END3<br/>Swamp Party Ending<br/>Uses collected item"]

    CH2 -->|Go to palace| P
    CH2 -->|Try third visit| DEST
    CH2 -->|Return to swamp| END4["END4<br/>Swamp Party Ending<br/>Uses two collected items"]

    DEST -->|Little Mermaid<br/>if has_hairbrush = false| LM_IN
    DEST -->|Snow White<br/>if has_shoe = false| SW_IN
    DEST -->|Princess and the Pea<br/>if has_pea = false| PP_IN

    subgraph LM_SUB["SUB-DIAGRAM MODULE<br/>Little Mermaid Route"]
        direction TB
        LM_IN["Entry"] --> LM_OUT["Output:<br/>has_hairbrush = true<br/>optional mermaid_angry = true"]
    end

    subgraph SW_SUB["SUB-DIAGRAM MODULE<br/>Snow White Route"]
        direction TB
        SW_IN["Entry"] --> SW_OUT["Output:<br/>has_shoe = true<br/>optional dwarfs_angry = true"]
    end

    subgraph PP_SUB["SUB-DIAGRAM MODULE<br/>Princess and the Pea Route"]
        direction TB
        PP_IN["Entry"] --> PP_OUT["Output:<br/>has_pea = true<br/>optional queen_suspicious = true"]
    end

    LM_OUT --> AV["After Visit<br/>visits += 1<br/>item_count += 1"]
    SW_OUT --> AV
    PP_OUT --> AV

    AV --> V

    P --> PC{"item_count?"}
    PC -->|item_count = 1| ONE["Single Item Makeover<br/>No big dilemma<br/>Comic regret about paths not taken"]
    PC -->|item_count = 2| TWO["Two Item Makeover<br/>Hard identity dilemma<br/>Choose which item represents you"]
    PC -->|item_count = 0| END1

    ONE --> O1{"Which item do you have?"}
    O1 -->|has_hairbrush| END5["END5<br/>Swan Ending<br/>Single-item version"]
    O1 -->|has_shoe| END6["END6<br/>Shoe-Hat Ending<br/>Single-item version"]
    O1 -->|has_pea| END7["END7<br/>Judgmental Goose Ending<br/>Single-item version"]

    TWO --> T2{"Choose final item"}
    T2 -->|Use hairbrush<br/>if has_hairbrush| END8["END8<br/>Swan Ending<br/>Chosen from two items"]
    T2 -->|Use shoe<br/>if has_shoe| END9["END9<br/>Shoe-Hat Ending<br/>Chosen from two items"]
    T2 -->|Use pea<br/>if has_pea| END10["END10<br/>Judgmental Goose Ending<br/>Chosen from two items"]
    T2 -->|Panic and return to swamp| END4

    classDef goodEnding fill:#d4f8d4,stroke:#2e8b57,stroke-width:2px,color:#000;
    classDef badEnding fill:#ffd6d6,stroke:#b22222,stroke-width:2px,color:#000;
    classDef subModule fill:#d8ecff,stroke:#1f77b4,stroke-width:3px,color:#000;
    classDef subNode fill:#eef7ff,stroke:#1f77b4,stroke-width:2px,color:#000;

    class END1,END3,END4,END5,END6,END7,END8,END9,END10 goodEnding;
    class END2 badEnding;

    class LM_SUB,SW_SUB,PP_SUB subModule;
    class LM_IN,LM_OUT,SW_IN,SW_OUT,PP_IN,PP_OUT subNode;
```

---

# Sub-Diagram 1 — Little Mermaid Route

The Little Mermaid route gives the player a chance to obtain the magical hairbrush. A polite approach depends on luck, while the rude approach always succeeds but makes the Mermaid angry.

```mermaid
flowchart TD
    subgraph LM_SUB["SUB-DIAGRAM MODULE<br/>Little Mermaid Route"]
        direction TB

        M["Entry<br/>Goal: get magical hairbrush"] --> MCHOICE{"How to get the hairbrush?"}

        MCHOICE -->|Polite approach<br/>Ask nicely or compliment| ML["Luck Check<br/>luck_roll = RANDOM 1 to 6"]
        MCHOICE -->|Rude approach<br/>Grab the brush immediately| MR["Rude Success<br/>has_hairbrush = true<br/>mermaid_angry = true"]

        ML -->|luck_roll >= 4| MS["Polite Success<br/>has_hairbrush = true<br/>mermaid_angry = false"]

        ML -->|luck_roll < 4| MF{"Polite Failure<br/>Compliment goes wrong<br/>What now?"}

        MF -->|Apologize<br/>Still get item politely| MS
        MF -->|Panic and grab brush| MR

        MS --> OUT["Return to Main Flow<br/>visits += 1<br/>item_count += 1"]
        MR --> OUT
    end

    classDef subModule fill:#d8ecff,stroke:#1f77b4,stroke-width:3px,color:#000;
    classDef subNode fill:#eef7ff,stroke:#1f77b4,stroke-width:2px,color:#000;
    classDef goodPath fill:#d4f8d4,stroke:#2e8b57,stroke-width:2px,color:#000;
    classDef badPath fill:#ffd6d6,stroke:#b22222,stroke-width:2px,color:#000;

    class LM_SUB subModule;
    class M,MCHOICE,ML,OUT subNode;
    class MS goodPath;
    class MF,MR badPath;
```

---

# Sub-Diagram 2 — Snow White Route

The Snow White route gives the player a chance to obtain the shiny shoe. A polite approach means helping with the cottage, while the rude approach blames the dwarfs and creates trouble.

```mermaid
flowchart TD
    subgraph SW_SUB["SUB-DIAGRAM MODULE<br/>Snow White Route"]
        direction TB

        S["Entry<br/>Goal: get shiny shoe"] --> SCHOICE{"How to get the shoe?"}

        SCHOICE -->|Polite approach<br/>Help clean cottage| SL["Luck Check<br/>luck_roll = RANDOM 1 to 6"]
        SCHOICE -->|Rude approach<br/>Blame the dwarfs immediately| SR["Rude Success<br/>has_shoe = true<br/>dwarfs_angry = true"]

        SL -->|luck_roll >= 4| SS["Polite Success<br/>has_shoe = true<br/>dwarfs_angry = false"]

        SL -->|luck_roll < 4| SF{"Polite Failure<br/>Cleaning goes wrong<br/>What now?"}

        SF -->|Admit failure<br/>Ask honestly| SS
        SF -->|Blame dwarfs and run| SR

        SS --> OUT["Return to Main Flow<br/>visits += 1<br/>item_count += 1"]
        SR --> OUT
    end

    classDef subModule fill:#d8ecff,stroke:#1f77b4,stroke-width:3px,color:#000;
    classDef subNode fill:#eef7ff,stroke:#1f77b4,stroke-width:2px,color:#000;
    classDef goodPath fill:#d4f8d4,stroke:#2e8b57,stroke-width:2px,color:#000;
    classDef badPath fill:#ffd6d6,stroke:#b22222,stroke-width:2px,color:#000;

    class SW_SUB subModule;
    class S,SCHOICE,SL,OUT subNode;
    class SS goodPath;
    class SF,SR badPath;
```

---

# Sub-Diagram 3 — Princess and the Pea Route

The Princess and the Pea route gives the player a chance to obtain the legendary pea. A polite approach depends on explaining the request respectfully, while the rude approach involves eating the royal soup and swallowing the pea.

```mermaid
flowchart TD
    subgraph PP_SUB["SUB-DIAGRAM MODULE<br/>Princess and the Pea Route"]
        direction TB

        PR["Entry<br/>Goal: get legendary pea"] --> PRCHOICE{"How to get the pea?"}

        PRCHOICE -->|Polite approach<br/>Ask respectfully| PRL["Luck Check<br/>luck_roll = RANDOM 1 to 6"]
        PRCHOICE -->|Rude approach<br/>Eat royal soup immediately| PRR["Rude Success<br/>has_pea = true<br/>queen_suspicious = true"]

        PRL -->|luck_roll >= 4| PRS["Polite Success<br/>has_pea = true<br/>queen_suspicious = false"]

        PRL -->|luck_roll < 4| PRF{"Polite Failure<br/>Explanation offends princess<br/>What now?"}

        PRF -->|Apologize<br/>Ask again| PRS
        PRF -->|Pretend to eat soup<br/>Swallow pea| PRR

        PRS --> OUT["Return to Main Flow<br/>visits += 1<br/>item_count += 1"]
        PRR --> OUT
    end

    classDef subModule fill:#d8ecff,stroke:#1f77b4,stroke-width:3px,color:#000;
    classDef subNode fill:#eef7ff,stroke:#1f77b4,stroke-width:2px,color:#000;
    classDef goodPath fill:#d4f8d4,stroke:#2e8b57,stroke-width:2px,color:#000;
    classDef badPath fill:#ffd6d6,stroke:#b22222,stroke-width:2px,color:#000;

    class PP_SUB subModule;
    class PR,PRCHOICE,PRL,OUT subNode;
    class PRS goodPath;
    class PRF,PRR badPath;
```

---

# Ending Summary

| Ending | Trigger | Tone |
|---|---|---|
| END1 — Swamp King Ending | Refuse the quest immediately or arrive with no items. | Good / self-acceptance |
| END2 — Missed-the-Ball Ending | Visit all three locations before going to the palace. | Not-so-good / comic failure |
| END3 — Swamp Party Ending | Return to the swamp after one item. | Good / comic alternative |
| END4 — Swamp Party Ending | Return to the swamp after two items, or panic in the makeover room. | Good / comic alternative |
| END5 — Swan Ending | Use the hairbrush after collecting only one item. | Good |
| END6 — Shoe-Hat Ending | Use the shoe after collecting only one item. | Good |
| END7 — Judgmental Goose Ending | Use the pea after collecting only one item. | Good |
| END8 — Swan Ending | Choose the hairbrush after collecting two items. | Good / stronger dilemma payoff |
| END9 — Shoe-Hat Ending | Choose the shoe after collecting two items. | Good / stronger dilemma payoff |
| END10 — Judgmental Goose Ending | Choose the pea after collecting two items. | Good / stronger dilemma payoff |

## Design Note

The main dramatic question of the story is:

> Will the ugly duckling become “fairy-tale appropriate” according to royal standards, or will he define his own kind of fabulous?

The endings should keep the comedy light and playful. Even the “bad” ending is not tragic; it is a funny consequence of trying to complete too many side quests before the main event.
