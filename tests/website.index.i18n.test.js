/*
 * Test Module: website.index.i18n.test.js
 * Scope: Website UI i18n — homepage/navbar/footer JSON parity.
 * Intent: Ensure every locale under website/i18n/<lang>/code.json exists (except 'en')
 *         and contains all keys found in website/i18n/en/code.json, with non-empty
 *         messages and preserved placeholder tokens like {year}, {slash}, etc.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function listLocales(i18nDir) {
  if (!fs.existsSync(i18nDir)) return [];
  return fs
    .readdirSync(i18nDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function tokenSet(msg) {
  if (typeof msg !== 'string') return new Set();
  const tokens = msg.match(/\{[a-zA-Z0-9_]+\}/g) || [];
  return new Set(tokens);
}

describe('Website UI i18n — code.json parity vs EN', () => {
  const repoRoot = process.cwd();
  const i18nDir = path.join(repoRoot, 'website', 'i18n');
  const enPath = path.join(i18nDir, 'en', 'code.json');

  it('EN source of truth exists', () => {
    expect(fs.existsSync(enPath)).toBe(true);
  });

  if (!fs.existsSync(enPath)) return; // avoid cascading failures locally

  const en = readJson(enPath);
  const enKeys = Object.keys(en).sort();
  const locales = listLocales(i18nDir).filter((l) => l !== 'en');

  for (const lang of locales) {
    const locPath = path.join(i18nDir, lang, 'code.json');

    describe(`[${lang}] code.json`, () => {
      it('exists', () => {
        expect(fs.existsSync(locPath)).toBe(true);
      });

      if (!fs.existsSync(locPath)) return;

      const loc = readJson(locPath);

      it('contains at least all EN keys', () => {
        const locKeys = Object.keys(loc);
        for (const k of enKeys) {
          expect(locKeys).toContain(k);
        }
      });

      for (const k of enKeys) {
        it(`key '${k}' has non-empty message and preserved tokens`, () => {
          const enEntry = en[k] || {};
          const locEntry = loc[k] || {};
          const enMsg = enEntry.message;
          const locMsg = locEntry.message;
          expect(typeof locMsg).toBe('string');
          expect(String(locMsg).trim().length > 0).toBe(true);

          // Placeholder token parity
          const enTok = tokenSet(enMsg);
          const locTok = tokenSet(locMsg);
          expect(locTok).toEqual(enTok);
        });
      }
    });
  }
});
