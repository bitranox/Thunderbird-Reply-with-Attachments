---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

1. Install the addon from Thunderbird Add‑ons.
2. Optional: Enable confirmation (Options → “Ask before adding attachments”).
3. Optional: Leave the blacklist warning enabled (default): “Warn if attachments are excluded by blacklist”.
4. Optional: Add blacklist patterns (one per line), e.g.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Now reply to a message with attachments — originals will be added automatically or after a quick confirmation. If any files are excluded by your blacklist, you’ll see a short warning listing them.

Verify

- Reply to a message with 1–2 attachments and confirm the originals are added to your compose window.
- To adjust behavior, see [Configuration](configuration) (confirmation toggle, default answer, blacklist patterns).
