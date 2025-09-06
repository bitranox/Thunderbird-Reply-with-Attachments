import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

async function setup({
  confirmBeforeAdd = true,
  targetedOk = true,
  broadcastOk = false,
  popupOk = false,
} = {}) {
  const browser = createBrowserMock({
    confirmBeforeAdd,
    messageAttachments: [{ name: 'x.txt', partName: '1' }],
    getFileByPart: async () => new Blob(['ok']),
  });
  if (!targetedOk) browser.tabs.sendMessage.mockRejectedValue(new Error('no targeted'));
  if (broadcastOk) browser.runtime.sendMessage.mockResolvedValue({ ok: true });
  else browser.runtime.sendMessage.mockRejectedValue(new Error('no broadcast'));

  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  // wire events
  const { App } = globalThis;
  App.Composition.createAppWiring(browser);
  return browser;
}

describe('composition — confirmation flow fallbacks', () => {
  it('uses targeted tab messaging when available (ok)', async () => {
    const browser = await setup({ targetedOk: true, broadcastOk: false });
    await triggerComposeState(browser, 7);
    expect(browser.tabs.sendMessage).toHaveBeenCalledTimes(1);
    expect(browser.runtime.sendMessage).not.toHaveBeenCalled();
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('falls back to broadcast when targeted fails', async () => {
    const browser = await setup({ targetedOk: false, broadcastOk: true });
    await triggerComposeState(browser, 8);
    expect(browser.tabs.sendMessage).toHaveBeenCalled();
    expect(browser.runtime.sendMessage).toHaveBeenCalled();
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('opens popup and resolves when confirm-result arrives (popup ok)', async () => {
    // Force both targeted and broadcast to fail → popup path
    const browser = await setup({ targetedOk: false, broadcastOk: false });
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
    const token = (0.123456789).toString(36).slice(2);
    const p = triggerComposeState(browser, 9);
    // wait a tick so waitForConfirm adds its listener
    await new Promise((r) => setTimeout(r, 0));
    const listener = browser.runtime.onMessage.addListener.mock.calls.at(-1)[0];
    // simulate the popup sending back ok:true with the matching token
    listener({ type: 'rwa:confirm-result', t: token, ok: true });
    await p;
    expect(browser.windows.create).toHaveBeenCalled();
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    rnd.mockRestore();
  });
});
