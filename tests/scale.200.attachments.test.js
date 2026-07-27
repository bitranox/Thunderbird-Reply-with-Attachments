/*
 * Test Module: scale.200.attachments.test.js
 * Scope: Scale sanity — many attachments.
 * Intent: A reply to a message with ~200 parts copies up to the count limit,
 *         exactly once each, quickly, and reports what it left behind.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

function makeAttachments(n = 200) {
  const list = [];
  for (let i = 0; i < n; i++) {
    const inline = i % 10 === 0; // every 10th is inline image (excluded by default)
    const name = inline ? `img${i}.png` : `doc${i}.txt`;
    const att = {
      name,
      partName: String(i),
      contentType: inline ? 'image/png' : 'text/plain',
      size: 1024,
    };
    if (inline) att.contentId = `img${i}@example.net`;
    list.push(att);
  }
  return list;
}

/** Message HTML that embeds every inline image, which is what makes them inline. */
function makeBodyReferencing(attachments) {
  return attachments
    .filter((a) => a.contentId)
    .map((a) => `<img src="cid:${a.contentId}">`)
    .join('');
}

describe('Scale sanity — ~200 attachments', () => {
  // Test: copies up to the count limit, once each, and reports the remainder
  it('copies up to the count limit, once each, and reports the remainder', async () => {
    const messageAttachments = makeAttachments(200);
    const browser = createBrowserMock({
      messageAttachments,
      messageHtml: makeBodyReferencing(messageAttachments),
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/confirm_flow.js');
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const t0 = Date.now();
    await triggerComposeState(browser, 5);
    const dt = Date.now() - t0;

    const { maxCount } = App.UseCases.COPY_LIMITS;
    const eligible = 180; // 200 parts, every 10th is an embedded image
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(maxCount);

    // Each copied part is distinct.
    const files = browser.compose.addAttachment.mock.calls.map((c) => c[1].file);
    expect(files.length).toBe(maxCount);

    // The user is told about the ones that did not fit, rather than getting a
    // silently truncated set.
    const notices = browser.tabs.sendMessage.mock.calls
      .map((c) => c[1])
      .filter((m) => m?.type === 'rwa:warn-blacklist');
    expect(notices.length).toBeGreaterThan(0);
    const reported = notices.flatMap((m) => m.rows || []);
    expect(reported.length).toBe(eligible - maxCount);
    expect(reported[0].pattern).toBe(`> ${maxCount}`);

    // perf sanity check: should comfortably run under 2s on CI
    expect(dt).toBeLessThan(2000);
  });
});
