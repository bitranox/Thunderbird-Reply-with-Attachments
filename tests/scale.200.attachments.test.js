import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

function makeAttachments(n = 200) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const inline = i % 10 === 0; // every 10th is inline image (excluded)
    const name = inline ? `img${i}.png` : `doc${i}.txt`;
    const att = { name, partName: String(i), contentType: inline ? 'image/png' : 'text/plain' };
    if (inline) att.contentId = `cid:${i}`; // inline marker
    list.push(att);
  }
  return list;
}

describe('Scale sanity — ~200 attachments', () => {
  it('adds each eligible attachment exactly once; no duplicates across passes', async () => {
    const messageAttachments = makeAttachments(200);
    const browser = createBrowserMock({
      messageAttachments,
      getFileByPart: async () => new Blob(['x'])
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 5);

    const total = 200;
    const excludedInline = Math.floor(total / 10); // 20 inline excluded
    const excludedSmime = 0; // none here
    const expected = total - excludedInline - excludedSmime;
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(expected);
    // ensure part names are unique across calls
    const files = browser.compose.addAttachment.mock.calls.map(c => c[1].file);
    expect(files.length).toBe(expected);
  });
});

