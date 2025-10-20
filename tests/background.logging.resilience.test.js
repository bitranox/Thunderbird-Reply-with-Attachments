/*
 * Test Module: background.logging.resilience.test.js
 * Scope: Background logger — ensure console failures are swallowed.
 */
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

function buildBackgroundBrowser() {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply' }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn(),
  };
  return {
    compose,
    tabs: {
      query: vi.fn().mockResolvedValue([]),
      onRemoved: { addListener: vi.fn() },
      sendMessage: vi.fn().mockResolvedValue({ ok: true }),
    },
    messages: {
      listAttachments: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockResolvedValue(null),
    },
    sessions: {
      getTabValue: vi.fn().mockResolvedValue(null),
      setTabValue: vi.fn().mockResolvedValue(undefined),
      removeTabValue: vi.fn().mockResolvedValue(undefined),
    },
    runtime: {
      onMessage: { addListener: vi.fn(), removeListener: vi.fn() },
      sendMessage: vi.fn(),
    },
    windows: { create: vi.fn(), update: vi.fn() },
    scripting: {
      compose: {
        getRegisteredScripts: vi.fn().mockResolvedValue([]),
        registerScripts: vi.fn(),
        executeScript: vi.fn(),
      },
    },
    storage: {
      local: { get: vi.fn().mockResolvedValue({ debug: false }) },
      onChanged: { addListener: vi.fn() },
    },
  };
}

async function bootBackgroundWithFallbackLogger() {
  vi.resetModules();
  globalThis.browser = buildBackgroundBrowser();
  delete globalThis.App;
  await import('../sources/app/shared/utils.js');
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/composition.js');
  if (globalThis.App?.Shared) delete globalThis.App.Shared.makeLogger;
  await import('../sources/background.js');
}

beforeEach(() => {
  delete globalThis.log;
});

afterEach(() => {
  vi.restoreAllMocks();
  delete globalThis.browser;
  delete globalThis.log;
});

test('logger warn swallows console errors from console.warn', async () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
    throw new Error('console warn exploded');
  });
  await bootBackgroundWithFallbackLogger();
  expect(() => globalThis.log.warn('payload')).not.toThrow();
  warnSpy.mockRestore();
});

test('logger error swallows console errors from console.error', async () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {
    throw new Error('console error exploded');
  });
  await bootBackgroundWithFallbackLogger();
  expect(() => globalThis.log.error('payload')).not.toThrow();
  errorSpy.mockRestore();
});
