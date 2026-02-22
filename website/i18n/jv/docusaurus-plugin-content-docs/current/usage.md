---
id: usage
title: 'Panganggoné'
sidebar_label: 'Panganggone'
---

---

## Panganggone {#usage}

- Wangsuli lan add‑on bakal otomatis nambahake sing asli — utawa takon dhisik, yen diaktifake ing Options.
- Ora dobel adhedhasar jeneng file; bagean S/MIME mesthi dilewati. Gambar inline dipulihake maneh ing isi wangsulan sacara gawané (bisa dipateni liwat "Include inline pictures" ing Options).
- Lampiran sing ana ing blacklist uga dilewati (pola glob sing ora mbedakake huruf gedhé‑cilik, cocog karo jeneng file, dudu path). Delengen [Konfigurasi](configuration#blacklist-glob-patterns).

---

### Apa sing kelakon nalika wangsuli {#what-happens}

- Ndeteksi wangsulan → ndhaptar lampiran asli → nyaring S/MIME + inline → konfirmasi opsional → nambahake file sing layak (ngliwati duplikat) → mulihake gambar inline ing isi.

Liwatan ketat vs. longgar: Add‑on dhisik ngecualekake bagean S/MIME lan inline saka lampiran file. Yen ora ana sing lolos, bakal mlaku liwatan longgar sing isih ngecualekake S/MIME/inline nanging luwih toleran marang sawetara kasus (delengen Rincian Kode). Gambar inline ora tau ditambahake minangka lampiran file; tinimbang kuwi, yen "Include inline pictures" diaktifake (gawané), gambar kasebut dilebokake langsung ing isi wangsulan minangka URI data base64.

| Jinis bagean                                                  |                        Liwatan ketat |                      Liwatan longgar |
| ------------------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| Berkas tandha S/MIME `smime.p7s`                              |                        Dikecualekake |                        Dikecualekake |
| Tipe MIME S/MIME (`application/pkcs7-*`)                      |                        Dikecualekake |                        Dikecualekake |
| Gambar inline sing dirujuk dening Content‑ID (`image/*`)      | Dikecualekake (dipulihake ing isi\*) | Dikecualekake (dipulihake ing isi\*) |
| Email sing dilampirake (`message/rfc822`) nganggo jeneng file |                      Ora ditambahake |                     Bisa ditambahake |
| Lampiran file biasa nganggo jeneng file                       |                     Bisa ditambahake |                     Bisa ditambahake |

\* Yen "Include inline pictures" diaktifake (gawané: ON), gambar inline dilebokake ing isi wangsulan minangka URI data base64, dudu ditambahake minangka lampiran file. Delengen [Konfigurasi](configuration#include-inline-pictures).

Conto: Sawetara lampiran bisa wae ora nduwèni header tartamtu nanging isih kalebu file biasa (dudu inline/S/MIME). Yen liwatan ketat ora nemokake apa‑apa, liwatan longgar bisa nampa kuwi lan nglampirake.

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
| ---------------- | -------------------------------- |
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

- Gambar inline ora ditambahake minangka lampiran file. Nalika "Include inline pictures" ON (gawané), gambar kasebut dilebokake ing isi wangsulan minangka URI data. Yen setelan OFF, gambar inline dibusak sakabèhé. Delengen [Konfigurasi](configuration#include-inline-pictures).
- Bagean tandha S/MIME dikecualekake miturut rancangan: jeneng file kaya `smime.p7s` lan tipe MIME kayata `application/pkcs7-signature` utawa `application/pkcs7-mime` bakal dilewati.
- Pola blacklist bisa nyaring calon: delengen [Konfigurasi](configuration#blacklist-glob-patterns); pencocokan ora mbedakake huruf gedhé‑cilik lan mung adhedhasar jeneng file.
- Jeneng file duplikat ora ditambahake maneh: yen ing compose wis ana file kanthi jeneng sing wis dinormalake padha, bakal dilewati.
- Bagéan sing dudu file utawa ora ana jeneng file: mung bagéan kaya file sing nduwèni jeneng file migunani sing dianggep kanggo ditambahake.

---

Delengen uga

- [Konfigurasi](configuration)
