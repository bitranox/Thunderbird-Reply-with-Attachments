(() => {
  // Open donate link in a new tab using the href set via i18n.
  document.addEventListener('DOMContentLoaded', () => {
    const donateAnchor = document.getElementById('donate-link');
    if (!donateAnchor) return;
    donateAnchor.addEventListener('click', (e) => {
      const href = donateAnchor.getAttribute('href');
      if (!href || href === '#') return; // let default if empty
      e.preventDefault();
      try {
        browser.tabs.create({ url: href, active: true });
      } catch (_) {
        if (/^https?:\/\//i.test(href)) {
          location.href = href;
        }
      }
    });
  });
})();
