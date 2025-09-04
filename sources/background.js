// background.js

// Use sessions API to mark a compose tab as processed.
const SESSION_KEY = 'rwatt_processed';

// Initialize the background script
(async () => {
    console.log("Background script initialized for Reply with Attachments.");

    // Register the onComposeStateChanged listener
    browser.compose.onComposeStateChanged.addListener(handleComposeStateChanged);
    console.log("onComposeStateChanged listener registered successfully.");

    // Release per-tab state when a tab is closed
    browser.tabs?.onRemoved?.addListener?.((closedTabId) => {
        const id = typeof closedTabId === 'number' ? closedTabId : (closedTabId && closedTabId.id);
        if (typeof id === 'number') {
            try { browser.sessions?.removeTabValue?.(id, SESSION_KEY); } catch (_) {}
            console.log(`Released processed state for closed tab ${id}.`);
        }
    });
})();

/**
 * Handles the compose state change event.
 * Triggered when a compose window is opened (e.g., new, reply, forward).
 */
async function handleComposeStateChanged(tabId, details) {
    console.log("onComposeStateChanged triggered.");
    console.log("Compose state details:", details);

    const numericTabId = extractNumericTabId(tabId);
    if (numericTabId === null) {
        console.error("Invalid or missing tabId:", tabId);
        return;
    }

    try {
        const composeDetails = await browser.compose.getComposeDetails(numericTabId);
        console.log("Compose details retrieved:", composeDetails);

        // Check if this tabId has already been processed (persistently across background sleeps)
        const already = await browser.sessions?.getTabValue?.(numericTabId, SESSION_KEY);
        if (already) {
            console.log(`Tab ID ${numericTabId} already processed (sessions). Skipping duplicate processing.`);
            return;
        }
        try { await browser.sessions?.setTabValue?.(numericTabId, SESSION_KEY, true); } catch (_) {}

        if (composeDetails.type === "reply") {
            console.log("Reply detected. Processing attachments...");

            const messageId = composeDetails.referenceMessageId || composeDetails.relatedMessageId;
            if (!messageId) {
                console.error(
                    "No referenceMessageId or relatedMessageId found in ComposeDetails. Cannot process attachments."
                );
                console.debug("Full ComposeDetails object:", composeDetails);
                return;
            }

            console.log(`Using messageId: ${messageId} for attachment processing.`);
            await processReplyAttachments(numericTabId, messageId);
        } else {
            console.log("Compose type is not a reply. Skipping attachment handling.");
        }
    } catch (error) {
        console.error("Error in handleComposeStateChanged:", error);
    }
}

/**
 * Extracts numeric tabId from the provided tab object or directly if numeric.
 * @param {Object|Number} tabId - The tabId or tab object.
 * @returns {Number|null} - The numeric tabId or null if invalid.
 */
function extractNumericTabId(tabId) {
    if (typeof tabId === "number") {
        return tabId;
    }

    if (typeof tabId === "object" && typeof tabId.id === "number") {
        return tabId.id;
    }

    return null;
}

/**
 * Processes attachments for reply emails by fetching and attaching files.
 * @param {Number} tabId - ID of the compose tab.
 * @param {Number} messageId - ID of the original message.
 */
async function processReplyAttachments(tabId, messageId) {
    try {
        // Retrieve the list of attachments from the original message
        const attachments = await browser.messages.listAttachments(messageId);
        if (attachments.length === 0) {
            console.log("No attachments found in the original message.");
            return;
        }

        // Track added partNames locally to avoid duplicates within one processing run
        const addedPartNames = new Set();

        for (const attachment of attachments) {
            // Normalize commonly used fields
            const nameLower = String(attachment.name || attachment.fileName || '').toLowerCase();
            const typeLower = String(attachment.contentType || '').toLowerCase();
            const dispLower = String(attachment.contentDisposition || '').toLowerCase();

            // Exclude SMIME/PKCS7 artifacts (case-insensitive, broader set)
            if (
                nameLower === 'smime.p7s' ||
                typeLower === 'application/pkcs7-signature' ||
                typeLower === 'application/x-pkcs7-signature' ||
                typeLower === 'application/pkcs7-mime'
            ) {
                console.log(`Skipping SMIME certificate: ${attachment.name} (Content-Type: ${attachment.contentType})`);
                continue;
            }

            // Skip inline/related parts (avoid copying inline images)
            if (attachment.contentId) {
                console.log(`Skipping inline/related part: ${attachment.name} (contentId present)`);
                continue;
            }

            // Optionally require explicit attachment disposition when available
            if (dispLower && dispLower !== 'attachment') {
                console.log(`Skipping non-attachment disposition: ${attachment.name} (contentDisposition=${attachment.contentDisposition})`);
                continue;
            }

            // Avoid adding duplicate attachments within this processing run
            if (addedPartNames.has(attachment.partName)) {
                console.log(`Skipping duplicate attachment: ${attachment.name}`);
                continue;
            }

            console.log(`Attempting to add attachment: ${attachment.name}`);
            await addAttachmentToCompose(tabId, messageId, attachment);
            addedPartNames.add(attachment.partName);
        }

        console.log("All attachments added successfully.");
    } catch (error) {
        console.error("Error in processReplyAttachments:", error);
    }
}


/**
 * Extracts attachments from the given message.
 * @param {Object} message - The full message object.
 * @returns {Array} - List of attachments.
 */
// Note: attachment discovery relies on browser.messages.listAttachments per MV3 guidance.

/**
 * Adds a specific attachment to the compose window.
 * @param {Number} tabId - ID of the compose tab.
 * @param {Number} messageId - ID of the original message.
 * @param {Object} attachment - The attachment object to add.
 */
async function addAttachmentToCompose(tabId, messageId, attachment) {
    try {
        const attachmentFile = await browser.messages.getAttachmentFile(messageId, attachment.partName);
        if (!attachmentFile) {
            throw new Error("Failed to retrieve attachment file.");
        }

        await browser.compose.addAttachment(tabId, {
            file: attachmentFile,
        });

        console.log(`Attachment added: ${attachment.name || attachment.fileName}`);
    } catch (error) {
        console.error(`Failed to add attachment ${attachment.name || attachment.fileName}:`, error);
    }
}

