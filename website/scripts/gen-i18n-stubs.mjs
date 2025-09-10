#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve(process.cwd());
const websiteDir = baseDir;
const i18nDir = path.join(websiteDir, 'i18n');

// Keep in sync with I18N_LOCALES in docusaurus.config.js
const LOCALES = [
  'en',
  'zh',
  'hi',
  'es',
  'ar',
  'fr',
  'bn',
  'pt',
  'ru',
  'id',
  'ur',
  'de',
  'ja',
  'pa',
  'jv',
  'ms',
  'te',
  'vi',
  'ko',
  'mr',
  'ta',
  'tr',
  'it',
  'th',
  'gu',
  'fa',
  'pl',
  'ps',
  'kn',
  'ml',
  'or',
  'my',
  'uk',
  'ro',
  'nl',
  'ha',
  'sw',
  'am',
  'hu',
  'az',
  'uz',
  'sd',
  'he',
  'el',
  'cs',
  'sv',
  'bg',
  'da',
  'fi',
  'no',
  'sk',
  'sr',
  'hr',
  'bs',
  'sl',
  'lt',
  'lv',
  'et',
  'hy',
  'ka',
  'kk',
  'ky',
  'tg',
  'tk',
  'ne',
  'si',
  'km',
  'lo',
  'mn',
  'su',
  'yo',
  'ig',
  'om',
  'zu',
  'xh',
  'af',
  'so',
  'rw',
  'rn',
  'ln',
  'sn',
  'ak',
  'ff',
  'bm',
  'ny',
  'ti',
  'ug',
  'ks',
  'as',
  'tl',
  'ca',
  'be',
  'sq',
  'qu',
  'ht',
  'mg',
  'ku',
  'wo',
  'ga',
  'is',
];

const overwrite = process.argv.includes('--force') || process.argv.includes('--overwrite');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readJSON(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJSON(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

function main() {
  const enPath = path.join(i18nDir, 'en', 'code.json');
  if (!fs.existsSync(enPath)) {
    console.error(`[ERROR] Missing English source file: ${enPath}`);
    process.exit(1);
  }
  const en = readJSON(enPath);

  let created = 0;
  let skipped = 0;
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    const destDir = path.join(i18nDir, locale);
    const destFile = path.join(destDir, 'code.json');
    ensureDir(destDir);
    if (!overwrite && fs.existsSync(destFile)) {
      skipped++;
      continue;
    }
    // Seed with English messages so UI renders; translators can edit later.
    writeJSON(destFile, en);
    created++;
  }
  console.log(`[i18n] Stub generation complete. Created: ${created}, Skipped: ${skipped}`);
}

main();
