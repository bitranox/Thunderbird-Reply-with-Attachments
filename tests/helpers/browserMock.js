import { vi } from 'vitest';

export function createBrowserMock({
  composeExisting = [],
  messageAttachments = [],
  getFileByPart = async () => null,
  confirmBeforeAdd = false,
  confirmDefaultChoice = 'yes',
  blacklistPatterns = [],
} = {}) {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 101 }),
    listAttachments: vi.fn().mockResolvedValue(composeExisting),
    addAttachment: vi.fn().mockResolvedValue(undefined),
  };
  const messages = {
    listAttachments: vi.fn().mockResolvedValue(messageAttachments),
    getAttachmentFile: vi.fn(getFileByPart),
  };
  const browser = {
    runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() }, sendMessage: vi.fn() },
    windows: {
      create: vi.fn().mockResolvedValue({ id: 1 }),
      update: vi.fn().mockResolvedValue({}),
    },
    tabs: {
      onRemoved: { addListener: vi.fn() },
      sendMessage: vi.fn().mockResolvedValue({ ok: true }),
    },
    storage: {
      local: {
        get: vi
          .fn()
          .mockResolvedValue({ blacklistPatterns, confirmBeforeAdd, confirmDefaultChoice }),
      },
      onChanged: { addListener: vi.fn() },
    },
    compose,
    messages,
    sessions: {
      getTabValue: vi.fn().mockResolvedValue(false),
      setTabValue: vi.fn(),
      removeTabValue: vi.fn(),
    },
    scripting: {
      compose: {
        getRegisteredScripts: vi.fn().mockResolvedValue([]),
        registerScripts: vi.fn(),
        executeScript: vi.fn(),
      },
    },
  };
  return browser;
}

export function triggerComposeState(browser, tabId = 1) {
  const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
  return cb(tabId);
}
