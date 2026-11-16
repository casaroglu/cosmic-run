from common import *
D = os.path.join(SPAIN, "01b-columbus")
A = coast_copy(D, "atlantic.json"); globe(D, 30.0, -40.0, "Atlantic", dist=3.0, extra=[{"lat": 37.23, "lon": -6.89, "label": "Palos", "at": 4.6}])
ROUTE = [[-6.9, 37.2], [-12.0, 32.0], [-17.2, 28.1], [-35.0, 27.0], [-55.0, 25.5], [-74.5, 24.0]]
sk = {
 "voyage": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.8},
   mk([-6.89, 37.23], "Palos", 15, -40, 0.8, color=BLUE),
   {"kind": "route", "pts": ROUTE, "at": 1.4, "dur": 3.2, "color": RED},
   {"kind": "ships", "pts": ROUTE, "n": 3, "once": True, "gap": 0.5, "dur": 3.6, "icon": "galleon", "size": 40, "at": 1.4, "color": RED},
   mk([-17.2, 28.1], "Canary Islands", 15, 45, 2.4),
   mk([-74.5, 24.0], "San Salvador", -15, -40, 4.6, lalign="right"),
   {"kind": "text", "text": "3 Aug – 12 Oct 1492", "pos": [0.5, 0.22], "at": 1.0, "size": 58, "color": RED, "cps": 20}]},
 "end": {"coast": A, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "route", "pts": [[-46.6, 46], [-46.6, 8]], "at": 0.4, "dur": 1.6, "color": RED, "width": 8, "arrow": False, "dash": [18, 12]},
   {"kind": "text", "text": "Treaty of Tordesillas, 1494", "pos": [0.5, 0.2], "at": 0.6, "size": 54, "color": RED, "cps": 22},
   {"kind": "label", "text": "SPAIN", "pos": [-66.0, 31.0], "at": 2.0, "size": 54, "color": BLUE},
   {"kind": "label", "text": "PORTUGAL", "pos": [-30.0, 31.0], "at": 2.4, "size": 50, "color": GREEN},
   mk([-70.0, 19.0], "Hispaniola", -15, 45, 3.0, lalign="right"),
   {"kind": "label", "text": "line approx. 46°W", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Did Columbus know he had found a new continent?"),
 a("Never. He died convinced he had reached Asia."),
 q("Why did no one believe in his plan?", scene="rabida", date="1480s", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("For years, everyone said no. Portugal turned him down. Spain's experts said his numbers were wrong."),
 a("And they were right: he thought the Earth was much smaller than it is."),
 q("So who said yes?", scene="court", date="17 April 1492", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Once Granada had fallen, Queen Isabella did. Columbus demanded the title of admiral, a governorship, and a tenth of the profits. He got them."),
 a("On the third of August 1492, he sailed west from Palos with three ships and about ninety men.", scene="voyage", date="3 August 1492", place="Atlantic Ocean"),
 q("Were they scared?"),
 a("Weeks of open ocean. The crew came close to mutiny."),
 a("Then, on the twelfth of October, a lookout shouted: land! An island in the Bahamas. Columbus named it San Salvador.", scene="landing", date="12 October 1492", place="San Salvador", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("He called the people he met Indians, because he was sure he was in the Indies.", scene="landing2", date="", move=mv([0.6, 0.5, 1.0], [0.45, 0.5, 1.25])),
 q("Who owned the new lands?", scene="end", date="1494", place="Atlantic"),
 a("In 1494, at Tordesillas, Spain and Portugal drew a line down the Atlantic: west for Spain, east for Portugal. That's why Brazil speaks Portuguese."),
 q("And Columbus?", scene="death", date="20 May 1506", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("He sailed there four times. He died in 1506, still insisting it was Asia."),
 a("A year later, a German mapmaker named the new land after another explorer, Amerigo Vespucci. America.", scene="map", date="1507", move=mv([0.3, 0.5, 1.0], [0.6, 0.5, 1.3])),
 *cta("the boy who inherited half the world", scene="columbus", move=mv([0.5, 0.4, 1.0], [0.5, 0.35, 1.2])),
]
write(D, {"episode": "01b", "title": "Did Columbus know he had found a new continent?", "highlight": ["Columbus", "continent?"],
  "music": {"mood": "epic", "seed": 9, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 9: Columbus, the 1492 voyage from Palos to San Salvador, the Treaty of Tordesillas and the man who died thinking he had reached Asia. Images: public domain. Map data: Natural Earth.",
           "hashtags": ["history", "spain", "columbus", "1492", "tordesillas", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
