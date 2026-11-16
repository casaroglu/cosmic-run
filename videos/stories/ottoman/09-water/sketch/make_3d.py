#!/usr/bin/env python3
"""Render the Taksim 3D clip for the beats whose scene is "maksem3d".
usage: make_3d.py OUT_DIR(with timeline.json) EPISODE_DIR
Writes EPISODE_DIR/sketch/maksem3d.mp4 (Blender, Eevee; camera shots from each beat's "shot")."""
import json, os, subprocess, sys
out, ep = sys.argv[1], sys.argv[2]
tl = json.load(open(os.path.join(out, "timeline.json")))
bs = [b for b in tl["beats"] if b.get("scene") == "maksem3d"]
t0 = bs[0]["start"]; t1 = max(b["end"] for b in bs) + 1.5   # crossfade tail
mini = {"fps": 30, "duration": round(t1 - t0, 3),
        "beats": [{"start": b["start"] - t0, "end": b["end"] - t0, "shot": b.get("shot")} for b in bs]}
work = os.path.join(out, "blender3d"); os.makedirs(work, exist_ok=True)
json.dump(mini, open(os.path.join(work, "tl.json"), "w"))
subprocess.run(["blender", "-b", "--python", os.path.join(ep, "sketch", "maksem_scene.py"), "--",
                os.path.join(work, "tl.json"), work], check=True, stdout=subprocess.DEVNULL)
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-framerate", "30", "-i", os.path.join(work, "frames", "f_%04d.jpg"),
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", os.path.join(ep, "sketch", "maksem3d.mp4")], check=True)
print("3d clip", mini["duration"], "s")
