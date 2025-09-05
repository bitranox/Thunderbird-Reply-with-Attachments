---
id: privacy
title: Privacy
sidebar_label: Privacy
---

Reply with Attachments does not collect analytics or telemetry and does not send your data anywhere.

What the add‑on does:

- Reads attachment metadata and files from the original message locally (Thunderbird API) to attach them to your reply.
- Stores your options (blacklist, confirmation, default answer) in Thunderbird’s local storage.

What the add‑on does not do:

- No tracking, analytics, crash reporting, or remote logging.
- No background network requests, except when you explicitly open external links (Docs, GitHub, Donate).

Permissions are documented on the [Permissions](permissions) page.

## Content Security Policy (CSP)

The options and popup pages avoid inline scripts. All JavaScript is loaded from files shipped with the add‑on to comply with strict CSP in Thunderbird. If you embed code snippets in docs, they are examples only and not executed by the add‑on.
