---
id: install
title: 'Inštalácia'
slug: /install
sidebar_label: 'Inštalácia'
---

---

## Inštalácia cez „Doplnky a témy Thunderbird“ {#installation-in-thunderbird-recommended}

:::important Minimálna verzia Thunderbirdu
Tento doplnok podporuje Thunderbird **128 ESR alebo novší**. Staršie verzie nie sú podporované.
:::

Toto je odporúčaný spôsob inštalácie. Doplnky nainštalované z ATN (addons.thunderbird.net) dostávajú automatické aktualizácie. Lokálne/dev inštalácie sa neaktualizujú automaticky.

- Minimálna verzia Thunderbirdu: 128 ESR alebo novšia.

1. V Thunderbirde prejdite do **Nástroje > Doplnky a témy**.
2. Vyhľadajte „reply with attachments“.
3. Pridajte doplnok.

Alebo otvorte stránku doplnku priamo: [Doplnky Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Manuálna inštalácia z XPI {#local-installation-in-thunderbird}

### Stiahnite súbor XPI {#download-the-xpi-file}

1. Prejdite na [stránku doplnku Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Stiahnite si najnovšiu verziu doplnku ako súbor XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Inštalácia v Thunderbirde {#install-in-thunderbird-local}

1. Otvorte Thunderbird.
2. Prejdite do **Nástroje > Doplnky a témy**.
3. V **Správcovi doplnkov** kliknite na ikonu ozubeného kolieska vpravo hore.
4. V menu zvoľte **Nainštalovať doplnok zo súboru…**.
5. Vyberte stiahnutý súbor `reply_with_attachments-x.y.z-tb.xpi`.
6. Pri zobrazení výzvy potvrďte inštaláciu.

---

## Inštalácia pre vývoj {#installation-for-development}

### Stiahnite repozitár {#download-the-repository}

1. Stiahnite si najnovšiu verziu repozitára na GitHube.
2. Spustite `make help` pre ďalšie informácie.

### Inštalácia v Thunderbirde {#install-in-thunderbird-dev}

1. Otvorte Thunderbird.
2. Prejdite do **Nástroje > Doplnky a témy**.
3. V **Správcovi doplnkov** kliknite na ikonu ozubeného kolieska vpravo hore.
4. V menu zvoľte **Nainštalovať doplnok zo súboru…**.
5. Vyberte vygenerovaný súbor `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Pri zobrazení výzvy potvrďte inštaláciu.

Poznámka: Ak Thunderbird na vašom systéme neprijme `.zip`, premenujte ho na `.xpi` a skúste znova „Nainštalovať doplnok zo súboru…“.

### Kde nájsť LOCAL ZIP {#where-local-zip}

- Najprv zabaľte doplnok: v koreňovom adresári repozitára spustite `make pack`.
- Po zabalení nájdete „LOCAL“ zip v koreňovom adresári repozitára (napr. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Pred opätovným zabalením na testovanie zvýšte čísla verzií v súboroch `sources/manifest_ATN.json` aj `sources/manifest_LOCAL.json`.

---

## Zakázanie, odinštalovanie a aktualizácie {#disable-uninstall-updates}

- Zakázať: Thunderbird → Nástroje → Doplnky a témy → nájdite doplnok → vypnite prepínač.
- Odinštalovať: to isté zobrazenie → menu s tromi bodkami → Odstrániť.
- Aktualizácie: inštalácie z ATN sa automaticky aktualizujú po schválení nových verzií. Lokálne/dev inštalácie sa neaktualizujú automaticky; novú verziu LOCAL nainštalujte manuálne.
- Úplné odstránenie nastavení: pozrite [Súkromie → Odstránenie údajov](privacy#data-removal).

Pozrite tiež

- [Rýchly štart](quickstart)
