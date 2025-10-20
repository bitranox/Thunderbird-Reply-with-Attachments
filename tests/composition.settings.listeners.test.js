/*
 * Test Module: composition.settings.listeners.test.js
 * Scope: Composition — storage listeners and wiring updates.
 * Intent: Validate settings changes rewire behavior; cleanup on tab removal.
 */
import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

async function boot({
  attachments = [
    { name: 'a.png', partName: '1', contentType: 'image/png' },
    { name: 'b.txt', partName: '2', contentType: 'text/plain' },
  ],
} = {}) {
  const browser = createBrowserMock({
    confirmBeforeAdd: false,
    messageAttachments: attachments,
    getFileByPart: async () => new Blob(['x']),
  });
  // Force ensureRegistered error branch
  browser.scripting.compose.getRegisteredScripts.mockRejectedValueOnce(new Error('boom'));

  // Inject controllable logger
  globalThis.App = globalThis.App || {};
  globalThis.App.Shared = globalThis.App.Shared || {};
  const logs = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
  globalThis.App.Shared.makeLogger = () => logs;

  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  const { App } = globalThis;
  const wiring = App.Composition.createAppWiring(browser);
  await new Promise((r) => setTimeout(r, 0));
  return { browser, logs, wiring };
}

describe('composition — settings listeners and cleanup', () => {
  // Test: registerScripts failure logs debug once on boot
  it('registerScripts failure logs debug once on boot', async () => {
    const { logs } = await boot();
    expect(logs.debug).toHaveBeenCalled();
  });

  // Test: blacklistPatterns change updates excluder (png filtered)
  it('blacklistPatterns change updates excluder (png filtered)', async () => {
    const { browser } = await boot();
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    // before change: both attachments allowed (no confirm)
    await cb(1);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
    // reset call counters
    browser.compose.addAttachment.mockClear();
    // change blacklist to filter *.png
    const storageListener = browser.storage.onChanged.addListener.mock.calls[0][0];
    storageListener({ blacklistPatterns: { newValue: ['*.png'] } }, 'local');
    // new tab id → reprocess with updated excluder
    await cb(2);
    const addedNames = browser.compose.addAttachment.mock.calls.map(
      (c) => c[1].name || c[1].file?.name
    );
    expect(addedNames.length).toBe(1);
  });

  // Test: confirmBeforeAdd toggle and confirmDefaultChoice propagate to payload
  it('confirmBeforeAdd toggle and confirmDefaultChoice propagate to payload', async () => {
    const { browser } = await boot();
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const storageListener = browser.storage.onChanged.addListener.mock.calls[0][0];
    // Turn on confirm and set default to "no"
    storageListener({ confirmBeforeAdd: { newValue: true } }, 'local');
    storageListener({ confirmDefaultChoice: { newValue: 'no' } }, 'local');
    // targeted messaging returns ok
    browser.tabs.sendMessage.mockResolvedValue({ ok: true });
    await cb(3);
    expect(browser.tabs.sendMessage).toHaveBeenCalled();
    const payload = browser.tabs.sendMessage.mock.calls.at(-1)[1];
    expect(payload.type).toBe('rwa:confirm-add');
    expect(payload.def).toBe('no');
  });

  // Test: tabs.onRemoved clears session key and processed map
  it('tabs.onRemoved clears session key and processed map', async () => {
    const { browser } = await boot();
    // Put a value in processedTabsState via session marker path
    globalThis.processedTabsState.set(10, { stage: 'done', messageId: 'msg-10' });
    const removeCb = browser.tabs.onRemoved.addListener.mock.calls[0][0];
    await removeCb(10);
    expect(browser.sessions.removeTabValue).toHaveBeenCalled();
    expect(globalThis.processedTabsState.has(10)).toBe(false);
  });

  // Test: ensureConfirmInjected error path logs debug
  it('ensureConfirmInjected error path logs debug', async () => {
    const { browser, logs } = await boot();
    // enable confirmation to exercise injection
    const storageListener = browser.storage.onChanged.addListener.mock.calls[0][0];
    storageListener({ confirmBeforeAdd: { newValue: true } }, 'local');
    // make executeScript throw
    browser.scripting.compose.executeScript.mockRejectedValueOnce(new Error('exec-fail'));
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    await cb(20);
    expect(logs.debug).toHaveBeenCalled();
  });
});
