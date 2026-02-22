---
id: features
title: 'Funkcionalnosti'
sidebar_label: 'Funkcije'
---

---

## Značilnosti {#features}

- Samodejno priloži datoteke iz izvirnega e‑sporočila ob odgovarjanju.
- Prilagodljivo delovanje: priloge je mogoče
  - dodati samodejno ali
  - dodati šele po potrditvi (majhno, dostopno pogovorno okno). V Možnostih lahko
    omogočite potrditev in izberete privzet odgovor (Da/Ne).
- Črni seznam imen datotek (vzorcev glob) prepreči, da bi se določene datoteke
  samodejno priložile. Primeri: `*intern*`, `*secret*`, `*passwor*`.
  Ujemanje ni občutljivo na velikost črk in preverja le ime datoteke; v Možnostih
  navedite po en vzorec na vrstico.
- Opozorilo o črnem seznamu (neobvezno, privzeto omogočeno): ko so datoteke izključene po vašem
  črnem seznamu, majhno modalno okno navede datoteko in ujemajoče se vzorce. Prijazno do
  temnega načina in dostopno s tipkovnico (Enter/Esc za zaprtje).
- Deluje z Odgovori (Reply) in Odgovori vsem (Reply all). Posredovanja ta dodatek ne spreminja.
- Doda izvirnike, tudi če ste že sami kaj priložili; podvajanja prepreči po imenu datoteke.
- Varovalo pred dvojnimi prilogami na ravni zavihka prepreči dvojno dodajanje v istem zavihku za sestavljanje.
- Privzeto preskoči potrdila S/MIME, da se izogne nepotrebnim prilogam.
- Vključi vdelane slike (privzeto: VKL.). Vdelane slike so neposredno obnovljene v
  telesu odgovora kot podatkovni URI‑ji base64, pri čemer se ohrani prvotna vdelana postavitev. V
  Možnostih onemogočite, da popolnoma preskočite vdelane slike.

---

## Kako deluje {#how-it-works}

- Ob odgovoru dodatek navede izvirne priloge.
- Iz prilog filtrira podpise S/MIME; vdelane slike so obnovljene v telesu (razen če je onemogočeno).
- Po želji zahteva potrditev (prijazno do tipkovnice).
- Doda ustrezne datoteke v okno za sestavljanje, pri čemer se izogiba dvojnim po imenu datoteke.
- Za posebne primere glejte »Zakaj priloge morda niso dodane« v razdelku Uporaba.

Opomba o zasebnosti: Vsa obdelava poteka lokalno v Thunderbirdu. Dodatek ne izvaja nobenih omrežnih zahtevkov v ozadju.

---
