#!/usr/bin/env python3
"""Check a history episode's images; write img/NEEDED.md listing what is missing.

usage: image_checklist.py STORY.json      exit 0 = all images present, 1 = some missing
"""
import json, os, sys, urllib.parse

story_path = sys.argv[1]
story = json.load(open(story_path))
base = os.path.dirname(os.path.abspath(story_path))
images = story.get("images", {})
missing = [(k, v) for k, v in images.items() if not os.path.exists(os.path.join(base, v["file"]))]
needed = os.path.join(base, "img", "NEEDED.md")
os.makedirs(os.path.dirname(needed), exist_ok=True)

lines = [f"# Images for: {story.get('title', '')}", ""]
if not missing:
    lines.append("All images present. ✅")
else:
    lines += [f"{len(missing)} of {len(images)} images missing. Download each **public-domain** image and upload it "
              "in this order (or save it under the file name shown).", ""]
    for i, (k, v) in enumerate(missing, 1):
        q = v.get("search") or v.get("credit", k)
        url = v.get("commons") or ("https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&type=image&search="
                                    + urllib.parse.quote(q))
        lines += [f"{i}. **{v.get('credit', k)}** → `{v['file']}`",
                  f"   - {v.get('where', '')}".rstrip(" -"),
                  f"   - [Search on Wikimedia Commons]({url})", ""]
open(needed, "w").write("\n".join(l for l in lines if l.strip() != "-") + "\n")
print(open(needed).read())
sys.exit(1 if missing else 0)
