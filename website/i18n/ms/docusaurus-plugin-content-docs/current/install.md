---
id: install
title: 'Pemasangan'
slug: /install
sidebar_label: 'Pemasangan'
---

---

## Pemasangan melalui "Tambahan dan Tema Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versi Minimum Thunderbird
Add‑on ini menyokong Thunderbird **128 ESR atau lebih baharu**. Versi lama tidak disokong.
:::

Ini ialah kaedah pemasangan yang disyorkan. Add‑on yang dipasang dari ATN (addons.thunderbird.net) menerima kemas kini automatik. Pemasangan LOCAL/dev tidak mengemas kini secara automatik.

- Versi minimum Thunderbird: 128 ESR atau lebih baharu.

1. Dalam Thunderbird, pergi ke **Tools > Add-ons and Themes**.
2. Cari "reply with attachments".
3. Tambah add‑on tersebut.

Atau buka halaman add‑on terus: [Tambahan Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Pemasangan secara manual daripada XPI {#local-installation-in-thunderbird}

### Muat turun fail XPI {#download-the-xpi-file}

1. Pergi ke [halaman Add‑on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Muat turun versi terkini add‑on sebagai fail XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Pasang dalam Thunderbird {#install-in-thunderbird-local}

1. Buka Thunderbird.
2. Pergi ke **Tools > Add-ons and Themes**.
3. Dalam **Add-ons Manager**, klik ikon gear di penjuru kanan atas.
4. Pilih **Install Add-on From File…** daripada menu.
5. Pilih fail `reply_with_attachments-x.y.z-tb.xpi` yang dimuat turun.
6. Sahkan pemasangan apabila diminta.

---

## Pemasangan untuk pembangunan {#installation-for-development}

### Muat turun repositori {#download-the-repository}

1. Muat turun versi terkini repositori GitHub.
2. Jalankan `make help` untuk maklumat lanjut.

### Pasang dalam Thunderbird {#install-in-thunderbird-dev}

1. Buka Thunderbird.
2. Pergi ke **Tools > Add-ons and Themes**.
3. Dalam **Add-ons Manager**, klik ikon gear di penjuru kanan atas.
4. Pilih **Install Add-on From File…** daripada menu.
5. Pilih fail terjana `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Sahkan pemasangan apabila diminta.

Nota: Jika Thunderbird tidak menerima `.zip` pada sistem anda, namakan semula kepada `.xpi` dan cuba “Install Add‑on From File…” sekali lagi.

### Di mana mencari ZIP LOCAL {#where-local-zip}

- Mula‑mula, pakejkan add‑on: jalankan `make pack` di akar repositori.
- Selepas pembungkusan, cari zip “LOCAL” di akar repositori (cth., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sebelum membungkus semula untuk ujian, tingkatkan versi dalam kedua‑dua `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json`.

---

## Nyahdaya, Nyahpasang, dan Kemas Kini {#disable-uninstall-updates}

- Lumpuhkan: Thunderbird → Tools → Add‑ons and Themes → cari add‑on tersebut → togol mati.
- Nyahpasang: paparan yang sama → menu tiga titik → Remove.
- Kemas kini: Pemasangan dari ATN akan mengemas kini secara automatik apabila versi baharu diluluskan. Pemasangan LOCAL/dev tidak mengemas kini secara automatik; pasang semula binaan LOCAL yang baharu secara manual.
- Alih keluar tetapan sepenuhnya: lihat [Privasi → Pembuangan data](privacy#data-removal).

Lihat juga

- [Mula pantas](quickstart)
