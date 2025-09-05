/* @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';

describe('ui_i18n — RTL dir detection', () => {
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
