from common import *
D = os.path.join(SPAIN, "02b-emperor")
E = coast_copy(D, "europe.json"); globe(D, 40.07, -5.69, "Yuste", dist=2.0)
CHARLES = MOD["ESP"] + [NETHERLANDS, FRANCHE_COMTE, NAPLES_SICILY, SARDINIA, MILAN]
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": CHARLES + [AUSTRIA], "color": RED, "at": 0.8, "dur": 2.0, "label": "Charles V, 1550", "labelPos": [-3.6, 40.0]},
   {"kind": "label", "text": "+ the Americas", "pos": [-6.0, 52.5], "at": 2.6, "size": 44, "color": RED},
   {"kind": "label", "text": "FRANCE", "pos": [2.4, 46.8], "at": 3.0, "size": 46, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": CHARLES, "color": RED, "at": 0.4, "dur": 1.6, "label": "Philip II", "labelPos": [-3.6, 40.0]},
   {"kind": "territory", "polys": [AUSTRIA], "color": PURPLE, "at": 1.6, "dur": 1.0, "label": "Ferdinand", "labelPos": [13.6, 47.2]},
   {"kind": "text", "text": "the split, 1556", "pos": [0.5, 0.2], "at": 0.6, "size": 56, "color": INK, "cps": 22},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Why did the most powerful man on Earth give it all up?"),
 a("Because the wars never ended, and neither did the debts. Charles the Fifth quit, and wept in front of his court."),
 q("How big was his empire?", scene="start", date="1550", place="Europe"),
 a("Spain, the Netherlands, much of Italy, Austria, and the Holy Roman Empire. And across the ocean, the Americas."),
 a("Under his crown, Cortés destroyed the Aztec empire, and Pizarro the Inca. American silver began to pour into Spain.", scene="tenochtitlan", date="1521 – 1533", place="The Americas", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("Who were his enemies?", scene="pavia", date="24 February 1525", place="Pavia", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("France above all. On his twenty-fifth birthday, his army crushed the French at Pavia, and captured their king."),
 a("Francis the First was held in Madrid for a year. He signed a peace treaty, and broke it as soon as he was free.", scene="francis", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.25])),
 a("Then Charles's own unpaid soldiers mutinied, and sacked Rome. The Pope hid in a fortress.", scene="sack", date="6 May 1527", place="Rome", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("Did he ever win?", scene="muhlberg2", date="24 April 1547", place="Mühlberg", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Yes. He beat the Protestant princes at Mühlberg. Titian painted him as the perfect Christian knight.", say="Yes. He beat the Protestant princes at Muhlberg. Titian painted him as the perfect Christian knight."),
 q("So why did he quit?", scene="abdication", date="25 October 1555", place="Brussels", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Worn out by wars and debts, he gave up his crowns, and wept in front of his court."),
 q("Who got the empire?", scene="end", date="1556", place="Europe"),
 a("It was split. His brother Ferdinand took Austria and the imperial crown. His son Philip took Spain, the Netherlands, Italy and the Americas."),
 a("Charles retired to a small house beside a monastery in Spain, at Yuste, and died there in 1558.", scene="yuste", date="21 September 1558", place="Yuste", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 *cta("Philip the Second, the king who ruled from a desk", scene="seated", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.2])),
]
write(D, {"episode": "02b", "title": "Why did the most powerful man on Earth give it all up?", "highlight": ["powerful", "give", "up?"],
  "music": {"mood": "bittersweet", "seed": 11, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 11: Charles V, part 2: Aztec and Inca silver, Pavia, the Sack of Rome, Mühlberg, the abdication and the split of 1556. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "charlesv", "habsburg", "abdication", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
