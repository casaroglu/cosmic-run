from common import *
D = os.path.join(SPAIN, "08-1898")
A = coast_copy(D, "americas.json"); globe(D, 23.13, -82.38, "Havana", dist=2.2)
sk = {
 "start": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [CUBA, PUERTO_RICO], "color": RED, "at": 0.8, "dur": 1.2},
   mk([-82.38, 23.13], "Cuba", -15, -40, 1.4, lalign="right"), mk([-66.1, 18.4], "Puerto Rico", 15, -40, 1.8),
   {"kind": "label", "text": "UNITED STATES", "pos": [-98.0, 36.0], "at": 2.4, "size": 46, "color": BLUE},
   {"kind": "label", "text": "+ the Philippines, Guam, Pacific islands", "pos": [0.5, 0.2], "at": 2.8, "size": 46, "color": RED},
   {"kind": "label", "text": "Spain overseas, 1895 (approx.)", "pos": [0.72, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [CUBA, PUERTO_RICO], "color": RED, "style": "faint", "at": 0.2, "dur": 0.6},
   {"kind": "territory", "polys": [CUBA], "color": GREEN, "at": 1.0, "dur": 1.0, "label": "Cuba: independent (US-occupied)", "labelPos": [-79.0, 25.2]},
   {"kind": "territory", "polys": [PUERTO_RICO], "color": BLUE, "at": 1.8, "dur": 0.8, "label": "Puerto Rico: US", "labelPos": [-66.0, 16.6]},
   {"kind": "label", "text": "Philippines, Guam: US", "pos": [0.5, 0.2], "at": 2.6, "size": 50, "color": BLUE, "cps": 22},
   {"kind": "label", "text": "1899, borders approx.", "pos": [0.76, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did a four-hundred-year empire end in one summer?"),
 a("Spain's empire began in 1492 and ended in 1898, in a war with the United States that lasted under four months."),
 q("What was left of the empire by then?", scene="start", date="1895", place="Caribbean"),
 a("Cuba and Puerto Rico in the Caribbean, and the Philippines and Guam in the Pacific. And in 1895, Cuba rose up again."),
 a("Just across the water, Americans watched closely.", scene="cuba", date="1895", place="Cuba", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("What started the war?", scene="maine2", date="15 February 1898", place="Havana", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("The American battleship Maine blew up in Havana harbour. Two hundred and sixty-six men died."),
 a("American newspapers blamed Spain. Remember the Maine! Later studies suggest it may have been a fire inside the ship."),
 a("War came in April. At Manila, an American squadron wiped out Spain's Pacific fleet within hours.", scene="manila", date="1 May 1898", place="Manila", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("In July, Spain's Atlantic fleet tried to break out of Santiago de Cuba. Every ship was lost.", scene="santiago", date="3 July 1898", place="Santiago de Cuba", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("How did it end?", scene="paris", date="10 December 1898", place="Paris", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("By December it was over. Spain gave up Cuba, and handed Puerto Rico, Guam and the Philippines to the United States."),
 q("So what did the map look like after?", scene="end", date="1899", place="The Americas"),
 a("No Spanish flag left in the Americas. A year later, Spain sold its last Pacific islands to Germany."),
 a("It had begun in 1492, with three small ships. Spaniards called its end, simply, the Disaster.", scene="landing", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
 *cta("the republic that voted out a king"),
]
write(D, {"episode": "08", "title": "How did a four-hundred-year empire end in one summer?", "highlight": ["empire", "summer?"],
  "music": {"mood": "bittersweet", "seed": 20, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 20: 1898: the Cuban revolt, the Maine, Manila Bay, Santiago de Cuba and the Treaty of Paris, the end of Spain's empire. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "1898", "cuba", "philippines", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
