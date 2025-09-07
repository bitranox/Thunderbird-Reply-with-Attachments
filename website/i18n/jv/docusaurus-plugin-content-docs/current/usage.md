---
id: usage
title: Panggunaan
sidebar_label: Panggunaan
---

## Panggunaan

- Wangsulana, banjur add‑on bakal nambahake berkas asli kanthi otomatis — utawa takon dhisik yen diaktifake ing Options.
- Ngindhari duplikat adhedhasar jeneng berkas; SMIME lan gambar inline mesthi dilewati.
- Lampiran sing ana ing daftar ireng uga dilewati (ora mbedakake huruf gedhe/cilik, pola glob).

---

## Rincian Perilaku

- Pencegahan duplikat: add‑on menehi tandha tab compose minangka wis diproses nganggo nilai sesi saben‑tab lan pengaman ing memori. Ora bakal nambah berkas asli kaping pindho.
- Ngehormati lampiran sing wis ana: yen ing compose wis ana sawetara lampiran, berkas asli isih ditambah persis sapisan, kanthi ngliwati jeneng berkas sing wis ana.
- Pengecualian: artefak SMIME (kayata `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) lan gambar inline diabaikan. Yen ora ana sing layak ing lintasan pisanan, fallback sing luwih longgar mriksa maneh bagean non‑SMIME.
- Peringatan daftar ireng (yen diaktifake): Nalika calon dilalekake amarga daftar ireng, add‑on nuduhake modal cilik sing ndhaptar berkas sing kena lan pola sing cocog. Peringatan iki uga katon yen ora ana lampiran sing bakal ditambah amarga kabeh dikecualekake.
