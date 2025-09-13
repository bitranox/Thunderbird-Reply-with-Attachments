import { describe, it, expect } from 'vitest';
import {
  protectCode,
  finalizeTranslatedDoc,
  hasFrontMatter,
} from '../scripts/lib/translate_core.js';

describe('batch finalize (writer-only)', () => {
  it('rebuilds header when model returns no front matter', () => {
    const originalFront = 'id: development\ntitle: "Development"\nsidebar_label: "Development"';
    const body = 'Intro with `code`\n\n```js\nconst x=1\n```';
    const { protectedMd, tokens } = protectCode(body);
    // Simulate model returned only body with tokens intact (no YAML front matter)
    const modelContent = protectedMd.replace('Intro', 'Translated Intro');
    const out = finalizeTranslatedDoc({ originalFront, modelContent, tokens, strict: true });
    expect(hasFrontMatter(out)).toBe(true);
    expect(out.includes('\nid: development')).toBe(true);
    expect(out).toContain('Translated Intro');
    expect(out).toContain('```js');
  });

  it('uses translated title/sidebar when model returns front matter', () => {
    const originalFront = 'id: dev\ntitle: "Hello"\nsidebar_label: "Hello"';
    const body = 'Body';
    const { protectedMd, tokens } = protectCode(body);
    const returnedFront = 'title: "Hallo"\nsidebar_label: "Hallo"';
    const modelContent = `---\n${returnedFront}\n---\n\n${protectedMd}`;
    const out = finalizeTranslatedDoc({ originalFront, modelContent, tokens, strict: true });
    expect(hasFrontMatter(out)).toBe(true);
    expect(out.includes('\nid: dev')).toBe(true);
    expect(out).toMatch(/^---\n[\s\S]*\ntitle:\s*"Hallo"/m);
    expect(out).toMatch(/^---\n[\s\S]*\nsidebar_label:\s*"Hallo"/m);
  });
});
