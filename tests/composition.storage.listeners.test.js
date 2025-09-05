import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('composition — storage change listeners update behavior', () => {
  let browser;
  let ctx;
  let onChanged;

  beforeEach(async () => {
    vi.resetModules();
    onChanged = {
      addListener: vi.fn((fn) => {
        onChanged._ = fn;
      }),
    };
    browser = makeBrowser({ onChanged });
    globalThis.browser = browser;
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/composition.js');
    await import('../sources/background.js');
    ctx = globalThis;
  });

  it('updates blacklist excluder from storage changes', async () => {
    // Initially allow *.png, then change to exclude it
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'report.png', partName: 'p1' },
      { name: 'keep.pdf', partName: 'p2' },
    ]);
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 7,
    });
    await ctx.handleComposeStateChanged(1, {});
    // No patterns yet, should add first eligible (png allowed by domain filters only if not inline)
    // For safety we ensure addAttachment was called at least once
    expect(browser.compose.addAttachment.mock.calls.length >= 1).toBe(true);

    // Now post a storage change to exclude *.png
    const changes = { blacklistPatterns: { newValue: ['*.png'] } };
    onChanged._ && onChanged._(changes, 'local');

    // Trigger again; now only PDF should be added
    browser.compose.addAttachment.mockClear();
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'photo.png', partName: 'p3' },
      { name: 'doc.pdf', partName: 'p4' },
    ]);
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 8,
    });
    await ctx.handleComposeStateChanged(2, {});
    const parts = browser.messages.getAttachmentFile.mock.calls.map((c) => c[1]);
    expect(parts).toContain('p4');
    expect(parts).not.toContain('p3');
  });

  it('enables confirmation when confirmBeforeAdd flips to true', async () => {
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'a.pdf', partName: 'p1' }]);
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 10,
    });
    browser.tabs.sendMessage.mockResolvedValue({ ok: true });
    // Initially confirmBeforeAdd false → no messaging
    await ctx.handleComposeStateChanged(3, {});
    expect(browser.tabs.sendMessage).not.toHaveBeenCalled();

    // Flip confirmBeforeAdd to true
    onChanged._ && onChanged._({ confirmBeforeAdd: { newValue: true } }, 'local');
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 11,
    });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'b.pdf', partName: 'p2' }]);
    await ctx.handleComposeStateChanged(4, {});
    expect(browser.tabs.sendMessage).toHaveBeenCalled();
  });
});

function makeBrowser({ onChanged }) {
  const compose = {
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 1 }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn(),
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
  };
  const messages = {
    listAttachments: vi.fn().mockResolvedValue([]),
    getAttachmentFile: vi.fn().mockResolvedValue(new Blob()),
  };
  const sessions = {
    getTabValue: vi.fn().mockResolvedValue(false),
    setTabValue: vi.fn(),
    removeTabValue: vi.fn(),
  };
  const tabs = {
    onRemoved: { addListener: vi.fn() },
    query: vi.fn().mockResolvedValue([]),
    sendMessage: vi.fn(),
  };
  const scripting = {
    compose: {
      executeScript: vi.fn(),
      getRegisteredScripts: vi.fn().mockResolvedValue([]),
      registerScripts: vi.fn(),
    },
  };
  return {
    compose,
    messages,
    sessions,
    tabs,
    runtime: { onMessage: { addListener: vi.fn() } },
    storage: { local: { get: vi.fn().mockResolvedValue({}) }, onChanged },
    scripting,
  };
}
