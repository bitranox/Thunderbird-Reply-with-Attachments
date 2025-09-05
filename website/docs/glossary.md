---
id: glossary
title: i18n Glossary
sidebar_label: Glossary
---

Canonical terms used in the add‑on UI and documentation. Use these to keep translations consistent across locales.

Notes
- Keep UI strings short and action‑oriented.
- Prefer nouns for settings and verbs for actions.
- Use sentence case (only the first word capitalized) except titles.

Terms
- Attachments: files included with an email. Avoid “enclosures”.
- Blacklist (Exclude list): list of patterns that prevent files from being attached automatically.
- In UI copy, prefer “Blacklist (glob patterns)” to match the settings page.
- Explain that only filenames are matched; not paths.
- Confirm / Confirmation: ask the user to proceed before adding attachments.
- Answers: “Yes” (add), “No” (cancel). Keep button labels short.
- Inline image: an image referenced by CID in message HTML; never added as a file.
- S/MIME signature: `smime.p7s` or PKCS7 signature parts; never added.
- Options / Settings: the add‑on’s configuration page in Thunderbird.
- Default answer: the preselected answer for the confirmation dialog.

Style
- Filenames: show as code (monospace), e.g., `smime.p7s`, `*.png`.
- Keys/buttons: title‑case only when they are proper names; otherwise sentence case.
- Avoid jargon (e.g., “idempotency”); prefer “prevent duplicates”.

