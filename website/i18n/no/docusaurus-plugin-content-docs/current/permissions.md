---
id: permissions
title: 'Tillatelser'
---

## Permissions

:::note Minimal permissions
Ingen vert (web) tillatelser blir bedt om av dette tillegg. Tillegget samler ikke inn telemetri eller gjør bakgrunnsnettverksforespørsel. Se [Personvern](privacy).
:::

---

Tillegget ber kun om et lite, fokusert sett med tillatelser. Hvorfor hver er nødvendig:

- `compose`: observere komponeringshendelser, liste/legge til vedlegg i svaret ditt.
- `messagesRead`: lese metadata og hente vedleggsfiler fra den originale meldingen.
- `scripting`: injisere den lille bekreftelsesdialogen i komponeringsvinduet når den er aktivert.
- `windows`: åpne et lite bekreftelses-popup som en siste utvei når melding mislykkes.
- `sessions`: lagre en per-fane-flagg for å unngå duplisert behandling.
- `storage`: opprettholde alternativer (svarteliste, bekreftelsesbryter, standard svar).
- `tabs`: målrettet melding til komponeringsfanen for bekreftelsesforespørsel.

Ytterligere merknader:

- Ingen vertstillatelser (web-opprinnelser) blir bedt om av dette tillegg.
- `tabs` tillatelsen brukes kun for å målrette komponeringsfanen når man koordinerer den valgfrie bekreftelsesdialogen; den brukes ikke til å lese historie eller navigere sider.

Disse er dokumentert i koden og testet i CI. Tillegget samler ikke inn telemetri.

---

### Summary (permissions → purpose) {#permissions-summary}

| Permission     | Why it’s needed                                                             |
| -------------- | --------------------------------------------------------------------------- |
| `compose`      | Observere komponeringshendelser; liste og legge til vedlegg i svaret ditt.  |
| `messagesRead` | Liste vedlegg fra den originale meldingen og hente fildataene.              |
| `scripting`    | Injisere/koordinere lettvekts UI for bekreftelse når den er aktivert.       |
| `windows`      | Fallback-popup hvis melding mislykkes (sjeldent).                           |
| `sessions`     | Lagring av en per-fane-flagg for å forhindre duplisert behandling.          |
| `storage`      | Opprettholde alternativer (svarteliste, bekreftelsesbryter, standard svar). |
| `tabs`         | Målrettet melding til komponeringsfanen for bekreftelsesforespørsel.        |
| (host perms)   | Ingen — tillegget ber ikke om web-opprinnelser.                             |

---

## Not requested {#not-requested}

- `compose.save`, `compose.send` — tillegget lagrer ikke eller sender e-post på dine vegne.

Se også: [Personvern](privacy) — ingen telemetri, ingen bakgrunnsnettverk, brukergenererte lenker kun.

---
