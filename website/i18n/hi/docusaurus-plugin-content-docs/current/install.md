---
id: install
title: 'स्थापना'
slug: /install
sidebar_label: 'स्थापना'
---

---

## "Thunderbird Add-ons and Themes" के माध्यम से इंस्टॉलेशन {#installation-in-thunderbird-recommended}

:::important न्यूनतम Thunderbird संस्करण
यह ऐड‑ऑन Thunderbird **128 ESR या नया** का समर्थन करता है। पुराने संस्करण समर्थित नहीं हैं।
:::

यह अनुशंसित इंस्टॉलेशन विधि है। ATN (addons.thunderbird.net) से इंस्टॉल किए गए ऐड‑ऑन को स्वचालित अपडेट मिलते हैं। LOCAL/dev इंस्टॉल ऑटो‑अपडेट नहीं होते।

- न्यूनतम Thunderbird संस्करण: 128 ESR या नया।

1. Thunderbird में, **Tools > Add-ons and Themes** पर जाएँ।
2. "reply with attachments" खोजें।
3. ऐड‑ऑन जोड़ें।

या ऐड‑ऑन पेज सीधे खोलें: [Thunderbird ऐड‑ऑन (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI से मैन्युअल स्थापना {#local-installation-in-thunderbird}

### XPI फ़ाइल डाउनलोड करें {#download-the-xpi-file}

1. [Thunderbird ऐड‑ऑन पेज](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) पर जाएँ।
2. ऐड‑ऑन का नवीनतम संस्करण XPI फ़ाइल (`reply_with_attachments-x.y.z-tb.xpi`) के रूप में डाउनलोड करें।

### Thunderbird में इंस्टॉल करें {#install-in-thunderbird-local}

1. Thunderbird खोलें।
2. **Tools > Add-ons and Themes** पर जाएँ।
3. **Add-ons Manager** में, ऊपर‑दाएँ कोने में गियर आइकन पर क्लिक करें।
4. मेन्यू से **Install Add-on From File…** चुनें।
5. डाउनलोड की गई `reply_with_attachments-x.y.z-tb.xpi` फ़ाइल चुनें।
6. प्रॉम्प्ट होने पर इंस्टॉलेशन की पुष्टि करें।

---

## विकास हेतु स्थापना {#installation-for-development}

### रिपॉज़िटरी डाउनलोड करें {#download-the-repository}

1. GitHub रिपॉज़िटरी का नवीनतम संस्करण डाउनलोड करें।
2. अधिक जानकारी के लिए `make help` चलाएँ।

### Thunderbird में इंस्टॉल करें {#install-in-thunderbird-dev}

1. Thunderbird खोलें।
2. **Tools > Add-ons and Themes** पर जाएँ।
3. **Add-ons Manager** में, ऊपर‑दाएँ कोने में गियर आइकन पर क्लिक करें।
4. मेन्यू से **Install Add-on From File…** चुनें।
5. उत्पन्न फ़ाइल `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` चुनें।
6. प्रॉम्प्ट होने पर इंस्टॉलेशन की पुष्टि करें।

नोट: यदि Thunderbird आपके सिस्टम पर `.zip` स्वीकार नहीं करता, तो उसका नाम बदलकर `.xpi` कर दें और “Install Add‑on From File…” फिर से आज़माएँ।

### “LOCAL” ZIP कहाँ मिलेगी {#where-local-zip}

- पहले, ऐड‑ऑन को पैकेज करें: रिपॉज़िटरी रूट में `make pack` चलाएँ।
- पैकेजिंग के बाद, रिपॉज़िटरी रूट में “LOCAL” ज़िप ढूँढें (उदा., `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- टेस्टिंग के लिए पुनः पैकेज करने से पहले, `sources/manifest_ATN.json` और `sources/manifest_LOCAL.json` दोनों में संस्करण संख्या बढ़ाएँ।

---

## अक्षम करें, अनइंस्टॉल करें, और अपडेट्स {#disable-uninstall-updates}

- अक्षम करें: Thunderbird → Tools → Add‑ons and Themes → ऐड‑ऑन खोजें → टॉगल ऑफ करें।
- अनइंस्टॉल करें: वही व्यू → तीन‑बिंदु मेन्यू → Remove।
- अपडेट्स: ATN से इंस्टॉल किए गए ऐड‑ऑन नए संस्करण स्वीकृत होने पर ऑटो‑अपडेट होते हैं। LOCAL/dev इंस्टॉल ऑटो‑अपडेट नहीं होते; नया LOCAL बिल्ड मैन्युअली दोबारा इंस्टॉल करें।
- सेटिंग्स पूरी तरह हटाएँ: देखें [गोपनीयता → डेटा हटाना](privacy#data-removal)।

यह भी देखें

- [त्वरित आरंभ](quickstart)
