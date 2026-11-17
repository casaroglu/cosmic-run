from common import *
D = os.path.join(SPAIN, "09b-civil-war")
C = coast_copy(D); globe(D, 43.31, -2.68, "Guernica", dist=1.8)
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.3, color=RED, style="faint"),
   {"kind": "territory", "polys": [NAT_NOV36], "color": BLUE, "at": 0.8, "dur": 1.8, "label": "Franco", "labelPos": [-6.2, 40.6]},
   {"kind": "label", "text": "Republic", "pos": [-1.6, 39.2], "at": 2.4, "size": 48, "color": RED},
   mk([-3.70, 40.42], "Madrid holds", 15, 45, 2.8, color=RED),
   {"kind": "label", "text": "November 1936, approx.", "pos": [0.76, 0.66], "at": 3.0, "size": 34}]},
 "world": {"items": [
   {"kind": "text", "text": "Who sent help?", "pos": [0.5, 0.2], "at": 0.1, "size": 62},
   {"kind": "text", "text": "to Franco: Germany, Italy", "pos": [0.5, 0.33], "at": 0.6, "size": 56, "color": BLUE, "cps": 22},
   {"kind": "text", "text": "to the Republic: the USSR", "pos": [0.5, 0.43], "at": 1.8, "size": 56, "color": RED, "cps": 22},
   {"kind": "text", "text": "+ International Brigades", "pos": [0.5, 0.53], "at": 3.0, "size": 56, "color": RED, "cps": 22}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [NAT_NOV36], "color": BLUE, "style": "faint", "at": 0.2, "dur": 0.6},
   spain_today(1.0, color=BLUE, label="Franco's Spain, April 1939", labelPos=[-3.6, 40.4]),
   {"kind": "arrow", "from": [2.2, 41.9], "to": [2.8, 43.0], "at": 2.2, "color": RED},
   {"kind": "label", "text": "refugees to France", "pos": [1.0, 43.9], "at": 2.6, "size": 36, "color": RED},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did Spain's civil war become the world's war?"),
 a("Because foreign powers sent planes, tanks and volunteers. Spain became a rehearsal for the Second World War."),
 q("Where were the front lines?", scene="start", date="November 1936", place="Spain"),
 a("By November 1936, Franco's army held the west and reached Madrid. The city held."),
 a("Its slogan went around the world: they shall not pass.", scene="feixisme", date="", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 q("Who helped whom?", scene="world"),
 a("Hitler and Mussolini sent Franco planes, tanks and troops. Stalin sent the Republic weapons."),
 a("And volunteers from dozens of countries came to fight for the Republic: the International Brigades.", scene="brigade", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("What was Guernica?", scene="guernica", date="26 April 1937", place="Guernica", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("On a busy Monday, German and Italian bombers destroyed the Basque town of Guernica. Picasso painted it, and the world saw it."),
 a("Behind both front lines, tens of thousands of civilians were killed for who they were, or what they believed."),
 q("Did the Republic ever strike back?", scene="ebro", date="July 1938", place="Ebro", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("In 1938, it gambled on one last offensive at the Ebro. It lasted four months, and failed."),
 a("Catalonia fell. Hundreds of thousands fled across the snow into France, and ended up in camps on the beach.", scene="argeles", date="February 1939", place="Argelès-sur-Mer", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("And the end?", scene="end", date="1 April 1939", place="Spain"),
 a("On the first of April 1939, Franco announced: the war is over. He would rule Spain for thirty-six years."),
 *cta("how a dictator's heir gave Spain democracy", scene="parade", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
]
write(D, {"episode": "09b", "title": "How did Spain's civil war become the world's war?", "highlight": ["world's", "war?"],
  "music": {"mood": "bittersweet", "seed": 22, "drums": True, "level": 0.28},
  "post": {"caption": "The History of Spain, episode 22: the Spanish Civil War (1936–39): Madrid, the International Brigades, Guernica, the Ebro and the exile of 1939. Images: public domain. Map data: Natural Earth. Front lines approx.",
           "hashtags": ["history", "spain", "civilwar", "guernica", "1936", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
