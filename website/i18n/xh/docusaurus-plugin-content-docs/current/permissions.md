---
id: permissions
title: 'Imvume'
---

## Imvume

:::note Imvume encinci
Ayiceli mivume ye-host (web) ngalo msebenzi. Lo msebenzi awuqokeleli i-telemetry okanye wenze izicelo zeseva ngasemva. Jonga [Ubumfihlo](privacy).
:::

---

Lo msebenzi ucela imvume encinci, egxile kuphela. Kungani nganye ifunekayo:

- `compose`: observe compose events, list/add attachments in your reply.
- `messagesRead`: read metadata and fetch attachment files from the original message.
- `scripting`: inject the small in‑compose confirmation dialog when enabled.
- `windows`: open a tiny confirmation popup as a last resort when messaging fails.
- `sessions`: store a per‑tab flag to avoid duplicate processing.
- `storage`: persist options (blacklist, confirmation toggle, default answer).
- `tabs`: targeted messaging to the compose tab for confirmation requests.

Iingcebiso ezongezelelweyo:

- Akukho mivume ye-host (web origins) ecela ngalo msebenzi.
- I `tabs` imvume isetyenziswa kuphela ukuze ibheke itafile yokubhalela xa kuhlangana umphose wokuvuma; ayisetyenziswanga ukufunda imbali okanye ukuyeka iphepha.

Le miba ibhalwe kwisiseko kwaye ivavanyiswe kwi-CI. Lo msebenzi awuqokeleli i-telemetry.

---

### Isishwankathelo (imvume → injongo) {#permissions-summary}

| Imvume           | Kungani ifunekayo                                                 |
| ---------------- | ----------------------------------------------------------------- |
| `compose`        | Observe compose events; list and add attachments in your reply.   |
| `messagesRead`   | List original message attachments and fetch the file data.        |
| `scripting`      | Inject/coordinate lightweight UI for confirmation when enabled.   |
| `windows`        | Fallback popup if messaging fails (rare).                         |
| `sessions`       | Store a per‑tab flag to prevent duplicate processing.             |
| `storage`        | Persist options (blacklist, confirmation toggle, default answer). |
| `tabs`           | Targeted messaging to the compose tab for confirmation requests.  |
| (mivume ye-host) | Akukho — lo msebenzi awuceli web origins.                         |

---

## Akucelwanga {#not-requested}

- `compose.save`, `compose.send` — lo msebenzi awuqokeleli okanye uthumele i-imeyili ngegama lakho.

Jonga futhi: [Ubumfihlo](privacy) — akukho i-telemetry, akukho zicelo zeseva ngasemva, kuphela iinkcukacha ezikhokhelwa ngumsebenzisi.

---
