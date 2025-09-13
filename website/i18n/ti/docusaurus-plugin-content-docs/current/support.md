---
id: support
title: 'ድጋፍ'
sidebar_label: 'ሓገዝ'
---

---

## ብዙሕ ጊዜ ዝተጠየቑ ሕቶታት (FAQ) {#faq}

### ኣተችመንት ኣይተወሰኹን — ስለምንታይ?

- ናይ መካነ ጽሑፍ ምስሊታትን ክፋላት S/MIME ብዓላማ ተለዩ እዮም።
- እንተ ኮምፖዝ (compose) ተመሳሳሊ ፋይል ዝሃልዎ እንተኾይኑ ስማታት ፋይል ዝተዳገሙ ይተዉ እዮም።
- ምስመራት ብላክሊስት ንመናብሮ ምርጫ ክትረግግፉ ይኽእሉ፣ [ምውታር](configuration#blacklist-glob-patterns) ተመልከት።

### ኣተችመንት ከመወስን ቅድሚ ምርግጋጽ ክግበር እኽእል ዶ?

እወ። ኣብ [ምውታር → ምርግጋጽ](configuration#confirmation) “ኣተችመንት ከመወስን ቅድሚ ሕቶ” ኣኽል። ሰሌዳ ፊደል: Y/J = እወ, N/Esc = ኣይኮነን።

### እዚ add‑on ሓበሬታ ምሕቡር ወይ ናይ ጥቐም ምክትታል ይግበር ዶ?

ኣይኮነን። [ፕራይቨሲ](privacy) ተመልከት — ቴለሜትሪ የለን እና ናይ ጀርባ መርበብ ሕተታታት የለዉን።

### Forward ኣተችመንት ኣይወስንን — እዚ ተስፋ ዝተሰብኣ እዩ ዶ?

እወ። እዚ add‑on እቲ Reply እና Reply all ብቻ ይሕይይዝ፤ Forward ክንዲ እንዳሎ ተወሲኑ እዩ። [ገደታት](usage#limitations) ተመልከት።

### እቲ Donate snooze ኣበይ ኣሎ?

Options → ክፍሊ ድገፍ። [ርእይነት ልገሳ](configuration#donation-visibility) ተመልከት።

---

## ድገፍ

ሓገዝ ትፈልጥ ዶ ወይ ጉድለት ምርካብ ትደሊ?

---

### ጉዳይ ኣብ GitHub ክፈት:

- መዝገብ ፕሮጀክት (Repository): `bitranox/Thunderbird-Reply-with-Attachments`
- ጉዳያት (Issues): https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- ስሪት Thunderbird (ምሳሌ፡ 128 ESR), ኦፕረቲንግ ስስተም (OS), እና ደረጃታት ምቕራብ ኣካትት
- ካብ ናይ Thunderbird Error Console ተኻኢሉ ሎግ ሓበረታት ሰንካ (Tools → Developer Tools → Error Console)

- ድሕረ ገጽ ኣድ‑ኦን (ATN): እንተደሊኻ ኣብ [ገጽ ኣድ‑ኦን](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ርእይቶ ትተው ትኽእል ኢኻ።

---

### መመኪያታት

- ብዘድልየ ስሪት Thunderbird (128 ESR ወይ ልክዕ) ክነብር እንዳትይ ርግጸን።
- ንሕቶታት ናይ ምትክክል ተወሳኺ ምርኢቶ ናይ ምውታርን ናይ ጥቅም ሰነዶች ርእዩ።
- ንልማት/ምርመራ መምርሒ ልማት ተመልከት።
- ዝተኣቱ ቅንብሮታት ብዝግባእ ኣይተሓግዙን እንተስልኩም፣ Thunderbird እንደገና ጀምሩ እና እንደገና ፈትኑ። (Thunderbird ኩነታት ኣብ ስክሽን ክረክብ ይኽእል፣ እንደገና ምምላስ ቅንብሮ ሓዱሽ ክተሓሉ ይረዳ።)
- ዝንነሰ ምቕራብ፡ ሓደ ወይ ክልተ ቀሊል ኣተችመንት ዘለዎ ናይ ፈተና መልእኽቲ ፈትኑ።
- እንተ ዝርከብ ውይይት ዝኣካተተ እዩ ወይ ኣይኮነን ንምፍራይ፣ ምርግጋጽ እንተ ኣክትት (ON) ከምኡ’ውን እንተ ዘይኣክትት (OFF) ምግባር ኣነጻጽር።

---

### ኣብ ሪፖርት እንታይ ክኣካትት ግበር

- ስሪት Thunderbird እና ኦኤስ (OS)
- ትክክለኛ ደረጃታት ምቕራብ (እንታይ ገበርካ፣ እንታይ ተስፋ ገበርካ፣ እንታይ ተፈጸመ)
- ምርግጋጽ ኣክትት ወይ? ናይ ዝሓለፈ መልሲ (default answer) እንታይ እዩ
- ምሳሌ ናይ ብላክሊስት ምስመራት (እንተ ዝርከብ)
- ኣብ ምቕራብ ዝተሰርሐ ሎግ ናይ Error Console (Tools → Developer Tools → Error Console)
- ናይ ድቡግ ሎግ ኣክትት (ኣጋውነት):
  - ኣብ ናይ Thunderbird Error Console ኣስኪ: `messenger.storage.local.set({ debug: true })`
  - ጉዳይ እንደገና ኣፍልጡን ተኻኢሉ `[RWA]` መስመራት ሎግ ኮፒ ግበሩ

---

### ቴምፕሌት ጉዳይ (ኮፒ/ፔስት) {#issue-template}

- ስሪት Thunderbird እና OS:
- ደረጃታት ምቕራብ:
- ምርግጋጽ ኣክትት? ዝሓለፈ መልሲ:
- ምሳሌ ናይ ብላክሊስት ምስመራት:
- ሎግ ናይ Error Console (Tools → Developer Tools → Error Console):
- ካልእ ዝተረፈ ርእይቶ:

---

### ልገሳ

እንተ እዚ ፕሮጀክት ክትድግፉ ትደሊኹም፣ ብዝንነሰ ውድብ ኣብ [Donate](donation) ገጽ ምርኣይ ተመርሑ። የቐንየልና!

---
