# Blocky World (working title) — Toast & Pixi

English comedy Shorts for a global audience with original blocky characters (no Roblox name, logo or avatar shapes).
Plan doc: https://claude.ai/artifact/A1H6ARuZnyBf6BuKdrgBCC

- Working project: `~/cizgi/blocky-world/` (cizgi kit + `blocky/rig.js`).
- `rig.js`: 3D box rig (`blocky`, `makeToast`, `makePixi`, `makeDonutsaurus`), canvas face expressions
  (happy, grin, shock, scared, smug, deadpan, sad, angry, dizzy, blink), `pose({...})` per character.
- `character_sheet_story.js`: renders the 3-pose sheet (frames 0-8) and the group shot (frame 9).
- Rig now has elbows, knees, pop-out eyes (`eyePop`) and a break-apart sim (`burst`).
- `ragdoll_test_story.js` + `ragdoll_test_sound.json`: 7 s gag test (crash zoom, flight, TOASTED banner, HO HO HO bubble).
- `voices/`: Kokoro voice candidates per character (`voice_samples.py`).
- `night-shift-01_script.md`: pilot script.
- Style: exaggerated gags in every beat (crash zooms, boing, HA HA bubbles, banners).
- Status 2026-11-25: voice candidates, ragdoll test and pilot script sent for approval. Next: build the pilot.

Decisions accepted 2026-11-25: channel name proposal "Toast & Pixi", 13+ (not made for kids, rule to verify),
Kokoro voices first (VoxCPM2 trial for Toast), first series Night Shift, 1 Short/day at 23:00 TR.
