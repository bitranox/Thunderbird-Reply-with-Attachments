---
id: usage
title: 'Použití'
sidebar_label: 'Použití'
---

---

## Použití {#usage}

- Odpovězte a doplněk přidá původní přílohy automaticky — nebo se nejprve zeptá, pokud je to povoleno v Možnostech.
- Odstranění duplicit podle názvu souboru; části S/MIME jsou vždy přeskočeny. Vložené obrázky jsou ve výchozím nastavení obnoveny v těle odpovědi (vypnout lze přes "Include inline pictures" v Možnostech).
- Přílohy na černé listině se také přeskočí (glob vzory bez rozlišování velikosti písmen porovnávající názvy souborů, nikoli cesty). Viz [Konfigurace](configuration#blacklist-glob-patterns).

---

### Co se děje při odpovědi {#what-happens}

- Zjištění odpovědi → vypsání původních příloh → filtrování S/MIME + inline → volitelné potvrzení → přidání způsobilých souborů (přeskočení duplicit) → obnovení vložených obrázků v těle.

Přísný vs. uvolněný průchod: Doplněk nejprve vyloučí části S/MIME a vložené části ze souborových příloh. Pokud nic neprojde, spustí uvolněný průchod, který stále vylučuje S/MIME/inline, ale toleruje více případů (viz podrobnosti kódu). Vložené obrázky se nikdy nepřidávají jako souborové přílohy; místo toho, když je povoleno "Include inline pictures" (výchozí), vkládají se přímo do těla odpovědi jako base64 data URI.

| Typ části                                                |                Přísný průchod |              Uvolněný průchod |
| -------------------------------------------------------- | ----------------------------: | ----------------------------: |
| Soubor podpisu S/MIME `smime.p7s`                        |                     Vynecháno |                     Vynecháno |
| Typy MIME S/MIME (`application/pkcs7-*`)                 |                     Vynecháno |                     Vynecháno |
| Vložený obrázek odkazovaný pomocí Content‑ID (`image/*`) | Vynecháno (obnovené v těle\*) | Vynecháno (obnovené v těle\*) |
| Přiložený e‑mail (`message/rfc822`) s názvem souboru     |                     Nepřidáno |               Může být přidán |
| Běžná souborová příloha s názvem souboru                 |               Může být přidán |               Může být přidán |

\* Když je "Include inline pictures" povoleno (výchozí: ZAPNUTO), vložené obrázky se vkládají do těla odpovědi jako datová URI místo přidání jako souborové přílohy. Viz [Konfigurace](configuration#include-inline-pictures).

Příklad: Některým přílohám mohou chybět určité hlavičky, ale stále jde o běžné soubory (ne inline/S/MIME). Pokud přísný průchod žádné nenajde, uvolněný průchod je může přijmout a připojit.

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
| --------------- | ------------------------------------- |
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

- Vložené obrázky se nepřidávají jako souborové přílohy. Když je "Include inline pictures" ZAPNUTO (výchozí), vkládají se místo toho do těla odpovědi jako datová URI. Pokud je nastavení VYPNUTO, vložené obrázky se zcela odstraní. Viz [Konfigurace](configuration#include-inline-pictures).
- Části podpisu S/MIME jsou z principu vyloučeny: názvy souborů jako `smime.p7s` a typy MIME jako `application/pkcs7-signature` nebo `application/pkcs7-mime` se přeskočí.
- Vzory černé listiny mohou kandidáty filtrovat: viz [Konfigurace](configuration#blacklist-glob-patterns); porovnává se bez rozlišování velikosti písmen a pouze podle názvu souboru.
- Duplicitní názvy souborů se znovu nepřidávají: pokud editor již obsahuje soubor se stejným normalizovaným názvem, je přeskočen.
- Nesouborové části nebo chybějící názvy: k přidání se zvažují pouze části podobné souborům s použitelnými názvy.

---

Viz také

- [Konfigurace](configuration)
