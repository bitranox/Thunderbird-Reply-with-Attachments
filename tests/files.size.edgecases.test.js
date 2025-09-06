import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

async function setup(messageAttachments, getFileByPart) {
  const browser = createBrowserMock({ messageAttachments, getFileByPart, confirmBeforeAdd: false });
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  const { App } = globalThis;
  await import('../sources/app/composition.js');
  App.Composition.createAppWiring(browser);
  return browser;
}

describe('File sizes — zero byte and multi‑MB', () => {
  it('attaches zero‑byte file without hanging', async () => {
    const messageAttachments = [{ name: 'empty.bin', partName: '1' }];
    const zero = new Blob([]);
    const browser = await setup(messageAttachments, async (id, part) => zero);
    await triggerComposeState(browser, 1);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(browser.compose.addAttachment.mock.calls[0][1].file.size).toBe(0);
  });

  it('attaches large multi‑MB file without hanging', async () => {
    const messageAttachments = [{ name: 'big.bin', partName: '1' }];
    const big = new Blob([new Uint8Array(5 * 1024 * 1024)]); // 5MB
    const browser = await setup(messageAttachments, async () => big);
    await triggerComposeState(browser, 2);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(browser.compose.addAttachment.mock.calls[0][1].file.size).toBe(big.size);
  });
});
