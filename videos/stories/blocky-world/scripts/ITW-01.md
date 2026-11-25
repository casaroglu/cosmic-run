# Toast & Pixi — "In This World…" #1: "We Only Walk When It Snores" (46 s)

Read `../BIBLE.md` first. Camera names, gags and limits are defined there. Table format is the one in
`SHORTS.md`: each row is one shot, "Dur" is seconds, lines are final and recorded exactly.

**Format (new):** an "In this world…" rule story. One strange world rule, said in the title and in the
first spoken line by a first-person-plural narrator (Toast). The rule is a survival mechanic with a
timer you can see. Small blocky people, a huge photo-real place, one giant threat.
Where this script and the bible disagree, this script wins (bible, top paragraph). The two deliberate
differences: Toast narrates in voice-over, and the hook shot carries the first words of the rule.

---

## Title, rule, cover

- **Title:** We Only Walk When It Snores
- **Rule (on the stone sign, and the first line):** `WE ONLY WALK WHEN IT SNORES`
- **Small print (hidden until shot 15):** `IF HE WAKES UP, HE WANTS TO PLAY. WITH EVERYONE.`
- **Cover hook (4 words):** DON'T WAKE THE GIANT
- **Cover picture:** the hook frame (shot 1): one giant open eye above the fog, tiny orange Toast on a
  skateboard in front of it, hundreds of frozen players around him.
- **Idea in one line:** 300 players cross a valley past a sleeping mountain-sized Donutsaurus; they may
  only move while his snore bubble is up. Toast finds a loophole: the rule says *walk*, so he *rolls*.
- **Twist:** the rule was never hiding them from a monster. It was protecting a puppy's nap, and an
  awake puppy that size wants to play with all 300 of them at once.

## The mechanic (must read with the sound off)

- **Timer = the snore bubble.** A glossy translucent sphere at Donutsaurus's nostril. It inflates while
  he snores and pops when the snore ends. **Bubble up = everyone walks. Bubble gone = everyone freezes.**
  A small label rides on the bubble with the seconds left (`3`, `2`, `1`).
- **Counter (bible "Counter" gag, top of frame):** `STILL IN: 300`. It only ever changes when players
  are knocked out. Values used: 300 → 271 → 140 → 12 → 1 → 300.
- **Knocked out** = a player flies off in a simple arc and bursts into a `pop` of coloured cubes. No
  one is hurt, eaten or crushed on screen except Toast's usual flat-Toast gag.
- **Three escalations:** (1) the snores get shorter: 3 s, 2 s, 1 s. (2) Toast rolls in the silence and
  one eyelid half-opens. (3) Toast freezes but the board does not, and he pops the bubble itself.

## Cast

- **Toast** — narrator (voice-over, `am_liam` +5 st) and on screen in the front row. Orange hoodie, so
  he is always findable in the crowd.
- **Pixi** — front row beside him. Headphones on, skateboard under her arm until shot 8. She never
  listens for the snore; she watches the bubble. Her freezes are perfect: mid-step, one foot up, no wobble.
- **Donutsaurus** — the giant. Root scale about 40 (he is the size of a hill), asleep across the valley
  between the crowd and the exit. Never evil: asleep, then delighted. Sounds from `sfx_lib` only.
- **The Admin** — not in this episode. One idea per Short.

## Backdrops (4 photo-real images, no people, no text, no logos)

| Id | Used in | Format | One-line image prompt |
| --- | --- | --- | --- |
| BD1 `valley_dawn` | WIDE and MED shots | 9:16 | Photo-realistic vast white cracked salt flat in a deep valley between dark basalt cliffs at dawn, low rolling ground fog, golden rim light from behind the far ridge, soft haze and atmospheric depth, empty flat middle distance, no people, no animals, no buildings, cinematic, 35 mm |
| BD2 `sky_up` | LOW shots | 9:16 | Photo-realistic view looking steeply upward from the floor of a canyon at dawn, towering dark cliff edges at both sides of the frame, huge layered clouds lit gold and pink, god rays through mist, empty sky in the centre, no people, no birds, cinematic |
| BD3 `salt_top` | TOP shot, and as the 3D ground texture | 1:1 | Photo-realistic top-down aerial photograph of a white salt flat with polygon crack patterns, even soft morning light, faint long shadows, seamless tileable texture, no objects, no people, no tracks |
| BD4 `valley_noon` | shots 16–19 (he is awake, fog blown away) | 9:16 | Same salt flat valley between dark basalt cliffs, later in the morning, fog cleared, bright clean sunlight, crisp long shadows on the white ground, deep blue sky with a few clouds, empty middle distance, no people, no animals, no buildings, cinematic, 35 mm |

BD1 and BD4 must share the same horizon height and cliff outline (generate BD4 from BD1 as an edit) so
the loop cut is invisible. Shot 19 uses BD1 again, see the loop note.

## Crowd and props

- **Crowd:** 300 copies of the generic player rig in a block, 20 wide × 15 deep, 1.2 m spacing, shirts in
  6 flat colours at seeded random, **none orange and none purple** (those are Toast and Pixi). Motion is
  one shared walk cycle with a per-row phase offset of 2 frames, and one shared freeze: the walk cycle
  simply stops on the current frame. Row 15 (the back row) gets one hand-picked player in a red shirt
  for shot 5.
- **Donutsaurus, giant:** root scale 40, lying on his side across the valley, head at screen right,
  nose pointing at the path. New rig needs: eyelids (0 closed, 0.5 half, 1 open), a slow breathing
  scale on the body, a tail that can sweep flat along the ground, a stand-up pose, a flop pose.
- **Snore bubble:** translucent sphere with a highlight, scale 0 → 6 m, wobble while inflating; pop =
  12 small droplets flying out. The seconds label is a 2D overlay locked to it.
- **Eye light:** a soft yellow cone (a transparent 3D cone or a 2D gradient) from the half-open eye
  onto the ground. Shots 11–12 only.
- **Stone sign:** a tall grey slab (box) at the start of the valley, taller than three players, with
  the rule carved in white and the key words `WALK` and `SNORES` in red. Moss (green boxes) covers the
  bottom fifth, where the small print is.
- **Exit arch:** three boxes forming a doorway with a soft white glow, far behind Donutsaurus. It is
  seen in shot 2 and is never reached.
- **Pixi's skateboard:** existing prop. Under her arm in shots 2–7, under Toast from shot 9.
- **Ground:** a large plane with BD3 as its texture, fog plane at knee height in BD1 shots.
- **Fog:** depth fog so the back rows of the crowd fade and Donutsaurus reads as far and enormous.

## Shot table (19 shots, 45.6 s)

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1.6 | LOW | **Loop pose.** Toast on the skateboard, frozen mid-roll, arms out, three-quarters to camera, lower third of frame. Behind and above him one giant eye snaps fully open and fills the top half. Frozen players left and right of him | TOAST (VO): "In this world…" | `IT WOKE UP` · counter `STILL IN: 300` | `sting` |
| 2 | 3.0 | WIDE | The whole valley (BD1). The block of 300 at the start line beside the stone sign. Giant Donutsaurus asleep across the valley, breathing slowly; glowing exit arch far behind him. The snore bubble inflates at his nose | TOAST (VO): "…we only walk when it snores." | sign readable: `WE ONLY WALK WHEN IT SNORES` | `ding`, snore in |
| 3 | 2.6 | MED | Bubble up, label `3`. Front row walks in step: Toast swinging his arms too much, Pixi beside him, board under her arm, eyes on the bubble | TOAST (VO): "Snore. We walk." | bubble label `3 → 2 → 1` | snore, `footsteps` (many, soft), `tick` per label change |
| 4 | 2.2 | MED | Bubble pops. All freeze mid-step. Pixi: one foot up, perfectly still. Toast: one foot up, wobbling, arms windmilling in tiny moves, then still | TOAST (VO): "Silence. We freeze." | — | `pop`, then total silence (music out too) |
| 5 | 2.4 | TOP | The grid from straight above on the cracked salt. Bubble shadow appears: the grid moves two steps and stops. One red-shirt player in the back row takes one extra step | TOAST (VO): "Every single time." | red ring around the late player | snore, `footsteps`, `pop`, one late step (`thud`, small) |
| 6 | 2.6 | WIDE | Because of that step the giant tail twitches in his sleep and sweeps flat across the back three rows. 29 players fly up in arcs and burst into cubes | TOAST (VO): "Or the tail finds you." | counter `300 → 271` | `impact`, `pop` ×5 rising, `tick` |
| 7 | 2.8 | MED | **Escalation 1.** Three quick bubbles, each smaller: the front row gets three steps, then two, then one. Toast's shoulders drop lower each time. Pixi's timing is exact every time | TOAST (VO): "And his snores keep getting shorter." | bubble labels `3`, `2`, `1` | snore ×3 (each shorter), `pop` ×3, `tick` |
| 8 | 2.8 | MED | Silence, everyone frozen. Toast's eyes slide to the skateboard under Pixi's arm. He slides it out with two fingers. Pixi does not move, only her eyes follow | TOAST: "We'll be here all day." PIXI: "Don't." | — | silence, small `click` as the board leaves her arm |
| 9 | 3.0 | MED | **Escalation 2.** No bubble on screen. Toast puts the board down, steps on, pushes off once and glides between frozen players, arms folded, very pleased | TOAST: "It says walk. I'm rolling." | arrow label `NO BUBBLE` pointing at the bare nostril | wheel rumble (`footsteps` low-passed, quiet) |
| 10 | 1.6 | INSERT | One skateboard wheel on the cracked salt. It wobbles and squeaks; three small motion marks jump off it | — | `SQUEAK` | squeak (`door`, first 0.4 s, pitched up) |
| 11 | 2.2 | LOW | The giant eyelid lifts halfway (BD2 behind). A soft yellow light cone falls from the eye onto the crowd and starts to sweep toward Toast | — | — | `sting` (low), deep rumble (`thud`, long tail) |
| 12 | 2.6 | WIDE | **Escalation 3.** Toast freezes in a perfect statue pose as the light crosses him. The board keeps rolling, slowly, carrying the statue straight toward the giant nose. The eyelid begins to sink shut again | TOAST (VO): "I froze. The board didn't." | — | wheel rumble, one squeak |
| 13 | 1.8 | MED | A new bubble has just started to inflate at the nostril. The board bumps the nose. Toast's outstretched statue finger goes straight into the bubble | — | bubble label `3` vanishes with the bubble | `thud` (small), `pop` |
| 14 | 1.2 | CRASH | Toast, eyes pop. Behind his head both giant eyes are now open | — | — | `boing` |
| 15 | 3.0 | INSERT | Pixi, still at the sign, scrapes the moss off its foot with her shoe and points. Camera pushes in on the small print | PIXI: "Small print." | `IF HE WAKES UP, HE WANTS TO PLAY. WITH EVERYONE.` | `ding` |
| 16 | 3.2 | LOW | **Twist.** Fog gone (BD4). Donutsaurus stands up like a hill rising, tongue out, tail wagging. Each wag thumps the ground and the whole crowd hops into the air together; on every thump a big part of it sails off and bursts into cubes. He laughs | PIXI (off): "He's not a monster. He's a puppy." | counter `271 → 140 → 12`; HA HA HA bubble | `thud` ×3, `pop` ×many, `dino_laugh_oldman` (first 1.8 s) |
| 17 | 2.4 | WIDE | He spots Toast, the only one in orange, and flops down on him for a cuddle. Pixi takes one calm step to the side, out of the falling shadow. Fail screen | — | **TOASTED!** · counter `12 → 1` | `impact`, `crash` + `stamp` |
| 18 | 2.6 | MED | Donutsaurus yawns, rolls back onto his side exactly where he slept before, eyes shut. Fog creeps back (cross-fade BD4 → BD1). The players pop back in, frozen. Flat Toast peels off the ground, pops to full size and steps onto the board. Pixi, beside him, arms crossed | PIXI: "You rolled." | counter `1 → 300` | yawn (`dino_burp_long` reversed or slowed), `pop` ×6, `pop` (Toast) |
| 19 | 2.0 | LOW | Same camera as shot 1. Toast lifts one finger and pushes off very gently. The wheel squeaks. The eye behind him snaps open. He freezes in the loop pose | TOAST: "Okay. This time I'll roll qui—" | cut on "qui—"; last frame = shot 1 | squeak, `sting` |

## Lines, in recording order

Toast, narrator (VO, `am_liam` +5 st, a little slower and lower in energy than his normal voice, like a
documentary he is very proud of):

1. "In this world… we only walk when it snores."  *(one take; the cut from shot 1 to 2 falls in the pause)*
2. "Snore. We walk."
3. "Silence. We freeze."
4. "Every single time."
5. "Or the tail finds you."
6. "And his snores keep getting shorter."
7. "I froze. The board didn't."

Toast, on screen (normal Toast voice):

8. "We'll be here all day."
9. "It says walk. I'm rolling."
10. "Okay. This time I'll roll qui—"  *(record "quietly" in full, cut after "qui")*

Pixi (`af_bella` 0.95):

11. "Don't."
12. "Small print."
13. "He's not a monster. He's a puppy."
14. "You rolled."

Donutsaurus: no lines. `dino_laugh_oldman` in shot 16, snores throughout.

**Single-word captions (centre, 65% height):** IN · THIS · WORLD · WALK · SNORES · SNORE · WALK ·
SILENCE · FREEZE · EVERY · SINGLE · TIME · TAIL · SHORTER · ALL · DAY · DON'T · WALK · ROLLING ·
FROZE · BOARD · SMALL · PRINT · MONSTER · PUPPY · ROLLED · QUI—. Key words `SNORES`, `FREEZE`,
`ROLLING`, `PUPPY` in the accent colour.

## Sound notes

- **Never whoosh, swish, zip or riser.** The tail sweep, the eye opening and the giant standing up are
  carried by `impact`, `thud` and `sting` only.
- **The snore is the music's off-switch.** While the bubble is up: snore plus a soft walking beat.
  When it pops: complete silence for the freeze, music included. The viewer learns the rule by ear and
  by eye at the same time. Shots 8–10 play in that silence, so the wheel squeak is the loudest thing.
- **New sound needed:** one snore (inhale rattle, 3 s, trimmable to 2 s and 1 s). It is not in
  `sfx_lib` yet: add a CC0 recording and credit it in `SOUND_CREDITS.md`, pitched down about 7 st with
  a little reverb for size. Until then, a slowed `dino_burp_long` is the stand-in.
- Laugh in shot 16 from `sfx_lib/library.json` only.

## Loop note

- Shots 1 and 19 are built from **one shared pose object** (`LOOP_POSE`): LOW camera, BD1, Toast on the
  board in the frozen mid-roll pose in the lower third, the open eye filling the top half, the same
  frozen players at the same seeded positions, counter `STILL IN: 300`, text `IT WOKE UP` appears on
  frame 1 of shot 1 only.
- Shot 18 exists to put everything back: Donutsaurus returns to his exact sleeping position, the fog
  and BD1 return, the counter returns to 300 and the crowd pops back in around Toast.
- The last line is cut on "qui—" by the squeak and the eye; the replay then starts on the same picture
  with "In this world…", so the second viewing reads as "and he did it again".
- On first viewing shot 1 works as the flash-forward to shots 11–14; on the loop it is the second attempt.

## Mute test (stills that must tell the story)

Sign with the rule (2) → bubble up, crowd walking (3) → bubble gone, crowd frozen (4) → one late step,
tail, counter drops (5–6) → smaller bubbles (7) → Toast takes the board (8) → he rolls with no bubble
(9) → `SQUEAK` (10) → eye half open (11) → statue on a rolling board (12) → finger in the bubble (13) →
small print (15) → happy giant, crowd in the air (16) → TOASTED! (17) → asleep again, Toast back on the
board (18–19).

## Build checklist for this episode

1. Giant Donutsaurus: scale 40, eyelids, tail sweep, stand-up and flop poses, snore bubble.
2. Crowd instancing: 300 players, shared walk and freeze, arc-and-burst knockout, synced hop (shot 16).
3. Backdrops BD1–BD4 generated and matched; BD3 on the ground plane.
4. Stone sign with rule and moss-covered small print (too small to read before shot 15).
5. `LOOP_POSE` shared by shots 1 and 19.
6. Snore sound added to the library and credited.

---

## Next episodes in this format (3 rule ideas)

1. **"We Stay in the Shadow"** — In this world, we never leave the shadow. A white-hot desert of dunes;
   the only shade is the moving shadow of giant Donutsaurus as he wanders. 300 players shuffle along
   inside it. Timer: a sun meter that fills the moment anyone steps into the light (they pop like
   popcorn). Escalation: he walks faster, he turns suddenly, he jumps (the shadow shrinks to a dot).
   Toast's loophole: steer him with a donut on a fishing rod. Twist: the "sun" is the Admin's desk lamp;
   he switches it off and says "Lunch break."

2. **"We Never Step on Pink"** — In this world, we never step on the pink tiles. An endless floor of
   white tiles above a sea of clouds; every ten seconds more tiles turn pink (counter: `SAFE TILES: 400`
   falling). Step on pink and the tile drops away. Pixi crosses on her board without touching one.
   Toast's loophole: "It's not pink, it's salmon." Twist: the pink is icing. The whole floor is the
   back of a sleeping Donutsaurus, and he is ticklish.

3. **"We All Jump on Three"** — In this world, we all jump on three. A giant stone disc in a canyon; a
   huge carved counter on the cliff counts 1, 2, 3 and the disc flips like a coin. Everyone jumps
   together and lands on the other face. Escalation: the count gets faster, then it counts backwards,
   then it skips two. Toast jumps on two "to be early". Twist: the disc is the Admin's coin. He is
   flipping it to decide whether to ban jumping. It lands on its edge.
