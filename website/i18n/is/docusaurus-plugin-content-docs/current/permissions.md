---
id: permissions
title: 'Heimildaskilmál'
---

## Heimildaskilmál

:::note Lágmarkheimildir
Engar heimildaskilmál (vefsíður) eru sótt af þessum viðbættri. Viðbætturnar safna ekki upplýsingum eða senda bakgrunnsnetbeiðnir. Sjá [Persónuvernd](privacy).
:::

---

Viðbætturnar biður aðeins um litla, afmarkaða heimildarsamsetningu. Af hverju er hver heimild nauðsynleg:

- `compose`: fylgjast með samsetningaratburðum, lista/bæta við fylgiskjölum í svari þínu.
- `messagesRead`: lesa staðreyndir og sækja fylgiskjöl úr upprunalega skilaboðunum.
- `scripting`: innsetja litla staðfestingargluggann í samsetninguna þegar hann er virkur.
- `windows`: opna litla staðfestingar glugga sem síðasta úrræði þegar skilaboð mistakast.
- `sessions`: vista flag á hverju flipanum til að forðast tvítekningu.
- `storage`: viðhalda valkostum (svartalisti, staðfestingarskipti, sjálfgefna svör).
- `tabs`: markviss samskipti við samsetningarflipann fyrir staðfestingarbeiðnir.

Aukaskýringar:

- Engar heimildir (vefsíður) eru sótt af þessari viðbættri.
- Heimildin `tabs` er aðeins notuð til að miða á samsetningarflipann þegar samræma á valfrjáls staðfestingarglugga; hún er ekki notuð til að lesa sögu eða sigla á vefsíðum.

Þetta er skráð í uppsprettunni og prófað í CI. Viðbætturnar safna ekki upplýsingum.

---

### Samantekt (heimildaskilmál → tilgangur) {#permissions-summary}

| Heimild             | Hvers vegna er hún nauðsynleg?                                                  |
| ------------------- | ------------------------------------------------------------------------------- |
| `compose`           | Fylgjast með samsetningaratburðum; lista og bæta við fylgiskjölum í svari þínu. |
| `messagesRead`      | Lista fylgiskjöl úr upprunalega skilaboðunum og sækja skrár.                    |
| `scripting`         | Innsetja/semja léttan UI fyrir staðfestingu þegar virkjað.                      |
| `windows`           | Varagluggi ef samskipti mistakast (sjaldan).                                    |
| `sessions`          | Vista flag á hverju flipanum til að koma í veg fyrir tvítekningu.               |
| `storage`           | Viðhalda valkostum (svartalisti, staðfestingarskipti, sjálfgefin svör).         |
| `tabs`              | Markviss samskipti við samsetningarflipann fyrir staðfestingarbeiðnir.          |
| (heimildaheimildir) | Engar — viðbætturnar biðja ekki um vefuppruna.                                  |

---

## Ekki sótt {#not-requested}

- `compose.save`, `compose.send` — viðbætturnar skrifa ekki eða senda póst fyrir þína hönd.

Sjá einnig: [Persónuvernd](privacy) — engar upplýsingar, engar bakgrunnsnetbeiðnir, aðeins notandastartaðar tengingar.

---
