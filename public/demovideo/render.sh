
#!/usr/bin/env bash
set -e

echo "🎙️ Genererer norsk stemme..."
source ~/n60env/bin/activate

if [[ -f .env ]]; then
  export $(grep -E '^OPENAI_API_KEY=' .env | xargs)
fi

FOLDER="public/demovideo"
SCRIPT_PY="$FOLDER/generate_voice.py"
SUBTITLE_PY="$FOLDER/generate_subtitles.py"
VOICE="$FOLDER/n60_voice_no.mp3"
VIDEO="$FOLDER/demo-n60.mp4"
TEMP_VIDEO="$FOLDER/tmp_med_stemme.mp4"
FINAL_VIDEO="$FOLDER/demo_n60_final.mp4"
SUBTITLES="$FOLDER/n60_subtitles_no.srt"

python3 "$SCRIPT_PY"
python3 "$SUBTITLE_PY"

echo "🎬 Legger til lyd på video..."
ffmpeg -y -i "$VIDEO" -i "$VOICE" \
  -map 0:v -map 1:a -c:v copy -c:a aac -shortest "$TEMP_VIDEO"

echo "💬 Legger til undertekster..."
ffmpeg -y -i "$TEMP_VIDEO" \
  -vf "subtitles=$SUBTITLES:force_style='Fontsize=26,Shadow=1,PrimaryColour=&H00ffffff&'" \
  -c:v libx264 -crf 18 -preset slow -c:a copy "$FINAL_VIDEO"

echo "✅ Ferdig: $FINAL_VIDEO"
