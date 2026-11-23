// History Sketches · Ancient Rome #15 (last episode) — 1453, the last Roman emperor, style B+C.
// Loop cut: frame 0 = Theophilos' "Fall of Constantinople" + "ROME ENDED IN ISTANBUL"; the loop line ("most people think the Roman story ends in Rome") runs back into it.
import { buildRome, frameRome } from "./romebc.js";
export const meta = { fps: 30, tail: 1.2 };

const RED = "#b8262e", BLUE = "#1f4e8c", GREEN = "#2f7a3e";
const SOL = (seed, skin) => ({ skin, shirt: "#8a1f2a", pants: "#5a4a36", belt: "#4a2f1c", hat: "helmet", hatCol: "#9aa0a8", seed });
const HOOK = ["ROME ENDED IN ISTANBUL", "the last day of the Roman Empire"];

const EP = {
  tag: "ANCIENT ROME #15", key: "29 May 1453: Rome's last day", ctaSmall: "for more history", tail: 1.2,
  images: {
    fall: { file: "fall.jpg", credit: "Theophilos Hatzimihail, The Fall of Constantinople, 1928 (public domain)" },
    walls: { file: "walls_photo.jpg", credit: "Real photo: Istanbul land walls, c. 1895 · Photochrom, LoC (public domain)" },
    hagia: { file: "hagia.jpg", credit: "Gaspare Fossati & Louis Haghe, Hagia Sophia, 1852 (public domain)" },
    const11: { file: "const11_ms.jpg", credit: "Constantine XI, 15th-c. manuscript · Biblioteca Estense, Modena (public domain)" },
    mehmed: { file: "mehmed.jpg", credit: "Gentile Bellini, Sultan Mehmed II, 1480 · National Gallery, London (public domain)" },
    siege: { file: "siege.jpg", credit: "Jean Le Tavernier, The Siege of Constantinople, after 1455 · BnF (public domain)" },
    zonaro: { file: "zonaro.jpg", credit: "Fausto Zonaro, Mehmed II enters Constantinople, c. 1903 (public domain)" },
    forum: { file: "forum.jpg", credit: "Real photo: the Roman Forum, c. 1895 · Photochrom, LoC (public domain)" },
  },
  maps: {
    start: { coast: "empire.json", title: "1451: all that was left of Rome", terr: [
      { key: "E117", color: RED, faint: true, at: 0.2, label: "Rome, AD 117", labelPos: [3.0, 46.5], lsize: 28 },
      { key: "OTT1451", color: GREEN, at: 1.0, label: "Ottoman Empire", labelPos: [33.0, 38.6], lsize: 28 },
      { key: "MOREA", color: BLUE, at: 1.8 }, { key: "CPL", color: BLUE, at: 1.8 }],
      marks: [{ pos: [28.98, 41.01], label: "Constantinople", at: 2.2, color: BLUE, dx: -10, dy: -28, align: "right", size: 32 }, { pos: [22.1, 37.07], label: "Mystras", at: 2.6, dx: -12, dy: 26, align: "right", size: 26 }] },
    end: { coast: "empire.json", title: "753 BC – AD 1453: 22 centuries", terr: [
      { key: "E117", color: RED, faint: true, at: 0.2 },
      { key: "OTT1451", color: GREEN, at: 0.6, label: "Ottoman Empire", labelPos: [33.0, 38.6], lsize: 28 }, { key: "CPL", color: GREEN, at: 0.6 }],
      marks: [{ pos: [12.49, 41.89], label: "Rome, 753 BC", at: 0.3, dx: -14, dy: 28, align: "right" }, { pos: [28.98, 41.01], label: "Istanbul, 1453", at: 2.2, color: RED, dx: 0, dy: -30, align: "center" }],
      arrow: { from: [13.0, 42.3], to: [28.4, 41.3], at: 0.8 } },
  },
  cast: {
    emperor: { skin: "#e9c3a0", shirt: "#6a2a7a", pants: "#6a2a7a", jacket: "#c9a24a", hat: "crown", hatCol: "#e8c45a", hair: "short", hairCol: "#3a2a20", beard: "#3a2a20", seed: 71 },
    mehmed: { skin: "#e3b48e", shirt: "#b8262e", pants: "#2f5a3a", jacket: "#2f7a3e", hat: "turban", hatCol: "#f4efe4", beard: "#3a2418", seed: 73 },
    s1: SOL(23, "#e9c3a0"), s2: SOL(29, "#d9a882"),
    jan: { skin: "#d9a882", shirt: "#2f5a8a", pants: "#3a3040", hat: "kavuk", hatCol: "#f4efe4", seed: 79 },
  },
  shots: [
    /* 0 a cold open */ { bg: "fall", punch: true, move: { u0: 0.5, v0: 0.4, z0: 1.35, z1: 1.12 }, pres: "none", light: "dramatic", hookText: HOOK,
      cast: [{ id: "s1", x: -0.8, face: "shock", arms: "up", look: 0.5 }, { id: "jan", x: 0.85, face: "determined", arms: "point", flip: true, look: -0.5 }] },
    /* 1 q title */ { room: "study", ov: [{ kind: "top", big: "ROME UNTIL 1453?", small: "the empire that outlived its city", at: 0.3 }] },
    /* 2 a walls */ { bg: "walls", move: { u0: 0.4, v0: 0.45, z0: 1.0, z1: 1.18 }, ov: [{ kind: "top", big: "THE LAND WALLS", small: "Istanbul · built in the early 400s", at: 1.0 }] },
    /* 3 q Byzantine */ { bg: "hagia", pres: "ava", move: { u0: 0.6, v0: 0.45, z0: 1.0, z1: 1.08 } },
    /* 4 a Romans */ { bg: "hagia", move: { u0: 0.6, v0: 0.5, z0: 1.08, z1: 1.2 }, ov: [{ kind: "top", big: "THEY SAID \"ROMANS\"", small: "\"Byzantine\" is a later historians' name", at: 3.2, size: 68 }] },
    /* 5 q who */ { room: "study" },
    /* 6 a Constantine XI */ { room: "study", ov: [{ kind: "dossier", img: "const11", tab: "IMPERIAL FILE", y: 560, at: 0.1, stampAt: 6.1, stamp: "THE LAST",
      rows: [["NAME", "Constantine XI"], ["EMPEROR", "1449–1453"], ["MOTHER", "Helena"], ["CITY FOUNDER", "Constantine I, son of Helena"]] }] },
    /* 7 q left */ { room: "study", ov: [{ kind: "map", map: "start", at: 0.05 }] },
    /* 8 a nothing */ { room: "study", theoArms: "point", ov: [{ kind: "map", map: "start", at: -2.0 }] },
    /* 9 a Mehmed */ { room: "study", ov: [{ kind: "dossier", img: "mehmed", tab: "OTTOMAN FILE", y: 560, at: 0.1, stampAt: 1.0, stamp: "6 APRIL 1453",
      rows: [["NAME", "Sultan Mehmed II"], ["AGE", "21"], ["ARMY", "up to 80,000 men"], ["DEFENDERS", "about 7,000"]] }] },
    /* 10 q how long */ { bg: "siege", pres: "ava", move: { u0: 0.5, v0: 0.3, z0: 1.0, z1: 1.08 } },
    /* 11 a 53 days */ { bg: "siege", move: { u0: 0.5, v0: 0.45, z0: 1.05, z1: 1.2 }, cast: [{ id: "mehmed", x: -0.75, face: "determined", arms: "point", look: 0.6, fx: "stars", fxAt: 2.2 }],
      ov: [{ kind: "top", big: "53 DAYS", small: "ships dragged overland, around the chain", at: 0.2 }] },
    /* 12 a dawn */ { bg: "fall", move: { u0: 0.35, v0: 0.5, z0: 1.05, z1: 1.2 }, cast: [{ id: "jan", x: -0.9, face: "angry", arms: "cheer" }],
      ov: [{ kind: "name", title: "The final attack", sub: "before dawn, 29 May 1453", at: 0.8 }] },
    /* 13 q emperor */ { bg: "fall", pres: "ava", move: { u0: 0.6, v0: 0.4, z0: 1.15, z1: 1.2 } },
    /* 14 a died */ { bg: "walls", move: { u0: 0.6, v0: 0.5, z0: 1.15, z1: 1.3 }, cast: [{ id: "s2", x: -0.9, face: "sad", arms: "hang" }],
      ov: [{ kind: "top", big: "NEVER IDENTIFIED", small: "Constantine XI died fighting, 29 May 1453", at: 2.3, size: 68 }] },
    /* 15 a legend */ { bg: "walls", pres: "theo", move: { u0: 0.3, v0: 0.45, z0: 1.2, z1: 1.35 }, cast: [{ id: "emperor", x: -0.9, face: "sleep", arms: "hang", at: 1.6 }],
      ov: [{ kind: "top", big: "THE MARBLE EMPEROR", small: "Greek legend · near the Golden Gate", at: 1.9, size: 68 }] },
    /* 16 q end */ { bg: "zonaro", pres: "ava", move: { u0: 0.5, v0: 0.4, z0: 1.0, z1: 1.08 } },
    /* 17 a Caesar */ { bg: "zonaro", move: { u0: 0.5, v0: 0.45, z0: 1.08, z1: 1.2 }, cast: [{ id: "mehmed", x: -0.75, face: "happy", arms: "cheer", fx: "sparkle", fxAt: 3.0 }],
      ov: [{ kind: "top", big: "KAYSER-I RÛM", small: "\"Caesar of Rome\"", at: 3.0 }] },
    /* 18 a 22 centuries */ { room: "study", theoArms: "point", ov: [{ kind: "map", map: "end", at: 0.05 }] },
    /* 19 a CTA */ { room: "stage", cta: true, light: "day", cast: [{ id: "emperor", x: -1.65, z: -3.0, face: "happy", arms: "wave" }, { id: "mehmed", x: 1.65, z: -3.0, face: "grin", arms: "wave", flip: true }] },
    /* 20 q CTA */ { room: "stage", cta: true, light: "day", avaFace: "happy", cast: [{ id: "emperor", x: -1.65, z: -3.0, face: "laugh", arms: "cheer" }, { id: "mehmed", x: 1.65, z: -3.0, face: "grin", arms: "wave", flip: true }],
      ov: [{ kind: "top", big: "YOUR FAVOURITE ROME STORY?", small: "tell us in the comments", at: 0.6, y: 470, size: 56 }] },
    /* 21 a loop */ { bg: "forum", move: { u0: 0.5, v0: 0.45, z0: 1.0, z1: 1.25 }, cast: [{ id: "s2", x: -0.8, face: "think", arms: "chin" }] },
  ],
  loopTail: { punch: false, move: { u0: 0.5, v0: 0.4, z0: 1.35, z1: 1.35 }, ov: [] },
};

export async function build(E) { await buildRome(E, EP); }
export function frame(f, E) { return frameRome(f, E); }
