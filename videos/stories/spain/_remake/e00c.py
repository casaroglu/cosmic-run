from common import *
D = os.path.join(SPAIN, "00c-numantia")
C = coast_copy(D); globe(D, 41.81, -2.44, "Numantia")
sk = {
 "today": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, label="SPAIN", labelPos=[-4.6, 38.6]),
   mk([-2.44, 41.81], "Numantia", 20, -40, 2.2), mk([-2.47, 41.76], "Soria", -20, 50, 2.6, lalign="right", color=BLUE),
   {"kind": "circle", "pos": [-2.44, 41.8], "r": 55, "ry": 45, "at": 3.0}]},
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [ROME_154], "at": 0.4, "dur": 2.0, "label": "Roman, 154 BC", "labelPos": [-1.2, 38.4]},
   {"kind": "label", "text": "Celtiberians", "pos": [-3.6, 41.2], "at": 2.4, "size": 42, "color": BLUE},
   mk([-2.44, 41.81], "Numantia", 20, -40, 2.8),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "siege": {"items": [
   {"kind": "circle", "pos": [0.5, 0.42], "r": 120, "ry": 100, "at": 0.4, "color": BLUE},
   {"kind": "label", "text": "Numantia", "pos": [0.5, 0.42], "at": 0.6, "size": 54, "color": BLUE},
   {"kind": "circle", "pos": [0.5, 0.42], "r": 330, "ry": 280, "at": 1.4, "dur": 2.0, "color": RED, "width": 9},
   {"kind": "text", "text": "Roman wall: about 9 km", "pos": [0.5, 0.21], "at": 2.6, "size": 58, "color": RED, "cps": 22},
   {"kind": "text", "text": "food: none in, no one out", "pos": [0.5, 0.64], "at": 4.0, "size": 50, "cps": 22}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [ROME_154], "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": [ROME_133], "at": 1.0, "dur": 2.0, "label": "Roman, 133 BC", "labelPos": [-1.2, 38.4]},
   mk([-2.44, 41.81], "Numantia, 133 BC", 20, -40, 2.6),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Why did a town in Spain choose death over surrender to Rome?"),
 a("Because surrender meant slavery. This is Numantia, in the heart of Spain."),
 q("Where is it today?", scene="today", date="Today", place="Soria, Spain"),
 a("On a hill near the city of Soria. Only ruins are left."),
 q("How much of Spain did Rome hold back then?", scene="start", date="154 BC", place="Hispania"),
 a("The east coast and the south. Inland lived the Celtiberians, and Numantia was their strongest town."),
 a("For twenty years, it beat back Rome's legions again and again.", scene="ruins", date="153 – 134 BC", place="Numantia", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("So what did Rome do?", scene="scipio", date="134 BC", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("It sent its most feared general, Scipio Aemilianus, the man who had already destroyed Carthage."),
 a("He didn't storm the walls. He built his own wall around the whole town, about nine kilometres long, with towers. And he waited.", scene="siege", date=""),
 a("No food got in. No one got out. Hunger came, then disease."),
 q("How did it end?", scene="vera", date="133 BC", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("When the end came, many Numantines killed themselves rather than become Roman slaves."),
 a("Scipio razed what was left. Rome gave him a new name: Numantinus.", scene="vera2", move=mv([0.6, 0.5, 1.0], [0.45, 0.5, 1.25])),
 q("Did the borders change after that?", scene="end", date="133 BC", place="Hispania"),
 a("Right. Rome's lands now reached deep into the interior. But the far north held out for another century."),
 q("Do Spaniards still remember Numantia?", scene="ruins2", date="Today", move=mv([0.5, 0.5, 1.0], [0.45, 0.5, 1.2])),
 a("Yes. Cervantes wrote a tragedy about the siege. In Spanish, numantino still means resisting to the very end.", say="Yes. Cervantes wrote a tragedy about the siege. In Spanish, noo-man-teeno still means resisting to the very end."),
 *cta("711, the year everything changed"),
]
write(D, {"episode": "00c", "title": "Why did a town in Spain choose death over surrender to Rome?", "highlight": ["death", "Rome?"],
  "music": {"mood": "epic", "seed": 3, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 3: Numantia, the Celtiberian town that held off Rome for twenty years, and Scipio's siege of 134–133 BC. Images: public domain / CC0. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "numantia", "rome", "ancienthistory", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
