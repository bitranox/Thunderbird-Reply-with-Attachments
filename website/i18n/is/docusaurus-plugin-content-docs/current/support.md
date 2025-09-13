---
id: support
title: 'Stuðningur'
sidebar_label: 'Stuðningur'
---

## FAQ {#faq}

### Viðhengi kom ekki með — hvers vegna?

- Inline myndir og S/MIME hlutar eru meðvitað undanskilin.
- Tvöfaldar skráarheiti eru sleppt ef samsetningin hefur þegar sömu skrá.
- Blacklist mynstur geta síað kandídata; sjá [Stillingar](configuration#blacklist-glob-patterns).

### Get ég staðfest áður en ég bætir viðhengjum við?

Já. Virkjaðu “Spyrja áður en bætt er viðhengjum við” undir [Stillingar → Staðfesting](configuration#confirmation). Tangent: Y/J = Já, N/Esc = Nei.

### Sendir viðbótin einhver gögn eða fylgist hún með notkun?

Nei. Sjá [Persónuvernd](privacy) — engin skynjun og engar bakgrunnsnetsbeiðnir.

### Framreiðsla bætir ekki viðhengjum — er það væntanlegt?

Já. Aðeins Svara og Svara öllum eru breytt af þessari viðbót; Framreiðsla er óbreytt. Sjá [Takmarkanir](usage#limitations).

### Hvar er Donera frí?

Valkostir → Stuðningshluti. Sjá [Sýnileiki gjaldanna](configuration#donation-visibility).

---

## Stuðningur

Þarftu hjálp eða viltu skrá villu?

---

### Opnaðu málefni á GitHub:

- Geymsla: `bitranox/Thunderbird-Reply-with-Attachments`
- Málefni: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Innihalda Thunderbird útgáfu (t.d. 128 ESR), OS, og skref til að endurtaka
- Bættu við viðeigandi skýrslum frá Villukonsól Thunderbird (Verkfæri → Forritara verkfæri → Villukonsól)

- Viðbótarvefsíða (ATN): Þú getur einnig skilið eftir athugasemdir í gegnum [viðbótarvefinn](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Gakktu úr skugga um að þú sért á studdu Thunderbird útgáfu (128 ESR eða nýrri).
- Kannaðu Stillingar og Notkun skjölin fyrir algengar spurningar um uppsetningu.
- Fyrir þróun/prófanir, skoðaðu Þróunarskjal.
- Ef geymdar stillingar virðast ekki rétt, endurræstu Thunderbird og reyndu aftur. (Thunderbird gæti vistað ástand yfir lotur; endurræsing tryggir að nýjar stillingar séu hlaðnar.)
- Minni endurteking: reyndu með litlu prófunarpósti sem inniheldur eina eða tvær einfaldar skráar viðhengi.
- Berðu saman hegðun með staðfestingu ON vs. OFF til að þrengja að hvort skriðirni ferlið sé tengt.

---

### Hvað á að innihalda í skýrslu

- Thunderbird útgáfu og OS
- Nákvæm skref til að endurtaka (hvað þú gerðir, hvað þú bjóst við, hvað gerðist)
- Hvort staðfesting var virkjuð og þinn sjálfgefið svarstilling
- Dæmi um þín blacklist mynstur (ef við á)
- Villukonsól skýrslur meðan á endurtekningu stendur (Verkfæri → Forritara verkfæri → Villukonsól)
- Virkjaðu villa skráningu (valfrjálst):
  - Keyra í Villukonsól Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Endurtaka málið og afrita viðeigandi `[RWA]` skráningar línur

---

### Málefnavísir (afrita/ líma) {#issue-template}

- Thunderbird útgáfu og OS:
- Skref til að endurtaka:
- Staðfesting virkjuð? Sjálfgefið svar:
- Dæmi um blacklist mynstur:
- Villukonsól skýrslur (Verkfæri → Forritara verkfæri → Villukonsól):
- Eitthvað annað viðeigandi:

---

### Donera

Ef þú vilt styðja þetta verkefni, vinsamlegast íhugaðu litla framlög á [Donera](donation) síðunni. Þakka þér!
