# POV Music: looping POV rides with original silly house songs

Channel idea: long, seamlessly looping first-person rides (roller coaster first, later downhill ski,
MTB, chase) under an original house track with catchy, rhyming, slightly absurd lyrics and
word-by-word karaoke captions. Every frame is drawn in code and every song is generated locally,
so there is no third-party footage or music to claim.

## Prototype 01: "Noodle in the Soup" (roller coaster)

Output: `videos/out/pov-music/proto_01.mp4` (1080x1920, 30 fps, 60 s, gitignored like all renders)

| Step | What | Where |
|---|---|---|
| Lyrics | 3 options written (house, 124 BPM); A used | `proto_01/lyrics_options.md`, `proto_01/song.json` |
| Song | ACE-Step 1.5 turbo DiT + 1.7B LM, MLX/MPS, 2 seeds, ~8.5 min per 62 s song on the M1 16 GB | `scripts/gen_song.py` |
| Pick | seed 1207 (Whisper matched 81/96 lyric tokens; seed 4242 barely sang the chorus) | `proto_01/song.json` → `picked` |
| Beats | librosa beat tracker, then downbeats (every 4th beat, phase picked by onset strength) | `scripts/sync.py` |
| Words | Whisper medium.en word timestamps, matched to the known lyrics with difflib, gaps interpolated | `scripts/sync.py` (cached in `whisper.json`) |
| Ride | procedural three.js coaster: lift, 51 m drop, vertical loop, camelback, banked 180, airtime hills, S-bends | `coaster/coaster.html` |
| Sync | lift crest pinned to verse line 3 ("My hat went left…"), loop top pinned to the first "Loop-de-loop", camera dips on each beat and the FOV punches on downbeats | `coaster.html` `buildTimeMap`, `drawFrame` |
| Loop | the clip starts partway up the lift and ends on the same spot, so it loops seamlessly | `START` in `coaster.html` |
| Render | headless Chromium (Playwright) on the Metal GPU, JPEG frames piped to ffmpeg, loudnorm -14 LUFS | `coaster/render.mjs` |

Reproduce:
```bash
# one-time setup (models ~9.4 GB in tools/ace-step/checkpoints, gitignored)
git clone --depth 1 https://github.com/ace-step/ACE-Step-1.5 tools/ace-step   # tested at ca1e85f
python3.11 -m venv tools/venv-ace && tools/venv-ace/bin/pip install uv
tools/venv-ace/bin/uv pip install --python tools/venv-ace/bin/python -e tools/ace-step librosa openai-whisper
(cd tools/ace-step && ../venv-ace/bin/acestep-download)

# per video
PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0 tools/venv-ace/bin/python videos/stories/pov-music/scripts/gen_song.py videos/stories/pov-music/proto_01/song.json videos/stories/pov-music/proto_01/gen
# copy the chosen wav to proto_01/song.wav, then:
tools/venv-ace/bin/python videos/stories/pov-music/scripts/sync.py videos/stories/pov-music/proto_01
node videos/stories/pov-music/coaster/render.mjs videos/stories/pov-music/proto_01      # --preview 5 20 40 for stills
```
On 16 GB the LM and DiT don't fit on the GPU together (MPS out of memory at batch 2), so
`gen_song.py` uses `offload_to_cpu=True` and generates one seed at a time.

## Licenses (everything used is OK for commercial use)

| Tool / model | Used for | License | Commercial output |
|---|---|---|---|
| ACE-Step 1.5 code (github.com/ace-step/ACE-Step-1.5) | song generation | MIT | yes |
| ACE-Step 1.5 weights (HF `ACE-Step/Ace-Step1.5`: turbo DiT, 5Hz LM 1.7B, VAE) | song generation | MIT (model card) | yes |
| Qwen3-Embedding-0.6B (bundled in the ACE-Step checkpoint) | text encoder | Apache-2.0 | yes |
| MLX / mlx-lm | Apple-Silicon inference | MIT | yes |
| PyTorch | inference | BSD-3-Clause | yes |
| openai-whisper code + medium.en weights | word timestamps | MIT | yes |
| librosa | beat tracking | ISC | yes |
| three.js r169 | 3D ride (all geometry generated in code) | MIT | yes |
| Playwright + Chromium | headless rendering | Apache-2.0 / BSD | yes (tools only) |
| FFmpeg (+x264) | encoding | LGPL/GPL | yes (tools only; the output isn't covered) |
| Inter / Helvetica / Arial (system fonts) | captions | system fonts, rendered into pixels | yes |

Not used on purpose: MusicGen / AudioCraft weights (CC-BY-NC, no commercial use), stock clips,
game captures, any reference audio.

Notes on rights:
- Lyrics are original (written for this project). The track is AI-generated from our own lyrics
  and text prompt only (no reference audio). In the US a purely AI-generated recording may not be
  copyrightable, so others could reuse it. That's fine for monetising but rules out Content ID
  registration. Our lyrics, track layout and edit are human-authored.
- YouTube: tick "altered or synthetic content" only if a video shows realistic people/events.
  A cartoon coaster with an AI song doesn't need it, but say "music generated with AI" in the
  description to be transparent.
- Repetitious-content policy: each upload must differ for real (new song + lyrics, a new track
  layout/scenery seed/palette, a new ride type). Don't reupload the same loop at different lengths.

## What to improve next

1. **Vocals/mix:** generate 3-4 seeds and pick by alignment score automatically; try the XL-turbo
   DiT (needs ≥12 GB with offload, probably too slow on 16 GB) or more inference steps; separate
   the vocals (Demucs, MIT) before Whisper for tighter word timings.
2. **Chorus repeat:** ACE-Step sang the chorus 3 times in 60 s although the lyrics had 2; write
   the lyrics for the full length (or use `caption_lyrics`, as here) so the captions never go blank.
3. **Ride variety:** randomise the track layout from a seed (extra inversions, tunnels, splashdown),
   time-of-day palettes (sunset, night with neon, snow), more silly props (giant rubber ducks,
   floating sandwiches that match the lyrics).
4. **Long loops:** for 10-60 min videos, chain several 60-120 s songs over a longer circuit with a
   crossfade at the station; keep the seamless start/end.
5. **Beat-sync++:** pin more track features (camelback airtime, each hill) to downbeats; add whoosh
   and rail-clack SFX (synthesised) under the music.
6. **Other rides:** ski/MTB need a terrain-following camera plus obstacles (gates, jumps); the time
   map and captions in `coaster.html` can be reused as they are.
