#!/usr/bin/env python3
"""Redraw a public-domain portrait as a clean comic-style character (SDXL + ControlNet canny),
then cut it out to a transparent PNG. Runs locally on Apple Silicon (MPS), a few minutes per image.

usage: character_sdxl.py PORTRAIT.jpg OUT_PREFIX --who "an Ottoman sultan with a large white turban and grey beard"
       [--accent "red kaftan"] [--seeds 1 2 3] [--control 0.7] [--slow]
Default is fast: SDXL-Lightning 8-step LoRA (ByteDance/SDXL-Lightning, openrail++), no CFG.
--slow uses the plain 28-step base model with a negative prompt.
Control image = edges of the portrait's cut-out only (rembg mask), so inscriptions, frames and
patterned backgrounds in the painting never reach the drawing; CLAHE + bilateral smoothing keeps
face lines and drops canvas texture.
Writes OUT_PREFIX_<seed>.png (cut-out) and OUT_PREFIX_<seed>_raw.png.
Models (Hugging Face cache): stabilityai/stable-diffusion-xl-base-1.0 (CreativeML Open RAIL++-M),
diffusers/controlnet-canny-sdxl-1.0, madebyollin/sdxl-vae-fp16-fix. Venv: ~/.cache/lineart/venv.
"""
import argparse, time
import numpy as np
import torch
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--who", required=True, help="what the person looks like (from the portrait)")
ap.add_argument("--accent", default="red clothing", help="the one coloured element")
ap.add_argument("--seeds", type=int, nargs="+", default=[7])
ap.add_argument("--slow", action="store_true", help="28-step base model instead of Lightning")
ap.add_argument("--steps", type=int, default=None)
ap.add_argument("--control", type=float, default=0.7, help="how closely to follow the portrait's edges")
ap.add_argument("--width", type=int, default=832); ap.add_argument("--height", type=int, default=1216)
a = ap.parse_args()

STYLE = ("black and white comic ink drawing, bold black outlines, flat grey cel shading, "
         "only the {accent} is coloured, plain white background, graphic novel line art")
NEG = ("photo, photorealistic, realistic skin, oil painting, canvas texture, brush strokes, 3d render, "
       "gradient, blurry, noisy, text, letters, watermark, signature, frame, border, extra limbs, deformed face")

dev = "mps" if torch.backends.mps.is_available() else "cpu"
dt = torch.float16 if dev == "mps" else torch.float32
from diffusers import StableDiffusionXLControlNetPipeline, ControlNetModel, AutoencoderKL
cn = ControlNetModel.from_pretrained("diffusers/controlnet-canny-sdxl-1.0", variant="fp16", torch_dtype=dt)
vae = AutoencoderKL.from_pretrained("madebyollin/sdxl-vae-fp16-fix", torch_dtype=dt)
pipe = StableDiffusionXLControlNetPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0", controlnet=cn, vae=vae, variant="fp16", torch_dtype=dt, use_safetensors=True)
if not a.slow:
    from diffusers import EulerDiscreteScheduler
    from huggingface_hub import hf_hub_download
    pipe.load_lora_weights(hf_hub_download("ByteDance/SDXL-Lightning", "sdxl_lightning_8step_lora.safetensors"))
    pipe.fuse_lora()
    pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config, timestep_spacing="trailing")
steps = a.steps or (28 if a.slow else 8)
cfg = 6.5 if a.slow else 0.0
pipe.to(dev)
pipe.enable_attention_slicing()

# control image: edges of the cut-out figure only, fitted into the output frame
import cv2
from rembg import remove, new_session
sess = new_session("isnet-general-use")
src = Image.open(a.src).convert("RGB")
s = min(a.width / src.width, a.height / src.height)
fit = src.resize((round(src.width * s), round(src.height * s)), Image.LANCZOS)
mask = (np.asarray(remove(fit, session=sess))[..., 3] > 128).astype(np.uint8)
g = cv2.cvtColor(np.asarray(fit), cv2.COLOR_RGB2GRAY)
g = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(6, 6)).apply(g)
for _ in range(3):
    g = cv2.bilateralFilter(g, 9, 40, 9)
edges = cv2.Canny(g, 40, 100) * cv2.erode(mask, np.ones((5, 5), np.uint8))
rim = cv2.morphologyEx(mask * 255, cv2.MORPH_GRADIENT, np.ones((3, 3), np.uint8))
edges = np.maximum(edges, rim)
canvas = np.zeros((a.height, a.width), np.uint8)
x0, y0 = (a.width - fit.width) // 2, a.height - fit.height
canvas[y0:y0 + fit.height, x0:x0 + fit.width] = edges
ctrl = Image.fromarray(np.stack([canvas] * 3, -1))
ctrl.save(a.out + "_control.png")

prompt = STYLE.format(accent=a.accent) + f", {a.who}"   # style first: CLIP keeps 77 tokens
for seed in a.seeds:
    t = time.time()
    img = pipe(prompt, negative_prompt=NEG, image=ctrl, controlnet_conditioning_scale=a.control,
               num_inference_steps=steps, guidance_scale=cfg, width=a.width, height=a.height,
               generator=torch.Generator("cpu").manual_seed(seed)).images[0]
    img.save(f"{a.out}_{seed}_raw.png")
    remove(img, session=sess).save(f"{a.out}_{seed}.png")
    print(f"seed {seed}: {time.time() - t:.0f}s -> {a.out}_{seed}.png", flush=True)
