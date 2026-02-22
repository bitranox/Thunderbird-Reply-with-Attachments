---
id: install
title: 'ఇన్‌స్టాలేషన్'
slug: /install
sidebar_label: 'ఇన్‌స్టాలేషన్'
---

---

## "Thunderbird Add-ons and Themes" ద్వారా ఇన్‌స్టాలేషన్ {#installation-in-thunderbird-recommended}

:::important కనిష్ట Thunderbird వెర్షన్
ఈ యాడ్‑ఆన్ Thunderbird **128 ESR లేదా అంతకంటే కొత్తది** మద్దతు ఇస్తుంది. పాత సంచికలకు మద్దతు లేదు.
:::

ఇది సిఫార్సు చేసిన ఇన్‌స్టాలేషన్ విధానం. ATN (addons.thunderbird.net) నుండి ఇన్‌స్టాల్ చేసిన యాడ్‑ఆన్లకు స్వయంచాలక నవీకరణలు లభిస్తాయి. LOCAL/dev ఇన్‌స్టాల్లు ఆటో‑అప్‌డేట్ కావు.

- కనిష్ట Thunderbird వెర్షన్: 128 ESR లేదా కొత్తది.

1. Thunderbird లో, **Tools > Add-ons and Themes** కు వెళ్లండి.
2. "reply with attachments" కోసం శోధించండి.
3. యాడ్‑ఆన్‌ను జోడించండి.

లేదా యాడ్‑ఆన్ పేజీని నేరుగా తెరవండి: [Thunderbird యాడ్‑ఆన్లు (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI నుండి మాన్యువల్ ఇన్‌స్టాలేషన్ {#local-installation-in-thunderbird}

### XPI ఫైల్‌ను డౌన్‌లోడ్ చేయండి {#download-the-xpi-file}

1. [Thunderbird యాడ్‑ఆన్ పేజీ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) కి వెళ్లండి.
2. యాడ్‑ఆన్ యొక్క తాజా సంచికను XPI ఫైల్‌గా (`reply_with_attachments-x.y.z-tb.xpi`) డౌన్‌లోడ్ చేయండి.

### Thunderbird లో ఇన్‌స్టాల్ చేయండి {#install-in-thunderbird-local}

1. Thunderbird‌ను తెరవండి.
2. **Tools > Add-ons and Themes** కు వెళ్లండి.
3. **Add-ons Manager** లో, పై కుడి మూలలో గేర్ ఐకాన్‌పై క్లిక్ చేయండి.
4. మెనులో **Install Add-on From File…** ను ఎంచుకోండి.
5. డౌన్‌లోడ్ చేసిన `reply_with_attachments-x.y.z-tb.xpi` ఫైల్‌ను ఎంచుకోండి.
6. ప్రాంప్ట్ వచ్చినప్పుడు ఇన్‌స్టాలేషన్‌ను నిర్ధారించండి.

---

## డెవలప్‌మెంట్ కోసం ఇన్‌స్టాలేషన్ {#installation-for-development}

### రిపోజిటరీని డౌన్‌లోడ్ చేయండి {#download-the-repository}

1. GitHub రిపోజిటరీ యొక్క తాజా సంచికను డౌన్‌లోడ్ చేయండి.
2. ఇంకా సమాచారం కోసం `make help` నడపండి.

### Thunderbird లో ఇన్‌స్టాల్ చేయండి {#install-in-thunderbird-dev}

1. Thunderbird‌ను తెరవండి.
2. **Tools > Add-ons and Themes** కు వెళ్లండి.
3. **Add-ons Manager** లో, పై కుడి మూలలో గేర్ ఐకాన్‌పై క్లిక్ చేయండి.
4. మెనులో **Install Add-on From File…** ను ఎంచుకోండి.
5. సృష్టించిన `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ఫైల్‌ను ఎంచుకోండి.
6. ప్రాంప్ట్ వచ్చినప్పుడు ఇన్‌స్టాలేషన్‌ను నిర్ధారించండి.

గమనిక: మీ సిస్టంలో Thunderbird `.zip` ను అంగీకరించకపోతే, దాన్ని `.xpi` గా పేరు మార్చి “Install Add‑on From File…” ను మరోసారి ప్రయత్నించండి.

### LOCAL ZIP ఎక్కడ లభిస్తుంది {#where-local-zip}

- ముందుగా, యాడ్‑ఆన్‌ను ప్యాకేజ్ చేయండి: రిపోజిటరీ రూట్‌లో `make pack` నడపండి.
- ప్యాకేజింగ్ అనంతరం, రిపోజిటరీ రూట్‌లో “LOCAL” zip‌ను కనుగొనండి (ఉదా., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- టెస్టింగ్ కోసం మళ్లీ ప్యాకేజింగ్ చేయడానికి ముందు, `sources/manifest_ATN.json` మరియు `sources/manifest_LOCAL.json` రెండింటిలోనూ వెర్షన్‌లను పెంచండి.

---

## అచేతనం చేయడం, అన్‌ఇన్‌స్టాల్ చేయడం, మరియు నవీకరణలు {#disable-uninstall-updates}

- అచేతనం: Thunderbird → Tools → Add‑ons and Themes → యాడ్‑ఆన్‌ను కనుగొని → టాగుల్ ఆఫ్ చేయండి.
- అన్‌ఇన్‌స్టాల్: అదే వీక్షణలో → మూడు‑బిందుల మెను → Remove.
- నవీకరణలు: కొత్త వెర్షన్‌లు ఆమోదించబడినప్పుడు ATN ఇన్‌స్టాల్లు ఆటో‑అప్‌డేట్ అవుతాయి. LOCAL/dev ఇన్‌స్టాల్లు ఆటో‑అప్‌డేట్ కావు; కొత్త LOCAL బిల్డ్‌ను చేతిగా మళ్లీ ఇన్‌స్టాల్ చేయండి.
- సెట్టింగ్‌లను పూర్తిగా తొలగించండి: [గోప్యత → డేటా తొలగింపు](privacy#data-removal) చూడండి.

ఇవి కూడా చూడండి

- [త్వరిత ప్రారంభం](quickstart)
