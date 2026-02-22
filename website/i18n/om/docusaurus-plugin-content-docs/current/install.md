---
id: install
title: 'Instaleeshinii'
slug: /install
sidebar_label: 'Instooleshinii'
---

---

## Instooleshinii karaa "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Vershinii xiqqaa Thunderbird
Add‑on kun Thunderbird **128 ESR yookaan isa haaraa** qofa ni deeggara. Vershinoonni duraanii hin deeggaraman.
:::

Kuni mala instooleshinii kan gorsamuudha. Add‑onwwan ATN (addons.thunderbird.net) irraa instoolaman haaromsa of‑aanaa ni argatu. Instooleshinoonni LOCAL/dev ofiin hin haaromman.

- Vershinii xiqqaa Thunderbird: 128 ESR yookaan isa haaraa.

1. Thunderbird keessatti gara **Tools > Add-ons and Themes** deemi.
2. "reply with attachments" barbaadi.
3. Add‑on sana itti dabal.

Yookaan fuula add‑on sanaa kallattiin bani: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instooleshinii harkaan XPI irraa {#local-installation-in-thunderbird}

### Faayila XPI buufadhu {#download-the-xpi-file}

1. Gara [fuula Add‑on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) deemi.
2. Vershinii haaraa add‑on kanaa akka faayila XPI (`reply_with_attachments-x.y.z-tb.xpi`) buufadhu.

### Thunderbird keessatti instooli {#install-in-thunderbird-local}

1. Thunderbird bani.
2. Gara **Tools > Add-ons and Themes** deemi.
3. Keessa **Add-ons Manager**, gubba mirgaa mallattoo gear tuqi.
4. Menu irraa **Install Add-on From File…** fili.
5. Faayila `reply_with_attachments-x.y.z-tb.xpi` buufame fili.
6. Yeroo gaafatamu instooleshinii mirkaneessi.

---

## Instooleshinii misoomaaf {#installation-for-development}

### Repoziitoorii buufadhu {#download-the-repository}

1. Vershinii haaraa repoziitoorii GitHub buufadhu.
2. Odeeffannoo dabalataa argachuuf `make help` raawwadhu.

### Thunderbird keessatti instooli {#install-in-thunderbird-dev}

1. Thunderbird bani.
2. Gara **Tools > Add-ons and Themes** deemi.
3. Keessa **Add-ons Manager**, gubba mirgaa mallattoo gear tuqi.
4. Menu irraa **Install Add-on From File…** fili.
5. Faayila uumame `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` fili.
6. Yeroo gaafatamu instooleshinii mirkaneessi.

Yaadachiisa: Yoo Thunderbird `.zip` sirna kee irratti hin fudhanne, maqaa isaa gara `.xpi`tti jijjiiri; “Install Add‑on From File…” irra deebi'ii yaali.

### LOCAL ZIP eessa argatta {#where-local-zip}

- Jalqaba, add‑on sana package gochii: `make pack` bu’uura repo keessatti raawwadhu.
- Erga package gootee booda, zip “LOCAL” bu’uura repo keessatti argadhu (fakkeenyaaf, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Qorannoo dura irra‑deebi'ee package gochuu dura, lakkoofsa vershinii lamaan, `sources/manifest_ATN.json` fi `sources/manifest_LOCAL.json`, olkaasi.

---

## Dhaamsuu, Uninstoolii, fi Haaromsa {#disable-uninstall-updates}

- Dhaamsuu: Thunderbird → Tools → Add‑ons and Themes → add‑on sana barbaadi → toggle off godhi.
- Uninstoolii: ilaalcha sana irra → three‑dot menu → Remove.
- Haaromsa: ATN yeroo vershinoonni haaraan eeyyamaman auto‑update ni taasisa. Instooleshinoonni LOCAL/dev ofiin hin haaromman; LOCAL build haaraa harkaan irra deebi'ii instooli.
- Qindaa'inoota guutumaan guutuutti haquu: [Privacy → Data removal](privacy#data-removal) ilaali.

Kan biraa ilaali

- [Jalqabbi saffisaa](quickstart)
