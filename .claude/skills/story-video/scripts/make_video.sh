#!/usr/bin/env bash
# story.json -> OUT_DIR/video.mp4
# usage: make_video.sh STORY.json [OUT_DIR] [--preview 1.5 8 20]
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
STORY="$1"; shift
OUT="${1:-videos/out/$(basename "$(dirname "$STORY")")/$(basename "$STORY" .json)}"
[[ $# -gt 0 && "$1" != --* ]] && shift
mkdir -p "$OUT"

# history episodes: stop early with a download checklist if paintings are missing
if python3 -c "import json,sys; sys.exit(0 if json.load(open('$STORY')).get('images') else 1)"; then
  python3 "$HERE/image_checklist.py" "$STORY" >/dev/null || {
    echo "Missing images - see $(dirname "$STORY")/img/NEEDED.md"; exit 2; }
fi

python3 "$HERE/build_audio.py" "$STORY" "$OUT"
node "$HERE/render.mjs" "$OUT" "$@"

if [[ "${1:-}" != "--preview" ]]; then
  # description / caption file for posting
  python3 - "$STORY" "$OUT" <<'EOF'
import json, sys, os
s = json.load(open(sys.argv[1]))
p = s.get("post", {})
txt = p.get("caption", s.get("title", ""))
tags = " ".join("#" + t.lstrip("#") for t in p.get("hashtags", []))
open(os.path.join(sys.argv[2], "caption.txt"), "w").write(f"{txt}\n\n{tags}\n".strip() + "\n")
EOF
  ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$OUT/video.mp4" | xargs printf "duration: %.1fs\n"
fi
