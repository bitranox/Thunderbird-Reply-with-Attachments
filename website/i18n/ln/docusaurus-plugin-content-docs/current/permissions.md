---
id: permissions
title: 'Mibeko'
---

## Mibeko

:::note Mibeko ekele
Mokomo ya host (web) te eza na maboko ya te na add‑on oyo. Add‑on ezali te kokata telemetry to kosala bakatisi ya neti na mbala. Tala [Privasi](privacy).
:::

---

Add‑on eza na maboko moke, ya malamu. Mibeko yango na yango etali:

- `compose`: kotala mikanda ya mise, lisanga/kolakisa masolo na yo.
- `messagesRead`: koyoka metadata mpe kolanda masolo ya ebonga na poste ya motuya.
- `scripting`: kopusa yango na ekoki kolo ya maboko ya moke soki ezali na bokeli.
- `windows`: kofungola soki ekoki belle ebele ya kokozanga soki messaging ebandi te.
- `sessions`: kotala flag ya per‑tab mpo na kolongola bokokani.
- `storage`: kokoma makambo (blacklist, kokokisa ya bokeli, lisolo ya sima).
- `tabs`: messaging oyo eendami na tab ya compose mpo na makambo ya bokeli.

Mikolo mosusu:

- Mibeko ya host (web origins) te eza na maboko ya te na add‑on oyo.
- Mibeko `tabs` ezali kolimbola mpo na kotala tab ya compose soki ozali na makambo ya bokeli; ezali te kopona histwa to kokende na mpea.

Mí eza na mukanda mpe esalemi na CI. Add‑on ezali te kokata telemetry.

---

### Mibeko (mibeko → ebongiseli) {#permissions-summary}

| Mibeko           | Nkuka ya mibeko ekoki kozwa                                       |
| ---------------- | ----------------------------------------------------------------- |
| `compose`        | Kotala mikanda ya mise; lisanga mpe kolakisa masolo na yo.        |
| `messagesRead`   | Lisanga masolo ya ebonga ya motuya mpe kolanda ba fichier.        |
| `scripting`      | Kopusa/kolanda UI ya moke mpo na bokeli soki ezali na bokeli.     |
| `windows`        | Fallback popup soki messaging ebandi te (ezali moke).             |
| `sessions`       | Kotala flag ya per‑tab mpo na kolongola bokokani.                 |
| `storage`        | Kokoma makambo (blacklist, kokokisa ya bokeli, lisolo ya sima).   |
| `tabs`           | Messaging oyo eendami na tab ya compose mpo na makambo ya bokeli. |
| (mibeko ya host) | Nani — add‑on ezali te komela web origins.                        |

---

## Te komelaka {#not-requested}

- `compose.save`, `compose.send` — add-on ezali te kofanda to koyebisa mbongo na esika na yo.

Tala lisusu: [Privasi](privacy) — te eza na telemetry, te eza na bakatisi ya neti, masolo ya motuya ya user moko.

---
