/* global fetch */
// Translate a single Markdown file from website/docs into one || more locales under website/i18n.
// Only supports OpenAI. Reads OPENAI_API_KEY && OPENAI_MODEL from .env (or environment).
// Usage:
//   node scripts/translate_web_docs.js <doc|all> <lang|all>
//   make translation-web OPTS="<doc|all> <lang|all>"
// If arguments are omitted, the script prompts interactively for both.

import fs from 'node:fs';
import path from 'node:path';
import {
  splitFrontmatter,
  parseFront,
  protectCode,
  restoreCode,
  stripCodeWrapper,
  dedupeTopFrontMatter,
  assertTokensIntegrity,
  scanCodeTokenIndices,
  systemPromptLines,
  normalizeAnchors,
} from './lib/translate_core.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FETCH_TIMEOUT_MS = Number(process.env.TRANSLATE_TIMEOUT_MS || 300_000);

function fetchWithTimeout(url, opts) {
  const ctrl = new globalThis.AbortController();
  const timer = globalThis.setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => globalThis.clearTimeout(timer));
}

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

const LOGFILE = path.join(process.cwd(), 'translation_web_sync.log');
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

// All helpers above now imported from ./lib/translate_core

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
  if (process.env.TRANSLATE_OFFLINE === '1') return text;
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment || .env');
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      { role: 'system', content: systemPromptLines().join('\n') },
      {
        role: 'user',
        content: `Translate the following Markdown from English to ${targetLang} (${locale}).\n\n${text}`,
      },
    ],
  };
  const t = process.env.OPENAI_TEMPERATURE;
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payload.temperature = tv;
  }
  const res = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
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
  if (process.env.TRANSLATE_OFFLINE === '1') return text;
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment || .env');
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content: [
          'You are a professional localization engine.',
          'Translate Markdown while preserving structure.',
          'NEVER translate || alter fenced/inline code — placeholders like __CODE_TOKEN_N__ must remain exactly as-is.',
          'Preserve anchors like {#label} literally.',
          'Do not add any extra code fences (no ```markdown wrappers).',
        ].join('\n'),
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
  const res = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
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

async function translateMarkdown({ body, front }, locale, docName = '') {
  const { protectedMd, tokens } = protectCode(body);
  const targetLang = langNameFor(locale);
  async function withRetry(task, label) {
    const max = 3;
    for (let i = 0; i < max; i++) {
      try {
        return await task();
      } catch (e) {
        if (i === max - 1) throw e;
        const delay = 400 * Math.pow(2, i);
        logLine(
          `[RETRY] ${new Date().toISOString()} file=${docName} locale=${locale} stage=${label} attempt=${i + 2}/${max} in ${delay}ms error=${(e && e.message) || e}`
        );
        await sleep(delay);
      }
    }
  }

  const translated = await withRetry(() => callOpenAI(protectedMd, targetLang, locale), 'body');
  assertTokensIntegrity(translated, tokens, `${docName}:${locale}`);
  const restored = stripCodeWrapper(restoreCode(translated, tokens));
  if (/__CODE_TOKEN_/.test(restored)) {
    const strict = (process.env.TRANSLATE_TOKENS_STRICT || '1') != '0';
    const leftover = Array.from(scanCodeTokenIndices(restored)).sort((a, b) => a - b);
    const msg = `Code-token leftovers detected after restore (${docName}:${locale}) indices=[${leftover.join(',')}]`;
    logLine(`[TOKENS] ${new Date().toISOString()} ${msg}`);
    if (strict) throw new Error(msg);
    console.warn(msg);
  }

  const fmObj = parseFront(front || '');
  const titleEn = fmObj.title || '';
  const sidebarEn = fmObj.sidebar_label || '';
  const titleSrc = titleEn.replace(/^['"]|['"]$/g, '');
  const sidebarSrc = sidebarEn.replace(/^['"]|['"]$/g, '');

  async function translateShort(s, label) {
    if (!s) return s;
    return await withRetry(() => callOpenAIShort(s, targetLang, locale), label);
  }

  const titleTr = await translateShort(titleSrc, 'title');
  const sideTr = await translateShort(sidebarSrc, 'sidebar');

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
      // Keep id line exactly as-is; never translate key || value here
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
  let out = `---\n${updatedFront}\n---\n\n${restored.trim()}\n`;
  out = normalizeAnchors(out);
  const dedup = dedupeTopFrontMatter(out);
  if (dedup != null) out = dedup;
  return out;
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
  // Support flags: --files <a,b> && --locales <l1,l2>
  const takeFlag = (names) => {
    const idx = args.findIndex((a) => names.some((n) => a === n || a.startsWith(n + '=')));
    if (idx === -1) return null;
    let val;
    const tok = args[idx];
    const name = names.find((n) => tok === n || tok.startsWith(n + '='));
    if (tok.includes('=')) {
      val = tok.slice(name.length + 1);
      args.splice(idx, 1);
    } else {
      val = args[idx + 1] || '';
      args.splice(idx, 2);
    }
    return val;
  };
  const filesFlag = takeFlag(['--files', '--file']);
  const localesFlag = takeFlag(['--locales', '--locale']);
  const flatArgs = args.flatMap((a) => (a.includes(',') ? splitTokens(a) : [a]));

  let docTokens = flatArgs.filter((t) => /\.md$/i.test(t));
  let otherTokens = flatArgs.filter((t) => !docTokens.includes(t));

  let docsAll = false;
  let langsAll = false;
  let langTokens = otherTokens.filter((t) => isLocaleToken(t.toLowerCase()));

  // Apply flag values if provided
  if (filesFlag) {
    docsAll = false;
    docTokens = splitTokens(filesFlag);
  }
  if (localesFlag) {
    langsAll = false;
    langTokens = splitTokens(localesFlag).map((s) => s.toLowerCase());
  }

  if (docTokens.length === 0 && otherTokens.includes('all')) {
    docsAll = true;
    otherTokens = otherTokens.filter((t) => t !== 'all');
  }
  if (otherTokens.includes('all') && !localesFlag) {
    langsAll = true;
    otherTokens = otherTokens.filter((t) => t !== 'all');
  }
  if (!localesFlag) {
    langTokens = otherTokens.filter((t) => isLocaleToken(t.toLowerCase()));
  }

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
    let _done = 0;
    for (const locale of locales) {
      try {
        // status line before processing this pair
        const pairIso = new Date().toISOString();
        process.stdout.write(
          `\nStarting: ${doc} → ${locale} (${completedPairs + 1}/${totalPairs})\n`
        );
        logLine(`[PAIR-START] ${pairIso} file=${doc} locale=${locale}`);
        // Show a dot every 5s so the user knows the API call is in progress
        const ticker = globalThis.setInterval(() => process.stdout.write('.'), 5000);
        let out;
        try {
          out = await translateMarkdown({ body, front }, locale, doc);
        } finally {
          globalThis.clearInterval(ticker);
        }
        if (!/^---\n[\s\S]*?\n---\n/.test(out + (out.endsWith('\n') ? '' : '\n'))) {
          logLine(
            `[FRONT] ${new Date().toISOString()} file=${doc} locale=${locale} final output missing front matter header`
          );
        }
        const outPath = path.join(
          'website/i18n',
          locale,
          'docusaurus-plugin-content-docs',
          'current',
          path.basename(doc)
        );
        writeFile(outPath, out);
        _done++;
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
