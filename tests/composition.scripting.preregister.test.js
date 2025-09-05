import { describe, it, expect, vi } from 'vitest';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('composition — scripting preregistration', () => {
  it('registers confirm script when not present', async () => {
    vi.resetModules();
    const browser = makeBrowser({ regs: [] });
    executeBackgroundWith(browser);
    // preregistration runs on wiring
    await tick();
    expect(browser.scripting.compose.registerScripts).toHaveBeenCalledWith([{ id: 'rwa-confirm', js: ['content/confirm.js'] }]);
  });

  it('does not re-register when already present', async () => {
    vi.resetModules();
    const browser = makeBrowser({ regs: [{ id: 'rwa-confirm' }] });
    executeBackgroundWith(browser);
    await tick();
    expect(browser.scripting.compose.registerScripts).not.toHaveBeenCalled();
  });

  it('injects confirm script on compose events', async () => {
    vi.resetModules();
    const browser = makeBrowser({ regs: [{ id: 'rwa-confirm' }] });
    executeBackgroundWith(browser);
    await tick();
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 5 });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'x.pdf', partName: '1' }]);
    await onStateCb(42);
    expect(browser.scripting.compose.executeScript).toHaveBeenCalledWith({ tabId: 42, files: ['content/confirm.js'] });
  });
});

function makeBrowser({ regs }) {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 1 }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn(),
  };
  const messages = { listAttachments: vi.fn().mockResolvedValue([]), getAttachmentFile: vi.fn().mockResolvedValue(new Blob()) };
  const sessions = { getTabValue: vi.fn().mockResolvedValue(false), setTabValue: vi.fn(), removeTabValue: vi.fn() };
  const tabs = { onRemoved: { addListener: vi.fn() }, query: vi.fn().mockResolvedValue([]) };
  const scripting = { compose: { getRegisteredScripts: vi.fn().mockResolvedValue(regs), registerScripts: vi.fn(), executeScript: vi.fn() } };
  const storage = { local: { get: vi.fn().mockResolvedValue({}) }, onChanged: { addListener: vi.fn() } };
  return { compose, messages, sessions, tabs, scripting, storage, runtime: { onMessage: { addListener: vi.fn() } } };
}

function tick() { return new Promise(r => setTimeout(r, 0)); }
