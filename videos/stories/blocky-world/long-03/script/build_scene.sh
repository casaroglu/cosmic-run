#!/bin/zsh
# full build of one scene: voice (pick + gen) -> sound -> frames -> finish.  usage: build_scene.sh <scene> [skipvoice]
set -e
S=$1; P=~/cizgi/toast-long3/scenes/$S; cd $P
if [[ "$2" != "skipvoice" ]]; then
  [[ "$2" != "skippick" ]] && ls work/cb/cand_* >/dev/null 2>&1 && ~/.cache/kokoro/venv/bin/python common/pick.py $P | tail -2
  ~/.cache/kokoro/venv/bin/python common/gen_voice.py $P | tail -1
fi
~/cizgi/.venv/bin/python ../../script/make_sound.py $S
~/cizgi/.venv/bin/python tools/audio.py . | tail -1
~/cizgi/.venv/bin/python common/mix_scene.py .
rm -rf frames; mkdir frames
~/cizgi/.venv/bin/python tools/render.py . frames | tail -2
~/cizgi/.venv/bin/python tools/finish.py . "Long3_$S" | tail -4
