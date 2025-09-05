/** @type {import('vitest').UserConfig} */
export default {
  test: {
    coverage: {
      lines: 0.85,
      functions: 0.85,
      branches: 0.85,
      statements: 0.85,
      thresholds: {
        global: {
          lines: 85,
          functions: 85,
          branches: 85,
          statements: 85
        }
      }
    }
  }
};

