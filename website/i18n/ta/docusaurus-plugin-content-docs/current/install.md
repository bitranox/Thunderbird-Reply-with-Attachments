---
id: install
title: 'நிறுவல்'
slug: /install
sidebar_label: 'நிறுவல்'
---

---

## “Thunderbird Add-ons and Themes” மூலம் நிறுவல் {#installation-in-thunderbird-recommended}

:::important குறைந்தபட்ச Thunderbird பதிப்பு
இந்த add‑on, Thunderbird **128 ESR அல்லது அதற்கு மேல்** பதிப்புகளை ஆதரிக்கிறது. பழைய பதிப்புகள் ஆதரிக்கப்படாது.
:::

இது பரிந்துரைக்கப்படும் நிறுவல் முறை. ATN (addons.thunderbird.net) மூலம் நிறுவும் add‑ons தானியங்கி புதுப்பிப்புகளை பெறும். LOCAL/dev நிறுவல்கள் தானாகப் புதுப்பிக்கப்படாது.

- குறைந்தபட்ச Thunderbird பதிப்பு: 128 ESR அல்லது அதற்கு மேல்.

1. Thunderbird-இல், **Tools > Add-ons and Themes** க்கு செல்லவும்.
2. "reply with attachments" என்பதைத் தேடவும்.
3. add‑on ஐச் சேர்க்கவும்.

அல்லது add‑on பக்கத்தை நேரடியாகத் திறக்கவும்: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI-யிலிருந்து கையேடு நிறுவல் {#local-installation-in-thunderbird}

### XPI கோப்பை பதிவிறக்கவும் {#download-the-xpi-file}

1. [Thunderbird Add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)-க்கு செல்லவும்.
2. add‑on இன் சமீபத்திய பதிப்பை XPI கோப்பாக (`reply_with_attachments-x.y.z-tb.xpi`) பதிவிறக்கவும்.

### Thunderbird-இல் நிறுவவும் {#install-in-thunderbird-local}

1. Thunderbird-ஐத் திறக்கவும்.
2. **Tools > Add-ons and Themes** க்கு செல்லவும்.
3. **Add-ons Manager**-இல், மேல் வலது மூலையில் உள்ள கியர் ஐகானை கிளிக் செய்யவும்.
4. மெனுவில் இருந்து **Install Add-on From File…** ஐத் தேர்ந்தெடுக்கவும்.
5. பதிவிறக்கிய `reply_with_attachments-x.y.z-tb.xpi` கோப்பைத் தேர்ந்தெடுக்கவும்.
6. கேட்கப்பட்டபோது நிறுவலை உறுதிப்படுத்தவும்.

---

## உருவாக்கத்திற்கான நிறுவல் {#installation-for-development}

### களஞ்சியத்தை பதிவிறக்கவும் {#download-the-repository}

1. GitHub களஞ்சியத்தின் சமீபத்திய பதிப்பை பதிவிறக்கவும்.
2. மேலும் தகவல்களுக்கு `make help` ஐ இயக்கவும்.

### Thunderbird-இல் நிறுவவும் {#install-in-thunderbird-dev}

1. Thunderbird-ஐத் திறக்கவும்.
2. **Tools > Add-ons and Themes** க்கு செல்லவும்.
3. **Add-ons Manager**-இல், மேல் வலது மூலையில் உள்ள கியர் ஐகானை கிளிக் செய்யவும்.
4. மெனுவில் இருந்து **Install Add-on From File…** ஐத் தேர்ந்தெடுக்கவும்.
5. உருவாக்கப்பட்ட `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` கோப்பைத் தேர்ந்தெடுக்கவும்.
6. கேட்கப்பட்டபோது நிறுவலை உறுதிப்படுத்தவும்.

குறிப்பு: உங்கள் கணினியில் Thunderbird, `.zip` ஐ ஏற்காவிட்டால், அதை `.xpi` ஆக மறுபெயரிட்டு “Install Add‑on From File…” ஐ மீண்டும் முயற்சிக்கவும்.

### LOCAL ZIP எங்கே கிடைக்கும் {#where-local-zip}

- முதலில், add‑on-ஐ தொகுப்பாக்கவும்: களஞ்சியத்தின் ரூட்டில் `make pack` ஐ இயக்கவும்.
- தொகுப்பாக்கிய பிறகு, களஞ்சியத்தின் ரூட்டில் “LOCAL” zip-ஐக் கண்டுபிடிக்கவும் (உதா., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- சோதனைக்காக மீண்டும் தொகுப்பாக்குவதற்கு முன், `sources/manifest_ATN.json` மற்றும் `sources/manifest_LOCAL.json` இரண்டிலும் பதிப்புகளை உயர்த்தவும்.

---

## முடக்கு, அகற்று, மற்றும் புதுப்பிப்புகள் {#disable-uninstall-updates}

- முடக்கு: Thunderbird → Tools → Add‑ons and Themes → add‑on-ஐ கண்டுபிடித்து → toggle-ஐ off செய்யவும்.
- அகற்று: அதே காட்சி → மூன்று‑புள்ளி மெனு → Remove.
- புதுப்பிப்புகள்: புதிய பதிப்புகள் அங்கீகரிக்கப்பட்டவுடன், ATN நிறுவல்கள் தானாகப் புதுப்பிக்கப்படும். LOCAL/dev நிறுவல்கள் தானாகப் புதுப்பிக்கப்படாது; புதிய LOCAL build-ஐ கைமுறையாக மீண்டும் நிறுவவும்.
- அமைப்புகளை முழுமையாக அகற்ற: [தனியுரிமை → Data removal](privacy#data-removal) ஐப் பார்க்கவும்.

மேலும் பார்க்க

- [விரைவு தொடக்கம்](quickstart)
