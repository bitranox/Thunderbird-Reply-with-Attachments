/*
 * Test Module: composition.events.test.js
 * Scope: Composition — compose events wiring and ensure behavior.
 * Intent: Ensure onComposeStateChanged and onBeforeSend trigger ensure path once.
 */
import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition wiring — events', () => {
  // Test: onComposeStateChanged triggers ensureReplyAttachments only for replies
  it('onComposeStateChanged triggers ensureReplyAttachments only for replies', async () => {
    const browser = createBrowserMock({});
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'new' });
    await onStateCb(10);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();

    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 99,
    });
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'x.pdf', partName: '1', contentType: 'application/pdf' },
    ]);
    browser.messages.getAttachmentFile = vi.fn().mockResolvedValue(new Blob(['x']));
    await onStateCb(11);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('does not duplicate attachments when onBeforeSend lacks reference id', async () => {
    const browser = createBrowserMock({});
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const onBeforeSend = browser.compose.onBeforeSend.addListener.mock.calls[0][0];

    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 77,
    });
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'doc.pdf', partName: 'a', contentType: 'application/pdf' },
    ]);
    browser.messages.getAttachmentFile = vi.fn().mockResolvedValue(new Blob(['pdf']));

    await onStateCb(20);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);

    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply' });
    await onBeforeSend(20);

    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});

function deferred() {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('Composition wiring — readiness', () => {
  it('waits for settings before ensuring attachments on first event', async () => {
    const gate = deferred();
    const compose = {
      onComposeStateChanged: { addListener: vi.fn() },
      onBeforeSend: { addListener: vi.fn() },
      getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 501 }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi
        .fn()
        .mockResolvedValue([
          { name: 'report.pdf', partName: '42', contentType: 'application/pdf' },
        ]),
      getAttachmentFile: vi.fn().mockResolvedValue(new Blob(['pdf'])),
    };
    const sessions = {
      getTabValue: vi.fn().mockResolvedValue(null),
      setTabValue: vi.fn().mockResolvedValue(undefined),
      removeTabValue: vi.fn().mockResolvedValue(undefined),
    };
    const tabs = {
      onRemoved: { addListener: vi.fn() },
      sendMessage: vi.fn().mockResolvedValue({ ok: true }),
    };
    const runtime = {
      onMessage: { addListener: vi.fn(), removeListener: vi.fn() },
      sendMessage: vi.fn().mockResolvedValue({ ok: true }),
    };
    const storage = {
      local: {
        get: vi.fn(async (defaults) => {
          await gate.promise;
          return defaults;
        }),
      },
      onChanged: { addListener: vi.fn() },
    };
    const scripting = {
      compose: {
        getRegisteredScripts: vi.fn().mockResolvedValue([]),
        registerScripts: vi.fn().mockResolvedValue(undefined),
        executeScript: vi.fn().mockResolvedValue(undefined),
      },
    };
    const windows = {
      create: vi.fn().mockResolvedValue({ id: 1 }),
      update: vi.fn().mockResolvedValue(undefined),
    };
    const browser = { compose, messages, sessions, tabs, runtime, storage, scripting, windows };

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onStateCb = compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const ensurePromise = onStateCb(77);

    expect(compose.addAttachment).not.toHaveBeenCalled();
    gate.resolve();
    await ensurePromise;
    expect(compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
