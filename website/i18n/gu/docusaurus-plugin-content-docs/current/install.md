---
id: install
title: 'સ્થાપન'
slug: /install
sidebar_label: 'સ્થાપન'
---

---

## “Thunderbird Add-ons and Themes” મારફતે ઇન્સ્ટોલેશન {#installation-in-thunderbird-recommended}

:::important ન્યૂનતમ Thunderbird આવૃત્તિ
આ એડ‑ઓન Thunderbird 128 ESR અથવા નવી આવૃત્તિઓને સપોર્ટ કરે છે. જૂની આવૃત્તિઓ સપોર્ટેડ નથી.
:::

આ ભલામણ કરાયેલ ઇન્સ્ટોલેશન પદ્ધતિ છે. ATN (addons.thunderbird.net) પરથી ઇન્સ્ટોલ કરેલા એડ‑ઓન્સને આપમેળે અપડેટ મળે છે. LOCAL/dev ઇન્સ્ટોલેશન્સ આપમેળે અપડેટ થતી નથી.

- ન્યૂનતમ Thunderbird આવૃત્તિ: 128 ESR અથવા નવી.

1. Thunderbird માં, **Tools > Add-ons and Themes** પર જાઓ.
2. "reply with attachments" શોધો.
3. એડ‑ઓન ઉમેરો.

અથવા એડ‑ઓન પેજ સીધું ખોલો: [Thunderbird એડ‑ઓન્સ (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI માંથી હસ્તચાલિત ઇન્સ્ટોલેશન {#local-installation-in-thunderbird}

### XPI ફાઈલ ડાઉનલોડ કરો {#download-the-xpi-file}

1. [Thunderbird એડ‑ઓન પેજ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) પર જાઓ.
2. એડ‑ઓનની નવીનતમ આવૃત્તિને XPI ફાઈલ તરીકે (`reply_with_attachments-x.y.z-tb.xpi`) ડાઉનલોડ કરો.

### Thunderbird માં ઇન્સ્ટોલ કરો {#install-in-thunderbird-local}

1. Thunderbird ખોલો.
2. **Tools > Add-ons and Themes** પર જાઓ.
3. **Add-ons Manager** માં, ઉપર‑જમણા ખૂણે ગિયર આઇકન પર ક્લિક કરો.
4. મેનુમાંથી **Install Add-on From File…** પસંદ કરો.
5. ડાઉનલોડ કરેલી `reply_with_attachments-x.y.z-tb.xpi` ફાઈલ પસંદ કરો.
6. સૂચના આવે ત્યારે ઇન્સ્ટોલેશનની પુષ્ટિ કરો.

---

## વિકાસ માટે ઇન્સ્ટોલેશન {#installation-for-development}

### રિપોઝિટરી ડાઉનલોડ કરો {#download-the-repository}

1. GitHub રિપોઝિટરીનું નવીનતમ સંસ્કરણ ડાઉનલોડ કરો.
2. વધુ માહિતી માટે `make help` ચલાવો.

### Thunderbird માં ઇન્સ્ટોલ કરો {#install-in-thunderbird-dev}

1. Thunderbird ખોલો.
2. **Tools > Add-ons and Themes** પર જાઓ.
3. **Add-ons Manager** માં, ઉપર‑જમણા ખૂણે ગિયર આઇકન પર ક્લિક કરો.
4. મેનુમાંથી **Install Add-on From File…** પસંદ કરો.
5. બનાવેલી ફાઈલ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` પસંદ કરો.
6. સૂચના આવે ત્યારે ઇન્સ્ટોલેશનની પુષ્ટિ કરો.

નોંધ: જો Thunderbird તમારા સિસ્ટમ પર `.zip` સ્વીકારતું ન હોય, તો તેને `.xpi` તરીકે નામાંતર કરો અને “Install Add‑on From File…” ફરી અજમાવો.

### LOCAL ZIP ક્યાં મળશે {#where-local-zip}

- પ્રથમ, એડ‑ઓનને પેક કરો: રિપોઝિટરી રૂટમાં `make pack` ચલાવો.
- પેકિંગ પછી, રિપોઝિટરી રૂટમાં “LOCAL” zip શોધો (ઉદાહરણ તરીકે, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ટેસ્ટિંગ માટે ફરીથી પેક કરવા પહેલાં, `sources/manifest_ATN.json` અને `sources/manifest_LOCAL.json` બંનેમાં વર્ઝન્સ વધારો.

---

## નિષ્ક્રિય, અનઇન્સ્ટોલ, અને અપડેટ્સ {#disable-uninstall-updates}

- નિષ્ક્રિય: Thunderbird → Tools → Add‑ons and Themes → એડ‑ઓન શોધો → ટૉગલ બંધ કરો.
- અનઇન્સ્ટોલ: એક જ દૃશ્ય → ત્રણ‑ડોટ મેનુ → Remove.
- અપડેટ્સ: નવી આવૃત્તિઓ મંજૂર થતા ATN ઇન્સ્ટોલેશન્સ auto‑update થાય છે. LOCAL/dev ઇન્સ્ટોલેશન્સ auto‑update થતી નથી; નવી LOCAL બિલ્ડ હાથથી ફરી ઇન્સ્ટોલ કરો.
- સેટિંગ્સ સંપૂર્ણપણે દૂર કરો: [ગોપનીયતા → ડેટા દૂર કરવું](privacy#data-removal) જુઓ.

આ પણ જુઓ

- [ઝડપી શરૂઆત](quickstart)
