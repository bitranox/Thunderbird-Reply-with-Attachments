/* @vitest-environment jsdom */
/*
 * Test Module: ui_i18n.spec.js
 * Scope: UI i18n helper — explicit, single-behavior checks.
 */
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const messages = {
  uiHeader: 'Reply with Attachments',
  uiNoOptions: 'There are currently no options to configure.',
  uiSupport: 'Do you like this add-on? Support me with a small contribution:',
  uiDonate: 'Donate now',
  uiGithubText: 'For bug reports or other inquiries, please visit my',
  donateUrl: 'https://example.com/donate',
  githubUrl: 'https://example.com/github',
};

function mountUiFragment() {
  document.body.innerHTML = `
    <div>
      <h1 id="header-title" data-i18n="uiHeader"></h1>
      <p id="options-text" data-i18n="uiNoOptions"></p>
      <p id="support-text" data-i18n="uiSupport"></p>
      <a id="donate-link" data-i18n-attr="href:donateUrl"><button data-i18n="uiDonate"></button></a>
      <p><span id="github-label" data-i18n="uiGithubText"></span>
         <a id="github-link" data-i18n-attr="href:githubUrl">GitHub</a></p>
    </div>`;
}

beforeEach(() => {
  vi.resetModules();
  mountUiFragment();
  globalThis.browser = {
    i18n: {
      getMessage: vi.fn((key) => messages[key] || ''),
      getUILanguage: vi.fn(() => 'en-US'),
    },
  };
});

afterEach(() => {
  delete globalThis.browser;
  delete globalThis.messenger;
  document.body.innerHTML = '';
  document.documentElement.removeAttribute('dir');
  document.documentElement.classList.remove('js');
  vi.restoreAllMocks();
  Object.defineProperty(document, 'readyState', {
    configurable: true,
    get: () => 'complete',
  });
});

async function loadI18nAndTick() {
  await import('../sources/ui_i18n.js');
  document.dispatchEvent(new Event('DOMContentLoaded'));
}

describe('document decorations', () => {
  test('adds js class to document element immediately', async () => {
    await loadI18nAndTick();
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });

  test('sets rtl direction when primary language is arabic', async () => {
    globalThis.browser.i18n.getUILanguage.mockReturnValue('ar-SA');
    await loadI18nAndTick();
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });
});

describe('text content application', () => {
  test('fills header text via data-i18n attribute', async () => {
    await loadI18nAndTick();
    expect(document.getElementById('header-title').textContent).toBe(messages.uiHeader);
  });

  test('uses messenger fallback when browser i18n is unavailable', async () => {
    delete globalThis.browser;
    globalThis.messenger = {
      i18n: {
        getMessage: vi.fn((key) => messages[key] || ''),
        getUILanguage: vi.fn(() => 'en-US'),
      },
    };
    await loadI18nAndTick();
    expect(document.getElementById('options-text').textContent).toBe(messages.uiNoOptions);
  });

  test('leaves text blank when no i18n provider is present', async () => {
    delete globalThis.browser;
    await loadI18nAndTick();
    expect(document.getElementById('support-text').textContent).toBe('');
  });
});

describe('attribute application', () => {
  test('sets donate href from data-i18n-attr mapping', async () => {
    await loadI18nAndTick();
    expect(document.getElementById('donate-link').getAttribute('href')).toBe(messages.donateUrl);
  });

  test('skips attribute when i18n returns empty text', async () => {
    globalThis.browser.i18n.getMessage.mockImplementation((key) =>
      key === 'donateUrl' ? '' : messages[key] || ''
    );
    await loadI18nAndTick();
    expect(document.getElementById('donate-link').hasAttribute('href')).toBe(false);
  });
});

describe('deferred initialization', () => {
  test('waits for DOMContentLoaded when document is still loading', async () => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading',
    });
    const addSpy = vi.spyOn(document, 'addEventListener');
    await import('../sources/ui_i18n.js');
    expect(addSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });
});
