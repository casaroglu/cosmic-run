"""Shared pieces for the dialogue remake of the Spain series (same rules as the Ottoman series)."""
import json, os, shutil
HERE = os.path.dirname(os.path.abspath(__file__)); SPAIN = os.path.dirname(HERE)
RED, BLUE, INK, ORANGE, GREEN, PURPLE = "#b3261e", "#1f4e8c", "#2a2119", "#c77700", "#2f6b3a", "#6a3d8f"
MOD = json.load(open(os.path.join(SPAIN, "_maps", "modern.json")))
BASE = {
    "series": "The History of Spain",
    "voices": {"q": "af_heart", "a": "am_michael"},
    "speakers": {"q": {"name": "Ava", "color": "#7fd3ff", "pitch": 1.0, "rise": 2.5, "pause_after_question": 0.45},
                 "a": {"name": "Max", "color": "#E8B44A"}},
    "accent": "#E8B44A", "watermark": "../../../../brand/history-sketches/option_c.png",
    "scene_pad": 0.5, "fade": 1.1,
}
def q(text, **k): return dict(type="narration", speaker="q", text=text, **k)
def a(text, **k): return dict(type="narration", speaker="a", text=text, **k)
def title(text): return {"type": "title", "speaker": "q", "scene": "globe", "text": text}
def mv(f, t): return {"from": f, "to": t}
def mk(pos, label, lx=20, ly=-40, at=1.0, **k): return dict(kind="marker", pos=pos, label=label, lx=lx, ly=ly, at=at, **k)
def cta(next_text=None, scene=None, last=False, **k):
    """Spoken call to action (and the next-episode teaser inside the series)."""
    if last:
        return [a("That's the story of Spain. Like the video and follow History Sketches.", **({"scene": scene} if scene else {}), **k),
                q("Which episode was your favourite? Tell us in the comments!"),
                {"type": "end", "text": "Thanks for watching!", "sub": "Like · Follow · Comment"}]
    return [a(f"Next time: {next_text}. Like the video and follow History Sketches.", **({"scene": scene} if scene else {}), **k),
            q("And tell us in the comments what you think!"),
            {"type": "end", "text": f"Next: {next_text}", "sub": "Follow History Sketches"}]
def spain_today(at=0.6, **k):
    return {"kind": "territory", "polys": MOD["ESP"], "at": at, "dur": 1.6, **k}
def coast_copy(ep_dir, name="iberia.json"):
    os.makedirs(os.path.join(ep_dir, "sketch"), exist_ok=True)
    shutil.copy(os.path.join(SPAIN, "_maps", name), os.path.join(ep_dir, "sketch", name))
    return f"sketch/{name}"
def globe(ep_dir, lat, lon, label, dist=1.6, extra=None):
    os.makedirs(os.path.join(ep_dir, "sketch"), exist_ok=True)
    m = [{"lat": lat, "lon": lon, "label": label, "at": 4.4}] + (extra or [])
    json.dump({"w": 1080, "h": 1920, "duration": 8.0, "fly": 5.0, "ease": "power2.inOut", "from": {"lat": 28, "lon": -20, "dist": 4.6},
               "to": {"lat": lat, "lon": lon, "dist": dist}, "markers": m}, open(os.path.join(ep_dir, "sketch", "globe_in.json"), "w"))
def write(ep_dir, ep):
    out = {**BASE, **ep}; out.setdefault("clips", {})["globe"] = "sketch/globe_in.mp4"
    json.dump(out, open(os.path.join(ep_dir, "episode.json"), "w"), indent=1, ensure_ascii=False)
    print("wrote", ep_dir)

# ---- hand-traced Iberian areas (approx.; sea parts are clipped to the coastline) ----
PYRENEES = [[-1.8, 43.4], [-0.5, 42.8], [0.7, 42.8], [1.4, 42.6], [2.5, 42.4], [3.2, 42.45]]
IBERIA = [[-9.6, 43.9], [-7.5, 44.0], [-1.8, 43.6]] + PYRENEES + [[3.5, 42.4], [3.5, 41.0], [1.5, 39.0], [0.5, 37.5], [-1.5, 36.4],
          [-5.6, 35.9], [-7.4, 36.9], [-9.0, 36.7], [-9.9, 38.5], [-9.6, 40.5]]
NORTH_LINE = [[-9.3, 42.6], [-6.5, 42.75], [-4.5, 42.75], [-2.5, 42.8], [-1.8, 43.3]]   # south edge of the Cantabrian/Basque north
IBERIA_NO_NORTH = NORTH_LINE + PYRENEES[1:] + [[3.5, 42.4], [3.5, 41.0], [1.5, 39.0], [0.5, 37.5], [-1.5, 36.4],
          [-5.6, 35.9], [-7.4, 36.9], [-9.0, 36.7], [-9.9, 38.5], [-9.8, 40.5]]
SEPTIMANIA = [[3.2, 42.45], [3.3, 43.3], [4.4, 43.6], [4.3, 44.1], [2.4, 44.0], [1.8, 43.1], [2.5, 42.4]]
ROME_154 = [[3.3, 42.4], [3.5, 41.0], [1.5, 39.0], [0.5, 37.5], [-1.5, 36.4], [-5.6, 35.9], [-7.4, 36.9], [-6.5, 38.0], [-4.5, 38.6],
            [-3.0, 39.6], [-1.8, 40.8], [-1.5, 41.8], [0.0, 42.5], [0.7, 42.8], [1.4, 42.6], [2.5, 42.4]]
ROME_133 = [[3.3, 42.4], [3.5, 41.0], [1.5, 39.0], [0.5, 37.5], [-1.5, 36.4], [-5.6, 35.9], [-7.4, 36.9], [-6.5, 38.0], [-5.0, 39.0],
            [-4.4, 40.4], [-3.6, 41.8], [-2.4, 42.3], [-1.5, 42.5], [0.0, 42.5], [0.7, 42.8], [1.4, 42.6], [2.5, 42.4]]
ASTURIAS_722 = [[-6.4, 43.7], [-4.3, 43.6], [-4.3, 43.0], [-5.6, 42.9], [-6.4, 43.1]]
ASTURIAS_910 = [[-9.4, 43.9], [-1.9, 43.5], [-2.6, 42.5], [-4.5, 41.6], [-6.5, 41.4], [-8.8, 41.8], [-9.3, 42.6]]
CORDOBA_929 = [[-8.9, 41.0], [-6.5, 41.0], [-4.5, 41.2], [-3.0, 41.4], [-1.8, 41.9], [-0.5, 42.2], [0.4, 42.0], [1.0, 41.2], [1.5, 40.8],
               [1.5, 39.0], [0.5, 37.5], [-1.5, 36.4], [-5.6, 35.9], [-7.4, 36.9], [-9.0, 36.7], [-9.9, 38.5], [-9.4, 40.5]]
ALMOHAD_1195 = [[-9.4, 38.5], [-7.5, 38.8], [-5.0, 39.0], [-3.5, 38.8], [-2.0, 39.5], [-0.8, 40.1], [0.4, 40.2], [1.5, 39.0], [0.5, 37.5],
                [-1.5, 36.4], [-5.6, 35.9], [-7.4, 36.9], [-9.0, 36.7]]
GRANADA = [[-5.6, 36.0], [-5.4, 37.0], [-4.4, 37.6], [-3.0, 37.7], [-2.0, 37.5], [-1.6, 37.2], [-2.0, 36.7], [-4.5, 36.6]]
NETHERLANDS = [[2.5, 51.0], [3.3, 51.4], [4.2, 52.0], [4.8, 53.3], [7.2, 53.3], [7.0, 52.2], [6.0, 51.0], [6.2, 50.1], [5.0, 49.6], [3.0, 50.2], [2.5, 50.6]]
FRANCHE_COMTE = [[5.4, 47.0], [5.9, 47.9], [6.9, 47.5], [6.0, 46.4]]
NAPLES_SICILY = [[13.0, 41.3], [14.0, 42.0], [15.0, 42.0], [16.2, 41.9], [18.6, 40.2], [17.0, 38.0], [15.6, 36.6], [12.4, 37.6], [12.6, 38.2], [14.0, 40.8]]
SARDINIA = [[8.1, 38.8], [9.9, 38.8], [9.9, 41.3], [8.1, 41.3]]
AUSTRIA = [[9.5, 47.5], [10.5, 46.8], [12.0, 46.5], [13.7, 45.6], [15.5, 45.5], [16.6, 46.4], [17.0, 48.0], [16.9, 48.8], [14.7, 48.8], [13.8, 48.4], [12.9, 47.7], [11.0, 47.4]]
MILAN = [[8.5, 45.0], [8.6, 46.2], [10.0, 46.2], [10.5, 45.0], [9.5, 44.9]]
PORTUGAL = MOD["PRT"]
NL_NORTH = [[3.4, 51.4], [4.2, 52.0], [4.8, 53.3], [7.2, 53.3], [7.0, 52.2], [6.0, 51.4], [4.5, 51.4]]
NL_SOUTH = [[2.5, 51.0], [3.4, 51.4], [4.5, 51.4], [6.0, 51.4], [6.0, 51.0], [6.2, 50.1], [5.0, 49.6], [3.0, 50.2], [2.5, 50.6]]
ROUSSILLON = [[1.8, 42.4], [3.2, 42.45], [3.1, 42.9], [2.0, 42.9]]
PHILIP_1556 = MOD["ESP"] + [NETHERLANDS, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA, MILAN]
PHILIP_1580 = PHILIP_1556 + PORTUGAL
def ottoman(key):
    t = json.load(open(os.path.join(SPAIN, "..", "ottoman", "territory.json")))
    return t[key]["polys"]
MINORCA = [[3.75, 39.8], [4.35, 39.8], [4.35, 40.1], [3.75, 40.1]]
GIBRALTAR = [-5.35, 36.14]
SPANISH_AMERICA_1810 = [[-124, 42], [-104, 42], [-100, 38], [-94, 33], [-93.8, 29.7], [-89.5, 30.2], [-81.5, 30.7], [-80, 25], [-87, 21],
    [-83, 9], [-77, 7], [-72, 12], [-62, 10.7], [-60.5, 8.0], [-61, 5], [-64, 2], [-70, -4], [-70, -10], [-65, -12], [-60, -15],
    [-58, -20], [-55, -24], [-54, -27], [-53, -33.7], [-58, -38], [-65, -42], [-68, -50], [-69, -55], [-75, -52], [-74, -42],
    [-71.5, -30], [-70.3, -18], [-76, -14], [-81, -6], [-80, 1], [-78, 4], [-77.5, 7], [-80, 8.5], [-85, 10], [-92, 14.5], [-96, 15.8],
    [-105, 19.5], [-110, 23], [-112, 27.5], [-117, 32.5], [-120.6, 34.5]]
CUBA = [[-85, 21.9], [-74, 21.9], [-74, 19.8], [-85, 19.8]]
PUERTO_RICO = [[-67.3, 17.9], [-65.6, 17.9], [-65.6, 18.6], [-67.3, 18.6]]
FRANCE_1810 = [[-1.8, 43.4], [-1.2, 46.2], [-4.8, 48.5], [-1.6, 49.7], [1.6, 50.9], [3.3, 51.4], [4.2, 52.0], [4.8, 53.3], [7.2, 53.3],
               [8.5, 53.6], [7.0, 51.0], [6.2, 49.5], [8.2, 49.0], [7.6, 47.6], [6.0, 46.4], [7.0, 45.9], [7.5, 44.1], [3.2, 42.45],
               [1.4, 42.6], [0.7, 42.8], [-0.5, 42.8]]
CADIZ = [-6.29, 36.53]
NAT_JUL36 = [[-9.3, 43.8], [-8.9, 42.0], [-7.0, 42.0], [-6.8, 41.0], [-6.5, 40.3], [-6.0, 40.2], [-5.0, 40.7], [-4.2, 41.0], [-3.4, 41.3],
             [-2.5, 41.3], [-1.8, 40.6], [-1.0, 40.9], [-0.6, 41.6], [-0.3, 42.4], [-1.0, 42.8], [-1.8, 43.0], [-2.6, 42.75], [-3.6, 42.85],
             [-4.5, 42.7], [-6.0, 42.8], [-7.0, 43.25], [-7.6, 43.7]]
NAT_JUL36_SOUTH = [[-7.4, 37.2], [-6.3, 36.5], [-5.6, 36.0], [-5.0, 36.6], [-4.6, 37.2], [-5.2, 37.9], [-6.4, 38.0], [-7.3, 38.2]]
NAT_NOV36 = [[-9.3, 43.8], [-7.6, 43.7], [-7.0, 43.25], [-6.0, 42.8], [-4.5, 42.7], [-3.6, 42.85], [-2.6, 42.75], [-1.8, 43.0], [-1.0, 42.8],
             [-0.3, 42.4], [-0.6, 41.6], [-1.0, 40.9], [-1.8, 40.6], [-2.5, 41.3], [-3.4, 41.0], [-3.7, 40.5], [-4.0, 40.2], [-4.5, 39.9],
             [-5.0, 39.0], [-5.5, 38.5], [-4.6, 37.5], [-4.0, 37.0], [-4.4, 36.7], [-5.6, 36.0], [-7.4, 37.2], [-7.3, 38.2], [-7.0, 39.0],
             [-7.4, 39.6], [-6.9, 41.0], [-8.9, 42.0]]
