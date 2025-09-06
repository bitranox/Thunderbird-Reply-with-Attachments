/** @type {import('vitest').UserConfig} */
export default {
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json-summary'],
      all: true,
      include: ['sources/**/*.js'],
      exclude: ['sources/app/application/ports.js', 'website/**', 'scripts/**'],
      thresholds: {
        global: {
          lines: 85,
          functions: 85,
          branches: 70,
          statements: 85,
        },
      },
    },
  },
};
