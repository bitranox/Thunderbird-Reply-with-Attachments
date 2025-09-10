#!/usr/bin/env bash
set -euo pipefail

# Publish website/build to GitHub Pages (gh-pages) using a temporary repo.
# Stages files into tmp_github_web_pages (repo-local), prepares for GH Pages (.nojekyll), and pushes to branch root.
#
# Usage:
#   bash scripts/web-push-github.sh
#   BRANCH=gh-pages REMOTE=origin STAGE_DIR=<repo>/tmp_github_web_pages bash scripts/web-push-github.sh

BRANCH="${BRANCH:-gh-pages}"
REMOTE="${REMOTE:-origin}"

# Resolve repo root and remote URL
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Run inside a Git repository." >&2; exit 1; }
REPO_ROOT="$(git rev-parse --show-toplevel)"
REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"

# Default stage directory inside the repository, unless explicitly overridden
: "${STAGE_DIR:=$REPO_ROOT/tmp_github_web_pages}"

SITE_BUILD="$REPO_ROOT/website/build"

echo "Repo    : $REPO_ROOT"
echo "Remote  : $REMOTE ($REMOTE_URL)"
echo "Source  : $SITE_BUILD"
echo "Stage   : $STAGE_DIR"
echo "Branch  : $BRANCH"

# Preconditions
if [ ! -f "$SITE_BUILD/index.html" ]; then
  echo "website/build/index.html not found. Build site first (e.g., 'make web-build')." >&2
  exit 2
fi

# 1) Stage into tmp_github_web_pages (no fallback by request)
rm -rf "$STAGE_DIR" 2>/dev/null || true
mkdir -p "$STAGE_DIR" 2>/dev/null || {
  echo "ERROR: cannot create $STAGE_DIR. Ensure it is writable (e.g., sudo mkdir -m 777 $STAGE_DIR) and retry." >&2
  exit 10
}
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$SITE_BUILD"/ "$STAGE_DIR"/
else
  cp -a "$SITE_BUILD"/. "$STAGE_DIR"/
fi
: > "$STAGE_DIR/.nojekyll"

echo "==> Staged files (top-level):"
ls -lah "$STAGE_DIR" | sed 's/^/  /'

# 2) Initialize a temporary Git repo directly in STAGE_DIR and push
git -C "$STAGE_DIR" init -b "$BRANCH" >/dev/null 2>&1 || { git -C "$STAGE_DIR" init >/dev/null; git -C "$STAGE_DIR" checkout -b "$BRANCH" >/dev/null; }
# Set or update the remote URL
git -C "$STAGE_DIR" remote add origin "$REMOTE_URL" >/dev/null 2>&1 || git -C "$STAGE_DIR" remote set-url origin "$REMOTE_URL"

# Commit and push
USER_NAME="$(git -C "$REPO_ROOT" config --get user.name || echo gh-pages)"
USER_EMAIL="$(git -C "$REPO_ROOT" config --get user.email || echo gh-pages@noreply)"
git -C "$STAGE_DIR" add -A
git -C "$STAGE_DIR" -c user.name="$USER_NAME" -c user.email="$USER_EMAIL" \
  commit -m "Publish docs (website/build) $(date -u +'%Y-%m-%d %H:%M:%S UTC')" >/dev/null || echo "(nothing to commit)"
echo "==> Pushing to $REMOTE/$BRANCH …"
git -C "$STAGE_DIR" push -f origin HEAD:"refs/heads/$BRANCH"

# 3) Verify remote commit, then clean the temporary .git to leave a plain folder
LOCAL_COMMIT="$(git -C "$STAGE_DIR" rev-parse HEAD 2>/dev/null || echo unknown)"
REMOTE_COMMIT="$(git ls-remote --heads "$REMOTE_URL" "$BRANCH" | awk '{print $1}')"
echo "Local : $LOCAL_COMMIT"
echo "Remote: $REMOTE_COMMIT"
if [ -n "$REMOTE_COMMIT" ] && [ "$REMOTE_COMMIT" = "$LOCAL_COMMIT" ]; then
  echo "==> OK: $REMOTE/$BRANCH updated."
  echo "==> Cleaning up stage directory: $STAGE_DIR"
  rm -rf "$STAGE_DIR/.git" 2>/dev/null || true
  rm -rf "$STAGE_DIR" 2>/dev/null || true
else
  echo "ERROR: Remote commit mismatch or branch missing." >&2
  exit 3
fi
