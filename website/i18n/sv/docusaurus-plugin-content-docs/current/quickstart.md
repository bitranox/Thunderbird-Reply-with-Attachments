---
id: quickstart
title: 'Snabbstart'
sidebar_label: 'Snabbstart'
---

## Snabbstart

:::important Minimi Thunderbird-version
Detta tillägg stödjer Thunderbird **128 ESR eller nyare**. Äldre versioner stöds inte.
:::

:::note Ingen telemetri; inget bakgrundsnätverk
Tillägget gör **inte** några analyser/telemetri och gör **inga** bakgrundsnätsbegärningar. Nätverksåtkomst sker endast när du klickar på externa länkar (Docs, GitHub, Donera).
:::

---

### Installera

1. Installera tillägget från Thunderbird Tillägg.
2. Valfritt: Aktivera bekräftelse (Alternativ → “Fråga innan bilagor läggs till”).
3. Valfritt: Lämna varningen för svartlista aktiverad (standard): “Varning om bilagor utesluts av svartlista”.
4. Valfritt: Lägg till mönster i svartlistan (ett per rad), t.ex.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Notera: “# …” ovan är en kommentar i denna dokumentation; inkludera inga kommentarer i mönster som du klistrar in i Alternativ. Ange endast ett mönster per rad.

Svara nu på ett meddelande med bilagor — originalen läggs till automatiskt eller efter en snabb bekräftelse. Om några filer utesluts av din svartlista kommer du att se en kort varning som listar dem.

---

### Verifiera {#verify}

- Svara på ett meddelande med 1–2 bilagor och bekräfta att originalen läggs till i ditt komponeringsfönster.
- För att justera beteende, se [Konfiguration](configuration) (bekräftelseväxla, standard svar, mönster för svartlista).

---

### Verifiera varning för svartlista {#verify-blacklist-warning}

- Svara på ett meddelande som innehåller en fil som “secret.txt”.
- Med “Varning om bilagor utesluts av svartlista” aktiverad, listas uteslutna filer och det matchande mönstret i en liten dialog.

Om du inte ser en varning, försäkra dig om att mönstret matchar filnamnet helt (endast filnamn, skiftlägesokänsligt). Se Konfiguration → Svartlista.

---

### Tangentbordsnotis {#keyboard-note}

- Bekräftelsedialogen stöder Y/J för Ja och N/Esc för Nej. På vissa icke-latinska tangentbord kan bokstavstangenterna variera; Enter bekräftar den markerade knappen.

---
