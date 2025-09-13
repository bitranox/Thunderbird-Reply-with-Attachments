---
id: install
title: 'Ịtọlite'
slug: /install
sidebar_label: 'Ịtọlite'
---

## Ịtọlite site na "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Version Thunderbird kacha nta
Add-on a na-akwado Thunderbird **128 ESR ma ọ bụ ọhụrụ**. A naghị akwado ụdị ochie.
:::

Nke a bụ usoro ịtọlite a na-atụ aro. Add-ons ndị a na-etinye site na ATN (addons.thunderbird.net) na-anata mmelite akpaka. Ntinye LOCAL/dev adịghị eme mmelite akpaka.

- Version Thunderbird kacha nta: 128 ESR ma ọ bụ ọhụrụ.

1. Na Thunderbird, jee na **Ngwaọrụ > Add-ons na Themes**.
2. Chọta "zaghachi na njikọ".
3. Tinye add-on.

Ma ọ bụ mepee ibe add-on ahụ kpọmkwem: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ịtọliteaka nke aka site na XPI {#local-installation-in-thunderbird}

### Budata faịlụ XPI {#download-the-xpi-file}

1. Je na [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Budata ụdị kachasị ọhụrụ nke add-on dịka faịlụ XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Tinye na Thunderbird {#install-in-thunderbird-local}

1. Mepee Thunderbird.
2. Je na **Ngwaọrụ > Add-ons na Themes**.
3. Na **Nchekwa Add-ons**, pịa akara igwe na-ekpo ọkụ na akụkụ aka nri elu.
4. Họrọ **Tinye Add-on Site na Faịlụ…** si na menu.
5. Họrọ faịlụ `reply_with_attachments-x.y.z-tb.xpi` a na-ebudata.
6. Kwadoro itinye mgbe a jụrụ.

---

## Ịtọlite maka mmepe {#installation-for-development}

### Budata ụlọ akwụkwọ a {#download-the-repository}

1. Budata ụdị kachasị ọhụrụ nke ụlọ akwụkwọ GitHub.
2. Gba `make help` maka ozi ndị ọzọ.

### Tinye na Thunderbird {#install-in-thunderbird-dev}

1. Mepee Thunderbird.
2. Je na **Ngwaọrụ > Add-ons na Themes**.
3. Na **Nchekwa Add-ons**, pịa akara igwe na-ekpo ọkụ na akụkụ aka nri elu.
4. Họrọ **Tinye Add-on Site na Faịlụ…** si na menu.
5. Họrọ faịlụ a mepụtara `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kwadoro itinye mgbe a jụrụ.

Nkwupụta: Ọ bụrụ na Thunderbird anaghi anabata `.zip` na sistemụ gị, gbanwee ya ka ọ bụrụ `.xpi` ma gbalịa “Tinye Add-on Site na Faịlụ…” ọzọ.

### Ewhere ị ga-ahụ ZIP LOCAL {#where-local-zip}

- Nke mbu, jigọpụta add-on ahụ: gba `make pack` na mgbọrọgwụ ụlọ akwụkwọ.
- Mgbe ị na-agbagharị, chọta ZIP “LOCAL” na mgbọrọgwụ ụlọ akwụkwọ (dịka, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Tupu ịgagharịa maka nnwale, welie ụdị na `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Gbanyụọ, Wepu, na Mmelite {#disable-uninstall-updates}

- Gbanyụọ: Thunderbird → Ngwaọrụ → Add‑ons na Themes → chọta add-on → toggle off.
- Wepu: otu nchọpụta → menu atọ-dot → Wepu.
- Mmelite: Ntinye ATN na-eme mmelite akpaka mgbe ụdị ọhụrụ kwadoro. Ntinye LOCAL/dev adịghị eme mmelite akpaka; nweta ụdị LOCAL ọhụrụ n'aka.
- Wepu ntọala kpamkpam: lee [Nzuzo → Ikpochapụ data](privacy#data-removal).

Lee kwa

- [Nmalite Oge](quickstart)
