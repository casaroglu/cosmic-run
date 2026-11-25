# Chip Wars 11: Born in a Denny's (Nvidia's origin)

Vertical Short (1080x1920, 30 fps, on twos), History Sketches, Part 3 of the Chip Wars series. Script: `work/lines.json` (v2 rules in `../SERIES_PLAN.md`).

- Voice: `~/.cache/kokoro/venv/bin/python ../_shorts/gen_voice.py .` (q = af_heart, a = bm_fable, fast, tight acronyms); music bed: `../_shorts/gen_music.py . tense`.
- Animation: `render.py` on the shared engine `../_shorts/engine.py` (line-scoped cues `cl(line, word)`), pieces in `../_shorts/pieces.py`.
  `~/cizgi/.venv/bin/python render.py sheet` -> `work/contact_sheet.jpg`; `render.py video` -> `videos/out/chipwar/11-nvidia-dennys/video.mp4`.
- Facts: `FACTS.md`. No captions; text appears silently; no whoosh. No real person is drawn.
