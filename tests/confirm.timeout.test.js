/*
 * Test Module: confirm.timeout.test.js
 * Scope: Composition — popup confirm outcomes (yes / no / unanswered).
 * Intent: An unanswered popup must fall back to the user's configured default
 *         answer, never silently drop the attachments.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

const TIMEOUT_MS = 120000;

/** Wire the app with both messaging paths broken so the popup path is used. */
async function bootWithPopupOnly(overrides = {}) {
  const browser = createBrowserMock({
    confirmBeforeAdd: true,
    messageAttachments: [{ name: 'a.txt', partName: '1', contentType: 'text/plain' }],
    getFileByPart: async () => new Blob(['x'], { type: 'text/plain' }),
    ...overrides,
  });
  // Force targeted and broadcast confirm to fail so askInPopup is reached.
  browser.tabs.sendMessage.mockRejectedValue(new Error('no targeted listener'));
  browser.runtime.sendMessage.mockRejectedValue(new Error('no broadcast listener'));
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  const { App } = globalThis;
  await import('../sources/app/confirm_flow.js');
  await import('../sources/app/composition.js');
  App.Composition.createAppWiring(browser);
  return { browser, App };
}

describe('confirm popup outcomes', () => {
  let warnSpy;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    warnSpy.mockRestore();
  });

  // Test: an unanswered popup applies the default answer "yes" and attaches
  it('attaches when the popup goes unanswered and the default answer is yes', async () => {
    vi.useFakeTimers();
    const { browser } = await bootWithPopupOnly({ confirmDefaultChoice: 'yes' });
    const stateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const run = stateCb(1);
    await vi.advanceTimersByTimeAsync(TIMEOUT_MS + 50);
    await run;
    // The user configured "yes" as the default; an unanswered popup must honour it
    // rather than discard the files without telling anyone.
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalled();
  });

  // Test: an unanswered popup applies the default answer "no" and skips
  it('skips when the popup goes unanswered and the default answer is no', async () => {
    vi.useFakeTimers();
    const { browser } = await bootWithPopupOnly({ confirmDefaultChoice: 'no' });
    const stateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const run = stateCb(2);
    await vi.advanceTimersByTimeAsync(TIMEOUT_MS + 50);
    await run;
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
  });

  // Test: the popup is not treated as unanswered before the backstop elapses
  it('does not give up before the backstop elapses', async () => {
    vi.useFakeTimers();
    const { browser } = await bootWithPopupOnly({ confirmDefaultChoice: 'yes' });
    const stateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const run = stateCb(3);
    await vi.advanceTimersByTimeAsync(TIMEOUT_MS - 1000);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(2000);
    await run;
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});

describe('resolveConfirmOutcome', () => {
  beforeEach(async () => {
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/confirm_flow.js');
    await import('../sources/app/composition.js');
  });

  // Test: an explicit answer is honoured whatever the default says
  it('honours an explicit answer over the default', () => {
    const { resolveConfirmOutcome } = globalThis.App.Composition.Internal;
    expect(resolveConfirmOutcome('yes', 'no', ['a.txt'])).toBe(true);
    expect(resolveConfirmOutcome('no', 'yes', ['a.txt'])).toBe(false);
  });

  // Test: no answer falls back to the configured default, and says so
  it('falls back to the configured default when nobody answered', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { resolveConfirmOutcome } = globalThis.App.Composition.Internal;
    expect(resolveConfirmOutcome('timeout', 'yes', ['a.txt'])).toBe(true);
    expect(resolveConfirmOutcome('timeout', 'no', ['a.txt'])).toBe(false);
    // An unset default behaves like "yes", matching the options page.
    expect(resolveConfirmOutcome('timeout', undefined, ['a.txt'])).toBe(true);
    expect(warn).toHaveBeenCalledTimes(3);
    warn.mockRestore();
  });
});
