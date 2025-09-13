#!/usr/bin/env node
/*
 * CI guard: fail if any non‑EN localized doc under website/i18n/<locale>/docusaurus-plugin-content-docs/current
 * contains an absolute docs URL without the locale segment, i.e.
 *   https://bitranox.github.io/Thunderbird-Reply-with-Attachments/docs/...
 * Allowed for EN only; all other locales must use
 *   https://bitranox.github.io/Thunderbird-Reply-with-Attachments/<locale>/docs/...
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE_BASE = 'https://bitranox.github.io/Thunderbird-Reply-with-Attachments';
const BAD_RE = new RegExp(String.raw`${SITE_BASE}/docs/`, 'g');

function listFilesRecursive(dir) {
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) stack.push(p);
      else if (/\.(md|mdx)$/i.test(ent.name)) out.push(p);
    }
  }
  return out.sort();
}

function checkLocale(locale) {
  const docsRoot = path.join(
    'website',
    'i18n',
    locale,
    'docusaurus-plugin-content-docs',
    'current'
  );
  const files = listFilesRecursive(docsRoot);
  /** @type {{file:string, line:number, match:string}[]} */
  const violations = [];
  for (const f of files) {
    const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
    lines.forEach((line, idx) => {
      const m = line.match(BAD_RE);
      if (m) violations.push({ file: f, line: idx + 1, match: line.trim().slice(0, 200) });
    });
  }
  return violations;
}

function main() {
  const i18nDir = path.join('website', 'i18n');
  if (!fs.existsSync(i18nDir)) {
    console.log('No website/i18n directory; nothing to check.');
    return;
  }
  const locales = fs
    .readdirSync(i18nDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((loc) => loc && loc !== 'en');

  /** @type {{locale:string, file:string, line:number, match:string}[]} */
  const allViolations = [];
  for (const loc of locales) {
    for (const v of checkLocale(loc)) allViolations.push({ locale: loc, ...v });
  }

  if (allViolations.length > 0) {
    console.error('Absolute EN docs URLs found in non‑EN localized files:');
    for (const v of allViolations) {
      console.error(` - [${v.locale}] ${v.file}:${v.line}\n   ${v.match}`);
    }
    process.exit(1);
  } else {
    console.log('CI guard: localized docs contain no absolute EN docs URLs.');
  }
}

main();
