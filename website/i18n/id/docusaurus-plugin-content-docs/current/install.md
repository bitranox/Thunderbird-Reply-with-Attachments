---
id: install
title: 'Instalasi'
slug: /install
sidebar_label: 'Instalasi'
---

## Instalasi melalui "Thunderbird Add-ons dan Tema" {#installation-in-thunderbird-recommended}

:::important Versi Thunderbird Minimum
Add-on ini mendukung Thunderbird **128 ESR atau yang lebih baru**. Versi yang lebih lama tidak didukung.
:::

Ini adalah metode instalasi yang direkomendasikan. Add-on yang diinstal dari ATN (addons.thunderbird.net) menerima pembaruan otomatis. Instalasi LOCAL/dev tidak diperbarui secara otomatis.

- Versi Thunderbird minimum: 128 ESR atau yang lebih baru.

1. Di Thunderbird, buka **Alat > Add-ons dan Tema**.
2. Cari "balas dengan lampiran".
3. Tambahkan add-on tersebut.

Atau buka halaman add-on secara langsung: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalasi manual dari XPI {#local-installation-in-thunderbird}

### Unduh file XPI {#download-the-xpi-file}

1. Pergi ke [halaman Add-on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Unduh versi terbaru dari add-on sebagai file XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instal di Thunderbird {#install-in-thunderbird-local}

1. Buka Thunderbird.
2. Pergi ke **Alat > Add-ons dan Tema**.
3. Di **Pengelola Add-ons**, klik ikon gear di sudut kanan atas.
4. Pilih **Install Add-on From File…** dari menu.
5. Pilih file yang diunduh `reply_with_attachments-x.y.z-tb.xpi`.
6. Konfirmasi instalasi ketika diminta.

---

## Instalasi untuk pengembangan {#installation-for-development}

### Unduh repositori {#download-the-repository}

1. Unduh versi terbaru dari repositori GitHub.
2. Jalankan `make help` untuk informasi lebih lanjut.

### Instal di Thunderbird {#install-in-thunderbird-dev}

1. Buka Thunderbird.
2. Pergi ke **Alat > Add-ons dan Tema**.
3. Di **Pengelola Add-ons**, klik ikon gear di sudut kanan atas.
4. Pilih **Install Add-on From File…** dari menu.
5. Pilih file yang dihasilkan `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmasi instalasi ketika diminta.

Catatan: Jika Thunderbird tidak menerima `.zip` di sistem Anda, ganti namanya menjadi `.xpi` dan coba “Install Add‑on From File…” lagi.

### Di mana menemukan ZIP LOCAL {#where-local-zip}

- Pertama, kemas add-on: jalankan `make pack` di root repositori.
- Setelah pengemasan, temukan zip “LOCAL” di root repositori (misalnya, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sebelum mengemas ulang untuk pengujian, naikkan versi di `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json`.

---

## Nonaktifkan, Hapus Instalasi, dan Pembaruan {#disable-uninstall-updates}

- Nonaktifkan: Thunderbird → Alat → Add‑ons dan Tema → temukan add-on → matikan.
- Hapus Instalasi: tampilan yang sama → menu tiga titik → Hapus.
- Pembaruan: instalasi ATN diperbarui otomatis ketika versi baru disetujui. Instalasi LOCAL/dev tidak diperbarui otomatis; instal ulang build LOCAL baru secara manual.
- Hapus pengaturan sepenuhnya: lihat [Privasi → Penghapusan data](privacy#data-removal).

Lihat juga

- [Panduan Cepat](quickstart)
