#!/usr/bin/env bash
set -e

echo "🎙️ Generating voiceover..."

# Activate virtual environment
source "$(dirname "$0")/venv/bin/activate"

# Load .env file and export OpenAI API key
if [[ -f .env ]]; then
  export $(grep -E '^OPENAI_API_KEY=' .env | xargs)
fi

# Define paths
DATA_DIR="public/demovideo"
SCRIPT_PY="$DATA_DIR/generate_voice.py"
SCRIPT_TXT="$DATA_DIR/n60_voiceover_script_reordered.txt"
VOICE_MP3="$DATA_DIR/n60_voice.mp3"
VIDEO_IN="$DATA_DIR/demo-n60.mov"  # ✅ updated extension
VIDEO_TEMP="$DATA_DIR/tmp_with_voice.mp4"
VIDEO_OUT="$DATA_DIR/demo_n60_final.mp4"
SUBTITLES="$DATA_DIR/n60_synced_subtitles.srt"

# Check required files
[[ -f "$SCRIPT_PY" ]] || { echo "❌ Missing: $SCRIPT_PY"; exit 1; }
[[ -f "$SCRIPT_TXT" ]] || { echo "❌ Missing: $SCRIPT_TXT"; exit 1; }
[[ -f "$VIDEO_IN" ]] || { echo "❌ Missing: $VIDEO_IN"; exit 1; }
[[ -f "$SUBTITLES" ]] || { echo "❌ Missing: $SUBTITLES"; exit 1; }

# Run voice generation Python script
python3 "$SCRIPT_PY"

echo "🎬 Merging audio with video..."
ffmpeg -y -i "$VIDEO_IN" -i "$VOICE_MP3" \
  -map 0:v -map 1:a -c:v copy -c:a aac -shortest "$VIDEO_TEMP"

echo "💬 Burning subtitles..."
ffmpeg -y -i "$VIDEO_TEMP" \
  -vf "subtitles=$SUBTITLES:force_style='Fontsize=26,Shadow=1,PrimaryColour=&H00ffffff&'" \
  -c:v libx264 -crf 18 -preset slow -c:a copy "$VIDEO_OUT"

echo "✅ Done: $VIDEO_OUT"

