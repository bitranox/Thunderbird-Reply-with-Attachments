---
id: privacy
title: 'Privasi'
sidebar_label: 'Privasi'
---

## Privasi

:::note Teu aya telemetry; teu aya jaringan latar
Add-on ieu **teu** ngumpulkeun analitik/telemetry sareng **teu** ngalakukeun permintaan jaringan latar. Akses jaringan ngan lumangsung nalika anjeun ngeklik tautan eksternal (Docs, GitHub, Donasi).
:::

Reply with Attachments henteu ngumpulkeun analitik atanapi telemetry sareng henteu ngirim data anjeun ka mana waé.

Naon anu dilakukeun ku add-on:

- Maca metadata lampiran sareng file ti pesen asli sacara lokal (Thunderbird API) pikeun ngasupkeunana kana balasan anjeun.
- Nyimpen pilihan anjeun (daftar hideung, konfirmasi, jawaban standar) dina panyimpenan lokal Thunderbird.

Naon anu henteu dilakukeun ku add-on:

- Teu aya pelacakan, analitik, laporan kerusuhan, atanapi logging jauh.
- Teu aya permintaan jaringan latar, kecuali nalika anjeun jelas ngabuka tautan eksternal (Docs, GitHub, Donasi).

Ijin didokumentasikeun dina halaman [Ijin](permissions).

---

## Kebijakan Keamanan Konten (CSP) {#content-security-policy-csp}

Pilihan sareng halaman pop-up ngahindarkeun skrip inline. Sadaya JavaScript dimuat tina file anu dikirimkeun sareng add-on pikeun patuh kana CSP ketat di Thunderbird. Upami anjeun nyelapkeun potongan kode kana dokumén, éta ngan ukur conto sareng henteu dilaksanakeun ku add-on.

---

## Panyimpenan Data {#data-storage}

- Préferénsi pamaké (daftar hideung, toggle konfirmasi, jawaban standar) disimpen di `storage.local` Thunderbird pikeun add-on ieu.
- Teu aya sinkronisasi awan anu dilakukeun ku add-on.

---

## Jaringan {#network}

- Add-on henteu ngalakukeun kagiatan jaringan latar.
- Akses jaringan ngan lumangsung nalika anjeun ngeklik tautan (Docs, GitHub, Donasi) atanapi nalika Thunderbird sorangan ngalaksanakeun operasi normal anu henteu aya hubunganana sareng add-on ieu.

---

## Hapus Data {#data-removal}

- Ngaleupaskeun add-on bakal ngahapus kodena.
- Setelan ngan disimpen di `storage.local` Thunderbird sareng bakal dihapus nalika ngaleupaskeun; henteu aya panyimpenan eksternal anu dianggo.
- Setel ulang setelan tanpa ngaleupaskeun:
  - Halaman pilihan: anggo "Reset ka standar" pikeun daptar hideung sareng peringatan daptar hideung.
  - Élmuna: di Thunderbird → Alat → Alat Pamekar → Debug Add-ons, buka panyimpenan ekstensi sareng bersihkeun konci upami diperlukeun.
