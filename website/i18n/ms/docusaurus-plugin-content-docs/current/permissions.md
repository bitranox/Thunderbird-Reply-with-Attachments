---
id: permissions
title: 'Kebenaran'
---

## Kebenaran

:::note Kebenaran minimal
Tiada kebenaran host (web) yang diminta oleh add-on ini. Add-on ini tidak mengumpul telemetri atau membuat permintaan rangkaian latar belakang. Lihat [Privasi](privacy).
:::

---

Add-on ini hanya meminta sekumpulan kebenaran yang kecil dan fokus. Mengapa setiap satu diperlukan:

- `compose`: perhatikan acara kompos, senarai/tambah lampiran dalam balasan anda.
- `messagesRead`: baca metadata dan ambil fail lampiran dari mesej asal.
- `scripting`: suntik dialog pengesahan kecil dalam kompos apabila diaktifkan.
- `windows`: buka popup pengesahan kecil sebagai pilihan terakhir apabila mesej gagal.
- `sessions`: simpan bendera per-tab untuk mengelakkan pemprosesan berulang.
- `storage`: kekalkan pilihan (senarai hitam, togol pengesahan, jawapan lalai).
- `tabs`: pemesejan bertarget ke tab kompos untuk permintaan pengesahan.

Nota tambahan:

- Tiada kebenaran host (asal web) yang diminta oleh add-on ini.
- Kebenaran `tabs` hanya digunakan untuk mensasarkan tab kompos semasa menyelaraskan dialog pengesahan pilihan; ia tidak digunakan untuk membaca sejarah atau menavigasi halaman.

Ini didokumentasikan dalam sumber dan diuji dalam CI. Add-on ini tidak mengumpul telemetri.

---

### Ringkasan (kebenaran → tujuan) {#permissions-summary}

| Kebenaran        | Mengapa ia diperlukan                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| `compose`        | Perhatikan acara kompos; senarai dan tambah lampiran dalam balasan anda. |
| `messagesRead`   | Senarai lampiran mesej asal dan ambil data fail.                         |
| `scripting`      | Suntik/koordinasi UI ringan untuk pengesahan apabila diaktifkan.         |
| `windows`        | Popup pemulihan jika mesej gagal (jarang).                               |
| `sessions`       | Simpan bendera per-tab untuk mengelakkan pemprosesan berulang.           |
| `storage`        | Kekalkan pilihan (senarai hitam, togol pengesahan, jawapan lalai).       |
| `tabs`           | Pemesejan bertarget kepada tab kompos untuk permintaan pengesahan.       |
| (kebenaran host) | Tiada — add-on ini tidak meminta asal web.                               |

---

## Tidak diminta {#not-requested}

- `compose.save`, `compose.send` — add-on ini tidak menyimpan atau mengirimkan surat bagi pihak anda.

Lihat juga: [Privasi](privacy) — tiada telemetri, tiada rangkaian latar belakang, hanya pautan yang dimulakan pengguna.

---
