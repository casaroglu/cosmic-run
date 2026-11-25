# Chip Wars 03: The Machine Only One Company Can Build (vertical pilot)

Vertical Short (1080x1920, 30 fps, on twos), History Sketches. Script: ep 03 in `../SERIES_PLAN.md`.

- Script and voices: `work/lines.json`, `work/gen_voice.py` (Kokoro, Chip Wars cast: q = af_sky, a = bm_fable; fast and lively:
  q speed 1.15 pitch +0.5 rise 3.5, a speed 1.18 pitch +0.8, gaps 0.16/0.12 s), run with `~/.cache/kokoro/venv/bin/python`.
- Facts with two sources each: `FACTS.md`.
- Animation: `render.py` (ep 01 engine re-framed for 9:16: the camera focus lands at the centre of the Shorts safe area,
  x 40-940, y 60-1540; logo top right). New code-drawn pieces: tin drops, laser beam, EUV flash, Sun, wafer, mirror.
- Shorts rules: payoff in the first second (3D machine, tin + laser flash, "50,000"), CTA before the last line,
  last line loops into the first, hidden key-fact tag in the last second.
- Contact sheet: `~/cizgi/.venv/bin/python render.py sheet` (red boxes = Shorts UI zones); full video: `render.py video`
  -> `videos/out/chipwar/03-asml/video.mp4`.
- No captions (style bans burned-in subtitles). No whoosh/riser SFX. Fonts are macOS stand-ins.
