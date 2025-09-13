---
id: configuration
title: 'Usanidi'
---

## Usanidi

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

---

## Fungua chaguzi katika Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Zana → Nyongeza na Mandhari → pata “Jibu na Viambatisho” → Mipangilio / Chaguzi

---

### Mipangilio {#settings}

#### Thibitisho {#confirmation}

- Badilisha “Uliza kabla ya kuongeza viambatisho”
- Jibu la msingi: Ndio au Hapana (kichwa & kivinjari cha msingi)
- Kivinjari: Y/J = Ndio; N/Esc = Hapana; Tab/Shift+Tab na funguo za Ramani zinaendesha mtazamo
  - Ona maelezo ya vibonye katika [Matumizi](usage#keyboard-shortcuts).

---

#### Orodha ya Weusi (michoro ya glob) {#blacklist-glob-patterns}

Faili zilizowekwa kwenye orodha ya weusi hazitakiwa kuongezwa kwenye jibu kiotomatiki. Pia ona [Glossary](glossary) kwa “Orodha ya Weusi (Orodha ya Uhamasishaji)”.

- Mchoro mmoja kwa kila mstari; asiye na muktadha; kufanana na jina la faili pekee
- Mifano: `*intern*`, `*secret*`, `*passwor*`
- Vifunguo vya glob vinavyoungwa mkono: `*` (herufi zozote isipokuwa `/`), `?` (herufi moja), madarasa ya herufi kama `[abc]`. Tumia `\[` kufanana na `[` kweli. Njia (`**/`) zinapuuziliwa mbali kwani zinapokea majina ya faili pekee.
- Havikubaliwi: kukanusha (`!`), upanuzi wa brace (`{..}`), na anuwai ngumu. Weka michoro iwe rahisi.
- Maoni hayakubaliwi katika michoro. Usijumuisha `#` au maoni ya ndani; ingiza tu maandiko ya mchoro kwa kila mstari.

---

##### Kitabu cha michoro {#pattern-cookbook}

- Fananisha PDF yoyote: `*.pdf`
- Fananisha faili zinazoanzia na “scan”: `scan*`
- Darasa la wahusika: `report[0-9].txt`
- Kuepukwa kwa `[` halisi: `\[` (inafaida unapofananisha mwelekeo kama wahusika)

---

##### Maelezo {#blacklist-notes}

- Agizo halina maana; mechi ya kwanza/ya yoyote inazuia faili.
- Kulinganisha kuna jina la faili pekee (njia / folda zinapuuziliwa mbali).
- “Rudisha kwenye mipangilio ya msingi” inarudisha michoro inayopendekezwa na kubadilisha kidole cha onyo la orodha ya weusi.
- Kwa nini mfano `*passwor*`? Inalingana na familia mbili “nenosiri” na “Passwort”.
- Kipaumbele: ikiwa mchoro wowote unalingana na jina la faili, faili inakataliwa (mechi ya kwanza/ya yoyote — agizo halibadilishi matokeo).
- Kidokezo — jaribu mchoro wako: ongeza mchoro wa muda, jibu ujumbe wenye faili yenye jina linalofanana, na thibitisha kuwa imekataliwa katika orodha ya onyo.

##### Jaribio la haraka (mtihani salama) {#blacklist-try-it}

1. Fungua Chaguzi → Orodha ya Weusi.
2. Ongeza mchoro wa muda kama `*.tmp` na bonyeza Hifadhi.
3. Jibu kwa barua ya jaribio yenye faili inayomalizikia na `.tmp` — faili inapaswa kuonekana kwenye orodha ya onyo na isiunganishwe.
4. Onesha mchoro wa muda unapokamilika, au bonyeza “Rudisha kwenye mipangilio ya msingi”.

---

#### Onyo kwa viambatisho vilivyokataliwa {#warning-on-excluded-attachments}

- Badilisha “Onyo ikiwa viambatisho vinakataliwa na orodha ya weusi” (misingi: ON).
- Wakati imewezeshwa, kidirisha kidogo kinataja faili zilizokataliwa na mchoro unaolingana. Onyo pia linaonekana wakati hakuna ambacho kitaunganishwa kwa sababu wagombea wote walikuwa
  wamewekwa kwenye orodha ya weusi.

---

#### Hifadhi mipangilio yako {#save-your-settings}

Mipangilio inahifadhiwa kwa kubonyeza kitufe cha Hifadhi. Unaweza kubadilisha shamba moja moja kwa mikono au kurudisha mipangilio ya msingi inapohitajika.

Ikiwa mipangilio iliyohifadhiwa inaonekana haitawekwa ipasavyo, anza tena Thunderbird na ujaribu tena. (Thunderbird inaweza kuhifadhi hali katika vipindi; kuanzisha tena kunahakikisha mipangilio safi inapelekwa.)

Kidokezo: Ili kuthibitisha kwamba mipangilio yako imeathiriwa, jibu yoyote ujumbe wenye kiambatisho na uangalie uthibitisho au onyo la orodha ya weusi.

---

#### Uwazi wa Mchango (siku 90 za kulala) {#donation-visibility}

Nyongeza ina kipengele cha urahisi cha kuficha maelekezo ya mchango kwa muda baada ya umechanga.

Mahali pa kuipata

- Chaguzi → Sehemu ya Msaada: utaona kitufe chenye “Nimechangia” na eneo dogo la kidokezo.
- Kidirisha cha Thibitisho cha Kutuma pia kinaonyesha kitufe cha Changia; moja kwa moja kinajificha wakati kulala kunafanya kazi.

Jinsi inavyofanya kazi

- Kubonyeza “Nimechangia” huficha vitufe vya mchango na maelekezo yanayohusiana kwa siku 90.
- Kidokezo cha hali kinaonyesha “Kufichwa hadi YYYY‑MM‑DD” (katika tarehe yako ya ndani). Pia kuna kitufe cha “Onyesha Changia tena” ili kurejesha uwazi mara moja.
- Baada ya siku 90, kitufe cha Changia kinakuwa wazi tena kiotomatiki.

Faragha na uhifadhi

- Nyongeza inahifadhi mhula mmoja tu kwenye uhifadhi wa ndani wa Thunderbird ili kukumbuka kipindi cha kulala. Funguo: `donateHideUntil` (milisani ya epoch).
- Mipangilio hii ni ya ndani kwa wasifu wako wa Thunderbird (sio iliyoshirikishwa kwenye wingu). Hakuna ombi za mtandao zinakabiliwa na kipengele hiki.

Kutatua matatizo

- Ikiwa Changia bado inaonekana mara baada ya kubonyeza “Nimechangia”, subiri kwa muda au fungua tena ukurasa wa Chaguzi; UI inasasishwa mara tu mipangilio inaposafishwa.
- Ili kurudisha mikono, bonyeza “Onyesha Changia tena”. Pia unaweza kusubiri hadi tarehe iliyoorodheshwa katika kidokezo ipite.

Kipengele hiki ni kwa urahisi; hakikati kazi za nyongeza na hakikusanyi data yoyote binafsi.

---

### Urekebishaji wa Jina la Faili (kuzuia duplicates) {#filename-normalization-duplicates-prevention}

Ili kufanyiwa kazi kwa uhakika kwenye majukwaa tofauti, majina ya faili yanarekebishwa kabla ya kuangaliwa kwa_duplicates:

- Unicode inarekebishwa hadi NFC.
- Majina yanakunjwa (yanapigwa chini).
- Mipaka iliyobaki / nafasi inakatwa (urafiki wa Windows).

Hii inah保持kuzuia kugundua duplicate kwa majina kama `café.pdf` vs `café.pdf` (NFD) au `FILE.txt.` vs `file.txt`.

---

## Tabia ya Thibitisho {#confirmation-behavior}

- “Jibu la msingi” huweka kitufe kinachoshughulika kwa kuzingatia katika kidirisha cha thibitisho (inafaidi kwa watumiaji wa kibodi).
- Inafanya kazi kwa "Jibu" na "Jibu wote". "Fowadi" haibadilishwa na nyongeza hii.

---

## Juu: kugundua duplicates {#advanced-duplicate-detection}

Kuzuia duplicates kunatekelezwa kwa kila tab ya kuandika na kwa jina la faili. Ona [Matumizi](usage#behavior-details) kwa maelezo ya kina.

---

Ona pia

- [Idhini](permissions)
- [Faragha](privacy)
