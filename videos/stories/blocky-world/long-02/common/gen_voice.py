"""Scene voice: lines.json [sp, text, shot, offset|'after+s'] + dur.json -> voice.wav, words.json, segments.json, timeline.json.
Toast/Pixi from work/cb/line_XX.wav (Chatterbox); other speakers from Kokoro. usage: gen_voice.py <scene_dir> (kokoro venv)"""
import sys, json, os, wave, numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
import soundfile as sf
S = sys.argv[1]; W = f"{S}/work"; SR = B.SR
DUR = json.load(open(f"{W}/dur.json")); lines = json.load(open(f"{W}/lines.json"))
KV = {"admin": ("bm_george", -4, 0.9), "mitten": ("bm_george", -6, 0.85), "brunch": ("am_michael", -1, 1.0), "gran": ("bf_emma", 2, 0.85), "zip": ("am_puck", 3, 1.3), "cubefolk": ("bm_lewis", 0, 1.0), "toast": ("am_liam", 5, 1.08), "pixi": ("af_bella", 0, 0.95)}
RMS_DB = {"toast": -19.0, "pixi": -15.0}
def lvl(x, sp):
    r = np.sqrt(np.mean(x[np.abs(x) > 0.01] ** 2) + 1e-9); x = x * (10 ** (RMS_DB.get(sp, -18) / 20) / r); return (np.tanh(x * 1.2) / 1.2).astype(np.float32)
clips = []
for i, (sp, text, shot, off) in enumerate(lines):
    cb = f"{W}/cb/line_{i:02d}.wav"
    if sp in ("toast", "pixi") and os.path.exists(cb):
        y0, sr0 = sf.read(cb, dtype="float32"); y0 = y0 if y0.ndim == 1 else y0.mean(1); x = np.interp(np.arange(int(len(y0) * SR / sr0)) * sr0 / SR, np.arange(len(y0)), y0).astype(np.float32); x = B.trim(x)
    else:
        v, st, spd = KV[sp]; r = 2 ** (st / 12); x = B.trim(B.tts(text, v, spd / r)); x = B.shape_voice(x, pitch=st) if st else x
        if sp in ("admin", "mitten"): x = B.reverb(x, seconds=1.6, mix=0.3)
    clips.append(lvl(np.concatenate([x, np.zeros(int(0.1 * SR), np.float32)]), sp))
starts, shots, t = [None] * len(lines), [], 0.0
for si, d in enumerate(DUR, 1):
    s0, need, prev = t, d, None
    for i, (sp, text, shot, off) in enumerate(lines):
        if shot != si: continue
        st = (prev + float(off.split("+")[1])) if isinstance(off, str) else s0 + off
        starts[i] = st; prev = st + len(clips[i]) / SR; need = max(need, prev - s0 + 0.3)
    shots.append({"n": si, "s": round(s0, 3), "e": round(s0 + need, 3)}); t = s0 + need
y = np.zeros(int((t + 0.1) * SR), np.float32); words, segs = [], []
for i, (sp, text, shot, off) in enumerate(lines):
    x = clips[i]; a = int(starts[i] * SR); y[a:a + len(x)] += x[: len(y) - a]
    ws = A.word_times(text, text, x, SR, starts[i])
    try: ws = A.refine(ws, x, SR, starts[i])
    except Exception: pass
    for w in ws: words.append({"w": w["w"], "s": round(w["t0"], 3), "e": round(max(w["t1"], w["t0"] + 0.05), 3), "sp": sp})
    segs.append({"sp": sp, "text": text, "shot": shot, "s": round(starts[i], 3), "e": round(starts[i] + len(x) / SR, 3)})
with wave.open(f"{W}/voice.wav", "wb") as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
json.dump(words, open(f"{W}/words.json", "w"), indent=0); json.dump(segs, open(f"{W}/segments.json", "w"), indent=1)
json.dump({"total": round(t, 3), "shots": shots}, open(f"{W}/timeline.json", "w"), indent=1); print("total", round(t, 2), "shots", len(shots))
