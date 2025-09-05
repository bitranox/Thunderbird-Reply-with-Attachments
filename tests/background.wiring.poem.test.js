import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('background wiring — whispers and guards', () => {
  /** @type {any} */
  let ctx;

  beforeEach(async () => {
    vi.resetModules();
    const browser = makeBrowser();
    globalThis.browser = browser;
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/composition.js');
    await import('../sources/background.js');
    ctx = globalThis;
  });

  it('when compose details fail, it stays calm', async () => {
    browser.compose.getComposeDetails.mockRejectedValueOnce(new Error('boom'));
    await expect(ctx.handleComposeStateChanged(1, {})).resolves.toBeUndefined();
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('when not a reply, it says nothing', async () => {
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'new' });
    await ctx.handleComposeStateChanged(2, {});
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('getComposeDetails returns null on API failure', async () => {
    browser.compose.getComposeDetails.mockRejectedValueOnce(new Error('nope'));
    const res = await ctx.getComposeDetails(3);
    expect(res).toBeNull();
  });
});

function makeBrowser() {
  const compose = {
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 1 }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn(),
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
  };
  const messages = {
    listAttachments: vi.fn().mockResolvedValue([{ name: 'a.pdf', partName: '1' }]),
    getAttachmentFile: vi.fn().mockResolvedValue(new Blob()),
  };
  const sessions = { getTabValue: vi.fn().mockResolvedValue(false), setTabValue: vi.fn(), removeTabValue: vi.fn() };
  const tabs = { onRemoved: { addListener: vi.fn() }, query: vi.fn().mockResolvedValue([]) };
  return { compose, messages, sessions, tabs, runtime: { onMessage: { addListener: vi.fn() } } };
}

