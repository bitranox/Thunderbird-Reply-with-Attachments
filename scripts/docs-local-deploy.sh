#!/usr/bin/env bash
set -euo pipefail

# docs-local-deploy.sh — Build the Docusaurus site locally and deploy to gh-pages.
#
# Requirements:
#   - git, rsync, bash
#   - Node.js (>=20) + npm
#   - npx (bundled with npm)
#   - Repo Pages settings set to "Deploy from a branch" → branch: gh-pages, folder: / (root)
#
# Usage examples:
#   scripts/docs-local-deploy.sh                   # tests, build all locales, link-check, push to origin gh-pages
#   scripts/docs-local-deploy.sh --locales en      # faster: build only English
#   scripts/docs-local-deploy.sh --no-test         # skip repo tests (useful for quick docs iterations)
#   scripts/docs-local-deploy.sh --no-link-check   # skip linkinator step
#   scripts/docs-local-deploy.sh --branch gh-pages --remote origin
#   scripts/docs-local-deploy.sh --dry-run         # build + link-check, no push
#
# Options:
#   --locales <en|all>   : Build only en or all locales (default: all)
#   --no-test            : Skip make test at repo root (default: run tests)
#   --no-link-check      : Skip link checking (default: run)
#   --branch <name>      : Target branch (default: gh-pages)
#   --remote <name>      : Remote name (default: origin)
#   --dry-run            : Do not push to remote

LOCALES=all
RUN_TESTS=1
LINK_CHECK=1
BRANCH=gh-pages
REMOTE=origin
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --locales) LOCALES="${2:-all}"; shift 2;;
    --no-test) RUN_TESTS=0; shift;;
    --no-link-check) LINK_CHECK=0; shift;;
    --branch) BRANCH="${2:-gh-pages}"; shift 2;;
    --remote) REMOTE="${2:-origin}"; shift 2;;
    --dry-run) DRY_RUN=1; shift;;
    -h|--help)
      sed -n '1,80p' "$0" | sed -n '1,60p'; exit 0;;
    *) echo "Unknown option: $1"; exit 2;;
  esac
done

echo "▶ Building docs (locales: ${LOCALES})"

if [[ $RUN_TESTS -eq 1 ]]; then
  echo "✔ Running repo tests (make test)…"
  make test
fi

echo "✔ Installing website deps…"
pushd website >/dev/null
# Prefer reproducible install; fall back to npm install if lock is out-of-sync
npm ci || npm install

# Use the local Docusaurus binary directly to avoid PATH/.bin issues
DOCUSAURUS_CMD="node ./node_modules/@docusaurus/core/bin/docusaurus.mjs"
if [[ ! -f ./node_modules/@docusaurus/core/bin/docusaurus.mjs ]]; then
  echo "✖ Docusaurus binary not found in node_modules. Did npm ci succeed?" >&2
  exit 127
fi

if [[ "$LOCALES" == "en" ]]; then
  echo "✔ Building Docusaurus (en)…"
  $DOCUSAURUS_CMD build --locale en
else
  echo "✔ Building Docusaurus (all locales)…"
  $DOCUSAURUS_CMD build
fi

popd >/dev/null

if [[ $LINK_CHECK -eq 1 ]]; then
  echo "✔ Running link check…"
  set +e
  CLI=""
  if [[ -f node_modules/linkinator/build/src/cli.js ]]; then
    CLI="node node_modules/linkinator/build/src/cli.js"
  elif [[ -f website/node_modules/linkinator/build/src/cli.js ]]; then
    CLI="node website/node_modules/linkinator/build/src/cli.js"
  else
    CLI="npx --yes linkinator"
  fi
  # shellcheck disable=SC2086
  $CLI \
    "website/build/index.html" \
    --recurse \
    --silent \
    --skip "mailto:|^https?:\\/\\\/(?!(localhost|127\\.0\\.0\\.1)([:/]|$))|^\\/\\/|github\\.com|raw\\.githubusercontent\\.com|bitranox\\.github\\.io|addons\\.thunderbird\\.net" \
    --url-rewrite-search "/Thunderbird-Reply-with-Attachments/" \
    --url-rewrite-replace "/"
  STATUS=$?
  set -e
  if [[ $STATUS -ne 0 ]]; then
    echo "⚠ Link check reported issues (exit $STATUS). Continuing…"
  fi
fi

if [[ $DRY_RUN -eq 1 ]]; then
  echo "⏭ Dry-run: skipping deploy (build available in website/build)"
  exit 0
fi

echo "✔ Preparing gh-pages target (branch: ${BRANCH}, remote: ${REMOTE})…"

WT_DIR="gh-pages-worktree"
REMOTE_URL=$(git remote get-url "$REMOTE" 2>/dev/null || true)
# Detect if the remote branch exists (0 = exists, non-zero = missing)
set +e
git ls-remote --heads "$REMOTE" "$BRANCH" >/dev/null 2>&1
HAS_REMOTE_BRANCH=$?
set -e
git fetch "$REMOTE" "$BRANCH" || true
# Try worktree first
set +e
git worktree remove -f "$WT_DIR" 1>/dev/null 2>&1
git worktree prune 1>/dev/null 2>&1
rm -rf "$WT_DIR" 1>/dev/null 2>&1
git worktree add -B "$BRANCH" "$WT_DIR" "${REMOTE}/${BRANCH}" 1>/dev/null 2>&1
WT_STATUS=$?
set -e
if [[ $WT_STATUS -ne 0 ]]; then
  # Fallback to a shallow clone of gh-pages
  echo "⚠ worktree failed (status $WT_STATUS). Falling back to shallow clone…"
  if [[ -z "$REMOTE_URL" ]]; then
    echo "✖ Remote '$REMOTE' has no URL; cannot clone for fallback." >&2
    exit 128
  fi
  rm -rf "$WT_DIR" || true
  git clone --depth 1 --branch "$BRANCH" --single-branch "$REMOTE_URL" "$WT_DIR" 2>/dev/null || {
    git clone "$REMOTE_URL" "$WT_DIR"
    (cd "$WT_DIR" && git checkout -B "$BRANCH")
  }
fi

echo "✔ Publishing build to gh-pages…"

# Ensure target worktree/clone is on the correct branch and up-to-date; then clean
pushd "$WT_DIR" >/dev/null
git fetch "$REMOTE" "$BRANCH" >/dev/null 2>&1 || true
if [[ $HAS_REMOTE_BRANCH -eq 0 ]]; then
  git checkout -B "$BRANCH" "$REMOTE/$BRANCH" >/dev/null 2>&1 || git checkout -B "$BRANCH" >/dev/null 2>&1 || true
  git reset --hard "$REMOTE/$BRANCH" >/dev/null 2>&1 || true
else
  git checkout --orphan "$BRANCH" >/dev/null 2>&1 || true
  # Ensure HEAD points to the new branch explicitly
  git symbolic-ref -q HEAD "refs/heads/$BRANCH" >/dev/null 2>&1 || true
fi
git rm -rf . >/dev/null 2>&1 || true
git clean -fdx >/dev/null 2>&1 || true
popd >/dev/null

# Copy fresh build
rsync -a --delete website/build/ "$WT_DIR"/
touch "$WT_DIR"/.nojekyll

pushd "$WT_DIR" >/dev/null
git add -A
if git diff --cached --quiet; then
  echo "No changes to publish." 
else
  TS=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
  git commit -m "docs: publish site (${LOCALES}) at ${TS}"
  if [[ $HAS_REMOTE_BRANCH -eq 0 ]]; then
    git push --force-with-lease "$REMOTE" "HEAD:$BRANCH"
  else
    git push -u "$REMOTE" "HEAD:$BRANCH"
  fi
  echo "✔ Deployed to $REMOTE/$BRANCH"
fi
popd >/dev/null

echo "Done."
