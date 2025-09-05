import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

async function setup({ composeExisting, messageAttachments }) {
  const browser = createBrowserMock({
    composeExisting,
    messageAttachments,
    confirmBeforeAdd: false,
  });
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  const { App } = globalThis;
  await import('../sources/app/composition.js');
  App.Composition.createAppWiring(browser);
  return browser;
}

describe('Duplicate prevention with normalized names', () => {
  it('collapses NFC/NFD and case/trailing dot variants to a single logical file', async () => {
    const composeExisting = [
      { name: 'cafe\u0301.pdf' }, // NFD
      { name: 'file.txt' },
    ];
    const messageAttachments = [
      { name: 'CAFÉ.pdf', partName: '1' }, // NFC + upper
      { name: 'file.txt.', partName: '2' }, // trailing dot
    ];
    const browser = await setup({ composeExisting, messageAttachments });
    await triggerComposeState(browser, 3);
    // Both should be considered duplicates -> no addition
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
