---
id: donation
title: 'दान करें'
sidebar_label: 'दान करें'
---

---

## दान करें

import useBaseUrl from '@docusaurus/useBaseUrl';

यदि आपको "Reply with Attachments" पसंद है और आप इसके विकास का समर्थन करना चाहते हैं, तो आप यहाँ दान कर सकते हैं:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe के माध्यम से दान करें" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>या</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal के माध्यम से दान करें" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>या</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="मुझे कॉफी पिलाएँ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="मुझे कॉफी खरीदने के लिए स्कैन करें"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

धन्यवाद! आपका सहयोग नए Thunderbird रिलीज़ के साथ अनुकूलता बनाए रखने, पहुँचयोग्यता और परीक्षणों में सुधार करने, और दस्तावेज़ीकरण को अद्यतन रखने में मदद करता है।

नोट्स

- दान लिंक केवल तब ही खुलते हैं जब आप उन पर क्लिक करते हैं; ऐड‑ऑन कोई पृष्ठभूमि नेटवर्क अनुरोध नहीं करता।
- आवर्ती समर्थन लंबे समय तक रखरखाव और समय पर अपडेट में मदद करता है, लेकिन यह पूरी तरह वैकल्पिक है।

---

यदि चित्र बटन लोड नहीं होते, तो कृपया इसके बजाय ये लिंक उपयोग करें:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

दान स्वैच्छिक है; कोई भी सुविधा दान के पीछे लॉक नहीं है।

---

## दान दृश्यता (90‑दिन स्नूज़)

दान करने के बाद कुछ समय के लिए दान संबंधी प्रॉम्प्ट्स छिपाने के लिए ऐड‑ऑन में एक सुविधा फ़ीचर शामिल है।

- इसे कहाँ पाएँ
  - Options → Support अनुभाग: आपको “I donated” बटन और एक छोटा संकेत क्षेत्र दिखाई देगा।
  - Send‑confirmation डायलॉग में भी Donate बटन दिखता है; स्नूज़ सक्रिय होने पर यह अपने‑आप छिप जाता है।

- यह कैसे काम करता है
  - “I donated” पर क्लिक करने से 90 दिनों के लिए दान बटन और संबंधित प्रॉम्प्ट्स छिप जाते हैं।
  - स्टेटस संकेत “Hidden until YYYY‑MM‑DD” (आपकी स्थानीय तिथि में) दिखाता है। दृश्यता तुरंत बहाल करने के लिए “Show Donate again” बटन भी है।
  - 90 दिनों के बाद Donate बटन अपने‑आप फिर से दिखाई देने लगता है।

- गोपनीयता और भंडारण
  - स्नूज़ अवधि याद रखने के लिए ऐड‑ऑन Thunderbird के लोकल स्टोरेज में एक टाइमस्टैम्प सहेजता है। Key: `donateHideUntil` (epoch milliseconds).
  - यह सेटिंग आपके Thunderbird प्रोफ़ाइल तक ही स्थानीय रहती है (क्लाउड‑सिंक नहीं होती)। यह फ़ीचर कोई नेटवर्क अनुरोध नहीं करता।

- समस्या निवारण
  - यदि “I donated” पर क्लिक करने के तुरंत बाद भी Donate दिख रहा है, तो कुछ क्षण प्रतीक्षा करें या Options पेज दोबारा खोलें; सेटिंग सहेजते ही UI अपडेट हो जाता है।
  - मैन्युअल रूप से रीसेट करने के लिए “Show Donate again” पर क्लिक करें। आप संकेत में दी गई तिथि बीतने तक प्रतीक्षा भी कर सकते हैं।

यह फ़ीचर केवल सुविधा के लिए है; यह कभी भी ऐड‑ऑन की कार्यक्षमता को अवरुद्ध नहीं करता और कोई भी व्यक्तिगत डेटा एकत्र नहीं करता।

---
