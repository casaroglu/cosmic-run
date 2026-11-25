# Chip Wars long-form Part 3: "The AI Gold Rush"

1920x1080, 30 fps, on twos, History Sketches. One continuous map and camera: San Jose -> Toronto -> Santa Clara -> Taiwan -> Ireland -> US east -> Red Sea -> Baltic -> San Francisco -> London -> Hangzhou -> Paris -> New York -> wide world; chapters are FIG. 11-15 cards with RUSH 1-5 ransoms during each flight, no cuts or fades.

- Script: `SCRIPT.md` (as written) and `work/lines.json` + `work/chapters.json` (as voiced; reworded lines are listed in `FACTS.md`).
- Voice: `~/.cache/kokoro/venv/bin/python ../_shorts/gen_voice.py .` (q = af_sky, a = bm_fable, fast). Music: `work/gen_music_long.py` (one build_audio.music mood per chapter, cross-faded, -24 dB under the voice).
- Animation: `render.py` on the shared engine in landscape mode (`../_shorts/engine.py`, `CW_ORIENT=h`) with the Part 1 pieces (`../_shorts/pieces.py`).
  `~/cizgi/.venv/bin/python render.py sheet [frames]`, `render.py chapters` (chapter times), `render.py video` -> `videos/out/chipwar/long-part3/video.mp4`.
- YouTube text: `../YOUTUBE_LONG_PART_3.md`. No captions; text appears silently; no whoosh.

- Neutrality: Claude (which helped make this video) is made by Anthropic; no investment advice or price talk; the disclosure is in `../YOUTUBE_LONG_PART_3.md`. The user reviews the race chapter and description before upload.
