# Spain: the long-form cut

All 23 Shorts joined into one 16:9 documentary, with an animated globe between chapters.

| Step | Command |
|---|---|
| 1. Chapter timelines (landscape, end cards dropped) | `python3 prep_chapters.py` |
| 2. Render chapters 1920x1080 | `node ~/cosmic-run/.claude/skills/story-video/scripts/render.mjs ~/cosmic-run/videos/out/spain/long/<id>` |
| 3. Intro/outro narration + interlude sound | `~/.cache/kokoro/venv/bin/python globe_audio.py` |
| 4. Map data (once) | `cd geo && curl -LO https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_{land,admin_0_countries}.geojson` |
| 5. Globe clips (Three.js + GSAP) | `cd globe && npm i && node globe.mjs` (stills: `--still ch09:3.0`) |
| 6. Join + description | `python3 assemble.py` → `videos/out/spain/long/history_of_spain.mp4`, `../YOUTUBE_LONG.md` |

- `chapters.json`: chronological order (the 1700 succession war comes before 1808), globe position, place label, routes.
- `longform.json`: intro and outro narration.
- The renderer's landscape mode (`"landscape": true` in a timeline) shows portrait paintings whole on a blurred backdrop.
