from common import *
D = os.path.join(SPAIN, "00f-cordoba")
C = coast_copy(D); globe(D, 37.88, -4.78, "Córdoba")
TAIFAS = [([-6.0, 37.39], "Seville"), ([-4.02, 39.86], "Toledo"), ([-0.88, 41.65], "Zaragoza"), ([-0.38, 39.47], "Valencia"),
          ([-6.97, 38.88], "Badajoz"), ([-3.6, 37.18], "Granada"), ([-2.46, 36.84], "Almería")]
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   {"kind": "territory", "polys": [CORDOBA_929], "color": GREEN, "at": 0.8, "dur": 2.0, "label": "Caliphate of Córdoba, 929", "labelPos": [-4.6, 38.9]},
   {"kind": "label", "text": "Christian kingdoms", "pos": [-4.0, 42.4], "at": 2.6, "size": 40, "color": BLUE},
   mk([-4.78, 37.88], "Córdoba", 20, 45, 2.4),
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "end": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": [CORDOBA_929], "color": GREEN, "style": "faint", "at": 0.3, "dur": 1.0, "label": "taifa kingdoms, 1031", "labelPos": [-4.4, 38.6]},
   *[mk(p, n, *{"Almería": (15, 45)}.get(n, (15, -35)), 1.2 + i * 0.3, lsize=34, color=GREEN) for i, (p, n) in enumerate(TAIFAS)],
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("Which city was the most dazzling in Europe a thousand years ago?"),
 a("Many would say Córdoba, in southern Spain, the capital of al-Andalus.", say="Many would say Cordoba, in southern Spain, the capital of al-Andalus."),
 q("What was it famous for?", scene="roberts", date="780s", place="Córdoba", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("In the 780s, a prince who had escaped the massacre of his family in Syria began a great mosque there."),
 a("His heirs kept enlarging it: a forest of more than eight hundred columns under red and white arches.", scene="arches", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.3])),
 q("How big was al-Andalus at its height?", scene="start", date="929", place="al-Andalus"),
 a("In 929, it covered most of the peninsula. Only the Christian kingdoms of the north lay beyond its borders."),
 a("That year, Abd al-Rahman the Third declared himself caliph, defying Baghdad. Envoys came from Byzantium and the German emperor.", scene="baixeras", date="929", move=mv([0.4, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Outside the city he built a whole palace town: Medina Azahara.", scene="azahara", date="936", place="Medina Azahara", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("And the famous library?", scene="mihrab", date="", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 a("His son's library was said to hold four hundred thousand books. Historians doubt the number, but not the fame."),
 q("So what went wrong?", scene="end", date="1031", place="al-Andalus"),
 a("Civil war. In 1031 the caliphate shattered into rival little kingdoms, the taifas."),
 a("Christian Castile took Córdoba in 1236. Three centuries later, a cathedral was built right in the middle of the mosque.", scene="photo1855", date="1236", place="Córdoba", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25]), say="Christian Castile took Cordoba in 1236. Three centuries later, a cathedral was built right in the middle of the mosque."),
 q("So is it a mosque or a cathedral?", scene="arches2", date="Today", move=mv([0.5, 0.5, 1.0], [0.55, 0.45, 1.25])),
 a("Córdoba still argues about what to call it.", say="Cordoba still argues about what to call it."),
 *cta("1212, Las Navas de Tolosa"),
]
write(D, {"episode": "00f", "title": "Which city was the most dazzling in Europe a thousand years ago?", "highlight": ["dazzling", "Europe"],
  "music": {"mood": "dreamy", "seed": 6, "drums": False, "level": 0.3},
  "post": {"caption": "The History of Spain, episode 6: Córdoba, capital of al-Andalus: the Great Mosque, the caliphate of 929, Medina Azahara and the fall into taifa kingdoms. Images: public domain / CC0. Map data: Natural Earth. Borders approx.",
           "hashtags": ["history", "spain", "cordoba", "alandalus", "mezquita", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
