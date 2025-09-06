/*
 * Test Module: options.error.load.test.js
 * Scope: Options page — error paths while loading settings into the form.
 * Intent: Ensure sane fallbacks and no crashes when storage APIs fail.
 */
/* @vitest-environment jsdom */
import { describe, it, expect, vi, beforeEach } from 'vitest';

/** Mount a minimal DOM for the options page used by tests. */
function mountOptionsDom() {
  document.body.innerHTML = `
  <div>
    <textarea id="blacklist-patterns"></textarea>
    <input id="confirm-before" type="checkbox" />
    <input id="warn-blacklist" type="checkbox" />
    <input type="radio" name="confirm-default" value="yes" />
    <input type="radio" name="confirm-default" value="no" />
    <button id="save-btn"></button>
    <button id="reset-btn"></button>
    <div id="status-label"></div>
  </div>`;
}

describe('options page — error path on load()', () => {
  beforeEach(() => {
    vi.resetModules();
    mountOptionsDom();
  });

  // Test: handles storage.local.get failure and shows safe defaults
  it('handles storage.local.get failure and shows safe defaults', async () => {
    const get = vi.fn().mockRejectedValue(new Error('boom'));
    const set = vi.fn();
    globalThis.browser = {
      storage: { local: { get, set } },
      runtime: { sendMessage: vi.fn() },
      i18n: { getMessage: vi.fn().mockReturnValue('') },
    };
    await import('../sources/options.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise((r) => setTimeout(r, 0));
    const ta = /** @type {HTMLTextAreaElement} */ (document.getElementById('blacklist-patterns'));
    const cb = /** @type {HTMLInputElement} */ (document.getElementById('confirm-before'));
    const yes = /** @type {HTMLInputElement} */ (
      document.querySelector('input[name="confirm-default"][value="yes"]')
    );
    const no = /** @type {HTMLInputElement} */ (
      document.querySelector('input[name="confirm-default"][value="no"]')
    );
    expect(ta.value).toBe('');
    expect(cb.checked).toBe(false);
    expect(yes.checked).toBe(true);
    expect(no.checked).toBe(false);
  });
});
