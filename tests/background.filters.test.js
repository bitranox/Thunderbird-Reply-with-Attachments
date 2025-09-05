import { describe, it, expect, beforeAll } from 'vitest';

describe('Domain filters and utils', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });

  it('lower() normalizes values safely', () => {
    const { App } = globalThis;
    expect(App.Domain.lower('AbC')).toBe('abc');
    expect(App.Domain.lower(null)).toBe('');
  });

  it('normalizedName() picks name or fileName', () => {
    const { App } = globalThis;
    expect(App.Domain.normalizedName({ name: 'Foo.PDF' })).toBe('foo.pdf');
    expect(App.Domain.normalizedName({ fileName: 'Bar.txt' })).toBe('bar.txt');
    expect(App.Domain.normalizedName({})).toBe('');
  });

  it('isSmime detects by name and content-type', () => {
    const { App } = globalThis;
    expect(App.Domain.isSmime({ name: 'smime.p7s' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pkcs7-signature' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/x-pkcs7-signature' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pkcs7-mime' })).toBe(true);
    expect(App.Domain.isSmime({ contentType: 'application/pdf' })).toBe(false);
  });

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

  it('includeStrict excludes S/MIME, inline images, and inline disposition', () => {
    const { App } = globalThis;
    expect(App.Domain.includeStrict({ name: 'a.pdf', contentType: 'application/pdf' })).toBe(true);
    expect(App.Domain.includeStrict({ name: 'smime.p7s' })).toBe(false);
    expect(App.Domain.includeStrict({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(false);
    expect(App.Domain.includeStrict({ contentDisposition: 'inline' })).toBe(false);
  });

  it('includeRelaxed excludes S/MIME and inline content', () => {
    const { App } = globalThis;
    expect(App.Domain.includeRelaxed({ name: 'smime.p7s' })).toBe(false);
    expect(App.Domain.includeRelaxed({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(
      false
    );
    expect(App.Domain.includeRelaxed({ contentDisposition: 'inline' })).toBe(false);
  });
});
