---
id: quickstart
title: 'Hurtigstart'
sidebar_label: 'Hurtigstart'
---

## Hurtigstart

:::important Minimum Thunderbird-version
Dette add-on understøtter Thunderbird **128 ESR eller nyere**. Ældre versioner understøttes ikke.
:::

:::note Ingen telemetri; intet baggrundsnetværk
Add-on'et indsamler **ikke** analyser/telemetri og foretager **ikke** baggrundsnetværksanmodninger. Netværksadgang forekommer kun, når du klikker på eksterne links (Docs, GitHub, Donate).
:::

---

### Installation

1. Installer add-on'et fra Thunderbird Add-ons.
2. Valgfrit: Aktiver bekræftelse (Indstillinger → “Spørg før vedhæftning af filer”).
3. Valgfrit: Behold den sorte liste advarsel aktiveret (standard): “Advar hvis vedhæftninger udelukkes af svartelisten”.
4. Valgfrit: Tilføj mønstre til svartelisten (et per linje), f.eks.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Bemærk: “# …” ovenfor er en kommentar i denne dokumentation; inkluder ikke kommentarer i mønstre, du indsætter i indstillingerne. Indtast kun ét mønster per linje.

Svar nu på en besked med vedhæftninger — originalerne vil blive tilføjet automatisk eller efter en hurtig bekræftelse. Hvis nogle filer udelukkes af din sortliste, vil du se en kort advarsel, der oplyser om dem.

---

### Verificer {#verify}

- Svar på en besked med 1–2 vedhæftninger og bekræft, at originalerne er tilføjet til dit kompositionsvindue.
- For at justere adfærden, se [Konfiguration](configuration) (bekræftelses-skift, standard svar, mønstre til sortlisten).

---

### Bekræft advarsel om sortlistning {#verify-blacklist-warning}

- Svar på en besked, der indeholder en fil som “secret.txt”.
- Med “Advar hvis vedhæftninger udelukkes af svartelisten” aktiveret, viser en lille dialog de udelukkede filer og det matchende mønster.

Hvis du ikke ser en advarsel, skal du sikre dig, at mønsteret matcher filnavnet nøjagtigt (kun filnavn, case-følsomt). Se Konfiguration → Sortliste.

---

### Tastaturnote {#keyboard-note}

- Bekræftelsesdialogen understøtter Y/J for Ja og N/Esc for Nej. På nogle ikke-latinske tastaturer kan bogstavtasterne variere; Enter bekræfter den fokuserede knap.

---
