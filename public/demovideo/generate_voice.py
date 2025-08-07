#!/usr/bin/env python3
"""
Generate voiceover MP3 from OpenAI TTS based on a script.
"""

import openai, os, sys

BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR)
SCRIPT_TXT = os.path.join(DATA_DIR, "n60_voiceover_script_no.txt")
OUTPUT_MP3 = os.path.join(DATA_DIR, "n60_voice_no.mp3")

openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    sys.exit("❌  OPENAI_API_KEY not set in environment")

# Load script text
with open(SCRIPT_TXT, "r", encoding="utf-8") as f:
    script_text = f.read()

# Generate audio using OpenAI TTS
response = openai.audio.speech.create(
    model="tts-1",
    voice="nova",
    input=script_text
)

with open(OUTPUT_MP3, "wb") as out:
    out.write(response.content)

print("✅ Voiceover saved →", OUTPUT_MP3)

