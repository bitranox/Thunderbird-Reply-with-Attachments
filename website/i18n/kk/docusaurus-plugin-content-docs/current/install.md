---
id: install
title: 'Орнату'
slug: /install
sidebar_label: 'Орнату'
---

---

## "Thunderbird Қондырмалары мен Тақырыптары" арқылы орнату {#installation-in-thunderbird-recommended}

:::important Ең төменгі Thunderbird нұсқасы
Бұл қондырма Thunderbird **128 ESR немесе жаңарақ** нұсқаларын қолдайды. Ескі нұсқалар қолдау көрсетілмейді.
:::

Бұл орнатудың ұсынылған тәсілі. ATN (addons.thunderbird.net) арқылы орнатылған қондырмалар автоматты түрде жаңартылады. LOCAL/dev орнатулары автожаңартылмайды.

- Ең төменгі Thunderbird нұсқасы: 128 ESR немесе жаңарақ.

1. Thunderbird ішінде **Құралдар > Қондырмалар мен тақырыптар** бөліміне өтіңіз.
2. "reply with attachments" деп іздеңіз.
3. Қондырманы орнатыңыз.

Немесе қондырма парағын тікелей ашыңыз: [Thunderbird қондырмалары (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI арқылы қолмен орнату {#local-installation-in-thunderbird}

### XPI файлын жүктеп алыңыз {#download-the-xpi-file}

1. [Thunderbird қондырма парағына](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) өтіңіз.
2. Қондырманың ең соңғы нұсқасын XPI файлы ретінде (`reply_with_attachments-x.y.z-tb.xpi`) жүктеп алыңыз.

### Thunderbird-ке орнату {#install-in-thunderbird-local}

1. Thunderbird-ті ашыңыз.
2. **Құралдар > Қондырмалар мен тақырыптар** бөліміне өтіңіз.
3. **Қондырмалар менеджерінде** оң жақ жоғарғы бұрыштағы беріліс таңбасын басыңыз.
4. Мәзірден **Install Add-on From File…** таңдаңыз.
5. Жүктелген `reply_with_attachments-x.y.z-tb.xpi` файлын таңдаңыз.
6. Сұралған кезде орнатуды растаңыз.

---

## Дамытуға арналған орнату {#installation-for-development}

### Репозиторийді жүктеп алу {#download-the-repository}

1. GitHub репозиторийінің ең соңғы нұсқасын жүктеп алыңыз.
2. Қосымша ақпарат үшін `make help` іске қосыңыз.

### Thunderbird-ке орнату {#install-in-thunderbird-dev}

1. Thunderbird-ті ашыңыз.
2. **Құралдар > Қондырмалар мен тақырыптар** бөліміне өтіңіз.
3. **Қондырмалар менеджерінде** оң жақ жоғарғы бұрыштағы беріліс таңбасын басыңыз.
4. Мәзірден **Install Add-on From File…** таңдаңыз.
5. Жасалған `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` файлын таңдаңыз.
6. Сұралған кезде орнатуды растаңыз.

Ескерту: Егер сіздің жүйеңізде Thunderbird `.zip` файлын қабылдамаса, оны `.xpi` деп қайта атаңыз да, “Install Add‑on From File…” пәрменін тағы бір рет қолданып көріңіз.

### LOCAL ZIP қайда орналасады {#where-local-zip}

- Алдымен қондырманы пакеттеңіз: репозиторий түпкі қалтасында `make pack` іске қосыңыз.
- Пакеттегеннен кейін репозиторий түбінен “LOCAL” zip файлын табыңыз (мысалы, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Тестілеу үшін қайта пакеттеместен бұрын, нұсқаларды `sources/manifest_ATN.json` және `sources/manifest_LOCAL.json` екеуінде де арттырыңыз.

---

## Сөндіру, Жою және Жаңартулар {#disable-uninstall-updates}

- Сөндіру: Thunderbird → Tools → Add‑ons and Themes → қондырманы табыңыз → ауыстырғышты өшіріңіз.
- Жою: сол көрініс → үш-нүкте мәзірі → Remove.
- Жаңартулар: ATN арқылы орнатылғандар жаңа нұсқалар мақұлданғанда автожаңартылады. LOCAL/dev орнатулары автожаңартылмайды; жаңа LOCAL жинағын қолмен қайта орнатыңыз.
- Баптауларды толық алып тастау: [Құпиялылық → Деректерді жою](privacy#data-removal) бөліміне қараңыз.

Сондай-ақ қараңыз

- [Жылдам бастау](quickstart)
