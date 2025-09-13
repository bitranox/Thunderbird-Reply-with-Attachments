---
id: support
title: 'Podpora'
sidebar_label: 'Podpora'
---

## FAQ {#faq}

### Prílohy sa ne pridali — prečo?

- Vložené obrázky a S/MIME časti sú zámerne vylúčené.
- Duplicitné názvy súborov sú preskočené, ak už má zloženie rovnaký súbor.
- Blokovacie vzory môžu filtrovať kandidátov; pozri [Konfigurácia](configuration#blacklist-glob-patterns).

### Môžem potvrdiť pred pridaním príloh?

Áno. Aktivujte „Spýtať sa pred pridaním príloh“ pod [Konfigurácia → Potvrdenie](configuration#confirmation). Klávesnica: Y/J = Áno, N/Esc = Nie.

### Posiela doplnok akékoľvek údaje alebo sleduje používanie?

Nie. Pozri [Ochrana súkromia](privacy) — žiadna telemetria a žiadne pozadie sieťové požiadavky.

### Preposlanie nepridáva prílohy — je to očakávané?

Áno. Iba Odpovedať a Odpovedať všetkým sú upravené týmto doplnkom; Preposlať zostáva nezmenené. Pozri [Obmedzenia](usage#limitations).

### Kde je snooze pre darovanie?

Možnosti → Sekcia Podpora. Pozri [Viditeľnosť darovania](configuration#donation-visibility).

---

## Podpora

Potrebujete pomoc alebo chcete nahlásiť chybu?

---

### Otvorte problém na GitHube:

- Repozitár: `bitranox/Thunderbird-Reply-with-Attachments`
- Problémy: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Zahrňte verziu Thunderbirdu (napr. 128 ESR), OS a kroky na reprodukciu
- Priložte príslušné denníky z Chybovej konzoly Thunderbirdu (Nástroje → Vývojárske nástroje → Chybová konzola)

- Stránka doplnkov (ATN): Feedback môžete zanechať aj cez [stránku doplnku](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tipy

- Uistite sa, že máte podporovanú verziu Thunderbirdu (128 ESR alebo novšiu).
- Skontrolujte dokumenty o Konfigurácii a Používaní pre bežné otázky týkajúce sa nastavenia.
- Pre vývoj/testovanie si pozrite Príručku pre vývoj.
- Ak sa zdá, že uložené nastavenia neaplikujú správne, reštartujte Thunderbird a skúste znova. (Thunderbird môže uchovávať stav medzi reláciami; reštart zabezpečí, že sa načítajú nové nastavenia.)
- Minimálna reprodukcia: skúste s malým testovacím emailom obsahujúcim jeden alebo dva jednoduché súbory príloh.
- Porovnajte správanie s potvrdením ZAPNUTÉ vs. VYPNUTÉ, aby ste prišli na to, či je zasiahnutý tok dialógu.

---

### Čo zahrnúť do správy

- Verziu Thunderbirdu a OS
- Presné kroky na reprodukciu (čo ste urobili, čo ste očakávali, čo sa stalo)
- Či bolo potvrdenie povolené a vaše predvolené nastavenie odpovede
- Vzor vášho blacklistu (ak je relevantný)
- Záznamy Chybovej konzoly počas reprodukcie (Nástroje → Vývojárske nástroje → Chybová konzola)
- Povoliť podrobné denníkovanie (voliteľné):
  - Spustiť v Chybovej konzole Thunderbirdu: `messenger.storage.local.set({ debug: true })`
  - Reprodukujte problém a skopírujte relevantné riadky denníka `[RWA]`

---

### Šablóna problému (kopírovať/vložiť) {#issue-template}

- Verzia Thunderbirdu a OS:
- Kroky na reprodukciu:
- Potvrdenie povolené? Predvolené odpovede:
- Vzory blacklistu:
- Záznamy Chybovej konzoly (Nástroje → Vývojárske nástroje → Chybová konzola):
- Niečo iné relevantné:

---

### Darovať

Ak by ste chceli podporiť tento projekt, zvážte malý príspevok na stránke [Darovanie](donation). Ďakujeme!
