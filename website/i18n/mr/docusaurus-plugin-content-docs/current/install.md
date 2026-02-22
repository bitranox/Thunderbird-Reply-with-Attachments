---
id: install
title: 'प्रतिष्ठापन'
slug: /install
sidebar_label: 'स्थापना'
---

---

## "Thunderbird Add-ons and Themes" द्वारे स्थापना {#installation-in-thunderbird-recommended}

:::important किमान Thunderbird आवृत्ती
हा अॅड‑ऑन Thunderbird **128 ESR किंवा त्यापुढील** समर्थित करतो. जुन्या आवृत्त्या समर्थित नाहीत.
:::

ही शिफारस केलेली स्थापना पद्धत आहे. ATN (addons.thunderbird.net) वरून स्थापित केलेले अॅड‑ऑन्सना स्वयंचलित अद्यतने मिळतात. LOCAL/dev स्थापनेचे स्वयंचलित अद्यतन होत नाही.

- किमान Thunderbird आवृत्ती: 128 ESR किंवा त्यापुढील.

1. Thunderbird मध्ये **Tools > Add-ons and Themes** येथे जा.
2. "reply with attachments" साठी शोधा.
3. अॅड‑ऑन जोडा.

किंवा अॅड‑ऑनचे पृष्ठ थेट उघडा: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI मधून मॅन्युअल स्थापना {#local-installation-in-thunderbird}

### XPI फाइल डाउनलोड करा {#download-the-xpi-file}

1. [Thunderbird अॅड‑ऑन पृष्ठावर](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) जा.
2. अॅड‑ऑनची नवीनतम आवृत्ती XPI फाइल (`reply_with_attachments-x.y.z-tb.xpi`) म्हणून डाउनलोड करा.

### Thunderbird मध्ये स्थापना करा {#install-in-thunderbird-local}

1. Thunderbird उघडा.
2. **Tools > Add-ons and Themes** येथे जा.
3. **Add-ons Manager** मध्ये, उजव्या वरच्या कोपर्‍यातील गिअर आयकॉनवर क्लिक करा.
4. मेनूमधून **Install Add-on From File…** निवडा.
5. डाउनलोड केलेली `reply_with_attachments-x.y.z-tb.xpi` फाइल निवडा.
6. विनंती आल्यावर स्थापना पुष्टी करा.

---

## विकासासाठी स्थापना {#installation-for-development}

### रेपॉझिटरी डाउनलोड करा {#download-the-repository}

1. GitHub रेपॉझिटरीची नवीनतम आवृत्ती डाउनलोड करा.
2. अधिक माहितीसाठी `make help` चालवा.

### Thunderbird मध्ये स्थापना करा {#install-in-thunderbird-dev}

1. Thunderbird उघडा.
2. **Tools > Add-ons and Themes** येथे जा.
3. **Add-ons Manager** मध्ये, उजव्या वरच्या कोपर्‍यातील गिअर आयकॉनवर क्लिक करा.
4. मेनूमधून **Install Add-on From File…** निवडा.
5. निर्मित फाइल `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` निवडा.
6. विनंती आल्यावर स्थापना पुष्टी करा.

टीप: जर Thunderbird तुमच्या प्रणालीवर `.zip` स्वीकारत नसेल, तर त्याचे नाव बदलून `.xpi` करा आणि “Install Add‑on From File…” पुन्हा प्रयत्न करा.

### LOCAL ZIP कुठे मिळेल {#where-local-zip}

- प्रथम, अॅड‑ऑन पॅकेज करा: रेपॉझिटरी रूटमध्ये `make pack` चालवा.
- पॅकेजिंगनंतर, रेपॉझिटरी रूटमध्ये “LOCAL” zip शोधा (उदा., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- चाचणीसाठी पुन्हा पॅकेज करण्यापूर्वी, `sources/manifest_ATN.json` आणि `sources/manifest_LOCAL.json` या दोन्हीमध्ये आवृत्ती क्रमांक वाढवा.

---

## अक्षम करा, विस्थापित करा आणि अद्यतने {#disable-uninstall-updates}

- अक्षम करा: Thunderbird → Tools → Add‑ons and Themes → अॅड‑ऑन शोधा → टॉगल ऑफ करा.
- विस्थापित करा: त्याच दृश्यातून → तीन‑डॉट मेनू → Remove.
- अद्यतने: ATN मधून स्थापित केल्यास, नवीन आवृत्त्या मंजूर झाल्यावर स्वयंचलित अद्यतने मिळतात. LOCAL/dev स्थापना स्वयंचलित अद्यतनित होत नाही; नवीन LOCAL बिल्ड हस्तचालितपणे पुन्हा स्थापित करा.
- सेटिंग्ज पूर्णपणे काढा: [गोपनीयता → डेटा काढणे](privacy#data-removal) पहा.

हेही पहा

- [जलद प्रारंभ](quickstart)
