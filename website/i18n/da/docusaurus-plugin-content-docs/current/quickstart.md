---
id: quickstart
title: 'Hurtig start'
sidebar_label: 'Hurtig start'
---

---

## Hurtig start

:::important Minimum Thunderbird-version
Denne tilføjelse understøtter Thunderbird **128 ESR eller nyere**. Ældre versioner understøttes ikke.
:::

:::note Ingen telemetri; intet netværk i baggrunden
Tilføjelsen indsamler **ikke** analyse-/telemetridata og foretager **ingen** netværksforespørgsler i baggrunden. Netværksadgang sker kun, når du klikker på eksterne links (Dokumentation, GitHub, Doner).
:::

---

### Installation

1. Installer tilføjelsen fra Thunderbird-tilføjelser.
2. Valgfrit: Aktivér bekræftelse (Indstillinger → “Spørg før der tilføjes vedhæftninger”).
3. Valgfrit: Lad advarsel for sortliste være aktiveret (standard): “Advar, hvis vedhæftninger udelukkes af sortlisten”.
4. Valgfrit: Tilføj mønstre til sortliste (ét pr. linje), f.eks.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Bemærk: “# …” ovenfor er en kommentar i denne dokumentation; medtag ikke kommentarer i de mønstre, du indsætter i Indstillinger. Indtast kun ét mønster pr. linje.

Svar nu på en meddelelse med vedhæftninger — originalerne bliver tilføjet automatisk eller efter en hurtig bekræftelse. Hvis nogle filer udelukkes af din sortliste, ser du en kort advarsel, der oplister dem.

---

### Bekræft {#verify}

- Svar på en meddelelse med 1–2 vedhæftninger, og bekræft, at originalerne tilføjes i dit komponeringsvindue.
- For at justere adfærden, se [Konfiguration](configuration) (bekræftelseskontakt, standardsvar, sortlistemønstre).

---

### Bekræft advarsel for sortliste {#verify-blacklist-warning}

- Svar på en meddelelse, der indeholder en fil som “secret.txt”.
- Med “Advar, hvis vedhæftninger udelukkes af sortlisten” aktiveret viser en lille dialogboks de udelukkede filer og det matchende mønster.

Hvis du ikke ser en advarsel, skal du sikre, at mønsteret matcher filnavnet nøjagtigt (kun filnavn, uden skelnen mellem store og små bogstaver). Se Konfiguration → Sortliste.

---

### Bemærkning om tastatur {#keyboard-note}

- Bekræftelsesdialogen understøtter Y/J for Ja og N/Esc for Nej. På nogle ikke‑latinske tastaturer kan bogstavtasterne variere; Enter bekræfter den fokuserede knap.

---
