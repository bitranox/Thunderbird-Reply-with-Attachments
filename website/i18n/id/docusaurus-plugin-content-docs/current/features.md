---
id: features
title: Fitur
sidebar_label: Fitur
---

## Fitur

- Secara otomatis melampirkan file dari email asli saat membalas.
- Perilaku dapat dikonfigurasi: lampiran dapat
  - ditambahkan secara otomatis, atau
  - ditambahkan hanya setelah konfirmasi (dialog kecil yang aksesibel). Di Opsi Anda dapat mengaktifkan konfirmasi dan memilih jawaban bawaan (Ya/Tidak).
- Daftar hitam nama berkas (pola glob) mencegah berkas tertentu ditambahkan secara otomatis. Contoh: `*intern*`, `*secret*`, `*passwor*`.
  Pencocokan tidak peka huruf besar/kecil dan hanya memeriksa nama berkas; berikan satu pola per baris di Opsi.
- Peringatan daftar hitam (opsional, aktif secara default): saat berkas dikecualikan oleh daftar hitam Anda, sebuah modal kecil akan menampilkan berkas dan pola yang cocok. Ramah mode gelap dan dapat diakses dengan keyboard (Enter/Esc untuk menutup).
- Menambahkan berkas asli meskipun Anda sudah melampirkan sesuatu; menghindari duplikasi berdasarkan nama berkas.
- Melewatkan sertifikat SMIME dan gambar sebaris untuk menghindari lampiran yang tidak perlu.
