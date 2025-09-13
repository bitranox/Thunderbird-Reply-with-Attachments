---
id: permissions
title: 'Ikikwe'
---

## Ikikwe

:::note Ikikwe kacha nta
Akwụkwọ ikike webọsị (ịntanetị) adịghị arụrụ ọrụ site na mgbakwunye a. Mgbakwunye ahụ anaghị achọtelere telemetry ma ọ bụ mee arịrịọ ntanetị n'azụ. Lee [Iwu Nzuzo](privacy).
:::

---

Mgbakwunye ahụ na-arịọ ụfọdụ ikike dị ntakịrị, kpọmkwem. Ihe kpatara ọ bụla ji mkpa:

- `compose`: nyochaa ihe omume idekọ, depụta/tinye akpọrọ na nzaghachi gị.
- `messagesRead`: gụọ metadata ma nweta faịlụ nkwado si na ozi mbụ.
- `scripting`: tinye igbe nkwenye dị ntakịrị na idekọ mgbe emechara.
- `windows`: mepee obere igbe nkwenye dị ka ntọala ikpeazụ mgbe ozi azụmaahịa dara.
- `sessions`: chekwaa ihe ngosi kwa taabụ iji zere mmegharị ugboro ugboro.
- `storage`: chekwaa nhọrọ (nchekwa, toggle nkwenye, azịza ndabara).
- `tabs`: ozi zụrụ na taabụ idekọ maka arịrịọ nkwenye.

Nkwupụta ndị ọzọ:

- A na-arịọghị ikike ndị na-enye ihe (web origins) site na mgbakwunye a.
- A na-eji ikike `tabs` naanị iji dozie taabụ idekọ mgbe ị na-eme ka igbe nkwenye nhọrọ; a naghị eji ya gụọ akụkọ ma ọ bụ na-emeghe ibe.

A na-edebe nke a na isi iyi ma bụrụ nke a nwara na CI. Mgbakwunye ahụ anaghị achọtelere telemetry.

---

### Nchịkọta (ikikwe → ebumnuche) {#permissions-summary}

| Ikikwe              | Ihe kpatara ya ji mkpa                                           |
| ------------------- | ---------------------------------------------------------------- |
| `compose`           | Nyochaa ihe omume idekọ; depụta na tinye nkwado na nzaghachi gị. |
| `messagesRead`      | Depụta nkwado ozi mbụ ma nweta data faịlụ.                       |
| `scripting`         | Tinye/duzie UI dị mfe maka nkwenye mgbe emechara.                |
| `windows`           | Igbe ntụgharị ma ọ bụrụ na ozi azụmaahịa dara (akpọrọ).          |
| `sessions`          | Chekwaa ihe ngosi kwa taabụ iji zere mmegharị ugboro ugboro.     |
| `storage`           | Chekwaa nhọrọ (nchekwa, toggle nkwenye, azịza ndabara).          |
| `tabs`              | Ozi zụrụ na taabụ idekọ maka arịrịọ nkwenye.                     |
| (ikike ndị na-enye) | Nnone — mgbakwunye ahụ anaghị arịọ web origins.                  |

---

## A naghị arịọ {#not-requested}

- `compose.save`, `compose.send` — mgbakwunye ahụ anaghị echekwa ma ọ bụ zipu ozi n'aha gị.

Lee kwa: [Iwu Nzuzo](privacy) — enweghi telemetry, enweghi netwọk n'azụ, naanị njikọ na-ebido site na onye ọrụ.
