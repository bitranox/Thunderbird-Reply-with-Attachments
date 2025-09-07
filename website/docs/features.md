---
id: features
title: Features
sidebar_label: Features
---

## Features

- Automatically attaches files from the original email when replying.
- Configurable behavior: attachments can be
  - added automatically, or
  - added only after confirmation (a small, accessible dialog). In Options you
    can enable the confirmation and choose the default answer (Yes/No).
- Blacklist of filenames (glob patterns) prevents specific files from being
  attached automatically. Examples: `*intern*`, `*secret*`, `*passwor*`.
  Matching is case‑insensitive and checks the filename only; provide one pattern
  per line in Options.
- Blacklist warning (optional, enabled by default): when files are excluded by your
  blacklist, a small modal lists the file and the matching pattern(s). Dark‑mode
  friendly and keyboard accessible (Enter/Esc to close).
- Adds originals even if you already attached something yourself; avoids duplicates by filename.
- Skips SMIME certificates and inline images to avoid unnecessary attachments.
