import { describe, it, expect, vi, beforeEach } from 'vitest';

async function bootBackgroundWith(browser, loggerImpl = null) {
  vi.resetModules();
  // Provide a controllable logger factory
  globalThis.App = globalThis.App || {};
  globalThis.App.Shared = globalThis.App.Shared || {};
  const logs = { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() };
  globalThis.App.Shared.makeLogger = () => (loggerImpl || logs);

  // Fill minimal API shape expected by adapters/composition
  const compose = browser.compose || (browser.compose = {});
  compose.onComposeStateChanged = compose.onComposeStateChanged || { addListener: vi.fn() };
  compose.onBeforeSend = compose.onBeforeSend || { addListener: vi.fn() };
  compose.getComposeDetails = compose.getComposeDetails || vi.fn();
  const tabs = browser.tabs || (browser.tabs = {});
  tabs.onRemoved = tabs.onRemoved || { addListener: vi.fn() };
  const scripting = browser.scripting || (browser.scripting = {});
  scripting.compose = scripting.compose || {
    registerScripts: vi.fn(),
    getRegisteredScripts: vi.fn().mockResolvedValue([]),
    executeScript: vi.fn(),
  };
  browser.sessions = browser.sessions || { getTabValue: vi.fn(), setTabValue: vi.fn(), removeTabValue: vi.fn() };
  browser.messages = browser.messages || { listAttachments: vi.fn(), getAttachmentFile: vi.fn() };
  browser.windows = browser.windows || { create: vi.fn(), update: vi.fn() };
  browser.runtime = browser.runtime || { onMessage: { addListener: vi.fn(), removeListener: vi.fn() } };
  browser.storage = browser.storage || { local: { get: vi.fn().mockResolvedValue({ debug: false }) }, onChanged: { addListener: vi.fn() } };

  globalThis.browser = browser;
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/composition.js');
  await import('../sources/background.js');
  return logs;
}

describe('background — error/edge paths to increase branch coverage', () => {
  beforeEach(() => {
    vi.resetModules();
    // Clean globals that tests might poke
    delete globalThis.SESSION_KEY;
    delete globalThis.processedTabsState;
    delete globalThis.ensureReplyAttachments;
  });

  it('logs warn when tabs.query throws (outer catch)', async () => {
    const browser = {
      runtime: { onMessage: { addListener: vi.fn() } },
      tabs: { query: vi.fn().mockRejectedValue(new Error('boom')) },
      compose: { getComposeDetails: vi.fn() },
      storage: { local: { get: vi.fn().mockResolvedValue({ debug: false }) } },
    };
    const logs = await bootBackgroundWith(browser);
    const listener = browser.runtime.onMessage.addListener.mock.calls[0][0];
    await listener({ type: 'rwa:apply-settings-open-compose' });
    // Give the async apply a tick
    await new Promise((r) => setTimeout(r, 0));
    expect(logs.warn).toHaveBeenCalled();
  });

  it('covers null details, non-reply type, and inner try/catches', async () => {
    const sessions = { removeTabValue: vi.fn((id) => (id === 1 ? Promise.reject(new Error('rm')) : Promise.resolve())) };
    const browser = {
      runtime: { onMessage: { addListener: vi.fn() } },
      tabs: { query: vi.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]) },
      compose: {
        getComposeDetails: vi.fn(async (id) => {
          if (id === 1) return { type: 'replyAll' };
          if (id === 2) return { type: 'new' }; // non-reply branch
          throw new Error('closed'); // null details branch
        }),
      },
      storage: { local: { get: vi.fn().mockResolvedValue({ debug: false }) } },
      sessions,
      messages: { listAttachments: vi.fn(), getAttachmentFile: vi.fn() },
      windows: { create: vi.fn(), update: vi.fn() },
    };

    await bootBackgroundWith(browser);
    // Monkey-patch the globals used inside applySettings to throw for id=1
    const origDelete = globalThis.processedTabsState.delete.bind(globalThis.processedTabsState);
    globalThis.processedTabsState.delete = vi.fn((id) => { if (id === 1) throw new Error('del'); return origDelete(id); });
    const ensureSpy = vi.fn((id) => (id === 1 ? Promise.reject(new Error('ensure')) : Promise.resolve()));
    globalThis.ensureReplyAttachments = ensureSpy;

    const listener = browser.runtime.onMessage.addListener.mock.calls[0][0];
    await listener({ type: 'rwa:apply-settings-open-compose' });
    await new Promise((r) => setTimeout(r, 10));

    expect(browser.compose.getComposeDetails).toHaveBeenCalledTimes(3);
    // ensure called only for tab 1 (reply) and not for 2 (non-reply) or 3 (null)
    expect(ensureSpy).toHaveBeenCalledTimes(1);
    expect(ensureSpy).toHaveBeenCalledWith(1, { type: 'replyAll' });
  });

  it('safeGetComposeDetails returns null on error', async () => {
    const browser = {
      runtime: { onMessage: { addListener: vi.fn() } },
      tabs: { query: vi.fn().mockResolvedValue([]) },
      compose: { getComposeDetails: vi.fn().mockRejectedValue(new Error('x')) },
      storage: { local: { get: vi.fn().mockResolvedValue({ debug: false }) } },
    };
    await bootBackgroundWith(browser);
    const r = await globalThis.getComposeDetails(123);
    expect(r).toBe(null);
  });
});
