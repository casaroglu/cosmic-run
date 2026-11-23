# Ancient Rome: the long-form parts

The 15 looping Shorts are joined into three 16:9 parts of 8 minutes or more. Each part has 5 chapters, an animated globe between chapters, and a narrated intro and outro.

**What gets cut:** each chapter is cut at its first call-to-action beat (`cta: true`). That removes:
- the "Like the video and follow History Sketches…" line;
- the comments question;
- the loop line;
- the key-text flash.

The cold open stays and works as the chapter's hook. The voices are not re-recorded.

| Step | Command |
|---|---|
| 1. Make landscape chapter timelines | `python3 prep_chapters.py [ep …]` |
| 2. Render the chapters at 1920x1080 | `node ~/cosmic-run/.claude/skills/story-video/scripts/render.mjs ~/cosmic-run/videos/out/rome/long/<ep>` |
| 3. Make the intro/outro narration (bm_fable) and the interlude sound | `~/.cache/kokoro/venv/bin/python globe_audio.py` |
| 4. Render the globe clips, once per part | `cd globe && PART=1 node globe.mjs` |
| 5. Join the part and write its description | `python3 assemble.py 1` → `videos/out/rome/long/ancient_rome_part_1.mp4` and `../YOUTUBE_LONG_PART_1.md` |

**Config files:**
- `chapters.json` lists the chapter order, the part of each chapter, and the globe position and place label.
- `longform.json` holds each part's title, subtitle, YouTube title, and the intro and outro lines.

`geo/` and `globe/node_modules` are symlinks to `../../spain/longform/`.
