from common import *
D = os.path.join(SPAIN, "00b-gadir")
C = coast_copy(D); M = coast_copy(D, "med.json"); globe(D, 36.53, -6.29, "Cádiz")
sk = {
 "today": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, label="SPAIN", labelPos=[-3.6, 39.6]),
   mk([-6.29, 36.53], "Cádiz", -20, 50, 2.2, lalign="right"),
   {"kind": "circle", "pos": [-6.29, 36.53], "r": 55, "ry": 45, "at": 2.8},
   {"kind": "label", "text": "Atlantic", "pos": [-8.6, 36.2], "at": 3.0, "size": 42, "color": BLUE},
   mk([-5.35, 36.14], "Strait of Gibraltar", 20, 50, 3.4, color=BLUE)]},
 "route": {"coast": M, "items": [
   {"kind": "coast", "at": 0, "dur": 1.6},
   mk([35.2, 33.27], "Tyre", -20, -40, 0.8, lalign="right"),
   {"kind": "route", "pts": [[35.0, 33.3], [28.0, 34.2], [20.0, 35.0], [12.0, 37.3], [5.0, 37.2], [-2.0, 36.4], [-6.2, 36.5]], "at": 1.4, "dur": 3.0, "color": RED},
   {"kind": "ships", "pts": [[35.0, 33.3], [28.0, 34.2], [20.0, 35.0], [12.0, 37.3], [5.0, 37.2], [-2.0, 36.4], [-6.2, 36.5]], "n": 2, "period": 6, "icon": "galleon", "size": 40, "at": 1.4, "color": RED},
   mk([-6.29, 36.53], "Gadir", 15, 50, 4.2),
   {"kind": "label", "text": "about 4,000 km", "pos": [0.5, 0.64], "at": 4.8, "size": 52, "color": RED}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [IBERIA_NO_NORTH], "at": 0.6, "dur": 2.0, "label": "Roman, c. 49 BC", "labelPos": [-3.4, 39.4]},
   {"kind": "label", "text": "not yet Roman", "pos": [-5.6, 43.25], "at": 2.6, "size": 38, "color": BLUE},
   mk([-6.29, 36.53], "Gades", -20, 50, 3.0, lalign="right"),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Which city in Western Europe is older than Rome?"),
 a("Cádiz, in southern Spain. It was founded by sailors from the other end of the Mediterranean.", say="Cadiz, in southern Spain. It was founded by sailors from the other end of the Mediterranean."),
 q("Where is it exactly?", scene="today", date="Today", place="Cádiz, Spain"),
 a("On a narrow strip of land in the Atlantic, close to the Strait of Gibraltar."),
 q("Who founded it?", scene="merchants", date="c. 1100 – 800 BC", place="Phoenicia", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("The Phoenicians, traders from Tyre, in today's Lebanon. They crossed the whole Mediterranean, and kept going."),
 a("On an island off southern Spain they built a trading port. They called it Gadir.", scene="route", date="", place="Mediterranean"),
 q("When was that?"),
 a("Ancient writers said around 1100 BC. Archaeologists have found remains from at least the eight hundreds BC. Either way, older than Rome."),
 q("What did they want there?", scene="coin", date="", move=mv([0.5, 0.5, 1.0], [0.4, 0.5, 1.3])),
 a("Silver from the mines of southern Spain, and tuna. The city even put tuna on its coins."),
 a("Its great temple honoured the god Melqart. The Greeks and Romans called him Hercules.", scene="coin2", move=mv([0.5, 0.5, 1.0], [0.62, 0.5, 1.3])),
 a("In 1887, workers in Cádiz dug up a marble Phoenician coffin, with a man's face carved on the lid.", scene="sarcophagus", date="1887", place="Cádiz", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25]), say="In 1887, workers in Cadiz dug up a marble Phoenician coffin, with a man's face carved on the lid."),
 q("And when Rome came?", scene="caesar", date="49 BC", place="Gades", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.25])),
 a("Gadir became Gades. In 49 BC, Julius Caesar made all its citizens Romans."),
 q("How much of Spain did Rome hold by then?", scene="end", date="c. 49 BC", place="Hispania"),
 a("Most of it. Only the far north was still unconquered."),
 q("And today?", scene="view", date="Today", place="Cádiz", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Three thousand years on, people still live there. Many call it the oldest city in Western Europe."),
 *cta("the town that chose death over Rome"),
]
write(D, {"episode": "00b", "title": "Which city in Western Europe is older than Rome?", "highlight": ["older", "Rome?"],
  "music": {"mood": "dreamy", "seed": 2, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 2: Gadir, today Cádiz, founded by Phoenician sailors from Tyre and often called the oldest city in Western Europe. Images: public domain / CC0. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "cadiz", "phoenicians", "ancienthistory", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
