"""Pick the cleanest Chatterbox take per line by transcript -> work/cb/line_XX.wav. usage: pick.py <scene_dir>  (run with the kokoro venv: faster-whisper)"""
import json, glob, re, shutil, sys, soundfile as sf, numpy as np
from faster_whisper import WhisperModel
S = sys.argv[1]; L = json.load(open(f"{S}/work/lines.json")); m = WhisperModel("base.en", device="cpu", compute_type="int8")
norm = lambda s: re.sub(r"[^a-z ]", "", s.lower().replace("-", " ")).split()
bad = []
for i, row in enumerate(L):
    want = norm(row[1]); best = None
    for p in sorted(glob.glob(f"{S}/work/cb/cand_{i:02d}_*.wav")):
        x, sr = sf.read(p, dtype="float32"); x = x if x.ndim == 1 else x.mean(1)
        y = np.interp(np.arange(int(len(x) * 16000 / sr)) * sr / 16000, np.arange(len(x)), x).astype(np.float32)
        got = norm(" ".join(s.text for s in m.transcribe(y, beam_size=3)[0]))
        extra = len([w for w in got if w not in want]) + len([w for w in want if w not in got])
        if best is None or (extra, len(x)) < best[0]: best = ((extra, len(x)), p, got)
    if best: shutil.copy(best[1], f"{S}/work/cb/line_{i:02d}.wav"); print(i, "extra", best[0][0], row[1], "|", " ".join(best[2]))
    if not best or best[0][0] > 0: bad.append(i)
print("BAD", ",".join(map(str, bad)))
