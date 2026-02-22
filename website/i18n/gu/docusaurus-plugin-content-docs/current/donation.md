---
id: donation
title: 'દાન કરો'
sidebar_label: 'દાન કરો'
---

---

## દાન કરો

import useBaseUrl from '@docusaurus/useBaseUrl';

જો તમને "Reply with Attachments" ગમે અને તેના વિકાસને સમર્થન આપવું હોય, તો તમે અહીં દાન કરી શકો છો:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="સ્ટ્રાઇપ દ્વારા દાન કરો" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>અથવા</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="પેપાલ દ્વારા દાન કરો" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>અથવા</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="મને એક કોફી ખરીદો" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="મને કોફી ખરીદવા માટે સ્કેન કરો"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

આભાર! તમારું સમર્થન Thunderbird ના નવા પ્રકાશનો સાથે સુસંગતતા જાળવવામાં, સુલભતા અને પરીક્ષણોમાં સુધારો કરવામાં, અને દસ્તાવેજીકરણને અપડેટ રાખવામાં મદદ કરે છે.

નોંધો

- દાન લિંક્સ ફક્ત તમે ક્લિક કરો ત્યારે જ ખૂલશે; એડ‑ઓન કોઇપણ પૃષ્ઠભૂમિ નેટવર્ક વિનંતીઓ નથી કરતું.
- આવર્તિત સમર્થન લાંબા ગાળાની જાળવણી અને સમયસર અપડેટમાં મદદરૂપ થાય છે, પરંતુ તે સંપૂર્ણપણે વૈકલ્પિક છે.

---

જો ઇમેજ બટનો લોડ ન થાય, તો કૃપા કરીને તેના બદલે નીચેની લિંક્સનો ઉપયોગ કરો:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

દાન સ્વૈચ્છિક છે; કોઈ ફીચર ગેટિંગ નથી.

---

## દાન દૃશ્યતા (90‑દિવસનું સ્નૂઝ)

તમે દાન કર્યા પછી થોડો સમય દાન માટેનાં પ્રોમ્પ્ટ્સ છુપાવવાની સુવિધા એડ‑ઓનમાં સામેલ છે.

- ક્યાં શોધવું
  - વિકલ્પો → સપોર્ટ વિભાગ: તમને “મેં દાન કર્યું” બટન અને નાનું સંકેત ક્ષેત્ર દેખાશે.
  - સેન્ડ‑કન્ફર્મેશન સંવાદમાં પણ “દાન કરો” બટન દેખાય છે; સ્નૂઝ સક્રિય હોય ત્યારે તે આપમેળે છૂપાઈ જાય છે.

- તે કેવી રીતે કાર્ય કરે છે
  - “મેં દાન કર્યું” ક્લિક કરવાથી 90 દિવસ માટે દાન બટનો અને સંબંધિત પ્રોમ્પ્ટ્સ છૂપાઈ જાય છે.
  - સ્થિતિ સંકેત “YYYY‑MM‑DD સુધી છૂપાયેલું” બતાવે છે (તમારી સ્થાનિક તારીખમાં). તરત જ દૃશ્યતા પુનઃસ્થાપિત કરવા માટે “દાન ફરીથી બતાવો” બટન પણ છે.
  - 90 દિવસ બાદ, “દાન કરો” બટન આપમેળે ફરી દૃશ્યમાન બને છે.

- ગોપનીયતા અને સંગ્રહ
  - સ્નૂઝ અવધિ યાદ રાખવા માટે એડ‑ઓન Thunderbird ના લોકલ સ્ટોરેજમાં એક જ ટાઇમસ્ટેમ્પ સંગ્રહી રાખે છે. કી: `donateHideUntil` (ઇપોક મિલિસેકન્ડ્સ).
  - આ સેટિંગ તમારા Thunderbird પ્રોફાઇલ માટે સ્થાનિક છે (ક્લાઉડ‑સિંક થયેલું નથી). આ સુવિધા દ્વારા કોઈ નેટવર્ક વિનંતીઓ કરવામાં આવતી નથી.

- સમસ્યા નિવારણ
  - જો “મેં દાન કર્યું” ક્લિક કર્યા પછી પણ “દાન” હજી દેખાય, તો થોડું રાહ જુઓ અથવા વિકલ્પો પેજ ફરી ખોલો; સેટિંગ સેવ થતાં જ UI અપડેટ થઈ જાય છે.
  - હસ્તકૃત રીતે રીસેટ કરવા માટે, “દાન ફરીથી બતાવો” ક્લિક કરો. તમે સંકેતમાં દર્શાવેલી તારીખ પસાર થાય ત્યાં સુધી રાહ પણ જોઇ શકો છો.

આ સુવિધા સંપૂર્ણપણે સુવિધા માટે છે; તે ક્યારેય એડ‑ઓનની કાર્યક્ષમતાને અવરોધતી નથી અને કોઈપણ વ્યક્તિગત માહિતી એકત્રિત કરતી નથી.

---
