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
  const tabs = { create: vi.fn() };
  globalThis.browser = { tabs };
  return tabs;
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
    const tabs = primeBrowser();
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(tabs.create.mock.calls).toEqual([]);
  });

  test('opens donate link in a new tab when href is https', async () => {
    const tabs = primeBrowser();
    document.getElementById('donate-link').setAttribute('href', 'https://example.com/donate');
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(tabs.create.mock.calls).toEqual([[{ url: 'https://example.com/donate', active: true }]]);
  });

  test('navigates to donate link when tabs.create throws', async () => {
    const tabs = primeBrowser();
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
    tabs.create.mockImplementation(() => {
      throw new Error('create failed');
    });
    await loadDonateHandler();
    document.getElementById('donate-link').click();
    expect(navigations).toEqual(['https://example.com/donate']);
  });
});

describe('docs link handler', () => {
  test('opens docs link in a new tab when href is available', async () => {
    const tabs = primeBrowser();
    document.getElementById('docs-link').setAttribute('href', 'https://example.com/docs');
    await loadDocsHandler();
    document.getElementById('docs-link').click();
    expect(tabs.create.mock.calls).toEqual([[{ url: 'https://example.com/docs', active: true }]]);
  });

  test('falls back to location assignment when tabs.create fails for docs', async () => {
    const tabs = primeBrowser();
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
    tabs.create.mockImplementation(() => {
      throw new Error('create failed');
    });
    await loadDocsHandler();
    document.getElementById('docs-link').click();
    expect(navigations).toEqual(['https://example.com/docs']);
  });
});

describe('ATN link handler', () => {
  test('opens ATN link in a new tab when href is set', async () => {
    const tabs = primeBrowser();
    document.getElementById('atn-link').setAttribute('href', 'https://addons.thunderbird.net/rwa');
    await loadAtnHandler();
    document.getElementById('atn-link').click();
    expect(tabs.create.mock.calls).toEqual([
      [{ url: 'https://addons.thunderbird.net/rwa', active: true }],
    ]);
  });
});

describe('GitHub link handler', () => {
  test('ignores GitHub link click when href is placeholder', async () => {
    const tabs = primeBrowser();
    await loadGithubHandler();
    document.getElementById('github-link').click();
    expect(tabs.create.mock.calls).toEqual([]);
  });

  test('opens GitHub text link in a new tab when href is set', async () => {
    const tabs = primeBrowser();
    document.getElementById('github-link').setAttribute('href', 'https://example.com/repo');
    await loadGithubHandler();
    document.getElementById('github-link').click();
    expect(tabs.create.mock.calls).toEqual([[{ url: 'https://example.com/repo', active: true }]]);
  });

  test('opens GitHub logo link in a new tab when href is set', async () => {
    const tabs = primeBrowser();
    document.getElementById('github-link-logo').setAttribute('href', 'https://example.com/repo');
    await loadGithubHandler();
    document.getElementById('github-link-logo').click();
    expect(tabs.create.mock.calls).toEqual([[{ url: 'https://example.com/repo', active: true }]]);
  });

  test('navigates to GitHub when tabs.create throws for logo link', async () => {
    const tabs = primeBrowser();
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
    tabs.create.mockImplementation(() => {
      throw new Error('create failed');
    });
    await loadGithubHandler();
    document.getElementById('github-link-logo').click();
    expect(navigations).toEqual(['https://example.com/repo']);
  });
});
