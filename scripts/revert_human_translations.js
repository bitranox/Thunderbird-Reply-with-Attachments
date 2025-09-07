// Revert locale docs we accidentally overwrote if HEAD had human translations
// Heuristic: if HEAD version of locale file is not identical to HEAD EN file,
// treat it as human/modified and restore HEAD content.
// Usage: node scripts/revert_human_translations.js website/docs/changelog.md website/docs/features.md

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function listChangedLocaleFiles() {
  const out = execSync('git diff --name-only', { stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
  if (!out) return [];
  return out
    .split(/\r?\n/)
    .filter(Boolean)
    .filter(
      (f) =>
        f.startsWith('website/i18n/') &&
        /\/docusaurus-plugin-content-docs\/current\/(changelog|features)\.md$/.test(f)
    );
}

function gitShow(ref, file) {
  try {
    return execSync(`git show ${ref}:${file}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
  } catch {
    return null;
  }
}

function restoreFileFromHead(file) {
  const content = gitShow('HEAD', file);
  if (content == null) return false;
  fs.writeFileSync(file, content, 'utf8');
  return true;
}

function main() {
  const files = listChangedLocaleFiles();
  let restored = 0,
    skipped = 0;
  for (const f of files) {
    const headLoc = gitShow('HEAD', f);
    if (headLoc == null) {
      skipped++;
      continue;
    }
    const headEn = gitShow('HEAD', 'website/docs/' + path.basename(f));
    // If head localized differs from head EN, treat as human/modified
    if (headEn && headLoc !== headEn) {
      if (restoreFileFromHead(f)) restored++;
      else skipped++;
    } else {
      skipped++;
    }
  }
  console.log(`Restored ${restored} human/modified locale files; skipped ${skipped}.`);
}

main();
