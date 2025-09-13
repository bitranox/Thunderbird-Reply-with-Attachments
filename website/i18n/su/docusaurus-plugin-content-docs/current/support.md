---
id: support
title: 'Dukungan'
sidebar_label: 'Dukungan'
---

## FAQ {#faq}

### Lampiran tidak ditambahkan — kenapa?

- Gambar internal dan bagian S/MIME secara sengaja dikecualikan.
- Nama file yang duplikat dilewati jika komposisi sudah memiliki file yang sama.
- Pola blacklist dapat menyaring kandidat; lihat [Konfigurasi](configuration#blacklist-glob-patterns).

### Bisakah saya mengonfirmasi sebelum menambahkan lampiran?

Ya. Aktifkan “Tanya sebelum menambahkan lampiran” di [Konfigurasi → Konfirmasi](configuration#confirmation). Keyboard: Y/J = Ya, N/Esc = Tidak.

### Apakah add‑on mengirim data atau melacak penggunaan?

Tidak. Lihat [Privasi](privacy) — tidak ada telemetri dan tidak ada permintaan jaringan latar belakang.

### Forward tidak menambahkan lampiran — apakah itu diharapkan?

Ya. Hanya Balas dan Balas semua yang dimodifikasi oleh add‑on ini; Forward dibiarkan tidak berubah. Lihat [Batasan](usage#limitations).

### Di mana Donate snooze?

Opsi → Bagian Dukungan. Lihat [Visibilitas Donasi](configuration#donation-visibility).

## Dukungan

Butuh bantuan atau ingin melaporkan bug?

### Buka isu di GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Isu: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Sertakan versi Thunderbird (misalnya, 128 ESR), OS, dan langkah untuk mereproduksi
- Lampirkan log yang relevan dari Konsol Kesalahan Thunderbird (Alat → Alat Pengembang → Konsol Kesalahan)

- Situs add‑ons (ATN): Anda juga dapat meninggalkan umpan balik melalui [halaman add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

### Tips

- Pastikan Anda menggunakan versi Thunderbird yang didukung (128 ESR atau yang lebih baru).
- Periksa dokumen Konfigurasi dan Penggunaan untuk pertanyaan pengaturan umum.
- Untuk pengembangan/pengujian, lihat panduan Pengembangan.
- Jika pengaturan yang disimpan tampaknya tidak diterapkan dengan benar, restart Thunderbird dan coba lagi. (Thunderbird dapat menyimpan status di antara sesi; restart memastikan pengaturan baru dimuat.)
- Minimal repro: coba dengan email uji kecil yang berisi satu atau dua lampiran file sederhana.
- Bandingkan perilaku dengan konfirmasi AKTIF vs. NONAKTIF untuk mempersempit apakah alur dialog terlibat.

### Apa yang harus disertakan dalam laporan

- Versi Thunderbird dan OS
- Langkah-langkah tepat untuk mereproduksi (apa yang Anda lakukan, apa yang Anda harapkan, apa yang terjadi)
- Apakah konfirmasi diaktifkan dan pengaturan jawaban default Anda
- Contoh pola blacklist Anda (jika relevan)
- Log Konsol Kesalahan saat mereproduksi (Alat → Alat Pengembang → Konsol Kesalahan)
- Aktifkan logging debug (opsional):
  - Jalankan di Konsol Kesalahan Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduksi masalah dan salin baris log `[RWA]` yang relevan

### Template isu (salin/tempel) {#issue-template}

- Versi Thunderbird dan OS:
- Langkah untuk mereproduksi:
- Konfirmasi diaktifkan? Jawaban default:
- Contoh pola blacklist:
- Log Konsol Kesalahan (Alat → Alat Pengembang → Konsol Kesalahan):
- Sesuatu yang lain relevan:

### Donasi

Jika Anda ingin mendukung proyek ini, harap pertimbangkan sumbangan kecil di halaman [Donasi](donation). Terima kasih!
