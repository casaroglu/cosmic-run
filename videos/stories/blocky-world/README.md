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

## Night Shift #1 (pilot) — built 2026-11-25
- Folder `night-shift-01/`: story.js (set, cast, 11 shots), lines.json + gen_voice.py (Toast am_liam +5, Pixi af_bella), sound.json (music + sfx, no whoosh), extras.json + mix_extras.py (library laughs/burps + reversed customer mumble), small preview mp4, QA sheet.
- Full-quality video: `~/cizgi/blocky-world/out/Toast_and_Pixi_-_Night_Shift_01.mp4` (27.2 s, -14 LUFS, no freezes or black frames).
- Not uploaded. No Gemini cover yet (hook: HE HAS NO SHADOW).
