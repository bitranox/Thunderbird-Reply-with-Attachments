/*
 * Module: handle_docs_link.js
 * Purpose: Open the documentation site in a new tab when clicked,
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
    /** @type {HTMLAnchorElement|null} */ const docs = document.getElementById('docs-link');
    if (docs) docs.addEventListener('click', (e) => openHref(docs, e));
  });
})();
