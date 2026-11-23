# Why You Learn to Love Coffee. Explained in 3 Minutes

**Title:** Why You Learn to Love Coffee. Explained in 3 Minutes
**Hook (cover):** YOUR GUT TRAINED YOUR TASTE
**Format:** Q&A — Ava (`af_heart`) asks, Theo (`bm_fable`) answers; 423 words, 20 lines, 3 chapters (compact episode, about 2.5–3 min with thumbnail intro and 10 s end screen).
**Thumbnail:** PENDING — Gemini step skipped for this episode. `thumb/thumbnail.jpg` is a placeholder (the outro title frame, t = 141 s) so the master could be built; make the Gemini cover (style ref = our own frames, hook above), then re-run the master step so the 1.5 s thumbnail intro uses it.
Built with `../_engine/` + `common.js` cast system + `icons2.js` (interacting icons). New icons in `topic.js`: face (yuck/love), tongue (bitter buds), milkshake, sugar cube, fat drop, stomach, villi with nutrient sensors, dopamine molecule, side brain with amygdala glow, top-view brain (left/right glow), flavoured bottle, wall switch, brain scanner.

## The study
Grove J.C.R., … Small D.M., Tittgemeyer M., Knight Z.A. "The neural basis of flavor-nutrient learning." *Nature*, published online 4 Nov 2026. DOI [10.1038/s41586-026-11229-5](https://doi.org/10.1038/s41586-026-11229-5). Preprint: "A lateralized pathway for associating nutrients with flavors", bioRxiv 2025, DOI [10.1101/2025.02.09.637334](https://doi.org/10.1101/2025.02.09.637334) (PubMed 41394705, PMC12697670).

## Why this topic (YouTube check, 2026-11-23)
Search `/results?search_query=…` in a youtube.com tab, `ytInitialData` parsed:
- "why bitter coffee tastes good new study": top long video on the new study 3,441 views (21 min, 3 weeks); older generic coffee videos (Hoffmann 1.4M, TED-Ed caffeine 5.9M) are about brewing or caffeine, not this mechanism.
- "gut brain dopamine flavor learning nature study": Nature-specific explainer 1 view; Shorts on the study max ~1,100–1,300 views.
- Compared candidates: energy drinks & cardiac arrest (AHA Nov 2026) already has a 114,629-view 14-min explainer plus 3.25M older videos; leukemia-50-years (Nature Nov 2026) low coverage (max 38) but weak hook for 25–44; protein vs testosterone (Int J Food Sci Nutr) 5,613 + 706k related; coffee & dementia 1.05M (older study).

## YouTube chapters
0:00 Intro: why does coffee taste awful at first?
0:23 The slow dopamine
1:17 The left-side surprise
1:42 Back to your coffee

## Fact check (two sources each)
| Claim | Sources |
|---|---|
| Study in *Nature*, published 4 Nov 2026, UCSF (senior author Zachary Knight), with Max Planck Institute for Metabolism Research and Yale | UCSF press release via EurekAlert 1150381 (4 Nov 2026); Sci.News (Nov 2026, citing DOI 10.1038/s41586-026-11229-5); News-Medical (4 Nov 2026) |
| Bitterness is a taste we naturally avoid; bitter detection evolved to flag plant toxins (so "could be poison", not "is") | UCSF release (first sip of coffee unpleasant); Wooding et al. review "Bitter taste receptors: genes, evolution and health", *Evol Med Public Health* 2021 (PMC8830313) |
| Most dopamine research is on fast signals triggered within seconds by external events (e.g. seeing a favourite food); this pathway is slow, driven from inside the body | UCSF release; preprint discussion (cue dopamine "within a few seconds" vs gut signals ramping over tens of minutes) |
| Mice got sugar water or a milkshake-like liquid (Ensure) directly into the stomach, bypassing taste | UCSF release; Sci.News; preprint methods |
| Gut sensors for sugar and fat drive the signal | UCSF release ("sensors in the digestive system detect nutrients such as sugar and fat"); preprint (SGLT1 for glucose; GPR40/120 + CD36 for fat) |
| Dopamine rose in the anterior basolateral amygdala, and stayed elevated for many minutes (preprint: onset ~48 s after nutrients entered the stomach, ~9 min after infusion ended) | UCSF release ("can persist for many minutes"); preprint (Extended Fig. 3) |
| Blocking the signal: mice ate normally but did not learn that a new flavour meant calories | UCSF release; Sci.News |
| Stimulating the dopamine fibres after a calorie-free flavour made mice prefer it | UCSF release; Sci.News; preprint |
| Humans: PET reanalysis of 13 men drinking a milkshake (vs noncaloric drink); new fMRI study of 38 adults (glucose vs water); same region active | UCSF release; Sci.News; preprint methods (38 participants, 19 female, mean age 29) |
| Response much stronger on the left side, in mice and humans; unexpected; cause still being studied (vagus asymmetry ruled out in preprint) | UCSF release; Sci.News; preprint Fig. 6 |
| Coffee and caffeine were NOT tested; coffee is Knight's illustration (brain links flavour with caffeine's lift, "coffee starts to taste a lot better") | UCSF release (quote); Sci.News; SciTechDaily |
| GLP-1 drugs (e.g. Ozempic) not studied; Knight speculates they might reduce nutrient-triggered dopamine and make food less rewarding | UCSF release; Sci.News; Neuroscience News |

## Production notes
- Voices: `make_voice.py` (Kokoro, Ava 4% faster, 0.45 s after questions); mix: `make_sound.py`; master: `master.sh`.
- Renders and mix.wav are not committed (same as ep 14).
