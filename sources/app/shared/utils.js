/*
 * Module: app/shared/utils.js
 * Purpose: Shared helpers used across background/composition/tests.
 * Exposes: App.Shared = { toNumericId, makeLogger }
 */
(function () {
  function toNumericId(v) {
    return typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  }
  function makeLogger(enabled) {
    const wrap =
      (fn) =>
      (...args) => {
        try {
          if (fn === console.debug && !enabled) return;
          fn('[RWA]', ...args);
        } catch (_) {}
      };
    return {
      debug: wrap(console.debug.bind(console)),
      info: wrap(console.info.bind(console)),
      warn: wrap(console.warn.bind(console)),
      error: wrap(console.error.bind(console)),
    };
  }
  globalThis.App = globalThis.App || {};
  App.Shared = { toNumericId, makeLogger };
})();
