#!/usr/bin/env bash
set -euo pipefail

# === Konfiguration ===
SRC_DIR="${SRC_DIR:-gh-pages-worktree}"   # per ENV überschreibbar
BRANCH="gh-pages"
REMOTE="origin"

# === Repo-Root ermitteln ===
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Bitte im Git-Repository ausführen." >&2; exit 1; }
REPO_ROOT="$(git rev-parse --show-toplevel)"

# === Checks ===
SRC_PATH="$(realpath -m "$REPO_ROOT/$SRC_DIR")"
ROOT_PATH="$(realpath -m "$REPO_ROOT")"

# darf NICHT der Repo-Root sein
if [ "$SRC_PATH" = "$ROOT_PATH" ]; then
  echo "ABBRUCH: SRC_DIR zeigt auf den Repo-Root. Bitte einen Unterordner angeben!" >&2
  exit 1
fi

[ -d "$SRC_PATH" ] || { echo "Ordner '$SRC_PATH' existiert nicht." >&2; exit 1; }
[ -f "$SRC_PATH/index.html" ] || { echo "'$SRC_PATH/index.html' fehlt – falscher Output-Ordner?" >&2; exit 1; }

REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"
USER_NAME="$(git -C "$REPO_ROOT" config --get user.name || echo gh-pages)"
USER_EMAIL="$(git -C "$REPO_ROOT" config --get user.email || echo gh-pages@noreply)"

# === temporäres Repo IM Projektordner (kein /tmp, keine Worktrees) ===
TMP_DIR="$REPO_ROOT/.ghpages-tmprepo"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
git -C "$TMP_DIR" init >/dev/null
git -C "$TMP_DIR" remote add origin "$REMOTE_URL"

# Inhalt kopieren (nur SRC_DIR) und .nojekyll setzen
rsync -a --delete "$SRC_PATH"/ "$TMP_DIR"/
: > "$TMP_DIR/.nojekyll"

# Commit & Push
git -C "$TMP_DIR" add -A
git -C "$TMP_DIR" -c user.name="$USER_NAME" -c user.email="$USER_EMAIL" \
  commit -m "Publish $(date -u +'%Y-%m-%d %H:%M:%S') UTC" >/dev/null

echo "==> Push nach $REMOTE/$BRANCH …"
git -C "$TMP_DIR" push --force-with-lease origin HEAD:"refs/heads/$BRANCH"

echo "==> Fertig. Inhalt von '$SRC_DIR' wurde auf '$BRANCH' veröffentlicht."
