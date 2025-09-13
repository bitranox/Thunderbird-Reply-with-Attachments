---
id: quickstart
title: 'البدء السريع'
sidebar_label: 'البدء السريع'
---

## Quickstart

:::important Minimum Thunderbird Version
This add‑on supports Thunderbird **128 ESR or newer**. Older versions are not supported.
:::

:::note No telemetry; no background network
The add‑on does **not** collect analytics/telemetry and makes **no** background network requests. Network access occurs only when you click external links (Docs, GitHub, Donate).
:::

---

### Install

1. Install the add-on from Thunderbird Add‑ons.
2. Optional: Enable confirmation (Options → “Ask before adding attachments”).
3. Optional: Leave the blacklist warning enabled (default): “Warn if attachments are excluded by blacklist”.
4. Optional: Add blacklist patterns (one per line), e.g.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Note: The “# …” above is a comment in this documentation; do not include comments in patterns you paste into Options. Enter one pattern per line only.

Now reply to a message with attachments — originals will be added automatically or after a quick confirmation. If any files are excluded by your blacklist, you’ll see a short warning listing them.

---

### Verify {#verify}

- Reply to a message with 1–2 attachments and confirm the originals are added to your compose window.
- To adjust behavior, see [Configuration](configuration) (confirmation toggle, default answer, blacklist patterns).

---

### Verify blacklist warning {#verify-blacklist-warning}

- Reply to a message containing a file like “secret.txt”.
- With “Warn if attachments are excluded by blacklist” enabled, a small dialog lists excluded files and the matching pattern.

If you don’t see a warning, ensure the pattern matches the filename exactly (filename‑only, case‑insensitive). See Configuration → Blacklist.

---

### Keyboard note {#keyboard-note}

- The confirmation dialog supports Y/J for Yes and N/Esc for No. On some non‑Latin keyboards, the letter keys may vary; Enter confirms the focused button.

---
