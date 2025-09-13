---
id: install
title: 'መግዛት'
slug: /install
sidebar_label: 'መግዛት'
---

## መግዛት በ "Thunderbird ኣድዞን እና ገጽታ" {#installation-in-thunderbird-recommended}

:::important ኣዋጅ ዝኾነ መነሻ ኣበባ
እቲ ኣድዞን ኪሳርፍ መዋቅር በምስ **128 ESR ወንበር** ወይ ኮይኑ እንተ ኣይምህርዋን። ኮይን ይሓዊ አመለክቲ ኣይርከብን።
:::

እዚ ኣረፈት መግዛት ዓይነት ኢዩ። ኣድዞን በATN (addons.thunderbird.net) ዝግዕዝብ ተንሳምዕኑ ክንቀብሉ ይዕቢር ኣየው። LOCAL/dev መግዛት ኣወዐውዕ ኣይተወዉን።

- ኣዋጅ ዝኾነ መነሻ ኣበባ: 128 ESR ወንበር ወንበር ኮይኑ።

1. በThunderbird ይእበይ ወይን **Tools > ኣድዞን እና ገጽታ** ይህዩ።
2. "ምስዓጥ ኣምርግን" ይርዕወ።
3. ኣድዞን ይውርውር።

ወይ ኣድዞን ገጽ ቀዳም ንቅዐ እግዓይ፡ [Thunderbird ኣድዞን (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## መምርጥ ኣድዞን ኣብ XPI {#local-installation-in-thunderbird}

### XPI ፋይል ይእምነዋ {#download-the-xpi-file}

1. ኣይምዐ ንቅዐ [Thunderbird ኣድዞን ገጽ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ክጽርፊ።
2. ኣድዞን ዘኸውን ወንበር ነየ ኣምርጓ እንተ ፋይል ኣይክደለ እንምህረይ (`reply_with_attachments-x.y.z-tb.xpi`).

### በThunderbird ይእምነዋ {#install-in-thunderbird-local}

1. በThunderbird ይእበይ።
2. ወይን **Tools > ኣድዞን እና ገጽታ** ይህዩ።
3. በ **ኣድዞን ኣስተዳዳሪ** ውሲፈ፣ አቀ ውቤታት ኣለክ-ሲሉን ሒዝባይ ፈንቲ ወይን።
4. **በፋይል ውሸም ኣድዞን ይሽተይ** ሒዚባ ወዉ።
5. ኣውን `reply_with_attachments-x.y.z-tb.xpi` ፋይል ይምስጻ።
6. ምድሬን ይቅርብ መምልኣን።

---

## በምስርን ምርመር {#installation-for-development}

### የምርመር ዕለት ይመር {#download-the-repository}

1. ዕለት ነየ ምዕወቱ መፍረይ ውሳንም ሓመን ጉጉል ይይዝሁ ዝቅዋ፣ ደቕነቱን ወዛዩስ `make help` ኣንፈወዩ።

### በThunderbird ይእምነዋ {#install-in-thunderbird-dev}

1. በThunderbird ይእበይ።
2. ወይን **Tools > ኣድዞን እና ገጽታ** ይህዩ።
3. በ **ኣድዞን ኣስተዳዳሪ** ውሲፈ፣ አቀ ውቤታት ኣለክ-ሲሉን ሒዝባይ ፈንቲ ወይን።
4. **በፋይል ውሸም ኣድዞን ይሽተይ** ሒዚባ ወዉ።
5. ኣውን `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ፋይል ይምስጻ።
6. ምድሬን ይቅርብ መምልኣን።

ዕረይ: እዚ መሙርኖ ንቅዐ `.zip` ዕንቁው ይገን/ወዚ ክይን ይስተርክ `.xpi` ኪሸከይ ሒይሙን “እንተ቗ሊ ኣድዞን ጓኣጊወ” ይቕርብ።

### የት መንቀሃብ ዋበ በLOCAL ZIP {#where-local-zip}

- በመጀመሪዕ እቲ ኣድዞን ክብረ ገጽፋ ንቅዐ: `make pack` በዓወ ውለይጓ ተጨጓም።
- ኣእቀነ ወይን "LOCAL" ZIP ዝነው ገፀው ገዝም ሲጬይ የሳመነ ዕለቱ ዕዪንዚ( ይየ `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- በበእኮይ ይተዊዥኒ ወባሕቲ ዊንሱ ማይወብን ክደረይ ከብርን በ `sources/manifest_ATN.json` ወ `sources/manifest_LOCAL.json` ከጽርዕርን ወምርዕ።

---

## ኣይወዝን፣ ኣብዚ፣ እና ንዳዋት {#disable-uninstall-updates}

- ኣይወዝን: በThunderbird → መርኘዋ → ኣድዞን እና ገጽታ → እዚ ዕረይ ኣድዞን → የዛይ ውዳይ እቕዡል።
- ኣብዚ: እዚ ዕረይ → ኣርቱቅ→ ኣምርግ ይምረ ኣስፋታመዕ።
- ንዳዋት: ኣድዞኖቹ ገመወርን ኑ የቀደመሉ፤ LOCAL/dev ኣድዞኖቹ መንገዲ ክውህኖ ወይን ወምርዕ ዘንይኦ እክርጽ እንትኩ።
- ኣይኖክ ዲ ኣጋይ ድግግ

እንደዚሁ እዚ

- [ካእማ ዓመዳት](quickstart)
