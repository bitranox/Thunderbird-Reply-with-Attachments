/*
 * Module: app/adapters/thunderbird.js
 * Purpose: Thin adapter that wraps Thunderbird browser.* APIs to match
 *          the small port interfaces expected by the application layer.
 * Design: Keep each group (compose/messages/sessions/tabs/scriptingCompose)
 *         focused and resilient (graceful optional chaining where needed).
 */

/**
 * Create adapter ports backed by Thunderbird’s MailExtension APIs.
 * @param {any} browser
 * @returns {{ compose: import('../application/ports.js').ComposePort,
 *            messages: import('../application/ports.js').MessagesPort,
 *            sessions: import('../application/ports.js').SessionsPort,
 *            tabs: import('../application/ports.js').TabsPort,
 *            scriptingCompose: import('../application/ports.js').ScriptingComposePort }}
 */
function makeThunderbirdPorts(browser) {
  const compose = {
    // Read compose details, list existing attachments, and add one.
    async getDetails(tabId) {
      return browser.compose.getComposeDetails(tabId);
    },
    async listAttachments(tabId) {
      return (await browser.compose.listAttachments?.(tabId)) || [];
    },
    async addAttachment(tabId, attachment) {
      return browser.compose.addAttachment(tabId, attachment);
    },
    onBeforeSend: browser.compose?.onBeforeSend,
    onStateChanged: browser.compose?.onComposeStateChanged,
  };

  const messages = {
    // Read available attachments and fetch a concrete file for a message part.
    async listAttachments(messageId) {
      return browser.messages.listAttachments(messageId);
    },
    async getAttachmentFile(messageId, partName) {
      return browser.messages.getAttachmentFile(messageId, partName);
    },
  };

  // Minimal sessions wrapper with graceful fallbacks
  const sessions = {
    // Persist a small per‑tab flag to avoid duplicate processing across events.
    async getTabValue(tabId, key) {
      return await browser.sessions?.getTabValue?.(tabId, key);
    },
    async setTabValue(tabId, key, value) {
      return await browser.sessions?.setTabValue?.(tabId, key, value);
    },
    async removeTabValue(tabId, key) {
      return await browser.sessions?.removeTabValue?.(tabId, key);
    },
  };

  const tabs = {
    // Minimal surface: event and targeted messaging.
    onRemoved: browser.tabs?.onRemoved,
    async sendMessage(tabId, payload) {
      return browser.tabs?.sendMessage?.(tabId, payload);
    },
  };

  const scriptingCompose = {
    // MV3 compose‑document script management and targeted execution.
    async registerScripts(scripts) {
      return browser.scripting?.compose?.registerScripts?.(scripts);
    },
    async getRegisteredScripts() {
      return browser.scripting?.compose?.getRegisteredScripts?.();
    },
    async unregisterScripts(ids) {
      return browser.scripting?.compose?.unregisterScripts?.(ids);
    },
    async executeScript(tabId, files) {
      try {
        if (browser.scripting?.compose?.executeScript) {
          return await browser.scripting.compose.executeScript({ tabId, files });
        }
      } catch (_) {}
    },
  };

  return { compose, messages, sessions, tabs, scriptingCompose };
}

globalThis.App = globalThis.App || {};
App.Adapters = { makeThunderbirdPorts };

// No ESM export — keep script compatibility for tests.
