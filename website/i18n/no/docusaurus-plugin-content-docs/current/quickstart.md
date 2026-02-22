---
id: quickstart
title: 'Hurtigstart'
sidebar_label: 'Hurtigstart'
---

---

## Kom i gang

:::important Minimum Thunderbird-versjon
Denne utvidelsen støtter Thunderbird **128 ESR eller nyere**. Eldre versjoner støttes ikke.
:::

:::note Ingen telemetri; ingen nettverkstrafikk i bakgrunnen
Utvidelsen samler **ikke** inn analyse/telemetri og gjør **ingen** nettverksforespørsler i bakgrunnen. Nettverkstilgang skjer bare når du klikker eksterne lenker (Dokumentasjon, GitHub, Doner).
:::

---

### Installer

1. Installer utvidelsen fra Thunderbird Add-ons.
2. Valgfritt: Aktiver bekreftelse (Alternativer → «Spør før vedlegg legges til»).
3. Valgfritt: La svartelistevarsel være aktivert (standard): «Advar hvis vedlegg er utelukket av svartelisten».
4. Valgfritt: Legg til svartelistemønstre (ett per linje), for eksempel:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Merk: «# …» ovenfor er en kommentar i denne dokumentasjonen; ikke inkluder kommentarer i mønstrene du limer inn i Alternativer. Angi kun ett mønster per linje.

Svar nå på en melding med vedlegg — originalene legges til automatisk eller etter en rask bekreftelse. Hvis noen filer blir utelukket av svartelisten din, vil du se et kort varsel som lister dem.

---

### Kontroller {#verify}

- Svar på en melding med 1–2 vedlegg og bekreft at originalene er lagt til i skrivevinduet.
- For å justere oppførsel, se [Konfigurasjon](configuration) (bekreftelsesbryter, standardsvar, svartelistemønstre).

---

### Kontroller svartelistevarsel {#verify-blacklist-warning}

- Svar på en melding som inneholder en fil som «secret.txt».
- Med «Advar hvis vedlegg er utelukket av svartelisten» aktivert, viser et lite dialogvindu de utelukkede filene og det samsvarende mønsteret.

Hvis du ikke ser et varsel, må du forsikre deg om at mønsteret samsvarer nøyaktig med filnavnet (kun filnavn, skiller ikke mellom store og små bokstaver). Se Konfigurasjon → Svarteliste.

---

### Tastaturmerknad {#keyboard-note}

- Bekreftelsesdialogen støtter Y/J for Ja og N/Esc for Nei. På noen ikke-latinske tastaturer kan bokstavtastene variere; Enter bekrefter den fokuserte knappen.

---
