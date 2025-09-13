---
id: install
title: 'Kuyika'
slug: /install
sidebar_label: 'Kuyika'
---

## Kuyika mwa "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Version ya Thunderbird Yotsatira
Chida ichi chikugwira ntchito ndi Thunderbird **128 ESR kapena kupitilira**. Z versions zakale sizikugwirizana.
:::

Iyi ndi njira yotsatsira kuyika. Zida zomwe zidakalipo kuchokera ku ATN (addons.thunderbird.net) zimakhala ndi kukonza kwachangu. LOCAL/dev installs sizikukonzedwanso.

- Version yotsatira ya Thunderbird: 128 ESR kapena kupitilira.

1. Mu Thunderbird, pitani ku **Tools > Add-ons and Themes**.
2. Funsani "funso ndi mafa".
3. Onjezani chida.

Kapena tsatira tsamba la chida mwachindunji: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kuyika mwachindunji kuchokera ku XPI {#local-installation-in-thunderbird}

### Download the XPI file {#download-the-xpi-file}

1. Pitani ku [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Download mtundu wapamwamba wa chida monga XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### Kuyika mu Thunderbird {#install-in-thunderbird-local}

1. Fikani mu Thunderbird.
2. Pitani ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dinani chithunzi cha gear mu gulu la kumanzere.
4. Chitani **Install Add-on From File…** kuchokera mu menyu.
5. Sankhani `reply_with_attachments-x.y.z-tb.xpi` file yomwe mwadownload.
6. Onetsani kuyika pamene mukufunsidwa.

---

## Kuyika kwa chitukuko {#installation-for-development}

### Download the repository {#download-the-repository}

1. Download mtundu wapamwamba wa GitHub repository.
2. Run `make help` kuti mupeze zambiri.

### Kuyika mu Thunderbird {#install-in-thunderbird-dev}

1. Fikani mu Thunderbird.
2. Pitani ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dinani chithunzi cha gear mu gulu la kumanzere.
4. Chitani **Install Add-on From File…** kuchokera mu menyu.
5. Sankhani `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` file yomwe mwapangitsa.
6. Onetsani kuyika pamene mukufunsidwa.

Chidziwitso: Ngati Thunderbird sikulandira `.zip` pa dongosolo lanu, sinthani dzina lake kukhala `.xpi` ndipo edzani "Install Add‑on From File…" zimenezo kapena.

### Kumene kufunafuna LOCAL ZIP {#where-local-zip}

- Choyamba, pakani chida: run `make pack` mu mizu ya repository.
- Pambuyo pokonza, pezani "LOCAL" zip mu mizu ya repository (mwa mfano, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Chitani kuvala mwachindunji kwa kafukufuku, phatikizani zosintha mu `sources/manifest_ATN.json` ndi `sources/manifest_LOCAL.json`.

---

## Chisokonezo, Chotsani, ndi Zosinthika {#disable-uninstall-updates}

- Chisokonezo: Thunderbird → Tools → Add‑ons and Themes → pezani chida → chotsani.
- Chotsani: mawonekedwe ofanana → menyu ya mipangidwe itatu → Chotsani.
- Zosinthika: ATN installs zimakhala ndi kukonza kwachangu pamene mitundu yatsopano ikuvomerezedwa. LOCAL/dev installs sizikukonzedwanso; onjezani mtundu watsopano wa LOCAL mwachindunji.
- Chotsani zikhazikitso kuchokera bwino: onani [Privacy → Kuchotsa data](privacy#data-removal).

Onani komanso

- [Quickstart](quickstart)
