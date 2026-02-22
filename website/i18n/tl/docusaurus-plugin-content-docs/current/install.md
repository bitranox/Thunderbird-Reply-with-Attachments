---
id: install
title: 'Pag-install'
slug: /install
sidebar_label: 'Pag-install'
---

---

## Pag-install sa pamamagitan ng "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum na Bersyon ng Thunderbird
Sinusuportahan ng add‑on na ito ang Thunderbird **128 ESR o mas bago**. Hindi sinusuportahan ang mas lumang mga bersyon.
:::

Ito ang inirerekomendang paraan ng pag-install. Ang mga add‑on na ini-install mula sa ATN (addons.thunderbird.net) ay tumatanggap ng awtomatikong update. Ang mga LOCAL/dev install ay hindi nag-a-auto‑update.

- Pinakamababang bersyon ng Thunderbird: 128 ESR o mas bago.

1. Sa Thunderbird, pumunta sa **Tools > Add-ons and Themes**.
2. Hanapin ang "reply with attachments".
3. Idagdag ang add‑on.

O buksan ang pahina ng add‑on nang direkta: [Mga Add‑on ng Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manwal na pag-install mula sa XPI {#local-installation-in-thunderbird}

### I-download ang XPI file {#download-the-xpi-file}

1. Pumunta sa [pahina ng Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. I-download ang pinakabagong bersyon ng add‑on bilang XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### I-install sa Thunderbird {#install-in-thunderbird-local}

1. Buksan ang Thunderbird.
2. Pumunta sa **Tools > Add-ons and Themes**.
3. Sa **Add-ons Manager**, i-click ang icon na gear sa kanang-itaas.
4. Piliin ang **Install Add‑on From File…** mula sa menu.
5. Piliin ang na-download na file na `reply_with_attachments-x.y.z-tb.xpi`.
6. Kumpirmahin ang pag-install kapag na-prompt.

---

## Pag-install para sa development {#installation-for-development}

### I-download ang repository {#download-the-repository}

1. I-download ang pinakabagong bersyon ng GitHub repository.
2. Patakbuhin ang `make help` para sa karagdagang impormasyon.

### I-install sa Thunderbird {#install-in-thunderbird-dev}

1. Buksan ang Thunderbird.
2. Pumunta sa **Tools > Add-ons and Themes**.
3. Sa **Add-ons Manager**, i-click ang icon na gear sa kanang-itaas.
4. Piliin ang **Install Add‑on From File…** mula sa menu.
5. Piliin ang nabuong file na `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kumpirmahin ang pag-install kapag na-prompt.

Tandaan: Kung hindi tinatanggap ng Thunderbird ang `.zip` sa iyong system, palitan ang pangalan nito sa `.xpi` at subukang muli ang “Install Add‑on From File…”.

### Saan mahahanap ang LOCAL ZIP {#where-local-zip}

- Una, i-package ang add‑on: patakbuhin ang `make pack` sa root ng repository.
- Pagkatapos mag-package, hanapin ang “LOCAL” zip sa root ng repository (hal., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Bago muling i-package para sa testing, itaas ang mga bersyon sa parehong `sources/manifest_ATN.json` at `sources/manifest_LOCAL.json`.

---

## Pag-disable, Pag-uninstall, at Mga Update {#disable-uninstall-updates}

- I-disable: Thunderbird → Tools → Add‑ons and Themes → hanapin ang add‑on → i-toggle sa off.
- I-uninstall: parehong view → three‑dot menu → Remove.
- Mga update: Ang mga install mula sa ATN ay nag-a-auto‑update kapag may naaprubahang bagong bersyon. Ang mga LOCAL/dev install ay hindi nag-a-auto‑update; manu-manong muling i-install ang bagong LOCAL build.
- Alisin nang lubusan ang mga setting: tingnan ang [Privacy → Pag-alis ng data](privacy#data-removal).

Tingnan din

- [Mabilis na Pagsisimula](quickstart)
