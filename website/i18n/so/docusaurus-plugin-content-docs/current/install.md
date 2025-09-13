---
id: install
title: 'Rakiba'
slug: /install
sidebar_label: 'Rakiba'
---

## Rakiba adoo isticmaalaya "Thunderbird Add-ons iyo Mawdho" {#installation-in-thunderbird-recommended}

:::important Nooca ugu yaraan ee Thunderbird
Add‑on-ku wuxuu taageeraa Thunderbird **128 ESR ama ka cusub**. Noocyadii hore ma taageeraan.
:::

Tani waa habka rakibidda ee la talinayo. Add‑on-yo laga rakibay ATN (addons.thunderbird.net) ayaa helaya cusboonaysi otomaatig ah. Rakiba LOCAL/dev ma cusbooneysiinayaan si otomaatig ah.

- Nooca ugu yaraan ee Thunderbird: 128 ESR ama ka cusub.

1. Thunderbird-ka, tag **Tools > Add-ons iyo Mawdho**.
2. Raadi "ka jawaab celin la raacayo lifaaqyada".
3. Ku dar add-on-ka.

Ama fur bogga add-on-ka si toos ah: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Rakibidda gacanta laga bilaabo XPI {#local-installation-in-thunderbird}

### Soo degsashada faylka XPI {#download-the-xpi-file}

1. Tag bogga [Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Soo deji nooca ugu dambeeya ee add-on-ka sidii fayl XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Rakibida Thunderbird {#install-in-thunderbird-local}

1. Fur Thunderbird.
2. Tag **Tools > Add-ons iyo Mawdho**.
3. Gudaha **Maareeyaha Add-ons**, guji astaanta gear ee geeska sare ee midig.
4. Dooro **Rakib Add-on Fayl Ka...** liiska.
5. Dooro faylka la soo dejiyey `reply_with_attachments-x.y.z-tb.xpi`.
6. Xaqiiji rakibidda markii la waydiiyo.

---

## Rakibidda horumarinta {#installation-for-development}

### Soo degsashada kaydka {#download-the-repository}

1. Soo deji nooca ugu dambeeya ee kaydka GitHub.
2. Orod `make help` si aad u hesho wax badan oo macluumaad ah.

### Rakibida Thunderbird {#install-in-thunderbird-dev}

1. Fur Thunderbird.
2. Tag **Tools > Add-ons iyo Mawdho**.
3. Gudaha **Maareeyaha Add-ons**, guji astaanta gear ee geeska sare ee midig.
4. Dooro **Rakib Add-on Fayl Ka...** liiska.
5. Dooro faylka la abuuray `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Xaqiiji rakibidda markii la waydiiyo.

Fiiro gaar ah: Haddii Thunderbird aysan aqbalin `.zip` nidaamkaaga, dib u magacaw `.xpi` oo isku day "Rakib Add‑on Fayl Ka..." mar kale.

### Halkee laga heli karaa LOCAL ZIP {#where-local-zip}

- Marka hore, koobi add‑on-ka: orod `make pack` xididka kaydka.
- Kadib koobi walba, ka raadi zip “LOCAL” xididka kaydka (tusaale, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Kahor inta aan la dib u koobin tijaabada, kordhi noocyada labadaba `sources/manifest_ATN.json` iyo `sources/manifest_LOCAL.json`.

---

## Demida, Ka saaris, iyo Cusboonaysiinta {#disable-uninstall-updates}

- Demida: Thunderbird → Tools → Add‑ons iyo Mawdho → hel add‑on-ka → toggole off.
- Ka saaris: aragtidaas oo isku mid ah → menu saddexda dhibic → Ka saar.
- Cusboonaysiinta: rakibaadaha ATN si otomaatig ah ayey u cusboonaysiiyaan marka noocyada cusub la ansixiyo. Rakibaadaha LOCAL/dev ma cusboonaysiinayaan si otomaatig ah; dib u rakib dhismaha LOCAL cusub gacanta.
- Luminta dejinta gabi ahaanba: eeg [Aqoonsiga → Ka saarida xogta](privacy#data-removal).

Sidoo kale eeg

- [Degdeg](quickstart)
