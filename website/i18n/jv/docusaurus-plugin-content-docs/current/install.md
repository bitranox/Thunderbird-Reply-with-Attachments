---
id: install
title: 'Pamasangan'
slug: /install
sidebar_label: 'Pamasangan'
---

---

## Pamasangan liwat "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Versi Thunderbird Minimal
Add‑on iki ndhukung Thunderbird **128 ESR utawa luwih anyar**. Versi lawas ora didhukung.
:::

Iki cara pamasangan sing dianjurake. Add‑on sing dipasang saka ATN (addons.thunderbird.net) nampa nganyari otomatis. Instal LOCAL/dev ora nganyari otomatis.

- Versi minimal Thunderbird: 128 ESR utawa luwih anyar.

1. Ing Thunderbird, menyang **Tools > Add-ons and Themes**.
2. Goleki "reply with attachments".
3. Tambahna add‑on kasebut.

Utawa bukak kaca add‑on langsung: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Pamasangan manual saka XPI {#local-installation-in-thunderbird}

### Undhuh file XPI {#download-the-xpi-file}

1. Menyang [kaca Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Undhuh versi paling anyar saka add‑on minangka file XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Pasang ing Thunderbird {#install-in-thunderbird-local}

1. Bukak Thunderbird.
2. Menyang **Tools > Add-ons and Themes**.
3. Ing **Add-ons Manager**, klik ikon gir ing pojok tengen ndhuwur.
4. Pilih **Install Add-on From File…** saka menu.
5. Pilih file `reply_with_attachments-x.y.z-tb.xpi` sing wis diundhuh.
6. Konfirmasi pamasangan nalika diprentah.

---

## Pamasangan kanggo pangembangan {#installation-for-development}

### Undhuh repositori {#download-the-repository}

1. Undhuh versi paling anyar saka repositori GitHub.
2. Lakokaké `make help` kanggo informasi luwih lengkap.

### Pasang ing Thunderbird {#install-in-thunderbird-dev}

1. Bukak Thunderbird.
2. Menyang **Tools > Add-ons and Themes**.
3. Ing **Add-ons Manager**, klik ikon gir ing pojok tengen ndhuwur.
4. Pilih **Install Add-on From File…** saka menu.
5. Pilih file `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` sing wis digawé.
6. Konfirmasi pamasangan nalika diprentah.

Cathetan: Yen Thunderbird ora nampa `.zip` ing sistemmu, ganti jenenge dadi `.xpi` lan coba “Install Add‑on From File…” maneh.

### Ngendi nemokaké LOCAL ZIP {#where-local-zip}

- Dhisik, paketna add‑on: lakokaké `make pack` ing root repositori.
- Sawisé dipaket, goleki zip “LOCAL” ing root repositori (umpamané, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sadurunge ngepak maneh kanggo dites, mundhakna versi ing loro-lorone `sources/manifest_ATN.json` lan `sources/manifest_LOCAL.json`.

---

## Nonaktifna, Copot Pamasangan, lan Nganyari {#disable-uninstall-updates}

- Nonaktifna: Thunderbird → Tools → Add‑ons and Themes → goleki add‑on → pateni.
- Copot: tampilan sing padha → menu telung-titik → Remove.
- Nganyari: instal saka ATN bakal otomatis nganyari nalika versi anyar disetujoni. Instal LOCAL/dev ora nganyari otomatis; pasang maneh build LOCAL anyar kanthi manual.
- Mbusek setelan nganti rampung: waca [Privacy → Data removal](privacy#data-removal).

Delengen uga

- [Pandhuan Cepet](quickstart)
