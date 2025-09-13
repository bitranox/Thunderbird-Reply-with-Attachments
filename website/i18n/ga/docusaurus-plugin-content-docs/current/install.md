---
id: install
title: 'Suiteáil'
slug: /install
sidebar_label: 'Suiteáil'
---

## Suiteáil tríd "Ionchur agus Téamaí Thunderbird" {#installation-in-thunderbird-recommended}

:::important Leagan gníomhach íosta Thunderbird
Tacaíonn an t‑add‑on le Thunderbird **128 ESR nó níos nua**. Ní thacaítear le leagananna níos sine.
:::

Is é seo an modh suiteála molta. Baineann na h-add‑ona a shuiteáladh ó ATN (addons.thunderbird.net) nuashonruithe uathoibríoch. Ní nuashonraíonn suiteálacha LOCAL/dev go huathoibríoch.

- Leagan gníomhach íosta Thunderbird: 128 ESR nó níos nua.

1. I Thunderbird, téigh go **Uirlisí > Add-ons agus Téamaí**.
2. Cuardaigh "freagair le ceangaltán".
3. Cuir an t-add‑on leis.

Nó oscail an leathanach add‑on go díreach: [Add-ons Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Suiteáil lámhach ó XPI {#local-installation-in-thunderbird}

### Íoslódáil an comhad XPI {#download-the-xpi-file}

1. Téigh go dtí [leathanach add-on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Íoslódáil an leagan is déanaí den t-add-on mar chomhad XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Suiteáil i Thunderbird {#install-in-thunderbird-local}

1. Oscail Thunderbird.
2. Téigh go **Uirlisí > Add-ons agus Téamaí**.
3. Sa **Bainisteoir Add-on**, cliceáil ar an deilbhín giarán i gcoirnéal ar dheis ar a barr.
4. Roghnaigh **Suiteáil Add-on Ó Chomhad…** ón roghchlár.
5. Roghnaigh an comhad `reply_with_attachments-x.y.z-tb.xpi` a íoslódáil tú.
6. Deimhnigh an suiteáil nuair a iarrtar é.

---

## Suiteáil do thuilleadh forbartha {#installation-for-development}

### Íoslódáil an stór {#download-the-repository}

1. Íoslódáil an leagan is déanaí den stór GitHub.
2. Rith `make help` le haghaidh tuilleadh eolais.

### Suiteáil i Thunderbird {#install-in-thunderbird-dev}

1. Oscail Thunderbird.
2. Téigh go **Uirlisí > Add-ons agus Téamaí**.
3. Sa **Bainisteoir Add-on**, cliceáil ar an deilbhín giarán i gcoirnéal ar dheis ar a barr.
4. Roghnaigh **Suiteáil Add-on Ó Chomhad…** ón roghchlár.
5. Roghnaigh an comhad a gheneráladh `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Deimhnigh an suiteáil nuair a iarrtar é.

Nota: Má dhiúltíonn Thunderbird an `.zip` ar do chóras, athainmnigh é go `.xpi` agus triail "Suiteáil Add-on Ó Chomhad…" arís.

### Cá háit le ZIP LOCAL a fháil {#where-local-zip}

- Ar dtús, pacáil an t-add‑on: reáchtáil `make pack` i mbunús an stór.
- Tar éis an phacála, faigh an zip "LOCAL" i mbunús an stór (e.g., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Roimh an phacáil arís le haghaidh tástála, ardóidh leaganacha i `sources/manifest_ATN.json` agus `sources/manifest_LOCAL.json`.

---

## Múch, Uninstall, agus Nuashonruithe {#disable-uninstall-updates}

- Múch: Thunderbird → Uirlisí → Add-ons agus Téamaí → faigh an t-add-on → múch.
- Uninstall: an comhoibriú céanna → roghchlár trí phointe → Bain.
- Nuashonruithe: nuashonraíonn suiteálacha ATN go huathoibríoch nuair a bhíonn leaganacha nua ceadaithe. Ní nuashonraíonn suiteálacha LOCAL/dev go huathoibríoch; suiteáil leagan LOCAL nua go láimhe.
- Bain as na socruithe go hiomlán: féach [Príobháideacht → Bain úsáid as sonraí](privacy#data-removal).

Féach freisin

- [Gníomh gasta](quickstart)
