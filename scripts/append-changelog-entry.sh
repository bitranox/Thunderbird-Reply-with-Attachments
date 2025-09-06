#!/usr/bin/env bash
set -euo pipefail

# Append a brief summary of staged changes to CHANGELOG.md under the Unreleased section.
# The summary includes date, branch, shortstat, and the list of staged files.

CHANGELOG_FILE="CHANGELOG.md"

if [[ ! -f "$CHANGELOG_FILE" ]]; then
  echo "CHANGELOG.md not found; skipping changelog update." >&2
  exit 0
fi

# If nothing is staged, exit quietly
if git diff --cached --quiet; then
  echo "No staged changes; nothing to add to changelog." >&2
  exit 0
fi

date_str=$(date +"%Y-%m-%d %H:%M")
branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
shortstat=$(git diff --cached --shortstat || true)
files=$(git diff --cached --name-only | sed 's/^/- /')

tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

awk -v ds="$date_str" -v br="$branch" -v ss="$shortstat" -v files="$files" '
  BEGIN{printed=0}
  {
    print $0
    if (!printed && $0 ~ /^## \[Unreleased\]/) {
      print ""
      print "### Auto Update (" ds ")"
      if (ss != "") print "- Summary: " ss
      print "- Branch: " br
      if (files != "") {
        print "- Files:"
        n = split(files, arr, "\n");
        for (i=1; i<=n; i++) if (length(arr[i])>0) print "  " arr[i]
      }
      print ""
      printed=1
    }
  }
' "$CHANGELOG_FILE" > "$tmpfile"

mv "$tmpfile" "$CHANGELOG_FILE"
echo "CHANGELOG.md updated with auto summary." >&2

