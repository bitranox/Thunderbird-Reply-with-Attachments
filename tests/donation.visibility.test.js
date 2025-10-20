/*
 * Test Module: donation.visibility.test.js
 * Scope: Options/Popup donation visibility behaviors.
 */
/* @vitest-environment jsdom */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const defaultMessages = {
  uiDonateHiddenUntil: 'Hidden until $1',
  uiDonateSnoozed: 'Donation prompt hidden for 90 days.',
  uiDonateRestored: 'Donation prompt is visible again.',
};

function mountDonateDom() {
  document.body.innerHTML = `
    <div>
      <a id="donate-link"><button>Donate</button></a>
      <button id="donate-snooze">I donated</button>
      <span id="donate-snooze-hint"></span>
      <button id="donate-show">Show Donate again</button>
      <div id="status-label"></div>
    </div>`;
}

function makeI18n(overrides = {}) {
  return {
    getMessage: vi.fn((key, subs) => {
      const msg = overrides[key] ?? defaultMessages[key] ?? '';
      if (typeof msg === 'function') return msg(subs);
      if (Array.isArray(subs)) return msg.replace('$1', subs[0]);
      if (typeof subs === 'string') return msg.replace('$1', subs);
      return msg;
    }),
  };
}

async function flushMicrotasks() {
  await Promise.resolve();
  if (vi.isFakeTimers?.() && vi.isFakeTimers()) {
    await vi.runAllTimersAsync();
  } else {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await Promise.resolve();
}

/**
 * Render donation_visibility.js with a customizable storage/i18n setup.
 * Returns the injected get/set spies for assertions.
 */
async function renderDonationVisibility({
  hideUntil = 0,
  storageGet,
  storageSet,
  now,
  i18nOverrides,
} = {}) {
  vi.resetModules();
  mountDonateDom();
  let donateHideUntilState = hideUntil;
  const get =
    storageGet ??
    vi.fn(async () => ({
      donateHideUntil: donateHideUntilState,
    }));
  const set = vi.fn(async (payload = {}) => {
    if (typeof storageSet === 'function') await storageSet(payload);
    if (payload && Object.prototype.hasOwnProperty.call(payload, 'donateHideUntil')) {
      donateHideUntilState = payload.donateHideUntil;
    }
  });
  globalThis.browser = {
    storage: { local: { get, set } },
    i18n: makeI18n(i18nOverrides),
  };
  if (typeof now === 'number') vi.spyOn(Date, 'now').mockReturnValue(now);
  await import('../sources/donation_visibility.js');
  document.dispatchEvent(new Event('DOMContentLoaded'));
  await flushMicrotasks();
  return { get, set, readState: () => donateHideUntilState };
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  delete globalThis.browser;
  document.body.innerHTML = '';
});

describe('initial visibility when not snoozed', () => {
  let elements;

  beforeEach(async () => {
    await renderDonationVisibility({ hideUntil: 0 });
    elements = {
      donate: document.getElementById('donate-link'),
      snooze: document.getElementById('donate-snooze'),
      hint: document.getElementById('donate-snooze-hint'),
      show: document.getElementById('donate-show'),
    };
  });

  test('shows donate button while snooze is inactive', () => {
    expect(elements.donate.style.display).not.toBe('none');
  });

  test('shows snooze button while snooze is inactive', () => {
    expect(elements.snooze.style.display).not.toBe('none');
  });

  test('keeps snooze hint empty when snooze is inactive', () => {
    expect(elements.hint.textContent).toBe('');
  });

  test('hides show-again button when snooze is inactive', () => {
    expect(elements.show.style.display).toBe('none');
  });
});

describe('initial visibility when snoozed', () => {
  const until = Date.UTC(2030, 0, 15);
  let elements;

  beforeEach(async () => {
    await renderDonationVisibility({ hideUntil: until, now: Date.UTC(2029, 11, 1) });
    elements = {
      donate: document.getElementById('donate-link'),
      snooze: document.getElementById('donate-snooze'),
      hint: document.getElementById('donate-snooze-hint'),
      show: document.getElementById('donate-show'),
    };
  });

  test('hides donate button while snoozed future date exists', () => {
    expect(elements.donate.style.display).toBe('none');
  });

  test('hides snooze button while snoozed future date exists', () => {
    expect(elements.snooze.style.display).toBe('none');
  });

  test('shows show-again button while snoozed future date exists', () => {
    expect(elements.show.style.display).not.toBe('none');
  });

  test('shows formatted snooze hint while snoozed future date exists', () => {
    expect(elements.hint.textContent).toContain('2030-01-15');
  });
});

describe('snooze action', () => {
  test('stores donateHideUntil ninety days ahead when snoozing', async () => {
    const now = Date.UTC(2025, 0, 1);
    const setCalls = [];
    const set = vi.fn(async (payload) => setCalls.push(payload));
    await renderDonationVisibility({ hideUntil: 0, now, storageSet: set });
    document.getElementById('donate-snooze').click();
    await flushMicrotasks();
    expect(setCalls.at(-1).donateHideUntil - now).toBe(90 * 24 * 60 * 60 * 1000);
  });

  test('hides donate button immediately after snoozing', async () => {
    await renderDonationVisibility({ hideUntil: 0, now: Date.UTC(2025, 0, 1) });
    document.getElementById('donate-snooze').click();
    await flushMicrotasks();
    expect(document.getElementById('donate-link').style.display).toBe('none');
  });

  test('shows confirmation message after snoozing', async () => {
    await renderDonationVisibility({ hideUntil: 0, now: Date.UTC(2025, 0, 1) });
    document.getElementById('donate-snooze').click();
    await flushMicrotasks();
    expect(document.getElementById('status-label').textContent).toBe(
      defaultMessages.uiDonateSnoozed
    );
  });

  test('clears confirmation message after snooze timeout', async () => {
    vi.useFakeTimers();
    await renderDonationVisibility({ hideUntil: 0, now: Date.UTC(2025, 0, 1) });
    document.getElementById('donate-snooze').click();
    await flushMicrotasks();
    vi.advanceTimersByTime(1500);
    expect(document.getElementById('status-label').textContent).toBe('');
  });

  test('shows confirmation message even if storage.set throws during snooze', async () => {
    const set = vi.fn().mockRejectedValue(new Error('disk full'));
    await renderDonationVisibility({ hideUntil: 0, storageSet: set, now: Date.UTC(2025, 0, 1) });
    document.getElementById('donate-snooze').click();
    await flushMicrotasks();
    expect(document.getElementById('status-label').textContent).toBe(
      defaultMessages.uiDonateSnoozed
    );
  });
});

describe('show-again action', () => {
  test('resets donateHideUntil to zero when show again clicked', async () => {
    const setCalls = [];
    const set = vi.fn(async (payload) => setCalls.push(payload));
    await renderDonationVisibility({
      hideUntil: Date.UTC(2030, 0, 1),
      storageSet: set,
      now: Date.UTC(2029, 11, 1),
    });
    document.getElementById('donate-show').click();
    await flushMicrotasks();
    expect(setCalls.at(-1).donateHideUntil).toBe(0);
  });

  test('shows donate button after show again clicked', async () => {
    await renderDonationVisibility({
      hideUntil: Date.UTC(2030, 0, 1),
      now: Date.UTC(2029, 11, 1),
    });
    document.getElementById('donate-show').click();
    await flushMicrotasks();
    expect(document.getElementById('donate-link').style.display).not.toBe('none');
  });

  test('shows restore confirmation message after show again clicked', async () => {
    await renderDonationVisibility({
      hideUntil: Date.UTC(2030, 0, 1),
      now: Date.UTC(2029, 11, 1),
    });
    document.getElementById('donate-show').click();
    await flushMicrotasks();
    expect(document.getElementById('status-label').textContent).toBe(
      defaultMessages.uiDonateRestored
    );
  });

  test('clears restore confirmation after timeout', async () => {
    vi.useFakeTimers();
    await renderDonationVisibility({
      hideUntil: Date.UTC(2030, 0, 1),
      now: Date.UTC(2029, 11, 1),
    });
    document.getElementById('donate-show').click();
    await flushMicrotasks();
    vi.advanceTimersByTime(1500);
    expect(document.getElementById('status-label').textContent).toBe('');
  });
});

describe('resilience paths', () => {
  test('keeps donate visible when storage.get rejects', async () => {
    const get = vi.fn().mockRejectedValue(new Error('read failed'));
    await renderDonationVisibility({ storageGet: get });
    expect(document.getElementById('donate-link').style.display).not.toBe('none');
  });

  test('falls back to literal hint text when i18n formatter throws', async () => {
    const until = Date.UTC(2030, 0, 15);
    const overrides = {
      uiDonateHiddenUntil: () => {
        throw new Error('translator missing');
      },
    };
    await renderDonationVisibility({ hideUntil: until, i18nOverrides: overrides });
    expect(document.getElementById('donate-snooze-hint').textContent).toContain('2030-01-15');
  });
});
