"""stills at chosen points of every shot (default: 40% in) -> scenes/<s>/stills_sheet.jpg.  usage: check.py <scene> [k=0.4] [shots=1,2,..]"""
import sys, json, os, subprocess, glob, shutil
s = sys.argv[1]; k = float(sys.argv[2]) if len(sys.argv) > 2 else 0.4; only = [int(x) for x in sys.argv[3].split(",")] if len(sys.argv) > 3 else None
P = os.path.expanduser(f"~/cizgi/toast-long3/scenes/{s}"); tl = json.load(open(f"{P}/work/timeline.json"))
fr = [int((sh["s"] + (sh["e"] - sh["s"]) * k) * 30) for sh in tl["shots"] if not only or sh["n"] in only]
shutil.rmtree(f"{P}/stills", ignore_errors=True); os.makedirs(f"{P}/stills")
r = subprocess.run([os.path.expanduser("~/cizgi/.venv/bin/python"), "tools/render.py", ".", "stills", ",".join(map(str, fr))], cwd=P, capture_output=True, text=True); print(r.stdout[-300:], r.stderr[-1500:])
subprocess.run([os.path.expanduser("~/cizgi/.venv/bin/python"), os.path.expanduser("~/cizgi/toast-long3/script/grid.py"), f"{P}/stills", f"{P}/stills_sheet.jpg", "4"])
