---
id: quickstart
title: 'Rýchly štart'
sidebar_label: 'Rýchly štart'
---

---

## Rýchly štart

:::important Minimálna verzia Thunderbirdu
Tento doplnok podporuje Thunderbird **128 ESR alebo novší**. Staršie verzie nie sú podporované.
:::

:::note Žiadna telemetria; žiadne sieťové pripojenia na pozadí
Doplnok **nezbiera** analytiku/telemetriu a nevykonáva **žiadne** sieťové požiadavky na pozadí. Prístup na sieť nastáva len vtedy, keď kliknete na externé odkazy (Dokumentácia, GitHub, Darovať).
:::

---

### Inštalácia

1. Nainštalujte doplnok z Thunderbird Add‑ons.
2. Voliteľné: Zapnite potvrdenie (Možnosti → „Opýtať sa pred pridaním príloh“).
3. Voliteľné: Nechajte zapnuté varovanie čiernej listiny (predvolené): „Upozorniť, ak sú prílohy vylúčené čiernou listinou“.
4. Voliteľné: Pridajte vzory čiernej listiny (jeden na riadok), napr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Poznámka: „# …“ vyššie je komentár v tejto dokumentácii; do vzorov, ktoré vkladáte do Možností, nepridávajte komentáre. Zadajte len jeden vzor na jeden riadok.

Teraz odpovedzte na správu s prílohami — originály budú pridané automaticky alebo po rýchlom potvrdení. Ak niektoré súbory vylúči vaša čierna listina, zobrazí sa krátke upozornenie s ich zoznamom.

---

### Overenie {#verify}

- Odpovedzte na správu s 1–2 prílohami a overte, že originály sú pridané do okna písania správy.
- Ak chcete upraviť správanie, pozrite [Konfiguráciu](configuration) (prepínač potvrdenia, predvolená odpoveď, vzory čiernej listiny).

---

### Overenie varovania čiernej listiny {#verify-blacklist-warning}

- Odpovedzte na správu obsahujúcu súbor, napríklad „secret.txt“.
- Keď je zapnuté „Upozorniť, ak sú prílohy vylúčené čiernou listinou“, malé dialógové okno vypíše vylúčené súbory a zodpovedajúci vzor.

Ak upozornenie nevidíte, uistite sa, že vzor presne zodpovedá názvu súboru (iba názov súboru, nerozlišuje sa veľkosť písmen). Pozrite Konfigurácia → Čierna listina.

---

### Poznámka ku klávesnici {#keyboard-note}

- Dialóg potvrdenia podporuje Y/J pre Áno a N/Esc pre Nie. Na niektorých nelatinských klávesniciach sa písmenové klávesy môžu líšiť; Enter potvrdí aktuálne zamerané tlačidlo.

---
