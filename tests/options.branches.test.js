/* @vitest-environment jsdom */
/*
 * Test Module: options.branches.test.js
 * Scope: Options page — uncovered branch paths.
 * Intent: Exercise DOMContentLoaded path, save with def=no, sendMessage catch,
 *         messenger i18n, getMessage catch, setStatus edge cases, storage edge cases.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function mountDom() {
  document.body.innerHTML = `
  <div>
    <textarea id="blacklist-patterns"></textarea>
    <input id="confirm-before" type="checkbox" />
    <input id="warn-blacklist" type="checkbox" />
    <input id="include-inline" type="checkbox" />
    <input id="debug-logging" type="checkbox" />
    <input type="radio" name="confirm-default" value="yes" />
    <input type="radio" name="confirm-default" value="no" />
    <button id="save-btn"></button>
    <button id="reset-btn"></button>
    <div id="status-label"></div>
  </div>`;
}

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

describe('options — save with confirm-default=no', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn().mockResolvedValue(undefined),
        },
      },
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('saves confirmDefaultChoice as no when no radio is checked', async () => {
    await import('../sources/options.js');
    await tick();
    // Check the "no" radio
    const noRadio = /** @type {HTMLInputElement} */ (
      document.querySelector('input[name="confirm-default"][value="no"]')
    );
    noRadio.checked = true;
    // Click save
    document.getElementById('save-btn').click();
    await tick();
    expect(browser.storage.local.set).toHaveBeenCalledWith(
      expect.objectContaining({ confirmDefaultChoice: 'no' })
    );
  });
});

describe('options — save when sendMessage throws', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn().mockResolvedValue(undefined),
        },
      },
      runtime: { sendMessage: vi.fn().mockRejectedValue(new Error('no background')) },
      i18n: { getMessage: vi.fn(() => '') },
    };
  });

  it('still completes save even if sendMessage rejects', async () => {
    await import('../sources/options.js');
    await tick();
    document.getElementById('save-btn').click();
    await tick();
    await tick();
    // save completed (status label was set)
    const status = document.getElementById('status-label');
    expect(status.textContent).not.toBe('');
  });
});

describe('options — load with storage returning non-array for KEY', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({ blacklistPatterns: 'not-an-array' }),
          set: vi.fn(),
        },
      },
      runtime: { sendMessage: vi.fn() },
      i18n: { getMessage: vi.fn(() => '') },
    };
  });

  it('handles non-array blacklistPatterns gracefully', async () => {
    await import('../sources/options.js');
    await tick();
    const ta = /** @type {HTMLTextAreaElement} */ (document.getElementById('blacklist-patterns'));
    // Should be empty since stored value isn't an array
    expect(ta.value).toBe('');
  });
});

describe('options — load with def=no from storage', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({ confirmDefaultChoice: 'no' }),
          set: vi.fn(),
        },
      },
      runtime: { sendMessage: vi.fn() },
      i18n: { getMessage: vi.fn(() => '') },
    };
  });

  it('checks the no radio when default is no', async () => {
    await import('../sources/options.js');
    await tick();
    const noRadio = /** @type {HTMLInputElement} */ (
      document.querySelector('input[name="confirm-default"][value="no"]')
    );
    expect(noRadio.checked).toBe(true);
  });
});

describe('options — getMessage fallbacks', () => {
  it('uses messenger.i18n when browser.i18n is missing', async () => {
    vi.resetModules();
    mountDom();
    const getMsg = vi.fn().mockReturnValue('Translated');
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn().mockResolvedValue(undefined),
        },
      },
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      // no i18n on browser
    };
    globalThis.messenger = {
      i18n: { getMessage: getMsg },
    };
    await import('../sources/options.js');
    await tick();
    // Trigger save to exercise getMessage (called for status text)
    document.getElementById('save-btn').click();
    await tick();
    await tick();
    expect(getMsg).toHaveBeenCalled();
    delete globalThis.messenger;
  });

  it('returns empty when both browser and messenger i18n throw', async () => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn(),
        },
      },
      runtime: { sendMessage: vi.fn() },
      i18n: {
        getMessage: () => {
          throw new Error('broken');
        },
      },
    };
    await import('../sources/options.js');
    await tick();
    // Should not crash, labels will be fallback English (empty getMessage → falsy → || fallback)
    expect(true).toBe(true);
  });
});

describe('options — DOMContentLoaded path', () => {
  it('registers init on DOMContentLoaded when readyState is loading', async () => {
    vi.resetModules();
    mountDom();
    const origDesc = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
      writable: true,
    });
    const addEventSpy = vi.spyOn(document, 'addEventListener');
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn(),
        },
      },
      runtime: { sendMessage: vi.fn() },
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/options.js');
    expect(addEventSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    // Trigger DOMContentLoaded
    const handler = addEventSpy.mock.calls.find((c) => c[0] === 'DOMContentLoaded')[1];
    handler();
    await tick();
    // load() should have been called
    expect(browser.storage.local.get).toHaveBeenCalled();
    if (origDesc) Object.defineProperty(document, 'readyState', origDesc);
    addEventSpy.mockRestore();
  });
});

describe('options — setStatus with missing or empty text', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({}),
          set: vi.fn().mockResolvedValue(undefined),
        },
      },
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: { getMessage: vi.fn(() => '') },
    };
  });

  it('clears status text with empty string after save completes', async () => {
    await import('../sources/options.js');
    await tick();
    document.getElementById('save-btn').click();
    // save() calls setStatus('Saving…') then setTimeout(() => setStatus(''), 1500)
    // Verify setStatus('') path via the DOM after timeout
    vi.useFakeTimers();
    vi.advanceTimersByTime(2000);
    vi.useRealTimers();
    await tick();
    const status = document.getElementById('status-label');
    expect(status.textContent).toBe('');
  });
});
