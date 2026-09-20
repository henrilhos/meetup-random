import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { flatConfigs as importXConfigs } from 'eslint-plugin-import-x';
import globals from 'globals';

export default [
  { ignores: ['coverage/**'] },
  js.configs.recommended,
  importXConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  prettier,
];
