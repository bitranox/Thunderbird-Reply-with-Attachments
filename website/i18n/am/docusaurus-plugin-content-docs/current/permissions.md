---
id: permissions
title: 'መፍትሔዎች'
---

## መፍትሔዎች

:::note እንቁላል መፍትሔዎች
No host (web) permissions are requested by this add‑on. The add‑on does not collect telemetry or make background network requests. See [Privacy](privacy).
:::

---

The add-on requests a small, focused set of permissions only. Why each is needed:

- `compose`: observe compose events, list/add attachments in your reply.
- `messagesRead`: read metadata and fetch attachment files from the original message.
- `scripting`: inject the small in‑compose confirmation dialog when enabled.
- `windows`: open a tiny confirmation popup as a last resort when messaging fails.
- `sessions`: store a per‑tab flag to avoid duplicate processing.
- `storage`: persist options (blacklist, confirmation toggle, default answer).
- `tabs`: targeted messaging to the compose tab for confirmation requests.

Additional notes:

- No host permissions (web origins) are requested by this add‑on.
- The `tabs` permission is used only to target the compose tab when coordinating the optional confirmation dialog; it is not used to read history or navigate pages.

These are documented in the source and tested in CI. The add-on does not collect telemetry.

---

### የአጠቃቀም (permissions → purpose) {#permissions-summary}

| Permission     | Why it’s needed                                                   |
| -------------- | ----------------------------------------------------------------- |
| `compose`      | Observe compose events; list and add attachments in your reply.   |
| `messagesRead` | List original message attachments and fetch the file data.        |
| `scripting`    | Inject/coordinate lightweight UI for confirmation when enabled.   |
| `windows`      | Fallback popup if messaging fails (rare).                         |
| `sessions`     | Store a per‑tab flag to prevent duplicate processing.             |
| `storage`      | Persist options (blacklist, confirmation toggle, default answer). |
| `tabs`         | Targeted messaging to the compose tab for confirmation requests.  |
| (host perms)   | None — the add‑on does not request web origins.                   |

---

## የማይጠየቁ {#not-requested}

- `compose.save`, `compose.send` — the add-on does not save or send mail on your behalf.

See also: [Privacy](privacy) — no telemetry, no background network, user‑initiated links only.

---
