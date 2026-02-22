---
id: install
title: 'Suiteáil'
slug: /install
sidebar_label: 'Suiteáil'
---

---

## Suiteáil trí "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Íosleagan Thunderbird
Tacaíonn an breiseán seo le Thunderbird **128 ESR nó níos nuaí**. Ní thacaítear le leaganacha níos sine.
:::

Is é seo an modh suiteála a mholtar. Faigheann breiseáin a shuiteáiltear ó ATN (addons.thunderbird.net) nuashonruithe uathoibríocha. Ní dhéanann suiteálacha LOCAL/dev uath‑nuashonrú.

- Íosleagan Thunderbird: 128 ESR nó níos nuaí.

1. I Thunderbird, téigh go **Tools > Add-ons and Themes**.
2. Cuardaigh "reply with attachments".
3. Cuir an breiseán leis.

Nó oscail leathanach an bhreiseáin go díreach: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Suiteáil láimhe ó XPI {#local-installation-in-thunderbird}

### Íoslódáil an comhad XPI {#download-the-xpi-file}

1. Téigh go dtí an [leathanach Breiseán Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Íoslódáil an leagan is déanaí den bhreiseán mar chomhad XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Suiteáil i Thunderbird {#install-in-thunderbird-local}

1. Oscail Thunderbird.
2. Téigh go **Tools > Add-ons and Themes**.
3. Sa **Add-ons Manager**, cliceáil deilbhín an ghiar sa chúinne uachtarach ar dheis.
4. Roghnaigh **Install Add-on From File…** ón roghchlár.
5. Roghnaigh an comhad íoslódáilte `reply_with_attachments-x.y.z-tb.xpi`.
6. Deimhnigh an tsuiteáil nuair a iarrtar ort.

---

## Suiteáil le haghaidh forbartha {#installation-for-development}

### Íoslódáil an stór {#download-the-repository}

1. Íoslódáil an leagan is déanaí den stór GitHub.
2. Rith `make help` le haghaidh tuilleadh eolais.

### Suiteáil i Thunderbird {#install-in-thunderbird-dev}

1. Oscail Thunderbird.
2. Téigh go **Tools > Add-ons and Themes**.
3. Sa **Add-ons Manager**, cliceáil deilbhín an ghiar sa chúinne uachtarach ar dheis.
4. Roghnaigh **Install Add-on From File…** ón roghchlár.
5. Roghnaigh an comhad ginte `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Deimhnigh an tsuiteáil nuair a iarrtar ort.

Nóta: Mura nglacann Thunderbird leis an `.zip` ar do chóras, athainmnigh é mar `.xpi` agus bain triail as “Install Add‑on From File…” arís.

### Cá bhfaighfear an LOCAL ZIP {#where-local-zip}

- Ar dtús, pacáistigh an breiseán: rith `make pack` i bhfréamh an stórais.
- Tar éis pacáistithe, aimsigh an zip “LOCAL” i bhfréamh an stórais (m.sh., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sula ndéanann tú ath‑phacáistiú le haghaidh tástála, ardaigh na leaganacha i `sources/manifest_ATN.json` agus `sources/manifest_LOCAL.json` araon.

---

## Díchumasaigh, Díshuiteáil, agus Nuashonruithe {#disable-uninstall-updates}

- Díchumasaigh: Thunderbird → Tools → Add‑ons and Themes → aimsigh an breiseán → múch.
- Díshuiteáil: an radharc céanna → roghchlár trí phonc → Remove.
- Nuashonruithe: Déanann suiteálacha ó ATN uath‑nuashonrú nuair a cheadaítear leaganacha nua. Ní dhéanann suiteálacha LOCAL/dev uath‑nuashonrú; suiteáil de láimh tógáil LOCAL nua.
- Bain socruithe go hiomlán: féach [Príobháideachas → Baint sonraí](privacy#data-removal).

Féach freisin

- [Tús tapa](quickstart)
