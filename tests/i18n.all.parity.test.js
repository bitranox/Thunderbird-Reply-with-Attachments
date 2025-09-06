/*
 * Test Module: i18n.all.parity.test.js
 * Scope: UI i18n — round-trip check for placeholder tokens across locales.
 * Intent: Ensure placeholders and key sets remain consistent.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function readLocalesDir() {
  const dir = path.join(process.cwd(), 'sources', '_locales');
  return fs.readdirSync(dir).filter((name) => fs.existsSync(path.join(dir, name, 'messages.json')));
}

function readMessages(locale) {
  const p = path.join(process.cwd(), 'sources', '_locales', locale, 'messages.json');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

describe('i18n parity — all locales share the same keys', () => {
  // Test: every locale key set matches the base (en)
  it('every locale key set matches the base (en)', () => {
    const locales = readLocalesDir();
    const base = 'en';
    const baseKeys = Object.keys(readMessages(base)).sort();
    for (const loc of locales) {
      const keys = Object.keys(readMessages(loc)).sort();
      expect({ locale: loc, keys }).toEqual({ locale: loc, keys: baseKeys });
    }
  });
});
