---
id: install
title: 'Ukufakwa'
slug: /install
sidebar_label: 'Ukufakwa'
---

---

## Ukufakwa ngokusebenzisa "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Inguqulo ye-Thunderbird okungenani
Lesi sengezo sisekela i-Thunderbird **128 ESR noma entsha**. Izinhlobo ezindala azisekelwa.
:::

Le yindlela yokufaka enconyiwe. Izengezo ezifakwe kusuka ku-ATN (addons.thunderbird.net) zithola izibuyekezo ngokuzenzakalelayo. Ukufakwa kwe-LOCAL/dev akuzibuyekezi ngokuzenzakalelayo.

- Inguqulo encane ye-Thunderbird: 128 ESR noma entsha.

1. Ku-Thunderbird, iya ku-**Tools > Add-ons and Themes**.
2. Sesha okuthi "reply with attachments".
3. Nezela isengezo.

Noma uvule ikhasi lesengezo ngqo: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ukufakwa ngesandla kusuka ku-XPI {#local-installation-in-thunderbird}

### Landa ifayela le-XPI {#download-the-xpi-file}

1. Iya ku-[Ikhasi le-Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Landa inguqulo yakamuva yesengezo njengefayela le-XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Faka ku-Thunderbird {#install-in-thunderbird-local}

1. Vula i-Thunderbird.
2. Iya ku-**Tools > Add-ons and Themes**.
3. Ku-**Add-ons Manager**, chofoza isithonjana segiya ekhoneni eliphezulu kwesokudla.
4. Khetha **Install Add-on From File…** kumenyu.
5. Khetha ifayela elandiwe `reply_with_attachments-x.y.z-tb.xpi`.
6. Qinisekisa ukufakwa uma ucelwa.

---

## Ukufakwa kokuthuthukisa {#installation-for-development}

### Landa i-repository {#download-the-repository}

1. Landa inguqulo yakamuva ye-repository ye-GitHub.
2. Sebenzisa `make help` ukuthola olunye ulwazi.

### Faka ku-Thunderbird {#install-in-thunderbird-dev}

1. Vula i-Thunderbird.
2. Iya ku-**Tools > Add-ons and Themes**.
3. Ku-**Add-ons Manager**, chofoza isithonjana segiya ekhoneni eliphezulu kwesokudla.
4. Khetha **Install Add-on From File…** kumenyu.
5. Khetha ifayela elikhiqiziwe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Qinisekisa ukufakwa uma ucelwa.

Qaphela: Uma i-Thunderbird ingayamukeli i-`.zip` ohlelweni lwakho, yiqambe kabusha ibe `.xpi` bese uzama “Install Add‑on From File…” futhi.

### Indawo yokuthola i-LOCAL ZIP {#where-local-zip}

- Okokuqala, phaketha isengezo: sebenzisa `make pack` empandeni ye-repository.
- Ngemva kokupakisha, thola i-zip ethi “LOCAL” empandeni ye-repository (isb., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ngaphambi kokupakisha kabusha ngenhloso yokuhlola, nyusa izinguqulo ku-`sources/manifest_ATN.json` naku-`sources/manifest_LOCAL.json`.

---

## Khubaza, Khipha ukufakwa, nezibuyekezo {#disable-uninstall-updates}

- Khubaza: Thunderbird → Tools → Add‑ons and Themes → thola isengezo → yivale.
- Khipha ukufakwa: umbono ofanayo → imenyu yamachashazi amathathu → Susa.
- Izibuyekezo: ukufakwa kwe-ATN kuzibuyekeza ngokuzenzakalelayo uma izinguqulo ezintsha zivunyelwe. Ukufakwa kwe-LOCAL/dev akuzibuyekezi; fakela kabusha ukwakhiwa okusha kwe-LOCAL mathupha.
- Susa izilungiselelo ngokuphelele: bheka [Ubumfihlo → Ukususwa kwedatha](privacy#data-removal).

Bona futhi

- [Ukuqalisa okusheshayo](quickstart)
