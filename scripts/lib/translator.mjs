/* eslint-env node */
/* global fetch */
// Lightweight translation helper with pluggable providers.
// Supports: openai, deepl, libre, none
// Usage: import { translateText } from './lib/translator.mjs'

import assert from 'assert';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function translateText(
  text,
  {
    from = 'en',
    to,
    provider = process.env.TRANSLATOR_PROVIDER || 'none',
    systemHint,
    retry = 2,
  } = {}
) {
  assert(to, 'translateText: target language code `to` is required');
  if (!text || text.trim() === '' || from === to) return text;

  const p = provider.toLowerCase();
  if (p === 'none') return text;

  if (p === 'openai') return translateViaOpenAI(text, { from, to, systemHint, retry });
  if (p === 'deepl') return translateViaDeepL(text, { from, to, retry });
  if (p === 'libre') return translateViaLibre(text, { from, to, retry });

  // Fallback: no provider found
  return text;
}

async function translateViaOpenAI(text, { from, to, systemHint, retry }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return text;

  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini-2024-07-18';

  const sys =
    systemHint ||
    `You are a professional localization specialist. Translate from ${from} to ${to}. Preserve:
- Markdown structure
- code blocks and inline code
- placeholders like $1, $2, {name}
- quoted URLs and filenames
Do not add explanations.`;

  let lastErr;
  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: sys },
            { role: 'user', content: text },
          ],
          temperature: 0.2,
        }),
      });
      if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
      const data = await res.json();
      const out = data.choices?.[0]?.message?.content;
      return typeof out === 'string' ? out : text;
    } catch (e) {
      lastErr = e;
      await sleep(400 * (attempt + 1));
    }
  }
  console.warn('OpenAI translate failed, returning source text:', lastErr?.message);
  return text;
}

async function translateViaDeepL(text, { from, to, retry }) {
  const key = process.env.DEEPL_API_KEY;
  if (!key) return text;
  const url = process.env.DEEPL_API_URL || 'https://api.deepl.com/v2/translate';
  const params = new URLSearchParams({
    auth_key: key,
    text,
    source_lang: from.toUpperCase(),
    target_lang: to.toUpperCase().replace('-', '_'),
    preserve_formatting: '1',
    tag_handling: 'xml',
  });

  let lastErr;
  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const res = await fetch(url, { method: 'POST', body: params });
      if (!res.ok) throw new Error(`DeepL HTTP ${res.status}`);
      const data = await res.json();
      const out = data.translations?.[0]?.text;
      return typeof out === 'string' ? out : text;
    } catch (e) {
      lastErr = e;
      await sleep(400 * (attempt + 1));
    }
  }
  console.warn('DeepL translate failed, returning source text:', lastErr?.message);
  return text;
}

async function translateViaLibre(text, { from, to, retry }) {
  const base = process.env.LIBRETRANSLATE_URL; // e.g. https://libretranslate.com
  if (!base) return text;
  const url = `${base.replace(/\/$/, '')}/translate`;

  let lastErr;
  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, source: from, target: to, format: 'text' }),
      });
      if (!res.ok) throw new Error(`LibreTranslate HTTP ${res.status}`);
      const data = await res.json();
      const out = data.translatedText;
      return typeof out === 'string' ? out : text;
    } catch (e) {
      lastErr = e;
      await sleep(400 * (attempt + 1));
    }
  }
  console.warn('LibreTranslate failed, returning source text:', lastErr?.message);
  return text;
}
