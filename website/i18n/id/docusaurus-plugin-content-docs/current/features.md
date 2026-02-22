---
id: features
title: 'Fitur'
sidebar_label: 'Fitur'
---

---

## Fitur {#features}

- Secara otomatis melampirkan berkas dari email asli saat membalas.
- Perilaku dapat dikonfigurasi: lampiran dapat
  - ditambahkan secara otomatis, atau
  - ditambahkan hanya setelah konfirmasi (dialog kecil yang dapat diakses). Di Opsi Anda
    dapat mengaktifkan konfirmasi dan memilih jawaban bawaan (Ya/Tidak).
- Daftar hitam nama berkas (pola glob) mencegah berkas tertentu
  dilampirkan secara otomatis. Contoh: `*intern*`, `*secret*`, `*passwor*`.
  Pencocokan tidak peka huruf besar/kecil dan hanya memeriksa nama berkas; berikan satu pola
  per baris di Opsi.
- Peringatan daftar hitam (opsional, diaktifkan secara bawaan): saat berkas dikecualikan oleh
  daftar hitam Anda, sebuah modal kecil menampilkan berkas dan pola yang cocok. Ramah mode gelap
  dan dapat diakses dengan keyboard (Enter/Esc untuk menutup).
- Bekerja dengan Balas dan Balas semua. Teruskan tidak dimodifikasi oleh add-on ini.
- Menambahkan lampiran asli bahkan jika Anda sudah melampirkan sesuatu sendiri; menghindari duplikasi berdasarkan nama berkas.
- Perlindungan duplikasi per tab mencegah penambahan ganda di tab penulisan yang sama.
- Melewati sertifikat S/MIME secara bawaan untuk menghindari lampiran yang tidak perlu.
- Sertakan gambar inline (bawaan: AKTIF). Gambar tersemat dipulihkan langsung di
  badan balasan sebagai URI data base64, mempertahankan tata letak inline asli. Nonaktifkan di
  Opsi untuk melewati gambar inline sepenuhnya.

---

## Cara Kerjanya {#how-it-works}

- Saat membalas, add-on mencantumkan lampiran asli.
- Menyaring tanda tangan S/MIME dari lampiran berkas; gambar inline dipulihkan di badan (kecuali dinonaktifkan).
- Opsional meminta konfirmasi (ramah keyboard).
- Menambahkan berkas yang memenuhi syarat ke penulisan Anda, menghindari duplikasi berdasarkan nama berkas.
- Lihat “Mengapa lampiran mungkin tidak ditambahkan” di Penggunaan untuk kasus khusus.

Catatan privasi: Semua pemrosesan terjadi secara lokal di Thunderbird. Add-on tidak melakukan permintaan jaringan di latar belakang.

---
