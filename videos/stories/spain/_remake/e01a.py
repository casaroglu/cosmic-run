from common import *
D = os.path.join(SPAIN, "01a-granada")
C = coast_copy(D); M = coast_copy(D, "med.json"); globe(D, 37.18, -3.6, "Granada")
CASTILE_1491 = [[-9.3, 43.8], [-1.8, 43.4], [-1.9, 42.9], [-1.4, 42.4], [-1.9, 41.4], [-1.3, 40.4], [-1.2, 38.4], [-0.9, 37.6], [-1.5, 36.9],
                [-2.0, 37.5], [-3.0, 37.7], [-4.4, 37.6], [-5.4, 37.0], [-5.6, 36.0], [-6.4, 36.6], [-7.4, 37.2], [-7.0, 38.2], [-7.3, 39.5],
                [-6.9, 40.3], [-6.9, 41.9], [-8.1, 41.9], [-8.9, 42.1]]
SEPH = [([28.98, 41.01], "Istanbul"), ([22.94, 40.64], "Thessaloniki"), ([-5.81, 35.78], "Tangier"), ([-9.14, 38.72], "Lisbon"), ([4.9, 52.37], "Amsterdam")]
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [GRANADA], "color": GREEN, "at": 0.8, "dur": 1.4, "label": "Granada", "labelPos": [-3.4, 36.45]},
   {"kind": "territory", "polys": [CASTILE_1491], "color": BLUE, "style": "faint", "at": 1.6, "dur": 1.4, "label": "Castile", "labelPos": [-4.2, 40.3]},
   {"kind": "label", "text": "Aragon", "pos": [-0.2, 41.0], "at": 2.6, "size": 40, "color": PURPLE},
   {"kind": "label", "text": "Portugal", "pos": [-8.3, 39.6], "at": 2.8, "size": 34, "color": INK},
   {"kind": "label", "text": "1491, borders approx.", "pos": [0.78, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [CASTILE_1491, GRANADA], "color": BLUE, "at": 0.6, "dur": 1.8, "label": "Crown of Castile, 1492", "labelPos": [-4.2, 40.3]},
   {"kind": "label", "text": "Crown of Aragon", "pos": [-0.2, 41.0], "at": 2.2, "size": 40, "color": PURPLE},
   mk([-3.6, 37.18], "Granada", 20, 45, 2.6),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "sephardim": {"coast": M, "items": [
   {"kind": "coast", "at": 0, "dur": 1.0, "pencil": False},
   {"kind": "text", "text": "where Spain's Jews went", "pos": [0.5, 0.22], "at": 0.3, "size": 54, "color": RED, "cps": 22},
   *[{"kind": "route", "pts": [[-4.0, 38.5], p], "bend": 0.15, "at": 0.8 + i * 0.4, "dur": 1.0, "color": RED} for i, (p, n) in enumerate(SEPH[:4])],
   *[mk(p, n, 15, -35, 1.6 + i * 0.4, lsize=36) for i, (p, n) in enumerate(SEPH[:4])]]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did 1492 begin with a surrender and a broken promise?"),
 a("In Granada, the last Muslim kingdom in Spain. Its surrender came with a promise that did not last."),
 q("How much was left of al-Andalus by then?", scene="start", date="1491", place="Granada"),
 a("Only Granada, after nearly eight centuries. Castile and Aragon, now ruled together by Isabella and Ferdinand, held the rest of Spain."),
 a("By 1491, the city was under siege.", scene="alhambra", date="1491", place="Granada", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("Did they fight to the end?", scene="boabdil", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.3])),
 a("No. The sultan, Boabdil, negotiated. Muslims could keep their mosques, their laws, their faith. Isabella and Ferdinand signed."),
 a("On the second of January 1492, Boabdil handed over the keys of the city.", scene="granada2", date="2 January 1492", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Legend says he looked back from a mountain pass and wept. That spot is still called the Moor's Last Sigh.", scene="suspiro", date="", move=mv([0.5, 0.5, 1.0], [0.45, 0.5, 1.25])),
 q("And the map?", scene="end", date="1492", place="Spain"),
 a("For the first time since 711, no Muslim state was left in Spain."),
 q("And the broken promise?", scene="expulsion", date="31 March 1492", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Three months later, the same monarchs signed the Alhambra Decree. Spain's Jews had four months: convert, or leave."),
 a("Tens of thousands left homes their families had lived in for over a thousand years. Many found refuge in the Ottoman Empire.", scene="sephardim", date="1492", place="Mediterranean"),
 a("Their descendants, the Sephardim, still speak Ladino, a form of old Spanish.", scene="expulsion2", move=mv([0.5, 0.5, 1.0], [0.45, 0.5, 1.25])),
 q("And Granada's Muslims?", scene="alhambra2", date="1502", move=mv([0.5, 0.5, 1.0], [0.6, 0.5, 1.25])),
 a("Within ten years, they too were told: convert, or leave."),
 *cta("Columbus, and the land he never understood", scene="granada", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.2])),
]
write(D, {"episode": "01a", "title": "How did 1492 begin with a surrender and a broken promise?", "highlight": ["surrender", "promise?"],
  "music": {"mood": "bittersweet", "seed": 8, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 8: 1492, the surrender of Granada, the Alhambra Decree and the broken promise to Granada's Muslims. Images: public domain. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "granada", "1492", "alhambra", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
