---
id: install
title: 'Instalasiyɔn'
slug: /install
sidebar_label: 'Instalasiyɔn'
---

---

## Instalasion sira "Thunderbird Add-ons and Themes" ye {#installation-in-thunderbird-recommended}

:::important Thunderbird verisiyɔn kɔfɔlɔ
Add‑on nin bɛ dɛmɛ Thunderbird **128 ESR walima kɔrɔ**. Verisiyɔn kɔrɔw tɛ dɛmɛ.
:::

Nin ye sira min y’ali ɲɛ ka instale. Add‑onw minnu bɛ ATN (addons.thunderbird.net) kɔnɔ ka instale, olu bɛ sɔrɔ ɲɛnabɔ otomatikɔ. LOCAL/dev instale tɛ ɲɛnabɔ otomatikɔ.

- Thunderbird verisiyɔn minimi: 128 ESR walima kɔrɔ.

1. Thunderbird kɔnɔ, ka taa **Tools > Add-ons and Themes**.
2. Ka ɲini "reply with attachments".
3. Ka add‑on instale.

Walima ka add‑on kolobalen bɔlen sɔrɔ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalasion manuwali kɔfɛ XPI la {#local-installation-in-thunderbird}

### Ka XPI faili telecharje {#download-the-xpi-file}

1. Ka taa [Thunderbird Add‑on kolobalen](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Ka add‑on verisiyɔn kɔrɔya telecharje XPI faili kama (`reply_with_attachments-x.y.z-tb.xpi`).

### Ka instale kɔfɛ Thunderbird la {#install-in-thunderbird-local}

1. Ka Thunderbird buka.
2. Ka taa **Tools > Add-ons and Themes**.
3. **Add-ons Manager** kɔnɔ, ka klikɛ ikɔnɔn "gear" min bɛ sɔ top-right corner la.
4. Ka **Install Add-on From File…** sugandi menu kɔnɔ.
5. Ka faili `reply_with_attachments-x.y.z-tb.xpi` min i telecharje, a sɛbɛn.
6. Ka instalasion labɛn waati min bɛ ɲini.

---

## Instalasion dɛvɛlopimɛnti kɔfɛ {#installation-for-development}

### Ka repɔzitori telecharje {#download-the-repository}

1. Ka GitHub repɔzitori verisiyɔn kɔrɔya telecharje.
2. Ka `make help` jalaki don kɔfɛ kalan wɛrɛw.

### Ka instale kɔfɛ Thunderbird la {#install-in-thunderbird-dev}

1. Ka Thunderbird buka.
2. Ka taa **Tools > Add-ons and Themes**.
3. **Add-ons Manager** kɔnɔ, ka klikɛ ikɔnɔn "gear" min bɛ sɔ top-right corner la.
4. Ka **Install Add-on From File…** sugandi menu kɔnɔ.
5. Ka faili `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` min b’a da, a sɛbɛn.
6. Ka instalasion labɛn waati min bɛ ɲini.

Fɔlɔ: Ni Thunderbird tɛ na `.zip` i sisitɛmi kɔnɔ, ka a tɔgɔ kɛ `.xpi` ye, a kɔfɛ “Install Add‑on From File…” don kɔfɛ wɛrɛlenna.

### LOCAL ZIP min bɛ sɔrɔ min fɛ {#where-local-zip}

- Fɔlɔ, ka add‑on pakɛji: ka `make pack` jalaki repɔzitori ɲɛ ta la.
- Pakɛji kɔfɛ ka ban, ka “LOCAL” zip ɲini repɔzitori ɲɛ ta la (misali, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ka tɛsti kɔfɛ pakɛji wɛrɛlen kɔfɛ, ka verisiyɔnw sɔrɔ (bump) `sources/manifest_ATN.json` ani `sources/manifest_LOCAL.json` kɔnɔ.

---

## Daɲɛli, Bɔli, ani ɲɛnabɔw {#disable-uninstall-updates}

- Daɲɛli: Thunderbird → Tools → Add‑ons and Themes → ka add‑on ɲini → toggle bɔ.
- Bɔli: fɛn kelen kɔnɔ → three‑dot menu → Remove.
- ɲɛnabɔw: ATN instale bɛ ɲɛnabɔ otomatikɔ kɛ waati min verisiyɔn kura ma ɲɛlɛma. LOCAL/dev instale tɛ ɲɛnabɔ otomatikɔ; ka LOCAL build kura instale manuwaliman.
- Ka sɛtɛriw bɔ bɛɛ: ka [Privacy → Data removal](privacy#data-removal) dɔ.

Ka ɲɛ wɛrɛ:

- [Quickstart](quickstart)
