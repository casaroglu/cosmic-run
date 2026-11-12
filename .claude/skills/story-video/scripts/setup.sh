#!/usr/bin/env bash
# One-time setup: Kokoro TTS (free, local) + model files, Playwright Chromium, ffmpeg check.
set -euo pipefail
DIR="${KOKORO_DIR:-$HOME/.cache/kokoro}"
mkdir -p "$DIR"
BASE=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
for f in kokoro-v1.0.onnx voices-v1.0.bin; do
  [[ -s "$DIR/$f" ]] || curl -fL -o "$DIR/$f" "$BASE/$f"
done
# TTS deps go in a private venv (Homebrew/Debian Pythons refuse system-wide pip installs; PEP 668).
# Prefer an older Python: onnxruntime wheels lag behind the newest release.
if ! python3 -c "import kokoro_onnx, soundfile, numpy" 2>/dev/null && [[ ! -x "$DIR/venv/bin/python" ]]; then
  PY=python3
  for v in 3.13 3.12 3.11 3.10; do command -v "python$v" >/dev/null && { PY="python$v"; break; }; done
  "$PY" -m venv "$DIR/venv"
  "$DIR/venv/bin/python" -m pip install -q --upgrade pip
  "$DIR/venv/bin/python" -m pip install -q kokoro-onnx soundfile numpy
fi
command -v ffmpeg >/dev/null || { echo "ffmpeg missing: install it (brew install ffmpeg / apt-get install ffmpeg)"; exit 1; }
if ! node -e "require('playwright')" 2>/dev/null; then
  HERE="$(cd "$(dirname "$0")" && pwd)"
  (cd "$HERE" && npm i --no-save playwright && npx playwright install chromium)
fi
echo "story-video ready"
