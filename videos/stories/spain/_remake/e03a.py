from common import *
D = os.path.join(SPAIN, "03a-philip-ii")
E = coast_copy(D, "europe.json"); globe(D, 40.59, -4.15, "El Escorial", dist=2.0)
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": PHILIP_1556, "color": RED, "at": 0.8, "dur": 1.8, "label": "Philip II, 1556", "labelPos": [-3.6, 40.0]},
   {"kind": "label", "text": "+ the Americas", "pos": [-6.0, 52.5], "at": 2.6, "size": 44, "color": RED},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "office": {"items": [
   {"kind": "text", "text": "The Paper King", "pos": [0.5, 0.22], "at": 0.2, "size": 70, "color": RED},
   {"kind": "text", "text": "one small office", "pos": [0.5, 0.36], "at": 0.9, "size": 56, "cps": 22},
   {"kind": "text", "text": "every report, read by the king", "pos": [0.5, 0.46], "at": 2.0, "size": 56, "color": BLUE, "cps": 22},
   {"kind": "text", "text": "from four continents", "pos": [0.5, 0.56], "at": 3.2, "size": 56, "cps": 22}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": PHILIP_1556, "color": RED, "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": PHILIP_1580, "color": RED, "at": 1.0, "dur": 1.8, "label": "Philip II, 1580", "labelPos": [-3.6, 40.0]},
   {"kind": "label", "text": "+ Portugal", "pos": [-8.2, 37.6], "at": 2.4, "size": 40, "color": RED},
   {"kind": "label", "text": "+ two empires overseas", "pos": [0.5, 0.2], "at": 2.8, "size": 52, "color": RED},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did one king rule four continents from a desk?"),
 a("That was Philip the Second of Spain. Spaniards called him the Paper King."),
 q("What did he inherit?", scene="start", date="16 January 1556", place="Europe"),
 a("At twenty-eight, his exhausted father handed him Spain, the Netherlands, much of Italy, and the Americas."),
 a("Even the Philippines are named after him.", scene="philippines", date="", place="The Philippines", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 q("Was he king of anywhere else?", scene="mary", date="1554", place="England", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("He married four times. One wife was Queen Mary of England, so for four years, he was king of England too."),
 q("Why the Paper King?", scene="escorial", date="1563 – 1584", place="El Escorial", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("He built El Escorial, a palace and monastery in one. From a small office inside, he read every report himself.", scene="office", date=""),
 q("Was his family happy?", scene="carlos", date="1568", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Not exactly. His son, Don Carlos, grew unstable. Philip had him locked up. Six months later, Carlos was dead."),
 a("Enemies said the king had killed his own son. No one has ever proved it."),
 a("At Lepanto in 1571, his fleet helped crush the Ottoman navy. A wounded soldier on board was named Miguel de Cervantes.", scene="lepanto", date="7 October 1571", place="Lepanto", move=mv([0.4, 0.5, 1.0], [0.6, 0.5, 1.25])),
 q("Did his lands keep growing?", scene="end", date="1580", place="Europe"),
 a("Right. In 1580 he took the crown of Portugal, with its own empire. Now the sun truly never set on his lands."),
 a("But it all ran on borrowed silver. And one queen was about to challenge him.", scene="elizabeth", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.25])),
 *cta("the Armada", scene="sofonisba", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.2])),
]
write(D, {"episode": "03a", "title": "How did one king rule four continents from a desk?", "highlight": ["four", "continents", "desk?"],
  "music": {"mood": "epic", "seed": 12, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 12: Philip II, the Paper King: El Escorial, Don Carlos, Lepanto and the crown of Portugal (1580). Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "philipii", "escorial", "habsburg", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
