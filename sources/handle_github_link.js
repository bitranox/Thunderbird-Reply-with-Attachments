(() => {
  /**
   * Open a link's current href in a new tab when possible, otherwise fall back
   * to navigating the current page. No-ops for empty/placeholder hrefs.
   * @param {HTMLAnchorElement} a
   * @param {Event} e
   */
  function openHref(a, e) {
    const href = a?.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    try {
      browser.tabs.create({ url: href, active: true });
    } catch (_) {
      if (/^https?:\/\//i.test(href)) location.href = href;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    /** @type {HTMLAnchorElement|null} */ const link = document.getElementById('github-link');
    /** @type {HTMLAnchorElement|null} */ const logo = document.getElementById('github-link-logo');
    if (link) link.addEventListener('click', (e) => openHref(link, e));
    if (logo) logo.addEventListener('click', (e) => openHref(logo, e));
  });
})();
