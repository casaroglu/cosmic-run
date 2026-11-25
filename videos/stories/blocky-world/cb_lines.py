"""Voice a lines.json with Chatterbox: Toast = clone e1.0/cfg0.3, Pixi = clone e0.6/cfg0.45. usage: cb_lines.py <lines.json> <outdir>"""
import json, os, sys, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
D = os.path.dirname(os.path.abspath(__file__)); src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
V = {"toast": (f"{D}/ref_toast.wav", 1.0, 0.3), "pixi": (f"{D}/ref_pixi.wav", 0.6, 0.45)}
m = ChatterboxTTS.from_pretrained(device="mps" if torch.backends.mps.is_available() else "cpu")
for i, row in enumerate(json.load(open(src))):
    sp, text = row[0], row[1]; p = f"{out}/line_{i:02d}.wav"
    if os.path.exists(p) or sp not in V: continue
    ref, ex, cw = V[sp]; torch.manual_seed(7 + i)
    w = m.generate(text.replace("A.M.", "ay em").replace("...", "…"), audio_prompt_path=ref, exaggeration=ex, cfg_weight=cw); ta.save(p, w, m.sr); print(i, sp, text, flush=True)
print("done")
