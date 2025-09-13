/* eslint-env node */
// Guard: if an English doc has YAML front matter, localized copies must also have it.
// Optional env:
//   BUILD_LOCALES="lt de fr"  -> limit locales checked
//   FRONTMATTER_GUARD_STRICT=1 -> also fail when a localized file is missing

import fs from 'node:fs';
import path from 'node:path';

function listLocales(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((l) => l && l !== 'en');
}

function hasFrontMatter(s) {
  const fmRe = /^---\n[\s\S]*?\n---\n/;
  const text = String(s);
  return fmRe.test(text + (text.endsWith('\n') ? '' : '\n'));
}

function main() {
  const enDir = path.join(process.cwd(), 'website', 'docs');
  const i18nDir = path.join(process.cwd(), 'website', 'i18n');
  if (!fs.existsSync(enDir) || !fs.existsSync(i18nDir)) return;

  const strict = process.env.FRONTMATTER_GUARD_STRICT === '1';
  const limit = (process.env.BUILD_LOCALES || '')
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const locales = limit.length > 0 ? limit : listLocales(i18nDir);

  const enFiles = fs.readdirSync(enDir).filter((f) => f.toLowerCase().endsWith('.md'));

  const offenders = [];
  for (const f of enFiles) {
    const enPath = path.join(enDir, f);
    const en = fs.readFileSync(enPath, 'utf8');
    if (!hasFrontMatter(en)) continue; // nothing to enforce for this doc

    for (const loc of locales) {
      const locPath = path.join(i18nDir, loc, 'docusaurus-plugin-content-docs', 'current', f);
      if (!fs.existsSync(locPath)) {
        if (strict) offenders.push({ file: locPath, reason: 'missing localized file' });
        else console.warn(`[FM-GUARD] WARN: localized file missing: ${locPath}`);
        continue;
      }
      const s = fs.readFileSync(locPath, 'utf8');
      if (!hasFrontMatter(s)) offenders.push({ file: locPath, reason: 'missing front matter' });
    }
  }

  if (offenders.length > 0) {
    console.error('[FM-GUARD] Front matter guard failed:');
    for (const o of offenders) console.error(` - ${o.reason}: ${o.file}`);
    process.exit(2);
  } else {
    console.log('[FM-GUARD] OK: all localized docs keep front matter where required.');
  }
}

main();
