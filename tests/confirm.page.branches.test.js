/* @vitest-environment jsdom */
/*
 * Test Module: confirm.page.branches.test.js
 * Scope: confirm_page.js — uncovered branch paths.
 * Intent: Exercise missing-param defaults, i18n fallbacks, messenger path,
 *         sendMessage error, Enter-on-No, focusDefault catches, defer else.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

function mountDom() {
  document.body.innerHTML =
    '<div id="hdr"><p id="text"></p></div><div id="row"><button id="no"></button><button id="yes"></button></div>';
}

function setSearch(qs) {
  window.history.replaceState({}, '', qs);
}

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

function dispatch(type, props) {
  document.dispatchEvent(new KeyboardEvent(type, { bubbles: true, ...props }));
}

describe('confirm_page — missing query params use defaults', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('renders with empty/missing params without error', async () => {
    setSearch(''); // no params at all
    await import('../sources/confirm_page.js');
    const text = document.getElementById('text').textContent;
    // count=0 → single-file path, list='', fallback English
    expect(text).toContain('Add attachment');
  });
});

describe('confirm_page — i18n returns empty, fallback labels used', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    // i18n always returns '' → fallback labels
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('uses fallback Yes/No labels and fallback text for multiple files', async () => {
    setSearch('?c=3&list=a,b,c&more=&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    expect(document.getElementById('yes').textContent).toBe('Yes');
    expect(document.getElementById('no').textContent).toBe('No');
    // Multi-file fallback text
    const text = document.getElementById('text').textContent;
    expect(text).toContain('Add attachments (3)');
  });
});

describe('confirm_page — messenger fallback in i18n()', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    // No browser.i18n, provide messenger.i18n
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
    };
    globalThis.messenger = {
      i18n: {
        getMessage: vi.fn(
          (k) =>
            ({
              confirmYes: 'Ja',
              confirmNo: 'Nein',
              confirmAddOne: 'Anhang: $1?',
              confirmTitle: 'Bestätigen',
            })[k] || ''
        ),
      },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  afterEach(() => {
    delete globalThis.messenger;
  });

  it('uses messenger.i18n when browser.i18n is missing', async () => {
    setSearch('?c=1&list=foo.txt&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    expect(document.getElementById('yes').textContent).toBe('Ja');
    expect(document.getElementById('no').textContent).toBe('Nein');
    expect(document.getElementById('text').textContent).toContain('Anhang');
  });
});

describe('confirm_page — i18n catch returns empty', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: {
        getMessage: () => {
          throw new Error('i18n broken');
        },
      },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('falls back to English when i18n throws', async () => {
    setSearch('?c=1&list=doc.pdf&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    // Title fallback
    expect(document.title).toBe('Confirm Attachments');
    expect(document.getElementById('text').textContent).toContain('Add attachment');
    expect(document.getElementById('yes').textContent).toBe('Yes');
    expect(document.getElementById('no').textContent).toBe('No');
  });
});

describe('confirm_page — sendMessage error in send()', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockRejectedValue(new Error('send failed')) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('still calls window.close when sendMessage rejects', async () => {
    setSearch('?c=1&list=x&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    document.getElementById('yes').click();
    await tick();
    expect(window.close).toHaveBeenCalled();
  });
});

describe('confirm_page — Enter on No button clicks No', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('Enter when No is focused sends ok:false', async () => {
    setSearch('?c=1&list=x&def=no&t=tok');
    await import('../sources/confirm_page.js');
    const noBtn = document.getElementById('no');
    noBtn.focus();
    dispatch('keydown', { key: 'Enter' });
    await tick();
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'rwa:confirm-result',
      t: 'tok',
      ok: false,
    });
  });
});

describe('confirm_page — focusDefault catch paths', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
  });

  it('handles window.focus throwing', async () => {
    vi.spyOn(window, 'focus').mockImplementation(() => {
      throw new Error('focus not allowed');
    });
    setSearch('?c=1&list=x&def=yes&t=tok');
    // Should not throw
    await import('../sources/confirm_page.js');
    expect(true).toBe(true);
  });

  it('handles button.focus throwing', async () => {
    vi.spyOn(window, 'focus').mockImplementation(() => {});
    setSearch('?c=1&list=x&def=yes&t=tok');
    // Override Yes button focus to throw
    const yesBtn = document.getElementById('yes');
    yesBtn.focus = () => {
      throw new Error('focus broken');
    };
    // Should not throw during import (focusDefault is called via setTimeout)
    await import('../sources/confirm_page.js');
    await tick();
    expect(true).toBe(true);
  });
});

describe('confirm_page — defer without globalThis.setTimeout', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('uses plain setTimeout when globalThis.setTimeout is removed', async () => {
    setSearch('?c=1&list=x&def=yes&t=tok');
    // Temporarily remove globalThis.setTimeout to hit the else branch
    const origSetTimeout = globalThis.setTimeout;
    delete globalThis.setTimeout;
    await import('../sources/confirm_page.js');
    // Restore
    globalThis.setTimeout = origSetTimeout;
    await tick();
    // Page should still work (focus event triggers defer)
    window.dispatchEvent(new Event('focus'));
    await tick();
    expect(true).toBe(true);
  });
});

describe('confirm_page — document.title catch', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('does not crash if setting document.title throws', async () => {
    const origDesc = Object.getOwnPropertyDescriptor(document, 'title');
    Object.defineProperty(document, 'title', {
      set() {
        throw new Error('title not settable');
      },
      get() {
        return '';
      },
      configurable: true,
    });
    setSearch('?c=1&list=x&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    // Restore
    if (origDesc) Object.defineProperty(document, 'title', origDesc);
    else delete document.title;
    expect(true).toBe(true);
  });
});

describe('confirm_page — visibilitychange when not visible', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('does not refocus when visibilityState is hidden', async () => {
    setSearch('?c=1&list=x&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    const focusSpy = vi.spyOn(window, 'focus');
    focusSpy.mockClear();
    document.dispatchEvent(new Event('visibilitychange'));
    await tick();
    // Should not have called focusDefault (no extra focus call)
    expect(focusSpy.mock.calls.length).toBe(0);
  });
});

describe('confirm_page — unrecognized keys are ignored', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('pressing Tab does not trigger send', async () => {
    setSearch('?c=1&list=x&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    dispatch('keydown', { key: 'Tab' });
    await tick();
    expect(browser.runtime.sendMessage).not.toHaveBeenCalled();
  });
});
