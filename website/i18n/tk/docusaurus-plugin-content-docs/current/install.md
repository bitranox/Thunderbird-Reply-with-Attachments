---
id: install
title: 'Gurnama'
slug: /install
sidebar_label: 'Gurnama'
---

---

## "Thunderbird Add-ons and Themes" arkaly gurmak {#installation-in-thunderbird-recommended}

:::important Iň pes Thunderbird wersiýasy
Bu goşmaça Thunderbird **128 ESR ýa-da ondan täze** wersiýalary goldaýar. Köne wersiýalar goldanylmaýar.
:::

Bu maslahat berilýän gurma usulydyr. ATN-den (addons.thunderbird.net) gurnalan goşmaçalar awtomatiki täzelenýär. LOCAL/dev gurnamalary awtomatiki täzelenme almaýar.

- Iň pes Thunderbird wersiýasy: 128 ESR ýa-da ondan täze.

1. Thunderbird-de, **Tools > Add-ons and Themes** bölümine gidiň.
2. "reply with attachments" gözläň.
3. Goşmaçany goşuň.

Ýa-da goşmaça sahypasyny göni açyň: [Thunderbird Goşmaçalar (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI arkaly el bilen gurmak {#local-installation-in-thunderbird}

### XPI faýlyny göçürip alyň {#download-the-xpi-file}

1. [Thunderbird goşmaça sahypasyna](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) gidiň.
2. Goşmaçanyň iň soňky wersiýasyny XPI faýly ( `reply_with_attachments-x.y.z-tb.xpi` ) görnüşinde göçürip alyň.

### Thunderbird-de gurmak {#install-in-thunderbird-local}

1. Thunderbird-i açyň.
2. **Tools > Add-ons and Themes** bölümine gidiň.
3. **Add-ons Manager**-de, ýokarky sag burçdaky dişli nyşany basyň.
4. Menýudan **Install Add-on From File…** saýlaň.
5. Göçürip alan `reply_with_attachments-x.y.z-tb.xpi` faýlyňyzy saýlaň.
6. Soralsa, gurnamany tassyklaň.

---

## Ösüş üçin gurmak {#installation-for-development}

### Repozitoriýany göçürip alyň {#download-the-repository}

1. GitHub repozitoriýasynyň iň soňky wersiýasyny göçürip alyň.
2. Has giňişleýin maglumat üçin `make help` işlediň.

### Thunderbird-de gurmak {#install-in-thunderbird-dev}

1. Thunderbird-i açyň.
2. **Tools > Add-ons and Themes** bölümine gidiň.
3. **Add-ons Manager**-de, ýokarky sag burçdaky dişli nyşany basyň.
4. Menýudan **Install Add-on From File…** saýlaň.
5. Dörän `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` faýlyny saýlaň.
6. Soralsa, gurnamany tassyklaň.

Bellik: Eger-de siziň ulgamyňyzda Thunderbird `.zip` kabul etmese, onuň adyny `.xpi` diýip üýtgedip, “Install Add‑on From File…” usulyny gaýtadan synanyşyň.

### LOCAL ZIP-ni nireden tapmaly {#where-local-zip}

- Ilki bilen, goşmaçany paketläň: repozitoriýanyň kökünde `make pack` işlediň.
- Paketländikden soň, repozitoriýanyň kökünden “LOCAL” zip faýlyny tapyň (meselem, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Synag üçin gaýtadan paketlemezden öň, `sources/manifest_ATN.json` hem-de `sources/manifest_LOCAL.json` faýllarynyň ikisinde-de wersiýa belgilerini ýokarlandyryň.

---

## Öçürmek, Pozmak we Täzelenmeler {#disable-uninstall-updates}

- Öçürmek: Thunderbird → Tools → Add‑ons and Themes → goşmaçany tapyň → açyk/ýapyk geçirişini öçüriň.
- Pozmak: şol bir görnüş → üç nokat menýusy → Remove.
- Täzelenmeler: Täze wersiýalar tassyk edilende ATN arkaly gurnalanlar awtomatiki täzelenýär. LOCAL/dev gurnamalary awtomatiki täzelenme almaýar; täze LOCAL ýygyndysyny el bilen gaýtadan gurnuň.
- Sazlamalary doly aýyrmak: [Gizlinlik → Maglumatlary aýyrmak](privacy#data-removal) bölümine serediň.

Şeýle hem serediň

- [Çalt başlangyç](quickstart)
