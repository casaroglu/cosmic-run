#!/usr/bin/env python3
"""Put downloaded/uploaded images into an episode.

usage: add_images.py STORY.json FILE [FILE ...]        assigns files to the missing images, in NEEDED.md order
       add_images.py STORY.json key=FILE [key=FILE ...] assigns explicitly
Large images are scaled to max 2400 px on the long side (ffmpeg) to keep the repo small.
"""
import json, os, subprocess, sys

story_path, args = sys.argv[1], sys.argv[2:]
story = json.load(open(story_path))
base = os.path.dirname(os.path.abspath(story_path))
missing = [k for k, v in story["images"].items() if not os.path.exists(os.path.join(base, v["file"]))]
pairs = [a.split("=", 1) if "=" in a and a.split("=", 1)[0] in story["images"] else (None, a) for a in args]
for key, src in pairs:
    key = key or missing.pop(0)
    if key in missing:
        missing.remove(key)
    dest = os.path.join(base, story["images"][key]["file"])
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", src, "-vf",
                    "scale='if(gt(iw,ih),min(2400,iw),-2)':'if(gt(iw,ih),-2,min(2400,ih))'", "-q:v", "2", dest], check=True)
    print(f"{key:12s} <- {os.path.basename(src)}")
