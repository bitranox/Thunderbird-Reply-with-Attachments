---
id: install
title: 'Ịwụnye'
slug: /install
sidebar_label: 'Ịwụnye'
---

---

## Ntinye site na "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Nsụgharị Thunderbird kacha nta
Mgbakwunye a na-akwado Thunderbird **128 ESR ma ọ bụ nke dị ọhụrụ karịa**. A naghị akwado nsụgharị dị ochie.
:::

Nke a bụ usoro ntinye a na-akwado. Mgbakwunye e tinyere site na ATN (addons.thunderbird.net) na-enweta mmelite akpaaka. Ntinye LOCAL/dev anaghị emelite akpaaka.

- Nsụgharị Thunderbird kacha nta: 128 ESR ma ọ bụ nke dị ọhụrụ karịa.

1. N'ime Thunderbird, gaa na **Tools > Add-ons and Themes**.
2. Chọọ "reply with attachments".
3. Tinye mgbakwunye ahụ.

Ma ọ bụ mepee ibe mgbakwunye ozugbo: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ntinye n'aka site na XPI {#local-installation-in-thunderbird}

### Budata faịlụ XPI {#download-the-xpi-file}

1. Gaa na [ibe mgbakwunye Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Budata nsụgharị kacha ọhụrụ nke mgbakwunye ahụ dị ka faịlụ XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Wunye na Thunderbird {#install-in-thunderbird-local}

1. Mepee Thunderbird.
2. Gaa na **Tools > Add-ons and Themes**.
3. Na **Add-ons Manager**, pịa akara igwe (gear) dị n'akụkụ aka nri elu.
4. Họrọ **Install Add-on From File…** n’ime menu ahụ.
5. Họrọ faịlụ `reply_with_attachments-x.y.z-tb.xpi` e budatara.
6. Kwenye ntinye ahụ mgbe e jụrụ gị.

---

## Ntinye maka mmepe {#installation-for-development}

### Budata repozịtori {#download-the-repository}

1. Budata nsụgharị kacha ọhụrụ nke repozịtori GitHub.
2. Gbaa `make help` maka ozi ndị ọzọ.

### Wunye na Thunderbird {#install-in-thunderbird-dev}

1. Mepee Thunderbird.
2. Gaa na **Tools > Add-ons and Themes**.
3. Na **Add-ons Manager**, pịa akara igwe (gear) dị n'akụkụ aka nri elu.
4. Họrọ **Install Add-on From File…** n’ime menu ahụ.
5. Họrọ faịlụ emepụtara `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kwenye ntinye ahụ mgbe e jụrụ gị.

Rịba ama: Ọ bụrụ na Thunderbird ekweghị `.zip` na sistemụ gị, gbanwee aha ya gaa `.xpi` ma nwalee “Install Add‑on From File…” ọzọ.

### Ebee ka ịchọta LOCAL ZIP {#where-local-zip}

- Mbụ, kpakọọ mgbakwunye ahụ: gbaa `make pack` na mgbọrọgwụ repozịtori.
- Mgbe ikpakọchara, chọta zip “LOCAL” na mgbọrọgwụ repozịtori (dịka, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Tupu ịkpakọghachi maka nnwale, bulie nsụgharị na `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json` abụọ.

---

## Gbanyụọ, Wepụ, na Mmelite {#disable-uninstall-updates}

- Gbanyụọ: Thunderbird → Tools → Add‑ons and Themes → chọta mgbakwunye ahụ → gbanyụọ ya.
- Wepụ: otu nlele ahụ → menu ntụpọ atọ → Remove.
- Mmelite: Ntinye sitere na ATN na‑emelite akpaaka mgbe a kwadoro nsụgharị ọhụrụ. Ntinye LOCAL/dev anaghị emelite akpaaka; wụnye nrụpụta LOCAL ọhụrụ n’ụzọ aka.
- Wepụ ntọala kpamkpam: hụ [Nzuzo → Wepu data](privacy#data-removal).

Hụkwa

- [Mbido ngwa ngwa](quickstart)
