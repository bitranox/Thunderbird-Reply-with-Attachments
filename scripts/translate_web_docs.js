/* eslint-env node */
/* global fetch */
// Translate a single Markdown file from website/docs into one or more locales under website/i18n.
// Only supports OpenAI. Reads OPENAI_API_KEY and OPENAI_MODEL from .env (or environment).
// Usage:
//   node scripts/translate_web_docs.js <doc|all> <lang|all>
//   make translation-web OPTS="<doc|all> <lang|all>"
// If arguments are omitted, the script prompts interactively for both.

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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

const LOGFILE = path.join(process.cwd(), 'translation_web.log');
function logLine(line) {
  try {
    fs.appendFileSync(LOGFILE, line + '\n', 'utf8');
  } catch {
    // best-effort logging; ignore failures
  }
}

function listWebsiteDocs() {
  const dir = 'website/docs';
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f);
}

function listWebsiteLocales() {
  const dir = 'website/i18n';
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
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

function loadEnvFromDotenv() {
  const p = '.env';
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  let lastKey = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.includes('=')) {
      const idx = line.indexOf('=');
      const k = line.slice(0, idx).trim();
      let v = line.slice(idx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!process.env[k]) process.env[k] = v;
      lastKey = k;
    } else if (lastKey && !raw.includes('=')) {
      // Continuation lines (e.g., long API keys broken across lines). Append trimmed.
      process.env[lastKey] = (process.env[lastKey] || '') + line;
    }
  }
}

async function callOpenAI(text, targetLang, locale) {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional localization engine. Translate Markdown while preserving structure. Do not translate code blocks or inline code tokens like __CODE_TOKEN_0__. The translation is in the context of a thunderbird extension for reply with attachment handling',
      },
      {
        role: 'user',
        content: `Translate the following Markdown from English to ${targetLang} (${locale}).\nRules:\n- Keep placeholders like __CODE_TOKEN_N__ unchanged.\n- Preserve headings, lists, and punctuation.\n- Keep front matter id unchanged; translate title/sidebar_label if present.\n\nMarkdown to translate:\n\n${text}`,
      },
    ],
  };
  const t = process.env.OPENAI_TEMPERATURE;
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payload.temperature = tv;
  }
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

async function callOpenAIShort(text, targetLang, locale) {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional localization engine. Translate short plain text from English to the requested locale. Output ONLY the translated text with no quotes, no labels, no prefixes, no explanations. The translation is in the context of a thunderbird extension for reply with attachment handling',
      },
      {
        role: 'user',
        content: `Locale: ${locale} (${targetLang})\nText: ${text}`,
      },
    ],
  };
  const t = process.env.OPENAI_TEMPERATURE;
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payload.temperature = tv;
  }
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
  return data.choices[0].message.content.trim().replace(/^"|"$/g, '');
}

function langNameFor(locale) {
  // Minimal mapping; for prompt clarity only.
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

async function translateMarkdown({ body, front }, locale) {
  const { protectedMd, tokens } = protectCode(body);
  const targetLang = langNameFor(locale);
  const translated = await callOpenAI(protectedMd, targetLang, locale);
  const restored = restoreCode(translated, tokens);

  const fmObj = parseFront(front || '');
  const titleEn = fmObj.title || '';
  const sidebarEn = fmObj.sidebar_label || '';

  async function translateShort(s) {
    if (!s) return s;
    return await callOpenAIShort(s, targetLang, locale);
  }

  const titleTr = await translateShort(titleEn);
  const sideTr = await translateShort(sidebarEn);

  function updateFront(originalFront, newTitle, newSidebar) {
    if (!originalFront) {
      const lines = [];
      if (newTitle) lines.push(`title: ${newTitle}`);
      if (newSidebar) lines.push(`sidebar_label: ${newSidebar}`);
      return lines.join('\n');
    }
    const lines = originalFront.split(/\r?\n/);
    let doneTitle = false;
    let doneSidebar = false;
    const mapLine = (line) => {
      // Keep id line exactly as-is; never translate key or value here
      if (/^\s*id\s*:/i.test(line)) return line;
      // Replace title value
      if (newTitle && /^\s*title\s*:/i.test(line)) {
        const prefix = line.replace(/^(\s*title\s*:\s*).*$/i, '$1');
        // preserve quoting style if present
        const quoted = line.slice(prefix.length).trim();
        let q = '';
        if (/^".*"$/.test(quoted)) q = '"';
        else if (/^'.*'$/.test(quoted)) q = "'";
        const val = q ? q + newTitle.replaceAll(q, q === '"' ? '\\"' : "''") + q : newTitle;
        doneTitle = true;
        return prefix + val;
      }
      // Replace sidebar_label value
      if (newSidebar && /^\s*sidebar_label\s*:/i.test(line)) {
        const prefix = line.replace(/^(\s*sidebar_label\s*:\s*).*$/i, '$1');
        const quoted = line.slice(prefix.length).trim();
        let q = '';
        if (/^".*"$/.test(quoted)) q = '"';
        else if (/^'.*'$/.test(quoted)) q = "'";
        const val = q ? q + newSidebar.replaceAll(q, q === '"' ? '\\"' : "''") + q : newSidebar;
        doneSidebar = true;
        return prefix + val;
      }
      return line;
    };
    const outLines = lines.map(mapLine);
    if (newTitle && !doneTitle) outLines.push(`title: ${newTitle}`);
    if (newSidebar && !doneSidebar) outLines.push(`sidebar_label: ${newSidebar}`);
    return outLines.join('\n');
  }

  const updatedFront = updateFront(front || '', titleTr, sideTr);
  return `---\n${updatedFront}\n---\n\n${restored.trim()}\n`;
}

function splitTokens(str) {
  return str
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function isLocaleToken(t) {
  return /^[a-z]{2}([_-][A-Za-z0-9]+)?$/.test(t);
}

async function run() {
  const args = process.argv.slice(2).filter(Boolean);
  const flatArgs = args.flatMap((a) => (a.includes(',') ? splitTokens(a) : [a]));

  let docTokens = flatArgs.filter((t) => /\.md$/i.test(t));
  let otherTokens = flatArgs.filter((t) => !docTokens.includes(t));

  let docsAll = false;
  let langsAll = false;
  let langTokens = otherTokens.filter((t) => isLocaleToken(t.toLowerCase()));

  if (docTokens.length === 0 && otherTokens.includes('all')) {
    docsAll = true;
    otherTokens = otherTokens.filter((t) => t !== 'all');
  }
  if (otherTokens.includes('all')) {
    langsAll = true;
    otherTokens = otherTokens.filter((t) => t !== 'all');
  }
  langTokens = otherTokens.filter((t) => isLocaleToken(t.toLowerCase()));

  const needDocs = !docsAll && docTokens.length === 0;
  const needLangs = !langsAll && langTokens.length === 0;
  const rl = needDocs || needLangs ? readline.createInterface({ input, output }) : null;

  if (needDocs) {
    const docsAvail = listWebsiteDocs();
    const ans = (
      await rl.question(
        `Enter doc filenames (relative to website/docs). Multiple accepted (comma/space), or 'all'.\nAvailable:\n- ${docsAvail.join('\n- ')}\n> `
      )
    ).trim();
    if (ans.toLowerCase() === 'all') docsAll = true;
    else docTokens = splitTokens(ans);
  }

  if (needLangs) {
    const localesAvail = listWebsiteLocales();
    const ans = (
      await rl.question(
        `Enter target language codes (comma/space), or 'all'.\nAvailable: ${localesAvail.join(', ')}\n> `
      )
    ).trim();
    if (ans.toLowerCase() === 'all') langsAll = true;
    else langTokens = splitTokens(ans).map((s) => s.toLowerCase());
  }

  if (rl) rl.close();

  const docsList = docsAll ? listWebsiteDocs() : docTokens;
  const locales = langsAll ? listWebsiteLocales() : langTokens;

  if (docsList.length === 0) {
    console.error('No documents specified.');
    process.exit(2);
  }
  if (locales.length === 0) {
    console.error('No target languages specified.');
    process.exit(2);
  }

  const totalPairs = docsList.length * locales.length;
  let completedPairs = 0;
  const barWidth = Number(process.env.TRANSLATE_PROGRESS_WIDTH || 28);
  function renderBar(done, total) {
    const frac = total > 0 ? done / total : 0;
    const filled = Math.round(barWidth * frac);
    const bar = `[${'#'.repeat(filled)}${'.'.repeat(Math.max(0, barWidth - filled))}]`;
    const pct = String(Math.round(frac * 100)).padStart(3, ' ');
    return `${bar} ${pct}% (${done}/${total})`;
  }
  function drawProgress() {
    process.stdout.write(`\r${renderBar(completedPairs, totalPairs)}`);
  }
  // Log batch start
  const startIso = new Date().toISOString();
  logLine(
    `[START] ${startIso} docs=${JSON.stringify(docsList)} locales=${JSON.stringify(locales)}`
  );

  for (const doc of docsList) {
    const srcPath = path.join('website', 'docs', doc);
    if (!fs.existsSync(srcPath)) {
      console.error(`Skip: source not found ${srcPath}`);
      continue;
    }
    const en = readFile(srcPath);
    const { front, body } = splitFrontmatter(en);
    let done = 0;
    for (const locale of locales) {
      try {
        // status line before processing this pair
        const pairIso = new Date().toISOString();
        process.stdout.write(
          `\nStarting: ${doc} → ${locale} (${completedPairs + 1}/${totalPairs})\n`
        );
        logLine(`[PAIR-START] ${pairIso} file=${doc} locale=${locale}`);
        const out = await translateMarkdown({ body, front }, locale);
        const outPath = path.join(
          'website/i18n',
          locale,
          'docusaurus-plugin-content-docs',
          'current',
          path.basename(doc)
        );
        writeFile(outPath, out);
        done++;
        completedPairs++;
        drawProgress();
        await sleep(200);
      } catch (e) {
        console.error(`Error translating ${doc} → ${locale}:`, e.message);
        logLine(
          `[PAIR-ERROR] ${new Date().toISOString()} file=${doc} locale=${locale} error=${JSON.stringify(e.message)}`
        );
        completedPairs++;
        drawProgress();
        await sleep(500);
      }
    }
  }
  process.stdout.write(`\nCompleted ${completedPairs} translation(s).\n`);
  logLine(`[END] ${new Date().toISOString()} completed=${completedPairs}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
