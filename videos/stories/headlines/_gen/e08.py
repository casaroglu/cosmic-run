import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GOLD = '#ffd23f'
GIB = [-5.35, 36.14]
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=8,
    title='Why does Britain still own a rock in Spain?',
    highlight=['Britain', 'rock'],
    music={'mood': 'tense', 'seed': 23, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: the Strait of Gibraltar. Tariq ibn Ziyad (711), the capture of 1704 and the Treaty of Utrecht (1713), the Great Siege (1779-83), the 1967 and 2002 referendums, and the 2026 UK-EU treaty. Images: public domain (incl. NASA). Map data: Natural Earth.",
          'hashtags': ['history', 'gibraltar', 'spain', 'britain', 'geography', 'shorts']},
    images={
      'iss': {'file': 'img/iss.jpg', 'credit': 'NASA, the Strait of Gibraltar from the ISS (iss074e0425752)', 'where': 'NASA (public domain)'},
      'siege': {'file': 'img/siege.jpg', 'credit': 'James Fittler after Richard Paton, destruction of the Spanish floating batteries, 13 September 1782', 'where': 'Public domain'},
      'carter': {'file': 'img/carter.jpg', 'credit': 'George Carter, The Siege of Gibraltar, 1782', 'where': 'Public domain'}},
    sketches={
      'today': {'coast': 'sketch/med.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'marker', 'pos': GIB, 'label': 'Gibraltar', 'lx': 15, 'ly': -40, 'at': 1.4, 'color': RED},
        {'kind': 'label', 'text': 'SPAIN', 'pos': [-3.6, 40.0], 'at': 1.6, 'size': 48},
        {'kind': 'label', 'text': 'MOROCCO', 'pos': [-6.0, 32.0], 'at': 1.8, 'size': 44},
        {'kind': 'label', 'text': 'Atlantic', 'pos': [-10.0, 36.5], 'at': 2.2, 'size': 40, 'color': BLUE},
        {'kind': 'label', 'text': 'Mediterranean', 'pos': [4.0, 38.2], 'at': 2.4, 'size': 40, 'color': BLUE},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'strait': {'coast': 'sketch/strait.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'measure', 'a': [-5.60, 36.01], 'b': [-5.55, 35.90], 'text': '14 km', 'offset': [-70, 0], 'at': 1.4, 'dur': 0.8},
        {'kind': 'marker', 'pos': GIB, 'label': 'Gibraltar', 'lx': 15, 'ly': -40, 'at': 1.0, 'color': RED},
        {'kind': 'label', 'text': 'EUROPE', 'pos': [-5.9, 36.8], 'at': 0.8, 'size': 44},
        {'kind': 'label', 'text': 'AFRICA', 'pos': [-5.6, 35.4], 'at': 1.0, 'size': 44}]},
      'capture': {'coast': 'sketch/strait.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'ships', 'pts': [[-6.6, 36.0], [-5.9, 36.05], [-5.42, 36.12]], 'n': 3, 'once': True, 'gap': 0.4, 'dur': 2.2, 'icon': 'galleon', 'size': 40, 'at': 0.4, 'color': RED},
        {'kind': 'marker', 'pos': GIB, 'label': 'Gibraltar', 'lx': 15, 'ly': -40, 'at': 1.6, 'color': RED},
        {'kind': 'text', 'text': '1704 captured · 1713 British', 'pos': [0.5, 0.2], 'at': 1.0, 'size': 50, 'color': RED, 'cps': 22}]},
      'vote': {'items': [
        {'kind': 'text', 'text': '1967 referendum', 'pos': [0.5, 0.22], 'at': 0.1, 'size': 60},
        {'kind': 'counter', 'pos': [0.5, 0.36], 'from': 0, 'to': 12138, 'prefix': 'stay British: ', 'at': 0.4, 'dur': 1.6, 'size': 72, 'color': RED},
        {'kind': 'counter', 'pos': [0.5, 0.47], 'from': 0, 'to': 44, 'prefix': 'join Spain: ', 'at': 1.0, 'dur': 1.0, 'size': 72, 'color': BLUE}]},
      'currents': {'coast': 'sketch/strait.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'route', 'pts': [[-7.2, 36.0], [-6.3, 35.98], [-5.5, 35.98], [-4.8, 36.1]], 'at': 0.6, 'dur': 1.2, 'color': GOLD, 'width': 10},
        {'kind': 'label', 'text': 'Atlantic water in', 'pos': [-6.2, 36.45], 'at': 1.2, 'size': 38},
        {'kind': 'route', 'pts': [[-4.8, 35.82], [-5.5, 35.86], [-6.3, 35.82], [-7.2, 35.7]], 'at': 1.6, 'dur': 1.2, 'color': '#ff5a4e', 'width': 7, 'dash': [16, 10]},
        {'kind': 'label', 'text': 'deep salty water out', 'pos': [-6.0, 35.35], 'at': 2.2, 'size': 36}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Why does Britain still own a rock in Spain?'),
      a('Gibraltar. A British territory at the gate between the Atlantic and the Mediterranean.'),
      q('Where exactly is it?', scene='today', date='Today', place='Gibraltar'),
      a('At the southern tip of Spain. Here, Europe and Africa are only about fourteen kilometres apart.'),
      a('From space, the two continents almost touch.', scene='iss', date='', place='seen from the ISS', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      q('Where does the name come from?', scene='strait', date='711', place='Strait of Gibraltar'),
      a("In 711, the commander Tariq ibn Ziyad landed here with an army. The rock became Jabal Tariq, Tariq's mountain: Gibraltar."),
      q('So how did Britain get it?', scene='capture', date='4 August 1704', place='Gibraltar'),
      a('In 1704, an English and Dutch fleet captured it in a war over the Spanish throne. In 1713, Spain signed it over to Britain.'),
      q('Did Spain try to take it back?', scene='siege', date='1779 – 1783', place='Gibraltar', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('Many times. The Great Siege lasted almost four years. Spain\'s floating gun batteries were set on fire, and the rock held.'),
      q('What do the people of Gibraltar want?', scene='vote', date='1967', place='Gibraltar'),
      a('In 1967, they voted to stay British: twelve thousand one hundred and thirty-eight to forty-four. Two years later, Spain closed the border.'),
      a('In 2002, ninety-nine percent rejected sharing sovereignty with Spain.'),
      q('And after Brexit?', scene='carter', date='July 2026', place='Gibraltar', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('In July 2026, Britain and the European Union signed a treaty. Routine checks at the Spanish border ended, and Gibraltar stays British.'),
      q('Why does the strait matter so much?', scene='currents', date='Today', place='Strait of Gibraltar'),
      a('Every ship between the Atlantic and the Mediterranean passes here. Even the ocean does: Atlantic water pours in to refill a sea that evaporates.'),
      a("That's the last of the world's chokepoints. Like the video and follow History Sketches."),
      q('And tell us in the comments which one surprised you most!'),
      dict(type='end', text="The world's chokepoints", sub='Follow History Sketches')])
write('08-gibraltar', ep)
import add_sat; add_sat.main(f'{ROOT}/08-gibraltar', ['today', 'strait', 'capture', 'currents'])
