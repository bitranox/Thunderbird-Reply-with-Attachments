---
id: donation
title: 'दान गर्नुहोस्'
sidebar_label: 'दान गर्नुहोस्'
---

---

## दान गर्नुहोस्

import useBaseUrl from '@docusaurus/useBaseUrl';

यदि तपाईंलाई "Reply with Attachments" मन पर्छ र यसको विकासलाई समर्थन गर्न चाहनुहुन्छ भने, यहाँ दान गर्न सक्नुहुन्छ:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe मार्फत दान गर्नुहोस्" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>वा</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal मार्फत दान गर्नुहोस्" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>वा</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="मलाई कफी किन्नुहोस्" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="मलाई कफी किन्न स्क्यान गर्नुहोस्"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

धन्यवाद! तपाईंको समर्थनले नयाँ Thunderbird रिलिजहरूसँग अनुकूलता कायम राख्न, पहुँचयोग्यता र परीक्षण सुधार्न, र दस्तावेज अद्यावधिक राख्न मद्दत गर्छ।

नोटहरू

- दान लिङ्कहरू तपाईंले क्लिक गर्दा मात्र खुल्छन्; एड‑अनले कुनै पृष्ठभूमि नेटवर्क अनुरोध गर्दैन।
- आवर्ती समर्थनले दीर्घकालीन मर्मतसम्भार र समयमै अद्यावधिकमा मद्दत गर्छ, तर यो पूर्णतः वैकल्पिक हो।

---

यदि छविवाला बटनहरू लोड नभए, कृपया यसको सट्टा यी लिङ्कहरू प्रयोग गर्नुहोस्:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

दान स्वेच्छिक हो; कुनै फिचर गेटिङ छैन।

---

## दानको दृश्यता (९०‑दिन स्नुज)

एड‑अनमा तपाईंले दान गरेपछि केही समयका लागि दान प्रम्प्टहरू लुकाउनका लागि एक सहुलियत सुविधा समावेश छ।

- कहाँ भेटिन्छ
  - Options → Support खण्डमा: तपाईंले “I donated” बटन र सानो हिन्ट क्षेत्र देख्नुहुनेछ।
  - Send‑confirmation संवादमा पनि Donate बटन देखिन्छ; स्नुज सक्रिय हुँदा यो स्वतः लुक्छ।

- यसले कसरी काम गर्छ
  - “I donated” क्लिक गर्दा ९० दिनका लागि दान बटनहरू र सम्बन्धित प्रम्प्टहरू लुक्छन्।
  - स्थिति हिन्टमा “Hidden until YYYY‑MM‑DD” (तपाईंको स्थानीय मितिमा) देखिन्छ। तत्काल दृश्यता फिर्ता गर्न “Show Donate again” बटन पनि उपलब्ध छ।
  - ९० दिनपछि Donate बटन पुनः स्वतः देखिने हुन्छ।

- गोपनीयता र भण्डारण
  - स्नुज अवधि सम्झन एड‑अनले Thunderbird को स्थानीय भण्डारणमा एउटा मात्र टाइमस्ट्याम्प राख्छ। कुञ्जी: `donateHideUntil` (इपोक मिलिसेकेन्ड)।
  - यो सेटिङ तपाईंको Thunderbird प्रोफाइल‑मा स्थानीय हुन्छ (क्लाउड‑सिङ्क हुँदैन)। यो सुविधाले कुनै नेटवर्क अनुरोध गर्दैन।

- समस्या समाधान
  - यदि “I donated” क्लिक गरेपछि पनि तुरुन्तै Donate देखिइरहेछ भने, केही क्षण पर्खिनुहोस् वा Options पृष्ठ पुन: खोल्नुहोस्; सेटिङ सेभ भएलगत्तै UI अपडेट हुन्छ।
  - म्यानुअल रूपमा रिसेट गर्न “Show Donate again” क्लिक गर्नुहोस्। हिन्टमा देखाइएको मिति नाघुन्जेल पर्खन पनि सक्नुहुन्छ।

यो सुविधा बिल्कुलै सहजताका लागि मात्र हो; यसले कहिल्यै एड‑अनको कार्यसम्पादन रोक्दैन र कुनै व्यक्तिगत डेटा सङ्कलन गर्दैन।

---
