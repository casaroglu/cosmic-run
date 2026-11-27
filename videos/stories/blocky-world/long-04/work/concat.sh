#!/bin/zsh
# concat all scenes -> master (crf 19), upload (crf 23), share (<30 MB, 854 px), contact sheet
cd ~/cizgi/toast-long4; T=I_Waited_13_Years_for_This_Game
rm -f out/list.txt; for s in s0_cold s1_wait s2_launch s3_floor s4_walls s5_girls s6_under s7_home; do echo "file '$PWD/scenes/$s/out/Long4_$s.mp4'" >> out/list.txt; done
ffmpeg -v error -y -f concat -safe 0 -i out/list.txt -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -movflags +faststart out/$T.mp4
ffmpeg -v error -y -i out/$T.mp4 -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart out/${T}_upload.mp4
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/$T.mp4); BR=$(python3 -c "print(int(27.5*8*1024/$D - 96))")
ffmpeg -v error -y -i out/$T.mp4 -vf scale=854:-2 -c:v libx264 -preset slow -b:v ${BR}k -maxrate ${BR}k -bufsize $((BR*2))k -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart out/${T}_share.mp4
ffmpeg -v error -y -i out/$T.mp4 -vf "fps=1/22,scale=384:-2,tile=5x6" -frames:v 1 out/sheet.jpg
ls -la out; echo "duration $D"
