import { describe, it, expect, beforeAll } from 'vitest';

describe('Blacklist glob edge cases', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });

  it('character class [abc].pdf excludes a.pdf,b.pdf,c.pdf', () => {
    const { makeNameExcluder } = globalThis.App.Domain;
    const ex = makeNameExcluder(['[abc].pdf']);
    expect(ex('a.pdf')).toBe(true);
    expect(ex('b.pdf')).toBe(true);
    expect(ex('c.pdf')).toBe(true);
    expect(ex('d.pdf')).toBe(false);
  });

  it('escaped literal "[" does not start a class', () => {
    const { makeNameExcluder } = globalThis.App.Domain;
    const ex = makeNameExcluder(['\\[draft\\].txt']);
    expect(ex('[draft].txt')).toBe(true);
    expect(ex('adraft].txt')).toBe(false);
  });

  it('patterns with "/" do not match filenames (no paths)', () => {
    const { makeNameExcluder } = globalThis.App.Domain;
    const ex = makeNameExcluder(['**/*.pdf']);
    expect(ex('doc.pdf')).toBe(false);
  });
});
