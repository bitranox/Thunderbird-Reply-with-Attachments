---
id: install
title: 'قاچىلاش'
slug: /install
sidebar_label: 'قاچىلاش'
---

---

## «Thunderbird Add-ons and Themes» ئارقىلىق ئورنىتىش {#installation-in-thunderbird-recommended}

:::important ئەڭ تۆۋەن Thunderbird نەشرى
بۇ قىستۇرما Thunderbird **128 ESR ياكى ئۇنىڭدىن يېڭىراق** نەشرىنى قوللايدۇ. كونا نەشرىلەر قوللانمايدۇ.
:::

بۇ تەۋسىيە قىلىنغان ئورنىتىش ئۇسۇلى. ATN (addons.thunderbird.net) ئارقىلىق ئورنىتىلغان قىستۇرمىلار ئاپتوماتىك يېڭىلانما ئاڭلايدۇ. LOCAL/dev ئارقىلىق ئورنىتىلغاندىكىلىرى ئاپتوماتىك يېڭىلانمايدۇ.

- ئەڭ تۆۋەن Thunderbird نەشرى: 128 ESR ياكى ئۇنىڭدىن يېڭىراق.

1. Thunderbird دا **Tools > Add-ons and Themes** غا بېرىڭ.
2. "reply with attachments" نى ئىزدەڭ.
3. قىستۇرمىنى قوشۇڭ.

ياكى قىستۇرما بېتىنى بىۋاسىتە ئېچىڭ: [Thunderbird قىستۇرمالىرى (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI دىن قولدا ئورنىتىش {#local-installation-in-thunderbird}

### XPI ھۆججىتىنى چۈشۈرۈش {#download-the-xpi-file}

1. [Thunderbird قىستۇرما بېتى](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) غا بېرىڭ.
2. قىستۇرمانىڭ ئەڭ يېڭى نەشرىنى XPI ھۆججىتى سۈپىتىدە چۈشۈرۈڭ (`reply_with_attachments-x.y.z-tb.xpi`).

### Thunderbird غا ئورنىتىش {#install-in-thunderbird-local}

1. Thunderbird نى ئېچىڭ.
2. **Tools > Add-ons and Themes** غا بېرىڭ.
3. **Add-ons Manager** دا، ئوڭ ئۈستى بۇلۇڭدىكى چىرخىچ سىنبەلگىسىنى چېكىڭ.
4. تىزىملىكتە **Install Add-on From File…** نى تاللاڭ.
5. چۈشۈرگەن `reply_with_attachments-x.y.z-tb.xpi` ھۆججىتىنى تاللاڭ.
6. ئۇقتۇرۇش چىققاندا ئورنىتىشنى جەزملەڭ.

---

## تۈزگۈچىلەر ئۈچۈن ئورنىتىش {#installation-for-development}

### خەزىنىنى چۈشۈرۈش {#download-the-repository}

1. GitHub خەزىنىسىنىڭ ئەڭ يېڭى نەشرىنى چۈشۈرۈڭ.
2. تېخىمۇ كۆپ ئۇچۇر ئۈچۈن `make help` نى ئىجرا قىلىڭ.

### Thunderbird غا ئورنىتىش {#install-in-thunderbird-dev}

1. Thunderbird نى ئېچىڭ.
2. **Tools > Add-ons and Themes** غا بېرىڭ.
3. **Add-ons Manager** دا، ئوڭ ئۈستى بۇلۇڭدىكى چىرخىچ سىنبەلگىسىنى چېكىڭ.
4. تىزىملىكتە **Install Add-on From File…** نى تاللاڭ.
5. ھاسىل بولغان `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ھۆججىتىنى تاللاڭ.
6. ئۇقتۇرۇش چىققاندا ئورنىتىشنى جەزملەڭ.

دىققەت: ئەگەر Thunderbird سىستېمىڭىزدا `.zip` نى قوبۇل قىلمايدىغان بولسا، ئۇنىڭ نامىنى `.xpi` غا ئۆزگەرتىپ، “Install Add‑on From File…” نى قايتا سىناڭ.

### LOCAL ZIP نى قەيەردىن تاپىدۇ {#where-local-zip}

- ئاۋۋال، قىستۇرمىنى يىغىڭ: خەزىنىنىڭ تامىرىدا `make pack` نى ئىجرا قىلىڭ.
- يىغقاندىن كېيىن، خەزىنىنىڭ تامىرىدا “LOCAL” zip نى تاپالايسىز (مەسىلەن، `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- سىناق ئۈچۈن قايتا يىغمىدىن بۇرۇن، `sources/manifest_ATN.json` ۋە `sources/manifest_LOCAL.json` دا نەشر نومۇرلىرىنى ئۆستۈرۈڭ.

---

## چەكلەش، ئۆچۈرۈش ۋە يېڭىلانمىلار {#disable-uninstall-updates}

- چەكلەش: Thunderbird → Tools → Add‑ons and Themes → قىستۇرمىنى تاپىڭ → ئۆچۈرۈپ قويۇڭ.
- ئۆچۈرۈش: ئوخشاش كۆرۈنۈش → ئۈچ نۇقتىلىق تىزىملىك → چىقىرىۋەت.
- يېڭىلانمىلار: ATN ئارقىلىق ئورنىتىلغانلىرى يېڭى نەشر تەستىقلانغاندا ئاپتوماتىك يېڭىلىنىدۇ. LOCAL/dev ئورنىتىشلىرى ئاپتوماتىك يېڭىلانمايدۇ؛ يېڭى LOCAL يىغمىسىنى قولدا قايتا ئورنىتىڭ.
- تەڭشەكلەرنى پۈتۈنلەي ئۆچۈرۈش: [مەخپىيەتلىك → سانلىق مەلۇماتنى ئۆچۈرۈش](privacy#data-removal) نى كۆرۈڭ.

قوشۇمچە قاراڭ

- [تېز باشلاش](quickstart)
