---
id: install
title: 'ਇੰਸਟਾਲੇਸ਼ਨ'
slug: /install
sidebar_label: 'ਇੰਸਟਾਲੇਸ਼ਨ'
---

---

## "Thunderbird Add-ons and Themes" ਰਾਹੀਂ ਇੰਸਟਾਲੇਸ਼ਨ {#installation-in-thunderbird-recommended}

:::important ਘੱਟੋ-ਘੱਟ ਥੰਡਰਬਰਡ ਵਰਜਨ
ਇਹ ਐਡ‑ਆਨ Thunderbird **128 ESR ਜਾਂ ਨਵਾਂ** ਸਮਰਥਨ ਕਰਦਾ ਹੈ। ਪੁਰਾਣੀਆਂ ਵਰਜਨਾਂ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਹੈ।
:::

ਇਹ ਸਿਫਾਰਸ਼ੀ ਇੰਸਟਾਲੇਸ਼ਨ ਤਰੀਕਾ ਹੈ। ATN (addons.thunderbird.net) ਤੋਂ ਇੰਸਟਾਲ ਕੀਤੇ ਐਡ‑ਆਨਜ਼ ਨੂੰ ਆਪਣੇ‑ਆਪ ਅੱਪਡੇਟ ਮਿਲਦੇ ਹਨ। LOCAL/dev ਇੰਸਟਾਲ ਆਪਣੇ‑ਆਪ ਅੱਪਡੇਟ ਨਹੀਂ ਹੁੰਦੇ।

- ਘੱਟੋ-ਘੱਟ Thunderbird ਵਰਜਨ: 128 ESR ਜਾਂ ਨਵਾਂ।

1. Thunderbird ਵਿੱਚ **Tools > Add-ons and Themes** 'ਤੇ ਜਾਓ।
2. "reply with attachments" ਲਈ ਖੋਜ ਕਰੋ।
3. ਐਡ‑ਆਨ ਜੋੜੋ।

ਜਾਂ ਐਡ‑ਆਨ ਪੇਜ ਸਿੱਧੇ ਖੋਲ੍ਹੋ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI ਤੋਂ ਹੱਥੋਂ ਇੰਸਟਾਲੇਸ਼ਨ {#local-installation-in-thunderbird}

### XPI ਫਾਈਲ ਡਾਊਨਲੋਡ ਕਰੋ {#download-the-xpi-file}

1. [Thunderbird ਐਡ‑ਆਨ ਪੰਨਾ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) 'ਤੇ ਜਾਓ।
2. ਐਡ‑ਆਨ ਦੀ ਨਵੀਂਤਮ ਵਰਜਨ ਨੂੰ XPI ਫਾਈਲ ਵਜੋਂ ਡਾਊਨਲੋਡ ਕਰੋ (`reply_with_attachments-x.y.z-tb.xpi`)।

### Thunderbird ਵਿੱਚ ਇੰਸਟਾਲ ਕਰੋ {#install-in-thunderbird-local}

1. Thunderbird ਖੋਲ੍ਹੋ।
2. **Tools > Add-ons and Themes** 'ਤੇ ਜਾਓ।
3. **Add-ons Manager** ਵਿੱਚ, ਸੱਜੇ-ਉਪਰਲੇ ਕੋਨੇ ਵਿੱਚ ਗੀਅਰ ਆਈਕਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।
4. ਮੇਨੂ ਵਿੱਚੋਂ **Install Add-on From File…** ਚੁਣੋ।
5. ਡਾਊਨਲੋਡ ਕੀਤੀ ਹੋਈ `reply_with_attachments-x.y.z-tb.xpi` ਫਾਈਲ ਚੁਣੋ।
6. ਜਦੋਂ ਪੁੱਛਿਆ ਜਾਵੇ ਤਾਂ ਇੰਸਟਾਲੇਸ਼ਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।

---

## ਵਿਕਾਸ ਲਈ ਇੰਸਟਾਲੇਸ਼ਨ {#installation-for-development}

### ਰਿਪੋਜ਼ਟਰੀ ਡਾਊਨਲੋਡ ਕਰੋ {#download-the-repository}

1. GitHub ਰਿਪੋਜ਼ਟਰੀ ਦੀ ਨਵੀਂਤਮ ਵਰਜਨ ਡਾਊਨਲੋਡ ਕਰੋ।
2. ਹੋਰ ਜਾਣਕਾਰੀ ਲਈ `make help` ਚਲਾਓ।

### Thunderbird ਵਿੱਚ ਇੰਸਟਾਲ ਕਰੋ {#install-in-thunderbird-dev}

1. Thunderbird ਖੋਲ੍ਹੋ।
2. **Tools > Add-ons and Themes** 'ਤੇ ਜਾਓ।
3. **Add-ons Manager** ਵਿੱਚ, ਸੱਜੇ-ਉਪਰਲੇ ਕੋਨੇ ਵਿੱਚ ਗੀਅਰ ਆਈਕਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।
4. ਮੇਨੂ ਵਿੱਚੋਂ **Install Add-on From File…** ਚੁਣੋ।
5. ਤਿਆਰ ਕੀਤੀ ਫਾਈਲ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ਚੁਣੋ।
6. ਜਦੋਂ ਪੁੱਛਿਆ ਜਾਵੇ ਤਾਂ ਇੰਸਟਾਲੇਸ਼ਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।

ਨੋਟ: ਜੇ Thunderbird ਤੁਹਾਡੇ ਸਿਸਟਮ 'ਤੇ `.zip` ਕਬੂਲ ਨਹੀਂ ਕਰਦਾ, ਤਾਂ ਇਸਨੂੰ `.xpi` ਵਿੱਚ ਰੀਨੇਮ ਕਰੋ ਅਤੇ “Install Add‑on From File…” ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।

### LOCAL ZIP ਕਿੱਥੇ ਮਿਲੇਗੀ {#where-local-zip}

- ਸਭ ਤੋਂ ਪਹਿਲਾਂ, ਐਡ‑ਆਨ ਨੂੰ ਪੈਕੇਜ ਕਰੋ: ਰਿਪੋਜ਼ਟਰੀ ਰੂਟ ਵਿੱਚ `make pack` ਚਲਾਓ।
- ਪੈਕੇਜ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਰਿਪੋਜ਼ਟਰੀ ਰੂਟ ਵਿੱਚ “LOCAL” zip ਲੱਭੋ (ਜਿਵੇਂ ਕਿ `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- ਟੈਸਟਿੰਗ ਲਈ ਮੁੜ‑ਪੈਕੇਜ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, `sources/manifest_ATN.json` ਅਤੇ `sources/manifest_LOCAL.json` ਦੋਹਾਂ ਵਿੱਚ ਵਰਜਨ ਵਧਾਓ।

---

## ਅਯੋਗ ਕਰੋ, ਅਨਇੰਸਟਾਲ ਕਰੋ, ਅਤੇ ਅੱਪਡੇਟਸ {#disable-uninstall-updates}

- ਅਯੋਗ ਕਰੋ: Thunderbird → Tools → Add‑ons and Themes → ਐਡ‑ਆਨ ਲੱਭੋ → ਟੋਗਲ ਆਫ਼ ਕਰੋ।
- ਅਨਇੰਸਟਾਲ ਕਰੋ: ਉਹੀ ਦ੍ਰਿਸ਼ → ਤਿੰਨ‑ਡਾਟ ਮੇਨੂ → Remove।
- ਅੱਪਡੇਟਸ: ATN ਇੰਸਟਾਲ ਨਵੀਆਂ ਵਰਜਨਾਂ ਦੀ ਮਨਜ਼ੂਰੀ ਤੋਂ ਬਾਅਦ ਆਪਣੇ‑ਆਪ ਅੱਪਡੇਟ ਹੋ ਜਾਂਦੇ ਹਨ। LOCAL/dev ਇੰਸਟਾਲ ਆਪਣੇ‑ਆਪ ਅੱਪਡੇਟ ਨਹੀਂ ਹੁੰਦੇ; ਨਵੀਂ LOCAL ਬਿਲਡ ਹੱਥੋਂ ਮੁੜ ਇੰਸਟਾਲ ਕਰੋ।
- ਸੈਟਿੰਗਾਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਹਟਾਓ: ਵੇਖੋ [ਪ੍ਰਾਈਵੇਸੀ → ਡਾਟਾ ਹਟਾਉਣਾ](privacy#data-removal)।

ਇਹ ਵੀ ਵੇਖੋ

- [ਕੁਇਕਸਟਾਰਟ](quickstart)
