---
id: install
title: 'Pamasangan'
slug: /install
sidebar_label: 'Pamasangan'
---

---

## Pamasangan ngaliwatan "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Vérsi Thunderbird Minimum
Add‑on ieu ngarojong Thunderbird **128 ESR atawa nu leuwih anyar**. Vérsi anu leuwih kolot teu didukung.
:::

Ieu téh metoda pamasangan anu dianjurkeun. Add‑on nu dipasang tina ATN (addons.thunderbird.net) bakal narima apdét otomatis. Pamasangan LOCAL/dev teu ngapdét otomatis.

- Vérsi minimum Thunderbird: 128 ESR atawa nu leuwih anyar.

1. Dina Thunderbird, buka **Tools > Add-ons and Themes**.
2. Pilarian "reply with attachments".
3. Pasang add‑on‑na.

Atawa buka kaca add‑on langsung: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Pamasangan manual tina XPI {#local-installation-in-thunderbird}

### Undeur berkas XPI {#download-the-xpi-file}

1. Buka ka [kaca Add‑on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Undeur vérsi panganyarna tina add‑on salaku berkas XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Pasang dina Thunderbird {#install-in-thunderbird-local}

1. Buka Thunderbird.
2. Buka **Tools > Add-ons and Themes**.
3. Dina **Add-ons Manager**, klik ikon gir di pojok katuhu luhur.
4. Pilih **Install Add-on From File…** tina ménu.
5. Pilih berkas `reply_with_attachments-x.y.z-tb.xpi` nu tadi diundeuh.
6. Konfirmasi pamasangan nalika dipenta.

---

## Pamasangan pikeun pamekaran {#installation-for-development}

### Undeur répositori {#download-the-repository}

1. Undeur vérsi panganyarna tina répositori GitHub.
2. Jalankeun `make help` pikeun inpo leuwih lengkep.

### Pasang dina Thunderbird {#install-in-thunderbird-dev}

1. Buka Thunderbird.
2. Buka **Tools > Add-ons and Themes**.
3. Dina **Add-ons Manager**, klik ikon gir di pojok katuhu luhur.
4. Pilih **Install Add-on From File…** tina ménu.
5. Pilih berkas anu dihasilkeun `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmasi pamasangan nalika dipenta.

Catetan: Lamun Thunderbird teu nampa `.zip` dina sistem anjeun, ganti ngaran jadi `.xpi` sarta cobian deui “Install Add‑on From File…”.

### Dimana manggihan LOCAL ZIP {#where-local-zip}

- Heula, pakétkeun add‑on‑na: jalankeun `make pack` dina akar répositori.
- Sanggeus dipakétkeun, tingali zip “LOCAL” di akar répositori (contona, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Saméméh ngapakétkeun deui pikeun nguji, naékkeun vérsi boh dina `sources/manifest_ATN.json` boh `sources/manifest_LOCAL.json`.

---

## Pareuman, Copot, jeung Apdét {#disable-uninstall-updates}

- Pareuman: Thunderbird → Tools → Add‑ons and Themes → téangan add‑on‑na → pindahkeun saklar ka pareuman.
- Copot: tampilan nu sarua → ménu tilu-titik → Remove.
- Apdét: pamasangan tina ATN bakal otomatis ngapdét nalika vérsi anyar disatujuan. Pamasangan LOCAL/dev teu otomatis ngapdét; pasang deui build LOCAL anyar sacara manual.
- Miceun setélan sagemblengna: tingali [Privasi → Miceun data](privacy#data-removal).

Tingali ogé

- [Mimitian Gancang](quickstart)
