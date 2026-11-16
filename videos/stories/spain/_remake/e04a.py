from common import *
D = os.path.join(SPAIN, "04a-cervantes")
M = coast_copy(D, "med.json"); globe(D, 36.75, 3.06, "Algiers", dist=2.0)
sk = {
 "start": {"coast": M, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": PHILIP_1556, "color": RED, "at": 0.6, "dur": 1.6, "label": "Spain, 1571", "labelPos": [-4.0, 40.0]},
   {"kind": "territory", "polys": ottoman("1570"), "color": GREEN, "at": 1.4, "dur": 1.6, "label": "Ottoman Empire", "labelPos": [32.0, 38.8]},
   mk([21.83, 38.39], "Lepanto", -15, 45, 2.8, lalign="right"),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "captive": {"coast": M, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   {"kind": "route", "pts": [[14.3, 40.8], [9.0, 41.5], [4.5, 42.4]], "at": 0.4, "dur": 1.4, "color": BLUE},
   {"kind": "route", "pts": [[4.5, 42.4], [3.06, 36.8]], "at": 1.8, "dur": 1.0, "color": RED, "dash": [14, 10]},
   mk([3.06, 36.75], "Algiers", 15, 45, 2.6),
   {"kind": "label", "text": "taken by pirates, 1575", "pos": [0.5, 0.2], "at": 2.0, "size": 52, "color": RED, "cps": 22},
   {"kind": "label", "text": "5 years, 4 escape attempts", "pos": [0.5, 0.64], "at": 3.4, "size": 50, "cps": 22}]},
 "end": {"coast": M, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": PHILIP_1580, "color": RED, "at": 0.4, "dur": 1.6, "label": "Spain, 1616", "labelPos": [-4.0, 40.0]},
   {"kind": "territory", "polys": [NL_NORTH], "color": ORANGE, "style": "faint", "at": 1.6, "dur": 0.8},
   mk([-3.7, 40.42], "Madrid", 15, -40, 2.2),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Who was sold as a slave, then wrote Don Quixote?"),
 a("Miguel de Cervantes. Before he wrote the most famous novel in Spanish, his life was its own adventure."),
 q("Where does his story start?", scene="start", date="1571", place="Mediterranean"),
 a("At sea. Spain and the Ottoman Empire were fighting for the Mediterranean."),
 a("At Lepanto in 1571, Cervantes, aged twenty-four, took two shots in the chest. A third ruined his left hand.", scene="lepanto", date="7 October 1571", place="Lepanto", move=mv([0.4, 0.5, 1.0], [0.6, 0.5, 1.25])),
 q("And the slavery?", scene="captive", date="26 September 1575", place="Algiers"),
 a("Four years later, sailing home, his galley was taken by pirates. He was sold as a slave in Algiers."),
 a("He tried to escape four times. Every time, he took the blame alone.", scene="algiers", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.3])),
 a("After five years, Trinitarian friars raised his ransom and bought him free.", scene="algiers2", date="19 September 1580", move=mv([0.55, 0.5, 1.0], [0.45, 0.5, 1.25])),
 q("So how did he become a writer?", scene="seville", date="1597", place="Seville", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Slowly. Back home he became a tax collector. Trouble with his accounts landed him in a Seville jail. In the book's prologue, he hinted it was born in a prison."),
 a("In 1605 it came out: an old man reads too many knight stories, and rides off to be a knight himself.", scene="titlepage", date="1605", place="Madrid", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("He charges at windmills, sure they are giants. It was a hit at once. We still say tilting at windmills.", scene="windmills", date="", move=mv([0.4, 0.5, 1.0], [0.6, 0.5, 1.25])),
 q("Is it true he died the same day as Shakespeare?", scene="shakespeare", date="April 1616", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 a("Not exactly. Shakespeare's date, the twenty-third of April, comes from England's old calendar. On Spain's calendar he died eleven days after Cervantes."),
 q("And Spain when he died?", scene="end", date="1616", place="Spain"),
 a("Still a huge monarchy, from Portugal to Naples. But it had already lost the northern Netherlands."),
 a("And this face? No one knows if it's really him. No portrait of Cervantes is known to be genuine.", scene="cervantes2", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 *cta("Velázquez, the painter who painted himself", say="Next time: Velasquez, the painter who painted himself. Like the video and follow History Sketches."),
]
write(D, {"episode": "04a", "title": "Who was sold as a slave, then wrote Don Quixote?", "highlight": ["slave", "Quixote?"],
  "music": {"mood": "bittersweet", "seed": 14, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 14: Miguel de Cervantes: wounded at Lepanto, five years a slave in Algiers, jailed in Seville, and Don Quixote (1605). Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "cervantes", "donquixote", "literature", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
