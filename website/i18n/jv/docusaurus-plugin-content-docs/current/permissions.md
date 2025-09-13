---
id: permissions
title: 'Hak Akses'
---

## Hak Akses

:::note Minimal hak akses
Ora ana hak (web) host sing dijaluk dening tambahan iki. Tambahan iki ora ngumpulake telemetry utawa nggawe panjalukan jaringan latar mburi. Deleng [Privasi](privacy).
:::

---

Tambahan iki njaluk set hak akses sing cilik lan fokus. Kenapa saben iki dibutuhake:

- `compose`: mengawasi acara compose, mlisted/menambah lampiran ing balasan sampeyan.
- `messagesRead`: maca metadata lan njupuk file lampiran saka pesen asli.
- `scripting`: nyuntik dialog konfirmasi cilik ing proses nalika diaktifake.
- `windows`: mbukak popup konfirmasi cilik minangka upaya terakhir nalika pesen gagal.
- `sessions`: nyimpen bendera per‑tab kanggo ngindhari proses duplikasi.
- `storage`: ngresiki opsi (daftar ireng, toggling konfirmasi, jawaban standar).
- `tabs`: pesen terarah kanggo tab compose kanggo panjalukan konfirmasi.

Cathetan tambahan:

- Ora ana hak host (asal web) sing dijaluk dening tambahan iki.
- Ijin `tabs` mung digunakake kanggo nyasarake tab compose nalika ngkoordinasi dialog konfirmasi opsional; ora digunakake kanggo maca sejarah utawa mbayangke kaca.

Iki didokumentasikake ing sumber lan diuji ing CI. Tambahan iki ora ngumpulake telemetry.

---

### Ringkasan (hak akses → tujuan) {#permissions-summary}

| Hak Akses      | Kenapa iki dibutuhake                                                      |
| -------------- | -------------------------------------------------------------------------- |
| `compose`      | Mengawasi acara compose; mlisted lan nambah lampiran ing balasan sampeyan. |
| `messagesRead` | Mlisted lampiran pesen asli lan njupuk data file.                          |
| `scripting`    | Nyuntik/koordinasi UI ringan kanggo konfirmasi nalika diaktifake.          |
| `windows`      | Popup cadangan yen pesen gagal (jarang).                                   |
| `sessions`     | Nyimpen bendera per‑tab kanggo nyegah proses duplikasi.                    |
| `storage`      | Ngresiki opsi (daftar ireng, toggling konfirmasi, jawaban standar).        |
| `tabs`         | Pesen terarah kanggo tab compose kanggo panjalukan konfirmasi.             |
| (hak host)     | Ora ana — tambahan iki ora njaluk asal web.                                |

---

## Ora dijaluk {#not-requested}

- `compose.save`, `compose.send` — tambahan iki ora nyimpen utawa ngirim email ing loro behalf sampeyan.

Deleng uga: [Privasi](privacy) — ora ana telemetry, ora ana jaringan latar mburi, mung link sing diwiwiti pangguna.
