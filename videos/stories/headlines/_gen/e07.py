import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GOLD = '#ffd23f'
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=7,
    title='Why does China worry about one narrow strait?',
    highlight=['China', 'worry'],
    music={'mood': 'tense', 'seed': 19, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: the Strait of Malacca. The Malacca Sultanate, the Portuguese (1511), the Dutch (1641), Raffles and Singapore (1819), the 1824 split, pirates and patrols, and China's 'Malacca dilemma'. Images: public domain (incl. NASA). Map data: Natural Earth.",
          'hashtags': ['history', 'malacca', 'singapore', 'malaysia', 'geography', 'shorts']},
    images={
      'singapore': {'file': 'img/singapore.jpg', 'credit': 'NASA, Singapore and Johor Bahru from the ISS (iss073e0763866)', 'where': 'NASA (public domain)'},
      'eredia': {'file': 'img/eredia.jpg', 'credit': 'Manuel Godinho de Erédia, map of the interior of Malacca (1602)', 'where': 'World Digital Library (public domain)'},
      'malacca1630': {'file': 'img/malacca1630.jpg', 'credit': 'António Bocarro, Portuguese Malacca (1635)', 'where': 'Public domain'},
      'raffles': {'file': 'img/raffles.jpg', 'credit': 'George Francis Joseph, Sir Stamford Raffles (1817)', 'where': 'National Portrait Gallery, London (public domain)'}},
    sketches={
      'today': {'coast': 'sketch/malacca.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'route', 'pts': [[95.3, 6.2], [97.5, 4.8], [99.5, 3.4], [101.0, 2.3], [102.6, 1.5], [103.8, 1.15], [104.6, 1.3], [105.4, 2.6]], 'at': 1.2, 'dur': 2.0, 'color': GOLD, 'width': 8},
        {'kind': 'label', 'text': 'MALAYSIA', 'pos': [102.2, 4.2], 'at': 1.6, 'size': 40},
        {'kind': 'label', 'text': 'SUMATRA', 'pos': [100.6, -0.4], 'at': 1.8, 'size': 40},
        {'kind': 'marker', 'pos': [103.82, 1.35], 'label': 'Singapore', 'lx': 15, 'ly': 45, 'at': 2.4},
        {'kind': 'marker', 'pos': [102.25, 2.2], 'label': 'Malacca', 'lx': -15, 'ly': -40, 'lalign': 'right', 'at': 2.6},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'split': {'coast': 'sketch/malacca.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'route', 'pts': [[95.5, 6.0], [98.5, 3.8], [101.2, 2.0], [103.2, 1.0], [104.5, 1.1]], 'at': 0.6, 'dur': 1.4, 'color': RED, 'width': 6, 'arrow': False, 'dash': [16, 10]},
        {'kind': 'label', 'text': 'British', 'pos': [102.3, 4.6], 'at': 1.4, 'size': 46, 'color': RED},
        {'kind': 'label', 'text': 'Dutch', 'pos': [100.0, 0.2], 'at': 1.6, 'size': 46, 'color': BLUE},
        {'kind': 'text', 'text': '1824: the strait split in two', 'pos': [0.5, 0.2], 'at': 1.0, 'size': 50, 'color': RED, 'cps': 22},
        {'kind': 'label', 'text': 'line approx.', 'pos': [0.8, 0.66], 'at': 2.4, 'size': 34}]},
      'oil': {'coast': 'sketch/oilroute.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'route', 'pts': [[52.0, 26.0], [57.0, 24.5], [62.0, 20.0], [72.0, 10.0], [82.0, 5.5], [92.0, 5.8], [98.0, 4.0], [103.8, 1.2], [108.0, 6.0], [113.0, 14.0], [118.0, 22.0], [121.5, 30.5]], 'at': 1.0, 'dur': 2.4, 'color': RED},
        {'kind': 'circle', 'pos': [101.5, 2.5], 'r': 60, 'ry': 48, 'at': 3.0},
        {'kind': 'label', 'text': 'Gulf oil', 'pos': [52.0, 30.0], 'at': 1.2, 'size': 40},
        {'kind': 'label', 'text': 'CHINA', 'pos': [110.0, 30.0], 'at': 2.6, 'size': 48},
        {'kind': 'text', 'text': '"the Malacca dilemma"', 'pos': [0.5, 0.2], 'at': 2.0, 'size': 52, 'color': RED, 'cps': 22}]},
      'detour': {'coast': 'sketch/detour.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'route', 'pts': [[95.5, 6.0], [99.0, 3.6], [102.5, 1.6], [104.3, 1.2], [106.5, 3.5]], 'at': 0.8, 'dur': 1.4, 'color': GOLD, 'width': 7},
        {'kind': 'route', 'pts': [[96.0, -6.0], [103.0, -7.5], [105.6, -6.4], [106.5, -5.2], [108.0, -2.0], [107.5, 2.5]], 'at': 1.6, 'dur': 1.6, 'color': RED, 'dash': [16, 10]},
        {'kind': 'route', 'pts': [[110.0, -10.0], [115.7, -9.2], [115.75, -8.3], [117.0, -4.0], [118.5, 0.0], [119.0, 4.0]], 'at': 2.2, 'dur': 1.6, 'color': RED, 'dash': [16, 10]},
        {'kind': 'label', 'text': 'Sunda', 'pos': [104.6, -7.2], 'at': 2.6, 'size': 38, 'color': RED},
        {'kind': 'label', 'text': 'Lombok', 'pos': [113.8, -10.0], 'at': 3.0, 'size': 38, 'color': RED},
        {'kind': 'label', 'text': 'Malacca', 'pos': [99.2, 5.6], 'at': 1.4, 'size': 38}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Why does China worry about one narrow strait?'),
      a("Because about a quarter of the world's traded goods pass through it: the Strait of Malacca."),
      q('Where exactly is it?', scene='today', date='Today', place='Strait of Malacca'),
      a('Between Malaysia and the Indonesian island of Sumatra. It runs about nine hundred kilometres, down to Singapore.'),
      a('Near Singapore, the shipping channel is under three kilometres wide.', scene='singapore', date='', place='Singapore from the ISS', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      q('Who controlled it first?', scene='eredia', date='1400s', place='Malacca', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('Around 1400, a prince named Parameswara founded the port of Malacca. Chinese treasure fleets came to trade.'),
      a('In 1511, the Portuguese took it with cannons. In 1641, the Dutch took it from them.', scene='malacca1630', date='1511', move=mv(0.5, 0.5, 0.55, 0.5, 1.3)),
      q('And the British?', scene='raffles', date='1819', place='Singapore', move=mv(0.5, 0.35, 0.5, 0.3, 1.3)),
      a('In 1819, Stamford Raffles set up a British port at Singapore.'),
      a('In 1824, Britain and the Netherlands split the strait between them.', scene='split', date='1824', place='Strait of Malacca'),
      q('So why does China worry?', scene='oil', date='Today', place='Gulf to China'),
      a("Most of China's imported oil sails through here. In 2003, President Hu Jintao called it the Malacca dilemma."),
      a("Block the strait, and China's economy could choke."),
      q('Is there another way?', scene='detour', date='', place='Indonesia'),
      a('Ships can go around through the Sunda or Lombok straits in Indonesia, but it costs extra days.'),
      q('And pirates?', scene='today', date='2004', place='Strait of Malacca'),
      a('In the early 2000s, pirates attacked ships here regularly. In 2004, Malaysia, Singapore and Indonesia began joint patrols, and attacks fell.'),
      a('Next time: the Strait of Gibraltar. Like the video and follow History Sketches.'),
      q('And tell us in the comments what you think!'),
      dict(type='end', text='Next: the Strait of Gibraltar', sub='Follow History Sketches')])
write('07-malacca', ep)
import add_sat; add_sat.main(f'{ROOT}/07-malacca', ['today', 'split', 'oil', 'detour'])
