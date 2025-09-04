(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const githubLinks = [
      document.getElementById('github-link'),
      document.getElementById('github-link-logo')
    ];

    // Open the URL already present in the element's href (set via i18n)
    githubLinks.forEach(link => {
      if (link) {
        link.addEventListener('click', (event) => {
          const href = link.getAttribute('href');
          if (!href || href === '#') return;
          event.preventDefault();
          try {
            browser.tabs.create({ url: href, active: true });
          } catch (_) {
            if (/^https?:\/\//i.test(href)) {
              location.href = href;
            }
          }
        });
      }
    });
  });
})();
