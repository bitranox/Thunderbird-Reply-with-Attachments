import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

async function setup() {
  const browser = createBrowserMock({
    confirmBeforeAdd: false,
    blacklistPatterns: ['*.pdf'],
    warnOnBlacklistExcluded: true,
    messageAttachments: [
      { name: 'secret.pdf', partName: '1', contentType: 'application/pdf' }, // blacklisted
    ],
  });
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  const { App } = globalThis;
  const wiring = App.Composition.createAppWiring(browser);
  await wiring.reloadSettings();
  return { browser, wiring };
}

describe('composition — warns on blacklist even if nothing will be added', () => {
  it('sends rwa:warn-blacklist and does not add attachments', async () => {
    const { browser, wiring } = await setup();
    await wiring.ensureReplyAttachments(10, { referenceMessageId: 300, type: 'reply' });
    const warnCall = browser.tabs.sendMessage.mock.calls.find(
      (c) => c?.[1]?.type === 'rwa:warn-blacklist'
    );
    expect(warnCall).toBeTruthy();
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
