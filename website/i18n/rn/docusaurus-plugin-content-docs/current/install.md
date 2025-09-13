---
id: install
title: 'Gukora'
slug: /install
sidebar_label: 'Gukora'
---

## Gukora ukoresheje "Thunderbird Add-ons na Themes" {#installation-in-thunderbird-recommended}

:::important Ingingo y'ingenzi ku rwego rwa Thunderbird
Iyi add-on yishyigikira Thunderbird **128 ESR cyangwa hejuru**. Inyandiko za kera ntizishigikirwa.
:::

Ubu ni uburyo bwiza bwo gukorera. Add-on zishyizweho kuva kuri ATN (addons.thunderbird.net) zigira amakuru yihuse. Imitwe ya LOCAL/dev ntizishobora kwiyongera mu buryo bwikora.

- Urwego rwa Thunderbird rukeneye: 128 ESR cyangwa hejuru.

1. Mu Thunderbird, jya ku **Ibikoresho > Add-ons na Themes**.
2. Shakisha "gusubiza hamwe n'inyandiko".
3. Ongera add-on.

Cyangwa fungura urupapuro rwa add-on mu buryo butaziguye: [Thunderbird Add-ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Gukora mu ntoki kuva kuri XPI {#local-installation-in-thunderbird}

### Kuramo dosye ya XPI {#download-the-xpi-file}

1. Jya ku [paji ya Thunderbird Add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Kuramo version ya nyuma ya add-on nk'igikoresho cya XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Gukora muri Thunderbird {#install-in-thunderbird-local}

1. Fungura Thunderbird.
2. Jya ku **Ibikoresho > Add-ons na Themes**.
3. Mu **Manager wa Add-ons**, kanda ikiranga cy'icyuma mu gice cyo hejuru iburyo.
4. Hitamo **Shyiramo Add-on Ukoresheje Dosye…** mu menu.
5. Hitamo dosye ya `reply_with_attachments-x.y.z-tb.xpi` wakuyeyo.
6. Emeza gukorana igihe bibasabiwe.

---

## Gukora ku rwego rwa Developer {#installation-for-development}

### Kuramo isoko {#download-the-repository}

1. Kuramo version ya nyuma y'isoko rya GitHub.
2. Koresha `make help` kubisobanuro birambuye.

### Gukora muri Thunderbird {#install-in-thunderbird-dev}

1. Fungura Thunderbird.
2. Jya ku **Ibikoresho > Add-ons na Themes**.
3. Mu **Manager wa Add-ons**, kanda ikiranga cy'icyuma mu gice cyo hejuru iburyo.
4. Hitamo **Shyiramo Add-on Ukoresheje Dosye…** mu menu.
5. Hitamo dosye y'ibikurikira `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Emeza gukorana igihe bibasabiwe.

Icyitonderwa: Niba Thunderbird idakiriye `.zip` kuri sisitemu yawe, hindura izina kuyita `.xpi` maze ugerageze “Shyiramo Add-on Ukoresheje Dosye…” ukundi.

### Aho uri kubona LOCAL ZIP {#where-local-zip}

- Mbere, pakiga add-on: kora `make pack` ku mizi y'ishakisha.
- Nyuma yo gupakira, shaka "LOCAL" zip mu mizi y'ishakisha (nka `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Mbere yo kongera gupakira ku g 测试, ongera guhindura ibice mu `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Guhagarika, Gukuraho, no Guhindura {#disable-uninstall-updates}

- Guhagarika: Thunderbird → Ibikoresho → Add-ons na Themes → shaka add-on → kanda guhindura.
- Gukuraho: ishusho imwe → menu y'imitwe itatu → Kuramo.
- Guhindura: Imitwe ya ATN ihinduka mu buryo bwikora igihe version nshya yemejwe. Imitwe ya LOCAL/dev ntabwo ihinduka mu buryo bwikora; subiza inyuma build ya LOCAL mu buryo bwimanukiriye.
- Gukuramo ibikenewe byuzuye: reba [Ubwirinzi → Gukuramo amakuru](privacy#data-removal).

Reba kandi

- [Iby'ibanze](quickstart)
