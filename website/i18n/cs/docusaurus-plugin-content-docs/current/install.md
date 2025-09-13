---
id: install
title: 'Instalace'
slug: /install
sidebar_label: 'Instalace'
---

## Instalace pomocí "Thunderbird doplňků a motivů" {#installation-in-thunderbird-recommended}

:::important Minimální verze Thunderbirdu
Tento doplněk podporuje Thunderbird **128 ESR nebo novější**. Starší verze nejsou podporovány.
:::

Toto je doporučená metoda instalace. Doplňky instalované z ATN (addons.thunderbird.net) dostávají automatické aktualizace. Instalace LOCAL/dev se neaktualizují automaticky.

- Minimální verze Thunderbirdu: 128 ESR nebo novější.

1. V Thunderbirdu přejděte na **Nástroje > Doplňky a motivy**.
2. Hledejte "odpovědět s přílohami".
3. Přidejte doplněk.

Nebo otevřete stránku doplňku přímo: [Thunderbird Doplňky (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ruční instalace z XPI {#local-installation-in-thunderbird}

### Stáhněte soubor XPI {#download-the-xpi-file}

1. Přejděte na [stránku doplňku Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Stáhněte nejnovější verzi doplňku jako soubor XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalace v Thunderbirdu {#install-in-thunderbird-local}

1. Otevřete Thunderbird.
2. Přejděte na **Nástroje > Doplňky a motivy**.
3. V **Správci doplňků** klikněte na ikonu ozubeného kola v pravém horním rohu.
4. Z nabídky vyberte **Nainstalovat doplněk ze souboru…**.
5. Vyberte stažený soubor `reply_with_attachments-x.y.z-tb.xpi`.
6. Potvrďte instalaci, když budete vyzváni.

---

## Instalace pro vývoj {#installation-for-development}

### Stáhněte repozitář {#download-the-repository}

1. Stáhněte nejnovější verzi repozitáře GitHub.
2. Spusťte `make help` pro více informací.

### Instalace v Thunderbirdu {#install-in-thunderbird-dev}

1. Otevřete Thunderbird.
2. Přejděte na **Nástroje > Doplňky a motivy**.
3. V **Správci doplňků** klikněte na ikonu ozubeného kola v pravém horním rohu.
4. Z nabídky vyberte **Nainstalovat doplněk ze souboru…**.
5. Vyberte vygenerovaný soubor `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrďte instalaci, když budete vyzváni.

Poznámka: Pokud Thunderbird nepřijme `.zip` na vašem systému, přejmenujte ho na `.xpi` a zkuste "Nainstalovat doplněk ze souboru…" znovu.

### Kde najít LOCAL ZIP {#where-local-zip}

- Nejprve zabalte doplněk: spusťte `make pack` v kořenovém adresáři repozitáře.
- Po zabalení najděte "LOCAL" zip v kořenovém adresáři repozitáře (např. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Před opětovným zabalením pro testování zvyšte verze v `sources/manifest_ATN.json` a `sources/manifest_LOCAL.json`.

---

## Zakázání, odinstalace a aktualizace {#disable-uninstall-updates}

- Zakázat: Thunderbird → Nástroje → Doplňky a motivy → najděte doplněk → přepněte na vypnuto.
- Odinstalovat: stejné zobrazení → nabídka tří teček → Odebrat.
- Aktualizace: Instalace ATN se automaticky aktualizují, když jsou nové verze schváleny. Instalace LOCAL/dev se neaktualizují automaticky; novou LOCAL sestavu nainstalujte ručně.
- Úplné odstranění nastavení: viz [Ochrana soukromí → Odstranění dat](privacy#data-removal).

Viz také

- [Rychlý start](quickstart)
