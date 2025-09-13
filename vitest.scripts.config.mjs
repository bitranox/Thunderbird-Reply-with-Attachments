/** @type {import('vitest').UserConfig} */
export default {
  test: {
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      all: true,
      include: ['scripts/lib/**/*.js'],
      exclude: ['website/**'],
      thresholds: {
        global: {
          lines: 90,
          functions: 90,
          statements: 90,
          branches: 75,
        },
      },
    },
  },
};
