"""Chatterbox samples: each line with the cloned Kokoro timbre at two exaggeration levels, plus the default voice."""
import json, os, torch, torchaudio as ta
from chatterbox.tts import ChatterboxTTS
D = os.path.dirname(os.path.abspath(__file__)); dev = "mps" if torch.backends.mps.is_available() else "cpu"
m = ChatterboxTTS.from_pretrained(device=dev); L = json.load(open(f"{D}/lines.json"))
cfg = {"toast": [("clone_e07", f"{D}/ref_toast.wav", 0.7, 0.35), ("clone_e10", f"{D}/ref_toast.wav", 1.0, 0.3), ("default_e08", None, 0.8, 0.35)],
       "pixi": [("clone_e035", f"{D}/ref_pixi.wav", 0.35, 0.5), ("clone_e06", f"{D}/ref_pixi.wav", 0.6, 0.45)]}
for who, opts in cfg.items():
    for i, text in enumerate(L[who]):
        for tag, ref, ex, cw in opts:
            torch.manual_seed(7); kw = {"exaggeration": ex, "cfg_weight": cw}
            if ref: kw["audio_prompt_path"] = ref
            w = m.generate(text, **kw); ta.save(f"{D}/out/cb_{who}_{i}_{tag}.wav", w, m.sr); print(who, i, tag, flush=True)
print("done", m.sr)
