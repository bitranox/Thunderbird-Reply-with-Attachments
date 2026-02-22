---
id: install
title: 'ኢንስታላሽን'
slug: /install
sidebar_label: 'ምትካን'
---

---

## መትከል ብ "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important ንእሽተይ ስሪት ናይ Thunderbird
እዚ add‑on Thunderbird **128 ESR ወይ ዝሓደሽ** ይደግፍ። ዝቐድሙ ስሪታት ኣይተደግፉን።
:::

እዚ ዝመከረ መንገዲ መትከል እዩ። ካብ ATN (addons.thunderbird.net) ዝተተኸሉ add‑ons ሓራስ ሓደሽታት ይቕበሉ። LOCAL/dev መትከላት ሓራስ ኣይተሻሽሉን።

- ንእሽተይ ስሪት ናይ Thunderbird: 128 ESR ወይ ዝሓደሽ።

1. ኣብ Thunderbird, ናብ **Tools > Add-ons and Themes** ኪድ።
2. "reply with attachments" ድለፍ።
3. add‑on ውሰኽ።

ወይ ቀጥታ ገጽ ናይ add‑on ክፈት: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## ብእጅ መትከል ካብ XPI {#local-installation-in-thunderbird}

### ፋይል XPI ውርድ {#download-the-xpi-file}

1. ናብ [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ኪድ።
2. ሓደሽቲ ስሪት ናይ add‑on ከም ፋይል XPI (`reply_with_attachments-x.y.z-tb.xpi`) ውርድ።

### ኣብ Thunderbird ክትከል {#install-in-thunderbird-local}

1. Thunderbird ክፈት።
2. ናብ **Tools > Add-ons and Themes** ኪድ።
3. ኣብ **Add-ons Manager**, ካብ ላዕሊ ቀንዲ ዘሎ ምልክት ጋር ጠውቕ።
4. ካብ ማኑ **Install Add-on From File…** ምረጽ።
5. ዝተወረደ `reply_with_attachments-x.y.z-tb.xpi` ፋይል ምረጽ።
6. ምትከል እንተ ተጠይቐ ኣረጋግጽ።

---

## ንልማት መትከል {#installation-for-development}

### ሪፖዚቶሪ ውርድ {#download-the-repository}

1. ሓደሽቲ ስሪት ናይ GitHub ሪፖዚቶሪ ውርድ።
2. ንዝያዳ ሓበሬታ `make help` ኣስራሕ።

### ኣብ Thunderbird ክትከል {#install-in-thunderbird-dev}

1. Thunderbird ክፈት።
2. ናብ **Tools > Add-ons and Themes** ኪድ።
3. ኣብ **Add-ons Manager**, ካብ ላዕሊ ቀንዲ ዘሎ ምልክት ጋር ጠውቕ።
4. ካብ ማኑ **Install Add-on From File…** ምረጽ።
5. ዝተመርቐ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ፋይል ምረጽ።
6. ምትከል እንተ ተጠይቐ ኣረጋግጽ።

መምለኢ: እንተ Thunderbird `.zip` ኣብ ስርዓትካ ኣይቕበለን እንተ ኾይኑ፣ ስሙ ናብ `.xpi` ቀይርካ እና እንደገና “Install Add‑on From File…” ፈትሽ።

### እቲ LOCAL ZIP ኣበይ ክትረኽቦ ትኽእል {#where-local-zip}

- ብጀሚሩ, add‑on ኣትሕድር: `make pack` ኣብ ሪፖዚቶሪ root ኣስራሕ።
- ንድሕሪ ምትሕድራ, “LOCAL” zip ኣብ ሪፖዚቶሪ root ርኣይ ትኽእል (ምሳሌ፡ `2025-..-reply-with-attachments-plugin-LOCAL.zip`)።
- ቅድሚ ምትሕድራ ንፈተና፣ ስሪታት ኣብ `sources/manifest_ATN.json` እና `sources/manifest_LOCAL.json` ኣሳሕት።

---

## ኣብል, ኣውግድ እና ሓደሽታት {#disable-uninstall-updates}

- ኣብል: Thunderbird → Tools → Add‑ons and Themes → add‑on ድለፍ → ኣጥፍእ (toggle off)።
- ኣውግድ: እቲ ዝሓለፈ ርእይቶ → ሶስተ‑ነጥቢ ማኑ → ኣስወግድ።
- ሓደሽታት: ካብ ATN ዝተተኸሉ መትከላት እቲ ሓድሽ ስሪት እትፍቀዱ ግዜ ሓራስ ይተሻሽሉ። LOCAL/dev መትከላት ሓራስ ኣይተሻሽሉን፤ ሓድሽ LOCAL build ብእጅ ዳግማይ ኣትከል።
- ቅንብሮታት ሙሉእ ኣስወግዱ: [Privacy → Data removal](privacy#data-removal) ርኣ።

እዚኦም ርኣዩ

- [ብቐሊል ምጀመር](quickstart)
