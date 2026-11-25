"""Retakes: for given line indices make N candidates (different seeds) -> outdir/cand_<i>_<k>.wav. usage: cb_retake.py lines.json outdir i,j,k [N]"""
import json, os, sys, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
D = os.path.dirname(os.path.abspath(__file__)); src, out, idx = sys.argv[1], sys.argv[2], [int(v) for v in sys.argv[3].split(",")]; N = int(sys.argv[4]) if len(sys.argv) > 4 else 4
V = {"toast": (f"{D}/ref_toast.wav", 1.0, 0.3), "pixi": (f"{D}/ref_pixi_human.wav", 0.55, 0.5)}
m = ChatterboxTTS.from_pretrained(device="mps" if torch.backends.mps.is_available() else "cpu"); L = json.load(open(src))
for i in idx:
    sp, text = L[i][0], L[i][1]; ref, ex, cw = V[sp]; t = text.replace("A.M.", "ay em").replace("...", ".")
    for k in range(N):
        p = f"{out}/cand_{i:02d}_{k}.wav"
        if os.path.exists(p): continue
        torch.manual_seed(100 + i * 10 + k); e = ex if k < N // 2 + 1 else ex * 0.8
        w = m.generate(t, audio_prompt_path=ref, exaggeration=e, cfg_weight=cw); ta.save(p, w, m.sr); print(i, k, flush=True)
print("done")
