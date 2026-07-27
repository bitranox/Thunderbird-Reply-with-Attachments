---
id: usage
title: 'Panganggoné'
sidebar_label: 'Panganggone'
---

---

## Panganggone {#usage}

- Wangsuli lan add‑on bakal otomatis nambahake sing asli — utawa takon dhisik, yen diaktifake ing Options.
- Diduplikasi manut jeneng file; bagean S/MIME tansah dilewati. Gambar sing ditempelake ing pesen asli tetep ana ing awak balesan, panggonan Thunderbird nyelehake, lan ora dicopy dadi file.
- Lampiran sing ana ing blacklist uga dilewati (pola glob sing ora mbedakake huruf gedhé‑cilik, cocog karo jeneng file, dudu path). Delengen [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa sing kelakon nalika wangsuli {#what-happens}

- Ndeteksi balesan → nampilake dhaftar lampiran asli → ngliwati S/MIME lan gambar sing ditempelake → konfirmasi opsional → nambahake file sing memenuhi syarat (ngliwati duplikat).

| Jinis bagean                                                     | Dicopy menyang balesan   |
|------------------------------------------------------------------|-------------------------:|
| File tandha tangan S/MIME `smime.p7s`                            | Ora                      |
| Jinis MIME S/MIME (`application/pkcs7-*`)                        | Ora                      |
| Gambar sing ditempelake awak pesen liwat `cid:`                  | Ora (ana ing awak pesen) |
| Gambar sing ditandhani `Content-Disposition: inline`             | Ora (ana ing awak pesen) |
| Gambar sing duwe `Content-ID` nanging ora tau dirujuk awak pesen | Ya                       |
| Email sing dilampirake (`message/rfc822`) karo jeneng file       | Ya                       |
| Lampiran file biasa karo jeneng file                             | Ya                       |

Gambar diétung minangka sing ditempelake mung yèn pesen asli pancen ngrujuk marang gambar kasebut, utawa yèn pengirim kanthi cetha nandhani minangka `Content-Disposition: inline`. Header `Content-ID` waé ora cukup: sawetara klien email masang header kasebut ing saben bagean gambar, kalebu lampiran asli, lan kasebut isih kudu dicopy.

---

### Rujukan silang {#cross-reference}

- Nerusake (Forward) ora diowahi miturut rancangan (delengen Watesan ing ngisor).
- Kanggo sebab kenapa lampiran bisa wae ora ditambahake, delengen “Napa lampiran bisa uga ora ditambahake”.

---

## Rincian Prilaku {#behavior-details}

- **Nyegah duplikat:** Add‑on nandhani tab nyusun (compose) minangka wis diproses nganggo nilai sesi per‑tab lan pengaman ing memori. Ora bakal nambahake sing asli kaping pindho.
- Nutup lan mbukak maneh jendhela nyusun dianggep kaya tab anyar (tegesé, nyoba anyar diijini).
- **Ngurmati lampiran sing wis ana:** Yen ing compose wis ana sawetara lampiran, sing asli tetep ditambahake pas pisan wae, kanthi ngliwati jeneng file sing wis ana.
- **Pangkecualian:** Artefak S/MIME lan gambar inline dikecualekake saka lampiran file. Yen ora ana sing lolos ing liwatan pisanan, fallback longgar mriksa maneh bagéan non‑S/MIME. Gambar inline ditangani kanthi kapisah: dipulihake ing isi wangsulan minangka URI data (yen diaktifake).
  - **Jeneng file:** `smime.p7s`
  - **Tipe MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Gambar inline:** sembarang bagéan `image/*` sing dirujuk dening Content‑ID — dikecualekake saka lampiran file nanging dilebokake ing isi wangsulan nalika "Include inline pictures" ON
  - **Email sing dilampirake (`message/rfc822`):** dianggep minangka lampiran biasa yen nduwèni jeneng file; bisa ditambahake (gumantung mriksa duplikat lan blacklist).
- **Peringatan blacklist (yen diaktifake):** Nalika calon lampiran dikecualekake amarga blacklist panjenengan,
  add‑on nampilake modal cilik sing ndhaptar file sing kena lan pola
  sing cocog. Peringatan iki uga katon nalika ora ana lampiran sing bakal
  ditambahake amarga kabeh dikecualekake.

---

## Pintasan keyboard {#keyboard-shortcuts}

- Dialog konfirmasi: Y/J = Ya, N/Esc = Ora; Tab/Shift+Tab lan tombol panah ngurip‑urip fokus.
  - “Wangsulan gawané” ing [Konfigurasi](configuration#confirmation) nyetel tombol sing wiwitane fokus.
  - Enter ngaktifake tombol sing fokus. Tab/Shift+Tab lan tombol panah mindhah fokus kanggo aksèsibilitas.

### Ringkesan keyboard {#keyboard-cheat-sheet}

| Tombol           | Tumindak                         |
|------------------|----------------------------------|
| Y / J            | Konfirmasi Ya                    |
| N / Esc          | Konfirmasi Ora                   |
| Enter            | Ngaktifake tombol sing fokus     |
| Tab / Shift+Tab  | Mindhah fokus maju/mburi         |
| Tombol panah     | Mindhah fokus antarane tombol    |
| Wangsulan gawané | Nyetel fokus awal (Ya utawa Ora) |

---

## Watesan {#limitations}

- Nerusake ora diowahi dening add‑on iki (Reply lan Reply all didhukung).
- Lampiran gedhé banget bisa kena watesan Thunderbird utawa panyedhiya.
  - Add‑on ora mecah (chunk) utawa ngompres file; gumantung marang penanganan lampiran normalé Thunderbird.
- Pesen sing dienkripsi: bagean S/MIME kanthi sengaja dikecualekake.

---

## Napa lampiran bisa uga ora ditambahake {#why-attachments-might-not-be-added}

- Gambar sing ditempelake pesen asli ora disalin dadi file. Gambar kasebut wis ana ing awak balesan, ing ngendi Thunderbird nglebokake. Deleng [Konfigurasi](configuration#include-inline-pictures).
- Bagean tandha S/MIME dikecualekake miturut rancangan: jeneng file kaya `smime.p7s` lan tipe MIME kayata `application/pkcs7-signature` utawa `application/pkcs7-mime` bakal dilewati.
- Pola blacklist bisa nyaring calon: delengen [Konfigurasi](configuration#blacklist-glob-patterns); pencocokan ora mbedakake huruf gedhé‑cilik lan mung adhedhasar jeneng file.
- Jeneng file duplikat ora ditambahake maneh: yen ing compose wis ana file kanthi jeneng sing wis dinormalake padha, bakal dilewati.
- Bagéan sing dudu file utawa ora ana jeneng file: mung bagéan kaya file sing nduwèni jeneng file migunani sing dianggep kanggo ditambahake.

---

Delengen uga

- [Konfigurasi](configuration)
