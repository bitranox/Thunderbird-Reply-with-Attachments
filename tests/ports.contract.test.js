/*
 * Test Module: ports.contract.test.js
 * Scope: Port typedef contracts — shape expectations for adapter ports.
 * Intent: Sanity-check presence and types of functions on port facades.
 */
import { describe, it, expect, vi } from 'vitest';

describe('Ports contract — shapes are as promised', () => {
  // Test: makeThunderbirdPorts returns all port groups with expected methods
  it('makeThunderbirdPorts returns all port groups with expected methods', async () => {
    const browser = fakeBrowser();
    await import('../sources/app/adapters/thunderbird.js');
    const ports = globalThis.App.Adapters.makeThunderbirdPorts(browser);

    // compose port
    expectTypeOf(ports.compose.getDetails).toBeFunction();
    expectTypeOf(ports.compose.listAttachments).toBeFunction();
    expectTypeOf(ports.compose.addAttachment).toBeFunction();
    expectHasListener(ports.compose.onStateChanged);

    // messages port
    expectTypeOf(ports.messages.listAttachments).toBeFunction();
    expectTypeOf(ports.messages.getAttachmentFile).toBeFunction();

    // sessions, tabs
    expectTypeOf(ports.sessions.getTabValue).toBeFunction();
    expectTypeOf(ports.sessions.setTabValue).toBeFunction();
    expectTypeOf(ports.tabs.sendMessage).toBeFunction();

    // scripting compose
    expectTypeOf(ports.scriptingCompose.registerScripts).toBeFunction();
    expectTypeOf(ports.scriptingCompose.executeScript).toBeFunction();
  });
});

// Tiny helpers
/** Build a minimal fake browser API for contract checks. */
function fakeBrowser() {
  return {
    compose: {
      getComposeDetails: vi.fn(),
      listAttachments: vi.fn(),
      addAttachment: vi.fn(),
      onComposeStateChanged: { addListener: vi.fn() },
      onBeforeSend: { addListener: vi.fn() },
    },
    messages: { listAttachments: vi.fn(), getAttachmentFile: vi.fn() },
    sessions: { getTabValue: vi.fn(), setTabValue: vi.fn(), removeTabValue: vi.fn() },
    tabs: { onRemoved: { addListener: vi.fn() }, sendMessage: vi.fn() },
    scripting: {
      compose: {
        registerScripts: vi.fn(),
        executeScript: vi.fn(),
        getRegisteredScripts: vi.fn(),
        unregisterScripts: vi.fn(),
      },
    },
  };
}
/** Loose type helper for contract assertions. */
function expectTypeOf(v) {
  return { toBeFunction: () => expect(typeof v).toBe('function') };
}
/** Ensure object has an `addListener` function. */
function expectHasListener(obj) {
  expect(obj && typeof obj.addListener).toBe('function');
}
