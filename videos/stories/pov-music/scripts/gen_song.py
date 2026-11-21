"""Generate a song with ACE-Step 1.5 (MIT code + MIT weights) on Apple Silicon (MLX).

usage: tools/venv-ace/bin/python videos/stories/pov-music/scripts/gen_song.py song.json OUT_DIR
song.json: {caption, lyrics, bpm, duration, keyscale, seeds:[...], lm:"acestep-5Hz-lm-1.7B"}
"""
import json
import os
import sys
import time

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../.."))
ACE = os.path.join(REPO, "tools/ace-step")
sys.path.insert(0, ACE)
os.environ.setdefault("ACESTEP_LM_BACKEND", "mlx")

from acestep.handler import AceStepHandler  # noqa: E402
from acestep.llm_inference import LLMHandler  # noqa: E402
from acestep.inference import GenerationParams, GenerationConfig, generate_music  # noqa: E402

spec = json.load(open(sys.argv[1]))
out = os.path.abspath(sys.argv[2])
os.makedirs(out, exist_ok=True)

t0 = time.time()
dit = AceStepHandler()
msg, ok = dit.initialize_service(project_root=ACE, config_path=spec.get("dit", "acestep-v15-turbo"), device="mps",
                                     offload_to_cpu=True)
print("DiT:", ok, msg[:300], flush=True)
lm = LLMHandler()
msg, ok = lm.initialize(checkpoint_dir=os.path.join(ACE, "checkpoints"), lm_model_path=spec.get("lm", "acestep-5Hz-lm-1.7B"),
                        backend="mlx", device="mps", offload_to_cpu=True)
print("LM:", ok, msg[:300], flush=True)
print(f"init {time.time() - t0:.0f}s", flush=True)

params = GenerationParams(
    caption=spec["caption"], lyrics=spec["lyrics"], bpm=spec.get("bpm"), duration=spec.get("duration", 60),
    keyscale=spec.get("keyscale", ""), timesignature="4", vocal_language="en",
    inference_steps=spec.get("steps", 8), thinking=spec.get("thinking", True),
    use_cot_caption=False,  # keep our caption as written
)
seeds = spec.get("seeds", [1])
log = []
for sd in seeds:
    config = GenerationConfig(batch_size=1, use_random_seed=False, seeds=[sd], audio_format="wav")
    t1 = time.time()
    res = generate_music(dit, lm, params, config, save_dir=out)
    print(f"seed {sd}: generate {time.time() - t1:.0f}s success={res.success} err={getattr(res, 'error', None)}", flush=True)
    for a in res.audios or []:
        print(a.get("path"), flush=True)
        log.append({"path": a.get("path"), "seed": sd})
    json.dump(log, open(os.path.join(out, "generated.json"), "w"), indent=1)
