from common import *
D = os.path.join(SPAIN, "00g-las-navas")
C = coast_copy(D); globe(D, 38.28, -3.59, "Las Navas de Tolosa")
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [ALMOHAD_1195], "color": GREEN, "at": 0.8, "dur": 2.0, "label": "Almohads, 1195", "labelPos": [-4.6, 37.8]},
   {"kind": "label", "text": "CASTILE", "pos": [-4.0, 40.8], "at": 2.4, "size": 46, "color": BLUE},
   {"kind": "label", "text": "PORTUGAL", "pos": [-8.2, 40.2], "at": 2.6, "size": 36, "color": BLUE},
   {"kind": "label", "text": "ARAGON", "pos": [-0.4, 41.6], "at": 2.8, "size": 38, "color": BLUE},
   {"kind": "label", "text": "NAVARRE", "pos": [-1.6, 42.85], "at": 3.0, "size": 32, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "march": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   mk([-4.02, 39.86], "Toledo", 20, -40, 0.4),
   {"kind": "route", "pts": [[-4.0, 39.8], [-3.8, 39.0], [-3.6, 38.35]], "at": 0.8, "dur": 1.8, "color": BLUE},
   mk([-3.59, 38.28], "Las Navas de Tolosa", 20, 45, 2.4),
   {"kind": "text", "text": "16 July 1212", "pos": [0.5, 0.22], "at": 2.0, "size": 62, "color": RED, "cps": 20},
   {"kind": "label", "text": "Sierra Morena", "pos": [-4.6, 38.5], "at": 3.0, "size": 38, "color": GREEN}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [ALMOHAD_1195], "color": GREEN, "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": [GRANADA], "color": GREEN, "at": 1.0, "dur": 1.6, "label": "Granada, 1250", "labelPos": [-3.6, 36.4]},
   mk([-4.78, 37.88], "Córdoba, 1236", -20, -40, 2.4, lalign="right", color=BLUE),
   mk([-5.99, 37.39], "Seville, 1248", -20, 45, 2.8, lalign="right", color=BLUE),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Which single day decided the future of Spain?"),
 a("Many historians would say the sixteenth of July 1212, at Las Navas de Tolosa."),
 q("Who held Spain before that?", scene="start", date="1195", place="Iberia"),
 a("The north was Christian: Castile, Aragon, Navarre and Portugal. The south belonged to the Almohads, rulers of Morocco and al-Andalus."),
 a("In 1195, the Almohads crushed King Alfonso the Eighth of Castile at Alarcos.", scene="alfonso", date="1195", place="Alarcos", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 q("And he wanted revenge?", scene="print", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("He spent seventeen years preparing it. The Pope proclaimed a crusade."),
 a("Castile, Aragon and Navarre marched south together. Legend says a shepherd showed them a hidden path through the mountains.", scene="march", date="July 1212", place="Sierra Morena"),
 q("What happened on the day?", scene="battle3", date="16 July 1212", place="Las Navas de Tolosa", move=mv([0.35, 0.5, 1.0], [0.6, 0.5, 1.25])),
 a("The three kings charged the Almohad camp. The caliph's army broke, and the caliph fled."),
 a("A silk banner kept in a monastery in Burgos is said to have been taken that day.", scene="banner", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 q("And after that?", scene="end", date="1250", place="Iberia"),
 a("Within forty years, Córdoba and Seville were Christian. Only Granada was left, for two more centuries.", say="Within forty years, Cordoba and Seville were Christian. Only Granada was left, for two more centuries."),
 *cta("1492, a surrender and a promise", scene="battle", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
]
write(D, {"episode": "00g", "title": "Which single day decided the future of Spain?", "highlight": ["single", "day"],
  "music": {"mood": "epic", "seed": 7, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 7: Las Navas de Tolosa, 16 July 1212, when Castile, Aragon and Navarre broke the Almohads. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "lasnavas", "reconquista", "medieval", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
