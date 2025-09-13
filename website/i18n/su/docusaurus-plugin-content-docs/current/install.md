---
id: install
title: 'Instalasi'
slug: /install
sidebar_label: 'Instalasi'
---

## Instalasi via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Version
Add‑on ieu ngarojong Thunderbird **128 ESR atawa langkung anyar**. Versi lami teu didukung.
:::

Ieu mangrupikeun métode instalasi anu disarankeun. Add‑on anu dipasang ti ATN (addons.thunderbird.net) nampi pembaruan otomatis. Instalasi LOCAL/dev teu otomatis diperbarui.

- Versi Thunderbird minimal: 128 ESR atawa langkung anyar.

1. Dina Thunderbird, buka **Alat > Add-ons and Themes**.
2. Pilarian "balas nganggo lampiran".
3. Tambahkeun add-on.

Atawa buka halaman add-on sacara langsung: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalasi manual ti XPI {#local-installation-in-thunderbird}

### Unduh berkas XPI {#download-the-xpi-file}

1. Buka halaman [Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Unduh versi terbaru tina add-on salaku berkas XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instal di Thunderbird {#install-in-thunderbird-local}

1. Buka Thunderbird.
2. Buka **Alat > Add-ons and Themes**.
3. Dina **Manajer Add-ons**, klik ikon gear di pojok kanan luhur.
4. Pilih **Instal Add-on Ti Berkas…** tina ménu.
5. Pilih berkas `reply_with_attachments-x.y.z-tb.xpi` anu diunduh.
6. Konfirmasi instalasi nalika dipénta.

---

## Instalasi pikeun pangembangan {#installation-for-development}

### Unduh repository {#download-the-repository}

1. Unduh versi terbaru tina repository GitHub.
2. Jalankeun `make help` pikeun informasi langkung lanjut.

### Instal di Thunderbird {#install-in-thunderbird-dev}

1. Buka Thunderbird.
2. Buka **Alat > Add-ons and Themes**.
3. Dina **Manajer Add-ons**, klik ikon gear di pojok kanan luhur.
4. Pilih **Instal Add-on Ti Berkas…** tina ménu.
5. Pilih berkas anu dihasilkeun `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmasi instalasi nalika dipénta.

Catetan: Upami Thunderbird henteu nampa `.zip` dina sistem anjeun, ganti nami janten `.xpi` sareng cobian deui “Instal Add‑on Ti Berkas…”

### Di mana mendakan ZIP LOKAL {#where-local-zip}

- Mimiti, bungkus add‑on: jalankeun `make pack` di akar repository.
- Sanggeus dibungkus, mendakan zip “LOCAL” di akar repository (contong: `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Satiap nyiapkeun deui pikeun nguji, tingkatkeun versi di `sources/manifest_ATN.json` sareng `sources/manifest_LOCAL.json`.

---

## Nonaktipkeun, Copot Pasang, sareng Pembaruan {#disable-uninstall-updates}

- Nonaktipkeun: Thunderbird → Alat → Add‑ons dan Themes → mendakan add‑on → geser ka off.
- Copot pasang: pandangan anu sami → ménu tilu titik → Hapus.
- Pembaruan: instalasi ATN otomatis di-update nalika versi anyar disatujuan. Instalasi LOCAL/dev teu otomatis di-update; pasang deui build LOCAL anyar sacara manual.
- Hapus setelan sacara lengkep: tingali [Privasi → Hapus data](privacy#data-removal).

Tingali ogé

- [Panduan Singkat](quickstart)
