---
id: glossary
title: 'Glossary'
sidebar_label: 'Glossary'
---

---

## Glossary

Canonical terms used in the add-on UI and documentation. Use these to keep translations consistent across locales.

---

### Notes

- Keep UI strings short and action-oriented.
- Prefer nouns for settings and verbs for actions.
- Use sentence case (only the first word capitalized) except titles.

---

### Terms

- **Attachments**: files included with an email. Avoid "enclosures".
- **Blacklist** (Exclude list): list of patterns that prevent files from being attached automatically. In the UI this appears as "Blacklist (glob patterns)".
- In UI copy, prefer "Blacklist (glob patterns)" to match the settings page.
- Explain that only filenames are matched; not paths.
- **Confirm / Confirmation:** ask the user to proceed before adding attachments.
- **Answers:** "Yes" (add), "No" (cancel). Keep button labels short.
- **Inline image:** an image the message HTML references by `cid:`, or one marked `Content-Disposition: inline`. It stays in the reply body and is not copied as a file.
- **S/MIME signature:** `smime.p7s` or PKCS7 signature parts; never added.
- **Options / Settings:** the add-on's configuration page in Thunderbird.
- **Default answer:** the preselected answer for the confirmation dialog.

---

### Email actions

- **Reply:** respond to the sender of a message.
- **Reply all:** respond to sender and all recipients.
- **Forward:** send the message to a different recipient; this add-on does not modify forward behavior.

---

### Attachment types

- **Inline attachments:** assets the message body embeds (referenced via `cid:`). Not copied as files; Thunderbird keeps them in the reply body.
- **Attached files:** files attached to the message as regular attachments (candidates for copying on reply).

---

### Style

- **Filenames:** show as code (monospace), e.g., `smime.p7s`, `*.png`.
- **Keys/buttons:** title-case only when they are proper names; otherwise sentence case.
- **Avoid jargon** (e.g., "idempotency"); prefer "prevent duplicates".

---
