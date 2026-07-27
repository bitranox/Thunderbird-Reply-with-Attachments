---
id: usage
title: 'Brug'
sidebar_label: 'Brug'
---

---

## Brug {#usage}

- Svar, og tilføjelsen tilføjer originalerne automatisk — eller spørger først, hvis aktiveret i Indstillinger.
- Fjernelse af dubletter sker efter filnavn; S/MIME-dele springes altid over. Billeder, der er indlejret i den oprindelige besked, forbliver i svarets brødtekst, hvor Thunderbird placerer dem, og kopieres ikke som filer.
- Vedhæftninger på sortlisten springes også over (store/små‑bogstav‑uafhængige glob‑mønstre, der matcher filnavne, ikke stier). Se [Konfiguration](configuration#blacklist-glob-patterns).

---

### Hvad sker der ved svar {#what-happens}

- Registrer svar → list de oprindelige vedhæftninger → spring S/MIME og indlejrede billeder over → valgfri bekræftelse → tilføj de kvalificerede filer (dubletter springes over).

| Deltype                                                           | Kopieres til svaret        |
|-------------------------------------------------------------------|---------------------------:|
| S/MIME-signaturfil `smime.p7s`                                    | Nej                        |
| S/MIME MIME-typer (`application/pkcs7-*`)                         | Nej                        |
| Billede som beskedens brødtekst indlejrer via `cid:`              | Nej (det er i brødteksten) |
| Billede markeret som `Content-Disposition: inline`                | Nej (det er i brødteksten) |
| Billede med en `Content-ID`, som brødteksten aldrig refererer til | Ja                         |
| Vedhæftet e-mail (`message/rfc822`) med et filnavn                | Ja                         |
| Almindelig filvedhæftning med et filnavn                          | Ja                         |

Et billede tæller kun som indlejret, når den oprindelige besked faktisk refererer til det,
eller når afsenderen udtrykkeligt har markeret det som `Content-Disposition: inline`. Blot en
`Content-ID`-header er ikke nok: flere mailklienter sætter en på hver billeddel,
inklusive ægte vedhæftninger, og de skal stadig kopieres.

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
|-----------------|-----------------------------------|
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

- Billeder, som den oprindelige besked indlejrer, kopieres ikke som filer. De er allerede i svarets brødtekst, hvor Thunderbird har placeret dem. Se [Konfiguration](configuration#include-inline-pictures).
- S/MIME‑signaturdele udelukkes efter design: filnavne som `smime.p7s` og MIME‑typer såsom `application/pkcs7-signature` eller `application/pkcs7-mime` springes over.
- Sortlistemønstre kan filtrere kandidater: se [Konfiguration](configuration#blacklist-glob-patterns); matchning er store/små‑bogstav‑uafhængig og kun på filnavn.
- Dublerede filnavne tilføjes ikke igen: hvis komponeringen allerede indeholder en fil med det samme normaliserede navn, springes den over.
- Ikke‑fil‑dele eller manglende filnavne: kun fil‑lignende dele med brugbare filnavne overvejes til tilføjelse.

---

Se også

- [Konfiguration](configuration)
