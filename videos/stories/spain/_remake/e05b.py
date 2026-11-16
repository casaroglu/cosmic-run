from common import *
D = os.path.join(SPAIN, "05b-the-little-war")
C = coast_copy(D); globe(D, 38.09, -3.78, "Bailén", dist=1.8)
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": MOD["ESP"], "color": PURPLE, "style": "faint", "at": 0.6, "dur": 1.2, "label": "King Joseph's Spain", "labelPos": [-3.6, 40.4]},
   mk([-3.78, 38.09], "Bailén, July 1808", 15, 45, 1.6),
   mk([-0.88, 41.65], "Zaragoza", 15, -40, 2.2),
   mk([-2.67, 42.85], "Vitoria, 1813", -15, -40, 2.8, lalign="right"),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "guerrilla": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   {"kind": "text", "text": "guerrilla = little war", "pos": [0.5, 0.2], "at": 0.3, "size": 60, "color": RED, "cps": 20},
   *[{"kind": "marker", "pos": p, "at": 0.8 + i * 0.25, "size": 14} for i, p in enumerate([[-6.0, 42.6], [-4.4, 41.2], [-2.0, 40.4], [-5.8, 39.4], [-3.4, 38.6], [-1.2, 42.0], [-7.6, 42.3], [-4.6, 37.6], [-0.7, 39.3]])],
   {"kind": "label", "text": "ambush, then vanish", "pos": [0.5, 0.64], "at": 3.4, "size": 50, "cps": 22}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": MOD["ESP"], "color": RED, "at": 0.6, "dur": 1.6, "label": "Spain, 1814", "labelPos": [-3.6, 40.4]},
   {"kind": "arrow", "from": [-1.0, 42.6], "to": [-0.6, 43.8], "at": 1.8, "color": BLUE},
   {"kind": "label", "text": "French out", "pos": [0.8, 44.0], "at": 2.2, "size": 40, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Which English word comes from Spain's war against Napoleon?"),
 a("Guerrilla. It means little war, and Spain fought one against the greatest army in Europe."),
 q("Where did it start?", scene="start", date="1808", place="Spain"),
 a("In July 1808, at Bailén, a Spanish army forced a whole French corps to surrender. A Napoleonic army had never lost an open battle like this.", scene="bailen", date="19 July 1808", place="Bailén", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25]), say="In July 1808, at Bylen, a Spanish army forced a whole French corps to surrender. A Napoleonic army had never lost an open battle like this."),
 q("What did Napoleon do?"),
 a("Joseph fled Madrid. Napoleon came himself, with a huge army."),
 a("Zaragoza held out through two sieges, street by street. When the gunners fell, a young woman, Agustina, fired the cannon herself.", scene="agustina", date="1808 – 1809", place="Zaragoza", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 q("So where does guerrilla come from?", scene="guerrilla", date=""),
 a("All over Spain, small bands ambushed the French and vanished. Spaniards called it guerrilla: the little war."),
 a("Both sides were brutal. Goya etched it all. The prints were so dark, they came out only after his death.", scene="disaster", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 q("How did the French finally lose?", scene="wellington", date="21 June 1813", place="Vitoria", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("With the British under Wellington, they were crushed at Vitoria in 1813. King Joseph ran for France."),
 q("So Spain was free again?", scene="end", date="1814", place="Spain"),
 a("Yes. Then Ferdinand came home. Spaniards had died in his name. He thanked them by tearing up their new constitution.", scene="ferdinand", date="4 May 1814", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 a("They had fought for their king. Their king did not fight for them.", scene="tresmayo", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
 *cta("the constitution written under siege"),
]
write(D, {"episode": "05b", "title": "Which English word comes from Spain's war against Napoleon?", "highlight": ["English", "word"],
  "music": {"mood": "epic", "seed": 18, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 18: the Peninsular War: Bailén, the sieges of Zaragoza, the guerrilla, Goya's Disasters of War and Vitoria (1813). Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "napoleon", "guerrilla", "goya", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
