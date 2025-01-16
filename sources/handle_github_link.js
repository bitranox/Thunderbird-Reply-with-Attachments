(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const githubLinks = [
            document.getElementById('github-link'),
            document.getElementById('github-link-logo')
        ];

        // Detect user language
        const userLanguage = navigator.language || navigator.userLanguage;
        const isGerman = userLanguage.startsWith('de');

        const githubUrl = isGerman
            ? 'https://github.com/bitranox/Thunderbird-Reply-with-Attachment/blob/main/README_DE.md'
            : 'https://github.com/bitranox/Thunderbird-Reply-with-Attachment';

        // Add event listeners to the links
        githubLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    browser.tabs.create({
                        url: githubUrl,
                        active: true
                    });
                });
            }
        });
    });
})();
