#!/usr/bin/env node
// Validate that all locale message files have the same keys as English.
import fs from 'node:fs/promises';
import path from 'node:path';

const localesDir = new URL('../../sources/_locales/', import.meta.url);
const enPath = new URL('./en/messages.json', localesDir);
const en = JSON.parse(await fs.readFile(enPath, 'utf8'));
const keys = new Set(Object.keys(en));

const dir = await fs.readdir(localesDir, { withFileTypes: true });
let ok = true;
for (const ent of dir) {
  if (!ent.isDirectory()) continue;
  const code = ent.name;
  if (code === 'en') continue;
  try {
    const obj = JSON.parse(await fs.readFile(new URL(`./${code}/messages.json`, localesDir), 'utf8'));
    const k2 = new Set(Object.keys(obj));
    for (const k of keys) {
      if (!k2.has(k)) { console.error(`${code}: missing key ${k}`); ok = false; }
    }
    for (const k of k2) {
      if (!keys.has(k)) { console.error(`${code}: extra key ${k}`); ok = false; }
    }
  } catch (e) { console.error(`${code}: invalid or missing messages.json`); ok = false; }
}
process.exit(ok ? 0 : 1);

