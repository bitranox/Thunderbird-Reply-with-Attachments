---
id: support
title: 'Dukungan'
sidebar_label: 'Dukungan'
---

## FAQ {#faq}

### Lampiran tidak ditambahkan — mengapa?

- Gambar inline dan bagian S/MIME sengaja dikecualikan.
- Nama file yang duplikat diabaikan jika komposisi sudah memiliki file yang sama.
- Pola daftar hitam mungkin menyaring kandidat; lihat [Konfigurasi](configuration#blacklist-glob-patterns).

### Bisakah saya mengkonfirmasi sebelum menambahkan lampiran?

Ya. Aktifkan “Tanya sebelum menambahkan lampiran” di [Konfigurasi → Konfirmasi](configuration#confirmation). Keyboard: Y/J = Ya, N/Esc = Tidak.

### Apakah add-on mengirim data atau melacak penggunaan?

Tidak. Lihat [Privasi](privacy) — tidak ada telemetri dan tidak ada permintaan jaringan latar belakang.

### Terusan tidak menambahkan lampiran — apakah itu diharapkan?

Ya. Hanya Balas dan Balas Semua yang dimodifikasi oleh add-on ini; Terusan dibiarkan tanpa perubahan. Lihat [Batasan](usage#limitations).

### Di mana snooze Donasi?

Opsi → bagian Dukungan. Lihat [Visibilitas Donasi](configuration#donation-visibility).

---

## Dukungan

Butuh bantuan atau ingin melaporkan bug?

---

### Buka masalah di GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Masalah: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Sertakan versi Thunderbird (misalnya, 128 ESR), OS, dan langkah-langkah untuk mereproduksi
- Lampirkan log terkait dari Konsol Kesalahan Thunderbird (Alat → Alat Pengembang → Konsol Kesalahan)

- Situs add-on (ATN): Anda juga dapat meninggalkan umpan balik melalui [halaman add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Pastikan Anda menggunakan versi Thunderbird yang didukung (128 ESR atau lebih baru).
- Periksa dokumen Konfigurasi dan Penggunaan untuk pertanyaan pengaturan umum.
- Untuk pengembangan/penguji, lihat panduan Pengembangan.
- Jika pengaturan yang disimpan tampak tidak diterapkan dengan benar, restart Thunderbird dan coba lagi. (Thunderbird mungkin menyimpan status antar sesi; restart memastikan pengaturan baru dimuat.)
- Reproduksi minimal: coba dengan email uji kecil yang berisi satu atau dua lampiran file sederhana.
- Bandingkan perilaku dengan konfirmasi ON vs. OFF untuk mempersempit apakah alur dialog terlibat.

---

### Hal yang harus disertakan dalam laporan

- Versi Thunderbird dan OS
- Langkah-langkah tepat untuk mereproduksi (apa yang Anda lakukan, apa yang Anda harapkan, apa yang terjadi)
- Apakah konfirmasi diaktifkan dan pengaturan jawaban default Anda
- Sejumlah pola daftar hitam Anda (jika relevan)
- Log Konsol Kesalahan saat mereproduksi (Alat → Alat Pengembang → Konsol Kesalahan)
- Aktifkan pencatatan debug (opsional):
  - Jalankan di Konsol Kesalahan Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduksi masalah dan salin garis log `[RWA]` yang relevan

---

### Template masalah (salin/tempel) {#issue-template}

- Versi Thunderbird dan OS:
- Langkah-langkah untuk mereproduksi:
- Konfirmasi diaktifkan? Jawaban default:
- Contoh pola daftar hitam:
- Log Konsol Kesalahan (Alat → Alat Pengembang → Konsol Kesalahan):
- Hal lain yang relevan:

---

### Donasi

Jika Anda ingin mendukung proyek ini, silakan pertimbangkan untuk memberikan sumbangan kecil di halaman [Donasi](donation). Terima kasih!
