---
id: install
title: 'نصب'
slug: /install
sidebar_label: 'نصب'
---

---

## د "Thunderbird Add-ons and Themes" له لارې لګول {#installation-in-thunderbird-recommended}

:::important د Thunderbird لږ تر لږه نسخه
دا اډ‑ان د Thunderbird **128 ESR يا تر هغې نويو** نسخو ملاتړ کوي. زاړې نسخې نه ملاتړ کېږي.
:::

دا سپارښتل شوې د لګولو طریقه ده. هغه اډ‑انونه چې له ATN (addons.thunderbird.net) څخه لګېږي، اتوماتيکي اوسمخونې ترلاسه کوي. د LOCAL/dev لګونې اتومات نه اوسمېږي.

- لږ تر لږه د Thunderbird نسخه: 128 ESR يا نوې.

1. په Thunderbird کې **Tools > Add-ons and Themes** ته ولاړ شئ.
2. د "reply with attachments" لپاره لټون وکړئ.
3. اډ‑ان اضافه کړئ.

يا د اډ‑ان پاڼه نېغ پرانیزئ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## د XPI له لارې لاسي لګونه {#local-installation-in-thunderbird}

### د XPI دوتنه ښکته کړئ {#download-the-xpi-file}

1. د [Thunderbird اډ‑ان پاڼه](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ته ولاړ شئ.
2. د اډ‑ان وروستۍ نسخه د XPI دوتنې په توګه (`reply_with_attachments-x.y.z-tb.xpi`) ښکته کړئ.

### په Thunderbird کې لګول {#install-in-thunderbird-local}

1. Thunderbird پرانیزئ.
2. **Tools > Add-ons and Themes** ته ولاړ شئ.
3. په **Add-ons Manager** کې، په ښي‑پورته کونج کې د ګير آيکن ووهئ.
4. له مېنيو څخه **Install Add-on From File…** وټاکئ.
5. هغه `reply_with_attachments-x.y.z-tb.xpi` دوتنه وټاکئ چې مو کښته کړې.
6. کله چې وپوښتل شي، لګونه تایید کړئ.

---

## د پراختیا لپاره لګونه {#installation-for-development}

### زېرمتون ښکته کړئ {#download-the-repository}

1. د GitHub زېرمتون وروستۍ نسخه ښکته کړئ.
2. د لا ډېرو معلوماتو لپاره `make help` وچلوئ.

### په Thunderbird کې لګول {#install-in-thunderbird-dev}

1. Thunderbird پرانیزئ.
2. **Tools > Add-ons and Themes** ته ولاړ شئ.
3. په **Add-ons Manager** کې، په ښي‑پورته کونج کې د ګير آيکن ووهئ.
4. له مېنيو څخه **Install Add-on From File…** وټاکئ.
5. رامنځته شوې دوتنه `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` وټاکئ.
6. کله چې وپوښتل شي، لګونه تایید کړئ.

يادونه: که Thunderbird په ستاسو سيستم کې `.zip` و نه مني، نوم يې `.xpi` ته واړوئ او “Install Add‑on From File…” بيا هڅه وکړئ.

### د LOCAL ZIP چيرې ومومئ {#where-local-zip}

- لومړی، اډ‑ان پکيج/بسته کړئ: په د زېرمتون په ريښه کې `make pack` وچلوئ.
- له پکېج کولو وروسته، د زېرمتون په ريښه کې د “LOCAL” zip ومومئ (لکه `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- د ازموينې لپاره د بيا پکېج کولو څخه مخکې، نسخې په دواړو `sources/manifest_ATN.json` او `sources/manifest_LOCAL.json` کې لوړ کړئ.

---

## غيرفعالول، اېستل، او اوسمخونې {#disable-uninstall-updates}

- غيرفعالول: Thunderbird → Tools → Add‑ons and Themes → اډ‑ان ومومئ → بند يې کړئ.
- اېستل: هماغه ليد → د درې ټکو مېنيو → Remove.
- اوسمخونې: د ATN له لارې لګونې د نويو نسخو له تاييد وروسته په اوتومات ډول اوسمېږي. د LOCAL/dev لګونې په اوتومات ډول نه اوسمېږي؛ نوې LOCAL جوړونه په لاسي ډول بيا ولګوئ.
- امستنې په بشپړ ډول لرې کول: وګورئ [محرمیت → د معلوماتو لرې کول](privacy#data-removal).

همدارنګه وګورئ

- [چټک پیل](quickstart)
