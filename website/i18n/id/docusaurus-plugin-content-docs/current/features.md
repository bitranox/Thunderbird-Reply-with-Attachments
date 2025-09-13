---
id: features
title: 'Fitur'
sidebar_label: 'Fitur'
---

## Features {#features}

- Secara otomatis melampirkan file dari email asli saat membalas.
- Perilaku yang dapat dikonfigurasi: lampiran dapat
  - ditambahkan secara otomatis, atau
  - ditambahkan hanya setelah konfirmasi (sebuah dialog kecil yang dapat diakses). Di Opsi Anda
    dapat mengaktifkan konfirmasi dan memilih jawaban default (Ya/Tidak).
- Daftar hitam nama file (pola glob) mencegah file tertentu untuk dilampirkan
  secara otomatis. Contoh: `*intern*`, `*secret*`, `*passwor*`.
  Pencocokan tidak peka huruf dan hanya memeriksa nama file; berikan satu pola
  per baris di Opsi.
- Peringatan daftar hitam (opsional, diaktifkan secara default): saat file dikecualikan oleh
  daftar hitam Anda, sebuah modal kecil akan menampilkan file dan pola yang cocok. Ramah mode gelap
  dan dapat diakses dengan keyboard (Enter/Esc untuk menutup).
- Bekerja dengan Balas dan Balas semua. Meneruskan tidak dimodifikasi oleh add-on ini.
- Menambahkan asli bahkan jika Anda sudah melampirkan sesuatu sendiri; menghindari duplikat berdasarkan nama file.
- Penjaga duplikat per tab mencegah penambahan ganda dalam tab penyusunan yang sama.
- Melewatkan sertifikat S/MIME dan gambar inline untuk menghindari lampiran yang tidak perlu.

## How It Works {#how-it-works}

- Saat membalas, add-on akan menampilkan lampiran asli.
- Menyaring tanda tangan S/MIME dan gambar inline.
- Opsional meminta konfirmasi (ramah keyboard).
- Menambahkan file yang memenuhi syarat ke penyusunan Anda, menghindari duplikat berdasarkan nama file.
- Lihat “Mengapa lampiran mungkin tidak ditambahkan” di Penggunaan untuk kasus khusus.

Catatan privasi: Semua pemrosesan terjadi secara lokal di Thunderbird. Add-on tidak melakukan permintaan jaringan latar belakang.
