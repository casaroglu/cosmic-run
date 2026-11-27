#!/bin/zsh
cd ~/cizgi/voice-lab
for s in s7_home s0_cold s3_floor s4_walls s5_girls s6_under; do
  ~/.cache/chatterbox/venv/bin/python cb_lines.py ~/cizgi/toast-long4/scenes/$s/work/cb_in.json ~/cizgi/toast-long4/scenes/$s/work/cb
  echo "== $s done"
done
