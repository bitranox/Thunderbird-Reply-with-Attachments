---
id: install
title: 'Instalasi'
slug: /install
sidebar_label: 'Instalasi'
---

---

## Instalasi melalui "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Versi Minimum Thunderbird
Pengaya ini mendukung Thunderbird **128 ESR atau lebih baru**. Versi yang lebih lama tidak didukung.
:::

Ini adalah metode instalasi yang direkomendasikan. Pengaya yang diinstal dari ATN (addons.thunderbird.net) menerima pembaruan otomatis. Instalasi LOCAL/dev tidak memperbarui secara otomatis.

- Versi minimum Thunderbird: 128 ESR atau lebih baru.

1. Di Thunderbird, buka **Tools > Add-ons and Themes**.
2. Cari "reply with attachments".
3. Tambahkan pengaya tersebut.

Atau buka halaman pengaya secara langsung: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalasi manual dari XPI {#local-installation-in-thunderbird}

### Unduh berkas XPI {#download-the-xpi-file}

1. Buka [halaman Pengaya Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Unduh versi terbaru pengaya sebagai berkas XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instal di Thunderbird {#install-in-thunderbird-local}

1. Buka Thunderbird.
2. Buka **Tools > Add-ons and Themes**.
3. Di **Add-ons Manager**, klik ikon roda gigi di pojok kanan atas.
4. Pilih **Install Add-on From File…** dari menu.
5. Pilih berkas `reply_with_attachments-x.y.z-tb.xpi` yang diunduh.
6. Konfirmasi instalasi saat diminta.

---

## Instalasi untuk pengembangan {#installation-for-development}

### Unduh repositori {#download-the-repository}

1. Unduh versi terbaru repositori GitHub.
2. Jalankan `make help` untuk informasi lebih lanjut.

### Instal di Thunderbird {#install-in-thunderbird-dev}

1. Buka Thunderbird.
2. Buka **Tools > Add-ons and Themes**.
3. Di **Add-ons Manager**, klik ikon roda gigi di pojok kanan atas.
4. Pilih **Install Add-on From File…** dari menu.
5. Pilih berkas yang dihasilkan `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmasi instalasi saat diminta.

Catatan: Jika Thunderbird tidak menerima `.zip` pada sistem Anda, ubah namanya menjadi `.xpi` dan coba “Install Add‑on From File…” lagi.

### Di mana menemukan LOCAL ZIP {#where-local-zip}

- Pertama, kemas pengaya: jalankan `make pack` di root repositori.
- Setelah pengemasan, temukan zip “LOCAL” di root repositori (mis., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sebelum mengemas ulang untuk pengujian, naikkan versi di `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json`.

---

## Nonaktifkan, Copot pemasangan, dan Pembaruan {#disable-uninstall-updates}

- Nonaktifkan: Thunderbird → Tools → Add‑ons and Themes → temukan pengaya → matikan toggle.
- Copot pemasangan: tampilan yang sama → menu tiga titik → Remove.
- Pembaruan: Instal dari ATN memperbarui otomatis saat versi baru disetujui. Instal LOCAL/dev tidak memperbarui otomatis; pasang ulang build LOCAL baru secara manual.
- Hapus setelan sepenuhnya: lihat [Privasi → Penghapusan data](privacy#data-removal).

Lihat juga

- [Mulai cepat](quickstart)
