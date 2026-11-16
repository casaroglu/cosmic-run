from common import *
D = os.path.join(SPAIN, "00e-covadonga")
C = coast_copy(D); globe(D, 43.31, -5.06, "Covadonga")
sk = {
 "today": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, label="SPAIN", labelPos=[-3.6, 39.6]),
   mk([-5.06, 43.31], "Covadonga", 20, -40, 2.2), {"kind": "label", "text": "Picos de Europa", "pos": [-4.8, 42.75], "at": 2.8, "size": 40, "color": GREEN},
   {"kind": "circle", "pos": [-5.06, 43.3], "r": 55, "ry": 45, "at": 3.2}]},
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [IBERIA_NO_NORTH], "color": GREEN, "style": "faint", "at": 0.3, "dur": 1.0, "label": "al-Andalus", "labelPos": [-3.6, 39.4]},
   {"kind": "territory", "polys": [ASTURIAS_722], "color": BLUE, "at": 1.4, "dur": 1.2, "label": "Asturias, c. 722", "labelPos": [-5.4, 42.6]},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [ASTURIAS_722], "color": BLUE, "style": "faint", "at": 0.2, "dur": 0.6},
   {"kind": "territory", "polys": [ASTURIAS_910], "color": BLUE, "at": 0.9, "dur": 2.0, "label": "Asturias, c. 910", "labelPos": [-6.0, 42.4]},
   {"kind": "label", "text": "Duero", "pos": [-4.6, 41.35], "at": 2.6, "size": 36, "color": BLUE},
   {"kind": "label", "text": "al-Andalus", "pos": [-3.6, 38.6], "at": 2.9, "size": 44, "color": GREEN},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Was Spain's most famous battle really just a skirmish?"),
 a("It might have been. It happened at Covadonga, high in the mountains of Asturias."),
 q("Where is that?", scene="today", date="Today", place="Asturias, Spain"),
 a("In the Picos de Europa, in northern Spain. Today it's a shrine visited by thousands every year."),
 q("Who fought there?", scene="start", date="c. 722", place="Asturias"),
 a("After 711, only the wild mountains of the north stayed out of Muslim hands. There, a nobleman named Pelayo led a revolt."),
 a("A Muslim force marched into the narrow valley at Covadonga to crush him. It was ambushed and beaten.", scene="portrait", date="718 or 722", place="Covadonga", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 q("What do the stories say?", scene="cave", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("Later Christian chronicles tell of a holy cave, and a miracle: the attackers' own stones and arrows turning back on them."),
 q("And what do historians say?", scene="mountains", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("The oldest chronicle of the conquest, written in 754, never mentions Pelayo. Even the year is disputed."),
 q("So why does it matter?", scene="end", date="c. 910", place="Asturias"),
 a("Because Pelayo founded the Kingdom of Asturias. Two centuries later it reached the river Duero. From it grew León, then Castile, and in time, Spain."),
 a("Spain calls Covadonga the start of the Reconquista. Historians still argue how big the battle really was.", scene="cavephoto", date="Today", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 *cta("Córdoba, the jewel of al-Andalus", scene="pelayo2", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2]), say="Next time: Cordoba, the jewel of al-Andalus. Like the video and follow History Sketches."),
]
write(D, {"episode": "00e", "title": "Was Spain's most famous battle really just a skirmish?", "highlight": ["famous", "skirmish?"],
  "music": {"mood": "epic", "seed": 5, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 5: Covadonga, Pelayo and the birth of the Kingdom of Asturias. Legend or skirmish? Images: public domain / CC0. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "covadonga", "asturias", "reconquista", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
