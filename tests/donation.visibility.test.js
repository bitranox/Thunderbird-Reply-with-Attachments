/*
 * Test Module: donation.visibility.test.js
 * Scope: Options/Popup donation visibility — snooze + show again
 */
/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function mountSupportDom() {
  document.body.innerHTML = `
  <div>
    <a id="donate-link"><button>Donate</button></a>
    <button id="donate-snooze">I donated</button>
    <span id="donate-snooze-hint"></span>
    <button id="donate-show">Show Donate again</button>
    <div id="status-label"></div>
  </div>`;
}

function mockBrowser({ get, set }) {
  globalThis.browser = {
    storage: { local: { get, set } },
    i18n: {
      // Pass-through with very simple behavior for our keys
      getMessage: vi.fn((key, subs) => {
        if (key === 'uiDonateHiddenUntil')
          return `Hidden until ${Array.isArray(subs) ? subs[0] : subs}`;
        if (key === 'uiDonateSnoozed') return 'Donation prompt hidden for 90 days.';
        if (key === 'uiDonateRestored') return 'Donation prompt is visible again.';
        return '';
      }),
    },
  };
}

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

describe('donation visibility — initial render', () => {
  beforeEach(() => {
    vi.resetModules();
    mountSupportDom();
  });

  it('shows donate + snooze when not snoozed; hides hint/show-again', async () => {
    mockBrowser({ get: vi.fn().mockResolvedValue({ donateHideUntil: 0 }), set: vi.fn() });
    await import('../sources/donation_visibility.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const donate = document.getElementById('donate-link');
    const snooze = document.getElementById('donate-snooze');
    const hint = document.getElementById('donate-snooze-hint');
    const showAgain = document.getElementById('donate-show');
    expect(donate.style.display).not.toBe('none');
    expect(snooze.style.display).not.toBe('none');
    expect(hint.textContent || '').toBe('');
    expect(showAgain.style.display).toBe('none');
  });

  it('hides donate + snooze when snoozed; shows hint/show-again', async () => {
    const until = Date.UTC(2030, 0, 15); // 2030-01-15
    mockBrowser({ get: vi.fn().mockResolvedValue({ donateHideUntil: until }), set: vi.fn() });
    await import('../sources/donation_visibility.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const donate = document.getElementById('donate-link');
    const snooze = document.getElementById('donate-snooze');
    const hint = document.getElementById('donate-snooze-hint');
    const showAgain = document.getElementById('donate-show');
    expect(donate.style.display).toBe('none');
    expect(snooze.style.display).toBe('none');
    expect(showAgain.style.display).not.toBe('none');
    expect(hint.textContent).toContain('Hidden until');
  });
});

describe('donation visibility — actions', () => {
  beforeEach(() => {
    vi.resetModules();
    mountSupportDom();
  });

  it('clicking "I donated" stores 90d snooze and updates UI', async () => {
    const now = Date.UTC(2025, 0, 1); // 2025-01-01
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
    const call = set.mock.calls.find(
      (c) => c[0] && Object.prototype.hasOwnProperty.call(c[0], 'donateHideUntil')
    );
    expect(call).toBeTruthy();
    const until = call[0].donateHideUntil;
    // 90 days ~= 90*24*3600*1000 (timezone not relevant because stored in ms epoch)
    expect(until - now).toBe(90 * 24 * 60 * 60 * 1000);
    // UI toggled
    expect(document.getElementById('donate-link').style.display).toBe('none');
    expect(document.getElementById('donate-show').style.display).not.toBe('none');
  });

  it('clicking "Show Donate again" clears snooze and restores UI', async () => {
    const store = { donateHideUntil: Date.now() + 99999999 };
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
    document.getElementById('donate-show').click();
    await tick();
    const call = set.mock.calls.find(
      (c) => c[0] && Object.prototype.hasOwnProperty.call(c[0], 'donateHideUntil')
    );
    expect(call[0].donateHideUntil).toBe(0);
    expect(document.getElementById('donate-link').style.display).not.toBe('none');
    expect(document.getElementById('donate-snooze').style.display).not.toBe('none');
  });
});
