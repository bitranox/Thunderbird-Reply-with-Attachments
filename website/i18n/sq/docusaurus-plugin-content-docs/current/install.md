---
id: install
title: 'Instalimi'
slug: /install
sidebar_label: 'Instalimi'
---

## Instalimi përmes "Shtesave dhe Temave të Thunderbird" {#installation-in-thunderbird-recommended}

:::important Minimumi i Versionit të Thunderbird
Kjo shtesë përkrah Thunderbird **128 ESR ose më të ri**. Versionet më të vjetra nuk përkrahen.
:::

Kjo është metoda e rekomanduar për instalim. Shtesat e instaluara nga ATN (addons.thunderbird.net) marrin përditësime automatike. Instalimet LOKALE/dev nuk përditësohen automatikisht.

- Versioni minimal i Thunderbird: 128 ESR ose më të ri.

1. Në Thunderbird, shkoni te **Mjetet > Shtesat dhe Temat**.
2. Kërkoni për "përgjigje me të bashkëngjitura".
3. Shtoni shtesën.

Ose hapni faqen e shtesës direkt: [Shtesat e Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalimi manual nga XPI {#local-installation-in-thunderbird}

### Shkarkoni skedarin XPI {#download-the-xpi-file}

1. Shkoni te [Faqja e Shtesave të Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Shkarkoni versionin më të fundit të shtesës si skedar XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instaloni në Thunderbird {#install-in-thunderbird-local}

1. Hapni Thunderbird.
2. Shkoni te **Mjetet > Shtesat dhe Temat**.
3. Në **Menaxherin e Shtesave**, klikoni ikonën e ingranazhit në këndin e sipërm të djathtë.
4. Zgjidhni **Instalo Shtesë Nga Skedari…** nga menuja.
5. Zgjidhni skedarin e shkarkuar `reply_with_attachments-x.y.z-tb.xpi`.
6. Konfirmoni instalimin kur jeni të pyetur.

---

## Instalimi për zhvillim {#installation-for-development}

### Shkarkoni depozitat {#download-the-repository}

1. Shkarkoni versionin më të fundit të depozitës GitHub.
2. Ekzekutoni `make help` për më shumë informacion.

### Instaloni në Thunderbird {#install-in-thunderbird-dev}

1. Hapni Thunderbird.
2. Shkoni te **Mjetet > Shtesat dhe Temat**.
3. Në **Menaxherin e Shtesave**, klikoni ikonën e ingranazhit në këndin e sipërm të djathtë.
4. Zgjidhni **Instalo Shtesë Nga Skedari…** nga menuja.
5. Zgjidhni skedarin e gjeneruar `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmoni instalimin kur jeni të pyetur.

Shënim: Nëse Thunderbird nuk pranon `.zip` në sistemin tuaj, riemëroni atë në `.xpi` dhe provoni “Instalo Shtesë Nga Skedari…” përsëri.

### Ku të gjeni ZIP-in LOKAL {#where-local-zip}

- Së pari, paketoni shtesën: ekzekutoni `make pack` në rrënjën e depozitës.
- Pas paketimit, gjeni zip-in “LOKAL” në rrënjën e depozitës (p.sh., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Para ripaketimit për testim, rrisni versionet në të dyja `sources/manifest_ATN.json` dhe `sources/manifest_LOCAL.json`.

---

## Çaktivizimi, Zhbllokimi dhe Përditësimet {#disable-uninstall-updates}

- Çaktivizoni: Thunderbird → Mjetet → Shtesat dhe Temat → gjeni shtesën → çaktivizoni.
- Zhbllokoni: po ky shikim → menuja me tre pika → Hiq.
- Përditësimet: Instalimet ATN përditësohen automatikisht kur versionet e reja miratohen. Instalimet LOKALE/dev nuk përditësohen automatikisht; rinstaloni një ndërtim të ri LOKAL manualisht.
- Hiqni plotësisht cilësimet: shihni [Privatësia → Heqja e të dhënave](privacy#data-removal).

Shih gjithashtu

- [Fillimisht](quickstart)
