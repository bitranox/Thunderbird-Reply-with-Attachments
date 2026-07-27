/* @vitest-environment jsdom */
/*
 * Test Module: link_handlers.spec.js
 * Scope: Donate / Docs / GitHub / ATN link handlers.
 * Intent: Each test documents one precise user-facing behavior.
 */
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';

const domReady = () => document.dispatchEvent(new Event('DOMContentLoaded'));

function arrangePage() {
  document.body.innerHTML = `
    <a id="donate-link" href="#"><button>Donate</button></a>
    <a id="docs-link" href="#">Docs</a>
    <a id="atn-link" href="#">ATN</a>
    <a id="github-link" href="#">GitHub</a>
    <a id="github-link-logo" href="#">Logo</a>`;
}

function primeBrowser() {
  const windows = { openDefaultBrowser: vi.fn() };
  globalThis.browser = { windows };
  return windows;
}

let registeredDomReadyHandlers = [];
let originalAddEventListener;
let originalRemoveEventListener;

beforeEach(() => {
  vi.resetModules();
  arrangePage();
  registeredDomReadyHandlers = [];
  originalAddEventListener = document.addEventListener.bind(document);
  originalRemoveEventListener = document.removeEventListener.bind(document);
  vi.spyOn(document, 'addEventListener').mockImplementation((type, listener, options) => {
    if (type === 'DOMContentLoaded') registeredDomReadyHandlers.push(listener);
    return originalAddEventListener(type, listener, options);
  });
});

afterEach(() => {
  registeredDomReadyHandlers.forEach((handler) =>
    originalRemoveEventListener('DOMContentLoaded', handler)
  );
  registeredDomReadyHandlers = [];
  document.addEventListener.mockRestore();
  vi.unstubAllGlobals();
  delete globalThis.browser;
  document.body.innerHTML = '';
});

async function loadSharedOpener() {
  await import('../sources/shared_link_opener.js');
}

async function loadDonateHandler() {
  await loadSharedOpener();
  await import('../sources/handle_donate_link.js');
  domReady();
}

async function loadDocsHandler() {
  await loadSharedOpener();
  await import('../sources/handle_docs_link.js');
  domReady();
}

async function loadAtnHandler() {
  await loadSharedOpener();
  await import('../sources/handle_atn_link.js');
  domReady();
}

async function loadGithubHandler() {
  await loadSharedOpener();
  await import('../sources/handle_github_link.js');
  domReady();
}

describe('donate link handler', () => {
  test('ignores donate click when href is placeholder', async () => {
    const windows = primeBrowser();
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([]);
  });

  test('opens donate link in the default browser when href is https', async () => {
    const windows = primeBrowser();
    document.getElementById('donate-link').setAttribute('href', 'https://example.com/donate');
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([['https://example.com/donate']]);
  });

  test('never navigates the options page when opening the donate link fails', async () => {
    const windows = primeBrowser();
    const navigations = [];
    vi.stubGlobal('location', {
      get href() {
        return 'https://addon.test/start';
      },
      set href(value) {
        navigations.push(value);
      },
    });
    document.getElementById('donate-link').setAttribute('href', 'https://example.com/donate');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    windows.openDefaultBrowser.mockImplementation(() => {
      throw new Error('open failed');
    });
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(navigations).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('docs link handler', () => {
  test('opens docs link in the default browser when href is available', async () => {
    const windows = primeBrowser();
    document.getElementById('docs-link').setAttribute('href', 'https://example.com/docs');
    await loadDocsHandler();
    document.getElementById('docs-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([['https://example.com/docs']]);
  });

  test('never navigates the options page when opening the docs link fails', async () => {
    const windows = primeBrowser();
    const navigations = [];
    vi.stubGlobal('location', {
      get href() {
        return 'https://addon.test/docs';
      },
      set href(value) {
        navigations.push(value);
      },
    });
    document.getElementById('docs-link').setAttribute('href', 'https://example.com/docs');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    windows.openDefaultBrowser.mockImplementation(() => {
      throw new Error('open failed');
    });
    await loadDocsHandler();
    document.getElementById('docs-link').click();
    expect(navigations).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('ATN link handler', () => {
  test('opens ATN link in the default browser when href is set', async () => {
    const windows = primeBrowser();
    document.getElementById('atn-link').setAttribute('href', 'https://addons.thunderbird.net/rwa');
    await loadAtnHandler();
    document.getElementById('atn-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([['https://addons.thunderbird.net/rwa']]);
  });
});

describe('GitHub link handler', () => {
  test('ignores GitHub link click when href is placeholder', async () => {
    const windows = primeBrowser();
    await loadGithubHandler();
    document.getElementById('github-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([]);
  });

  test('opens GitHub text link in the default browser when href is set', async () => {
    const windows = primeBrowser();
    document.getElementById('github-link').setAttribute('href', 'https://example.com/repo');
    await loadGithubHandler();
    document.getElementById('github-link').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([['https://example.com/repo']]);
  });

  test('opens GitHub logo link in the default browser when href is set', async () => {
    const windows = primeBrowser();
    document.getElementById('github-link-logo').setAttribute('href', 'https://example.com/repo');
    await loadGithubHandler();
    document.getElementById('github-link-logo').click();
    expect(windows.openDefaultBrowser.mock.calls).toEqual([['https://example.com/repo']]);
  });

  test('never navigates the options page when opening the GitHub logo link fails', async () => {
    const windows = primeBrowser();
    const navigations = [];
    vi.stubGlobal('location', {
      get href() {
        return 'https://addon.test/root';
      },
      set href(value) {
        navigations.push(value);
      },
    });
    document.getElementById('github-link-logo').setAttribute('href', 'https://example.com/repo');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    windows.openDefaultBrowser.mockImplementation(() => {
      throw new Error('open failed');
    });
    await loadGithubHandler();
    document.getElementById('github-link-logo').click();
    expect(navigations).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
