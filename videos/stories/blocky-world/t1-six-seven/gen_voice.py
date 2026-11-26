"""T1 voice: Toast/Pixi from cb/line_XX.wav (Chatterbox, long pauses squeezed), kid(s) = Kokoro +7 st (kids = 3 layered takes), admin = bm_george -4 st + reverb."""
import sys, json, os, wave, numpy as np
sys.path.insert(0, os.path.expanduser("~/cosmic-run/.claude/skills/story-video/scripts"))
import build_audio as B, align as A
import soundfile as sf
W = os.path.expanduser("~/cizgi/toast-t1/work"); SR = B.SR
DUR = [1.5, 3.0, 2.2, 2.0, 2.5, 2.8, 2.5, 1.2, 2.5, 2.6, 3.2, 2.2, 2.5, 1.3]
lines = json.load(open(f"{W}/lines.json"))
RMS_DB = {"toast": -19.0, "pixi": -15.0, "kid": -17.0, "kids": -16.0, "admin": -17.0}
def lvl(x, sp):
    r = np.sqrt(np.mean(x[np.abs(x) > 0.01] ** 2) + 1e-9); x = x * (10 ** (RMS_DB.get(sp, -18) / 20) / r); return (np.tanh(x * 1.2) / 1.2).astype(np.float32)
def squeeze(y, mx=0.28):
    e = np.convolve(np.abs(y), np.ones(480) / 480, "same"); q = e < 0.008; out, i, N, M = [], 0, len(y), int(mx * SR)
    while i < N:
        j = i
        while j < N and q[j] == q[i]: j += 1
        seg = y[i:j]
        if q[i] and j - i > M and i > 0 and j < N: seg = np.concatenate([seg[: M // 2], seg[-M // 2:]])
        out.append(seg); i = j
    return np.concatenate(out)
def kok(text, v, st, spd):
    r = 2 ** (st / 12); x = B.trim(B.tts(text, v, spd / r)); return B.shape_voice(x, pitch=st) if st else x
clips = []
for i, (sp, text, shot, off) in enumerate(lines):
    cb = f"{W}/cb/line_{i:02d}.wav"
    if sp in ("toast", "pixi") and os.path.exists(cb):
        y0, sr0 = sf.read(cb, dtype="float32"); y0 = y0 if y0.ndim == 1 else y0.mean(1); x = np.interp(np.arange(int(len(y0) * SR / sr0)) * sr0 / SR, np.arange(len(y0)), y0).astype(np.float32); x = squeeze(B.trim(x))
    elif sp == "kid": x = kok(text, "am_puck", 7, 1.1)
    elif sp == "kids":
        takes = [kok(text, v, 7, s) for v, s in (("am_puck", 1.1), ("af_sky", 1.05), ("am_echo", 1.15))]
        n = max(len(t) for t in takes) + int(0.06 * SR); x = np.zeros(n, np.float32)
        for k, t in enumerate(takes): a = int(k * 0.025 * SR); x[a:a + len(t)] += t[: n - a] / max(1e-6, np.abs(t).max())
    elif sp == "admin": x = B.reverb(kok(text, "bm_george", -4, 0.9), seconds=1.6, mix=0.3)
    clips.append(lvl(np.concatenate([x, np.zeros(int(0.1 * SR), np.float32)]), sp))
starts, shots, t = [None] * len(lines), [], 0.0
for si, d in enumerate(DUR, 1):
    s0, need, prev = t, d, None
    for i, (sp, text, shot, off) in enumerate(lines):
        if shot != si: continue
        st = (prev + float(off.split("+")[1])) if isinstance(off, str) else s0 + off
        starts[i] = st; prev = st + len(clips[i]) / SR; need = max(need, prev - s0 + 0.25)
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
json.dump({"total": round(t, 3), "shots": shots}, open(f"{W}/timeline.json", "w"), indent=1); print("total", round(t, 2)); [print(s["shot"], s["s"], s["e"], s["sp"], s["text"]) for s in segs]
