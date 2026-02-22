---
id: usage
title: 'Kugwiritsa Ntchito'
sidebar_label: 'Kugwiritsa Ntchito'
---

---

## Kugwiritsa Ntchito {#usage}

- Yankhani ndipo chowonjezera chimawonjezera zoyambirira zokha — kapena chimafunsa poyamba, ngati zayatsidwa mu Zosankha.
- Kubwereza kumapewa potengera dzina la fayilo; magawo a S/MIME amapitilidwa nthawi zonse. Zithunzi za inline zimabwezeretsedwa mu thupi la yankho mwachikhazikitso (mutha kuzitseka kudzera mu "Include inline pictures" mu Zosankha).
- Zomangiriridwa zomwe zili pa blacklist zimapitidwanso (mapatani a glob osasiyanitsa zilembo zazikulu/zazing'ono ofanana ndi maina a mafayilo, osati njira). Onani [Zokonza](configuration#blacklist-glob-patterns).

---

### Zimachitika chiyani mukamayankha {#what-happens}

- Kuzindikira yankho → kulemba mndandanda wa zomangiriridwa zoyambirira → kusefa S/MIME + inline → kutsimikizira posankha → kuwonjezera mafayilo oyenerera (dumphani zobwerezedwa) → kubwezeretsa zithunzi za inline m'thupi.

Kuyendera kolimba motsutsana ndi kofewa: Chowonjezera chimayamba pochotsa magawo a S/MIME ndi a inline ku zomangiriridwa za fayilo. Ngati palibe loyenera, chimayendetsa koyendera kofewa komwe komabe chimachotsa S/MIME/inline koma chimapirira milandu yochulukirapo (onani Code Details). Zithunzi za inline sazionjezedwa ngati zomangiriridwa za fayilo; m'malo mwake, pamene "Include inline pictures" yayatsidwa (mwachikhazikitso), zimamangidwamo mwachindunji mu thupi la yankho monga base64 data URIs.

| Mtundu wa gawo                                                      |                       Kuyendera kolimba |                        Kuyendera kofewa |
| ------------------------------------------------------------------- | --------------------------------------: | --------------------------------------: |
| Fayilo ya siginecha ya S/MIME `smime.p7s`                           |                             Zachotsedwa |                             Zachotsedwa |
| Mitundu ya MIME ya S/MIME (`application/pkcs7-*`)                   |                             Zachotsedwa |                             Zachotsedwa |
| Chithunzi cha inline chochitanidwa ndi Content‑ID (`image/*`)       | Zachotsedwa (zibwezeretsedwa m'thupi\*) | Zachotsedwa (zibwezeretsedwa m'thupi\*) |
| Imelo yomangiriridwa (`message/rfc822`) yokhala ndi dzina la fayilo |                          Sinalowetsedwe |                          Ingawonjezedwe |
| Chomangiriridwa cha fayilo wamba chokhala ndi dzina la fayilo       |                          Ingawonjezedwe |                          Ingawonjezedwe |

\* Pamene "Include inline pictures" yayatsidwa (mwachikhazikitso: ON), zithunzi za inline zimamangidwamo mu thupi la yankho monga base64 data URIs m'malo mowonjezedwa ngati zomangiriridwa za fayilo. Onani [Zokonza](configuration#include-inline-pictures).

Chitsanzo: Zina mwa zomangiriridwa zitha kusowa ma header ena koma zikadali mafayilo wamba (osati inline/S/MIME). Ngati kuyendera kolimba sikapeza chilichonse, kuyendera kofewa kungavomereze zimenezo ndi kuziwonjezera.

---

### Zolumikizana {#cross-reference}

- Kutumiza patsogolo (Forward) sikusinthidwa mwadala (onani Zolepheretsa pansipa).
- Zifukwa zomwe chomangiriridwa chingasawonjezedwe, onani “Why attachments might not be added”.

---

## Tsatanetsatane wa Makhalidwe {#behavior-details}

- **Kupewa zobwereza:** Chowonjezera chimazindikira tabu ya kulemba (compose) ngati yatayendetsedwa pogwiritsa ntchito mtengo wa gawo pa tabu iliyonse komanso chitetezo cha mkati mwa kukumbukira. Sichidzawonjezera zoyambirira kawiri.
- Kutseka ndi kutsegulanso zenera lolembapo kumawerengedwa ngati tabu yatsopano (ndiko kuti, kuyesanso kovomerezeka).
- **Kulemekeza zomangiriridwa zomwe zilipo kale:** Ngati zolembapo (compose) zili kale ndi zomangiriridwa zina, zoyambirira zidzawonjezedwabe kamodzi kokha, kudumphira maina a mafayilo omwe alipo kale.
- **Zochotsedwa:** Zinthu za S/MIME ndi zithunzi za inline zimachotsedwa ku zomangiriridwa za fayilo. Ngati palibe loyenera pa kuyendera koyamba, kulowererapo kofewa kumayang'ana kachiwiri magawo osati a S/MIME. Zithunzi za inline zimathandizidwa padera: zimabwezeretsedwa mu thupi la yankho monga data URIs (zikayatsidwa).
  - **Maina a mafayilo:** `smime.p7s`
  - **Mitundu ya MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Zithunzi za inline:** gawo lililonse la `image/*` lotchulidwa ndi Content‑ID — amachotsedwa ku zomangiriridwa za fayilo koma amamangidwamo mu thupi la yankho pamene "Include inline pictures" ili ON
  - **Ma imelo omangiriridwa (`message/rfc822`):** amachitidwa ngati zomangiriridwa wamba ngati ali ndi dzina la fayilo; angawonjezedwe (potengera kuyang'ana zobwerezedwa ndi blacklist).
- **Chenjezo la blacklist (ngati yatsegulidwa):** Pamene omwe akuyembekezeredwa achotsedwa chifukwa cha blacklist yanu,
  chowonjezera chimasonyeza modal yaying'ono yolembapo mafayilo omwe akhudzidwa ndi
  mapatani ogwirizana (pattern(s)). Chenjezo limeneli limawonekanso pamikhalidwe yomwe palibe chomangiriridwa chimene chidzawonjezedwe chifukwa chilichonse chachotsedwa.

---

## Zachidule pa kiyibodi {#keyboard-shortcuts}

- Zenera lotsimikizira: Y/J = Inde, N/Esc = Ayi; Tab/Shift+Tab ndi ma kiyi a Mivi (Arrow) amasinthasinthira cholunjika.
  - “Yankho losasintha” mu [Zokonza](configuration#confirmation) limakhazikitsa batani lomwe layang'ana poyamba.
  - Enter imayambitsa batani lolunjikidwa. Tab/Shift+Tab ndi mivi zimasuntha cholunjika kuti zithandize kupezeka.

### Pepala Lachidule la Kiyibodi {#keyboard-cheat-sheet}

| Makiyi            | Zochita                                             |
| ----------------- | --------------------------------------------------- |
| Y / J             | Tsimikizirani Inde                                  |
| N / Esc           | Tsimikizirani Ayi                                   |
| Enter             | Yambitsa batani lolunjikidwa                        |
| Tab / Shift+Tab   | Sunsitsani cholunjika kutsogolo/mmbuyo              |
| Ma mivi           | Sunsitsani cholunjika pakati pa mabatani            |
| Yankho losasintha | Imakhazikitsa cholunjika choyamba (Inde kapena Ayi) |

---

## Zolepheretsa {#limitations}

- Forward sali kusinthidwa ndi chowonjezerachi (Yankhani ndi Yankhani onse zothandizidwa).
- Zomangiriridwa zazikulu kwambiri zitha kukhala pansi pa malire a Thunderbird kapena a wopereka.
  - Chowonjezera sichimagawanagawana (chunk) kapena kukanikiza (compress) mafayilo; chimadalira momwe Thunderbird imayang'anira zomangiriridwa mwachizolowezi.
- Mauthenga obisidwa: magawo a S/MIME amachotsedwa mwadala.

---

## Chifukwa chomwe zomangiriridwa sizingawonjezedwe {#why-attachments-might-not-be-added}

- Zithunzi za inline sizionjezedwa ngati zomangiriridwa za fayilo. Pamene "Include inline pictures" ili ON (mwachikhazikitso), zimamangidwamo mu thupi la yankho monga data URIs m'malo mwake. Ngati zoikamo zikadali OFF, zithunzi za inline zimachotsedwa kwathunthu. Onani [Zokonza](configuration#include-inline-pictures).
- Magawo a siginecha a S/MIME amachotsedwa mwadala: maina a mafayilo monga `smime.p7s` ndi mitundu ya MIME ngati `application/pkcs7-signature` kapena `application/pkcs7-mime` amapitilidwa.
- Mapatani a blacklist angasefe omwe akuyembekezeredwa: onani [Zokonza](configuration#blacklist-glob-patterns); kufananira sikusiyanitsa zilembo zazikulu/zazing'ono ndipo kumangotengera dzina la fayilo.
- Maina a mafayilo obwereza samawonjezedwanso: ngati zolembapo zili kale ndi fayilo yokhala ndi dzina lofanana lomwe lasanjikizidwa, imadumphidwa.
- Magawo osati a fayilo kapena osalibe maina a fayilo: magawo okhala ngati fayilo okha okhala ndi maina a fayilo ogwiritsidwa ntchito ndi amene amaganiziridwa kuti awonjezedwe.

---

Onaninso

- [Zokonza](configuration)
