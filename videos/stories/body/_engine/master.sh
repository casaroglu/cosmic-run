#!/bin/zsh
# master.sh <videoDir> <outDir> <name>: compress mix, thumbnail intro, master/delivery/phone exports
set -e; D=$1; O=$2; N=$3; mkdir -p $O
ffmpeg -loglevel error -y -i $D/audio/mix_raw.wav -af "acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=4.75,alimiter=limit=0.74:attack=2:release=60:level=false" -ar 48000 $D/audio/mix.wav
ffmpeg -loglevel error -y -loop 1 -framerate 30 -t 1.5 -i $D/thumb/thumbnail.jpg -i $D/render/video_silent.mp4 -i $D/audio/mix.wav -filter_complex "[0:v]scale=3840:2160,zoompan=z='1+0.035*on/45':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30,format=yuv420p,setsar=1,settb=1/30[t];[1:v]fps=30,format=yuv420p,setsar=1,settb=1/30[v];[t][v]xfade=transition=fade:duration=0.3:offset=1.2[vv];[2:a]adelay=1200|1200,apad[aa]" -map "[vv]" -map "[aa]" -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a aac -b:a 256k -shortest $O/master.mp4
ffmpeg -loglevel error -y -i $O/master.mp4 -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart $O/$N.mp4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $O/master.mp4); K=$(python3 -c "print(int((27*8*1024*1024/$DUR - 128000)/1000))")
ffmpeg -loglevel error -y -i $O/master.mp4 -vf scale=1280:720 -c:v libx264 -b:v ${K}k -pass 1 -passlogfile /tmp/claude-501/mp -an -f mp4 /dev/null
ffmpeg -loglevel error -y -i $O/master.mp4 -vf scale=1280:720 -c:v libx264 -b:v ${K}k -pass 2 -passlogfile /tmp/claude-501/mp -c:a aac -b:a 128k -movflags +faststart $O/${N}_phone.mp4
cp $D/thumb/thumbnail.jpg $O/thumbnail.jpg; ls -la $O | awk '{print $5, $9}'; echo DUR $DUR
