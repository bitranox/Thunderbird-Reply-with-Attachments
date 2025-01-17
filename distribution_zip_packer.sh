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
  grep -o '"version":\s*"[^"]\+"' "$file" | sed 's/.*"version":\s*"\(.*\)"/\1/' || {
    echo "ERROR: Could not extract version from '$file'!" >&2
    exit 1
  }
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

# Function to create ZIP file
create_zip() {
  local manifest_source=$1
  local zip_target=$2

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

  # Remove existing ZIP file if it exists
  [ -f "$zip_target" ] && {
    echo "Removing existing ZIP file '$zip_target'..."
    rm "$zip_target" || {
      echo "ERROR: Failed to remove existing ZIP file!" >&2
      exit 1
    }
  }

  # Create the ZIP file excluding specific files
  (
    cd ./sources || exit 1
    zip -r "../$zip_target" . \
      -x './manifest_ATN.json' './manifest_PRIVATE.json' './README.md'
  ) || {
    echo "ERROR: Failed to create ZIP file '$zip_target'!" >&2
    exit 1
  }

  echo "ZIP file '$zip_target' created successfully."
}

# Create ZIP files
create_zip "./sources/manifest_ATN.json" "reply-with-attachments-plugin.zip"
create_zip "./sources/manifest_PRIVATE.json" "reply-with-attachments-plugin-PRIVATE.zip"

# Cleanup is automatically triggered on exit
