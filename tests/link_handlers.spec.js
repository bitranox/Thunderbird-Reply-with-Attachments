/*
 * Test Module: link_handlers.spec.js
 * Scope: Options/Docs links — donate and GitHub link handlers.
 * Intent: Ensure links open in new tabs or fall back gracefully.
 */
/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';
// We import the scripts so Vitest instruments them for coverage.

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

  // Test: no-op for # hrefs
  it('no-op for # hrefs', async () => {
    await import('../sources/handle_github_link.js');
    await import('../sources/handle_donate_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById('github-link').click();
    document.getElementById('donate-link').click();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });

  // Test: opens links via browser.tabs.create when href set
  it('opens links via browser.tabs.create when href set', async () => {
    document.getElementById('github-link').setAttribute('href', 'https://example.com/repo');
    document.getElementById('github-link-logo').setAttribute('href', 'https://example.com/repo');
    document.getElementById('donate-link').setAttribute('href', 'https://example.com/donate');
    await import('../sources/handle_github_link.js');
    await import('../sources/handle_donate_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.getElementById('github-link').click();
    document.getElementById('github-link-logo').click();
    document.getElementById('donate-link').click();
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/repo',
      active: true,
    });
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/donate',
      active: true,
    });
  });
});
