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
| `file` | AI voice, slower | text-file card, words reveal as spoken | `title` (file name), `text` |
| `pause` | — | holds current frame | `seconds` |
| `end` | — (whoosh) | end card with pulsing button | `text`, `sub`, `hold` |

Common optional fields on any spoken beat: `say` (pronunciation override; `text` is what's shown), `speed`, `gap` (pause after), `gain`, `hold_after`.

`scene` is sticky: it stays until a later beat sets another. Scenes cross-fade. The phone slides in for any run of consecutive `chat`/`system`/`file` beats and slides out on the next `narration`.

Scenes: `desk` (person at glowing monitor, code scrolling), `room` (dark bedroom, rainy window, phone glow), `city` (purple night skyline, rain), `black` (near-black, pulsing glow — for shocks/turning points), `dawn` (sunrise balcony, person on a call — for resolution).

## Script-writing rules (what makes these perform)
1. **Hook in the first 2 seconds.** The title beat *is* the hook. A confession or a contradiction in under 8 words.
2. **One idea per line.** Narration beats ≤ 20 words. Short sentences, written to be heard.
3. **Alternate:** 1–2 narration beats → 2–3 chat beats → narration. Never more than 3 narration beats in a row.
4. **Chat lines carry the emotion; narration carries time skips.** The AI's lines are short, specific, and a little too perfect ("You said that on Monday.").
5. **Concrete details beat adjectives:** "3:12 AM", "214 days", "your sister called twice".
6. **Each part ends on an open loop** (Part 1: the realisation, Part 2: the twist, Part 3: the resolution plus one quotable line), followed by the `end` beat.
7. **Length:** 110–140 spoken words ≈ 40–55 s.
8. **Series continuity:** same title, names and voices in every part. Part N ≥ 2 opens with the title beat again (the hook repeats for new viewers).
