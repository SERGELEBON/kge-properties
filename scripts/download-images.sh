#!/bin/bash
# Downloads all site images via wsrv.nl proxy with retries
IMG_DIR=/tmp/siteclone/images
mkdir -p "$IMG_DIR"
LIST=/tmp/siteclone/image-list.txt

download_one() {
  local url="$1" rel="$2"
  local out="$IMG_DIR/$rel"
  [ -s "$out" ] && { echo "SKIP $rel"; return 0; }
  mkdir -p "$(dirname "$out")"
  local ext="${rel##*.}"
  local params=""
  case "$ext" in
    jpg|jpeg) params="&q=92" ;;
    png) params="&output=png" ;;
    webp) params="&output=webp&q=92" ;;
    gif) params="&n=-1" ;;
    *) params="&q=92" ;;
  esac
  local enc=$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "$url")
  for i in 1 2 3 4; do
    local code=$(curl -s --max-time 60 -o "$out" -w "%{http_code}" "https://wsrv.nl/?url=${enc}${params}")
    if [ "$code" = "200" ] && [ -s "$out" ]; then
      # validate it's an image
      local t=$(file -b "$out" | head -c 20)
      case "$t" in
        *JPEG*|*PNG*|*WebP*|*GIF*|*bitmap*) echo "OK   $rel ($t)"; return 0 ;;
      esac
    fi
    sleep 1
  done
  echo "FAIL $rel"
  rm -f "$out"
  return 1
}

export -f download_one
export IMG_DIR

# process tab-separated list
tail -n +1 "$LIST" | awk -F'\t' '{print $1"\t"$2}' | \
  xargs -P 10 -L 1 -I{} bash -c 'IFS=$'"'"'\t'"'"' read -r u r <<< "{}"; download_one "$u" "$r"' 2>&1 | grep -E "FAIL|SKIP" | head -80

echo "=== DONE ==="
echo "Total files:"
find "$IMG_DIR" -type f | wc -l
