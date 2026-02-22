#!/usr/bin/env bash
# shellcheck shell=bash
set -Eeuo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
MAKEFILE_PATH="$ROOT_DIR/Makefile"

if ! command -v whiptail >/dev/null 2>&1; then
  echo "whiptail is required for interactive menu. Falling back to help." >&2
  MENU_SKIP=1 make -s help
  exit 1
fi

# Extract targets and one-line docs from Makefile (same parsing as `make help`)
mapfile -t LINES < <(awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%s\x01%s\n", $1, $2 }' "$MAKEFILE_PATH" | sort -f)

if ((${#LINES[@]} == 0)); then
  whiptail --title "Make Menu" --msgbox "No annotated targets found (missing ## doc comments)." 10 60
  exit 1
fi

# Determine a reasonable size based on terminal; fall back to sane defaults
cols=$(tput cols 2>/dev/null || echo 120)
lines=$(tput lines 2>/dev/null || echo 32)
NITEMS=${#LINES[@]}
# Wider window: up to terminal width (cap 160), min 90
calc_width=$(( cols - 2 ))
(( calc_width < 90 )) && calc_width=90
(( calc_width > 160 )) && calc_width=160
WIDTH=$calc_width
base=$(( 10 + ( NITEMS < 20 ? NITEMS : 20 ) ))
(( base < 22 )) && base=22
calc_height=$base
(( calc_height > lines - 2 )) && calc_height=$(( lines - 2 ))
(( calc_height < 18 )) && calc_height=18
HEIGHT=$calc_height
CHOICE_HEIGHT=$(( HEIGHT - 8 ))
(( CHOICE_HEIGHT > NITEMS )) && CHOICE_HEIGHT=$NITEMS
(( CHOICE_HEIGHT < 8 )) && CHOICE_HEIGHT=8

# Ellipsize helper: squeeze whitespace and trim to max chars
ellipsize() {
  local s="$1" max="$2"
  # collapse spaces and strip newlines
  s="${s//$'\n'/ }"; s="${s//$'\r'/ }"; s="${s//  / }"; s="${s## }"; s="${s%% }"
  local len=${#s}
  if (( len>max )); then
    echo "${s:0:max-1}…"
  else
    echo "$s"
  fi
}

# Build menu items and a map of full descriptions
declare -A FULLDESC
build_items() {
  ITEMS=()
  maxdesc=$(( WIDTH - 36 ))
  (( maxdesc<24 )) && maxdesc=24
  for entry in "${LINES[@]}"; do
    tgt="${entry%%$'\x01'*}"
    desc="${entry#*$'\x01'}"
    [[ -z "$tgt" ]] && continue
    FULLDESC["$tgt"]="$desc"
    ITEMS+=("$tgt" "$(ellipsize "$desc" "$maxdesc")")
  done
}

build_items

DEFAULT_ITEM=""
while :; do
  if [[ -n "$DEFAULT_ITEM" ]]; then
    TARGET=$(whiptail --title "Make Targets" \
      --menu "Select a target — Tab switches buttons" \
      $HEIGHT $WIDTH $CHOICE_HEIGHT \
      --default-item "$DEFAULT_ITEM" \
      "${ITEMS[@]}" \
      3>&1 1>&2 2>&3) || exit 0
  else
    TARGET=$(whiptail --title "Make Targets" \
      --menu "Select a target — Tab switches buttons" \
      $HEIGHT $WIDTH $CHOICE_HEIGHT \
      "${ITEMS[@]}" \
      3>&1 1>&2 2>&3) || exit 0
  fi

  DEFAULT_ITEM="$TARGET"
  helpmsg="${FULLDESC[$TARGET]:-No description available.}"
  helpmsg=$(ellipsize "$helpmsg" 10000) # let whiptail wrap long text
  if whiptail --title "Target: $TARGET" --yesno "$helpmsg\n\nRun this target?" $HEIGHT "$WIDTH"; then
    break
  else
    # User chose No → go back to menu
    continue
  fi
done

target_examples() {
  case "$1" in
    web_build)
      echo "You can limit locales for the docs build.\nExamples:\n  OPTS=\"--locales en\"\n  OPTS=\"--locales en,de\"";
      ;;
    web_build_linkcheck)
      echo "Offline link check supports limiting locales.\nExamples:\n  OPTS=\"--locales en\"\n  OPTS=\"--locales en,de\"";
      ;;
    web_build_local_preview)
      echo "Local preview accepts build options.\nExamples:\n  OPTS=\"--locales en --no-test --no-link-check\"\n  OPTS=\"--locales en,de --dry-run\"";
      ;;
    translation_web_index|translate_web_index)
      echo "Translate website UI strings.\nExamples:\n  OPTS=\"--locales de,fr\"\n  OPTS=\"--locales de,fr --force\"";
      ;;
    translation_app|translate_app)
      echo "Translate app UI strings.\nExamples:\n  OPTS=\"--locales all\"\n  OPTS=\"--locales de,fr\"";
      ;;
    translate_web_docs_batch|translate_web_docs_sync)
      echo "Translate docs via Batch/Sync.\nFlags supported:\n  OPTS=\"--files development.md --locales lt\"\n  OPTS=\"--files changelog.md,features.md --locales de,fr\"\nLegacy positional also works:\n  OPTS=\"development.md de,fr\" or OPTS=\"all de,fr\"";
      ;;
    *)
      echo "Common args:\n  NPM=pnpm   (use pnpm instead of npm)\n  VAR=value  (set env overrides)";
      ;;
  esac
}

default_args() {
  case "$1" in
    web_build) echo 'OPTS="--locales en"' ;;
    web_build_linkcheck) echo 'OPTS="--locales en"' ;;
    web_build_local_preview) echo 'OPTS="--locales en --no-test --no-link-check"' ;;
    translation_web_index|translate_web_index) echo 'OPTS="--locales de,fr"' ;;
    translation_app|translate_app) echo 'OPTS="--locales all"' ;;
    translate_web_docs_batch|translate_web_docs_sync) echo 'OPTS="--files development.md --locales lt"' ;;
    *) echo '' ;;
  esac
}

# Optional arguments prompt with per-target hints
ARGS=""
EXAMPLES_MSG=$(target_examples "$TARGET")
DEFAULT_INPUT=$(default_args "$TARGET")
if whiptail --title "Additional Args for: $TARGET" --yesno "Do you want to pass additional make arguments?\n\n$EXAMPLES_MSG" 14 "$WIDTH"; then
  ARGS=$(whiptail --title "Additional Args" --inputbox "Enter additional arguments (optional):" 10 "$WIDTH" "$DEFAULT_INPUT" 3>&1 1>&2 2>&3) || true
fi

cd "$ROOT_DIR"
# Run the selected target and then return to the menu top
set +e
rc=0
if [[ -n "$ARGS" ]]; then
  echo "==> Running: make $TARGET $ARGS" >&2
  bash -lc "MENU_SKIP=1 make --no-print-directory $TARGET $ARGS"
  rc=$?
else
  echo "==> Running: make $TARGET" >&2
  MENU_SKIP=1 make --no-print-directory "$TARGET"
  rc=$?
fi
set -e
if [[ $rc -eq 0 ]]; then
  whiptail --title "Success" --msgbox "Target \"$TARGET\" finished successfully.\n\nPress OK to return to the menu." 10 "$WIDTH"
  exec bash "$ROOT_DIR/scripts/make-menu.sh"
else
  whiptail --title "Failed" --msgbox "Target \"$TARGET\" exited with code $rc.\n\nExiting." 10 "$WIDTH"
  exit "$rc"
fi
