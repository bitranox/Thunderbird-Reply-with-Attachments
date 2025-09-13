---
id: privacy
title: 'Privasi'
sidebar_label: 'Privasi'
---

## Privasi

:::note Tiada telemetri; tiada rangkaian latar belakang
Sambungan ini **tidak** mengumpul analitis/telemetri dan **tiada** permintaan rangkaian latar belakang. Sebarang akses rangkaian hanya berlaku apabila anda mengklik pautan luar (Docs, GitHub, Donate).
:::

Reply with Attachments tidak mengumpul analitis atau telemetri dan tidak menghantar data anda ke mana-mana.

Apa yang dilakukan sambungan ini:

- Membaca metadata dan fail lampiran dari mesej asal secara tempatan (API Thunderbird) untuk dilampirkan kepada jawapan anda.
- Menyimpan pilihan anda (senarai hitam, pengesahan, jawapan lalai) di storan tempatan Thunderbird.

Apa yang tidak dilakukan oleh sambungan ini:

- Tiada penjejakan, analitis, pelaporan kemalangan, atau logging jarak jauh.
- Tiada permintaan rangkaian latar belakang, kecuali apabila anda secara eksplisit membuka pautan luar (Docs, GitHub, Donate).

Kebenaran didokumentasikan di halaman [Kebenaran](permissions).

---

## Polisi Keselamatan Kandungan (CSP) {#content-security-policy-csp}

Pilihan dan halaman pop timbul mengelak skrip dalam talian. Semua JavaScript dimuat dari fail yang disediakan bersama sambungan ini untuk mematuhi CSP yang ketat di Thunderbird. Jika anda menyematkan kod contoh dalam dokumen, ia hanya contoh dan tidak dilaksanakan oleh sambungan ini.

---

## Penyimpanan data {#data-storage}

- Pilihan pengguna (senarai hitam, togol pengesahan, jawapan lalai) disimpan dalam `storage.local` Thunderbird untuk sambungan ini.
- Tiada penyegerakan awan dilakukan oleh sambungan ini.

---

## Rangkaian {#network}

- Sambungan ini tidak melakukan sebarang aktiviti rangkaian latar belakang.
- Sebarang akses rangkaian hanya berlaku apabila anda mengklik pautan (Docs, GitHub, Donate) atau apabila Thunderbird sendiri melakukan operasi biasa yang tidak berkaitan dengan sambungan ini.

---

## Penghapusan data {#data-removal}

- Nyahpasang sambungan ini akan menghapuskan kodnya.
- Tetapan hanya disimpan dalam `storage.local` Thunderbird dan akan dibuang semasa nyahpasang; tiada storan luar digunakan.
- Tetapan reset tanpa nyahpasang:
  - Halaman pilihan: gunakan “Reset ke lalai” untuk senarai hitam dan amaran senarai hitam.
  - Lanjutan: dalam Thunderbird → Alat → Alat Pembangun → Nyah-Pasang Sambungan, buka storan sambungan dan padam kunci jika diperlukan.

---
