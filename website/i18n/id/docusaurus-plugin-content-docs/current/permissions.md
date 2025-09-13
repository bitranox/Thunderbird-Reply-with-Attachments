---
id: permissions
title: 'Izin'
---

## Izin

:::note Minimal permissions
Tidak ada izin host (web) yang diminta oleh add‑on ini. Add‑on ini tidak mengumpulkan telemetry atau melakukan permintaan jaringan latar belakang. Lihat [Privasi](privacy).
:::

---

Add-on ini hanya meminta seperangkat izin kecil yang terfokus. Mengapa setiap izin diperlukan:

- `compose`: mengamati peristiwa penyusunan, daftar/tambahkan lampiran dalam balasan Anda.
- `messagesRead`: membaca metadata dan mengambil file lampiran dari pesan asli.
- `scripting`: menyuntikkan dialog konfirmasi kecil di dalam penyusunan saat diaktifkan.
- `windows`: membuka popup konfirmasi kecil sebagai upaya terakhir saat pengiriman pesan gagal.
- `sessions`: menyimpan flag per-tab untuk menghindari pemrosesan duplikat.
- `storage`: mempertahankan opsi (daftar hitam, toggle konfirmasi, jawaban default).
- `tabs`: pengiriman pesan yang ditargetkan ke tab penyusunan untuk permintaan konfirmasi.

Catatan tambahan:

- Tidak ada izin host (asal web) yang diminta oleh add‑on ini.
- Izin `tabs` digunakan hanya untuk menargetkan tab penyusunan saat mengoordinasikan dialog konfirmasi opsional; izin ini tidak digunakan untuk membaca riwayat atau menavigasi halaman.

Ini didokumentasikan dalam sumber dan diuji di CI. Add-on ini tidak mengumpulkan telemetry.

---

### Ringkasan (permissions → purpose) {#permissions-summary}

| Izin           | Mengapa ini diperlukan                                                           |
| -------------- | -------------------------------------------------------------------------------- |
| `compose`      | Amati peristiwa penyusunan; daftar dan tambahkan lampiran dalam balasan Anda.    |
| `messagesRead` | Daftar lampiran pesan asli dan ambil data file.                                  |
| `scripting`    | Suntik/koordinasi UI ringan untuk konfirmasi saat diaktifkan.                    |
| `windows`      | Popup fallback jika pengiriman pesan gagal (jarang).                             |
| `sessions`     | Simpan flag per-tab untuk mencegah pemrosesan duplikat.                          |
| `storage`      | Pertahankan opsi (daftar hitam, toggle konfirmasi, jawaban default).             |
| `tabs`         | Pengiriman pesan yang ditargetkan ke tab penyusunan untuk permintaan konfirmasi. |
| (host perms)   | Tidak ada — add‑on ini tidak meminta asal web.                                   |

---

## Tidak diminta {#not-requested}

- `compose.save`, `compose.send` — add-on tidak menyimpan atau mengirim email atas nama Anda.

Lihat juga: [Privasi](privacy) — tidak ada telemetry, tidak ada jaringan latar belakang, hanya tautan yang diinisiasi pengguna.

---
