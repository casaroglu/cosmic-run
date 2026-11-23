# Rome episode brief (08–15)

Every Rome Short follows this brief. The reference episode is `07-augustus`; read its `episode.json`, `RESEARCH.md` and git history (`git log -- videos/stories/rome/07-augustus`).

## Visual style for 08–15: "B+C" (user, 2026-11-23)
- Follow ~/cizgi/STYLE_BC.md. In short:
  - B: cizgi-kit cartoon characters act out the Q/A in front of real public-domain or CC0 photos and paintings.
  - C: dossier or pinned-photo cards show real PD portraits and key facts.
  - Use the kit from ~/cizgi/antwerp-sandwich. Put the project in ~/cizgi/rome-<ep>.
- Also render `chapter.mp4`: the same video cut just before the CTA, for the long-form parts.
- **Sound:** never use whoosh, swish or riser sounds.
- **Revealing images:** never crop them. Blur the revealing areas and cover each one with a flower emoji (🌹🌸🌺🌷).
- The pipeline section below still applies to research, script, voices and fact checks. The story-video renderer was used for 01–07 only.

## Pipeline (same as 05–07)
- **Script:** an Ava-asks / Theo-answers dialogue. Ava is `q` (af_heart); Theo is `a` (bm_fable).
  - Years are read naturally (`say` field).
  - No filler words.
  - Open by grounding the topic today.
- **Visuals:**
  - Sketch maps with correct borders for the year, shown at the start and again at the end.
  - Public-domain paintings and photos, or CC0 photos (Met, Rijksmuseum, Commons). Credit every image.
  - 3–6 side cameos: portraits, coins, or a Qwen cut-out figure.
  - One HyperFrames motion card.
  - Qwen-Image scenes only where no public-domain image exists. Never a portrait of a real person.
- **Facts:** check every date and number against two sources. Write them into `RESEARCH.md`.
- **Render:** `bash .claude/skills/story-video/scripts/make_video.sh videos/stories/rome/<ep>/episode.json videos/out/rome/<ep>`. Run `check_sync` and the text audit, and fix every flag.
- **Length:** 90–130 s.

## Hook + loop rule (new, 2026-11-23)
1. **Cold open.** Beat 0 is a narration beat by `a`, placed before the `title` beat.
   - It shows the episode's most striking scene with a zoom punch: `"move": {"from": [x, y, 1.35], "to": [x, y, 1.15]}`.
   - It says the payoff or the shock in one line of 8–12 words, for example "Every summer, you write this man's name without knowing it."
   - The title question then asks how it happened.
2. **CTA.** The CTA beats get `"cta": true`. The renderer then shows a "FOLLOW HISTORY SKETCHES" pill.
   - Line 1: "Like the video and follow History Sketches for the next episode: <next topic>."
   - Line 2: Ava's "tell us in the comments: …" question.
   - Episode 15 is the last one, so it gets no next-episode teaser. It says "follow History Sketches for more history" instead.
3. **Loop line.** The final beat comes after the CTA. It is one line by `a` that flows straight back into the cold-open line, so the Short plays as a loop.
   - Example: the 07 cold open is "Every summer, you write this man's name without knowing it." The 07 loop line is "Two thousand years later, his name still comes back every summer."
4. **No `end` beat.** Remove the end card.
5. **Loop settings.** Add the top-level `"loop": {"key": "<the single key fact, at most 8 words>"}`. The renderer then:
   - flashes the key text for the last 1 s;
   - cross-fades the last 0.4 s into frame 0;
   - leaves out the fade from and to black.
6. The History Sketches logo stays top-right (the `watermark` field). Cameos must stay clear of it.

## Cover (done later by the main session)
In `RESEARCH.md`, suggest three 4–5 word surprising cover hooks, for example "HE STOLE A WHOLE MONTH". Also name the best public-domain reference image for Gemini.

## Do not
- upload or post anything;
- touch the files of episodes other than your own;
- commit renders (`videos/out` is not committed).

## When done
- Commit only `videos/stories/rome/<ep>/` (other agents work in the same checkout, so use `git add <that folder>`, never `git add -A`) and push.
- Leave `videos/stories/rome/README.md` alone; the main session updates it.
- End commit messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
