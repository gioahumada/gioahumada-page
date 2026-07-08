#!/usr/bin/env bash
# Optimize media files in public/ for web delivery.
# - Images: resize to max 1200px width (only if currently larger). JPG re-encoded at quality 80 only when oversized.
# - Videos: scale to 720p, CRF 28, AAC 128k (only if currently larger).
# - Replaces files in-place (no copies).
# - Idempotent: skips files already within targets.
#
# Requirements: macOS (uses sips). For video, ffmpeg is auto-installed via Homebrew.

set -euo pipefail

# --- Config ---
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_DIR="${ROOT_DIR}/public"

MAX_IMG_WIDTH=1200
IMG_JPG_QUALITY=80
SKIP_IMG_BYTES_SMALL=20000    # skip tiny images entirely (<20KB)

MAX_VIDEO_HEIGHT=720
VIDEO_CRF=28
VIDEO_AUDIO_BITRATE="128k"

# --- Helpers ---
log()  { printf "\033[1;34m[opt]\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[warn]\033[0m %s\n" "$*" >&2; }
err()  { printf "\033[1;31m[err]\033[0m %s\n" "$*" >&2; }

human() {
  local bytes=$1
  if   [ "$bytes" -ge 1048576 ]; then printf "%.1fM" "$(echo "$bytes/1048576" | bc -l)"
  elif [ "$bytes" -ge 1024 ]; then printf "%.0fK" "$(echo "$bytes/1024" | bc -l)"
  else printf "%dB" "$bytes"
  fi
}

get_img_width() {
  sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth:/{print $2}'
}

# --- Tooling checks ---
ensure_ffmpeg() {
  if command -v ffmpeg >/dev/null 2>&1; then
    return
  fi
  warn "ffmpeg not found. Installing via Homebrew..."
  if ! command -v brew >/dev/null 2>&1; then
    err "Homebrew not found. Install it from https://brew.sh then re-run."
    exit 1
  fi
  brew install ffmpeg
}

ensure_sips() {
  if ! command -v sips >/dev/null 2>&1; then
    err "sips not available (macOS only?). Aborting."
    exit 1
  fi
}

ensure_pngquant() {
  if command -v pngquant >/dev/null 2>&1; then
    return
  fi
  warn "pngquant not found. Installing via Homebrew (much better PNG compression)..."
  if ! command -v brew >/dev/null 2>&1; then
    err "Homebrew not found. Install it from https://brew.sh then re-run."
    exit 1
  fi
  brew install pngquant
}

# --- Image optimization ---
# Rule: only process if width > MAX_IMG_WIDTH.
# For JPG: resize only (sips quality 80 on already-small JPGs can inflate them).
# For PNG: resize only. sips can't lossless-compress PNGs well. If pngquant is available, use it.
optimize_jpg() {
  local file=$1
  local bytes_before size_before width
  bytes_before=$(stat -f%z "$file")

  if [ "$bytes_before" -le "$SKIP_IMG_BYTES_SMALL" ]; then
    return
  fi

  width=$(get_img_width "$file")
  if [ -z "$width" ]; then
    return
  fi

  # Already within target width -> skip (sips re-encoding can inflate small JPGs)
  if [ "$width" -le "$MAX_IMG_WIDTH" ]; then
    return
  fi

  size_before=$(human "$bytes_before")
  sips --resampleHeightWidthMax "$MAX_IMG_WIDTH" \
       -s format jpeg \
       -s formatOptions "$IMG_JPG_QUALITY" \
       "$file" >/dev/null

  local bytes_after
  bytes_after=$(stat -f%z "$file")
  printf "  %s: %s -> %s\n" "$(basename "$file")" "$size_before" "$(human "$bytes_after")"
}

optimize_png() {
  local file=$1
  local bytes_before size_before width
  bytes_before=$(stat -f%z "$file")

  if [ "$bytes_before" -le "$SKIP_IMG_BYTES_SMALL" ]; then
    return
  fi

  width=$(get_img_width "$file")
  if [ -z "$width" ]; then
    return
  fi

  # Already within target width -> skip (sips can't lossless-compress PNGs)
  if [ "$width" -le "$MAX_IMG_WIDTH" ]; then
    return
  fi

  size_before=$(human "$bytes_before")
  sips --resampleHeightWidthMax "$MAX_IMG_WIDTH" "$file" >/dev/null

  local bytes_after
  bytes_after=$(stat -f%z "$file")
  printf "  %s: %s -> %s\n" "$(basename "$file")" "$size_before" "$(human "$bytes_after")"
}

# --- Video optimization ---
optimize_mp4() {
  local file=$1
  local bytes_before size_before height
  bytes_before=$(stat -f%z "$file")

  if [ "$bytes_before" -le "$SKIP_IMG_BYTES_SMALL" ]; then
    return
  fi

  height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$file" 2>/dev/null || echo "")

  if [ -z "$height" ]; then
    warn "  Could not read height of $(basename "$file"), skipping"
    return
  fi

  # Already within target height AND already small -> skip
  if [ "$height" -le "$MAX_VIDEO_HEIGHT" ] && [ "$bytes_before" -le 1000000 ]; then
    return
  fi

  size_before=$(human "$bytes_before")
  local tmp="${file}.opt.mp4"
  ffmpeg -y -loglevel error -i "$file" \
    -vf "scale=-2:${MAX_VIDEO_HEIGHT}" \
    -c:v libx264 -preset medium -crf "$VIDEO_CRF" \
    -c:a aac -b:a "$VIDEO_AUDIO_BITRATE" \
    -movflags +faststart \
    "$tmp"

  mv "$tmp" "$file"

  local bytes_after
  bytes_after=$(stat -f%z "$file")
  printf "  %s: %s -> %s\n" "$(basename "$file")" "$size_before" "$(human "$bytes_after")"
}

# --- Main ---
main() {
  cd "$ROOT_DIR"

  if [ ! -d "$PUBLIC_DIR" ]; then
    err "public/ not found at $PUBLIC_DIR"
    exit 1
  fi

  ensure_sips

  log "Optimizing images (target: <=${MAX_IMG_WIDTH}px wide, JPG q=${IMG_JPG_QUALITY})..."
  while IFS= read -r -d '' file; do
    lower=$(printf '%s' "$file" | tr '[:upper:]' '[:lower:]')
    case "$lower" in
      *.jpg|*.jpeg) optimize_jpg "$file" ;;
      *.png)        optimize_png "$file" ;;
    esac
  done < <(find "$PUBLIC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)

  # Videos need ffmpeg
  local has_videos=0
  while IFS= read -r -d '' _; do has_videos=1; break; done < <(find "$PUBLIC_DIR" -type f -iname "*.mp4" -print0)
  if [ "$has_videos" -eq 1 ]; then
    ensure_ffmpeg
    log "Optimizing videos (target: <=${MAX_VIDEO_HEIGHT}p, CRF=${VIDEO_CRF})..."
    while IFS= read -r -d '' file; do
      optimize_mp4 "$file"
    done < <(find "$PUBLIC_DIR" -type f -iname "*.mp4" -print0)
  else
    log "No .mp4 files found, skipping video optimization."
  fi

  log "Done."
}

main "$@"
