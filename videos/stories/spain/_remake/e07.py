from common import *
D = os.path.join(SPAIN, "07-cadiz-1812")
C = coast_copy(D); A = coast_copy(D, "americas.json"); globe(D, 36.53, -6.29, "Cádiz", dist=1.8)
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": MOD["ESP"], "color": BLUE, "at": 0.8, "dur": 1.6, "label": "French-held, 1810", "labelPos": [-3.6, 40.4]},
   mk(CADIZ, "Cádiz holds out", 15, 45, 2.2, color=RED),
   {"kind": "circle", "pos": CADIZ, "r": 55, "ry": 45, "at": 2.8, "color": RED},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "ideas": {"items": [
   {"kind": "text", "text": "La Pepa, 1812", "pos": [0.5, 0.2], "at": 0.1, "size": 66, "color": RED},
   {"kind": "text", "text": "power belongs to the nation", "pos": [0.5, 0.32], "at": 0.8, "size": 52, "cps": 22},
   {"kind": "text", "text": "power split in three", "pos": [0.5, 0.41], "at": 2.0, "size": 52, "cps": 22},
   {"kind": "text", "text": "votes for men", "pos": [0.5, 0.5], "at": 3.0, "size": 52, "cps": 22},
   {"kind": "text", "text": "liberales", "pos": [0.5, 0.6], "at": 3.8, "size": 64, "color": BLUE, "cps": 20}]},
 "end": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.4},
   {"kind": "territory", "polys": [SPANISH_AMERICA_1810], "color": RED, "style": "faint", "at": 0.4, "dur": 1.0, "label": "Spanish America, 1810", "labelPos": [-64.0, -24.0]},
   {"kind": "territory", "polys": [CUBA, PUERTO_RICO], "color": RED, "at": 1.8, "dur": 1.0},
   {"kind": "label", "text": "Spanish in 1825: Cuba, Puerto Rico", "pos": [0.5, 0.2], "at": 2.4, "size": 50, "color": RED, "cps": 22},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Where does the political word liberal come from?"),
 a("From Spain, from a constitution written under French siege in the city of Cádiz.", say="From Spain, from a constitution written under French siege in the city of Cadiz."),
 q("Why Cádiz?", scene="start", date="1810", place="Spain", say="Why Cadiz?"),
 a("In 1810, French armies held most of Spain. One city held out behind its walls: Cádiz.", say="In 1810, French armies held most of Spain. One city held out behind its walls: Cadiz."),
 a("With the king a prisoner in France, deputies from Spain and the Americas met there.", scene="cortes", date="24 September 1810", place="Cádiz", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("Who did they say ruled Spain?"),
 a("Their answer shocked the old world: the nation. Not the king."),
 a("On Saint Joseph's day, 1812, they proclaimed a constitution. Spaniards nicknamed it La Pepa.", scene="promulgation", date="19 March 1812", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("What was in it?", scene="ideas", date=""),
 a("Power split in three, and votes for men. Its defenders called themselves liberales. The word spread across Europe."),
 q("Did it last?", scene="ferdinand", date="4 May 1814", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Not exactly. Two years later, King Ferdinand came home, and tore it up."),
 a("In 1820, an officer named Rafael del Riego rebelled. The king was forced to swear loyalty to La Pepa.", scene="riego", date="1 January 1820", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.25])),
 a("Three years later, a French army marched in to rescue the king. Riego was executed in Madrid.", scene="trocadero", date="1823", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("And the Americas?", scene="end", date="1825", place="The Americas"),
 a("While Spain fought itself, its American colonies won their independence. By 1825, only Cuba and Puerto Rico were left."),
 a("La Pepa kept losing. But its ideas reached Portugal, Italy and Latin America.", scene="cortes2", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
 *cta("1898, the summer the empire ended"),
]
write(D, {"episode": "07", "title": "Where does the political word liberal come from?", "highlight": ["liberal", "from?"],
  "music": {"mood": "hopeful", "seed": 19, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 19: the Cortes of Cádiz and the Constitution of 1812, La Pepa, the word liberal, Riego and the loss of Spanish America. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "cadiz", "1812", "liberal", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
