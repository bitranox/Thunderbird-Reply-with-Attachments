#!/usr/bin/env bash
set -euo pipefail

# === Konfiguration ===
SRC_DIR="${SRC_DIR:-gh-pages-worktree}"   # ggf. per ENV überschreiben
BRANCH="gh-pages"
REMOTE="origin"

# === Repo-Root & Remote ===
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Bitte im Git-Repo ausführen." >&2; exit 1; }
REPO_ROOT="$(git rev-parse --show-toplevel)"
REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"

# === Pfade prüfen ===
SRC_PATH="$(realpath -m "$REPO_ROOT/$SRC_DIR")"
ROOT_PATH="$(realpath -m "$REPO_ROOT")"

echo "Repo-Root: $REPO_ROOT"
echo "SRC_DIR  : $SRC_PATH"

if [ "$SRC_PATH" = "$ROOT_PATH" ]; then
  echo "ABBRUCH: SRC_DIR zeigt auf den Repo-Root. Bitte einen Unterordner angeben!" >&2
  exit 1
fi
[ -d "$SRC_PATH" ] || { echo "Ordner '$SRC_PATH' existiert nicht." >&2; exit 1; }

# Diagnose: Inhalt anzeigen
echo "==> Inhalt von SRC_DIR (Top-Level):"
ls -lah "$SRC_PATH" | sed 's/^/   /'

# Pflicht: index.html
if [ ! -f "$SRC_PATH/index.html" ]; then
  echo "ABBRUCH: '$SRC_PATH/index.html' fehlt – falscher Output-Ordner?" >&2
  exit 1
fi

# === Temp-Repo IM Projektordner (keine Cross-FS-Probleme) ===
TMP_DIR="$REPO_ROOT/.ghpages-tmprepo"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
git -C "$TMP_DIR" init >/dev/null
git -C "$TMP_DIR" remote add origin "$REMOTE_URL"

# Dateien kopieren (inkl. Dotfiles)
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$SRC_PATH"/ "$TMP_DIR"/
else
  cp -a "$SRC_PATH"/. "$TMP_DIR"/
fi
: > "$TMP_DIR/.nojekyll"

# Diagnose: Was ist im Temp-Repo?
echo "==> Dateien, die committet werden (Anzahl): $(find "$TMP_DIR" -type f | wc -l)"
find "$TMP_DIR" -maxdepth 2 -type f | sed 's/^/   /' | head -n 50

# Commit & Push
USER_NAME="$(git -C "$REPO_ROOT" config --get user.name || echo gh-pages)"
USER_EMAIL="$(git -C "$REPO_ROOT" config --get user.email || echo gh-pages@noreply)"

git -C "$TMP_DIR" add -A
git -C "$TMP_DIR" -c user.name="$USER_NAME" -c user.email="$USER_EMAIL" \
  commit -m "Publish $(date -u +'%Y-%m-%d %H:%M:%S') UTC" >/dev/null

echo "==> Push nach $REMOTE/$BRANCH …"
git -C "$TMP_DIR" push -f origin HEAD:"refs/heads/$BRANCH"

echo "==> Fertig. '$SRC_DIR' wurde auf '$BRANCH' veröffentlicht."
