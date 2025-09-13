/* eslint-env node */
// Ensure all locale messages.json files contain the same keys as EN.
// Missing keys are added with EN's message value. Extra keys are left intact.
// This is a lightweight parity helper to keep tests green after adding new keys in EN.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LOCALES = path.join(ROOT, 'sources', '_locales');
const EN = path.join(LOCALES, 'en', 'messages.json');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

const en = readJson(EN);
const keys = Object.keys(en);

for (const dir of fs.readdirSync(LOCALES, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  if (dir.name === 'en') continue;
  const p = path.join(LOCALES, dir.name, 'messages.json');
  if (!fs.existsSync(p)) continue;
  const obj = readJson(p);
  let changed = false;
  for (const k of keys) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) {
      obj[k] = { ...en[k] }; // shallow clone; ok since only message/metadata
      changed = true;
    }
  }
  if (changed) {
    writeJson(p, obj);
    console.log('Updated', dir.name);
  }
}
