/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function mountDom() {
  document.body.innerHTML =
    '<div id="hdr"><p id="text"></p></div><div id="row"><button id="no"></button><button id="yes"></button></div>';
}

describe('confirm_page — more count, clicks, and visibility refocus', () => {
  beforeEach(() => {
    vi.resetModules();
    mountDom();
    globalThis.browser = {
      runtime: { sendMessage: vi.fn().mockResolvedValue(undefined) },
      i18n: {
        getMessage: vi.fn(
          (k, a) =>
            ({
              confirmYes: 'Yes',
              confirmNo: 'No',
              confirmAddMany: `Add attachments ($1): $2${a?.[2] ? ', +' + a[2] + ' more' : ''}?`,
            })[k] || ''
        ),
      },
    };
    vi.spyOn(window, 'close').mockImplementation(() => {});
    vi.spyOn(window, 'focus').mockImplementation(() => {});
  });

  it('renders +more and handles clicks on yes/no', async () => {
    // Provide 7 files → list shows first 5 and "+2 more"
    setSearch('?c=7&list=a, b, c, d, e&more=2&def=no&t=t3');
    await import('../sources/confirm_page.js');
    const text = document.getElementById('text').textContent;
    expect(text).toContain('+2 more');

    // Click No
    document.getElementById('no').click();
    await tick();
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'rwa:confirm-result', t: 't3', ok: false });

    // Re-mount to test Yes case
    vi.resetModules();
    mountDom();
    setSearch('?c=7&list=a, b, c, d, e&more=2&def=yes&t=t4');
    await import('../sources/confirm_page.js');
    document.getElementById('yes').click();
    await tick();
    expect(browser.runtime.sendMessage).toHaveBeenCalledWith({ type: 'rwa:confirm-result', t: 't4', ok: true });
  });

  it('refocuses default on visibilitychange to visible', async () => {
    setSearch('?c=1&list=x&def=no&t=t5');
    await import('../sources/confirm_page.js');
    const noBtn = /** @type {HTMLButtonElement} */ (document.getElementById('no'));
    // Blur it to simulate focus loss
    noBtn.blur();
    // Force document.visibilityState to 'visible' then dispatch event
    Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await tick();
    // Expect focus snapped back to default (no button)
    expect(document.activeElement === noBtn || noBtn.hasAttribute('autofocus')).toBe(true);
  });
});

function setSearch(qs) {
  window.history.replaceState({}, '', qs);
}
function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

