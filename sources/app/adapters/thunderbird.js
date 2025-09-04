// Adapters: Thunderbird ports wrapping browser.* APIs (thin)

function makeThunderbirdPorts(browser) {
  const compose = {
    async getDetails(tabId) { return browser.compose.getComposeDetails(tabId); },
    async listAttachments(tabId) { return (await browser.compose.listAttachments?.(tabId)) || []; },
    async addAttachment(tabId, attachment) { return browser.compose.addAttachment(tabId, attachment); },
    onBeforeSend: browser.compose?.onBeforeSend,
    onStateChanged: browser.compose?.onComposeStateChanged,
  };

  const messages = {
    async listAttachments(messageId) { return browser.messages.listAttachments(messageId); },
    async getAttachmentFile(messageId, partName) { return browser.messages.getAttachmentFile(messageId, partName); },
  };

  // Minimal sessions wrapper with graceful fallbacks
  const sessions = {
    async getTabValue(tabId, key) { return await browser.sessions?.getTabValue?.(tabId, key); },
    async setTabValue(tabId, key, value) { return await browser.sessions?.setTabValue?.(tabId, key, value); },
    async removeTabValue(tabId, key) { return await browser.sessions?.removeTabValue?.(tabId, key); },
  };

  const tabs = {
    onRemoved: browser.tabs?.onRemoved,
    async sendMessage(tabId, payload) { return browser.tabs?.sendMessage?.(tabId, payload); },
  };

  const scriptingCompose = {
    async registerScripts(scripts) { return browser.scripting?.compose?.registerScripts?.(scripts); },
    async getRegisteredScripts() { return browser.scripting?.compose?.getRegisteredScripts?.(); },
    async unregisterScripts(ids) { return browser.scripting?.compose?.unregisterScripts?.(ids); },
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
