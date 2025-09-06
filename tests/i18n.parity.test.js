/*
 * Test Module: i18n.parity.test.js
 * Scope: UI i18n — ensures EN/DE message keys parity.
 * Intent: Prevent missing or extra keys across locale files.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('i18n parity — en and de expose the same keys', () => {
  // Test: locale key sets are identical
  it('locale key sets are identical', () => {
    const en = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'sources', '_locales', 'en', 'messages.json'),
        'utf8'
      )
    );
    const de = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'sources', '_locales', 'de', 'messages.json'),
        'utf8'
      )
    );
    const enKeys = Object.keys(en).sort();
    const deKeys = Object.keys(de).sort();
    expect(enKeys).toEqual(deKeys);
  });

  // Test: must include confirmTitle in both
  it('must include confirmTitle in both', () => {
    const en = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'sources', '_locales', 'en', 'messages.json'),
        'utf8'
      )
    );
    const de = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'sources', '_locales', 'de', 'messages.json'),
        'utf8'
      )
    );
    expect(en).toHaveProperty('confirmTitle');
    expect(de).toHaveProperty('confirmTitle');
  });
});
