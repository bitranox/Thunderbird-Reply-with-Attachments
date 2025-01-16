(async () => {
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const initialize = async () => {
        const donateButton = document.getElementById('donate-button');
        if (donateButton) {
            const debounceDelay = 300; // Adjust this value as needed for optimal balance
            const handleClick = debounce(() => {
                // Detect and validate the user's language
                let userLanguage = navigator.language || navigator.userLanguage || 'en';
                if (!/^[a-z]{2}(-[A-Z]{2}|-[0-9]{3}|-[a-z]{4})?$/.test(userLanguage)) {
                    console.warn('Invalid language code detected:', userLanguage);
                    userLanguage = 'en';
                }

                try {
                    userLanguage = userLanguage.split('-')[0].toLowerCase();
                } catch (error) {
                    console.error('Error processing language code. Input:', {
                        rawInput: navigator.language || navigator.userLanguage,
                        validatedInput: userLanguage,
                        errorDetails: error
                    });
                    userLanguage = 'en';
                }

                // Standard-Link (English)
                let url = 'https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ';

                // If the language is German, use the German link
                if (userLanguage === 'de') {
                    url = 'https://www.paypal.com/donate/?hosted_button_id=7KJN33DHTA8WE';
                }

                browser.tabs.create({
                    url,
                    active: true
                });
            }, debounceDelay);

            donateButton.addEventListener('click', handleClick);
        }
    };

    await initialize();
})();
