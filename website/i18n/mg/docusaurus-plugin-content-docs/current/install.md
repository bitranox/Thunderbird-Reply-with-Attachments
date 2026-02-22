---
id: install
title: 'Fametrahana'
slug: /install
sidebar_label: 'Fametrahana'
---

---

## Fametrahana amin'ny alalan'ny "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Kinova Thunderbird ambany indrindra
Ity fanampin‑javatra ity dia manohana Thunderbird **128 ESR na vaovao kokoa**. Tsy tohanana ny kinova taloha.
:::

Ity no fomba fametrahana soso-kevitra. Ny fanampin‑javatra napetraka avy amin'ny ATN (addons.thunderbird.net) dia mahazo fanavaozana ho azy. Ny fametrahana LOCAL/dev dia tsy manavao ho azy.

- Kinova Thunderbird ambany indrindra: 128 ESR na vaovao kokoa.

1. Ao amin'ny Thunderbird, mandehana any amin'ny **Tools > Add-ons and Themes**.
2. Karohy ny "reply with attachments".
3. Ampidiro ilay fanampin‑javatra.

Na sokafy mivantana ny pejin'ilay fanampin‑javatra: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Fametrahana tanana avy amin'ny XPI {#local-installation-in-thunderbird}

### Sintomy ny rakitra XPI {#download-the-xpi-file}

1. Mankanesa amin'ny [pejin'ny Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Sintomy ho rakitra XPI (`reply_with_attachments-x.y.z-tb.xpi`) ny kinova farany amin'ilay fanampin‑javatra.

### Fametrahana ao amin'ny Thunderbird {#install-in-thunderbird-local}

1. Sokafy ny Thunderbird.
2. Mandehana any amin'ny **Tools > Add-ons and Themes**.
3. Ao amin'ny **Add-ons Manager**, tsindrio ny kisary «gear» eo amin'ny zorony ambony havanana.
4. Safidio ny **Install Add-on From File…** ao amin'ny menio.
5. Fidiana ilay rakitra `reply_with_attachments-x.y.z-tb.xpi` nampidinina.
6. Hamafiso ny fametrahana rehefa angatahina.

---

## Fametrahana ho an'ny fampandrosoana {#installation-for-development}

### Sintomy ny tahiry {#download-the-repository}

1. Sintomy ny kinova farany amin'ilay tahiry GitHub.
2. Alefaso `make help` raha mila fanazavana fanampiny.

### Fametrahana ao amin'ny Thunderbird {#install-in-thunderbird-dev}

1. Sokafy ny Thunderbird.
2. Mandehana any amin'ny **Tools > Add-ons and Themes**.
3. Ao amin'ny **Add-ons Manager**, tsindrio ny kisary «gear» eo amin'ny zorony ambony havanana.
4. Safidio ny **Install Add-on From File…** ao amin'ny menio.
5. Fidiana ilay rakitra noforonina `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Hamafiso ny fametrahana rehefa angatahina.

Fanamarihana: Raha tsy eken'i Thunderbird ny `.zip` amin'ny rafitrao, ovao anarana ho `.xpi` izy ary andramo indray ny “Install Add‑on From File…”.

### Aiza no ahitana ny LOCAL ZIP {#where-local-zip}

- Voalohany, fonosy ilay fanampin‑javatra: alefaso `make pack` ao amin'ny fototry ny tahiry.
- Rehefa vita ny famonosana, tadiavo ao amin'ny fototry ny tahiry ny zip “LOCAL” (ohatra, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Alohan'ny hamonosana indray ho an'ny fitsapana, havaozy ny kinova ao amin'ny `sources/manifest_ATN.json` sy `sources/manifest_LOCAL.json`.

---

## Atsaharo, Esory, ary Fanavaozana {#disable-uninstall-updates}

- Atsaharo: Thunderbird → Tools → Add‑ons and Themes → tadiavo ilay fanampin‑javatra → vonoy.
- Esory: fijery mitovy → menio telo teboka → Remove.
- Fanavaozana: Ny fametrahana avy amin'ny ATN dia manavao ho azy rehefa ekena ny kinova vaovao. Ny fametrahana LOCAL/dev dia tsy manavao ho azy; ampidiro tanana indray ny LOCAL build vaovao.
- Fafao tanteraka ny fikirakirana: jereo [Fiainana manokana → Fanesorana angona](privacy#data-removal).

Jereo koa

- [Fanombohana haingana](quickstart)
