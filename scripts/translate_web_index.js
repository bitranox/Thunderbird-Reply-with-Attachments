/* global fetch */
// Translate website homepage/navbar/footer UI strings from website/i18n/en/code.json
// into all other locales at website/i18n/<locale>/code.json.
// Provider: OpenAI only (hardcoded), same approach as translate_app.js.
// - Copies structure; replaces only `message` values
// - Preserves placeholders like {year}, {slash}, {ctrl}, {k}, {code1}, {code2}, {changelog}
// - Does not touch 'en'
// - By default, only overwrites messages that are missing or identical to English (stubs)
// - Use --force to overwrite existing translations

import fs from 'node:fs';
import path from 'node:path';
// Single hardcoded provider (OpenAI), mirroring scripts/translate_app.js

const ROOT = process.cwd();
const WEB_I18N_DIR = path.join(ROOT, 'website', 'i18n');
const EN_PATH = path.join(WEB_I18N_DIR, 'en', 'code.json');
const LOGFILE = path.join(ROOT, 'translation_web_index.log');

function loadEnvFromDotenv() {
  const p = path.join(ROOT, '.env');
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
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
        v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
      lastKey = k;
    } else if (lastKey && !raw.includes('=')) {
      process.env[lastKey] = (process.env[lastKey] || '') + line;
    }
  }
}

function logLine(line) {
  try {
    fs.appendFileSync(LOGFILE, line + '\n', 'utf8');
  } catch {
    // best-effort logging
  }
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function listLocalesExceptEn() {
  return fs
    .readdirSync(WEB_I18N_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((l) => l !== 'en');
}

function collectCurlyPlaceholders(str) {
  if (typeof str !== 'string') return [];
  const set = new Set();
  const re = /\{[^}]+\}/g;
  let m;
  while ((m = re.exec(str))) set.add(m[0]);
  return [...set];
}

function validatePlaceholders(enMsg, trMsg) {
  const src = new Set(collectCurlyPlaceholders(enMsg));
  const got = new Set(collectCurlyPlaceholders(trMsg));
  for (const ph of src) if (!got.has(ph)) return false;
  return true;
}

function extractUrls(str) {
  if (typeof str !== 'string') return [];
  const URL_INNER_RE = /https?:\/\/[^\s)]+/gi;
  return [...(str.match(URL_INNER_RE) || [])];
}

function deepEqualExceptMessage(a, b) {
  const aa = JSON.parse(JSON.stringify(a));
  const bb = JSON.parse(JSON.stringify(b));
  if (aa && typeof aa === 'object') delete aa.message;
  if (bb && typeof bb === 'object') delete bb.message;
  return JSON.stringify(aa) === JSON.stringify(bb);
}

function validateTranslatedJson(enObj, trObj, _locale) {
  const issues = [];
  if (!trObj || typeof trObj !== 'object') {
    return { ok: false, issues: ['Top-level JSON is not an object'] };
  }
  const enKeys = Object.keys(enObj);
  const trKeys = Object.keys(trObj);
  const missing = enKeys.filter((k) => !trKeys.includes(k));
  const extra = trKeys.filter((k) => !enKeys.includes(k));
  if (missing.length) issues.push(`Missing keys: ${missing.join(', ')}`);
  if (extra.length) issues.push(`Unexpected extra keys: ${extra.join(', ')}`);
  for (const k of enKeys) {
    const enE = enObj[k];
    const trE = trObj[k];
    if (!trE || typeof trE !== 'object') {
      issues.push(`Key ${k}: entry missing or not object`);
      continue;
    }
    if (typeof trE.message !== 'string') issues.push(`Key ${k}: message missing or not string`);
    if (!deepEqualExceptMessage(enE, trE))
      issues.push(`Key ${k}: fields other than message changed`);
    const srcMsg = enE?.message ?? '';
    const dstMsg = trE?.message ?? '';
    if (!validatePlaceholders(srcMsg, dstMsg)) issues.push(`Key ${k}: missing curly placeholders`);
    const srcUrls = extractUrls(srcMsg);
    const dstUrls = extractUrls(dstMsg);
    if (srcUrls.join(' ') !== dstUrls.join(' ')) issues.push(`Key ${k}: URLs changed`);
  }
  return { ok: issues.length === 0, issues };
}

function stripJsonFences(s) {
  if (typeof s !== 'string') return '';
  const m = s.match(/```(?:json)?\n([\s\S]*?)```/i);
  return m ? m[1].trim() : s.trim();
}

function parseCliLocalesArg() {
  const keys = ['--locales', '--locale', '--langs', '--languages', '--localed'];
  let idx = -1;
  for (const k of keys) {
    idx = process.argv.findIndex((a) => a === k || a.startsWith(`${k}=`));
    if (idx !== -1) break;
  }
  if (idx === -1) return null;
  const val = process.argv[idx].includes('=')
    ? process.argv[idx].split('=')[1]
    : process.argv[idx + 1];
  if (!val) return null;
  return val
    .split(/[ ,]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

async function _callOpenAIShort(text, targetLocale) {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content:
          'You are a professional localization engine. Translate short UI strings for a documentation website. Preserve placeholders in curly braces like {year}, {changelog}, {code1}, {code2}, {slash}, {ctrl}, {k}. Do NOT translate content inside the braces. Output ONLY the translated text with no quotes or extra commentary.',
      },
      {
        role: 'user',
        content: `Locale: ${targetLocale}\nText: ${text}`,
      },
    ],
  };
  const t = process.env.OPENAI_TEMPERATURE;
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payload.temperature = tv;
  }
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} — ${errTxt}`);
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content || '').trim().replace(/^"|"$/g, '');
}

async function callOpenAIFull(enObj, targetLocale, feedback) {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const system = [
    'You are a professional localization engine.',
    'Translate UI JSON for a documentation website in the context of a Thunderbird add‑on which handles attachments when replying to an email.',
    'Always provide natural, flowing translations, especially where text is constructed through placeholders like $1, $2, $3.',
    'Maintain consistent terminology across the whole document.',
    'Do not change URLs.',
    'RULES:',
    '- Return ONLY valid JSON (no code fences, no comments).',
    '- Keep the exact same object structure and keys; change only the "message" values.',
    '- Preserve curly‑brace placeholders like {year}, {changelog}, {code1}, {code2}, {slash}, {ctrl}, {k}.',
    '- Do not translate content inside curly braces.',
  ].join('\n');
  const userBase = `Target locale: ${targetLocale}\n\nSOURCE JSON (English):\n${JSON.stringify(enObj, null, 2)}\n\nOutput the FULL translated JSON with identical structure, modifying only the message values.`;
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: userBase },
  ];
  if (feedback) {
    messages.push({
      role: 'user',
      content: `Your previous output had issues: ${feedback}. Please correct them. Output ONLY the corrected JSON, with exact keys and structure, changing only "message" values.`,
    });
  }
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages }),
  });
  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} — ${errTxt}`);
  }
  const data = await res.json();
  const out = (data.choices?.[0]?.message?.content || '').trim();
  const jsonText = stripJsonFences(out);
  return JSON.parse(jsonText);
}

async function main() {
  loadEnvFromDotenv();
  const force = process.argv.includes('--force') || process.argv.includes('--overwrite');
  const onlyLocales = parseCliLocalesArg();

  if (!fs.existsSync(EN_PATH)) {
    console.error(`EN source not found: ${EN_PATH}`);
    process.exit(1);
  }

  const en = readJson(EN_PATH);
  const allLocales = listLocalesExceptEn();
  const targets =
    onlyLocales && onlyLocales[0] !== 'all'
      ? allLocales.filter((l) => onlyLocales.includes(l))
      : allLocales;

  // Hardcoded provider: OpenAI only
  const info = `[index] Provider=openai; Locales=${targets.join(', ')}`;
  logLine(info);
  console.log(info);
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      '[index] OPENAI_API_KEY is not set; cannot translate. Create a .env or export it, then retry.'
    );
    process.exit(2);
  }

  // Overall progress bar across all locales
  const runLocales = targets.filter((l) => l !== 'en');
  const totalLocales = runLocales.length;
  let localesDone = 0;
  const overallBarLen = 32;
  const drawOverall = (done) => {
    const filled = totalLocales ? Math.round((done / totalLocales) * overallBarLen) : overallBarLen;
    const bar = '#'.repeat(filled) + '-'.repeat(overallBarLen - filled);
    const label = `[overall] ${done}/${totalLocales} locales`;
    process.stdout.write(`\r${label} [${bar}]`);
  };
  drawOverall(0);

  for (let i = 0; i < targets.length; i++) {
    const locale = targets[i];
    if (locale === 'en') {
      console.log('[index] Skipping en (no self-translation).');
      continue;
    }
    const outPath = path.join(WEB_I18N_DIR, locale, 'code.json');
    let existing = {};
    try {
      if (fs.existsSync(outPath)) existing = readJson(outPath);
    } catch {
      existing = {};
    }
    const total = Object.keys(en).length;
    console.log(`\n[index] Translating locale: ${locale} (${total} keys) — full document`);
    let attempts = 0;
    let trObj = null;
    let lastIssues = [];
    while (attempts < 3) {
      attempts++;
      const label = attempts === 1 ? 'first attempt' : `retry ${attempts - 1}`;
      process.stdout.write(`[index] ${locale}: ${label}…`);
      try {
        const feedback = lastIssues.length ? lastIssues.join('; ') : undefined;
        trObj = await callOpenAIFull(en, locale, feedback);
      } catch (e) {
        console.log(`\n[index] ${locale}: API error — ${e.message}`);
        lastIssues = ['API error'];
        continue;
      }
      const { ok, issues } = validateTranslatedJson(en, trObj, locale);
      if (ok) {
        console.log(' ok');
        break;
      }
      console.log(`\n[index] ${locale}: validation failed — ${issues.join('; ')}`);
      lastIssues = issues;
    }
    if (!trObj) {
      console.log(
        `[index] ${locale}: giving up after ${attempts} attempts; leaving existing values`
      );
      trObj = existing && Object.keys(existing).length ? existing : en;
    }

    // Merge with existing when not forced: keep existing non-EN messages
    const result = {};
    let translated = 0;
    let kept = 0;
    for (const [key, entry] of Object.entries(en)) {
      const enMsg = entry?.message ?? '';
      const candidate = trObj[key]?.message;
      const prevMsg = existing[key]?.message;
      let outMsg = candidate;
      if (!force && typeof prevMsg === 'string' && prevMsg.trim() !== '' && prevMsg !== enMsg) {
        outMsg = prevMsg; // keep prior human/previous translation
        kept++;
      } else {
        translated++;
      }
      result[key] = { ...(entry || {}), message: outMsg };
    }
    writeJson(outPath, result);
    logLine(`[index] ${locale}: translated=${translated}, kept=${kept} → ${outPath}`);
    console.log(`[index] ${locale}: translated=${translated}, kept=${kept} → ${outPath}`);
    localesDone++;
    drawOverall(localesDone);
  }
  process.stdout.write('\n');
  console.log('[index] Done. Log:', LOGFILE);
}

main().catch((e) => {
  console.error('translate_web_index failed:', e);
  process.exit(1);
});
