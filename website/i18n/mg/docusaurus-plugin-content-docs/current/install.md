---
id: install
title: 'Fametrahana'
slug: /install
sidebar_label: 'Fametrahana'
---

## Fametrahana amin'ny alalan'ny "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Dikan-teny Thunderbird far最低
Ity add-on ity dia manohana ny Thunderbird **128 ESR na vaovao kokoa**. Ny dikan-teny taloha dia tsy voazaha.
:::

Ity no fomba fametrahana atolotra. Ny add-on napetraka avy amin'ny ATN (addons.thunderbird.net) dia mahazo fanavaozana mandeha ho azy. Ny fametrahana LOCAL/dev dia tsy manavao ho azy.

- Dikan-teny Thunderbird far最低: 128 ESR na vaovao kokoa.

1. Ao amin'ny Thunderbird, mandehana amin'ny **Tools > Add-ons and Themes**.
2. Mitadiava "mamaly miaraka amin'ny attachments".
3. Ampidiro ny add-on.

Na misokatra mivantana amin'ny pejy add-on: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Fametrahana tanana avy amin'ny XPI {#local-installation-in-thunderbird}

### Misintona ny rakitra XPI {#download-the-xpi-file}

1. Mandehana amin'ny [pejy add-on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Misintona ny dikan-teny farany amin'ny add-on ho rakitra XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Ampidiro ao amin'ny Thunderbird {#install-in-thunderbird-local}

1. Sokafy ny Thunderbird.
2. Mandehana amin'ny **Tools > Add-ons and Themes**.
3. Ao amin'ny **Add-ons Manager**, tsindrio ny kisarisary gears ao amin'ny zoro ambony havanana.
4. Fidio **Install Add-on From File…** ao amin'ny menio.
5. Safidio ny rakitra `reply_with_attachments-x.y.z-tb.xpi` izay nosintonina.
6. Confirmo ny fametrahana rehefa angatahina.

---

## Fametrahana ho an'ny fampandrosoana {#installation-for-development}

### Misintona ny tahiry {#download-the-repository}

1. Misintona ny dikan-teny farany amin'ny tahiry GitHub.
2. Mandehana amin'ny `make help` raha mila fanazavana fanampiny.

### Ampidiro ao amin'ny Thunderbird {#install-in-thunderbird-dev}

1. Sokafy ny Thunderbird.
2. Mandehana amin'ny **Tools > Add-ons and Themes**.
3. Ao amin'ny **Add-ons Manager**, tsindrio ny kisarisary gears ao amin'ny zoro ambony havanana.
4. Fidio **Install Add-on From File…** ao amin'ny menio.
5. Safidio ny rakitra novokarina `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirmo ny fametrahana rehefa angatahina.

Fanamarihana: Raha tsy manaiky ny `.zip` ny Thunderbird amin'ny rafitrao, ovao ny anarany ho `.xpi` ary andramo indray ny “Install Add‑on From File…”.

### Aiza no ahitana ny LOCAL ZIP {#where-local-zip}

- Voalohany, ento ny add-on: ataovy `make pack` ao amin'ny fototry ny tahiry.
- Aorian'ny fanangonana, tadiavo ny zip "LOCAL" ao amin'ny fototry ny tahiry (ohatra, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Alohan'ny hanangonana indray ho an'ny fitsapana, ovay ny dikan-teny ao amin'ny `sources/manifest_ATN.json` sy `sources/manifest_LOCAL.json`.

---

## Manafoana, Manala, sy Ny fanavaozana {#disable-uninstall-updates}

- Manafoana: Thunderbird → Tools → Add‑ons and Themes → tadiavo ny add-on → ahena ny toggle.
- Manala: mitovy fijery → menio telo teboka → Esory.
- Fanavaozana: ny fametrahana ATN dia manavao ho azy rehefa ekena ny dikan-teny vaovao. Ny fametrahana LOCAL/dev dia tsy manavao ho azy; apetraho manually ny fananganana vaovao LOCAL.
- Esory tanteraka ny fikirakirana: jereo [Privacy → Fanafoanana angona](privacy#data-removal).

Jereo ihany koa

- [Quickstart](quickstart)
