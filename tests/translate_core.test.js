import { describe, it, expect } from 'vitest';
import {
  splitFrontmatter,
  protectCode,
  restoreCode,
  scanCodeTokenIndices,
  assertTokensIntegrity,
  stripCodeWrapper,
  dedupeTopFrontMatter,
  rebuildFrontFromOriginal,
  hasFrontMatter,
} from '../scripts/lib/translate_core.js';

describe('translate_core', () => {
  it('splitFrontmatter parses header and body', () => {
    const s = `---\nid: x\ntitle: "T"\n---\n\nHello`;
    const { front, body } = splitFrontmatter(s);
    expect(front).toContain('id: x');
    expect(body.trim()).toBe('Hello');
  });

  it('protect/restore code works for inline and fenced', () => {
    const m = 'A `b` and `c`\n```js\nconst x=1\n```';
    const { protectedMd, tokens } = protectCode(m);
    // two inline tokens + one fenced = 3
    expect(scanCodeTokenIndices(protectedMd).size).toBe(3);
    const restored = restoreCode(protectedMd, tokens);
    expect(restored).toBe(m);
  });

  it('assertTokensIntegrity catches mismatches', () => {
    const out = 'X __CODE_TOKEN_0__';
    expect(() => assertTokensIntegrity(out, ['code0', 'code1'])).toThrow();
  });

  it('stripCodeWrapper unwraps single fenced file and keeps fm', () => {
    const s = '---\nid: a\n---\n\n```md\nHello\n```';
    const r = stripCodeWrapper(s);
    expect(r.startsWith('---\n')).toBe(true);
    expect(r).toContain('Hello');
  });

  it('dedupeTopFrontMatter keeps only second real fm, not HR', () => {
    const a = '---\nid: a\n---\n\n---\ntext'; // HR only
    expect(dedupeTopFrontMatter(a)).toBeNull();
    const b = '---\nid: a\n---\n\n---\nid: b\n---\nbody';
    const d = dedupeTopFrontMatter(b);
    expect(d).toMatch(/^---\nid: b/m);
  });

  it('rebuildFrontFromOriginal replaces title/sidebar only', () => {
    const orig = 'id: foo\ntitle: "Hello"\nsidebar_label: "Hello"';
    const ret = 'title: "Hallo"\nsidebar_label: "Hallo"';
    const rebuilt = rebuildFrontFromOriginal(orig, ret);
    expect(rebuilt).toContain('id: foo');
    expect(rebuilt).toContain('title: "Hallo"');
    expect(rebuilt).toContain('sidebar_label: "Hallo"');
  });

  it('systemPromptLines and userPromptForDoc shape', () => {
    const { systemPromptLines, userPromptForDoc } = require('../scripts/lib/translate_core.js');
    const sys = systemPromptLines();
    expect(Array.isArray(sys)).toBe(true);
    expect(sys.join('\n')).toMatch(/Translate a Docusaurus Markdown document/);
    const up = userPromptForDoc('id: x\ntitle: "T"', 'BODY', 'de', 'German');
    expect(up).toMatch(/Locale: de/);
    expect(up).toMatch(/---\nid: x/);
    expect(up).toMatch(/BODY$/);
  });

  it('assertTokensIntegrity non-strict logs but does not throw', () => {
    const bad = '__CODE_TOKEN_0__';
    expect(() =>
      assertTokensIntegrity(bad, ['a', 'b'], { strict: false, log: () => {} })
    ).not.toThrow();
  });

  it('stripCodeWrapper unwraps fully fenced document', () => {
    const s = '```markdown\nHello\n```';
    const r = stripCodeWrapper(s);
    expect(r.trim()).toBe('Hello');
  });

  it('rebuildFrontFromOriginal returns original when no translated values', () => {
    const { rebuildFrontFromOriginal } = require('../scripts/lib/translate_core.js');
    const orig = 'id: foo\ntitle: "A"\nsidebar_label: "B"';
    const rebuilt = rebuildFrontFromOriginal(orig, '');
    expect(rebuilt).toBe(orig);
  });

  it('parseFront returns key map', () => {
    const { parseFront } = require('../scripts/lib/translate_core.js');
    const fm = 'id: x\ntitle: "T"\nsidebar_label: "S"';
    const map = parseFront(fm);
    expect(map.id).toBe('x');
    expect(map.title).toBe('"T"');
    expect(map.sidebar_label).toBe('"S"');
  });

  it('hasFrontMatter detects YAML header', () => {
    const s = '---\na: 1\n---\nbody';
    expect(hasFrontMatter(s)).toBe(true);
    expect(hasFrontMatter('body only')).toBe(false);
  });
});
