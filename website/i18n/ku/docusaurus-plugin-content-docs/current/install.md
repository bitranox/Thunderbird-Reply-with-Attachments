---
id: install
title: 'Sazkirin'
slug: /install
sidebar_label: 'Sazkirin'
---

---

## Sazkirin bi rêya "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Guhertoya herî kêm ya Thunderbird
Ev pêvek Thunderbird **128 ESR an jî nûtir** piştgirî dike. Guhertoyên kevintir nayên piştgirî kirin.
:::

Ev rêbaza sazkirinê ya pêşniyarkirî ye. Pêvekên ku ji ATN (addons.thunderbird.net) hatine sazkirin nûvekirinên bixweber distînin. Sazkirinên LOCAL/dev nûvekirina bixweber nake.

- Guhertoya herî kêm a Thunderbird: 128 ESR an jî nûtir.

1. Di Thunderbird de, here **Tools > Add-ons and Themes**.
2. "reply with attachments" bigere.
3. Pêvekê zêde bike.

An jî rûpela pêvekê rasterast veke: [Pêvekên Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Sazkirina destanî ji XPI {#local-installation-in-thunderbird}

### Daxistina pelê XPI {#download-the-xpi-file}

1. Biçe [Rûpela Pêveka Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Wersiyona dawî ya pêvekê wek pelê XPI (`reply_with_attachments-x.y.z-tb.xpi`) daxe.

### Sazkirin di Thunderbird de {#install-in-thunderbird-local}

1. Thunderbird veke.
2. Here **Tools > Add-ons and Themes**.
3. Di **Add-ons Manager** de, li kûna jor-rastê îkona çarxê bikirtîne.
4. Ji pêşeka hilbijartinan re **Install Add-on From File…** hilbijêre.
5. Pelê `reply_with_attachments-x.y.z-tb.xpi` ya daxistî hilbijêre.
6. Dema ku tê xwestin, sazkirinê pejirîne.

---

## Sazkirin ji bo pêşdebirin {#installation-for-development}

### Daxistina depoyê {#download-the-repository}

1. Wersiyona dawî ya depoyê li ser GitHubê daxe.
2. Ji bo agahdariya zêdetir `make help` bixebitîne.

### Sazkirin di Thunderbird de {#install-in-thunderbird-dev}

1. Thunderbird veke.
2. Here **Tools > Add-ons and Themes**.
3. Di **Add-ons Manager** de, li kûna jor-rastê îkona çarxê bikirtîne.
4. Ji pêşeka hilbijartinan re **Install Add-on From File…** hilbijêre.
5. Pelê `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ya hatî afirandin hilbijêre.
6. Dema ku tê xwestin, sazkirinê pejirîne.

Nîşe: Heke Thunderbird di pergalê te de `.zip` qebûl neke, navê wê biguherîne `.xpi` û dîsa “Install Add‑on From File…” biceribîne.

### Li ku ZIP a LOCAL bibînin {#where-local-zip}

- Pêşî, pêvekê pakêt bike: di kokê depoyê de `make pack` bixebitîne.
- Piştî pakêt kirinê, ZIP‑a “LOCAL” di kokê depoyê de bibîne (mînak, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Berî ji bo ceribandinê careke din pakêt bikî, hejmarên guhertoyan di herdu `sources/manifest_ATN.json` û `sources/manifest_LOCAL.json` de berz bike.

---

## Neçalakkirin, Rakirin, û Nûvekirin {#disable-uninstall-updates}

- Neçalakkirin: Thunderbird → Tools → Add‑ons and Themes → pêvekê bibîne → toggle off.
- Rakirin: heman dîtin → pêşeka sê‑xalî → Remove.
- Nûvekirin: Dema guhertoyên nû pejirandî bibin, sazkirinên ji ATNê nûvekirina bixweber distînin. Sazkirinên LOCAL/dev nûvekirina bixweber nake; bi destanî avakirina LOCAL ya nû careke din saz bike.
- Rêzeyên mîhengê temamen rake: bibîne [Taybetî → Rakirina daneyan](privacy#data-removal).

Her weha bibîne

- [Destpêka zû](quickstart)
