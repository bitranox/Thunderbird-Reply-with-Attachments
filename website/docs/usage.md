---
id: usage
title: Usage
sidebar_label: Usage
---

## Usage

- Reply and the addon adds originals automatically — or asks first, if enabled in Options.
- De‑duplicated by filename; S/MIME and inline images are always skipped.
- Blacklisted attachments are also skipped (case‑insensitive glob patterns matching filenames, not paths). See [Configuration](configuration#blacklist-glob-patterns).

---

## Behavior Details

- Duplicate prevention: The addon marks the compose tab as processed using a per‑tab session value and an in‑memory guard. It won’t add originals twice.
- Closing and reopening a compose window is treated as a new tab (i.e., a new attempt is allowed).
- Respect existing attachments: If the compose already contains some attachments, originals are still added exactly once, skipping filenames that already exist.
- Exclusions: S/MIME artifacts and inline images are ignored. If nothing qualifies on the first pass, a relaxed fallback re-checks non‑S/MIME parts.
  - Filenames: `smime.p7s`
  - MIME types: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline images: any `image/*` part referenced by Content‑ID in the message body
- Blacklist warning (if enabled): When candidates are excluded by your blacklist,
  the addon shows a small modal listing the affected files and the matching
  pattern(s). This warning also appears in cases where no attachments will be
  added because everything was excluded.

---

## Keyboard shortcuts

- Confirmation dialog: Y/J = Yes, N/Esc = No; Tab/Shift+Tab and Arrow keys cycle focus.
  - The “Default answer” in [Configuration](configuration#confirmation) sets the initially focused button.

---

## Limitations

- Forward is not modified by this addon (Reply and Reply all are supported).
- Very large attachments may be subject to Thunderbird or provider limits.
- Encrypted messages: S/MIME parts are intentionally excluded.
