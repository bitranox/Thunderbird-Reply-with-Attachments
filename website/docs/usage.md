---
id: usage
title: 'Usage'
sidebar_label: 'Usage'
---

---

## Usage {#usage}

- Reply and the add-on adds originals automatically - or asks first, if enabled in Options.
- De-duplicated by filename; S/MIME parts are always skipped. Images embedded in the original message stay in the reply body, where Thunderbird puts them, and are not copied as files.
- Blacklisted attachments are also skipped (case-insensitive glob patterns matching filenames, not paths). See [Configuration](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Detect reply → list the original attachments → skip S/MIME and embedded images → optional confirm → add the eligible files (skipping duplicates).

| Part type                                           | Copied to the reply    |
|-----------------------------------------------------|-----------------------:|
| S/MIME signature file `smime.p7s`                   | No                     |
| S/MIME MIME types (`application/pkcs7-*`)           | No                     |
| Image the message body embeds by `cid:`             | No (it is in the body) |
| Image marked `Content-Disposition: inline`          | No (it is in the body) |
| Image with a `Content-ID` the body never references | Yes                    |
| Attached email (`message/rfc822`) with a filename   | Yes                    |
| Regular file attachment with a filename             | Yes                    |

An image counts as embedded only when the original message actually references it,
or when the sender explicitly marked it `Content-Disposition: inline`. A bare
`Content-ID` header is not enough: several mail clients put one on every image part,
including genuine attachments, and those must still be copied.

---

### Cross-reference {#cross-reference}

- Forward is not modified by design (see Limitations below).
- For reasons an attachment might not be added, see "Why attachments might not be added".

---

## Behavior Details {#behavior-details}

- **Duplicate prevention:** The add-on marks the compose tab as processed using a per-tab session value and an in-memory guard. It won't add originals twice.
- Closing and reopening a compose window is treated as a new tab (i.e., a new attempt is allowed).
- **Respect existing attachments:** If the compose already contains some attachments, originals are still added exactly once, skipping filenames that already exist.
- **Exclusions:** S/MIME artifacts and embedded images are not copied as files.
  - **Filenames:** `smime.p7s`
  - **MIME types:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Embedded images:** an `image/*` part the message body references by `cid:`, or one marked `Content-Disposition: inline`. It stays in the reply body; copying it as a file would duplicate it.
  - **Attached emails (`message/rfc822`):** treated as regular attachments if they have a filename; they may be added (subject to duplicate checks and blacklist).
- **Blacklist warning (if enabled):** When candidates are excluded by your blacklist,
  the add-on shows a small modal listing the affected files and the matching
  pattern(s). This warning also appears in cases where no attachments will be
  added because everything was excluded.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Confirmation dialog: Y/J = Yes, N/Esc = No; Tab/Shift+Tab and Arrow keys cycle focus.
  - The "Default answer" in [Configuration](configuration#confirmation) sets the initially focused button.
  - Enter triggers the focused button. Tab/Shift+Tab and arrows move focus for accessibility.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                         |
|-----------------|--------------------------------|
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
  - The add-on does not chunk or compress files; it relies on Thunderbird's normal attachment handling.
- Encrypted messages: S/MIME parts are intentionally excluded.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Images the original message embeds are not copied as files. They are already in the reply body, where Thunderbird put them. See [Configuration](configuration#include-inline-pictures).
- S/MIME signature parts are excluded by design: filenames like `smime.p7s` and MIME types such as `application/pkcs7-signature` or `application/pkcs7-mime` are skipped.
- Blacklist patterns can filter candidates: see [Configuration](configuration#blacklist-glob-patterns); matching is case-insensitive and filename-only.
- Duplicate filenames are not re-added: if the compose already contains a file with the same normalized name, it is skipped.
- Non-file parts or missing filenames: only file-like parts with usable filenames are considered for adding.

---

See also

- [Configuration](configuration)
