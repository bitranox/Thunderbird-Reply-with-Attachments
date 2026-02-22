---
id: usage
title: 'Brug'
sidebar_label: 'Brug'
---

---

## Brug {#usage}

- Svar, og tilføjelsen tilføjer originalerne automatisk — eller spørger først, hvis aktiveret i Indstillinger.
- Dubletter fjernes ud fra filnavn; S/MIME‑dele springes altid over. Inline‑billeder gendannes som standard i svarteksten (deaktiver via "Include inline pictures" i Indstillinger).
- Vedhæftninger på sortlisten springes også over (store/små‑bogstav‑uafhængige glob‑mønstre, der matcher filnavne, ikke stier). Se [Konfiguration](configuration#blacklist-glob-patterns).

---

### Hvad sker der ved svar {#what-happens}

- Registrer svar → list originale vedhæftninger → filtrer S/MIME + inline → evt. bekræftelse → tilføj kvalificerede filer (spring dubletter over) → gendan inline‑billeder i svarteksten.

Streng kontra lempelig gennemgang: Tilføjelsen udelukker først S/MIME‑ og inline‑dele fra filvedhæftninger. Hvis intet kvalificerer sig, kører den en mere lempelig gennemgang, der stadig udelukker S/MIME/inline, men tolererer flere tilfælde (se Kodedetaljer). Inline‑billeder tilføjes aldrig som filvedhæftninger; i stedet, når "Include inline pictures" er aktiveret (standard), indlejres de direkte i svarteksten som base64‑data‑URI'er.

| Part type                                         |                           Strict pass |                          Relaxed pass |
| ------------------------------------------------- | ------------------------------------: | ------------------------------------: |
| S/MIME signature file `smime.p7s`                 |                              Excluded |                              Excluded |
| S/MIME MIME types (`application/pkcs7-*`)         |                              Excluded |                              Excluded |
| Inline image referenced by Content‑ID (`image/*`) | Udelukket (gendannes i svarteksten\*) | Udelukket (gendannes i svarteksten\*) |
| Attached email (`message/rfc822`) with a filename |                             Not added |                          May be added |
| Regular file attachment with a filename           |                          May be added |                          May be added |

\* Når "Include inline pictures" er aktiveret (standard: TIL), indlejres inline‑billeder i svarteksten som base64‑data‑URI'er i stedet for at blive tilføjet som filvedhæftninger. Se [Konfiguration](configuration#include-inline-pictures).

Eksempel: Nogle vedhæftninger kan mangle visse headere, men er stadig almindelige filer (ikke inline/S/MIME). Hvis den strenge gennemgang ikke finder nogen, kan den lempelige acceptere dem og vedhæfte dem.

---

### Krydsreference {#cross-reference}

- Videresend ændres ikke som designvalg (se Begrænsninger nedenfor).
- For grunde til at en vedhæftning måske ikke bliver tilføjet, se “Hvorfor vedhæftninger muligvis ikke tilføjes”.

---

## Adfærdsdetaljer {#behavior-details}

- **Forebyggelse af dubletter:** Tilføjelsen markerer komponeringsfanen som behandlet ved hjælp af en sessionsværdi pr. fane og en beskyttelse i hukommelsen. Den tilføjer ikke originaler to gange.
- Lukning og genåbning af et komponeringsvindue behandles som en ny fane (dvs. et nyt forsøg er tilladt).
- **Respektér eksisterende vedhæftninger:** Hvis komponeringen allerede indeholder nogle vedhæftninger, tilføjes originalerne stadig præcis én gang, hvor filnavne, der allerede findes, springes over.
- **Udelukkelser:** S/MIME‑artefakter og inline‑billeder udelukkes fra filvedhæftninger. Hvis intet kvalificerer sig i første gennemgang, foretages et lempeligt fallback, der genkontrollerer ikke‑S/MIME‑dele. Inline‑billeder håndteres separat: de gendannes i svarteksten som data‑URI'er (når aktiveret).
  - **Filnavne:** `smime.p7s`
  - **MIME‑typer:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline‑billeder:** enhver `image/*`‑del refereret af Content‑ID — udelukkes fra filvedhæftninger, men indlejres i svarteksten, når "Include inline pictures" er TIL
  - **Vedhæftede e‑mails (`message/rfc822`):** behandles som almindelige vedhæftninger, hvis de har et filnavn; de kan tilføjes (underlagt dubletkontrol og sortliste).
- **Advarsel om sortliste (hvis aktiveret):** Når kandidater udelukkes af din sortliste,
  viser tilføjelsen et lille modalvindue med en liste over de berørte filer og de matchende
  mønstre. Denne advarsel vises også i tilfælde, hvor ingen vedhæftninger vil blive tilføjet, fordi alt blev udelukket.

---

## Tastaturgenveje {#keyboard-shortcuts}

- Bekræftelsesdialog: Y/J = Ja, N/Esc = Nej; Tab/Shift+Tab og piletaster skifter fokus.
  - “Standardsvar” i [Konfiguration](configuration#confirmation) angiver den knap, der har fokus fra start.
  - Enter udløser den fokuserede knap. Tab/Shift+Tab og piletaster flytter fokus for tilgængelighed.

### Tastatursnydeark {#keyboard-cheat-sheet}

| Taster          | Handling                          |
| --------------- | --------------------------------- |
| Y / J           | Bekræft Ja                        |
| N / Esc         | Bekræft Nej                       |
| Enter           | Aktivér fokuseret knap            |
| Tab / Shift+Tab | Flyt fokus frem/tilbage           |
| Piletaster      | Flyt fokus mellem knapper         |
| Standardsvar    | Angiver startfokus (Ja eller Nej) |

---

## Begrænsninger {#limitations}

- Videresend ændres ikke af dette tilføjelsesprogram (Svar og Svar til alle understøttes).
- Meget store vedhæftninger kan være underlagt begrænsninger i Thunderbird eller hos udbyderen.
  - Tilføjelsen opdeler eller komprimerer ikke filer; den benytter Thunderbirds normale håndtering af vedhæftninger.
- Krypterede beskeder: S/MIME‑dele udelukkes bevidst.

---

## Hvorfor vedhæftninger muligvis ikke tilføjes {#why-attachments-might-not-be-added}

- Inline‑billeder tilføjes ikke som filvedhæftninger. Når "Include inline pictures" er TIL (standard), indlejres de i svarteksten som data‑URI'er i stedet. Hvis indstillingen er FRA, fjernes inline‑billeder helt. Se [Konfiguration](configuration#include-inline-pictures).
- S/MIME‑signaturdele udelukkes efter design: filnavne som `smime.p7s` og MIME‑typer såsom `application/pkcs7-signature` eller `application/pkcs7-mime` springes over.
- Sortlistemønstre kan filtrere kandidater: se [Konfiguration](configuration#blacklist-glob-patterns); matchning er store/små‑bogstav‑uafhængig og kun på filnavn.
- Dublerede filnavne tilføjes ikke igen: hvis komponeringen allerede indeholder en fil med det samme normaliserede navn, springes den over.
- Ikke‑fil‑dele eller manglende filnavne: kun fil‑lignende dele med brugbare filnavne overvejes til tilføjelse.

---

Se også

- [Konfiguration](configuration)
