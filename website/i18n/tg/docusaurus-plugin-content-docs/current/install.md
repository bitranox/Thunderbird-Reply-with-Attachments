---
id: install
title: 'Устензия'
slug: /install
sidebar_label: 'Устензия'
---

## Устензия тавассути "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Версияи минималии Thunderbird
Ин замима версияи Thunderbird **128 ESR ё навтар**-ро дастгирӣ мекунад. Версияҳои куҳӣ дастгирӣ намешаванд.
:::

Ин усули тавсияшавандаи устунзӣ мебошад. Замимаҳое, ки аз ATN (addons.thunderbird.net) насб мешаванд, ба таври автоматикӣ навсозӣ мегардад. Устунзии LOCAL/dev автоматикӣ навсозӣ намешавад.

- Версияи минималии Thunderbird: 128 ESR ё навтар.

1. Дар Thunderbird, ба **Tools > Add-ons and Themes** равед.
2. Тадқиқ кунед "ҷавоб бо замимаҳо".
3. Замимаи навро илова кунед.

Ё бевосита ба саҳифаи замима равед: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Устензияи дастии XPI {#local-installation-in-thunderbird}

### Файл XPI-ро зеркашӣ кунед {#download-the-xpi-file}

1. Ба [саҳифаи замимаи Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) равед.
2. Версияи охирини замимаи XPI-ро зеркашӣ кунед (`reply_with_attachments-x.y.z-tb.xpi`).

### Устензӣ дар Thunderbird {#install-in-thunderbird-local}

1. Thunderbird-ро боз кунед.
2. Ба **Tools > Add-ons and Themes** равед.
3. Дар **Менеҷери замимаҳо**, нишони гиредро дар кунҷи болоии рост клик кунед.
4. **Install Add-on From File…**-ро аз меню интихоб кунед.
5. Файли зеркашишударо `reply_with_attachments-x.y.z-tb.xpi` интихоб кунед.
6. Вақте ки хоҳиш карда шуд, устунзиро тасдиқ кунед.

---

## Устензия барои рушди {#installation-for-development}

### Резиши репозитори {#download-the-repository}

1. Версияи охирини репозитории GitHub-ро зеркашӣ кунед.
2. `make help`-ро давр занед барои маълумоти иловагӣ.

### Устензӣ дар Thunderbird {#install-in-thunderbird-dev}

1. Thunderbird-ро боз кунед.
2. Ба **Tools > Add-ons and Themes** равед.
3. Дар **Менэҷери замимаҳо**, нишони гиредро дар кунҷи болоии рост клик кунед.
4. **Install Add-on From File…**-ро аз меню интихоб кунед.
5. Файли сохташударо `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` интихоб кунед.
6. Вақте ки хоҳиш карда шуд, устунзиро тасдиқ кунед.

Эзоҳ: Агар Thunderbird `.zip`-ро дар системаи шумо қабул накунад, онро ба `.xpi` номгузорӣ кунед ва боз "Install Add‑on From File…”-ро интихоб кунед.

### Кӯ dimana LOCAL ZIP {#where-local-zip}

- Аввал замимаҳоро печонед: `make pack`-ро дар решаҳои репозиторӣ иҷрошударо иҷро кунед.
- Пас аз печондан, ZIP-и “LOCAL”-и дар решаҳои репозиторӣ (масалан, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Пеш аз пешпардохт барои тест, версияҳо дар `sources/manifest_ATN.json` ва `sources/manifest_LOCAL.json`-ро баланд кунед.

---

## Хомӯш кардан, беҳишт кардан ва навсозӣ {#disable-uninstall-updates}

- Хомӯш кардан: Thunderbird → Tools → Add‑ons and Themes → замимаро пайдо кунед → хомӯш кунед.
- Беҳишт кардан: манзараи ҳамон → менюи се нуқта → Устонад.
- Навсозӣ: насбҳои ATN вақте, ки версияҳои нав иҷозатдодашударо бо автоматӣ навсозӣ мекунад. Насбҳои LOCAL/dev автоматикӣ навсозӣ намешаванд; сохтани LOCAL-и навро дастӣ кунайт.
- Ҳамаи параметрҳоро комилан нест кунед: бубинед [Privacy → Data removal](privacy#data-removal).

Нигаред ҳамчунин

- [Суръатнома](quickstart)
