---
id: install
title: 'Տեղադրում'
slug: /install
sidebar_label: 'Տեղադրում'
---

---

## Տեղադրում՝ "Thunderbird Add-ons and Themes"-ի միջոցով {#installation-in-thunderbird-recommended}

:::important Thunderbird-ի նվազագույն տարբերակը
Այս հավելումն աջակցում է Thunderbird-ի **128 ESR կամ ավելի նոր** տարբերակներին։ Ավելի հին տարբերակները eivät աջակցվում:
:::

Սա առաջարկվող տեղադրման եղանակն է։ ATN-ից (addons.thunderbird.net) տեղադրված հավելումները ստանում են ավտոմատ թարմացումներ։ LOCAL/dev տեղադրումները ավտոմատ չեն թարմացվում։

- Thunderbird-ի նվազագույն տարբերակ՝ 128 ESR կամ ավելի նոր։

1. Thunderbird-ում անցեք **Tools > Add-ons and Themes**։
2. Փնտրեք «reply with attachments»։
3. Ավելացրեք հավելումը։

Կամ անմիջապես բացեք հավելման էջը՝ [Thunderbird հավելումներ (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ձեռքով տեղադրում XPI-ից {#local-installation-in-thunderbird}

### Ներբեռնեք XPI ֆայլը {#download-the-xpi-file}

1. Անցեք [Thunderbird հավելման էջ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)։
2. Ներբեռնեք հավելման վերջին տարբերակը որպես XPI ֆայլ (`reply_with_attachments-x.y.z-tb.xpi`)։

### Տեղադրում Thunderbird-ում {#install-in-thunderbird-local}

1. Բացեք Thunderbird-ը։
2. Անցեք **Tools > Add-ons and Themes**։
3. **Add-ons Manager**-ում սեղմեք վերին աջ անկյունում գտնվող ատամնանիվի պատկերակը։
4. Մենյուից ընտրեք **Install Add-on From File…**։
5. Ընտրեք ներբեռնված `reply_with_attachments-x.y.z-tb.xpi` ֆայլը։
6. Հուշման դեպքում հաստատեք տեղադրումը։

---

## Տեղադրում մշակման համար {#installation-for-development}

### Ներբեռնեք պահոցը {#download-the-repository}

1. Ներբեռնեք GitHub պահոցի վերջին տարբերակը։
2. Լրացուցիչ տեղեկության համար գործարկեք `make help`։

### Տեղադրում Thunderbird-ում {#install-in-thunderbird-dev}

1. Բացեք Thunderbird-ը։
2. Անցեք **Tools > Add-ons and Themes**։
3. **Add-ons Manager**-ում սեղմեք վերին աջ անկյունում գտնվող ատամնանիվի պատկերակը։
4. Մենյուից ընտրեք **Install Add-on From File…**։
5. Ընտրեք ստեղծված `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ֆայլը։
6. Հուշման դեպքում հաստատեք տեղադրումը։

Նշում. Եթե ձեր համակարգում Thunderbird-ը չի ընդունում `.zip`-ը, փոխանվանեք այն `.xpi`-ի և կրկին փորձեք “Install Add‑on From File…”։

### Որտեղ գտնել LOCAL ZIP-ը {#where-local-zip}

- Նախ, փաթեթավորեք հավելումը. պահոցի արմատում գործարկեք `make pack`։
- Փաթեթավորումից հետո պահոցի արմատում գտեք “LOCAL” zip-ը (օր., `2025-..-reply-with-attachments-plugin-LOCAL.zip`)։
- Փորձարկման համար վերափաթեթավորելուց առաջ թարմացրեք տարբերակները և՛ `sources/manifest_ATN.json`-ում, և՛ `sources/manifest_LOCAL.json`-ում։

---

## Անջատում, ապատեղադրում և թարմացումներ {#disable-uninstall-updates}

- Անջատում՝ Thunderbird → Tools → Add‑ons and Themes → գտեք հավելումը → անջատեք անջատիչը։
- Ապատեղադրում՝ նույն տեսք → երեք կետանի ընտրացանկ → Remove։
- Թարմացումներ՝ ATN-ից տեղադրումներն ավտոմատ թարմացվում են, երբ նոր տարբերակները հաստատվում են։ LOCAL/dev տեղադրումները ավտոմատ չեն թարմացվում. նոր LOCAL կառուցվածքը վերատեղադրեք ձեռքով։
- Կարգավորումները ամբողջությամբ հեռացնելը՝ տես [Գաղտնիություն → Տվյալների հեռացում](privacy#data-removal)։

Տես նաև

- [Արագ մեկնարկ](quickstart)
