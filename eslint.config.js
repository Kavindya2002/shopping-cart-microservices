const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/coverage/**',
      '**/dist/**',
      'package-lock.json',
      'stdout.log',
      'stderr.log'
    ]
  },
  js.configs.recommended,
  {
    files: ['api-gateway/**/*.js', 'services/**/*.js', 'scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }]
    }
  }
];
