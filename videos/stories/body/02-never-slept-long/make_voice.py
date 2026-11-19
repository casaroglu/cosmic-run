# narration.json -> audio/voice.wav + audio/words.json (word times from faster-whisper)
import json, os, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
D = os.path.dirname(os.path.abspath(__file__)); N = json.load(open(os.path.join(D, 'narration.json')))
M = os.path.expanduser('~/.cache/kokoro')
k = Kokoro(os.path.join(M, 'kokoro-v1.0.onnx'), os.path.join(M, 'voices-v1.0.bin'))
sr = 24000; out = []; lines = []; t = 0.35
out.append(np.zeros(int(0.35 * sr), np.float32))
for i, L in enumerate(N['lines']):
    if i: g = L.get('gap_before', N['gap']); out.append(np.zeros(int(g * sr), np.float32)); t += g
    s, r = k.create(L.get('say', L['text']), voice=N['voice'], speed=N['speed'], lang='en-gb'); assert r == sr
    s = s.astype(np.float32)
    nz = np.where(np.abs(s) > 0.01)[0]; s = s[max(0, nz[0] - 240): nz[-1] + 1200]   # trim lead/tail silence
    lines.append({'id': L['id'], 'text': L['text'], 'start': round(t, 3), 'end': round(t + len(s) / sr, 3)})
    out.append(s); t += len(s) / sr
out.append(np.zeros(int(1.2 * sr), np.float32))
wav = np.concatenate(out); sf.write(os.path.join(D, 'audio/voice.wav'), wav, sr)
from faster_whisper import WhisperModel
m = WhisperModel('base.en', device='cpu', compute_type='int8')
import subprocess
a16 = np.frombuffer(subprocess.check_output(['ffmpeg','-loglevel','error','-i',os.path.join(D,'audio/voice.wav'),'-ac','1','-ar','16000','-f','f32le','-']), np.float32)
segs, _ = m.transcribe(a16, word_timestamps=True, language='en')
words = [{'w': w.word.strip(), 's': round(w.start, 3), 'e': round(w.end, 3)} for sg in segs for w in sg.words]
json.dump({'duration': round(len(wav) / sr, 3), 'lines': lines, 'words': words}, open(os.path.join(D, 'audio/words.json'), 'w'), indent=1)
print('duration', round(len(wav) / sr, 2), 'words', len(words))
for L in lines: print(L['id'], L['start'], L['end'])
