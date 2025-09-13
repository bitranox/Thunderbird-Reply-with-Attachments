---
id: install
title: 'Fakelo'
slug: /install
sidebar_label: 'Fakelo'
---

## Fakelo nge "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Inani elincinane le-Thunderbird
Le add‑on ixhasa i-Thunderbird **128 ESR okanye ikhokhelo**. Iinguqulelo ezindala azixhaswanga.
:::

Le yindlela efunwa kakhulu yokufaka. I-add‑ons efakwe kwi-ATN (addons.thunderbird.net) ifumana uhlaziyo ngokuzenzekelayo. Ukufakwa kweLOCAL/dev akuzihlazi.

- Inani elincinane le-Thunderbird: 128 ESR okanye ikhokhelo.

1. Ku-Thunderbird, yiya **Izixhobo > I-add-ons neThemes**.
2. Funa "phendula ngama-attachments".
3. Faka i-add-on.

Okanye uvule iphepha le-add-on ngokuthe ngqo: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ukufaka ngokwakho ukusuka kwi-XPI {#local-installation-in-thunderbird}

### Landa ifayile ye-XPI {#download-the-xpi-file}

1. Yiha kwi [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Landa inguqulo yokugqibela ye-add-on njengofayile ye-XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Faka kwi-Thunderbird {#install-in-thunderbird-local}

1. Vula i-Thunderbird.
2. Yiha **Izixhobo > I-add-ons neThemes**.
3. Kwi **Mphathi we-Add-ons**, cofa kumjikelo ophakathi phezulu.
4. Khetha **Faka i-Add-on EsiFayilini...** kumenyu.
5. Khetha ifayile ye `reply_with_attachments-x.y.z-tb.xpi` elandiwe.
6. Qinisekisa ukufakwa xa uphona.

---

## Fakelo ukuze kuphuhliswa {#installation-for-development}

### Landa umphakathi {#download-the-repository}

1. Landa inguqulo yokugqibela yeGitHub repository.
2. Qhuba `make help` ukuze ufumane ulwazi olungakumbi.

### Faka kwi-Thunderbird {#install-in-thunderbird-dev}

1. Vula i-Thunderbird.
2. Yiha **Izixhobo > I-add-ons neThemes**.
3. Kwi **Mphathi we-Add-ons**, cofa kumjikelo ophakathi phezulu.
4. Khetha **Faka i-Add-on EsiFayilini...** kumenyu.
5. Khetha ifayile eyenziwe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Qinisekisa ukufakwa xa uphona.

Qaphela: Ukuba i-Thunderbird ayamkelanga i `.zip` kwi-sistema yakho, ukuyibiza ngoku `.xpi` kwaye uzame "Faka i-Add-on EsiFayilini..." kwakhona.

### Uphi uziphu lwe-LOCAL {#where-local-zip}

- Okokuqala, pckaygela i-add-on: qhuba `make pack` kumphakathi wombhini.
- Emva kokupakishwa, fumana i-zip "LOCAL" kumphakathi wombhini (umzekelo, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ngaphambi kokupakishwa kwe-tsehtshima, phakamisa iingxaki kwii `sources/manifest_ATN.json` kunye `sources/manifest_LOCAL.json`.

---

## Phosa, Uhlaziye, kunye neUhlaziyo {#disable-uninstall-updates}

- Phosa: Thunderbird → Izixhobo → I-add-ons neThemes → fumana i-add-on → phosa.
- Uhlaziye: umfanekiso ofanayo → imenyu ye-三-dot → Susa.
- Uhlaziyo: I-ATN ifaka ngokuzenzekelayo xa iinguqulo ezintsha zivunyiwe. Ukufakwa kweLOCAL/dev akuzihlazi; shicilela yemodeli entsha yeLOCAL ngesandla.
- Susa imiyalelo ngokupheleleyo: jonga [Ubumfihlo → Ukususwa kwedatha](privacy#data-removal).

Jonga kwakhona

- [Ukwenza kube lula](quickstart)
