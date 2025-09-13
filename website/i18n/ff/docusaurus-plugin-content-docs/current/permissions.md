---
id: permissions
title: 'Hakki'
---

## Hakki

:::note Hakki maa
No host (web) hakki e waɗa ton so add‑on ngol. Add‑on ngol kadi e waɗi timmiti ko ɓe tawti. Nde heɓi [Jokkondiral](privacy).
:::

---

Add‑on ngol njaɓa haɓɓe hakki maa, waɗa e jam. Waaɗu hara e waɗata:

- `compose`: woɗɗo compose events, lissii/add attachments e reply maa.
- `messagesRead`: jogi metadata e waɗi fetch attachment files e nder saɗi njay.
- `scripting`: wujjooɗo njaɓi in‑compose confirmation dialog so tawii.
- `windows`: fuɗɗa tiny confirmation popup e nder haje walla messaging heɓa.
- `sessions`: naatnoo flag e per‑tab e nder woodi duplicate processing.
- `storage`: worɓitoo options (blacklist, confirmation toggle, default answer).
- `tabs`: targeted messaging e nder compose tab e njaɓi confirmation requests.

Kadi maa no teɓɓi:

- No host hakki (web origins) e waɗa ton so add‑on ngol.
- `tabs` hakki e waɗa ton so tawii e nder compose tab so foti coordinating optional confirmation dialog; o kadi e waɗi kadi waɗi reading history walla navigate pages.

Nde ɓe njahi e nder source e ɓe testii e nder CI. Add‑on ngol kadi e waɗi timmiti ko ɓe tawti.

---

### Ɓeeydu (hakki → ndiyam) {#permissions-summary}

| Hakki          | Ko hay e waɗata                                                      |
| -------------- | -------------------------------------------------------------------- |
| `compose`      | Woɗɗo compose events; lissi e adda attachments e reply maa.          |
| `messagesRead` | Lissi original message attachments e waɗi fetch file data.           |
| `scripting`    | Wujjooɗo/coordinatir lightweight UI e njaɓi confirmation so tawii.   |
| `windows`      | Fallback popup so messaging heɓa (rare).                             |
| `sessions`     | Naatnoo flag e per‑tab e nder woodi duplicate processing.            |
| `storage`      | Woritir options (blacklist, confirmation toggle, default answer).    |
| `tabs`         | Targeted messaging e nder compose tab e njaɓi confirmation requests. |
| (host hakki)   | None — add‑on ngol kadi e waɗi ton so web origins.                   |

---

## Mbelɗum wujjooɗi {#not-requested}

- `compose.save`, `compose.send` — add‑on ngol kadi e waɗi ton so selli walla watɗo on e nder waɗi.

Nde ngoni kadi: [Jokkondiral](privacy) — no timmiti, no background network, user‑initiated links fota.

---
