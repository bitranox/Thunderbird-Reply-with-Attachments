---
id: install
title: 'Gurnama'
slug: /install
sidebar_label: 'Gurnama'
---

## Gurnama "Thunderbird Öňdebeli goşantlary we Tema" arkaly {#installation-in-thunderbird-recommended}

:::important Minimal Thunderbird wersiýasy
Bu goşmaça Thunderbird **128 ESR ýa-da has täze** wersiýalaryny goldaýar. Sargyt edilmedik wersiýalar goldanmaýar.
:::

Bu maslahat berlen gurnama usulydyr. ATN-dan (addons.thunderbird.net) gurnalan goşmaçalar avtomatiki täzelenmeleri alarlar. LOCAL/dev gurnamalary avtomatiki täzelenmeýär.

- Minimal Thunderbird wersiýasy: 128 ESR ýa-da has täze.

1. Thunderbird-da **Işläp Düzenlemeler > Goşmaçalar we Temalar** bölümine geçiň.
2. "göçürme bilen jogap ber" üçin gözleg ediň.
3. goşanty goşuň.

ýa-da goşmaça sahypasyna eseň: [Thunderbird Goşantlary (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI ulanyp ýükläp gurnamak {#local-installation-in-thunderbird}

### XPI faýlını ýükläň {#download-the-xpi-file}

1. [Thunderbird Goşant sahypasyna](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) geçiň.
2. goşant kopasiýa faýlyny goşmak üçin iň soňky wersiýasyny XPI faýly hökmünde ýükläň (`reply_with_attachments-x.y.z-tb.xpi`).

### Thunderbird-da gurnamak {#install-in-thunderbird-local}

1. Thunderbird-a açyň.
2. **Işläp Düzenlemeler > Goşmaçalar we Temalar** bölümine geçiň.
3. **Goşmaçalar Meneceri** bölüminde, ýokarky sag köşede zyň zynjyryny basyň.
4. Menýudan **Faýldan Goşant Gurmak...** saýlaň.
5. ýüklän `reply_with_attachments-x.y.z-tb.xpi` faýlyny saýlaň.
6. soralanda gurnamany tassyklanyň.

---

## Ösüş üçin gurnamak {#installation-for-development}

### Repo şol şertle öwreniň {#download-the-repository}

1. GitHub repo-iň iň soňky wersiýasyny ýükläň.
2. Has giňişleýin maglumat üçin `make help`运行.

### Thunderbird-da gurnamak {#install-in-thunderbird-dev}

1. Thunderbird-a açyň.
2. **Işläp Düzenlemeler > Goşmaçalar we Temalar** bölümine geçiň.
3. **Goşmaçalar Meneceri** bölüminde, ýokarky sag köşede zyň zynjyryny basyň.
4. Menýudan **Faýldan Goşant Gurmak...** saýlaň.
5. döredilen `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` faýlyny saýlaň.
6. soralanda gurnamany tassyklanyň.

Belgi: Eger Thunderbird `.zip` sistemyňizde kabul etmese, ony `.xpi` diýip atlandyryň we "Faýldan Goşant Gurmak..." saýlamagyňyzy gaýtalaň.

### LOCAL ZIP-i neritmek {#where-local-zip}

- Ilkinji, goşanty paket ediň: repo kökünde `make pack` işlediň.
- Paketlenenden soň, repo kökünde "LOCAL" zip-i tapyň (meselem, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Synag üçin gaýtadan paketlemekden öň, `sources/manifest_ATN.json` we `sources/manifest_LOCAL.json` iki üpjün ediş weight 分享.

---

## Çekmek, Öçürmek, we Täzelikler {#disable-uninstall-updates}

- Çekmek: Thunderbird → Işläp Düzenlemeler → Goşmaçalar we Temalar → goşanty tapyň → off-a geçiriň.
- Öçürmek: şul bir görkezijinde → üç nokat menýusyna → Öçürmek.
- Täzelikler: ATN gurnamalary täze wersiýalar kabul edilende awtomatiki täzelenýär. LOCAL/dev gurnamalary awtomatiki täzelenmeýär; täze LOCAL gurluşy öňki öz-özüne oňky edition gurnamaga täzeden eýe boluň.
- Düzgünleri doly aýyrmak üçin: [Gizlinlik → Maglumat aýyrmak](privacy#data-removal) göz öňünde tutuň.

Şeýle hem görýär

- [Gysgaça](quickstart)
