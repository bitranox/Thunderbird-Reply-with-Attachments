/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ui_i18n — attributes and class', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="a" data-i18n="hello"></div>
      <img id="b" data-i18n-attr="alt:iconAlt,title:iconTitle" />
    `;
    globalThis.browser = {
      i18n: {
        getMessage: vi.fn(
          (key) => ({ hello: 'Hello', iconAlt: 'ALT', iconTitle: 'TITLE' })[key] || ''
        ),
      },
    };
  });

  it('applies text and attributes; sets .js class on <html>', async () => {
    await import('../sources/ui_i18n.js');
    expect(document.getElementById('a').textContent).toBe('Hello');
    expect(document.getElementById('b').getAttribute('alt')).toBe('ALT');
    expect(document.getElementById('b').getAttribute('title')).toBe('TITLE');
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });
});
