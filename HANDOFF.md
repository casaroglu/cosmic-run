# Handoff — short-video work (started in a cloud session)

Branch: `claude/youtube-video-analysis-skills-3aemj1`. Everything below is committed here except the rendered MP4s
(they are gitignored; the user downloaded them from the chat — put them in `videos/out/export/` if you need them).

## What exists
- **Skill `/story-video`** — `.claude/skills/story-video/` (read `SKILL.md` first, then `reference/story-format.md`).
  Pipeline: story JSON → Kokoro TTS (free, local) + generated music/SFX → Chromium canvas frames → ffmpeg → 1080x1920 MP4.
  First run on a machine: `bash .claude/skills/story-video/scripts/setup.sh` (needs python3, node, ffmpeg; downloads ~350 MB Kokoro model).
- **Series (all rendered, MP4s sent to the user):**
  - `videos/stories/i-fell-in-love-with-my-agent/part1-3.json` — male narrator, AI "Nova".
  - `videos/stories/my-boyfriend-costs-19-99/part1-3.json` — female narrator (af_bella), male AI "Leo", app "Kindred"; photo messages, paywall, notification on a date.
  - `videos/stories/spain/` — history series "Spain in 60 seconds" (index + plan: `videos/stories/spain/README.md`).
    01-1492 ✅, 02-charles-v ✅, 03a/03b Philip II ✅, 04a/04b Golden Age ✅, 05a/05b 1808 ✅, 06 Spanish Succession ✅ (public-domain paintings in each `img/`).

## User preferences (keep)
- Voiceover always **English**; vertical; Part 1/2/3 series with cliffhanger end cards; captions word-by-word.
- No real AI product names; mark fiction as fiction in the post caption.
- History: real public-domain paintings with credit line, dates verified in two sources (`RESEARCH.md` per episode),
  big topics split into **two parts** (`NNa-`, `NNb-`), small topics one part. User speaks Turkish — reply in Turkish.

## Next steps (where we stopped)
1. Episode 3 (Philip II, `03a-philip-ii` + `03b-the-armada`) is done: paintings downloaded locally, camera moves set, rendered.
   `fetch_commons.py` picks wrong files sometimes (a copy instead of the original, the same portrait twice) — always look at each image.
2. Episode 4 (Golden Age: 04a Cervantes, 04b Velázquez) done.
3. Episode 5 (05a 1808, 05b The Little War) done.
4. Episode 6 (War of the Spanish Succession) done.
5. Next: episode 7 (Constitution of Cádiz, 1812, one part) per the series README.

## Known issues
- Brave Search API key saved in the cloud environment was rejected (422) — not needed locally.
- Modern Spanish history (Civil War onward): images mostly copyrighted (Guernica © until 2043) → plan maps/drawn scenes.
- Mac: setup.sh installs the TTS deps into `~/.cache/kokoro/venv` (Homebrew Python blocks pip; onnxruntime lags new Pythons); make_video.sh uses that venv automatically.
- Captions: word timings come from `scripts/align.py` (pauses in the real voice + phoneme counts), not letter counts. Spain ep. 1–6 rendered with it; the story series (Nova, Kindred) still have the old estimate.
