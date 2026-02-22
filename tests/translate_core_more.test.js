import { describe, it, expect } from 'vitest';
import {
  splitFrontmatter,
  parseFront,
  protectCode,
  stripCodeWrapper,
  dedupeTopFrontMatter,
  rebuildFrontFromOriginal,
  hasFrontMatter,
  systemPromptLines,
  userPromptForDoc,
  finalizeTranslatedDoc,
} from '../scripts/lib/translate_core.js';

describe('translate_core additional coverage', () => {
  it('splitFrontmatter returns null front when missing', () => {
    const { front, body } = splitFrontmatter('No header\n');
    expect(front).toBeNull();
    expect(body).toBe('No header\n');
  });

  it('parseFront supports hyphenated keys', () => {
    const fm = 'custom-key: value\nsidebar_label: "S"';
    const map = parseFront(fm);
    expect(map['custom-key']).toBe('value');
    expect(map.sidebar_label).toBe('"S"');
  });

  it('stripCodeWrapper returns unchanged when no wrapper', () => {
    const s = 'Text\n\n```js\ncode\n```';
    expect(stripCodeWrapper(s)).toBe(s);
  });

  it('dedupeTopFrontMatter returns null when second block malformed', () => {
    const s = '---\nid: a\n---\n\n---\nnot a key line\n---\nbody';
    expect(dedupeTopFrontMatter(s)).toBeNull();
  });

  it('rebuildFrontFromOriginal handles only title changed and single quotes', () => {
    const orig = "id: x\ntitle: 'Hello'\nsidebar_label: 'World'";
    const ret = 'title: "Hallo"';
    const rebuilt = rebuildFrontFromOriginal(orig, ret);
    expect(rebuilt).toMatch(/id: x/);
    expect(rebuilt).toMatch(/title: "Hallo"/);
    expect(rebuilt).toMatch(/sidebar_label: 'World'|sidebar_label: "World"/);
  });

  it('userPromptForDoc and systemPromptLines contain required clauses', () => {
    const sys = systemPromptLines().join('\n');
    expect(sys).toMatch(/Preserve anchors/);
    const up = userPromptForDoc('id: x', 'BODY', 'fr', 'French');
    expect(up.startsWith('Locale: fr')).toBe(true);
    expect(up).toContain('---\nid: x');
  });

  it('finalizeTranslatedDoc logs when tokens mismatch (non-strict) and returns text', () => {
    const originalFront = 'id: x\ntitle: "T"\nsidebar_label: "T"';
    const { protectedMd, tokens } = protectCode('Body');
    // Inject an extra fake token leftover that will persist
    const modelContent = protectedMd + ' __CODE_TOKEN_99__';
    const logs = [];
    const out = finalizeTranslatedDoc({
      originalFront,
      modelContent,
      tokens,
      strict: false,
      log: (m) => logs.push(m),
    });
    expect(hasFrontMatter(out)).toBe(true);
    expect(logs.join('\n')).toMatch(/TOKENS/);
  });
});
