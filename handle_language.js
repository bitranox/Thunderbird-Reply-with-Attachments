(async () => {
    const validateLanguageCode = (language) => {
        const languageRegex = /^[a-z]{2}(-[A-Z]{2}|-[0-9]{3}|-[a-z]{4})?$/;
        if (!languageRegex.test(language)) {
            console.warn('Invalid language code detected:', language);
            return 'en';
        }
        return language;
    };

    const getRequiredElement = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Missing required DOM element: ${id}`);
        }
        return element;
    };

    const initialize = async () => {
        const headerTitle = getRequiredElement('header-title');
        const optionsText = getRequiredElement('options-text');
        const supportText = getRequiredElement('support-text');
        const donateButton = getRequiredElement('donate-button');
        const githubText = getRequiredElement('github-text');

        const missingElements = [
            !headerTitle && 'header-title',
            !optionsText && 'options-text',
            !supportText && 'support-text',
            !donateButton && 'donate-button'
        ].filter(Boolean);

        if (missingElements.length > 0) {
            console.error('Initialization halted due to missing required elements:', missingElements);
            return;
        }

        // Detect and validate the user's language
        let userLanguage = navigator.language || navigator.userLanguage || 'en';
        try {
            userLanguage = validateLanguageCode(userLanguage).split('-')[0].toLowerCase();
        } catch (error) {
            console.error('Unexpected error during language normalization:', {
                rawLanguage: userLanguage,
                errorDetails: error
            });
            userLanguage = 'en';
        }

        const isGerman = userLanguage === 'de';

        if (isGerman) {
            headerTitle.innerText = 'Reply with Attachments';
            optionsText.innerText = 'Derzeit gibt es keine zu konfigurierenden Optionen.';
            supportText.innerText = 'Gefällt Ihnen dieses Add-on? Unterstützen Sie mich mit einem kleinen Beitrag:';
            donateButton.innerText = 'Jetzt spenden';

            if (githubText) {
                githubText.textContent = 'Für Fehlerberichte oder andere Anfragen besuchen Sie bitte meine ';
                const githubLink = document.createElement('a');
                githubLink.href = '#'; // Update with the actual GitHub URL
                githubLink.id = 'github-link';
                githubLink.textContent = 'GitHub-Seite';
                githubText.appendChild(githubLink);
            }
        } else {
            // Fallback to English
            headerTitle.innerText = 'Reply with Attachments';
            optionsText.innerText = 'There are currently no options to configure.';
            supportText.innerText = 'Do you like this add-on? Support me with a small contribution:';
            donateButton.innerText = 'Donate now';

            if (githubText) {
                githubText.textContent = 'For bug reports or other inquiries, please visit my ';
                const githubLink = document.createElement('a');
                githubLink.href = '#'; // Update with the actual GitHub URL
                githubLink.id = 'github-link';
                githubLink.textContent = 'GitHub page';
                githubText.appendChild(githubLink);
            }
        }
    };

    await initialize();
})();
