---
id: install
title: 'Daɗo'
slug: /install
sidebar_label: 'Daɗo'
---

## Daɗo via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Wonaa Thunderbird Woni
Nde add‑on ngal yahi Thunderbird **128 ESR walla so wonaa**. Ko feewi burti hotoo.
:::

Ngal ngoni daɗo woɗnde neɗɗa. Add‑ons leɗɗi e ATN (addons.thunderbird.net) receive e jaŧtude ɓe. LOCAL/dev daɗo wi'a hone jaŧtude.

- Wonaa Thunderbird: 128 ESR walla so wonaa.

1. E Thunderbird, jaɓo **Tools > Add-ons and Themes**.
2. Laawol "reply with attachments".
3. Nde add-on ngal.

Walla heɓo laawol add‑on garu: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Daɗo ka XPI {#local-installation-in-thunderbird}

### Dawi XPI faayila {#download-the-xpi-file}

1. Jaɓo laawol [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Daw miijim faayila add-on ngal e XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Daɗo e Thunderbird {#install-in-thunderbird-local}

1. Nde Thunderbird.
2. Jaɓo **Tools > Add-ons and Themes**.
3. E **Add-ons Manager**, dilli gear icon e lowre cuɓi.
4. Ndaɗi **Install Add-on From File…** e menu.
5. Suɓo faayila `reply_with_attachments-x.y.z-tb.xpi` ngol.
6. Toppito daɗo ngal so jooɗna.

---

## Daɗo e laawol {#installation-for-development}

### Dawi wakwe {#download-the-repository}

1. Daw miijim faayila GitHub ɓe.
2. Suɓo `make help` e laawol muusirdugol.

### Daɗo e Thunderbird {#install-in-thunderbird-dev}

1. Nde Thunderbird.
2. Jaɓo **Tools > Add-ons and Themes**.
3. E **Add-ons Manager**, dilli gear icon e lowre cuɓi.
4. Ndaɗi **Install Add-on From File…** e menu.
5. Suɓo faayila ɓe maa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Toppito daɗo ngal so jooɗna.

Ndagga: So Thunderbird a ndaarata `.zip` e ngol system, renama ngol e `.xpi` e jooɗi “Install Add‑on From File…” woni no feewi.

### Hol ko ɓe heɓa LOCAL ZIP {#where-local-zip}

- Awa, punni add‑on ngal: jogi `make pack` e laawol ɓe.
- So a punni, heɓi “LOCAL” zip e laawol ɓe (e.g., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Bawa e punni ngol e teeŋirde, beydi versions e `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json`.

---

## Walda, kooboo, e jaŧtude {#disable-uninstall-updates}

- Walda: Thunderbird → Tools → Add‑ons and Themes → heɓi add‑on ngal → toggle off.
- Kooboo: neɗɗa ñaawo → three‑dot menu → Remove.
- Jaŧtude: ATN daɗo hinno jaŧtude so new versions ɓe siki. LOCAL/dev daɗo wi'a hone jaŧtude; naatnude daɗo LOCAL fof no.
- Waalda settings laawol: jaysee [Privacy → Data removal](privacy#data-removal).

Heɓi jooɗi

- [Quickstart](quickstart)
