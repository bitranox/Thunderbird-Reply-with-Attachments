---
id: usage
title: 'Použití'
sidebar_label: 'Použití'
---

---

## Použití {#usage}

- Odpovězte a doplněk přidá původní přílohy automaticky — nebo se nejprve zeptá, pokud je to povoleno v Možnostech.
- Duplicity se odstraňují podle názvu souboru; části S/MIME se vždy přeskočí. Obrázky vložené do původní zprávy zůstávají v těle odpovědi, kam je umístí Thunderbird, a nejsou kopírovány jako soubory.
- Přílohy na černé listině se také přeskočí (glob vzory bez rozlišování velikosti písmen porovnávající názvy souborů, nikoli cesty). Viz [Konfigurace](configuration#blacklist-glob-patterns).

---

### Co se děje při odpovědi {#what-happens}

- Rozpoznat odpověď → vypsat původní přílohy → přeskočit S/MIME a vložené obrázky → volitelné potvrzení → přidat vyhovující soubory (s přeskočením duplicit).

| Typ části                                              | Kopíruje se do odpovědi |
|--------------------------------------------------------|------------------------:|
| Soubor podpisu S/MIME `smime.p7s`                      | Ne                      |
| Typy MIME pro S/MIME (`application/pkcs7-*`)           | Ne                      |
| Obrázek vložený tělem zprávy pomocí `cid:`             | Ne (je v těle)          |
| Obrázek označený jako `Content-Disposition: inline`    | Ne (je v těle)          |
| Obrázek s `Content-ID`, na který tělo nikdy neodkazuje | Ano                     |
| Přiložený e-mail (`message/rfc822`) s názvem souboru   | Ano                     |
| Běžná příloha souboru s názvem souboru                 | Ano                     |

Obrázek se počítá jako vložený pouze tehdy, když na něj původní zpráva skutečně odkazuje,
nebo když jej odesílatel výslovně označil jako `Content-Disposition: inline`. Pouhá
hlavička `Content-ID` nestačí: mnoho e-mailových klientů ji umisťuje na každou obrázkovou část,
včetně skutečných příloh, a ty je přesto nutné zkopírovat.

---

### Křížové odkazy {#cross-reference}

- Přeposílání není záměrně upravováno (viz omezení níže).
- Důvody, proč příloha nemusí být přidána, viz „Proč přílohy nemusí být přidány“.

---

## Podrobnosti chování {#behavior-details}

- **Zabránění duplicitám:** Doplněk označí kartu pro psaní zprávy jako zpracovanou pomocí hodnoty relace na kartu a ochrany v paměti. Nepřidá původní přílohy dvakrát.
- Zavření a znovuotevření okna pro psaní se považuje za novou kartu (tj. je povolen nový pokus).
- **Respektování existujících příloh:** Pokud editor již obsahuje nějaké přílohy, původní se přesto přidají právě jednou; názvy souborů, které již existují, se přeskočí.
- **Vyloučení:** Artefakty S/MIME a vložené obrázky jsou ze souborových příloh vyloučeny. Pokud v prvním průchodu nic neprojde, uvolněný záložní režim znovu zkontroluje ne‑S/MIME části. Vložené obrázky se zpracovávají zvlášť: jsou obnoveny v těle odpovědi jako datová URI (je‑li povoleno).
  - **Názvy souborů:** `smime.p7s`
  - **Typy MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Vložené obrázky:** jakákoli část `image/*` odkazovaná přes Content‑ID — vyloučeno ze souborových příloh, ale vloženo do těla odpovědi, když je "Include inline pictures" ZAPNUTO
  - **Přiložené e‑maily (`message/rfc822`):** jsou považovány za běžné přílohy, pokud mají název souboru; mohou být přidány (s ohledem na kontroly duplicit a černou listinu).
- **Upozornění na černou listinu (je‑li povoleno):** Když jsou kandidáti vyloučeni vaší černou listinou,
  doplněk zobrazí malé modální okno se seznamem dotčených souborů a odpovídajících
  vzorů. Toto upozornění se objeví i v případech, kdy nebudou přidány žádné přílohy,
  protože bylo vše vyloučeno.

---

## Klávesové zkratky {#keyboard-shortcuts}

- Dialog s potvrzením: Y/J = Ano, N/Esc = Ne; Tab/Shift+Tab a šipky cyklují fokus.
  - „Default answer“ v [Konfiguraci](configuration#confirmation) nastaví výchozí zaměření tlačítka.
  - Enter aktivuje zaměřené tlačítko. Tab/Shift+Tab a šipky přesouvají fokus pro přístupnost.

### Přehled klávesových zkratek {#keyboard-cheat-sheet}

| Klávesy         | Akce                                  |
|-----------------|---------------------------------------|
| Y / J           | Potvrdit Ano                          |
| N / Esc         | Potvrdit Ne                           |
| Enter           | Aktivovat zaměřené tlačítko           |
| Tab / Shift+Tab | Přesunout fokus vpřed/zpět            |
| Šipky           | Přesunout fokus mezi tlačítky         |
| Výchozí odpověď | Nastaví počáteční fokus (Ano nebo Ne) |

---

## Omezení {#limitations}

- Přeposílání tento doplněk neupravuje (podporováno je Odpovědět a Odpovědět všem).
- Velmi velké přílohy mohou podléhat limitům Thunderbirdu nebo poskytovatele.
  - Doplněk soubory nedělí na části ani nekomprimuje; spoléhá se na běžnou práci Thunderbirdu s přílohami.
- Šifrované zprávy: části S/MIME jsou záměrně vyloučeny.

---

## Proč přílohy nemusí být přidány {#why-attachments-might-not-be-added}

- Obrázky, které vkládá původní zpráva, se nekopírují jako soubory. Už jsou v těle odpovědi, kam je Thunderbird umístil. Viz [Konfigurace](configuration#include-inline-pictures).
- Části podpisu S/MIME jsou z principu vyloučeny: názvy souborů jako `smime.p7s` a typy MIME jako `application/pkcs7-signature` nebo `application/pkcs7-mime` se přeskočí.
- Vzory černé listiny mohou kandidáty filtrovat: viz [Konfigurace](configuration#blacklist-glob-patterns); porovnává se bez rozlišování velikosti písmen a pouze podle názvu souboru.
- Duplicitní názvy souborů se znovu nepřidávají: pokud editor již obsahuje soubor se stejným normalizovaným názvem, je přeskočen.
- Nesouborové části nebo chybějící názvy: k přidání se zvažují pouze části podobné souborům s použitelnými názvy.

---

Viz také

- [Konfigurace](configuration)
