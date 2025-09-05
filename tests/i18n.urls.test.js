import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('i18n URLs — donate points to docs per-locale', () => {
  it('EN donateUrl points to /docs/donation', () => {
    const en = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'sources', '_locales', 'en', 'messages.json'), 'utf8'));
    expect(en.donateUrl.message).toMatch(/\/docs\/donation$/);
  });
  it('DE donateUrl points to /de/docs/donation', () => {
    const de = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'sources', '_locales', 'de', 'messages.json'), 'utf8'));
    expect(de.donateUrl.message).toMatch(/\/de\/docs\/donation$/);
  });
});
