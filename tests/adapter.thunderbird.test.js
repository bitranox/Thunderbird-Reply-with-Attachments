import { describe, it, expect, vi } from 'vitest';

describe('thunderbird adapter — thin and brave', () => {
  it('wraps compose/messages/tabs/sessions/scripting', async () => {
    const browser = {
      compose: {
        getComposeDetails: vi.fn().mockResolvedValue({ id: 1 }),
        addAttachment: vi.fn().mockResolvedValue(undefined),
        onBeforeSend: { addListener: vi.fn() },
        onComposeStateChanged: { addListener: vi.fn() }
      },
      messages: {
        listAttachments: vi.fn().mockResolvedValue([{ partName: '1' }]),
        getAttachmentFile: vi.fn().mockResolvedValue(new Blob())
      },
      tabs: { onRemoved: { addListener: vi.fn() }, sendMessage: vi.fn() },
      sessions: { getTabValue: vi.fn(), setTabValue: vi.fn(), removeTabValue: vi.fn() },
      scripting: { compose: { executeScript: vi.fn(), registerScripts: vi.fn(), getRegisteredScripts: vi.fn().mockResolvedValue([]), unregisterScripts: vi.fn() } }
    };
    const { default: portsMod } = await import('../sources/app/adapters/thunderbird.js');
    // module exports to global App; access function from there
    const ports = globalThis.App.Adapters.makeThunderbirdPorts(browser);
    expect(await ports.compose.getDetails(7)).toEqual({ id: 1 });
    expect(await ports.compose.listAttachments(7)).toEqual([]); // optional chaining → []
    await ports.compose.addAttachment(7, { file: new Blob() });
    expect(browser.compose.addAttachment).toHaveBeenCalled();
    expect(await ports.messages.listAttachments(9)).toHaveLength(1);
    expect(await ports.messages.getAttachmentFile(9, '1')).toBeInstanceOf(Blob);
    await ports.scriptingCompose.executeScript(5, ['a.js']);
    expect(browser.scripting.compose.executeScript).toHaveBeenCalledWith({ tabId: 5, files: ['a.js'] });
  });

  it('gracefully handles missing optional APIs', async () => {
    const browser = { compose: { getComposeDetails: vi.fn().mockResolvedValue({}) }, scripting: {} };
    await import('../sources/app/adapters/thunderbird.js');
    const ports = globalThis.App.Adapters.makeThunderbirdPorts(browser);
    // sessions/tabs/messages may be undefined; calls should not throw
    await expect(ports.sessions.getTabValue(1, 'k')).resolves.toBeUndefined();
    await expect(ports.tabs.sendMessage(1, {})).resolves.toBeUndefined();
  });
});

