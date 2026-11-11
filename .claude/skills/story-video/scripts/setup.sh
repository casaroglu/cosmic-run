#!/usr/bin/env bash
# One-time setup: Kokoro TTS (free, local) + model files, Playwright Chromium, ffmpeg check.
set -euo pipefail
DIR="${KOKORO_DIR:-$HOME/.cache/kokoro}"
mkdir -p "$DIR"
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
for f in kokoro-v1.0.onnx voices-v1.0.bin; do
  [[ -s "$DIR/$f" ]] || curl -fL -o "$DIR/$f" "$BASE/$f"
done
python3 -c "import kokoro_onnx, soundfile, numpy" 2>/dev/null || pip install kokoro-onnx soundfile numpy
command -v ffmpeg >/dev/null || { echo "ffmpeg missing: install it (brew install ffmpeg / apt-get install ffmpeg)"; exit 1; }
if ! node -e "require('playwright')" 2>/dev/null; then
  HERE="$(cd "$(dirname "$0")" && pwd)"
  (cd "$HERE" && npm i --no-save playwright && npx playwright install chromium)
fi
echo "story-video ready"
