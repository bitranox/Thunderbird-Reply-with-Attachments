#!/usr/bin/env bash
set -euo pipefail

# Build the Docusaurus site and sync it into a local gh-pages worktree.
# Options (via args in any order):
#   --locales en|all     Build only English or all locales (default: all)
#   --no-test            Do not run repo tests before deploy (ignored by default)
#   --no-link-check      Skip offline link check step
#   --dry-run            Perform local deploy only; pushing is handled by Makefile
#   --no-serve           Do not start a local web server after preparing the preview
#
# Typical usage:
#   bash scripts/web-build-local-preview.sh --locales en --no-test --no-link-check

LOCALes="all"
RUN_TESTS=true
# Default: run link-check, but never fail the preview build on link errors
RUN_LINK_CHECK=true
DRY_RUN=false
SERVE=true

while [[ $# -gt 0 ]]; do
  case "$1" in
    --locales)
      LOCALes="${2:-all}"; shift 2 ;;
    --no-test)
      RUN_TESTS=false; shift ;;
    --no-link-check)
      RUN_LINK_CHECK=false; shift ;;
    --link-check)
      RUN_LINK_CHECK=true; shift ;;
    --dry-run)
      DRY_RUN=true; shift ;;
    --no-serve)
      SERVE=false; shift ;;
    *)
      echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SITE_DIR="$REPO_ROOT/website"
BUILD_DIR="$SITE_DIR/build"
WORKTREE_DIR="$REPO_ROOT/web-local-preview"
PREVIEW_SUBDIR="Thunderbird-Reply-with-Attachments"
TARGET_DIR="$WORKTREE_DIR/$PREVIEW_SUBDIR"

echo "==> Docs local deploy"
echo "Repo     : $REPO_ROOT"
echo "Website  : $SITE_DIR"
echo "Build dir: $BUILD_DIR"
echo "Preview  : $WORKTREE_DIR (served root)"
echo "Target   : $TARGET_DIR (site baseUrl)"
echo "Locales  : $LOCALes"
echo "Tests    : $RUN_TESTS"
echo "LinkCheck: $RUN_LINK_CHECK"
echo "Dry run  : $DRY_RUN (push handled by Makefile)"
echo "Serve    : $SERVE"

# Detect configured locales from docusaurus.config.js and present i18n folders
CFG_LOCALES=$(awk '/const I18N_LOCALES = \[/{flag=1;next} /\];/{flag=0} flag{ while (match($0, /\x27([^\x27]+)\x27/, m)) { print m[1]; $0=substr($0, RSTART+RLENGTH) } }' "$SITE_DIR/docusaurus.config.js" | sort -u)
I18N_DIRS=$(find "$SITE_DIR/i18n" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' 2>/dev/null | sort -u || true)

echo "Config locales (from docusaurus.config.js):"
echo "$CFG_LOCALES" | sed 's/^/  - /'
if [[ -n "$I18N_DIRS" ]]; then
  echo "Existing i18n folders (website/i18n/*):"
  echo "$I18N_DIRS" | sed 's/^/  - /'
else
  echo "Existing i18n folders: (none)"
fi

# Warn about mismatches (informational only)
CFG_NOT_PRESENT=$(comm -23 <(echo "$CFG_LOCALES") <(printf "%s\n" $I18N_DIRS 2>/dev/null || true) | sed '/^en$/d' || true)
PRESENT_NOT_CFG=$(comm -13 <(echo "$CFG_LOCALES") <(printf "%s\n" $I18N_DIRS 2>/dev/null || true) || true)
if [[ -n "$CFG_NOT_PRESENT" ]]; then
  echo "Note: Configured locales without i18n folder (fallbacks to EN content):"
  echo "$CFG_NOT_PRESENT" | sed 's/^/  - /'
fi
if [[ -n "$PRESENT_NOT_CFG" ]]; then
  echo "Warning: i18n folders not listed in config (won't be built unless added to config):"
  echo "$PRESENT_NOT_CFG" | sed 's/^/  - /'
fi

# Optional: run tests (fast pre-flight). Users can skip with --no-test.
if $RUN_TESTS; then
  echo "==> Running docs pre-checks (Prettier/ESLint/Vitest)…"
  make -s test
fi

# Ensure Docusaurus deps exist without always reinstalling.
if [[ ! -d "$SITE_DIR/node_modules/@docusaurus" ]]; then
  echo "==> Installing website dependencies (npm ci)…"
  ( cd "$SITE_DIR" && npm ci )
else
  echo "==> Using existing website/node_modules"
fi

# Build site (optionally selected locales)
# Support: --locales all|en|de,en|de fr etc. Always include 'en' when a list is provided.
BUILD_ARGS=()
if [[ "$LOCALes" != "all" ]]; then
  IFS=',' read -r -a rawLocales <<< "$LOCALes"
  # Also split on spaces if user used space-separated list
  if [[ ${#rawLocales[@]} -eq 1 && "$LOCALes" == *' '* ]]; then
    read -r -a rawLocales <<< "$LOCALes"
  fi
  # normalize + ensure 'en' present
  uniqLocales=()
  declare -A seen
  add_locale() {
    local loc="$1"
    [[ -z "$loc" ]] && return
    # lowercase normalize
    loc="${loc,,}"
    # skip 'all'
    [[ "$loc" == "all" ]] && return
    if [[ -z "${seen[$loc]+x}" ]]; then
      uniqLocales+=("$loc")
      seen[$loc]=1
    fi
  }
  for loc in "${rawLocales[@]}"; do add_locale "$loc"; done
  BUILD_ARGS=()
  for loc in "${uniqLocales[@]}"; do
    BUILD_ARGS+=("-l" "$loc")
  done
  export BUILD_LOCALES="${uniqLocales[*]}"
fi

echo "==> Building Docusaurus (website) ${BUILD_ARGS[*]} …"
( cd "$SITE_DIR" && node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build "${BUILD_ARGS[@]}" )

# Verify that built locales exist (root for defaultLocale, subfolders for others)
if [[ "$LOCALes" == "en" ]]; then
  [[ -f "$BUILD_DIR/index.html" ]] || { echo "Build missing index.html for 'en'" >&2; exit 1; }
else
  # Default locale (en) at root
  [[ -f "$BUILD_DIR/index.html" ]] || { echo "Build missing root index.html (default locale)" >&2; exit 1; }
  # Non-default locales should have subfolder index
  while read -r loc; do
    [[ "$loc" == "en" || -z "$loc" ]] && continue
    if [[ ! -f "$BUILD_DIR/$loc/index.html" ]]; then
      echo "Warning: missing build for locale '$loc' at $BUILD_DIR/$loc/index.html" >&2
    fi
  done <<< "$(echo "$CFG_LOCALES")"
fi

# Sync build -> local preview directory that mirrors the GH Pages baseUrl
echo "==> Syncing build to $TARGET_DIR …"
mkdir -p "$TARGET_DIR"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$BUILD_DIR"/ "$TARGET_DIR"/
else
  ( cd "$BUILD_DIR" && find . -mindepth 1 -maxdepth 1 -print0 | xargs -0 -I{} rm -rf "$TARGET_DIR/{}" 2>/dev/null || true )
  cp -a "$BUILD_DIR"/. "$TARGET_DIR"/
fi
: > "$WORKTREE_DIR/.nojekyll"

cat > "$WORKTREE_DIR/index.html" <<REDIR
<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./$PREVIEW_SUBDIR/">
<link rel="canonical" href="./$PREVIEW_SUBDIR/">
<title>Redirecting…</title>
<p>Redirecting to <a href="./$PREVIEW_SUBDIR/">$PREVIEW_SUBDIR</a>…</p>
REDIR

echo "==> Done: Local preview prepared at $WORKTREE_DIR"

# Start a lightweight local server unless disabled
if $SERVE; then
  # Try Node preview server first (supports /__stop), fallback to python http.server
  PORT=8080
  MAX=8090
  STARTED=false
  while [ $PORT -le $MAX ]; do
    if command -v node >/dev/null 2>&1; then
      (
        ROOT="$WORKTREE_DIR" PORT=$PORT node scripts/preview-server.mjs >/dev/null 2>&1 &
        PID=$!
        echo "$PID" >"$WORKTREE_DIR/.server.pid"
      ) || true
    else
      (
        python3 -m http.server -d "$WORKTREE_DIR" $PORT >/dev/null 2>&1 &
        PID=$!
        echo "$PID" >"$WORKTREE_DIR/.server.pid"
      ) || true
    fi
    sleep 1
    if curl -sSf "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
      STARTED=true
      break
    else
      if [ -f "$WORKTREE_DIR/.server.pid" ]; then
        kill "$(cat "$WORKTREE_DIR/.server.pid" 2>/dev/null)" >/dev/null 2>&1 || true
        rm -f "$WORKTREE_DIR/.server.pid"
      fi
      PORT=$((PORT+1))
    fi
  done
  if $STARTED; then
    PID_VAL=$(cat "$WORKTREE_DIR/.server.pid" 2>/dev/null || echo unknown)
    echo "[INFO] Local server started"
    echo "    URL:  http://localhost:$PORT/$PREVIEW_SUBDIR/"
    echo "    PID:  $PID_VAL"
    if command -v node >/dev/null 2>&1; then
      echo "    Stop: http://localhost:$PORT/__stop (or: kill $PID_VAL)"
    else
      echo "    Stop: kill $PID_VAL"
    fi
  else
    echo "WARN: Could not start local web server automatically."
    echo "You can serve manually: cd \"$WORKTREE_DIR\" && python3 -m http.server -d . 8080"
  fi
fi

echo
echo "Tip: start a new webserver with: cd \"$WORKTREE_DIR\" && python3 -m http.server -d . 8080"
echo "Note: Push using 'make web-push-github' (separate step)."

# Offline-safe link check unless explicitly disabled (run after server starts; non-blocking)
if $RUN_LINK_CHECK; then
  echo "==> Checking links (offline-safe; non-blocking) …"
  # Prefer checking against the local preview server for accurate baseUrl handling
  START_URL="http://127.0.0.1:${PORT}/${PREVIEW_SUBDIR}/index.html"
  if node node_modules/linkinator/build/src/cli.js \
    "$START_URL" \
    --recurse \
    --silent \
    --skip 'mailto:|^https?:\\/\\/(?!(localhost|127\\.0\\.0\\.1)([:/]|$))|^\/\/|github\\.com|bitranox\\.github\\.io|addons\\.thunderbird\\.net'; then
    echo "==> Link check passed"
  else
    echo "WARN: Link check reported broken links. Preview will still start."
  fi
else
  echo "==> Link check skipped (--no-link-check)"
fi
