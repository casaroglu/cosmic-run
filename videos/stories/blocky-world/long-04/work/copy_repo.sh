#!/bin/zsh
# copy sources (no frames/wav/mp4 except _share) to the repo folder
R=~/cosmic-run/videos/stories/blocky-world/long-04; L=~/cizgi/toast-long4; mkdir -p $R/common $R/work
cp $L/common/*.js $L/common/*.py $R/common/
cp $L/work/*.sh $L/work/*.py $R/work/
for s in s0_cold s1_wait s2_launch s3_floor s4_walls s5_girls s6_under s7_home thumb; do mkdir -p $R/$s/work; cp $L/scenes/$s/story.js $R/$s/; [ -f $L/scenes/$s/sound.json ] && cp $L/scenes/$s/sound.json $R/$s/; for f in lines.json dur.json timeline.json segments.json words.json cues.json cb_in.json; do [ -f $L/scenes/$s/work/$f ] && cp $L/scenes/$s/work/$f $R/$s/work/; done; done
cp $L/out/I_Waited_13_Years_for_This_Game_share.mp4 $R/ 2>/dev/null; cp $L/out/sheet.jpg $R/contact_sheet.jpg 2>/dev/null
cp $L/scenes/thumb/stills/f00000.jpg $R/long04_thumbnail_1280x720.jpg
du -sh $R; ls $R
