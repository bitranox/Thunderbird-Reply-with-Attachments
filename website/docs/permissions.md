---
id: permissions
title: Permissions
---

The addon requests a small, focused set of permissions only. Why each is needed:

- `compose`: observe compose events, list/add attachments in your reply.
- `messagesRead`: read metadata and fetch attachment files from the original message.
- `scripting`: inject the small in‑compose confirmation dialog when enabled.
- `windows`: open a tiny confirmation popup as a last resort when messaging fails.
- `sessions`: store a per‑tab flag to avoid duplicate processing.
- `storage`: persist options (blacklist, confirmation toggle, default answer).
- `tabs`: targeted messaging to the compose tab for confirmation requests.

These are documented in the source and tested in CI. The addon does not collect telemetry.

## Not requested

- `compose.save`, `compose.send` — the addon does not save or send mail on your behalf.
