#!/usr/bin/env bash
# Instagram copy (<10 MB, HEVC 2-pass) + cover (frame at the end of the title line) for Ottoman episodes.
# usage: make_ig.sh 01 02 03 ...   (folders under videos/out/ottoman)
set -euo pipefail
cd "$(dirname "$0")/../../.."
SCR=${TMPDIR:-/tmp}/ig2pass; mkdir -p "$SCR" videos/out/ottoman/_ig
for o in "$@"; do
  V=videos/out/ottoman/$o/video.mp4; OUT=videos/out/ottoman/_ig/ottoman_$o.mp4
  d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$V")
  kb=$(python3 -c "print(int((9.3*8*1024*1024/$d - 96000)/1000))")
  ffmpeg -loglevel error -y -i "$V" -c:v libx265 -b:v ${kb}k -x265-params pass=1:stats=$SCR/$o.log:log-level=error -preset medium -tag:v hvc1 -an -f mp4 /dev/null
  ffmpeg -loglevel error -y -i "$V" -c:v libx265 -b:v ${kb}k -x265-params pass=2:stats=$SCR/$o.log:log-level=error -preset medium -tag:v hvc1 -c:a aac -b:a 96k -movflags +faststart "$OUT"
  t=$(python3 -c "import json;b=json.load(open('videos/out/ottoman/$o/timeline.json'))['beats'][0];print(max(0.5,b['end']-0.3))")
  ffmpeg -loglevel error -y -ss "$t" -i "$V" -frames:v 1 -q:v 3 "videos/out/ottoman/_ig/ottoman_${o}_cover.jpg"
  echo "$o $(du -k "$OUT" | cut -f1) KB, cover at ${t}s"
done
