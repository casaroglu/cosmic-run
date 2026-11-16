from common import *
D = os.path.join(SPAIN, "06-spanish-succession")
E = coast_copy(D, "europe.json"); C = coast_copy(D); globe(D, 36.14, -5.35, "Gibraltar", dist=2.0)
CHARLES2 = MOD["ESP"] + [NL_SOUTH, NAPLES_SICILY, SARDINIA, MILAN]
sk = {
 "start": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": CHARLES2, "color": RED, "at": 0.8, "dur": 1.8, "label": "Spain, 1700", "labelPos": [-3.6, 40.0]},
   {"kind": "label", "text": "+ the Americas, the Philippines", "pos": [0.5, 0.2], "at": 2.4, "size": 50, "color": RED},
   {"kind": "label", "text": "FRANCE", "pos": [2.4, 46.8], "at": 2.8, "size": 46, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": CHARLES2, "color": RED, "style": "faint", "at": 0.2, "dur": 0.8},
   {"kind": "territory", "polys": MOD["ESP"], "color": RED, "at": 1.0, "dur": 1.4, "label": "Spain, 1714", "labelPos": [-3.6, 40.0]},
   {"kind": "territory", "polys": [NL_SOUTH, NAPLES_SICILY, SARDINIA, MILAN], "color": PURPLE, "at": 2.2, "dur": 1.0},
   {"kind": "label", "text": "to Austria", "pos": [14.6, 43.2], "at": 2.6, "size": 40, "color": PURPLE},
   mk(GIBRALTAR, "Gibraltar", -15, 45, 3.0, lalign="right", color=BLUE),
   {"kind": "territory", "polys": [MINORCA], "color": BLUE, "at": 3.2, "dur": 0.6},
   {"kind": "label", "text": "Minorca", "pos": [5.6, 39.6], "at": 3.4, "size": 34, "color": BLUE},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did a dying king's will start a world war?"),
 a("Charles the Second, the last Habsburg king of Spain, died in 1700 with no children. Everyone wanted his empire."),
 q("What was there to inherit?", scene="start", date="1700", place="Europe"),
 a("Spain, much of Italy, the southern Netherlands, and a huge empire overseas."),
 q("And whom did he leave it to?", scene="anjou", date="16 November 1700", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("To a French prince: Philip, grandson of Louis the Fourteenth. Louis said yes."),
 q("Why did that start a war?"),
 a("France and Spain under one family? England, the Dutch and Austria went to war to stop it.", scene="archduke", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("They backed a rival king, Archduke Charles of Austria. Spain itself split in two."),
 a("In 1704, an Anglo-Dutch fleet took Gibraltar, in the archduke's name. The British kept it for themselves.", scene="gibraltar", date="4 August 1704", place="Gibraltar", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("At Almansa, Philip's army won the decisive battle in Spain. Then he punished the kingdoms that had fought him, and abolished their old laws.", scene="almansa", date="25 April 1707", place="Almansa", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("How did it end?", scene="utrecht", date="1713", place="Utrecht", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("Peace came at Utrecht. Philip kept Spain and its empire overseas, but lost Italy and the Netherlands. Britain got Gibraltar and Minorca."),
 a("Barcelona fought on alone, and fell on the eleventh of September 1714. Catalonia still marks that day.", scene="barcelona", date="11 September 1714", place="Barcelona", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("So what was left in Europe?", scene="end", date="1714", place="Europe"),
 a("Spain itself, without its Italian and Dutch lands. Gibraltar is still British, three hundred years later."),
 a("Philip became Spain's first Bourbon king. The king of Spain today, Felipe the Sixth, is his descendant.", scene="family", date="", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 *cta("Napoleon, and two kings who lost one crown"),
]
write(D, {"episode": "06", "title": "How did a dying king's will start a world war?", "highlight": ["will", "world", "war?"],
  "music": {"mood": "epic", "seed": 16, "drums": True, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 16: the War of the Spanish Succession (1701–1714): Charles II's will, Philip V, Gibraltar, Utrecht and the fall of Barcelona. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "gibraltar", "bourbon", "utrecht", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
