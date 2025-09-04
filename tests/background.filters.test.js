import { describe, it, expect, beforeEach } from 'vitest';
import vm from 'vm';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('background.js — filters and utils', () => {
  let ctx;

  beforeEach(() => {
    const browser = createBrowserMock();
    ctx = executeBackgroundWith(browser);
  });

  it('lower() normalizes values safely', () => {
    const lower = vm.runInContext('lower', ctx);
    expect(lower('AbC')).toBe('abc');
    expect(lower(null)).toBe('');
  });

  it('normalizedName() picks name or fileName', () => {
    const normalizedName = vm.runInContext('normalizedName', ctx);
    expect(normalizedName({ name: 'Foo.PDF' })).toBe('foo.pdf');
    expect(normalizedName({ fileName: 'Bar.txt' })).toBe('bar.txt');
    expect(normalizedName({})).toBe('');
  });

  it('isSmime detects by name and content-type', () => {
    const isSmime = vm.runInContext('isSmime', ctx);
    expect(isSmime({ name: 'smime.p7s' })).toBe(true);
    expect(isSmime({ contentType: 'application/pkcs7-signature' })).toBe(true);
    expect(isSmime({ contentType: 'application/x-pkcs7-signature' })).toBe(true);
    expect(isSmime({ contentType: 'application/pkcs7-mime' })).toBe(true);
    expect(isSmime({ contentType: 'application/pdf' })).toBe(false);
  });

  it('isInlineImage and isInlineDisposition', () => {
    const isInlineImage = vm.runInContext('isInlineImage', ctx);
    const isInlineDisposition = vm.runInContext('isInlineDisposition', ctx);
    expect(isInlineImage({ contentId: '<cid>', contentType: 'image/png' })).toBe(true);
    expect(isInlineImage({ contentId: '<cid>', contentType: 'application/pdf' })).toBe(false);
    expect(isInlineDisposition({ contentDisposition: 'inline; filename=x' })).toBe(true);
    expect(isInlineDisposition({ contentDisposition: 'attachment; filename=x' })).toBe(false);
  });

  it('includeStrict excludes S/MIME, inline images, and inline disposition', () => {
    const includeStrict = vm.runInContext('includeStrict', ctx);
    expect(includeStrict({ name: 'a.pdf', contentType: 'application/pdf' })).toBe(true);
    expect(includeStrict({ name: 'smime.p7s' })).toBe(false);
    expect(includeStrict({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(false);
    expect(includeStrict({ contentDisposition: 'inline' })).toBe(false);
  });

  it('includeRelaxed excludes S/MIME and inline content', () => {
    const includeRelaxed = vm.runInContext('includeRelaxed', ctx);
    expect(includeRelaxed({ name: 'smime.p7s' })).toBe(false);
    expect(includeRelaxed({ contentId: '<cid>', contentType: 'image/jpeg' })).toBe(false);
    expect(includeRelaxed({ contentDisposition: 'inline' })).toBe(false);
  });
});
