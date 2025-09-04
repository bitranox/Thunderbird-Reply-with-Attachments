#!/usr/bin/env node
// Generate locale folders and translate messages.json using a provider if available.
// Providers (checked in order):
// - LibreTranslate: set LT_URL (e.g., https://libretranslate.example.com) and LT_API_KEY (optional)
// - DeepL: set DEEPL_API_KEY (paid/Pro) – target codes may need mapping
// - Fallback: copy English strings

import fs from 'node:fs/promises';
import path from 'node:path';

const root = new URL('../../', import.meta.url);
const localesListPath = new URL('./locales.json', import.meta.url);
const locales = JSON.parse(await fs.readFile(localesListPath, 'utf8'));
const localesDir = new URL('../../sources/_locales/', import.meta.url);

const enPath = new URL('./en/messages.json', localesDir);
const en = JSON.parse(await fs.readFile(enPath, 'utf8'));

const LT_URL = process.env.LT_URL || '';
const LT_API_KEY = process.env.LT_API_KEY || '';
const DEEPL_API_KEY = process.env.DEEPL_API_KEY || '';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function ensureDir(url) { await fs.mkdir(url, { recursive: true }); }

function normalizeTarget(code) {
  // LibreTranslate supports a subset; try primary language when region present
  return String(code).replace('_','-');
}

async function translateLT(text, source, target) {
  if (!LT_URL) return null;
  try {
    const res = await fetch(`${LT_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text', api_key: LT_API_KEY || undefined })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.translatedText || null;
  } catch { return null; }
}

async function translateDEEPL(text, source, target) {
  if (!DEEPL_API_KEY) return null;
  const url = 'https://api-free.deepl.com/v2/translate';
  // Map BCP-47 to DeepL codes when possible
  const map = { 'en': 'EN', 'de': 'DE', 'fr': 'FR', 'es': 'ES', 'it': 'IT', 'nl': 'NL', 'pl': 'PL', 'ru': 'RU', 'pt-PT': 'PT-PT', 'pt-BR': 'PT-BR', 'ja': 'JA', 'zh-CN': 'ZH', 'zh-TW': 'ZH' };
  const tgt = map[target] || target.toUpperCase().slice(0,2);
  try {
    const params = new URLSearchParams({ auth_key: DEEPL_API_KEY, text, target_lang: tgt });
    const res = await fetch(url, { method: 'POST', body: params });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.translations?.[0]?.text || null;
  } catch { return null; }
}

async function translateText(text, target) {
  const src = 'en';
  const tgt = normalizeTarget(target);
  // Skip identical locales
  if (tgt.toLowerCase().startsWith('en')) return text;
  // Try DeepL then LibreTranslate
  const viaDeepL = await translateDEEPL(text, src, tgt);
  if (viaDeepL) return viaDeepL;
  const viaLt = await translateLT(text, src, tgt.split('-')[0]);
  if (viaLt) return viaLt;
  return text; // fallback copy
}

async function translateMessages(target) {
  const out = {};
  for (const [k, v] of Object.entries(en)) {
    const src = v?.message || '';
    const placeholders = v?.placeholders || undefined;
    let msg = src;
    // Simple placeholder protection: replace $1 with tokens before translation
    const tokens = [];
    msg = msg.replace(/\$([0-9]+)/g, (_, n) => {
      const t = `__PH_${n}__`; tokens.push([t, `$${n}`]); return t;
    });
    const translated = await translateText(msg, target);
    let final = translated;
    for (const [t, orig] of tokens) final = final.replaceAll(t, orig);
    out[k] = { message: final, ...(placeholders ? { placeholders } : {}) };
    // polite pacing when using public endpoints
    await sleep(60);
  }
  return out;
}

async function main() {
  await ensureDir(localesDir);
  for (const code of locales) {
    const dir = new URL(`./${code}/`, localesDir);
    const file = new URL('./messages.json', dir);
    try {
      await ensureDir(dir);
      // Do not overwrite existing non-empty files unless forced
      let existing = null;
      try { existing = await fs.readFile(file, 'utf8'); } catch {}
      if (existing && !process.argv.includes('--force')) continue;
      const data = await translateMessages(code);
      await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n');
      console.log(`Wrote ${code}/messages.json`);
    } catch (e) {
      console.error(`Failed ${code}:`, e?.message);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

