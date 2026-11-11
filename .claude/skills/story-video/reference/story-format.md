# Story JSON format

```json
{
  "title": "I fell in love with my agent.",
  "part": 1, "total_parts": 3,
  "ai_name": "Nova", "human_name": "Eli",
  "voices": { "narrator": "am_michael", "ai": "af_heart" },
  "speed":  { "narrator": 1.05, "ai": 1.0 },
  "music":  { "mood": "bittersweet", "seed": 1, "level": 0.32 },
  "accent": "#FFD54A",
  "app_name": "Kindred",                 // shown on notification banners
  "ai_colors": ["#ffd2b8", "#ff7a59", "#8a2b1f"], // avatar gradient
  "highlight": ["boyfriend", "$19.99"],  // title words drawn in the accent colour
  "narrator_hair": "long",               // narrator silhouette (omit = short)
  "post":   { "caption": "… — a fictional story", "hashtags": ["ai", "storytime"] },
  "beats":  [ ... ]
}
```

## Beat types

| type | spoken by | on screen | fields |
|---|---|---|---|
| `title` | narrator | "PART N" pill + big hook text, words light up as spoken | `text`, `scene` |
| `narration` | narrator | animated scene + word-by-word captions | `text`, `scene` |
| `chat` | `from:"ai"` → AI voice (typing dots first); `from:"me"` → narrator | phone chat bubble | `from`, `text`, `speak:false` for a silent message |
| `system` | — (ding sound) | red system notice in the chat | `text`, `hold` (s) |
| `chat` + `photo` | — (pop) | photo bubble; `photo`: `latte` `sunset` `flower` `cloud` `street` (add more in `PHOTOS` in renderer.html) | `from`, `photo`, `hold` |
| `paywall` | — (ding, tap, purchase chime) | upgrade card in the chat with a button that gets tapped | `title`, `text`, `button`, `done` (label after purchase), `hold`, `tap:false` = not bought |
| `notify` | AI voice | lock-screen notification banner drops over the current scene, phone buzzes | `text`, `title` (default AI name), `speak:false` |
| `file` | AI voice, slower | text-file card, words reveal as spoken | `title` (file name), `text` |
| `pause` | — | holds current frame | `seconds` |
| `end` | — (whoosh) | end card with pulsing button | `text`, `sub`, `hold` |

Common optional fields on any spoken beat: `say` (pronunciation override; `text` is what's shown), `speed`, `gap` (pause after), `gain`, `hold_after`.

`scene` is sticky: it stays until a later beat sets another. Scenes cross-fade. The phone slides in for any run of consecutive `chat`/`system`/`file`/`paywall` beats (`notify` stays on the scene) and slides out on the next `narration`.

Scenes: `desk` (person at glowing monitor, code scrolling), `room` (dark bedroom, rainy window, phone glow), `city` (purple night skyline, rain), `black` (near-black, pulsing glow — for shocks/turning points), `dawn` (sunrise balcony, person on a call — for resolution), `cafe` (date night: candle-lit table, the date across from the narrator, phone on the table lights up on `notify`).

## Script-writing rules (what makes these perform)
1. **Hook in the first 2 seconds.** The title beat *is* the hook. A confession or a contradiction in under 8 words.
2. **One idea per line.** Narration beats ≤ 20 words. Short sentences, written to be heard.
3. **Alternate:** 1–2 narration beats → 2–3 chat beats → narration. Never more than 3 narration beats in a row.
4. **Chat lines carry the emotion; narration carries time skips.** The AI's lines are short, specific, and a little too perfect ("You said that on Monday.").
5. **Concrete details beat adjectives:** "3:12 AM", "214 days", "your sister called twice".
6. **Each part ends on an open loop** (Part 1: the realisation, Part 2: the twist, Part 3: the resolution plus one quotable line), followed by the `end` beat.
7. **Length:** 110–140 spoken words ≈ 40–55 s.
8. **Series continuity:** same title, names and voices in every part. Part N ≥ 2 opens with the title beat again (the hook repeats for new viewers).
