/* eslint-env node */
/* global fetch */
// Translate website/docs/*.md into all configured locales.
// Providers supported: openai, deepl, libretranslate
// Usage examples:
//   OPENAI_API_KEY=... node scripts/translate_docs.js --provider openai website/docs/changelog.md website/docs/features.md
//   DEEPL_AUTH_KEY=... node scripts/translate_docs.js --provider deepl website/docs/changelog.md website/docs/features.md
//   node scripts/translate_docs.js --provider libretranslate --lt-url http://localhost:5000 website/docs/changelog.md website/docs/features.md

import fs from 'node:fs';
import path from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function writeFile(p, s) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, s, 'utf8');
}

function parseLocalesFromConfig() {
  const cfg = readFile('website/docusaurus.config.js');
  const m = cfg.match(/I18N_LOCALES\s*=\s*\[(.*?)\]/s) || cfg.match(/locales\s*:\s*\[(.*?)\]/s);
  if (!m) throw new Error('Cannot find locales in docusaurus.config.js');
  const body = m[1];
  return Array.from(body.matchAll(/'([^']+)'|"([^"]+)"/g))
    .map((mm) => mm[1] || mm[2])
    .filter((l) => l && l !== 'en');
}

function splitFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: null, body: md };
  return { front: m[1], body: m[2] };
}

function parseFront(front) {
  const out = {};
  if (!front) return out;
  for (const line of front.split(/\r?\n/)) {
    const mm = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*):\s*(.*)$/);
    if (mm) out[mm[1]] = mm[2];
  }
  return out;
}

const CODE_TOKEN = (i) => `__CODE_TOKEN_${i}__`;
function protectCode(md) {
  const codeRe = /`[^`]*`|```[\s\S]*?```/g;
  const tokens = [];
  const protectedMd = md.replace(codeRe, (m) => {
    const idx = tokens.push(m) - 1;
    return CODE_TOKEN(idx);
  });
  return { protectedMd, tokens };
}
function restoreCode(md, tokens) {
  return md.replace(/__CODE_TOKEN_(\d+)__/g, (_, i) => tokens[Number(i)]);
}

async function callOpenAI(text, targetLang, locale) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');
  const model = process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional localization engine. Translate Markdown while preserving structure. Do not translate code blocks or inline code tokens like __CODE_TOKEN_0__.',
      },
      {
        role: 'user',
        content: `Translate the following Markdown from English to ${targetLang} (${locale}).
Rules:
- Keep placeholders like __CODE_TOKEN_N__ unchanged.
- Preserve headings, lists, and punctuation.
- Keep front matter id unchanged; translate title/sidebar_label if present.

Markdown to translate:\n\n${text}`,
      },
    ],
    temperature: 0.2,
  };
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} — ${errTxt}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callDeepL(text, targetLang, locale) {
  const key = process.env.DEEPL_AUTH_KEY;
  if (!key) throw new Error('DEEPL_AUTH_KEY not set');
  const host = key.endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate';
  const params = new URLSearchParams({ text, target_lang: locale.toUpperCase().replace('-', '_') });
  const res = await fetch(host, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`DeepL error: ${res.status} ${res.statusText} — ${t}`);
  }
  const data = await res.json();
  return data.translations?.[0]?.text || '';
}

async function callLibreTranslate(text, targetLang, locale) {
  const url = process.env.LT_URL || process.env.LIBRETRANSLATE_URL || 'http://localhost:5000';
  const res = await fetch(`${url.replace(/\/$/, '')}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source: 'en', target: locale.split('-')[0], format: 'text' }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`LibreTranslate error: ${res.status} ${res.statusText} — ${t}`);
  }
  const data = await res.json();
  return data.translatedText || '';
}

function langNameFor(locale) {
  // Minimal mapping; for provider prompts only.
  const map = {
    zh: 'Chinese',
    hi: 'Hindi',
    es: 'Spanish',
    ar: 'Arabic',
    fr: 'French',
    bn: 'Bengali',
    pt: 'Portuguese',
    ru: 'Russian',
    id: 'Indonesian',
    ur: 'Urdu',
    de: 'German',
    ja: 'Japanese',
    pa: 'Punjabi',
    jv: 'Javanese',
    ms: 'Malay',
    te: 'Telugu',
    vi: 'Vietnamese',
    ko: 'Korean',
    mr: 'Marathi',
    ta: 'Tamil',
    tr: 'Turkish',
    it: 'Italian',
    th: 'Thai',
    gu: 'Gujarati',
    fa: 'Persian',
    pl: 'Polish',
    ps: 'Pashto',
    kn: 'Kannada',
    ml: 'Malayalam',
    or: 'Odia',
    my: 'Burmese',
    uk: 'Ukrainian',
    ro: 'Romanian',
    nl: 'Dutch',
    ha: 'Hausa',
    sw: 'Swahili',
    am: 'Amharic',
    hu: 'Hungarian',
    az: 'Azerbaijani',
    uz: 'Uzbek',
    sd: 'Sindhi',
    he: 'Hebrew',
    el: 'Greek',
    cs: 'Czech',
    sv: 'Swedish',
    bg: 'Bulgarian',
    da: 'Danish',
    fi: 'Finnish',
    no: 'Norwegian',
    sk: 'Slovak',
    sr: 'Serbian',
    hr: 'Croatian',
    bs: 'Bosnian',
    sl: 'Slovenian',
    lt: 'Lithuanian',
    lv: 'Latvian',
    et: 'Estonian',
    hy: 'Armenian',
    ka: 'Georgian',
    kk: 'Kazakh',
    ky: 'Kyrgyz',
    tg: 'Tajik',
    tk: 'Turkmen',
    ne: 'Nepali',
    si: 'Sinhala',
    km: 'Khmer',
    lo: 'Lao',
    mn: 'Mongolian',
    su: 'Sundanese',
    yo: 'Yoruba',
    ig: 'Igbo',
    om: 'Oromo',
    zu: 'Zulu',
    xh: 'Xhosa',
    af: 'Afrikaans',
    so: 'Somali',
    rw: 'Kinyarwanda',
    rn: 'Kirundi',
    ln: 'Lingala',
    sn: 'Shona',
    ak: 'Akan',
    ff: 'Fula',
    bm: 'Bambara',
    ny: 'Nyanja',
    ti: 'Tigrinya',
    ug: 'Uyghur',
    ks: 'Kashmiri',
    as: 'Assamese',
    tl: 'Tagalog',
    ca: 'Catalan',
    be: 'Belarusian',
    sq: 'Albanian',
    qu: 'Quechua',
    ht: 'Haitian Creole',
    mg: 'Malagasy',
    ku: 'Kurdish',
    wo: 'Wolof',
    ga: 'Irish',
    is: 'Icelandic',
  };
  return map[locale] || locale;
}

async function translateMarkdown({ body, front }, locale, provider) {
  // Protect code and patterns
  const { protectedMd, tokens } = protectCode(body);
  const targetLang = langNameFor(locale);
  let translated;
  if (provider === 'openai') {
    translated = await callOpenAI(protectedMd, targetLang, locale);
  } else if (provider === 'deepl') {
    translated = await callDeepL(protectedMd, targetLang, locale);
  } else if (provider === 'libretranslate') {
    translated = await callLibreTranslate(protectedMd, targetLang, locale);
  } else {
    throw new Error(`Unknown provider: ${provider}`);
  }
  const restored = restoreCode(translated, tokens);

  // Rebuild front matter: keep id unchanged; translate title/sidebar_label via a light prompt call
  let fm = front || '';
  const fmObj = parseFront(front || '');
  const idLine = fmObj.id ? `id: ${fmObj.id}` : '';
  const titleEn = fmObj.title || '';
  const sidebarEn = fmObj.sidebar_label || '';

  // Translate just the title/sidebar_label using the same provider (short, deterministic)
  async function translateShort(s) {
    if (!s) return s;
    const input = `Translate to ${targetLang} (${locale}): ${s}`;
    if (provider === 'openai') {
      return (await callOpenAI(input, targetLang, locale)).trim().replace(/^"|"$/g, '');
    } else if (provider === 'deepl') {
      return (await callDeepL(s, targetLang, locale)).trim();
    } else {
      return (await callLibreTranslate(s, targetLang, locale)).trim();
    }
  }

  const titleTr = await translateShort(titleEn);
  const sideTr = await translateShort(sidebarEn);

  const fmLines = [];
  fmLines.push('---');
  if (idLine) fmLines.push(idLine);
  if (titleEn) fmLines.push(`title: ${titleTr}`);
  if (sidebarEn) fmLines.push(`sidebar_label: ${sideTr}`);
  fmLines.push('---');

  return `${fmLines.join('\n')}\n\n${restored.trim()}\n`;
}

async function run() {
  const args = process.argv.slice(2);
  const providerIdx = args.indexOf('--provider');
  if (providerIdx === -1) {
    console.error(
      'Usage: node scripts/translate_docs.js --provider <openai|deepl|libretranslate> <doc paths...>'
    );
    process.exit(2);
  }
  const provider = args[providerIdx + 1];
  const docs = args.filter((a, i) => i !== providerIdx && i !== providerIdx + 1);
  const targets = docs.length ? docs : ['website/docs/changelog.md', 'website/docs/features.md'];
  const locales = parseLocalesFromConfig();

  // Concurrency control
  const queue = [];
  const maxConcurrent = Number(process.env.TRANSLATE_CONCURRENCY || 3);
  let active = 0,
    idx = 0,
    completed = 0;

  function next() {
    if (idx >= locales.length * targets.length && active === 0) return Promise.resolve();
    while (active < maxConcurrent && idx < locales.length * targets.length) {
      const li = Math.floor(idx / targets.length);
      const di = idx % targets.length;
      const locale = locales[li];
      const doc = targets[di];
      idx++;
      active++;
      (async () => {
        try {
          const en = readFile(doc);
          const { front, body } = splitFrontmatter(en);
          const out = await translateMarkdown({ body, front }, locale, provider);
          const fileName = path.basename(doc);
          const outPath = path.join(
            'website/i18n',
            locale,
            'docusaurus-plugin-content-docs',
            'current',
            fileName
          );
          writeFile(outPath, out);
          completed++;
          process.stdout.write(
            `Translated ${doc} → ${locale} (${completed}/${locales.length * targets.length})\n`
          );
        } catch (e) {
          console.error(`Error translating ${doc} → ${locale}:`, e.message);
          // Backoff to be safe
          await sleep(1000);
        } finally {
          active--;
          next();
        }
      })();
    }
    return Promise.resolve();
  }

  await next();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
