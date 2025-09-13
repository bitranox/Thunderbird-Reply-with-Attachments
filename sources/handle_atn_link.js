/*
 * Module: handle_atn_link.js
 * Purpose: Open the ATN review page in a new tab when clicked,
 *          with a safe fallback to same‑page navigation.
 */
(() => {
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
    /** @type {HTMLAnchorElement|null} */ const atn = document.getElementById('atn-link');
    if (atn) atn.addEventListener('click', (e) => openHref(atn, e));
  });
})();
