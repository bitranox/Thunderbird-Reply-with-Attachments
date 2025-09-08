#!/usr/bin/env bash
set -euo pipefail

# === Konfiguration ===
SRC_DIR="${SRC_DIR:-gh-pages-worktree}"  # per ENV überschreibbar: SRC_DIR=website/dist ./publish-gh-pages.sh
BRANCH="${BRANCH:-gh-pages}"
REMOTE="${REMOTE:-origin}"

# === Repo-Root ermitteln ===
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Bitte im Git-Repository ausführen." >&2; exit 1; }
REPO_ROOT="$(git rev-parse --show-toplevel)"
REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"

# === Pfade & Basiskontrollen ===
SRC_PATH="$(realpath -m "$REPO_ROOT/$SRC_DIR")"
ROOT_PATH="$(realpath -m "$REPO_ROOT")"

echo "Repo-Root: $REPO_ROOT"
echo "SRC_DIR  : $SRC_PATH"

# Nicht versehentlich den Repo-Root veröffentlichen
if [ "$SRC_PATH" = "$ROOT_PATH" ]; then
  echo "ABBRUCH: SRC_DIR zeigt auf den Repo-Root. Bitte einen Unterordner angeben!" >&2
  exit 1
fi

[ -d "$SRC_PATH" ] || { echo "Ordner '$SRC_PATH' existiert nicht." >&2; exit 1; }
[ -n "$(ls -A "$SRC_PATH" 2>/dev/null)" ] || { echo "Ordner '$SRC_PATH' ist leer." >&2; exit 1; }
[ -f "$SRC_PATH/index.html" ] || { echo "'$SRC_PATH/index.html' fehlt – falscher Output-Ordner?" >&2; exit 1; }

echo "==> Inhalt von SRC_DIR (Top-Level):"
ls -lah "$SRC_PATH" | sed 's/^/   /'

# === Temporäres Repo im Projektordner (keine Cross-FS-Probleme) ===
TMP_DIR="$REPO_ROOT/.ghpages-tmprepo"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"
trap 'rm -rf "$TMP_DIR"' EXIT

git -C "$TMP_DIR" init >/dev/null
git -C "$TMP_DIR" remote add origin "$REMOTE_URL"

# Dateien kopieren (inkl. Dotfiles) + .nojekyll
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$SRC_PATH"/ "$TMP_DIR"/
else
  cp -a "$SRC_PATH"/. "$TMP_DIR"/
fi
: > "$TMP_DIR/.nojekyll"

echo "==> Dateien, die committet werden (Anzahl): $(find "$TMP_DIR" -type f | wc -l)"
# Mit 'set -o pipefail' kann ein frühzeitiger Abbruch durch 'head' SIGPIPE (141) erzeugen.
# Anzeige ist rein informativ – Fehler der Pipeline daher ignorieren.
find "$TMP_DIR" -maxdepth 2 -type f | sed 's/^/   /' | head -n 50 || true

# Commit bauen
USER_NAME="$(git -C "$REPO_ROOT" config --get user.name || echo gh-pages)"
USER_EMAIL="$(git -C "$REPO_ROOT" config --get user.email || echo gh-pages@noreply)"

git -C "$TMP_DIR" add -A
git -C "$TMP_DIR" -c user.name="$USER_NAME" -c user.email="$USER_EMAIL" \
  commit -m "Publish $(date -u +'%Y-%m-%d %H:%M:%S') UTC" >/dev/null

# Push hart (hier ist --force-with-lease nicht sinnvoll)
NEW_COMMIT="$(git -C "$TMP_DIR" rev-parse HEAD)"
echo "==> Push nach $REMOTE/$BRANCH …"
git -C "$TMP_DIR" push -f origin HEAD:"refs/heads/$BRANCH"

# Verifikation
REMOTE_COMMIT="$(git ls-remote --heads "$REMOTE_URL" "$BRANCH" | awk '{print $1}')"
echo "Local : $NEW_COMMIT"
echo "Remote: $REMOTE_COMMIT"

if [ "$NEW_COMMIT" = "$REMOTE_COMMIT" ] && [ -n "$REMOTE_COMMIT" ]; then
  echo "==> OK: $REMOTE/$BRANCH zeigt auf den veröffentlichten Commit."
  echo "Hinweis: In GitHub oben links auf den Branch 'gh-pages' umschalten, um die Dateien zu sehen."
else
  echo "FEHLER: Remote-Commit stimmt nicht überein oder Branch existiert nicht. Bitte Branch-Protection/Policies prüfen." >&2
  exit 1
fi
