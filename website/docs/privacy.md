---
id: privacy
title: Privacy
sidebar_label: Privacy
---

Reply with Attachments does not collect analytics or telemetry and does not send your data anywhere.

What the addon does:

- Reads attachment metadata and files from the original message locally (Thunderbird API) to attach them to your reply.
- Stores your options (blacklist, confirmation, default answer) in Thunderbird’s local storage.

What the addon does not do:

- No tracking, analytics, crash reporting, or remote logging.
- No background network requests, except when you explicitly open external links (Docs, GitHub, Donate).

Permissions are documented on the [Permissions](permissions) page.

## Content Security Policy (CSP)

The options and popup pages avoid inline scripts. All JavaScript is loaded from files shipped with the addon to comply with strict CSP in Thunderbird. If you embed code snippets in docs, they are examples only and not executed by the addon.

## Data storage

- User preferences (blacklist, confirmation toggle, default answer) are stored in Thunderbird’s `storage.local` for this addon.
- No cloud sync is performed by the addon.

## Network

- The addon performs no background network activity.
- Any network access happens only when you click links (Docs, GitHub, Donate) or when Thunderbird itself performs normal operations unrelated to this addon.
