/*
 * Module: shared_link_opener.js
 * Purpose: Shared utility for opening our web links in the user's default
 *          browser. Used by all handle_*_link.js modules.
 * Notes: Thunderbird is a mail client, not a browser, so a documentation or
 *        GitHub page belongs in the browser the user actually browses with.
 *        windows.openDefaultBrowser hands the URL to the system default
 *        (Thunderbird 85+); it needs no extra permission.
 */
globalThis.RWA_LinkOpener = (function () {
  /**
   * Open a link's href in the user's default browser.
   * No-ops for empty, placeholder, and non-web hrefs.
   * @param {HTMLElement|null} a
   * @param {Event} e
   */
  function openHref(a, e) {
    const href = a?.getAttribute('href');
    if (!href || href === '#') return;
    // Only hand out web URLs; a file: or javascript: href must never be opened.
    if (!/^https?:\/\//i.test(href)) return;
    e.preventDefault();
    try {
      browser.windows.openDefaultBrowser(href);
    } catch (err) {
      console.warn('[RWA] could not open the link in the default browser:', href, err);
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
