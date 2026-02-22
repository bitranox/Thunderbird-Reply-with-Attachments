---
id: features
title: 'Ciri-ciri'
sidebar_label: 'Ciri-ciri'
---

---

## Ciri-ciri {#features}

- Melampirkan fail daripada e-mel asal secara automatik apabila membalas.
- Tingkah laku boleh dikonfigurasi: lampiran boleh
  - ditambah secara automatik, atau
  - ditambah hanya selepas pengesahan (dialog kecil yang boleh diakses). Dalam Pilihan anda
    boleh mengaktifkan pengesahan dan memilih jawapan lalai (Ya/Tidak).
- Senarai hitam nama fail (pola glob) menghalang fail tertentu daripada
  dilampirkan secara automatik. Contoh: `*intern*`, `*secret*`, `*passwor*`.
  Pemadanan adalah tidak peka huruf besar/kecil dan hanya menyemak nama fail; sediakan satu pola
  setiap baris dalam Pilihan.
- Amaran senarai hitam (pilihan, diaktifkan secara lalai): apabila fail dikecualikan oleh
  senarai hitam anda, satu modal kecil menyenaraikan fail dan pola yang sepadan. Mesra mod gelap
  dan boleh diakses papan kekunci (Enter/Esc untuk menutup).
- Berfungsi dengan Balas dan Balas semua. Teruskan tidak diubah oleh pengaya ini.
- Menambah yang asal walaupun anda telah melampirkan sesuatu sendiri; mengelakkan pendua mengikut nama fail.
- Perlindungan pendua per tab mengelakkan penambahan dua kali dalam tab Tulis yang sama.
- Melangkau sijil S/MIME secara lalai untuk mengelakkan lampiran yang tidak perlu.
- Sertakan gambar sebaris (lalai: AKTIF). Imej tertanam dipulihkan terus dalam
  badan balasan sebagai URI data base64, mengekalkan susun atur sebaris asal. Lumpuhkan dalam
  Pilihan untuk melangkau imej sebaris sepenuhnya.

---

## Cara Ia Berfungsi {#how-it-works}

- Apabila membalas, pengaya menyenaraikan lampiran asal.
- Menapis tandatangan S/MIME daripada lampiran fail; imej sebaris dipulihkan dalam badan (melainkan dilumpuhkan).
- Secara pilihan meminta pengesahan (mesra papan kekunci).
- Menambah fail yang layak ke tetingkap Tulis anda, mengelakkan pendua mengikut nama fail.
- Lihat “Mengapa lampiran mungkin tidak ditambahkan” dalam Penggunaan untuk kes pinggir.

Nota privasi: Semua pemprosesan berlaku secara setempat dalam Thunderbird. Pengaya ini tidak membuat sebarang permintaan rangkaian latar belakang.

---
