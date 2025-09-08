for translation - always take the english pages as source :

from website/docs translate and create all the website/i18n files
from sources/\_locales/en/messages.json translate and create all the other language files
update all other fiiles which are needed for i18n translations as needed

- Translate WebExtension strings (sources/\_locales//messages.json).
- Translate all docs in website/docs into website/i18n//… .
- do not overwrite existing human translations
- Keep URLs, code blocks, and placeholders intact.

translate from "en": "en-US" to following languages :

    "en": "en-US", "zh": "zh", "hi": "hi-IN", "es": "es-ES", "ar": "ar",
    "fr": "fr-FR", "bn": "bn-BD", "pt": "pt-PT", "ru": "ru-RU", "id": "id-ID",
    "ur": "ur-PK", "de": "de-DE", "ja": "ja-JP", "pa": "pa-IN", "jv": "jv-ID",
    "ms": "ms-MY", "te": "te-IN", "vi": "vi-VN", "ko": "ko-KR", "mr": "mr-IN",
    "ta": "ta-IN", "tr": "tr-TR", "it": "it-IT", "th": "th-TH", "gu": "gu-IN",
    "fa": "fa-IR", "pl": "pl-PL", "ps": "ps-AF", "kn": "kn-IN", "ml": "ml-IN",
    "or": "or-IN", "my": "my-MM", "uk": "uk-UA", "ro": "ro-RO", "nl": "nl-NL",
    "ha": "ha-NG", "sw": "sw-TZ", "am": "am-ET", "hu": "hu-HU", "az": "az-AZ",
    "uz": "uz-UZ", "sd": "sd-PK", "he": "he-IL", "el": "el-GR", "cs": "cs-CZ",
    "sv": "sv-SE", "bg": "bg-BG", "da": "da-DK", "fi": "fi-FI", "no": "no-NO",
    "sk": "sk-SK", "sr": "sr-RS", "hr": "hr-HR", "bs": "bs-BA", "sl": "sl-SI",
    "lt": "lt-LT", "lv": "lv-LV", "et": "et-EE", "hy": "hy-AM", "ka": "ka-GE",
    "kk": "kk-KZ", "ky": "ky-KG", "tg": "tg-TJ", "tk": "tk-TM", "ne": "ne-NP",
    "si": "si-LK", "km": "km-KH", "lo": "lo-LA", "mn": "mn-MN", "su": "su-ID",
    "yo": "yo-NG", "ig": "ig-NG", "om": "om-ET", "zu": "zu-ZA", "xh": "xh-ZA",
    "af": "af-ZA", "so": "so-SO", "rw": "rw-RW", "rn": "rn-BI", "ln": "ln-CD",
    "sn": "sn-ZW", "ak": "ak-GH", "ff": "ff-SN", "bm": "bm-ML", "ny": "ny-MW",
    "ti": "ti-ER", "ug": "ug-CN", "ks": "ks-IN", "as": "as-IN", "tl": "tl-PH",
    "ca": "ca-ES", "be": "be-BY", "sq": "sq-AL", "qu": "qu-PE", "ht": "ht-HT",
    "mg": "mg-MG", "ku": "ku-TR", "wo": "wo-SN", "ga": "ga-IE", "is": "is-IS",

## comma separated list to make translation batches :

```txt

af,ak,am,ar,as,az,be,bg,bm,bn

bs,ca,cs,da,de,el,es,et,fa,ff

fi,fr,ga,gu,ha,he,hi,hr,ht,hu

hy,id,ig,is,it,ja,jv,ka,kk,km

kn,ko,ks,ku,ky,ln,lo,lt,lv,mg

ml,mn,mr,ms,my,ne,nl,no,ny,om

or,pa,pl,ps,pt,qu,rn,ro,ru,rw

sd,si,sk,sl,sn,so,sq,sr,su,sv

sw,ta,te,tg,th,ti,tk,tl,tr,ug

uk,ur,uz,vi,wo,xh,yo,zh,zu

```
