---
id: glossary
title: 'Glosarium'
sidebar_label: 'Glosarium'
---

## Glosarium

Istilah kanonik yang digunakan dalam antarmuka pengguna dan dokumentasi add-on. Gunakan ini untuk menjaga konsistensi terjemahan di berbagai lokal.

---

### Catatan

- Jaga agar string UI tetap singkat dan berorientasi tindakan.
- Utamakan kata benda untuk pengaturan dan kata kerja untuk tindakan.
- Gunakan huruf kapital pada awal kalimat (hanya kata pertama yang dikapitalisasi) kecuali untuk judul.

---

### Istilah

- **Lampiran**: file yang disertakan dengan email. Hindari "lampiran".
- **Daftar hitam** (Exclude list): daftar pola yang mencegah file dilampirkan secara otomatis. Di UI, ini muncul sebagai "Daftar hitam (pola glob)".
- Dalam salinan UI, lebih suka "Daftar hitam (pola glob)" untuk mencocokkan halaman pengaturan.
- Jelaskan bahwa hanya nama file yang dicocokkan; bukan jalur.
- **Konfirmasi / Persetujuan:** meminta pengguna untuk melanjutkan sebelum menambahkan lampiran.
- **Jawaban:** “Ya” (tambah), “Tidak” (batalkan). Jaga agar label tombol tetap singkat.
- **Gambar dalam**: gambar yang dirujuk dengan CID dalam HTML pesan; tidak pernah ditambahkan sebagai file.
- **Tanda tangan S/MIME:** `smime.p7s` atau bagian tanda tangan PKCS7; tidak pernah ditambahkan.
- **Opsi / Pengaturan:** halaman konfigurasi add-on di Thunderbird.
- **Jawaban default:** jawaban yang dipilih sebelumnya untuk dialog konfirmasi.

---

### Tindakan email

- **Balas:** menjawab pengirim pesan.
- **Balas semua:** menjawab pengirim dan semua penerima.
- **Teruskan:** mengirim pesan ke penerima yang berbeda; add-on ini tidak mengubah perilaku teruskan.

---

### Jenis lampiran

- **Lampiran dalam:** aset yang嵌入 dalam badan pesan (misalnya, dirujuk melalui Content-ID). Tidak ditambahkan sebagai file oleh add-on.
- **File terlampir:** file yang dilampirkan pada pesan sebagai lampiran biasa (calon untuk disalin saat membalas).

---

### Gaya

- **Nama file:** ditampilkan sebagai kode (monospace), misalnya, `smime.p7s`, `*.png`.
- **Kunci/tombol:** huruf kapital judul hanya ketika mereka adalah nama proper; jika tidak, huruf kecil kalimat.
- **Hindari jargon** (misalnya, “idempotensi”); lebih suka “mencegah duplikat”.

---
