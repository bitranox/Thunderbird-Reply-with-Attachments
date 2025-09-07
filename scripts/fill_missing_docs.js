#!/usr/bin/env node
/*
 * fill_missing_docs.js (ESM)
 * Copies EN docs (website/docs/*.md) into each locale under
 * website/i18n/<loc>/docusaurus-plugin-content-docs/current/
 * for any missing files.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyIfMissing(srcFile, destFile) {
  if (!fs.existsSync(destFile)) {
    fs.copyFileSync(srcFile, destFile);
    return true;
  }
  return false;
}

const baseEn = path.join(process.cwd(), 'website', 'docs');
const enFiles = fs.readdirSync(baseEn).filter((f) => f.endsWith('.md'));
const i18nRoot = path.join(process.cwd(), 'website', 'i18n');
const locales = fs.readdirSync(i18nRoot);

let created = 0;
for (const loc of locales) {
  const destDir = path.join(i18nRoot, loc, 'docusaurus-plugin-content-docs', 'current');
  if (!fs.existsSync(destDir)) continue;
  for (const f of enFiles) {
    const src = path.join(baseEn, f);
    const dest = path.join(destDir, f);
    ensureDir(destDir);
    if (copyIfMissing(src, dest)) {
      created++;
    }
  }
}
console.log(`Created ${created} missing docs.`);
