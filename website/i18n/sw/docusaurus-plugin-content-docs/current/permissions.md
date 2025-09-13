---
id: permissions
title: 'Ruhusa'
---

## Ruhusa

:::note Ruhusa za chini
Hakuna ruhusa za mwenyeji (wavuti) zinazoombwa na nyongeza hii. Nyongeza haitakusanya taarifa au kufanya mawasiliano ya mtandao ya nyuma. Tazama [Faragha](privacy).
:::

---

Nyongeza inahitaji seti ndogo na ya kawaida ya ruhusa tu. Kwa nini kila moja inahitajika:

- `compose`: angalia matukio ya muundo, orodhesha/ongeza viambatisho katika jibu lako.
- `messagesRead`: soma metadata na pata faili za kiambatisho kutoka kwa ujumbe wa asili.
- `scripting`: weka kidirisha kidogo cha kuthibitisha wakati kinawezekana.
- `windows`: fungua kidirisha kidogo cha kuthibitisha kama hatua ya mwisho wakati ujumbe unaposhindikana.
- `sessions`: hifadhi bendera ya kila tab ili kuepuka usindikaji wa mara mbili.
- `storage`: dumu chaguo (orodha ya mblack, kubadilisha kuthibitisha, jibu la msingi).
- `tabs`: ujumbe wa malengo kwa tab ya muundo kwa maombi ya uthibitishaji.

Kumbukumbu za nyongeza:

- Hakuna ruhusa za mwenyeji (vyanzo vya wavuti) zinazoombwa na nyongeza hii.
- Ruhusa ya `tabs` inatumika tu kuandaa tab ya muundo wakati wa kuratibu kidirisha cha uthibitisho chaguzi; haijatumiwa kusoma historia au kubadilisha kurasa.

Hizi zimeandikwa katika chanzo na zinajaribiwa katika CI. Nyongeza haitakusanya taarifa.

---

### Muhtasari (ruhusa → kusudi) {#permissions-summary}

| Ruhusa               | Kwa nini inahitajika                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `compose`            | Angalia matukio ya muundo; orodhesha na ongeza viambatisho katika jibu lako. |
| `messagesRead`       | Orodhesha viambatisho vya ujumbe wa asili na pata data ya faili.             |
| `scripting`          | weka/ratibu UI rahisi ya uthibitisho wakati inawezekana.                     |
| `windows`            | Kidirisha cha dharura ikiwa ujumbe unaposhindikana (mara chache).            |
| `sessions`           | Hifadhi bendera ya kila tab ili kuzuia usindikaji wa mara mbili.             |
| `storage`            | Dumu chaguo (orodha ya mblack, kubadilisha uthibitishaji, jibu la msingi).   |
| `tabs`               | Ujumbe wa malengo kwa tab ya muundo kwa maombi ya uthibitishaji.             |
| (ruhusa za mwenyeji) | Hakuna — nyongeza haiomb Ruhusa za wavuti.                                   |

---

## Haziombwi {#not-requested}

- `compose.save`, `compose.send` — nyongeza haitahifadhi au kutuma barua kwa niaba yako.

Tazama pia: [Faragha](privacy) — hakuna taarifa, hakuna mtandao wa nyuma, viungo vya mtumiaji pekee.

---
