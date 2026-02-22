/*
 * Test Module: donation.visibility.popup.test.js
 * Scope: Popup donation visibility — snooze logic
 */
/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function mountPopupDom() {
  document.body.innerHTML = `
  <div>
    <a id="donate-link"><button>Donate</button></a>
    <button id="donate-snooze">I donated</button>
    <div id="status-label"></div>
  </div>`;
}

function mockBrowser({ get, set }) {
  globalThis.browser = {
    storage: { local: { get, set } },
    i18n: {
      getMessage: vi.fn((key, _subs) => {
        if (key === 'uiDonateSnoozed') return 'Donation prompt hidden for 90 days.';
        return '';
      }),
    },
  };
}

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

describe('popup donation visibility — initial', () => {
  beforeEach(() => {
    vi.resetModules();
    mountPopupDom();
  });

  it('shows donate and snooze when not snoozed', async () => {
    mockBrowser({ get: vi.fn().mockResolvedValue({ donateHideUntil: 0 }), set: vi.fn() });
    await import('../sources/donation_visibility.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(document.getElementById('donate-link').style.display).not.toBe('none');
    expect(document.getElementById('donate-snooze').style.display).not.toBe('none');
  });

  it('hides donate and snooze when snoozed', async () => {
    const until = Date.now() + 10_000_000; // in the future
    mockBrowser({ get: vi.fn().mockResolvedValue({ donateHideUntil: until }), set: vi.fn() });
    await import('../sources/donation_visibility.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(document.getElementById('donate-link').style.display).toBe('none');
    expect(document.getElementById('donate-snooze').style.display).toBe('none');
  });
});

describe('popup donation visibility — action', () => {
  beforeEach(() => {
    vi.resetModules();
    mountPopupDom();
  });

  it('clicking I donated stores snooze and hides donate', async () => {
    const now = Date.UTC(2025, 0, 1);
    vi.spyOn(Date, 'now').mockReturnValue(now);
    const store = { donateHideUntil: 0 };
    const get = vi
      .fn()
      .mockImplementation(async () => ({ donateHideUntil: store.donateHideUntil }));
    const set = vi.fn().mockImplementation(async (obj) => {
      Object.assign(store, obj);
    });
    mockBrowser({ get, set });
    await import('../sources/donation_visibility.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    document.getElementById('donate-snooze').click();
    await tick();
    // store updated
    expect(store.donateHideUntil - now).toBe(90 * 24 * 60 * 60 * 1000);
    // UI hidden
    expect(document.getElementById('donate-link').style.display).toBe('none');
    expect(document.getElementById('donate-snooze').style.display).toBe('none');
  });
});
