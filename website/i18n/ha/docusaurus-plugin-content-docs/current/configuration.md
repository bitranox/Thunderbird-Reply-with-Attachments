---
id: configuration
title: 'Tsarin'
---

## Tsarin

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

---

## Bude zaɓuɓɓuka a Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Kayan Aiki → Kari da Jigogi → sami “Amsa tare da Bayanan” → Zaɓuɓɓuka/Zaɓi

---

### Saituna {#settings}

#### Tabbatarwa {#confirmation}

- Canza “Tambayi kafin ƙara bayanan”
- Amsa ta tsohuwa: I (Yes) ko A'a (No) (maɓalli & tsohuwar maɓallin keyboard)
- Maɓallin Keyboard: Y/J = I; N/Esc = A'a; Tab/Shift+Tab da maɓallan Harafin suna juyawa hankali
  - Duba bayanan maɓallin a [Amfani](usage#keyboard-shortcuts).

---

#### Blacklist (zane na glob) {#blacklist-glob-patterns}

Fayilolin da aka ja a Blacklist ba za a ƙara su a cikin amsa ta atomatik ba. Duba ma [Glossary](glossary) don “Blacklist (Jerin cirewa)”.

- Daya zane a kowanne layi; ba tare da la'akari da ƙarfe ba; daidaituwa kawai sunan fayil
- Misalai: `*intern*`, `*secret*`, `*passwor*`
- An goyi bayan alamu glob: `*` (duk wasu haruffa sai `/`), `?` (harafi guda), rukuni na haruffa kamar `[abc]`. Yi amfani da `\[` don daidaita da ainihin `[`. Hanyoyin (`**/`) ba a la'akari da su ba tun da kawai sunayen fayil aka daidaita.
- Ba a goyi bayan: ƙin (negation) (`!`), faɗin kulawa (`{..}`), da tsarin ma'auni. Ka kiyaye zane mai sauƙi.
- Ba a goyi bayan sharhi a cikin zane. Kada ka haɗa da `#` ko sharhunan inline; shigar kawai rubutun zane a kowanne layi.

---

##### Littafin Zane {#pattern-cookbook}

- Daidaita kowane PDF: `*.pdf`
- Daidaita fayilolin da suka fara da “scan”: `scan*`
- Rukuni na haruffa: `report[0-9].txt`
- Harafin ainihi `[`: `\[` (mafi amfani lokacin da za a daidaita da maɓalli a matsayin harafi)

---

##### Notes {#blacklist-notes}

- Tsarin ba ya da mahimmanci; da farko ko kowanne da ya dace yana cire fayil ɗin.
- Daidaituwar kawai sunan fayil (hanyoyi/kwamiti ba a la'akari da su ba).
- “Maimaita zuwa tsohuwar” yana dawo da zane da aka ba da shawarar da ja ja na Blacklist.
- Me yasa misali `*passwor*`? Yana daidaita duka “kalmar sirri” da “Passwort” iyalai.
- Mahimmanci: idan kowanne zane ya dace da sunan fayil, fayil ɗin yana samun cirewa (farko/ko dai — tsari ba ya canza sakamakon).
- Shawara — gwada zane naka: ƙara zane na wani lokaci, amsa ga saƙo mai ɗauke da fayil tare da sunan da ya dace, kuma tabbatar da cewa an cire shi a cikin jerin gargadi.

##### Gajeren gwaji (gwaji mai lafiya) {#blacklist-try-it}

1. Bude Zaɓuɓɓuka → Blacklist.
2. Ƙara wani zane na ɗan lokaci kamar `*.tmp` kuma danna Ajiye.
3. Amsa ga wani imel na gwaji wanda ke da fayil mai ƙarshen `.tmp` — fayil ɗin ya kamata ya bayyana a cikin jerin gargadi kuma ba a haɗa shi.
4. Cire zane na ɗan lokaci idan an gama, ko danna “Maimaita zuwa tsohuwar”.

---

#### Gargadi akan haɗakar da aka cire {#warning-on-excluded-attachments}

- Canza “Gargadi idan an cire haɗakar ta hanyar ja” (tsohuwa: ON).
- Lokacin da aka kunna, karamin modal yana lissafa fayilolin da aka cire da tsarin da ya dace. Hakanan gargadin yana bayyana lokacin da ba za a haɗa komai ba saboda duk waɗannan an jefa su a Blacklist.

---

#### Ajiye saituna {#save-your-settings}

Saituna ana adana su ta danna maɓallin Ajiye. Zaka iya komawa da filayen kowane guda da hannu ko maida tsoho kamar yadda ake buƙata.

Idan saitunan da aka adana sun bayyana ba su yi aiki da kyau ba, sake kunna Thunderbird ka sake gwadawa. (Thunderbird na iya adana matsayin a tsawon zaman; sake kunnawa yana tabbatar da sabon saituna sun loda.)

Shawara: Don tabbatar da cewa saitunan ka sun yi amfani, amsa ga kowanne saƙo tare da haɗakar kuma duba tabbataccen ko gargadi na Blacklist.

---

#### Bayyanar Tallafi (snooze na kwana 90) {#donation-visibility}

Karin yana ƙunshe da fasali mai sauƙi don ɓoyewa daga bayarwa na ɗan lokaci bayan ka bayar.

Inda za a sami shi

- Zaɓuɓɓuka → Sashe na Tallafi: za ku ga maɓallin “Na bayar” da ƙananan yankin bayani.
- Dialog na Tura-tabbatarwa ma yana nuna maɓallin Donate; yana ɓoyewa ta atomatik idan snooze yana aiki.

Yadda yake aiki

- Danna “Na bayar” yana ɓoyewa maɓallan bayarwa da alamu masu alaƙa na tsawon kwanaki 90.
- Alamar matsayin tana nuna “An ɓoye har zuwa YYYY-MM-DD” (a cikin ranar ku ta gida). Hakanan akwai maɓallin “Nuna Donate kuma” don dawo da bayyanar nan da nan.
- Bayan kwanaki 90, maɓallin Donate yana bayyana ta atomatik.

Sirri & adana

- Karin yana adana lokacin tsawon lokaci a cikin ajiyar gida na Thunderbird don tuna lokacin snooze. Mabuɗin: `donateHideUntil` (milisani epoch).
- Wannan saitin yana cikin tarihin Thunderbird naka (ba a haɗa gajerun bayanai). Ba a yi kowanne bukatar hanyar sadarwa ta wannan fasali ba.

Gyara matsala

- Idan Donate har yanzu yana bayyana da zarar ka danna “Na bayar”, jira ɗan lokaci ko sake budewa shafin Zaɓuɓɓuka; UI yana sabuntawa nan da nan da zarar an adana saitin.
- Don sake saita da hannu, danna “Nuna Donate kuma”. Hakanan zaka iya jira har lokacin da aka liƙa a cikin bayani ya wuce.

Wannan fasalin na musamman don jin daɗi ne; ba ya taɓa toshe aikin karin kuma ba ya tattara kowanne bayanin mutum.

---

### Daidaitawar sunan fayil (waɗanda suka maimaita) {#filename-normalization-duplicates-prevention}

Don gudanar da kyau tsakanin dandamali, sunayen fayil ana daidaita kafin binciken maimaitawa:

- Unicode ana daidaita zuwa NFC.
- Sunayen suna ƙananan (lowercased).
- Tsakanin alamu da sarari suna yankewa (amfanin Windows).

Wannan yana kiyaye ganewar maimaitawa mai tabbas don sunayen kamar `café.pdf` vs `café.pdf` (NFD) ko `FILE.txt.` vs `file.txt`.

---

## Halin Tabbatarwa {#confirmation-behavior}

- “Amsa ta tsohuwa” tana saita maɓallin da ke da hankali na farko a cikin dialog na tabbatarwa (mai amfani ga masu amfani da keyboard).
- Yana aiki duka don “Amsa” da “Amsa duka”. “Tura” ba a canza ta wannan karin ba.

---

## Haɓaka: ganewar maimaitawa {#advanced-duplicate-detection}

Ana aiwatar da hana maimaita a kowane shafin rubutun kuma ta sunan fayil. Duba [Amfani](usage#behavior-details) don karin bayani mai kyau.

---

Duba kuma

- [Izini](permissions)
- [Sirri](privacy)
