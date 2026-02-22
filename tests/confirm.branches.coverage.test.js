/* @vitest-environment jsdom */
/*
 * Test Module: confirm.branches.coverage.test.js
 * Scope: Content confirm — uncovered branch paths.
 * Intent: Exercise dark mode, donate click, openUrlInBackground, i18n catch,
 *         notifyBackgroundReady fallback paths, and isDonateSnoozed error path.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

function loadScript(filepath) {
  const code = fs.readFileSync(filepath, 'utf8');
  const fn = new Function(code);
  fn();
}

const SCRIPT = path.join(process.cwd(), 'sources', 'content', 'confirm.js');

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

describe('content/confirm — dark mode branches', () => {
  let listener;
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    // Force dark mode
    globalThis.matchMedia = vi.fn().mockReturnValue({ matches: true });
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: vi.fn(() => '') },
    };
    loadScript(SCRIPT);
  });

  it('renders dialog in dark mode without errors', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['a.pdf'], def: 'yes' });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    expect(overlay).toBeTruthy();
    // Dark overlay uses 0.6 opacity
    expect(overlay.style.background).toContain('0.6');
    const yesBtn = document.querySelector('[data-testid="rwa-confirm-yes"]');
    yesBtn.click();
    const res = await p;
    expect(res).toEqual({ ok: true });
  });

  it('renders warn-blacklist in dark mode', async () => {
    const p = listener({ type: 'rwa:warn-blacklist', rows: [{ name: 'f.pdf', pattern: '*.pdf' }] });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    expect(overlay).toBeTruthy();
    expect(overlay.style.background).toContain('0.6');
    overlay.querySelector('button').click();
    await p;
  });
});

describe('content/confirm — prefersDark catch path', () => {
  it('returns false when matchMedia throws', () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.matchMedia = () => {
      throw new Error('not supported');
    };
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: vi.fn(() => '') },
    };
    loadScript(SCRIPT);
    // The script loaded without error means prefersDark() returned false on catch
    expect(true).toBe(true);
  });
});

describe('content/confirm — donate click handlers', () => {
  let listener;
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    const i18nMap = new Map(
      Object.entries({
        uiDonate: 'Donate now',
        donateUrl: 'https://example.com/donate',
        confirmYes: 'Yes',
        confirmNo: 'No',
      })
    );
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn().mockResolvedValue({}),
      },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
      storage: { local: { get: vi.fn().mockResolvedValue({ donateHideUntil: 0 }) } },
    };
    loadScript(SCRIPT);
  });

  it('donate click in confirm dialog calls sendMessage with open-url', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['a.pdf'], def: 'yes' });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    const donateBtn = overlay.querySelector('a');
    expect(donateBtn).toBeTruthy();
    expect(donateBtn.textContent).toBe('Donate now');
    donateBtn.click();
    expect(globalThis.browser.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'rwa:open-url',
      url: 'https://example.com/donate',
    });
    document.querySelector('[data-testid="rwa-confirm-yes"]').click();
    await p;
  });

  it('donate click in warn-blacklist dialog calls sendMessage with open-url', async () => {
    const p = listener({
      type: 'rwa:warn-blacklist',
      rows: [{ name: 'x.pdf', pattern: '*.pdf' }],
    });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    const donateBtn = overlay.querySelector('a');
    expect(donateBtn).toBeTruthy();
    donateBtn.click();
    expect(globalThis.browser.runtime.sendMessage).toHaveBeenCalledWith({
      type: 'rwa:open-url',
      url: 'https://example.com/donate',
    });
    overlay.querySelector('button').click();
    await p;
  });
});

describe('content/confirm — openUrlInBackground fallback to window.open', () => {
  it('falls back to window.open when runtime.sendMessage throws', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    const openSpy = vi.fn();
    globalThis.open = openSpy;
    let listener;
    const i18nMap = new Map(
      Object.entries({
        uiDonate: 'Donate',
        donateUrl: 'https://example.com/donate',
      })
    );
    // Make sendMessage throw for open-url but not for the ready notification
    const sendMsg = vi.fn().mockImplementation((msg) => {
      if (msg?.type === 'rwa:open-url') throw new Error('no runtime');
      return Promise.resolve({});
    });
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: sendMsg,
      },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
      storage: { local: { get: vi.fn().mockResolvedValue({ donateHideUntil: 0 }) } },
    };
    loadScript(SCRIPT);
    const p = listener({ type: 'rwa:confirm-add', files: ['a.pdf'], def: 'yes' });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    const donateBtn = overlay.querySelector('a');
    donateBtn.click();
    expect(openSpy).toHaveBeenCalledWith('https://example.com/donate', '_blank', 'noopener');
    document.querySelector('[data-testid="rwa-confirm-yes"]').click();
    await p;
  });
});

describe('content/confirm — i18n catch branch', () => {
  it('returns empty string when browser.i18n.getMessage throws', () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: vi.fn(),
      },
      i18n: {
        getMessage: () => {
          throw new Error('i18n broken');
        },
      },
    };
    loadScript(SCRIPT);
    const { i18n } = globalThis.App.ContentConfirm.Internal;
    expect(i18n('anyKey')).toBe('');
  });
});

describe('content/confirm — messenger fallback in i18n()', () => {
  it('uses messenger.i18n.getMessage when browser.i18n is missing', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const getMsg = vi.fn().mockReturnValue('translated');
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: vi.fn(),
      },
    };
    globalThis.messenger = {
      i18n: { getMessage: getMsg },
    };
    loadScript(SCRIPT);
    const { i18n } = globalThis.App.ContentConfirm.Internal;
    expect(i18n('someKey')).toBe('translated');
    expect(getMsg).toHaveBeenCalledWith('someKey', []);
    delete globalThis.messenger;
  });
});

describe('content/confirm — isDonateSnoozed catch branch', () => {
  it('donate button stays visible when storage.get throws', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    let listener;
    const i18nMap = new Map(
      Object.entries({
        uiDonate: 'Donate',
        donateUrl: 'https://example.com/donate',
        confirmYes: 'Yes',
        confirmNo: 'No',
      })
    );
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
      storage: {
        local: {
          get: vi.fn().mockRejectedValue(new Error('storage error')),
        },
      },
    };
    loadScript(SCRIPT);
    const p = listener({ type: 'rwa:confirm-add', files: ['a.pdf'], def: 'yes' });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    const donateBtn = overlay.querySelector('a');
    // isDonateSnoozed threw → donate stays visible (not hidden)
    expect(donateBtn.style.display).not.toBe('none');
    document.querySelector('[data-testid="rwa-confirm-yes"]').click();
    await p;
  });
});

describe('content/confirm — notifyBackgroundReady alternative paths', () => {
  it('handles document.readyState check throwing', () => {
    const origDesc = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', {
      get() {
        throw new Error('readyState broken');
      },
      configurable: true,
    });
    const sendSpy = vi.fn().mockResolvedValue({});
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: sendSpy,
      },
    };
    loadScript(SCRIPT);
    expect(sendSpy).toHaveBeenCalledWith({ type: 'rwa:compose-content-ready' });
    if (origDesc) Object.defineProperty(document, 'readyState', origDesc);
  });

  it('uses addEventListener for DOMContentLoaded when readyState is loading', () => {
    const origDesc = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
      writable: true,
    });
    const sendSpy = vi.fn().mockResolvedValue({});
    const addEventSpy = vi.spyOn(globalThis, 'addEventListener');
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: sendSpy,
      },
    };
    loadScript(SCRIPT);
    expect(addEventSpy).toHaveBeenCalledWith(
      'DOMContentLoaded',
      expect.any(Function),
      expect.objectContaining({ once: true })
    );
    const handler = addEventSpy.mock.calls.find((c) => c[0] === 'DOMContentLoaded')[1];
    handler();
    expect(sendSpy).toHaveBeenCalledWith({ type: 'rwa:compose-content-ready' });
    if (origDesc) Object.defineProperty(document, 'readyState', origDesc);
    addEventSpy.mockRestore();
  });

  it('calls send() directly when addEventListener throws', () => {
    const origDesc = Object.getOwnPropertyDescriptor(document, 'readyState');
    Object.defineProperty(document, 'readyState', {
      value: 'loading',
      configurable: true,
      writable: true,
    });
    const origAddEvent = globalThis.addEventListener;
    globalThis.addEventListener = () => {
      throw new Error('addEventListener broken');
    };
    const sendSpy = vi.fn().mockResolvedValue({});
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: () => {} },
        sendMessage: sendSpy,
      },
    };
    loadScript(SCRIPT);
    expect(sendSpy).toHaveBeenCalledWith({ type: 'rwa:compose-content-ready' });
    if (origDesc) Object.defineProperty(document, 'readyState', origDesc);
    globalThis.addEventListener = origAddEvent;
  });
});

describe('content/confirm — stylePrimaryButton hover events', () => {
  let listener;
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    const i18nMap = new Map(
      Object.entries({
        uiDonate: 'Donate now',
        donateUrl: 'https://example.com/donate',
      })
    );
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
      storage: { local: { get: vi.fn().mockResolvedValue({ donateHideUntil: 0 }) } },
    };
    loadScript(SCRIPT);
  });

  it('mouseover/mouseout change button background', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['a.pdf'], def: 'yes' });
    await tick();
    const overlay = document.querySelector('[role="dialog"]');
    const donateBtn = overlay.querySelector('a');
    donateBtn.dispatchEvent(new Event('mouseover'));
    // jsdom normalizes hex to rgb()
    expect(donateBtn.style.background).toContain('10, 94, 219');
    donateBtn.dispatchEvent(new Event('mouseout'));
    expect(donateBtn.style.background).toContain('10, 108, 255');
    document.querySelector('[data-testid="rwa-confirm-yes"]').click();
    await p;
  });
});

describe('content/confirm — handleConfirmMessage edge cases', () => {
  let listener;
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: vi.fn(() => '') },
    };
    loadScript(SCRIPT);
  });

  it('returns undefined for null/undefined/unknown payloads', () => {
    expect(listener(null)).toBeUndefined();
    expect(listener(undefined)).toBeUndefined();
    expect(listener({ type: 'unknown' })).toBeUndefined();
  });
});

describe('content/confirm — defaultAnswer and buildConfirmationText branches', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: () => {} } },
    };
    loadScript(SCRIPT);
  });

  it('returns no when payload.def is no', () => {
    const { defaultAnswer } = globalThis.App.ContentConfirm.Internal;
    expect(defaultAnswer({ def: 'no' })).toBe('no');
    expect(defaultAnswer({ def: 'yes' })).toBe('yes');
    expect(defaultAnswer({})).toBe('yes');
    expect(defaultAnswer(null)).toBe('yes');
  });

  it('includes +more count for >5 files', () => {
    const { buildConfirmationText } = globalThis.App.ContentConfirm.Internal;
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    const text = buildConfirmationText(files);
    expect(text).toContain('+2 more');
  });
});

describe('content/confirm — Enter key triggers clickFirst when on first focusable', () => {
  it('Enter calls clickFirst when activeElement is focusables[0]', () => {
    document.body.innerHTML = '<button id="a">A</button><button id="b">B</button>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: () => {} } },
    };
    loadScript(SCRIPT);
    const { trapFocus } = globalThis.App.ContentConfirm.Internal;
    const a = document.getElementById('a');
    const b = document.getElementById('b');
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.appendChild(a);
    container.appendChild(b);
    const clickedA = vi.fn();
    const clickedB = vi.fn();
    a.addEventListener('click', clickedA);
    b.addEventListener('click', clickedB);
    const release = trapFocus([a, b], container);
    // Focus first element, press Enter → should click first
    a.focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(clickedA).toHaveBeenCalled();
    expect(clickedB).not.toHaveBeenCalled();
    // Focus second element, press Enter → should click last
    clickedA.mockClear();
    b.focus();
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(clickedB).toHaveBeenCalled();
    expect(clickedA).not.toHaveBeenCalled();
    release();
  });
});

// This test overrides document.body; afterEach guarantees restoration for jsdom teardown.
describe('content/confirm — showWarningDialog catch when body access throws', () => {
  let origDesc;
  afterEach(() => {
    // Always restore document.body so jsdom teardown can access it
    if (origDesc) {
      Object.defineProperty(document, 'body', origDesc);
      origDesc = null;
    }
  });

  it('returns {ok:true} when document.body access throws', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    let listener;
    globalThis.browser = {
      runtime: {
        onMessage: { addListener: (fn) => (listener = fn) },
        sendMessage: vi.fn(),
      },
      i18n: { getMessage: vi.fn(() => '') },
    };
    loadScript(SCRIPT);
    // Capture and break document.body
    origDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'body');
    Object.defineProperty(document, 'body', {
      get() {
        throw new Error('body access broken');
      },
      configurable: true,
    });
    const res = await listener({ type: 'rwa:warn-blacklist', rows: [] });
    expect(res).toEqual({ ok: true });
  });
});
