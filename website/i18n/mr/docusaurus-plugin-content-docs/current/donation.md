---
id: donation
title: 'देणगी द्या'
sidebar_label: 'देणगी द्या'
---

---

## देणगी

import useBaseUrl from '@docusaurus/useBaseUrl';

जर तुम्हाला "Reply with Attachments" आवडत असेल आणि त्याच्या विकासाला पाठिंबा द्यायचा असेल, तर तुम्ही येथे देणगी देऊ शकता:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe द्वारे देणगी द्या" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>किंवा</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal द्वारे देणगी द्या" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>किंवा</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="मला कॉफी घ्या" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="मला कॉफी घेण्यासाठी स्कॅन करा"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

धन्यवाद! तुमच्या पाठिंब्यामुळे नवीन Thunderbird रिलीझेसशी सुसंगतता राखणे, प्रवेशयोग्यता व चाचण्या सुधारणे, आणि दस्तऐवजीकरण अद्ययावत ठेवणे शक्य होते.

टीपा

- देणगी दुवे फक्त तुम्ही त्यांच्यावर क्लिक केल्यावरच उघडतात; अ‍ॅड‑ऑन कोणत्याही पार्श्वभूमी नेटवर्क विनंत्या करत नाही.
- पुनरावर्ती पाठिंबा दीर्घकालीन देखभाल आणि वेळेवर अद्यतनांना मदत करतो, परंतु तो पूर्णपणे ऐच्छिक आहे.

---

जर प्रतिमेची बटणे लोड झाली नाहीत, तर त्याऐवजी कृपया हे दुवे वापरा:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

देणग्या स्वैच्छिक आहेत; कोणतेही फिचर गेटिंग नाही.

---

## देणगी दृश्यमानता (90‑दिवसांची स्नुज)

देणगी दिल्यानंतर थोड्या काळासाठी देणगीच्या विनंत्या लपवण्याची एक सोयीची सुविधा या अ‍ॅड‑ऑनमध्ये आहे.

- कुठे सापडेल
  - पर्याय → समर्थन विभाग: तुम्हाला “मी देणगी दिली” बटण आणि एक लहान सूचनाक्षेत्र दिसेल.
  - Send‑confirmation डायलॉगमध्येही Donate बटण दिसते; स्नुज सक्रिय असताना ते आपोआप लपते.

- कसे कार्य करते
  - “मी देणगी दिली” वर क्लिक केल्यास 90 दिवसांसाठी देणगी बटणे आणि संबंधित सूचना लपतात.
  - स्थिती सूचनामध्ये “YYYY‑MM‑DD पर्यंत लपवले” (तुमच्या स्थानिक तारखेनुसार) असे दिसते. त्वरित दृश्यमानता पुनर्संचयित करण्यासाठी “देणगी पुन्हा दाखवा” असे बटणही आहे.
  - 90 दिवसांनंतर Donate बटण आपोआप पुन्हा दिसू लागते.

- गोपनीयता आणि संचयन
  - स्नुज कालावधी लक्षात ठेवण्यासाठी अ‍ॅड‑ऑन Thunderbird च्या लोकल स्टोरेजमध्ये एकच टाईमस्टॅम्प साठवते. Key: `donateHideUntil` (एपॉक मिलीसेकंद).
  - ही सेटिंग तुमच्या Thunderbird प्रोफाइलपुरती स्थानिक आहे (क्लाउड‑सिंक नाही). या सुविधेमुळे कोणत्याही नेटवर्क विनंत्या केल्या जात नाहीत.

- अडचण निवारण
  - “मी देणगी दिली” क्लिक केल्यानंतरही लगेच Donate दिसत असल्यास, क्षणभर थांबा किंवा पर्याय पृष्ठ पुन्हा उघडा; सेटिंग जतन होताच UI अद्यतनित होते.
  - हाताने रीसेट करण्यासाठी “देणगी पुन्हा दाखवा” क्लिक करा. किंवा सूचनेत दिलेली तारीख येईपर्यंत थांबा.

ही सुविधा केवळ सोयीसाठी आहे; ती कधीही अ‍ॅड‑ऑनची कार्यक्षमता अवरोधित करत नाही आणि कोणतीही वैयक्तिक माहिती गोळा करत नाही.

---
