---
id: permissions
title: 'Mafên'
---

## Mafên

:::note Mafên kêmtir
Na mafên host (web) ji vê zêdekarîyê re xwestin nayê. Vê zêdekarîyê telemetriya xwe neqede an jî daxwaza torê li peyda bikin. Bihîstin [Taybetî](privacy).
:::

---

Vê zêdekarîyê tenê komêk piçûk, fokusî ya mafên xwese. Çima her yekê taybet derdikeve:

- `compose`: binketin bûyerên kompoz, lîsteya/lêzêdanên girêdan di bersivê te de.
- `messagesRead`: metadata xwendin û pelên girêdanên ji peyama bingehîn ve girêdan.
- `scripting`: di nîşandan çareserkirina piçûk ya tê de barkirin de bide.
- `windows`: di dawiya encama şewatên mesajê de şîretê piçûk vekin.
- `sessions`: girêdana her tabê bi taybetî ji ber zêde pêşbîniyê derxistin.
- `storage`: vebijarkin (lîsteya reş, toggles nîşankirin, bersiva binav).
- `tabs`: mesaja hedefê tabê kompozê bo daxwaza nîşankirin.

Notên zêde:

- Na mafên host (web origins) ji vê zêdekarîyê re xwestin nayê.
- Mafê `tabs` tenê ji bo hedefa tabê kompozê li gîha destpêkirinê nîşankirin dike; ew nikare li dîroka xwendin an jî rûpelan ve xuyakirin.

Ew di çavdêriyan de belgeyî ne dirêj dike û di CI de test kirin. Vê zêdekarîyê telemetriya xwe neqede.

---

### Kîjan (mafên → armanca) {#permissions-summary}

| Maf            | Çima ew pêwîst e                                                    |
| -------------- | ------------------------------------------------------------------- |
| `compose`      | Binketin bûyerên kompoz; lîsteya girêdan û lêzêdanên di bersivê de. |
| `messagesRead` | Lîsteya girêdanên peyama bingehîn bînin û pelên daneyê vegerînin.   |
| `scripting`    | Inject/şopandina UI ya lightweight ya bo nîşankirin dema xwestî ye. |
| `windows`      | Popupê çûreke darikî heke mesaj daneyê nabê (nadir).                |
| `sessions`     | Girêdana her tabê bi taybetî ji ber pêşbîniyê derxistin.            |
| `storage`      | Vebijarkin (lîsteya reş, toggles nîşankirin, bersiva binav).        |
| `tabs`         | Mesaja hedefê tabê kompozê bo daxwaza nîşankirin.                   |
| (mafên host)   | Tune — vê zêdekarîyê mafên web re xwestin nayê.                     |

---

## Nekirin {#not-requested}

- `compose.save`, `compose.send` — vê zêdekarîyê e-nameyê ne parastin an jî nîşandina te nikare.

Jî bibînin: [Taybetî](privacy) — telemetriya tune, torê paşê nehatiye, tenê girêdan ku bikarhêner bide.

---
