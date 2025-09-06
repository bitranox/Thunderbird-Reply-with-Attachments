/*
 * Test Module: ui_i18n.rtl.test.js
 * Scope: UI i18n helper — RTL language direction handling.
 * Intent: Ensure `dir=rtl` is set for RTL primary languages.
 */
/* @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';

describe('ui_i18n — RTL dir detection', () => {
  // Test: sets document.dir to rtl for Arabic (ar)
  it('sets document.dir to rtl for Arabic (ar)', async () => {
    vi.resetModules();
    globalThis.browser = {
      i18n: { getUILanguage: () => 'ar-EG', getMessage: vi.fn().mockReturnValue('') },
    };
    await import('../sources/ui_i18n.js');
    // DOMContentLoaded branch not required; run immediately
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });
});
