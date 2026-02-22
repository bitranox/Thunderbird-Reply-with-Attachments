---
id: install
title: 'ස්ථාපනය'
slug: /install
sidebar_label: 'ස්ථාපනය'
---

---

## "Thunderbird Add-ons and Themes" හරහා ස්ථාපනය {#installation-in-thunderbird-recommended}

:::important අවම Thunderbird සංස්කරණය
මෙම add‑on එක Thunderbird **128 ESR හෝ ඊට மேலෙහි** සඳහා සහය දක්වයි. පැරණි සංස්කරණ සඳහා සහය නොදක්වයි.
:::

මෙය නිර්දේශිත ස්ථාපන ක්‍රමයයි. ATN (addons.thunderbird.net) හරහා ස්ථාපිත add‑on ස්වයංක්‍රීයව යාවත්කාලීන වේ. LOCAL/dev ස්ථාපන ස්වයංක්‍රීයව යාවත්කාලීන නොවේ.

- අවම Thunderbird සංස්කරණය: 128 ESR හෝ ඊට වැඩි.

1. Thunderbird තුළ, **Tools > Add-ons and Themes** වෙත යන්න.
2. "reply with attachments" සෙවන්න.
3. add‑on එක එකතු කරන්න.

නැතහොත් add‑on පිටුවට සෘජුවම ತೆರන්න: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI මඟින් අතින් ස්ථාපනය {#local-installation-in-thunderbird}

### XPI ගොනුව බාගත කරන්න {#download-the-xpi-file}

1. [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) වෙත යන්න.
2. add‑on හි නවතම සංස්කරණය XPI ගොනුවක් ලෙස (`reply_with_attachments-x.y.z-tb.xpi`) බාගත කරන්න.

### Thunderbird තුළ ස්ථාපනය කරන්න {#install-in-thunderbird-local}

1. Thunderbird විවෘත කරන්න.
2. **Tools > Add-ons and Themes** වෙත යන්න.
3. **Add-ons Manager** තුළ, ඉහළ දකුණු මුළාවේ ඇති ගියර් ආයිකනය ක්ලික් කරන්න.
4. මෙනුවෙන් **Install Add-on From File…** තෝරන්න.
5. බාගත කළ `reply_with_attachments-x.y.z-tb.xpi` ගොනුව තෝරන්න.
6. ඇනවුම් කළ විට ස්ථාපනය තහවුරු කරන්න.

---

## සංවර්ධනය සඳහා ස්ථාපනය {#installation-for-development}

### රිපොසිටරි බාගත කරන්න {#download-the-repository}

1. GitHub රිපොසිටරියේ නවතම සංස්කරණය බාගත කරන්න.
2. වැඩි විස්තර සඳහා `make help` ධාවනය කරන්න.

### Thunderbird තුළ ස්ථාපනය කරන්න {#install-in-thunderbird-dev}

1. Thunderbird විවෘත කරන්න.
2. **Tools > Add-ons and Themes** වෙත යන්න.
3. **Add-ons Manager** තුළ, ඉහළ දකුණු මුළාවේ ඇති ගියර් ආයිකනය ක්ලික් කරන්න.
4. මෙනුවෙන් **Install Add-on From File…** තෝරන්න.
5. උත්පාදිත ගොනුව `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` තෝරන්න.
6. ඇනවුම් කළ විට ස්ථාපනය තහවුරු කරන්න.

සටහන: ඔබගේ පද්ධතියේ Thunderbird විසින් `.zip` පිළිගන්නේ නැතිනම්, එය `.xpi` ලෙස නැවත නම්කර “Install Add‑on From File…” නැවත උත්සාහ කරන්න.

### LOCAL ZIP සොයාගන්නේ කොහෙද {#where-local-zip}

- පළමුව, add‑on එක පැකේජ කරන්න: රිපොසිටරියේ root හි `make pack` ධාවනය කරන්න.
- පැකේජ කිරීමෙන් පසු, රිපොසිටරියේ root හි “LOCAL” zip එක සොයන්න (උදා., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- පරීක්ෂණ සඳහා නැවත පැකේජ කිරීමට පෙර, `sources/manifest_ATN.json` සහ `sources/manifest_LOCAL.json` යන දෙකෙහිම සංස්කරණ අංක වැඩි කරන්න.

---

## අක්‍රීය කිරීම, අස්ථාපනය, සහ යාවත්කාලීන {#disable-uninstall-updates}

- අක්‍රීය කිරීම: Thunderbird → Tools → Add‑ons and Themes → add‑on එක සොයන්න → toggle off.
- අස්ථාපනය: ඒම දසුන → ත්‍රි-බින්දු මෙනුව → Remove.
- යාවත්කාලීන: ATN ස්ථාපනවල නව සංස්කරණ අනුමත වූ විට ස්වයංක්‍රීය යාවත්කාලීන වේ. LOCAL/dev ස්ථාපන ස්වයංක්‍රීයව යාවත්කාලීන නොවේ; අතින් නව LOCAL build එක නැවත ස්ථාපනය කරන්න.
- සැකසුම් සම්පූර්ණයෙන් ඉවත් කිරීම: [පෞද්ගලිකත්වය → දත්ත ඉවත් කිරීම](privacy#data-removal).

තවද බලන්න

- [ක්ෂණික ආරම්භය](quickstart)
