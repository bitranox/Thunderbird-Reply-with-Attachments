---
id: quickstart
title: 'Snabbstart'
sidebar_label: 'Snabbstart'
---

---

## Snabbstart

:::important Lägsta Thunderbird‑version
Detta tillägg stöder Thunderbird **128 ESR eller nyare**. Äldre versioner stöds inte.
:::

:::note Ingen telemetri; inget nätverk i bakgrunden
Tillägget samlar **inte** in analys/telemetri och gör **inga** nätverksanrop i bakgrunden. Nätverksåtkomst sker bara när du klickar på externa länkar (Docs, GitHub, Donate).
:::

---

### Installera

1. Installera tillägget från Thunderbird Add‑ons.
2. Valfritt: Aktivera bekräftelse (Options → “Ask before adding attachments”).
3. Valfritt: Låt varningen för svartlista vara aktiverad (standard): “Warn if attachments are excluded by blacklist”.
4. Valfritt: Lägg till svartlistmönster (ett per rad), t.ex.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Obs: “# …” ovan är en kommentar i denna dokumentation; inkludera inte kommentarer i de mönster du klistrar in i Options. Ange endast ett mönster per rad.

Svara nu på ett meddelande med bilagor — originalen läggs till automatiskt eller efter en snabb bekräftelse. Om några filer utesluts av din svartlista visas en kort varning som listar dem.

---

### Verifiera {#verify}

- Svara på ett meddelande med 1–2 bilagor och bekräfta att originalen läggs till i ditt skrivfönster.
- För att justera beteendet, se [Konfiguration](configuration) (växla bekräftelse, standardsvar, svartlistmönster).

---

### Verifiera varning för svartlista {#verify-blacklist-warning}

- Svara på ett meddelande som innehåller en fil som “secret.txt”.
- Med “Warn if attachments are excluded by blacklist” aktiverat listar en liten dialogruta de exkluderade filerna och det matchande mönstret.

Om du inte ser en varning, kontrollera att mönstret matchar filnamnet exakt (endast filnamn, skiftlägesokänsligt). Se Configuration → Blacklist.

---

### Tangentbordsnotis {#keyboard-note}

- Bekräftelsedialogen stöder Y/J för Ja och N/Esc för Nej. På vissa icke‑latinska tangentbord kan bokstavstangenterna variera; Enter bekräftar den fokuserade knappen.

---
