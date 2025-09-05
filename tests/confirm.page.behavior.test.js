/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('confirm_page — a tiny window with a clear mind', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="hdr"><p id="text"></p></div><div id="row"><button id="no"></button><button id="yes"></button></div>';
    globalThis.browser = { runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) }, i18n: { getMessage: vi.fn((k) => ({ confirmYes: 'Yes', confirmNo: 'No', confirmAddOne: 'Add attachment: $1?', confirmAddMany: 'Add attachments ($1): $2$3?' }[k] || '') ) } };
    vi.spyOn(window, 'close').mockImplementation(() => {});
  });

  it('def=yes focuses Yes and Enter confirms', async () => {
    vi.resetModules();
    vi.spyOn(window, 'focus').mockImplementation(() => {});
    setSearch('?c=1&list=foo.txt&def=yes&t=tok');
    await import('../sources/confirm_page.js');
    await tick();
    const btnYes = /** @type {HTMLButtonElement} */(document.getElementById('yes'));
    expect(document.activeElement === btnYes || btnYes.hasAttribute('autofocus')).toBe(true);
    // Press Enter
    dispatch('keydown', { key: 'Enter' });
    await tick();
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'rwa:confirm-result', t: 'tok', ok: true });
  });

  it('def=no focuses No and Escape cancels', async () => {
    vi.resetModules();
    vi.spyOn(window, 'focus').mockImplementation(() => {});
    setSearch('?c=2&list=a,b&def=no&t=tok2');
    await import('../sources/confirm_page.js');
    await tick();
    // Press Escape
    dispatch('keydown', { key: 'Escape' });
    await tick();
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'rwa:confirm-result', t: 'tok2', ok: false });
  });
});

function setSearch(qs) { window.history.replaceState({}, '', qs); }
function tick() { return new Promise(r => setTimeout(r, 0)); }
function dispatch(type, props) { document.dispatchEvent(new KeyboardEvent(type, { bubbles: true, ...props })); }
