# c02 · Geode → smaller geode (infinite dive)

One cycle is 6 s. Each cycle:
1. A beaded diamond wire saws the stone in two, throwing off dust, and a violet seam opens.
2. The halves slide apart. The small geode inside drops to the floor and bounces twice.
3. The halves turn their banded agate and amethyst faces toward the camera, then glide out of frame.
4. The camera dives 2.5× onto the small geode, so frame(T) == frame(0). Seam SSIM is 0.9996.

- Render the video: `node _engine/render.mjs c02-geode 18`. This writes `render/video_silent.mp4` (3 cycles).
- Make the sound: `~/.cache/kokoro/venv/bin/python c02-geode/audio.py c02-geode 3`. This writes `audio/mix.wav`, a periodic synthesized foley track at −16 LUFS.
- Mux the final video: `ffmpeg -i render/video_silent.mp4 -i audio/mix.wav -c:v copy -c:a aac -b:a 192k -shortest render/video.mp4`
