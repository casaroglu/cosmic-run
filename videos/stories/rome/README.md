# Ancient Rome (753 BC – AD 1453)

Dialogue Shorts: Ava asks (af_heart), Theo answers (bm_fable). Sketch maps (frontiers growing, roads, legions), public-domain paintings, globe flights.
New in this series (from the "random shorts" tools): HyperFrames motion cards (GSAP, platform safe-zone checks) and, only where no PD image exists,
locally generated scene illustrations (Qwen-Image 2.1 Turbo via stable-diffusion.cpp; never portraits of real people). Ends with a long-form cut.

| # | Topic | Hook idea | Status |
|---|---|---|---|
| 01 | Romulus, the Palatine village, the kings (753–509 BC) | Was Rome really founded by twins raised by a wolf? | rendered (hook/loop; story-video style) |
| 02 | The Gauls sack Rome (390 BC), Vae victis, Rome takes Italy by 264 BC | Did Rome really pay a ransom in gold? | rendered (hook/loop; story-video style) |
| 03 | Punic Wars: Hannibal's elephants over the Alps (218 BC) | Did Hannibal really march elephants over the Alps? | rendered (hook/loop; story-video style) |
| 04 | Carthage destroyed, Greece taken (146 BC) | Did Rome really wipe out two cities in one year? | rendered (hook/loop; story-video style) |
| 05 | Caesar crosses the Rubicon (49 BC) | Why does crossing the Rubicon mean there's no way back? | rendered (hook/loop; story-video style) |
| 06 | Ides of March (44 BC) | Who stabbed Julius Caesar 23 times? | rendered (hook/loop; story-video style) |
| 07 | Augustus: the first emperor (27 BC) | Why is August named after a Roman emperor? | rendered (hook/loop; story-video style) |
| 08 | Roads, aqueducts, concrete | Roman concrete still stands; ours cracks | rendered (hook/loop; B+C cizgi style) |
| 09 | Pompeii (AD 79) | A city frozen in one afternoon | rendered (hook/loop; B+C cizgi style) |
| 10 | Trajan: the empire at its largest (AD 117) | Rome's biggest map | rendered (hook/loop; B+C cizgi style) |
| 11 | Hadrian's Wall (AD 122) | Why Rome built a wall across Britain | rendered (hook/loop; B+C cizgi style) |
| 12 | Crisis of the Third Century | 26 emperors in 50 years | rendered (hook/loop; B+C cizgi style) |
| 13 | Constantine and Constantinople (AD 330) | The emperor who moved Rome | rendered (hook/loop; B+C cizgi style) |
| 14 | 476: the West falls | Rome didn't fall in 476 | rendered (hook/loop; B+C cizgi style) |
| 15 | 1453: the last Roman emperor (links to Ottoman 04a/04b) | Rome ended in Istanbul | rendered (hook/loop; B+C cizgi style) |

**From episode 05: side cameos.** Any beat can carry `"cameo": {key, side, y, w, style: photo|coin|cutout, caption, hold}`: a PD/CC0 portrait, a coin or a cut-out figure slides in from the frame edge (renderer `drawCameos`); the text audit treats active cameos as no-go zones for map labels. Cut-out figures: Qwen-Image on white, background removed with `/tmp`-style flood fill (see 05-rubicon/RESEARCH.md).

**Long-form (2026-11-24):** three parts of 8 minutes or more, built from the Shorts with the CTA cut out (see `longform/README.md`). Part 1 = 01–05 (9:34), Part 2 = 06–10 (9:42), Part 3 = 11–15 (8:47) → `videos/out/rome/long/ancient_rome_part_N.mp4`, descriptions in `YOUTUBE_LONG_PART_N.md`, thumbnails `videos/out/rome/long/thumb_part_N.jpg`.
