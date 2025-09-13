---
id: usage
title: 'ব্যবহাৰ'
sidebar_label: 'ব্যৱহাৰ'
---

## Usage {#usage}

- Reply and the add-on adds originals automatically — or asks first, if enabled in Options.
- De‑duplicated by filename; S/MIME and inline images are always skipped.
- Blacklisted attachments are also skipped (case‑insensitive glob patterns matching filenames, not paths). See [Configuration](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Detect reply → list original attachments → filter S/MIME + inline → optional confirm → add eligible files (skip duplicates).

Strict vs. relaxed pass: The add‑on first excludes S/MIME and inline parts. If nothing qualifies, it runs a relaxed pass that still excludes S/MIME/inline but tolerates more cases (see Code Details).

| Part type                                         |  Strict pass | Relaxed pass |
| ------------------------------------------------- | -----------: | -----------: |
| S/MIME signature file `smime.p7s`                 |     Excluded |     Excluded |
| S/MIME MIME types (`application/pkcs7-*`)         |     Excluded |     Excluded |
| Inline image referenced by Content‑ID (`image/*`) |     Excluded |     Excluded |
| Attached email (`message/rfc822`) with a filename |    Not added | May be added |
| Regular file attachment with a filename           | May be added | May be added |

Example: Some attachments might lack certain headers but are still regular files (not inline/S/MIME). If the strict pass finds none, the relaxed pass may accept those and attach them.

---

### Cross‑reference {#cross-reference}

- Forward is not modified by design (see Limitations below).
- For reasons an attachment might not be added, see “Why attachments might not be added”.

---

## Behavior Details {#behavior-details}

- **Duplicate prevention:** The add-on marks the compose tab as processed using a per‑tab session value and an in‑memory guard. It won’t add originals twice.
- Closing and reopening a compose window is treated as a new tab (i.e., a new attempt is allowed).
- **Respect existing attachments:** If the compose already contains some attachments, originals are still added exactly once, skipping filenames that already exist.
- **Exclusions:** S/MIME artifacts and inline images are ignored. If nothing qualifies on the first pass, a relaxed fallback re-checks non‑S/MIME parts.
  - **Filenames:** `smime.p7s`
  - **MIME types:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline images:** any `image/*` part referenced by Content‑ID in the message body
  - **Attached emails (`message/rfc822`):** treated as regular attachments if they have a filename; they may be added (subject to duplicate checks and blacklist).
- **Blacklist warning (if enabled):** When candidates are excluded by your blacklist,
  the add-on shows a small modal listing the affected files and the matching
  pattern(s). This warning also appears in cases where no attachments will be
  added because everything was excluded.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Confirmation dialog: Y/J = Yes, N/Esc = No; Tab/Shift+Tab and Arrow keys cycle focus.
  - The “Default answer” in [Configuration](configuration#confirmation) sets the initially focused button.
  - Enter triggers the focused button. Tab/Shift+Tab and arrows move focus for accessibility.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                         |
| --------------- | ------------------------------ |
| Y / J           | Confirm Yes                    |
| N / Esc         | Confirm No                     |
| Enter           | Activate focused button        |
| Tab / Shift+Tab | Move focus forward/back        |
| Arrow keys      | Move focus between buttons     |
| Default answer  | Sets initial focus (Yes or No) |

---

## Limitations {#limitations}

- Forward is not modified by this add-on (Reply and Reply all are supported).
- Very large attachments may be subject to Thunderbird or provider limits.
  - The add‑on does not chunk or compress files; it relies on Thunderbird’s normal attachment handling.
- Encrypted messages: S/MIME parts are intentionally excluded.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline images are ignored: parts referenced via Content‑ID in the message body are not added as files.
- S/MIME signature parts are excluded by design: filenames like `smime.p7s` and MIME types such as `application/pkcs7-signature` or `application/pkcs7-mime` are skipped.
- Blacklist patterns can filter candidates: see [Configuration](configuration#blacklist-glob-patterns); matching is case‑insensitive and filename‑only.
- Duplicate filenames are not re‑added: if the compose already contains a file with the same normalized name, it is skipped.
- Non‑file parts or missing filenames: only file‑like parts with usable filenames are considered for adding.

---

See also

- [Configuration](configuration)
