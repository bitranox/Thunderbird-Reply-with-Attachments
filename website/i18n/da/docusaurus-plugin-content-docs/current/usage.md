---
id: usage
title: 'Brug'
sidebar_label: 'Brug'
---

## Usage {#usage}

- Reply og tillegg tilføjer automatisk originale — eller spørger først, hvis det er aktiveret i Indstillinger.
- Duplicerede ved filnavn; S/MIME og inline-billeder bliver altid undgået.
- Blacklistede vedhæftninger bliver også undgået (case‑insensitive glob-mønstre der matcher filnavne, ikke stier). Se [Configuration](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Registrer svar → list originale vedhæftninger → filtrer S/MIME + inline → valgfri bekræftelse → tilføj berettigede filer (spring over dubletter).

Streng vs. afslappet gennemgang: Tilføjelsen udelukker først S/MIME og inline dele. Hvis intet kvalificerer, kører den en afslappet gennemgang, der stadig udelukker S/MIME/inline, men tolererer flere tilfælde (se Code Details).

| Part type                                          |        Strict pass |       Relaxed pass |
| -------------------------------------------------- | -----------------: | -----------------: |
| S/MIME signaturfil `smime.p7s`                     |          Udelukket |          Udelukket |
| S/MIME MIME-typer (`application/pkcs7-*`)          |          Udelukket |          Udelukket |
| Inline-billede refereret af Content‑ID (`image/*`) |          Udelukket |          Udelukket |
| Vedhæftet e-mail (`message/rfc822`) med et filnavn |      Ikke tilføjet | Kan blive tilføjet |
| Regelmæssig filvedhæftning med et filnavn          | Kan blive tilføjet | Kan blive tilføjet |

Eksempel: Nogle vedhæftninger kan mangle bestemte overskrifter, men er stadig normale filer (ikke inline/S/MIME). Hvis den strenge gennemgang ikke finder nogen, kan den afslappede gennemgang acceptere dem og vedhæfte dem.

---

### Cross‑reference {#cross-reference}

- Fremadrettet ændres ikke efter design (se Begrænsninger nedenfor).
- For grunde til, at en vedhæftning måske ikke tilføjes, se “Hvorfor vedhæftninger måske ikke tilføjes”.

---

## Behavior Details {#behavior-details}

- **Duplikatforebyggelse:** Tilføjelsen markerer compose-fanen som behandlet ved at bruge en per‑fan session værdi og et in‑memory beskyttelse. Den vil ikke tilføje originaler to gange.
- Lukning og genåbning af et compose-vindue behandles som en ny fane (dvs. et nyt forsøg er tilladt).
- **Respekt for eksisterende vedhæftninger:** Hvis compose allerede indeholder nogle vedhæftninger, tilføjes originaler stadig nøjagtigt én gang, og filnavne, der allerede eksisterer, springes over.
- **Undtagelser:** S/MIME artefakter og inline-billeder ignoreres. Hvis intet kvalificerer på den første gennemgang, gencheckes ikke-S/MIME dele med en afslappet tilbagefald.
  - **Filnavne:** `smime.p7s`
  - **MIME-typer:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline-billeder:** enhver `image/*` del refereret af Content‑ID i beskedens indhold
  - **Vedhæftede e-mails (`message/rfc822`):** behandles som almindelige vedhæftninger, hvis de har et filnavn; de kan blive tilføjet (underlagt duplikatkontrol og blacklist).
- **Blacklist advarsel (hvis aktiveret):** Når kandidater udelukkes af din blacklist,
  viser tilføjelsen en lille modal der lister de berørte filer og det matching
  mønster(e). Denne advarsel vises også i tilfælde hvor ingen vedhæftninger vil blive
  tilføjet, fordi alt blev udelukket.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Bekræftelsesdialog: Y/J = Ja, N/Esc = Nej; Tab/Shift+Tab og Pil-taster cykler fokus.
  - Den “Standard svar” i [Configuration](configuration#confirmation) sætter den indledningsvis fokuserede knap.
  - Enter aktiverer den fokuserede knap. Tab/Shift+Tab og pile flytter fokus for tilgængelighed.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                                 |
| --------------- | -------------------------------------- |
| Y / J           | Bekræft Ja                             |
| N / Esc         | Bekræft Nej                            |
| Enter           | Aktiver fokuseret knap                 |
| Tab / Shift+Tab | Flyt fokus fremad/bagit                |
| Pil-taster      | Flyt fokus mellem knapper              |
| Standard svar   | Sætter indledende fokus (Ja eller Nej) |

---

## Limitations {#limitations}

- Fremadrettet ændres ikke af denne tilføjelse (Svar og Svar til alle understøttes).
- Meget store vedhæftninger kan være underlagt Thunderbird eller leverandørgrænser.
  - Tilføjelsen opdeler eller komprimerer ikke filer; den er afhængig af Thunderbirds normale håndtering af vedhæftninger.
- Krypterede beskeder: S/MIME dele er med vilje udelukket.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline-billeder ignoreres: dele refereret via Content‑ID i beskedens indhold tilføjes ikke som filer.
- S/MIME signaturdele udelukkes efter design: filnavne som `smime.p7s` og MIME-typer såsom `application/pkcs7-signature` eller `application/pkcs7-mime` springes over.
- Blacklist-mønstre kan filtrere kandidater: se [Configuration](configuration#blacklist-glob-patterns); matchen er case‑insensitive og kun filnavn.
- Dublerede filnavne tilføjes ikke igen: hvis compose allerede indeholder en fil med det samme normaliserede navn, springes den over.
- Ikke-fil dele eller manglende filnavne: kun fil-lignende dele med brugbare filnavne overvejes til tilføjelse.

---

See also

- [Configuration](configuration)
