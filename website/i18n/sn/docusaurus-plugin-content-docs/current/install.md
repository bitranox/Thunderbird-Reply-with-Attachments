---
id: install
title: 'Kuiswa'
slug: /install
sidebar_label: 'Kuiswa'
---

---

## Kuiswa kuburikidza ne "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Shanduro shoma ye Thunderbird
Chiwewedzera ichi chinotsigira Thunderbird 128 ESR kana nyowani. Shanduro dzekare hadzitsigirwe.
:::

Iyi ndiyo nzira yakakurudzirwa yekuisa. Zviwedzero zvinomisikidzwa kubva kuATN (addons.thunderbird.net) zvinogamuchira zvigadziridzo otomatiki. Kuisa kweLOCAL/dev hakuvandudze otomatiki.

- Shanduro shoma ye Thunderbird: 128 ESR kana nyowani.

1. MuThunderbird, enda ku **Tools > Add-ons and Themes**.
2. Tsvaga "reply with attachments".
3. Wedzera chiwedzero.

Kana kuvhura peji rechiwedzero zvakananga: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kuiswa nemaoko kubva kuXPI {#local-installation-in-thunderbird}

### Dhawunirodha faira reXPI {#download-the-xpi-file}

1. Enda ku [Peji reThunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Dhawunirodha shanduro yazvino yechiwedzero sefaira reXPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Isa muThunderbird {#install-in-thunderbird-local}

1. Vhura Thunderbird.
2. Enda ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dzvanya chiratidzo chegiya pakona yepamusoro-kurudyi.
4. Sarudza **Install Add-on From File…** kubva pamenu.
5. Sarudza faira yakadhawunirodhiwa `reply_with_attachments-x.y.z-tb.xpi`.
6. Simbisa kuiswa paunokumbirwa.

---

## Kuiswa kwekusimudzira {#installation-for-development}

### Dhawunirodha repozitori {#download-the-repository}

1. Dhawunirodha shanduro yazvino yeGitHub repozitori.
2. Mhanya `make help` kuti uwane rumwe ruzivo.

### Isa muThunderbird {#install-in-thunderbird-dev}

1. Vhura Thunderbird.
2. Enda ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dzvanya chiratidzo chegiya pakona yepamusoro-kurudyi.
4. Sarudza **Install Add-on From File…** kubva pamenu.
5. Sarudza faira yakagadzirwa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Simbisa kuiswa paunokumbirwa.

Cherechedza: Kana Thunderbird ikasagamuchira `.zip` pane sisitimu yako, chinja zita rayo ku `.xpi` wobva waedza “Install Add‑on From File…” zvakare.

### Kwaunowana LOCAL ZIP {#where-local-zip}

- Kutanga, rongedza chiwedzero: mhanya `make pack` mumudzi werepozitori.
- Mushure mekurongedza, tsvaga zip re “LOCAL” mumudzi werepozitori (semuenzaniso, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Usati warongazve kuti uedze, simudzira nhamba dzezvishanduro mu `sources/manifest_ATN.json` ne `sources/manifest_LOCAL.json` zvese.

---

## Kudzima, Kubvisa, uye Zvigadziridzo {#disable-uninstall-updates}

- Dzima: Thunderbird → Tools → Add‑ons and Themes → tsvaga chiwedzero → chinjisa kuti chidzime.
- Bvisa: maonero mamwe acho → menyu yemadotsi matatu → Remove.
- Zvigadziridzo: Zviiswe kubva kuATN zvinovandudza otomatiki kana shanduro nyowani dzabvumidzwa. Kuisa kweLOCAL/dev hakuvandudze otomatiki; isa zvakare build itsva yeLOCAL nemaoko.
- Bvisa marongero zvachose: ona [Zvakavanzika → Kubviswa kwedata](privacy#data-removal).

Ona zvakare

- [Kutanga nekukurumidza](quickstart)
