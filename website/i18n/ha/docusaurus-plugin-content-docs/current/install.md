---
id: install
title: 'Shigarwa'
slug: /install
sidebar_label: 'Shigarwa'
---

---

## Shigarwa ta hanyar "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Mafi ƙarancin Sigar Thunderbird
Wannan abin ƙari yana tallafawa Thunderbird **128 ESR ko sabo fiye da haka**. Ba a tallafa tsofaffin sigogi ba.
:::

Wannan ita ce hanyar shigarwa da ake ba da shawara. Abubuwan ƙari da aka shigar daga ATN (addons.thunderbird.net) suna samun sabuntawa ta atomatik. Shigarwar LOCAL/dev ba sa sabunta kansu.

- Mafi ƙarancin sigar Thunderbird: 128 ESR ko sabo fiye da haka.

1. A cikin Thunderbird, je zuwa **Tools > Add-ons and Themes**.
2. Nema "reply with attachments".
3. Ƙara abin ƙari.

Ko buɗe shafin abin ƙari kai tsaye: [Abubuwan ƙarin Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Shigarwa da hannu daga XPI {#local-installation-in-thunderbird}

### Zazzage fayil ɗin XPI {#download-the-xpi-file}

1. Je zuwa [Shafin Abin Ƙarin Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Zazzage sabon sigar abin ƙari a matsayin fayil ɗin XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Shigar a cikin Thunderbird {#install-in-thunderbird-local}

1. Buɗe Thunderbird.
2. Je zuwa **Tools > Add-ons and Themes**.
3. A cikin **Add-ons Manager**, danna alamar gear a kusurwar dama ta sama.
4. Zaɓi **Install Add-on From File…** daga menu.
5. Zaɓi fayil ɗin `reply_with_attachments-x.y.z-tb.xpi` da aka zazzage.
6. Tabbatar da shigarwar idan aka tambaye ka.

---

## Shigarwa don ci gaba {#installation-for-development}

### Zazzage ma'ajiyar lamba {#download-the-repository}

1. Zazzage sabon sigar ma'ajiyar GitHub.
2. Gudanar da `make help` don ƙarin bayani.

### Shigar a cikin Thunderbird {#install-in-thunderbird-dev}

1. Buɗe Thunderbird.
2. Je zuwa **Tools > Add-ons and Themes**.
3. A cikin **Add-ons Manager**, danna alamar gear a kusurwar dama ta sama.
4. Zaɓi **Install Add-on From File…** daga menu.
5. Zaɓi fayil ɗin `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` da aka samar.
6. Tabbatar da shigarwar idan aka tambaye ka.

Lura: Idan Thunderbird bai karɓi `.zip` a tsarin ku ba, sake suna shi zuwa `.xpi` sannan ku sake gwada “Install Add‑on From File…”.

### Inda za a samu LOCAL ZIP {#where-local-zip}

- Da fari, yi kunshin abin ƙari: gudanar da `make pack` a tushen ma'ajiyar.
- Bayan yin kunshin, nemo zip na “LOCAL” a tushen ma'ajiyar (misali, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Kafin sake yin kunshin don gwaji, ƙara lambar sigar a cikin `sources/manifest_ATN.json` da `sources/manifest_LOCAL.json` duka.

---

## Kashewa, Cire shigarwa, da Sabuntawa {#disable-uninstall-updates}

- Kashe: Thunderbird → Tools → Add‑ons and Themes → nemo abin ƙari → kashe (toggle off).
- Cire shigarwa: wannan hangen → menu na dige uku → Cire.
- Sabuntawa: Shigarwa ta ATN tana samun sabuntawa ta atomatik idan an amince da sababbin sigogi. Shigarwar LOCAL/dev ba sa sabunta kansu; sake shigar da sabon ginin LOCAL da hannu.
- Cire saituna gaba ɗaya: duba [Sirri → Cire bayanai](privacy#data-removal).

Duba kuma

- [Farawa da sauri](quickstart)
