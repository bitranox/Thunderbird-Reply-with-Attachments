---
id: privacy
title: 'Zasebnost'
sidebar_label: 'Zasebnost'
---

## Zasebnost

:::note Brez telemetrije; brez omrežnih aktivnosti v ozadju
Ta dodatek **ne** zbira analitike/telemetrije in **ne** izvaja omrežnih zahtevkov v ozadju. Kakršenkoli dostop do omrežja se zgodi le, ko kliknete na zunanjo povezavo (Dokumenti, GitHub, Doniraj).
:::

Reply with Attachments ne zbira analitike ali telemetrije in ne pošilja vaših podatkov nikamor.

Kaj naredi dodatek:

- Prebere metapodatke o priponkah in datotekah iz izvirnega sporočila lokalno (Thunderbird API), da jih priloži vaši odgovoru.
- Shranjuje vaše možnosti (črna lista, potrditev, privzeti odgovor) v lokalni shrambi Thunderbirda.

Kaj dodatek ne naredi:

- Brez sledenja, analitike, poročanja o napakah ali oddaljenega beleženja.
- Brez omrežnih zahtevkov v ozadju, razen ko izrecno odprete zunanje povezave (Dokumenti, GitHub, Doniraj).

Dovoljenja so dokumentirana na strani [Dovoljenja](permissions).

---

## Politika varnosti vsebin (CSP) {#content-security-policy-csp}

Možnosti in pojavna okna se izogibajo vgrajenim skriptam. Vsa JavaScript koda se nalaga iz datotek, priloženih dodatku, da se zagotovi skladnost s strogo CSP v Thunderbirdu. Če v dokumente vstavite primerke kode, so to le primeri in jih dodatek ne izvede.

---

## Shramba podatkov {#data-storage}

- Preferenc uporabnika (črna lista, preklop potrditev, privzeti odgovor) se shranjuje v `storage.local` Thunderbirda za ta dodatek.
- Dodatek ne izvaja sinhronizacije v oblak.

---

## Omrežje {#network}

- Dodatek ne izvaja omrežnih aktivnosti v ozadju.
- Kakršenkoli dostop do omrežja se zgodi le, ko kliknete na povezave (Dokumenti, GitHub, Doniraj) ali ko Thunderbird sam izvaja normalne operacije, ki niso povezane s tem dodatkom.

---

## Odstranjevanje podatkov {#data-removal}

- Odstranitev dodatka odstrani njegov kodo.
- Nastavitve se hranijo le v `storage.local` Thunderbirda in se odstranijo ob odstranitvi; zunanja shramba se ne uporablja.
- Ponastavite nastavitve brez odstranitve:
  - Stran z možnostmi: uporabite "Ponastavi na privzete" za črno listo in opozorilo črne liste.
  - Napredno: v Thunderbirdu → Orodja → Orodja za razvijalce → Odpravite napake v dodatkih, odprite shrambo razširitve in po potrebi počistite ključe.
