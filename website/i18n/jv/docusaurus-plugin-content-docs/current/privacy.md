---
id: privacy
title: 'Privasi'
sidebar_label: 'Privasi'
---

## Privasi

:::note Ora telemetry; ora jaringan latar
Add-on iki **ora** nglumpukake analitik/telemetry lan **ora** nggawe permintaan jaringan latar. Akses jaringan mung kedadeyan nalika sampeyan ngeklik pranala eksternal (Docs, GitHub, Donasi).
:::

Reply with Attachments ora nglumpukake analitik utawa telemetry lan ora ngirim data sampeyan menyang endi wae.

Apa sing ditindakake add-on:

- Mbaca metadata lampiran lan file saka pesen asli kanthi lokal (API Thunderbird) kanggo nempelake menyang wangsulan sampeyan.
- Nyimpen opsi sampeyan (daftar ireng, konfirmasi, jawaban standar) ing panyimpenan lokal Thunderbird.

Apa sing ora ditindakake add-on:

- Ora ana pelacakan, analitik, laporan kerugian, utawa logging remote.
- Ora ana permintaan jaringan latar, kecuali nalika sampeyan kanthi jelas mbukak pranala eksternal (Docs, GitHub, Donasi).

Ijin didokumentasikake ing kaca [Ijin](permissions).

---

## Kebijakan Keamanan Konten (CSP) {#content-security-policy-csp}

Pilihan lan kaca popup nyingkiri skrip inline. Kabeh JavaScript dimuat saka file sing dikirim bareng add-on supaya cocog karo CSP ketat ing Thunderbird. Yen sampeyan nyisipake potongan kode ing dokumen, iku mung conto lan ora dieksekusi dening add-on.

---

## Penyimpanan Data {#data-storage}

- Preferensi pengguna (daftar ireng, toggle konfirmasi, jawaban standar) disimpen ing `storage.local` Thunderbird kanggo add-on iki.
- Ora ana sinkronisasi cloud sing ditindakake dening add-on.

---

## Jaringan {#network}

- Add-on ora nindakake aktivitas jaringan latar.
- Akses jaringan mung kedadeyan nalika sampeyan ngeklik pranala (Docs, GitHub, Donasi) utawa nalika Thunderbird dhewe nindakake operasi normal sing ora ana hubungane karo add-on iki.

---

## Penghapusan Data {#data-removal}

- Ngangkat add-on bakal mbusak kodené.
- Setelan mung disimpen ing `storage.local` Thunderbird lan bakal dibusak nalika dicopot; ora ana panyimpenan eksternal sing digunakake.
- Reset setelan tanpa mbusak:
  - Kaca opsi: Gunakake “Reset to defaults” kanggo daftar ireng lan peringatan daftar ireng.
  - Lanjut: ing Thunderbird → Alat → Alat Pengembang → Debug Add-ons, buka panyimpenan ekstensi lan kosongake kunci yen perlu.

---
