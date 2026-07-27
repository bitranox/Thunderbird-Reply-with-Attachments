---
id: usage
title: 'Penggunaan'
sidebar_label: 'Penggunaan'
---

---

## Penggunaan {#usage}

- Balas dan add-on menambah yang asal secara automatik — atau akan bertanya dahulu, jika didayakan dalam Pilihan.
- Dinyahduplikasi mengikut nama fail; bahagian S/MIME sentiasa dilangkau. Imej yang dibenamkan dalam mesej asal kekal dalam badan balasan, di tempat Thunderbird meletakkannya, dan tidak disalin sebagai fail.
- Lampiran yang disenaraihitamkan juga diabaikan (corak glob tidak peka huruf besar/kecil yang memadankan nama fail, bukan laluan). Lihat [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa yang berlaku apabila membalas {#what-happens}

- Kesan balasan → senaraikan lampiran asal → langkau S/MIME dan imej terbenam → pengesahan pilihan → tambah fail yang layak (melangkau duplikat).

| Jenis bahagian                                                | Disalin ke balasan            |
|---------------------------------------------------------------|------------------------------:|
| Fail tandatangan S/MIME `smime.p7s`                           | Tidak                         |
| Jenis MIME S/MIME (`application/pkcs7-*`)                     | Tidak                         |
| Imej yang dibenamkan oleh badan mesej melalui `cid:`          | Tidak (ia berada dalam badan) |
| Imej yang ditanda `Content-Disposition: inline`               | Tidak (ia berada dalam badan) |
| Imej dengan `Content-ID` yang tidak pernah dirujuk oleh badan | Ya                            |
| E-mel dilampirkan (`message/rfc822`) dengan nama fail         | Ya                            |
| Lampiran fail biasa dengan nama fail                          | Ya                            |

Imej dikira sebagai dibenamkan hanya apabila mesej asal benar-benar merujuknya, atau apabila penghantar menandakannya
secara jelas sebagai `Content-Disposition: inline`. Header `Content-ID` semata-mata tidak mencukupi: beberapa klien mel
meletakkannya pada setiap bahagian imej, termasuk lampiran sebenar, dan itu masih perlu disalin.

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
|--------------------|---------------------------------------|
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

- Imej yang dibenamkan oleh mesej asal tidak disalin sebagai fail. Imej tersebut sudah pun berada dalam badan balasan, di tempat Thunderbird meletakkannya. Lihat [Configuration](configuration#include-inline-pictures).
- Bahagian tandatangan S/MIME dikecualikan mengikut reka bentuk: nama fail seperti `smime.p7s` dan jenis MIME seperti `application/pkcs7-signature` atau `application/pkcs7-mime` diabaikan.
- Corak senarai hitam boleh menapis calon: lihat [Konfigurasi](configuration#blacklist-glob-patterns); padanan adalah tidak peka huruf besar/kecil dan hanya berdasarkan nama fail.
- Nama fail pendua tidak akan ditambah semula: jika gubahan sudah mengandungi fail dengan nama ternormal yang sama, ia akan dilangkau.
- Bahagian bukan fail atau tiada nama fail: hanya bahagian seperti fail dengan nama fail yang boleh digunakan akan dipertimbangkan untuk ditambah.

---

Lihat juga

- [Konfigurasi](configuration)
