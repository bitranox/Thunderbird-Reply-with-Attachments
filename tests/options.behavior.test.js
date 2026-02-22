/*
 * Test Module: options.behavior.test.js
 * Scope: Options page — load, save, reset, live apply behavior.
 * Intent: Validate settings persistence, defaults, and messaging to background.
 */
/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

/** Mount a minimal DOM for the options page used by tests. */
function mountOptionsDom() {
  document.body.innerHTML = `
  <div>
    <textarea id="blacklist-patterns"></textarea>
    <input id="confirm-before" type="checkbox" />
    <input id="warn-blacklist" type="checkbox" />
    <input id="include-inline" type="checkbox" />
    <input id="debug-logging" type="checkbox" />
    <input type="radio" name="confirm-default" value="yes" checked />
    <input type="radio" name="confirm-default" value="no" />
    <button id="save-btn"></button>
    <button id="reset-btn"></button>
    <div id="status-label"></div>
  </div>`;
}

describe('options page — reads, writes, resets', () => {
  beforeEach(() => {
    mountOptionsDom();
  });

  // Test: does NOT auto-fill defaults after install — empty user list stays empty
  it('shows empty textarea when user list is empty (no auto-fill)', async () => {
    vi.resetModules();
    mockBrowser({
      get: vi.fn().mockResolvedValue({ blacklistPatterns: [] }),
      set: vi.fn(),
    });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const ta = /** @type {HTMLTextAreaElement} */ (document.getElementById('blacklist-patterns'));
    expect(ta.value).toBe('');
  });

  it('loads debug flag into checkbox state', async () => {
    vi.resetModules();
    const get = vi.fn().mockResolvedValue({
      blacklistPatterns: ['x'],
      confirmBeforeAdd: true,
      confirmDefaultChoice: 'no',
      warnOnBlacklistExcluded: false,
      debug: true,
    });
    mockBrowser({ get, set: vi.fn() });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const debugCb = /** @type {HTMLInputElement} */ (document.getElementById('debug-logging'));
    expect(debugCb.checked).toBe(true);
  });

  // Test: save lowercases patterns and notifies background
  it('save lowercases patterns and notifies background', async () => {
    vi.resetModules();
    const get = vi.fn().mockResolvedValue({
      blacklistPatterns: ['Foo.PDF'],
      confirmBeforeAdd: true,
      confirmDefaultChoice: 'no',
      debug: false,
    });
    const set = vi.fn();
    const sendMessage = vi.fn();
    mockBrowser({ get, set, sendMessage });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    // change patterns and save
    const ta = /** @type {HTMLTextAreaElement} */ (document.getElementById('blacklist-patterns'));
    ta.value = 'IMG.PNG\nRePort.PDF\n';
    const debugCb = /** @type {HTMLInputElement} */ (document.getElementById('debug-logging'));
    debugCb.checked = true;
    document.getElementById('save-btn').click();
    await tick();
    expect(set).toHaveBeenCalled();
    const [arg] = set.mock.calls.at(-1);
    expect(arg.blacklistPatterns).toEqual(['img.png', 'report.pdf']);
    expect(arg.debug).toBe(true);
    expect(sendMessage).toHaveBeenCalledWith({ type: 'rwa:apply-settings-open-compose' });
  });

  // Test: reset writes defaults and reloads form
  it('reset writes defaults and reloads form', async () => {
    vi.resetModules();
    const get = vi.fn().mockResolvedValue({
      blacklistPatterns: ['x'],
      confirmBeforeAdd: false,
      confirmDefaultChoice: 'yes',
      debug: true,
    });
    const set = vi.fn();
    mockBrowser({ get, set });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    document.getElementById('reset-btn').click();
    await tick();
    // After reset, set called with defaults (we check known tokens)
    const calls = set.mock.calls.map((c) => c[0]);
    const last = calls.at(-1);
    expect(last.blacklistPatterns).toContain('*intern*');
    expect(last.debug).toBe(false);
  });
});

/**
 * Create a mock `browser` object exposing i18n, storage and runtime.
 * @param {{get:Function,set:Function,sendMessage?:Function,getMessage?:Function}} param0
 */
function mockBrowser({
  get,
  set,
  sendMessage = vi.fn(),
  getMessage = vi.fn().mockReturnValue(''),
}) {
  globalThis.browser = {
    storage: { local: { get, set } },
    runtime: { sendMessage },
    i18n: { getMessage },
  };
}
/** Advance the microtask queue to flush pending promises. */
function tick() {
  return new Promise((r) => setTimeout(r, 0));
}
/*
 * Scope: options page read/save/reset behavior.
 * Intent: defaults are set only on fresh install; options page no longer
 *         auto-fills when the user list is empty. Save lowercases patterns
 *         and notifies background; reset restores defaults and UI.
 */
