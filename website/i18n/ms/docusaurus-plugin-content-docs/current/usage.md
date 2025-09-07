---
id: usage
title: Penggunaan
sidebar_label: Penggunaan
---

## Penggunaan

- Balas dan add‑on akan menambah fail asal secara automatik — atau akan bertanya dahulu jika diaktifkan dalam Options.
- Nyahpenduaan mengikut nama fail; SMIME dan imej inline sentiasa diabaikan.
- Lampiran yang disenarai hitam juga diabaikan (tidak peka huruf besar/kecil, pola glob).

---

## Perincian Tingkah Laku

- Pencegahan pendua: Add‑on menandakan tab karang (compose) sebagai telah diproses menggunakan nilai sesi per‑tab dan pengawal dalam memori. Ia tidak akan menambah asal dua kali.
- Menghormati lampiran sedia ada: Jika karang sudah mengandungi beberapa lampiran, fail asal tetap ditambah tepat sekali, dengan melangkau nama fail yang sudah wujud.
- Pengecualian: Artifak SMIME (cth. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) dan imej inline diabaikan. Jika tiada yang layak pada pusingan pertama, satu fallback yang lebih longgar menyemak semula bahagian bukan SMIME.
- Amaran senarai hitam (jika diaktifkan): Apabila calon dikecualikan oleh senarai hitam anda, add‑on memaparkan modal kecil yang menyenaraikan fail terkesan dan pola yang sepadan. Amaran ini turut muncul apabila tiada lampiran akan ditambah kerana semuanya dikecualikan.
