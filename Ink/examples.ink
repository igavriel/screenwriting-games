-> menu

=== menu ===
Select the exmaple:
* [Hello] -> hello
* [Hebrew] -> hebrew
* [Glue] -> glue
* [Find help] -> find_help
* [Sticky choice] -> homers_couch
+ [choices demo] -> choice
+ [mole choices] -> whack_a_mole
+ [Murder] -> murder
* [The End] -> END

= hello
	This is an exmaple of simple flow
	*	[goto example]
		-> a1

= glue
	I put myself in third.
	-> b1

-> END

=== start ===
Hello world!
*	Hello back!
	Nice to hear from you!

-> a1

=== a1 ====	
How are you
*	[and the answer is]
	Very well thank
-> a2

=== a2 ===
Hello world!
*	Hello [back!] right back to you!
	Nice to hear from you!

-> menu

=== hebrew ===
ועכשיו בדיקה בעיברית
* נתחיל [בתשובה] ונסיים בתודה
  היה כייף

-> menu

=== a4 ===
"What's that?" my master asked.
*	"I am somewhat tired[."]," I repeated.
	"Really," he responded. "How deleterious." -> b1
*	"Nothing, Monsieur!"[] I replied.
	"Very good, then." -> b1
*  "I said, this journey is appalling[."] and I want no more of it."
	"Ah," he replied, not unkindly. "I see you are feeling frustrated. Tomorrow, things will improve." -> b1

=== b1 ===
We arrived into London at 9.45pm exactly.
-> hurry_home

=== hurry_home ===
We hurried home to Savile Row -> as_fast_as_we_could

=== as_fast_as_we_could ===
as fast as we could.
-> hurry_home_glue

=== hurry_home_glue ===
We hurried home <>
-> to_savile_row

=== to_savile_row ===
to Savile Row
-> as_fast_as_we_could_glue

=== as_fast_as_we_could_glue ===
<> as fast as we could.

-> menu

=== find_help ===
You search desperately for a friendly face in the crowd.
* The woman in the hat[?] pushes you roughly aside. -> find_help
* The man with the briefcase[?] looks disgusted as you stumble past him. -> find_help
* ->
 But it is too late: you collapse onto the station platform. This is the end.

-> menu

=== homers_couch ===
+	[Eat another donut]
	You eat another donut. -> homers_couch
*	[Get off the couch]
	You struggle up off the couch to go and compose epic poetry.
	-> menu	

=== choice ===
This is counter cycle with one end:
The radio hissed into life. <b><u>{"Three!"|"Two!"|"One!"|There was the white noise racket of an explosion.|But it was just static.}</b></u>

<b><u>{I bought a coffee with my five-pound note.|I bought a second coffee for my friend.|I didn't have enough money to buy any more coffee.}</b></u>

This is an endless cycle (using &):
It was <b><u>{&Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday}</b></u> today.

Cycle once all option and done (using !)
He told me a joke. <b><u>{!I laughed politely.|I smiled.|I grimaced.|I promised myself to not react again.}</b></u>

Random choice: I tossed the coin. <b><u>{~Heads|Tails}</b></u>.
-> menu	

=== whack_a_mole ===
	{I heft the hammer.|{~Missed!|Nothing!|No good. Where is he?|Ah-ha! Got him! -> mole_end}}
	The {&mole|{&nasty|blasted|foul} {&creature|rodent}} is {in here somewhere|hiding somewhere|still at large|laughing at me|still unwhacked|doomed}. <>
	{!I'll show him!|But this time he won't escape!}
	* 	[{&Hit|Smash|Try} top-left] 	-> whack_a_mole
	*  [{&Whallop|Splat|Whack} top-right] -> whack_a_mole
	*  [{&Blast|Hammer} middle] -> whack_a_mole
	*  [{&Clobber|Bosh} bottom-left] 	-> whack_a_mole
	*  [{&Nail|Thump} bottom-right] 	-> whack_a_mole
	*   ->
    	    Then you collapse from hunger. The mole has defeated you!
            -> mole_end

=== mole_end ===
this is a molde ending 
-> menu

=== murder ===
- 	"Well, Poirot? Murder or suicide?"
		*	"Murder!"
		 	"And who did it?"
			* * 	"Detective-Inspector Japp!"
			* * 	"Captain Hastings!"
			* * 	"Myself!"
			- - 	"You must be joking!"
			* * 	"Mon ami, I am deadly serious."
			* *		"If only..."
		* 	"Suicide!"
			"Really, Poirot? Are you quite sure?"
			* * 	"Quite sure."
			* *		"It is perfectly obvious."
		-	Mrs. Christie lowered her manuscript a moment. The rest of the writing group sat, open-mouthed.
		
		
-	"Tell us a tale, Captain!"
	*	"Very well, you sea-dogs. Here's a tale..."
		* * 	"It was a dark and stormy night..."
				* * * 	"...and the crew were restless..."
						* * * *  "... and they said to their Captain..."
								* * * * *		"...Tell us a tale Captain!"
	*	"No, it's past your bed-time."
-	To a man, the crew began to yawn.
-> menu

-> END