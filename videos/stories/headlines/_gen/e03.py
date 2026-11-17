import sys; sys.path.insert(0, __file__.rsplit('/', 1)[0])
from common import *
GREEN = '#2e7d32'
CANAL = [[-79.92, 9.39], [-79.92, 9.27], [-79.86, 9.21], [-79.78, 9.15], [-79.70, 9.11], [-79.66, 9.06],
         [-79.62, 9.03], [-79.59, 9.00], [-79.56, 8.95], [-79.53, 8.89]]
PAN = country('Panama', 0.3)
BORDERS = [r for c in ('Panama', 'Costa Rica', 'Colombia', 'Nicaragua') for r in country(c, 0.3)]
ZONE = buffer_line(CANAL, 0.073)  # ~8 km either side (10-mile strip)
ep = dict(BASE, clips={'globe': 'sketch/globe_in.mp4'}, episode=3,
    title='Why did America build a canal, then give it away?',
    highlight=['give', 'it', 'away?'],
    music={'mood': 'tense', 'seed': 7, 'drums': True, 'level': 0.3},
    post={'caption': "The World's Chokepoints: the Panama Canal. The French failure, the 1903 Canal Zone, the 1914 opening, the 1977 treaties and the 1999 handover. Images: public domain (BnF, Library of Congress, US National Archives, US Navy, White House). Map data: Natural Earth.",
          'hashtags': ['history', 'panamacanal', 'panama', 'shipping', 'geography', 'shorts']},
    images={
      'sat_today': {'file': 'sketch/sat_today.jpg', 'credit': 'NASA Blue Marble shaded relief and bathymetry (GIBS)', 'where': 'NASA (public domain)'},
      'french': {'file': 'img/french.jpg', 'credit': 'French canal company works at Culebra, 1881-1886 (album "Canal de Panama")', 'where': 'Bibliothèque nationale de France (public domain)'},
      'cemetery': {'file': 'img/cemetery.jpg', 'credit': 'Cemetery in Panama, 1881-1886 (album "Canal de Panama")', 'where': 'Bibliothèque nationale de France (public domain)'},
      'culebra': {'file': 'img/culebra.jpg', 'credit': 'Harris & Ewing, Culebra Cut at Gold Hill (1913)', 'where': 'Library of Congress (public domain)'},
      'ancon': {'file': 'img/ancon.jpg', 'credit': 'Panama Canal Company, SS Ancon approaching Gamboa, 15 August 1914', 'where': 'US National Archives (public domain)'},
      'treaty': {'file': 'img/treaty.jpg', 'credit': 'White House photo, Jimmy Carter and Omar Torrijos, 7 September 1977', 'where': 'Public domain'},
      'locks': {'file': 'img/locks.jpg', 'credit': 'US Navy, ships entering the Miraflores Locks (2007)', 'where': 'US Navy (public domain)'}},
    sketches={
      'today': {'coast': 'sketch/panama.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 2.0},
        {'kind': 'territory', 'polys': PAN, 'color': GREEN, 'at': 0.8, 'dur': 1.4, },
        {'kind': 'satellite', 'key': 'sat_today', 'at': 2.6, 'dur': 1.2, 'borders': BORDERS, 'names': [
            {'text': 'Caribbean Sea', 'pos': [-79.0, 11.6], 'size': 46, 'italic': True},
            {'text': 'Pacific Ocean', 'pos': [-80.6, 5.2], 'size': 46, 'italic': True},
            {'text': 'PANAMA', 'pos': [-81.2, 8.6], 'size': 40},
            {'text': 'COSTA RICA', 'pos': [-82.5, 10.35], 'size': 30},
            {'text': 'COLOMBIA', 'pos': [-76.6, 7.0], 'size': 36},
            {'text': 'imagery: NASA Blue Marble', 'pos': [-81.2, 4.75], 'size': 24}]},
        {'kind': 'route', 'pts': CANAL, 'at': 1.6, 'dur': 1.0, 'color': '#ffd23f', 'width': 8, 'arrow': False},
        {'kind': 'marker', 'pos': [-79.9, 9.36], 'label': 'Colón', 'lx': -15, 'ly': -40, 'lalign': 'right', 'at': 2.0},
        {'kind': 'marker', 'pos': [-79.52, 8.98], 'label': 'Panama City', 'lx': 15, 'ly': 45, 'at': 2.3},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'canal': {'coast': 'sketch/canal.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.4},
        {'kind': 'route', 'pts': CANAL, 'at': 0.6, 'dur': 2.0, 'color': BLUE, 'width': 10, 'arrow': False},
        {'kind': 'measure', 'a': [-80.12, 9.39], 'b': [-80.12, 8.89], 'text': '82 km', 'offset': [-60, 0], 'at': 2.4, 'dur': 0.8},
        {'kind': 'marker', 'pos': [-79.92, 9.27], 'label': 'Gatun Locks', 'lx': 15, 'ly': -40, 'at': 1.0},
        {'kind': 'marker', 'pos': [-79.66, 9.06], 'label': 'Culebra Cut', 'lx': 15, 'ly': 0, 'at': 1.6},
        {'kind': 'marker', 'pos': [-79.59, 9.00], 'label': 'Miraflores Locks', 'lx': 15, 'ly': 30, 'at': 2.0},
        {'kind': 'label', 'text': 'Gatun Lake', 'pos': [-79.83, 9.12], 'at': 2.2, 'size': 40, 'color': BLUE}]},
      'routes': {'coast': 'sketch/americas.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.6},
        {'kind': 'route', 'pts': [[-74.0, 40.5], [-72, 33], [-74, 24], [-77, 17], [-79.9, 9.4], [-79.5, 8.8], [-85, 11], [-95, 14], [-106, 20], [-114, 27], [-120, 33], [-122.5, 37.7]], 'at': 0.8, 'dur': 2.2, 'color': BLUE},
        {'kind': 'label', 'text': 'via Panama', 'pos': [-104.0, 8.0], 'at': 2.6, 'size': 46, 'color': BLUE},
        {'kind': 'route', 'pts': [[-74.0, 40.5], [-60, 28], [-40, 5], [-34, -8], [-40, -24], [-55, -40], [-64, -53], [-67.5, -57.5], [-76, -52], [-77, -38], [-75, -20], [-84, -4], [-95, 8], [-110, 18], [-120, 30], [-122.5, 37.7]], 'at': 3.2, 'dur': 2.6, 'color': RED, 'dash': [16, 10]},
        {'kind': 'label', 'text': 'around Cape Horn', 'pos': [-100.0, -38.0], 'at': 5.2, 'size': 46, 'color': RED},
        {'kind': 'marker', 'pos': [-74.0, 40.7], 'label': 'New York', 'lx': 25, 'ly': 10, 'lalign': 'left', 'at': 1.0},
        {'kind': 'marker', 'pos': [-122.4, 37.8], 'label': 'San Francisco', 'lx': 20, 'ly': 70, 'at': 1.4}]},
      'zone': {'coast': 'sketch/canal.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': PAN, 'color': '#555555', 'style': 'faint', 'at': 0.3, 'dur': 1.0},
        {'kind': 'territory', 'polys': ZONE, 'at': 1.2, 'dur': 1.4, 'color': RED, 'label': 'CANAL ZONE', 'labelPos': [-79.45, 9.22]},
        {'kind': 'text', 'text': '1903: a US strip across Panama', 'pos': [0.5, 0.2], 'at': 2.0, 'size': 52, 'color': RED, 'cps': 22},
        {'kind': 'label', 'text': 'borders approx.', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]},
      'end': {'coast': 'sketch/canal.json', 'items': [
        {'kind': 'coast', 'at': 0, 'dur': 1.2, 'pencil': False},
        {'kind': 'territory', 'polys': PAN, 'color': GREEN, 'at': 0.3, 'dur': 1.2, 'label': 'PANAMA', 'labelPos': [-79.45, 9.22]},
        {'kind': 'route', 'pts': CANAL, 'at': 1.2, 'dur': 1.0, 'color': BLUE, 'width': 9, 'arrow': False},
        {'kind': 'text', 'text': '1999: the canal becomes Panamanian', 'pos': [0.5, 0.2], 'at': 1.8, 'size': 52, 'color': BLUE, 'cps': 22},
        {'kind': 'label', 'text': 'borders: today', 'pos': [0.8, 0.66], 'at': 3.0, 'size': 34}]}},
    beats=[
      dict(type='title', speaker='q', scene='globe', text='Why did America build a canal, then give it away?'),
      a('The Panama Canal joins two oceans. Since 1999, it has belonged to Panama.'),
      q('Where exactly is it?', scene='today', date='Today', place='Panama'),
      a('It crosses Panama near its narrowest point, from Colón to Panama City.'),
      a('Eighty-two kilometres of locks, hills and a huge artificial lake.', scene='canal', date='', place='Panama Canal'),
      q('Why does it matter so much?', scene='routes', place='New York to San Francisco'),
      a('Before it, ships from New York to San Francisco sailed around South America. The canal cut the trip by more than half.'),
      q('Who tried first?', scene='french', date='1881', place='Culebra', move=mv(0.5, 0.5, 0.45, 0.55, 1.3)),
      a('France. In 1881, Ferdinand de Lesseps, the man behind the Suez Canal, started digging.'),
      a('Yellow fever and malaria killed about twenty thousand workers. In 1889, the company went bankrupt.', scene='cemetery', date='1881 – 1889', move=mv(0.5, 0.5, 0.6, 0.5, 1.3)),
      q('Then America stepped in?', scene='zone', date='1903', place='Panama'),
      a('In 1903, Panama broke away from Colombia, backed by American warships. The United States got a strip across it: the Canal Zone.'),
      a('The Americans fought the mosquitoes and cut through a mountain range. Still, about five thousand six hundred workers died.', scene='culebra', date='1913', place='Culebra Cut', move=mv(0.5, 0.5, 0.5, 0.45, 1.25)),
      a('On the fifteenth of August 1914, the ship Ancon made the first official crossing.', scene='ancon', date='15 August 1914', place='Gamboa', move=mv(0.4, 0.5, 0.5, 0.5, 1.3)),
      q('So how did Panama get it back?', scene='treaty', date='7 September 1977', place='Washington', move=mv(0.5, 0.45, 0.5, 0.45, 1.3)),
      a('After years of protests, Jimmy Carter and Omar Torrijos signed treaties in 1977 to hand it over.'),
      a('At noon on the last day of 1999, the canal became Panamanian.', scene='end', date='31 December 1999', place='Panama'),
      q('And today?', scene='locks', date='Today', place='Miraflores Locks', move=mv(0.5, 0.5, 0.55, 0.5, 1.25)),
      a('Each ship uses millions of litres of lake water. In a drought, fewer ships get through.'),
      a('In 2025, Donald Trump said America would take it back. Panama said it will stay Panamanian.'),
      a('Next time: Greenland. Like the video and follow History Sketches.'),
      q('And tell us in the comments what you think!'),
      dict(type='end', text='Next: Greenland', sub='Follow History Sketches')])
write('03-panama', ep)
