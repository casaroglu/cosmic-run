"""provisional timeline from dur.json (before voices exist). usage: prov_tl.py <scene_dir>"""
import json, sys
S = sys.argv[1]; d = json.load(open(f"{S}/work/dur.json")); t = 0; sh = []
for i, x in enumerate(d, 1): sh.append({"n": i, "s": round(t, 3), "e": round(t + x, 3)}); t += x
json.dump({"total": round(t, 3), "shots": sh}, open(f"{S}/work/timeline.json", "w"), indent=1)
json.dump([], open(f"{S}/work/segments.json", "w")); json.dump([], open(f"{S}/work/words.json", "w")); print(S, t)
