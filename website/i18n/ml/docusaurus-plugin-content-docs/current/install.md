---
id: install
title: 'ഇൻസ്റ്റലേഷൻ'
slug: /install
sidebar_label: 'ഇൻസ്റ്റലേഷൻ'
---

---

## "Thunderbird Add-ons and Themes" വഴി ഇൻസ്റ്റാളേഷൻ {#installation-in-thunderbird-recommended}

:::important കുറഞ്ഞ Thunderbird പതിപ്പ്
ഈ ആഡ്‑ഓൺ Thunderbird **128 ESR or newer** നെ പിന്തുണയ്ക്കുന്നു. പഴയ പതിപ്പുകൾക്ക് പിന്തുണയില്ല.
:::

ഇതാണ് ശുപാർശ ചെയ്ത ഇൻസ്റ്റാളേഷൻ മാർഗം. ATN (addons.thunderbird.net) വഴി ഇൻസ്റ്റാൾ ചെയ്യുന്ന ആഡ്‑ഓണുകൾക്ക് സ്വയമേവ അപ്‌ഡേറ്റുകൾ ലഭിക്കും. LOCAL/dev ഇൻസ്റ്റാളുകൾ സ്വയം അപ്‌ഡേറ്റ് ചെയ്യില്ല.

- കുറഞ്ഞ Thunderbird പതിപ്പ്: 128 ESR അല്ലെങ്കിൽ പുതിയത്.

1. Thunderbird ൽ **Tools > Add-ons and Themes** ലേക്ക് പോകുക.
2. "reply with attachments" എന്ന് തിരയുക.
3. ആഡ്‑ഓൺ ചേർക്കുക.

അല്ലെങ്കിൽ ആഡ്‑ഓൺ പേജ് നേരിട്ട് തുറക്കുക: [Thunderbird ആഡ്‑ഓണുകൾ (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI വഴി മാനുവൽ ഇൻസ്റ്റാളേഷൻ {#local-installation-in-thunderbird}

### XPI ഫയൽ ഡൗൺലോഡ് ചെയ്യുക {#download-the-xpi-file}

1. [Thunderbird ആഡ്‑ഓൺ പേജ്](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ലേക്ക് പോകുക.
2. ആഡ്‑ഓണിന്റെ ഏറ്റവും പുതിയ പതിപ്പ് XPI ഫയലായി (`reply_with_attachments-x.y.z-tb.xpi`) ഡൗൺലോഡ് ചെയ്യുക.

### Thunderbird ൽ ഇൻസ്റ്റാൾ ചെയ്യുക {#install-in-thunderbird-local}

1. Thunderbird തുറക്കുക.
2. **Tools > Add-ons and Themes** ലേക്ക് പോകുക.
3. **Add-ons Manager** ൽ, മുകളിലെ വലത് വശത്തുള്ള ഗിയർ ഐക്കൺ ക്ലിക് ചെയ്യുക.
4. മെനുവിൽ നിന്ന് **Install Add-on From File…** തിരഞ്ഞെടുക്കുക.
5. ഡൗൺലോഡ് ചെയ്ത `reply_with_attachments-x.y.z-tb.xpi` ഫയൽ തിരഞ്ഞെടുക്കുക.
6. പ്രോംപ്‌റ്റ് വരുമ്പോൾ ഇൻസ്റ്റാളേഷൻ സ്ഥിരീകരിക്കുക.

---

## ഡെവലപ്‌മെന്റിനുള്ള ഇൻസ്റ്റാളേഷൻ {#installation-for-development}

### റിപ്പോസിറ്ററി ഡൗൺലോഡ് ചെയ്യുക {#download-the-repository}

1. GitHub റിപ്പോസിറ്ററിയുടെ ഏറ്റവും പുതിയ പതിപ്പ് ഡൗൺലോഡ് ചെയ്യുക.
2. കൂടുതൽ വിവരങ്ങൾക്ക് `make help` റൺ ചെയ്യുക.

### Thunderbird ൽ ഇൻസ്റ്റാൾ ചെയ്യുക {#install-in-thunderbird-dev}

1. Thunderbird തുറക്കുക.
2. **Tools > Add-ons and Themes** ലേക്ക് പോകുക.
3. **Add-ons Manager** ൽ, മുകളിലെ വലത് വശത്തുള്ള ഗിയർ ഐക്കൺ ക്ലിക് ചെയ്യുക.
4. മെനുവിൽ നിന്ന് **Install Add-on From File…** തിരഞ്ഞെടുക്കുക.
5. സൃഷ്ടിച്ച ഫയൽ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` തിരഞ്ഞെടുക്കുക.
6. പ്രോംപ്‌റ്റ് വരുമ്പോൾ ഇൻസ്റ്റാളേഷൻ സ്ഥിരീകരിക്കുക.

കുറിപ്പ്: നിങ്ങളുടെ സിസ്റ്റത്തിൽ Thunderbird `.zip` സ്വീകരിക്കാതെയാണെങ്കിൽ, അതിന്റെ പേര് `.xpi` ആയി മാറ്റി “Install Add‑on From File…” വീണ്ടും ശ്രമിക്കുക.

### LOCAL ZIP എവിടെ കണ്ടെത്താം {#where-local-zip}

- ആദ്യം, ആഡ്‑ഓൺ പാക്കേജ് ചെയ്യുക: റിപ്പോസിറ്ററിയുടെ റൂട്ടിൽ `make pack` റൺ ചെയ്യുക.
- പാക്കേജിംഗ് കഴിഞ്ഞാൽ, റിപ്പോസിറ്ററി റൂട്ടിൽ “LOCAL” zip കണ്ടെത്തുക (ഉദാ., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ടെസ്റ്റിംഗിനായി വീണ്ടും പാക്കേജുചെയ്യുന്നതിന് മുമ്പ്, `sources/manifest_ATN.json` യിലും `sources/manifest_LOCAL.json` യിലും പതിപ്പുകൾ കൂട്ടുക.

---

## ഡിസേബിൾ, അൺഇൻസ്റ്റാൾ, അപ്‌ഡേറ്റുകൾ {#disable-uninstall-updates}

- ഡിസേബിൾ: Thunderbird → Tools → Add‑ons and Themes → ആഡ്‑ഓൺ കണ്ടെത്തുക → ഓഫ് ചെയ്യുക.
- അൺഇൻസ്റ്റാൾ: അതേ വ്യൂ → മൂന്ന്‑ഡോട്ട് മെനു → Remove.
- അപ്‌ഡേറ്റുകൾ: പുതിയ പതിപ്പുകൾ അംഗീകരിക്കുമ്പോൾ ATN ഇൻസ്റ്റാളുകൾ സ്വയം അപ്‌ഡേറ്റ് ചെയ്യും. LOCAL/dev ഇൻസ്റ്റാളുകൾ സ്വയം അപ്‌ഡേറ്റ് ചെയ്യില്ല; പുതിയ LOCAL ബിൽഡ് മാനുവലായി വീണ്ടും ഇൻസ്റ്റാൾ ചെയ്യണം.
- സെറ്റിങ്ങുകൾ പൂർണ്ണമായും നീക്കുക: [സ്വകാര്യത → ഡാറ്റ നീക്കം](privacy#data-removal) കാണുക.

കൂടുതൽ കാണുക

- [ക്വിക്‌സ്റ്റാർട്ട്](quickstart)
