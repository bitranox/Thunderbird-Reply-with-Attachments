#!/usr/bin/env bash
set -euo pipefail

# ==== Konfiguration ====
SRC_DIR="gh-pages-worktree"   # Dein Output-Verzeichnis
REMOTE="origin"
BRANCH="gh-pages"

# ==== Repo-Root ermitteln ====
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Bitte im Git-Repository ausführen." >&2; exit 1; }
REPO_ROOT="$(git rev-parse --show-toplevel)"

# Checks
[ -d "$REPO_ROOT/$SRC_DIR" ] || { echo "Ordner '$SRC_DIR' nicht gefunden." >&2; exit 1; }
[ -n "$(ls -A "$REPO_ROOT/$SRC_DIR" 2>/dev/null)" ] || { echo "'$SRC_DIR' ist leer." >&2; exit 1; }

REMOTE_URL="$(git -C "$REPO_ROOT" remote get-url "$REMOTE")"
USER_NAME="$(git -C "$REPO_ROOT" config --get user.name || echo gh-pages)"
USER_EMAIL="$(git -C "$REPO_ROOT" config --get user.email || echo gh-pages@noreply)"

# ==== Aufräumen alter Worktree-Einträge (falls vorher abgebrochen) ====
git -C "$REPO_ROOT" worktree prune >/dev/null 2>&1 || true

# ==== Worktree AUSSERHALB von .git anlegen ====
WT_DIR="$REPO_ROOT/.ghpages-publish-tmp"
rm -rf "$WT_DIR"
git -C "$REPO_ROOT" worktree add --detach "$WT_DIR" >/dev/null

cleanup() {
  git -C "$REPO_ROOT" worktree remove --force "$WT_DIR" >/dev/null 2>&1 || true
  rm -rf "$WT_DIR" 2>/dev/null || true
}
trap cleanup EXIT

# ==== Orphan-Branch im Worktree ====
git -C "$WT_DIR" switch --orphan __ghpages_publish_tmp__ >/dev/null

# WT-Inhalt leeren (alles außer .git) und frische Dateien hinein
find "$WT_DIR" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
rsync -a --delete "$REPO_ROOT/$SRC_DIR"/ "$WT_DIR"/

# Commit bauen
git -C "$WT_DIR" add -A
git -C "$WT_DIR" -c user.name="$USER_NAME" -c user.email="$USER_EMAIL" \
  commit -m "Publish $(date -u +'%Y-%m-%d %H:%M:%S') UTC" >/dev/null

# Info-Ausgabe
if git ls-remote --heads "$REMOTE_URL" "$BRANCH" | grep -q "$BRANCH"; then
  echo "==> Aktualisiere bestehenden Branch '$BRANCH' …"
else
  echo "==> Erstelle neuen Branch '$BRANCH' …"
fi

# Push (neu anlegen oder ersetzen – für Pages ok)
git -C "$WT_DIR" remote add origin "$REMOTE_URL" 2>/dev/null || true
git -C "$WT_DIR" push --force-with-lease origin HEAD:"refs/heads/$BRANCH"

echo "==> Fertig. '$SRC_DIR' ist jetzt auf '$BRANCH' veröffentlicht."
