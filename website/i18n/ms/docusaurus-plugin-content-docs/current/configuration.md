---
id: configuration
title: 'Konfigurasi'
---

## Konfigurasi

Terminologi nota: lihat [Glosari](glossary) untuk istilah yang konsisten digunakan dalam UI dan dokumen.

---

## Buka pilihan di Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Alat → Tambahan dan Tema → cari “Balas dengan Lampiran” → Keutamaan/Pilihan

---

### Tetapan {#settings}

#### Pengesahan {#confirmation}

- Togol “Tanya sebelum menambah lampiran”
- Jawapan default: Ya atau Tidak (fokus & default papan kekunci)
- Papan Kekunci: Y/J = Ya; N/Esc = Tidak; Tab/Shift+Tab dan kekunci Anak panah mengubah fokus
  - Lihat butiran papan kekunci dalam [Penggunaan](usage#keyboard-shortcuts).

---

#### Senarai Hitam (pola glob) {#blacklist-glob-patterns}

Fail yang disenaraikan hitam tidak akan ditambah secara automatik pada balasan. Lihat juga [Glosari](glossary) untuk “Senarai Hitam (Senarai Pengecualian)”.

- Satu pola setiap baris; tidak sensitif kes; hanya menjadikan nama fail sebagai padanan
- Contoh: `*intern*`, `*secret*`, `*passwor*`
- Token glob yang disokong: `*` (apa-apa watak kecuali `/`), `?` (satu watak), kelas watak seperti `[abc]`. Gunakan `\[` untuk mencocokkan `[` secara literal. Laluan (`**/`) diabaikan kerana hanya nama fail yang dipadankan.
- Tidak disokong: penolakan (`!`), pengembangan tanda kurung (`{..}`), dan julat kompleks. Kekalkan pola sederhana.
- Komen tidak disokong dalam pola. Jangan masukkan `#` atau komen dalam barisan; masukkan hanya teks pola setiap baris.

---

##### Buku Masakan Pola {#pattern-cookbook}

- Padankan sebarang PDF: `*.pdf`
- Padankan fail yang bermula dengan “imbas”: `scan*`
- Kelas watak: `report[0-9].txt`
- Larikan `[` secara literal: `\[` (berguna apabila memadankan tanda kurung sebagai watak)

---

##### Nota {#blacklist-notes}

- Susunan tidak penting; padanan pertama/apa-apa mengecualikan fail.
- Padanan hanya pada nama fail (laluan/folder diabaikan).
- “Tetapkan semula kepada lalai” mengembalikan pola yang disyorkan dan togol amaran senarai hitam.
- Mengapa contoh `*passwor*`? Ia memadankan kedua-dua keluarga “kata laluan” dan “Passwort”.
- Keutamaan: jika mana-mana pola memadankan nama fail, fail tersebut dikecualikan (padanan pertama/apa-apa — urutan tidak mengubah keputusan).
- Petua — uji pola anda: tambah pola sementara, balas kepada mesej yang mengandungi fail dengan nama yang sepadan, dan sahkan ia dikecualikan dalam senarai amaran.

##### Cubaan ringkas (ujian selamat) {#blacklist-try-it}

1. Buka Pilihan → Senarai Hitam.
2. Tambah pola sementara seperti `*.tmp` dan klik Simpan.
3. Balas kepada emel ujian yang mempunyai fail yang berakhir dengan `.tmp` — fail itu sepatutnya muncul dalam senarai amaran dan tidak dilampirkan.
4. Buang pola sementara selepas selesai, atau klik “Tetapkan semula kepada lalai”.

---

#### Amaran mengenai lampiran yang dikecualikan {#warning-on-excluded-attachments}

- Togol “Amaran jika lampiran dikecualikan oleh senarai hitam” (default: HIDUP).
- Apabila dihidupkan, modal kecil menyenaraikan fail yang dikecualikan dan pola yang sepadan. Amaran juga muncul apabila tiada apa yang akan dilampirkan kerana semua calon telah disenaraikan hitam.

---

#### Simpan tetapan anda {#save-your-settings}

Tetapan disimpan dengan menekan butang Simpan. Anda boleh membalikkan medan individu secara manual atau menetapkan semula kepada lalai jika perlu.

Jika tetapan yang disimpan tidak nampak berfungsi dengan betul, mulakan semula Thunderbird dan cuba lagi. (Thunderbird mungkin menyimpan keadaan merentas sesi; satu mulaan semula memastikan tetapan baru dimuatkan.)

Petua: Untuk mengesahkan tetapan anda berfungsi, balas kepada mana-mana mesej dengan lampiran dan periksa pengesahan atau amaran senarai hitam.

---

#### Keterlihatan Sumbangan (pemadaman 90-hari) {#donation-visibility}

Tambahan ini menyertakan ciri kemudahan untuk menyembunyikan permintaan sumbangan selama sementara selepas anda menyumbang.

Di mana untuk mencarinya

- Pilihan → Bahagian Sokongan: anda akan melihat butang “Saya menyumbang” dan kawasan petunjuk kecil.
- Dialog Pengesahan Penghantaran juga menunjukkan butang Sumbang; ia secara automatik tersembunyi apabila pemadaman aktif.

Bagaimana ia berfungsi

- Mengklik “Saya menyumbang” menyembunyikan butang sumbangan dan permintaan berkaitan selama 90 hari.
- Petunjuk status menunjukkan “Tersembunyi sehingga YYYY‑MM‑DD” (dalam tarikh tempatan anda). Terdapat juga butang “Tunjuk Sumbang lagi” untuk mengembalikan keterlihatan dengan segera.
- Selepas 90 hari, butang Sumbang akan kelihatan secara automatik kembali.

Privasi & penyimpanan

- Tambahan ini menyimpan satu cap waktu dalam penyimpanan tempatan Thunderbird untuk mengingati tempoh pemadaman. Kunci: `donateHideUntil` (milisa kedua epoch).
- Tetapan ini adalah tempatan kepada profil Thunderbird anda (tidak diselaraskan awan). Tiada permintaan rangkaian dibuat oleh ciri ini.

Penyelesaian Masalah

- Jika Sumbang masih muncul segera selepas mengklik “Saya menyumbang”, tunggu sejenak atau buka kembali halaman Pilihan; UI dikemas kini sebaik sahaja tetapan disimpan.
- Untuk menetapkan semula secara manual, klik “Tunjuk Sumbang lagi”. Anda juga boleh menunggu sehingga tarikh yang disenaraikan dalam petunjuk berlalu.

Ciri ini semata-mata untuk kemudahan; ia tidak pernah menyekat fungsi tambahan dan tidak mengumpul sebarang data peribadi.

---

### Normalisasi Nama Fail (pencegahan duplikasi) {#filename-normalization-duplicates-prevention}

Untuk berkelakuan konsisten merentas platform, nama fail dinormalisasi sebelum semakan duplikasi:

- Unicode dinormalisasi kepada NFC.
- Nama dilipat kes (ditukar kepada huruf kecil).
- Titik/ruang akhir dipotong (keselesaan Windows).

Ini menjaga pengesanan duplikasi yang boleh diramalkan untuk nama seperti `café.pdf` berbanding `café.pdf` (NFD) atau `FILE.txt.` berbanding `file.txt`.

---

## Tingkah Laku Pengesahan {#confirmation-behavior}

- “Jawapan default” menetapkan butang yang awalnya fokus dalam dialog pengesahan (berguna untuk pengguna papan kekunci).
- Berfungsi untuk “Balas” dan “Balas semua”. “Hantar” tidak diubah oleh tambahan ini.

---

## Lanjutan: pengesanan duplikasi {#advanced-duplicate-detection}

Pencegahan duplikasi dilaksanakan menerusi tab kompos dan dengan nama fail. Lihat [Penggunaan](usage#behavior-details) untuk penjelasan terperinci.

---

Lihat juga

- [Kebenaran](permissions)
- [Privasi](privacy)
