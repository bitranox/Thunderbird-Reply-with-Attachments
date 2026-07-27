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
  const SESSION_KEY = 'rwatt_processed';
  /** @type {Map<number,{ stage:'processing'|'done', messageId:string|null }>} */
  const processedTabsState = new Map();

  // small utilities
  const toNumericId = (v) =>
    typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  const yesNo = (v) =>
    globalThis.App && App.Shared && App.Shared.yesNo
      ? App.Shared.yesNo(v)
      : String(v || 'yes').toLowerCase() === 'no'
        ? 'no'
        : 'yes';

  /**
   * Report a problem without letting the reporting itself throw.
   * @param {...unknown} args
   */
  function warnSafe(...args) {
    try {
      console.warn('[RWA]', ...args);
    } catch (_) {
      // a logger must never break the caller
    }
  }

  /** Pure helper: should we ask based on toggle and selection list. */
  function shouldAskHelper(askBeforeAdd, selected) {
    return !!(selected && selected.length) && !!askBeforeAdd;
  }

  /**
   * Small local logger factory used when App.Shared.makeLogger is not provided.
   * @param {boolean} enabled
   * @returns {{debug:Function,info:Function,warn:Function,error:Function}}
   */
  function makeLocalLogger(enabled) {
    return {
      debug: (...args) => {
        if (enabled)
          try {
            console.debug('[RWA]', ...args);
          } catch (_) {
            // a logger must never break the caller
          }
      },
      info: (...args) => {
        try {
          console.info('[RWA]', ...args);
        } catch (_) {
          // a logger must never break the caller
        }
      },
      warn: (...args) => {
        try {
          console.warn('[RWA]', ...args);
        } catch (_) {
          // a logger must never break the caller
        }
      },
      error: (...args) => {
        try {
          console.error('[RWA]', ...args);
        } catch (_) {
          // a logger must never break the caller
        }
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
      } catch (_) {
        // a logger must never break the caller
      }
      try {
        globalThis.log?.debug?.(payload, message);
      } catch (_) {
        // a logger must never break the caller
      }
    };

    const normalizedTabRef = (value) =>
      typeof value === 'object' && value && typeof value.id === 'number' ? value.id : value;

    logDebug({}, 'createAppWiring: wiring initialized');

    // Settings state (updated reactively; used by closures below)
    let excludePatterns = [];
    let exclude = App.Domain.makeNameExcluder([]);
    let askBeforeAdd = false;
    /** @type {'yes'|'no'} */
    let defaultAnswer = 'yes';
    let warnOnBlacklist = true;
    /** @type {Array<{ pat: string, rx: RegExp }>} */
    let compiledBlacklist = [];

    /**
     * Apply loaded settings to local state and rebuild the blacklist matcher.
     * @param {{ patterns: string[], ask: boolean, def: string, warnFlag: boolean }} opts
     */
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
      defaultAnswer = yesNo(def);
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
    /** Reconstruct the ensure-reply-attachments use-case from current settings. */
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
          } catch (e) {
            warnSafe('blacklist pattern failed to match:', pat, e);
          }
        }
        return hits;
      } catch (e) {
        warnSafe('blacklist matching failed for', name, e);
        return [];
      }
    }
    /**
     * Show a blacklist-exclusion warning in the compose tab.
     * @param {number} tabId
     * @param {{name:string, pattern:string}[]} rows Excluded file/pattern pairs
     */
    async function warnBlacklisted(tabId, rows) {
      try {
        await App.ConfirmFlow.ensureConfirmInjected(tabId, scriptingCompose);
      } catch (e) {
        console.error('[RWA] warnBlacklisted: inject failed:', e);
      }
      try {
        await browser.tabs?.sendMessage?.(tabId, { type: 'rwa:warn-blacklist', rows });
      } catch (e) {
        console.error('[RWA] warnBlacklisted: sendMessage failed:', e);
      }
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
      await App.ConfirmFlow.ensureConfirmInjected(tabId, scriptingCompose, logger);
      const files = selected.map((s) => s.name).filter(Boolean);
      return await App.ConfirmFlow.askUserForConfirmation(
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

    /**
     * Apply a settings change coming from the options page.
     * Split out of the listener so a throw from one key is reported with the key
     * that caused it instead of silently disabling every later update.
     * @param {Record<string, {newValue?: any}>} changes
     */
    function applySettingsChange(changes) {
      if (changes.blacklistPatterns) {
        excludePatterns = changes.blacklistPatterns.newValue || [];
        exclude = App.Domain.makeNameExcluder(excludePatterns);
        rebuildEnsure();
      }
      if (changes.confirmBeforeAdd) {
        askBeforeAdd = !!changes.confirmBeforeAdd.newValue;
        rebuildEnsure();
      }
      if (changes.confirmDefaultChoice) {
        defaultAnswer = yesNo(changes.confirmDefaultChoice.newValue);
      }
      if (changes.warnOnBlacklistExcluded) {
        warnOnBlacklist = !!changes.warnOnBlacklistExcluded.newValue;
        rebuildEnsure();
      }
    }

    // react to settings updates
    if (typeof browser.storage?.onChanged?.addListener === 'function') {
      // A host that rejects the registration must not take the whole wiring with it.
      try {
        browser.storage.onChanged.addListener((changes, area) => {
          if (area !== 'local') return;
          const safeChanges = changes || {};
          logDebug({ area, keys: Object.keys(safeChanges) }, 'storage.onChanged: settings update');
          try {
            applySettingsChange(safeChanges);
          } catch (err) {
            warnSafe('applying a settings change failed:', err);
          }
        });
      } catch (e) {
        warnSafe('could not subscribe to settings changes:', e);
      }
    } else {
      console.warn(
        '[RWA] browser.storage.onChanged is unavailable; settings changes need a restart'
      );
    }

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
        } catch (_) {
          // a logger must never break the caller
        }
        logDebug({ err }, 'confirmScript: registration error');
      }
    }
    const ensureRegistered = ensureConfirmScriptRegistered();

    // — Event wiring —
    // Flow: compose.onStateChanged → handleComposeStateChanged → ensureWrapper → ensure
    // Each compose tab is processed at most once per reply (idempotent via session + memory).

    /**
     * Handle a compose state change event. Resolves the tab id, fetches compose
     * details, then delegates to ensureWrapper for idempotent attachment processing.
     * @param {number|{id:number}} tabRef Tab reference from the Thunderbird event
     */
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
      let details;
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

    /**
     * Last-chance ensure pass on send. Catches cases where onStateChanged fired
     * before the extension was ready or was missed due to a race condition.
     * @param {number|{id:number}} tabRef Tab reference from the Thunderbird event
     * @returns {Promise<{}>} Empty object to allow the send to proceed
     */
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
      let details;
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

    /**
     * Clean up per-tab memory state and session marker when a compose tab closes.
     * Prevents memory leaks from accumulating entries for closed tabs.
     * @param {number|{id:number}} closedTabId Tab reference from tabs.onRemoved
     */
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
      App.ConfirmFlow?.forgetTab?.(id);
      logDebug({ tabId: id }, 'tabs.onRemoved: state cleared');
    }
    tabs?.onRemoved?.addListener?.(handleTabRemoved);

    /**
     * Resilient wrapper around the ensure use-case. Waits for settings readiness,
     * rebuilds the use-case closure if needed, and catches all errors so a single
     * tab failure never breaks the listener pipeline.
     * @param {number} tabId Compose tab id
     * @param {{ type?: string }} details Compose details from compose.getDetails
     */
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
        } catch (_) {
          // a logger must never break the caller
        }
        logDebug({ tabId, err }, 'ensureWrapper: error captured');
        return undefined;
      }
    }
    // Also expose a bound reloadSettings for background.js
    try {
      globalThis.App = globalThis.App || {};
      App.Composition = App.Composition || /** @type {AppComposition} */ ({});
      App.Composition.reloadSettings = () => reloadSettings();
    } catch (e) {
      warnSafe('could not expose reloadSettings; the options page cannot refresh us', e);
    }
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

  // exports for background/tests
  globalThis.App = globalThis.App || {};
  App.Composition = { createAppWiring };
  // Expose small internals for focused unit tests (non-breaking)
  // Re-exported from App.ConfirmFlow so existing tests keep one import site.
  App.Composition.Internal = {
    makeLogger: makeLocalLogger,
    yesNo,
    shouldAsk: shouldAskHelper,
    readBlacklist,
    readConfirmEnabled,
    readConfirmDefault,
    ...(App.ConfirmFlow || {}),
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
    }
  } catch (_) {
    // test-only hook; absent outside the test runner
  }
})();
