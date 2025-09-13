---
id: install
title: 'Inštalácia'
slug: /install
sidebar_label: 'Inštalácia'
---

## Inštalácia cez "Doplnky a témy Thunderbirdu" {#installation-in-thunderbird-recommended}

:::important Minimálna verzia Thunderbirdu
Tento doplnok podporuje Thunderbird **128 ESR alebo novší**. Staršie verzie nie sú podporované.
:::

Toto je odporúčaná metóda inštalácie. Doplnky nainštalované z ATN (addons.thunderbird.net) dostávajú automatické aktualizácie. Lokálne/dev inštalácie sa neaktualizujú automaticky.

- Minimálna verzia Thunderbirdu: 128 ESR alebo novší.

1. V Thunderbirde prejdite na **Nástroje > Doplnky a témy**.
2. Vyhľadajte "odpovedať s prílohami".
3. Pridajte doplnok.

Alebo otvorte stránku doplnku priamo: [Doplnky Thunderbirdu (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuálna inštalácia z XPI {#local-installation-in-thunderbird}

### Stiahnite súbor XPI {#download-the-xpi-file}

1. Prejdite na [stránku doplnku Thunderbirdu](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Stiahnite najnovšiu verziu doplnku ako súbor XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Inštalácia do Thunderbirdu {#install-in-thunderbird-local}

1. Otvorenie Thunderbirdu.
2. Prejdite na **Nástroje > Doplnky a témy**.
3. V **Správcovi doplnkov** kliknite na ikonu ozubeného kola v pravom hornom rohu.
4. Z ponuky vyberte **Inštalovať doplnok zo súboru...**.
5. Vyberte stiahnutý súbor `reply_with_attachments-x.y.z-tb.xpi`.
6. Potvrďte inštaláciu, keď sa zobrazí výzva.

---

## Inštalácia pre vývoj {#installation-for-development}

### Stiahnite repozitár {#download-the-repository}

1. Stiahnite najnovšiu verziu repozitára z GitHubu.
2. Spustite `make help` pre viac informácií.

### Inštalácia do Thunderbirdu {#install-in-thunderbird-dev}

1. Otvorenie Thunderbirdu.
2. Prejdite na **Nástroje > Doplnky a témy**.
3. V **Správcovi doplnkov** kliknite na ikonu ozubeného kola v pravom hornom rohu.
4. Z ponuky vyberte **Inštalovať doplnok zo súboru...**.
5. Vyberte vygenerovaný súbor `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potvrďte inštaláciu, keď sa zobrazí výzva.

Poznámka: Ak Thunderbird neprijme `.zip` vo vašom systéme, premenovajte ho na `.xpi` a skúste znova “Inštalovať doplnok zo súboru...”.

### Kde nájsť LOCAL ZIP {#where-local-zip}

- Najprv zabalte doplnok: spustite `make pack` v koreňovom adresári repozitára.
- Po zabalení nájdete “LOCAL” zip v koreňovom adresári repozitára (napr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pred opätovným balením na testovanie zvýšte verzie v oboch `sources/manifest_ATN.json` a `sources/manifest_LOCAL.json`.

---

## Zakázať, odinštalovať a aktualizácie {#disable-uninstall-updates}

- Zakázať: Thunderbird → Nástroje → Doplnky a témy → nájdite doplnok → vypnite.
- Odinštalovať: rovnaký pohľad → ponuka troch bodiek → Odstrániť.
- Aktualizácie: ATN inštalácie sa automaticky aktualizujú, keď sú nové verzie schválené. Lokálne/dev inštalácie sa neaktualizujú automaticky; reinstalujte novú lokálnu verziu manuálne.
- Úplne odstrániť nastavenia: pozrite [Ochrana súkromia → Odstránenie dát](privacy#data-removal).

Pozrite tiež

- [Rýchly začiatok](quickstart)
