// ESM script to sync changed English docs to all locales
// - Updates only locale files that still match the previous EN content
// - Creates missing locale files with current EN content
// - Preserves human translations (non-identical files)
//
// Usage: node scripts/sync_changed_docs.js website/docs/changelog.md website/docs/features.md

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

/** @param {string} p */
function r(p) {
  return path.resolve(process.cwd(), p);
}

function readFileSafe(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

function writeFileEnsuringDir(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function inGitRepo() {
  try {
    return (
      execSync('git rev-parse --is-inside-work-tree', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim() === 'true'
    );
  } catch {
    return false;
  }
}

/** Get file content at a given git ref, returns null if not available */
function gitShow(ref, file) {
  try {
    return execSync(`git show ${ref}:${file}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  } catch {
    return null;
  }
}

/** Returns [oldEN, curEN] strings for the given EN file */
function getEnglishVersions(enFile) {
  const cur = readFileSafe(enFile);
  if (!inGitRepo()) return [cur, cur];

  // If working tree has uncommitted changes, old is HEAD
  let hasWTChange = false;
  try {
    const diffOut = execSync(`git diff --name-only -- ${enFile}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    hasWTChange = !!diffOut;
  } catch {}

  if (hasWTChange) {
    const oldHead = gitShow('HEAD', enFile);
    return [oldHead ?? cur, cur];
  }

  // Otherwise, try HEAD~1
  const oldPrev = gitShow('HEAD~1', enFile) ?? gitShow('HEAD', enFile) ?? cur;
  return [oldPrev, cur];
}

function parseLocalesFromConfig() {
  const cfgPath = r('website/docusaurus.config.js');
  const raw = readFileSafe(cfgPath);
  if (!raw) return null;
  // Try to capture I18N_LOCALES array
  const m = raw.match(/I18N_LOCALES\s*=\s*\[(.*?)\]/s);
  const src = m ? m[1] : null;
  const arr = [];
  const re = /['\"]([^'\"]+)['\"]/g;
  let mm;
  const body = src ?? raw.match(/i18n\s*:\s*\{[\s\S]*?locales\s*:\s*\[(.*?)\]/s)?.[1] ?? '';
  while ((mm = re.exec(body))) arr.push(mm[1]);
  return arr.length ? arr : null;
}

function listLocalesFromFS() {
  const base = r('website/i18n');
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const targets = args.filter((a) => a !== '--force');
  if (targets.length === 0) {
    console.error('Usage: node scripts/sync_changed_docs.js <doc paths...>');
    process.exit(2);
  }

  const cfgLocales = parseLocalesFromConfig();
  const fsLocales = listLocalesFromFS();
  const locales = unique([...(cfgLocales ?? []), ...fsLocales]).filter((l) => l !== 'en');

  const report = [];

  for (const rel of targets) {
    const _enFile = r(rel);
    const [oldEN, curEN] = getEnglishVersions(rel);
    if (!curEN) {
      console.error(`EN file not found: ${rel}`);
      continue;
    }
    const fileName = path.basename(rel);
    const perDocStats = { doc: rel, created: 0, updated: 0, skipped: 0, unchanged: 0 };

    for (const loc of locales) {
      const locFile = r(
        path.join('website/i18n', loc, 'docusaurus-plugin-content-docs/current', fileName)
      );
      const cur = readFileSafe(locFile);
      if (cur == null) {
        writeFileEnsuringDir(locFile, curEN);
        perDocStats.created++;
        continue;
      }
      if (cur === curEN) {
        perDocStats.unchanged++;
        continue;
      }
      if (force) {
        writeFileEnsuringDir(locFile, curEN);
        perDocStats.updated++;
        continue;
      }
      if (oldEN && cur === oldEN) {
        writeFileEnsuringDir(locFile, curEN);
        perDocStats.updated++;
      } else {
        // Consider human/modified translation; keep as is
        perDocStats.skipped++;
      }
    }
    report.push(perDocStats);
  }

  // Print concise summary for CI/log
  for (const r0 of report) {
    console.log(
      `${r0.doc}: created=${r0.created} updated=${r0.updated} unchanged=${r0.unchanged} skipped=${r0.skipped}`
    );
  }
}

main();
