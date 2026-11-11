---
name: story-video
description: Turn a story idea (e.g. someone falling for an AI companion app) into a finished vertical (1080x1920) short-form video for TikTok / Reels / Shorts — English voiceover with free local Kokoro TTS (male narrator + separate AI-character voice), phone-chat UI scenes, animated night-city/room/desk/dawn backgrounds, word-by-word captions, generated background music. Use when the user asks for a story video, a "Part 1/2/3" series, a faceless storytime video, or runs /story-video "topic".
---

# story-video

Pipeline: **idea → story JSON (you write it) → `make_video.sh` → MP4 + caption.txt**.
Everything runs locally and costs $0: Kokoro TTS (voices), numpy (music + SFX), Chromium canvas (frames), ffmpeg (encode).

## Fixed house style (user's choices — do not change unless asked)
- Vertical 1080x1920, 30 fps, ~40–55 s per part.
- Voiceover is **always English**, narrator in first person ("I…"), AI character in a separate voice.
  Defaults: male narrator `am_michael` + female AI `af_heart`. Reversed series (woman narrator + male AI): narrator `af_bella`, AI `am_fenrir`, plus `"narrator_hair": "long"` so her silhouette matches.
- Visual: phone chat screen + animated scenes between messages. Big word-by-word captions (current word yellow).
- Series format: Part 1/2/3, each part ends on a cliffhanger end card ("Part N tomorrow" / "Follow…").
- Tone: bittersweet. Music: generated, never copyrighted tracks.
- No branding / links to other products. Fictional AI names only (e.g. "Nova"), never real AI product names.
- Mark it as fiction in the post caption (`post.caption` → "… — a fictional story").

## Workflow
1. **First run on a machine:** `bash .claude/skills/story-video/scripts/setup.sh` (downloads Kokoro model ~350 MB to `~/.cache/kokoro`, installs `kokoro-onnx`, checks ffmpeg/Playwright).
2. **Write the story** as `videos/stories/<slug>/partN.json`. Read `reference/story-format.md` for the schema, beat types, scenes, and the script-writing rules (hook in first 2 s, short lines, chat ↔ narration rhythm, cliffhanger ending). For a series, outline all parts first, then write each file.
3. **Preview stills before the full render** (fast, ~10 s):
   `.claude/skills/story-video/scripts/make_video.sh videos/stories/<slug>/part1.json videos/out/<slug>/part1 --preview 1.5 8 20 35`
   Look at the `preview_*.jpg` files (combine with `ffmpeg … hstack` into one sheet) and fix overlaps / text overflow.
4. **Render:** same command without `--preview` → `videos/out/<slug>/partN/video.mp4` + `caption.txt`. ~1–2 min per 45 s part.
5. Send the MP4 to the user (SendUserFile). `videos/out/` is gitignored — never commit MP4/WAV.

## History series workflow ("next episode")
Series live in `videos/stories/<series>/NN-slug/` (index: `videos/stories/<series>/README.md`). For each new episode:
1. Pick the next planned row in the series README. Big topics get **two parts** (`NNa-`, `NNb-` folders, `"part": 1/2, "total_parts": 2`): Part 1 ends with an end card "Part 2: …"; Part 2 reuses Part 1 images via `../NNa-…/img/…` paths. Only split when there is enough story and ≥15 public-domain images; modern topics (Civil War onward) have mostly copyrighted images. Research it; write `RESEARCH.md` (claim → fact → source table, two sources per date/number, list what was left out on purpose).
2. Write `episode.json` (history mode, see `reference/story-format.md`): 60–90 s, hook title, every scene a **public-domain** painting with `credit`, `where` (museum) and `search` (Commons query). Keep beats in chronological order. Check length with `build_audio.py` (only audio, fast).
3. Run `scripts/image_checklist.py episode.json` → writes `img/NEEDED.md`. Try `COMMONS_CONTACT=https://github.com/casaroglu/cosmic-run scripts/fetch_commons.py episode.json` once; Wikimedia often blocks cloud IPs (429) — then give the user the NEEDED.md list (numbered, with links) and ask them to upload the images **in that order**.
4. When uploads arrive: `scripts/add_images.py episode.json <upload1> <upload2> ...` (fills missing images in order, scales to ≤2400 px). Look at each upload to confirm it is the right painting, then set each `move` so the camera lands on faces/action.
5. Preview stills → fix → full render with `make_video.sh` (it refuses to render while images are missing) → send MP4 → update the series README status → commit + push.

## Tuning knobs
- Too long? Cut narration lines first, keep the chat beats. Target ≤ 55 s.
- Mispronounced word / number → add `"say": "spoken version"` on that beat (e.g. `"3 AM"` → `"three A M"`).
- Pace: per-beat `"speed"` (narrator default 1.05), `"gap"` (pause after line, default 0.28 s).
- Music mood per part: `bittersweet` | `dreamy` | `hopeful` | `tense`; change `seed` for a different melody.
- Other Kokoro voices: male `am_onyx`, `am_adam`, `am_eric`, `bm_george` (British); female `af_bella`, `af_nicole`, `af_sky`, `bf_emma`.
- History / documentary episodes with public-domain paintings: see "History mode" in `reference/story-format.md`.
- New background scene: add a `SCENES.<name> = (t) => {...}` function in `scripts/renderer.html` (pure canvas drawing, deterministic in `t`).
