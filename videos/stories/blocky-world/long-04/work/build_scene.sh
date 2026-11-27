#!/bin/zsh
# usage: build_scene.sh <scene> [voice|sound|render|finish|all]
S=$1; STEP=${2:-all}; D=~/cizgi/toast-long4/scenes/$S; cd $D
T=$(python3 -c "print({'s0_cold':'Long4_s0_cold','s1_wait':'Long4_s1_wait','s2_launch':'Long4_s2_launch','s3_floor':'Long4_s3_floor','s4_walls':'Long4_s4_walls','s5_girls':'Long4_s5_girls','s6_under':'Long4_s6_under','s7_home':'Long4_s7_home'}['$S'])")
if [[ $STEP == voice || $STEP == all ]]; then ~/.cache/kokoro/venv/bin/python common/gen_voice.py . 2>&1 | grep -v ctranslate2 | tail -1; fi
if [[ $STEP == sound || $STEP == all || $STEP == voice ]]; then python3 common/sounds.py . && ~/cizgi/.venv/bin/python tools/audio.py . | tail -1 && ~/cizgi/.venv/bin/python common/mix4.py .; fi
if [[ $STEP == render || $STEP == all ]]; then rm -rf frames; ~/cizgi/.venv/bin/python tools/render.py . frames 2>&1 | grep -v sayfa | tail -1; fi
if [[ $STEP == finish || $STEP == all || $STEP == render ]]; then ~/cizgi/.venv/bin/python tools/finish.py . "$T" 2>&1 | tail -4; fi
