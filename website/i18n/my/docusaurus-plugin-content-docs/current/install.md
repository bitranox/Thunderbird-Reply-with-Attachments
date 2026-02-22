---
id: install
title: 'တပ်ဆင်ခြင်း'
slug: /install
sidebar_label: 'တပ်ဆင်ခြင်း'
---

---

## “Thunderbird Add-ons and Themes” ဖြင့် ထည့်သွင်းခြင်း {#installation-in-thunderbird-recommended}

:::important အနည်းဆုံး Thunderbird ဗားရှင်း
ဤ add‑on သည် Thunderbird **128 ESR သို့မဟုတ် နောက်ဆုံးဗားရှင်းများ** ကိုပံ့ပိုးပေးသည်။ အဟောင်းဗားရှင်းများကို မပံ့ပိုးပါ။
:::

ဤနည်းလမ်းကို အကြံပြုထားပါသည်။ ATN (addons.thunderbird.net) မှ ထည့်သွင်းထားသော add‑ons များသည် အလိုအလျှောက် အပ်ဒိတ်များကို လက်ခံသည်။ LOCAL/dev ဖြင့် ထည့်သွင်းထားသောவைများသည် အလိုအလျှောက် အပ်ဒိတ် မဖြစ်ပါ။

- အနည်းဆုံး Thunderbird ဗားရှင်း: 128 ESR သို့မဟုတ် ထို့နောက်ပိုင်း။

1. Thunderbird အတွင်းတွင် **Tools > Add-ons and Themes** သို့ သွားပါ။
2. "reply with attachments" ကို ရှာပါ။
3. add‑on ကို ထည့်သွင်းပါ။

သို့မဟုတ် add‑on စာမျက်နှာကို တိုက်ရိုက် ဖွင့်ပါ- [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI မှ လက်ဖြင့် ထည့်သွင်းခြင်း {#local-installation-in-thunderbird}

### XPI ဖိုင်ကို ဒေါင်းလုဒ်လုပ်ပါ {#download-the-xpi-file}

1. [Thunderbird Add‑on စာမျက်နှာ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) သို့ သွားပါ။
2. add‑on ၏ နောက်ဆုံးဗားရှင်းကို XPI ဖိုင်အဖြစ် (`reply_with_attachments-x.y.z-tb.xpi`) ကို ဒေါင်းလုဒ်လုပ်ပါ။

### Thunderbird တွင် ထည့်သွင်းရန် {#install-in-thunderbird-local}

1. Thunderbird ကို ဖွင့်ပါ။
2. **Tools > Add-ons and Themes** သို့ သွားပါ။
3. **Add-ons Manager** တွင် ညာဘက်အပေါ်ထောင့်ရှိ ဂီယာ အိုင်ကွန်ကို နှိပ်ပါ။
4. မီနူးမှ **Install Add-on From File…** ကို ရွေးချယ်ပါ။
5. ဒေါင်းလုဒ်လုပ်ထားသော `reply_with_attachments-x.y.z-tb.xpi` ဖိုင်ကို ရွေးပါ။
6. မေးမြန်းသောအခါ ထည့်သွင်းခြင်းကို အတည်ပြုပါ။

---

## ဖွံ့ဖြိုးရေးအတွက် ထည့်သွင်းခြင်း {#installation-for-development}

### repository ကို ဒေါင်းလုဒ်လုပ်ပါ {#download-the-repository}

1. GitHub repository ၏ နောက်ဆုံးဗားရှင်းကို ဒေါင်းလုဒ်လုပ်ပါ။
2. အချက်အလက် ပိုမို သိရှိရန် `make help` ကို လုပ်ဆောင်ပါ။

### Thunderbird တွင် ထည့်သွင်းရန် {#install-in-thunderbird-dev}

1. Thunderbird ကို ဖွင့်ပါ။
2. **Tools > Add-ons and Themes** သို့ သွားပါ။
3. **Add-ons Manager** တွင် ညာဘက်အပေါ်ထောင့်ရှိ ဂီယာ အိုင်ကွန်ကို နှိပ်ပါ။
4. မီနူးမှ **Install Add-on From File…** ကို ရွေးချယ်ပါ။
5. ဖန်တီးထားသော `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ဖိုင်ကို ရွေးပါ။
6. မေးမြန်းသောအခါ ထည့်သွင်းခြင်းကို အတည်ပြုပါ။

မှတ်ချက်: သင်၏စနစ်တွင် Thunderbird မှ `.zip` ကို မလက်ခံပါက၊ ၎င်းကို `.xpi` ဟု အမည်ပြောင်းပြီး “Install Add‑on From File…” ကို ထပ်မံ စမ်းကြည့်ပါ။

### LOCAL ZIP ကို ဘယ်မှာ ရှာနိုင်မလဲ {#where-local-zip}

- ပထမဦးစွာ add‑on ကို ပက်ကေ့ချ်လုပ်ရန်: repository root တွင် `make pack` ကို လုပ်ဆောင်ပါ။
- ပက်ကေ့ချ်လုပ်ပြီးနောက်၊ repository root တွင် “LOCAL” zip ကို ရှာပါ (ဥပမာ `2025-..-reply-with-attachments-plugin-LOCAL.zip`)။
- စမ်းသပ်ရန် ပြန်လည် ပက်ကေ့ချ်လုပ်မည်မီ၊ `sources/manifest_ATN.json` နှင့် `sources/manifest_LOCAL.json` နှစ်ခုစလုံးတွင် ဗားရှင်းနံပါတ်များကို မြှင့်ပါ။

---

## ပိတ်ထားခြင်း၊ ဖယ်ရှားခြင်းနှင့် အပ်ဒိတ်များ {#disable-uninstall-updates}

- ပိတ်ထား: Thunderbird → Tools → Add‑ons and Themes → add‑on ကို ရှာပါ → toggle ကို ပိတ်ပါ။
- ဖယ်ရှား: အလားတူမျက်နှာပြင် → သုံးချက် မီနူး → Remove။
- အပ်ဒိတ်များ: ATN မှ ထည့်သွင်းထားသောအရာများသည် ဗားရှင်းအသစ်များ အတည်ပြုပြီးပါက အလိုအလျှောက် အပ်ဒိတ်ဖြစ်သည်။ LOCAL/dev ဖြင့် ထည့်သွင်းထားသောအရာများ မအလိုအလျှောက် အပ်ဒိတ်ပါ၊ LOCAL build အသစ်ကို ကိုယ်တိုင် ပြန်လည် ထည့်သွင်းပါ။
- ဆက်တင်များကို လုံးဝ ဖယ်ရှားရန်: [Privacy → Data removal](privacy#data-removal) ကို ကြည့်ပါ။

ဆက်လက်ဖတ်ရှုရန်

- [အမြန်စတင်](quickstart)
