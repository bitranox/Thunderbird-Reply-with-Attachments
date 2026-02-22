---
id: install
title: 'Churana'
slug: /install
sidebar_label: 'Instalación'
---

---

## "Thunderbird Add-ons and Themes" nisqamanta churay {#installation-in-thunderbird-recommended}

:::important Pisi kaq Thunderbird versión
Kay add‑onqa Thunderbird **128 ESR utaq aswan musuq** versionesqata qamachin. Ñawpaq versionesqa mana qamachisqa.
:::

Kaymi churaypaq allin ñan. ATN (addons.thunderbird.net) -manta churakusqa add‑onkunaqa automáticulla qhipachakuyta chaskikun. LOCAL/dev churakusqakunaqa manam automáticulla qhipachakuchu.

- Pisi kaq Thunderbird versión: 128 ESR utaq aswan musuq.

1. Thunderbirdpi, **Tools > Add-ons and Themes** -man ripuy.
2. "reply with attachments" maskhay.
3. Add‑onta yapay.

Hinaspa add‑on p’anqata chaylla kichay: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI-manta manual churay {#local-installation-in-thunderbird}

### XPI archivota urayachiy {#download-the-xpi-file}

1. [Thunderbird Add‑on p’anqaman](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ripuy.
2. Add‑onpa musuqmanta versiónninata XPI archivo hina urayachiy (`reply_with_attachments-x.y.z-tb.xpi`).

### Thunderbirdpi churay {#install-in-thunderbird-local}

1. Thunderbirdta kichay.
2. **Tools > Add-ons and Themes** -man ripuy.
3. **Add-ons Manager**-pi, hanaq paña k'uchupi kachkan ‘gear’ ikonapi kliky.
4. Menúmanta **Install Add-on From File…** nisqata akllay.
5. Urayachisqa `reply_with_attachments-x.y.z-tb.xpi` archivota akllay.
6. Qhawachisqa waqtapi, churayta ch’iqay.

---

## Ruwanakuy (development)paq churay {#installation-for-development}

### Repositoriota urayachiy {#download-the-repository}

1. GitHub repositoriopa musuqmanta versiónninata urayachiy.
2. Aswan willaypaq `make help`ta qallarichiy.

### Thunderbirdpi churay {#install-in-thunderbird-dev}

1. Thunderbirdta kichay.
2. **Tools > Add-ons and Themes** -man ripuy.
3. **Add-ons Manager**-pi, hanaq paña k'uchupi kachkan ‘gear’ ikonapi kliky.
4. Menúmanta **Install Add-on From File…** nisqata akllay.
5. Kamariqsqa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` archivota akllay.
6. Qhawachisqa waqtapi, churayta ch’iqay.

Nota: Thunderbirdqa qampaq sistemanpi `.zip`ta mana chaskiykuchu chayqa, sutinta `.xpi` hinaman hukmanta sutinchay, chaymanta “Install Add‑on From File…” nisqata wakmanta yachay.

### LOCAL ZIP maypita tariy {#where-local-zip}

- Ñawpaqta, add‑onta sunk’uchiy: repositorio raizinpi `make pack`ta qallarichiy.
- Sunk’uchispa qhipapi, repositorio raizinpi “LOCAL” zipta tarikuy (e.g., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Qhawaypaq wakmanta sunk’uchaykama, `sources/manifest_ATN.json` hinallataq `sources/manifest_LOCAL.json`-piqa versiónkunata wiñachiy.

---

## Uarkuy, Ch’uyachiy, hina Qhipachakuy {#disable-uninstall-updates}

- Uarkuy: Thunderbird → Tools → Add‑ons and Themes → add‑onta tariy → apachiy.
- Ch’uyachiy: hinalla rikupiypi → kimsa‑p’uku (three‑dot) menú → Remove.
- Qhipachakuy: ATN‑manta churakusqakunaqa musuq versionesqa chimpusqa kaptinmi auto‑update ruwanku. LOCAL/dev churakusqakunaqa mana auto‑update ruwanichu; LOCAL machaq rurasqata manualmanta wakmanta churay.
- Ch’aniykunata tukuylla ch’uyachiy: [Privacy → Data removal](privacy#data-removal) qhaway.

Hinallataq qhaway

- [Quickstart](quickstart)
