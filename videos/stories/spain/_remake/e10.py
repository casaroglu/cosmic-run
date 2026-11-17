from common import *
D = os.path.join(SPAIN, "10-transition")
C = coast_copy(D); E = coast_copy(D, "europe.json"); globe(D, 40.42, -3.70, "Madrid", dist=1.8)
sk = {
 "start": {"coast": C, "items": [
   {"kind": "coast", "at": 0, "dur": 2.0},
   spain_today(0.8, color=BLUE, label="Franco's Spain, 1939–1975", labelPos=[-3.6, 40.4]),
   {"kind": "label", "text": "no free elections", "pos": [0.5, 0.2], "at": 2.4, "size": 54, "color": BLUE, "cps": 22},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
 "votes": {"items": [
   {"kind": "text", "text": "the road to democracy", "pos": [0.5, 0.2], "at": 0.1, "size": 60},
   {"kind": "timeline", "pos": [0.2, 0.45], "w": 760, "from": 1975, "to": 1982, "at": 0.4, "dur": 1.6,
    "ticks": [{"v": 1975, "label": "Franco dies"}, {"v": 1977, "label": "first free vote"}, {"v": 1978, "label": "constitution"}, {"v": 1981, "label": "coup fails"}]}]},
 "end": {"coast": E, "items": [
   {"kind": "coast", "at": 0, "dur": 1.2, "pencil": False},
   {"kind": "territory", "polys": MOD["ESP"], "color": RED, "at": 0.6, "dur": 1.6, "label": "Kingdom of Spain, a democracy", "labelPos": [2.0, 38.0]},
   {"kind": "label", "text": "joins the European Community, 1986", "pos": [0.5, 0.2], "at": 2.4, "size": 48, "color": BLUE, "cps": 22},
   {"kind": "label", "text": "borders approx.", "pos": [0.8, 0.66], "at": 3.0, "size": 34}]},
}
img = json.load(open(os.path.join(D, "episode.json")))["images"]
beats = [
 title("How did a dictator's chosen heir give Spain democracy?"),
 a("By doing the opposite of what the dictator expected. His name was Juan Carlos."),
 q("What was Spain like under Franco?", scene="start", date="1939", place="Spain"),
 a("After 1939, Franco ruled alone: prisons, censorship, hunger. Europe shut Spain out."),
 a("The Cold War rescued him. In 1953, American bases came to Spain, and later American presidents came to Madrid.", scene="nixon", date="1953", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("In the sixties, tourists and factories made Spain boom. But there were still no free elections.", scene="parade", date="1960s", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 q("Who was supposed to come next?", scene="heir", date="22 July 1969", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("In 1969 Franco named his heir: young Prince Juan Carlos. Everyone expected more of the same."),
 a("In 1973, an ETA bomb killed Franco's prime minister. It threw his car over a five-storey building.", scene="carrero", date="20 December 1973", place="Madrid", move=mv([0.5, 0.5, 1.0], [0.5, 0.45, 1.25])),
 q("And when Franco died?", scene="king", date="22 November 1975", move=mv([0.5, 0.45, 1.0], [0.5, 0.4, 1.25])),
 a("He died in November 1975. Two days later, Juan Carlos became king."),
 a("He picked Adolfo Suárez, a man of the old regime, to take it apart. In 1977, Spain voted freely for the first time in forty-one years.", scene="suarez", date="15 June 1977", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25]), say="He picked Adolfo Suarez, a man of the old regime, to take it apart. In 1977, Spain voted freely for the first time in forty-one years."),
 a("A year later, Spaniards approved a democratic constitution.", scene="votes", date="6 December 1978"),
 q("Did everyone accept it?", scene="cortes", date="23 February 1981", place="Madrid", move=mv([0.5, 0.5, 1.0], [0.55, 0.5, 1.25])),
 a("Not everyone. In 1981, a Civil Guard colonel stormed parliament with armed men and held the deputies hostage."),
 a("That night the king, in uniform, went on TV and ordered the army to stand by democracy. By the next day, the coup had collapsed.", scene="jc", date="", move=mv([0.5, 0.4, 1.0], [0.5, 0.33, 1.25])),
 q("And Spain after that?", scene="end", date="1986", place="Europe"),
 a("A democracy, and in 1986 a member of the European Community. The heir the dictator chose had saved the democracy."),
 *cta(last=True),
]
write(D, {"episode": "10", "title": "How did a dictator's chosen heir give Spain democracy?", "highlight": ["heir", "democracy?"],
  "music": {"mood": "hopeful", "seed": 23, "drums": False, "level": 0.28},
  "post": {"caption": "The History of Spain, episode 23 (final): Franco's Spain, Juan Carlos, Adolfo Suárez, the 1977 election, the 1978 constitution and the failed coup of 23-F (1981). Images: public domain. Map data: Natural Earth.",
           "hashtags": ["history", "spain", "juancarlos", "democracy", "transition", "shorts"]},
  "images": img, "sketches": sk, "beats": beats})
