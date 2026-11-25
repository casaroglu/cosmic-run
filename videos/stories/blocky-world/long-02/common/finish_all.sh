set -e
B=~/cizgi/toast-long2/scenes; OUT=~/cizgi/toast-long2/out; mkdir -p $OUT; : > $OUT/list.txt
for s in s0_cold s1_home s2_cape s3_cube s4_turbo s5_home sE_end; do
  cd $B/$s; have=$(ls frames | wc -l | tr -d ' '); need=$(python3 -I -c "import json,math;print(math.ceil(json.load(open('work/timeline.json'))['total']*30))")
  if [ "$need" -gt "$have" ]; then ~/cizgi/.venv/bin/python tools/render.py . frames $have-$((need-1)) 2>&1 | tail -1; fi
  rm -f out/*.mp4; ~/cizgi/.venv/bin/python tools/finish.py . "Long2 $s" 2>&1 | sed -n 2,2p
  ffmpeg -y -loglevel error -i "out/Long2_$s.mp4" -vf scale=1280:-2 -c:v libx264 -b:v 1600k -c:a aac -b:a 112k out/small.mp4
  echo "file '$B/$s/out/Long2_$s.mp4'" >> $OUT/list.txt; echo "DONE $s $have->$need"
done
ffmpeg -y -loglevel error -f concat -safe 0 -i $OUT/list.txt -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$OUT/We_Joined_the_WRONG_Servers.mp4"
ffmpeg -y -loglevel error -i "$OUT/We_Joined_the_WRONG_Servers.mp4" -vf scale=1280:-2 -c:v libx264 -b:v 1100k -c:a aac -b:a 96k "$OUT/We_Joined_the_WRONG_Servers_720p.mp4"
ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/We_Joined_the_WRONG_Servers.mp4"; ls -la $OUT; echo ALLDONE
