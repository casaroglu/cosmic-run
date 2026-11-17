from common import *
D = os.path.join(SPAIN, "05a-1808")
E = coast_copy(D, "europe.json"); globe(D, 40.42, -3.70, "Madrid", dist=2.0)
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [FRANCE_1810], "color": BLUE, "at": 0.8, "dur": 1.6, "label": "Napoleon's France", "labelPos": [2.4, 46.8]},
   {"kind": "territory", "polys": MOD["ESP"], "color": RED, "style": "faint", "at": 1.6, "dur": 1.2, "label": "Spain", "labelPos": [-3.6, 40.0]},
   {"kind": "route", "pts": [[-1.6, 43.3], [-3.7, 41.6], [-6.5, 40.5], [-9.1, 38.8]], "at": 2.4, "dur": 1.8, "color": BLUE},
   {"kind": "label", "text": "French troops, 1807", "pos": [-3.0, 43.6], "at": 3.4, "size": 38, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [FRANCE_1810], "color": BLUE, "at": 0.3, "dur": 1.0},
   {"kind": "territory", "polys": MOD["ESP"], "color": PURPLE, "at": 1.0, "dur": 1.4, "label": "King Joseph, 1808", "labelPos": [-3.6, 40.0]},
   mk([-1.47, 43.49], "Bayonne", 15, -40, 2.0, color=BLUE),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did Napoleon take Spain's crown without a battle?"),
 a("With a trap. In 1808, Spain had two kings, and Napoleon took the crown from both."),
 q("Who ruled Spain then?", scene="family", date="1808", place="Madrid", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("A weak king, Charles the Fourth. And a hated favourite who really ran the country: Manuel Godoy."),
 q("How did the French get in?", scene="start", date="1807", place="Spain"),
 a("Godoy let French troops march through Spain to attack Portugal. Soon they were everywhere."),
 a("In March 1808, a mob stormed Godoy's palace. Two days later, the king gave up the crown to his own son, Ferdinand.", scene="aranjuez", date="17 March 1808", place="Aranjuez", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 q("And Napoleon?", scene="napoleon", date="April 1808", place="Bayonne", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("He invited father and son to Bayonne, in France, to settle their quarrel. It was a trap."),
 q("How did Madrid react?", scene="dosmayo", date="2 May 1808", place="Madrid", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("When the French moved to take away the last of the royal family, the crowd exploded. Knives and stones against cavalry."),
 a("That night, the French shot the prisoners they had taken.", scene="tresmayo", date="3 May 1808", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Goya painted it six years later. A man in a white shirt, arms wide open, facing the guns.", scene="shirt", move=mv([0.4, 0.5, 1.0], [0.42, 0.48, 1.6])),
 q("And the crown?", scene="end", date="May 1808", place="Spain"),
 a("Days later in Bayonne, both kings signed it away. Napoleon gave Spain to his brother, Joseph."),
 a("He thought Spain was finished. Instead, the whole country rose.", scene="joseph", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 *cta("the little war that gave English a new word"),
]
write(D, {"episode": "05a", "title": "How did Napoleon take Spain's crown without a battle?", "highlight": ["Napoleon", "crown"],
  "music": {"mood": "epic", "seed": 17, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 17: 1808: Charles IV, Godoy, the Mutiny of Aranjuez, the trap at Bayonne and the 2nd and 3rd of May painted by Goya. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "napoleon", "goya", "1808", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
