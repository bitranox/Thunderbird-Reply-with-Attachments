#!/usr/bin/env bash
set -euo pipefail

# Usage: scripts/make-web-build-linkcheck.sh [OPTS]
# Recognizes:
#   --locales=en,de   or  --locales en,de   or  --locales "en de"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SITE_DIR="$REPO_ROOT/website"
OUT_DIR="$REPO_ROOT/tmp_linkcheck_web_pages"

# Parse --locales from args if BUILD_LOCALES not provided
LOCALes="${BUILD_LOCALES:-}"
if [[ -z "$LOCALes" ]]; then
  pick_next=0
  for arg in "$@"; do
    if [[ "$pick_next" == 1 ]]; then LOCALes="$arg"; break; fi
    case "$arg" in
      --locales=*) LOCALes="${arg#--locales=}"; break ;;
      --locales) pick_next=1 ;;
    esac
  done
fi

locale_args=()
if [[ -n "$LOCALes" ]]; then
  # Normalize commas → spaces, lowercase, dedupe, and split on whitespace
  _norm="$(echo "$LOCALes" | tr ',' ' ' | tr '[:upper:]' '[:lower:]')"
  read -r -a RAW <<< "$_norm"
  declare -A seen=()
  uniq=()
  for l in "${RAW[@]}"; do
    [[ -z "$l" || "$l" == "all" ]] && continue
    if [[ -z "${seen[$l]+x}" ]]; then uniq+=("$l"); seen[$l]=1; fi
  done
  if [[ ${#uniq[@]} -gt 0 ]]; then
    export BUILD_LOCALES="${uniq[*]}"
    for l in "${uniq[@]}"; do locale_args+=(-l "$l"); done
  fi
fi

rm -rf "$OUT_DIR"
cd "$SITE_DIR"
[[ -d node_modules/@docusaurus ]] || npm ci
node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build "${locale_args[@]}" --out-dir "../$(basename "$OUT_DIR")"
cd "$REPO_ROOT"

# Run linkinator on the built site with URL rewrites for GH Pages baseUrl
node node_modules/linkinator/build/src/cli.js \
  "$OUT_DIR/index.html" \
  --recurse \
  --silent \
  --skip '^https?://|^//|^mailto:' \
  --url-rewrite-search "/Thunderbird-Reply-with-Attachments/" \
  --url-rewrite-replace "/"

# Cleanup on success
rm -rf "$OUT_DIR"
