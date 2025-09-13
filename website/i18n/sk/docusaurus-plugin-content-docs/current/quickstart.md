---
id: quickstart
title: 'Rýchly začiatok'
sidebar_label: 'Rýchly začiatok'
---

## Rýchly začiatok

:::important Minimálna verzia Thunderbirdu
Tento doplnok podporuje Thunderbird **128 ESR alebo novší**. Staršie verzie nie sú podporované.
:::

:::note Žiadna telemetria; žiadna sieť na pozadí
Doplnok **nezhromažďuje** analýzy/telemetriu a **nevykonáva** žiadne sieťové požiadavky na pozadí. Prístup na sieť sa uskutoční iba vtedy, keď kliknete na externé odkazy (Dokumenty, GitHub, Darovať).
:::

---

### Inštalácia

1. Nainštalujte doplnok z Doplnkov Thunderbirdu.
2. Voliteľné: Povoľte potvrdenie (Možnosti → „Pýtať sa pred pridaním príloh“).
3. Voliteľné: Nechajte varovanie o čiernej listine povolené (predvolené): „Varovať, ak sú prílohy vylúčené čiernou listinou“.
4. Voliteľné: Pridajte vzory čiernej listiny (jeden na riadok), napr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Poznámka: „# …“ vyššie je komentár v tejto dokumentácii; nezahŕňajte komentáre do vzorov, ktoré vkladáte do Možností. Zadajte iba jeden vzor na riadok.

Teraz odpovedzte na správu s prílohami — originály budú pridané automaticky alebo po rýchlom potvrdení. Ak sú nejaké súbory vylúčené vašou čiernou listinou, zobrazí sa krátke varovanie, ktoré ich uvedie.

---

### Overiť {#verify}

- Odpovedzte na správu s 1–2 prílohami a potvrďte, že originály sú pridané do vášho okna na písanie.
- Pre úpravu správania sa pozrite na [Konfigurácia](configuration) (prepínač potvrdenia, predvolená odpoveď, vzory čiernej listiny).

---

### Overiť varovanie o čiernej listine {#verify-blacklist-warning}

- Odpovedzte na správu obsahujúcu súbor ako „secret.txt“.
- So zapnutým „Varovať, ak sú prílohy vylúčené čiernou listinou“ sa zobrazí malé dialógové okno s vylúčenými súbormi a zhodným vzorom.

Ak nevidíte varovanie, uistite sa, že vzor presne zodpovedá názvu súboru (iba názov súboru, bez ohľadu na veľkosť písmen). Pozrite sa na Konfigurácia → Čierna listina.

---

### Poznámka o klávesnici {#keyboard-note}

- Dialógové okno potvrdenia podporuje Y/J pre Áno a N/Esc pre Nie. Na niektorých ne-latinských klávesniciach sa písmená môžu líšiť; Enter potvrdí zvolenú tlačidlo.
