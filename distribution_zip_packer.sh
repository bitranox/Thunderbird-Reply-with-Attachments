#!/usr/bin/env bash

# Function to clean up temporary manifest.json
cleanup() {
  if [ -f ./sources/manifest.json ]; then
    echo "Cleaning up temporary file './sources/manifest.json'..."
    rm -f ./sources/manifest.json
  fi
  echo "Cleanup function triggered."  # Log when cleanup is executed for better traceability
}

# Trap to ensure cleanup is called on EXIT, including errors or interruptions
trap cleanup EXIT

# pack zip files for distribution

# Check if the manifest files exist
manifest_files=("./sources/manifest_ATN.json" "./sources/manifest_PRIVATE.json")
for file in "${manifest_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "ERROR: File '$file' not found!" >&2
    exit 1
  fi
done

# Extract version numbers from the manifest files
extract_version() {
  local file=$1
  local ver=""
  if command -v jq >/dev/null 2>&1; then
    ver=$(jq -r '.version // empty' "$file") || ver=""
  fi
  if [ -z "$ver" ]; then
    # Fallback to grep/sed if jq is unavailable
    ver=$(grep -o '"version"\s*:\s*"[^\"]\+"' "$file" | sed 's/.*"version"\s*:\s*"\(.*\)"/\1/')
  fi
  if [ -z "$ver" ]; then
    echo "ERROR: Could not extract version from '$file'!" >&2
    exit 1
  fi
  printf '%s\n' "$ver"
}
plugin_version_number_ATN=$(extract_version "./sources/manifest_ATN.json")
plugin_version_number_PRIVATE=$(extract_version "./sources/manifest_PRIVATE.json")

# Validate version format
echo "Validating version format..."
if [[ ! $plugin_version_number_ATN =~ ^[0-9]+\.[0-9]+\.[0-9]+$ || ! $plugin_version_number_PRIVATE =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "ERROR: Version numbers must follow the format 'X.Y.Z'!" >&2
  exit 1
fi

# Output the extracted version numbers
echo "Manifest ATN Version is    : ${plugin_version_number_ATN}"
echo "Manifest PRIVATE Version is: ${plugin_version_number_PRIVATE}"

# Check if the version numbers are the same
if [ "${plugin_version_number_ATN}" != "${plugin_version_number_PRIVATE}" ]; then
  echo "ERROR: Version Numbers are not the same!" >&2
  exit 1
fi

echo "Version numbers match. Proceeding with distribution packaging..."

# track created files
created_files=()

# Function to create ZIP file
create_zip() {
  local manifest_source=$1
  local zip_target=$2
  local allow_ts_fallback=${3:-false} # when true, prefix timestamp on failure
  local force_timestamp=${4:-false}   # when true, always prefix timestamp (PRIVATE build)

  echo "Creating ZIP file '$zip_target' with '$manifest_source' as manifest..."

  # Check if manifest source exists
  if [ ! -f "$manifest_source" ]; then
    echo "ERROR: Manifest source file '$manifest_source' does not exist!" >&2
    exit 1
  fi

  # Copy manifest to manifest.json
  cp -f "$manifest_source" ./sources/manifest.json || {
    echo "ERROR: Failed to copy '$manifest_source' to 'manifest.json'!" >&2
    exit 1
  }

  # Determine final output name (timestamped if requested)
  if [ "$force_timestamp" = true ]; then
    ts_prefix=$(date +%F_%H-%M-%S)
    zip_target="${ts_prefix}_$(basename "$zip_target")"
  elif [ -f "$zip_target" ]; then
    echo "Removing existing ZIP file '$zip_target'..."
    if ! rm -f "$zip_target"; then
      if [ "$allow_ts_fallback" = true ]; then
        # Keep original, switch to timestamped file name
        local ts_prefix
        ts_prefix=$(date +%F_%H-%M-%S)
        echo "WARN: Unable to remove '$zip_target'. Will write to timestamped file instead." >&2
        zip_target="${ts_prefix}_$(basename "$zip_target")"
      else
        echo "WARN: rm failed; attempting rename fallback..." >&2
        ts=$(date +%s)
        if ! mv -f "$zip_target" "$zip_target.$ts.old"; then
          echo "ERROR: Unable to remove or rename existing ZIP ('$zip_target'). File may be locked." >&2
          exit 1
        fi
      fi
    fi
  fi

  # Create the ZIP file excluding specific files
  (
    cd ./sources || exit 1
    zip -r "../$zip_target" . \
      -x './manifest_ATN.json' './manifest_PRIVATE.json' './README.md' '*_bak*'
  ) || {
    if [ "$allow_ts_fallback" = true ]; then
      # Try once more with a timestamped file name if not already timestamped
      case "$zip_target" in
        [0-9][0-9][0-9][0-9]-* ) ;; # already timestamped prefix
        * )
          local ts_prefix
          ts_prefix=$(date +%F_%H-%M-%S)
          local ts_name="${ts_prefix}_$(basename "$zip_target")"
          echo "WARN: Initial ZIP failed. Retrying as '$ts_name'." >&2
          (
            cd ./sources || exit 1
            zip -r "../$ts_name" . \
              -x './manifest_ATN.json' './manifest_PRIVATE.json' './README.md' '*_bak*'
          ) || { echo "ERROR: Failed to create ZIP file '$ts_name'!" >&2; exit 1; }
          zip_target="$ts_name"
        ;;
      esac
    else
      echo "ERROR: Failed to create ZIP file '$zip_target'!" >&2
      exit 1
    fi
  }

  # Verify the ZIP was created
  if [ ! -f "$zip_target" ]; then
    echo "ERROR: ZIP file '$zip_target' was not created as expected!" >&2
    exit 1
  fi

  echo "ZIP file '$zip_target' created successfully."
  # record created file
  created_files+=("$zip_target")
}

# Create ZIP files
create_zip "./sources/manifest_ATN.json" "reply-with-attachments-plugin.zip" false false
create_zip "./sources/manifest_PRIVATE.json" "reply-with-attachments-plugin-PRIVATE.zip" true true

# Print concise output filenames
echo
echo "Build artifacts:"
if [ ${#created_files[@]} -ge 1 ]; then
  echo "  ATN     : ${created_files[0]}"
fi
if [ ${#created_files[@]} -ge 2 ]; then
  echo "  PRIVATE : ${created_files[1]}"
fi

# Cleanup is automatically triggered on exit
