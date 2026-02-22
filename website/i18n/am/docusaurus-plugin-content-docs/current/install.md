---
id: install
title: 'መጫን'
slug: /install
sidebar_label: 'መጫን'
---

---

## በ "Thunderbird Add-ons and Themes" በኩል ጭነት {#installation-in-thunderbird-recommended}

:::important ዝቅተኛው የThunderbird ስሪት
ይህ አድ‑ኦን Thunderbird **128 ESR ወይም ከዚያ በላይን** ይደግፋል። የቆዩ ስሪቶች አይደገፉም።
:::

ይህ የሚመከረው የጭነት መንገድ ነው። ከATN (addons.thunderbird.net) የተጫኑ አድ‑ኦኖች ራስ‑ሰር እድሳት ይቀበላሉ። LOCAL/dev ጭነቶች ራስ‑ሰር አይዘመኑም።

- ዝቅተኛው የThunderbird ስሪት: 128 ESR ወይም ከዚያ በላይ።

1. በThunderbird ውስጥ, ወደ **Tools > Add-ons and Themes** ይሂዱ።
2. "reply with attachments" ይፈልጉ።
3. አድ‑ኦኑን ያክሉ።

ወይም የአድ‑ኦኑን ገጽ በቀጥታ ይክፈቱ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## ከXPI በእጅ ጭነት {#local-installation-in-thunderbird}

### የXPI ፋይሉን ያውርዱ {#download-the-xpi-file}

1. ወደ [የThunderbird አድ‑ኦን ገጽ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ይሂዱ።
2. የአድ‑ኦኑን አዲሱን ስሪት እንደ XPI ፋይል (`reply_with_attachments-x.y.z-tb.xpi`) ያውርዱ።

### በThunderbird ውስጥ ይጫኑ {#install-in-thunderbird-local}

1. Thunderbirdን ይክፈቱ።
2. ወደ **Tools > Add-ons and Themes** ይሂዱ።
3. በ **Add-ons Manager** ውስጥ, ከላይ‑ቀኝ ጥግ ላይ ያለውን የማሰናጃ (gear) አዶ ይጫኑ።
4. ከሜኑ ውስጥ **Install Add-on From File…** ይምረጡ።
5. የተወረደውን `reply_with_attachments-x.y.z-tb.xpi` ፋይል ይምረጡ።
6. ሲጠየቁ ጭነቱን ያረጋግጡ።

---

## ለልማት ጭነት {#installation-for-development}

### ሬፖዚቶሪውን ያውርዱ {#download-the-repository}

1. የGitHub ሬፖዚቶሪውን አዲሱን ስሪት ያውርዱ።
2. ለተጨማሪ መረጃ `make help` ያስኪዱ።

### በThunderbird ውስጥ ይጫኑ {#install-in-thunderbird-dev}

1. Thunderbirdን ይክፈቱ።
2. ወደ **Tools > Add-ons and Themes** ይሂዱ።
3. በ **Add-ons Manager** ውስጥ, ከላይ‑ቀኝ ጥግ ላይ ያለውን የማሰናጃ (gear) አዶ ይጫኑ።
4. ከሜኑ ውስጥ **Install Add-on From File…** ይምረጡ።
5. የተፈጠረውን ፋይል `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ይምረጡ።
6. ሲጠየቁ ጭነቱን ያረጋግጡ።

ማስታወሻ፡ በስርዓትዎ ላይ Thunderbird `.zip` ካልተቀበለ, ወደ `.xpi` ይፈትሹት እና “Install Add‑on From File…” እንደገና ይሞክሩ።

### LOCAL ዚፕን የት ማግኘት ይቻላል {#where-local-zip}

- መጀመሪያ፣ አድ‑ኦኑን ይፓኬጁ፤ በሬፖዚቶሪው ሥር (root) ውስጥ `make pack` አስኪዱ።
- ፓኬጅ ካደረጉ በኋላ፣ በሬፖዚቶሪው ሥር (root) ውስጥ “LOCAL” ዚፕን ያግኙ (ለምሳሌ፣ `2025-..-reply-with-attachments-plugin-LOCAL.zip`)።
- ለሙከራ እንደገና ፓኬጅ ማድረግ ከጀመሩ በፊት፣ በ `sources/manifest_ATN.json` እና `sources/manifest_LOCAL.json` ሁለቱም ውስጥ የስሪት ቁጥሮችን ያሳድጉ።

---

## ማሰናከል፣ ማስወገድ እና እድሳት {#disable-uninstall-updates}

- ማሰናከል: Thunderbird → Tools → Add‑ons and Themes → አድ‑ኦኑን ፈልጉ → toggle off.
- ማስወገድ: በአንደዚያው እይታ → የሶስት‑ነጥብ ሜኑ → Remove.
- እድሳት: አዲስ ስሪቶች ሲፀድቁ ATN ጭነቶች ራስ‑ሰር ይዘመናሉ። LOCAL/dev ጭነቶች ራስ‑ሰር አይዘመኑም፤ አዲስ LOCAL build በእጅ እንደገና ይጫኑ።
- ቅንብሮችን ሙሉምለሉ ለማስወገድ: [ግላዊነት → የውሂብ ማስወገድ](privacy#data-removal) ይመልከቱ።

እንዲሁም ይመልከቱ

- [ፈጣን ጀምር](quickstart)
