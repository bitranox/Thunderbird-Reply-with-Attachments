---
id: changelog
title: 'Changelog'
---

---

## Changelog

For the complete, detailed history, see the repository's
[CHANGELOG.md on GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.1: declares that the add-on collects no data (required by Mozilla for new extension versions); the 2.4.0 wording is translated into all supported languages.
- 2.4.0: images are no longer dropped just because the sender put a `Content-ID` on them; the "Include inline pictures" option is gone, since Thunderbird keeps embedded images in the reply body on its own; links now open in the system browser; a ceiling of 50 attachments / 100 MB per reply, with anything left out reported.
- 2.3.2: "Include inline pictures" embedded images in the reply body as base64 data URIs (removed again after the add-ons.thunderbird.net review; Thunderbird does this itself); code quality improvements and expanded test coverage.
- 2.3.1: Keeps attachments after Thunderbird idles the background event page; adds targeted debug hooks for troubleshooting.
- 2.3.0: Refined attachment deduplication, broadened test coverage, and removed obsolete permissions to satisfy AMO policies.
- 2.1.0: Full internationalization support for the top 100 languages
- 2.0.0: rewrite to a full-featured version (EN/DE)
- 1.0.1: switched to messages.listAttachments()
- 1.0.0: initial release

---

## Dates and channels {#dates-and-channels}

- Releases to ATN may lag a few hours after packaging.
- LOCAL builds are for developer testing only and are not distributed via ATN.

---
