# The Ugly Duckling and the Emergency Royal Makeover

A short funny quest-style interactive story inspired by mixed fairy tales.  
The player is an ugly duckling invited to the Royal Bird Ball, but must become “fairy-tale appropriate” before entering.

## Story Flow Diagram

```mermaid
flowchart TD
    Start[Start: The Muddy Pond] --> Invite[Royal Invitation<br/>The duckling is invited to the Royal Bird Ball]
    Invite --> Quest[Royal Makeover Quest Begins<br/>Choose one magical makeover item]

    Quest --> Mermaid[Mermaid Route<br/>Get the magical hairbrush]
    Quest --> SnowWhite[Snow White Route<br/>Get the suspiciously shiny shoe]
    Quest --> Princess[Princess Route<br/>Get the legendary pea]
    Quest --> Refuse[Refuse the makeover]

    Mermaid --> MermaidChoice{How do you get the hairbrush?}
    MermaidChoice --> Compliment[Compliment the mermaid's hair]
    MermaidChoice --> StealBrush[Steal the brush<br/>Mermaid becomes angry]
    Compliment --> Makeover[Emergency Royal Makeover Room]
    StealBrush --> Makeover

    SnowWhite --> SnowChoice{How do you get the shoe?}
    SnowChoice --> Clean[Help clean the cottage]
    SnowChoice --> Blame[Blame the dwarfs and take the shoe<br/>Dwarfs become angry]
    Clean --> Makeover
    Blame --> Makeover

    Princess --> PrincessChoice{How do you get the pea?}
    PrincessChoice --> Ask[Ask politely]
    PrincessChoice --> Soup[Eat the royal soup<br/>Queen becomes suspicious]
    Ask --> Makeover
    Soup --> Makeover

    Makeover --> FinalChoice{Choose final look}
    FinalChoice --> Swan[Use the hairbrush]
    FinalChoice --> ShoeHat[Use Snow White's shoe]
    FinalChoice --> Goose[Use the pea]
    FinalChoice --> Swamp[Refuse makeover at the last second]

    Swan --> SwanEnding[Ending 1:<br/>The Accidental Swan]
    ShoeHat --> ShoeEnding[Ending 2:<br/>The Shoe-Hat Fashion Legend]
    Goose --> GooseEnding[Ending 3:<br/>The Judgmental Goose]
    Swamp --> SwampEnding[Ending 4:<br/>King of the Swamp Birds]
    Refuse --> SwampEnding
```

## Endings

| Ending | Trigger | Result |
|---|---|---|
| The Accidental Swan | Use the mermaid's hairbrush | The duckling becomes elegant, shiny, and confused. |
| The Shoe-Hat Fashion Legend | Use Snow White's shoe | The duckling accidentally creates the kingdom's newest fashion trend. |
| The Judgmental Goose | Use the legendary pea | The duckling transforms into a loud fashion-reviewing goose. |
| King of the Swamp Birds | Refuse the makeover | The duckling rejects royal beauty standards and starts a muddy party. |

## Suggested Ink Structure

```text
start
refuse_early
quest_start
mermaid_route
snow_white_route
princess_route
makeover_room
swan_ending
shoe_ending
goose_ending
swamp_king_ending
```
