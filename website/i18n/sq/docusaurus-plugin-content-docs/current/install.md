---
id: install
title: 'Instalim'
slug: /install
sidebar_label: 'Instalim'
---

---

## Instalim përmes "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Versioni minimal i Thunderbird
Kjo shtesë mbështet Thunderbird **128 ESR ose më të rinj**. Versionet më të vjetra nuk mbështeten.
:::

Kjo është metoda e rekomanduar e instalimit. Shtesat e instaluara nga ATN (addons.thunderbird.net) marrin përditësime automatike. Instalimet LOCAL/dev nuk përditësohen automatikisht.

- Versioni minimal i Thunderbird: 128 ESR ose më i ri.

1. Në Thunderbird, shkoni te **Tools > Add-ons and Themes**.
2. Kërkoni për "reply with attachments".
3. Shtoni shtesën.

Ose hapni drejtpërdrejt faqen e shtesës: [Shtesat e Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalim manual nga XPI {#local-installation-in-thunderbird}

### Shkarkoni skedarin XPI {#download-the-xpi-file}

1. Shkoni te [faqja e shtesës Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Shkarkoni versionin më të fundit të shtesës si skedar XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instaloni në Thunderbird {#install-in-thunderbird-local}

1. Hapni Thunderbird.
2. Shkoni te **Tools > Add-ons and Themes**.
3. Në **Add-ons Manager**, klikoni ikonën e ingranazhit në këndin e sipërm djathtas.
4. Zgjidhni **Install Add-on From File…** nga menuja.
5. Zgjidhni skedarin e shkarkuar `reply_with_attachments-x.y.z-tb.xpi`.
6. Konfirmoni instalimin kur t’ju kërkohet.

---

## Instalim për zhvillim {#installation-for-development}

### Shkarkoni depozitën {#download-the-repository}

1. Shkarkoni versionin më të fundit të depos në GitHub.
2. Ekzekutoni `make help` për më shumë informacion.

### Instaloni në Thunderbird {#install-in-thunderbird-dev}

1. Hapni Thunderbird.
2. Shkoni te **Tools > Add-ons and Themes**.
3. Në **Add-ons Manager**, klikoni ikonën e ingranazhit në këndin e sipërm djathtas.
4. Zgjidhni **Install Add-on From File…** nga menuja.
5. Zgjidhni skedarin e gjeneruar `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Konfirmoni instalimin kur t’ju kërkohet.

Shënim: Nëse Thunderbird nuk e pranon `.zip` në sistemin tuaj, riemërtojeni në `.xpi` dhe provoni sërish “Install Add‑on From File…”.

### Ku ta gjeni ZIP-in LOCAL {#where-local-zip}

- Së pari, paketoni shtesën: ekzekutoni `make pack` në rrënjën e depos.
- Pas paketimit, gjeni zip-in “LOCAL” në rrënjën e depos (p.sh., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Para ripaketimit për testim, përditësoni versionet si në `sources/manifest_ATN.json` ashtu edhe në `sources/manifest_LOCAL.json`.

---

## Çaktivizim, Çinstalim dhe Përditësime {#disable-uninstall-updates}

- Çaktivizim: Thunderbird → Tools → Add‑ons and Themes → gjeni shtesën → çaktivizoje.
- Çinstalim: e njëjta pamje → menuja me tre pika → Hiq.
- Përditësime: instalimet nga ATN përditësohen automatikisht kur miratohen versione të reja. Instalimet LOCAL/dev nuk përditësohen automatikisht; riinstaloni manualisht një ndërtim të ri LOCAL.
- Hiqni plotësisht rregullimet: shihni [Privatësia → Heqja e të dhënave](privacy#data-removal).

Shihni gjithashtu

- [Udhëzues i shpejtë](quickstart)
