---
id: usage
title: 'Penggunaan'
sidebar_label: 'Penggunaan'
---

---

## Penggunaan {#usage}

- Balas dan add-on menambah yang asal secara automatik — atau akan bertanya dahulu, jika didayakan dalam Pilihan.
- Nyahpendua mengikut nama fail; bahagian S/MIME sentiasa diabaikan. Imej sebaris dipulihkan dalam badan balasan secara lalai (nyahdayakan melalui "Sertakan gambar sebaris" dalam Pilihan).
- Lampiran yang disenaraihitamkan juga diabaikan (corak glob tidak peka huruf besar/kecil yang memadankan nama fail, bukan laluan). Lihat [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa yang berlaku apabila membalas {#what-happens}

- Kesan balasan → senaraikan lampiran asal → tapis S/MIME + sebaris → sahkan (pilihan) → tambah fail yang layak (langkau pendua) → pulihkan imej sebaris dalam badan.

Laluan tegas vs. santai: Add‑on terlebih dahulu mengecualikan bahagian S/MIME dan sebaris daripada lampiran fail. Jika tiada yang layak, ia menjalankan laluan santai yang masih mengecualikan S/MIME/sebaris tetapi bertolak ansur dengan lebih banyak kes (lihat Butiran Kod). Imej sebaris tidak pernah ditambah sebagai lampiran fail; sebaliknya, apabila "Sertakan gambar sebaris" didayakan (lalai), ia dibenamkan terus dalam badan balasan sebagai URI data base64.

| Jenis bahagian                                        |                            Laluan tegas |                           Laluan santai |
| ----------------------------------------------------- | --------------------------------------: | --------------------------------------: |
| Fail tandatangan S/MIME `smime.p7s`                   |                            Dikecualikan |                            Dikecualikan |
| Jenis MIME S/MIME (`application/pkcs7-*`)             |                            Dikecualikan |                            Dikecualikan |
| Imej sebaris yang dirujuk oleh Content‑ID (`image/*`) | Dikecualikan (dipulihkan dalam badan\*) | Dikecualikan (dipulihkan dalam badan\*) |
| Emel terlampir (`message/rfc822`) dengan nama fail    |                          Tidak ditambah |                        Mungkin ditambah |
| Lampiran fail biasa dengan nama fail                  |                        Mungkin ditambah |                        Mungkin ditambah |

\* Apabila "Sertakan gambar sebaris" didayakan (lalai: AKTIF), imej sebaris dibenamkan dalam badan balasan sebagai URI data base64 dan bukan ditambah sebagai lampiran fail. Lihat [Konfigurasi](configuration#include-inline-pictures).

Contoh: Sesetengah lampiran mungkin kekurangan pengepala tertentu tetapi masih merupakan fail biasa (bukan sebaris/S/MIME). Jika laluan tegas tidak menemui apa-apa, laluan santai mungkin menerima yang itu dan melampirkannya.

---

### Rujukan silang {#cross-reference}

- Forward tidak diubah mengikut reka bentuk (lihat Had di bawah).
- Untuk sebab-sebab mengapa lampiran mungkin tidak ditambah, lihat “Mengapa lampiran mungkin tidak ditambah”.

---

## Butiran Kelakuan {#behavior-details}

- **Pencegahan pendua:** Add-on menandakan tab gubahan sebagai telah diproses menggunakan nilai sesi per‑tab dan pengawal dalam memori. Ia tidak akan menambah yang asal dua kali.
- Menutup dan membuka semula tetingkap gubahan dianggap sebagai tab baharu (iaitu, percubaan baharu dibenarkan).
- **Menghormati lampiran sedia ada:** Jika gubahan sudah mengandungi beberapa lampiran, lampiran asal masih ditambah sekali sahaja, melangkau nama fail yang sudah wujud.
- **Pengecualian:** Artifak S/MIME dan imej sebaris dikecualikan daripada lampiran fail. Jika tiada yang layak pada laluan pertama, laluan gantian santai menyemak semula bahagian bukan S/MIME. Imej sebaris dikendalikan secara berasingan: ia dipulihkan dalam badan balasan sebagai URI data (apabila didayakan).
  - **Nama fail:** `smime.p7s`
  - **Jenis MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imej sebaris:** sebarang bahagian `image/*` yang dirujuk oleh Content‑ID — dikecualikan daripada lampiran fail tetapi dibenamkan dalam badan balasan apabila "Sertakan gambar sebaris" AKTIF
  - **Emel terlampir (`message/rfc822`):** diperlakukan sebagai lampiran biasa jika ia mempunyai nama fail; ia mungkin ditambah (tertakluk pada semakan pendua dan senarai hitam).
- **Amaran senarai hitam (jika didayakan):** Apabila calon dikecualikan oleh senarai hitam anda,
  add-on memaparkan modal kecil yang menyenaraikan fail yang terjejas dan
  corak yang sepadan. Amaran ini juga muncul dalam kes di mana tiada lampiran akan
  ditambah kerana semuanya dikecualikan.

---

## Pintasan papan kekunci {#keyboard-shortcuts}

- Dialog pengesahan: Y/J = Ya, N/Esc = Tidak; kekunci Tab/Shift+Tab dan Anak Panah mengitar fokus.
  - “Jawapan lalai” dalam [Konfigurasi](configuration#confirmation) menetapkan butang yang difokuskan pada mulanya.
  - Enter mencetuskan butang yang difokuskan. Tab/Shift+Tab dan anak panah mengalihkan fokus untuk kebolehcapaian.

### Helaian Rujukan Pintasan Papan Kekunci {#keyboard-cheat-sheet}

| Kekunci            | Tindakan                              |
| ------------------ | ------------------------------------- |
| Y / J              | Sahkan Ya                             |
| N / Esc            | Sahkan Tidak                          |
| Enter              | Aktifkan butang yang difokuskan       |
| Tab / Shift+Tab    | Gerakkan fokus ke hadapan/belakang    |
| Kekunci anak panah | Gerakkan fokus antara butang          |
| Jawapan lalai      | Menetapkan fokus awal (Ya atau Tidak) |

---

## Had {#limitations}

- Forward tidak diubah oleh add-on ini (Balas dan Balas semua disokong).
- Lampiran yang sangat besar mungkin tertakluk pada had Thunderbird atau penyedia.
  - Add‑on tidak membahagikan atau memampatkan fail; ia bergantung pada pengendalian lampiran biasa Thunderbird.
- Mesej yang disulitkan: bahagian S/MIME sengaja dikecualikan.

---

## Mengapa lampiran mungkin tidak ditambah {#why-attachments-might-not-be-added}

- Imej sebaris tidak ditambah sebagai lampiran fail. Apabila "Sertakan gambar sebaris" AKTIF (lalai), ia dibenamkan dalam badan balasan sebagai URI data. Jika tetapan itu DIMATIKAN, imej sebaris dialih keluar sepenuhnya. Lihat [Konfigurasi](configuration#include-inline-pictures).
- Bahagian tandatangan S/MIME dikecualikan mengikut reka bentuk: nama fail seperti `smime.p7s` dan jenis MIME seperti `application/pkcs7-signature` atau `application/pkcs7-mime` diabaikan.
- Corak senarai hitam boleh menapis calon: lihat [Konfigurasi](configuration#blacklist-glob-patterns); padanan adalah tidak peka huruf besar/kecil dan hanya berdasarkan nama fail.
- Nama fail pendua tidak akan ditambah semula: jika gubahan sudah mengandungi fail dengan nama ternormal yang sama, ia akan dilangkau.
- Bahagian bukan fail atau tiada nama fail: hanya bahagian seperti fail dengan nama fail yang boleh digunakan akan dipertimbangkan untuk ditambah.

---

Lihat juga

- [Konfigurasi](configuration)
