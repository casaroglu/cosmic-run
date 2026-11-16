from common import *
D = os.path.join(SPAIN, "03b-the-armada")
A = coast_copy(D, "armada.json"); globe(D, 51.0, 1.5, "English Channel", dist=2.0)
ROUTE = [[-9.3, 38.6], [-9.6, 43.5], [-5.5, 48.8], [-2.5, 49.9], [1.8, 50.9], [3.0, 52.5], [1.5, 56.5], [-1.5, 59.3], [-6.5, 58.5],
         [-10.6, 54.5], [-10.8, 51.6], [-9.0, 46.5], [-8.6, 43.4]]
sk = {
 "start": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": PHILIP_1580, "color": RED, "at": 0.8, "dur": 1.8, "label": "Philip II", "labelPos": [-4.0, 40.0]},
   {"kind": "label", "text": "ENGLAND", "pos": [-1.6, 52.6], "at": 2.4, "size": 46, "color": BLUE},
   {"kind": "label", "text": "Dutch rebels", "pos": [6.0, 53.8], "at": 2.8, "size": 38, "color": ORANGE},
   {"kind": "label", "text": "1587, borders approx.", "pos": [0.78, 0.66], "at": 3.0, "size": 34}]},
 "route": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   mk([-9.14, 38.72], "Lisbon, May 1588", 15, 45, 0.4),
   {"kind": "route", "pts": ROUTE[:6], "at": 0.8, "dur": 2.2, "color": RED},
   mk([1.86, 50.95], "Calais", -15, -40, 2.6, lalign="right"), mk([2.13, 50.99], "Gravelines", 15, 45, 3.0),
   {"kind": "label", "text": "fireships, 7 August", "pos": [0.5, 0.2], "at": 3.4, "size": 52, "color": RED, "cps": 22}]},
 "flight": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   {"kind": "route", "pts": ROUTE[4:], "at": 0.4, "dur": 3.4, "color": RED, "dash": [16, 10]},
   {"kind": "label", "text": "storms", "pos": [-12.0, 55.5], "at": 2.6, "size": 50, "color": BLUE},
   {"kind": "label", "text": "dozens of wrecks", "pos": [0.5, 0.2], "at": 3.4, "size": 52, "color": RED, "cps": 22}]},
 "end": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": MOD["ESP"] + PORTUGAL + [NL_SOUTH, FRANCHE_COMTE], "color": RED, "at": 0.4, "dur": 1.6, "label": "Philip II, 1598", "labelPos": [-4.0, 40.0]},
   {"kind": "territory", "polys": [NL_NORTH], "color": ORANGE, "at": 1.8, "dur": 1.0, "label": "Dutch Republic", "labelPos": [6.0, 53.8]},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("What really destroyed the Spanish Armada?"),
 a("English fireships, English guns, and then the wind."),
 q("Why did Spain attack England?", scene="start", date="1587", place="Europe"),
 a("Queen Elizabeth was Philip's former sister-in-law. She had become his worst enemy."),
 a("Her captains, like Francis Drake, raided Spain's treasure fleets. And she sent troops to help the Dutch rebels.", scene="drake", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Then she executed the Catholic Queen of Scots. Philip called for a crusade.", scene="maryscots", date="8 February 1587", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("What was the plan?", scene="route", date="May 1588", place="Lisbon"),
 a("The Armada sailed from Lisbon, about a hundred and thirty ships. It would sweep up the Channel, collect an army in Flanders, and land in England."),
 a("At midnight off Calais, the English sent burning ships into the anchored fleet. The Armada scattered in panic.", scene="fireships", date="7 August 1588", place="Calais", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("The next day, at Gravelines, English guns tore into it."),
 q("Couldn't they just sail home?", scene="flight", date="Autumn 1588", place="North Sea"),
 a("Not through the Channel. The fleet fled around Scotland and Ireland, and storms smashed dozens of ships on the rocks."),
 a("Thousands of men never came home.", scene="defeat", move=mv([0.4, 0.5, 1.0], [0.6, 0.5, 1.25])),
 q("How did Philip take it?", scene="old", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Legend says he only sighed: I sent my ships against men, not against the wind."),
 q("And his empire?", scene="end", date="1598", place="Europe"),
 a("Still vast when he died in 1598, but the northern Netherlands were gone for good. And Spain was bankrupt, for the fourth time."),
 *cta("Cervantes, the slave who wrote Don Quixote", scene="escorial", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
]
write(D, {"episode": "03b", "title": "What really destroyed the Spanish Armada?", "highlight": ["Spanish", "Armada?"],
  "music": {"mood": "epic", "seed": 13, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 13: the Spanish Armada of 1588: Drake, the fireships off Calais, Gravelines and the storms around Scotland and Ireland. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "armada", "1588", "elizabethi", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
