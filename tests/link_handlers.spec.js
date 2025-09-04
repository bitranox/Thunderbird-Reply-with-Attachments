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

describe('Link handlers — donate/github', () => {
  let browser;

  beforeEach(() => {
    document.body.innerHTML = `
      <a id="donate-link" href="#"><button>Donate</button></a>
      <a id="github-link" href="#">GitHub</a>
      <a id="github-link-logo" href="#">Logo</a>`;
    browser = { tabs: { create: vi.fn() } };
    globalThis.browser = browser;
  });

  it('no-op for # hrefs', () => {
    loadScript(path.join(process.cwd(), 'sources', 'handle_github_link.js'));
    loadScript(path.join(process.cwd(), 'sources', 'handle_donate_link.js'));
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById('github-link').click();
    document.getElementById('donate-link').click();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });

  it('opens links via browser.tabs.create when href set', () => {
    document.getElementById('github-link').setAttribute('href', 'https://example.com/repo');
    document.getElementById('github-link-logo').setAttribute('href', 'https://example.com/repo');
    document.getElementById('donate-link').setAttribute('href', 'https://example.com/donate');
    loadScript(path.join(process.cwd(), 'sources', 'handle_github_link.js'));
    loadScript(path.join(process.cwd(), 'sources', 'handle_donate_link.js'));
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById('github-link').click();
    document.getElementById('github-link-logo').click();
    document.getElementById('donate-link').click();
    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://example.com/repo', active: true });
    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://example.com/donate', active: true });
  });
});

