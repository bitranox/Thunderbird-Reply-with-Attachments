/* global fetch, FormData */
// Translate website docs via OpenAI Batch API.
// Reads OPENAI_API_KEY (required), optional OPENAI_MODEL, OPENAI_TEMPERATURE,
// OPENAI_BATCH_WINDOW (default: 24h), BATCH_POLL_INTERVAL_MS, BATCH_PER_REQUEST_LIMIT.
// Usage:
//   node scripts/translate_web_docs_batch.js <doc|all> <lang|all>
//   make translate_web_docs_batch OPTS="<doc|all> <lang|all>"
// If arguments are omitted, the script prompts interactively for both.

import fs from 'node:fs';
import path from 'node:path';
import {
  protectCode,
  restoreCode,
  splitFrontmatter,
  rebuildFrontFromOriginal,
  systemPromptLines,
  userPromptForDoc,
  normalizeAnchors,
} from './lib/translate_core.js';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
// Note: We rely on Node's built-in global fetch (Undici). No extra deps.

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

const LOGFILE = path.join(process.cwd(), 'translation_web_batch.log');
function logLine(line) {
  try {
    fs.appendFileSync(LOGFILE, line + '\n', 'utf8');
  } catch {
    // best-effort logging; ignore failures
  }
}
function getApiBase() {
  const base = (process.env.OPENAI_API_BASE || 'https://api.openai.com').replace(/\/$/, '');
  return base;
}
function apiUrl(pathname) {
  const base = getApiBase();
  return `${base}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}
function isRetriableHttp(status) {
  return (
    status === 408 ||
    status === 409 ||
    status === 425 ||
    status === 429 ||
    (status >= 500 && status <= 599)
  );
}
function jitter(ms) {
  const delta = Math.min(250, Math.floor(ms * 0.2));
  return ms + Math.floor(Math.random() * delta) - Math.floor(delta / 2);
}
async function fetchWithRetry(url, opts = {}, label = 'request') {
  const max = Number(process.env.OPENAI_RETRIES || 5);
  const baseDelay = Number(process.env.OPENAI_RETRY_BASE_MS || 600);
  let lastErr;
  for (let i = 0; i < max; i++) {
    try {
      const ctrl = new globalThis.AbortController();
      const timer = globalThis.setTimeout(
        () => ctrl.abort(),
        Number(process.env.TRANSLATE_TIMEOUT_MS || 180_000)
      );
      let res;
      try {
        res = await fetch(url, { ...opts, signal: ctrl.signal });
      } finally {
        globalThis.clearTimeout(timer);
      }
      if (!res.ok) {
        if (isRetriableHttp(res.status)) {
          lastErr = new Error(`${label} failed: ${res.status} ${res.statusText}`);
          const delay = jitter(baseDelay * Math.pow(2, i));
          logLine(
            `[RETRY] ${new Date().toISOString()} label=${label} http=${res.status} in ${delay}ms url=${url}`
          );
          await sleep(delay);
          continue;
        }
      }
      return res;
    } catch (e) {
      lastErr = e;
      const msg = (e && e.message) || String(e);
      const delay = jitter(baseDelay * Math.pow(2, i));
      logLine(
        `[RETRY] ${new Date().toISOString()} label=${label} error=${msg} in ${delay}ms url=${url}`
      );
      await sleep(delay);
    }
  }
  throw lastErr || new Error(`${label} failed after ${max} attempts`);
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

// splitFrontmatter, protectCode/restoreCode imported from core

function scanCodeTokenIndices(s) {
  const re = /__CODE_TOKEN_(\d+)__/g;
  const seen = new Set();
  let m;
  while ((m = re.exec(String(s)))) {
    const idx = Number(m[1]);
    if (!Number.isNaN(idx)) seen.add(idx);
  }
  return seen;
}

function stripCodeWrapper(s) {
  if (!s) return s;
  const lines = String(s).split(/\r?\n/);
  const isFenceOpen = (t) => /^```(?:\s*[a-zA-Z0-9_-]+)?\s*$/.test(t);
  const isFenceClose = (t) => /^```\s*(?:[a-zA-Z0-9_-]+)?\s*$/.test(t);
  const stripRange = (L, start, end) => {
    const body = L.slice(start + 1, end);
    if (body[0] && /^\s*$/.test(body[0])) body.shift();
    if (body.length && /^\s*$/.test(body[body.length - 1])) body.pop();
    return body.join('\n');
  };
  // first/last non-empty
  let i = 0;
  while (i < lines.length && /^\s*$/.test(lines[i])) i++;
  let j = lines.length - 1;
  while (j >= 0 && /^\s*$/.test(lines[j])) j--;
  // Case A: entire content wrapped
  if (i <= j && isFenceOpen(lines[i]) && isFenceClose(lines[j])) return stripRange(lines, i, j);
  // Case B: leading front matter, then entire remainder wrapped
  if (i <= j && /^---\s*$/.test(lines[i])) {
    let fmEnd = i + 1;
    while (fmEnd <= j && !/^---\s*$/.test(lines[fmEnd])) fmEnd++;
    if (fmEnd <= j) {
      let k = fmEnd + 1;
      while (k <= j && /^\s*$/.test(lines[k])) k++;
      if (k <= j && isFenceOpen(lines[k]) && isFenceClose(lines[j])) {
        const unwrapped = stripRange(lines, k, j);
        const fm = lines.slice(i, fmEnd + 1).join('\n');
        return fm + '\n\n' + unwrapped;
      }
    }
  }
  return s;
}
function _dedupeTopFrontMatter(text) {
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && /^\s*$/.test(lines[i])) i++;
  if (i >= lines.length || lines[i].trim() !== '---') return null;
  let fm1End = i + 1;
  while (fm1End < lines.length && lines[fm1End].trim() !== '---') fm1End++;
  if (fm1End >= lines.length) return null;
  let k = fm1End + 1;
  while (k < lines.length && /^\s*$/.test(lines[k])) k++;
  if (k >= lines.length || lines[k].trim() !== '---') return null;
  let fm2End = k + 1;
  while (fm2End < lines.length && lines[fm2End].trim() !== '---') fm2End++;
  if (fm2End >= lines.length) return null;
  const kept = lines.slice(k).join('\n');
  return kept.endsWith('\n') ? kept : kept + '\n';
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

function assertApiKey() {
  loadEnvFromDotenv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in environment or .env');
  return apiKey;
}

// modelConfig declared above

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

function buildCustomId(docBase, locale) {
  // Compact, parseable id
  return `tr|${locale}|${docBase}`;
}
function parseCustomId(customId) {
  const parts = customId.split('|');
  if (parts.length !== 3) return null;
  return { kind: parts[0], locale: parts[1], docBase: parts[2] };
}

function buildBatchRequests(docsList, locales) {
  const { model, payloadExtras } = modelConfig();
  const items = [];
  /** @type {Record<string, { tokens: string[], front: string|null }>} */
  const tokensById = {};

  for (const doc of docsList) {
    const srcPath = path.join('website', 'docs', doc);
    if (!fs.existsSync(srcPath)) {
      console.error(`Skip: source not found ${srcPath}`);
      continue;
    }
    const en = readFile(srcPath);
    const { front, body } = splitFrontmatter(en);
    const { protectedMd, tokens } = protectCode(body);

    for (const locale of locales) {
      const targetLang = langNameFor(locale);
      const messages = [
        { role: 'system', content: systemPromptLines().join('\n') },
        { role: 'user', content: userPromptForDoc(front, protectedMd, locale, targetLang) },
      ];
      const bodyPayload = { model, messages, ...payloadExtras };
      const custom_id = buildCustomId(path.basename(doc), locale);
      const line = {
        custom_id,
        method: 'POST',
        url: '/v1/chat/completions',
        body: bodyPayload,
      };
      items.push(line);
      tokensById[custom_id] = { tokens, front: front || '' };
    }
  }

  const jsonl = items.map((o) => JSON.stringify(o)).join('\n');
  return { jsonl, tokensById };
}

function assertFetchGlobals() {
  if (typeof fetch !== 'function')
    throw new Error('global fetch not available (Node 18+ required)');
  if (typeof FormData === 'undefined') throw new Error('global FormData not available');
  if (typeof Blob === 'undefined') throw new Error('global Blob not available');
}

async function uploadBatchInput(jsonl) {
  const apiKey = assertApiKey();
  assertFetchGlobals();
  const form = new FormData();
  const blob = new Blob([jsonl], { type: 'application/json' });
  form.set('purpose', 'batch');
  form.append('file', blob, 'translate_docs.jsonl');

  const res = await fetchWithRetry(
    apiUrl('/v1/files'),
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    },
    'files.upload'
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`files upload failed: ${res.status} ${res.statusText} — ${txt}`);
  }
  const data = await res.json();
  return data.id;
}

async function createBatch(inputFileId) {
  const apiKey = assertApiKey();
  const window = process.env.OPENAI_BATCH_WINDOW || '24h';
  const payload = {
    input_file_id: inputFileId,
    endpoint: '/v1/chat/completions',
    completion_window: window,
  };
  const res = await fetchWithRetry(
    apiUrl('/v1/batches'),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(payload),
    },
    'batches.create'
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`batches create failed: ${res.status} ${res.statusText} — ${txt}`);
  }
  const data = await res.json();
  return data; // { id, status, ... }
}

async function getBatch(batchId) {
  const apiKey = assertApiKey();
  const res = await fetchWithRetry(
    apiUrl(`/v1/batches/${batchId}`),
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    },
    'batches.retrieve'
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`batches retrieve failed: ${res.status} ${res.statusText} — ${txt}`);
  }
  return res.json();
}

async function downloadFileContent(fileId) {
  const apiKey = assertApiKey();
  const res = await fetchWithRetry(
    apiUrl(`/v1/files/${fileId}/content`),
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    },
    'files.content'
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`files content failed: ${res.status} ${res.statusText} — ${txt}`);
  }
  return res.text(); // JSONL
}

function printPerRequestStatus(map, opts = {}) {
  const limit = Number(process.env.BATCH_PER_REQUEST_LIMIT || opts.limit || 12);
  const entries = Array.from(map.entries());
  // Sort pending first, then by key
  entries.sort((a, b) => {
    const av = a[1] === 'pending' ? 0 : 1;
    const bv = b[1] === 'pending' ? 0 : 1;
    if (av !== bv) return av - bv;
    return a[0].localeCompare(b[0]);
  });
  const toShow = entries.slice(0, Math.max(0, limit));
  const displayKey = (k) => {
    const meta = parseCustomId(k);
    if (meta && meta.locale && meta.docBase) return `[${meta.locale}] ${meta.docBase}`;
    return k;
  };
  const counts = entries.reduce((acc, [, v]) => {
    const key = String(v);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const summary = Object.entries(counts)
    .map(([k, v]) => `${k}:${v}`)
    .join(' ');
  console.log(
    `Requests (first ${toShow.length}/${entries.length}): ${toShow
      .map((e) => `${displayKey(e[0])}=${e[1]}`)
      .join(', ')} | ${summary}`
  );
}

function formatElapsed(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hh = String(Math.floor(total / 3600)).padStart(2, '0');
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const ss = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

async function pollBatchUntilDone(batchId, perReqStatus, startedAtMs = Date.now()) {
  const interval = Number(process.env.BATCH_POLL_INTERVAL_MS || 60000);
  // Print initial map
  printPerRequestStatus(perReqStatus);
  // Poll loop
  while (true) {
    let info;
    try {
      info = await getBatch(batchId);
    } catch (e) {
      const msg = (e && e.message) || String(e);
      logLine(`[WARN] ${new Date().toISOString()} poll error id=${batchId} ${msg}`);
      await sleep(Math.max(5000, Math.min(60000, interval)));
      continue;
    }
    const counts = info.request_counts || info.request_counts_by_status || {};
    const status = info.status;
    const outId = info.output_file_id || info.output_file?.id;
    const errId = info.error_file_id || info.error_file?.id;
    const elapsed = formatElapsed(Date.now() - startedAtMs);
    console.log(
      `[BATCH] id=${batchId} status=${status} counts=${JSON.stringify(counts)} out=${outId || '-'} err=${errId || '-'} elapsed=${elapsed} — note: batch processing may take up to 24 hours to complete.`
    );
    printPerRequestStatus(perReqStatus);
    if (
      status === 'completed' ||
      status === 'failed' ||
      status === 'cancelled' ||
      status === 'expired'
    ) {
      return info;
    }
    await sleep(interval);
  }
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

function modelConfig() {
  const model = process.env.OPENAI_MODEL || process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4o-mini';
  const t = process.env.OPENAI_TEMPERATURE;
  const payloadExtras = {};
  if (t !== undefined && t !== '') {
    const tv = Number(t);
    if (!Number.isNaN(tv)) payloadExtras.temperature = tv;
  }
  return { model, payloadExtras };
}

async function run() {
  const args = process.argv.slice(2).filter(Boolean);
  // Support flags: --files <a,b> and --locales <l1,l2>
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
  // Resume support: --resume <batch_id> or OPENAI_BATCH_ID
  let resumeId = null;
  const resumeIdx = flatArgs.indexOf('--resume');
  if (resumeIdx !== -1 && flatArgs[resumeIdx + 1]) {
    resumeId = flatArgs[resumeIdx + 1];
    flatArgs.splice(resumeIdx, 2);
  }
  if (!resumeId && process.env.OPENAI_BATCH_ID) resumeId = process.env.OPENAI_BATCH_ID;

  let docTokens = flatArgs.filter((t) => /\.md$/i.test(t));
  const otherTokens = flatArgs.filter((t) => !docTokens.includes(t));

  let docsAll = false;
  let langsAll = false;
  let langTokens = otherTokens.filter((t) => isLocaleToken(t.toLowerCase()));

  if (filesFlag) {
    docsAll = false;
    docTokens = splitTokens(filesFlag);
  }
  if (localesFlag) {
    langsAll = false;
    langTokens = splitTokens(localesFlag).map((s) => s.toLowerCase());
  }

  const rlNeeded = (!docsAll && docTokens.length === 0) || (!langsAll && langTokens.length === 0);
  const rl = rlNeeded ? readline.createInterface({ input, output }) : null;

  if (!docsAll && docTokens.length === 0) {
    const docsAvail = listWebsiteDocs();
    const ans = (
      await rl.question(
        `Enter doc filenames (relative to website/docs). Multiple accepted (comma/space), or 'all'.\nAvailable:\n- ${docsAvail.join('\n- ')}\n> `
      )
    ).trim();
    if (ans.toLowerCase() === 'all') docsAll = true;
    else docTokens = splitTokens(ans);
  }

  if (!langsAll && langTokens.length === 0) {
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
  console.log(`Preparing ${totalPairs} request(s)…`);

  // Build JSONL + maps
  const { jsonl, tokensById } = buildBatchRequests(docsList, locales);

  // Maintain perReqStatus map: custom_id -> 'pending' initially
  /** @type {Map<string, string|number>} */
  const perReqStatus = new Map();
  for (const customId of Object.keys(tokensById)) perReqStatus.set(customId, 'pending');

  // Log start
  const startIso = new Date().toISOString();
  logLine(
    `[START] ${startIso} docs=${JSON.stringify(docsList)} locales=${JSON.stringify(locales)} total=${totalPairs}`
  );

  // Upload JSONL and create batch, unless resuming
  let batch = null;
  if (resumeId) {
    console.log(`Resuming existing batch: ${resumeId}`);
    logLine(`[RESUME] ${new Date().toISOString()} batch_id=${resumeId}`);
    try {
      batch = await getBatch(resumeId);
    } catch (e) {
      console.error(`Failed to resume batch ${resumeId}:`, e.message);
      process.exit(2);
    }
  } else {
    const fileId = await uploadBatchInput(jsonl);
    console.log(`Uploaded input file: ${fileId}`);
    batch = await createBatch(fileId);
    console.log(`Created batch: ${batch.id} (status=${batch.status})`);
    logLine(`[BATCH] ${new Date().toISOString()} created=${batch.id} status=${batch.status}`);
  }

  // Poll and print per-request status each tick
  const finalInfo = await pollBatchUntilDone(batch.id, perReqStatus, Date.now());

  // On completion (or failure with output), download outputs and update per-request statuses
  let outJsonl = '';
  if (finalInfo.output_file_id || finalInfo.output_file?.id) {
    const ofid = finalInfo.output_file_id || finalInfo.output_file.id;
    outJsonl = await downloadFileContent(ofid);
  }
  let errJsonl = '';
  if (finalInfo.error_file_id || finalInfo.error_file?.id) {
    const efid = finalInfo.error_file_id || finalInfo.error_file.id;
    try {
      errJsonl = await downloadFileContent(efid);
    } catch (e) {
      console.warn('Failed to download error file:', e.message);
    }
  }

  /** @type {Record<string, string>} */
  const translatedById = {};

  if (outJsonl) {
    for (const line of outJsonl.split(/\r?\n/)) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        const cid = obj.custom_id;
        const statusCode = obj.response?.status_code ?? obj.response?.status ?? obj.statusCode;
        if (cid && perReqStatus.has(cid))
          perReqStatus.set(cid, Number(statusCode) || String(statusCode || 'unknown'));
        const content = obj.response?.body?.choices?.[0]?.message?.content;
        if (cid && content) translatedById[cid] = content;
      } catch (e) {
        console.warn('Bad output JSONL line (ignored):', e.message);
      }
    }
  }

  if (errJsonl) {
    for (const line of errJsonl.split(/\r?\n/)) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        const cid = obj.custom_id;
        const statusCode = obj.response?.status_code || obj.error?.code || 'error';
        if (cid && perReqStatus.has(cid)) perReqStatus.set(cid, String(statusCode));
      } catch (e) {
        console.warn('Bad error JSONL line (ignored):', e.message);
      }
    }
  }

  // Print final map (pending -> HTTP codes)
  console.log('Final per-request status (after downloading outputs):');
  printPerRequestStatus(perReqStatus);

  // Write files
  let written = 0;
  for (const [cid, content] of Object.entries(translatedById)) {
    const meta = parseCustomId(cid);
    if (!meta) continue;
    const info = tokensById[cid];
    // Guard: model must return placeholders matching original token indices
    {
      const seen = scanCodeTokenIndices(content);
      const outOfRange = [...seen].filter((i) => i < 0 || i >= info.tokens.length);
      const missing = info.tokens.length - seen.size;
      const strict = (process.env.TRANSLATE_TOKENS_STRICT || '1') !== '0';
      if (outOfRange.length > 0 || missing !== 0) {
        const expected = Array.from({ length: info.tokens.length }, (_, i) => i);
        const seenArr = Array.from(seen).sort((a, b) => a - b);
        const missingIdx = expected.filter((i) => !seen.has(i));
        const detail = `expected=[${expected.join(',')}] seen=[${seenArr.join(',')}] missing=[${missingIdx.join(',')}] extra=[${outOfRange.join(',')}]`;
        const msg = `[TOKENS] cid=${cid} ${detail}`;
        logLine(msg);
        if (strict) {
          console.warn('Skipping write due to token mismatch:', msg);
          continue;
        }
      }
    }
    // Restore code and split any returned front matter (if present)
    const restoredAll = stripCodeWrapper(restoreCode(content, info.tokens));
    const split = splitFrontmatter(restoredAll);
    const returnedFront = split.front; // may be null
    const bodyRestored = split.body || restoredAll;
    if (info.front && (!returnedFront || !returnedFront.trim())) {
      logLine(
        `[FRONT] ${new Date().toISOString()} cid=${cid} model returned no front matter; original_front_len=${(info.front || '').length}`
      );
    }

    // Rebuild front matter from original, applying translated title/sidebar_label
    function _updateFront(originalFront, returnedFront) {
      const pick = (fm, key) => {
        if (!fm) return null;
        const m = fm.match(new RegExp(`^\\s*${key}\\s*:\\s*(.*)$`, 'mi'));
        return m ? m[1].trim() : null;
      };
      const titleVal = pick(returnedFront, 'title');
      const sideVal = pick(returnedFront, 'sidebar_label');
      const lines = (originalFront || '').split(/\r?\n/);
      const out = lines.map((line) => {
        const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*)\s*:\s*(.*)$/);
        if (!m) return line;
        const key = m[1];
        if (key === 'title' && titleVal)
          return `title: ${JSON.stringify(titleVal.replace(/^['\"]|['\"]$/g, ''))}`;
        if (key === 'sidebar_label' && sideVal)
          return `sidebar_label: ${JSON.stringify(sideVal.replace(/^['\"]|['\"]$/g, ''))}`;
        return line;
      });
      return out.join('\n');
    }
    const rebuiltFront = rebuildFrontFromOriginal(info.front || '', returnedFront || '');
    const finalFront = (info.front ? rebuiltFront : '').replace(/\r?\n$/, '');

    const outPath = path.join(
      'website/i18n',
      meta.locale,
      'docusaurus-plugin-content-docs',
      'current',
      meta.docBase
    );
    // Always emit front matter (from original, with translated title/sidebar where available)
    let finalText = bodyRestored.trim();
    if (
      info.front &&
      !/^---\n[\s\S]*?\n---\n/.test(finalText + (finalText.endsWith('\n') ? '' : '\n'))
    ) {
      logLine(
        `[FRONT] ${new Date().toISOString()} cid=${cid} final output missing front matter header`
      );
    }
    if (info.front && finalFront) {
      finalText = `---\n${finalFront}\n---\n\n${finalText}`;
    }
    // Normalize accidental double-braced anchors (e.g., "{{#id}}" → "{#id}")
    finalText = normalizeAnchors(finalText);
    writeFile(outPath, finalText.endsWith('\n') ? finalText : finalText + '\n');
    written++;
  }

  console.log(`Wrote ${written}/${totalPairs} file(s). Batch status: ${finalInfo.status}`);
  logLine(`[END] ${new Date().toISOString()} written=${written} batch_status=${finalInfo.status}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
