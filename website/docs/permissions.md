---
id: permissions
title: Permissions
---

This add‑on uses a minimal set of permissions:

- `compose`: read composer state, list existing attachments, add attachments, listen to compose events.
- `messagesRead`: read message metadata to discover and fetch original attachments.
- `messagesModify`: currently present; not used to mutate messages. Planned audit to remove if redundant.
- `windows`: open a small popup confirmation when the in‑document confirmation isn’t available.

Other APIs used in Thunderbird contexts:

- `storage`, `sessions`, `tabs`, `scripting.compose` (MV3)

