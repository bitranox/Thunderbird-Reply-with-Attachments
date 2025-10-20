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
  /** @type {Map<number,{ stage:'processing'|'done', messageId:string|null }>} */
  const processedTabsState = new Map();

  /** @type {Set<number>} Tabs where confirm content script has been injected */
  const injectedConfirmScriptTabs = new Set();

  // small utilities
  const toNumericId = (v) =>
    typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  const yesNo = (v) =>
    globalThis.App && App.Shared && App.Shared.yesNo
      ? App.Shared.yesNo(v)
      : String(v || 'yes').toLowerCase() === 'no'
        ? 'no'
        : 'yes';

  /** Pure helper: should we ask based on toggle and selection list. */
  function shouldAskHelper(askBeforeAdd, selected) {
    return !!(selected && selected.length) && !!askBeforeAdd;
  }

  /**
   * Small local logger factory used when App.Shared.makeLogger is not provided.
   */
  function makeLocalLogger(enabled) {
    return {
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
    };
  }

  /**
   * Create the production wiring for Thunderbird and return entry points
   * used by the background script and tests.
   * @param {any} browser
   * @returns {{ ensureReplyAttachments: (tabId:number, details:any)=>Promise<void>, processedTabsState: Map<number,{ stage:'processing'|'done', messageId:string|null }>, SESSION_KEY: string }}
   */
  /**
   * Wire adapter ports to use cases, register event handlers and confirmation flow.
   * @param {any} browser MailExtension browser/messenger object
   */
  function createAppWiring(browser) {
    const { compose, messages, sessions, tabs, scriptingCompose } =
      App.Adapters.makeThunderbirdPorts(browser);
    const makeLogger = (globalThis.App && App.Shared && App.Shared.makeLogger) || makeLocalLogger;
    const logger = makeLogger(false);
    const logDebug = (payload, message) => {
      try {
        logger.debug?.(payload, message);
      } catch (_) {}
      try {
        globalThis.log?.debug?.(payload, message);
      } catch (_) {}
    };

    const normalizedTabRef = (value) =>
      typeof value === 'object' && value && typeof value.id === 'number' ? value.id : value;

    logDebug({}, 'createAppWiring: wiring initialized');

    // Settings state (updated reactively; used by closures below)
    let excludePatterns = [];
    let exclude = App.Domain.makeNameExcluder([]);
    let askBeforeAdd = false;
    let defaultAnswer = 'yes';
    let warnOnBlacklist = true;
    /** @type {Array<{ pat: string, rx: RegExp }>} */
    let compiledBlacklist = [];

    // load settings once; confirm awaits readiness lazily
    function applySettings({ patterns, ask, def, warnFlag }) {
      excludePatterns = patterns;
      exclude = App.Domain.makeNameExcluder(patterns);
      // Precompile blacklist regexes once for efficient matching during warnings
      try {
        const lower = App.Domain?.lower || ((s) => String(s || '').toLowerCase());
        const toRx = App.Domain?.globToRegExp;
        compiledBlacklist = Array.isArray(patterns)
          ? patterns
              .map((p) => String(p || '').trim())
              .filter(Boolean)
              .map((p) => {
                const pat = lower(p);
                return { pat, rx: toRx ? toRx(pat) : new RegExp('^$') };
              })
          : [];
      } catch (_) {
        compiledBlacklist = [];
      }
      askBeforeAdd = ask;
      defaultAnswer = def;
      warnOnBlacklist = warnFlag;
      logDebug(
        {
          blacklistPatterns: Array.isArray(patterns) ? patterns.length : 0,
          askBeforeAdd: ask,
          defaultAnswer: def,
          warnOnBlacklist: warnFlag,
        },
        'createAppWiring: settings applied'
      );
    }
    const ready = (async () => {
      const vals = await loadSettings(browser);
      applySettings(vals);
      rebuildEnsure();
    })();

    async function reloadSettings() {
      logDebug({}, 'createAppWiring: reloadSettings invoked');
      applySettings(await loadSettings(browser));
      rebuildEnsure();
    }

    // confirm function, updated when settings change
    let ensure = null;
    function rebuildEnsure() {
      logDebug(
        {
          askBeforeAdd,
          warnOnBlacklist,
          compiledBlacklist: compiledBlacklist.length,
        },
        'createAppWiring: rebuildEnsure'
      );
      ensure = App.UseCases.createEnsureReplyAttachments({
        compose,
        messages,
        sessions,
        state: processedTabsState,
        sessionKey: SESSION_KEY,
        shouldExclude: (name) => exclude(name),
        confirm: confirmAddSelectedFiles,
        warn: warnBlacklisted,
        warnOnBlacklist,
        matchBlacklist: matchBlacklist,
        logger,
      });
    }
    // bootstrap ensure with defaults so early compose events still process
    rebuildEnsure();
    /** Compute matching blacklist patterns for a given name. */
    function matchBlacklist(name) {
      try {
        const lower = App.Domain?.lower || ((s) => String(s || '').toLowerCase());
        const n = lower(name);
        const hits = [];
        for (const { pat, rx } of compiledBlacklist) {
          try {
            if (rx.test(n)) hits.push(pat);
          } catch (_) {}
        }
        return hits;
      } catch (_) {
        return [];
      }
    }
    async function warnBlacklisted(tabId, rows) {
      try {
        await ensureConfirmInjected(tabId, scriptingCompose);
      } catch (_) {}
      try {
        await browser.tabs?.sendMessage?.(tabId, { type: 'rwa:warn-blacklist', rows });
      } catch (_) {}
    }
    /**
     * Ask the user to confirm adding the given files.
     * @param {number} tabId Compose tab id
     * @param {{name:string}[]} selected Selected attachments (names only are used)
     * @returns {Promise<boolean>} true to proceed, false to cancel
     */
    async function confirmAddSelectedFiles(tabId, selected) {
      await ready;
      if (!shouldAsk(selected)) return true;
      await ensureConfirmInjected(tabId, scriptingCompose, logger);
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
      return shouldAskHelper(askBeforeAdd, selected);
    }

    // react to settings updates
    browser.storage?.onChanged?.addListener?.((changes, area) => {
      if (area === 'local') {
        const keys = Object.keys(changes || {});
        logDebug({ area, keys }, 'storage.onChanged: settings update observed');
      }
      if (area === 'local' && changes?.blacklistPatterns) {
        excludePatterns = changes.blacklistPatterns.newValue || [];
        exclude = App.Domain.makeNameExcluder(excludePatterns);
        rebuildEnsure();
      }
      if (area === 'local' && changes?.confirmBeforeAdd) {
        askBeforeAdd = !!changes.confirmBeforeAdd.newValue;
        rebuildEnsure();
      }
      if (area === 'local' && changes?.confirmDefaultChoice) {
        defaultAnswer = yesNo(changes.confirmDefaultChoice.newValue);
      }
      if (area === 'local' && changes?.warnOnBlacklistExcluded) {
        warnOnBlacklist = !!changes.warnOnBlacklistExcluded.newValue;
        rebuildEnsure();
      }
    });

    // pre-register confirm content script for new compose windows
    // Register the confirm content script so it is available for new windows.
    async function ensureConfirmScriptRegistered() {
      logDebug({}, 'confirmScript: ensure registration start');
      try {
        const regs = (await scriptingCompose.getRegisteredScripts?.()) || [];
        if (!regs.find((r) => r.id === 'rwa-confirm')) {
          logDebug({ existing: regs.length }, 'confirmScript: registering content script');
          await scriptingCompose.registerScripts?.([
            { id: 'rwa-confirm', js: ['content/confirm.js'] },
          ]);
          logDebug({}, 'confirmScript: registration succeeded');
        } else {
          logDebug({ existing: regs.length }, 'confirmScript: already registered');
        }
      } catch (err) {
        try {
          logger.debug({ err }, 'registerScripts failed');
        } catch (_) {}
        logDebug({ err }, 'confirmScript: registration error');
      }
    }
    const ensureRegistered = ensureConfirmScriptRegistered();

    // event wiring
    // On compose state changes, ensure tabs are processed once per reply.
    async function handleComposeStateChanged(tabRef) {
      const id = toNumericId(tabRef);
      logDebug(
        { rawTabId: normalizedTabRef(tabRef), tabId: id },
        'compose.onStateChanged: event received'
      );
      if (id == null) {
        logDebug(
          { rawTabId: normalizedTabRef(tabRef) },
          'compose.onStateChanged: skip missing numeric id'
        );
        return;
      }
      await ensureRegistered;
      let details = null;
      try {
        details = await compose.getDetails(id);
      } catch (err) {
        logDebug({ tabId: id, err }, 'compose.onStateChanged: getDetails failed');
        return;
      }
      if (!details) {
        logDebug({ tabId: id }, 'compose.onStateChanged: missing compose details');
        return;
      }
      logDebug({ tabId: id, type: details?.type }, 'compose.onStateChanged: invoking ensure');
      await ensureWrapper(id, details);
      logDebug({ tabId: id }, 'compose.onStateChanged: ensure completed');
    }
    compose.onStateChanged.addListener(handleComposeStateChanged);

    // On send attempt, run a last ensure pass in case state change was missed.
    async function handleComposeBeforeSend(tabRef) {
      const id = toNumericId(tabRef);
      logDebug(
        { rawTabId: normalizedTabRef(tabRef), tabId: id },
        'compose.onBeforeSend: event received'
      );
      if (id == null) {
        logDebug(
          { rawTabId: normalizedTabRef(tabRef) },
          'compose.onBeforeSend: skip missing numeric id'
        );
        return {};
      }
      await ensureRegistered;
      let details = null;
      try {
        details = await compose.getDetails(id);
      } catch (err) {
        logDebug({ tabId: id, err }, 'compose.onBeforeSend: getDetails failed');
        return {};
      }
      if (!details) {
        logDebug({ tabId: id }, 'compose.onBeforeSend: missing compose details');
        return {};
      }
      logDebug({ tabId: id, type: details?.type }, 'compose.onBeforeSend: invoking ensure');
      await ensureWrapper(id, details);
      logDebug({ tabId: id }, 'compose.onBeforeSend: ensure completed');
      return {};
    }
    compose.onBeforeSend?.addListener?.(handleComposeBeforeSend);

    // Cleanup per‑tab memory and session marker when a tab closes.
    function handleTabRemoved(closedTabId) {
      const id = toNumericId(closedTabId);
      logDebug(
        { rawTabId: normalizedTabRef(closedTabId), tabId: id },
        'tabs.onRemoved: event received'
      );
      if (id == null) {
        logDebug(
          { rawTabId: normalizedTabRef(closedTabId) },
          'tabs.onRemoved: skip missing numeric id'
        );
        return;
      }
      try {
        sessions.removeTabValue(id, SESSION_KEY)?.catch?.(() => {});
      } catch (_) {
        logDebug({ tabId: id }, 'tabs.onRemoved: removeTabValue threw synchronously');
      }
      processedTabsState.delete(id);
      injectedConfirmScriptTabs.delete(id);
      logDebug({ tabId: id }, 'tabs.onRemoved: state cleared');
    }
    tabs?.onRemoved?.addListener?.(handleTabRemoved);

    async function ensureWrapper(tabId, details) {
      try {
        logDebug({ tabId, type: details?.type }, 'ensureWrapper: invoked');
        if (!ensure) {
          logDebug({ tabId }, 'ensureWrapper: ensure missing, awaiting readiness');
          try {
            await ready;
          } catch (err) {
            logDebug({ tabId, err }, 'ensureWrapper: ready wait failed');
          }
          if (!ensure) {
            logDebug({ tabId }, 'ensureWrapper: rebuilding ensure after wait');
            rebuildEnsure();
          }
        }
        if (typeof ensure !== 'function') {
          logDebug({ tabId }, 'ensureWrapper: ensure not callable');
          return;
        }
        const result = await ensure(tabId, details);
        logDebug({ tabId }, 'ensureWrapper: completed');
        return result;
      } catch (err) {
        try {
          logger.warn?.({ err, tabId }, 'ensureWrapper failed');
        } catch (_) {}
        logDebug({ tabId, err }, 'ensureWrapper: error captured');
        return undefined;
      }
    }
    // Also expose a bound reloadSettings for background.js
    try {
      globalThis.App = globalThis.App || {};
      App.Composition = App.Composition || {};
      App.Composition.reloadSettings = () => reloadSettings();
    } catch (_) {}
    return {
      ensureReplyAttachments: ensureWrapper,
      processedTabsState,
      SESSION_KEY,
      reloadSettings,
    };
  }

  // — settings helpers —
  async function loadSettings(browser) {
    const [patterns, ask, def, warnFlag] = await Promise.all([
      readBlacklist(browser),
      readConfirmEnabled(browser),
      readConfirmDefault(browser),
      readWarnOnBlacklist(browser),
    ]);
    return { patterns, ask, def, warnFlag };
  }
  // applySettings is defined inside createAppWiring to access its local state

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
  /** Load warn-on-blacklist toggle from storage (true on error). */
  async function readWarnOnBlacklist(browser) {
    try {
      const r = await browser.storage?.local?.get?.({ warnOnBlacklistExcluded: true });
      return !!r?.warnOnBlacklistExcluded;
    } catch (_) {
      return true;
    }
  }

  // confirm helpers
  /** Ensure the confirm content script is injected into the target compose tab. */
  async function ensureConfirmInjected(tabId, scriptingCompose, logger = console) {
    const emitDebug = (payload, message) => {
      try {
        logger.debug?.(payload, message);
      } catch (_) {}
      try {
        globalThis.log?.debug?.(payload, message);
      } catch (_) {}
    };
    try {
      if (injectedConfirmScriptTabs.has(tabId)) {
        emitDebug({ tabId }, 'ensureConfirmInjected: already injected');
        return;
      }
      await scriptingCompose.executeScript?.(tabId, ['content/confirm.js']);
      injectedConfirmScriptTabs.add(tabId);
      emitDebug({ tabId }, 'ensureConfirmInjected: script executed');
    } catch (err) {
      try {
        logger.debug({ err, tabId }, 'ensureConfirmInjected failed');
      } catch (_) {}
      emitDebug({ tabId, err }, 'ensureConfirmInjected: executeScript error');
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
  /** Predicate: object has a boolean `ok` field (confirm/warn result). */
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
  // matchBlacklist and warnBlacklisted are defined inside createAppWiring to access settings
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
  // Expose small internals for focused unit tests (non-breaking)
  App.Composition.Internal = {
    makeLogger: makeLocalLogger,
    yesNo,
    shouldAsk: shouldAskHelper,
    readBlacklist,
    readConfirmEnabled,
    readConfirmDefault,
    ensureConfirmInjected,
    tryTargetedConfirm,
    tryBroadcastConfirm,
    isDecision,
    buildConfirmUrl,
    waitForConfirm,
  };
  try {
    const __TEST__ = !!(
      globalThis.process &&
      globalThis.process.env &&
      globalThis.process.env.NODE_ENV === 'test'
    );
    if (__TEST__) {
      globalThis.SESSION_KEY = SESSION_KEY;
      globalThis.processedTabsState = processedTabsState;
      globalThis.injectedConfirmScriptTabs = injectedConfirmScriptTabs;
    }
  } catch (_) {}
})();
