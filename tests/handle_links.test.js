/* @vitest-environment jsdom */
/*
 * Test Module: handle_links.test.js
 * Scope: shared_link_opener.js + handle_atn_link.js, handle_docs_link.js,
 *        handle_donate_link.js, handle_github_link.js
 * Intent: Cover openHref branching (valid href → tabs.create, fallback → location.href,
 *         empty/placeholder href → no-op) and DOMContentLoaded wiring for all link handlers.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}

/**
 * Helper: mount a minimal DOM with the given anchor element id(s),
 * load the shared opener + handler module, and fire DOMContentLoaded.
 * @param {string[]} ids
 * @param {string} href
 * @param {string} handlerPath
 */
async function mountAndLoad(ids, href, handlerPath) {
  document.body.innerHTML = ids.map((id) => `<a id="${id}" href="${href}">Link</a>`).join('\n');
  await import('../sources/shared_link_opener.js');
  await import(handlerPath);
  document.dispatchEvent(new Event('DOMContentLoaded'));
  await tick();
}

/* ── shared_link_opener.js unit tests ───────────────────────────── */

describe('shared_link_opener — openHref and bindOnReady', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete globalThis.RWA_LinkOpener;
    globalThis.browser = {
      tabs: { create: vi.fn() },
    };
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: 'about:blank' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    delete globalThis.browser;
    delete globalThis.RWA_LinkOpener;
  });

  it('openHref opens via browser.tabs.create', async () => {
    await import('../sources/shared_link_opener.js');
    const a = document.createElement('a');
    a.setAttribute('href', 'https://example.com');
    const ev = new Event('click', { cancelable: true });
    globalThis.RWA_LinkOpener.openHref(a, ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://example.com', active: true });
  });

  it('openHref falls back to location.href when tabs.create throws', async () => {
    globalThis.browser.tabs.create = vi.fn(() => {
      throw new Error('no tabs');
    });
    await import('../sources/shared_link_opener.js');
    const a = document.createElement('a');
    a.setAttribute('href', 'https://fallback.test');
    globalThis.RWA_LinkOpener.openHref(a, new Event('click', { cancelable: true }));
    expect(window.location.href).toBe('https://fallback.test');
  });

  it('openHref no-ops for non-http href on fallback', async () => {
    globalThis.browser.tabs.create = vi.fn(() => {
      throw new Error('no tabs');
    });
    await import('../sources/shared_link_opener.js');
    const a = document.createElement('a');
    a.setAttribute('href', 'javascript:void(0)');
    globalThis.RWA_LinkOpener.openHref(a, new Event('click', { cancelable: true }));
    expect(window.location.href).toBe('about:blank');
  });

  it('openHref no-ops for empty or # href', async () => {
    await import('../sources/shared_link_opener.js');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    const ev = new Event('click', { cancelable: true });
    globalThis.RWA_LinkOpener.openHref(a, ev);
    expect(ev.defaultPrevented).toBe(false);
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });

  it('bindOnReady binds click handlers on DOMContentLoaded', async () => {
    document.body.innerHTML = '<a id="test-link" href="https://test.com">T</a>';
    await import('../sources/shared_link_opener.js');
    globalThis.RWA_LinkOpener.bindOnReady('test-link');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    const el = document.getElementById('test-link');
    const ev = new Event('click', { cancelable: true });
    el.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({ url: 'https://test.com', active: true });
  });

  it('bindOnReady skips missing elements gracefully', async () => {
    document.body.innerHTML = '';
    await import('../sources/shared_link_opener.js');
    globalThis.RWA_LinkOpener.bindOnReady('nonexistent-id');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });
});

/* ── handle_atn_link.js ─────────────────────────────────────────── */

describe('handle_atn_link — wiring via shared_link_opener', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete globalThis.RWA_LinkOpener;
    globalThis.browser = {
      tabs: { create: vi.fn() },
    };
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: 'about:blank' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    delete globalThis.browser;
    delete globalThis.RWA_LinkOpener;
  });

  it('opens href via browser.tabs.create on click', async () => {
    await mountAndLoad(
      ['atn-link'],
      'https://addons.thunderbird.net/review',
      '../sources/handle_atn_link.js'
    );
    const el = document.getElementById('atn-link');
    const ev = new Event('click', { cancelable: true });
    el.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://addons.thunderbird.net/review',
      active: true,
    });
  });

  it('no-ops when element is missing', async () => {
    document.body.innerHTML = '';
    await import('../sources/shared_link_opener.js');
    await import('../sources/handle_atn_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });
});

/* ── handle_docs_link.js ────────────────────────────────────────── */

describe('handle_docs_link — wiring via shared_link_opener', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete globalThis.RWA_LinkOpener;
    globalThis.browser = {
      tabs: { create: vi.fn() },
    };
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: 'about:blank' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    delete globalThis.browser;
    delete globalThis.RWA_LinkOpener;
  });

  it('opens href via browser.tabs.create on click', async () => {
    await mountAndLoad(['docs-link'], 'https://example.com/docs', '../sources/handle_docs_link.js');
    const el = document.getElementById('docs-link');
    const ev = new Event('click', { cancelable: true });
    el.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/docs',
      active: true,
    });
  });

  it('no-ops when element is missing', async () => {
    document.body.innerHTML = '';
    await import('../sources/shared_link_opener.js');
    await import('../sources/handle_docs_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });
});

/* ── handle_donate_link.js ──────────────────────────────────────── */

describe('handle_donate_link — wiring via shared_link_opener', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete globalThis.RWA_LinkOpener;
    globalThis.browser = {
      tabs: { create: vi.fn() },
    };
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: 'about:blank' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    delete globalThis.browser;
    delete globalThis.RWA_LinkOpener;
  });

  it('opens href via browser.tabs.create on click', async () => {
    await mountAndLoad(
      ['donate-link'],
      'https://example.com/donate',
      '../sources/handle_donate_link.js'
    );
    const el = document.getElementById('donate-link');
    const ev = new Event('click', { cancelable: true });
    el.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/donate',
      active: true,
    });
  });

  it('no-ops when donate-link element is missing', async () => {
    document.body.innerHTML = '';
    await import('../sources/shared_link_opener.js');
    await import('../sources/handle_donate_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });
});

/* ── handle_github_link.js ──────────────────────────────────────── */

describe('handle_github_link — wiring via shared_link_opener', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = '';
    delete globalThis.RWA_LinkOpener;
    globalThis.browser = {
      tabs: { create: vi.fn() },
    };
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: 'about:blank' },
      writable: true,
      configurable: true,
    });
  });
  afterEach(() => {
    delete globalThis.browser;
    delete globalThis.RWA_LinkOpener;
  });

  it('opens href on github-link click', async () => {
    await mountAndLoad(
      ['github-link', 'github-link-logo'],
      'https://github.com/user/repo',
      '../sources/handle_github_link.js'
    );
    const el = document.getElementById('github-link');
    const ev = new Event('click', { cancelable: true });
    el.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(browser.tabs.create).toHaveBeenCalledWith({
      url: 'https://github.com/user/repo',
      active: true,
    });
  });

  it('opens href on github-link-logo click', async () => {
    await mountAndLoad(
      ['github-link', 'github-link-logo'],
      'https://github.com/user/repo',
      '../sources/handle_github_link.js'
    );
    const logo = document.getElementById('github-link-logo');
    const ev = new Event('click', { cancelable: true });
    logo.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('no-ops when both elements are missing', async () => {
    document.body.innerHTML = '';
    await import('../sources/shared_link_opener.js');
    await import('../sources/handle_github_link.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await tick();
    expect(browser.tabs.create).not.toHaveBeenCalled();
  });

  it('works when only github-link exists (no logo)', async () => {
    await mountAndLoad(
      ['github-link'],
      'https://github.com/user/repo',
      '../sources/handle_github_link.js'
    );
    const ev = new Event('click', { cancelable: true });
    document.getElementById('github-link').dispatchEvent(ev);
    expect(browser.tabs.create).toHaveBeenCalled();
  });
});
