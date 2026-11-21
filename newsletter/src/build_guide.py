"""Build the newsletter lead magnet: newsletter/chokepoints-guide.pdf (A4).

HTML -> headless Chromium (playwright) -> PDF, same idea as etsy-shop/planners/src/core.py.
Map images are frames from our own Chokepoints renders (videos/out/headlines/<ep>/video.mp4),
cropped to the map card; satellite layer = NASA Blue Marble (public domain), borders = Natural Earth.
Every line of text comes from the episode scripts in videos/stories/headlines/*/episode.json
(each fact-checked in that folder's RESEARCH.md).

Run:  ~/cizgi/.venv/bin/python newsletter/src/build_guide.py
"""
import html
import os
import pathlib

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
OUT_HTML = ROOT / "src" / "chokepoints-guide.html"
OUT_PDF = ROOT / "chokepoints-guide.pdf"

CHANNEL = "youtube.com/@History.Sketches"

# (map file, name, where, stat, [3-4 lines]) — all from our scripts
POINTS = [
    ("01a", "The Strait of Hormuz", "Between Iran and Oman, at the mouth of the Persian Gulf",
     "1 in every 5 barrels of oil the world uses passes here",
     ["About 21 miles wide at its narrowest; the shipping lanes are just 2 miles wide each way.",
      "In 1272 Marco Polo saw ships from India unloading spices, pearls and silk here.",
      "In 1622 Shah Abbas, who had no navy, borrowed one from the English East India Company and took Hormuz back from Portugal after about ten weeks.",
      "Today about 20 million barrels a day still squeeze through the same narrow gap."]),
    ("02a", "The Suez Canal", "Across Egypt, from Port Said on the Mediterranean to Suez on the Red Sea",
     "In 2021 one stuck ship, the Ever Given, blocked it for six days",
     ["About 193 kilometres of water through the desert. Without it, ships between Asia and Europe sail around Africa.",
      "Work began in 1859; it opened in November 1869. In 1875 a deeply indebted Egypt sold its shares to Britain.",
      "In July 1956 President Nasser nationalised it. The canal stayed Egyptian.",
      "After the 1967 war it closed for eight years, with fifteen ships trapped in the Great Bitter Lake the whole time."]),
    ("02b", "Bab-el-Mandeb", "Between Yemen and the Horn of Africa, with Djibouti and Eritrea on the other side",
     "Its name means the Gate of Grief",
     ["About 26 kilometres wide at its narrowest; the island of Perim splits it in two.",
      "Coffee left from the port of Mocha, just inside the strait. That's where the word mocha comes from.",
      "In 1839 Britain took nearby Aden; after Suez opened, this became the sea road to India.",
      "Since late 2023, attacks on ships have sent many lines around Africa, adding one to two weeks to an Asia-Europe trip."]),
    ("03", "The Panama Canal", "Across Panama near its narrowest point, from Colón to Panama City",
     "It cut the New York to San Francisco trip by more than half",
     ["82 kilometres of locks, hills and a huge artificial lake.",
      "France started digging in 1881. Yellow fever and malaria killed about 20,000 workers; the company went bankrupt in 1889.",
      "The United States finished it: the Ancon made the first official crossing on 15 August 1914.",
      "Each ship uses millions of litres of lake water, so in a drought fewer ships get through."]),
    ("04", "The GIUK Gap (Greenland)", "Greenland, Iceland and Britain: the sea gate between the Arctic and the Atlantic",
     "Cold War Soviet submarines from Murmansk had to slip through it",
     ["Greenland is the largest island on Earth; about 56,000 people live there, and most of it is under ice.",
      "In 1946 Truman secretly offered a hundred million dollars in gold for it. Denmark said no.",
      "So America built Thule Air Base. Today it's Pituffik Space Base, watching for missiles over the Pole.",
      "As the ice melts, new sea routes and minerals open up."]),
    ("05", "The Taiwan Strait", "Between China's Fujian coast and Taiwan, linking the East and South China Seas",
     "In 2022 nearly half the world's container ships sailed through it",
     ["About 130 kilometres of water, and one of the busiest sea lanes on Earth.",
      "In 1624 the Dutch built Fort Zeelandia on Taiwan; in 1662 they surrendered to Koxinga.",
      "In 1950, when the Korean War began, Truman sent the Seventh Fleet into the strait.",
      "Taiwan makes about 90 percent of the most advanced chips."]),
    ("06", "The Bosphorus & Dardanelles", "Through Istanbul and past the Sea of Marmara: the Black Sea's only link to the oceans",
     "At its narrowest the Bosphorus is about 700 metres wide",
     ["The Bosphorus is about 31 kilometres long and runs right through Istanbul.",
      "In 1452 Sultan Mehmed II built Rumeli Hisarı to cut the strait. A year later, Constantinople fell.",
      "On 18 March 1915, mines sank three British and French battleships at the Dardanelles, and the fleet turned back.",
      "Since the Montreux treaty of 1936, merchant ships pass freely and Turkey controls the warships."]),
    ("07", "The Strait of Malacca", "Between Malaysia and the Indonesian island of Sumatra, down to Singapore",
     "About a quarter of the world's traded goods pass through it",
     ["It runs about 900 kilometres; near Singapore the shipping channel is under 3 kilometres wide.",
      "Around 1400 a prince named Parameswara founded the port of Malacca. The Portuguese took it in 1511, the Dutch in 1641.",
      "Most of China's imported oil sails through here. In 2003 China's president called it the Malacca dilemma.",
      "After joint patrols by Malaysia, Singapore and Indonesia began in 2004, pirate attacks fell."]),
    ("08", "The Strait of Gibraltar", "At the southern tip of Spain, the gate between the Atlantic and the Mediterranean",
     "Here Europe and Africa are only about 14 kilometres apart",
     ["The name comes from Jabal Tariq, Tariq's mountain, after the commander who landed here in 711.",
      "Captured by an English and Dutch fleet in 1704; Spain signed it over to Britain in 1713.",
      "In 1967 Gibraltar voted to stay British: 12,138 to 44.",
      "Even the ocean passes here: Atlantic water pours in to refill a Mediterranean that evaporates."]),
]


def e(s):
    return html.escape(s, quote=True)


def uri(p):
    return pathlib.Path(p).resolve().as_uri()


CSS = """
@font-face { font-family: 'Nunito'; src: url('%(nunito)s') format('truetype'); font-weight: 200 1000; }
@page { size: A4; margin: 0; }
:root { --ink:#22262e; --mute:#6b6457; --paper:#f3ead6; --paper2:#e9dcc0; --acc:#E8B44A; --red:#c0392b; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--paper); }
body { font-family: 'Nunito', Arial, sans-serif; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; page-break-after: always; break-after: page;
        padding: 14mm 16mm 12mm;
        background: radial-gradient(circle at 20% 15%, #f7f0de 0, transparent 55%), radial-gradient(circle at 85% 90%, var(--paper2) 0, transparent 60%), var(--paper); }
.page:last-child { page-break-after: auto; break-after: auto; }
.logo { position: absolute; top: 11mm; right: 14mm; width: 19mm; height: 19mm; border-radius: 50%; }
.foot { position: absolute; bottom: 8mm; left: 16mm; right: 16mm; display: flex; justify-content: space-between;
        font-size: 7.5pt; color: var(--mute); letter-spacing: .04em; }
.kicker { font-weight: 900; font-size: 9pt; letter-spacing: .22em; text-transform: uppercase; color: var(--red); }
h1 { font-weight: 1000; font-size: 40pt; line-height: .98; letter-spacing: -.01em; }
h1 em { font-style: normal; background: linear-gradient(transparent 58%, var(--acc) 58%); padding: 0 .06em; }
h2 { font-weight: 1000; font-size: 25pt; line-height: 1.02; margin-top: 2mm; padding-right: 24mm; }
.where { font-size: 10.5pt; color: var(--mute); margin-top: 1.5mm; padding-right: 24mm; font-weight: 600; }
.map { display: block; width: 148mm; height: 158mm; object-fit: cover; margin: 6mm auto 0; border-radius: 3mm;
       border: 1.2mm solid #fff; outline: .3mm solid #b9ab8c; transform: rotate(-.6deg); }
.stat { margin: 6mm 0 3.5mm; padding: 2.6mm 4mm; background: var(--ink); color: #fff; border-left: 2.2mm solid var(--acc);
        font-weight: 900; font-size: 12pt; border-radius: 1.5mm; }
ul.facts { list-style: none; }
ul.facts li { position: relative; padding-left: 6mm; font-size: 11pt; line-height: 1.38; margin-bottom: 1.6mm; }
ul.facts li::before { content: ''; position: absolute; left: 0; top: 1.7mm; width: 2.6mm; height: 2.6mm; background: var(--acc); border-radius: 50%; }
.num { display:inline-block; font-weight: 1000; font-size: 9pt; letter-spacing: .14em; color: var(--ink); background: var(--acc);
       padding: .8mm 2.6mm; border-radius: 1mm; }
/* cover */
.cover .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 9mm; }
.cover .grid img { width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 2mm; border: .8mm solid #fff; outline: .3mm solid #b9ab8c; }
.cover .sub { font-size: 13pt; margin-top: 5mm; font-weight: 700; color: var(--mute); max-width: 150mm; }
.cover .brand { display:flex; align-items:center; gap: 4mm; margin-top: 9mm; font-weight: 900; font-size: 12pt; }
.cover .brand img { width: 18mm; height: 18mm; border-radius: 50%; }
/* contents */
.toc { margin-top: 8mm; counter-reset: n; }
.toc div { display:flex; gap: 4mm; align-items: baseline; padding: 3.2mm 0; border-bottom: .3mm dashed #b9ab8c; font-size: 12.5pt; font-weight: 800; }
.toc div b { width: 9mm; color: var(--red); font-weight: 1000; }
.toc div span { font-weight: 600; font-size: 10pt; color: var(--mute); margin-left: auto; text-align: right; max-width: 85mm; }
.intro { font-size: 12pt; line-height: 1.45; margin-top: 6mm; max-width: 165mm; }
/* last page */
.end { display:flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.end img.big { width: 70mm; height: 70mm; border-radius: 50%; margin-bottom: 10mm; }
.end .url { margin-top: 6mm; font-size: 20pt; font-weight: 1000; background: var(--ink); color: #fff; padding: 3mm 7mm; border-radius: 2mm; }
.end p { font-size: 12.5pt; margin-top: 7mm; max-width: 140mm; line-height: 1.45; }
.credits { font-size: 8pt; color: var(--mute); margin-top: 14mm; max-width: 160mm; line-height: 1.4; }
"""


def page_point(i, p):
    f, name, where, stat, lines = p
    lis = "".join(f"<li>{e(t)}</li>" for t in lines)
    return f"""
<section class="page">
  <img class="logo" src="{uri(ASSETS / 'logo.png')}">
  <span class="num">CHOKEPOINT {i:02d} / {len(POINTS):02d}</span>
  <h2>{e(name)}</h2>
  <div class="where">{e(where)}</div>
  <img class="map" src="{uri(ASSETS / 'maps' / (f + '.jpg'))}">
  <div class="stat">{e(stat)}</div>
  <ul class="facts">{lis}</ul>
  <div class="foot"><span>History Sketches · The World's Chokepoints</span><span>{CHANNEL}</span></div>
</section>"""


def build_html():
    css = CSS.replace("%(nunito)s", uri(ASSETS / "Nunito.ttf"))
    grid = "".join(f'<img src="{uri(ASSETS / "maps" / (p[0] + ".jpg"))}">' for p in POINTS)
    cover = f"""
<section class="page cover">
  <div class="kicker">Free guide · History Sketches</div>
  <h1 style="margin-top:4mm">{len(POINTS)} Chokepoints<br>That <em>Run the World</em></h1>
  <div class="sub">The narrow straits and canals where oil, grain, chips and coffee squeeze through, and the stories of who fought to control them.</div>
  <div class="grid">{grid}</div>
  <div class="brand"><img src="{uri(ASSETS / 'logo.png')}"><div>History Sketches<br><span style="font-weight:600;color:var(--mute);font-size:10pt">{CHANNEL}</span></div></div>
</section>"""
    toc = "".join(f"<div><b>{i:02d}</b>{e(p[1])}<span>{e(p[3])}</span></div>" for i, p in enumerate(POINTS, 1))
    contents = f"""
<section class="page">
  <img class="logo" src="{uri(ASSETS / 'logo.png')}">
  <div class="kicker">Inside</div>
  <h2>Where the world squeezes through</h2>
  <div class="intro">Most of what you buy, burn or drink crossed the sea. And at a handful of narrow gates, that traffic has nowhere else to go.
  Close one, and ships sail thousands of kilometres around a continent. Each page has our sketch map from the series and the facts we checked for it.</div>
  <div class="toc">{toc}</div>
  <div class="foot"><span>History Sketches · The World's Chokepoints</span><span>{CHANNEL}</span></div>
</section>"""
    pages = "".join(page_point(i, p) for i, p in enumerate(POINTS, 1))
    end = f"""
<section class="page end">
  <img class="big" src="{uri(ASSETS / 'logo.png')}">
  <div class="kicker">Watch the series</div>
  <h1 style="font-size:32pt;margin-top:3mm">Every chokepoint,<br>told in under two minutes</h1>
  <div class="url">{CHANNEL}</div>
  <p>New true history story every week in your inbox: <b>History Sketches Weekly</b>.<br>Reply to any issue and tell us which place we should draw next.</p>
  <div class="credits">Maps: History Sketches sketch maps from the Chokepoints series. Satellite imagery: NASA Blue Marble (public domain). Coastlines and borders: Natural Earth (public domain).
  Facts checked against at least two sources (Britannica, Wikipedia and others) for each episode.<br>© History Sketches. Free to share, not for resale.</div>
</section>"""
    doc = f"<!doctype html><html><head><meta charset='utf-8'><title>9 Chokepoints That Run the World</title><style>{css}</style></head><body>{cover}{contents}{pages}{end}</body></html>"
    OUT_HTML.write_text(doc, encoding="utf-8")
    return OUT_HTML


def main():
    h = build_html()
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page()
        pg.goto(h.as_uri(), wait_until="networkidle")
        pg.evaluate("document.fonts.ready")
        broken = pg.evaluate("[...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)")
        if broken:
            raise SystemExit(f"images failed to load: {broken}")
        pg.pdf(path=str(OUT_PDF), format="A4", print_background=True, prefer_css_page_size=True)
        b.close()
    print(OUT_PDF, os.path.getsize(OUT_PDF) // 1024, "KB")


if __name__ == "__main__":
    main()
