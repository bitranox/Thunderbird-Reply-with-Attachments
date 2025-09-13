---
id: permissions
title: 'Ceadaíochtaí'
---

## Ceadaíochtaí

:::note Ceadaíochtaí íosta
Ní iarrtar ceadanna ónaoi (gréasáin) ar bith ag an breiseán seo. Ní bhailíonn an breiseán teagmhais nó déanann sé iarratais líonra cúil. Féach [Príobháideacht](privacy).
:::

---

Iarrann an breiseán grúpa beag, dírithe de cheadanna amháin. Cén fáth a bhfuil gach ceann de dhíth:

- `compose`: observe compose events, list/add attachments in your reply.
- `messagesRead`: read metadata and fetch attachment files from the original message.
- `scripting`: inject the small in‑compose confirmation dialog when enabled.
- `windows`: open a tiny confirmation popup as a last resort when messaging fails.
- `sessions`: store a per‑tab flag to avoid duplicate processing.
- `storage`: persist options (blacklist, confirmation toggle, default answer).
- `tabs`: targeted messaging to the compose tab for confirmation requests.

Nótaí breise:

- Ní iarrtar ceadanna ónaoi (túsgréasáin) ag an breiseán seo.
- Úsáidtear an cead `tabs` amháin chun an táb comhoiriúnachta a chrochadh nuair atá an dialóg deimhniúcháin roghnach á chomhordú; ní úsáidtear é chun stair a léamh nó leathanach a nascleanúint.

Tá na ceadanna seo doiciméadaithe sa foinse agus tástáilte i CI. Ní bhailíonn an breiseán teagmhais.

---

### Achoimre (ceadaíochtaí → cuspóir) {#permissions-summary}

| Cead             | Cén fáth a bhfuil sé de dhíth                                     |
| ---------------- | ----------------------------------------------------------------- |
| `compose`        | Observe compose events; list and add attachments in your reply.   |
| `messagesRead`   | List original message attachments and fetch the file data.        |
| `scripting`      | Inject/coordinate lightweight UI for confirmation when enabled.   |
| `windows`        | Fallback popup if messaging fails (rare).                         |
| `sessions`       | Store a per‑tab flag to prevent duplicate processing.             |
| `storage`        | Persist options (blacklist, confirmation toggle, default answer). |
| `tabs`           | Targeted messaging to the compose tab for confirmation requests.  |
| (ceadanna ónaoi) | Níl aon — níl ceadanna túsgréasáin a iarrann an breiseán.         |

---

## Ní iarrtar {#not-requested}

- `compose.save`, `compose.send` — ní shábháil nó ní sheolann an breiseán ríomhphoist ar do shon.

Féach freisin: [Príobháideacht](privacy) — ní féidir le teagmhais, níl líonra cúil, na naisc a thosóidh an usuario amháin.
