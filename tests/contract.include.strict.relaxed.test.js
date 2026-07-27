/*
 * Test Module: contract.include.strict.relaxed.test.js
 * Scope: Domain — includeStrict/Relaxed contracts.
 * Intent: Ensure both exclude S/MIME and inline images referenced by the body,
 *         and that both keep images whose Content-ID nothing embeds.
 */
import { describe, it, expect, beforeAll } from 'vitest';

describe('Domain includeStrict/Relaxed contract (SMIME/inline)', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });
  // Test: both exclude SMIME signatures and embedded inline images
  it('both exclude SMIME signatures and embedded inline images', () => {
    const { App } = globalThis;
    const refs = App.Domain.collectInlineCids('<p>hi</p><img src="cid:logo">');
    const smime = { name: 'smime.p7s', contentType: 'application/pkcs7-signature' };
    const inlineImg = { name: 'logo.png', contentType: 'image/png', contentId: 'logo' };
    expect(App.Domain.includeStrict(smime, refs)).toBe(false);
    expect(App.Domain.includeRelaxed(smime, refs)).toBe(false);
    expect(App.Domain.includeStrict(inlineImg, refs)).toBe(false);
    expect(App.Domain.includeRelaxed(inlineImg, refs)).toBe(false);
  });

  // Test: both keep an image whose Content-ID the body never embeds
  it('both keep an image whose Content-ID the body never embeds', () => {
    const { App } = globalThis;
    const refs = App.Domain.collectInlineCids('<p>no images here</p>');
    const attached = {
      name: 'photo.png',
      contentType: 'image/png',
      contentId: '<5A3F@example.net>',
      contentDisposition: 'attachment; filename=photo.png',
    };
    expect(App.Domain.includeStrict(attached, refs)).toBe(true);
    expect(App.Domain.includeRelaxed(attached, refs)).toBe(true);
  });
});
