---
id: support
title: 'Podpora'
sidebar_label: 'Podpora'
---

## FAQ {#faq}

### Přílohy nebyly přidány — proč?

- Inline obrázky a S/MIME části jsou záměrně vyloučeny.
- Duplicitní názvy souborů jsou přeskočeny, pokud zpráva již obsahuje stejný soubor.
- Vzorové černé listiny mohou filtrovat kandidáty; viz [Konfigurace](configuration#blacklist-glob-patterns).

### Mohu potvrdit před přidáním příloh?

Ano. Aktivujte „Zeptej se před přidáním příloh“ v [Konfiguraci → Potvrzení](configuration#confirmation). Klávesnice: Y/J = Ano, N/Esc = Ne.

### Odesílá doplněk nějaká data nebo sleduje použití?

Ne. Viz [Ochrana soukromí](privacy) — žádná telemetrie a žádné požadavky na pozadí.

### Přeposlání nepřidává přílohy — je to očekávané?

Ano. Pouze Odpovědět a Odpovědět všem jsou tímto doplňkem upraveny; Přeposlání zůstává nezměněno. Viz [Omezení](usage#limitations).

### Kde je možnost Darovat?

Možnosti → Sekce Podpora. Viz [Viditelnost daru](configuration#donation-visibility).

---

## Podpora

Potřebujete pomoc nebo chcete nahlásit chybu?

---

### Otevřít problém na GitHubu:

- Repozitář: `bitranox/Thunderbird-Reply-with-Attachments`
- Problémy: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Zahrňte verzi Thunderbirdu (např. 128 ESR), OS a kroky k reprodukci
- Přiložte relevantní protokoly z Konzole chyb Thunderbirdu (Nástroje → Nástroje pro vývojáře → Konzola chyb)

- Stránka doplňků (ATN): Můžete také zanechat zpětnou vazbu prostřednictvím [stránky doplňků](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tipy

- Ujistěte se, že používáte podporovanou verzi Thunderbirdu (128 ESR nebo novější).
- Zkontrolujte dokumentaci k Nastavení a Použití pro běžné otázky ohledně nastavení.
- Pro vývoj/testování si přečtěte průvodce vývojem.
- Pokud se zdá, že uložená nastavení se neaplikují správně, restartujte Thunderbird a zkuste to znovu. (Thunderbird může cache stav mezi relacemi; restart zajistí, že se načtou nová nastavení.)
- Minimální repro: vyzkoušejte s malým testovacím e-mailem obsahujícím jednu nebo dvě jednoduché přílohy.
- Porovnejte chování s potvrzením ZAPNUTO vs. VYPNUTO, abyste zjistili, zda je zapojen dialogový tok.

---

### Co zahrnout do zprávy

- Verze Thunderbirdu a OS
- Přesné kroky k reprodukci (co jste udělali, co jste očekávali, co se stalo)
- Zda bylo potvrzení povoleno a vaše nastavení výchozí odpovědi
- Ukázku vašich vzorů černé listiny (pokud je relevantní)
- Protokolet Konzoly chyb při reprodukci (Nástroje → Nástroje pro vývojáře → Konzola chyb)
- Povolit debug logging (volitelné):
  - Spusťte v Konzole chyb Thunderbirdu: `messenger.storage.local.set({ debug: true })`
  - Reprodukujte problém a zkopírujte relevantní řádky protokolu `[RWA]`

---

### Šablona problému (kopírovat/vložit) {#issue-template}

- Verze Thunderbirdu a OS:
- Kroky k reprodukci:
- Potvrzení povoleno? Výchozí odpověď:
- Ukázkové vzory černé listiny:
- Protokolet Konzoly chyb (Nástroje → Nástroje pro vývojáře → Konzola chyb):
- Cokoli jiného relevantního:

---

### Darovat

Pokud byste chtěli podpořit tento projekt, zvažte prosím malý příspěvek na stránce [Darovat](donation). Děkujeme!
