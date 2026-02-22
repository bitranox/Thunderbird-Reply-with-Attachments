---
id: usage
title: 'Penggunaan'
sidebar_label: 'Penggunaan'
---

---

## Penggunaan {#usage}

- Balas dan add-on menambahkan lampiran asli secara otomatis — atau meminta konfirmasi terlebih dahulu, jika diaktifkan di Opsi.
- Duplikasi dihilangkan berdasarkan nama file; bagian S/MIME selalu dilewati. Gambar inline dipulihkan di badan balasan secara default (nonaktifkan melalui "Include inline pictures" di Opsi).
- Lampiran yang masuk daftar hitam juga dilewati (pola glob tidak peka huruf besar/kecil yang mencocokkan nama file, bukan path). Lihat [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa yang terjadi saat membalas {#what-happens}

- Deteksi balasan → daftar lampiran asli → saring S/MIME + inline → konfirmasi opsional → tambahkan file yang memenuhi syarat (lewati duplikat) → pulihkan gambar inline di badan pesan.

Putaran ketat vs. longgar: Add-on terlebih dahulu mengecualikan bagian S/MIME dan inline dari lampiran file. Jika tidak ada yang memenuhi syarat, ia menjalankan putaran longgar yang tetap mengecualikan S/MIME/inline tetapi mentolerir lebih banyak kasus (lihat Detail Kode). Gambar inline tidak pernah ditambahkan sebagai lampiran file; sebagai gantinya, saat "Include inline pictures" diaktifkan (bawaan), gambar ditanam langsung di badan balasan sebagai data URI base64.

| Jenis bagian                                                  |                        Putaran ketat |                      Putaran longgar |
| ------------------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| File tanda tangan S/MIME `smime.p7s`                          |                         Dikecualikan |                         Dikecualikan |
| Tipe MIME S/MIME (`application/pkcs7-*`)                      |                         Dikecualikan |                         Dikecualikan |
| Gambar inline yang direferensikan oleh Content‑ID (`image/*`) | Dikecualikan (dipulihkan di badan\*) | Dikecualikan (dipulihkan di badan\*) |
| Email terlampir (`message/rfc822`) dengan nama file           |                    Tidak ditambahkan |                    Dapat ditambahkan |
| Lampiran file biasa dengan nama file                          |                    Dapat ditambahkan |                    Dapat ditambahkan |

\* Saat "Include inline pictures" diaktifkan (default: ON), gambar inline ditanam di badan balasan sebagai data URI base64, bukan ditambahkan sebagai lampiran file. Lihat [Konfigurasi](configuration#include-inline-pictures).

Contoh: Beberapa lampiran mungkin tidak memiliki header tertentu tetapi tetap merupakan file biasa (bukan inline/S/MIME). Jika putaran ketat tidak menemukan apa pun, putaran longgar dapat menerima dan melampirkannya.

---

### Rujukan silang {#cross-reference}

- Teruskan (Forward) tidak dimodifikasi menurut desain (lihat Batasan di bawah).
- Untuk alasan mengapa lampiran mungkin tidak ditambahkan, lihat “Mengapa lampiran mungkin tidak ditambahkan”.

---

## Detail Perilaku {#behavior-details}

- Pencegahan duplikat: Add-on menandai tab penulisan sebagai telah diproses menggunakan nilai sesi per tab dan penjaga dalam memori. Add-on tidak akan menambahkan lampiran asli dua kali.
- Menutup dan membuka kembali jendela penulisan dianggap sebagai tab baru (artinya, upaya baru diizinkan).
- Menghormati lampiran yang sudah ada: Jika penulisan sudah berisi beberapa lampiran, lampiran asli tetap ditambahkan tepat satu kali, melewati nama file yang sudah ada.
- Pengecualian: Artefak S/MIME dan gambar inline dikecualikan dari lampiran file. Jika tidak ada yang memenuhi syarat pada putaran pertama, fallback longgar memeriksa ulang bagian non‑S/MIME. Gambar inline ditangani secara terpisah: gambar dipulihkan di badan balasan sebagai data URI (jika diaktifkan).
  - Nama file: `smime.p7s`
  - Tipe MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Gambar inline: setiap bagian `image/*` yang direferensikan oleh Content‑ID — dikecualikan dari lampiran file tetapi ditanam di badan balasan saat "Include inline pictures" ON
  - Email terlampir (`message/rfc822`): diperlakukan sebagai lampiran biasa jika memiliki nama file; dapat ditambahkan (tergantung pemeriksaan duplikat dan daftar hitam).
- Peringatan daftar hitam (jika diaktifkan): Saat kandidat dikecualikan oleh daftar hitam Anda, add-on menampilkan modal kecil yang mencantumkan file yang terpengaruh dan pola yang cocok. Peringatan ini juga muncul dalam kasus ketika tidak ada lampiran yang akan ditambahkan karena semuanya dikecualikan.

---

## Pintasan keyboard {#keyboard-shortcuts}

- Dialog konfirmasi: Y/J = Yes, N/Esc = No; Tab/Shift+Tab dan tombol panah mengalihkan fokus.
  - “Default answer” di [Konfigurasi](configuration#confirmation) menetapkan tombol yang awalnya difokuskan.
  - Enter menekan tombol yang difokuskan. Tab/Shift+Tab dan tombol panah memindahkan fokus untuk aksesibilitas.

### Lembar contekan keyboard {#keyboard-cheat-sheet}

| Tombol          | Aksi                                  |
| --------------- | ------------------------------------- |
| Y / J           | Konfirmasi Ya                         |
| N / Esc         | Konfirmasi Tidak                      |
| Enter           | Aktifkan tombol yang difokuskan       |
| Tab / Shift+Tab | Pindahkan fokus maju/mundur           |
| Tombol panah    | Pindahkan fokus antar tombol          |
| Default answer  | Menetapkan fokus awal (Ya atau Tidak) |

---

## Batasan {#limitations}

- Teruskan (Forward) tidak dimodifikasi oleh add-on ini (Balas dan Balas semua didukung).
- Lampiran yang sangat besar dapat tunduk pada batas Thunderbird atau penyedia.
  - Add-on tidak memecah atau mengompresi file; add-on mengandalkan penanganan lampiran normal Thunderbird.
- Pesan terenkripsi: bagian S/MIME sengaja dikecualikan.

---

## Mengapa lampiran mungkin tidak ditambahkan {#why-attachments-might-not-be-added}

- Gambar inline tidak ditambahkan sebagai lampiran file. Saat "Include inline pictures" ON (bawaan), gambar ditanam di badan balasan sebagai data URI. Jika pengaturan OFF, gambar inline dihapus sepenuhnya. Lihat [Konfigurasi](configuration#include-inline-pictures).
- Bagian tanda tangan S/MIME dikecualikan menurut desain: nama file seperti `smime.p7s` dan tipe MIME seperti `application/pkcs7-signature` atau `application/pkcs7-mime` dilewati.
- Pola daftar hitam dapat menyaring kandidat: lihat [Konfigurasi](configuration#blacklist-glob-patterns); pencocokan tidak peka huruf besar/kecil dan hanya berdasarkan nama file.
- Nama file duplikat tidak ditambahkan lagi: jika penulisan sudah berisi file dengan nama yang dinormalisasi sama, file tersebut dilewati.
- Bagian non-file atau nama file yang hilang: hanya bagian mirip file dengan nama file yang dapat digunakan yang dipertimbangkan untuk ditambahkan.

---

Lihat juga

- [Konfigurasi](configuration)
