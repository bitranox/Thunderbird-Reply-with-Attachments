---
id: quickstart
title: 'ጀማር ፈጣን'
sidebar_label: 'ምጀመር ብቅልጡፍ'
---

---

## ብቕልፅ መጀመርታ

:::important እትም ዝተነሰ ዝፈለጠ Thunderbird
እዚ add‑on ናይ Thunderbird **128 ESR ወይ ካብዚ ሓድሽ** ይደግፍ። እትማት ዝቀየሩ ኣይተደገፉን።
:::

:::note ቴለሜትሪ የለን; መራኸቢ መርበብ የለን
እዚ add‑on ትንተና/ቴለሜትሪ ኣይሰብስብን እዩ እና መራኸቢ መርበብ ሕቶታት ኣይሰግድን። መርበብ መድረስ ጥራይ እቲ ውጻኢ ሊንክ (Docs, GitHub, Donate) ተጠዊቑ ጊዜ ይከኣል።
:::

---

### መትከል

1. መደመርን ካብ Thunderbird Add‑ons ኢንስታል ግበር።
2. ኣማራጺ: ርግጋእ ኣንቃ (Options → “Ask before adding attachments”).
3. ኣማራጺ: ማስጠንቀቂ ናይ blacklist እንዳተነቃ ተዉ (default): “Warn if attachments are excluded by blacklist”.
4. ኣማራጺ: ፓተርናት ናይ blacklist ወስኹ (ሓደ ንመስመር ሓደ), ለምሳሌ:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

ማስታወሻ: እቲ “# …” ላዕሊ ኮመንት እዩ ኣብዚ ሰነድ; ኣብ Options ዝትጣቅሙ ፓተርናት ኮመንት ኣይትኣካትቱን። ሓደ ፓተርን ኣብ መስመር ሓደ ጥራይ ኣእትዉ።

ሕጂ ንመልእኽቲ ኣታችመንት ዘለዎ ምላሽ ሃቡ — እቶም ናይ መጀመርታ ፋይላት ብስርዓት ብራእይ ይተወስኹ ወይ ካብ ብቕልፅ ርግጋእ ድሕሪ ይተወስኹ። እንተ ፋይላት ብblacklist ተስኪሙ፣ እቲ ስማትኣቶም ዝሓበረ ንእሽተይ ማስጠንቀቂ ትረክቡ።

---

### ርግጋእ {#verify}

- ንመልእኽቲ 1–2 ኣታችመንት ዘለዎ ምላሽ ሃቡ እና እቶም ናይ መጀመርታ ፋይላት ኣብ መስኮት ምፅሓፍኩም እንዳተኣከሉ ተረጋግጹ።
- ንምቕናጽ ምኽንያታዊ ስነምግባር ኣብ [Configuration](configuration) ርእዩ (መቀያየር ርግጋእ, ነባሪ መልሲ, ፓተርናት blacklist).

---

### ማስጠንቀቂ ናይ blacklist ምርግጋእ {#verify-blacklist-warning}

- ንመልእኽቲ ከም “secret.txt” ዝመስል ፋይል ዘለዎ ምላሽ ሃቡ።
- “Warn if attachments are excluded by blacklist” እንተ ኣነቃ, ዕሽቶ ዳያሎግ እቶም ተስኪሙ ፋይላትን ተመሳሳሊ ፓተርንን ይግለጽ።

እንተ ማስጠንቀቂ ኣይተረኽብኩምን እንተ ረኺቡ, ፓተርኑ ብትክክል ከም ስም ፋይል እንዳይዛመድ ኣረጋግጹ (filename‑only, case‑insensitive). Configuration → Blacklist ርእዩ።

---

### ማስታወሻ ናይ ኪቦርድ {#keyboard-note}

- ዳያሎግ ርግጋእ ንYes Y/J እና ንNo N/Esc ይደግፍ። ኣብ እቶም ዘይ‑ላቲን ኪቦርዳት ፊደላት ቁልፊ ይተለያዩ ይኽእሉ; Enter እቲ ተመርካበ ኣዝሓር ይረግጽ።

---
