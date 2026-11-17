import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GREEN = '#2e7d32'
TWN = country('Taiwan', 0.5)
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=5,
    title='Why is the world watching the Taiwan Strait?',
    highlight=['world', 'watching'],
    music={'mood': 'tense', 'seed': 13, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: the Taiwan Strait. Fort Zeelandia and Koxinga, Qing and Japanese rule, the 1949 retreat, the Seventh Fleet and the 1958 Kinmen crisis, container ships and chips. Images: public domain / CC0 (Rijksmuseum, US Navy, NASA). Map data: Natural Earth.",
          'hashtags': ['history', 'taiwan', 'taiwanstrait', 'china', 'geography', 'shorts']},
    images={
      'strait': {'file': 'img/strait.jpg', 'credit': "NASA, the Taiwan Strait seen from the ISS (iss072e435710, 2024)", 'where': 'NASA (public domain)'},
      'zeelandia': {'file': 'img/zeelandia.jpg', 'credit': 'The fall of Fort Zeelandia, from "Kort en Bondigh Verhael" (1662-63)', 'where': 'Rijksmuseum (CC0)'},
      'koxinga': {'file': 'img/koxinga.jpg', 'credit': 'Portrait of Koxinga (Zheng Chenggong), 17th century', 'where': 'National Museum of Taiwan History (public domain)'},
      'skyray': {'file': 'img/skyray.jpg', 'credit': 'US Navy, F4D-1 Skyray off Taiwan during the 1958 crisis', 'where': 'US Navy (public domain)'},
      'night': {'file': 'img/night.jpg', 'credit': 'NASA, Taiwan and mainland China at night from the ISS (2014)', 'where': 'NASA (public domain)'}},
    sketches={
      'today': {'coast': 'sketch/taiwan.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'territory', 'polys': TWN, 'color': GREEN, 'at': 1.0, 'dur': 1.2, 'label': 'TAIWAN', 'labelPos': [121.0, 23.4]},
        {'kind': 'label', 'text': 'CHINA', 'pos': [117.3, 26.6], 'at': 1.6, 'size': 48},
        {'kind': 'measure', 'a': [119.8, 25.45], 'b': [120.95, 24.85], 'text': 'about 130 km', 'offset': [0, -70], 'at': 2.4, 'dur': 0.8},
        {'kind': 'label', 'text': 'East China Sea', 'pos': [123.6, 27.6], 'at': 3.0, 'size': 38, 'color': BLUE},
        {'kind': 'label', 'text': 'South China Sea', 'pos': [117.6, 21.2], 'at': 3.2, 'size': 38, 'color': BLUE},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'retreat': {'coast': 'sketch/taiwan.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': TWN, 'color': BLUE, 'at': 0.3, 'dur': 1.0},
        {'kind': 'route', 'pts': [[116.6, 27.2], [118.4, 26.2], [119.8, 25.2], [121.2, 24.6]], 'at': 0.8, 'dur': 1.6, 'color': RED},
        {'kind': 'marker', 'pos': [121.56, 25.03], 'label': 'Taipei', 'lx': 15, 'ly': -40, 'at': 1.8},
        {'kind': 'text', 'text': '1949: the Nationalists retreat', 'pos': [0.5, 0.2], 'at': 1.2, 'size': 50, 'color': RED, 'cps': 22}]},
      'japan': {'coast': 'sketch/taiwan.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': TWN, 'color': RED, 'at': 0.3, 'dur': 1.0},
        {'kind': 'text', 'text': '1683 Qing  ·  1895 Japan', 'pos': [0.5, 0.2], 'at': 0.8, 'size': 52, 'color': RED, 'cps': 22}]},
      'kinmen': {'coast': 'sketch/kinmen.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.4},
        {'kind': 'marker', 'pos': [118.36, 24.45], 'label': 'Kinmen', 'lx': 15, 'ly': 45, 'at': 0.8, 'color': BLUE},
        {'kind': 'marker', 'pos': [118.09, 24.48], 'label': 'Xiamen', 'lx': -15, 'ly': -40, 'lalign': 'right', 'at': 1.0},
        {'kind': 'circle', 'pos': [118.36, 24.45], 'r': 80, 'ry': 60, 'at': 1.6},
        {'kind': 'label', 'text': 'Taiwan →', 'pos': [119.9, 24.3], 'at': 2.0, 'size': 40},
        {'kind': 'text', 'text': '1958: Kinmen under fire', 'pos': [0.5, 0.2], 'at': 1.4, 'size': 50, 'color': RED, 'cps': 22}]},
      'drills': {'coast': 'sketch/taiwan.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': TWN, 'color': GREEN, 'at': 0.3, 'dur': 1.0, 'label': 'TAIWAN', 'labelPos': [121.0, 23.4]},
        {'kind': 'circle', 'pos': [121.0, 25.9], 'r': 60, 'ry': 45, 'at': 1.0},
        {'kind': 'circle', 'pos': [122.6, 23.6], 'r': 60, 'ry': 45, 'at': 1.3},
        {'kind': 'circle', 'pos': [120.4, 21.6], 'r': 60, 'ry': 45, 'at': 1.6},
        {'kind': 'circle', 'pos': [119.3, 24.2], 'r': 60, 'ry': 45, 'at': 1.9},
        {'kind': 'text', 'text': 'drills around the island', 'pos': [0.5, 0.2], 'at': 1.2, 'size': 50, 'color': RED, 'cps': 22},
        {'kind': 'label', 'text': 'zones approx.', 'pos': [0.8, 0.66], 'at': 2.4, 'size': 34}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Why is the world watching the Taiwan Strait?'),
      a('About a hundred and thirty kilometres of water between China and Taiwan, and one of the busiest sea lanes on Earth.'),
      q('Where exactly is it?', scene='today', date='Today', place='Taiwan Strait'),
      a("Between China's Fujian coast and the island of Taiwan. It links the East and South China Seas."),
      a('From space, you can see both shores at once.', scene='strait', date='', place='seen from the ISS', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      q('Who ruled Taiwan first?', scene='zeelandia', date='1624', place='Fort Zeelandia', move=mv(0.5, 0.45, 0.5, 0.4, 1.3)),
      a("Its own Austronesian peoples. Then, in 1624, the Dutch built Fort Zeelandia and ran a trading colony."),
      a('In 1661, the Ming loyalist Koxinga besieged it. Early in 1662, the Dutch surrendered.', scene='koxinga', date='1662', move=mv(0.5, 0.35, 0.5, 0.3, 1.3)),
      q('And then China took it?'),
      a('The Qing dynasty did, in 1683. After losing a war in 1895, it handed Taiwan to Japan, which ruled until 1945.', scene='japan', date='1683 – 1945', place='Taiwan'),
      q('So how did Taiwan split from China?', scene='retreat', date='1949', place='Taiwan'),
      a("Civil war. In 1949, the Communists won the mainland, and Chiang Kai-shek's Nationalists retreated to Taiwan."),
      a('Both governments claimed to be the real China.'),
      q('Did America get involved?', scene='kinmen', date='1958', place='Kinmen'),
      a('In 1950, when the Korean War began, Truman sent the Seventh Fleet into the strait.'),
      a("In 1958, China shelled Kinmen, a Taiwanese island just off the mainland, for weeks. American ships and jets backed Taiwan.", scene='skyray', date='1958', place='off Taiwan', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      q('Why does the whole world care?', scene='night', date='Today', place='seen from the ISS', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a("In 2022, nearly half the world's container ships sailed through it. And Taiwan makes about ninety percent of the most advanced chips."),
      q('And today?', scene='drills', date='Today', place='around Taiwan'),
      a("China says Taiwan is part of its territory and has not ruled out force. Its navy often holds drills around the island."),
      a('Next time: the Bosphorus. Like the video and follow History Sketches.'),
      q('And tell us in the comments what you think!'),
      dict(type='end', text='Next: the Bosphorus', sub='Follow History Sketches')])
write('05-taiwan', ep)
import add_sat; add_sat.main(f'{ROOT}/05-taiwan', ['today', 'retreat', 'japan', 'drills'])
