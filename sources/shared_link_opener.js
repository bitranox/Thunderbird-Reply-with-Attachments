/*
 * Module: shared_link_opener.js
 * Purpose: Shared utility for opening links in a new Thunderbird tab,
 *          with a safe fallback to same-page navigation.
 *          Used by all handle_*_link.js modules.
 */
globalThis.RWA_LinkOpener = (function () {
  /**
   * Open a link's href in a new tab when possible, otherwise fall back
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

  /**
   * Bind click handlers to one or more element IDs on DOMContentLoaded.
   * @param  {...string} ids Element IDs to bind
   */
  function bindOnReady(...ids) {
    document.addEventListener('DOMContentLoaded', () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', (e) => openHref(el, e));
      }
    });
  }

  return { openHref, bindOnReady };
})();
