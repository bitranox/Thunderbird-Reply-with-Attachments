/*
 * Module: app/composition.js
 * Purpose: Composition root. Wires adapter ports to the application
 *          use cases, loads settings, registers event listeners, and
 *          provides a small confirmation flow. No domain logic here.
 * Design:
 * - Read settings once and update reactively via storage.onChanged.
 * - Confirm path tries targeted tab → runtime broadcast → popup fallback.
 * - Keep helpers tiny and intention‑revealing to make flow obvious.
 */
// Composition Root: wire adapters to use-cases and register events

(function () {
  const CONFIRM_TIMEOUT_MS = 20000;
  const SESSION_KEY = 'rwatt_processed';
  /** @type {Map<number,'processing'|'done'>} */
  const processedTabsState = new Map();

  /** @type {Set<number>} Tabs where confirm content script has been injected */
  const injectedConfirmScriptTabs = new Set();

  // small utilities
  const toNumericId = (v) =>
    typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  const yesNo = (v) => (String(v || 'yes').toLowerCase() === 'no' ? 'no' : 'yes');

  /**
   * Create the production wiring for Thunderbird and return entry points
   * used by the background script and tests.
   * @param {any} browser
   * @returns {{ ensureReplyAttachments: (tabId:number, details:any)=>Promise<void>, processedTabsState: Map<number,'processing'|'done'>, SESSION_KEY: string }}
   */
  /**
   * Wire adapter ports to use cases, register event handlers and confirmation flow.
   * @param {any} browser MailExtension browser/messenger object
   */
  function createAppWiring(browser) {
    const { compose, messages, sessions, tabs, scriptingCompose } =
      App.Adapters.makeThunderbirdPorts(browser);
    const makeLogger =
      (globalThis.App && App.Shared && App.Shared.makeLogger) ||
      ((enabled) => ({
        debug: (...args) => {
          if (enabled)
            try {
              console.debug('[RWA]', ...args);
            } catch (_) {}
        },
        info: (...args) => {
          try {
            console.info('[RWA]', ...args);
          } catch (_) {}
        },
        warn: (...args) => {
          try {
            console.warn('[RWA]', ...args);
          } catch (_) {}
        },
        error: (...args) => {
          try {
            console.error('[RWA]', ...args);
          } catch (_) {}
        },
      }));
    const logger = makeLogger(false);

    let exclude = App.Domain.makeNameExcluder([]);
    let askBeforeAdd = false;
    let defaultAnswer = 'yes';

    // load settings once; confirm awaits readiness lazily
    const ready = (async () => {
      const [patterns, ask, def] = await Promise.all([
        readBlacklist(browser),
        readConfirmEnabled(browser),
        readConfirmDefault(browser),
      ]);
      exclude = App.Domain.makeNameExcluder(patterns);
      askBeforeAdd = ask;
      defaultAnswer = def;
    })();

    // confirm function, updated when settings change
    let ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state: processedTabsState,
      sessionKey: SESSION_KEY,
      shouldExclude: (name) => exclude(name),
      confirm: confirmAddSelectedFiles,
      logger,
    });
    /**
     * Ask the user to confirm adding the given files.
     * @param {number} tabId Compose tab id
     * @param {{name:string}[]} selected Selected attachments (names only are used)
     * @returns {Promise<boolean>} true to proceed, false to cancel
     */
    async function confirmAddSelectedFiles(tabId, selected) {
      await ready;
      if (!shouldAsk(selected)) return true;
      await ensureConfirmInjected(tabId, scriptingCompose);
      const files = selected.map((s) => s.name).filter(Boolean);
      return await askUserForConfirmation(
        { files, def: defaultAnswer },
        tabId,
        browser,
        tabs,
        logger
      );
    }
    function shouldAsk(selected) {
      return !!selected?.length && askBeforeAdd;
    }

    // react to settings updates
    browser.storage?.onChanged?.addListener?.((changes, area) => {
      if (area === 'local' && changes?.blacklistPatterns) {
        exclude = App.Domain.makeNameExcluder(changes.blacklistPatterns.newValue || []);
        ensure = App.UseCases.createEnsureReplyAttachments({
          compose,
          messages,
          sessions,
          state: processedTabsState,
          sessionKey: SESSION_KEY,
          shouldExclude: (name) => exclude(name),
          confirm: confirmAddSelectedFiles,
          logger,
        });
      }
      if (area === 'local' && changes?.confirmBeforeAdd) {
        askBeforeAdd = !!changes.confirmBeforeAdd.newValue;
        ensure = App.UseCases.createEnsureReplyAttachments({
          compose,
          messages,
          sessions,
          state: processedTabsState,
          sessionKey: SESSION_KEY,
          shouldExclude: (name) => exclude(name),
          confirm: confirmAddSelectedFiles,
          logger,
        });
      }
      if (area === 'local' && changes?.confirmDefaultChoice) {
        defaultAnswer = yesNo(changes.confirmDefaultChoice.newValue);
      }
    });

    // pre-register confirm content script for new compose windows
    // Register the confirm content script so it is available for new windows.
    const ensureRegistered = (async () => {
      try {
        const regs = (await scriptingCompose.getRegisteredScripts?.()) || [];
        if (!regs.find((r) => r.id === 'rwa-confirm'))
          await scriptingCompose.registerScripts?.([
            { id: 'rwa-confirm', js: ['content/confirm.js'] },
          ]);
      } catch (err) {
        try {
          logger.debug({ err }, 'registerScripts failed');
        } catch (_) {}
      }
    })();

    // event wiring
    // On compose state changes, ensure tabs are processed once per reply.
    compose.onStateChanged.addListener(async (tabId) => {
      const id = toNumericId(tabId);
      if (id == null) return;
      await ensureRegistered;
      const details = await compose.getDetails(id).catch(() => null);
      if (!details) return;
      await ensure(id, details);
    });

    // On send attempt, run a last ensure pass in case state change was missed.
    compose.onBeforeSend?.addListener?.(async (tab) => {
      const id = toNumericId(tab);
      if (id == null) return {};
      await ensureRegistered;
      const details = await compose.getDetails(id).catch(() => null);
      if (!details) return {};
      await ensure(id, details);
      return {};
    });

    // Cleanup per‑tab memory and session marker when a tab closes.
    tabs?.onRemoved?.addListener?.((closedTabId) => {
      const id = toNumericId(closedTabId);
      if (id == null) return;
      try {
        sessions.removeTabValue(id, SESSION_KEY)?.catch?.(() => {});
      } catch (_) {}
      processedTabsState.delete(id);
      injectedConfirmScriptTabs.delete(id);
    });

    return {
      ensureReplyAttachments: (tabId, details) => ensure(tabId, details),
      processedTabsState,
      SESSION_KEY,
    };
  }

  // storage readers
  /** Load blacklist patterns from storage (empty array on error). */
  async function readBlacklist(browser) {
    try {
      const r = await browser.storage?.local?.get?.({ blacklistPatterns: [] });
      return Array.isArray(r?.blacklistPatterns) ? r.blacklistPatterns : [];
    } catch (_) {
      return [];
    }
  }
  /** Load confirmation toggle from storage (false on error). */
  async function readConfirmEnabled(browser) {
    try {
      const r = await browser.storage?.local?.get?.({ confirmBeforeAdd: false });
      return !!r?.confirmBeforeAdd;
    } catch (_) {
      return false;
    }
  }
  /** Load default answer for confirmation as 'yes' | 'no'. */
  async function readConfirmDefault(browser) {
    try {
      const r = await browser.storage?.local?.get?.({ confirmDefaultChoice: 'yes' });
      return yesNo(r?.confirmDefaultChoice);
    } catch (_) {
      return 'yes';
    }
  }

  // confirm helpers
  /** Ensure the confirm content script is injected into the target compose tab. */
  async function ensureConfirmInjected(tabId, scriptingCompose) {
    try {
      if (injectedConfirmScriptTabs.has(tabId)) return;
      await scriptingCompose.executeScript?.(tabId, ['content/confirm.js']);
      injectedConfirmScriptTabs.add(tabId);
    } catch (err) {
      try {
        logger.debug({ err, tabId }, 'ensureConfirmInjected failed');
      } catch (_) {}
    }
  }
  /** Ask the user via content script; fall back progressively if needed. */
  /**
   * Ask the user via targeted tab → broadcast → popup fallback.
   * @param {{files:string[], def:'yes'|'no'}} opts
   */
  async function askUserForConfirmation({ files, def }, tabId, browser, tabs, logger = console) {
    const payload = { type: 'rwa:confirm-add', files, def };
    const targeted = await tryTargetedConfirm(tabs, tabId, payload);
    if (isDecision(targeted)) return targeted.ok;
    const broadcast = await tryBroadcastConfirm(browser, payload);
    if (isDecision(broadcast)) return broadcast.ok;
    return await askInPopup(browser, files, def, logger);
  }
  /** Try targeted tab messaging; return decision or null on error. */
  async function tryTargetedConfirm(tabs, tabId, payload) {
    try {
      return await tabs.sendMessage(tabId, payload);
    } catch (_) {
      return null;
    }
  }
  /** Try runtime broadcast; return decision or null on error. */
  async function tryBroadcastConfirm(browser, payload) {
    try {
      return await browser.runtime?.sendMessage?.(payload);
    } catch (_) {
      return null;
    }
  }
  function isDecision(x) {
    return x && typeof x.ok === 'boolean';
  }
  /** Last resort: open a small popup window to ask for confirmation. */
  async function askInPopup(browser, files, def, logger) {
    try {
      const token = Math.random().toString(36).slice(2);
      const url = buildConfirmUrl(browser, token, files, def);
      const result = waitForConfirm(browser, token);
      const win = await browser.windows?.create?.({
        url,
        type: 'popup',
        width: 520,
        height: 180,
        focused: true,
      });
      try {
        if (win && typeof win.id === 'number')
          await browser.windows?.update?.(win.id, { focused: true });
      } catch (_) {}
      return await result;
    } catch (err) {
      try {
        logger?.warn?.({ err }, 'askInPopup failed');
      } catch (_) {}
      return false;
    }
  }
  /** Build confirm.html URL with query parameters. */
  function buildConfirmUrl(browser, token, files, def) {
    const base =
      (browser.runtime?.getURL && browser.runtime.getURL('confirm.html')) || 'confirm.html';
    const count = files.length;
    const list = files.slice(0, 5).join(', ');
    const more = count > 5 ? String(count - 5) : '';
    const q = new URLSearchParams({ t: token, c: String(count), list, more, def: def || 'yes' });
    return `${base}?${q.toString()}`;
  }
  /** Wait for the popup page to send its decision back via runtime messaging. */
  /** Wait until confirm result arrives for the given token, with timeout. */
  function waitForConfirm(browser, token) {
    return new Promise((resolve) => {
      const listener = (msg) => {
        if (!msg || msg.type !== 'rwa:confirm-result' || msg.t !== token) return;
        try {
          browser.runtime.onMessage.removeListener(listener);
        } catch (_) {}
        resolve(!!msg.ok);
      };
      browser.runtime.onMessage.addListener(listener);
      setTimeout(() => {
        try {
          browser.runtime.onMessage.removeListener(listener);
        } catch (_) {}
        resolve(false);
      }, CONFIRM_TIMEOUT_MS);
    });
  }

  // exports for background/tests
  globalThis.App = globalThis.App || {};
  App.Composition = { createAppWiring };
  try {
    const __TEST__ = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'test';
    if (__TEST__) {
      globalThis.SESSION_KEY = SESSION_KEY;
      globalThis.processedTabsState = processedTabsState;
      globalThis.injectedConfirmScriptTabs = injectedConfirmScriptTabs;
    }
  } catch (_) {}
})();
