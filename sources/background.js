// background.js

// Track processed tabs in-memory for this event page lifecycle (processing|done),
// and also via sessions API to survive background sleeps.
const SESSION_KEY = 'rwatt_processed';
const processedTabsState = new Map(); // tabId -> 'processing' | 'done'

// Initialize the background script
(async () => {
    console.log("Background script initialized for Reply with Attachments.");

    // Register the onComposeStateChanged listener
    browser.compose.onComposeStateChanged.addListener(handleComposeStateChanged);
    console.log("onComposeStateChanged listener registered successfully.");

    // Last‑chance hook before sending: ensure reply attachments are present
    browser.compose.onBeforeSend?.addListener?.(async (tab, sendDetails) => {
        try {
            const tabId = extractNumericTabId(tab);
            if (tabId == null) return {};
            const composeDetails = await browser.compose.getComposeDetails(tabId);
            if (composeDetails?.type !== 'reply') return {};

            // If already marked processed, skip
            const state = processedTabsState.get(tabId);
            if (state === 'processing' || state === 'done') return {};
            processedTabsState.set(tabId, 'processing');
            let already = false; try { already = await browser.sessions?.getTabValue?.(tabId, SESSION_KEY); } catch (_) { already = false; }
            if (already) return {};

            const messageId = await resolveMessageId(tabId, composeDetails);
            if (!messageId) return {};

            // If the compose already has attachments, assume user (or we) handled it
            const existing = await browser.compose.listAttachments?.(tabId).catch(() => []);
            if (Array.isArray(existing) && existing.length > 0) return {};

            const added = await processReplyAttachments(tabId, messageId);
            if (added > 0) {
                processedTabsState.set(tabId, 'done');
                try { await browser.sessions?.setTabValue?.(tabId, SESSION_KEY, true); } catch (_) {}
            } else {
                processedTabsState.delete(tabId);
            }
        } catch (err) {
            console.error('onBeforeSend ensure attachments failed:', err);
        }
        return {};
    });

    // Release per-tab state when a tab is closed
    browser.tabs?.onRemoved?.addListener?.((closedTabId) => {
        const id = typeof closedTabId === 'number' ? closedTabId : (closedTabId && closedTabId.id);
        if (typeof id === 'number') {
            try {
                const p = browser.sessions?.removeTabValue?.(id, SESSION_KEY);
                if (p && typeof p.then === 'function') p.catch(() => {});
            } catch (_) {}
            console.log(`Released processed state for closed tab ${id}.`);
            processedTabsState.delete(id);
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
        let memState = processedTabsState.get(numericTabId);
        if (memState === 'processing' || memState === 'done') {
            console.log(`Tab ID ${numericTabId} already processed (memory). Skipping duplicate processing.`);
            return;
        }
        // Reserve processing slot immediately to avoid races with parallel events
        processedTabsState.set(numericTabId, 'processing');
        let already = false;
        try { already = await browser.sessions?.getTabValue?.(numericTabId, SESSION_KEY); } catch (_) { already = false; }
        if (already) {
            console.log(`Tab ID ${numericTabId} already processed (sessions). Skipping duplicate processing.`);
            processedTabsState.set(numericTabId, 'done');
            return;
        }

        if (composeDetails.type === "reply") {
            console.log("Reply detected. Processing attachments...");
            const messageId = await resolveMessageId(numericTabId, composeDetails);
            if (!messageId) { console.warn('Unable to resolve original messageId (retry or onBeforeSend will handle).'); return; }
            console.log(`Using messageId: ${messageId} for attachment processing.`);
            const added = await processReplyAttachments(numericTabId, messageId);
            if (added > 0) {
                processedTabsState.set(numericTabId, 'done');
                try { await browser.sessions?.setTabValue?.(numericTabId, SESSION_KEY, true); } catch (_) {}
            } else {
                // Do not mark as processed if nothing was added; allow subsequent events to retry.
                console.log('No attachments added; leaving tab eligible for retry.');
                processedTabsState.delete(numericTabId);
            }
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
            return 0;
        }

        // Track added partNames locally to avoid duplicates within one processing run
        const addedPartNames = new Set();
        let addedCount = 0;

        const isSmime = (att) => {
            const nameLower = String(att.name || att.fileName || '').toLowerCase();
            const typeLower = String(att.contentType || '').toLowerCase();
            return (
                nameLower === 'smime.p7s' ||
                typeLower === 'application/pkcs7-signature' ||
                typeLower === 'application/x-pkcs7-signature' ||
                typeLower === 'application/pkcs7-mime'
            );
        };

        const preferAdd = async (att) => {
            if (addedPartNames.has(att.partName)) return false;
            try {
                console.log(`Attempting to add attachment: ${att.name}`);
                await addAttachmentToCompose(tabId, messageId, att);
                addedPartNames.add(att.partName);
                return true;
            } catch (e) {
                console.error(`Failed to add ${att.name}:`, e);
                return false;
            }
        };

        for (const attachment of attachments) {
            // Normalize commonly used fields
            const nameLower = String(attachment.name || attachment.fileName || '').toLowerCase();
            const typeLower = String(attachment.contentType || '').toLowerCase();
            const dispLower = String(attachment.contentDisposition || '').toLowerCase();

            // Exclude SMIME/PKCS7 artifacts (case-insensitive, broader set)
            if (
                isSmime(attachment)
            ) {
                console.log(`Skipping SMIME certificate: ${attachment.name} (Content-Type: ${attachment.contentType})`);
                continue;
            }

            // Skip inline images only; allow PDFs/XLSX even if a contentId exists
            if (attachment.contentId) {
                const type = String(attachment.contentType || '').toLowerCase();
                if (type.startsWith('image/')) {
                    console.log(`Skipping inline image: ${attachment.name} (contentId present)`);
                    continue;
                }
            }

            // If a contentDisposition is present, allow typical variants like
            // "attachment; filename=...". Skip when it explicitly starts with inline.
            if (dispLower) {
                if (dispLower.startsWith('inline')) {
                    console.log(`Skipping inline disposition: ${attachment.name} (contentDisposition=${attachment.contentDisposition})`);
                    continue;
                }
                if (!dispLower.startsWith('attachment')) {
                    console.log(`Skipping non-attachment disposition: ${attachment.name} (contentDisposition=${attachment.contentDisposition})`);
                    continue;
                }
            }

            // Avoid adding duplicate attachments within this processing run
            if (addedPartNames.has(attachment.partName)) {
                console.log(`Skipping duplicate attachment: ${attachment.name}`);
                continue;
            }

            if (await preferAdd(attachment)) addedCount += 1;
        }

        if (addedCount === 0) {
            // Fallback: relax inline/contentId rules but still exclude SMIME
            console.log('No attachments added on first pass; attempting relaxed fallback…');
            for (const att of attachments) {
                if (isSmime(att)) continue;
                if (await preferAdd(att)) addedCount += 1;
            }
        }

        if (addedCount > 0) {
            console.log("All attachments added successfully.");
        } else {
            console.warn('No eligible attachments to add after fallback.');
        }
        return addedCount;
    } catch (error) {
        console.error("Error in processReplyAttachments:", error);
        return 0;
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

// Retry helper to obtain the original messageId for a reply compose.
async function resolveMessageId(tabId, initialDetails, { attempts = 10, delayMs = 200 } = {}) {
    let composeDetails = initialDetails;
    for (let i = 0; i < attempts; i++) {
        const id = composeDetails?.referenceMessageId || composeDetails?.relatedMessageId;
        if (id) return id;
        await new Promise(r => setTimeout(r, delayMs));
        try { composeDetails = await browser.compose.getComposeDetails(tabId); } catch (_) {}
    }
    return null;
}

