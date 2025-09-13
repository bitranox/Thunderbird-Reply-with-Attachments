#!/usr/bin/env bash
set -euo pipefail

# Offline-safe link check for the built Docusaurus site.
# - Builds the site into ../tmp_linkcheck_web_pages
# - Scans all generated index.html files
# - Extracts <a href="…"> values and validates that internal targets exist on disk
# - Skips external (http/https), protocol-less (//), mailto:, and pure-fragment (#...) links
# - Treats /Thunderbird-Reply-with-Attachments/ as a base prefix to strip when resolving
#
# Usage: make web_build_linkcheck OPTS="--locales en|all" (or set BUILD_LOCALES)

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SITE_DIR="$REPO_ROOT/website"
OUT_DIR="$REPO_ROOT/tmp_linkcheck_web_pages"
BASE_PREFIX="/Thunderbird-Reply-with-Attachments"

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
node ./scripts/build-favicon.mjs
set -o pipefail
node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build "${locale_args[@]}" --out-dir "../$(basename "$OUT_DIR")" | node ../scripts/stream-collapse-locales.mjs
cd "$REPO_ROOT"

# Offline HTML scan (no JS). Extract <a href> and verify internal paths exist.
scanned=0
broken=0
set +e

mapfile -t HTMLS < <(find "$OUT_DIR" -type f -name index.html | sort)
for f in "${HTMLS[@]}"; do
  mapfile -t HREFS < <( { grep -oE '<a [^>]*href="[^"]+"' "$f" || true; } | sed -E 's/.*href="([^"]+)".*/\1/') || true
  for href in "${HREFS[@]}"; do
    ((scanned++))
    # Skip external and pure fragment links
    if [[ "$href" =~ ^https?:// || "$href" =~ ^// || "$href" =~ ^mailto: || "$href" == \#* ]]; then
      continue
    fi

    local_path="$href"
    if [[ "$local_path" == /* ]]; then
      # Strip GH Pages base prefix if present
      local_path="${local_path#"$BASE_PREFIX"}"
      target="$OUT_DIR$local_path"
    else
      dname="$(dirname "$f")"
      target="$dname/$local_path"
    fi

    # Drop fragment and query
    target_nohash="${target%%#*}"
    target_nohash="${target_nohash%%\?*}"

    # Directory or trailing slash → index.html
    if [[ -d "$target_nohash" || "$target_nohash" == */ ]]; then
      target_nohash="$target_nohash/index.html"
    fi

    # No extension → index.html
    base="${target_nohash##*/}"
    if [[ "$base" != *.* ]]; then
      target_nohash="$target_nohash/index.html"
    fi

    if [[ ! -e "$target_nohash" ]]; then
      echo "BROKEN: $href  (from $(realpath --relative-to=\"$OUT_DIR\" \"$f\"))" >&2
      ((broken++))
    fi
  done
done

echo "Scanned $scanned link(s); broken: $broken"
rm -rf "$OUT_DIR"
set -e
if [[ $broken -gt 0 ]]; then
  exit 2
fi
