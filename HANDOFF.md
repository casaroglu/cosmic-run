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
    01-1492 ✅, 02-charles-v ✅ (public-domain paintings in each `img/`).

## User preferences (keep)
- Voiceover always **English**; vertical; Part 1/2/3 series with cliffhanger end cards; captions word-by-word.
- No real AI product names; mark fiction as fiction in the post caption.
- History: real public-domain paintings with credit line, dates verified in two sources (`RESEARCH.md` per episode),
  big topics split into **two parts** (`NNa-`, `NNb-`), small topics one part. User speaks Turkish — reply in Turkish.

## Next steps (where we stopped)
1. Episode 3 — Philip II, two parts: `videos/stories/spain/03a-philip-ii/` and `03b-the-armada/`.
   Scripts + research done; **14 paintings missing** (see each `img/NEEDED.md`).
   The cloud session could not download them (Wikimedia rate-limits cloud IPs). On the user's own machine this should work:
   ```bash
   S=.claude/skills/story-video/scripts
   for p in 03a-philip-ii 03b-the-armada; do
     COMMONS_CONTACT=https://github.com/casaroglu/cosmic-run python3 $S/fetch_commons.py videos/stories/spain/$p/episode.json
   done
   ```
   Then look at every downloaded image (right painting? public domain?), set each beat's `move` so the camera ends on
   faces/action (no moves are set yet), preview with `make_video.sh … --preview 2 10 20 30 40 50 60`, render, send, update
   the series README, commit + push.
2. Then episode 4 (Golden Age, two parts) per the series README.

## Known issues
- Brave Search API key saved in the cloud environment was rejected (422) — not needed locally.
- Modern Spanish history (Civil War onward): images mostly copyrighted (Guernica © until 2043) → plan maps/drawn scenes.
