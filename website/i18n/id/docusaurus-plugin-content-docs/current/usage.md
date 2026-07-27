---
id: usage
title: 'Penggunaan'
sidebar_label: 'Penggunaan'
---

---

## Penggunaan {#usage}

- Balas dan add-on menambahkan lampiran asli secara otomatis — atau meminta konfirmasi terlebih dahulu, jika diaktifkan di Opsi.
- Dideduplikasi berdasarkan nama file; bagian S/MIME selalu dilewati. Gambar yang disematkan dalam pesan asli tetap berada di badan balasan, tempat Thunderbird menempatkannya, dan tidak disalin sebagai file.
- Lampiran yang masuk daftar hitam juga dilewati (pola glob tidak peka huruf besar/kecil yang mencocokkan nama file, bukan path). Lihat [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa yang terjadi saat membalas {#what-happens}

- Mendeteksi balasan → mendaftar lampiran asli → melewati S/MIME dan gambar tersemat → konfirmasi opsional → menambahkan file yang memenuhi syarat (melewati duplikat).

| Jenis bagian                                                     | Disalin ke balasan         |
|------------------------------------------------------------------|---------------------------:|
| File tanda tangan S/MIME `smime.p7s`                             | Tidak                      |
| Jenis MIME S/MIME (`application/pkcs7-*`)                        | Tidak                      |
| Gambar yang disematkan badan pesan melalui `cid:`                | Tidak (ada di badan pesan) |
| Gambar yang ditandai `Content-Disposition: inline`               | Tidak (ada di badan pesan) |
| Gambar dengan `Content-ID` yang tidak pernah dirujuk badan pesan | Ya                         |
| Email terlampir (`message/rfc822`) dengan nama file              | Ya                         |
| Lampiran file biasa dengan nama file                             | Ya                         |

Sebuah gambar dianggap disematkan hanya jika pesan asli benar-benar merujuknya, atau jika pengirim secara eksplisit menandainya `Content-Disposition: inline`. Header `Content-ID` saja tidak cukup: beberapa klien email memasangnya pada setiap bagian gambar, termasuk lampiran asli, dan itu tetap harus disalin.

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
|-----------------|---------------------------------------|
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

- Gambar yang disematkan pesan asli tidak disalin sebagai file. Gambar tersebut sudah ada di badan balasan, tempat Thunderbird meletakkannya. Lihat [Konfigurasi](configuration#include-inline-pictures).
- Bagian tanda tangan S/MIME dikecualikan menurut desain: nama file seperti `smime.p7s` dan tipe MIME seperti `application/pkcs7-signature` atau `application/pkcs7-mime` dilewati.
- Pola daftar hitam dapat menyaring kandidat: lihat [Konfigurasi](configuration#blacklist-glob-patterns); pencocokan tidak peka huruf besar/kecil dan hanya berdasarkan nama file.
- Nama file duplikat tidak ditambahkan lagi: jika penulisan sudah berisi file dengan nama yang dinormalisasi sama, file tersebut dilewati.
- Bagian non-file atau nama file yang hilang: hanya bagian mirip file dengan nama file yang dapat digunakan yang dipertimbangkan untuk ditambahkan.

---

Lihat juga

- [Konfigurasi](configuration)
