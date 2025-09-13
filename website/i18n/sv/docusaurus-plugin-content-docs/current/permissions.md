---
id: permissions
title: 'Behörigheter'
---

## Behörigheter

:::note Minimal behörigheter
Inga värd (webb) behörigheter begärs av detta tillägg. Tillägget samlar inte in telemetry eller gör bakgrundsnätverksförfrågningar. Se [Integritet](privacy).
:::

---

Tillägget begär endast en liten, fokuserad uppsättning av behörigheter. Här är varför varje behövs:

- `compose`: observera kompositionshändelser, lista/tillsätta bilagor i ditt svar.
- `messagesRead`: läsa metadata och hämta bilagor från det ursprungliga meddelandet.
- `scripting`: injicera den lilla bekräftelsedialogrutan när den är aktiverad.
- `windows`: öppna en liten bekräftelsepopup som en sista utväg när meddelandet misslyckas.
- `sessions`: lagra en per-flik flagga för att undvika duplicerad behandling.
- `storage`: bevara alternativ (svartlista, bekräftelseväxel, standardalternativ).
- `tabs`: riktad meddelandehantering till kompositionsfliken för bekräftelseförfrågningar.

Ytterligare anteckningar:

- Inga värdbehörigheter (webboriginer) begärs av detta tillägg.
- `tabs` behörigheten används endast för att rikta in sig på kompositionsfliken när alternativ bekräftelsedialog koordineras; den används inte för att läsa historia eller navigera sidor.

Dessa är dokumenterade i källan och testade i CI. Tillägget samlar inte in telemetry.

---

### Sammanfattning (behörigheter → syfte) {#permissions-summary}

| Behörighet          | Varför den behövs                                                                |
| ------------------- | -------------------------------------------------------------------------------- |
| `compose`           | Observera kompositionshändelser; lista och tillsätta bilagor i ditt svar.        |
| `messagesRead`      | Lista bilagor från det ursprungliga meddelandet och hämta fildata.               |
| `scripting`         | Injicera/koordinera lättvikts UI för bekräftelse när det är aktiverat.           |
| `windows`           | Fallback-popup om meddelande misslyckas (sällsynt).                              |
| `sessions`          | Lagra en per-flik flagga för att förhindra duplicerad behandling.                |
| `storage`           | Bevara alternativ (svartlista, bekräftelseväxel, standardalternativ).            |
| `tabs`              | Riktad meddelandehantering till kompositionsfliken för bekräftelseförfrågningar. |
| (värd behörigheter) | Inga — tillägget begär inte webboriginer.                                        |

---

## Inte begärt {#not-requested}

- `compose.save`, `compose.send` — tillägget sparar eller skickar inte mail på dina vägnar.

Se också: [Integritet](privacy) — ingen telemetry, inga bakgrundsnätverk, endast användarinitierade länkar.

---
