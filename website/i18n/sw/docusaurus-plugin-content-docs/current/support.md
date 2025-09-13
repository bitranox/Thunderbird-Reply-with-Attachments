---
id: support
title: 'Msaada'
sidebar_label: 'Msaada'
---

## FAQ {#faq}

### Nje ya ziada hazijajumuishwa — kwa nini?

- Picha za ndani na sehemu za S/MIME zinakwepa kwa makusudi.
- Faili zenye majina sawa zinatupewa nafasi kama compose tayari ina faili sawa.
- Mipangilio ya blacklist inaweza kuchuja wagombea; angalia [Mipangilio](configuration#blacklist-glob-patterns).

### Naweza kuthibitisha kabla ya kuongeza viambatanisho?

Ndiyo. Wezesha "Uliza kabla ya kuongeza viambatanisho" chini ya [Mipangilio → Uthibitisho](configuration#confirmation). Kibodi: Y/J = Ndiyo, N/Esc = La.

### Je, nyongeza inaongeza data yoyote au kufuatilia matumizi?

Hapana. Angalia [Faragha](privacy) — hakuna telemetry na hakuna maombi ya mtandao ya nyuma.

### Forward haiongezei viambatanisho — je, hiyo inatarajiwa?

Ndiyo. Ni Reply tu na Reply all zinazobadilishwa na nyongeza hii; Forward imeachwa bila kubadilishwa. Angalia [Vikwazo](usage#limitations).

### Ndani ya Donate nini kimepotea?

Chaguo → Sehemu ya Msaada. Angalia [Mwonekano wa Doni](configuration#donation-visibility).

---

## Msaada

Unahitaji msaada au unataka kuripoti hitilafu?

---

### Fungua tatizo kwenye GitHub:

- Hifadhi: `bitranox/Thunderbird-Reply-with-Attachments`
- Maswala: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Jumuisha toleo la Thunderbird (mfano, 128 ESR), OS, na hatua za kureproduce
- Unganisha log zinazohusika kutoka kwa Console ya Hitilafu ya Thunderbird (Zana → Zana za Kimoja → Console ya Hitilafu)

- Tovuti ya nyongeza (ATN): Unaweza pia kuacha mrejesho kupitia [ukurasa wa nyongeza](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Vidokezo

- Hakikisha uko kwenye toleo linaloungwa mkono la Thunderbird (128 ESR au mpya).
- Angalia nyaraka za Mipangilio na Matumizi kwa maswali ya kawaida ya usakinishaji.
- Kwa maendeleo/testi, angalia mwongozaji wa Maendeleo.
- Ikiwa mipangilio iliyohifadhiwa inaonekana kutotumika ipasavyo, anzisha tena Thunderbird na ujaribu tena. (Thunderbird inaweza kuhifadhi hali kati ya vikao; kuchukua tena kunahakikisha mipangilio mpya inakabiliwa.)
- Ujumuishaji mdogo: jaribu na barua ndogo ya mtihani iliyo na viambatanisho viwili rahisi.
- Linganisha tabia ikiwezekana kwa uthibitisho KUWA na HAPANA ili kupunguza kama mchakato wa mazungumzo unahusika.

---

### Kile cha kujumuisha kwenye ripoti

- Toleo la Thunderbird na OS
- Hatua za exact za kureproduce (kilichofanywa, kile kilichotarajiwa, kilichotokea)
- Ikiwa uthibitisho uliwezesha na mipangilio yako ya majibu ya kivyake
- Mfano wa mipangilio yako ya blacklist (ikiwa inahitajika)
- Log za Console ya Hitilafu wakati wa kureproduce (Zana → Zana za Kimoja → Console ya Hitilafu)
- Wezesha log za debug (hiari):
  - Endesha kwenye Console ya Hitilafu ya Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Rekebisha tatizo na nakala ya mistari inayohusiana ya log `[RWA]`

---

### Kigezo cha tatizo (nakala/mwisho) {#issue-template}

- Toleo la Thunderbird na OS:
- Hatua za kureproduce:
- Je, uthibitisho umewezeshwa? Jibu la kivyake:
- Mifano ya mipangilio ya blacklist:
- Log za Console ya Hitilafu (Zana → Zana za Kimoja → Console ya Hitilifu):
- Kitu kingine chochote kinachohusiana:

---

### Weka

Ikiwa ungependa kusaidia mradi huu, tafadhali fikiria mchango mdogo kwenye ukurasa wa [Weka](donation). Asante!
