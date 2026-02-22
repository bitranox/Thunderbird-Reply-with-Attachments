---
id: install
title: 'Орнотуу'
slug: /install
sidebar_label: 'Орнотуу'
---

---

## "Thunderbird Add-ons and Themes" аркылуу орнотуу {#installation-in-thunderbird-recommended}

:::important Минималдуу Thunderbird версиясы
Бул кошумча Thunderbird'дин **128 ESR же андан жаңысын** колдойт. Эски версиялар колдоого алынбайт.
:::

Бул сунушталган орнотуу ыкмасы. ATN'ден (addons.thunderbird.net) орнотулган кошумчалар автоматтык жаңыртууларды алышат. LOCAL/dev орнотуулары авто‑жаңыртылбайт.

- Минималдуу Thunderbird версиясы: 128 ESR же андан жаңысы.

1. Thunderbird'де **Tools > Add-ons and Themes** бөлүмүнө өтүңүз.
2. "reply with attachments" издеңиз.
3. Кошумчаны орнотуңуз.

Же кошумчанын барагын түз ачсаңыз болот: [Thunderbird кошумчалары (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI файлынан кол менен орнотуу {#local-installation-in-thunderbird}

### XPI файлын жүктөп алуу {#download-the-xpi-file}

1. [Thunderbird кошумча барагына](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) барыңыз.
2. Кошумчанын акыркы версиясын XPI файлы катары жүктөп алыңыз (`reply_with_attachments-x.y.z-tb.xpi`).

### Thunderbird'ге орнотуу {#install-in-thunderbird-local}

1. Thunderbird'ди ачыңыз.
2. **Tools > Add-ons and Themes** бөлүмүнө өтүңүз.
3. **Add-ons Manager** ичинде, жогорку оң бурчундагы тишче сүрөтчөсүн басыңыз.
4. Менюдан **Install Add-on From File…** дегенди тандаңыз.
5. Жүктөлгөн `reply_with_attachments-x.y.z-tb.xpi` файлын тандаңыз.
6. Сурам чыкканда орнотууну ырастаңыз.

---

## Өнүктүрүү үчүн орнотуу {#installation-for-development}

### Репозиторийди жүктөп алуу {#download-the-repository}

1. GitHub репозиторийинин акыркы версиясын жүктөп алыңыз.
2. Көбүрөөк маалымат үчүн `make help` иштетиңиз.

### Thunderbird'ге орнотуу {#install-in-thunderbird-dev}

1. Thunderbird'ди ачыңыз.
2. **Tools > Add-ons and Themes** бөлүмүнө өтүңүз.
3. **Add-ons Manager** ичинде, жогорку оң бурчундагы тишче сүрөтчөсүн басыңыз.
4. Менюдан **Install Add-on From File…** дегенди тандаңыз.
5. Жаратылган `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` файлын тандаңыз.
6. Сурам чыкканда орнотууну ырастаңыз.

Эскертүү: Эгер сиздин системаңызда Thunderbird `.zip` файлын кабыл албаса, аны `.xpi` деп атын өзгөртүп, “Install Add‑on From File…” аракетин дагы бир жолу жасап көрүңүз.

### LOCAL ZIP кайдан табылат {#where-local-zip}

- Адегенде, кошумчаны таңгактаңыз: репозиторийдин тамырында `make pack` иштетиңиз.
- Таңгактагандан кийин, репозиторийдин тамырынан “LOCAL” zip файлын табыңыз (мисалы, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Тест үчүн кайра таңгактоодон мурун, версияларды `sources/manifest_ATN.json` жана `sources/manifest_LOCAL.json` экөөндө тең жогорулатыңыз.

---

## Өчүрүү, алып салуу жана жаңыртуулар {#disable-uninstall-updates}

- Өчүрүү: Thunderbird → Tools → Add‑ons and Themes → кошумчаны табыңыз → өчүрүңүз.
- Алып салуу: ошол эле көрүнүш → үч чекиттүү меню → Remove.
- Жаңыртуулар: ATN аркылуу орнотулгандар жаңы версиялар бекитилгенде авто‑жаңыртылат. LOCAL/dev орнотуулары авто‑жаңырбайт; жаңы LOCAL жыйнагын кол менен кайра орнотуңуз.
- Орнотууларды толугу менен алып салуу: [Купуялык → Маалыматты өчүрүү](privacy#data-removal) бөлүмүн караңыз.

Ошондой эле көрүңүз

- [Тез баштоо](quickstart)
