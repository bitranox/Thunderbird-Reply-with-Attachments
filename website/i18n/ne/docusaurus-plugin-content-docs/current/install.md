---
id: install
title: 'स्थापना'
slug: /install
sidebar_label: 'स्थापना'
---

---

## "Thunderbird Add-ons and Themes" मार्फत स्थापना {#installation-in-thunderbird-recommended}

:::important न्यूनतम Thunderbird संस्करण
यो एड‑अनले Thunderbird **128 ESR वा नयाँ** समर्थन गर्छ। पुराना संस्करणहरू समर्थित छैनन्।
:::

यो सिफारिस गरिएको स्थापना विधि हो। ATN (addons.thunderbird.net) बाट स्थापना गरिएका एड‑अनहरूले स्वचालित अपडेट प्राप्त गर्छन्। LOCAL/dev स्थापना स्वचालित रूपमा अपडेट हुँदैन।

- न्यूनतम Thunderbird संस्करण: 128 ESR वा नयाँ।

1. Thunderbird मा, **Tools > Add-ons and Themes** मा जानुहोस्।
2. "reply with attachments" खोज्नुहोस्।
3. एड‑अन थप्नुहोस्।

वा एड‑अन पृष्ठ सिधै खोल्नुहोस्: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI बाट म्यानुअल स्थापना {#local-installation-in-thunderbird}

### XPI फाइल डाउनलोड गर्नुहोस् {#download-the-xpi-file}

1. [Thunderbird एड‑अन पृष्ठ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) मा जानुहोस्।
2. एड‑अनको नवीनतम संस्करण XPI फाइलका रूपमा डाउनलोड गर्नुहोस् (`reply_with_attachments-x.y.z-tb.xpi`)।

### Thunderbird मा स्थापना गर्नुहोस् {#install-in-thunderbird-local}

1. Thunderbird खोल्नुहोस्।
2. **Tools > Add-ons and Themes** मा जानुहोस्।
3. **Add-ons Manager** मा, माथिल्लो‑दायाँ कुनामा रहेको गियर आइकनमा क्लिक गर्नुहोस्।
4. मेनुबाट **Install Add-on From File…** छान्नुहोस्।
5. डाउनलोड गरिएको `reply_with_attachments-x.y.z-tb.xpi` फाइल छान्नुहोस्।
6. प्रम्प्ट भएपछि स्थापना पुष्टि गर्नुहोस्।

---

## विकासका लागि स्थापना {#installation-for-development}

### रिपोजिटरी डाउनलोड गर्नुहोस् {#download-the-repository}

1. GitHub रिपोजिटरीको नवीनतम संस्करण डाउनलोड गर्नुहोस्।
2. थप जानकारीका लागि `make help` चलाउनुहोस्।

### Thunderbird मा स्थापना गर्नुहोस् {#install-in-thunderbird-dev}

1. Thunderbird खोल्नुहोस्।
2. **Tools > Add-ons and Themes** मा जानुहोस्।
3. **Add-ons Manager** मा, माथिल्लो‑दायाँ कुनामा रहेको गियर आइकनमा क्लिक गर्नुहोस्।
4. मेनुबाट **Install Add-on From File…** छान्नुहोस्।
5. सिर्जित फाइल `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` छान्नुहोस्।
6. प्रम्प्ट भएपछि स्थापना पुष्टि गर्नुहोस्।

नोट: यदि Thunderbird ले तपाईंको प्रणालीमा `.zip` स्वीकार्दैन भने, यसलाई `.xpi` मा पुनःनामकरण गरी “Install Add‑on From File…” पुन: प्रयास गर्नुहोस्।

### LOCAL ZIP कहाँ भेटिन्छ {#where-local-zip}

- पहिले, एड‑अन प्याकेज गर्नुहोस्: रिपोजिटरीको मूल (root) मा `make pack` चलाउनुहोस्।
- प्याकेजिङ पछि, रिपोजिटरीको मूलमा “LOCAL” zip फेला पार्नुहोस् (जस्तै, `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- टेस्टिङका लागि पुनः‑प्याकेज गर्नु अघि, `sources/manifest_ATN.json` र `sources/manifest_LOCAL.json` दुवैमा संस्करण बढाउनुहोस्।

---

## अक्षम गर्नु, अनइन्स्टल गर्नु, र अपडेटहरू {#disable-uninstall-updates}

- अक्षम गर्नु: Thunderbird → Tools → Add‑ons and Themes → एड‑अन फेला पार्नुहोस् → toggle off।
- अनइन्स्टल गर्नु: उही दृश्य → तीन‑बिन्दु मेनु → Remove।
- अपडेटहरू: नयाँ संस्करणहरू स्वीकृत भएपछि ATN इन्स्टलहरूले स्वतः‑अपडेट गर्छन्। LOCAL/dev इन्स्टलहरू स्वतः‑अपडेट हुँदैनन्; नयाँ LOCAL बिल्ड म्यानुअली पुन: इन्स्टल गर्नुहोस्।
- सेटिङहरू पूर्ण रूपमा हटाउन: [गोपनीयता → डेटा हटाउने](privacy#data-removal) हेर्नुहोस्।

यस पनि हेर्नुहोस्

- [छिटो सुरु](quickstart)
