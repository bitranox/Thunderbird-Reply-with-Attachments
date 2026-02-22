---
id: install
title: 'ସ୍ଥାପନ'
slug: /install
sidebar_label: 'ସଂସ୍ଥାପନ'
---

---

## "Thunderbird Add-ons and Themes" ମାଧ୍ୟମରେ ସ୍ଥାପନ {#installation-in-thunderbird-recommended}

:::important ସର୍ବନ୍ୟୁନ Thunderbird ସଂସ୍କରଣ
ଏହି ଆଡ଼‑ଅନ୍ Thunderbird **128 ESR କିମ୍ବା ତାହାଠାରୁ ନୂତନ** କୁ ସମର୍ଥନ କରେ। ପୁରୁଣା ସଂସ୍କରଣଗୁଡ଼ିକୁ ସମର୍ଥନ ନାହିଁ।
:::

ଏହା ଅନୁଶଂସୀୟ ସ୍ଥାପନ ପ୍ରକ୍ରିୟା। ATN (addons.thunderbird.net) ରୁ ସ୍ଥାପିତ ଆଡ଼‑ଅନ୍‌ମାନେ ସ୍ୱୟଂଚାଳିତ ଅଦ୍ୟତନ ପାଆନ୍ତି। LOCAL/dev ସ୍ଥାପନଗୁଡ଼ିକ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଅଦ୍ୟତନ ହୁଏ ନାହିଁ।

- ସର୍ବନ୍ୟୁନ Thunderbird ସଂସ୍କରଣ: 128 ESR କିମ୍ବା ତାହାଠାରୁ ନୂତନ।

1. Thunderbird ରେ, **Tools > Add-ons and Themes** କୁ ଯାଆନ୍ତୁ।
2. "reply with attachments" ଖୋଜନ୍ତୁ।
3. ଆଡ଼‑ଅନ୍‌ଟି ଯୋଡନ୍ତୁ।

ନହେଲେ ସିଧାସଳଖ ଭାବେ ଆଡ଼‑ଅନ୍ ପୃଷ୍ଠା ଖୋଲନ୍ତୁ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI ରୁ ହସ୍ତଚାଳିତ ସ୍ଥାପନ {#local-installation-in-thunderbird}

### XPI ଫାଇଲଟି ଡାଉନଲୋଡ୍ କରନ୍ତୁ {#download-the-xpi-file}

1. [Thunderbird Add‑on ପୃଷ୍ଠା](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) କୁ ଯାଆନ୍ତୁ।
2. ଆଡ଼‑ଅନ୍‌ର ସବୁଠୁ ନବୀନ ସଂସ୍କରଣକୁ XPI ଫାଇଲ (`reply_with_attachments-x.y.z-tb.xpi`) ଭାବେ ଡାଉନଲୋଡ୍ କରନ୍ତୁ।

### Thunderbird ରେ ସ୍ଥାପନ କରନ୍ତୁ {#install-in-thunderbird-local}

1. Thunderbird ଖୋଲନ୍ତୁ।
2. **Tools > Add-ons and Themes** କୁ ଯାଆନ୍ତୁ।
3. **Add-ons Manager** ଭିତରେ, ଉପର-ଡାହାଣ କୋଣରେ ଥିବା ଗିୟାର ଆଇକନ୍‌ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।
4. ମେନୁରୁ **Install Add-on From File…** ଚୟନ କରନ୍ତୁ।
5. ଡାଉନଲୋଡ୍ କରାଯାଇଥିବା `reply_with_attachments-x.y.z-tb.xpi` ଫାଇଲଟି ଚୟନ କରନ୍ତୁ।
6. ପ୍ରମ୍ପ୍ଟ ହେଲେ ସ୍ଥାପନକୁ ସ୍ୱୀକୃତି ଦିଅନ୍ତୁ।

---

## ବିକାଶ ପାଇଁ ସ୍ଥାପନ {#installation-for-development}

### ରିପୋଜିଟୋରି ଡାଉନଲୋଡ୍ କରନ୍ତୁ {#download-the-repository}

1. GitHub ରିପୋଜିଟୋରିର ସବୁଠୁ ନବୀନ ସଂସ୍କରଣ ଡାଉନଲୋଡ୍ କରନ୍ତୁ।
2. ଅଧିକ ସୂଚନା ପାଇଁ `make help` ଚଳାନ୍ତୁ।

### Thunderbird ରେ ସ୍ଥାପନ କରନ୍ତୁ {#install-in-thunderbird-dev}

1. Thunderbird ଖୋଲନ୍ତୁ।
2. **Tools > Add-ons and Themes** କୁ ଯାଆନ୍ତୁ।
3. **Add-ons Manager** ଭିତରେ, ଉପର-ଡାହାଣ କୋଣରେ ଥିବା ଗିୟାର ଆଇକନ୍‌ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।
4. ମେନୁରୁ **Install Add-on From File…** ଚୟନ କରନ୍ତୁ।
5. ତିଆରି ହୋଇଥିବା ଫାଇଲ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ଚୟନ କରନ୍ତୁ।
6. ପ୍ରମ୍ପ୍ଟ ହେଲେ ସ୍ଥାପନକୁ ସ୍ୱୀକୃତି ଦିଅନ୍ତୁ।

ଟିପ୍ପଣୀ: ଯଦି ଆପଣଙ୍କ ସିଷ୍ଟମ୍‌ରେ Thunderbird `.zip` କୁ ଗ୍ରହଣ କରୁ ନାହିଁ, ଏହାକୁ `.xpi` କୁ ପୁନର୍ନାମକରଣ କରନ୍ତୁ ଏବଂ “Install Add‑on From File…” ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।

### LOCAL ZIP କେଉଁଠାରେ ମିଳିବ {#where-local-zip}

- ପ୍ରଥମେ, ଆଡ଼‑ଅନ୍‌ଟି ପ୍ୟାକେଜ୍ କରନ୍ତୁ: ରିପୋଜିଟୋରି ରୁଟ୍‌ରେ `make pack` ଚଳାନ୍ତୁ।
- ପ୍ୟାକେଜିଂ ପରେ, ରିପୋଜିଟୋରି ରୁଟ୍‌ରେ “LOCAL” zip ଖୋଜନ୍ତୁ (ଉଦାହରଣସ୍ୱରୂପ, `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- ଟେସ୍ଟିଂ ପାଇଁ ପୁନଃପ୍ୟାକେଜିଂ କରିବା ପୂର୍ବରୁ, `sources/manifest_ATN.json` ଏବଂ `sources/manifest_LOCAL.json` — ଉଭୟରେ ଭର୍ସନ୍ ବଢ଼ାନ୍ତୁ।

---

## ନିଷ୍କ୍ରିୟ, ଅନିସ୍ଥାପନ, ଏବଂ ଅଦ୍ୟତନ {#disable-uninstall-updates}

- ନିଷ୍କ୍ରିୟ: Thunderbird → Tools → Add‑ons and Themes → ଆଡ଼‑ଅନ୍‌ଟି ଖୋଜନ୍ତୁ → ଟଗଲ୍ କରି ଅଫ୍ କରନ୍ତୁ।
- ଅନିସ୍ଥାପନ: ସେଇ ଭ୍ୟୁ → ତିନି‑ଡଟ୍ ମେନୁ → Remove।
- ଅଦ୍ୟତନ: ନୂତନ ସଂସ୍କରଣ ଅନୁମୋଦିତ ହେଲେ ATN ସ୍ଥାପନଗୁଡ଼ିକ ସ୍ୱୟଂଚାଳିତ ଅଦ୍ୟତନ ପାଇଥାଏ। LOCAL/dev ସ୍ଥାପନଗୁଡ଼ିକ ସ୍ୱୟଂଚାଳିତ ଅଦ୍ୟତନ ହୁଅନ୍ତି ନାହିଁ; ନୂତନ LOCAL build କୁ ହାତେଇ ଭାବେ ପୁନଃସ୍ଥାପନ କରନ୍ତୁ।
- ସେଟିଂସ୍‌ଗୁଡ଼ିକୁ ସମ୍ପୂର୍ଣ୍ଣ ହଟାନ୍ତୁ: [ଗୋପନୀୟତା → ତଥ୍ୟ ଅପସାରଣ](privacy#data-removal) ଦେଖନ୍ତୁ।

ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [ଦ୍ରୁତ ଆରମ୍ଭ](quickstart)
