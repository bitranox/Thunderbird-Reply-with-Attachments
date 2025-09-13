import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

describe('e2e translate_web_docs_sync (offline)', () => {
  it('generates DE file with preserved front matter', () => {
    const script = path.join(process.cwd(), 'scripts/translate_web_docs_sync.js');
    const outDir = path.join(
      process.cwd(),
      'website',
      'i18n',
      'de',
      'docusaurus-plugin-content-docs',
      'current'
    );
    const outPath = path.join(outDir, 'development.md');
    const env = { ...process.env, TRANSLATE_OFFLINE: '1' };
    const res = spawnSync('node', [script, '--files', 'development.md', '--locales', 'de'], {
      env,
      encoding: 'utf8',
    });
    expect(res.status).toBe(0);
    expect(fs.existsSync(outPath)).toBe(true);
    const s = fs.readFileSync(outPath, 'utf8');
    expect(/^---\n[\s\S]*?\n---\n/.test(s + (s.endsWith('\n') ? '' : '\n'))).toBe(true);
    expect(s.includes('\nid: development')).toBe(true);
  });
});
