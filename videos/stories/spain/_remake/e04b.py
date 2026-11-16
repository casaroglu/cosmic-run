from common import *
D = os.path.join(SPAIN, "04b-velazquez")
E = coast_copy(D, "europe.json"); globe(D, 40.41, -3.69, "Madrid", dist=2.0)
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": MOD["ESP"] + PORTUGAL + [NL_SOUTH, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA, MILAN], "color": RED, "at": 0.8, "dur": 1.8, "label": "Philip IV, 1623", "labelPos": [-3.6, 40.0]},
   {"kind": "label", "text": "+ the Americas", "pos": [-6.0, 52.5], "at": 2.6, "size": 44, "color": RED},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": MOD["ESP"] + PORTUGAL + [NL_SOUTH, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA, MILAN], "color": RED, "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": MOD["ESP"] + [NL_SOUTH, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA, MILAN], "color": RED, "at": 1.0, "dur": 1.6, "label": "Philip IV, 1660", "labelPos": [-3.6, 40.0]},
   {"kind": "territory", "polys": PORTUGAL, "color": GREEN, "at": 2.4, "dur": 1.0, "label": "Portugal, 1640", "labelPos": [-8.3, 39.4]},
   {"kind": "territory", "polys": [ROUSSILLON], "color": BLUE, "at": 3.0, "dur": 0.8},
   {"kind": "label", "text": "Roussillon to France, 1659", "pos": [3.4, 43.4], "at": 3.2, "size": 34, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Why did a painter put himself in a portrait of the royal family?"),
 a("That painter was Diego Velázquez, and the painting is Las Meninas. He painted the king for thirty-seven years.", say="That painter was Diego Velasquez, and the painting is Las Meninas. He painted the king for thirty-seven years."),
 q("Where did he start?", scene="waterseller", date="1599", place="Seville", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("He was born in Seville in 1599. As a young man he painted the street: cooks, beggars, a water seller."),
 q("How big was Spain then?", scene="start", date="1623", place="Europe"),
 a("Still enormous: Spain and Portugal, much of Italy, the southern Netherlands, and the Americas."),
 a("At twenty-four, Velázquez got one sitting with the young king, Philip the Fourth. The king was thrilled.", scene="philip", date="30 August 1623", place="Madrid", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3]), say="At twenty-four, Velasquez got one sitting with the young king, Philip the Fourth. The king was thrilled."),
 a("He became court painter, with a promise: no one else would ever paint the king."),
 q("What did he paint for the king?", scene="breda", date="1625", place="Breda", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Spain's victories, like Breda. The winner doesn't humiliate the loser. He puts a hand on his shoulder."),
 a("But the wars drained the treasury. In 1640, Catalonia and Portugal rose up. Portugal was gone for good.", scene="olivares", date="1640", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("In Rome he painted the Pope so honestly that, the story goes, the Pope said: too true.", scene="innocent", date="1650", place="Rome", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 q("And Las Meninas?", scene="meninas", date="1656", place="Madrid", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
 a("A little princess, her maids, a dwarf, a sleepy dog. In the mirror at the back: the king and queen, as if they stood right where you are.", scene="mirror", move=mv([0.5, 0.45, 1.0], [0.52, 0.42, 1.6])),
 a("And on the left, brush in hand, Velázquez himself, with a red cross of knighthood on his chest.", scene="self", move=mv([0.3, 0.45, 1.0], [0.28, 0.42, 1.7]), say="And on the left, brush in hand, Velasquez himself, with a red cross of knighthood on his chest."),
 q("Was he really a knight?", scene="end", date="1660", place="Spain"),
 a("Not yet. He was only made a knight in 1659, three years later. Someone painted the cross in afterwards. He died the next summer, as Spain's empire was fading."),
 *cta("the dying king whose will started a world war", scene="meninas", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.2])),
]
write(D, {"episode": "04b", "title": "Why did a painter put himself in a portrait of the royal family?", "highlight": ["painter", "himself"],
  "music": {"mood": "dreamy", "seed": 15, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 15: Diego Velázquez: from Seville's streets to Philip IV's court, Breda, Pope Innocent X and Las Meninas (1656). Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "velazquez", "lasmeninas", "art", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
