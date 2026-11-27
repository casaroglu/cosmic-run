"""Chatterbox: 2 candidates per Toast/Pixi line for every Long 3 scene -> scenes/<s>/work/cb/cand_XX_k.wav"""
import json, os, sys, glob, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
VL = os.path.expanduser("~/cizgi/voice-lab"); P = os.path.expanduser("~/cizgi/toast-long3/scenes")
V = {"toast": (f"{VL}/ref_toast.wav", 1.0, 0.3), "pixi": (f"{VL}/ref_pixi_human.wav", 0.55, 0.5)}
m = ChatterboxTTS.from_pretrained(device="mps" if torch.backends.mps.is_available() else "cpu")
scenes = sys.argv[1:] or sorted(os.listdir(P), reverse=True)
for k in range(1):
    for s in scenes:
        L = json.load(open(f"{P}/{s}/work/lines.json"))
        for i, row in enumerate(L):
            sp, text = row[0], row[1]; p = f"{P}/{s}/work/cb/cand_{i:02d}_{k}.wav"
            if os.path.exists(p) or sp not in V: continue
            ref, ex, cw = V[sp]; torch.manual_seed(7 + i + 101 * k)
            w = m.generate(text.replace("A.M.", "ay em"), audio_prompt_path=ref, exaggeration=ex, cfg_weight=cw); ta.save(p, w, m.sr); print(s, i, k, sp, text, flush=True)
print("done")
