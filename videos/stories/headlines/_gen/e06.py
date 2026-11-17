import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GREEN = '#2e7d32'
TUR = country('Turkey', 0.3)
BOS = [[29.02, 41.24], [29.06, 41.18], [29.06, 41.12], [29.04, 41.08], [29.02, 41.04], [28.99, 41.01]]
DAR = [[26.18, 40.05], [26.32, 40.12], [26.40, 40.20], [26.55, 40.33], [26.68, 40.42]]
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=6,
    title='Who controls the only way out of the Black Sea?',
    highlight=['only', 'way', 'out'],
    music={'mood': 'tense', 'seed': 17, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: the Bosphorus and the Dardanelles. Rumeli Hisarı (1452), Russia's way out, the Dardanelles attack of 1915, the Montreux Convention (1936) and Turkey's 2022 closure to warships. Images: public domain (NASA, Royal Navy). Map data: Natural Earth.",
          'hashtags': ['history', 'bosphorus', 'istanbul', 'turkey', 'blacksea', 'shorts']},
    images={
      'iss': {'file': 'img/iss.jpg', 'credit': 'NASA, Istanbul and the Bosphorus from the ISS (2021)', 'where': 'NASA (public domain)'},
      'rumeli': {'file': 'img/rumeli.jpg', 'credit': 'Warwick Goble, Roumeli Hissar (early 1900s)', 'where': 'Public domain'},
      'aivazovsky': {'file': 'img/aivazovsky.jpg', 'credit': 'Ivan Aivazovsky, View of Constantinople and the Bosphorus (19th c.)', 'where': 'Public domain'},
      'irresistible': {'file': 'img/irresistible.jpg', 'credit': 'Royal Navy, HMS Irresistible abandoned in the Dardanelles, 18 March 1915', 'where': 'Public domain'}},
    sketches={
      'today': {'coast': 'sketch/straits.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'route', 'pts': BOS, 'at': 1.2, 'dur': 0.6, 'color': '#ffd23f', 'width': 9, 'arrow': False},
        {'kind': 'route', 'pts': DAR, 'at': 1.6, 'dur': 0.6, 'color': '#ffd23f', 'width': 9, 'arrow': False},
        {'kind': 'marker', 'pos': [29.0, 41.05], 'label': 'Istanbul', 'lx': 15, 'ly': 45, 'at': 2.0},
        {'kind': 'label', 'text': 'Black Sea', 'pos': [31.5, 42.9], 'at': 2.4, 'size': 44, 'color': BLUE},
        {'kind': 'label', 'text': 'Bosphorus', 'pos': [29.6, 41.55], 'at': 2.6, 'size': 36},
        {'kind': 'label', 'text': 'Dardanelles', 'pos': [25.6, 40.75], 'at': 2.8, 'size': 36},
        {'kind': 'label', 'text': 'Aegean', 'pos': [24.6, 39.2], 'at': 3.0, 'size': 40, 'color': BLUE},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'narrows': {'coast': 'sketch/bosphorus.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.4},
        {'kind': 'measure', 'a': [29.056, 41.087], 'b': [29.068, 41.081], 'text': 'about 700 m', 'offset': [60, -40], 'at': 1.2, 'dur': 0.8},
        {'kind': 'measure', 'a': [29.13, 41.24], 'b': [29.0, 41.01], 'text': 'about 31 km', 'offset': [-80, 0], 'at': 2.0, 'dur': 0.8},
        {'kind': 'label', 'text': 'Europe', 'pos': [28.92, 41.16], 'at': 1.0, 'size': 40},
        {'kind': 'label', 'text': 'Asia', 'pos': [29.18, 41.06], 'at': 1.2, 'size': 40}]},
      'russia': {'coast': 'sketch/blacksea.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'marker', 'pos': [33.52, 44.6], 'label': 'Sevastopol', 'lx': 15, 'ly': -40, 'at': 0.8, 'color': RED},
        {'kind': 'route', 'pts': [[33.5, 44.5], [31.5, 43.0], [29.6, 41.6], [29.05, 41.15], [28.0, 40.7], [26.4, 40.2], [25.6, 39.8]], 'at': 1.2, 'dur': 2.0, 'color': RED},
        {'kind': 'label', 'text': 'Black Sea', 'pos': [34.5, 43.0], 'at': 1.0, 'size': 44, 'color': BLUE},
        {'kind': 'text', "text": "Russia's only way out", 'pos': [0.5, 0.2], 'at': 1.6, 'size': 52, 'color': RED, 'cps': 22}]},
      'montreux': {'coast': 'sketch/straits.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': TUR, 'color': GREEN, 'at': 0.3, 'dur': 1.0, 'label': 'TURKEY', 'labelPos': [31.5, 39.6]},
        {'kind': 'route', 'pts': BOS, 'at': 0.8, 'dur': 0.5, 'color': '#ffd23f', 'width': 9, 'arrow': False},
        {'kind': 'route', 'pts': DAR, 'at': 1.0, 'dur': 0.5, 'color': '#ffd23f', 'width': 9, 'arrow': False},
        {'kind': 'text', 'text': '1936: the Montreux rules', 'pos': [0.5, 0.2], 'at': 1.0, 'size': 52, 'color': BLUE, 'cps': 22},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 2.4, 'size': 34}]},
      'closed': {'coast': 'sketch/blacksea.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'route', 'pts': [[25.6, 39.8], [26.4, 40.2], [28.0, 40.7], [28.9, 41.0]], 'at': 0.6, 'dur': 1.0, 'color': RED},
        {'kind': 'circle', 'pos': [29.05, 41.15], 'r': 70, 'ry': 55, 'at': 1.4},
        {'kind': 'text', 'text': '2022: closed to warships', 'pos': [0.5, 0.2], 'at': 1.0, 'size': 52, 'color': RED, 'cps': 22}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Who controls the only way out of the Black Sea?'),
      a('Turkey. The Bosphorus and the Dardanelles are the Black Sea\'s only link to the oceans.'),
      q('Where exactly are they?', scene='today', date='Today', place='Turkish Straits'),
      a('The Bosphorus runs right through Istanbul. The Dardanelles lie further south, past the Sea of Marmara.'),
      a('The Bosphorus is about thirty-one kilometres long and, at its narrowest, about seven hundred metres wide.', scene='narrows', date='', place='Bosphorus'),
      q('Who fought over it first?', scene='rumeli', date='1452', place='Rumeli Hisarı', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('Everyone. In 1452, Sultan Mehmed the Second built Rumeli Hisarı, a castle to cut the strait. A year later, Constantinople fell.'),
      q('Why did Russia care so much?', scene='russia', date='1800s', place='Black Sea'),
      a("Russia's fleet sat in the Black Sea. For centuries it wanted a way out, and Britain and France wanted to keep it in."),
      q('Did anyone try to force the straits?', scene='irresistible', date='18 March 1915', place='Dardanelles', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('In 1915, a British and French fleet attacked the Dardanelles. On the eighteenth of March, mines sank three battleships, and the fleet turned back.'),
      q('So who makes the rules today?', scene='montreux', date='20 July 1936', place='Montreux'),
      a('A treaty signed at Montreux in 1936. In peacetime, merchant ships pass freely. Turkey controls the warships.'),
      a('Warships from outside the Black Sea are limited in size, and may stay only twenty-one days.'),
      q('Has Turkey ever used that power?', scene='closed', date='2022', place='Bosphorus'),
      a('In 2022, after Russia invaded Ukraine, Turkey called it a war and closed the straits to warships of the fighting sides.'),
      q('And today?', scene='iss', date='Today', place='Istanbul from the ISS', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a("Tens of thousands of ships pass every year: tankers, grain ships and ferries, right past people's homes."),
      a('The view has hardly changed in centuries.', scene='aivazovsky', date='', place='Constantinople, painted by Aivazovsky', move=mv(0.4, 0.5, 0.55, 0.5, 1.25)),
      a('Next time: the Strait of Malacca. Like the video and follow History Sketches.'),
      q('And tell us in the comments what you think!'),
      dict(type='end', text='Next: the Strait of Malacca', sub='Follow History Sketches')])
write('06-bosphorus', ep)
import add_sat; add_sat.main(f'{ROOT}/06-bosphorus', ['today', 'russia', 'montreux', 'closed'])
