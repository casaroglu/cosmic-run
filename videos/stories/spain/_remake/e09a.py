from common import *
D = os.path.join(SPAIN, "09a-republic")
C = coast_copy(D); globe(D, 40.42, -3.70, "Madrid", dist=1.8)
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, color=PURPLE, label="Second Republic, 1931", labelPos=[-3.6, 40.4]),
   mk([-3.70, 40.42], "Madrid", 15, -40, 2.2),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   spain_today(0.3, color=RED, style="faint"),
   {"kind": "territory", "polys": [NAT_JUL36, NAT_JUL36_SOUTH], "color": BLUE, "at": 1.0, "dur": 1.8, "label": "rebels", "labelPos": [-5.6, 41.9]},
   {"kind": "label", "text": "Republic", "pos": [-2.0, 39.2], "at": 2.6, "size": 48, "color": RED},
   mk([-3.70, 40.42], "Madrid", 15, -40, 2.8),
   {"kind": "label", "text": "late July 1936, approx.", "pos": [0.76, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did Spain go from a new republic to civil war in five years?"),
 a("It voted out its king in 1931. By 1936, the country was split down the middle."),
 q("How did the king go?", scene="alfonso", date="14 April 1931", place="Madrid", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("In April 1931, republicans swept the city elections, and King Alfonso the Thirteenth left Spain. A republic was born."),
 q("What did it change?", scene="start", date="1931", place="Spain"),
 a("It moved fast: land reform, army reform, church and state split. In 1933, women voted for the first time."),
 a("But Spain was divided. In 1934, miners in Asturias rose in revolt.", scene="asturias", date="October 1934", place="Asturias", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("The army crushed them, with a general named Francisco Franco directing from Madrid.", scene="arrests", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 q("And then?", scene="poster", date="February 1936", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("In 1936, the left-wing Popular Front won the election. Strikes, church burnings and political killings followed, on both sides."),
 a("In July, police officers murdered the right-wing leader José Calvo Sotelo."),
 q("So the army moved?", scene="coup", date="18 July 1936", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Days later, generals rose against the Republic. The coup won in about half of Spain, and failed in the rest."),
 q("What did the map look like?", scene="end", date="July 1936", place="Spain"),
 a("Two Spains. The rebels held the northwest and pockets of the south. The Republic held Madrid, Barcelona and the east."),
 a("Franco's best troops were stuck in Morocco. Hitler and Mussolini sent planes, and flew them across. By October, Franco led the rebels.", scene="franco", date="1 October 1936", place="Burgos", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 *cta("three years of civil war"),
]
write(D, {"episode": "09a", "title": "How did Spain go from a new republic to civil war in five years?", "highlight": ["republic", "civil", "war"],
  "music": {"mood": "bittersweet", "seed": 21, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 21: the Second Republic (1931): reforms, women's vote, Asturias 1934, the Popular Front and the coup of July 1936. Images: public domain. Map data: Natural Earth. Front lines approx.",
           "hashtags": ["history", "spain", "republic", "1936", "franco", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
