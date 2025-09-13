---
id: usage
title: 'Použití'
sidebar_label: 'Použití'
---

## Usage {#usage}

- Odpověď a doplněk automaticky přidá originály — nebo nejprve požádá, pokud je to povoleno v možnostech.
- Odstraněno zdvojení podle názvu souboru; S/MIME a inline obrázky jsou vždy přeskočeny.
- Přílohy na černé listině jsou také přeskočeny (velké vzory bez ohledu na velká/malá písmena, které odpovídají názvům souborů, nikoli cestám). Viz [Konfigurace](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Detekce odpovědi → seznam původních příloh → filtr S/MIME + inline → volné potvrzení → přidat způsobilé soubory (přeskočit duplicity).

Přísné vs. uvolněné provedení: Doplněk nejprve vylučuje S/MIME a inline části. Pokud nic nevyhovuje, spustí uvolněné provedení, které stále vylučuje S/MIME/inline, ale toleruje více případů (viz Detaily kódu).

| Typ části                                            |  Přísné provedení | Uvolněné provedení |
| ---------------------------------------------------- | ----------------: | -----------------: |
| S/MIME podpisový soubor `smime.p7s`                  |         Vyloučeno |          Vyloučeno |
| S/MIME MIME typy (`application/pkcs7-*`)             |         Vyloučeno |          Vyloučeno |
| Inline obrázek odkázaný na Content‑ID (`image/*`)    |         Vyloučeno |          Vyloučeno |
| Připojený e-mail (`message/rfc822`) s názvem souboru |        Nezahrnuto |  Může být zahrnuto |
| Připojený pravidelný soubor se jménem souboru        | Může být zahrnuto |  Může být zahrnuto |

Příklad: Některé přílohy nemusí mít určité hlavičky, ale stále jsou to běžné soubory (ne inline/S/MIME). Pokud přísné provedení nenalezne žádný, uvolněné provedení může akceptovat tyto a připojit je.

---

### Cross‑reference {#cross-reference}

- Odpověď není měněna záměrně (viz Omezení níže).
- Důvody, proč by příloha nemusela být přidána, naleznete v části „Proč přílohy mohou být nepřidány“.

---

## Behavior Details {#behavior-details}

- **Prevence zdvojení:** Doplněk označuje záložku pro psaní jako zpracovanou pomocí hodnoty relace pro každou záložku a ochranou v paměti. Nestane se, že by přidal originály dvakrát.
- Uzavření a opětovné otevření okna pro psaní se považuje za novou záložku (tj. je povolen nový pokus).
- **Respektování existujících příloh:** Pokud již kompozice obsahuje některé přílohy, originály jsou stále přidávány přesně jednou, a to bez názvů souborů, které již existují.
- **Vyloučení:** S/MIME artefakty a inline obrázky jsou ignorovány. Pokud nic nevyhovuje během prvního provedení, uvolněné znovuprůzkumy kontrolují části, které nejsou S/MIME.
  - **Názvy souborů:** `smime.p7s`
  - **MIME typy:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline obrázky:** jakákoliv `image/*` část odkazovaná na Content‑ID v těle zprávy
  - **Připojené e-maily (`message/rfc822`):** zpracovány jako běžné přílohy, pokud mají název souboru; mohou být přidány (s podmínkou kontroly duplikátů a černé listiny).
- **Varování o černé listině (pokud je povoleno):** Když jsou kandidáti vyloučeni vaší černou listinou, doplněk zobrazí malý modální okno se seznamem postižených souborů a odpovídajícími vzory. Toto varování se rovněž objevuje v případech, kdy nebudou přidány žádné přílohy, protože vše bylo vyloučeno.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Potvrzovací dialog: Y/J = Ano, N/Esc = Ne; Tab/Shift+Tab a šipkové klávesy cyklují zaměření.
  - „Výchozí odpověď“ v [Konfiguraci](configuration#confirmation) nastavuje počátečně zaměřené tlačítko.
  - Enter spouští zaměřené tlačítko. Tab/Shift+Tab a šipky posouvají zaměření pro přístupnost.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Klávesy         | Akce                                       |
| --------------- | ------------------------------------------ |
| Y / J           | Potvrdit Ano                               |
| N / Esc         | Potvrdit Ne                                |
| Enter           | Aktivovat zaměřené tlačítko                |
| Tab / Shift+Tab | Posunout zaměření vpřed/zpět               |
| Šipkové klávesy | Posunout zaměření mezi tlačítky            |
| Výchozí odpověď | Nastavuje počáteční zaměření (Ano nebo Ne) |

---

## Limitations {#limitations}

- Odpověď není tímto doplňkem měněna (Odpověď a Odpovědět všem jsou podporovány).
- Velmi velké přílohy mohou být předmětem limitů Thunderbirdu nebo poskytovatele.
  - Doplněk neprovádí dělení nebo kompresi souborů; spoléhá na normální zpracování příloh Thunderbirdu.
- Šifrované zprávy: S/MIME části jsou záměrně vyloučeny.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline obrázky jsou ignorovány: části odkazované prostřednictvím Content‑ID v těle zprávy nejsou přidávány jako soubory.
- S/MIME podpisové části jsou vyloučeny záměrně: názvy souborů jako `smime.p7s` a MIME typy jako `application/pkcs7-signature` nebo `application/pkcs7-mime` jsou přeskočeny.
- Vzory na černé listině mohou filtrovat kandidáty: viz [Konfigurace](configuration#blacklist-glob-patterns); shoda je bez ohledu na velká/malá písmena a pouze podle názvu souboru.
- Duplicitní názvy souborů nejsou znovu přidávány: pokud kompozice již obsahuje soubor se stejným normalizovaným názvem, je přeskočen.
- Části, které nejsou soubory, nebo chybějící názvy souborů: zvažovány jsou pouze části, které jsou podobné souborům a mají použitelné názvy souborů.

---

See also

- [Konfigurace](configuration)
