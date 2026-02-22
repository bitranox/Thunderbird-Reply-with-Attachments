/* eslint-env node */
/* global fetch */
// Translate add-on UI strings from sources/_locales/en/messages.json
// into all other locales found under sources/_locales/<lang>/messages.json.
// - Always send the COMPLETE English JSON to the translator per locale.
// - Only translate the values of the "message" fields (keep structure and other fields identical).
// - Preserve placeholders like $1, $2, $3 exactly; produce natural, flowing text around them.
// - Do not change URLs; any URLs present must remain verbatim.
// - Validate translated JSON (keys/fields/placeholders/URLs). If invalid, retry with feedback.
// - Log progress to translation_app.log and per-key pairs for audit.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EN_PATH = path.join(ROOT, 'sources', '_locales', 'en', 'messages.json');
const LOCALES_DIR = path.join(ROOT, 'sources', '_locales');
const LOGFILE = path.join(ROOT, 'translation_app.log');

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

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(p, obj) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function listLocalesExceptEn() {
  return fs
    .readdirSync(LOCALES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((l) => l !== 'en');
}

// URL helpers
const _URL_RE = /^(https?:\/\/\S+)$/i; // whole value is a URL
const URL_INNER_RE = /https?:\/\/[^\s]+/gi; // find URLs inside text

function collectPlaceholders(str) {
  if (typeof str !== 'string') return [];
  const set = new Set();
  const re = /\$(\d+)/g;
  let m;
  while ((m = re.exec(str))) set.add(`$${m[1]}`);
  return [...set];
}

function extractUrls(str) {
  if (typeof str !== 'string') return [];
  return [...(str.match(URL_INNER_RE) || [])];
}

function deepEqualExceptMessage(enEntry, trEntry) {
  const a = JSON.parse(JSON.stringify(enEntry));
  const b = JSON.parse(JSON.stringify(trEntry));
  if (a && typeof a === 'object') delete a.message;
  if (b && typeof b === 'object') delete b.message;
  return JSON.stringify(a) === JSON.stringify(b);
}

function validateTranslatedJson(enObj, trObj, _locale) {
  const issues = [];
  if (!trObj || typeof trObj !== 'object')
    return { ok: false, issues: ['Top-level JSON is not an object'] };
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
    const wantPH = collectPlaceholders(enE.message);
    const gotPH = collectPlaceholders(trE.message || '');
    const missingPH = wantPH.filter((p) => !gotPH.includes(p));
    const extraPH = gotPH.filter((p) => !wantPH.includes(p));
    if (missingPH.length)
      issues.push(`Key ${k}: placeholders missing in message: ${missingPH.join(', ')}`);
    if (extraPH.length)
      issues.push(`Key ${k}: unexpected placeholders in message: ${extraPH.join(', ')}`);
    const urls = extractUrls(enE.message);
    for (const u of urls) {
      if (!(trE.message || '').includes(u)) issues.push(`Key ${k}: URL not preserved: ${u}`);
    }
  }
  return { ok: issues.length === 0, issues };
}

async function openAIChat(messages, { temperature } = {}) {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const payload = { model, messages };
  const t = process.env.OPENAI_TEMPERATURE;
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payload.temperature = tv;
  }
  // Some models do not support non-default temperature; only set when explicitly provided via env
  if (temperature !== undefined && temperature !== null) payload.temperature = temperature;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errTxt = await res.text();
    // Fallback: some models reject non-default temperature; retry without it once
    if (/Unsupported value: 'temperature'|does not support 0\./i.test(errTxt)) {
      delete payload.temperature;
      const res2 = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(payload),
      });
      if (!res2.ok) {
        const err2 = await res2.text();
        throw new Error(`OpenAI error: ${res2.status} ${res2.statusText} — ${err2}`);
      }
      const data2 = await res2.json();
      return (data2.choices?.[0]?.message?.content ?? '').trim();
    }
    throw new Error(`OpenAI error: ${res.status} ${res.statusText} — ${errTxt}`);
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? '').trim();
}

async function callOpenAIForLocale(enObj, locale, prevIssueNote) {
  const sys = [
    'You are a professional localization engine for a Thunderbird add‑on that handles email attachments when replying.',
    'Translate from English to the requested target locale.',
    'Very important rules:',
    '- Output VALID JSON only: an object with the EXACT SAME keys and structure as the English input.',
    "- Only translate the values of 'message' fields.",
    "- Do NOT change keys, do NOT add or remove fields, and do NOT modify 'placeholders' objects or any non-'message' fields.",
    '- Preserve placeholders like $1, $2, $3 exactly; produce natural flowing text assuming placeholders will be substituted at runtime.',
    '- Maintain consistent terminology across the whole document.',
    '- Do NOT change URLs; keep any URLs exactly as they appear.',
    '- Return ONLY the JSON object with no extra text or markdown fences.',
  ].join('\n');

  const userBase = [
    `Target locale: ${locale}`,
    'Translate this English messages.json (Thunderbird add-on UI strings). Remember to only change message values:',
    JSON.stringify(enObj, null, 2),
  ].join('\n');

  const messages = prevIssueNote
    ? [
        { role: 'system', content: sys },
        { role: 'user', content: userBase },
        {
          role: 'user',
          content: `Your previous output had issues. Please fix and resend ONLY valid JSON that strictly follows the rules. Issues:\n${prevIssueNote}`,
        },
      ]
    : [
        { role: 'system', content: sys },
        { role: 'user', content: userBase },
      ];

  const out = await openAIChat(messages);
  const cleaned = out.replace(/^```(json)?\n|\n```$/g, '');
  return cleaned;
}

async function run() {
  if (!fs.existsSync(EN_PATH)) {
    console.error('EN messages.json not found at', EN_PATH);
    process.exit(2);
  }
  loadEnvFromDotenv();
  if (!process.env.OPENAI_API_KEY) {
    console.error('Missing OPENAI_API_KEY. Set it in .env or the environment.');
    process.exit(2);
  }

  const en = readJson(EN_PATH);
  // CLI: --locales all | de,fr | de fr | de, fr
  function parseCliLocales() {
    const argv = process.argv.slice(2);
    const idx = argv.findIndex(
      (a) => a === '--locales' || a === '-l' || a.startsWith('--locales=')
    );
    if (idx === -1) return 'all';
    let val = '';
    const tok = argv[idx];
    if (tok.startsWith('--locales=')) {
      val = tok.split('=')[1] || '';
    } else {
      val = argv[idx + 1] || '';
    }
    if (!val || /^all$/i.test(val)) return 'all';
    // split by commas/whitespace
    return val
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Prefer environment LOCALES when provided (set by Make), else parse CLI, else 'all'
  const envSelRaw = (process.env.LOCALES || '').trim();
  let sel;
  if (envSelRaw) {
    sel = envSelRaw.toLowerCase() === 'all' ? 'all' : envSelRaw.split(/[\s,]+/).filter(Boolean);
  } else {
    sel = parseCliLocales();
  }
  let locales = [];
  if (sel === 'all') {
    locales = listLocalesExceptEn();
  } else {
    const wanted = new Set(sel.map((s) => s.toLowerCase()));
    const existing = new Set(listLocalesExceptEn());
    locales = [...wanted].filter((l) => existing.has(l));
    const skipped = [...wanted].filter((l) => !existing.has(l) || l === 'en');
    if (skipped.length) {
      console.warn('Skipping locales (not found or not translatable):', skipped.join(', '));
    }
    if (locales.length === 0) {
      console.error('No valid target locales after filtering.');
      process.exit(2);
    }
  }

  // Progress over locales
  let doneLocales = 0;
  const totalLocales = locales.length;
  const barWidth = Number(process.env.TRANSLATE_PROGRESS_WIDTH || 28);
  const renderBar = (done, total) => {
    const frac = total ? done / total : 0;
    const filled = Math.round(barWidth * frac);
    const bar = `[${'#'.repeat(filled)}${'.'.repeat(Math.max(0, barWidth - filled))}]`;
    const pct = String(Math.round(frac * 100)).padStart(3, ' ');
    return `${bar} ${pct}% (${done}/${total})`;
  };
  const drawLocales = () => process.stdout.write(`\r${renderBar(doneLocales, totalLocales)}`);

  logLine(`[START] ${new Date().toISOString()} locales=${JSON.stringify(locales)}`);

  for (const locale of locales) {
    const dstDir = path.join(LOCALES_DIR, locale);
    const dstPath = path.join(dstDir, 'messages.json');
    try {
      process.stdout.write(`\nStarting locale: ${locale}\n`);
      logLine(`[LOCALE-START] ${new Date().toISOString()} ${locale}`);

      let attempt = 0;
      const maxAttempts = 3;
      let trText = '';
      let trObj = null;
      let lastIssues = [];
      while (attempt < maxAttempts) {
        const note = lastIssues.length ? lastIssues.join('\n') : undefined;
        trText = await callOpenAIForLocale(en, locale, note);
        try {
          trObj = JSON.parse(trText);
        } catch (e) {
          const msg = `Invalid JSON: ${e.message}`;
          logLine(`[JSON-ERROR] ${new Date().toISOString()} locale=${locale} ${msg}`);
          lastIssues = [msg];
          attempt++;
          continue;
        }
        const { ok, issues } = validateTranslatedJson(en, trObj, locale);
        if (ok) break;
        lastIssues = issues;
        logLine(
          `[VALIDATION-ERROR] ${new Date().toISOString()} locale=${locale} issues=${JSON.stringify(issues)}`
        );
        attempt++;
      }

      let outObj;
      if (trObj && lastIssues.length === 0) {
        outObj = trObj;
      } else {
        outObj = JSON.parse(JSON.stringify(en));
        logLine(
          `[FALLBACK] ${new Date().toISOString()} locale=${locale} using EN values due to unresolved issues`
        );
      }

      // Audit log per-key
      const keys = Object.keys(en);
      for (const k of keys) {
        const enMsg = en[k]?.message;
        const trMsg = outObj[k]?.message;
        try {
          logLine(
            `[PAIR] ${k}: en: ${JSON.stringify(enMsg)} | ${locale}: ${JSON.stringify(trMsg)}`
          );
        } catch {}
      }

      writeJson(dstPath, outObj);
      logLine(
        `[LOCALE-END] ${new Date().toISOString()} ${locale} ${lastIssues.length ? 'fallback' : 'ok'}`
      );
    } catch (e) {
      console.error(`Error processing locale ${locale}:`, e.message);
      logLine(`[LOCALE-ERROR] ${new Date().toISOString()} ${locale} ${JSON.stringify(e.message)}`);
    }
    doneLocales++;
    drawLocales();
  }
  process.stdout.write(`\nCompleted ${doneLocales}/${totalLocales} locales.\n`);
  logLine(`[END] ${new Date().toISOString()} locales_done=${doneLocales}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
