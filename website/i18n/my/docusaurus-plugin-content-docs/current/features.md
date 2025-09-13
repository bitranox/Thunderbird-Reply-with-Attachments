---
id: features
title: 'လက္каွေ့များ'
sidebar_label: 'လက္каွေ့များ'
---

## Features {#features}

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
- Works with Reply and Reply all. Forward is not modified by this add-on.
- Adds originals even if you already attached something yourself; avoids duplicates by filename.
- Per‑tab duplicate guard prevents double‑adding in the same compose tab.
- Skips S/MIME certificates and inline images to avoid unnecessary attachments.

## How It Works {#how-it-works}

- On reply, the add-on lists original attachments.
- Filters out S/MIME signatures and inline images.
- Optionally asks for confirmation (keyboard-friendly).
- Adds eligible files to your compose, avoiding duplicates by filename.
- See “Why attachments might not be added” in Usage for edge cases.

Privacy note: All processing happens locally in Thunderbird. The add-on makes no background network requests.
