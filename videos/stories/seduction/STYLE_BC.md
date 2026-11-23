# History Sketches house style "B+C" (chosen 2026-11-23, applies to every new video)

Reference project and frames: `~/cizgi/seduction-styles/` (`story.js`, `stills/styles_sheet.jpg`, frames f00001 = B, f00002 = C).

## B: cartoon cast acting in front of a real photo/painting
- Engine: the cizgi kit (copy `engine/ tools/ vendor/ fonts/ logo.png` from `~/cizgi/antwerp-sandwich`).
- Backdrop = a public-domain/CC0 photo or painting on a big unlit plane behind the actors:
  `const tex = await new THREE.TextureLoader().loadAsync("../refs/<img>.jpg"); tex.colorSpace = THREE.SRGBColorSpace;`
  `E.plane(W, H, new THREE.MeshBasicMaterial({ map: tex, fog: false }), [X, H/2 - ~1.8, -7.2], { noink: true, noShadow: true })`
  Keep the image aspect; make it big enough that no edge shows; camera ~[X,1.4,4.4] looking at [X,1.6,-3], fov ~50. Pick photos whose ground (street, floor, field) sits at the bottom so the cartoon feet look grounded.
- Cartoon characters (E.actor) do the human interaction: dialogue, reactions, hearts/sweat/question fx, props.
- Small credit tag bottom-right on every frame that shows a real image: "Real photo: <place>, <year> · <author> (public domain)".

## C: real-photo/painting cards inside a cartoon scene
- 2D overlay drawn on the canvas (see `dossier` in `seduction-styles/story.js`): manila dossier / pinned photo / wanted poster / letter with the REAL public-domain portrait of the person, key facts (name, dates, role) and a stamp.
- Use it when a real person is introduced or a key fact/date appears. Keep cards out of the caption band (65% height), the logo and nameCard (y≈1420).
- Revealing photos (dance costumes, bare skin in paintings): do NOT crop them. Show the whole image, blur the revealing areas (soft circular blur, ~14 px) and put a rose / flower emoji (🌹 🌸 🌺 🌷) on top of each blurred spot, sized to fully cover it. Positions are given as fractions of the source image so the cover follows the photo when it is scaled.

## Sound
- NEVER use whoosh / swish / zip / riser sound effects (the fast "fşşş" on page or scene transitions). User's rule, 2026-11-23. Cuts are silent or use content sounds (stamp, paper, coin, door, pop, ding).

## Rules kept from the channel
- Only public-domain or CC0 images; every date checked against two sources; English vertical 1080x1920; Q/A voices per `voice-casting`; natural years; CTA ending + logo; Gemini cover with a 4–5 word hook for every Short.
- Before finishing: look at a stills contact sheet (no camera inside walls, no cropped faces, no text over text/logo, no visible backdrop edge), then check audio/caption sync.
