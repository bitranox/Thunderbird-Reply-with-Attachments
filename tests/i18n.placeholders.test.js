import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function locales() {
  const dir = path.join(process.cwd(), 'sources', '_locales');
  return fs.readdirSync(dir).filter((d) => fs.existsSync(path.join(dir, d, 'messages.json')));
}
function messagesOf(loc) {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'sources', '_locales', loc, 'messages.json'), 'utf8')
  );
}
function tokensIn(str) {
  const m = String(str || '').match(/\$(\d+)/g) || [];
  return Array.from(new Set(m.map((s) => s.slice(1))));
}

describe('i18n placeholders — consistent across locales', () => {
  const base = 'en';
  const baseMsgs = messagesOf(base);
  const otherLocales = locales().filter((l) => l !== base);

  it('locales define the same placeholder keys as base where applicable', () => {
    for (const loc of otherLocales) {
      const msgs = messagesOf(loc);
      for (const k of Object.keys(baseMsgs)) {
        const bp = baseMsgs[k]?.placeholders;
        const lp = msgs[k]?.placeholders;
        if (bp) {
          expect(lp).toBeTruthy();
          const bKeys = Object.keys(bp).sort();
          const lKeys = Object.keys(lp).sort();
          expect({ loc, k, keys: lKeys }).toEqual({ loc, k, keys: bKeys });
        }
      }
    }
  });

  it('every $N token present in a locale message has a corresponding placeholder entry', () => {
    for (const loc of locales()) {
      const msgs = messagesOf(loc);
      for (const [k, v] of Object.entries(msgs)) {
        const required = tokensIn(v?.message);
        const lp = v?.placeholders || {};
        for (const t of required) {
          expect(lp, `${loc}.${k} missing placeholder ${t}`).toHaveProperty(t);
        }
      }
    }
  });
});
