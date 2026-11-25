# Toast & Pixi — series bible and production rules

Written 2026-11-25 after the first pilot was rejected ("the episode is nonsense").
Scripts and visual direction live in `scripts/`. Whoever builds an episode follows this file and the script
exactly; when a script and this file disagree, the script wins. Do not add story beats, characters,
props or jokes that are not in the script.

## 1. Why the first pilot failed (do not repeat)

| Problem in the pilot | Rule from now on |
| --- | --- |
| The rule ("no shadow") was shown after the joke | The premise is on screen, as readable text, before anything breaks it |
| Five ideas in 27 s (upside-down head, no shadow, shadow man, toaster, dinosaur) | One idea per Short. Everything in the episode is that idea getting bigger |
| A toaster in a donut shop, only there for the banner | Every prop is shown before it matters and belongs to the place |
| Pixi was in another room | One location per Short. A new location needs a 1 s wide shot first |
| Things happened without cause (shadow eaten, new shadows at the door) | Each beat is caused by the beat before it. Test: "because of that…", never "and then…" |
| Faces so close they were unreadable | Close-up = the head is at most 70% of the frame width |
| The ending was a new, unrelated threat | The ending is the consequence of the first choice, then the loop |

## 2. The story engine

Every Short is: **one rule → Toast breaks it → it escalates three times → twist → loop.**

1. **Hook (0–1.5 s):** a flash-forward of the biggest moment, with 2–4 words of text. No setup first.
2. **Premise (1.5–5 s):** the rule or the curse, as readable text in the scene, plus one spoken line.
3. **Escalation ×3:** each step is the same joke, bigger. Size, count or speed goes up visibly
   (a counter or label on screen helps).
4. **Pixi's one line:** she warns once before, and names what he did once after. She is always right.
5. **Fail screen:** TOASTED! (see 5).
6. **Twist (last 4 s):** one new piece of information that re-frames the rule (the small print,
   who wrote it, what it was protecting).
7. **Loop:** the last line is cut mid-word by the hook's threat, and the camera lands on the hook's exact picture: the last frame and the first frame must be the same composition (same camera, poses and props), so the replay is seamless. Build this as one shared pose object used by both the first and the last shot.

**Mute test:** the story must be understandable with the sound off. If a beat only works through
dialogue, redraw it as an action.

## 3. Characters (behaviour, not looks)

- **Toast** — confident, wrong, never malicious. He breaks rules because he thinks he found a loophole
  ("it's 2:59"). He never learns inside a Short; in long videos he learns one thing at the end.
- **Pixi** — calm, competent, short sentences, never shouts. She does not rescue Toast unless it costs
  her nothing. She is the audience's point of view.
- **Donutsaurus** — a pet. Wants food and affection. Never speaks. Sounds: squeak when small,
  `dino_laugh_oldman` when amused, burp after eating. He is never evil; he is heavy.
- **The Admin** — a giant blocky hand from above and a deep voice. Bureaucratic, bored, literal.
  He bans things. He is the boss of every place Toast works.

## 4. Camera vocabulary (use these names in scripts)

| Name | Meaning | Notes |
| --- | --- | --- |
| WIDE | Whole bodies and the set | Camera 7–9 m away. First shot of any new place |
| MED | Waist up, one or two characters | Default for dialogue |
| CU | Head is 60–70% of frame width | Never closer |
| CRASH | Snap from MED to CU in 6 frames, eyes pop, 0.3 s hold | Boing or sting. Max twice per Short |
| LOW | Camera at floor level looking up | For things that got big |
| TOP | Straight down | For holes, chases, patterns |
| INSERT | A prop or a sign fills the frame | Text must be readable for 1 s minimum |

- Minimum shot length 0.8 s (inserts 1.0 s). No shot with two new things in it.
- Captions sit at 65% height: keep faces, signs and counters out of that band.
- Characters face the camera at three-quarters. Nobody is filmed from behind while speaking.
- Vertical 1080×1920 for Shorts. Long videos are 1920×1080: the engine page hard-codes 1080×1920
  (`engine/index.html`), so add `meta.w` / `meta.h` support before the first long video.

## 5. Gag toolkit (exact behaviour)

| Gag | Picture | Sound | Limit |
| --- | --- | --- | --- |
| CRASH zoom | See camera table; `eyePop` 0→1 with spring, `headScale` 1.1, face `shock` | `boing` or `sting` | 2 per Short |
| Big laugh | Body leans back, bounces each syllable; white speech bubble with pink "HA" added per syllable | one laugh from `sfx_lib` (rotate) | 2 per Short |
| Fail screen | Freeze 4 frames on impact, shake, picture drops to 35% saturation, banner **TOASTED!** slams in at full width, holds 1.2 s | `crash` + `stamp` | once per Short, always the same look |
| Ban stamp | Red rounded rectangle, white text "BANNED: <THING>", rotated −8°, slams like the banner at 60% width | `stamp` | Admin episodes only |
| Counter | Top of frame, yellow number with dark outline, pops on every change | `tick` on change | when something grows or multiplies |
| Rule card | The rule is a physical sign in the set; INSERT on it; red key words | `ding` | every Night Shift |
| Grow | Scale with squash and stretch over 8 frames, overshoot 15% | `boing` | — |
| Ragdoll | Flight arc, limbs flail, impact freeze, then `burst` break-apart, later spring back | `impact`, `thud` per bounce | once per Short unless the script is about falling |
| Flat Toast | After being sat on: body scaled to 8% height, peels up and wobbles | `pop` | — |

Sound rules: never whoosh, swish, zip or riser. Laughs and burps only from `sfx_lib/library.json`.
Voices: Toast `am_liam` +5 st · Pixi `af_bella` 0.95 · The Admin `bm_george` −4 st with reverb.

## 6. New rig features the scripts need

| Feature | Used in | Note |
| --- | --- | --- |
| Donutsaurus at any scale (0.35 "puppy" to 2.5) | S1, long N1 | Root scale; ceiling contact at 2.2 |
| Extra arms on Toast (up to ~30) | S2 | Clone the arm group around the torso at seeded angles; each gets its own phase |
| Vacuum eating (props fly into the mouth along a curve) | S1, S4 | — |
| Saturation drop for the fail screen | all | `grade.uSat` 0.35 |
| Hide Toast's mouth / legs | S3 | A face with no mouth; hide leg groups |
| Mini-Toast donut disguise (donut with Toast's eyes, legs pop out) | S4 | — |
| Staircase set, elevator box | S5 | 8 steps, 0.35 m each |
| Several Toasts at once | long N2 | `makeToast` called up to 8 times |
| Eyes in the dark (2D overlay on black) | long N3 | — |
| Burnt Donutsaurus (dark chocolate icing, red eyes) | long N4, N7 | recolour |

## 7. Production order for each episode

1. Read the script. List its props, sets and rig features. Build only those.
2. Voice: `lines` from the script, exactly as written. Generate, get word timings.
3. Block every shot from the script's table with stills first. Compare each still with its row:
   camera name, who is in frame, what text is readable.
4. Run the mute test on a contact sheet: can someone tell the story from the stills alone?
5. Sound from the script's Sound column. Then render, finish, check sync, small copy.
6. Do not send it as final before the stills match the script row by row.

## 8. Scripts

- `scripts/SHORTS.md` — five Shorts, ready to build, in this order: S1 (rewritten pilot), S3, S5, S2, S4.
- `scripts/LONG-01_7-nights.md` — first long video.
- Later: the "Wrong Server" crossover worlds (Snap City, Cubelands, Cape City, Turbo City, Drop Island)
  use the same story engine; each world's physics rule replaces the written rule.
