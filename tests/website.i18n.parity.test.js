/*
 * Test Module: website.i18n.parity.test.js
 * Scope: Website i18n — parity for docs across locales.
 * Intent: Ensure every locale under website/i18n/<lang>/... has all EN docs
 *         (by same filename or by matching front‑matter id.md). Emits one test per doc per locale.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function parseFrontmatter(file) {
  const s = fs.readFileSync(file, 'utf8');
  const m = s.match(/^---[\s\S]*?---/);
  if (!m) return {};
  const fm = m[0]
    .replace(/^---\n?/, '')
    .replace(/\n?---$/, '')
    .split(/\r?\n/)
    .filter(Boolean);
  const out = {};
  for (const line of fm) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line
      .slice(idx + 1)
      .trim()
      .replace(/^"|^'|"$|'$/g, '');
    if (key) out[key] = val;
  }
  return out;
}

function listLocales(i18nDir) {
  if (!fs.existsSync(i18nDir)) return [];
  return fs
    .readdirSync(i18nDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

describe('Website i18n parity — EN vs ALL locales', () => {
  const repoRoot = process.cwd();
  const enDir = path.join(repoRoot, 'website', 'docs');
  const i18nDir = path.join(repoRoot, 'website', 'i18n');
  const enFiles = fs.readdirSync(enDir).filter((f) => f.endsWith('.md'));
  const locales = listLocales(i18nDir);
  const EXEMPT_IDS = new Set(['third-party-licenses']);

  for (const lang of locales) {
    const langDir = path.join(i18nDir, lang, 'docusaurus-plugin-content-docs', 'current');
    if (!fs.existsSync(langDir)) continue; // skip locales without docs content

    describe(`[${lang}] parity`, () => {
      for (const f of enFiles) {
        const enPath = path.join(enDir, f);
        const enFm = parseFrontmatter(enPath);
        const enId = enFm.id ?? null;
        const sameName = path.join(langDir, f);
        const byId = enId ? path.join(langDir, `${enId}.md`) : null;
        const exists = fs.existsSync(sameName) || (byId && fs.existsSync(byId));

        if (enId && EXEMPT_IDS.has(enId)) {
          it.skip(`has translation for ${f}`, () => {});
        } else {
          it(`has translation for ${f}`, () => {
            expect(exists).toBe(true);
          });
        }

        const tPath = fs.existsSync(sameName)
          ? sameName
          : byId && fs.existsSync(byId)
            ? byId
            : null;

        const isExempt = !!(enId && EXEMPT_IDS.has(enId));
        if (!isExempt && tPath) {
          it(`id matches EN for ${f}`, () => {
            const tFm = parseFrontmatter(tPath);
            expect(tFm.id, 'translated doc must have id').toBeTruthy();
            if (enId) expect(tFm.id).toBe(enId);
          });

          it(`title is non-empty for ${f}`, () => {
            const tFm = parseFrontmatter(tPath);
            expect(tFm.title && String(tFm.title).trim().length > 0).toBe(true);
          });

          if (enFm.sidebar_label) {
            it(`sidebar_label present for ${f} (since EN has it)`, () => {
              const tFm = parseFrontmatter(tPath);
              expect(tFm.sidebar_label && String(tFm.sidebar_label).trim().length > 0).toBe(true);
            });
          }
        } else {
          // If the translation file is missing, skip the extra checks to avoid duplicate failures.
          it.skip(`id matches EN for ${f}`, () => {});
          it.skip(`title is non-empty for ${f}`, () => {});
          if (enFm.sidebar_label)
            it.skip(`sidebar_label present for ${f} (since EN has it)`, () => {});
        }
      }
    });
  }
});
