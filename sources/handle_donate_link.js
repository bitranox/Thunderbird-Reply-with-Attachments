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

  // Open donate link in a new tab using the href set via i18n.
  document.addEventListener('DOMContentLoaded', () => {
    const donateAnchor = /** @type {HTMLAnchorElement|null} */ (document.getElementById('donate-link'));
    if (!donateAnchor) return;
    donateAnchor.addEventListener('click', (e) => openHref(donateAnchor, e));
  });
})();
