# Chip Wars 03: The Machine Only One Company Can Build (vertical pilot)

Vertical Short (1080x1920, 30 fps, on twos), History Sketches. Script: ep 03 in `../SERIES_PLAN.md`.

- Script and voices: `work/lines.json`, `work/gen_voice.py` (Kokoro, Chip Wars cast: q = af_sky, a = bm_fable; fast and lively:
  q speed 1.15 pitch +0.5 rise 3.5, a speed 1.18 pitch +0.8, gaps 0.16/0.12 s), run with `~/.cache/kokoro/venv/bin/python`.
- Facts with two sources each: `FACTS.md`.
- Animation: `render.py` (ep 01 engine re-framed for 9:16: the camera focus lands at the centre of the Shorts safe area,
  x 40-940, y 60-1540; logo top right). New code-drawn pieces: tin drops, laser beam, EUV flash, Sun, wafer, mirror.
- Structure (v2, after user feedback): stakes hook (a phone and an AI chip chained to the machine, ONE MACHINE) -> why it matters
  -> the surprising how (tin + laser, the Sun, thinner than a hair, the mirror) -> TSMC/Nvidia -> twist (China: not one, older machines)
  -> one Dutch town -> CTA -> last line loops into the first. Hidden key-fact tags in the last second.
- Text sizes: tags >= 44 px, notes >= 90 px, title card lines 84 px, key numbers 140-220 px.
- Sound: text appears silently (no typewriter ticks or slaps); soft slaps only for big objects, marker/scribble sounds, all at 0.2 x voice peak;
  a very low synthesized music bed (`work/gen_music.py`, build_audio.music 'tense', -24 dB under the voice). No whoosh.
- Contact sheet: `~/cizgi/.venv/bin/python render.py sheet` (red boxes = Shorts UI zones); full video: `render.py video`
  -> `videos/out/chipwar/03-asml/video.mp4`.
- No captions (style bans burned-in subtitles). No whoosh/riser SFX. Fonts are macOS stand-ins.
