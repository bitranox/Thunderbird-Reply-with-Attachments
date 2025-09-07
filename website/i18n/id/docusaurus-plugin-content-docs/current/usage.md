---
id: usage
title: Penggunaan
sidebar_label: Penggunaan
---

## Penggunaan

- Balas dan add‑on akan menambahkan lampiran asli secara otomatis — atau bertanya dulu jika diaktifkan pada Opsi.
- Duplikasi dihindari berdasarkan nama berkas; SMIME dan gambar inline selalu dilewati.
- Lampiran dalam daftar hitam juga dilewati (tidak peka huruf besar/kecil, pola glob).

---

## Rincian Perilaku

- Pencegahan duplikasi: add‑on menandai tab tulis sebagai telah diproses menggunakan nilai sesi per‑tab dan penjaga dalam memori; tidak akan menambahkan lampiran asli dua kali.
- Menghormati lampiran yang sudah ada: jika tab tulis sudah berisi lampiran, lampiran asli tetap ditambahkan tepat satu kali, melewati nama berkas yang sudah ada.
- Pengecualian: artefak SMIME (mis. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) dan gambar inline diabaikan. Jika tidak ada yang memenuhi pada pemeriksaan pertama, mode cadangan yang lebih longgar memeriksa ulang bagian non‑SMIME.
- Peringatan daftar hitam (jika diaktifkan): ketika kandidat dikecualikan oleh daftar hitam, add‑on menampilkan modal kecil yang mencantumkan berkas yang terdampak dan pola yang cocok; peringatan juga muncul bila tidak ada lampiran karena semuanya dikecualikan.
