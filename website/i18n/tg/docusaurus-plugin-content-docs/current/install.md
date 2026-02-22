---
id: install
title: 'Насб'
slug: /install
sidebar_label: 'Насб'
---

---

## Насб тавассути «Иловаҳову мавзӯъҳо»-и Thunderbird {#installation-in-thunderbird-recommended}

:::important Версияи ҳадди ақали Thunderbird
Ин илова Thunderbird **128 ESR ё навтар**-ро дастгирӣ мекунад. Версияҳои кӯҳнатар дастгирӣ намешаванд.
:::

Ин усули тавсияшудаи насб аст. Иловаҳое, ки аз ATN (addons.thunderbird.net) насб мешаванд, навсозиҳои худкор мегиранд. Насбҳои LOCAL/dev худкор нав намешаванд.

- Версияи ҳадди ақали Thunderbird: 128 ESR ё навтар.

1. Дар Thunderbird ба **Tools > Add-ons and Themes** гузаред.
2. Ҷустуҷӯ кунед "reply with attachments".
3. Иловаро илова кунед.

Ё саҳифаи иловаҳоро бевосита кушоед: [Иловаҳои Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Насби дастӣ аз XPI {#local-installation-in-thunderbird}

### Файли XPI-ро боргирӣ кунед {#download-the-xpi-file}

1. Ба [саҳифаи иловаи Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) равед.
2. Версияи охирини иловаро ҳамчун файли XPI (`reply_with_attachments-x.y.z-tb.xpi`) боргирӣ кунед.

### Дар Thunderbird насб кунед {#install-in-thunderbird-local}

1. Thunderbird-ро кушоед.
2. Ба **Tools > Add-ons and Themes** гузаред.
3. Дар **Add-ons Manager**, нишонаи фишангро дар кунҷи болоии рост зер кунед.
4. Аз меню **Install Add-on From File…**-ро интихоб кунед.
5. Файли `reply_with_attachments-x.y.z-tb.xpi`-и боргиришударо интихоб кунед.
6. Ҳангоми дархост насбро тасдиқ кунед.

---

## Насб барои рушд {#installation-for-development}

### Анборро боргирӣ кунед {#download-the-repository}

1. Версияи охирини анбори GitHub-ро боргирӣ кунед.
2. Барои маълумоти бештар `make help`-ро иҷро кунед.

### Дар Thunderbird насб кунед {#install-in-thunderbird-dev}

1. Thunderbird-ро кушоед.
2. Ба **Tools > Add-ons and Themes** гузаред.
3. Дар **Add-ons Manager**, нишонаи фишангро дар кунҷи болоии рост зер кунед.
4. Аз меню **Install Add-on From File…**-ро интихоб кунед.
5. Файли тавлидшудаи `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`-ро интихоб кунед.
6. Ҳангоми дархост насбро тасдиқ кунед.

Эзоҳ: Агар Thunderbird дар низоми шумо `.zip`-ро қабул накунад, онро ба `.xpi` тағйири ном диҳед ва боз “Install Add‑on From File…”-ро санҷед.

### Куҷо “LOCAL ZIP”-ро ёфтан мумкин аст {#where-local-zip}

- Аввал, иловаро бастабандӣ кунед: `make pack`-ро дар решаи анбор иҷро кунед.
- Пас аз бастабандӣ, “LOCAL” zip-ро дар решаи анбор пайдо кунед (мас., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Пеш аз дубора бастабандӣ барои озмоиш, версияҳоро ҳам дар `sources/manifest_ATN.json` ва ҳам дар `sources/manifest_LOCAL.json` боло баред.

---

## Ғайрифаъол кардан, хориҷ кардан ва навсозиҳо {#disable-uninstall-updates}

- Ғайрифаъол: Thunderbird → Tools → Add‑ons and Themes → иловаро ёбед → хомӯш кунед.
- Хориҷ кардан: ҳамон саҳифа → менюи сеноқта → Remove.
- Навсозиҳо: насб аз ATN ҳангоми тасдиқи версияҳои нав худкор нав мешавад. Насбҳои LOCAL/dev худкор нав намешаванд; сохтмони нави LOCAL-ро дастӣ дубора насб кунед.
- Пурра тоза кардани танзимот: нигаред [Махфият → Ҳазфи додаҳо](privacy#data-removal).

Инҳоро низ бинед

- [Оғози зуд](quickstart)
