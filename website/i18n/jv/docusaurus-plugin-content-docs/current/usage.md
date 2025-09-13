---
id: usage
title: 'Penggunaan'
sidebar_label: 'Penggunaan'
---

## Usage {#usage}

- Reply dan add-on otomatis nambahake asliné — utawa takon dhisik, yen diaktifake ing Opciones.
- Dide‑duplikasi miturut jeneng file; S/MIME lan gambar inline mesthi dilewati.
- Lampiran sing dilarang uga dilewati (pola glob sing ora sensitif kasus nyocogake jeneng file, dudu jalur). Deleng [Konfigurasi](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Deteksi reply → dhaptar lampiran asli → filter S/MIME + inline → konfirmasi opsional → tambah file sing layak (lewati duplikat).

Strict vs. relaxed pass: Add-on pisanan ngecualikake bagean S/MIME lan inline. Yen ora ana sing layak, iki mlaku pass santai sing isih ngecualikake S/MIME/inline nanging toleransi luwih akeh kasus (deleng Rincian Kode).

| Part type                                         |  Strict pass | Relaxed pass |
| ------------------------------------------------- | -----------: | -----------: |
| S/MIME signature file `smime.p7s`                 |     Excluded |     Excluded |
| S/MIME MIME types (`application/pkcs7-*`)         |     Excluded |     Excluded |
| Inline image referenced by Content‑ID (`image/*`) |     Excluded |     Excluded |
| Attached email (`message/rfc822`) with a filename |    Not added | May be added |
| Regular file attachment with a filename           | May be added | May be added |

Conto: Sawetara lampiran bisa uga ora nduweni header tartamtu nanging isih file biasa (dudu inline/S/MIME). Yen pass ketat ora nemoni, pass santai bisa nampa iku lan nambahake.

---

### Cross‑reference {#cross-reference}

- Forward ora dimodifikasi kanthi desain (deleng Panyekel ing ngisor).
- Kanggo alasan lampiran ora bisa ditambahake, deleng “Kenapa lampiran bisa uga ora ditambahake”.

---

## Behavior Details {#behavior-details}

- **Pencegahan duplikasi:** Add-on nandhai tab compose minangka diproses nggunakake nilai sesi per-tab lan penjaga ing memori. Ora bakal nambahake asliné kaping pindho.
- Nutup lan mbukak maneh jendela compose dianggep minangka tab anyar (yaiku, upaya anyar diijini).
- **Hormati lampiran sing ana:** Yen compose wis ngemot sawetara lampiran, asliné isih ditambahake persis sepisan, ngliwati jeneng file sing wis ana.
- **Pengecualian:** Artefak S/MIME lan gambar inline diabaikan. Yen ora ana sing layak ing pass pertama, fallback santai mriksa maneh bagean non-S/MIME.
  - **Jinis file:** `smime.p7s`
  - **Jinis MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Gambar inline:** sembarang `image/*` bagian sing dirujuk dening Content‑ID ing awak pesen
  - **Email lampiran (`message/rfc822`):** diperlakukan minangka lampiran biasa yen nduweni jeneng file; bisa uga ditambahake (gumantung marang mriksa duplikat lan daftar ireng).
- **Peringatan daftar ireng (yen diaktifake):** Nalika calon dicekal dening daftar ireng sampeyan,
  add-on nuduhake modal cilik sing ndhaptar file sing kena pengaruh lan pola
  sing cocog. Peringatan iki uga muncul ing kasus nalika ora ana lampiran sing bakal
  ditambahake amarga kabeh dikecualèkaké.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Dialog konfirmasi: Y/J = Ya, N/Esc = Ora; Tab/Shift+Tab lan tombol Arrow ngowahi fokus.
  - “Jawaban Default” ing [Konfigurasi](configuration#confirmation) nyetel tombol sing fokusake luwih dhisik.
  - Enter nyebabake tombol sing difokusaké. Tab/Shift+Tab lan panah ngalih fokus kanggo aksesibilitas.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                           |
| --------------- | -------------------------------- |
| Y / J           | Konfirmasi Ya                    |
| N / Esc         | Konfirmasi Ora                   |
| Enter           | Aktifake tombol sing fokus       |
| Tab / Shift+Tab | Pindhah fokus maju/mundur        |
| Arrow keys      | Pindhah fokus antar tombol       |
| Default answer  | Nyetel fokus awal (Ya utawa Ora) |

---

## Limitations {#limitations}

- Forward ora dimodifikasi dening add-on iki (Reply lan Reply all didhukung).
- Lampiran sing banget gedhe bisa uga dadi subyek batasan Thunderbird utawa panyedhiya.
  - Add-on ora mbagi utawa ngompres file; iki gumantung marang penanganan lampiran normal Thunderbird.
- Pesan sing dienkripsi: bagean S/MIME kanthi sengaja dikecualikake.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Gambar inline diabaikan: bagian sing dirujuk liwat Content‑ID ing awak pesen ora ditambahake minangka file.
- Bagean tandha tangan S/MIME dikecualikake kanthi desain: jeneng file kaya `smime.p7s` lan jinis MIME kayata `application/pkcs7-signature` utawa `application/pkcs7-mime` dilewati.
- Pola daftar ireng bisa nyaring calon: deleng [Konfigurasi](configuration#blacklist-glob-patterns); nyocogake ora sensitif kasus lan mung jeneng file.
- Jeneng file duplikat ora ditambahake maneh: yen compose wis ngemot file kanthi jeneng normalisasi sing padha, bakal dilewati.
- Bagean non-file utawa jeneng file sing hilang: mung bagean kaya file sing nduweni jeneng file sing bisa digunakake sing dianggep kanggo nambahake.

---

Delengen uga

- [Konfigurasi](configuration)
