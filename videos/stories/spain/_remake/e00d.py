from common import *
D = os.path.join(SPAIN, "00d-711")
C = coast_copy(D); globe(D, 36.14, -5.35, "Gibraltar")
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [IBERIA, SEPTIMANIA], "at": 0.8, "dur": 2.0, "label": "Visigothic kingdom, c. 700", "labelPos": [-3.6, 39.4]},
   mk([-4.02, 39.86], "Toledo", 20, -40, 2.6),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "crossing": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   {"kind": "arrow", "from": [-5.6, 35.6], "to": [-5.38, 36.12], "at": 0.6, "color": GREEN},
   mk([-5.35, 36.14], "Gibraltar", 20, -40, 1.2),
   {"kind": "label", "text": "Tariq, April 711", "pos": [-6.4, 35.75], "at": 1.6, "size": 44, "color": GREEN},
   {"kind": "label", "text": "Jabal Tariq = Gibraltar", "pos": [0.5, 0.22], "at": 2.4, "size": 56, "color": RED},
   mk([-5.9, 36.6], "Guadalete", -20, -40, 3.6, lalign="right"),
   {"kind": "circle", "pos": [-5.9, 36.6], "r": 50, "ry": 42, "at": 4.0}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [IBERIA, SEPTIMANIA], "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": [IBERIA_NO_NORTH], "color": GREEN, "at": 1.0, "dur": 2.0, "label": "al-Andalus, c. 720", "labelPos": [-3.6, 39.4]},
   {"kind": "label", "text": "the north held out", "pos": [-5.4, 43.25], "at": 2.8, "size": 38, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did Spain become Muslim in just a few years?"),
 a("It started in 711, when a king vanished in battle. Spain changed for almost eight centuries."),
 q("Who ruled Spain before that?", scene="start", date="c. 700", place="Iberia"),
 a("The Visigoths: Germanic kings ruling from Toledo. Their lands even reached into southern France."),
 a("They wore jewelled crowns, but their nobles were at each other's throats.", scene="crowns", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 q("So what happened in 711?", scene="roderic3", date="711", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Legend blames a wronged daughter. Her father, Count Julian, took revenge on King Roderic and opened the door to Africa."),
 a("In April 711, a Berber commander, Tariq ibn Ziyad, crossed the strait with a small army.", scene="crossing", date="April 711", place="Strait of Gibraltar", say="In April 711, a Berber commander, Tariq ibn Ziyad, crossed the strait with a small army."),
 a("The rock where he landed still carries his name: Jabal Tariq. Gibraltar."),
 q("And King Roderic?", scene="roderic2", date="711", place="Guadalete", move=mv([0.5, 0.5, 1.0], [0.6, 0.5, 1.25])),
 a("He rushed south. At the river Guadalete, his army was routed. The king died, and his body was never found."),
 q("How fast did the rest fall?", scene="tariq", date="711 – 718", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 a("Within a few years, almost the whole peninsula was under Muslim rule. It became al-Andalus."),
 q("Almost?", scene="end", date="c. 720", place="al-Andalus"),
 a("Right. A few mountain valleys in the far north never fell. Muslim rule elsewhere would last, in shrinking form, until 1492."),
 *cta("Covadonga, the battle in the mountains", scene="roderic4", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.2])),
]
write(D, {"episode": "00d", "title": "How did Spain become Muslim in just a few years?", "highlight": ["Muslim", "years?"],
  "music": {"mood": "epic", "seed": 4, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 4: 711, the fall of the Visigothic kingdom, Tariq ibn Ziyad at Gibraltar and the birth of al-Andalus. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "711", "alandalus", "gibraltar", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
