---
id: install
title: 'Kuisirwa'
slug: /install
sidebar_label: 'Kuisirwa'
---

## Kuisirwa kuburikidza ne "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Version
Iyi add‑on inotsigira Thunderbird **128 ESR kana kuti zvichangobva**. Shanduro dzekare hadzitsigirwi.
:::

Iyi ndiyo nzira inokurudzirwa yekuisa. Add‑ons akaiswa kubva kuATN (addons.thunderbird.net) anowana magadziridzo otomatiki. LOCAL/dev installs hadzidzokorore otomatiki.

- Minimum Thunderbird version: 128 ESR kana kuti zvichangobva.

1. MuThunderbird, enda ku **Tools > Add-ons and Themes**.
2. Tsvaga "reply with attachments".
3. Wedzera add-on.

Kana uvhure peji readd-on rakananga: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kuisirwa kwech manually kubva kuXPI {#local-installation-in-thunderbird}

### Dhawunirodha faira reXPI {#download-the-xpi-file}

1. Enda ku [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Dhawunirodha shanduro ichangobva yeadd-on sefaira reXPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Isa muThunderbird {#install-in-thunderbird-local}

1. Vhura Thunderbird.
2. Enda ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dzvanya pa icon yemachipisi kumusoro-kurudyi.
4. Sarudza **Install Add-on From File…** kubva mumenu.
5. Sarudza faira rakadhawunirwa `reply_with_attachments-x.y.z-tb.xpi`.
6. Simbisa kuisirwa pakumbira.

---

## Kuisirwa kwekuvandudza {#installation-for-development}

### Dhawunirodha repository {#download-the-repository}

1. Dhawunirodha shanduro ichangobva yeGitHub repository.
2. Mhanya `make help` kuti uwane rumwe ruzivo.

### Isa muThunderbird {#install-in-thunderbird-dev}

1. Vhura Thunderbird.
2. Enda ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dzvanya pa icon yemachipisi kumusoro-kurudyi.
4. Sarudza **Install Add-on From File…** kubva mumenu.
5. Sarudza faira rakabudiswa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Simbisa kuisirwa pakumbira.

Cherechedzo: Kana Thunderbird isingagamuchire `.zip` pamasystem enyu, chinja zita rayo ku `.xpi` uye edza “Install Add‑on From File…” zvekare.

### Kupi kuwana LOCAL ZIP {#where-local-zip}

- Kutanga, pakete add‑on: mhanya `make pack` mu repository root.
- Mushure mepaketi, tsvaga “LOCAL” zip mu repository root (semuenzaniso, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Usati wapaketi zvekare kuti uedze, bampira shanduro mu `sources/manifest_ATN.json` uye `sources/manifest_LOCAL.json`.

---

## Dzima, Bvisa, uye Magadziridzo {#disable-uninstall-updates}

- Dzima: Thunderbird → Tools → Add‑ons and Themes → tsvaga add‑on → toggle off.
- Bvisa: maonero akafanana → menyu yemadhiri matatu → Bvisa.
- Magadziridzo: ATN installs anozvitsvaga dheta pa shanduro itsva dzinotenderwa. LOCAL/dev installs hadzidzokorore otomatiki; reinstall imwe LOCAL build manually.
- Bvisa marongero zvachose: ona [Privacy → Data removal](privacy#data-removal).

Ona zvakare

- [Quickstart](quickstart)
