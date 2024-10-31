
mkdir -p public/videos/compressed
for file in public/videos/*.mp4; do
    ffmpeg -i "$file" -vf "scale=720:-1" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "public/videos/compressed/$(basename "$file")"
done