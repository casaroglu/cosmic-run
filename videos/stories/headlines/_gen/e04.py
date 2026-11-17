import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GREEN = '#2e7d32'
GRL = country('Greenland', 1.0)
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=4,
    title='Why does everyone want Greenland?',
    highlight=['everyone', 'want', 'Greenland?'],
    music={'mood': 'tense', 'seed': 11, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: Greenland. Erik the Red and the vanished Norse, Hans Egede and Danish rule, Truman's secret offer, Thule and the GIUK gap, self-government and the 2026 security deal. Images: public domain / CC0 (incl. NASA, USAF, US Space Force). Map data: Natural Earth.",
          'hashtags': ['history', 'greenland', 'arctic', 'denmark', 'geography', 'shorts']},
    images={
      'erik': {'file': 'img/erik.jpg', 'credit': 'Arngrímur Jónsson, Erik the Red, woodcut from Gronlandia (1688)', 'where': 'Public domain'},
      'hvalsey': {'file': 'img/hvalsey.jpg', 'credit': 'Hvalsey Church ruins, Greenland (photo: Number 57, 2014)', 'where': 'Wikimedia Commons (CC0)'},
      'egede': {'file': 'img/egede.jpg', 'credit': 'Johan Hörner, Hans Egede (18th c.)', 'where': 'Public domain'},
      'b36': {'file': 'img/b36.jpg', 'credit': 'USAF, B-36 bomber at Thule Air Base (1950s)', 'where': 'US Air Force (public domain)'},
      'pituffik': {'file': 'img/pituffik.jpg', 'credit': 'US Space Force, Pituffik Space Base, Greenland', 'where': 'US Space Force (public domain)'},
      'ice': {'file': 'img/ice.jpg', 'credit': 'NASA / Michael Studinger, IceBridge flight over north-west Greenland (2013)', 'where': 'NASA (public domain)'}},
    sketches={
      'today': {'coast': 'sketch/greenland.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'territory', 'polys': GRL, 'color': GREEN, 'at': 0.8, 'dur': 1.6, 'label': 'GREENLAND', 'labelPos': [-41.0, 73.0]},
        {'kind': 'marker', 'pos': [-51.7, 64.18], 'label': 'Nuuk', 'lx': -15, 'ly': 0, 'lalign': 'right', 'at': 2.4},
        {'kind': 'label', 'text': 'Canada', 'pos': [-70.0, 66.5], 'at': 2.8, 'size': 40},
        {'kind': 'label', 'text': 'Atlantic', 'pos': [-30.0, 61.0], 'at': 3.0, 'size': 44, 'color': BLUE},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'norse': {'coast': 'sketch/south.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'route', 'pts': [[-22.0, 64.6], [-27, 64.2], [-34, 63.0], [-40, 61.2], [-44.5, 60.6], [-45.5, 61.1]], 'at': 0.8, 'dur': 2.0, 'color': RED},
        {'kind': 'marker', 'pos': [-22.0, 64.6], 'label': 'Iceland', 'lx': -15, 'ly': -40, 'lalign': 'right', 'at': 1.0},
        {'kind': 'marker', 'pos': [-45.5, 61.15], 'label': 'Eastern Settlement', 'lx': 15, 'ly': 40, 'at': 2.6},
        {'kind': 'marker', 'pos': [-50.5, 64.2], 'label': 'Western Settlement', 'lx': 15, 'ly': -40, 'at': 3.0},
        {'kind': 'text', 'text': 'about 985', 'pos': [0.5, 0.2], 'at': 1.4, 'size': 56, 'color': RED, 'cps': 22}]},
      'giuk': {'coast': 'sketch/giuk.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'route', 'pts': [[-31.5, 68.0], [-22.5, 66.4]], 'at': 1.0, 'dur': 0.8, 'color': RED, 'width': 9, 'arrow': False, 'dash': [14, 10]},
        {'kind': 'route', 'pts': [[-14.0, 64.8], [-6.8, 62.0], [-4.5, 58.6]], 'at': 1.6, 'dur': 0.8, 'color': RED, 'width': 9, 'arrow': False, 'dash': [14, 10]},
        {'kind': 'label', 'text': 'GIUK gap', 'pos': [-14.0, 60.0], 'at': 2.2, 'size': 50, 'color': RED},
        {'kind': 'route', 'pts': [[33.0, 69.5], [20, 72.5], [5, 70], [-6, 66.5], [-12, 61], [-20, 55]], 'at': 4.0, 'dur': 2.0, 'color': BLUE},
        {'kind': 'marker', 'pos': [33.0, 69.0], 'label': 'Murmansk', 'lx': -15, 'ly': 45, 'lalign': 'right', 'at': 3.8},
        {'kind': 'label', 'text': 'Greenland', 'pos': [-41.0, 73.0], 'at': 1.0, 'size': 44},
        {'kind': 'label', 'text': 'Atlantic', 'pos': [-38.0, 53.0], 'at': 2.6, 'size': 44, 'color': BLUE}]},
      'end': {'coast': 'sketch/greenland.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': GRL, 'color': GREEN, 'at': 0.3, 'dur': 1.4, 'label': 'GREENLAND', 'labelPos': [-41.0, 73.0]},
        {'kind': 'text', 'text': '2009: self-government', 'pos': [0.5, 0.2], 'at': 1.6, 'size': 54, 'color': GREEN, 'cps': 22},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Why does everyone want Greenland?'),
      a("It's the largest island on Earth. About fifty-six thousand people live there, and most of it is under ice."),
      q('Where is it, exactly?', scene='today', date='Today', place='Greenland'),
      a("Between North America and Europe. Geographically it's North American, but it belongs to the Kingdom of Denmark."),
      q('Who got there first?', scene='erik', date='about 985', move=mv(0.5, 0.35, 0.5, 0.3, 1.3)),
      a('Arctic peoples came first. Then, around 985, Erik the Red brought Norse settlers from Iceland.'),
      a('The sagas say he called it Greenland to attract settlers. The Norse farmed the south-west for four centuries.', scene='norse', date='', place='South-west Greenland'),
      a('Then they vanished. The last record is a wedding at Hvalsey Church in 1408. The Inuit stayed.', scene='hvalsey', date='1408', place='Hvalsey', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      q('So how did Denmark get it?', scene='egede', date='1721', move=mv(0.5, 0.35, 0.5, 0.3, 1.3)),
      a('In 1721, the missionary Hans Egede arrived from Denmark-Norway, and Danish rule followed.'),
      q('Why does America care?', scene='giuk', date='', place='North Atlantic'),
      a('The map. Greenland, Iceland and Britain frame the GIUK gap, the sea gate between the Arctic and the Atlantic.'),
      a("In the Cold War, Soviet submarines from Murmansk had to slip through it."),
      a('In 1946, Truman secretly offered a hundred million dollars in gold. Denmark said no, so America built Thule Air Base.', scene='b36', date='1946', place='Thule', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a("Today it's Pituffik Space Base, watching for missiles over the Pole.", scene='pituffik', date='Today', place='Pituffik', move=mv(0.5, 0.5, 0.55, 0.5, 1.2)),
      q('Is Greenland still a colony?', scene='end', date='2009', place='Greenland'),
      a('Not any more. Home rule came in 1979, self-government in 2009, with the right to choose independence.'),
      q('So why all the headlines?', scene='ice', date='Today', place='North-west Greenland', move=mv(0.5, 0.5, 0.5, 0.5, 1.25)),
      a('As the ice melts, sea routes and minerals open up. In 2025, Donald Trump said America needed Greenland and would not rule out force.'),
      a('In September 2026, the three governments signed a deal: more American bases, and Greenland stays in the Danish realm.'),
      a('Next time: the Taiwan Strait. Like the video and follow History Sketches.'),
      q('And tell us in the comments what you think!'),
      dict(type='end', text='Next: the Taiwan Strait', sub='Follow History Sketches')])
write('04-greenland', ep)
import add_sat; add_sat.main(f'{ROOT}/04-greenland', ['today', 'norse', 'giuk', 'end'])
