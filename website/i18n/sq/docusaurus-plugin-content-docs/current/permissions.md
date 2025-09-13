---
id: permissions
title: 'Lejet'
---

## Lejet

:::note Lejet minimale
Asnjë leje host (web) nuk kërkohet nga ky shtesë. Shtesa nuk mbledh telemetri ose bën kërkesa rrjeti në sfond. Shiko [Privatësia](privacy).
:::

---

Shtesa kërkon një grup të vogël, të fokusuara lejesh vetëm. Pse secila është e nevojshme:

- `compose`: vëzhgo ngjarjet e kompozimit, listoni/shtoni bashkëngjitje në përgjigjen tuaj.
- `messagesRead`: lexoni metadata dhe marrni skedarët e bashkëngjitjeve nga mesazhi origjinal.
- `scripting`: injektoni dialogun e vogël të konfirmimit në kompozim kur është aktivizuar.
- `windows`: hapni një popup të vogël konfirmimi si një zgjidhje të fundit kur dërgimi dështón.
- `sessions`: ruani një flamur për çdo tab për të shmangur përpunimin e dyfishtë.
- `storage`: ruani opsionet (lista e zezë, kalimi i konfirmimit, përgjigjja e paracaktuar).
- `tabs`: mesazhim të targetuar për tab-in e kompozimit për kërkesat e konfirmimit.

Shënime të tjera:

- Asnjë leje host (origjinat web) nuk kërkohet nga ky shtesë.
- Leja `tabs` përdoret vetëm për të targetuar tab-in e kompozimit kur koordinon dialogun e mundshëm të konfirmimit; nuk përdoret për të lexuar historinë ose për të naviguar faqe.

Këto janë të dokumentuara në burim dhe testuar në CI. Shtesa nuk mbledh telemetri.

---

### Përmbledhje (lejet → qëllimi) {#permissions-summary}

| Leja           | Pse është e nevojshme                                                                |
| -------------- | ------------------------------------------------------------------------------------ |
| `compose`      | Vëzhgoni ngjarjet e kompozimit; listoni dhe shtoni bashkëngjitje në përgjigjen tuaj. |
| `messagesRead` | Listoni bashkëngjitjet e mesazhit origjinal dhe merrni të dhënat e skedarit.         |
| `scripting`    | Injeksioni/koordinimi i UI të lehtë për konfirmim kur është aktivizuar.              |
| `windows`      | Popup zgjidhje në rast dështimi të mesazhit (të rralla).                             |
| `sessions`     | Ruani një flamur për çdo tab për të parandaluar përpunimin e dyfishtë.               |
| `storage`      | Ruani opsionet (lista e zezë, kalimi i konfirmimit, përgjigjja e paracaktuar).       |
| `tabs`         | Mesazhim i targetuar për tab-in e kompozimit për kërkesat e konfirmimit.             |
| (lejet host)   | Asnjë — shtesa nuk kërkon origjinat web.                                             |

---

## Nuk kërkohen {#not-requested}

- `compose.save`, `compose.send` — shtesa nuk ruan ose dërgon postë në emrin tuaj.

Shiko gjithashtu: [Privatësia](privacy) — asnjë telemetri, asnjë rrjet në sfond, lidhje vetëm të iniciuara nga përdoruesi.
