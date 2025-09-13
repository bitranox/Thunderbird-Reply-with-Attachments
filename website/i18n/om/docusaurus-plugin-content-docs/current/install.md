---
id: install
title: 'Kuusaa'
slug: /install
sidebar_label: 'Kuusaa'
---

## Kuusaa "Thunderbird Add-ons and Themes" geggeessaa {#installation-in-thunderbird-recommended}

:::important Afaan Thunderbird Sanaa
Add-on kun Thunderbird **128 ESR ykn haaraa** deeggaru. Sanyii duraanii hin deeggaramu.
:::

Kunniin mala kuusaa filatamaa ti. Add-onota ATN (addons.thunderbird.net) irraa kuufaman hamma annoo otomaatikii argatu. LOCAL/dev kuusaa otomaatikii hin argatu.

- Affaan Thunderbird ittiin fayyadamuu: 128 ESR ykn haaraa.

1. Thunderbird keessatti, gara **Tools > Add-ons and Themes** deemi.
2. "replay with attachments" barbaadi.
3. Add-onni dabaluu.

Yookaan fuula add-on thokkaatti ni fodda: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kuusaa Harka Irraan {#local-installation-in-thunderbird}

### XPI faayila buufadhu {#download-the-xpi-file}

1. Gara [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) deemi.
2. XPI faayila `reply_with_attachments-x.y.z-tb.xpi` ta'ee add-on caalmaatti buufadhu.

### Thunderbird keessatti kuusaa {#install-in-thunderbird-local}

1. Thunderbird banadhu.
2. Gara **Tools > Add-ons and Themes** deemi.
3. **Add-ons Manager** keessatti, icon gear mirga gubbaa tuqi.
4. **Install Add-on From File…** filadhu.
5. Faayila `reply_with_attachments-x.y.z-tb.xpi` buufatte filadhu.
6. Kuusaa beekamtii gaafate mirkaneessi.

---

## Kuusaa qindeessuuf {#installation-for-development}

### Repositoorii buufadhu {#download-the-repository}

1. Repositoorii GitHub dhumaatti buufadhu.
2. Odeefannoo dabalataaf `make help` hojjadhu.

### Thunderbird keessatti kuusaa {#install-in-thunderbird-dev}

1. Thunderbird banadhu.
2. Gara **Tools > Add-ons and Themes** deemi.
3. **Add-ons Manager** keessatti, icon gear mirga gubbaa tuqi.
4. **Install Add-on From File…** filadhu.
5. Faayila uume `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` filadhu.
6. Kuusaa beekamtii gaafate mirkaneessi.

Xiinxalli: Yeroo Thunderbird `.zip` siif hin tule, maqaa isaa `.xpi` gochuu dandeessa, "Install Add-on From File…” deebisii.

### LOCAL ZIP akka argachuuf {#where-local-zip}

- Jalqaba, add-on kuusaa: `make pack` banuufi raawwadhu.
- Kuusaa booda, "LOCAL" zip repositoorii keessatti (fakkeenyaaf, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Qorannoo keessatti harkaa re-packaging akkasumas, `sources/manifest_ATN.json` fi `sources/manifest_LOCAL.json` keessatti fooyyeessuu.

---

## Dhoowwachuu, Haquu, fi Odeeffannoo Haaraa {#disable-uninstall-updates}

- Dhoowwachuu: Thunderbird → Tools → Add-ons and Themes → add-on argachuuf → toggle off.
- Haquu: yaada wal fakkaatu → menu daqqii sadii → Haqi.
- Odeeffannoo Haaraa: ATN kuusaa haaraa erga mirkaneeffamteetti otomaatikii hojjeta. LOCAL/dev kuusaa otomaatikii hin hojjatu; kuusaa LOCAL haarawaan harka qabeeyyii irra deebi'i.
- Faayiloota guutummaatti haqi: ilaali [Privacy → Data removal](privacy#data-removal).

Akkasuma

- [Quickstart](quickstart)
