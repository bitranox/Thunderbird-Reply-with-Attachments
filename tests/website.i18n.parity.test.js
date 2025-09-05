import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function readFrontmatterId(file) {
  const s = fs.readFileSync(file, 'utf8');
  const m = s.match(/^---[\s\S]*?id:\s*([^\n]+)[\s\S]*?---/);
  return m ? m[1].trim() : null;
}

describe('Website i18n parity — EN vs DE docs presence', () => {
  const enDir = path.join(process.cwd(), 'website', 'docs');
  const deDir = path.join(process.cwd(), 'website', 'i18n', 'de', 'docusaurus-plugin-content-docs', 'current');
  const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.md'));

  it('each EN doc has a DE counterpart', () => {
    const missing = [];
    for (const f of enFiles) {
      const enPath = path.join(enDir, f);
      const id = readFrontmatterId(enPath);
      const dePath = path.join(deDir, f);
      const deById = id ? path.join(deDir, `${id}.md`) : null;
      if (!fs.existsSync(dePath) && (!deById || !fs.existsSync(deById))) {
        missing.push(f);
      }
    }
    expect(missing).toEqual([]);
  });
});

