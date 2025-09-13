---
id: glossary
title: 'Sanasto'
sidebar_label: 'Sanasto'
---

## Sanasto

Canonical terms used in the add-on UI and documentation. Use these to keep translations consistent across locales.

---

### Huomiot

- Keep UI strings short and action‑oriented.
- Prefer nouns for settings and verbs for actions.
- Use sentence case (only the first word capitalized) except titles.

---

### Termit

- **Liitteet**: files included with an email. Avoid “enclosures”.
- **Estoluettelo** (Exclude list): list of patterns that prevent files from being attached automatically. In the UI this appears as “Blacklist (glob patterns)”.
- In UI copy, prefer “Blacklist (glob patterns)” to match the settings page.
- Explain that only filenames are matched; not paths.
- **Vahvista / Vahvistaminen:** ask the user to proceed before adding attachments.
- **Vastaukset:** “Kyllä” (add), “Ei” (cancel). Keep button labels short.
- **Inline kuva:** an image referenced by CID in message HTML; never added as a file.
- **S/MIME allekirjoitus:** `smime.p7s` or PKCS7 signature parts; never added.
- **Vaihtoehdot / Asetukset:** the add-on’s configuration page in Thunderbird.
- **Oletusvastaus:** the preselected answer for the confirmation dialog.

---

### Sähköpostitoiminnot

- **Vastaa:** respond to the sender of a message.
- **Vastaa kaikille:** respond to sender and all recipients.
- **Välitä:** send the message to a different recipient; this add-on does not modify forward behavior.

---

### Liitetiedostotyypit

- **Inlineliitteet:** assets embedded in the message body (e.g., referenced via Content‑ID). Not added as files by the add-on.
- **Liitetiedostot:** files attached to the message as regular attachments (candidates for copying on reply).

---

### Tyyli

- **Tiedostonimet:** show as code (monospace), e.g., `smime.p7s`, `*.png`.
- **Avaimet/painikkeet:** title‑case only when they are proper names; otherwise sentence case.
- **Vältä jargonia** (e.g., “idempotency”); prefer “prevent duplicates”.

---
