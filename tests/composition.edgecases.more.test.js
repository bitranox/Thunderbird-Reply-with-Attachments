/*
 * Test Module: composition.edgecases.more.test.js
 * Scope: Composition — edge cases for boot readers, popup URL building, injection caching.
 * Intent: Exercise error/fallback paths and ensure stability.
 */
import { describe, it, expect, vi } from 'vitest';

async function bootWith({
  storageGetFn = vi.fn().mockResolvedValue({
    blacklistPatterns: [],
    confirmBeforeAdd: true,
    confirmDefaultChoice: 'yes',
  }),
  targetedOk = false,
  broadcastOk = false,
  windowsUpdateThrows = true,
} = {}) {
  const browser = {
    runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() }, sendMessage: vi.fn() },
    storage: { local: { get: storageGetFn }, onChanged: { addListener: vi.fn() } },
    tabs: { onRemoved: { addListener: vi.fn() }, sendMessage: vi.fn() },
    windows: { create: vi.fn().mockResolvedValue({ id: 99 }), update: vi.fn() },
    scripting: {
      compose: {
        getRegisteredScripts: vi.fn().mockResolvedValue([]),
        registerScripts: vi.fn(),
        executeScript: vi.fn(),
      },
    },
    compose: {
      onComposeStateChanged: { addListener: vi.fn() },
      onBeforeSend: { addListener: vi.fn() },
      getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 1 }),
      listAttachments: vi.fn().mockResolvedValue(
        Array.from({ length: 7 }, (_, i) => ({
          name: `f${i + 1}.txt`,
          partName: String(i + 1),
          contentType: 'text/plain',
        }))
      ),
      addAttachment: vi.fn(),
    },
    messages: {
      listAttachments: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockResolvedValue(new Blob(['x'])),
    },
    sessions: {
      getTabValue: vi.fn().mockResolvedValue(false),
      setTabValue: vi.fn(),
      removeTabValue: vi.fn(),
    },
  };
  if (!targetedOk) browser.tabs.sendMessage.mockRejectedValue(new Error('targeted fail'));
  else browser.tabs.sendMessage.mockResolvedValue({ ok: true });
  if (broadcastOk) browser.runtime.sendMessage.mockResolvedValue({ ok: true });
  else browser.runtime.sendMessage.mockRejectedValue(new Error('broadcast fail'));
  if (windowsUpdateThrows) browser.windows.update.mockRejectedValue(new Error('update fail'));

  // Deterministic token for popup url
  vi.spyOn(Math, 'random').mockReturnValue(0.424242);

  globalThis.browser = browser;
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  const { App } = globalThis;
  App.Composition.createAppWiring(browser);
  return browser;
}

describe('composition edgecases — boot readers, popup url, injection cache', () => {
  // Test: readConfirmEnabled/Default error paths (storage.get throws) do not crash
  it('readConfirmEnabled/Default error paths (storage.get throws) do not crash', async () => {
    const storageGetFn = vi.fn().mockRejectedValue(new Error('boom'));
    await bootWith({ storageGetFn });
    // ensure there is a message attachment to copy so addAttachment is invoked
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'a.txt', partName: '1', contentType: 'text/plain' },
    ]);
    // Ensure listener is registered and callable
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    await cb(1);
    // With defaults (no confirm), still attaches
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });

  // Test: buildConfirmUrl encodes >5 files and default def when targeted+broadcast fail and windows.update throws
  it('buildConfirmUrl encodes >5 files and default def when targeted+broadcast fail and windows.update throws', async () => {
    const browser = await bootWith({
      targetedOk: false,
      broadcastOk: false,
      windowsUpdateThrows: true,
    });
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.messages.listAttachments.mockResolvedValueOnce(
      Array.from({ length: 7 }, (_, i) => ({
        name: `m${i + 1}.txt`,
        partName: String(i + 1),
        contentType: 'text/plain',
      }))
    );
    const p = cb(2);
    // give waitForConfirm a tick to register listener then simulate ok
    await new Promise((r) => setTimeout(r, 0));
    const token = (0.424242).toString(36).slice(2);
    // capture created URL
    const url = browser.windows.create.mock.calls[0][0].url;
    expect(url).toContain('confirm.html?');
    expect(url).toContain('c=7');
    expect(url).toMatch(/more=2/);
    expect(url).toMatch(/def=yes/); // defaulted
    // now resolve confirm
    const listener = browser.runtime.onMessage.addListener.mock.calls.at(-1)[0];
    listener({ type: 'rwa:confirm-result', t: token, ok: true });
    await p;
    expect(browser.windows.update).toHaveBeenCalled();
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });

  // Test: ensureConfirmInjected executes once per tab (second call early-returns)
  it('ensureConfirmInjected executes once per tab (second call early-returns)', async () => {
    const browser = await bootWith({ targetedOk: false, broadcastOk: true });
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'c.txt', partName: '1', contentType: 'text/plain' },
    ]);
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    await cb(3);
    await cb(3);
    expect(browser.scripting.compose.executeScript).toHaveBeenCalledTimes(1);
  });
});
