from common import *
D = os.path.join(SPAIN, "00a-altamira")
C = coast_copy(D); globe(D, 43.38, -4.12, "Altamira")
sk = {
 "today": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, label="SPAIN", labelPos=[-3.6, 39.6]),
   mk([-4.12, 43.38], "Altamira", 20, -40, 2.2),
   mk([-3.81, 43.46], "Santander", 20, 45, 2.6, color=BLUE),
   {"kind": "label", "text": "Bay of Biscay", "pos": [-5.5, 44.0], "at": 3.0, "size": 42, "color": BLUE},
   {"kind": "circle", "pos": [-4.12, 43.38], "r": 55, "ry": 45, "at": 3.4}]},
 "age": {"items": [
   {"kind": "text", "text": "How old?", "pos": [0.5, 0.22], "at": 0.1, "size": 64},
   {"kind": "counter", "pos": [0.5, 0.36], "from": 0, "to": 35000, "suffix": "+ years", "at": 0.4, "dur": 2.0, "size": 104},
   {"kind": "timeline", "pos": [0.08, 0.52], "from": -35000, "to": 2000, "at": 1.0, "dur": 1.6,
    "ticks": [{"v": -35000, "year": "35,000 years ago", "label": "oldest marks"}, {"v": 1879, "year": "1879", "label": "found"}]}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Why did experts call a little girl's discovery a fake?"),
 a("Because the paintings looked too good to be real. This is Altamira, in northern Spain."),
 q("Where exactly is it?", scene="today", date="Today", place="Cantabria, Spain"),
 a("Near the village of Santillana del Mar, in Cantabria, not far from the Bay of Biscay."),
 q("And how was it found?", scene="sautuola", date="1879", place="Altamira", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("In 1879, an amateur scientist, Marcelino Sanz de Sautuola, was digging in the cave near his home."),
 a("His little daughter María wandered deeper inside, looked up, and shouted: Papa, bulls!", scene="maria", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("The ceiling was covered in bison, in red, black and ochre, painted over the bumps of the rock so they seem to breathe.", scene="bison2", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("So he became famous?", scene="drawing", date="1880", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("Not exactly. He published his find in 1880, and Europe's experts laughed. Far too good for cavemen, they said. A forgery."),
 a("Sautuola died in 1888, still called a fraud."),
 q("Did anyone ever say sorry?", scene="cartailhac", date="1902", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("Yes. In 1902, the leading sceptic, Émile Cartailhac, published an apology. Its title: Mea culpa of a sceptic.", say="Yes. In 1902, the leading sceptic, Emile Cartaiyak, published an apology. Its title: Mea culpa of a sceptic."),
 q("So how old are the paintings?", scene="age", date=""),
 a("Some marks in Altamira are over thirty-five thousand years old."),
 q("Can anyone visit the cave?", scene="ceiling", date="Today", place="Altamira", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Only five people a week may enter, chosen by lottery. Everyone else visits an exact replica next door."),
 *cta("the Spanish city older than Rome", scene="bison", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.2])),
]
write(D, {"episode": "00a", "title": "Why did experts call a little girl's discovery a fake?", "highlight": ["girl's", "fake?"],
  "music": {"mood": "dreamy", "seed": 1, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 1: Altamira, the cave paintings a little girl spotted in 1879, and the experts who called them fake. Images: public domain / CC0. Map data: Natural Earth.",
           "hashtags": ["history", "spain", "altamira", "prehistory", "cavepainting", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
