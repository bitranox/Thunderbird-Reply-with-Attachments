/*
 * Test Module: background.filters.test.js
 * Scope: Domain filters and utils — lower, normalizedName, S/MIME/inline checks.
 * Intent: Validate pure helpers used by selection logic.
 */
import { describe, it, expect, beforeAll } from 'vitest';

describe('Domain filters and utils', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });

  // Test: lower() normalizes values safely
  it('lower() normalizes values safely', () => {
    const { App } = globalThis;
    expect(App.Domain.lower('AbC')).toBe('abc');
    expect(App.Domain.lower(null)).toBe('');
  });

  // Test: normalizedName() picks name or fileName
  it('normalizedName() picks name or fileName', () => {
    const { App } = globalThis;
    expect(App.Domain.normalizedName({ name: 'Foo.PDF' })).toBe('foo.pdf');
    expect(App.Domain.normalizedName({ fileName: 'Bar.txt' })).toBe('bar.txt');
    expect(App.Domain.normalizedName({})).toBe('');
  });

  // Test: isSmime detects by name and content-type
  it('isSmime detects by name and content-type', () => {
    const { App } = globalThis;
    expect(App.Domain.isSmime({ name: 'smime.p7s' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pkcs7-signature' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/x-pkcs7-signature' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pkcs7-mime' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pdf' })).toBe(false);
  });

  // Test: isInlineImage and isInlineDisposition
  it('isInlineImage and isInlineDisposition', () => {
    const { App } = globalThis;
    expect(App.Domain.isInlineImage({ contentId: '<cid>', contentType: 'image/png' })).toBe(true);
    expect(App.Domain.isInlineImage({ contentId: '<cid>', contentType: 'application/pdf' })).toBe(
      false
    );
    expect(App.Domain.isInlineDisposition({ contentDisposition: 'inline; filename=x' })).toBe(true);
    expect(App.Domain.isInlineDisposition({ contentDisposition: 'attachment; filename=x' })).toBe(
      false
    );
  });

  // Test: includeStrict excludes S/MIME, inline images, and inline disposition
  it('includeStrict excludes S/MIME, inline images, and inline disposition', () => {
    const { App } = globalThis;
    expect(App.Domain.includeStrict({ name: 'a.pdf', contentType: 'application/pdf' })).toBe(true);
    expect(App.Domain.includeStrict({ name: 'smime.p7s' })).toBe(false);
    expect(App.Domain.includeStrict({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(false);
    expect(App.Domain.includeStrict({ contentDisposition: 'inline' })).toBe(false);
  });

  // Test: includeRelaxed excludes S/MIME and inline content
  it('includeRelaxed excludes S/MIME and inline content', () => {
    const { App } = globalThis;
    expect(App.Domain.includeRelaxed({ name: 'smime.p7s' })).toBe(false);
    expect(App.Domain.includeRelaxed({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(
      false
    );
    expect(App.Domain.includeRelaxed({ contentDisposition: 'inline' })).toBe(false);
  });
});
