/*
 * Test Module: contract.include.strict.relaxed.test.js
 * Scope: Domain — includeStrict/Relaxed contracts.
 * Intent: Ensure both exclude S/MIME and inline images.
 */
import { describe, it, expect, beforeAll } from 'vitest';

describe('Domain includeStrict/Relaxed contract (SMIME/inline)', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });
  // Test: both exclude SMIME signatures and inline images
  it('both exclude SMIME signatures and inline images', () => {
    const { App } = globalThis;
    const smime = { name: 'smime.p7s', contentType: 'application/pkcs7-signature' };
    const inlineImg = { name: 'logo.png', contentType: 'image/png', contentId: 'cid:logo' };
    expect(App.Domain.includeStrict(smime)).toBe(false);
    expect(App.Domain.includeRelaxed(smime)).toBe(false);
    expect(App.Domain.includeStrict(inlineImg)).toBe(false);
    expect(App.Domain.includeRelaxed(inlineImg)).toBe(false);
  });
});
