# Chip Wars long-form Part 2: "The Chip War: 5 Moves That Shook the World"

1920x1080, 30 fps, on twos, History Sketches. One continuous map and camera: Washington -> Santa Clara -> South-East Asia -> Beijing -> Bayan Obo -> Chicago -> Hangzhou -> New York -> wide world; chapters are FIG. 06-10 cards with MOVE 1-5 ransoms during each flight, no cuts or fades.

- Script: `SCRIPT.md` (as written) and `work/lines.json` + `work/chapters.json` (as voiced; reworded lines are listed in `FACTS.md`).
- Voice: `~/.cache/kokoro/venv/bin/python ../_shorts/gen_voice.py .` (q = af_sky, a = bm_fable, fast). Music: `work/gen_music_long.py` (one build_audio.music mood per chapter, cross-faded, -24 dB under the voice).
- Animation: `render.py` on the shared engine in landscape mode (`../_shorts/engine.py`, `CW_ORIENT=h`) with the Part 1 pieces (`../_shorts/pieces.py`).
  `~/cizgi/.venv/bin/python render.py sheet [frames]`, `render.py chapters` (chapter times), `render.py video` -> `videos/out/chipwar/long-part2/video.mp4`.
- YouTube text: `../YOUTUBE_LONG_PART_2.md`. No captions; text appears silently; no whoosh.
