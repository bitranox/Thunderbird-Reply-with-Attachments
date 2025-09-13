---
id: privacy
title: 'පෞද්ගලිකතා'
sidebar_label: 'පෞද්ගලිකතා'
---

## Privacy

:::note No telemetry; no background network
This add‑on does **not** collect analytics/telemetry and makes **no** background network requests. Any network access happens only when you click an external link (Docs, GitHub, Donate).
:::

Reply with Attachments does not collect analytics or telemetry and does not send your data anywhere.

What the add-on does:

- Reads attachment metadata and files from the original message locally (Thunderbird API) to attach them to your reply.
- Stores your options (blacklist, confirmation, default answer) in Thunderbird’s local storage.

What the add-on does not do:

- No tracking, analytics, crash reporting, or remote logging.
- No background network requests, except when you explicitly open external links (Docs, GitHub, Donate).

Permissions are documented on the [Permissions](permissions) page.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

The options and popup pages avoid inline scripts. All JavaScript is loaded from files shipped with the add-on to comply with strict CSP in Thunderbird. If you embed code snippets in docs, they are examples only and not executed by the add-on.

---

## Data storage {#data-storage}

- User preferences (blacklist, confirmation toggle, default answer) are stored in Thunderbird’s `storage.local` for this add-on.
- No cloud sync is performed by the add-on.

---

## Network {#network}

- The add-on performs no background network activity.
- Any network access happens only when you click links (Docs, GitHub, Donate) or when Thunderbird itself performs normal operations unrelated to this add-on.

---

## Data removal {#data-removal}

- Uninstalling the add‑on removes its code.
- Settings are kept only in Thunderbird’s `storage.local` and are removed at uninstall; no external storage is used.
- Reset settings without uninstalling:
  - Options page: use “Reset to defaults” for the blacklist and blacklist warning.
  - Advanced: in Thunderbird → Tools → Developer Tools → Debug Add‑ons, open the extension’s storage and clear keys if needed.

---
