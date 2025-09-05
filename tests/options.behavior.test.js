/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function mountOptionsDom() {
  document.body.innerHTML = `
  <div>
    <textarea id="blacklist-patterns"></textarea>
    <input id="confirm-before" type="checkbox" />
    <input type="radio" name="confirm-default" value="yes" checked />
    <input type="radio" name="confirm-default" value="no" />
    <button id="save-btn"></button>
    <button id="reset-btn"></button>
    <div id="status-label"></div>
  </div>`;
}

describe('options page — reads, writes, resets', () => {
  beforeEach(() => { mountOptionsDom(); });

  it('auto-fills defaults when user list is empty', async () => {
    vi.resetModules();
    mockBrowser({
      get: vi.fn().mockResolvedValue({ blacklistPatterns: [] }),
      set: vi.fn(),
    });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const ta = /** @type {HTMLTextAreaElement} */(document.getElementById('blacklist-patterns'));
    expect(ta.value).toContain('*intern*');
    expect(ta.value).toContain('*secret*');
  });

  it('save lowercases patterns and notifies background', async () => {
    vi.resetModules();
    const get = vi.fn().mockResolvedValue({ blacklistPatterns: ['Foo.PDF'], confirmBeforeAdd: true, confirmDefaultChoice: 'no' });
    const set = vi.fn();
    const sendMessage = vi.fn();
    mockBrowser({ get, set, sendMessage });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    // change patterns and save
    const ta = /** @type {HTMLTextAreaElement} */(document.getElementById('blacklist-patterns'));
    ta.value = 'IMG.PNG\nRePort.PDF\n';
    document.getElementById('save-btn').click();
    await tick();
    expect(set).toHaveBeenCalled();
    const [arg] = set.mock.calls.at(-1);
    expect(arg.blacklistPatterns).toEqual(['img.png', 'report.pdf']);
    expect(sendMessage).toHaveBeenCalledWith({ type: 'rwa:apply-settings-open-compose' });
  });

  it('reset writes defaults and reloads form', async () => {
    vi.resetModules();
    const get = vi.fn().mockResolvedValue({ blacklistPatterns: ['x'], confirmBeforeAdd: false, confirmDefaultChoice: 'yes' });
    const set = vi.fn();
    mockBrowser({ get, set });
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    document.getElementById('reset-btn').click();
    await tick();
    // After reset, set called with defaults (we check known tokens)
    const calls = set.mock.calls.map(c => c[0]);
    const last = calls.at(-1);
    expect(last.blacklistPatterns).toContain('*intern*');
  });
});

function mockBrowser({ get, set, sendMessage = vi.fn(), getMessage = vi.fn().mockReturnValue('') }) {
  globalThis.browser = {
    storage: { local: { get, set } },
    runtime: { sendMessage },
    i18n: { getMessage }
  };
}
function tick() { return new Promise(r => setTimeout(r, 0)); }
/*
 * Scope: options page read/save/reset behavior.
 * Intent: auto-fill defaults on empty lists; save lowercases patterns and
 *         notifies background; reset restores defaults and UI.
 */
