---
id: support
title: 'Sokongan'
sidebar_label: 'Sokongan'
---

## FAQ {#faq}

### Lampiran tidak ditambah - mengapa?

- Imej dalam talian dan bahagian S/MIME dikecualikan secara sengaja.
- Nama fail yang sama akan diabaikan jika kompos sudah mempunyai fail yang sama.
- Corak senarai hitam mungkin menapis calon; lihat [Konfigurasi](configuration#blacklist-glob-patterns).

### Bolehkah saya mengesahkan sebelum menambah lampiran?

Ya. Aktifkan “Tanya sebelum menambah lampiran” di bawah [Konfigurasi → Pengesahan](configuration#confirmation). Kekunci: Y/J = Ya, N/Esc = Tidak.

### Adakah tambah‑on menghantar sebarang data atau menjejak penggunaan?

Tidak. Lihat [Privasi](privacy) — tiada telemetri dan tiada permintaan rangkaian latar belakang.

### Terus tidak menambah lampiran - adakah itu dijangkakan?

Ya. Hanya Balas dan Balas semua yang diubah oleh tambah‑on ini; Terus dibiarkan tidak berubah. Lihat [Had](usage#limitations).

### Di manakah snooze Derma?

Pilihan → Bahagian Sokongan. Lihat [Keterlihatan Derma](configuration#donation-visibility).

---

## Sokongan

Perlu bantuan atau ingin melaporkan pepijat?

---

### Buka isu di GitHub:

- Repositori: `bitranox/Thunderbird-Reply-with-Attachments`
- Isu: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Sertakan versi Thunderbird (contohnya, 128 ESR), OS, dan langkah untuk menghasilkan semula
- Lampirkan log berkaitan dari Konsol Ralat Thunderbird (Alat → Alat Pembangun → Konsol Ralat)

- Tapak tambah‑on (ATN): Anda juga boleh meninggalkan maklum balas melalui [halaman tambah‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tip

- Pastikan anda menggunakan versi Thunderbird yang disokong (128 ESR atau lebih baru).
- Semak dokumen Konfigurasi dan Penggunaan untuk soalan set up yang biasa.
- Untuk pembangunan/ujian, lihat panduan Pembangunan.
- Jika tetapan yang disimpan tidak nampak diterapkan dengan betul, mulakan semula Thunderbird dan cuba lagi. (Thunderbird mungkin menyimpan keadaan merentasi sesi; mulakan semula memastikan tetapan baru dimuatkan.)
- Pro rep minimal: cuba dengan e-mel uji kecil yang mengandungi satu atau dua lampiran fail mudah.
- Bandingkan tingkah laku dengan pengesahan ON vs. OFF untuk mengecilkan sama ada aliran dialog terlibat.

---

### Apa yang perlu disertakan dalam laporan

- Versi Thunderbird dan OS
- Langkah tepat untuk menghasilkan semula (apa yang anda lakukan, apa yang anda harapkan, apa yang berlaku)
- Sama ada pengesahan diaktifkan dan tetapan jawapan lalai anda
- Contoh corak senarai hitam anda (jika berkaitan)
- Log Konsol Ralat semasa menghasilkan semula (Alat → Alat Pembangun → Konsol Ralat)
- Aktifkan log pengesanan (pilihan):
  - Jalankan di Konsol Ralat Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Hasilkan isu dan salin baris log `[RWA]` yang berkaitan

---

### Templat isu (salin/ Tampal) {#issue-template}

- Versi Thunderbird dan OS:
- Langkah untuk menghasilkan semula:
- Pengesahan diaktifkan? Jawapan lalai:
- Contoh corak senarai hitam:
- Log Konsol Ralat (Alat → Alat Pembangun → Konsol Ralat):
- Apa-apa yang lain berkaitan:

---

### Derma

Jika anda ingin menyokong projek ini, sila pertimbangkan sumbangan kecil di halaman [Derma](donation). Terima kasih!

---
