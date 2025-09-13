---
id: permissions
title: 'Toestemmings'
---

## Toestemmings

:::note Minimum toestemmings
Geen gasheer (web) toestemmings word deur hierdie toevoeging aangevra nie. Die toevoeging verskaf nie telemetrie nie en maak nie agtergrond netwerkversoeke nie. Sien [Privaatheid](privacy).
:::

---

Die toevoeging vra slegs 'n klein, gefokuste stel toestemmings aan. Waarom elkeen benodig word:

- `compose`: opmerk saamgestelde gebeurtenisse, lys/voeg aanhangsels by in jou antwoord.
- `messagesRead`: lees metadata en haal aanhangsel lêers van die oorspronklike boodskap.
- `scripting`: inspuit die klein in-samestelling bevestigingsdialoog wanneer geaktiveer.
- `windows`: oop 'n klein bevestigingspop-up as 'n laaste uitweg wanneer boodskappe misluk.
- `sessions`: stoor 'n per-tab-vlag omduplisering te voorkom.
- `storage`: volhard opsies (swartlys, bevestigingskieslys, standaard antwoord).
- `tabs`: geteikende boodskappe na die samestelling tab vir bevestigings versoeke.

Addisionele notas:

- Geen gasheer toestemmings (web oorspronge) word deur hierdie toevoeging aangevra nie.
- Die `tabs` toestemming word slegs gebruik om die samestelling tab te teiken wanneer die opsionele bevestigingsdialoog koördineer word; dit word nie gebruik om geskiedenis te lees of bladsye te navigeer nie.

Hierdie is gedokumenteer in die bron en getoets in CI. Die toevoeging verskaf nie telemetrie nie.

---

### Samevatting (toestemmings → doel) {#permissions-summary}

| Toestemming            | Waarom dit benodig word                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| `compose`              | Observeer saamgestelde gebeurtenisse; lys en voeg aanhangsels by in jou antwoord. |
| `messagesRead`         | Lys oorspronklike boodskap aanhangsels en haal die lêerdata.                      |
| `scripting`            | Inspuit/koordineer liggewig UI vir bevestiging wanneer geaktiveer.                |
| `windows`              | Terugvalpop-up as boodskappe misluk (selde).                                      |
| `sessions`             | Stoor 'n per-tab-vlag omduplisering te voorkom.                                   |
| `storage`              | Volhard opsies (swartlys, bevestigingskieslys, standaard antwoord).               |
| `tabs`                 | Geteikende boodskappe na die samestelling tab vir bevestigings versoeke.          |
| (gasheer toestemmings) | Geen — die toevoeging vra nie web oorspronge aan nie.                             |

---

## Nie aangevra nie {#not-requested}

- `compose.save`, `compose.send` — die toevoeging stoor of stuur geen e-pos namens jou nie.

Sien ook: [Privaatheid](privacy) — geen telemetrie, geen agtergrond netwerk, slegs gebruikers-geïnisieerde skakels.
