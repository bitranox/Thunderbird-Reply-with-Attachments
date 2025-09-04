// Composition Root: wire adapters to use-cases and register events

(function () {
  const SESSION_KEY = 'rwatt_processed';
  /** @type {Map<number,'processing'|'done'>} */
  const processedTabsState = new Map();

  async function loadBlacklist(browser) {
    try {
      const res = await browser.storage?.local?.get?.({ blacklistPatterns: [] });
      return Array.isArray(res?.blacklistPatterns) ? res.blacklistPatterns : [];
    } catch (_) { return []; }
  }

  async function loadConfirm(browser) {
    try {
      const res = await browser.storage?.local?.get?.({ confirmBeforeAdd: false });
      return !!res?.confirmBeforeAdd;
    } catch (_) { return false; }
  }

  function createAppWiring(browser) {
    const { compose, messages, sessions, tabs, scriptingCompose } = App.Adapters.makeThunderbirdPorts(browser);
    let exclude = App.Domain.makeNameExcluder([]);
    let confirmFlag = false;
    let confirmDefaultChoice = 'yes';

    async function loadConfirmDefault(browser) {
      try {
        const res = await browser.storage?.local?.get?.({ confirmDefaultChoice: 'yes' });
        const v = String(res?.confirmDefaultChoice || 'yes').toLowerCase();
        return v === 'no' ? 'no' : 'yes';
      } catch (_) { return 'yes'; }
    }

    async function confirmAdd(tabId, selected) {
      if (!confirmFlag || !selected?.length) return true;
      try {
        const payload = { type: 'rwa:confirm-add', files: selected.map(s => s.name).filter(Boolean), def: confirmDefaultChoice };
        // Try targeted message first
        const resp = await tabs.sendMessage(tabId, payload);
        if (resp && typeof resp.ok === 'boolean') return resp.ok;
        // Fallback: broadcast (some TB setups may not have tab messaging for compose windows)
        const resp2 = await browser.runtime?.sendMessage?.(payload);
        if (resp2 && typeof resp2.ok === 'boolean') return resp2.ok;
        // Final fallback: popup confirmation window
        return await confirmViaWindow(payload);
      } catch (_) {}
      return true;
    }

    async function confirmViaWindow(payload) {
      try {
        const token = Math.random().toString(36).slice(2);
        const count = payload.files.length;
        const list = payload.files.slice(0,5).join(', ');
        const more = count>5 ? String(count-5) : '';
        const base = (browser.runtime?.getURL && browser.runtime.getURL('confirm.html')) || 'confirm.html';
        const url = `${base}?t=${encodeURIComponent(token)}&c=${encodeURIComponent(String(count))}&list=${encodeURIComponent(list)}&more=${encodeURIComponent(more)}&def=${encodeURIComponent(payload.def||'yes')}`;
        const wait = new Promise((resolve) => {
          const listener = (msg) => {
            if (!msg || msg.type !== 'rwa:confirm-result' || msg.t !== token) return;
            try { browser.runtime.onMessage.removeListener(listener); } catch(_) {}
            resolve(!!msg.ok);
          };
          browser.runtime.onMessage.addListener(listener);
          setTimeout(()=>{ try { browser.runtime.onMessage.removeListener(listener); } catch(_) {} resolve(false); }, 20000);
        });
        await browser.windows?.create?.({ url, type: 'popup', width: 520, height: 180, focused: true });
        return await wait;
      } catch(_) { return false; }
    }

    let currentEnsure = App.UseCases.createEnsureReplyAttachments({ compose, messages, sessions, state: processedTabsState, sessionKey: SESSION_KEY, shouldExclude: (name) => exclude(name), confirm: confirmAdd });

    // Kick off settings load and ensure confirm waits until ready
    const settingsReady = (async () => {
      const [p, c, d] = await Promise.all([
        loadBlacklist(browser),
        loadConfirm(browser),
        loadConfirmDefault(browser),
      ]);
      exclude = App.Domain.makeNameExcluder(p);
      confirmFlag = c;
      confirmDefaultChoice = d;
    })();
    // Ensure confirmAdd waits for ready
    const prevConfirmAdd = confirmAdd;
    confirmAdd = async (tabId, selected) => { await settingsReady; return prevConfirmAdd(tabId, selected); };
    browser.storage?.onChanged?.addListener?.((changes, area) => {
      if (area !== 'local' || !changes?.blacklistPatterns) return;
      const patterns = changes.blacklistPatterns.newValue || [];
      exclude = App.Domain.makeNameExcluder(patterns);
      currentEnsure = App.UseCases.createEnsureReplyAttachments({ compose, messages, sessions, state: processedTabsState, sessionKey: SESSION_KEY, shouldExclude: (name) => exclude(name), confirm: confirmAdd });
    });
    browser.storage?.onChanged?.addListener?.((changes, area) => {
      if (area !== 'local' || !changes?.confirmBeforeAdd) return;
      confirmFlag = !!changes.confirmBeforeAdd.newValue;
      currentEnsure = App.UseCases.createEnsureReplyAttachments({ compose, messages, sessions, state: processedTabsState, sessionKey: SESSION_KEY, shouldExclude: (name) => exclude(name), confirm: confirmAdd });
    });
    browser.storage?.onChanged?.addListener?.((changes, area) => {
      if (area !== 'local' || !changes?.confirmDefaultChoice) return;
      const v = String(changes.confirmDefaultChoice.newValue || 'yes').toLowerCase();
      confirmDefaultChoice = v === 'no' ? 'no' : 'yes';
    });

    // Ensure confirm script is registered for future compose windows
    const ensureConfirmRegistered = (async () => {
      try {
        const regs = await scriptingCompose.getRegisteredScripts?.() || [];
        if (!regs.find(r => r.id === 'rwa-confirm')) {
          await scriptingCompose.registerScripts?.([{ id: 'rwa-confirm', js: ['content/confirm.js'] }]);
        }
      } catch (_) {}
    })();

    // Events
    compose.onStateChanged.addListener(async (tabId) => {
      const id = typeof tabId === 'number' ? tabId : (tabId && tabId.id);
      if (typeof id !== 'number') return;
      // Attempt to inject confirm script into this compose now (in case it was opened before registration)
      try { await ensureConfirmRegistered; await scriptingCompose.executeScript?.(id, ['content/confirm.js']); } catch (_) {}
      const details = await compose.getDetails(id).catch(() => null);
      if (!details) return;
      await currentEnsure(id, details);
    });

    compose.onBeforeSend?.addListener?.(async (tab) => {
      const id = typeof tab === 'number' ? tab : (tab && tab.id);
      if (typeof id !== 'number') return {};
      try { await ensureConfirmRegistered; await scriptingCompose.executeScript?.(id, ['content/confirm.js']); } catch (_) {}
      const details = await compose.getDetails(id).catch(() => null);
      if (!details) return {};
      await currentEnsure(id, details);
      return {};
    });

    tabs?.onRemoved?.addListener?.((closedTabId) => {
      const id = typeof closedTabId === 'number' ? closedTabId : (closedTabId && closedTabId.id);
      if (typeof id !== 'number') return;
      try { sessions.removeTabValue(id, SESSION_KEY)?.catch?.(() => {}); } catch (_) {}
      processedTabsState.delete(id);
    });

    return { ensureReplyAttachments: (tabId, details) => currentEnsure(tabId, details), processedTabsState, SESSION_KEY };
  }

  // Export wiring and state for background.js and tests
  globalThis.App = globalThis.App || {};
  App.Composition = { createAppWiring };
  // Surface state for tests expecting these names
  globalThis.SESSION_KEY = SESSION_KEY;
  globalThis.processedTabsState = processedTabsState;
})();
