---
id: features
title: 'Funktioner'
sidebar_label: 'Funktioner'
---

---

## Funktioner {#features}

- Vedhæfter automatisk filer fra den oprindelige e-mail, når du svarer.
- Konfigurerbar adfærd: vedhæftninger kan
  - tilføjes automatisk, eller
  - tilføjes kun efter bekræftelse (en lille, tilgængelig dialog). I Indstillinger kan du aktivere bekræftelsen og vælge standardsvaret (Ja/Nej).
- Sortliste over filnavne (glob‑mønstre) forhindrer, at bestemte filer vedhæftes automatisk. Eksempler: `*intern*`, `*secret*`, `*passwor*`. Matchning skelner ikke mellem store og små bogstaver og tjekker kun selve filnavnet; angiv ét mønster pr. linje i Indstillinger.
- Advarsel om sortliste (valgfri, aktiveret som standard): når filer udelukkes af din sortliste, viser en lille modal filen og de matchende mønstre. Understøtter mørk tilstand og er tastaturtilgængelig (Enter/Esc for at lukke).
- Virker med Besvar og Besvar alle. Videresend påvirkes ikke af denne tilføjelse.
- Tilføjer originaler, selv hvis du allerede har vedhæftet noget; undgår dubletter efter filnavn.
- Værn mod dubletter pr. fane forhindrer dobbelt‑tilføjelse i samme skrivefane.
- Springer S/MIME‑certifikater over som standard for at undgå unødige vedhæftninger.
- Medtag indsatte billeder (standard: TIL). Indlejrede billeder gendannes direkte i svarteksten som base64‑data‑URI'er, så det oprindelige inline‑layout bevares. Deaktiver i Indstillinger for helt at udelade inline‑billeder.

---

## Sådan fungerer det {#how-it-works}

- Når du svarer, oplister tilføjelsen de oprindelige vedhæftninger.
- Filtrerer S/MIME‑signaturer fra filvedhæftninger; inline‑billeder gendannes i brødteksten (medmindre de er deaktiveret).
- Kan valgfrit bede om bekræftelse (tastaturvenlig).
- Tilføjer egnede filer til din besked, når du skriver, og undgår dubletter efter filnavn.
- Se “Hvorfor vedhæftninger muligvis ikke bliver tilføjet” under Brug for særlige tilfælde.

Bemærk om privatliv: Al behandling sker lokalt i Thunderbird. Tilføjelsen foretager ingen netværksanmodninger i baggrunden.

---
