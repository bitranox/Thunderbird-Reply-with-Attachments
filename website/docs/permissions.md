---
id: permissions
title: Permissions
---

This add‑on requires the following permissions:

```
"compose",
"messagesRead",
"scripting",
"windows",
"sessions",
"storage",
"tabs"
```

Notes
- `compose`: read composer state, manage attachments, and react to compose events.
- `messagesRead`: discover and read original attachments from the source message.
- Removed: `messagesModify` — no longer required for the add‑on’s current flows (reading attachments and adding them to compose). If future features modify messages, we will document and reintroduce it explicitly.
- `scripting`: register MV3 compose/messageDisplay scripts where applicable.
- `windows`: show confirmation UI when needed.
- `sessions`: remember per‑tab ephemeral state to avoid double‑adding.
- `storage`: persist options and defaults.
- `tabs`: minor tab interactions when opening options or docs.
