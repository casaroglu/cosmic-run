from common import *
D = os.path.join(SPAIN, "02a-heir")
E = coast_copy(D, "europe.json"); globe(D, 51.05, 3.72, "Ghent", dist=2.0)
SPAIN_1519 = MOD["ESP"]
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   mk([3.72, 51.05], "Ghent, 1500", 15, -40, 0.8),
   {"kind": "territory", "polys": SPAIN_1519, "color": RED, "at": 1.4, "dur": 1.2, "label": "Spain", "labelPos": [-3.6, 40.0]},
   {"kind": "territory", "polys": [NETHERLANDS, FRANCHE_COMTE], "color": RED, "at": 2.0, "dur": 1.0},
   {"kind": "territory", "polys": [NAPLES_SICILY, SARDINIA], "color": RED, "at": 2.4, "dur": 1.0, "label": "Naples & Sicily", "labelPos": [16.0, 39.0]},
   {"kind": "label", "text": "+ the Americas", "pos": [0.2, 0.42], "at": 3.2, "size": 44, "color": RED},
   {"kind": "label", "text": "Charles's inheritance, 1516", "pos": [0.5, 0.2], "at": 0.4, "size": 54, "color": INK},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": SPAIN_1519 + [NETHERLANDS, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA], "color": RED, "at": 0.4, "dur": 1.4},
   {"kind": "territory", "polys": [AUSTRIA], "color": RED, "at": 1.8, "dur": 1.0, "label": "Austria", "labelPos": [13.6, 47.2]},
   {"kind": "text", "text": "Holy Roman Emperor, 1519", "pos": [0.5, 0.2], "at": 2.4, "size": 54, "color": RED, "cps": 22},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Who inherited half the world at sixteen?"),
 a("Charles of Habsburg. He became king of Spain, and he could barely speak Spanish."),
 q("Where was he from?", scene="young", date="24 February 1500", place="Ghent", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("He was born in Ghent, in today's Belgium, in 1500: grandson of Isabella and Ferdinand of Spain, and of the Holy Roman Emperor."),
 q("How did he get so much?", scene="start", date="1516", place="Europe"),
 a("One by one, the heirs ahead of him died. He inherited Spain, the Netherlands, southern Italy, and the new lands across the ocean."),
 a("His mother, Queen Joanna, was declared unfit to rule, and kept shut away for forty-six years.", scene="juana", date="1516", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("So at sixteen, Charles became king of Spain.", scene="young2", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 q("And then he became emperor?", scene="end", date="28 June 1519", place="Europe"),
 a("Right. Three years later, with loans from the Fugger bankers, he bought the votes that made him Holy Roman Emperor. That added Austria and the German lands."),
 a("His motto was Plus Ultra, further beyond, around the Pillars of Hercules. It is still on Spain's flag today.", scene="hercules", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 q("Did Spain love its new king?", scene="comuneros", date="1520 – 1521", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Not exactly. Castile hated its foreign king. The cities rose up. At Villalar the rebels were crushed, and their leaders beheaded."),
 a("That same month in Germany, a monk named Martin Luther stood before him, and refused to take back a single word.", scene="worms", date="April 1521", place="Worms", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("And across the ocean, a few hundred Spaniards were about to bring down an empire.", scene="tenochtitlan", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 *cta("the emperor who gave it all up", scene="young3", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.2])),
]
write(D, {"episode": "02a", "title": "Who inherited half the world at sixteen?", "highlight": ["half", "world"],
  "music": {"mood": "epic", "seed": 10, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 10: Charles V, part 1: the heir to half the world, the bought election, the Comuneros and Luther. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "charlesv", "habsburg", "luther", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
