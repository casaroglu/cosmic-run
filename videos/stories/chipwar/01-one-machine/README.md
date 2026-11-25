# Chip Wars 01: One Machine

Vox-style collage map explainer (1920x1080, 30 fps, on twos), History Sketches.
Story: only ASML (Veldhoven) builds EUV machines; TSMC in Taiwan runs more than half of them; parts from Germany and San Diego;
one machine ships in 40 containers; in 2019, under US pressure, the Dutch let China's licence lapse; China has never received one.

- Script and voices: `work/lines.json`, `work/gen_voice.py` (Kokoro: q = af_heart, a = bm_fable), run with `~/.cache/kokoro/venv/bin/python`.
- Facts with two sources each: `FACTS.md`.
- Animation: `render.py` (camera keyframes, elements and SFX), using the drawing code in `../style_test/stills.py`
  and the Blender props in `../style_test/props` (`blender_props.py`).
- Contact sheet: `~/cizgi/.venv/bin/python render.py sheet`; full video: `render.py video` -> `videos/out/chipwar/01-one-machine/video.mp4`.
- No captions (the style bans burned-in subtitles). No whoosh/riser SFX. Fonts are macOS stand-ins for Libre Caslon / Special Elite / Anton.
