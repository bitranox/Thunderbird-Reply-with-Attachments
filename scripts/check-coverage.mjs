#!/usr/bin/env node
import fs from 'fs';
const path = 'coverage/coverage-summary.json';
if (!fs.existsSync(path)) {
  console.error('coverage-summary.json not found at', path);
  process.exit(1);
}
const json = JSON.parse(fs.readFileSync(path, 'utf8'));
const total = json.total || {};
const req = { lines: 85, functions: 85, branches: 85, statements: 85 };
const got = {
  lines: total.lines?.pct ?? 0,
  functions: total.functions?.pct ?? 0,
  branches: total.branches?.pct ?? 0,
  statements: total.statements?.pct ?? 0,
};
let ok = true;
for (const k of Object.keys(req)) {
  if ((got[k] || 0) < req[k]) {
    console.error(`Coverage check failed: ${k} ${got[k]}% < ${req[k]}%`);
    ok = false;
  }
}
if (!ok) process.exit(2);
console.log('Coverage OK', got);
