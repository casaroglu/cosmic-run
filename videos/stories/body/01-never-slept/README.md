# Human Body 01: What if you never slept? (60 s, 1920x1080)

Code-drawn animated explainer (no AI images): one 2D canvas + one WebGL canvas (brain sphere). `index.html` draws frame t with `window.seek(t)`.

- Voice: Kokoro `bm_fable` (`make_voice.py` → `audio/voice.wav`, word times with faster-whisper `base.en` → `audio/words.json`). Cues fire on their words (`buildCues`).
- Sound: synthesized ambience + event effects, no downloads (`make_sound.py`), compressed + limited to -13.9 LUFS / -2.4 dBTP (`audio/mix.wav`).
- Render: `node render.mjs contact x` (contact frames) / `node render.mjs video OUT.mp4` (Chrome GPU, 30 fps, 2 subframes, shutter 0.6). Output in `videos/out/body/01-never-slept/` (master CRF 16, delivery CRF 20).

## Fact check
| Claim | Source |
|---|---|
| ~1/3 of life asleep (~26 of 79 years) | NHLBI "Sleep Deprivation and Deficiency"; Sleep Foundation |
| 17 h awake ≈ 0.05% BAC, 24 h ≈ 0.10% (task-dependent) | Dawson & Reid, *Nature* 388 (1997); Williamson & Feyer, *Occup. Environ. Med.* (2000) |
| Sleep expands interstitial space ~60% and speeds β-amyloid clearance (mice) | Xie et al., *Science* 342 (2013) |
| Microsleeps, possible with eyes open | Wikipedia "Microsleep"; Poudel et al. (2014) |
| Perceptual distortions → hallucinations by ~day 3 | Waters et al., *Frontiers in Psychiatry* (2018) |
| Randy Gardner, 17, 264.4 h (11 days 25 min), Dec 1963–Jan 1964; first slept 14 h 46 min | Wikipedia "Randy Gardner sleep deprivation experiment"; Dement, *The Promise of Sleep* |
| Totally sleep-deprived rats died in 11–32 days | Rechtschaffen et al., *Sleep* 12 (1989) |
