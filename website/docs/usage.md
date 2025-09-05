---
id: usage
title: Usage
sidebar_label: Usage
---

## Usage
- Reply and the add‑on adds originals automatically — or asks first, if enabled in Options.
- De‑duplicated by filename; SMIME and inline images are always skipped.
- blacklisted attachments are also skipped (not case sensitive, glob patterns)

---

## Behavior Details

- Duplicate prevention: The add-on marks the compose tab as processed using a per‑tab session value and an in‑memory guard. It won’t add originals twice.
- Respect existing attachments: If the compose already contains some attachments, originals are still added exactly once, skipping filenames that already exist.
- Exclusions: SMIME artifacts (e.g. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) and inline images are ignored. If nothing qualifies on the first pass, a relaxed fallback re-checks non‑SMIME parts.
