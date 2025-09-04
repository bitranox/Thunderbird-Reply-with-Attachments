/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

function loadScript(filepath, context = {}) {
  const code = fs.readFileSync(filepath, 'utf8');
  // eslint-disable-next-line no-new-func
  const fn = new Function(...Object.keys(context), code);
  fn(...Object.values(context));
}

describe('ui_i18n + handlers integration', () => {
  let browser;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <h1 id="header-title" data-i18n="uiHeader"></h1>
        <p id="options-text" data-i18n="uiNoOptions"></p>
        <p id="support-text" data-i18n="uiSupport"></p>
        <a id="donate-link" data-i18n-attr="href:donateUrl"><button data-i18n="uiDonate"></button></a>
        <p id="github-text"><span data-i18n="uiGithubText"></span> <a id="github-link" data-i18n-attr="href:githubUrl">GitHub</a></p>
        <a id="github-link-logo" data-i18n-attr="href:githubUrl">logo</a>
      </div>`;

    browser = {
      i18n: {
        getMessage: vi.fn((key) => ({
          uiHeader: 'Reply with Attachments',
          uiNoOptions: 'There are currently no options to configure.',
          uiSupport: 'Do you like this add-on? Support me with a small contribution:',
          uiDonate: 'Donate now',
          uiGithubText: 'For bug reports or other inquiries, please visit my',
          donateUrl: 'https://example.com/donate',
          githubUrl: 'https://example.com/github',
        })[key] || ''),
      },
      tabs: { create: vi.fn() },
    };
    // expose to scripts
    globalThis.browser = browser;
  });

  it('applies text and href via data-i18n / data-i18n-attr and handlers open links', () => {
    // load ui_i18n and link handlers
    loadScript(path.join(process.cwd(), 'sources', 'ui_i18n.js'));
    // Ensure DOMContentLoaded path is exercised
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Texts populated
    expect(document.querySelector('#header-title').textContent).toBe('Reply with Attachments');
    expect(document.querySelector('#options-text').textContent).toContain('no options');
    expect(document.querySelector('#support-text').textContent).toContain('Support me');
    expect(document.querySelector('#donate-link button').textContent).toBe('Donate now');

    // Attributes populated
    expect(document.getElementById('donate-link').getAttribute('href')).toBe('https://example.com/donate');
    expect(document.getElementById('github-link').getAttribute('href')).toBe('https://example.com/github');
    expect(document.getElementById('github-link-logo').getAttribute('href')).toBe('https://example.com/github');

    // Load click handlers and simulate clicks
    loadScript(path.join(process.cwd(), 'sources', 'handle_github_link.js'));
    loadScript(path.join(process.cwd(), 'sources', 'handle_donate_link.js'));
    document.dispatchEvent(new Event('DOMContentLoaded'));

    document.getElementById('github-link').click();
    document.getElementById('donate-link').click();

    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://example.com/github', active: true });
    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://example.com/donate', active: true });
  });
});

