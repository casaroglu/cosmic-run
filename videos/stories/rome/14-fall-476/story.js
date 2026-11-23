// History Sketches · Ancient Rome #14 — AD 476, the fall of the West, style B+C.
// Loop cut: frame 0 = Cole's "Destruction" + "ROME DIDN'T FALL IN 476"; the loop line ("ask anyone when Rome fell") runs back into it.
import { buildRome, frameRome } from "./romebc.js";
export const meta = { fps: 30, tail: 1.2 };

const RED = "#b8262e", BLUE = "#1f4e8c";
const SOL = (seed, skin) => ({ skin, shirt: "#5a6a3a", pants: "#6a5236", belt: "#4a2f1c", hat: "helmet", hatCol: "#8a8f96", seed });
const HOOK = ["ROME DIDN'T FALL IN 476", "so what really happened?"];
const KINGDOMS = [{ pos: [-4.0, 40.2], label: "Visigoths", nodot: true, size: 30, color: "#5a4a36", dx: 0, dy: 0 },
  { pos: [8.6, 34.6], label: "Vandals", nodot: true, size: 30, color: "#5a4a36", dx: 0, dy: 0 },
  { pos: [3.2, 50.2], label: "Franks", nodot: true, size: 30, color: "#5a4a36", dx: 0, dy: 0 }];

const EP = {
  tag: "ANCIENT ROME #14", key: "476: the East ruled on until 1453", ctaSmall: "Next: the last Roman emperor", tail: 1.2,
  images: {
    destruction: { file: "destruction.jpg", credit: "Thomas Cole, The Course of Empire: Destruction, 1836 (public domain)" },
    desolation: { file: "desolation.jpg", credit: "Thomas Cole, The Course of Empire: Desolation, 1836 (public domain)" },
    ovo: { file: "ovo2.jpg", credit: "Christen Købke, Castel dell'Ovo, Naples, 1839–40 · SMK (public domain)" },
    sack455: { file: "sack455.jpg", credit: "Karl Bryullov, Genseric Sacking Rome (AD 455), 1833–36 (public domain)" },
    resign: { file: "resign.jpg", credit: "Romulus Augustulus resigns the crown to Odoacer, 19th-c. engraving (public domain)" },
    walls: { file: "walls.jpg", credit: "Thomas Allom, The Triple Wall of Constantinople, 1836 (public domain)" },
    romulus_coin: { file: "romulus_coin.jpg", credit: "Gold solidus of Romulus Augustus · American Numismatic Society (CC0)" },
    zeno_coin: { file: "zeno_coin.jpg", credit: "Gold solidus of Zeno, Constantinople · Polish museum collection (CC0)" },
    odoacer_coin: { file: "odoacer_coin.jpg", credit: "Coin of Odoacer, Ravenna, AD 477 (public domain)" },
  },
  maps: {
    start: { coast: "empire.json", title: "AD 475: what was left of the West", terr: [
      { key: "E275", clip: "E395", color: BLUE, at: 0.2, label: "Eastern Roman Empire", labelPos: [33.5, 37.0], lsize: 28 },
      { key: "ITA476", color: RED, at: 1.0, label: "Western Empire", labelPos: [8.8, 47.6], lsize: 28 }],
      marks: [{ pos: [12.2, 44.42], label: "Ravenna", at: 1.8, dx: 14, dy: 22 }, { pos: [28.98, 41.01], label: "Constantinople", at: 2.4, dx: 0, dy: 30, align: "center" }, ...KINGDOMS.map((k, i) => ({ ...k, at: 3.0 + i * 0.3 }))] },
    end: { coast: "empire.json", title: "AD 476: the East goes on", terr: [
      { key: "E275", clip: "E395", color: BLUE, at: 0.2, label: "Roman Empire (East)", labelPos: [33.5, 37.0], lsize: 30 },
      { key: "ITA476", color: RED, faint: true, at: 1.0, label: "Odoacer's Italy", labelPos: [8.8, 47.6], lsize: 26 }],
      marks: [{ pos: [28.98, 41.01], label: "Constantinople", at: 1.6, color: BLUE, dx: 0, dy: 30, align: "center", size: 32 }, ...KINGDOMS.map((k) => ({ ...k, at: 2.2 })),
        { pos: [16.48, 43.54], label: "Nepos (Dalmatia)", at: 12.3, dx: -12, dy: 30, align: "right", size: 28 }] },
  },
  cast: {
    boy: { skin: "#f3d2b4", shirt: "#6a2a7a", pants: "#6a2a7a", hat: "crown", hatCol: "#e8c45a", hair: "short", hairCol: "#c89a5a", seed: 61 },
    orestes: { skin: "#e9c3a0", shirt: "#8a1f2a", pants: "#5a4a36", hat: "helmet", hatCol: "#c9a24a", beard: "#6a6a6a", seed: 63 },
    odoacer: { skin: "#f0d0b0", shirt: "#4a5a7a", pants: "#5a4a36", belt: "#3a2a1a", hat: "helmet", hatCol: "#7a7f88", hair: "long", hairCol: "#c88a3a", beard: "#c88a3a", seed: 67 },
    s1: SOL(23, "#e9c3a0"), s2: SOL(29, "#f0d0b0"),
    citizen: { skin: "#d9a882", dress: "#c9503a", hair: "bun", hairCol: "#2a1d16", seed: 57 },
  },
  shots: [
    /* 0 a cold open */ { bg: "destruction", punch: true, move: { u0: 0.55, v0: 0.45, z0: 1.35, z1: 1.12 }, pres: "none", light: "dramatic", hookText: HOOK,
      cast: [{ id: "citizen", x: -0.8, face: "shock", arms: "up", look: 0.5 }, { id: "s1", x: 0.85, face: "smug", arms: "cross", flip: true, look: -0.4 }] },
    /* 1 q title */ { room: "study", ov: [{ kind: "top", big: "WHAT HAPPENED IN 476?", small: "the year Rome \"fell\"", at: 0.3 }] },
    /* 2 a Naples */ { bg: "ovo", move: { u0: 0.45, v0: 0.45, z0: 1.0, z1: 1.15 }, ov: [{ kind: "top", big: "CASTEL DELL'OVO", small: "Naples, Italy", at: 0.8 }] },
    /* 3 q who */ { bg: "ovo", pres: "ava", move: { u0: 0.55, v0: 0.45, z0: 1.15, z1: 1.2 } },
    /* 4 a boy */ { room: "study", ov: [{ kind: "dossier", img: "romulus_coin", tab: "IMPERIAL FILE", y: 560, at: 0.1, stampAt: 5.6, stamp: "LITTLE AUGUSTUS",
      rows: [["NAME", "Romulus Augustus"], ["NICKNAME", "Augustulus"], ["EMPEROR", "AD 475–476"], ["AGE", "a boy (born c. 460–65)"]] }] },
    /* 5 a Orestes */ { room: "study", theoArms: "point", ov: [{ kind: "map", map: "start", at: 0.05 }, { kind: "name", title: "Romulus Augustus, emperor", sub: "31 October AD 475", at: 4.8 }] },
    /* 6 q ruled */ { room: "throne", pres: "ava", cast: [{ id: "boy", x: 0, y: 0.65, z: -2.1, scale: 0.8, face: "nervous", arms: "hang" }, { id: "orestes", x: 1.7, z: -1.6, face: "smug", arms: "hip", flip: true, look: -0.5 }] },
    /* 7 a army */ { bg: "sack455", pres: "none", move: { u0: 0.5, v0: 0.5, z0: 1.0, z1: 1.15 }, cast: [{ id: "odoacer", x: -0.75, face: "smug", arms: "cross", look: 0.5 }, { id: "s2", x: 0.85, face: "determined", arms: "cheer", flip: true, at: 1.2 }],
      ov: [{ kind: "top", big: "SACKED: 410 AND 455", small: "Rome itself, twice", at: 5.0, size: 64 }] },
    /* 8 q want */ { bg: "sack455", pres: "ava", move: { u0: 0.5, v0: 0.5, z0: 1.0, z1: 1.1 } },
    /* 9 a Odoacer */ { bg: "resign", pres: "none", move: { u0: 0.5, v0: 0.45, z0: 1.0, z1: 1.15 },
      cast: [{ id: "odoacer", x: -0.75, face: "determined", arms: "point", look: 0.6 }, { id: "boy", x: 0.85, scale: 0.8, face: "scared", arms: "up", flip: true, fx: "sweat", fxAt: 4.0 }],
      ov: [{ kind: "name", title: "The boy emperor is removed", sub: "4 September AD 476", at: 5.7 }] },
    /* 10 q kill */ { bg: "resign", pres: "ava", move: { u0: 0.45, v0: 0.4, z0: 1.15, z1: 1.2 } },
    /* 11 a pension */ { bg: "ovo", move: { u0: 0.5, v0: 0.45, z0: 1.05, z1: 1.2 }, cast: [{ id: "boy", x: -0.9, scale: 0.8, face: "happy", arms: "holdR", prop: { kind: "bag", hand: "r", gold: true, text: "" }, at: 0.8 }],
      ov: [{ kind: "top", big: "A PENSION, NOT A SWORD", small: "sent to live near Naples", at: 0.6, size: 64 }] },
    /* 12 q emperor */ { room: "study", ov: [{ kind: "pin", img: "odoacer_coin", coin: true, x: 300, y: 560, w: 330, caption: "Odoacer", at: 0.2 }] },
    /* 13 a regalia */ { room: "study", ov: [{ kind: "pin", img: "odoacer_coin", coin: true, x: 300, y: 560, w: 330, caption: "Odoacer", at: -5 },
      { kind: "pin", img: "zeno_coin", coin: true, x: 780, y: 560, w: 330, caption: "Zeno", at: 3.2 }, { kind: "top", big: "\"ONE EMPEROR IS ENOUGH\"", small: "", at: 5.6, y: 250, size: 64 }] },
    /* 14 q not end */ { bg: "walls", pres: "ava", move: { u0: 0.5, v0: 0.5, z0: 1.0, z1: 1.08 } },
    /* 15 a east */ { room: "study", theoArms: "point", ov: [{ kind: "map", map: "end", at: 0.05 }] },
    /* 16 a Nepos */ { room: "study", ov: [{ kind: "map", map: "end", at: -7.5 }, { kind: "name", title: "Julius Nepos", sub: "claimed the throne until AD 480", at: 1.0 }] },
    /* 17 q why */ { room: "study", ov: [{ kind: "top", big: "WHY 476, THEN?", small: "", at: 0.2 }] },
    /* 18 a chronicler */ { room: "study", ov: [{ kind: "top", big: "A CHRONICLER'S DATE", small: "Marcellinus Comes, Constantinople, c. AD 518", at: 1.5, size: 64 }, { kind: "pin", img: "resign", x: 540, y: 700, w: 400, rot: -0.04, caption: "the boy emperor steps down", at: 3.4 }] },
    /* 19 q really */ { bg: "walls", pres: "ava", move: { u0: 0.4, v0: 0.5, z0: 1.05, z1: 1.12 } },
    /* 20 a 1453 */ { bg: "walls", move: { u0: 0.55, v0: 0.45, z0: 1.1, z1: 1.25 }, ov: [{ kind: "top", big: "AD 1453", small: "the real end of the Roman Empire", at: 1.9 }] },
    /* 21 a CTA */ { room: "stage", cta: true, light: "day", cast: [{ id: "boy", x: -1.5, z: -3.0, scale: 0.8, face: "happy", arms: "wave" }, { id: "odoacer", x: 1.65, z: -3.0, face: "grin", arms: "wave", flip: true }] },
    /* 22 q CTA */ { room: "stage", cta: true, light: "day", avaFace: "happy", cast: [{ id: "boy", x: -1.5, z: -3.0, scale: 0.8, face: "laugh", arms: "cheer" }, { id: "odoacer", x: 1.65, z: -3.0, face: "grin", arms: "wave", flip: true }],
      ov: [{ kind: "top", big: "WHEN DID ROME FALL?", small: "tell us in the comments", at: 0.6, y: 470, size: 60 }] },
    /* 23 a loop */ { bg: "desolation", move: { u0: 0.5, v0: 0.45, z0: 1.0, z1: 1.25 }, cast: [{ id: "citizen", x: -0.8, face: "think", arms: "chin" }] },
  ],
  loopTail: { punch: false, move: { u0: 0.55, v0: 0.45, z0: 1.35, z1: 1.35 }, ov: [] },
};

export async function build(E) { await buildRome(E, EP); }
export function frame(f, E) { return frameRome(f, E); }
