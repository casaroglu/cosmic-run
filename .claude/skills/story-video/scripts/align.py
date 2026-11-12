"""Caption word timings that follow the actual voice.

Kokoro's ONNX model returns audio only (no per-phoneme durations), so timings
are reconstructed from the audio itself:

1. Pauses: silent stretches inside the clip (commas, full stops) are detected
   and snapped to the word boundaries they belong to (anchors).
2. Between anchors, time is shared by phoneme count of each *spoken* word
   (espeak, same phonemizer Kokoro uses), not by letters on screen.
3. "say" overrides (e.g. text "1605", say "sixteen-oh-five") are mapped back to
   the displayed words, so a number lights up for exactly as long as it is spoken.
"""
import difflib
import re
import sys

import numpy as np

FRAME = 0.01        # analysis hop, seconds
MIN_PAUSE = 0.09    # shorter silences are stop consonants, not pauses
MERGE_GAP = 0.15    # pauses split by a blip shorter than this are one pause
EDGE = 0.25         # quiet tails at the very start/end of a clip are not pauses


def _norm(w):
    return re.sub(r"[^\w']", "", w.lower())


_warned = False


def _phoneme_counts(words, lang="en-us"):
    global _warned
    clean = [re.sub(r"[^\w'\- ]", "", w) or "a" for w in words]
    try:
        import phonemizer
        from phonemizer.backend.espeak.wrapper import EspeakWrapper
        try:  # same bundled espeak-ng that kokoro-onnx uses
            import espeakng_loader
            EspeakWrapper.set_data_path(espeakng_loader.get_data_path())
            EspeakWrapper.set_library(espeakng_loader.get_library_path())
        except ImportError:
            pass
        ph = phonemizer.phonemize(clean, language=lang, preserve_punctuation=False,
                                  with_stress=False, strip=True)
        return [max(1, len(re.sub(r"\s", "", p))) for p in ph]
    except Exception as e:  # no espeak: fall back to letters (less accurate)
        if not _warned:
            print(f"align: phonemizer unavailable ({e}); timing words by letters", file=sys.stderr)
            _warned = True
        return [max(1, len(_norm(w))) for w in words]


def _pauses(audio, sr):
    """Internal silent stretches as (start, end) seconds, voice-relative."""
    hop = int(FRAME * sr)
    n = len(audio) // hop
    if n < 3:
        return []
    rms = np.sqrt(np.mean(audio[: n * hop].reshape(n, hop) ** 2, axis=1))
    loud = np.percentile(rms, 90)
    quiet = rms < max(loud * 0.08, 1e-4)
    out, i = [], 0
    while i < n:
        if quiet[i]:
            j = i
            while j < n and quiet[j]:
                j += 1
            if i > 0 and j < n:
                out.append([i * FRAME, j * FRAME])
            i = j
        else:
            i += 1
    merged = []  # a pause broken by a short blip is one pause
    for s, e in out:
        if merged and s - merged[-1][1] < MERGE_GAP:
            merged[-1][1] = e
        else:
            merged.append([s, e])
    dur = len(audio) / sr
    return [(s, e) for s, e in merged
            if e - s >= MIN_PAUSE and s > EDGE and e < dur - EDGE]


def _spoken_spans(display, spoken):
    """For each displayed word, the [j0, j1) range of spoken words it covers."""
    a = [_norm(w) for w in display]
    b = [_norm(w) for w in spoken]
    spans = [None] * len(display)
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op == "equal":
            for k in range(i2 - i1):
                spans[i1 + k] = (j1 + k, j1 + k + 1)
        elif i2 > i1:  # replace / delete: share spoken range j1..j2 over displayed i1..i2
            n = i2 - i1
            for k in range(n):
                spans[i1 + k] = (j1 + (j2 - j1) * k / n, j1 + (j2 - j1) * (k + 1) / n)
        # insert (spoken but not shown): its time is absorbed below via continuity
    return spans


def word_times(display_text, spoken_text, audio, sr, t0, lang="en-us"):
    display = display_text.split()
    spoken = spoken_text.split()
    if not display:
        return []
    dur = len(audio) / sr
    weights = _phoneme_counts(spoken, lang)
    cum = np.concatenate([[0], np.cumsum(weights)]).astype(float)  # phoneme position of each boundary
    total_ph = cum[-1]

    # voiced time axis (pauses removed) and where each pause sits on it
    pauses = _pauses(audio, sr)
    voiced_total = dur - sum(e - s for s, e in pauses)
    v_at, acc, prev = [], 0.0, 0.0
    for s, e in pauses:
        acc += s - prev
        v_at.append(acc)
        prev = e

    # match pauses to spoken-word boundaries (monotone, best total score):
    # long pauses at punctuation win; mid-sentence only for clear, close pauses
    nb = len(spoken)

    def score(p, k):
        s, e = pauses[p]
        d = abs(cum[k] / total_ph - v_at[p] / max(voiced_total, 1e-6))
        punct = bool(re.search(r"[,.;:?!…—]$", spoken[k - 1]))
        if punct and d <= 0.18:
            return 1.0 + min(e - s, 0.6) - 3 * d
        if not punct and d <= 0.05 and e - s >= 0.2:
            return 0.3 + min(e - s, 0.6) - 3 * d
        return None

    P = len(pauses)
    NEG = -1e9
    dp = [[0.0] * (nb + 1) for _ in range(P + 1)]  # dp[i][k]: first i pauses, boundaries < k
    choice = [[None] * (nb + 1) for _ in range(P + 1)]
    for i in range(1, P + 1):
        for k in range(1, nb + 1):
            best, how = dp[i - 1][k], "skip_pause"
            if dp[i][k - 1] > best:
                best, how = dp[i][k - 1], "skip_bound"
            if k < nb:
                sc = score(i - 1, k)
                if sc is not None and dp[i - 1][k - 1] + sc > best:  # boundary k used once
                    best, how = dp[i - 1][k - 1] + sc, "match"
            dp[i][k], choice[i][k] = best, how
    matches, i, k = [], P, nb
    while i > 0 and k > 0:
        how = choice[i][k]
        if how == "match":
            matches.append((k, i - 1)); i -= 1; k -= 1
        elif how == "skip_bound":
            k -= 1
        else:
            i -= 1
    anchors = [(0, 0.0, 0.0)]  # (boundary index, real time voice resumes, voiced time)
    for k, p in sorted(matches):
        anchors.append((k, pauses[p][1], v_at[p]))
    anchors.append((nb, dur, voiced_total))

    # S[k] = when spoken word k starts, E[k] = when it ends; between anchors the
    # speech segment is shared by phoneme count
    nsp = len(spoken)
    S, E = np.zeros(nsp), np.zeros(nsp)
    pause_start = {round(e, 6): s for s, e in pauses}
    for (b0, r0, _), (b1, r1, _) in zip(anchors, anchors[1:]):
        seg_end = dur if b1 == nsp else pause_start.get(round(r1, 6), r1)
        span_ph = (cum[b1] - cum[b0]) or 1
        for k in range(b0, b1):
            S[k] = r0 + (seg_end - r0) * (cum[k] - cum[b0]) / span_ph
            E[k] = r0 + (seg_end - r0) * (cum[k + 1] - cum[b0]) / span_ph

    def at(x, is_end):  # fractional spoken-word position -> seconds
        if is_end and x == int(x):
            return E[int(x) - 1] if x > 0 else 0.0
        k = min(int(x), nsp - 1)
        return S[k] + (E[k] - S[k]) * (x - k)

    out = []
    for w, sp in zip(display, _spoken_spans(display, spoken)):
        if sp is None:  # shown but not spoken: appear together with the previous word
            t = out[-1]["t1"] if out else t0
            out.append({"w": w, "t0": t, "t1": t})
            continue
        a, z = at(sp[0], False), at(sp[1], True)
        out.append({"w": w, "t0": round(t0 + a, 3), "t1": round(t0 + max(a, z), 3)})
    return out
