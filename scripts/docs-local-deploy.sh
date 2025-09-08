#!/usr/bin/env bash
set -euo pipefail

# Build the Docusaurus site and sync it into a local gh-pages worktree.
# Options (via args in any order):
#   --locales en|all     Build only English or all locales (default: all)
#   --no-test            Do not run repo tests before deploy (ignored by default)
#   --no-link-check      Skip offline link check step
#   --dry-run            Perform local deploy only; pushing is handled by Makefile
#
# Typical usage:
#   bash scripts/docs-local-deploy.sh --locales en --no-test --no-link-check

LOCALes="all"
RUN_TESTS=true
RUN_LINK_CHECK=true
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --locales)
      LOCALes="${2:-all}"; shift 2 ;;
    --no-test)
      RUN_TESTS=false; shift ;;
    --no-link-check)
      RUN_LINK_CHECK=false; shift ;;
    --dry-run)
      DRY_RUN=true; shift ;;
    *)
      echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SITE_DIR="$REPO_ROOT/website"
BUILD_DIR="$SITE_DIR/build"
WORKTREE_DIR="$REPO_ROOT/gh-pages-worktree"

echo "==> Docs local deploy"
echo "Repo     : $REPO_ROOT"
echo "Website  : $SITE_DIR"
echo "Build dir: $BUILD_DIR"
echo "Worktree : $WORKTREE_DIR"
echo "Locales  : $LOCALes"
echo "Tests    : $RUN_TESTS"
echo "LinkCheck: $RUN_LINK_CHECK"
echo "Dry run  : $DRY_RUN (push handled by Makefile)"

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

# Build site (optionally single locale)
BUILD_ARGS=()
if [[ "$LOCALes" == "en" ]]; then
  BUILD_ARGS+=("--locale" "en")
fi

echo "==> Building Docusaurus (website) ${BUILD_ARGS[*]} …"
( cd "$SITE_DIR" && node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build "${BUILD_ARGS[@]}" )

# Offline-safe link check unless explicitly disabled.
if $RUN_LINK_CHECK; then
  echo "==> Checking links (offline-safe) …"
  node node_modules/linkinator/build/src/cli.js \
    "$BUILD_DIR/index.html" \
    --recurse \
    --silent \
    --skip 'mailto:|^https?:\\/\\/(?!(localhost|127\\.0\\.0\\.1)([:/]|$))|^\/\/|github\\.com|bitranox\\.github\\.io|addons\\.thunderbird\\.net' \
    --url-rewrite-search "/Thunderbird-Reply-with-Attachments/" \
    --url-rewrite-replace "/"
else
  echo "==> Link check skipped (--no-link-check)"
fi

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

# Sync build -> local gh-pages worktree
echo "==> Syncing build to $WORKTREE_DIR …"
mkdir -p "$WORKTREE_DIR"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$BUILD_DIR"/ "$WORKTREE_DIR"/
else
  # Fallback: slower copy
  ( cd "$BUILD_DIR" && find . -mindepth 1 -maxdepth 1 -print0 | xargs -0 -I{} rm -rf "$WORKTREE_DIR/{}" 2>/dev/null || true )
  cp -a "$BUILD_DIR"/. "$WORKTREE_DIR"/
fi
: > "$WORKTREE_DIR/.nojekyll"

echo "==> Done: Local worktree prepared at $WORKTREE_DIR"
echo "Note: Push using 'make docs-push-github' (separate step)."
