---
id: install
title: 'Instalace'
slug: /install
sidebar_label: 'Instalace'
---

---

## Instalace přes „Doplňky a motivy Thunderbirdu“ {#installation-in-thunderbird-recommended}

:::important Minimální verze Thunderbirdu
Tento doplněk podporuje Thunderbird **128 ESR nebo novější**. Starší verze nejsou podporovány.
:::

Toto je doporučený způsob instalace. Doplňky nainstalované z ATN (addons.thunderbird.net) dostávají automatické aktualizace. Instalace LOCAL/dev se neaktualizují automaticky.

- Minimální verze Thunderbirdu: 128 ESR nebo novější.

1. V Thunderbirdu přejděte na **Nástroje > Doplňky a motivy**.
2. Vyhledejte „reply with attachments“.
3. Přidejte doplněk.

Nebo otevřete stránku doplňku přímo: [Doplňky Thunderbirdu (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ruční instalace z XPI {#local-installation-in-thunderbird}

### Stáhněte soubor XPI {#download-the-xpi-file}

1. Přejděte na [stránku doplňku Thunderbirdu](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Stáhněte si nejnovější verzi doplňku jako soubor XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalace v Thunderbirdu {#install-in-thunderbird-local}

1. Otevřete Thunderbird.
2. Přejděte na **Nástroje > Doplňky a motivy**.
3. V **Správci doplňků** klikněte na ikonu ozubeného kola vpravo nahoře.
4. V nabídce zvolte **Nainstalovat doplněk ze souboru…**.
5. Vyberte stažený soubor `reply_with_attachments-x.y.z-tb.xpi`.
6. Po zobrazení výzvy potvrďte instalaci.

---

## Instalace pro vývoj {#installation-for-development}

### Stažení repozitáře {#download-the-repository}

1. Stáhněte si nejnovější verzi repozitáře na GitHubu.
2. Spusťte `make help` pro více informací.

### Instalace v Thunderbirdu {#install-in-thunderbird-dev}

1. Otevřete Thunderbird.
2. Přejděte na **Nástroje > Doplňky a motivy**.
3. V **Správci doplňků** klikněte na ikonu ozubeného kola vpravo nahoře.
4. V nabídce zvolte **Nainstalovat doplněk ze souboru…**.
5. Vyberte vygenerovaný soubor `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Po zobrazení výzvy potvrďte instalaci.

Poznámka: Pokud Thunderbird na vašem systému nepřijme `.zip`, přejmenujte jej na `.xpi` a zkuste znovu „Nainstalovat doplněk ze souboru…“.

### Kde najít LOCAL ZIP {#where-local-zip}

- Nejprve zabalte doplněk: v kořenu repozitáře spusťte `make pack`.
- Po zabalení najdete soubor zip „LOCAL“ v kořenu repozitáře (např. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Před opětovným zabalením pro testování zvyšte verze jak v `sources/manifest_ATN.json`, tak v `sources/manifest_LOCAL.json`.

---

## Zakázání, odinstalace a aktualizace {#disable-uninstall-updates}

- Zakázat: Thunderbird → Nástroje → Doplňky a motivy → najděte doplněk → vypněte přepínačem.
- Odinstalovat: stejný pohled → nabídka se třemi tečkami → Odebrat.
- Aktualizace: instalace z ATN se automaticky aktualizují, když jsou schváleny nové verze. Instalace LOCAL/dev se neaktualizují automaticky; nové sestavení LOCAL nainstalujte ručně.
- Úplné odstranění nastavení: viz [Soukromí → Odstranění dat](privacy#data-removal).

Viz také

- [Rychlý start](quickstart)
