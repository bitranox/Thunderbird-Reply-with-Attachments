import { describe, it, expect } from 'vitest';

describe('Domain includeStrict/Relaxed contract (SMIME/inline)', () => {
  beforeAll(async () => { await import('../sources/app/domain/filters.js'); });
  const { App } = globalThis;

  it('both exclude SMIME signatures and inline images', () => {
    const smime = { name: 'smime.p7s', contentType: 'application/pkcs7-signature' };
    const inlineImg = { name: 'logo.png', contentType: 'image/png', contentId: 'cid:logo' };
    expect(App.Domain.includeStrict(smime)).toBe(false);
    expect(App.Domain.includeRelaxed(smime)).toBe(false);
    expect(App.Domain.includeStrict(inlineImg)).toBe(false);
    expect(App.Domain.includeRelaxed(inlineImg)).toBe(false);
  });
});

