#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, '..');

const configPath = path.join(repoRoot, 'website', 'docusaurus.config.js');
const cfgMod = await import(configPath);
const cfg = cfgMod.default || cfgMod;

const { url, baseUrl, i18n } = cfg;
const { defaultLocale, locales, localeConfigs = {} } = i18n || {};

function labelOf(loc) {
  return localeConfigs?.[loc]?.label || loc;
}

function docsLink(loc) {
  const base = `${url.replace(/\/$/, '')}${baseUrl}`;
  if (!defaultLocale || loc === defaultLocale) return `${base}docs/intro`;
  return `${base}${loc}/docs/intro`;
}

const lines = [];
lines.push('# Languages');
lines.push('');
lines.push('Links to the documentation site for each available language.');
lines.push('');
for (const loc of locales) {
  lines.push(`- ${labelOf(loc)} (${loc}): ${docsLink(loc)}`);
}
lines.push('');
lines.push('Note: The README remains minimal; full docs are maintained on the website.');

const outPath = path.join(repoRoot, 'README_LANGUAGES.md');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${outPath}`);

