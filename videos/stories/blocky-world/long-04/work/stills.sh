#!/bin/zsh
# usage: stills.sh <scene> [pos=0.5]  -> renders one still per shot at fraction pos, then a sheet
S=$1; P=${2:-0.5}; cd ~/cizgi/toast-long4/scenes/$S
FR=$(python3 -c "import json;t=json.load(open('work/timeline.json'));print(','.join(str(int((s['s']+(s['e']-s['s'])*$P)*30)) for s in t['shots']))")
rm -rf stills; ~/cizgi/.venv/bin/python tools/render.py . stills $FR 2>&1 | grep -v "kare ·" | tail -5
~/cizgi/.venv/bin/python - <<PY
import glob
from PIL import Image, ImageDraw
fs=sorted(glob.glob('stills/*.jpg')); c=4; W,H=480,270; r=(len(fs)+c-1)//c
im=Image.new('RGB',(c*W,r*H),'#111'); d=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    x,y=(i%c)*W,(i//c)*H; im.paste(Image.open(f).convert('RGB').resize((W,H)),(x,y)); d.rectangle([x,y,x+60,y+20],fill='#000'); d.text((x+4,y+4),str(i+1),fill='#ff0')
im.save('stills_sheet.jpg',quality=85); print('sheet',len(fs))
PY
