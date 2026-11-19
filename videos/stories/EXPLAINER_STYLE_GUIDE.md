# Animated Explainer Style Guide (prompt)

How to use this file: paste the **PROMPT** section into a new video request, then add the topic, length and voice. The prompt describes the visual grammar of a modern flat-vector science explainer. It is based on frames sampled on 2026-11-19 from the most-viewed videos of a leading science-animation channel:

| Video | Views |
|---|---|
| The Coronavirus Explained | 89 M |
| The Immune System Explained I | 54 M |
| The Deadliest Being on Planet Earth – The Bacteriophage | 35 M |
| The Largest Star in the Universe | 35 M |
| The Egg | 36 M |

**Rule zero:** learn the *grammar*, never copy the *assets*. No characters, birds, logos, specific scenes, palettes-as-brand, music or titles from any existing channel. Our recurring cast, colours and title cards are our own (see "Our identity" below).

---

## PROMPT

Make a flat-vector animated science explainer, drawn entirely in code. Use one 2D canvas, plus one WebGL canvas only for shaded hero objects such as planets, organs or cells. Every frame is a pure function of time: `window.seek(t)`.

### 1. Visual language

- **Shapes.** Everything is built from simple geometric primitives: circles, capsules, rounded rectangles, soft blobs, a few faceted polygons.
  - No outlines on objects, ever. Edges are made by colour contrast between fills.
  - Line work exists only as thin decorative strokes: spark lines, motion marks, hair, flagella.
  - Corners are rounded. Organic things are blobby with gentle bulges. Engineered things (viruses, phages, crystals) are low-poly and faceted, with 2–3 flat facet tones.
- **Colour.**
  - Each scene has ONE dominant background hue: saturated but not neon, e.g. deep indigo, ultramarine, warm cream, hot pink, teal.
  - Use 2–3 complementary accents on top. Typical pairings: indigo bg + magenta/orange subject; cream bg + coral/red organs; teal bg + yellow/purple; ultramarine bg + pink/green.
  - Shade by stepping the same hue darker or lighter in 2–4 flat bands, not by grey-black shading.
  - Highlights are a lighter tint plus small white glints (a dot or a short curved capsule).
  - Backgrounds are rarely flat: a soft radial glow behind the subject, and faint large blobs or particles in a slightly different value of the bg hue.
- **Light and depth.**
  - A radial halo behind the hero object (2–4 concentric soft rings, additive).
  - A rim light on one side in a cooler or warmer accent.
  - A soft oval contact shadow under standing objects.
  - Depth comes from parallax layers: far blurred bokeh dots, mid-ground props, a foreground element partly out of frame. Never from realistic perspective.
- **Texture.**
  - Very subtle film grain (≈5%) and a vignette.
  - Surfaces get pattern instead of texture: cell walls as rows of rounded tiles, lungs as speckled dots, skin as soft bumps, metal as 2-tone facets.
- **Microscopic worlds.**
  - Cells are big glowing membranes made of 3–5 nested blobs, with organelles as smaller blobs.
  - Tissue is a wall of repeating capsules.
  - Fluids are flowing streaks plus floating dots.
  - Pathogens are faceted or spiky, each with a signature colour.
  - Everything slowly breathes: scale ±2–4%, 0.3–0.6 Hz.
- **Cosmic worlds.**
  - Stars are layered radial gradients with drifting granule blobs.
  - Planets are flat discs with a terminator band and a rim glow.
  - Size comparisons sit on a faint isometric grid floor.

### 2. Characters

- **Proportions.** Big head (≈40–45% of height), small rounded body, stub limbs, no fingers, or mitten hands.
  - Humans have flat skin-tone faces with 2–3 shading planes: one darker side plane and a blush cheek dot.
  - Eyes are simple dots or white ovals with a dot pupil. Expressions come from eyelid shapes and eyebrow tilt.
  - Hair is a single solid shape with one highlight capsule.
- **Readable roles.** Every character is identifiable by ONE prop or colour: a doctor's stethoscope and coat, a shopkeeper's apron, a scientist's goggles, a patient's gown.
- **Creatures and personified microbes.** Rounded bodies, huge glossy eyes with two glints, small fanged mouths, tentacles as tapered capsules.
  - Cute-menacing, never gory.
  - Silhouettes of a whole body with organs visible inside (x-ray style, darker body + bright organs) explain anatomy.
- **Motion.** Characters always have idle life: a bob (±4 px, ~0.4 Hz), blinks every 2–5 s, and breathing on the torso.
  - Every pose change uses squash and stretch (10–18%) plus a damped spring (damping 0.42–0.5, frequency 12–16).
  - Eyes look at whatever matters.
- **Our cast (own designs, never someone else's).** The *sleepyhead* is a pyjama mascot with a glowing visor face, a nightcap with a blinking pompom and orange slippers. Add new cast members only as our own designs.

### 3. Icons and props: draw what the narrator says

- Every concrete noun or idea in the narration gets an icon or small illustration that pops in **on that word**. Examples: bed, glass, car, bin, water drop, eye, stopwatch, trophy, calendar, flask, pills, mask, syringe, phone.
- Icons are 2–3 flat colours, chunky, slightly 3/4 tilted, with a highlight capsule. They sit in free screen space and never cover a face or a number.
- **Icon grids.** For lists ("masks, gloves, sanitizer…"), use a 3×2 grid of coloured tiles, each tile one hue with one icon, revealed tile by tile 0.12 s apart.
- **Organs must read as the real organ.** A brain is a side view with folds, a lateral fissure, cerebellum and stem. Lungs are two lobes with a speckled texture. A heart has four chambers or a stylised heart with vessels. Never use a sphere as a stand-in.
- **Icons never sit on top of other elements.** An icon must not overlap the hero object (brain, planet, mascot), another icon, a label, a counter, a meter, a panel edge, or the frame edge.
  - Before an icon pops in, its slot is checked against the screen boxes of everything visible at that moment. Pick a free slot instead, or shrink the icon. Never let it cover the drawing behind it.
  - Hallucination ghosts, particles and other ambient sprites are kept out of the hero's and labels' boxes too.
  - The overlap audit runs on every 0.1 s of the video before rendering, and must report zero icon overlaps.
- Abstract ideas get visual metaphors:
  - Hallucinations: ghosts, floating light orbs, walls that breathe, hue drift.
  - Fatigue: drooping eyelids, a desaturating world.
  - Danger: a red pulse and a warning stamp.

### 4. Typography and labels

- One rounded geometric sans (we use Fredoka 600/700).
- Labels are short, in ALL CAPS, with 3–6 px letter spacing, inside rounded pills of a dark navy at ~62% opacity. A label sits just under or beside the thing it names, connected only by proximity, without arrows unless needed.
- **Key-term tags.** A solid accent-coloured rectangle (magenta, teal or gold) with white bold text, placed under the object: "Virus", "Neutrophils", "Bacteriophage".
- **Numbers are heroes.** Big bold counters with a small caps caption ("HOURS AWAKE 24"). They tick, slam in with a 1.7→1 scale spring, and change colour at milestones.
- **Text motion.** Each line rises 1.3× its height through a clip with ease-out-quint (0.6–0.8 s). Text never fades in whole. No full stops on screen.
- **Meters and bars.** Rounded tracks with a gradient fill that animates to a value, e.g. "antibiotic resistance ▓▓▓░".
- **Titles.** Two lines: a white setup line, then a bigger accent payoff line, shown on the final word of the narration.

### 5. Composition and layout

- Subject at centre or on a third, with generous negative space. Captions or labels sit in the lower third, numbers top-right.
- **Split screens.** Use 2 or 3 vertical panels, each with its own bg hue, to compare things: "you vs. the store clerk", "three kinds of phage". Panels slide in from alternating sides.
- **Focus rings.** To isolate a detail, a dark circular plate appears behind the object (radius ≈ 0.6 of frame height) and the rest dims.
- Scale is shown by sequences: whole body → organ → tissue → cell → molecule, or planet → star → galaxy. Each level gets its own colour world.

### 6. Camera and transitions (nothing ever holds still)

- Every narration line gets a camera move or a transformation. Even "static" shots drift: ±6 px pan, ±1.2% zoom on slow sines.
- Camera moves use easeInOutCubic, and zoom is interpolated in log space.
  - Dives in: 1× → 2.3×, 0.8–1.4 s.
  - Pull-backs: 1.2–2 s, often to 0.3–0.8× to reveal scale.
- **Transitions**, in order of preference:
  1. **Zoom-through.** Dive into a detail until it fills the frame and becomes the next scene's background (lung → alveolus → cell).
  2. **Match cut or morph.** A shape becomes the next shape (pin → play button, cell → planet, dot → eye).
  3. **Colour flood.** A circle of the next scene's bg hue grows from the subject in ~0.5 s.
  4. **Organic wipe.** A wall of rounded capsule "fingers" sweeps across the frame, then reveals the next scene. Good for "bacteria invade" moments.
  5. **Panel slide** into a split screen.
  6. **Flash and shockwave** for single big events, used at most once or twice per video.
- Particles carry continuity across cuts: streaks or dots keep flowing through the transition.

### 7. Motion timing

- Pops: scale 0 → 1.08 → 1 with a damped spring, 0.35–0.5 s. Exits: scale to 0.8 plus fade, 0.25–0.35 s.
- Stagger groups by 0.08–0.15 s. Never let more than 3 new things appear at once.
- Ambient motion on everything: twinkle, bob, breathing, slow rotation of rays, drifting particles.
- Keep two clocks: ambient time (twinkle, spin, bob) and story time (events), so rewinds and time-skips stay consistent.
- Every event fires on its word. Get word times from the TTS timestamps or faster-whisper, at about 160–170 wpm, with 0.24 s between sentences and a 0.36 s beat before a reveal.

### 8. Story shape (works for any "What if… / What happens when…")

1. The hook event happens on its word.
2. Pull back to show scale.
3. Dive in and make it personal ("you").
4. Show the consequence with a live counter.
5. Explain the mechanism (inside the body or object), with icons on every key word.
6. Escalation in 2–3 steps, each a different visual metaphor.
7. A record or extreme case.
8. A grim or serious fact, kept short and dimmed.
9. A funny beat with the mascot.
10. A callback to the hook, then the two-line title.

### 8b. Script format: question and answer (default)

- **Two voices.** A curious questioner (Ava, Kokoro `af_heart`) asks and an expert narrator (Theo, Kokoro `bm_fable`) answers.
- **Questions:**
  - Keep them short (≤ 8 words).
  - Phrase them the way a viewer would think them ("Is that why I crave junk food when I'm tired?").
  - Use one question every 2–4 answer lines.
  - Every chapter opens with Ava's question, shown on the chapter card.
- **Answers:**
  - Answers carry all the facts.
  - The first answer line starts with the payoff ("Yes.", "Not quite.", "That's real.").
- **Timing:** a 0.45 s pause after each question. Ava reads 4% faster than Theo.
- **Ending:** Ava asks the hook at the start and gives the subscribe line at the end. Theo delivers the facts and the callback.
- **Why:** each question opens a curiosity gap that carries the viewer into the next line, and the voice change resets attention. There is no public A/B data for this, so compare retention graphs between videos.

### 9. Sound

- A calm ambient bed about 7 dB under the voice, swelling 5 dB under the title.
- One sound effect per event kind (pop, whoosh, tick, thud, chime, shimmer), peak-aligned to its frame and 4–10 dB under the voice.
- Master to −14 LUFS and −2 dBTP or lower.
- Effects are synthesized or royalty-free. Never use music or sounds taken from another channel.

### 10. Hard bans

- Outlines on shapes.
- Lens flares and hooks on star edges.
- Gore, nudity, real logos or brands.
- Another channel's characters, mascot, bird, title cards or music.
- AI-generated images in the animation itself.
- Static infographic strips.
- Text that fades in whole.
- Full stops in on-screen text.
- Spheres standing in for organs.

---

## Thumbnail and title

- **Title format:** `What If <topic>? Explained in <N> Seconds`, where N is the real final length rounded to 5 s (including the thumbnail intro).
- **Thumbnail (Gemini, 16:9):**
  - Upload a 2×2 sheet of our own frames as the style reference: mascot, hero object, a key scene, and a character.
  - Ask for exactly our art style: flat vector, no outlines, 2–4 flat tones, soft radial glows, highlight capsules, subtle grain.
  - Layout: our mascot large on the left third, the hero object on the lower right, two-line title top right (white setup line, bigger gold payoff), and a small teal pill "EXPLAINED IN N SECONDS".
  - If any element overlaps another, regenerate with an explicit layout. Overlaps are not allowed on the thumbnail either.
- **Intro:** the thumbnail is also the first 1.5 s of the video, with a slow 3.5% push-in and a 0.3 s crossfade into the first scene. Delay the audio by 1.2 s.

## Our identity (what makes it ours)

- **Cast.** The pyjama sleepyhead mascot (visor face, nightcap, orange slippers). Future mascots are our own designs.
- **Labels.** Navy pills with teal `#8fd8e6`, gold `#ffd98a` and white text in Fredoka.
- **Default worlds.** A night sky (`#081d2c` → `#102348`) with nebula blobs for space and sleep topics. Warm cream or coral worlds for body interiors.
- **Voices.** Ava (Kokoro `af_heart`) asks, Theo (Kokoro `bm_fable`) answers, unless an ElevenLabs key is given.
- **Pipeline.**
  - `videos/stories/body/01-never-slept/` is the reference implementation: `index.html`, `make_voice.py`, `make_sound.py`, `render.mjs`.
  - Make a contact sheet of every beat before rendering.
  - Render with Chrome GPU at 30 fps, 2 subframes, shutter 0.6.
  - Encode at CRF 16 for the master and CRF 20 for delivery, plus a phone copy under 30 MB.

## QA checklist before render

- [ ] Every concrete word in the script has an icon or illustration on its timestamp.
- [ ] Organs and objects read correctly in silhouette alone.
- [ ] No label overlaps another label, a counter, a face or the frame edge.
- [ ] Overlap audit (every 0.1 s): no icon or ambient sprite on top of the hero object, the mascot, another icon, a label, a counter or a meter.
- [ ] Every line of narration has a camera move or transformation.
- [ ] At most 3 simultaneous new elements. Spring pops, no linear fades.
- [ ] Facts in the script are checked against two sources and listed in the episode README.
- [ ] Contact sheet reviewed. Audio at −14 LUFS.
