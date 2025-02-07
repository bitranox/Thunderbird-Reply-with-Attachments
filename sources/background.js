// background.js

// Initialize the background script
(async () => {
    console.log("Background script initialized for Reply with Attachments.");

    // Register the onComposeStateChanged listener
    browser.compose.onComposeStateChanged.addListener(handleComposeStateChanged);
    console.log("onComposeStateChanged listener registered successfully.");
})();

// Global object to track processed tabs and added attachments
const processedTabs = new Map();

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

        // Check if this tabId has already been processed
        if (processedTabs.has(numericTabId)) {
            console.log(`Tab ID ${numericTabId} already processed. Skipping duplicate processing.`);
            return;
        }

        // Mark tabId as processed
        processedTabs.set(numericTabId, new Set());

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

        // Retrieve the set of already added attachments for this tab
        const addedAttachmentsForTab = processedTabs.get(tabId);

        for (const attachment of attachments) {
            // Exclude SMIME certificates based on MIME type or file name
            if (
                attachment.contentType === "application/pkcs7-signature" ||
                attachment.contentType === "application/x-pkcs7-signature" ||
                attachment.name === "smime.p7s"
            ) {
                console.log(
                    `Skipping SMIME certificate: ${attachment.name} (Content-Type: ${attachment.contentType})`
                );
                continue;
            }

            // Avoid adding duplicate attachments within the same tab
            if (addedAttachmentsForTab.has(attachment.partName)) {
                console.log(`Skipping duplicate attachment: ${attachment.name}`);
                continue;
            }

            console.log(`Attempting to add attachment: ${attachment.name}`);
            await addAttachmentToCompose(tabId, messageId, attachment);
            addedAttachmentsForTab.add(attachment.partName);
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
function getAttachmentsFromMessage(message) {
    const attachments = [];

    function traverseParts(parts) {
        for (const part of parts) {
            if (part.parts) {
                traverseParts(part.parts);
            } else if (part.name || part.fileName) {
                attachments.push(part);
            }
        }
    }

    if (message.parts) {
        traverseParts(message.parts);
    }

    console.log(`Extracted ${attachments.length} attachments from the message.`);
    return attachments;
}

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

