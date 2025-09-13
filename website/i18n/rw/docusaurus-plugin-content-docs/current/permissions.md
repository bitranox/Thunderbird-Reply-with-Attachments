---
id: permissions
title: 'Ubugenzuzi'
---

## Ubugenzuzi

:::note Ubugenzuzi buke
Nta burenganzira bw’umukoresha (web) busabwa n’uyu mwungururizo. Uyu mwungururizo ntukusanya amakuru yihariye cyangwa ngo ukore ibyifuzo by’umuyoboro. Reba [Privacy](privacy).
:::

---

Uyu mwungururizo usaba ubugenzuzi buke, bwibanze gusa. Impamvu buri burenganzira bukenewe:

- `compose`: gukurikirana ibikorwa byo kuvangavanga, urutonde/kwongera inyongera mu gisubizo cyawe.
- `messagesRead`: gusoma metadata no gukuramo inyandiko z’inyongera mu butumwa bwa mbere.
- `scripting`: kwinjiza dialog yo kwemeza ntoya mu gihe ibayeho.
- `windows`: gufungura popup ntoya yo kwemeza mu gihe ubutumwa budakunze.
- `sessions`: kubika agasanduku k’amakuru ku tab rimwe kugira ngo hatabaho gukorera ibintu bibiri icyarimwe.
- `storage`: kuramba amahitamo (uburenganzira bwo kwanga, guhindura kwemeza, igisubizo gisanzwe).
- `tabs`: ubutumwa bugenewe ku tab yo kuvangavanga ku byiciro byo kwemeza.

Andi makuru:

- Nta burenganzira bw’umukoresha (web origins) busabwa n’uyu mwungururizo.
- Ubugenzuzi `tabs` bukoreshwa gusa mu gutegura tab yo kuvangavanga mu gihe cyo guhuza dialog yo kwemeza y’amahetamo; ntabwo bukoreshwa mu gusoma amateka cyangwa mu kugenda ku mapaji.

Ibi byanditswe mu musingi kandi byageragejwe muri CI. Uyu mwungururizo ntukusanya amakuru yihariye.

---

### Ibisobanuro (ubugenzuzi → intego) {#permissions-summary}

| Ubugenzuzi                   | Impamvu bukenewe                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `compose`                    | Gukurikirana ibikorwa byo kuvangavanga; urutonde no kongeramo inyongera mu gisubizo cyawe.     |
| `messagesRead`               | Urutonde rw’inyongera z’ubutumwa bwa mbere no gukuramo amakuru y’inyandiko.                    |
| `scripting`                  | Kwinjiza/kuhuza UI yoroshye yo kwemeza igihe ibayeho.                                          |
| `windows`                    | Popup y’inyuma igihe ubutumwa budakunze (gake).                                                |
| `sessions`                   | Kubika agasanduku k’amakuru ku tab rimwe kugira ngo hatabaho gukorera ibintu bibiri icyarimwe. |
| `storage`                    | Kuramba amahitamo (uburenganzira bwo kwanga, guhindura kwemeza, igisubizo gisanzwe).           |
| `tabs`                       | Ubutumwa bugenewe ku tab yo kuvangavanga ku byiciro byo kwemeza.                               |
| (burenganzira bw’umukoresha) | Nta — uyu mwungururizo ntusaba imiterere y’urubuga.                                            |

---

## Nta busaba {#not-requested}

- `compose.save`, `compose.send` — uyu mwungururizo ntubika cyangwa ngo utange ubutumwa ku bwanyu.

Reba kandi: [Privacy](privacy) — nta makuru yihariye, nta muyoboro wihariye, links zakozwe n’umukoresha gusa.

---
