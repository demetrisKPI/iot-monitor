import _import from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'prettier',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      import: fixupPluginRules(_import),
      jest,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
      },

      ecmaVersion: 9,
      sourceType: 'commonjs',
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'prefer-promise-reject-errors': 'off',

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],

      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
    },
  },
];
