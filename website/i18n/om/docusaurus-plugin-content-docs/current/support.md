---
id: support
title: 'Deeggarsa'
sidebar_label: 'Deeggarsa'
---

## FAQ {#faq}

### Attachments didn’t get added — why?

- Inline images and S/MIME parts are intentionally excluded.
- Duplicate filenames are skipped if the compose already has the same file.
- Blacklist patterns may filter candidates; see [Configuration](configuration#blacklist-glob-patterns).

### Can I confirm before adding attachments?

Yes. Enable “Ask before adding attachments” under [Configuration → Confirmation](configuration#confirmation). Keyboard: Y/J = Yes, N/Esc = No.

### Does the add‑on send any data or track usage?

No. See [Privacy](privacy) — no telemetry and no background network requests.

### Forward doesn’t add attachments — is that expected?

Yes. Only Reply and Reply all are modified by this add‑on; Forward is left unchanged. See [Limitations](usage#limitations).

### Where is the Donate snooze?

Options → Support section. See [Donation Visibility](configuration#donation-visibility).

---

## Support

Need help or want to report a bug?

---

### Open an issue on GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Include Thunderbird version (e.g., 128 ESR), OS, and steps to reproduce
- Attach relevant logs from Thunderbird’s Error Console (Tools → Developer Tools → Error Console)

- Add‑ons site (ATN): You can also leave feedback via the [add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Ensure you’re on a supported Thunderbird version (128 ESR or newer).
- Check the Configuration and Usage docs for common setup questions.
- For development/testing, see the Development guide.
- If stored settings appear not to apply properly, restart Thunderbird and try again. (Thunderbird may cache state across sessions; a restart ensures fresh settings are loaded.)
- Minimal repro: try with a small test mail containing one or two simple file attachments.
- Compare behavior with confirmation ON vs. OFF to narrow down whether the dialog flow is involved.

---

### What to include in a report

- Thunderbird version and OS
- Exact steps to reproduce (what you did, what you expected, what happened)
- Whether confirmation was enabled and your default answer setting
- A sample of your blacklist patterns (if relevant)
- Error Console logs while reproducing (Tools → Developer Tools → Error Console)
- Enable debug logging (optional):
  - Run in Thunderbird’s Error Console: `messenger.storage.local.set({ debug: true })`
  - Reproduce the issue and copy relevant `[RWA]` log lines

---

### Issue template (copy/paste) {#issue-template}

- Thunderbird version and OS:
- Steps to reproduce:
- Confirmation enabled? Default answer:
- Sample blacklist patterns:
- Error Console logs (Tools → Developer Tools → Error Console):
- Anything else relevant:

---

### Donate

If you’d like to support this project, please consider a small contribution on the [Donate](donation) page. Thank you!

---
