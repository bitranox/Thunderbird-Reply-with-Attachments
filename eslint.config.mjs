import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'website/build/**',
      'website/build-linkcheck/**',
      'website/.docusaurus/**',
      '.gh-pages/**',
      '.github/**',
      '*.zip',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        browser: 'readonly',
        messenger: 'readonly',
        App: 'readonly',
        SESSION_KEY: 'readonly',
        processedTabsState: 'readonly',
        Blob: 'readonly',
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        // Web globals used across sources and tests
        setTimeout: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        location: 'readonly',
        confirm: 'readonly',
        Event: 'readonly',
        KeyboardEvent: 'readonly',
        // Node-style globals for scripts and website configs
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-undef': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-useless-escape': 'off',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    // Docusaurus config files (CJS)
    files: ['website/docusaurus.config.js', 'website/sidebars.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    // Local scripts and configs run under Node
    files: ['scripts/**/*.mjs', 'vitest.config.mjs', 'eslint.config.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    // Tests: turn off no-undef; test runners provide globals
    files: ['tests/**/*.js'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^(id|part|_.*)$',
          varsIgnorePattern: '^(vi|_.*)$',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  prettier,
];
