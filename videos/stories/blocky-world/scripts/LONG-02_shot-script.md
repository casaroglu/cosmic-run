# Long video 2 — "We Joined the WRONG Servers" — shot script (1920×1080)

Read `../BIBLE.md` first, then `LONG-02_wrong-servers.md` (story, character designs, world looks).
This file is the build document: every row is one shot, "Dur" is seconds, every line is final and is
recorded exactly as written. Where this file and the outline disagree, **this file wins**; the
differences are listed in "Changes from the outline" at the end.

## 0. Conventions for this film

- **Frame:** 1920×1080, 30 fps. Subtitles are full sentences in the lower band (82–94% height); keep
  faces, signs and HUD out of that band. HUD lives in the top 12% and the bottom-left / bottom-centre
  corners as described per world; in Cubelands the hotbar sits at 70–80% height so subtitles stay free.
- **Shot ids:** `scene-shot` (`2-14` = Cape City, shot 14). Scene 0 is the cold open, E is the end card.
- **Stage coordinates:** `x` = metres left (−) / right (+) of the set centre as the main camera sees
  it, `z` = metres toward the camera (+) / away (−). Toast is 1.0 tall. Each scene lists its marks.
- **Camera names** are the bible's (WIDE / MED / CU / CRASH / LOW / TOP / INSERT). `CARD` = a
  full-screen 2D card (loading card, title, intro cards). `LOOP_POSE` is defined below.
- **Voices.** Toast and Pixi are the cloned Chatterbox voices; the bracket before each line is the
  emotion / delivery to prompt. Other characters keep the outline's voice descriptions (Admin deep and
  bored, Mitten very deep and calm, Brunch heroic baritone, Gran old and slow, Zip very fast, Cubefolk
  one syllable); their brackets are delivery notes too.
- **Sound column vocabulary.** Engine kinds in back-ticks (`ding`, `tick`, `pop`, `thud`, `impact`,
  `crash`, `stamp`, `boing`, `click`, `magic`, `sting`, `bell`, `footsteps`, `door`). Library laughs
  and burps by name or Freesound id. **Meme cues are written as name + id** (boom 512389, scratch 71853,
  swanee up 497092, swanee down 497093, dizzy 403002, oof 438912, airhorn 581334, wah-wah 362206,
  bruh 704942 / 506582, fart 249583, pipe 164572). A cue starts at the head of its shot unless it says
  `(at N s)`. Meme cues are never closer than 3 s to each other (checked, see section 9).
- **Never whoosh, swish, zip or riser.** Tile flips, drops, the snap, the freeze and every transition
  are carried by `tick`, `pop`, `thud`, `impact`, `click` and silence. The Fuse Box hiss is a **steady**
  noise (no pitch or volume ramp); its tension comes from the flashes getting closer together.
- **Toast's "Fuuu—"** (own TTS, cut before any word) is used exactly twice: `3-34` and `5-23`.
- **Limits for a long film:** CRASH at most twice per scene; **TOASTED!** twice in the film (`3-35`,
  `5-23`), always the bible look; one idea per shot.
- **Parody rule:** nothing on screen may carry or imitate a real name, logo, costume, face, mob or
  button symbol of any film, game or console. The controller's buttons are our donut / toast / star /
  skateboard icons; the alarm meter is five donuts; the HUDs are our own layouts.

### LOOP_POSE (one shared pose object, used by `0-1`, `2-30` and `E-5`)

Camera LOW, 1.2 m behind and left of Toast, looking up. The red quilted oven mitt is raised, palm to
camera, and fills the right 70% of the frame. **Five magnets glow gold: star, heart, moon, fish, leaf.
The sixth slot is an empty donut-shaped socket** (dark, in the palm centre). The glow blooms into a
yellow-white radial halftone burst (2D layer) that **completely covers the set behind**, so the picture
is identical in Cape City and in the donut shop. Toast's head and orange hood are in the lower-left
foreground, 22% of frame width, starting in profile (looking at the mitt) and turning three-quarters to
camera, brows up. Frame 0 of the pose = head in profile, mouth just opening.
One recording of the line is used in all three places.

### Loading card (built once, used 4 times)

Dark blue card, spinning pixel-free 3D donut centre, `JOINING SERVER…` and a bar that runs to 99% in
1.2 s, sticks for 1.6 s (the donut wobbles, a `tick` every 0.4 s), then jumps to 100% with a `ding`.
Under the bar: `TIP:` plus the scene's joke. Bottom-right: the controller battery icon with the bars
left. Always 4.0 s. No music under it, only the ticks.

### Tile flip (built once, used 5 times)

Floor tiles turn over one by one in a line toward our three, white on the back, each with a `tick` at
a **fixed pitch** (the rate goes up, the pitch does not). When the line reaches them a white square of
light opens above and they are pulled straight up with one `pop` each.

### Set-ups and pay-offs (keep them small, never commented on)

| Set-up | Planted | Pays off |
| --- | --- | --- |
| Rubber duck | `1-16` (Donutsaurus bites it out of the air) | `2-26` (it is all that comes out when Toast shakes him) |
| Donut magnet in his belly: one **pink** flash | `2-22` gulp, `2-25` and `2-42` flash | `5-12` coughed up, `5-20` eaten again |
| Confetti in Toast's hood | `2-42` | `5-10`, `5-11` |
| `EXPLOSION ×1 (stored)`: steady **orange** flicker in the belly | `3-23` | `4-19` to `4-24` charges the controller |
| The mop (Toast's enemy) | `1-1`, `1-10` | `2-15`, `3-11`, `5-2`, `5-27` |

---

## Scene 0 — Cold open

**Sets:** Cape City battlefield (built for scene 2), 3 flash frames from scenes 3 and 4, title card.
**Cast:** Lord Mitten (mitt only), Toast; in `0-4` Toast, Pixi, Donutsaurus.
**HUD:** none in `0-1` to `0-3`; Cape City top bar in `0-4` reading `SERVER EMPTY — PLAYERS: 0 (+3 GUESTS)`.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 0-1 | 1.8 | LOOP_POSE | Frame 0 of the pose. Magnets pulse once. Toast's head turns from profile to three-quarters to camera | TOAST [nervous, fast, half a whisper]: "Is that guy about to—" | — | low held `sting`, no music |
| 0-2 | 1.0 | INSERT | The mitt's thumb and two padded fingers, frame-filling. They snap. Six white stitches jump off the seam | — | 2D burst `SNAP` | `click` (loud, dry), then 6 frames of silence |
| 0-3 | 1.4 | CARD | White flash for 8 frames, fades to yellow halftone. `WRONG SERVER` slams in at 80% width, shakes 4 frames | — | `WRONG SERVER` | boom 512389 |
| 0-4 | 3.4 | WIDE | Freeze frame: the battlefield, empty, confetti hanging in mid-air, one white cape frozen half-way down. Dead centre, tiny: Toast, Pixi, Donutsaurus, grey `GUEST` tags. Three hand-drawn yellow arrows scribble in, one per character | TOAST (VO) [sheepish, too casual]: "Okay. That one was a little bit our fault." | arrows labelled `US` `US` `ALSO US` | wind only; `tick` per arrow |
| 0-5 | 0.9 | MED | Flash: Cubelands at night. Toast kneeling with open arms; the lime gift box in front of him mid-flash, pure white, fuse sparkling | — | stamp-style tag `ALSO US` | `tick`, steady hiss under |
| 0-6 | 0.9 | WIDE | Flash: Turbo City. A tank half-way round a corner, orange indicator on. Our three in a spotlight | — | `ALSO US` | `tick`, one indicator `click` |
| 0-7 | 0.9 | INSERT | Flash: grey frozen world, a pause menu, Toast's finger 2 cm from `QUIT GAME` | — | `…ALSO US` | `tick`, silence |
| 0-8 | 3.6 | CARD | Title on the pink shop tiles: **WE JOINED THE WRONG SERVERS**, each word drops in with a tile flip. After 1.6 s the small print pops in under it. Donutsaurus's head rises into the bottom-right corner and bites the last `S`, which grows back | — | `WE JOINED THE WRONG SERVERS` · small print `(all of them)` | airhorn 581334, then `mischief` sting (2 bars); `pop` on the bite |
| 0-9 | 1.2 | — | The picture runs backwards for 0.6 s (title tiles un-flip, shop appears), stops on the shop clock: 2:59 | — | `ONE BUTTON EARLIER` | `tick` ×3 fast, music out |

**Button:** the clock at 2:59 is the first frame of scene 1 (cut on the last `tick`).

**New for this scene:** `LOOP_POSE` object with the 2D halftone glow burst · `SNAP` burst · hand-drawn
arrow overlay · title card with tile-flip words. Everything else is borrowed from later scenes: block
`0-4` to `0-7` after those scenes exist.

---

## Scene 1 — Home: the box

**Set:** Donut Planet as in Long 1, night. Counter along the back wall (z = −2, x from −3 to +3).
Lost-and-found box (cardboard, `LOST & FOUND` in marker) on the counter at x = −2.2. Rule sign on the
wall at x = −3.4 with rules 1–7 from Long 1 and an empty line under them. Clock above the counter
centre. Mop and one tile `M` at x = −0.8, z = +1.0; tile `M` is visibly paler and shinier than the
rest. Door at screen right.
**Marks:** Toast at `M`. Pixi sits on the counter at x = +0.8, legs dangling, three-quarters to camera,
headphones on. Donutsaurus (scale 1.0) asleep on the counter at x = +2.2, tail hanging down.
**Cast:** Toast (badge `NIGHT MANAGER — FOREVER`), Pixi, Donutsaurus.
**HUD:** top-left `NIGHT 8`, top-right coin counter `● 1`. Controller battery (from `1-9` on, bottom-right): 3 bars.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 1-1 | 3.0 | WIDE | The shop. Toast mops tile `M`, the same slow stroke three times. Pixi on the counter doing nothing. Donutsaurus asleep, a small snore bubble. Clock 2:59 | — | HUD `NIGHT 8` | `mischief` (slow, quiet); mop squeak (`door`, 0.3 s, pitched up) ×3 |
| 1-2 | 3.4 | MED | Toast, eyes half shut, chin on the mop handle. The badge is readable for the whole shot | TOAST [flat, exhausted]: "Night eight. Of forever." | badge `NIGHT MANAGER — FOREVER` | — |
| 1-3 | 1.6 | INSERT | Tile `M` from above, mirror-shiny, Toast's reflection in it. A small yellow counter sits on the tile and ticks up by one as the mop crosses | — | counter `SAME TILE: 4,112 → 4,113` | `tick` |
| 1-4 | 4.2 | MED | Toast leans the mop upright (it stands on its own) and turns to Pixi. She does not turn; one finger taps her headphones | TOAST [pleading]: "Pixi. I want one night off. Just one."<br>PIXI [deadpan, not looking]: "Ask The Admin." | — | — |
| 1-5 | 3.0 | MED | Toast looks straight up at the ceiling, shrinks 10%, looks back down. His eyes slide to the lost-and-found box | TOAST [whisper, scared]: "I am not asking The Admin." | — | one low `thud` from above on "Admin" (as if something heard) |
| 1-6 | 4.0 | MED | He tips the box out on the counter. Things drop one at a time: a sock (flops), a tooth (bounces twice), a rubber duck (lands upright facing camera). Last, slowly, the white controller on a string with a paper note; its START button gives one soft pulse of light | TOAST [bored, listing]: "Sock. Tooth. Duck."<br>TOAST [intrigued]: "…Ooh." | — | `thud` (soft), `tick` ×2, duck squeak (`dino_laugh_squeak`, first 0.2 s), `ding` |
| 1-7 | 2.0 | INSERT | The note, tied to the controller. Hand-written, red, underlined twice | — | `ADMIN'S. DO NOT TOUCH.` | `ding` |
| 1-8 | 4.0 | MED | Toast lifts the controller with two fingers, held away from his body like a dead fish. Pixi, behind him, still looking the other way | PIXI [flat]: "Don't."<br>TOAST [innocent]: "I'm not touching it. I'm holding it." | — | — |
| 1-9 | 2.4 | INSERT | The controller in his hands: two sticks, four face buttons (donut, toast, star, skateboard), big round START glowing. The little screen lights up | — | screen `CHANGE SERVER ▸ RANDOM` · battery `▮▮▮` | `magic` (soft) |
| 1-10 | 6.4 | MED | Toast walks two steps toward camera (to x = −0.2, z = +1.6), turning the controller over, working it out. On "no mop" he glances back at the mop standing by itself; the mop leans 5° toward him | TOAST [scheming, building up]: "It's a remote. Maybe it changes the channel. Maybe there's a channel with no mop." | — | `mischief` picks up one notch |
| 1-11 | 2.6 | INSERT | Thumb presses the donut button: nothing. The toast button: nothing. A small grey label pops over each | — | `NOPE` · `ALSO NOPE` | `click` ×2, wah-wah 362206 (at 1.2 s, first 1.2 s only) |
| 1-12 | 2.4 | MED | He mashes every button with both thumbs, tongue out. Pixi finally turns her head, one eyebrow | PIXI [warning, low]: "Toast." | — | `click` ×8 fast |
| 1-13 | 1.4 | INSERT | His thumb lands flat on START. The button sinks, the glow goes from white to pink | — | — | `click` (deep), music stops dead |
| 1-14 | 3.0 | TOP | Straight down on the shop floor. Tiles flip over one by one in a line from the door (right) toward Toast, like a loading bar. A percentage is printed on the white backs | — | `12%` … `64%` … `97%` on the tiles | tile `tick`s, rate rising, fixed pitch |
| 1-15 | 3.8 | MED | Toast hops from foot to foot as the tiles reach him. Pixi drops off the counter, takes two steps and grabs his hood with one hand, board under the other arm | TOAST [thrilled panic]: "It's doing something! Is it doing the right something?" | — | `tick`s continue |
| 1-16 | 2.0 | MED | The counter. The rubber duck lifts off and floats up. Donutsaurus opens one eye, sees it, springs off the counter and snaps it out of the air | — | — | swanee up 497092, duck squeak cut short by a `pop` |
| 1-17 | 2.8 | WIDE | A white square of light in the ceiling. Toast (stretched to twice his height), Pixi (holding his hood, perfectly calm) and Donutsaurus (duck in mouth) are pulled up into it and vanish. The mop stays, standing on its own | TOAST [yelling, fading upward]: "I regret holding iiit—" | — | `pop` ×3, `magic` |
| 1-18 | 2.6 | WIDE | Same frame, nobody in it. Silence. The mop wobbles once and stays up. The clock flips to 3:00. The HUD changes | — | `NIGHT 8` → `NIGHT 8 (UNATTENDED)` · battery `▮▮▮ → ▮▮` | `tick` (clock), bruh 704942 (at 1.2 s) |
| 1-19 | 4.0 | CARD | Loading card | — | `JOINING SERVER… 99%` · `TIP: Do not feed the mascot after 3 AM.` · battery `▮▮` | card ticks, `ding` |

**Button:** the empty shop, `(UNATTENDED)`, bruh, then the card.

**New for this scene:** lost-and-found box, sock, tooth, rubber duck · worn tile `M` with the
`SAME TILE` counter · the mop's "stands on its own / leans" behaviour · stretch on Toast when pulled up
(scale-y 2.0, scale-x 0.6) · HUD suffix `(UNATTENDED)`. Existing: shop, controller with note, tile
flip, loading card, snore bubble (ITW-01).

---

## Scene 2 — Cape City

**Set:** a broken four-lane street running left–right, dusk skyline backdrop, rubble piles, halftone
dots in every shadow. A waist-high rubble pedestal `P` at x = +4.5 with a small closed velvet box on it.
**Marks:** heroes' line on the left: Captain Brunch x = −5, Thunder Gran x = −6, The Sulk x = −7.5,
z = −1.5, seated, **back to the battle**; Zip is a yellow blur that crosses the frame, never still.
Lord Mitten x = +7, z = 0. Landing mark `L` at x = 0: Toast x = −0.6, Pixi x = +0.6, Donutsaurus x = 0,
z = +0.8.
**Cast:** Toast, Pixi, Donutsaurus, Lord Mitten, Captain Brunch, Thunder Gran, Zip, The Sulk.
**HUD:** top bar `FINAL BATTLE — LORD MITTEN ██████░░`; under it, right, `MAGNETS 6/6`. Yellow comic
caption boxes. `GUEST` tags over our three from `2-5`. Controller battery: 2 bars.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 2-1 | 2.8 | WIDE | The street at dusk. Heroes left, capes blowing; Mitten right, enormous; 10 m of empty road between them. Brunch raises his frying pan | BRUNCH [heroic shout]: "For the universe!" | caption box `Meanwhile, at the end of the world…` · top bar | `epic` at full volume |
| 2-2 | 2.4 | WIDE | A white square opens in the sky above `L`. Three small blocky figures drop out: Toast lands face down, Donutsaurus lands sitting on him, Pixi lands standing on her board and rolls 30 cm | — | 2D burst `PLOP` | scratch 71853 (music stops dead), `thud` ×2 |
| 2-3 | 1.4 | MED | The heroes, frozen mid-pose, heads all turned to centre. Gran's knitting needle is stuck mid-spark | — | — | silence, one `tick` |
| 2-4 | 1.4 | LOW | Lord Mitten, mitt half raised, looking down past it at the three. He blinks once, slowly | — | — | silence, one `tick` |
| 2-5 | 2.0 | MED | Our three. Donutsaurus gets off Toast. Grey tags pop up over each head, left to right | — | `GUEST` `GUEST` `GUEST` | `pop` ×3 |
| 2-6 | 3.6 | MED | Toast springs up, looks left at the capes, right at the giant, and beams. Pixi looks only at the mitt | TOAST [delighted]: "A costume party!"<br>PIXI [flat]: "That's not a costume party." | — | Toast giggle 697900 (first 0.5 s) before his line |
| 2-7 | 5.2 | MED | Brunch strides in from the left to x = −1.8, cape flapping, and points at them with a straight arm. Each stride lands with a 2D `STOMP` | BRUNCH [booming]: "Citizens! Stand back! This is the final battle for the universe!" | `STOMP` ×3 | `thud` ×3, `epic` back in, half volume |
| 2-8 | 5.2 | MED | Toast, friendly, hand half up like in class. Brunch's pointing arm droops by a third on each of Toast's lines until it hangs straight down | TOAST [curious]: "Which one?"<br>BRUNCH [thrown]: "…The universe."<br>TOAST [helpful]: "We have a different one." | — | swanee down 497093 (at 3.6 s, on the last droop) |
| 2-9 | 1.3 | CARD | Comic intro card, halftone yellow: Brunch, pan raised | — | `CAPTAIN BRUNCH — hits things with a pan` + `POW` | `impact` |
| 2-10 | 1.3 | CARD | Card, purple: Gran, needles crossed, a small lightning bolt between them | — | `THUNDER GRAN — knits lightning` + `ZZT` | `impact`, short crackle (`tick` ×4 fast) |
| 2-11 | 1.5 | CARD | Card, yellow speed lines and nobody in it. A blur crosses left to right, then right to left | ZIP [very fast]: "Hi— bye." | `ZIP — already left` | `pop` ×2 |
| 2-12 | 1.5 | CARD | Card, grey: The Sulk's huge back, arms crossed. He does not turn round for his own card | — | `THE SULK — not helping` | one grunt (`thud`, low) |
| 2-13 | 3.4 | MED | Toast tugs Brunch's cape twice. Brunch puts his fists on his hips | TOAST [hopeful]: "Do we get powers?"<br>BRUNCH [proud]: "Everyone here has a power." | — | — |
| 2-14 | 4.2 | MED | A green scanner line runs down over Toast, then Pixi, then Donutsaurus (0.9 s each). A comic card pops beside each as the line leaves them. Toast's smile falls at his | — | `TOAST — POWER: NONE (GUEST)` · `PIXI — POWER: NONE (GUEST)` · `DONUTSAURUS — POWER: HUNGRY` | `tick` per scan, wah-wah 362206 (at 0.9 s), `ding` on HUNGRY |
| 2-15 | 3.0 | MED | Toast, offended, mimes two mop strokes at the scanner card. The card flips over | TOAST [offended]: "None? I can mop!" | card flips to `TOAST — POWER: MOP (WEAK)` | `tick`, `stamp` (small) |
| 2-16 | 5.6 | LOW | Lord Mitten. Slow quarter-orbit around him from his right side to his front. He raises the mitt; the magnets light one at a time on his words: star, heart, moon, fish, leaf | MITTEN [very deep, very calm]: "For a thousand years I have collected the six Magnets of Everything." | — | `epic` drops to low strings; `ding` ×5, each a step higher (separate notes, no glide) |
| 2-17 | 4.8 | MED | Foreground, sharp: Toast holds the hem of his hoodie out to Thunder Gran with a pen. Background, soft focus: Mitten continues, mitt up. Pixi at frame right watches the mitt and nothing else | MITTEN (background) [calm]: "With the last one… I will tidy the universe."<br>TOAST [loud whisper]: "Can you sign it 'to Toast'? T, O, A—" | — | Mitten ducked 8 dB under the whisper |
| 2-18 | 3.0 | MED | Gran pats his cheek and signs the hoodie with a sparking knitting needle. Toast flashes white for 3 frames; his hood smokes. A scorch mark is left on the hoodie | GRAN [sweet, slow]: "Hold still, dear." | scorch reads `XOXO GRAN` · 2D `ZZT` | `impact` (small), oof 438912 (at 1.8 s) |
| 2-19 | 3.0 | INSERT | Pedestal `P`. Mitten's free hand opens the velvet box with one finger. Inside: the sixth magnet, a pink glittering donut. Glitter particles | MITTEN [reverent]: "Behold. The Donut of Destiny." | — | `magic` |
| 2-20 | 1.2 | CRASH | Donutsaurus. His head turns, pupils become pink hearts, one string of drool | — | — | `boing` |
| 2-21 | 5.0 | WIDE | Donutsaurus trots from `L` to `P` across the empty road between the armies, tail wagging. Nobody moves; every head turns to follow him at the same speed. Toast reaches one hand out too late | PIXI [quiet, certain]: "Oh no." | — | music out; tiny squeaky steps (`dino_laugh_squeak` blips, 6×) |
| 2-22 | 2.2 | INSERT | He licks the magnet out of the box, swallows, sits, wags, and looks up at Mitten for another | — | HUD `MAGNETS 6/6 → 5/6` | `pop` (gulp), `tick` |
| 2-23 | 3.8 | MED | Total silence. Mitten looks at the empty box (1.2 s). At the dinosaur (1.2 s). At the heroes (1.2 s). The heroes shrug at the same moment; The Sulk does not | — | — | `tick` per look, bruh 506582 (at 2.6 s, on the shrug) |
| 2-24 | 3.4 | CU | Lord Mitten, eyes a little wet, voice unchanged | MITTEN [hollow, calm]: "…That was a thousand years." | — | — |
| 2-25 | 2.4 | MED | Toast jogs in to `P`, lifts Donutsaurus by the tail, holds him upside down. Donutsaurus's belly gives one **pink** flash (4 frames) | TOAST [confident]: "Hang on. I've got this." | — | `footsteps` |
| 2-26 | 2.6 | MED | He shakes him twice. One thing falls out and lands upright, facing camera: the rubber duck. Nothing else. Everyone looks at the duck | — | 2D label with arrow: `NOT A MAGNET` | `thud` ×2 (shakes), duck squeak, wah-wah 362206 (at 1.6 s, first 1.0 s) |
| 2-27 | 5.4 | MED | Toast sets him down, picks up the duck, wipes it on his hoodie and offers it to Mitten on a flat palm. Mitten does not take it | TOAST [apologetic, babbling]: "He does that. Sorry. He'll… return it. Tomorrow. Probably." | — | `dino_burp_short` after "Probably", a puff of pink glitter |
| 2-28 | 3.6 | LOW | Mitten sighs through his nose (cape lifts) and raises the mitt above his head. Five magnets glow; the donut socket stays dark | MITTEN [tired]: "Five will have to do." | — | `epic` low strings return |
| 2-29 | 4.8 | MED | Brunch runs in from the left to x = +1, pointing at the mitt with his whole body. Gran, behind him, lowers her knitting | BRUNCH [alarmed, fast]: "No! With only five the snap is unstable! It will only take—" | — | `footsteps`, heavy |
| 2-30 | 1.8 | LOOP_POSE | The cold-open picture, frame for frame | TOAST [nervous, fast, half a whisper]: "Is that guy about to—" | — | low held `sting`, music out |
| 2-31 | 1.0 | INSERT | Same as `0-2`: the snap | — | `SNAP` | `click` (loud, dry) |
| 2-32 | 1.2 | CARD | White flash 8 frames, fades back to the street. No text this time | — | — | boom 512389 |
| 2-33 | 2.0 | MED | Zip, mid-blur, turns into a yellow streak of confetti that keeps travelling for a metre before it settles | ZIP [very fast]: "Wai—" | — | `pop` + party honk (horn synth laugh, first 0.3 s) |
| 2-34 | 2.2 | MED | Thunder Gran, mid-stitch, puffs into purple confetti. Her knitting hangs for 6 frames, then the needles drop and bounce on the road | — | — | `pop`, pipe 164572 (at 1.0 s, as the needles land) |
| 2-35 | 1.8 | MED | The Sulk's back. He goes to grey confetti from the top down without turning round. The pile has its arms crossed for 4 frames | — | — | `pop`, grunt (`thud`, low) |
| 2-36 | 3.2 | MED | Brunch, arm still out, finishes his sentence as he goes, feet first. The pan drops and spins on the road like a coin | BRUNCH [resigned, finishing]: "—everyone who lives here." | — | `pop` on "here", pan ring (`ding`, long) |
| 2-37 | 3.4 | LOW | Lord Mitten looks at his own mitt as his legs turn to mustard confetti. Mildly annoyed, nothing more. The mitt goes last: a red puff and six small plinks | MITTEN [mildly annoyed]: "Ah." | top bar health `██████░░` drains to empty | `pop` (big), `tick` ×5, wah-wah 362206 (at 2.0 s) |
| 2-38 | 4.2 | WIDE | **The centre of the film: four seconds with no word and no music.** The empty battlefield. Confetti settling. One white cape floats down and lands over Toast's head. A tumbleweed of confetti rolls across, left to right. The top bar re-writes itself | — | `SERVER EMPTY — PLAYERS: 0 (+3 GUESTS)` | wind only; `tick` when the bar changes |
| 2-39 | 3.0 | MED | Toast lifts the cape off his face, cups his hands and calls. The echo comes back twice; the second echo is a 2D word that drifts off frame | TOAST [calling, hopeful]: "Hello?" | echo text `hello… hello…` | Toast's own line repeated at −8 dB and −16 dB with long reverb |
| 2-40 | 4.2 | MED | Our three stand exactly on `L`. The `GUEST` tags blink. Pixi has not changed her pose since `2-17` | TOAST [small voice]: "…Did we win?"<br>PIXI [deadpan]: "We were never here." | — | — |
| 2-41 | 2.4 | MED | A gold game pop-up drops from the top bar with a trophy icon. Toast does a small fist pump. Pixi pushes his fist back down with one finger | — | `ACHIEVEMENT UNLOCKED: SURVIVED BY ACCIDENT` | airhorn 581334 (first 1.0 s) |
| 2-42 | 3.2 | MED | Wind from the left. A stream of confetti blows across and into Toast's open hood (15 frames, clearly visible, nobody looks). Donutsaurus hiccups; his belly flashes pink for 4 frames | TOAST [guilty]: "Should we tell someone?" | — | wind, hiccup (`pop`, small) |
| 2-43 | 3.6 | MED | Pixi takes his wrist, turns the controller face up in his hand and taps START with her finger without pressing it | PIXI [firm, calm]: "There's no one to tell. Button. Now." | — | — |
| 2-44 | 1.6 | INSERT | Toast's thumb presses START | — | battery `▮▮ → ▮` | `click` (deep), `tick` |
| 2-45 | 2.2 | WIDE | Road tiles flip toward them. The white square opens; they are pulled up. The cape slides off Toast and is left lying on the road beside the frying pan | — | — | tile `tick`s, `pop` ×3 |
| 2-46 | 4.0 | CARD | Loading card | — | `JOINING SERVER… 99%` · `TIP: Guests are not affected by local disasters.` · battery `▮` | card ticks, `ding` |

**Button:** the tip is the punchline of the whole scene.

**New for this scene:** skyline backdrop and street set with halftone shadow pass · caption box, top
bar with health and `MAGNETS n/6` · 4 intro cards · scanner line and 3 power cards (one flips) · scorch
decal `XOXO GRAN` on the hoodie (stays on for the rest of the film) · velvet box and pedestal ·
heart-pupil eyes on Donutsaurus · hold-by-tail upside-down pose · per-character confetti puff in the
character's colour (Zip streak, Sulk top-down, Brunch feet-first) · echo text · achievement pop-up ·
confetti-into-hood particle stream. Existing: all five Cape City characters, mitt and magnets, confetti,
`GUEST` tags.

---

## Scene 3 — Cubelands

**Set:** flat ground of 1 m green cubes to the horizon, square sun, square clouds, far cube hills. One
cube tree `T` at x = +3, z = −1 (trunk 4 cubes high, crown 3×3×2). A Cubefolk hut far left
(x = −10, z = −8). The dark comes from the right edge (x = +8).
**Marks:** landing at x = 0 (Toast −0.6, Pixi +0.6, Donutsaurus 0, z = +0.8). Villager path: z = +0.4,
left to right. Hole `H` (one cube, dug in `3-31`) at x = −2, z = +0.4.
**Cast:** Toast, Pixi, Donutsaurus, one Cubefolk villager (straw hat; the same one all scene), Fuse Box ×1, then ×5.
**HUD:** hotbar of 9 empty slots (centre, 70–80% height), 10 hearts above it, day dial top-centre at
noon. `GUEST` tags. Controller battery: 1 bar.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 3-1 | 3.0 | WIDE | They drop onto the green cubes and land on their feet (Toast one beat late, on his face, then up). The Cape City top bar is still on screen for 10 frames, then pops off; hotbar, hearts and dial pop in | — | HUD swap · `GUEST` ×3 | `thud` ×3, `pop` ×3, `happy` in |
| 3-2 | 3.8 | MED | Toast, hands on hips, breathes in through his nose. Behind him the villager walks through frame left to right, arms straight out in front | TOAST [relieved, big exhale]: "Finally. Normal people."<br>CUBEFOLK [one flat syllable]: "Hm." | — | `footsteps` (blocky, slow) |
| 3-3 | 2.6 | MED | Toast points at the villager with both hands, proud of his point | TOAST [smug]: "See? Blocky. Like us." | — | — |
| 3-4 | 4.6 | MED | Pixi knocks the ground twice with the tail of her board. She bends her own elbow, looks at it, then at the villager's stiff arms. Toast folds his arms | PIXI [observing]: "They can't bend."<br>TOAST [jealous mutter]: "Show-off." | — | `thud` ×2 (hollow) |
| 3-5 | 2.6 | MED | Toast holds up a hand to the villager for a high five. The villager's whole straight arm swings round from the shoulder like a plank and bats Toast one full spin on the spot | CUBEFOLK [flat]: "Hm." | 2D burst `BONK` | `thud`, oof 438912 (at 0.9 s) |
| 3-6 | 2.0 | MED | Toast, still dizzy, sees tree `T`. His eyes go wide and shiny. He walks to it as if he has done this a thousand times | — | sparkle in the eyes | `ding` |
| 3-7 | 2.6 | INSERT | His fist on the trunk: three punches, a crack pattern grows on the cube with each. The cube pops out as a small spinning block and flies down into hotbar slot 1 | — | hotbar `WOOD ×1` | `thud` ×3, `pop`, `tick` |
| 3-8 | 2.6 | MED | Toast shakes out his hand, deeply satisfied | TOAST [satisfied sigh]: "I've always wanted to do that." | — | — |
| 3-9 | 3.0 | LOW | He looks up. The rest of the tree hangs in the air above the gap, perfectly still | TOAST [uneasy]: "…That's not right." | 2D arrow at the gap: `?` | dizzy 403002 (first 1.5 s) |
| 3-10 | 2.4 | MED | He punches out two more trunk cubes, fast. The crown and one trunk cube now float 3 m up with nothing under them | — | hotbar `WOOD ×3` | `thud` ×2, `pop` ×2, `tick` ×2 |
| 3-11 | 3.6 | INSERT | A 3×3 crafting grid opens by itself over the hotbar (`CRAFT?`). The three wood blocks slide into the middle column. The result slot fills: a blocky mop. It drops into Toast's hands | — | `WOOD + WOOD + WOOD = MOP` | `tick` ×3, `ding`, `pop` |
| 3-12 | 3.4 | MED | Toast stares at the cube mop in his hands, then at the sky. He throws it away over his shoulder. It stops 1.5 m up, where he let go, and hangs there | TOAST [betrayed]: "Even here?!" | — | wah-wah 362206 (at 1.6 s, first 1.2 s) |
| 3-13 | 3.0 | INSERT | The day dial at the top spins half a turn. Pull back to WIDE in the same shot: the square sun drops straight down like a stone and hits the horizon, the sky snaps to dark blue, a square moon pops up. Three seconds, start to finish | — | dial `NOON → NIGHT` | `tick` ×6 fast, `thud` (sun lands), `pop` (moon); music: `happy` cuts off, `tense` in |
| 3-14 | 4.2 | MED | Night lighting. Pixi looks at the moon; Toast looks at where the sun was, arms out | PIXI [calm]: "Toast. It's night."<br>TOAST [outraged]: "It was noon four seconds ago!" | — | — |
| 3-15 | 2.6 | WIDE | The dark right edge of the frame. Sound first, then two white dot eyes at x = +8. The ten hearts on the HUD shiver | — | — | steady hiss (low, flat), music drops to a single held note |
| 3-16 | 2.4 | MED | A lime-green gift box with a pink ribbon runs out of the dark on four tiny feet, straight at them, fuse on top sparkling | — | — | pitter-patter (`footsteps`, pitched up, fast), hiss continues |
| 3-17 | 4.8 | MED | Toast clasps his hands, melts, and kneels with his arms wide open. The box keeps coming | TOAST [melting, baby-talk]: "Aww. A present. It's running to us. It wants a hug." | — | hiss continues |
| 3-18 | 2.6 | MED | The box stops at his knees and looks up. It flashes pure white once. A beat. Twice. Toast's smile holds, a little less sure | — | — | `tick` on each flash, gap 0.8 s; music out |
| 3-19 | 2.4 | MED | Pixi takes one step back and puts a finger in each ear | PIXI [flat]: "That's not a hug." | — | hiss; `tick` (flash 3 starts, gap 0.4 s) |
| 3-20 | 2.0 | MED | Third flash. From the left side of frame Donutsaurus's head comes down over the box and swallows it whole. He sits | — | — | `pop` (gulp); the hiss does not stop, it goes muffled |
| 3-21 | 3.2 | MED | Three-shot. The hiss comes from inside Donutsaurus; his belly blinks white twice. Toast, still kneeling with open arms, and Pixi, fingers in ears, both look at the belly. Toast slowly puts his own fingers in his ears | — | — | muffled hiss, muffled `tick` ×2 |
| 3-22 | 2.2 | WIDE | Muffled boom. For 12 frames Donutsaurus is a perfect cube, eyes on one face, tail a small cube. Then he springs back to round with a wobble. The ground cubes around him hop 10 cm | — | 2D burst, small and polite: `boom` | boom 512389 (low-passed), `boing` |
| 3-23 | 3.0 | MED | Smoke comes out of his mouth, both nostrils and the hole of his donut. His eyes spin in opposite directions. A new item pops into hotbar slot 2, with an orange glow that matches a faint **orange** flicker now in his belly | — | hotbar `EXPLOSION ×1 (stored)` | `tick`, `ding` |
| 3-24 | 2.6 | CU | Donutsaurus holds it in: cheeks out, eyes watering, a tiny tremble. Toast's hand enters frame, palm up, "stay" | TOAST [whisper, pleading]: "Don't. Don't do it." | — | silence, one stomach gurgle (`dino_burp_short`, slowed, quiet) |
| 3-25 | 4.4 | WIDE | The longest burp of the film. Toast's hood blows flat back, Pixi's ponytail goes horizontal, the floating mop drifts a metre. A **square smoke ring** leaves his mouth and climbs | — | counter top-right `BURP: 0.0 → 3.5 s` · `NEW RECORD` | `dino_burp_monster` (463721, full 3.5 s) |
| 3-26 | 1.6 | INSERT | The square smoke ring reaches the square moon and hooks onto its corner like a ring toss | — | hearts row gains one: `+1 ♥` | `ding` |
| 3-27 | 4.0 | MED | Toast checks him over: lifts an eyelid, looks in an ear. Donutsaurus wags and laughs, bouncing. He loved it | TOAST [worried]: "Good boy? Are you okay?" | HA HA HA bubble | `dino_laugh_oldman` (166150, first 1.6 s) |
| 3-28 | 3.0 | WIDE | Hisses from the whole right side. Five pairs of dot eyes. Five gift boxes walk out of the dark in a neat row, fuses lit | — | counter `PRESENTS: 1 → 5` | steady hiss ×5 (layered), `tick` per box |
| 3-29 | 3.8 | MED | Donutsaurus licks his lips and lowers his chest to the ground like a cat about to pounce, back end wiggling. Toast steps in front of him, one finger up | TOAST [firm parent voice]: "No. No more spicy presents." | — | — |
| 3-30 | 4.2 | MED | Pixi lifts the controller out of Toast's raised hand. In the background, small but clear, the villager from `3-5` walks up behind them to x = −2 | PIXI [calm]: "Let's go before we get into trouble."<br>TOAST [baffled]: "Before?" | — | `footsteps` (blocky, slow, background) |
| 3-31 | 1.8 | INSERT | The villager, arms straight, taps the ground cube at `H` once. It pops out into his robe. A perfectly square, perfectly black hole | — | — | `thud`, `pop` |
| 3-32 | 3.2 | WIDE | Behind them one gift box jumps and knocks a cube out of the floating tree. The rest still hangs. Toast walks backwards toward x = −2 pointing up at it, not looking where he is going | TOAST [vindicated]: "See? Still not right! Nobody else is bothered by—" | — | `thud`, `pop` |
| 3-33 | 1.0 | MED | His back foot finds no ground. He hangs in the air for 6 frames, looks at camera, and drops | — | — | silence, `tick` |
| 3-34 | 1.2 | TOP | Straight down the square shaft: Toast falling away, arms up, getting small | TOAST [screaming]: "Fuuu—" | — | "Fuuu—" cut hard by the next shot |
| 3-35 | 1.6 | — | Fail screen over the hole. The ten hearts empty one by one | — | **TOASTED!** · hearts `10 → 0` | `crash` + `stamp`, `pop` ×10 fast |
| 3-36 | 2.8 | MED | The villager places the ground cube back on the hole like a lid, pats it flat with a stiff arm and, for the only time, turns his head to camera | CUBEFOLK [satisfied]: "Hm." | — | `thud`, bruh 704942 (at 1.4 s) |
| 3-37 | 3.2 | MED | Pixi crouches, lifts the lid cube with one finger and speaks into the hole. She holds the controller over it | PIXI [deadpan, into the hole]: "Found the trouble." | — | Toast, muffled from below: one groan (his "Okay" from `0-4`, low-passed) |
| 3-38 | 1.6 | INSERT | Her thumb presses START. The battery icon loses its last bar; a red light starts to blink | — | battery `▮ → ▯` · `LOW BATTERY` | `click` (deep), `tick` ×2 (low) |
| 3-39 | 2.2 | WIDE | Ground cubes flip toward them. The white square opens. Toast shoots up out of the hole like a cork and passes Pixi and Donutsaurus on the way up. The villager waves, the whole arm from the shoulder | — | — | tile `tick`s, `pop` ×3 |
| 3-40 | 4.0 | CARD | Loading card. The bar hesitates twice | — | `JOINING SERVER… 99%` · `TIP: Low battery. Please do not travel between universes.` · battery `▯` blinking red | card ticks, `ding` |

**Button:** villager lid + "Hm." + bruh, then Pixi's line, then the tip.

**New for this scene:** cube world set (ground, tree, sun, moon, clouds, hut) · hotbar / hearts / dial
HUD with item pop-in · block-break crack overlay and flying mini-block · floating blocks (no gravity
on set pieces) · crafting grid overlay and **cube mop** prop that hangs where released · sun-drop
day/night switch (3 s) · Fuse Box white flash and steady hiss loop · **cube Donutsaurus** (12-frame
box morph with squash back) · smoke from four openings, spinning eyes · **square smoke ring** · burp
length counter · one-cube hole with shaft (TOP view) and lid · villager head-turn. Existing: Fuse Box,
Cubefolk with straw hat, fail screen.

---

## Scene 4 — Turbo City

**Set:** a six-lane avenue running left–right at neon sunset, palms, wet reflective asphalt. Lanes at
z = −3.75, −2.25, −0.75 (traffic right-to-left) and +0.75, +2.25, +3.75 (left-to-right). White centre
line at z = 0. Near pavement z = +6, far pavement z = −6.
**Marks:** landing on the white line: Toast x = −0.8, Pixi x = +0.8, Donutsaurus x = 0 with his tail
lying across the lane at z = −0.75. Near pavement: zebra crossing with a sign `CROSS HERE →` at
x = −6; hot-dog stand with a vendor at x = −3; a row of 11 parked police bikes from x = +1 to +6.
Far corner (x = +14, z = −9): a convertible and **The Main Characters**, always in golden light, always
in slow motion.
**Cast:** Toast, Pixi, Donutsaurus, The Main Characters (silhouettes), a vendor, one policeman on foot
(near pavement, x = +0.5), a pigeon, drivers (cars only).
**HUD:** round minimap bottom-left, `ALARM ○○○○○` (five donut outlines) top-right, cash `$0` under it.
`GUEST` tags. Controller battery: empty, red light blinking.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 4-1 | 3.0 | WIDE | They drop onto the white line and land standing. Cars cross at full speed in front of them and behind them, both directions. Cubelands hotbar pops off; minimap, alarm meter and cash pop in | — | HUD swap · `GUEST` ×3 | `thud`, `pop` ×3, `tense` (synth) in; car passes = short low `impact`s |
| 4-2 | 5.2 | MED | Four cars pass close, alternating in front and behind. Each one spins Toast half a turn, so every piece of his line is said facing a different way. Pixi's ponytail flicks; she does not move | TOAST [dizzy, chopped by each car]: "Why— is every— body— in a— hurry?!" | — | car pass ×4 (`impact`, short), dizzy 403002 (at 3.4 s, first 1.5 s) |
| 4-3 | 3.2 | TOP | Straight down: three small figures on a white line, traffic as coloured streaks. Donutsaurus's tail lies in a lane; each car that reaches it jumps it like a ramp and lands | PIXI [calm, low]: "Don't move." | minimap shows three grey dots on a line | `boing` ×3, `thud` ×3 |
| 4-4 | 4.2 | WIDE | Long lens to the far corner. Golden light, slow motion: two silhouettes in sunglasses lean on a convertible. A glowing arrow over each. Behind them a building front explodes. They do not look | — | `MAIN CHARACTER` · `MAIN CHARACTER` | traffic ducked to near silence; one slow deep `impact`; music at half tempo for this shot only |
| 4-5 | 3.4 | MED | Back on the line, normal speed. Toast shades his eyes | TOAST [awed]: "Who are they?"<br>PIXI [flat]: "The main characters." | — | traffic and music back |
| 4-6 | 3.4 | MED | Toast waves both arms over his head at the far corner. A passing car's door opens and takes him out of frame to the right. Pixi's eyes follow, nothing else | TOAST [shouting, friendly]: "Hi! We're main characters too! In our own—" | 2D burst `DOOR` | `thud`, oof 438912 (at 2.6 s) |
| 4-7 | 3.2 | WIDE | Pixi and Donutsaurus wait. Both heads turn slowly from right to left, tracking something going round the block. Toast re-enters from the left, sitting cross-legged on the roof of a yellow taxi, arms folded, dignity intact | — | taxi roof sign `$4.50` · HUD cash `$0 → −$4.50` | `tick` ×4 (the meter), `ding` |
| 4-8 | 2.8 | MED | The taxi slows at the near kerb. Toast steps off its roof onto the pavement at x = −4, two metres to the right of the zebra crossing and its sign | — | sign in frame: `CROSS HERE →` | `thud`, `bell` |
| 4-9 | 2.6 | INSERT | The alarm meter, top-right. The first donut outline fills in with pink icing | TOAST (off) [outraged]: "For walking?!" | `ALARM ●○○○○ — JAYWALKING` | `tick`, `stamp` (small) |
| 4-10 | 3.2 | MED | Pixi and Donutsaurus cross on the zebra, correctly. Donutsaurus stops at the hot-dog stand and inhales it: sausages, cart, wheels, umbrella last. The vendor is left holding his tongs | — | `ALARM ●●○○○ — SNACK THEFT` | `pop` ×4 rising, `dino_burp_short`, `tick` |
| 4-11 | 4.6 | MED | Toast hurries to the first parked police bike to explain, and pats its seat. It tips. All eleven go down in a line, away from camera | TOAST [very polite]: "So sorry, officer, he's just a guest—" | `ALARM ●●●○○ — DOMINOES` | `thud` ×11 (even rhythm), pipe 164572 (at 3.6 s, the last bike), `tick` |
| 4-12 | 2.6 | LOW | A helicopter overhead; a hard white circle of light slides along the pavement and stops on the three of them | — | `ALARM ●●●●○ — BEING NOTICED` | blade chop (`thud`, soft, looped at 8 per second), `sting` |
| 4-13 | 3.6 | WIDE | A tank comes round the far corner, its orange indicator blinking, and waits for a gap in the traffic before it pulls out | TOAST [pleading, to the whole city]: "We said sorry!" | `ALARM ●●●●● — STILL HERE` | indicator `click` … `click` … `click` (the only loud thing), `tick` |
| 4-14 | 3.0 | TOP | Surrounded: a ring of cars and bikes around the three, the spotlight on them, the tank's barrel entering frame from the top with a small flag on it reading `HI` | — | minimap: three grey dots inside a red ring | `tense` at full volume |
| 4-15 | 3.8 | MED | Pixi, lit from above. Far behind her, between two police cars, the two silhouettes are still walking in slow motion, still not looking | PIXI [decisive, quiet]: "Too crowded. We're going home." | — | — |
| 4-16 | 2.4 | MED | Toast raises the controller over his head like a trophy and presses START. Nothing. Presses again. Brings it down and presses with his nose | — | — | `click` ×3 (dry, dead) |
| 4-17 | 2.0 | INSERT | The battery icon: empty, the red light blinking | — | `▯` · `0%` | `tick` (low), wah-wah 362206 (first 1.4 s) |
| 4-18 | 5.2 | MED | Toast shows her the dead controller. Pixi looks at it for exactly one second | TOAST [flat panic]: "It's dead."<br>PIXI [calm]: "It needs charging."<br>TOAST [panic rising]: "With what? We don't have a—" | — | — |
| 4-19 | 3.4 | MED | Both turn their heads slowly to Donutsaurus. He is chewing the hot-dog umbrella. His belly flickers **orange**. The Cubelands hotbar flickers back on screen for one second with slot 2 lit | — | hotbar `EXPLOSION ×1 (stored)` | `tick`, `ding` |
| 4-20 | 2.2 | MED | Pixi points at the dinosaur without looking at him | PIXI [calm]: "Hold it to his mouth." | — | — |
| 4-21 | 3.4 | MED | Toast, flustered, holds the controller to the nearest end of the dinosaur, which is the tail end, and tickles. One small puff; his hood blows back; the battery icon flickers and stays empty | — | battery `▯ … ▯` | fart 249583 (at 1.6 s) |
| 4-22 | 2.4 | MED | Toast, frozen, hood flat back, not blinking. Pixi, not blinking | PIXI [deadpan]: "Other end." | — | spotlight hum only |
| 4-23 | 3.2 | MED | Toast goes round to the front, holds the controller to the mouth and tickles under the chin. A giggle, then one small burp with a blue-and-orange spark that jumps into the controller | — | — | `dino_laugh_squeak` (0.4 s), `dino_burp_short` + `magic` |
| 4-24 | 1.8 | INSERT | Battery: one bar, green. START glows white. In the corner of the screen the hotbar item drains | — | battery `▯ → ▮` · hotbar `EXPLOSION ×0` | `ding` |
| 4-25 | 1.4 | INSERT | Toast's thumb on START | — | — | `click` (deep) |
| 4-26 | 4.2 | WIDE | **Everything freezes.** A car hangs in the air over the tail, the helicopter's blades stop, the indicator stays lit, a pigeon stops mid-flap, the colour drains to 20%. Only our three move. Toast pokes the hanging car with one finger; it rocks and stops | — | — | scratch 71853, music cut; then room tone only |
| 4-27 | 3.8 | MED | A pause menu slides down in front of the grey world, row by row | TOAST [amazed whisper]: "Whoa. It's a pause button." | `PAUSED` · `RESUME` · `OPTIONS` · `CHANGE SERVER` · `RETURN TO MY UNIVERSE` · `QUIT GAME` | `tick` per row; quiet lift-music loop (`happy`, low-passed, half volume) |
| 4-28 | 3.0 | INSERT | Toast's real finger is the cursor, in front of the menu. It drifts down past every row and stops over `QUIT GAME`. Pixi's hand slaps it away | PIXI [sharp, quiet]: "Not that one." | row under the finger highlights | `tick` ×5, `thud` (slap) |
| 4-29 | 3.6 | MED | Toast rubs his hand. Behind them a square of sky flickers to black and back | TOAST [curious]: "What does it quit?"<br>PIXI [deadpan]: "Everything." | — | lift music skips one beat |
| 4-30 | 2.2 | INSERT | His finger goes back up, overshoots and lands on `OPTIONS`. A sub-menu opens with one switch | — | `BIG HEAD MODE: OFF → ON` | `click` |
| 4-31 | 3.0 | WIDE | Every head in the frozen street triples in size: drivers through sunroofs, the vendor, the pigeon, the tank commander out of his hatch, both far silhouettes (sunglasses scale with them), and our three | — | — | `boing` (one, big), airhorn 581334 (at 0.4 s, first 1.0 s) |
| 4-32 | 3.2 | MED | Toast's giant head tips him forward; he holds it up with both hands and jabs the switch with his elbow. Heads snap back. Pixi's face did not change at any size; now she gives one short snort | TOAST [embarrassed]: "Sorry. Sorry." | `BIG HEAD MODE: OFF` | `pop`, swanee down 497093 (at 1.6 s), Pixi laugh 344001 (first 0.5 s, at 2.6 s) |
| 4-33 | 4.4 | WIDE | Toast walks through the frozen world toward the menu's last row, which hangs over the pavement: he ducks under the hanging car, straightens the frozen policeman's hat, boops the frozen pigeon so it tilts 10° | — | — | `footsteps` (alone in the silence), `click` (hat), `tick` (pigeon) |
| 4-34 | 2.8 | INSERT | His finger on `RETURN TO MY UNIVERSE`. A box opens | — | `Are you sure? Unsaved chaos will be lost.` · `YES` / `NO` | `ding` |
| 4-35 | 2.6 | MED | Toast presses `YES` with his whole palm, eyes shut | TOAST [heartfelt]: "Yes. So much yes." | — | `click` |
| 4-36 | 3.2 | WIDE | Avenue tiles flip toward them; colour comes back. At the far corner the two silhouettes turn their heads to the white light for the first time; one lowers his sunglasses. The glowing arrows over them flip over | — | `MAIN CHARACTER` → `SIDE CHARACTER` (both arrows) | tile `tick`s, bruh 506582 (at 2.0 s), `pop` ×3 |
| 4-37 | 4.0 | CARD | Loading card | — | `RETURNING… 99%` · `TIP: Next time, read the note.` · battery `▮` | card ticks, `ding` |

**Button:** the arrows flipping to `SIDE CHARACTER`, then the tip.

**New for this scene:** avenue set with reflections, palms, neon · traffic system (cars on six lanes,
ramp-jump over the tail, door-open hit) · minimap, alarm meter with offence labels, cash · long-lens
slow-motion corner with silhouettes, convertible, explosion, flipping arrow labels · taxi with roof
meter · zebra crossing and sign · hot-dog stand and vendor · 11 police bikes with domino fall ·
helicopter with spotlight · tank with indicator and `HI` flag · policeman with hat, pigeon · **world
freeze** (all animated values stopped except our three, saturation 20%) · pause menu and `OPTIONS`
sub-menu, confirm box · **Big Head Mode** (head scale ×3 on every rig in the scene) · spark from burp
into controller. Existing: cars, controller, pause menu base.

---

## Scene 5 — Home

**Set:** Donut Planet exactly as left in `1-18`: the mop standing on its own at `M`, sock, tooth and
empty box on the counter, clock 5:59, a tray of six glazed donuts on the counter at x = +1.5.
**Marks:** landing at x = 0, z = +1. The Admin's hand comes down over the counter at x = −1.
Confetti pile at `C` (x = +1, z = +1.5). Heroes re-form in an arc behind `C`: Zip x = −0.5,
Gran x = +0.4, Brunch x = +1.4, The Sulk x = +2.6 (back to camera), Lord Mitten x = +4, bent under the
ceiling.
**Cast:** Toast (hoodie still scorched `XOXO GRAN`), Pixi, Donutsaurus, The Admin, Captain Brunch,
Thunder Gran, Zip, The Sulk, Lord Mitten.
**HUD:** `NIGHT 8 (UNATTENDED)`, coin counter `● 1`. Controller battery: 1 bar.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| 5-1 | 3.0 | WIDE | The white square in the ceiling. They drop into the shop: Pixi on her feet, Donutsaurus on his, Toast flat on the tiles. The mop is still standing. Clock 5:59 | — | HUD `NIGHT 8 (UNATTENDED)` → `NIGHT 8` | `thud` ×3, `mischief` (slow, warm) |
| 5-2 | 5.0 | MED | Toast kisses tile `M` with a loud smack, then gets up on his knees and hugs the mop. The mop leans into the hug | TOAST [emotional]: "Pink tiles. I missed you."<br>TOAST [grudging, to the mop]: "…You too. A little." | — | kiss (`pop`) |
| 5-3 | 1.6 | INSERT | The clock flips from 5:59 to 6:00. A shadow slides across the clock face from above | — | `6:00` | `tick`, music stops |
| 5-4 | 3.6 | WIDE | The Admin's hand is already there over the counter, index finger tapping slowly on the lost-and-found box, which is empty | ADMIN [bored, deep]: "Where is my controller." | — | `thud` ×3 (slow taps) |
| 5-5 | 3.0 | MED | Toast stands in front of the hand with both arms behind his back. Reverse angle in the same shot (camera swings 90° to his side): the controller in his hands is covered in pink icing with a hot-dog bun stuck to it, and Donutsaurus is licking it | TOAST [too innocent]: "What controller?" | — | licking (`pop`, small ×2) |
| 5-6 | 2.6 | MED | The hand turns over, palm up, and waits. Toast peels the bun off, hesitates, puts the bun in the palm first. The finger does not move. He puts the controller on top | — | — | `pop` (squelch), `thud` (soft) |
| 5-7 | 5.6 | INSERT | The controller's little screen. A list scrolls up one line at a time, each with a tiny icon (confetti, a cube, five donuts, a big head) | ADMIN [reading, flat]: "Play history. Three servers. One emptied. One explosion, internal." | `PLAY HISTORY` · `SERVERS VISITED: 3` · `EMPTIED: 1` · `EXPLOSIONS (INTERNAL): 1` | `tick` per line |
| 5-8 | 4.0 | MED | Toast shrinks 5% with every item. Pixi takes one step sideways away from him on each one. Donutsaurus looks proud | ADMIN [flat]: "Five alarm donuts. And Big Head Mode." | list continues: `ALARM: ●●●●●` · `BIG HEAD MODE: USED` | `tick` ×2 |
| 5-9 | 4.8 | MED | Toast, small, one finger up. The Admin's finger comes down and rests on top of his head | TOAST [weak]: "That was an accident."<br>ADMIN [flat]: "All of it was an accident." | — | bruh 704942 (at 3.8 s) |
| 5-10 | 2.6 | MED | Toast scratches his head under the finger. A pinch of confetti falls out of his hood. He scratches again: more | — | — | `tick` ×2 |
| 5-11 | 3.8 | MED | He pulls the hood forward and shakes it. A stream of coloured confetti pours out for two full seconds and piles up at `C`, knee high | PIXI [slow suspicion]: "Toast. What's in your hood." | — | pouring (many soft `tick`s) |
| 5-12 | 2.8 | MED | Donutsaurus hiccups twice (pink belly flash each time) and coughs up the pink donut magnet. It rolls across the tiles in a curve and tips over into the pile. The pile starts to glow | — | — | `pop` ×2, `pop` (cough), `tick` ×3 (rolling), `magic` |
| 5-13 | 5.2 | WIDE | The confetti rebuilds them one by one, in their own colours, left to right: Zip (already vibrating), Gran (knitting in hand), Brunch (arm out, pointing), The Sulk (back turned, arms crossed) and, last and largest, Lord Mitten, who rises until his head hits the ceiling and the lamp swings | — | — | `pop` ×4 (each a step higher, separate notes), boom 512389 (at 3.8 s, Mitten), `thud` (ceiling) |
| 5-14 | 3.4 | MED | Brunch finishes his sentence at full volume, then follows his own arm with his eyes to what he is pointing at: one glazed donut on the tray. The arm droops | BRUNCH [heroic, finishing]: "—everyone who lives here!" | — | swanee down 497093 (at 2.4 s) |
| 5-15 | 2.4 | WIDE | The five newcomers look around the pink shop. Tags pop up over their heads | — | `GUEST` ×5 · HUD `NIGHT 8 — CUSTOMERS: 5` | `pop` ×5 |
| 5-16 | 4.2 | MED | Lord Mitten, head bent under the ceiling, lamp resting against his ear. Pixi beside his shin, not looking up | MITTEN [lost, calm]: "…Where is this?"<br>PIXI [flat]: "Night shift." | — | lamp creak (`door`) |
| 5-17 | 4.6 | MED | Mitten leans down to the rule sign and reads it slowly, one mitt finger under the words | MITTEN [reading slowly]: "Do not feed the mascot after three A.M." | sign, rule 1 readable | `ding` |
| 5-18 | 1.2 | CRASH | Donutsaurus at Mitten's feet, staring at the oven mitt. Heart pupils. Drool | — | — | `boing` |
| 5-19 | 2.8 | MED | Mitten slowly moves the mitt behind his own back and stands a little straighter | MITTEN [meek]: "…Understood." | — | — |
| 5-20 | 2.2 | INSERT | Donutsaurus, denied the mitt, turns his head to the floor, finds the donut magnet lying beside the last of the confetti, and eats it again | — | small HUD flag from Cape City pops back for 1 s: `MAGNETS 5/6` | `pop` (gulp), wah-wah 362206 (at 0.8 s, first 1.2 s) |
| 5-21 | 3.4 | INSERT | The Admin's finger writes a new line on the rule sign under rule 7, in the same red | — | `RULE #8: NO SUPERHEROES AFTER 3 AM.` | pen scratches (`tick` ×6), `ding` |
| 5-22 | 3.2 | MED | The hand turns and points at Toast. A red ban stamp slams across him, rotated −8° | ADMIN [bored]: "Banned: Toast's weekends." | stamp `BANNED: TOAST'S WEEKENDS` | `stamp` |
| 5-23 | 2.0 | CU | Toast under the stamp, mouth opening. The scream is cut at 0.5 s by the fail screen, which holds 1.2 s | TOAST [screaming]: "Fuuu—" | **TOASTED!** | "Fuuu—" cut hard by `crash` + `stamp` |
| 5-24 | 3.0 | WIDE | Colour back. The five form a queue at the counter: Gran first, then Brunch, The Sulk (facing away from the counter), Lord Mitten last, bent double. Toast is behind the counter in an apron over the scorched hoodie. Zip is a vibration at the back | — | coin counter `● 1` | `bell`, `mischief` back in |
| 5-25 | 5.0 | MED | Thunder Gran at the counter, purse open, looking past Toast at Donutsaurus. Donutsaurus backs away and hides behind Pixi's legs | GRAN [sweet, slow]: "Six glazed, dear. And is the dinosaur for sale?" | — | — |
| 5-26 | 2.6 | MED | A yellow blur crosses the counter. All six donuts on the tray are gone; seven coins spin on the counter where they were | ZIP [very fast]: "Paid— bye." | coin counter `● 1 → ● 8` | `pop` ×6 (one burst), `tick` ×7 |
| 5-27 | 2.4 | MED | Gran looks at the empty tray. Toast looks at the empty tray. Toast slowly reaches for the mop | GRAN [sweet, unchanged]: "I'll wait, dear." | — | `bell` |

**Button:** Zip has already bought everything; Gran will wait; Toast reaches for the mop. Night 8 goes on.

**New for this scene:** icing + hot-dog bun dress on the controller · `PLAY HISTORY` screen with icons ·
shrink-per-item on Toast · confetti pour from the hood and pile at `C` · magnet cough, roll and glow ·
**confetti-rebuild** (the puff run backwards per character, in colour) · Mitten bent-under-ceiling pose
(lamp contact) · Admin finger writing rule 8 on the sign · stamp `BANNED: TOAST'S WEEKENDS` · apron on
Toast · queue marks · coin spin. Existing: shop, Admin hand, rule sign, ban stamp, fail screen, lamp.

---

## Scene E — End card and loop

**Set:** Donut Planet, continuous from `5-27`.
**Cast:** Pixi, the queue (Gran, Brunch, The Sulk, Lord Mitten), Toast, Donutsaurus, The Admin's hand.
**HUD:** `NIGHT 8 — CUSTOMERS: 5`, coin counter `● 8`. Subscribe button and end-screen slots in `E-1`, `E-2`.

| # | Dur | Camera | Action | Line | Text / gag | Sound |
| --- | --- | --- | --- | --- | --- | --- |
| E-1 | 7.0 | MED | Pixi rolls into the foreground on her board (to x = −2.5, z = +3) and talks to camera. Behind her the queue waits. High in the background The Admin's hand hangs with the controller between two fingers; its little screen is readable | PIXI [dry, to camera]: "Which server should we break next? Comment. Subscribe, or The Admin bans your weekends too." | subscribe button bottom-right · controller screen `NEXT SERVER ▸ DROP ISLAND` | `mischief` (full) |
| E-2 | 6.0 | WIDE | The shop keeps living under the end screen: logo top-left, two video slots at the right (x from 60% to 96% of the frame). In the free left half: Toast mops tile `M`; the counter ticks; the queue shuffles forward one place, so Lord Mitten is now at the counter, with nobody behind it | — | **TOAST & PIXI** logo · two end-screen slots · counter `SAME TILE: 4,114 → 4,115` | `mischief`, `tick` ×2 |
| E-3 | 4.0 | MED | Lord Mitten at the counter, bent under the ceiling. He looks left. Right. Nobody is serving. He raises the oven mitt beside his head to snap his fingers for service. The five magnets light, one by one | MITTEN [calm, polite]: "Service." | — | music thins to low strings; `ding` ×5 (separate notes) |
| E-4 | 1.6 | MED | Pixi, on her board, sees the mitt go up. Same pose and same word as `1-8` | PIXI [flat]: "Don't." | — | music out |
| E-5 | 1.0 | LOOP_POSE | Toast's head rises into the lower-left foreground, mop handle just visible; the mitt above fills the frame; the glow burst covers the shop. The shot ends on **frame 0 of the pose** (head in profile, mouth just opening) | TOAST [nervous, fast, half a whisper]: "Is that—" | cut on "that—"; last frame = first frame of `0-1` | low held `sting` (the same one that opens `0-1`, so it runs across the loop) |

**Loop:** `E-5` cuts on "Is that—" at pose frame 0; the replay starts on the same picture and the
same held `sting` with the full line "Is that guy about to—", the snap, and `WRONG SERVER`. On the first
viewing the cold open is a flash-forward to Cape City; on the loop it is Lord Mitten ordering donuts.
The five lit magnets and the empty donut socket match because Donutsaurus ate the magnet again in `5-20`.

**New for this scene:** end-screen layout with a live shop behind · controller screen text
`NEXT SERVER ▸ DROP ISLAND` · Mitten "raise mitt beside head" pose that blends into `LOOP_POSE`.

---

## 7. Changes from the outline (and why)

| Change | Reason |
| --- | --- |
| Cold open shows **five** lit magnets and an empty donut socket, not six | Continuity with `2-28` ("Five will have to do") and with the loop |
| The film ends on Lord Mitten snapping for service (`E-3` to `E-5`) instead of Donutsaurus sitting on START; the Drop Island tease moved to the controller screen in `E-1` | The brief asks for a seamless loop back to the cold-open image; the tease survives as a readable prop |
| The Fuse Box hiss is steady, not rising | Bible sound rule: no risers. Tension comes from the flash rhythm (0.8 s, 0.4 s gaps) |
| The square hole is dug by the villager Toast annoyed (`3-5`, `3-30`, `3-31`), who then puts the lid back | Bible: every beat is caused by the one before; the outline's hole "was not there before" for no reason |
| Belly glow has two colours: pink = magnet, orange = stored explosion | So the two set-ups do not read as one |
| Donutsaurus eats the magnet again (`5-20`) | Needed for the loop, and it is his character |
| New beats: `SAME TILE` counter, "ask The Admin", `POWER: MOP (WEAK)`, autograph zap, duck shake, "Hello?" echo, achievement pop-up, plank high five, crafting a mop, burp record, taxi fare, wrong end, `SIDE CHARACTER`, Zip buys everything | Jokes that serve the spine (Toast wants a night with no mop; guests break worlds by accident) |

## 8. Meme and scream placement (for the mix)

- boom 512389: `0-3`, `2-32`, `3-22` (low-passed), `5-13`.
- scratch 71853: `2-2`, `4-26` (both are "the music stops").
- swanee up 497092: `1-16`. swanee down 497093: `2-8`, `4-32`, `5-14` (always a droop).
- dizzy 403002: `3-9`, `4-2`. oof 438912: `2-18`, `3-5`, `4-6` (always Toast getting hit).
- airhorn 581334: `0-8`, `2-41`, `4-31`. wah-wah 362206: `1-11`, `2-14`, `2-26`, `2-37`, `3-12`, `4-17`, `5-20`.
- bruh 704942 / 506582: `1-18`, `2-23`, `3-36`, `4-36`, `5-9`. fart 249583: `4-21` (once in the film).
- pipe 164572: `2-34` (Gran's needles), `4-11` (last police bike).
- Toast's "Fuuu—": `3-34`, `5-23`. Nowhere else.
- Library laughs and burps: Toast 697900 (`2-6`), Pixi 344001 (`4-32`, her only laugh in the film),
  `dino_laugh_oldman` (`3-27`), `dino_burp_monster` (`3-25`), `dino_burp_short` (`2-27`, `3-24`, `4-10`, `4-23`),
  `dino_laugh_squeak` (duck and steps in `1-6`, `1-16`, `2-21`, `2-26`; giggle in `4-23`).
- Music map: `mischief` (scene 1, scene 5, end card) · `epic` (`2-1`, `2-7` to `2-20`, `2-28`) · silence
  (`2-21` to `2-27`, `2-30` to `2-46`) · `happy` (`3-1` to `3-12`) · `tense` (`3-13` to `3-17`, `4-1` to `4-25`) ·
  silence or lift music (`4-26` to `4-37`). Every music change is a hard cut on a picture event.

## 9. Runtime check (summed from the tables)

| Scene | Shots | Runtime (s) | Starts at | Chapter |
| --- | --- | --- | --- | --- |
| 0 Cold open | 9 | 15.1 | 0:00 | — |
| 1 Home: the box | 19 | 58.6 | 0:15 | The box |
| 2 Cape City | 46 | 136.0 | 1:13 | Cape City |
| 3 Cubelands | 40 | 114.8 | 3:29 | Cubelands |
| 4 Turbo City | 37 | 119.2 | 5:24 | Turbo City |
| 5 Home | 27 | 90.0 | 7:23 | Home |
| E End card and loop | 5 | 19.6 | 8:53 | — |
| **Total** | **183** | **553.3 = 9:13** | | |

Checks run on the tables: 33 meme cues, the closest two are more than 3 s apart; "Fuuu—" twice;
TOASTED! twice; CRASH once in scene 2 and once in scene 5; every line fits its shot at 3.2 words per
second or slower, except the loop line (said fast on purpose) and `2-17` (two voices overlap on purpose).
If a recorded line runs long, lengthen that shot; do not cut the line.

## 10. Lines in recording order (generated from the tables; the tables are the master)

The loop line "Is that guy about to—" is **one recording** used in `0-1` and `2-30`; `E-5` is the same
recording cut after "that". Record "Fuuu—" once as a long "Fuuuuu" and cut it at 0.5 s. Lines that end
in a dash are recorded with the next word and cut on the dash.

**TOAST** (55)

1. `0-1` [nervous, fast, half a whisper] "Is that guy about to—"
2. `0-4` [sheepish, too casual] "Okay. That one was a little bit our fault."
3. `1-2` [flat, exhausted] "Night eight. Of forever."
4. `1-4` [pleading] "Pixi. I want one night off. Just one."
5. `1-5` [whisper, scared] "I am not asking The Admin."
6. `1-6` [bored, listing] "Sock. Tooth. Duck."
7. `1-6` [intrigued] "…Ooh."
8. `1-8` [innocent] "I'm not touching it. I'm holding it."
9. `1-10` [scheming, building up] "It's a remote. Maybe it changes the channel. Maybe there's a channel with no mop."
10. `1-15` [thrilled panic] "It's doing something! Is it doing the right something?"
11. `1-17` [yelling, fading upward] "I regret holding iiit—"
12. `2-6` [delighted] "A costume party!"
13. `2-8` [curious] "Which one?"
14. `2-8` [helpful] "We have a different one."
15. `2-13` [hopeful] "Do we get powers?"
16. `2-15` [offended] "None? I can mop!"
17. `2-17` [loud whisper] "Can you sign it 'to Toast'? T, O, A—"
18. `2-25` [confident] "Hang on. I've got this."
19. `2-27` [apologetic, babbling] "He does that. Sorry. He'll… return it. Tomorrow. Probably."
20. `2-30` [nervous, fast, half a whisper] "Is that guy about to—"
21. `2-39` [calling, hopeful] "Hello?"
22. `2-40` [small voice] "…Did we win?"
23. `2-42` [guilty] "Should we tell someone?"
24. `3-2` [relieved, big exhale] "Finally. Normal people."
25. `3-3` [smug] "See? Blocky. Like us."
26. `3-4` [jealous mutter] "Show-off."
27. `3-8` [satisfied sigh] "I've always wanted to do that."
28. `3-9` [uneasy] "…That's not right."
29. `3-12` [betrayed] "Even here?!"
30. `3-14` [outraged] "It was noon four seconds ago!"
31. `3-17` [melting, baby-talk] "Aww. A present. It's running to us. It wants a hug."
32. `3-24` [whisper, pleading] "Don't. Don't do it."
33. `3-27` [worried] "Good boy? Are you okay?"
34. `3-29` [firm parent voice] "No. No more spicy presents."
35. `3-30` [baffled] "Before?"
36. `3-32` [vindicated] "See? Still not right! Nobody else is bothered by—"
37. `3-34` [screaming] "Fuuu—"
38. `4-2` [dizzy, chopped by each car] "Why— is every— body— in a— hurry?!"
39. `4-5` [awed] "Who are they?"
40. `4-6` [shouting, friendly] "Hi! We're main characters too! In our own—"
41. `4-9` [outraged] "For walking?!"
42. `4-11` [very polite] "So sorry, officer, he's just a guest—"
43. `4-13` [pleading, to the whole city] "We said sorry!"
44. `4-18` [flat panic] "It's dead."
45. `4-18` [panic rising] "With what? We don't have a—"
46. `4-27` [amazed whisper] "Whoa. It's a pause button."
47. `4-29` [curious] "What does it quit?"
48. `4-32` [embarrassed] "Sorry. Sorry."
49. `4-35` [heartfelt] "Yes. So much yes."
50. `5-2` [emotional] "Pink tiles. I missed you."
51. `5-2` [grudging, to the mop] "…You too. A little."
52. `5-5` [too innocent] "What controller?"
53. `5-9` [weak] "That was an accident."
54. `5-23` [screaming] "Fuuu—"
55. `E-5` [nervous, fast, half a whisper] "Is that—"

**PIXI** (24)

1. `1-4` [deadpan, not looking] "Ask The Admin."
2. `1-8` [flat] "Don't."
3. `1-12` [warning, low] "Toast."
4. `2-6` [flat] "That's not a costume party."
5. `2-21` [quiet, certain] "Oh no."
6. `2-40` [deadpan] "We were never here."
7. `2-43` [firm, calm] "There's no one to tell. Button. Now."
8. `3-4` [observing] "They can't bend."
9. `3-14` [calm] "Toast. It's night."
10. `3-19` [flat] "That's not a hug."
11. `3-30` [calm] "Let's go before we get into trouble."
12. `3-37` [deadpan, into the hole] "Found the trouble."
13. `4-3` [calm, low] "Don't move."
14. `4-5` [flat] "The main characters."
15. `4-15` [decisive, quiet] "Too crowded. We're going home."
16. `4-18` [calm] "It needs charging."
17. `4-20` [calm] "Hold it to his mouth."
18. `4-22` [deadpan] "Other end."
19. `4-28` [sharp, quiet] "Not that one."
20. `4-29` [deadpan] "Everything."
21. `5-11` [slow suspicion] "Toast. What's in your hood."
22. `5-16` [flat] "Night shift."
23. `E-1` [dry, to camera] "Which server should we break next? Comment. Subscribe, or The Admin bans your weekends too."
24. `E-4` [flat] "Don't."

**BRUNCH** (7)

1. `2-1` [heroic shout] "For the universe!"
2. `2-7` [booming] "Citizens! Stand back! This is the final battle for the universe!"
3. `2-8` [thrown] "…The universe."
4. `2-13` [proud] "Everyone here has a power."
5. `2-29` [alarmed, fast] "No! With only five the snap is unstable! It will only take—"
6. `2-36` [resigned, finishing] "—everyone who lives here."
7. `5-14` [heroic, finishing] "—everyone who lives here!"

**ZIP** (3)

1. `2-11` [very fast] "Hi— bye."
2. `2-33` [very fast] "Wai—"
3. `5-26` [very fast] "Paid— bye."

**MITTEN** (10)

1. `2-16` [very deep, very calm] "For a thousand years I have collected the six Magnets of Everything."
2. `2-17` [calm] "With the last one… I will tidy the universe."
3. `2-19` [reverent] "Behold. The Donut of Destiny."
4. `2-24` [hollow, calm] "…That was a thousand years."
5. `2-28` [tired] "Five will have to do."
6. `2-37` [mildly annoyed] "Ah."
7. `5-16` [lost, calm] "…Where is this?"
8. `5-17` [reading slowly] "Do not feed the mascot after three A.M."
9. `5-19` [meek] "…Understood."
10. `E-3` [calm, polite] "Service."

**GRAN** (3)

1. `2-18` [sweet, slow] "Hold still, dear."
2. `5-25` [sweet, slow] "Six glazed, dear. And is the dinosaur for sale?"
3. `5-27` [sweet, unchanged] "I'll wait, dear."

**CUBEFOLK** (3)

1. `3-2` [one flat syllable] "Hm."
2. `3-5` [flat] "Hm."
3. `3-36` [satisfied] "Hm."

**ADMIN** (5)

1. `5-4` [bored, deep] "Where is my controller."
2. `5-7` [reading, flat] "Play history. Three servers. One emptied. One explosion, internal."
3. `5-8` [flat] "Five alarm donuts. And Big Head Mode."
4. `5-9` [flat] "All of it was an accident."
5. `5-22` [bored] "Banned: Toast's weekends."
