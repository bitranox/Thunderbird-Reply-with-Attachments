---
id: donation
title: 'Ziedot'
sidebar_label: 'Ziedot'
---

---

## Ziedot

import useBaseUrl from '@docusaurus/useBaseUrl';

Ja jums patīk "Reply with Attachments" un vēlaties atbalstīt tā izstrādi, varat ziedot šeit:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Ziedot, izmantojot Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>vai</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Ziedot, izmantojot PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>vai</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Nopērc man kafiju" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenējiet, lai nopirktu man kafiju"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Paldies! Jūsu atbalsts palīdz uzturēt saderību ar jaunajiem Thunderbird laidieniem, uzlabot pieejamību un testus, kā arī uzturēt dokumentāciju aktuālu.

Piezīmes

- Ziedošanas saites atveras tikai tad, kad uz tām noklikšķināt; papildinājums neveic nekādus fona tīkla pieprasījumus.
- Regulārs atbalsts palīdz ilgtermiņa uzturēšanā un savlaicīgu atjauninājumu nodrošināšanā, taču tas ir pilnīgi brīvprātīgs.

---

Ja attēla pogas neielādējas, lūdzu, izmantojiet šīs saites:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Nopērc man kafiju](https://buymeacoffee.com/bitranox)

---

Ziedojumi ir brīvprātīgi; piekļuve funkcijām netiek ierobežota.

---

## Ziedojumu redzamība (90 dienu atlikšana)

Papildinājumā ir ērta iespēja uz laiku paslēpt ziedošanas aicinājumus pēc tam, kad esat ziedojis.

- Kur to atrast
  - Opcijas → sadaļa Atbalsts: redzēsiet pogu “Es ziedoju” un nelielu norādes lauku.
  - Dialoglodziņā “Nosūtīšanas apstiprinājums” arī ir poga “Ziedot”; tā automātiski tiek paslēpta, kad atlikšana ir aktīva.

- Kā tas darbojas
  - Noklikšķinot uz “Es ziedoju”, ziedošanas pogas un saistītie paziņojumi tiek paslēpti uz 90 dienām.
  - Statusa norāde rāda “Slēpts līdz YYYY‑MM‑DD” (jūsu vietējā datumā). Ir arī poga “Rādīt “Ziedot” vēlreiz”, lai nekavējoties atjaunotu redzamību.
  - Pēc 90 dienām poga “Ziedot” atkal kļūst redzama automātiski.

- Privātums un glabāšana
  - Papildinājums Thunderbird lokālajā krātuvē saglabā vienu laika zīmogu, lai atcerētos atlikšanas periodu. Atslēga: `donateHideUntil` (epočas milisekundes).
  - Šis iestatījums ir lokāls jūsu Thunderbird profilam (nesinhronizējas ar mākoni). Šī funkcija neveic nekādus tīkla pieprasījumus.

- Problēmu novēršana
  - Ja poga “Ziedot” joprojām tiek rādīta tūlīt pēc noklikšķināšanas uz “Es ziedoju”, uzgaidiet mirkli vai atveriet no jauna lapu Opcijas; lietotāja saskarne atjauninās, tiklīdz iestatījums tiks saglabāts.
  - Lai atiestatītu manuāli, noklikšķiniet uz “Rādīt “Ziedot” vēlreiz”. Varat arī pagaidīt līdz norādītajam datumam.

Šī funkcija ir paredzēta tikai ērtībai; tā nekad neierobežo papildinājuma funkcionalitāti un neievāc nekādus personas datus.

---
